# Investigation: dashboards

Report: qa/content/out/pages/dashboards.json (run 2026-10-16)

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/dashboards.md | https://docs.datadoghq.com/api/latest/dashboards/
- Astro local: http://localhost:4321/api/latest/dashboards.md | http://localhost:4321/api/latest/dashboards/
- Astro staging: https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/dashboards.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/dashboards/

Four findings, all `structure` / unreviewed. The HTML coverage check matched all 162 prod HTML chunks, so no content is missing. Drift check: none of the three Hugo commits this branch lacks that touch the API (#40737, #40713, #40657) change the dashboards tag, the breadcrumbs, the badges, or the site list.

## I1. Frontmatter description differs

Recommendation: no change (user, 2026-10-16)
Findings: 1 (structure). Samples: 3a85630fbfcd
Location: frontmatter `description`

Hugo .md: "Datadog, the leading service for cloud-scale monitoring."
Astro .md: "Manage all your dashboards, as well as access to your shared dashboards, through the API. See the Dashboards page for more information."
Prod HTML: `<meta name=description>` and `og:description` are both the generic site text. Astro local uses the tag description for all four meta tags.

Cause: Hugo falls back to the site-wide default because the API tag pages have no `description`. Astro builds one from the tag description (`src/lib/api/pageMeta.ts:36`).
Proposed fix: none. Astro's text looks like an improvement.
User: keep Astro's. Applies to every page.

## I2. Breadcrumb label is "API" instead of "API Reference"

Recommendation: human review
Findings: 1 (structure). Samples: 66b9e2644779
Location: frontmatter `breadcrumbs`

Hugo .md: "Docs > API Reference > Dashboards"
Astro .md: "Docs > API > Dashboards"
Prod HTML: the breadcrumb markup has only "Docs". The rest isn't in the static HTML. Astro local's HTML breadcrumb reads "Docs > API > Dashboards".

Cause: Astro uses `translate("api")` for the middle crumb (`src/lib/api/pageMeta.ts:26-30`). Nothing in `hugo/layouts` or `hugo/config` produces "API Reference", so the prod .md generator gets that label from somewhere outside this repo.
Proposed fix: none.
User (2026-10-16): probably intentional. Flag it for human review, with no question first.

## I3. Preview badge is "(preview)" instead of "preview"

Recommendation: no change (user, 2026-10-16)
Findings: 1 (structure), 2 headings. Samples: 2298b1431367
Location: h2 for `get-usage-stats-for-all-dashboards` and `get-usage-stats-for-a-dashboard`

Hugo .md: `## [Get usage stats for all dashboards →](…) preview{% #get-usage-stats-for-all-dashboards %}`
Astro .md: `## [Get usage stats for all dashboards](…) (preview)`
Search: `usage stats for all` on each .md page.

Cause: The Astro plaintext heading writes the badge in parentheses on purpose. Hugo writes it bare.
Proposed fix: none.
Related, and not flagged by the tool because it normalizes them: Hugo's link text ends in " →" and the heading carries a `{% #anchor %}` tag. Astro has neither.
User: "(preview)" is fine, and so are the missing "→" and anchor tag. Not a problem. Applies to every page.

## I4. Endpoint table rows are in a different order

Recommendation: no change (user, 2026-10-16)
Findings: 1 (structure), 16 endpoint tables. Samples: a5e87cd41018
Location: every operation's endpoint table on this page

Hugo .md order: ap1, ap2, eu, gov, us2-gov, uk1, us1, us3, us5
Astro .md order: us1, us3, us5, eu, ap1, ap2, uk1, gov, us2-gov
Prod HTML: same order as the Hugo .md, but the region selector shows only one row at a time, so the order only matters in the .md.
Search: `Datadog site` on each .md page, first table under "Create a new dashboard".

Cause: Astro follows the region list in `src/config/regions.ts`, which is the region selector's order. The reason for Hugo's order is unknown.
Related, and not flagged by the tool: Astro bolds the method (`**POST**`). Hugo doesn't.
Proposed fix: none.
User: the region-selector order and the bold method are both fine. Applies to every page.
