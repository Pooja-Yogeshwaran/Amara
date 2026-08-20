# Agent-specific state vocabulary

This is the differentiated core of Amara — the reason a generic UI-design skill isn't sufficient for an always-on agent. A chat widget has messages; an agent has *state the user needs to trust*. Design every one of these explicitly, don't let them fall out as an afterthought of the message-bubble design.

**Grounded in, not invented from scratch:** the state vocabulary below maps onto two established research frameworks rather than one skill's private opinion — Microsoft's [HAX Toolkit / Guidelines for Human-AI Interaction](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/) (18 guidelines spanning initial interaction, during interaction, when-things-go-wrong, and change-over-time — the last of these is exactly what `content-and-arc.md`'s personality-taper arc is doing) and Google's [People + AI Guidebook](https://pair.withgoogle.com/guidebook-v2/) (23 patterns covering Mental Models, Explainability + Trust, Feedback + Control, and Errors + Graceful Failure). Where a rule below has a real-world grounding beyond "this looked right," it's cited inline.

## Presence indicator: online / working-in-background / asleep

Three distinct states, three distinct visual treatments — not one dot that changes color:
- **Online:** the agent is present and can respond now. Steady, calm indicator (solid dot or steady glow depending on style tier).
- **Working in background:** the agent is mid-task the user isn't actively watching (a long tool call, a scheduled job). Needs a treatment that reads as "busy, not stuck" — subtle animated indicator, respecting `prefers-reduced-motion` with a static-but-labeled fallback.
- **Asleep:** no active session / agent not currently running. Visually recessed — lower contrast, no motion — so it doesn't compete with online/working states elsewhere in the UI (e.g. in a multi-agent list, stubbed per scope note below).

## Thinking vs. doing

These must read as two different things at a glance, not two copies of the same spinner:
- **Thinking** = the model is reasoning/generating, no external effect yet. Treatment: motion on the avatar or a text-adjacent indicator (e.g. animated ellipsis), contained to the message-composition area.
- **Doing** = the agent is taking an action with a real effect (tool call, API request, file write). Treatment: a distinct indicator — commonly a labeled chip naming the action ("Searching docs…", "Updating ticket…") rather than a generic spinner, because the user's trust calculus for "doing" is different from "thinking." Doing states are also where an activity/transparency log (optional component) earns its place.

**Reasoning panel (optional, for models/agents that expose intermediate reasoning):** when there's real chain-of-thought or planning content worth showing — not just a "thinking…" label — give it its own collapsible surface rather than dumping it into the main thread at full weight. This is a shipping pattern, not a hypothetical one: [Vercel's AI Elements](https://github.com/vercel/ai-elements) library (MIT, built on shadcn/ui) ships exactly this as a `Reasoning`/`ReasoningTrigger` component pair — collapsed by default, expandable on demand, visually subordinate to the actual answer. Maps to the schema's optional `components.reasoningPanel`; defaults to `collapsed: true` regardless of style family, since reasoning content competing with the answer for attention is its own no-competing-focal-points failure.

## Approval isn't one pattern

Treating every consequential action as the same modal "approve / deny" checkpoint is itself a design mistake — 2026 human-in-the-loop practice (and, for regulated contexts, the EU AI Act's Article 14 human-oversight requirement) distinguishes at least three shapes, chosen by reversibility and stakes, not by habit:

- **Pre-action gate** — the pattern detailed below. Use for irreversible or high-risk actions (deleting data, spending money, anything that can't be quietly undone). Blocks until resolved.
- **Post-action review window** — for reversible or bounded actions: let the agent act, surface what it did for a defined window, and offer a one-tap **compensating action** (rollback/undo) if the user objects within that window. Lower-friction than a gate, and the honest choice whenever undo is actually possible — gating everything "for safety" when a clean rollback exists just trains users to rubber-stamp gates, which defeats the point of having them.
- **Bounded / scoped grant** — for a gate that *is* warranted, state the actual boundary being authorized, not just a bare yes/no: what action, on what target, for how long, with what excluded ("approve restarting `checkout-api` for the next 10 minutes; no config changes included"). A scoped grant is auditable and re-askable; an unqualified "approve" invites scope creep the user never actually consented to.

Pick the shape per action, not per system — a single agent can reasonably use a pre-action gate for "delete the production database" and a post-action window for "reformat this doc," in the same session.

### Pre-action gate — design rules

The single highest-priority element in the entire system when it's on screen. Design rules, non-negotiable regardless of style family:
- **Elevation:** the top of `components.elevationScale` — above the input bar, above any notification.
- **Color:** `semantic.approvalRequired`, reserved and used nowhere else (see color-theory.md).
- **Motion:** enters once (a single deliberate transition), never loops or pulses indefinitely — a checkpoint that nags reads as untrustworthy, not urgent.
- **Position:** anchored where the user's eye already is (top of viewport or inline at point of relevance), never requiring a scroll to discover.
- **Content contract:** state what the agent wants to do, in plain language, before it does it, including the grant's actual scope if it's a bounded/scoped one. No jargon, no buried consequences.
- **Edit-before-approve, when the thing awaiting approval is a draft rather than a fixed action.** If the agent is asking permission to send/publish/execute something it generated (a reply, a post, a document), the gate needs a third affordance beyond approve/deny: edit, then approve. Support teams running AI copilots report this exact shape — the agent drafts, a human edits and approves, and the draft's origin/sources stay visible through the edit (this is a widely-documented pattern in AI-copilot support tooling, not a specific product's proprietary flow) — don't force a reject-and-retype cycle when a one-line edit was all that was needed. The claymorphism and brutalism examples in `/examples` show the simpler binary case (approve/deny only, since neither is gating a draft); an "Edit first" secondary action belongs on the banner specifically when what's pending is agent-authored content, not a fixed operation.

## Background-task notification

Distinct from the pre-action gate: this reports something *already done*, not something awaiting permission. Lower visual weight than the approval banner, but still needs to interrupt gracefully — a toast/badge pattern that persists until acknowledged (not an auto-dismissing toast, since the user may have been away when it fired) works across most style families.

When the task it's reporting was a **post-action review window** (see above), this component carries the compensating action too — the notification isn't just "done," it's "done, here's what changed, undo within N minutes if that's wrong." Once the window closes, drop the undo affordance rather than leaving a dead button around.

**A nudge that's been ignored should silence itself, not repeat.** If the agent surfaces a proactive suggestion (not a required approval — an optional "next best action") and the user doesn't act on it, don't re-surface the same nudge on a timer or the next session open. This is a documented failure mode in analyses of agentic support tooling: a suggestion that keeps resurfacing after being ignored reads as nagging and trains users to dismiss the whole notification channel, including the ones that matter. Treat "ignored once" as a real signal, not noise to retry past.

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
