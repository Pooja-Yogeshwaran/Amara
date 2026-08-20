# Platform adaptivity & output generation

## Platform adaptivity
Same token file, different layout rules — never a second token system per platform:
- **Embedded widget** — collapsed bubble is the default resting state; open state is a fixed-size panel (not full-viewport) anchored to a corner; performance budget from `system-defaults.md` is strictest here.
- **Full app** — thread can use the full viewport; header/sidebar layout is available for session/history chrome that the widget's tight footprint can't afford; approval banners can use more elaborate layout (e.g. inline in inline in thread instead of a fixed top overlay) as long as the elevation/reserved-color rules from `agent-states.md` still hold.
- **Mobile** — collapsed bubble becomes a floating action button or tab-bar entry point; open state is full-screen (there's no room for a floating panel); touch targets follow a minimum size independent of the visual `spacing.scale` step used for desktop hover targets — note this explicitly rather than silently reusing desktop hit-areas.

Layout rules live outside the token file (they're structural/responsive logic, not design tokens); the token file stays the single source of truth for color, type, spacing, motion, and component treatments across all three.

## Frame / window chrome
Separate question from platform mode above: what contains the widget, and does the brief actually specify it, or is a shape being assumed by default? Don't reach for "rounded floating panel, no title bar" reflexively — that's one point on a real spectrum:
- **Borderless overlay** — no visible frame at all, the panel just sits on top of the host page (the default this repo's `/examples` mostly use). Right for most embedded-widget cases.
- **Windowed, with chrome** — a title bar (drag handle, minimize/close controls), resizable edges, maybe a native-feeling shadow/border — appropriate when the brief implies a desktop-app register, a multi-window workflow, or explicit user control over size/position rather than a fixed footprint.
- **Iframe-embedded** — the host page owns the outer frame entirely; the generated system only controls what's inside it, and must assume it cannot rely on `100vh`/viewport-relative units behaving like the top-level page. Note this constraint explicitly rather than silently generating CSS that only works standalone.
- **Native app shell** (Electron/Tauri-style, or a platform-native window) — can assume real OS-level window controls exist elsewhere; don't duplicate a close/minimize affordance the OS chrome already provides.
Whichever shape applies, it's a structural decision like layout paradigm or platform mode — call it out in `meta.designPrinciple` or a components note when it's a system-shaping factor, the same way platform mode already is, rather than leaving it implicit in whichever adapter happens to get built first.

## Output generation — from tokens to deployable code

`theme.json` (validated against `schema/theme.schema.json`) is the only source of truth. Generators are adapters that read it and emit one of:

1. **React + Tailwind** — emit a `tailwind.config` theme extension mapping primitive/semantic tokens to Tailwind's color/spacing/fontSize scales, plus a small set of React components (`AgentBubble`, `ApprovalBanner`, `PresenceIndicator`, etc.) that consume those Tailwind classes rather than inline styles, so the host project's existing Tailwind pipeline (purge/JIT) keeps working.
2. **Plain HTML/CSS/JS** — emit CSS custom properties (`--amara-color-*`, `--amara-space-*`, etc.) generated 1:1 from the semantic layer, plus vanilla-JS state classes for the avatar state machine and presence indicator. Zero build step required — this is the tier the `/examples` previews use, so they render by opening the file directly.
3. **Theme-config object for existing chat-widget SDKs** — emit a flat JSON object shaped to match common third-party widget SDK theming APIs (color map, font map, corner-radius value, avatar URL/state map), so a generated system can be dropped into a widget the user already has installed rather than requiring a from-scratch build. This is the bridge from "AI-generated design" to "actually deployable" — treat it as a first-class output, not an afterthought, since most competing design-generation tools stop at throwaway code that never gets integrated.

All three generators are pure functions of `theme.json` — regenerating a component or adapter after a token change should never require re-answering the elicitation flow, only re-running the adapter over the updated file.
