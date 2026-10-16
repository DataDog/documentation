# Investigation: dashboard-lists

Report: qa/content/out/pages/dashboard-lists.json (run 2026-10-16)

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/dashboard-lists.md | https://docs.datadoghq.com/api/latest/dashboard-lists/
- Astro local: http://localhost:4321/api/latest/dashboard-lists.md | http://localhost:4321/api/latest/dashboard-lists/
- Astro staging: https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/dashboard-lists.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/dashboard-lists/

Four findings: three `structure` / unreviewed and one `extra-in-astro` / astro-wrong. The HTML coverage check matched all 92 prod HTML chunks. Drift check: none of #40737, #40713 or #40657 touches Dashboard Lists.

## I1. Page-level "This endpoint is deprecated." notice in Astro only

Recommendation: human review (user, 2026-10-16)
Findings: 1 (extra-in-astro, astro-wrong, HTML check not-found). Samples: e821b9c96d86
Location: under the h1, before the tag description
Search: `deprecated` on the Astro local page and .md, then on prod. It's absent from both prod versions.

Astro .md: `{% alert level="warning" %}This endpoint is deprecated.{% /alert %}` under `# Dashboard Lists`
Astro HTML: the same text in a warning alert. Staging has it too.
Hugo: no notice, in the .md or the HTML.

Cause: the v1 spec's Dashboard Lists tag has `x-deprecated: true`. The v2 tag doesn't. Astro takes category metadata from the first spec that defines the tag, which is v1 (`src/lib/api/viewsBuilder.ts:364-370`). That makes the category `deprecated`, and the category page renders the alert (`src/pages/[...lang]/api/latest/[category].astro:63-67`, `[category].md.ts:42-46`). Hugo has no page-level notice. It uses the tag's `x-deprecated` only for a notice on each v1 endpoint that also has a v2 version (`hugo/layouts/partials/api/endpoint.html:44`). Prod doesn't show that notice on this page.
Impact: the page lists v2 operations that aren't deprecated, so the notice is misleading. Dashboard Lists is the only tag with `x-deprecated` in the live spec, so this is the only page affected.
Options: mark a category deprecated only when every spec that defines its tag sets `x-deprecated`, or drop the page-level alert entirely.
Proposed fix: none.
User (2026-10-16): human review.

## I2. Frontmatter description differs

Recommendation: no change (per dashboards I1)
Findings: 1 (structure). Samples: 7d32a6a5e659
Location: frontmatter `description`

Cause: same as dashboards I1.

## I3. Breadcrumb label is "API" instead of "API Reference"

Recommendation: human review (per dashboards I2)
Findings: 1 (structure). Samples: f3eefe521d4b
Location: frontmatter `breadcrumbs`

Hugo .md: "Docs > API Reference > Dashboard Lists"
Astro .md: "Docs > API > Dashboard Lists"

Cause: same as dashboards I2.

## I4. Endpoint table rows are in a different order

Recommendation: no change (per dashboards I4)
Findings: 1 (structure), 9 endpoint tables. Samples: beb7e06e53a0
Location: every operation's endpoint table on this page

Cause: same as dashboards I4.
