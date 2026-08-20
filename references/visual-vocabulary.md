# Visual vocabulary — raw material, not a 12th bucket

`style-taxonomy.md`'s 11 families are a **communication and sanity-check vocabulary** — a way to name roughly where a system landed, and a source of sensible starting defaults when nothing else constrains a choice. They are **not** the mechanism that should be generating the system. If every output can be described as "somewhere between two of these eleven points," the generation process is classifying, not designing — and a classifier can only ever produce combinations of things it already had names for. This file exists because the actual palette of technique available to a genuinely good designer is much wider than 11 named aesthetics and 5 color-harmony models, and Amara's output was converging on a narrow slice of it — not because the slice was chosen, but because nothing else was on offer.

Use this file as raw material *before* Step 3 of `SKILL.md` names a family, not as a 12th option in the same list. The brief plus this vocabulary should produce a direction; the taxonomy names it afterward for communication, QA, and defaults — it doesn't generate it.

## Gradient techniques (beyond "pick two hex values and go diagonal")

- **Mesh gradients** — multiple color points blended across a plane, not a straight line; reads as organic, dimensional, closer to light than to paint. CSS-approximable via layered radial-gradients or `conic-gradient` stacks; genuinely rendered via WebGL/canvas if the request warrants the investment.
- **Conic/angular gradients** — sweep-based, reads as motion or as a dial/gauge; distinct register from linear (calm) or radial (focal).
- **Duotone / tritone** — an image or illustration mapped to exactly two or three tones instead of full color; confident, poster-like, brand-forward. Different tool from a harmony-model palette — it's a *mapping*, not a *selection*.
- **Gradient-as-material** — a gradient standing in for a physical surface (brushed metal, frosted glass, liquid) rather than as decoration; the gradient's stops and angle should follow how light would actually behave on that material, not just look nice.
- **Grain over a gradient** — a subtle noise/grain layer on top of a gradient kills the "cheap CSS gradient" banding look and is most of what separates an amateur gradient from a premium one. Cheap and easy (an SVG noise filter or a tiled PNG), disproportionately effective.

## Texture & surface

