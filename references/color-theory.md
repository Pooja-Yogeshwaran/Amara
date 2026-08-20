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

## Industry / emotional associations — soft defaults only

Common associations (blue = trust/enterprise, green = success/growth, red = danger/urgent, purple = premium/creative) are reasonable tie-breakers when nothing else constrains a choice, never a hard rule. Override freely when the user's brand, reference, or vibe words point elsewhere.

**Known limitation:** these associations, and the "soft defaults" above, are drawn from Western commercial design convention. Color and iconography meaning varies significantly by culture (e.g. red/white/purple carry different connotations across regions for mourning, luck, and royalty respectively). Amara does not currently localize these defaults — if the target audience sits outside a Western-commercial context, treat every soft default in this file as a prompt to ask rather than an answer, and say so to the user rather than silently assuming.
