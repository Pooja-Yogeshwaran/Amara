# Self-critique QA pass

Required after every generation, before presenting output. This is not a single-pass generator — run this checklist against the produced `theme.json` and its rendered examples, fix or regenerate anything that fails, and only then present the result. State briefly to the user which checks ran and what (if anything) got fixed or removed; don't just silently pass.

**This full list is the required floor, and it's fast** — two script runs (each well under a second) plus five inspection-based judgment calls made once against the draft, not a re-verification loop. Spinning up a browser to screenshot the result or probe computed styles with injected JS is real extra diligence worth doing when building a permanent `/examples` entry, but it is not part of what every generation needs — don't treat it as a default step, or routine requests pay for gallery-grade verification they didn't ask for.

Run in this order:

## 1. Spacing/alignment on-grid
Every spacing value used anywhere in the system (component padding, margins, gaps) must appear in `spacing.scale`. Run it, don't eyeball it:

```
node scripts/check-tokens.js path/to/theme.json path/to/preview.html
```

Any reported off-scale value is a fail — snap it to the nearest scale step and re-run until clean.

## 2. WCAG AA contrast, every pairing, every mode
Every entry that will render text, an icon, or a state indicator against a background must be checked — not just the primary text/background pair. This explicitly includes maximalist/funky palettes and dark-mode-native/cyberpunk accent-on-dark text, both flagged in `color-theory.md` as common failure points. Populate `a11y.contrastReport` with every pairing, its ratio, and — critically — the literal two hex values behind it (not just token names), so the ratio is independently recomputable rather than a claim you're trusting yourself on. Then run it, don't eyeball it:

```
node scripts/check-contrast.js path/to/theme.json
```

This recomputes every pairing from its hex values via the real WCAG relative-luminance formula and diffs against the ratio you claimed. A mismatch is a fail regardless of which number was "close enough" — fix the theme.json entry, not the tolerance. Any `pass: false` also blocks completion — adjust the lightness step of the offending primitive and re-check, don't ship with a caveat. An entry the script can't extract two hex values from (token names only) is not a pass either; it means the check was never actually run.

**The script has a real blind spot: it only checks that the ratios you wrote into `a11y.contrastReport` are mathematically honest — it never looks at the rendered CSS to confirm the right token actually got used in the right place.** A component can reference a raw primitive (`var(--n900)`) instead of the mode-aware semantic token (`var(--text-primary)`), pass the script cleanly because the JSON's own light-mode claims are all correct, and still render illegibly in dark mode — dark text on a dark canvas, invisible, with a fully "passing" QA report. This is a real bug this skill has produced, not a hypothetical. This still fits in the required floor — it's a text-level read of the CSS you just wrote, not a browser round-trip:
- If the system has a `prefers-color-scheme: dark` override, read back every `color`/`background` declaration in the rendered CSS and confirm each one references a semantic token (`text.primary`, `text.secondary`, etc.) that actually has a dark-mode value — not a raw primitive (`--n900`, `--neutral-900`) that silently keeps its light-mode value in both modes. This costs a grep, not a browser session, and it's exactly what would have caught the bug above.
- If the same color plays two different roles that need *opposite* dark-mode treatment (e.g. used as text directly on the canvas, which needs to lighten, and separately as a button fill with light text on top, which needs to stay dark so the button text keeps working), that's a sign it needs to split into two distinct tokens — not one variable serving two masters, where fixing one role's dark-mode value silently breaks the other.
- `a11y.contrastReport` needs its own entries for dark-mode values, not just the light-mode default, wherever a dark override exists — a pairing that only exists in one mode is only half-checked. Actually rendering both color schemes live is real extra diligence worth doing when you have the tooling for it, same as the rest of this file's browser-verification note, but the grep-level check above is the part that's required regardless.

## 3. Type scale discipline
Count distinct font sizes used across the whole system. Must be ≤5, and every one must equal `base * scaleRatio^n` for the chosen `scaleRatio`. A size that doesn't trace back to the ratio is a fail.

## 4. Consistency audit
- Icon stroke width: one value system-wide (`iconography.strokeWidth`), no ad hoc exceptions.
- Corner radius: pull from a single defined set of values, not arbitrary per-component numbers.
- Elevation/shadow: every shadow used must be one of `components.elevationScale`'s defined steps — no one-off shadow invented for a single component.

## 5. Whitespace / density ceiling
Applies even at the maximalist end of the spectrum — bold is not the same as cluttered. Check: does any single screen region (header, one message, the input bar) have more than one competing expressive element? If a region has a bold color block *and* a decorative icon *and* heavy texture simultaneously, cut one.

## 6. No competing simultaneous focal points
Walk each of the five anatomy states (collapsed bubble, open state, approval checkpoint, background-task notification, error state) and confirm exactly one element has top visual priority in each. A common fail pattern named explicitly in scope: an animated avatar + a pulsing notification badge + a bright CTA all firing at once — if a review turns this up, mute or sequence the motion so only one is active at a time.

## 7. Deliberate removal confirmed
Every generation must remove at least one element from its own first draft before finalizing. Record what was cut in `meta.removedElement`. This applies at every point on the style spectrum, including maximalist — restraint at the maximalist end usually means simplifying *which* elements move or draw attention, not stripping color or personality down to Swiss-level starkness. An empty or missing `removedElement` field is itself a QA fail — it means the pass didn't actually happen.

## 8. Structural variation, not just token variation — the actual AI-slop check
The single most common failure mode this skill can produce, and the one the other seven checks will not catch: reskinning the *identical* DOM/component anatomy (a rounded panel, a circular-avatar header row, a column of chat bubbles, a pill input bar) with a different palette and font, and calling that a different style family. That's swapping paint, not designing a system — it's what makes AI-generated UI recognizable as AI-generated regardless of how clean the tokens are underneath.

Concretely check, before presenting: **would this layout still be recognizable as this style family with the colors and fonts stripped out?** If a Swiss-minimal render and a Maximalist-editorial render have the exact same message-bubble shape, the same header composition, and the same information hierarchy — only different `border-radius` and `font-family` values — that's a fail, even if every token individually passes checks 1–7. Concretely:
- A genuinely editorial/maximalist system's messages may not be speech bubbles at all — a lede-and-byline treatment, a pull-quote, an asymmetric margin note, are all more honest to the reference than a rounded rectangle in a different font.
- A genuinely brutalist system's header shouldn't necessarily be "circular avatar, name, status dot" in a rounded card — that's a Swiss-app convention, not a brutalist one.
- Two style families that share an anatomy on purpose (e.g. a deliberately restrained Corporate/Enterprise system, where predictability *is* the point) should say so explicitly in `meta.designPrinciple` rather than arrive there by not having considered an alternative.
- This check applies to every rendered adapter output, not just the plain-HTML preview — a React/Tailwind component set that's just the same `<Panel><Header><Thread><Input>` tree for every style family has the identical problem one layer down.

A failure here regenerates the component *structure*, not just its token values — this is the one check on this list where "snap the value to the nearest valid step" isn't the fix.

## Regeneration policy

A failed check regenerates the smallest scope that fixes it — a single primitive color step, a single component's spacing, one avatar state's motion — never the whole system, unless multiple failures trace back to the same root choice (e.g. a harmony model that structurally can't hit AA at the desired saturation, which does warrant restarting color generation with a different harmony model).
