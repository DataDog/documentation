# Investigation: incidents

Report: qa/content/out/pages/incidents.json (run 2026-10-16)

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/incidents.md | https://docs.datadoghq.com/api/latest/incidents/
- Astro local: http://localhost:4321/api/latest/incidents.md | http://localhost:4321/api/latest/incidents/
- Astro staging: https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/incidents.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/incidents/

Eleven findings, all unreviewed: three `missing-in-astro`, three `extra-in-astro`, four `structure` and one `structure-unmapped`. The HTML coverage check matched all 922 prod HTML chunks. Drift check: none of #40737, #40713 or #40657 touches Incidents.

## I1. Operation slug differs when the summary has an apostrophe

Recommendation: automatic fix (per monitors I1). done: covered by monitors F1
Findings: 6 (three missing-in-astro, three extra-in-astro, all links). Samples: 1de9ea743207, 48a3572e786b
Location: the h2 links for "List an incident's impacts", "Get a list of an incident's todos" and "Get a list of an incident's integration metadata"
Search: `incident's` on each .md page.

Hugo .md: links to `list-an-incidents-impacts.md`, `get-a-list-of-an-incidents-todos.md`, `get-a-list-of-an-incidents-integration-metadata.md`
Astro .md: links to `list-an-incident-s-impacts.md` and so on.

Cause: same as monitors I1. All three are among the 25 operations that fix covers.
Success: http://localhost:4321/api/latest/incidents/list-an-incidents-impacts/ returns 200.

## I2. Badge missing from the .md when an operation is both deprecated and preview

Recommendation: automatic fix. done: F2
Findings: 2 (one structure, one structure-unmapped). Samples: 3895d4bbc4b8, d1a4b3042ad8
Location: the h2 for "Create a page from an incident"
Search: `Create a page from an incident` on each .md page.

Hugo .md: `## [Create a page from an incident →](…) deprecated preview`
Astro .md: `## [Create a page from an incident](…) (deprecated)`
Astro HTML: shows both the deprecated and the preview badge, like prod. Only the .md drops one.

Cause: the plaintext twin uses `else if`, so it writes "(preview)" only when the operation isn't deprecated (`src/components/ApiEndpointSummary/plaintext/ApiEndpointSummary.ts:29-33`). The Astro component renders each badge on its own (`src/components/ApiEndpointSummary/ApiEndpointSummary.astro:53-72`). The twin is out of sync with its component.
Scope: 17 operations site-wide are both deprecated and `x-unstable`, such as API Management's "List APIs" and Scorecards' "Create outcomes batch".
Proposed fix: write both suffixes when both flags are set: `(deprecated) (preview)`. The parentheses stay, per dashboards I3. Add a plaintext test for an operation with both flags.
Success: the Astro incidents .md shows `Create a page from an incident (deprecated) (preview)`.

## I3. Frontmatter description differs

Recommendation: no change (per dashboards I1)
Findings: 1 (structure). Samples: cfef6bed334d
Location: frontmatter `description`

Cause: same as dashboards I1.

## I4. Breadcrumb label is "API" instead of "API Reference"

Recommendation: human review (per dashboards I2)
Findings: 1 (structure). Samples: 4c4797e1043c
Location: frontmatter `breadcrumbs`

Hugo .md: "Docs > API Reference > Incidents"
Astro .md: "Docs > API > Incidents"

Cause: same as dashboards I2.

## I5. Badges are "(preview)" and "(deprecated)" instead of bare words

Recommendation: no change (per dashboards I3)
Findings: part of 3895d4bbc4b8 (structure), 89 headings
Location: h2 of the badged operations, such as "Create an incident"

Cause: same as dashboards I3. 88 of the 89 heading pairs differ only by the parentheses. The other is I2.

## I6. Endpoint table rows are in a different order

Recommendation: no change (per dashboards I4)
Findings: 1 (structure), 92 endpoint tables. Samples: 2e451ec6ba38
Location: every operation's endpoint table on this page

Cause: same as dashboards I4.
