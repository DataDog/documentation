# Investigation: usage-metering/get-hourly-usage-for-lambda

Report: qa/content/out/pages/usage-metering\_\_get-hourly-usage-for-lambda.json (run 2026-10-16)

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/usage-metering/get-hourly-usage-for-lambda.md | https://docs.datadoghq.com/api/latest/usage-metering/get-hourly-usage-for-lambda/
- Astro local: http://localhost:4321/api/latest/usage-metering/get-hourly-usage-for-lambda.md | http://localhost:4321/api/latest/usage-metering/get-hourly-usage-for-lambda/
- Astro staging: https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/usage-metering/get-hourly-usage-for-lambda.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/usage-metering/get-hourly-usage-for-lambda/

41 findings: 8 `hugo-malformed`, 1 `paragraph-split`, 1 `changed`, 18 `missing-in-astro`, 1 `extra-in-astro`, 9 `structure` and 3 `structure-unmapped`. The HTML coverage check found 57 of 77 prod HTML chunks in both. The other 20 are in Hugo's .md only, and almost all of them are the response models and examples (I1). Drift check: none of #40737, #40713 or #40657 touches Usage Metering.

## I1. Response models and examples are missing when the content type isn't exactly `application/json`

Recommendation: automatic fix. done: F1
Findings: 20 (17 missing-in-astro, astro-wrong, HTML matches the Hugo .md; 3 structure-unmapped). Samples: 6efb18215157, 5502df3adfbb, 296eb4a2e41e, bd0a3f971048, 5a8c56558157, e66d94a6229d
Location: Response section, all four status tabs (200, 400, 403, 429)
Search: `func_count` on each page. It's on both prod pages, and absent from both Astro pages.

Prod HTML and Hugo .md: each status has a Model tab (description and field table) and an Example tab.
Astro .md and HTML: each status shows only its description ("OK", "Bad Request" and so on), with no model, table or example.

Cause: the spec's response content type is `application/json;datetime-format=rfc3339` (`api-spec/v1/full_spec.yaml:43872`). The response builder reads only `content["application/json"]` (`src/lib/api/operationBuilder.ts:235`), so it finds nothing. The request body builder already falls back to the first declared type (`operationBuilder.ts:133-139`), with the comment "Hugo renders a body whatever its content type."
Scope: 63 operations have at least one response with content but no `application/json` key. The content types are `application/json;datetime-format=rfc3339` (195 responses), `text/json` (15), `application/zip` (4), `text/csv` (2), `application/octet-stream` (2), `multipart/form-data` (1) and `application/yaml` (1).
Proposed fix: in the response builder, prefer `application/json`, then fall back to the first declared type, as the request builder does. Add a test with an `application/json;datetime-format=rfc3339` response, and update the affected snapshots.
Success: http://localhost:4321/api/latest/usage-metering/get-hourly-usage-for-lambda/ and its .md show the 200 model with `usage.func_count` and an example, plus the error model on 400, 403 and 429.

## I2. Version label is "(latest)" on a deprecated operation

Recommendation: automatic fix (user, 2026-10-16). done: F2
Findings: none. It isn't in the report. Found by comparing the HTML.
Location: the version tab in the HTML, and the version heading in the .md
Search: `v1 (` on each HTML page.

Prod HTML: tab "v1 (deprecated)"
Astro HTML: tab "v1 (latest)". Astro .md: `## v1 (latest)`.

Cause: Hugo labels a version "deprecated" instead of "latest" when the operation has `deprecated: true` (`hugo/layouts/partials/api/endpoint-visibility.html:11`). Astro labels the first variant "(latest)" every time (`src/pages/[...lang]/api/latest/[category]/[operation].astro:97-100`). The plaintext heading (`src/components/ApiEndpoint/plaintext/ApiEndpoint.ts`) does the same.
Scope: every deprecated operation, such as the 35 on usage-metering.
Proposed fix: label a deprecated variant "(deprecated)" instead of "(latest)", in both the tab and the .md heading. Add tests for both.
Success: the Astro HTML tab and the .md heading show "v1 (deprecated)" on this page.

## I3. Astro adds a "This endpoint is deprecated." alert

