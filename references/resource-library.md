# Open-source resource library

Amara's token system tells you *what* to build (a color scale, a type pairing, an icon language). This file is *where to actually get it* — real, checkable, mostly-open-source assets, organized as the same kind of taxonomy a designer's own bookmark list would use. Every entry is tagged with its real license, not just "free," because "free to use" and "open source" are different claims and this repo cares about the difference (see the MIT `LICENSE` at the repo root, and `input-modes.md`'s rule against reproducing proprietary assets).

**License key** — `OSI` = a real OSI-approved open-source license (MIT/Apache-2.0/ISC/BSD, etc. — free to use, modify, and redistribute, including commercially). `OFL` = SIL Open Font License (open source, font-specific, near-zero restriction). `CC0` = public domain, no attribution required. `Free` = no cost and broad usage rights, but *not* an open-source license — read the specific terms before redistributing the asset itself. `Freemium` = a free tier exists but the tool/library itself isn't open — usable for the workflow, not for embedding.

## Each category is a customizable dimension, not a fixed default

Every row below is Amara's *default suggestion*, not a locked choice. Any of them can be swapped with the same targeted-override syntax described in `input-modes.md` ("use Tabler instead of Phosphor for icons," "swap the illustration source to Storyset") — the swap only touches that one dimension's entry in `resources` (see the schema addition below), nothing else regenerates.

---

## A. Dimensions that map directly into `theme.json`

These have a home in `schema/theme.schema.json`'s optional `resources` block — populate it with `{name, url, license, note}` per dimension so the choice is part of the machine-readable output, not just a suggestion in prose.

### Fonts
| Pick | License | Notes |
|---|---|---|
| [Google Fonts](https://fonts.google.com) | OFL (per family) | Default source across all four `/examples`. Huge range, easy pairing, CDN or self-host. |
| [Fontshare](https://www.fontshare.com) | Free (per-family terms vary, many OFL) | Smaller, more distinctive catalog — good when a style family wants to avoid the most-common Google Fonts picks. |
| [Font Squirrel](https://www.fontsquirrel.com) | Mostly OFL/Free, filterable by commercial-use | Useful for self-hosted `@font-face` kits without a Google Fonts CDN dependency. |

Maps to `typography.families`. Never substitute a font whose license restricts commercial or app-embedded use — check the specific family's license, not just the host site's general claim.

### Colors (tooling, not a source of truth — the palette itself comes from `color-theory.md`)
| Pick | License | Notes |
|---|---|---|
| [Coolors](https://coolors.co) | Free tool | Palette generation/export; good for validating a harmony-model pick visually before committing hex values. |
| [Accessible Color Matrix](https://jxnblk.com/colorable) / [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker) | Free tool | Use during the mandatory contrast pass in `qa-checklist.md` — don't eyeball AA. |

### Icons
| Pick | License | Notes |
|---|---|---|
| [Lucide](https://lucide.dev) | OSI (ISC) | Default for Swiss/Minimalist — consistent 1.5–2px stroke, no fill, actively maintained fork of Feather. |
| [Phosphor Icons](https://phosphoricons.com) | OSI (MIT) | Default for Claymorphism/Maximalist — six weights including a rounded/duotone option, widest expressive range. |
| [Tabler Icons](https://tabler.io/icons) | OSI (MIT) | 5,000+ icons, very consistent grid — good fallback whenever the other two are missing a specific glyph. |
| [Iconoir](https://iconoir.com) | OSI (MIT) | Slightly more geometric/technical feel — reasonable Brutalism pick when Tabler feels too soft. |
| [Heroicons](https://heroicons.com) | OSI (MIT) | Solid/outline pair from the Tailwind team — easiest zero-config pairing if the output adapter is Tailwind. |

Maps to `iconography.setReference`. Pick one set system-wide — mixing icon sets is the single most common consistency-audit failure in `qa-checklist.md` #4.

### Icon fonts
Prefer inline SVG (via one of the sets above) over icon fonts — SVG themes per-token via `currentColor`/CSS variables, works with screen readers without extra `aria-hidden` bookkeeping, and doesn't suffer the FOIT/tofu-square flash icon fonts are prone to. If a host project already depends on an icon font, [Font Awesome Free](https://fontawesome.com) (OSI/CC-BY, free subset) is the most broadly compatible option — note that Font Awesome's *Pro* tier is not open source, only the Free subset is.

### Logos & favicons
These are almost always custom, not sourced — a generic agent needs its own persona mark (see `agent-states.md`'s avatar-as-state-machine). Tooling, not assets:
| Pick | License | Notes |
|---|---|---|
| [RealFaviconGenerator](https://realfavicongenerator.net) | Free tool | Generates the full favicon/touch-icon/manifest set from one source mark — use once the avatar's `idle` state is finalized. |
| [Simple Icons](https://simpleicons.org) | OSI (CC0/MIT dual) | Third-party brand marks (e.g. a "connected to Slack" indicator) — never for the agent's own identity, only for referencing an external product/integration by its actual logo. |

### Illustration, stock photography, mockups (onboarding/empty states)
| Pick | License | Notes |
|---|---|---|
| [unDraw](https://undraw.co) | OSI-adjacent (MIT-style, fully open, recolorable) | Best default — flat-illustration style, recolor to match any palette, matches the "no literal brand assets" rule cleanly since it was built to be themed. |
| [Open Peeps](https://www.openpeeps.com) | CC0 | Hand-drawn people illustrations — good fit for Claymorphism/Playful empty states. |
| [Pexels](https://www.pexels.com) / [Unsplash](https://unsplash.com) | Free (own license, not OSI — broad usage rights, no attribution required, but not redistributable as a competing stock library) | Stock photography for onboarding hero imagery, if the style calls for photographic (not illustrated) treatment. |
| [Streamline / Ouch (Icons8)](https://icons8.com/illustrations) | Freemium (free tier has attribution or usage caps) | Wider illustration variety — check the specific pack's terms before use, several require attribution on the free tier. |

### Stock video, music & sound effects (notification sounds, onboarding loops)
| Pick | License | Notes |
|---|---|---|
| [Pixabay](https://pixabay.com) (video + audio) | Free (Pixabay License — broad rights, no attribution required) | Reasonable default for a background-task-complete chime or an onboarding hero loop. |
| [Coverr](https://coverr.co) | Free | Short looping video clips, good for a full-app empty-state background. |
| [Freesound](https://freesound.org) | Mixed — filter to CC0 explicitly | Largest sound-effect library, but licenses vary per upload — always filter by CC0 before using anything from here in a shipped product. |

### Vectors & clip art
Covered by the icon and illustration entries above — a separate generic clip-art source usually reads as off-system next to a generated token set. If genuinely needed, [SVG Repo](https://www.svgrepo.com) is filterable by license (filter to MIT/CC0/PD only).

---

## B. Output-adapter dimensions — where the tokens become code

These map to `references/platform-and-output.md`'s three adapters. Pick per the user's actual target stack; don't default to React/Tailwind if the request doesn't call for it.

### CSS frameworks (for the plain HTML/CSS/JS adapter, if a base reset/utility layer is wanted)
| Pick | License | Notes |
|---|---|---|
| [Open Props](https://open-props.dev) | OSI (MIT) | CSS custom-property primitives — closest philosophical match to Amara's own token-first approach, easy to seed from `theme.json` directly. |
| [Tailwind CSS](https://tailwindcss.com) | OSI (MIT) | Utility-first — the React/Tailwind adapter's natural target; `tailwind.config` extension generation described in `platform-and-output.md`. |
| [Pico CSS](https://picocss.com) | OSI (MIT) | Classless/semantic-HTML-first — useful for a fast, low-JS agent settings page rather than the widget itself. |

### CSS methodologies (naming/structure discipline, not a library)
BEM, ITCSS, and SMACSS remain the most-cited conventions for keeping component-scoped CSS from colliding at widget scale — worth adopting whichever the host codebase already uses rather than introducing a fourth convention.

### CSS & JS animation libraries
| Pick | License | Notes |
|---|---|---|
| [Animate.css](https://animate.style) | OSI (MIT) | Class-based CSS animations — fine for `micro-interaction` tier, respects `prefers-reduced-motion` if you gate the class application, not automatically. |
| [Motion (Framer Motion successor)](https://motion.dev) | OSI (MIT) | JS-driven, React-first — best fit when the output adapter is React and the avatar state machine needs orchestrated multi-step transitions. |
| [anime.js](https://animejs.com) | OSI (MIT) | Framework-agnostic, lightweight — good default for the plain HTML/CSS/JS adapter's `micro-interaction`/`lottie`-adjacent needs. |
| [lottie-web](https://airbnb.io/lottie/) | OSI (MIT) | The actual Lottie *player* — pair with an animation authored in a tool below. Note this is the runtime license; individual `.json` animation files sourced from a marketplace carry their own separate license, check per-file. |

GSAP is deliberately not listed as a default here: as of its 2024 relicensing it's free to use including previously-paid plugins, but it is **not** an OSI open-source license (Webflow's custom "no charge" terms) — a legitimate pick if the user explicitly wants it, but don't default to it silently in a repo that leads with "open source."

### JS chart libraries (for rich content — a message containing a data visualization)
| Pick | License | Notes |
|---|---|---|
| [Chart.js](https://www.chartjs.org) | OSI (MIT) | Simplest default, canvas-based, themes cleanly off `theme.json` color tokens. |
| [Recharts](https://recharts.org) | OSI (MIT) | React-first, composable — best pairing with the React/Tailwind adapter. |
| [visx](https://airbnb.io/visx/) | OSI (MIT) | Lower-level D3-on-React primitives — pick this over Recharts only if a chart's shape is genuinely custom. |
| [ECharts](https://echarts.apache.org) | OSI (Apache-2.0) | Heavier, but strong default when the agent needs to render dense/large datasets in-thread. |

### UI component kits, per framework

**Purpose-built for AI chat specifically — prefer these over a generic kit when the target is React:**

| Pick | License | Notes |
|---|---|---|
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) | OSI (MIT) | The best-fit default for a React target. Radix-style primitives named for exactly this domain (`Thread`, `Message`, `Composer`, `ThreadList`, `ActionBar`) with streaming, auto-scroll, retries, attachments, markdown, code highlighting, voice dictation, and accessibility already handled — theme it off `theme.json`'s tokens rather than rebuilding message-list plumbing from scratch. |
| [Vercel AI Elements](https://github.com/vercel/ai-elements) | OSI (MIT) | Built on shadcn/ui. Ships a `Reasoning`/`ReasoningTrigger` component pair that's the direct reference implementation for `components.reasoningPanel` (see `agent-states.md`), plus message/response/tool-call primitives. |
| [Crayon](https://github.com/thesysdev/openui) (Thesys) | OSI (MIT) | Built specifically for **generative UI** — an agent selecting from a catalogue of components and rendering them inline (see the Generative UI edge case in `content-and-arc.md`). Reach for this specifically when the target agent renders real interactive components, not just text/markdown. |
| [CopilotKit](https://github.com/CopilotKit/CopilotKit) | OSI (MIT) | Adds agent orchestration, shared state, and human-in-the-loop approval flows on top of the presentation layer the three above cover — the right pick when the request needs actual approval/checkpoint *logic*, not just the approval banner's visual treatment. React and Angular. |
| [chatscope/chat-ui-kit-react](https://github.com/chatscope/chat-ui-kit-react) | OSI (MIT) | Older and more established than assistant-ui, narrower scope (message list/composer only, no built-in model/tool-call plumbing) — a reasonable second option when a project wants chat-shaped components without assistant-ui's fuller streaming/tools stack. |
| [v-chat-ui](https://github.com/JamieCurnow/v-chat-ui) (Vue 3) | OSI (MIT) | The closest Vue equivalent to assistant-ui — purpose-built for AI chat (message display, input, animated response chunking) rather than a generic component kit pressed into chat duty. |

**Svelte has no equivalent chat-purpose-built kit yet** — the ecosystem's AI-chat entries are full app templates (SvelteKit + Vercel AI SDK starters), not reusable component libraries in the assistant-ui/chatscope sense. Honest gap: for a Svelte target, build directly on the generic foundations below rather than reaching for a chat-specific kit that doesn't exist yet — worth rechecking periodically, this is the kind of gap that closes fast.

**Generic foundations — fine for any framework, or when a chat-specific kit isn't available for the target:**

| Framework | Pick | License |
|---|---|---|
| React | [shadcn/ui](https://ui.shadcn.com) | OSI (MIT) — copy-in components, not a runtime dependency, which fits Amara's token-file-as-source-of-truth model well |
| React | [Radix UI](https://www.radix-ui.com) (unstyled primitives) | OSI (MIT) |
| Vue | [PrimeVue](https://primevue.org) | OSI (MIT) |
| Vue | [Naive UI](https://www.naiveui.com) | OSI (MIT) |
| Angular | [Angular Material](https://material.angular.io) | OSI (MIT) |
| Angular | [ng-zorro](https://ng.ant.design) | OSI (MIT) |
| Svelte | [Skeleton](https://www.skeleton.dev) | OSI (MIT) |
| Svelte | [Svelte Material UI](https://sveltematerialui.com) | OSI (MIT) |
| React Native | [React Native Paper](https://reactnativepaper.com) | OSI (MIT) |
| React Native | [Tamagui](https://tamagui.dev) | OSI (MIT), cross-platform incl. web |

None of these are style-family-specific — they're unstyled or lightly-styled foundations that the generated `theme.json` tokens theme on top of, not a source of the visual system itself.

---

## C. Process & workflow resources — not embedded in `theme.json`, useful while designing

### Design systems & style guides (inspiration input for reference-mode, never literal reproduction)
[Material Design 3](https://m3.material.io), [Carbon Design System](https://carbondesignsystem.com) (IBM, OSI-licensed source), [Atlassian Design System](https://atlassian.design), [Polaris](https://polaris.shopify.com) (Shopify) — all genuinely open-source-published systems worth reading for how they document agent-adjacent states (loading, empty, error), even though none are chat-agent-specific. Extract *approach*, not literal components, per the reference-mode rule in `input-modes.md`.

### AI-interaction research (not visual style — the behavioral rules `agent-states.md` is built on)
[Microsoft HAX Toolkit](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/) (free, publicly published — 18 guidelines for human-AI interaction, plus a Design Patterns library and a Playbook for testing likely failure scenarios) and [Google PAIR's People + AI Guidebook](https://pair.withgoogle.com/guidebook-v2/) (free, publicly published — 23 patterns covering Mental Models, Explainability + Trust, Feedback + Control, Errors + Graceful Failure) are the two most-cited frameworks for exactly the problem `agent-states.md` addresses: presence, trust, graceful failure, and behavior that changes appropriately over the life of a relationship with an agent. Read these before inventing a new agent-state pattern from scratch — there's a reasonable chance one of the 41 combined guidelines already covers it.

### Online design tools
[Penpot](https://penpot.app) — fully open source (OSI, MPL-2.0), the only genuinely open-source option in this row and worth defaulting to when a user wants to hand-tune the generated system visually. [Figma](https://figma.com) has a usable free tier but is proprietary/closed-source.

### Downloadable design software
[GIMP](https://www.gimp.org) and [Inkscape](https://inkscape.org) — both OSI-licensed (GPL), the open-source counterparts to Photoshop/Illustrator for any raster/vector touch-up the generated system needs.

### Design inspiration
[Mobbin](https://mobbin.com) and [Land-book](https://land-book.com) for real shipped-product screenshots — useful for reference-mode input, but note neither is an open-source resource itself, and screenshots sourced from them fall under the same "extract characteristics, never reproduce" rule as any other reference.

### Image compression
[Squoosh](https://squoosh.app) (Google, OSI/Apache-2.0) — run any raster asset (avatar export, illustration) through this before shipping, to keep the performance budgets in `system-defaults.md`.

### Browser extensions (design QA, not asset sourcing)
[WhatFont](https://chrome.google.com/webstore) and [ColorZilla](https://www.colorzilla.com) — useful for auditing a *reference* site's actual type/color choices during reference-mode input, not for the generated output itself.

### AI graphic design tools
Deliberately not defaulted to. Most (Looka, Recraft, etc.) are proprietary SaaS with their own generated-asset licensing terms that need independent review — inconsistent with this repo's open-source-first posture. If a user explicitly wants one in their pipeline, that's a workflow choice outside Amara's scope, not a default recommendation.

### Others — HTML & CSS templates
Not recommended as a starting point for a generated system: a templated shell tends to fight the token-first approach (`platform-and-output.md`) rather than accept it. If the user is retrofitting Amara tokens onto an existing template, treat the template as the constraint and adapt the token output to it, not the reverse.
