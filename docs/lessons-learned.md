# Lessons learned

Each item below caused a real defect once, and is now a rule or a lint check.

- **Send SEO title and description together.** A description-only update reset the title.
- **Placeholders are not values.** Template tokens such as the plugin's excerpt placeholder must never be live meta; lint for them.
- **Use the plugin's own FAQ block.** Plain headings render fine but lose FAQ rich-result eligibility.
- **Never rebuild a post from rendered HTML.** Read the raw editor content, back up the old body, and diff the result.
- **Do not infer the target keyword from the title.** Take it from the audit or the changelog.
- **Report what could not be done.** Some fields (noindex, canonical) are not writable via the API; say so instead of ticking the box.
- **Cheaper is not always better.** A smaller model was trialled for the publish agent and reverted because large HTML writes to live posts need the stronger model.
- **Stale reads are not failed writes.** Treat the write response as the confirmation, not a follow-up GET.
- **Serialize writes to shared files.** Parallel agents racing on one sheet overwrite each other.
