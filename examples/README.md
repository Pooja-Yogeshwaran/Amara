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
