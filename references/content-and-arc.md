# Rich content, edge cases, and the emotional arc

## Rich content & edge cases
Every generated system needs explicit rules for, not just tolerance of:
- **Tables** — inherit `spacing.scale` and `typography.scale`, never introduce their own padding/size values. Zebra-striping (if used) draws from the neutral primitive scale at a step subtle enough to stay under the AA-for-non-text-UI floor's *intent* (it's decorative, not informational — don't let it compete with real semantic color).
- **Code blocks** — syntax theme is generated *from* the palette (map token roles to syntax categories: e.g. `semantic.info` for keywords, `text.secondary` for comments), not a bolted-on third-party theme that clashes with the rest of the system. Use `typography.families.monospace`.
- **Citations** — visually subordinate to the claim they support (smaller size step, `text.muted`), but never so subordinate they become undiscoverable — still meets AA as body-adjacent text if it's legible prose, or 3:1 if treated as UI chrome (e.g. a superscript marker).
- **Markdown rendering** — headings inside a message body stay within the 5-size type scale rather than introducing document-level heading sizes; a message is a bubble, not a page.
- **Long unbroken content** (URLs, hashes, long tokens) — force-wrap or truncate-with-reveal; never let it stretch the bubble past the thread's max width and break the grid.
- **Streaming text** — render token-by-token or chunk-by-chunk with the `motion.duration.instant`/`fast` tokens, not a custom timing; cursor/caret treatment (if any) uses the avatar's `thinking` state color so it reads as connected to agent state, not a generic text-editor caret.
- **Interrupted / cancelled generation** — the partial message stays visible (never vanishes), gets a small distinct marker ("stopped" — muted, not styled as an error), and the input re-enables immediately.
- **Deep threads (200+ messages)** — hierarchy must hold at depth: this is a stress test for the type scale and spacing discipline, not a reason to add new density-specific tokens. If a session-boundary/date-header pattern is part of the system (see `system-defaults.md`), it's what keeps a very long thread scannable.

## Emotional arc across a session
Design intent should visibly shift across the lifecycle of a relationship with the agent, not stay frozen at "first impression" forever:

1. **Onboarding / first-run** — highest personality expression is appropriate here: fuller use of the chosen style family's voice, a capability-disclosure moment (what this agent can and can't do), avatar in its most expressive `idle` treatment.
2. **Building trust (early sessions)** — provenance and activity-log visibility can run slightly higher than steady-state default, so the user has more to verify against as they calibrate trust.
3. **Routine / efficient use (established sessions)** — this is where personality *tapers*. Reduce decorative motion frequency, shorten confirmatory copy, let the interface get out of the way — an agent the user talks to daily should feel less performative over time, not more. This taper is a deliberate design decision, not a bug: state it explicitly in `meta.designPrinciple` or component notes when it's a system-shaping factor.
4. **Failure recovery** — see `agent-states.md` error-state rules; this is the moment tapered personality should not disappear into coldness — a brief, plain acknowledgment reads better than either forced cheerfulness or clinical silence.
5. **Re-engagement after absence** — session/history chrome (see `system-defaults.md`) handles the practical recap; pair it with a small warmth beat (not a full onboarding replay) proportional to how long the gap was.

The taper in stage 3 is the detail most generic chat-widget design skips — most treat personality as a fixed dial rather than a function of session maturity. Encode it as guidance in generated voice/microcopy notes, not as a schema field (arc state isn't a design token, it's a product-logic concern the generated *copy guidance* should account for).
