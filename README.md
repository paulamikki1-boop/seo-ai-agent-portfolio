# AI-Agent SEO Content Operations

A multi-agent workflow, built on Claude Code, that takes an existing SEO article through **audit → rewrite → publish → track** across multiple languages and markets, with a human reviewing the output.

> Built for a global trading/fintech brand's education content (multi-market, multi-language WordPress network). Company-specific prompts, data and credentials are intentionally **not** included. This repo documents the design and shows a generic skeleton.

## What it does

| Stage | Agent | Output |
|---|---|---|
| Audit | `seo-audit` (read-only) | Intent match, keyword and content gaps, CTR fixes, structure and E-E-A-T notes |
| Optimise | `content` | Rewritten article driven by GSC and Semrush data and the market's keyword library |
| Localise | `localisation` | Market-native translation (6 languages) with keyword integration modes |
| Publish | `wordpress` | Live post update via a custom REST MCP server, with SEO meta and FAQ schema |
| Track | `sheet-updater` | One row per article in a master Google Sheet (stage, WP IDs, dates) |
| Hand-off | skills | Google Doc of the final draft, changelog, tracker links |

## Highlights

- **Orchestrated pipeline.** A Workflow script runs articles in parallel, each flowing through audit, optimise and publish stages, with structured (JSON-schema) hand-offs between agents.
- **Custom MCP server** wrapping the WordPress REST API for many sites (posts, raw `context=edit` reads, SEO meta read/write).
- **Right-sized models.** Cheap model for lookups and sheet updates; stronger model where output is written to live pages.
- **Deterministic guardrails** in code rather than prompts: FAQ blocks converted to the SEO plugin's schema block, placeholder meta detection, length lint, image-marker stripping.
- **Data-grounded.** Per-country keyword workbooks and filed source exports (GSC and Semrush) feed every audit and rewrite.
- **Lessons encoded as rules.** Every production mistake became a checklist item or a lint check. See [docs/lessons-learned.md](docs/lessons-learned.md).

## Docs

- [Architecture](docs/architecture.md): diagram and design decisions
- [Agents and skills](docs/agents.md): roster, tools, model choice
- [The workflow](docs/workflow.md): stages, data flow, parallelism
- [Lessons learned](docs/lessons-learned.md)
- [Workflow skeleton](examples/workflow-skeleton.js): generic example of the pattern

## Stack

Claude Code (agents, skills, workflows), MCP (custom Node.js server), WordPress REST + AIOSEO, Google Sheets/Docs/Drive connectors, Semrush and Google Search Console exports.

## Author

Yee Ken Tai, SEO / content operations.
