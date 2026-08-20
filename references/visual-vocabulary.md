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
- **Physical-object metaphor** — the interface presents as a specific real object (a ticket, a receipt, a compact mirror, a terminal, a Rolodex card) rather than a generic panel — one paradigm among many, not the default move for any particular register of request (e.g. reaching for a compact mirror or VIP card every time a brief reads as confident/glam). Pick the specific object because this brief warrants it, not because it worked for a similar-sounding one before.
- **Scroll/canvas-driven** — content arranged in space rather than a fixed panel, relevant mainly for full-app/dashboard platform modes per `platform-and-output.md`.

## Motion & feel, beyond the five icon tiers

`motion-icon-tiers.md` covers *how expressive an asset is allowed to be* (static → video-loop) — a separate question from *what kind of motion feeling* a system wants. Note the distinction that's easy to blur: **"restrained" and "static" are not the same thing.** A brief that calls for something snappy, technical, out-of-the-way is calling for *short, precise* motion — a fast, real state transition — not for zero motion by default. Reaching for `static` as the safe/minimal-seeming choice whenever a brief sounds serious or technical is its own quiet default, the same category of error as reaching for blue whenever a brief sounds trustworthy — genuinely audit whether the brief asked for *no* motion or for *fast, unshowy* motion before picking the tier down to static.
- **Snappy/mechanical** — short durations (think 80-150ms, not 0ms), linear or slightly-overshot easing, reads as efficient and technical. This is still motion.
- **Languid/floaty** — long durations, soft easing, reads as calm or luxurious.
- **Elastic/playful** — spring-based overshoot (see `motion.signatureInteraction`), reads as tactile and alive.
- **Deliberately abrupt/no-easing** — hard cuts, no transition at all (used already for Brutalism) — a legitimate feel, and the one case where genuinely near-zero motion is the actual answer, not a fallback.

## Dimensionality — 2D vs. real 3D

Most examples in this repo are flat — 2D transforms and CSS. A genuinely 3D element (something with real depth, draggable/rotatable in three dimensions, not just position/scale) is a legitimate tool, demonstrated in `examples/futuristic-white-glass` (a real CSS `rotateY` object, not a flat icon with a fake shadow) — but that's one demonstration of the technique, not a reason to reach for it by default on every generation from here on.

- **CSS 3D transforms** (`perspective`, `rotateX`/`rotateY`/`rotateZ`, `transform-style: preserve-3d`) — genuinely three-dimensional, hardware-accelerated, no library or WebGL required. A draggable object you can spin and see a different face of — the *characteristic* behind Berd's project cube (berd.xyz), extracted per the same reference-mode rule as any other source: real 3D you can grab and rotate is the technique; the specific cube geometry and branding are Berd's own, not to be reproduced. Achievable with vanilla CSS + pointer events for a single hero object, at a similar cost tier to `motion.signatureInteraction`.
- **WebGL / Three.js** — for actual rendered 3D geometry, materials, and lighting. A real engineering decision, not a default — same tier of commitment as full physics, state plainly when a request doesn't warrant it rather than reaching for it because it sounds impressive.
- **2.5D / layered parallax** — flat layers moved at different rates on pointer or scroll; a cheap illusion of depth without true 3D, appropriate when the brief wants *some* dimensionality without the cost of the two options above.
- **When it's warranted, not by default**: an avatar/mascot that benefits from being physically "held" and turned (ties to the physical-object-metaphor layout paradigm above), a launcher that wants to feel like an actual object rather than an icon. Like every other row in this file, this is raw material to genuinely consider in Step 1's three concepts — not a box to check on every generation, and not a box to silently never check either.

## How to actually use this file

Before Step 3 of `SKILL.md` names a style family, generate — briefly, internally — at least three genuinely different directional concepts for the brief, each pulling from a *different* combination of rows in this file (not different colors within the same combination). Reject two, keep one (or synthesize across them), and say what was rejected and why in `meta.generatedFrom`. This is the actual mechanism that prevents convergence — not a rule to "be more creative" about color, but a forcing function to generate real breadth before narrowing. Then, and only then, place the result on the `style-taxonomy.md` spectrum for naming/defaults/QA purposes. If the result doesn't sit near any of the 11 named points, that's fine — say so, and consider whether it's a candidate for `styles/_template.md`'s contributor path.

**Do not let this file's own entries become the new worked examples either.** A specific technique named here (mesh gradients, dot-grid patterns, duotone) is raw material to combine and reinterpret per-brief, not a menu to pick one item from and call it done — that would just relocate the bucket-classifier problem into a longer list of buckets.
