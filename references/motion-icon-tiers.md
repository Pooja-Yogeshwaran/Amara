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

## Signature interaction — real spring physics, not a CSS loop that gestures at it

The five tiers above are all about the *icon/avatar asset* — what plays, on what trigger. They stop short of a different, separately valuable thing: one genuinely tactile, physics-driven interaction that makes a product feel handled rather than themed. Shipped products in this space do this well — Block's Berd (berd.xyz) has a draggable 3D object you can spin with real momentum, and a mascot you can squish "like goo" and watch settle back into shape. Extract the *characteristic* here, same as any reference-mode input per `input-modes.md`: real spring physics (momentum, overshoot, settle), applied to one element, not the specific cube or the specific strawberry — those are Berd's own assets, not a pattern to reproduce.

Maps to `motion.signatureInteraction` (schema, optional). Three rules:
1. **Use a real library**, not a hand-authored CSS transition described as if it were physics. `Motion` (motion.dev, MIT — see `resource-library.md`) does real spring interpolation with configurable stiffness/damping in a few lines; a `transition: transform 300ms ease-out` is not the same thing no matter how it's described, and claiming otherwise in the output is the same category of dishonesty as an unverified license claim.
2. **One element, not a system-wide effect.** The avatar/launcher is the strongest default candidate — it's the one thing a user is likely to actually grab and play with, the same way Berd's homepage invites you to spin the cube. Applying spring-physics drag to every button in the thread is the density-ceiling failure from `qa-checklist.md` wearing a different costume.
3. **`prefers-reduced-motion` still applies.** A spring-physics drag interaction has more motion to suppress than a CSS fade, not less — define what "reduced" means for it explicitly (commonly: keep the drag-and-drop functional, drop the overshoot/bounce and settle instantly on release) rather than disabling the interaction outright, which would remove functionality, not just motion.

This is genuinely optional and genuinely costs more than every other tier on this page — a real per-request engineering decision, not a default to reach for because it sounds impressive. Most systems this skill generates don't need it; state plainly when a request doesn't call for it rather than adding it as decoration.

## Cross-cutting rule

Whatever tier is chosen for `avatar.tier` and `motion.iconTier`, every animated element in the system needs an entry in `motion.reducedMotionDefault` / per-element `reducedMotionFallback`. This isn't optional at any tier, including tier 1 (where the answer is trivially "nothing animates") — the QA pass checks for the field's presence, not just its correctness.
