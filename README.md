# Amara

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Amara** generates professionally-designed, cohesive UI systems for always-on AI chatbots and agents — from the collapsed widget bubble through the full open-thread state. It's a portable Skill (`SKILL.md` format) that works with Claude Code, Claude.ai, Cursor, Windsurf, and GitHub Copilot. Amara itself is MIT-licensed, and it defaults to recommending genuinely open-source assets (fonts, icons, UI kits, and more) rather than proprietary ones — see [Open-source resource library](#open-source-resource-library) below.

### Why "Amara"

From the Greek *amarantos* — "unfading," the root of *amaranth*, the mythical flower that never withers. That's the goal for what this skill produces: a system built to hold up past the first demo, not one that reads as dated the moment the next design trend rolls through. Concretely, that means every generation is held to a stated design principle, actively simplified before it ships, and checked against accessibility and consistency rules that don't bend for a given style's aesthetic — the same discipline whether the output is Swiss-minimal or maximalist.

## What it does

Amara's *specialty* is **conversational AI interfaces** — chat widgets, agent dashboards, always-on assistant UIs — and that's where its deepest, most differentiated work lives (`references/agent-states.md`'s approval checkpoints, presence, thinking-vs-doing distinction; none of that has an equivalent in a general design tool). But the *method* underneath that specialty — divergent-concept generation before narrowing, a real verified token system, an honest self-critique pass — isn't chat-specific, and generalizes to any UI. See [`/showcase`](showcase/) for that method applied outside chat entirely. Point it at a reference, a vibe, or let it walk you through a short wizard, and it produces:

- A framework-agnostic **design-token JSON** (`theme.json`) — color, typography, spacing, motion, iconography, and a full **agent-state component set**: presence indicators, thinking-vs-doing distinction, an approval/checkpoint UI that outranks everything else on screen, background-task notifications, error states designed to read as trustworthy rather than alarming.
- Optional adapters emitting that token file as **React/Tailwind**, **plain HTML/CSS/JS**, or a **theme-config object** for existing chat-widget SDKs — the point at which "AI-generated design" becomes something you can actually ship.
- A **self-critique QA pass** run automatically before anything is presented: contrast checks, spacing/type-scale discipline, a consistency audit, and confirmation that at least one thing was deliberately cut from the first draft. The contrast and spacing/type-scale checks aren't just described in prose — `scripts/check-contrast.js` and `scripts/check-tokens.js` mechanically recompute them from the actual token values and rendered CSS, so a passing QA claim is independently verifiable rather than self-reported. See [Verification tooling](#verification-tooling) below.

See it applied across ten style tiers in [`/examples`](examples/) before installing, and two favorites below.

## A couple of favorites

**[Futuristic white/glass chatbot](examples/futuristic-white-glass/)** — cool brushed-chrome + glass, warm rose-gold reserved for exactly two moments, and a genuinely three-dimensional avatar: a real CSS `rotateY` orb you can drag, released with a hand-rolled damped-spring integrator (an actual numerical simulation of the mass-spring-damper equation, not an eased CSS transition standing in for one). Fully schema-conformant — this is what Amara's chatbot pipeline actually produces end to end, contrast-verified and token-scale-verified like every other `/examples` entry.

**[Water bottle landing page](showcase/waterbottle-landing/)** — a marketing site, built to test the same underlying method (real typographic pairing, a verified color system, one deliberately-cut element) outside Amara's chat-specific schema entirely. Real IntersectionObserver scroll-reveal, a pointer-driven product tilt, and an animated liquid surface drawn frame-by-frame from an actual sine function, not a looping GIF. Lives under `/showcase`, not `/examples`, because it doesn't use `theme.schema.json` — that schema's required components (avatar states, approval banners) don't apply to a page with no agent in it. Same craft bar, honestly different shape of deliverable.

## Prior art, and why the MIT license here is safe

Amara's agent-state design (`references/agent-states.md`) is grounded in published research and real shipping open-source projects rather than invented from scratch: Microsoft's [HAX Toolkit](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/), Google's [People + AI Guidebook](https://pair.withgoogle.com/guidebook-v2/), and open-source libraries like [assistant-ui](https://github.com/assistant-ui/assistant-ui), [Vercel AI Elements](https://github.com/vercel/ai-elements), [Crayon](https://github.com/thesysdev/openui), and [CopilotKit](https://github.com/CopilotKit/CopilotKit).

That influence stays at the *idea* level, on purpose, and the same rule governs it that governs everything this skill generates for you (`references/input-modes.md`'s reference-mode rule): **extract characteristics, never reproduce.** Concretely, for this repository itself:

- **No third-party source code is vendored.** Every mention of an external project above is a name, a link, and a one- or two-sentence description of the *pattern* it demonstrates (e.g. "a collapsible reasoning panel," "a nudge that silences itself if ignored") — never a copied code block, copied CSS, or copied component implementation. Where Amara names an external library as a recommended resource (`references/resource-library.md`), that's a pointer for *you* to separately install it under its own license — Amara doesn't bundle it.
- **No proprietary visual designs are reproduced.** References to closed products (e.g. Intercom's Fin) are drawn only from their own public design writing about *patterns*, never from screenshotting or recreating their actual interface, copy, or branding.
- **Every third-party resource is license-tagged, not assumed.** `resource-library.md` marks each pick `OSI` / `OFL` / `CC0` / `Free` / `Freemium` — checked per project, not inferred from "it's on GitHub." If a license couldn't be verified, it isn't asserted as open source.
- **The MIT `LICENSE` at this repo's root covers Amara's own original content only** — the prose in `SKILL.md` and `references/`, the JSON in `schema/` and `examples/`, the HTML in `examples/`. It says nothing about, and doesn't need to say anything about, the separate licenses of tools you choose to install from the resource library — each of those remains governed by its own project's license, same as any dependency in any software project.

If you ever spot something in this repo that reads as more than an idea-level citation — a suspiciously specific class name, a copied color value that traces to a real product rather than one of Amara's own generated palettes — flag it; that would be a bug in how this repo was built, not an accepted tradeoff.

## Verification tooling

Two of the QA checklist's items (`references/qa-checklist.md` #1 and #2) are backed by scripts under `scripts/`, run as real commands during Step 6 of `SKILL.md`, not eyeballed:

- **`node scripts/check-tokens.js <theme.json> <preview.html>`** — parses the rendered CSS, extracts every padding/margin/gap and font-size value actually used, and fails if any value isn't traceable to `spacing.scale` or `typography.scale`. Support an `--exclude=selector,...` flag for skipping documentation-page chrome (intro text, token-strip demos) that isn't part of the generated system itself.
- **`node scripts/check-contrast.js <theme.json>`** — reads `a11y.contrastReport`, independently recomputes each pairing's contrast ratio from its literal hex values using the real WCAG relative-luminance formula, and fails if the recomputed ratio doesn't match the claimed one (or if a pairing can't be checked because it's recorded as token names only, with no hex values to verify against).

Both exit non-zero on failure, so they're CI-friendly. They exist because "the checklist says contrast was checked" and "contrast was actually, verifiably checked" are different claims — the first is easy to assert and easy to get wrong quietly; the second only holds if something recomputes it. Every `theme.json` under `/examples` passes both.

## Open-source resource library

Every dimension of a generated system — icon set, font source, illustration/stock source, CSS framework, chart library, per-framework UI kit (React/Vue/Angular/Svelte/React Native) — is a **customizable pick**, not a hardcoded default. [`references/resource-library.md`](references/resource-library.md) curates real options across all of them (plus process resources: design tools, image compression, browser extensions for design QA, and more), each tagged with its actual license — genuinely open-source (MIT/Apache/OFL/CC0) is preferred and defaulted-to wherever one exists; merely "free" or freemium tools are labeled as such rather than implied to be open source.

Every pick lands in `theme.json`'s optional `resources` block (`iconSet`, `fontSource`, `illustrationSource`, `chartLibrary`, `cssFramework`, `animationLibrary`, `uiKit.{react,vue,angular,svelte,reactNative}`) — see any of the `/examples` themes for a populated one. Swap any single pick with the same targeted-override syntax used for any other token ("use Tabler instead of Phosphor for icons," "swap the illustration source to Storyset") without touching the rest of the system.

## What it's honestly good for — and not

Amara produces a strong, systematic, accessible **starting point** — dramatically better than the generic card-grid, purple-gradient output that "just build me a chatbot UI" tends to produce from an unguided prompt. It gets you a coherent token system, real typographic pairing, and agent-state design that most people forget to think about until an approval checkpoint gets buried under a chat bubble in production.

It is **not** a replacement for a designer's final judgment on a shipped product. Treat its output as a serious first draft: verify it against your actual brand constraints, your actual users, and a real accessibility audit before it goes live — the same way you'd treat a strong draft from a skilled contractor rather than a finished, signed-off deliverable.

**Known limitation:** the color-association and iconography defaults baked into the style taxonomy (see `references/color-theory.md`) are drawn from Western commercial design convention. Color and symbol meaning varies significantly by culture and region — Amara does not currently localize these defaults, and treats that as an open gap rather than a solved problem. If you're designing for an audience outside a Western-commercial context, use every "soft default" in this repo as a prompt to check, not an answer to trust.

## Install

Amara is a single skill directory. Drop it wherever your tool looks for skills:

```bash
git clone https://github.com/Pooja-Yogeshwaran/Amara.git
```

- **Claude Code / Claude.ai:** copy or symlink the `amara/` folder into your project's or user-level skills directory, so `SKILL.md` is discoverable.
- **Cursor / Windsurf:** point your tool's custom-instructions or rules-file mechanism at `amara/SKILL.md`, per that tool's skill/rule-import convention.
- **GitHub Copilot:** reference `amara/SKILL.md` from your repo's Copilot instructions file.

No build step, no dependencies — `SKILL.md` plus the linked reference files under `references/` are plain Markdown, and `schema/theme.schema.json` is plain JSON Schema.

## Repo structure

```
amara/
├── LICENSE                      MIT
├── SKILL.md                     entry point — the elicitation flow and generation steps
├── schema/
│   └── theme.schema.json        the token schema: primitive → semantic → component → resources layers
├── references/                  detail SKILL.md links out to, loaded as needed
│   ├── visual-vocabulary.md     gradients/textures/patterns/layout paradigms — raw material read BEFORE the taxonomy, so it names rather than generates
│   ├── style-taxonomy.md        the 11 style families, as one continuous spectrum
│   ├── color-theory.md          harmony models, 60/30/10, contrast-first generation
│   ├── agent-states.md          presence, thinking-vs-doing, approval checkpoints, error states
│   ├── motion-icon-tiers.md     static → micro-interaction → lottie → gif → video-loop
│   ├── input-modes.md           reference / vibe / wizard / override — composable, not exclusive
│   ├── system-defaults.md       trust signals, session chrome, perf budgets — inferred, overridable
│   ├── content-and-arc.md       tables/code/streaming edge cases + the onboarding→routine-use arc
│   ├── qa-checklist.md          the required self-critique pass, run before every output
│   ├── platform-and-output.md   widget/app/mobile layout rules + the three output adapters
│   └── resource-library.md      open-source/free picks per dimension, license-tagged, swappable
├── scripts/                      QA checks that run as real commands, not prose
│   ├── check-tokens.js           spacing/type-scale on-grid check against rendered CSS
│   └── check-contrast.js         WCAG contrast independently recomputed from a11y.contrastReport
├── styles/
│   ├── _template.md             copy this to add a new style family
│   └── README.md
├── examples/                    the same sample chatbot across ten style tiers, each with a theme.json
│   ├── minimalist-swiss/
│   ├── claymorphism/
│   ├── brutalism/
│   ├── maximalist-editorial/
│   ├── neumorphism/
│   ├── glassmorphism/
│   ├── corporate-enterprise/
│   ├── playful-funky/
│   ├── retro-skeuomorphic/
│   └── futuristic-white-glass/
└── showcase/                    Amara's underlying method applied outside the chat-specific schema
    └── waterbottle-landing/     a marketing page, not a theme.json output -- see its README section above
```

## Adding a new style family

Style families are data, not code — `SKILL.md`'s generation steps reference `references/style-taxonomy.md` rather than hardcoding a family list, and the schema's `meta.styleFamily` field is a free-text string. To add one:

1. Copy `styles/_template.md` to `styles/<kebab-case-name>.md` and fill it in (color harmony, type pairing, shape/motion defaults, voice, any accessibility note).
2. Add one line for it to the list in `references/style-taxonomy.md`.
3. Optionally add a worked example under `/examples` in the same shape as the existing four.

No change to `SKILL.md` or `schema/theme.schema.json` required.

## Explicitly out of scope for v1

- **Multi-agent / sub-agent handoff UI.** A real and adjacent problem — a roster view, delegation transitions, per-agent presence — but not one this version solves. If asked, the skill says so rather than improvising an unvalidated pattern.
- **`theme.schema.json` conformance for non-chat UI.** The schema's required components (avatar state machine, approval banners, presence indicators) are built for conversational agents and don't map onto a marketing site's actual components (hero, nav, product grid). The underlying *method* generalizes — see `/showcase` — but there's no schema, adapters, or component library yet for general frontend work the way there is for chat. Building that out is a real, larger undertaking than adding one showcase page, not something this version claims to already solve.
- **Literal reproduction of any named brand's actual assets.** Reference-mode input extracts and re-expresses *style characteristics* (weight, proportion, rhythm, palette feel) — never a brand's logo, trademarked marks, or literal identity. See `references/input-modes.md`.

## License

[MIT](LICENSE) — Amara itself, plus everything it generates for you, is free to use, modify, and ship commercially. That covers this repo's own code and docs; it does not relicense any third-party asset you pull in from `references/resource-library.md` — each of those carries its own license, noted per entry.
