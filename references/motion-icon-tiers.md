# Icon & avatar motion spectrum

Five tiers, increasing expressiveness and increasing cost. Pick per-project, but pick deliberately — state the tradeoff to the user rather than silently defaulting to the flashiest option.

## 1. Static SVG
No motion. Cheapest, most portable, zero reduced-motion concerns. Right default for Swiss, Minimalist, Corporate, and any low-bandwidth/embedded-widget context where the bubble loads before anything else on the host page.

## 2. Micro-interaction SVG (state-triggered)
CSS/SVG-native transitions triggered by state change (hover, send, state-machine transitions on the avatar). Cheap, themeable via CSS custom properties, respects `prefers-reduced-motion` for free via standard media-query gating. Good default for most style families once some liveliness is wanted.

## 3. Lottie / JSON — the sweet spot for expressive-but-flexible
Vector-based, scriptable, and critically: **themeable and recolorable to match the generated palette** without re-authoring the animation. This is the tier Amara recommends whenever a style family wants a genuinely expressive avatar state machine (Claymorphism, Playful/Funky, Maximalist) — it's the only tier above micro-interaction that doesn't lock in a fixed palette. Requires a reduced-motion fallback to be defined explicitly (freeze on a representative frame, don't just disable and show nothing).

## 4. GIF — opt-in only
Ship only when the user explicitly asks for it, and surface the tradeoff before doing so:
- **Fixed palette** — baked into the file, cannot be retheme'd if the palette changes later without re-exporting.
- **No reduced-motion fallback by default** — a GIF has no "paused" state without swapping to a static image asset, which must be authored separately.
- **Larger asset size** than an equivalent Lottie, with no vector scaling.
Right call mainly for Retro/Skeuomorphic systems chasing a specific nostalgic texture, or when the user is porting an existing GIF-based brand asset. Never the default.

## 5. Video-loop
Rarely justified for a widget-scale surface. Heaviest asset weight, autoplay/audio policy friction across browsers, worst reduced-motion story of the five tiers. If a request seems to call for this, ask whether a Lottie loop would serve the same goal before committing to it — say so, don't just comply silently.

## Cross-cutting rule

Whatever tier is chosen for `avatar.tier` and `motion.iconTier`, every animated element in the system needs an entry in `motion.reducedMotionDefault` / per-element `reducedMotionFallback`. This isn't optional at any tier, including tier 1 (where the answer is trivially "nothing animates") — the QA pass checks for the field's presence, not just its correctness.