Recommendation: human review (user, 2026-10-16)
Findings: 1 (extra-in-astro, astro-wrong, HTML check not-found). Samples: 4f5105ab320b
Location: under the version heading, before the description
Search: `This endpoint is deprecated` on each page.

Astro .md and HTML: a warning alert, "This endpoint is deprecated."
Prod: no alert. The spec description already says "**Note:** This endpoint has been deprecated…", so Astro says it twice.

Cause: Astro renders the alert for every operation with `deprecated: true` (`src/components/ApiEndpoint/ApiEndpoint.astro:91-93`, `plaintext/ApiEndpoint.ts:46-52`). Hugo shows a per-endpoint notice only for a v1 endpoint in a tag with `x-deprecated` that also has a v2 version (`hugo/layouts/partials/api/endpoint.html:44`).
Scope: every deprecated operation.
Options: keep the alert, remove it, or show it only where Hugo does.
Proposed fix: none.

## I4. .md drops the link on "scope" in the OAuth sentence

Recommendation: automatic fix (per dashboard-lists/get-all-dashboard-lists I1). done: covered by dashboard-lists/get-all-dashboard-lists F1
Findings: 1 (missing-in-astro, link). Samples: 68433f971259

Hugo .md links "scope" to `scopes.md#usage-metering`. Astro .md has no link.

## I5. Overview text is split and placed differently

Recommendation: human review (per dashboard-lists/get-all-dashboard-lists I2)
Findings: 1 (paragraph-split, astro-wrong). Samples: e5bc5043a4d8

Prod has the description and "This endpoint requires the `usage_read` permission." in one paragraph. Astro separates them, and the .md puts the description above the endpoint table.

## I6. Curl references a variable it never sets

Recommendation: automatic fix (user, 2026-10-16). done: F6
Findings: 2 (one hugo-malformed / matches-neither, one changed / astro-wrong). Samples: 906fa96768ca, 70108436a3bd
Location: Code Example, Curl tab
Search: `start_hr=` on each page.

Prod HTML: `# Required query arguments`, then `export start_hr="CHANGE_ME"`, and the URL uses `?start_hr=${start_hr}`.
Astro .md and HTML: the URL uses `?start_hr=${START_HR}`, but nothing exports `START_HR`. Pasting the command sends an empty `start_hr`.

Cause: when a required path or query parameter has no example, `curlBuilder.ts` writes `${NAME}` into the URL (`src/lib/api/curlBuilder.ts:129` for path, `:152` for query) and doesn't export it. Hugo's template exports each one (`hugo/layouts/partials/api/curl.html:42-71`).
Scope: every operation with a required path or query parameter that has no example.
Proposed fix: export every variable the curl references, under `# Required query arguments` (and the path equivalent), with lowercase names and the value `"CHANGE_ME"`, as prod does. Add curlBuilder tests for a query parameter and a path parameter.
Success: the Astro curl on this page has `export start_hr="CHANGE_ME"`, and its URL uses `${start_hr}`.

The rest of the curl difference (the `DD_SITE` export block, the comment and the header order) is human review, per authentication/validate-api-key I3.

## I7. Breadcrumb trail skips the category and ends at the operation

Recommendation: human review (per authentication/validate-api-key I1)
Findings: 1 (structure). Samples: 702dffcb5322

## I8. Astro .md format differs from Hugo's .md

Recommendation: human review (per authentication/validate-api-key I4)
Findings: 6 (structure). Samples: 0e41ff67d8be, 97ec22d172d0, 272bef3fcd34, cebdc468769d, eac826b3442b, 26252e789a71

New on this page: the arguments table is `Name | Type | Description` in Hugo and `Parent field | Field | Type | Description` in Astro (eac826b3442b). The `schema-parent-field-column` finding has no Astro side, because Astro has no error model tables (I1).

## I9. Hugo .md merges run commands into the Instructions paragraph

Recommendation: no change (per authentication/validate-api-key I5)
Findings: 7 (hugo-malformed, hugo-md-wrong, HTML matches Astro). Samples: 1cf4b2c8ee03

## I10. Frontmatter description differs

Recommendation: no change (per dashboards I1)
Findings: 1 (structure). Samples: 1f36e84abbbf

## I11. Endpoint table rows are in a different order

Recommendation: no change (per dashboards I4)
Findings: 1 (structure). Samples: e64667bca5fd
