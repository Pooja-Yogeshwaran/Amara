# Agent-specific state vocabulary

This is the differentiated core of Amara — the reason a generic UI-design skill isn't sufficient for an always-on agent. A chat widget has messages; an agent has *state the user needs to trust*. Design every one of these explicitly, don't let them fall out as an afterthought of the message-bubble design.

## Presence indicator: online / working-in-background / asleep

Three distinct states, three distinct visual treatments — not one dot that changes color:
- **Online:** the agent is present and can respond now. Steady, calm indicator (solid dot or steady glow depending on style tier).
- **Working in background:** the agent is mid-task the user isn't actively watching (a long tool call, a scheduled job). Needs a treatment that reads as "busy, not stuck" — subtle animated indicator, respecting `prefers-reduced-motion` with a static-but-labeled fallback.
- **Asleep:** no active session / agent not currently running. Visually recessed — lower contrast, no motion — so it doesn't compete with online/working states elsewhere in the UI (e.g. in a multi-agent list, stubbed per scope note below).

## Thinking vs. doing

These must read as two different things at a glance, not two copies of the same spinner:
- **Thinking** = the model is reasoning/generating, no external effect yet. Treatment: motion on the avatar or a text-adjacent indicator (e.g. animated ellipsis), contained to the message-composition area.
- **Doing** = the agent is taking an action with a real effect (tool call, API request, file write). Treatment: a distinct indicator — commonly a labeled chip naming the action ("Searching docs…", "Updating ticket…") rather than a generic spinner, because the user's trust calculus for "doing" is different from "thinking." Doing states are also where an activity/transparency log (optional component) earns its place.

## Approval / checkpoint UI

The single highest-priority element in the entire system when present. Design rules, non-negotiable regardless of style family:
- **Elevation:** the top of `components.elevationScale` — above the input bar, above any notification.
- **Color:** `semantic.approvalRequired`, reserved and used nowhere else (see color-theory.md).
- **Motion:** enters once (a single deliberate transition), never loops or pulses indefinitely — a checkpoint that nags reads as untrustworthy, not urgent.
- **Position:** anchored where the user's eye already is (top of viewport or inline at point of relevance), never requiring a scroll to discover.
- **Content contract:** state what the agent wants to do, in plain language, before it does it. No jargon, no buried consequences.

## Background-task notification

Distinct from the checkpoint: this reports something *already done*, not something awaiting permission. Lower visual weight than the approval banner, but still needs to interrupt gracefully — a toast/badge pattern that persists until acknowledged (not an auto-dismissing toast, since the user may have been away when it fired) works across most style families.

## Activity / transparency log (optional)

A running, dismissible record of what the agent did and when (tool calls, checkpoints resolved, background tasks completed). Optional per system, but if present it should be the natural home for anything that would otherwise clutter the main thread with meta-commentary. Style-tier default density: Corporate/Enterprise defaults this **on**; Playful/Minimalist default it **off** unless requested (see the system-wide defaults note in SKILL.md).

## Error / failure state

Must read as *trustworthy*, not alarming. Concretely:
- Use `semantic.danger` for the smallest effective area (an icon or a left-border accent), not as a full-bleed background — full-bleed red reads as a system failure, not an agent hiccup.
- Copy states what happened and what's next ("Couldn't reach the calendar API — retry, or continue without it?"), never a bare stack trace or a generic "Something went wrong."
- No motion on entry beyond the same subtle transition every other message gets — a shaking or flashing error control raises anxiety without adding information.

## Memory / context indicator

A small, low-emphasis signal that the agent is carrying context forward (e.g. "Remembering this thread" or a subtle icon on messages that reference earlier context). Keep this at the lowest end of the visual hierarchy — informative on inspection, invisible at a glance — so it doesn't compete with presence or approval states.

## Avatar as a state machine

The persona mark is never a single static image. Model it across exactly the six states in the schema's `avatar.states`: `idle`, `listening`, `thinking`, `needsApproval`, `error`, `success`. Each needs its own `colorToken` and `motion` value (even if `motion: "none"` at the static tier), plus a `reducedMotionFallback`. See `motion-icon-tiers.md` for how expressiveness scales with the chosen tier.

## Out of scope for v1: multi-agent / sub-agent handoff

Amara v1 designs the UI for a single always-on agent. Multi-agent handoff (e.g. a supervisor agent delegating to sub-agents, and how that reads visually — a roster view, a hand-off transition, per-agent presence) is a real and adjacent problem, but explicitly stubbed rather than solved here. If asked, say so directly: note it as a known gap rather than improvising an unvalidated pattern, and point to the presence-indicator and activity-log tokens above as the most likely extension points for a future version.
