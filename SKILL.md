---
name: amara
description: 'Generates professionally-designed, cohesive UI systems — for always-on AI chatbots and agents (widget bubble through full open-thread state, with agent-state components: presence, thinking-vs-doing, approval checkpoints) AND for general web/app UI (marketing sites, portfolios, dashboards, landing pages) using the same breadth-first, token-driven, self-critiquing process. Produces a framework-agnostic design-token JSON (color, type, spacing, motion, plus agent-state components where relevant) plus React/Tailwind, plain HTML/CSS/JS, or chat-widget-SDK outputs. Use when asked to design, theme, or restyle an AI chat widget, agent dashboard, or conversational assistant interface ("design a UI for my chatbot", "give this agent an approval/checkpoint UI") — and equally when asked to design a website, portfolio, landing page, or general app UI ("build me a personal site", "design a dashboard", "make this landing page less generic").'
---

# Amara — UI design system generator

Amara designs UI systems end to end: token system, layout, motion, and a self-critique pass, for two kinds of surface — conversational AI interfaces (chat widgets, agent dashboards, always-on assistants) and general web/app UI (sites, portfolios, dashboards, landing pages). The shared process — breadth before narrowing, verified tokens, honest self-critique — runs the same way for both. What differs is the component library each branch draws from at Step 4.

## Read this before anything else

You are not populating a schema. Every step below produces JSON fields and rendered markup, and it is entirely possible to fill in every one of them correctly — valid contrast ratios, a real type pairing, a coherent spacing scale, every QA check green — and still ship something generic, because none of those checks measure whether the design has a point of view specific to *this* request. A mechanically correct system and a good one are different achievements, and this skill has a documented history of producing the first without the second: reskinning the identical panel-header-thread-input anatomy across every style family with only colors and fonts swapped, and defaulting to blue as an accent often enough that it stopped reading as a decision. Both passed every check that existed at the time. Neither was actually designed.

The steps below still matter — contrast math, license verification, schema structure are not optional rigor — but they are mechanics in service of a decision, not a substitute for making one. Do Step 0 for real before touching any of them.

## Step -1 — Route: chat/agent surface, or general web/app surface?

Before anything else, decide which branch this brief belongs to:

- **Chat/agent branch** — the brief is a conversational interface: a chat widget, an agent dashboard, an always-on assistant, anything with a message thread or an agent taking actions on the user's behalf. Proceed through Step 4's agent-state components (`references/agent-states.md`) as the differentiated core.
- **General-web branch** — the brief is a site, portfolio, landing page, dashboard, or app surface with no message thread or autonomous-agent behavior. Proceed through Step 4's general-web components (`references/general-web.md`) instead.

Say which branch you're on, briefly, before Step 0 — one sentence is enough. If a brief genuinely has both (e.g., a product site *with* an embedded chat widget), run both component sets at Step 4 rather than forcing a single branch.

## Step 0 — Understand the specific brief, out loud, before generating anything

Restate the request in your own words, briefly, before producing a single token. For the chat branch: who is this agent, what does it actually do, who's on the other end of the conversation, and what makes this different from a generic "chatbot UI"? A support bot for a fintech app, a brainstorming companion for a design team, and an on-call incident agent are not the same brief just because they're all "an AI chat widget." For the general-web branch: what's the subject, who's the audience, and what's this page's single job? If your design-principle statement from Step 3 could be copy-pasted onto a different, unrelated request without anyone noticing, you haven't finished this step.

Then name the single most obvious, most expected answer this brief would get from a hundred other tools — the color everyone reaches for, the layout everyone ships. Naming it isn't optional: you cannot deliberately avoid a default you never identified. This is necessary but **not sufficient** — see Step 1 for why avoiding one obvious answer still isn't the same as designing something genuinely wide-ranging.

**When the brief itself is generic, that's a harder case, not an exemption.** "Make it cute," "just make it look nice," "build me a portfolio site" give you nothing specific to react against — but two different people who both said something that vague should not reliably get the same result back. Use whatever *is* available (a name, a product, one adjective, an industry, the actual content/subject matter) as the anchor for a specific, committed decision anyway.

## Step 1 — Generate real breadth before narrowing, using `references/visual-vocabulary.md`

Applies identically to both branches. This is the step that actually prevents genericness, and it's a different mechanism from "resist the obvious answer" in Step 0 — resisting one default is a binary check that stops you from picking the *worst* answer, but nothing about it stops you from converging on a second, narrower default over many generations (this is exactly what happened in this repo's own history: "always blue" got fixed, and the fix converged on jewel-tone wine-and-gold for every subsequent "confident/bold" request, because that became the one worked example on file — the same failure wearing a new palette).

Before touching `style-taxonomy.md`, read `references/visual-vocabulary.md` and generate — briefly, internally — **at least three genuinely different directional concepts** for this specific brief. "Genuinely different" means differing in more than a hex value: pull each concept from a different combination of that file's rows (a different gradient/texture approach, a different color-theory move, a different layout paradigm). Reject two, keep one (or synthesize across parts of them), and record what was rejected and why in `meta.generatedFrom`. **Do not reuse a color palette, font pairing, or anatomy pattern from a previous generation — in this session, or from this repo's own `/examples` — unless this specific brief actually warrants the same choice.** A worked example anywhere in this repo illustrates a mechanism for one past request. It is not a library to reach for.

