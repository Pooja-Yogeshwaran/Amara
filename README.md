# Amara

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Amara is a portable Skill (`SKILL.md`) that generates cohesive, accessible UI systems for AI chatbots and agents — works with Claude Code, Claude.ai, Cursor, Windsurf, and GitHub Copilot.

## What it can do

**Design tokens** — color (real harmony models, not just a hue picker), typography pairing, spacing scale, motion, iconography. Output as **React/Tailwind**, **plain HTML/CSS/JS**, or a **theme-config object** for existing chat-widget SDKs.

**Agent-specific components**, not just a themed chat box:
- Presence indicator, thinking-vs-doing distinction, optional reasoning panel
- Approval checkpoints — three different patterns chosen by stakes/reversibility (pre-action gate, post-action review + undo, bounded/scoped grant), not one generic "confirm?" modal
- Background-task notifications, trustworthy error states, memory indicator
- Optional named persona roster for products with more than one agent character

**Rich content handled explicitly**, not just tolerated — tables, code blocks, citations, streaming text, interrupted generation, images & video, and generative UI (agent-rendered charts, forms, pickers) all consume the same token system instead of bringing their own default look.

**Motion range** — static through micro-interaction, Lottie, GIF, and video-loop tiers; a real spring-physics signature interaction (an actual physics simulation, not an eased CSS transition) for one high-impact element when warranted; genuine CSS 3D/WebGL dimensionality when the brief calls for it.

**Platform and frame aware** — embedded widget, full app, or mobile layout from the same token file, plus the actual container: borderless overlay, a windowed panel with a title bar, iframe-embedded, or a native app shell.

**Personality that tapers** — highest expression at onboarding, decaying toward routine use, without going cold on failure or re-engagement after a gap.

**Five ways to brief it** — point it at a reference product, describe a vibe, run a short wizard, patch a specific token with a targeted override, or ask it to research current trends before generating.

**Automated QA before anything ships** — contrast is independently recomputed (not self-reported), spacing/type-scale is checked against the declared grid, and at least one element is deliberately cut from the first draft. See [Verification tooling](#verification-tooling).

**Real, license-tagged resources** — fonts, icons, illustrations, charts, UI kits — baked into the output. See [Resource library](#resource-library).

Amara's deepest, most differentiated work is chat-specific (the agent-state components above — see [Scope](#scope)). The underlying *method* — divergent concepts before narrowing, verified tokens, an honest self-critique pass — isn't, and [`/showcase`](showcase/) applies it outside chat.

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

**Adding a video:** record your screen with any recorder (Windows: Win+G / Xbox Game Bar; Mac: Cmd+Shift+5) while opening a `preview.html`/`index.html` file above, then send the recording to me in chat — I'll save it under `docs/previews/<style-name>.<ext>`, embed it in the table row above, and commit + push both. GIF autoplays inline on GitHub without a click; MP4 needs a click to play, so GIF is the better fit for a table cell if the file size stays reasonable.


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

## License

[MIT](LICENSE) — Amara and everything it generates for you. Doesn't relicense third-party assets pulled from the resource library — each keeps its own license.
