# Color theory rules

## Layer order

Generate in this order, every time: **primitive scales → semantic assignment → contrast validation → (reject and regenerate on failure) → component refs.** Never assign a semantic token (e.g. `text.primary` on `background.surface`) without immediately checking its contrast ratio. Aesthetic preference does not override a failed check — regenerate the offending primitive step, don't ship it with a caveat.

## Harmony models, and where they sit on the style spectrum

| Model | Description | Fits |
|---|---|---|
| Monochromatic | One hue, varying lightness/saturation | Swiss, Minimalist |
| Analogous | Adjacent hues (within ~60°) | Minimalist, Glassmorphism, Corporate |
| Complementary | Opposite hues | Corporate (blue/orange), Brutalism |
| Triadic | Three hues evenly spaced | Claymorphism, Playful, Maximalist |
| Split-complementary | Base hue + two adjacent to its complement | Maximalist/Editorial, Playful, Cyberpunk |

A style family default is a starting point, not a constraint — reference-mode or override-mode can pin a different model onto any family.

## 60/30/10 as a sanity check

Even a maximalist or triadic palette should resolve to roughly 60% dominant (usually a neutral or near-neutral), 30% secondary, 10% accent by rendered area — not by count of colors defined. A palette can have eight hues in its primitive scales and still read as disciplined if only one is doing 10%-of-the-screen work at a time. Check this at the component level (a single message bubble, the header) as well as the whole-screen level.

Record the intended split in `color.distributionRatio` and sanity-check the rendered examples against it during QA.

## Contrast-first generation

1. Build the primitive neutral scale and primary scale.
2. Assign semantic pairings (`text.primary` on `background.surface`, `text.inverse` on `agentBubble`, etc).
3. Compute contrast ratio for every pairing that will hold text, an icon, or a focus ring.
4. WCAG AA floor: 4.5:1 for body text, 3:1 for large text (24px+/19px+bold) and for meaningful non-text UI (icon strokes, focus rings, state indicators).
5. Any failure → adjust the *lightness step* of the offending primitive (not the hue, to preserve harmony) and re-check. Repeat until the whole `contrastReport` array is green.
6. This applies identically in light and dark mode, and identically at every style-family position on the spectrum — a neon-on-black cyberpunk palette and a pastel glassmorphism palette are both held to the same 4.5:1 floor for body text.

## Approval-required color

`semantic.approvalRequired` must be a color used *nowhere else* in the system — not reused for a decorative accent, not shared with `warning`. The approval checkpoint's entire visual authority depends on the user never having seen that color mean anything else. See `agent-states.md`.

## Resist the obvious hue — an active rule, not a passive default

Common associations (blue = trust/enterprise, green = success/growth, red = danger/urgent, purple = premium/creative) are the single biggest reason generated systems start blurring into each other — "calm," "trustworthy," and "professional" are among the most common vibe words a chat-agent brief uses, and blue is the tie-breaker for all three. If picking the association is treated as a neutral, low-effort default, it wins almost every time nothing else in the brief actively points elsewhere — which is most of the time, since most briefs don't name a hue at all. That makes it a default in practice even though nothing calls it one.

So treat it as the opposite of a default: **the industry-association hue is the first candidate to consider rejecting**, not the first one to reach for. Per `SKILL.md`'s Step 0, name it, then ask whether this specific brief gives an actual reason to use it (the user named a reference that uses it, the request explicitly wants a banking/finance register, an existing brand asset already established it) — a reason tied to *this* request, not just that the association is defensible in general. Without one, pick from elsewhere in the harmony model: an adjacent or split-complementary hue that still fits the chosen model but isn't the industry's own least-imaginative answer to itself. This applies with the same weight to green-for-success, red-for-urgency, and purple-for-premium — any of the four can become the new rut if it's the thing reached for whenever nothing else constrains the choice.

Override freely when the user's brand, reference, or vibe words point somewhere specific — this rule is about resisting the *unforced* default, not about being contrarian when the brief actually asks for blue.

**Known limitation:** these associations, and the "soft defaults" above, are drawn from Western commercial design convention. Color and iconography meaning varies significantly by culture (e.g. red/white/purple carry different connotations across regions for mourning, luck, and royalty respectively). Amara does not currently localize these defaults — if the target audience sits outside a Western-commercial context, treat every soft default in this file as a prompt to ask rather than an answer, and say so to the user rather than silently assuming.
