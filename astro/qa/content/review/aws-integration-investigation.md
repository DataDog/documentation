# Investigation: aws-integration

Report: qa/content/out/pages/aws-integration.json (run 2026-10-16)

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/aws-integration.md | https://docs.datadoghq.com/api/latest/aws-integration/
- Astro local: http://localhost:4321/api/latest/aws-integration.md | http://localhost:4321/api/latest/aws-integration/
- Astro staging: https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/aws-integration.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/aws-integration/

Four findings, all `structure` / unreviewed, and each matches a dashboards item. The HTML coverage check matched all 242 prod HTML chunks. Drift check: #40737 changes the documented permissions for the three CCM config mutations (`hugo/data/api/v2/full_spec.yaml`) and adds `hugo/data/changelog/aws-integration.yml`. No finding or HTML chunk on this page differs because of it, so it isn't an item here. #40713 and #40657 don't touch this tag.

## I1. Frontmatter description differs

Recommendation: no change, per dashboards I1
Findings: 1 (structure). Samples: 8ff538dae7bd
Location: frontmatter `description`

Hugo .md: "Datadog, the leading service for cloud-scale monitoring."
Astro .md: "Configure your Datadog-AWS integration directly through the Datadog API. For more information, see the AWS integration page."

## I2. Breadcrumb label is "API" instead of "API Reference"

Recommendation: human review, same as dashboards I2
Findings: 1 (structure). Samples: 559d8ba25139
Location: frontmatter `breadcrumbs`

Hugo .md: "Docs > API Reference > AWS Integration"
Astro .md: "Docs > API > AWS Integration"

Cause: Astro uses `translate("api")` for the middle crumb (`src/lib/api/pageMeta.ts:26-30`).
Proposed fix: none.

## I3. Badges are in parentheses

Recommendation: no change, per dashboards I3
Findings: 1 (structure), 11 headings. Samples: 1812dc4f514e
Location: h2 for 4 deprecated operations (the tag filter ones and `list-namespace-rules`) and 7 preview operations (the CCM config ones and the two metric name filter ones)
Search: `deprecated` or `(preview)` on each .md page.

Hugo .md: `## [Get all AWS tag filters →](…) deprecated{% #get-all-aws-tag-filters %}`
Astro .md: `## [Get all AWS tag filters](…) (deprecated)`

This page adds the "deprecated" badge, which dashboards didn't have. It's the same badge rendering as "preview", so the dashboards decision covers it. "Get AWS metric name filter preview preview" in the report isn't a bug: the operation's name ends in "preview", and then the badge follows it.

## I4. Endpoint table rows are in a different order

Recommendation: no change, per dashboards I4
Findings: 1 (structure), every operation's endpoint table. Samples: e9f0e4d2299d
Search: `Datadog site` on each .md page.

Hugo .md order: ap1, ap2, eu, gov, us2-gov, uk1, us1, us3, us5
Astro .md order: us1, us3, us5, eu, ap1, ap2, uk1, gov, us2-gov
