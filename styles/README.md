# styles/

The eleven built-in style families are documented together in [`references/style-taxonomy.md`](../references/style-taxonomy.md) — that's the file the skill actually reads.

This directory holds `_template.md`, the shape a **new** family should follow. To add one: copy the template to `<kebab-case-name>.md` in this folder, fill it in, and add one line for it to the list in `style-taxonomy.md`. No change to `SKILL.md` or `schema/theme.schema.json` is needed — the schema's `meta.styleFamily` field is a free-text string by design, and the generation steps in `SKILL.md` reference the taxonomy file, not a hardcoded list.
