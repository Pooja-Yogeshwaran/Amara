# Platform adaptivity & output generation

## Platform adaptivity
Same token file, different layout rules — never a second token system per platform:
- **Embedded widget** — collapsed bubble is the default resting state; open state is a fixed-size panel (not full-viewport) anchored to a corner; performance budget from `system-defaults.md` is strictest here.
- **Full app** — thread can use the full viewport; header/sidebar layout is available for session/history chrome that the widget's tight footprint can't afford; approval banners can use more elaborate layout (e.g. inline in inline in thread instead of a fixed top overlay) as long as the elevation/reserved-color rules from `agent-states.md` still hold.
- **Mobile** — collapsed bubble becomes a floating action button or tab-bar entry point; open state is full-screen (there's no room for a floating panel); touch targets follow a minimum size independent of the visual `spacing.scale` step used for desktop hover targets — note this explicitly rather than silently reusing desktop hit-areas.

Layout rules live outside the token file (they're structural/responsive logic, not design tokens); the token file stays the single source of truth for color, type, spacing, motion, and component treatments across all three.

## Output generation — from tokens to deployable code

`theme.json` (validated against `schema/theme.schema.json`) is the only source of truth. Generators are adapters that read it and emit one of:

1. **React + Tailwind** — emit a `tailwind.config` theme extension mapping primitive/semantic tokens to Tailwind's color/spacing/fontSize scales, plus a small set of React components (`AgentBubble`, `ApprovalBanner`, `PresenceIndicator`, etc.) that consume those Tailwind classes rather than inline styles, so the host project's existing Tailwind pipeline (purge/JIT) keeps working.
2. **Plain HTML/CSS/JS** — emit CSS custom properties (`--amara-color-*`, `--amara-space-*`, etc.) generated 1:1 from the semantic layer, plus vanilla-JS state classes for the avatar state machine and presence indicator. Zero build step required — this is the tier the `/examples` previews use, so they render by opening the file directly.
3. **Theme-config object for existing chat-widget SDKs** — emit a flat JSON object shaped to match common third-party widget SDK theming APIs (color map, font map, corner-radius value, avatar URL/state map), so a generated system can be dropped into a widget the user already has installed rather than requiring a from-scratch build. This is the bridge from "AI-generated design" to "actually deployable" — treat it as a first-class output, not an afterthought, since most competing design-generation tools stop at throwaway code that never gets integrated.

All three generators are pure functions of `theme.json` — regenerating a component or adapter after a token change should never require re-answering the elicitation flow, only re-running the adapter over the updated file.
