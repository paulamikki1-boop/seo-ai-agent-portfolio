// Generic skeleton of the audit -> optimise -> publish pattern (no company data).
// Shows: schema-checked hand-offs, pipeline(), parallel publish tasks, one serialized tracker write.

export const meta = {
  name: 'audit-optimise-publish',
  description: 'Audit each article, rewrite it, then update the live post',
  phases: [{ title: 'Audit' }, { title: 'Optimise' }, { title: 'Publish' }],
}

const AUDIT_SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    priorityActions: { type: 'array', items: { type: 'string' } },
    mainKeyword: { type: 'string' },
    beforeTitle: { type: 'string' },
    beforeHeadings: { type: 'array', items: { type: 'string' } },
  },
  required: ['summary', 'priorityActions', 'mainKeyword', 'beforeTitle'],
}

const CONTENT_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    metaDescription: { type: 'string' },
    articleHtml: { type: 'string' },
    changesSummary: { type: 'string' },
  },
  required: ['title', 'metaDescription', 'articleHtml'],
}

// Deterministic guardrail: enforced in code, not in the prompt.
function lint(c) {
  const problems = []
  if (/^#post_/.test(c.metaDescription)) problems.push('placeholder meta description')
  if (c.metaDescription.length < 140 || c.metaDescription.length > 155) problems.push('meta length')
  if (/<h1[\s>]/i.test(c.articleHtml)) problems.push('h1 in body')
  return problems
}

const auditStage = item =>
  agent(`Audit ${item.url}. Data:\n${item.gsc}`, {
    agentType: 'seo-audit', phase: 'Audit', schema: AUDIT_SCHEMA,
  }).then(audit => ({ item, audit }))

const optimiseStage = async ({ item, audit }) => {
  const content = await agent(`Rewrite using findings:\n${JSON.stringify(audit)}`, {
    agentType: 'content', phase: 'Optimise', schema: CONTENT_SCHEMA,
  })
  const problems = lint(content)
  if (problems.length) throw new Error(`Lint failed: ${problems.join(', ')}`)
  return { item, audit, content }
}

const publishStage = async ({ item, audit, content }) => {
  const [published, changelog, doc] = await parallel([
    () => agent(`Update post ${item.postId} with new body and SEO meta`, { agentType: 'wordpress', phase: 'Publish' }),
    () => agent('Write before/after changelog', { phase: 'Publish' }),
    () => agent('Create review document from the final draft', { phase: 'Publish' }),
  ])
  return { item, published, changelog, doc }
}

// pipeline(): each article advances as soon as its previous stage completes.
const results = await pipeline(args, auditStage, optimiseStage, publishStage)

// One tracker write after the barrier, to avoid concurrent read-modify-write.
await agent(`Update the tracker for the whole batch:\n${JSON.stringify(results)}`, { phase: 'Publish' })
return results
