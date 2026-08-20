# Style taxonomy

Eleven style families spanning one continuous spectrum from restrained to maximal. Treat the list below as anchor points on that spectrum, not a fixed picker — a request can land between two families (e.g. "mostly Swiss but warmer"), and the generator should interpolate rather than snap to the nearest label.

For each family: sensible defaults across color harmony, motion level, icon tier, and typography, so choosing one word produces a coherent system. Every default below is a starting point that reference-mode or picky-override input can override field by field.

## Swiss / International
- **Color harmony:** monochromatic or analogous, one strong accent used sparingly (10% or less).
- **Type:** grotesque sans (Helvetica/Inter-class) for UI, a second grotesque or a single serif for message body if pairing is wanted. Strict grid, generous negative space.
- **Motion:** minimal — fades and 100–150ms position shifts only. iconTier: static or micro-interaction.
- **Radius/shadow:** sharp-to-slightly-rounded corners, near-flat elevation (shadows implied by contrast, not blur).
- **Voice:** direct, unadorned, no exclamation points.

## Minimalist / Neutral
- Close cousin of Swiss but softer: warmer neutral scale, slightly more line-height, less rigid grid.
- **Color harmony:** monochromatic with one muted accent.
- **Motion:** iconTier static, duration.base ~150ms, easing standard (no bounce).

## Corporate / Enterprise
- **Color harmony:** complementary, blue/navy-anchored primary is a soft default (not a hard rule — see color-theory.md on cultural caveats).
- **Type:** humanist sans, 2 weights max. Density slightly higher than Swiss — enterprise users tolerate more information per screen.
- **Motion:** iconTier micro-interaction. Predictable, non-playful easing.
- **Trust signals:** heavier emphasis on provenance/session chrome by default (see qa-checklist.md and agent-states.md).

## Glassmorphism
- **Color harmony:** analogous, pastel-leaning, relies on background blur + translucency for depth rather than saturation.
- **Elevation:** blur + subtle border-highlight in place of hard shadows. Contrast risk: text over translucent surfaces must still hit AA against the *worst-case* background it can sit over, not just the design-time mock. Validate against both busiest and calmest expected backgrounds.
- **Motion:** micro-interaction, soft easing.

## Neumorphism
- ⚠️ **Accessibility flag, always surface this to the user:** neumorphism's signature soft dual-shadow embossing relies on low-contrast surface-on-surface color relationships, which is structurally in tension with WCAG AA text contrast and with distinguishing interactive from static elements. Usable at low density (a single hero control) but breaks down across a full thread of many small tap targets.
- If chosen: reserve the embossed treatment for 1–2 focal controls (e.g. the send button), never for message bubbles or body text containers. Icons and text still need full-contrast tokens, not neumorphic-shaded ones.

## Claymorphism
- **Color harmony:** triadic or analogous, saturated but soft (higher lightness than brutalism's palette).
- **Shape:** heavy rounding (16–24px+), inflated/puffy shadow pairs (soft outer shadow + soft inner highlight), thick consistent stroke on icons.
- **Motion:** micro-interaction to lottie — clay reads as tactile, a squash/stretch on send or on the avatar rewards the metaphor.
- **Type:** rounded sans, can run one weight heavier than Swiss defaults.

## Brutalism / Neo-brutalism
- **Color harmony:** complementary or triadic, high saturation, hard-stop color blocks (no gradients).
- **Shape:** sharp corners (0–2px radius), thick borders (2–4px), offset hard shadows (no blur) instead of soft elevation.
- **Type:** one loud display face for headers/avatar name, one plain workhorse face for body — deliberate contrast, not two similar grotesques.
- **Motion:** intentionally blunt — snap transitions, no easing curves, or none at all. iconTier static or crude micro-interaction.
- **Guardrail:** brutalism still needs AA contrast and a real grid; "raw" is a look, not a license to skip the token system.

## Retro / Skeuomorphic
- **Color harmony:** era-appropriate (e.g. warm analogous for 70s, cool split-complementary for 80s/90s tech) — pick a decade and commit, don't blend eras.
- **Texture:** literal material cues (grain, bevel, gradient-as-material) used on 1–2 signature surfaces (avatar frame, send button), not system-wide, or it reads as noisy rather than nostalgic.
- **Motion:** micro-interaction to gif-tier is where this family earns its keep, but gif is opt-in only — see motion-icon-tiers.md.

## Maximalist / Editorial
- **Color harmony:** split-complementary or triadic; still obeys the 60/30/10 rule — maximalist means more expressive colors, not more competing focal weight.
- **Type:** the family where real pairing matters most — a distinctive display/serif for headers or agent name, disciplined sans for body. This is the Stripe Press / Shopify Editions reference point: editorial confidence from typography and whitespace rhythm, not from ornament density.
- **Density ceiling still applies:** maximalist ≠ cluttered. One expressive element per screen region.
- **Motion:** micro-interaction to lottie, purposeful not constant.

## Playful / Funky
- **Color harmony:** triadic or split-complementary, high chroma, can break the neutral-scale-as-background convention for the bubble in favor of a tinted canvas.
- **Type:** rounded or slightly quirky display face for the agent name/header only; body stays legible and plain.
- **Motion:** lottie-tier is the sweet spot (see motion-icon-tiers.md) — expressive avatar states without gif's retheming cost.
- **Voice:** contractions, occasional emoji at message-start only (see input-modes.md / emoji policy), never in error or approval copy.

## Dark-mode-native / Cyberpunk
- **Color harmony:** built dark-first — a true dark background (not light-theme-inverted), one or two neon/saturated accents against deep neutrals.
- **Contrast trap:** neon accents on near-black often fail AA for body text even though they look high-contrast to the eye at a glance — always run the contrast check, especially for accent-colored text.
- **Type:** monospace or geometric sans for UI chrome reinforces the register; keep message body in a plain readable face so long threads don't fatigue.
- **Motion:** micro-interaction to lottie, glow/pulse used only for live states (thinking, background task), never as decoration.

## Adding a new style family
See the "Extending Amara" section of the README for the contributor path — a new family is a new file in `styles/` following the shape of these entries (color harmony, type, motion, shape, voice, one accessibility note if relevant) plus one line added to this taxonomy list. Core logic in SKILL.md never needs to change.
