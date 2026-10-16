# Investigation: usage-metering

Report: qa/content/out/pages/usage-metering.json (run 2026-10-16)

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/usage-metering.md | https://docs.datadoghq.com/api/latest/usage-metering/
- Astro local: http://localhost:4321/api/latest/usage-metering.md | http://localhost:4321/api/latest/usage-metering/
- Astro staging: https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/usage-metering.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/usage-metering/

Four findings, all `structure` / unreviewed. The HTML coverage check matched all 544 prod HTML chunks, so no content is missing. Drift check: none of #40737, #40713 or #40657 touches the usage-metering tag.

## I1. Frontmatter description differs

Recommendation: no change (per dashboards I1)
Findings: 1 (structure). Samples: d1378863576a
Location: frontmatter `description`

Hugo .md: "Datadog, the leading service for cloud-scale monitoring."
Astro .md: "The usage metering API allows you to get hourly, daily, and monthly usage across multiple facets of Datadog. This API is available to all Pro and…"

Cause: same as dashboards I1.

## I2. Breadcrumb label is "API" instead of "API Reference"

Recommendation: human review (per dashboards I2)
Findings: 1 (structure). Samples: b59798506d5d
Location: frontmatter `breadcrumbs`

Hugo .md: "Docs > API Reference > Usage Metering"
Astro .md: "Docs > API > Usage Metering"

Cause: same as dashboards I2.

## I3. Badges are "(deprecated)" and "(preview)" instead of bare words

Recommendation: no change (per dashboards I3)
Findings: 1 (structure), 39 headings (35 deprecated, 4 preview). Samples: 78b615937eae
Location: h2 of the 39 badged operations
Search: `hourly usage for logs` on each .md page.

Hugo .md: `Get hourly usage for logs deprecated`
Astro .md: `Get hourly usage for logs (deprecated)`

Cause: same as dashboards I3. All 39 heading pairs differ only by the parentheses.

## I4. Endpoint table rows are in a different order

Recommendation: no change (per dashboards I4)
Findings: 1 (structure), 54 endpoint tables. Samples: 3cadad2881b1
Location: every operation's endpoint table on this page

Cause: same as dashboards I4.
