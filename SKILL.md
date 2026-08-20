---
name: amara
description: Generates professionally-designed, cohesive UI systems for always-on AI chatbots and agents — from the collapsed widget bubble through the full open-thread state. Produces a framework-agnostic design-token JSON (color, type, spacing, motion, agent-state components) plus React/Tailwind, plain HTML/CSS/JS, or chat-widget-SDK outputs. Use when asked to design, theme, or restyle an AI chat widget, agent dashboard, or conversational assistant interface — including requests like "design a UI for my chatbot", "make this agent widget look less generic", "theme my support bot", or "give this agent an approval/checkpoint UI".
---

# Amara — AI agent UI design system generator

Amara designs UI systems for conversational AI interfaces specifically: chat widgets, agent dashboards, always-on assistant UIs. It is not a general frontend-design skill — for arbitrary web/app UI outside this scope, say so and suggest a general-purpose design skill instead.

## Before generating anything: state the design principle

Every generation opens with a 2-3 sentence design-principle statement (e.g. "clarity over cleverness," "warmth without noise") derived from the input. Hold every subsequent token decision accountable to it — if a choice doesn't serve the principle, don't make it. Write this into `meta.designPrinciple` in the output and lead the user-facing response with it.

## Step 1 — Parse input across all four modes

Read `references/input-modes.md` in full before parsing a request. The four modes (reference-based, vibe/adjective-based, guided wizard, granular override) are **composable** — a single request routinely blends two or three. Identify which signals are present before generating:

