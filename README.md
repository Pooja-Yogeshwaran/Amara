# Amara

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Amara is a portable Skill (`SKILL.md`) that generates cohesive, accessible UI systems for AI chatbots and agents — works with Claude Code, Claude.ai, Cursor, Windsurf, and GitHub Copilot.

## What you get

- A **design-token JSON** (`theme.json`) — color, type, spacing, motion, iconography — plus a full **agent-state component set**: presence, thinking-vs-doing, approval checkpoints, background-task notices, error states.
- Output as **React/Tailwind**, **plain HTML/CSS/JS**, or a **theme-config object** for existing chat-widget SDKs.
- Every generation runs through an automated QA pass before it ships: contrast is independently recomputed (not self-reported), spacing/type-scale is checked against the declared grid, and at least one thing is deliberately cut from the first draft. Verification lives in `scripts/` — see [Verification tooling](#verification-tooling).
- Real open-source resource picks (fonts, icons, UI kits) baked into the output, license-tagged — see [Resource library](#resource-library).

Amara's deepest, most differentiated work is chat-specific (approval checkpoints, presence, thinking-vs-doing — see [Scope](#scope)). The underlying *method* — divergent concepts before narrowing, verified tokens, an honest self-critique pass — isn't, and [`/showcase`](showcase/) applies it outside chat.

## Install

```bash
git clone https://github.com/Pooja-Yogeshwaran/Amara.git
```

- **Claude Code / Claude.ai:** copy or symlink `amara/` into your skills directory so `SKILL.md` is discoverable.
- **Cursor / Windsurf:** point your rules-file mechanism at `amara/SKILL.md`.
- **GitHub Copilot:** reference `amara/SKILL.md` from your repo's Copilot instructions file.

No build step, no dependencies.

## Examples

Same sample chatbot (thread, approval checkpoint, input bar), ten different style tiers — same craft bar, deliberately different anatomy each time, never a reskin.

| Style | Files | Video |
|---|---|---|
| Minimalist / Swiss | [theme.json](examples/minimalist-swiss/theme.json) · [preview.html](examples/minimalist-swiss/preview.html) | |
| Claymorphism | [theme.json](examples/claymorphism/theme.json) · [preview.html](examples/claymorphism/preview.html) | |
| Brutalism | [theme.json](examples/brutalism/theme.json) · [preview.html](examples/brutalism/preview.html) | |
| Maximalist / Editorial | [theme.json](examples/maximalist-editorial/theme.json) · [preview.html](examples/maximalist-editorial/preview.html) | |
| Neumorphism | [theme.json](examples/neumorphism/theme.json) · [preview.html](examples/neumorphism/preview.html) | |
| Glassmorphism | [theme.json](examples/glassmorphism/theme.json) | |
| Corporate / Enterprise | [theme.json](examples/corporate-enterprise/theme.json) | |
| Playful / Funky | [theme.json](examples/playful-funky/theme.json) | |
| Retro / Skeuomorphic | [theme.json](examples/retro-skeuomorphic/theme.json) | |
| Futuristic White/Glass | [theme.json](examples/futuristic-white-glass/theme.json) · [preview.html](examples/futuristic-white-glass/preview.html) | |
| **Water bottle landing page** *(showcase, not a chat UI)* | [index.html](showcase/waterbottle-landing/index.html) | |
| **Portfolio / dossier template** *(showcase, not a chat UI)* | [index.html](showcase/portfolio-dossier/index.html) | |

Video column is empty — drop in a recording (any screen recorder works) and it'll get embedded and committed.

## Scope

**In scope:** conversational AI interfaces — chat widgets, agent dashboards, always-on assistant UIs. This is where `theme.schema.json` and the full component set (avatar states, approval banners, presence) apply.

**Not in scope (v1):**
- Multi-agent / sub-agent handoff UI (roster views, delegation transitions) — a real, adjacent problem this version doesn't solve.
- `theme.schema.json` conformance for non-chat UI — the schema's required components are chat-agent-shaped and don't map onto a marketing site's hero/nav/product-grid needs. The method generalizes (`/showcase`); the schema doesn't yet.
- Literal reproduction of any named brand's actual assets — reference-mode input extracts *style characteristics* only, never a logo or literal identity.

## Repo structure

```
amara/
├── SKILL.md                     entry point — elicitation flow + generation steps
├── schema/theme.schema.json     the token schema
├── references/                  detail SKILL.md links out to
├── scripts/                     check-tokens.js, check-contrast.js — real QA commands
├── styles/_template.md          copy this to add a new style family
├── examples/                    ten chatbot style tiers, each a theme.json (+ preview.html)
└── showcase/                    the method applied outside chat (no theme.schema.json)
```

## Verification tooling

- `node scripts/check-tokens.js <theme.json> <preview.html>` — every spacing/font-size value used must trace to the declared scale.
- `node scripts/check-contrast.js <theme.json>` — every `a11y.contrastReport` entry is recomputed from its literal hex values via the real WCAG formula and compared against the claimed ratio.

Both exit non-zero on failure. Every `theme.json` under `/examples` passes both.

## Resource library

Every dimension (icon set, font source, illustrations, chart library, UI kit) is a swappable pick, not a hardcoded default — see [`references/resource-library.md`](references/resource-library.md), each entry license-tagged (OSI/OFL/CC0/Free/Freemium). Populated into `theme.json`'s `resources` block; swap any pick with the same override syntax as any other token.

## Honest limitations

- Not a replacement for a designer's final sign-off — treat output as a strong first draft, verify against real brand/user/accessibility constraints before shipping.
- Color and iconography defaults in `references/color-theory.md` are drawn from Western commercial convention and aren't localized — check them for non-Western-commercial audiences rather than trusting them.
- No third-party source code or proprietary visual assets are vendored — external projects cited in `references/agent-states.md` are pattern references only. See [`references/input-modes.md`](references/input-modes.md) for the reference-mode rule this follows.

## License

[MIT](LICENSE) — Amara and everything it generates for you. Doesn't relicense third-party assets pulled from the resource library — each keeps its own license.
