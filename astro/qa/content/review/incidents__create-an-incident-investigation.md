# Investigation: incidents/create-an-incident

Report: qa/content/out/pages/incidents\_\_create-an-incident.json (run 2026-10-16)

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/incidents/create-an-incident.md | https://docs.datadoghq.com/api/latest/incidents/create-an-incident/
- Astro local: http://localhost:4321/api/latest/incidents/create-an-incident.md | http://localhost:4321/api/latest/incidents/create-an-incident/
- Astro staging: https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/incidents/create-an-incident.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/incidents/create-an-incident/

70 findings: 2 `astro-malformed`, 7 `hugo-malformed`, 26 `changed`, 1 `paragraph-split`, 19 `missing-in-astro`, 3 `extra-in-astro` and 12 `structure`. The HTML coverage check found 195 of 215 prod HTML chunks in both. This is the first POST page, so it's the first with a request body. Drift check: none of #40737, #40713 or #40657 touches Incidents.

## I1. Request example comes from the spec, not from Hugo's request files

Recommendation: human review
Findings: 1 of the 2 missing-in-astro code findings, and 1 of the 2 extra-in-astro (astro-wrong). Samples: c58f67b3bf5a, 0920ca718458
Location: Request, Example tab
Search: `"customer_impacted"` on each page.

Prod HTML and Hugo .md: `"title": "Example-Incident"`, `"fields": {"state": {"type": "dropdown", "value": "resolved"}}`, plus a `commander_user` relationship.
Astro .md and HTML: `"customer_impact_scope": "Example customer impact scope"`, `"fields": {"severity": {"type": "dropdown", "value": "SEV-5"}}`, and so on.

Cause: Hugo takes request examples from `request.<operationId><suffix>.json` files next to the content (`hugo/layouts/partials/api/request-body.html:98-120`), showing up to three. 784 of those files are committed under `hugo/content/en/api/`. Astro's staged examples (`api-code-examples/`) don't include them, so Astro uses the spec's `examples` instead.
Scope: every operation with a request body.
Options: stage the request JSON files with the code examples and use them, or keep the spec examples.
Proposed fix: none. Astro can't read `hugo/`, so a fix needs the data staged.

## I2. Request heading and label differ

Recommendation: human review
Findings: 2 (one structure, one missing-in-astro label, astro-wrong). Samples: 20dda59d3118, 341adfa0970f
Location: the Request section heading

Prod HTML and Hugo .md: an h3 "Request", then a "Body Data (required)" label.
Astro HTML and .md: an h3 "Request Body (required)", with no label.

Cause: Astro merges the heading and the label.
Scope: every operation with a request body.
Proposed fix: none.

## I3. `additionalProperties` fields are missing, including oneOf ones

Recommendation: automatic fix (per aws-integration/list-all-aws-integrations I2)
Findings: 14 (missing-in-astro, astro-wrong, HTML matches the Hugo .md). Samples: 7d464af233bb, 0b9a5e7b8b92
Location: `attributes.fields` in the request model and the 201 response model

Hugo .md: `additionalProperties | <any-key> | <oneOf> | Dynamic fields for which selections can be made, with field names as keys.`, then `Object 1` and `Object 2`, each with `type` and `value`.
Astro: no rows.

Cause: same as aws-integration I2. Here `additionalProperties` is a `oneOf`, so the fix has to resolve unions under `<any-key>` too. Add a test for that case.
Success: both Astro pages show `<any-key>` (`<oneOf>`) with Object 1 and Object 2 under `fields`.

## I4. Line breaks inside .md table cells break the tables

Recommendation: automatic fix (per aws-integration/list-all-aws-integrations I1)
Findings: 2 (astro-malformed, `table-cell-line-break`). Samples: 1cc1f3fa939e, 2077ac014e9e
Location: 201 response model, `attributes.customer_impact_duration` and `attributes.time_to_detect`

## I5. Astro shows "Default: false."

