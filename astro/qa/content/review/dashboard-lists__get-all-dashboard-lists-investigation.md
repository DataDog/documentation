# Investigation: dashboard-lists/get-all-dashboard-lists

Report: qa/content/out/pages/dashboard-lists\_\_get-all-dashboard-lists.json (run 2026-10-16)

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/dashboard-lists/get-all-dashboard-lists.md | https://docs.datadoghq.com/api/latest/dashboard-lists/get-all-dashboard-lists/
- Astro local: http://localhost:4321/api/latest/dashboard-lists/get-all-dashboard-lists.md | http://localhost:4321/api/latest/dashboard-lists/get-all-dashboard-lists/
- Astro staging: https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/dashboard-lists/get-all-dashboard-lists.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/dashboard-lists/get-all-dashboard-lists/

29 findings: 9 `hugo-malformed`, 8 `changed`, 1 `paragraph-split`, 2 `missing-in-astro`, 1 `extra-in-astro` and 8 `structure`. The HTML coverage check found 76 of 80 prod HTML chunks in both. The other 4 are in Hugo's .md only: the curl example (I5) and the response example (I3). Drift check: none of #40737, #40713 or #40657 touches Dashboard Lists.

## I1. .md drops the link on "scope" in the OAuth sentence

Recommendation: automatic fix
Findings: 1 (missing-in-astro, link). Samples: bdf4ff53f296
Location: the OAuth sentence after the endpoint table
Search: `authorization scope` on each .md page.

Hugo .md: "OAuth apps require the `dashboards_read` authorization [scope](https://docs.datadoghq.com/api/latest/scopes.md#dashboard-lists) to access this endpoint."
Astro .md: "OAuth apps require the `dashboards_read` authorization scope to access this endpoint." There's no link.
Astro HTML: links "scope" to `/api/latest/scopes/#dashboard-lists`, like prod.

Cause: the plaintext twin writes the sentence with no link (`src/components/ApiEndpoint/plaintext/ApiEndpoint.ts:89-96`). The component links "scope" when `ep.oauthScopesAnchor` is set (`src/components/ApiEndpoint/ApiEndpoint.astro:168-181`). The twin is out of sync with its component.
Scope: every operation with OAuth scopes, on operation pages and category pages.
Proposed fix: in the twin, link "scope" to the scopes page's .md with the same anchor whenever the component does. Add a plaintext test.
Success: the Astro .md has `authorization [scope](http://localhost:4321/api/latest/scopes.md#dashboard-lists)`, and the link loads.

## I2. Overview text is split and placed differently

Recommendation: human review (user, 2026-10-16)
Findings: 1 (paragraph-split, astro-wrong, HTML matches the Hugo .md). Samples: 6c75bf71fb8c
Location: the operation description and the permissions sentence
Search: `existing dashboard list definitions` on each page.

Prod HTML and Hugo .md: after the endpoint table, under "Overview", one paragraph: "Fetch all of your existing dashboard list definitions. This endpoint requires the `dashboards_read` permission."
Astro HTML: after the table, the description and then the permissions sentence as separate blocks (`api-endpoint__permissions`).
Astro .md: the description goes above the endpoint table, and the permissions sentence after it.

Cause: Astro renders permissions as their own block, separate from the description. The .md also moves the description above the table.
Scope: every operation with permissions.
Proposed fix: none.

## I3. Response example comes from the spec, not the schema

Recommendation: human review (user, 2026-10-16)
Findings: 2 (one missing-in-astro, one extra-in-astro, code, both astro-wrong). Samples: e884161ee849, 5e5d19dc6165
Location: response 200, Example tab
Search: `"dashboard_lists"` on each page.

Prod HTML and Hugo .md: an example built from the schema, with placeholders: `"email": "string"`, `"dashboard_count": "integer"`, `"name": "My Dashboard"`.
Astro .md and HTML: the spec's `examples.default` value: `"handle": "test@example.com"`, `"dashboard_count": 0`, `"id": 123`, `"name": "My Dashboard List"`.

Cause: the spec has `examples.default` for this response (`api-spec/v1/full_spec.yaml:30991`). Astro uses it. Hugo ignores it and builds from the schema. Not drift: Hugo's spec has the same example.
Scope: every response that has a spec example.
Options: keep the spec examples, or build from the schema, as prod does.
Proposed fix: none.

## I4. Astro adds "Read-only." to field descriptions

Recommendation: human review (per authentication/validate-api-key I2)
Findings: 7 (changed, astro-wrong, `astro-adds-read-only`). Samples: 685c137594f1
Location: response 200 model table, `dashboard_lists.*` fields such as `id` and `created`

Cause: same as validate-api-key I2.

## I5. Curl example differs

Recommendation: human review (per authentication/validate-api-key I3)
Findings: 2 (one hugo-malformed / matches-neither, one changed / astro-wrong). Samples: 5eb4b9a99678, 45242f132f8b
Location: Code Example, Curl tab

Prod: a bearer token export, then `# Curl command`, then Accept before Authorization.
Astro: adds `# Set your Datadog site and credentials` and `export DD_SITE`, drops `# Curl command`, and puts Authorization before Accept.

Cause: same as validate-api-key I3.

## I6. Breadcrumb trail skips the category and ends at the operation

Recommendation: human review (per authentication/validate-api-key I1)
Findings: 1 (structure). Samples: b328c7ca4d44

Hugo .md: "Docs > API Reference > Dashboard Lists"
Astro .md: "Docs > API > Get all dashboard lists"

Cause: same as validate-api-key I1.

## I7. Astro .md format differs from Hugo's .md

Recommendation: human review (per authentication/validate-api-key I4)
Findings: 5 (structure). Samples: 4a2969768a60, 2fa923e84b61, 3392f478cd48, a89414502626, 96ed326ddcf8

Cause: same as validate-api-key I4. The language tabs include "Python [legacy]" and "Ruby [legacy]", which line up with Hugo's.

## I8. Hugo .md merges run commands into the Instructions paragraph

Recommendation: no change (per authentication/validate-api-key I5)
Findings: 8 (hugo-malformed, hugo-md-wrong, HTML matches Astro). Samples: 8493ecc56abe

## I9. Frontmatter description differs

Recommendation: no change (per dashboards I1)
Findings: 1 (structure). Samples: 6dc9602988df

## I10. Endpoint table rows are in a different order

Recommendation: no change (per dashboards I4)
Findings: 1 (structure). Samples: d30d78f15e14