**Color and texture are not the only rows to draw from.** Motion-feel and dimensionality are just as much raw material. At least one of the three concepts generated here should genuinely explore what real motion or a dimensional/3D treatment would do for this specific brief, even if the concept ultimately chosen ends up static.

For calibration on the general-web branch specifically: AI-generated web design right now clusters around three looks — (1) warm cream background with a high-contrast serif and a terracotta accent, (2) near-black background with a single bright acid-green or vermilion accent, (3) broadsheet-style hairline rules and dense newspaper columns. All three are legitimate for some briefs, but they're defaults rather than choices, and appear regardless of subject — where the brief leaves an axis free, don't spend that freedom on one of these by default.

## Step 2 — Parse input across all five modes

Read `references/input-modes.md` in full before parsing a request. The five modes (reference-based, vibe/adjective-based, guided wizard, granular override, trend-aware/live research) are **composable** and apply to both branches — a portfolio brief with a reference URL and a vibe word blends reference mode and vibe mode exactly the way a chat-widget brief would.

- A named reference, URL, or screenshot → reference mode. Extract style *characteristics* only — never reproduce actual brand assets or trademarked identity.
- Adjectives/vibe words with no reference → vibe mode, informed by (not generated from) `references/style-taxonomy.md`.
- No strong signal at all → run the 4-question guided wizard from `references/input-modes.md`.
- Precise token-level asks → override mode, patching a specific dot-path without regenerating untouched siblings.
- "What's trending" or anything implying the built-in picks might be stale → trend-research mode: live web research before generating.

## Step 3 — Name the result on the style spectrum; the taxonomy describes, it does not generate

Read `references/style-taxonomy.md`. Eleven anchor families span one continuous spectrum, and this applies to general-web briefs just as much as chat ones — a portfolio site can land on Neumorphism or Brutalism exactly like a chat widget can. Locate roughly where the Step 1 concept sits — often between two named families, sometimes not close to any of them, which is fine and worth saying explicitly. Use the matched family only for: sensible defaults on dimensions the brief genuinely didn't touch, shared vocabulary, and QA cross-checks. If Step 1 already made a specific, considered choice on a dimension, the family default doesn't get to override it just for being the default.

Write the 2-3 sentence design-principle statement now, specific enough that it fails the copy-paste test from Step 0. This goes in `meta.designPrinciple` and leads the user-facing response.

## Step 4 — Build the token system as a series of decisions, not a series of fields

Populate `schema/theme.schema.json`'s structure. Items 1-4 and 7-10 below are shared across both branches. Items 5-6 fork.

1. **Color** — `references/color-theory.md` for mechanics, `references/visual-vocabulary.md`'s color section for the actual palette of *approaches*. Build primitive scales, assign semantic tokens, validate contrast, *then* build components. Apply the 60/30/10 sanity check even at the maximalist end. Reserve `semantic.approvalRequired` for the chat-branch checkpoint UI alone.
2. **Typography** — a real pairing that says something about *this* brief specifically, one scale ratio chosen for what this brief needs (1.25 and 1.333 are common, well-behaved starting points — not the only two that exist). Default to something other than Inter/Roboto-for-everything unless the input specifically calls for a neutral/corporate register.
3. **Spacing** — one base unit chosen for this brief's density and grid needs (4 and 8px are the common web-safe defaults, not a hard ceiling on what's allowed).
4. **Motion & icon tier** — `references/motion-icon-tiers.md` for the tier ladder. Any request for a mascot or character motif maps to `iconography.customMotif`, hand-authored, whatever the subject is — not a reskin of a prior worked example.
5. **[Chat branch] Avatar** — a state machine across exactly `idle / listening / thinking / needsApproval / error / success`. See `references/agent-states.md`. Populate `personas` if the brief implies more than one named agent character. Consider `motion.signatureInteraction` for a genuinely tactile moment.
   **[General-web branch] Hero & content structure** — see `references/general-web.md`. The hero is a thesis, not a template slot: the most characteristic thing in the subject's world, in whatever form fits (headline, image, live demo, interactive moment). Structural devices (numbering, eyebrows, dividers, labels) must encode something true about the content, not decorate it.
6. **[Chat branch] Agent-state components** — presence indicator, thinking-vs-doing distinction, an approval pattern chosen by reversibility and stakes (pre-action gate / post-action review + undo / bounded-scoped grant), background-task notification, trustworthy error state, memory indicator. This is the differentiated core of the chat branch — do not skip it. Full detail in `references/agent-states.md`.
   **[General-web branch] Writing & voice, structural anatomy** — see `references/general-web.md`. Copy is design material, not decoration — written from the end user's side of the screen, active voice, one job per element. This is the differentiated core of the general-web branch — do not skip it in favor of only tokens.