Recommendation: human review (per aws-integration/list-all-aws-integrations I3)
Findings: 1 (changed, astro-wrong, `astro-adds-default`, HTML matches the Hugo .md). Samples: aa884c3c1020
Location: request model, `<cell_type=markdown>.important`

## I6. Hugo .md omits non-false defaults

Recommendation: no change (per aws-integration/list-all-aws-integrations I4)
Findings: 14 (changed, `astro-adds-default`: 3 hugo-md-wrong / matches-astro, 11 astro-wrong / ambiguous). Samples: b29cd17a1e50, b3156374ecae
Location: single-value enum `type` fields, such as `data.type` (default `incidents`, `users`)

All are string enum defaults. The tool marked 11 of them ambiguous because several rows share the key `data.type`. The prod HTML shows "default: incidents" three times, and Astro shows "Default: incidents" three times, so the HTML matches. Only Hugo's .md drops them.

## I7. Response example comes from the spec, not the schema

Recommendation: human review (per dashboard-lists/get-all-dashboard-lists I3)
Findings: 1 of the 2 missing-in-astro code findings, and 1 of the 2 extra-in-astro. Samples: c61e72083248, 8ff711fbaf23
Location: 201, Example tab

## I8. Astro adds "Read-only." to field descriptions

Recommendation: human review (per authentication/validate-api-key I2)
Findings: 10 (changed, astro-wrong). Samples: 90e4e4d99390

## I9. Curl example differs

Recommendation: human review (per authentication/validate-api-key I3)
Findings: 3 (one hugo-malformed / matches-neither, one changed / astro-wrong, one structure `curl-comment-heading`). Samples: 007bdbab0f00, bfed49cf0b8d, 0aeca1319236

New for POST: prod's curl starts with a `## default` comment line (the example name). Hugo's .md turns it into an empty h1, which is a Hugo .md bug. Astro's curl has no such line.

## I10. .md drops the link on "scope" in the OAuth sentence

Recommendation: automatic fix (per dashboard-lists/get-all-dashboard-lists I1)
Findings: 1 (missing-in-astro, link). Samples: 4e38fa7b8057

## I11. Help link uses `.md`

Recommendation: no change
Findings: 2 (one missing-in-astro, one extra-in-astro, links). Samples: 5013b4dc619a, cd47516fe40f
Location: the overview text that links to support

Hugo .md: `https://docs.datadoghq.com/help/`
Astro .md: `https://docs.datadoghq.com/help.md`

Cause: Astro's .md points docs links at their .md version. https://docs.datadoghq.com/help.md returns 200 on prod. The local link 404s only because Astro serves only `/api`.

## I12. Overview text is split and placed differently

Recommendation: human review (per dashboard-lists/get-all-dashboard-lists I2)
Findings: 1 (paragraph-split). Samples: 029b53557c5c

## I13. Breadcrumb trail skips the category and ends at the operation

Recommendation: human review (per authentication/validate-api-key I1)
Findings: 1 (structure). Samples: 43dec5df9772

## I14. Astro .md format differs from Hugo's .md

Recommendation: human review (per authentication/validate-api-key I4 and aws-integration/list-all-aws-integrations I11)
Findings: 7 (structure). Samples: f5d7f909ebd4, 4428e31c2d3e, 0156d33b8bdb, f9530ca806d9, 4c4cd90a1241, 60244d4c8e48, 0b3607d38cc7

## I15. Hugo .md merges run commands into the Instructions paragraph

Recommendation: no change (per authentication/validate-api-key I5)
Findings: 6 (hugo-malformed, hugo-md-wrong, HTML matches Astro). Samples: a3f7acf6e80f

## I16. Frontmatter description differs

Recommendation: no change (per dashboards I1)
Findings: 1 (structure). Samples: c409e22b76cf

## I17. Endpoint table rows are in a different order

Recommendation: no change (per dashboards I4)
Findings: 1 (structure). Samples: eb9d09e2020b
