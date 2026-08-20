# System-wide defaults

Three categories are **not elicited from the user** — they're inferred automatically from the chosen style family and applied uniformly across the whole generated system, so a user never has to think about them for basic cohesion. Each can still be patched after the fact with a targeted override (see `input-modes.md` #4) without re-running the whole flow.

## Trust / provenance signals
What tells the user "this is the agent, this is real, this response is current": a consistent agent-name/avatar treatment on every agent message, a subtle timestamp or "last updated" mark on long-running state, and a visual tell for AI-generated vs. system/human-authored content where the product mixes them. Density scales with style family — Corporate/Enterprise defaults to more visible provenance chrome (e.g. always-visible timestamps, a visible model/version mark); Playful/Minimalist defaults to lighter-touch signals (timestamp on hover/tap only).

## Session / history chrome
How past conversations are surfaced: a history panel or thread list, session boundaries (visual separator or date header when a new session starts after absence), and how a resumed session re-establishes context for the user (a short recap treatment, tied to the memory/context indicator in `agent-states.md`). Default density again follows style family, and is a common target for the "make X more minimal than the rest" override pattern.

## Performance / asset budgets
Default ceilings so a generated system stays deployable in an embedded-widget context, not just a full-page demo:
- Prefer `static` or `micro-interaction` icon tier unless the request or style family (Claymorphism, Playful, Maximalist) specifically calls for more expressiveness.
- Lottie files: keep animations short and loopable rather than long sequences, so file weight stays widget-appropriate.
- Avoid stacking multiple simultaneously-animating Lottie/GIF assets in the collapsed-bubble state, where load time matters most.
- Flag to the user when a choice (e.g. GIF tier, video-loop) pushes meaningfully past a typical widget weight budget — this is the same opt-in-with-warning rule as `motion-icon-tiers.md`, applied at the system level rather than per-asset.

## Overriding a default
Say what to change and where: "make the history panel more minimal than the rest" resolves to a patch on `components` fields under the session/history area only, leaving every other inferred default untouched. See `input-modes.md` for how overrides are resolved and recorded.
