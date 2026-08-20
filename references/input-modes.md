# Input modes

Four modes, composable — not a menu where the user picks exactly one. A single request can blend modes (e.g. "like Notion's site, but funkier icons and a Lottie avatar" = reference mode fills the base, override mode patches two fields). Parse every incoming request for signals from all four before generating.

## 1. Reference-based
Trigger phrases: "make it like X", "in the style of X", a pasted URL or screenshot.

**Process:** analyze the reference for style *characteristics* — color harmony and saturation level, type pairing and weight, spacing rhythm, corner radius, icon stroke language, motion restraint/expressiveness. Extract these as descriptive traits, then build an **original system inspired by those traits**.

**Hard rule:** never reproduce the reference's actual proprietary assets, logo, literal color hex values lifted wholesale, trademarked marks, or brand identity. This is both the legally correct approach and the better design outcome — a literal clone reads as a clone, a system built from extracted characteristics reads as considered. Record what was extracted in `meta.generatedFrom.referenceDescription` as a trait description, not a brand-name claim (e.g. "confident geometric sans, high-contrast mono-accent palette, generous 8px-multiple whitespace" — not "Linear's exact palette").

If the reference can't be inspected directly (no fetch available, private URL), ask the user to describe its key traits rather than guessing from the name alone.

## 2. Vibe / adjective-based
Trigger phrases: "fun and bold", "calm and trustworthy", "make it feel premium".

**Process:** map adjectives through the style taxonomy (`style-taxonomy.md`) to the nearest spectrum position(s), and through color-theory soft defaults for hue/harmony association. Multiple adjectives can land between two style families — interpolate rather than force a single label. Record the source words in `meta.generatedFrom.vibeWords`.

## 3. Guided wizard
Trigger: user has no strong opinion yet, or explicitly asks to be walked through it. Ask in this order (skip any question the user has already answered via another mode):

1. **Style family** — show 2-3 taxonomy anchor points closest to any signal already given, or the full list if none.
2. **Palette harmony** — monochromatic through split-complementary, with the style family's default pre-selected.
3. **Icon/motion tier** — static through gif, with the tradeoff note from `motion-icon-tiers.md` surfaced inline, not hidden.
4. **Presence & approval state design** — does this agent run background tasks that need a presence indicator? Does it take actions that need approval checkpoints? These answers change which `components` entries are load-bearing vs. decorative.

Keep the wizard to these four questions by default. Don't re-ask something already answered by reference or vibe input in the same request.

## 4. Granular / picky override
Trigger phrases: precise token-level asks ("make the accent #2D5BFF", "the approval banner should be 4px heavier border", "history panel should be more minimal than the rest of the system").

**Process:** resolve the override to a specific dot-path in the schema (e.g. `color.primitive.accent.600`, `components.approvalBanner.elevation`) and patch only that field — do not regenerate sibling fields that weren't mentioned. Record every applied override's path in `meta.generatedFrom.overridesApplied` so later regenerations know not to silently clobber it.

This is also the mechanism for the required **targeted override syntax** used post-generation: system-wide defaults (trust signals, session chrome, performance budgets — see SKILL.md) apply uniformly by default, and a request like "make the history panel more minimal than the rest" patches just that component's tokens without re-running the whole elicitation flow.

## Emoji policy (part of voice, not a separate toggle)

Don't reduce this to on/off. Specify:
- **Frequency:** never / rare (major milestones only) / occasional (message-opening only) / frequent (style families like Playful/Funky).
- **Placement:** message-start only is the safest default when emoji are used at all — mid-sentence emoji fight with reading rhythm.
- **Exclusions:** never in error copy, approval-checkpoint copy, or any confirmation requiring the user's full attention — levity there undercuts trust exactly when trust matters most.
