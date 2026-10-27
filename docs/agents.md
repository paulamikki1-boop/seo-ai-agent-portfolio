# Agents and skills

| Agent / skill | Role | Tools | Model |
|---|---|---|---|
| `seo-audit` | Audit an article for intent, CTR, coverage and gaps; never edits | Read, web search/fetch, WordPress read tools | Sonnet |
| `content` | Write new articles or optimise existing ones from GSC data | Read/Write/Edit, web | Sonnet |
| `localisation` | Translate and localise into a target language and market, with 3 modes (translate, integrate keywords, localised enhancement) | Read/Write/Edit, web | Sonnet |
| `wordpress` | Mechanical WordPress read/write, SEO meta, categories and tags | WordPress MCP tools only | Sonnet |
| `sheet-updater` | Maintain the master tracker row per article | Google Sheets | Haiku |
| `quick-summarizer` | Cheap lookups: summarise a file, extract keywords | Read | Haiku |
| skill `article-google-doc` | Final draft to a standard-layout Google Doc, link back to tracker | Drive | n/a |
| skill `wp-duplicate-and-revert` | Fork a post to a new slug and restore the original | WordPress, Python script | n/a |

## Prompt design patterns used

- Explicit **role + inputs + boundaries** ("not for X, hand off to Y") so routing is reliable.
- **Load references first**: the agent reads its rules and market reference files before acting.
- **Per-language reference libraries** for localisation (rules, blog register, keywords).
- **Hard rules** for the failure modes found in production, written as checks.
