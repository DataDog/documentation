# Investigation: screenboards

Report: qa/content/out/pages/screenboards.json (run 2026-10-16)

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/screenboards.md | https://docs.datadoghq.com/api/latest/screenboards/
- Astro local: http://localhost:4321/api/latest/screenboards.md | http://localhost:4321/api/latest/screenboards/
- Astro staging: https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/screenboards.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/screenboards/

One finding, `structure` / unreviewed. There's no HTML coverage, because Astro has no page. Drift check: none of #40737, #40713 or #40657 touches Screenboards.

## I1. Page is absent in Astro

Recommendation: human review (user, 2026-10-16)
Findings: 1 (structure). Samples: 3dec8268fce5
Location: the whole page

Hugo .md: frontmatter only (title "Screenboards", the generic description, breadcrumbs "Docs > API Reference > Screenboards"), plus the llms.txt line. No body.
Prod HTML: 200. A title and the API nav, with no content. Nothing in the nav links to it. The only links to it are its own language switcher links.
Astro local: 404 for both the HTML and the .md.

Cause: the Screenboards tag is retired from the live spec. Hugo still serves a stub from `hugo/content/en/api/latest/screenboards/_index.md`, which has only `title: Screenboards`. Astro builds pages from the spec, so it has no page. The frozen test fixture still has the tag (`src/lib/api/__snapshots__/getCategoryViewBySlug/screenboards.json`), where it's marked deprecated with "This endpoint is outdated. Use the new Dashboard endpoint instead."
Related: Astro already redirects the old `/api/screenboards/` to `/api/latest/dashboards/` (`src/lib/api/legacyRedirects.ts:24`). Prod does the same with a 301.
Options: add `/api/latest/screenboards/` → `/api/latest/dashboards/` to `LEGACY_REDIRECTS`, or leave the 404.
Proposed fix: none.
User (2026-10-16): human review.