7. **System-wide defaults** — trust/provenance signals, session/history chrome (chat) or navigation/footer chrome (general-web), performance/asset budgets — inferred from the style family per `references/system-defaults.md`.
8. **Rich content & edge cases** — `references/content-and-arc.md` for the chat branch (streaming, interrupted generation, images & video, 200+ message threads); general-web briefs handle their own rich-content cases (long-form copy, image-heavy sections, forms) per `references/general-web.md`.
9. **Platform notes** — `references/platform-and-output.md` for how tokens adapt across embedded widget / full app / mobile (chat) or desktop / tablet / mobile breakpoints (general-web), plus real frame/container choices either way — including that file's "Frame / window chrome" section on what actually contains the surface (borderless overlay, windowed with a title bar, iframe-embedded, native app shell), not a default to skip past.
10. **Ground it in real, licensed resources** — `references/resource-library.md`. Populate `resources` with actual open-source or clearly-licensed picks, not placeholders. Picks made directly from that file's tables are already verified — its license tags are the check, don't re-run a live license lookup for a name that's already sitting in the table. Live verification is only for a pick that isn't in the table at all.

## Step 5 — Design the anatomy, not just the tokens

Before the QA pass: does the actual layout look like it was built for this specific brief, or is it a generic skeleton wearing different colors and fonts? For the chat branch, that skeleton is panel-header-thread-input. For the general-web branch, it's hero-cards-grid-footer. Pull a layout paradigm from `references/visual-vocabulary.md` the same way Step 1 pulled a color/texture approach — dashboard-dense, single-focus, physical-object-metaphor, editorial-asymmetric, broken-grid — and pick the one this specific brief warrants. If you can't point to a structural choice that exists *because* of this brief, the structure hasn't been designed yet, only the paint has.

## Step 6 — Self-critique QA pass (never skip)

Read and run every check in `references/qa-checklist.md` against the draft. Items 1-2 are not eyeballed — run the actual scripts (`scripts/check-tokens.js`, `scripts/check-contrast.js`) before claiming either passes. A described-but-unrun check is not a check; if the environment can't execute Node for some reason, say so explicitly rather than silently presenting an unverified pass.

1. Spacing/alignment on-grid — `node scripts/check-tokens.js`
2. WCAG AA contrast on every text/background pairing — `node scripts/check-contrast.js`
3. Type scale discipline (≤5 sizes, all traceable to the ratio)
4. Consistency audit (icon stroke, corner radius, elevation reused not invented)
5. Whitespace/density ceiling, even at the maximalist end
6. No competing simultaneous focal points
7. **Confirm at least one thing was deliberately removed**, recorded in `meta.removedElement`
8. **Structural variation, not just token variation** — would this layout still be recognizable as an answer to this specific brief with the colors and fonts stripped out?
9. **Breadth check** — did this generation pull from a different combination of `visual-vocabulary.md`'s rows than the last one, or quietly reuse a previous palette/pairing/anatomy?

Tell the user briefly what the QA pass checked and what it fixed or cut — don't just silently pass.

## Step 7 — Emit output

Produce, at minimum, the validated `theme.json`. Then:

- **Chat branch** — per `references/platform-and-output.md`, emit React/Tailwind, plain HTML/CSS/JS, or a chat-widget-SDK theme-config object. Default to plain HTML/CSS/JS if unspecified.
- **General-web branch** — emit a single-file HTML/CSS/JS build (or React/Tailwind if the target framework is specified), following `references/general-web.md`'s file-creation guidance. Default to plain HTML/CSS/JS for the same no-build-step reason.

For a normal generation request, that's the deliverable: the token file plus the adapter output, nothing else. A documentation-gallery page (intro copy, swatch strips, a type-scale demo) is a convention for this repo's own `/examples`/`/showcase` entries, not part of what a real request should produce — don't spend generation time building a self-documenting showcase page unless the user is specifically contributing a new worked example back to the repo.

## Craft bar

Stripe Press and Shopify Editions are cited here for one reason: **read what they actually did, not what they look like.** Neither picked a look off a shelf — they synthesized a bespoke system of decisions from scratch and executed it with obsessive, unglamorous consistency. The transferable lessons are process ones: a real pairing chosen for *this* brief, whitespace as an intentional element, tight execution discipline, motion used sparingly and with purpose, an anatomy built for the specific piece. That applies whether the piece is a chat widget or a homepage.

The explicit failure mode to avoid, on either branch: generic AI-slop output — predictable card grids, purple-gradient-by-default, safe choices nobody had to defend, the same component skeleton in a different font — and just as much, a *second* signature look quietly replacing the first one across many generations because it was the last thing that worked.

## Scope boundary

Multi-agent/sub-agent handoff UI (a roster view, delegation transitions, per-agent presence) is out of scope for v1 on the chat branch — say so plainly rather than improvising an unvalidated pattern, per `references/agent-states.md`. On the general-web branch, native app UI (iOS/Android platform-specific chrome, not responsive web) is out of scope for v1 — say so and suggest a platform-specific design skill instead.
