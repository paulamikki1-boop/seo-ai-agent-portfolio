# The workflow: audit, optimise, publish

Input: a list of articles (URL, or post ID, or a full object with market, GSC and Semrush files).

1. **Resolve.** Infer the WordPress site from the URL prefix and look up the post ID if not given.
2. **Load data.** Parse GSC and Semrush exports and the market's keyword workbook into plain text for the agents.
3. **Audit.** Read-only agent returns schema-checked findings: priority actions, title and meta options, keyword and content gaps, FAQ ideas, and the exact "before" state.
4. **Optimise.** Content agent rewrites using the findings and the keyword library. The script then post-processes the HTML: strips image placeholders, forbids body `<h1>`, converts FAQ pairs to the SEO plugin's FAQ schema block.
5. **Lint.** Pre-publish checks catch placeholder meta, over-length descriptions and missing target keyword.
6. **Publish** (three tasks in parallel): update the live post and SEO meta, write a changelog, create a Google Doc.
7. **Track.** One agent call updates the master sheet for the whole batch.
8. **Human review** of the diff and the live page.

See [examples/workflow-skeleton.js](../examples/workflow-skeleton.js) for the generic pattern.
