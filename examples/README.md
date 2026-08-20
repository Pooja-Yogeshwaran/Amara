# Examples

The same sample agent — a support bot named differently per system, resolving one failed deploy and asking approval before touching staging — rendered across four points on the style spectrum. Same content, same interaction (message → background action → approval checkpoint → code reference → input bar), different systems.

Open any `preview.html` directly in a browser (no build step; pulls fonts from Google Fonts, otherwise fully self-contained). Each folder also has the `theme.json` that produced it, worth reading side by side with the render — that's the actual deliverable; the HTML is one adapter's output of it.

| Folder | Style family | Design principle |
|---|---|---|
| [`minimalist-swiss/`](minimalist-swiss/) | Minimalist / Swiss | Clarity over cleverness |
| [`claymorphism/`](claymorphism/) | Claymorphism | Warmth without noise |
| [`brutalism/`](brutalism/) | Brutalism / Neo-brutalism | Honesty over polish |
| [`maximalist-editorial/`](maximalist-editorial/) | Maximalist / Editorial | Editorial confidence, not decoration for its own sake |

Each `theme.json` also records what got cut during the self-critique pass in `meta.removedElement` — worth checking, since it's the part of the process that doesn't show up in a static screenshot.

## The other two output adapters

`preview.html` is the plain-HTML/CSS adapter. The other two adapters `platform-and-output.md` describes are demonstrated once, on `minimalist-swiss/`, rather than duplicated across all four:

- [`minimalist-swiss/adapter-react/`](minimalist-swiss/adapter-react/) — a `tailwind.config.js` extension generated from the theme, plus `ApprovalBanner.tsx` built on it. The component type-checks clean under `tsc --strict` (verified against real `react`/`@types/react`, not just read over).
- [`minimalist-swiss/adapter-widget-sdk/`](minimalist-swiss/adapter-widget-sdk/) — `widget-theme.json`, a flat config in the shape a typical third-party chat-widget SDK expects (color map, font map, corner-radius, avatar/state map).

## Custom & thematic icon requests ("cute ghost icons for each tab")

A generic open-source icon library covers *semantic* UI icons (send, close, settings) but not a *thematic* request like this — see [`minimalist-swiss/custom-icons/`](minimalist-swiss/custom-icons/) for a worked example: three original, hand-authored ghost icons (one shared silhouette, a small badge distinguishing each tab) applied to a real tab bar, with active/inactive states. Maps to the schema's `iconography.customMotif` and `components.tabBar` — see `references/resource-library.md`'s "Custom & thematic icon sets" section for the authorship decision this requires (hand-authored / AI-generated-with-license-review / commissioned).