- **Grain/noise** — film-grain-style texture over a flat color or gradient; reads as tactile, analog, considered. One of the single highest-leverage, lowest-cost moves available and underused in this repo's own examples so far.
- **Paper/fiber texture** — a subtle off-white paper grain under light content; pairs naturally with an editorial or handmade register, but is a *texture choice*, not the same thing as "use a serif font."
- **Halftone/dot-screen** — print-process texture (dots of varying size simulating tone); strong, era-specific, works for retro or for a deliberately "printed" digital-native feel.
- **Glass/blur** (already covered in `style-taxonomy.md`'s Glassmorphism entry) — but blur-as-texture doesn't require committing to the whole Glassmorphism family; a single blurred surface can be one texture choice within an otherwise different system.
- **Line/hatching texture** — engraving-style fine linework as a fill or shading technique; reads as precise, almost technical-illustration.

## Pattern systems

- **Dot grids, line grids, blueprint grids** — a faint structural pattern on a canvas, signaling "considered system" without adding color. Common in technical/developer-tool contexts specifically because it echoes graph paper / schematic drawings.
- **Organic/blob patterns** — irregular soft shapes, often paired with mesh gradients; reads as friendly, biological, non-technical.
- **Generative/data-driven patterns** — a pattern whose specific arrangement is derived from real data or a seed unique to the instance (a waveform, a hash-derived dot pattern, a unique "fingerprint" per session/user) — this is a genuinely different move from a repeating decorative pattern, because it can't be copy-pasted between two different generations without looking wrong, which is exactly the kind of uniqueness a repeating pattern can't provide.
- **Broken/asymmetric grid** — deliberately uneven column widths or off-grid element placement; the opposite move from Swiss precision, and a legitimate way to signal energy/confidence without touching color at all.

## Color, beyond the five harmony models

`color-theory.md` covers monochromatic/analogous/complementary/triadic/split-complementary — real and necessary, but not the only way to think about a palette:
- **Desaturated/muted "ink" palettes** — pull every hue's saturation down substantially (not to gray, to *muted*); reads as considered, editorial, unhurried. A completely different register from any of the five harmony models applied at full saturation.
- **One shock color on near-monochrome** — 95% of the system in two or three near-neutral tones, one single saturated color used exactly once per screen for the thing that must be seen. More disciplined and often more premium-reading than a "60/30/10 across three hues" palette.
- **Nature/material-derived palettes** — pull a palette from a specific physical reference (terracotta + sage + bone, or oxidized copper + slate) rather than from a color wheel; grounds the palette in something the eye already trusts as "goes together" because it's seen it in the physical world.
- **Deliberately clashing/maximalist palettes** — colors chosen to vibrate against each other on purpose (not the same as an unconsidered accident); requires the most disciplined execution of any approach here because it's the easiest to tip into actual noise, but done well reads as fearless rather than broken.
- **Brand-arbitrary palettes** — a palette anchored to something with zero inherent color logic (a specific flower, a favorite jacket, a childhood arcade cabinet) rather than to any theory at all; often the most memorable outcome precisely because it couldn't have been generated from a harmony wheel.

## Layout paradigms beyond "a rounded card in a panel"

- **Editorial/magazine grid** — asymmetric columns, pull-quotes, captioned figures (used once already in this repo for `maximalist-editorial` — the point isn't to avoid it again, it's to recognize it as *one* paradigm among many, applied because a specific brief warranted it, not because "maximalist" defaults to it).
- **Dashboard/data-dense grid** — many small modules at once, information density as the point, not something to apologize for.
- **Single-focus/one-thing-at-a-time** — the opposite of dashboard: one element fills the frame, everything else recedes or is hidden until needed.
- **Physical-object metaphor** — the interface presents as a specific real object (a ticket, a receipt, a compact mirror, a terminal, a Rolodex card) rather than a generic panel; used once already for the glam/boss-bitch test (a compact mirror, a VIP card, a ribbon) — again, one paradigm among many, not "the Amara move for confident requests" going forward.
- **Scroll/canvas-driven** — content arranged in space rather than a fixed panel, relevant mainly for full-app/dashboard platform modes per `platform-and-output.md`.

## Motion & feel, beyond the five icon tiers

`motion-icon-tiers.md` covers *how expressive an asset is allowed to be* (static → video-loop) — a separate question from *what kind of motion feeling* a system wants:
- **Snappy/mechanical** — short durations, linear or slightly-overshot easing, reads as efficient and technical.
- **Languid/floaty** — long durations, soft easing, reads as calm or luxurious.
- **Elastic/playful** — spring-based overshoot (see `motion.signatureInteraction`), reads as tactile and alive.
- **Deliberately abrupt/no-easing** — hard cuts, no transition at all (used already for Brutalism) — a legitimate feel, not a missing feature.

## How to actually use this file

Before Step 3 of `SKILL.md` names a style family, generate — briefly, internally — at least three genuinely different directional concepts for the brief, each pulling from a *different* combination of rows in this file (not different colors within the same combination). Reject two, keep one (or synthesize across them), and say what was rejected and why in `meta.generatedFrom`. This is the actual mechanism that prevents convergence — not a rule to "be more creative" about color, but a forcing function to generate real breadth before narrowing. Then, and only then, place the result on the `style-taxonomy.md` spectrum for naming/defaults/QA purposes. If the result doesn't sit near any of the 11 named points, that's fine — say so, and consider whether it's a candidate for `styles/_template.md`'s contributor path.

**Do not let this file's own entries become the new worked examples either.** A specific technique named here (mesh gradients, dot-grid patterns, duotone) is raw material to combine and reinterpret per-brief, not a menu to pick one item from and call it done — that would just relocate the bucket-classifier problem into a longer list of buckets.