- A named reference, URL, or screenshot → reference mode. Extract style *characteristics* only — never reproduce actual brand assets or trademarked identity (see `references/input-modes.md` for the hard rule and why it's both the legal and the better design answer).
- Adjectives/vibe words with no reference → vibe mode, mapped through `references/style-taxonomy.md`.
- No strong signal at all → run the 4-question guided wizard from `references/input-modes.md`.
- Precise token-level asks ("make the accent #2D5BFF", "history panel more minimal than the rest") → override mode, patching a specific dot-path without regenerating untouched siblings.

## Step 2 — Place on the style spectrum

Read `references/style-taxonomy.md`. Eleven anchor families (Swiss, Minimalist, Corporate, Glassmorphism, Neumorphism, Claymorphism, Brutalism, Retro/Skeuomorphic, Maximalist/Editorial, Playful/Funky, Dark-native/Cyberpunk) span one continuous spectrum — interpolate between anchors rather than forcing a snap to the nearest label. Each family supplies defaults for color harmony, motion level, icon tier, and typography; reference/vibe/override input can override any individual field. **Flag Neumorphism's accessibility risk explicitly** if it's chosen or implied — don't silently soften it into the output without saying so.

## Step 3 — Build the token system

Populate `schema/theme.schema.json`'s structure, in this order:

1. **Color** — `references/color-theory.md`. Build primitive scales, assign semantic tokens, validate contrast, *then* build components on top — never the reverse. Apply the 60/30/10 sanity check even at the maximalist end. Reserve `semantic.approvalRequired` for the checkpoint UI alone.
2. **Typography** — pick a real pairing (UI face, message-body face, monospace fallback), one scale ratio (1.25 or 1.333), max 5 sizes. Default to something other than Inter/Roboto-for-everything unless the input specifically calls for a neutral/corporate register — see the craft bar below.
3. **Spacing** — one base unit (4 or 8px), every value in the system traces to its scale.
4. **Motion & icon tier** — `references/motion-icon-tiers.md`. Lottie is the sweet spot for expressive-but-themeable; GIF and video-loop are opt-in only, with the cost tradeoff stated to the user before use. **Generic UI icons vs. thematic/character icon requests are different problems** — a request like "cute ghost icons for each tab" cannot be satisfied by picking an open-source icon library (none has the exact right mascot); it maps to `iconography.customMotif`, not `setReference`, and gets hand-authored as original SVG artwork (safe by construction) unless the user specifically wants an AI-generation tool, in which case its output license must be independently reviewed before shipping, never assumed open. See `references/resource-library.md`'s "Custom & thematic icon sets" section and the worked example in `/examples/minimalist-swiss/custom-icons/`.
5. **Avatar** — a state machine across exactly `idle / listening / thinking / needsApproval / error / success`, never a single static image. See `references/agent-states.md`.
6. **Agent-state components** — presence indicator, thinking-vs-doing distinction (plus an optional collapsible reasoning panel if the model/agent exposes real intermediate reasoning), an approval pattern chosen by reversibility and stakes — pre-action gate / post-action review window with a compensating action / bounded-scoped grant, not a single default (see `references/agent-states.md`'s "Approval isn't one pattern") — background-task notification, optional activity log, trustworthy error state, memory indicator. This is the differentiated core of the skill — do not skip or minify this section even under time pressure. Full detail in `references/agent-states.md`, grounded in Microsoft's HAX Toolkit and Google's PAIR Guidebook.
7. **System-wide defaults** — trust/provenance signals, session/history chrome, and performance/asset budgets are *inferred*, not elicited — apply them from the style family automatically per `references/system-defaults.md`, and support the targeted-override patch syntax so the user can adjust one component later without re-running the whole flow.
8. **Rich content & edge cases, emotional arc** — `references/content-and-arc.md`. Tables, code blocks, citations, streaming, interrupted generation, generative UI (agent-rendered interactive components — must consume this system's tokens, never bring their own default look), and 200+ message threads all need explicit rules, not just tolerance. Personality should taper across session maturity (onboarding → routine use), not stay maximally decorative forever — encode this in voice/microcopy guidance.
9. **Platform notes** — `references/platform-and-output.md` for how the same tokens adapt across embedded widget / full app / mobile layouts.
10. **Ground it in real, licensed resources** — `references/resource-library.md`. Populate the schema's optional `resources` block (icon set, font source, illustration source, chart library, CSS framework, per-framework UI kit) with actual open-source or clearly-licensed picks, not placeholder names. Default to genuinely OSI-licensed options (MIT/Apache/OFL/CC0) over merely "free" ones, and never default to a proprietary/closed tool silently — flag it if the user's request pulls toward one. Every dimension here is independently swappable with the same override syntax as any other token field ("use Tabler instead of Phosphor," "swap the UI kit to Radix") — treat a resource pick exactly like a color or spacing override, not as a separate conversation.

## Step 4 — Self-critique QA pass (never skip)

Read and run every check in `references/qa-checklist.md` against the draft before presenting anything:

1. Spacing/alignment on-grid
2. WCAG AA contrast on every text/background pairing (including maximalist/funky/dark-native modes) — fail = regenerate the primitive step, not ship-with-caveat
3. Type scale discipline (≤5 sizes, all traceable to the ratio)
4. Consistency audit (icon stroke, corner radius, elevation reused not invented)
5. Whitespace/density ceiling, even at the maximalist end
6. No competing simultaneous focal points (the classic fail: animated avatar + pulsing badge + bright CTA all firing together — mute or sequence)
7. **Confirm at least one thing was deliberately removed** from the first draft, and record it in `meta.removedElement`. Restraint is a designed feature at every point on the spectrum, including maximalist — don't skip this because the style is "supposed to be a lot."
8. **Structural variation, not just token variation.** The most common failure this skill can produce: reskinning the identical component anatomy (rounded panel, circular-avatar header, chat-bubble column, pill input bar) with different colors/fonts per style family — that's what makes output read as generic AI slop regardless of how clean the tokens are. Ask: would this layout still be recognizable as this style family with the colors and fonts stripped out? If not, the fix is regenerating the *structure*, not adjusting a token.

Tell the user briefly what the QA pass checked and what it fixed or cut — don't just silently pass.

## Step 5 — Emit output

Produce, at minimum, the validated `theme.json`. Then, per `references/platform-and-output.md`, emit whichever of the three adapters the request calls for (React/Tailwind, plain HTML/CSS/JS, or a chat-widget-SDK theme-config object) — default to plain HTML/CSS/JS if the target isn't specified, since it has no build-step dependency and is the easiest for the user to preview immediately.

## Craft bar

Target quality reference: Stripe Press and Shopify Editions — not their long-form editorial format, but their discipline: real typographic pairing (never default-Inter-everywhere), whitespace treated as an intentional element rather than leftover space, tight grid alignment, motion used sparingly and with purpose. The explicit failure mode to avoid is generic AI-slop output: predictable card grids, purple-gradient-by-default, safe choices nobody had to defend. If a draft is trending toward that, that itself is grounds to invoke the QA pass's removal/simplification step harder, not to add more decoration to compensate.

## Scope boundary

Multi-agent/sub-agent handoff UI (a roster view, delegation transitions, per-agent presence) is out of scope for v1 — if asked, say so plainly rather than improvising an unvalidated pattern, per `references/agent-states.md`.
