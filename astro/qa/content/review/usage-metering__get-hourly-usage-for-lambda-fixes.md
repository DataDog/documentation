# Fixes: usage-metering/get-hourly-usage-for-lambda

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/usage-metering/get-hourly-usage-for-lambda.md | https://docs.datadoghq.com/api/latest/usage-metering/get-hourly-usage-for-lambda/
- Astro local (fixed): http://localhost:4321/api/latest/usage-metering/get-hourly-usage-for-lambda.md | http://localhost:4321/api/latest/usage-metering/get-hourly-usage-for-lambda/
- Astro staging (before): https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/usage-metering/get-hourly-usage-for-lambda.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/usage-metering/get-hourly-usage-for-lambda/

## F1. Response models and examples are missing when the content type isn't exactly `application/json`

What was wrong: the response builder only read `content["application/json"]`. This operation's responses are `application/json;datetime-format=rfc3339`, so every status showed its description with no model or example. 63 operations were affected.
What changed: the response builder prefers `application/json`, then falls back to the first declared type, like the request body builder, in `src/lib/api/operationBuilder.ts`. Examples are kept for JSON types only (including `text/json` and types with parameters). Test: `src/lib/api/operationBuilder.test.ts`. The lambda view, HTML and plaintext snapshots gained the models.
Findings covered: 20. Samples: 6efb18215157, 5502df3adfbb, 296eb4a2e41e

To check the plaintext: search for `func_count` on each `.md` page.
To check the HTML: open the page, expand Response, and select the 200, 400, 403 and 429 tabs in turn.
Success: local shows the 200 model with `usage` > `func_count` and an example, and the error model ("Error response object.", `errors`) on 400, 403 and 429, as prod does. Staging shows only "OK", "Bad Request" and so on.

Worth a look: for non-JSON responses (`text/csv`, `application/zip`, `application/octet-stream`, `application/yaml`, `multipart/form-data`; 10 responses), local shows the schema without an Example tab. Prod shows an Example tab with `{}`, for example https://docs.datadoghq.com/api/latest/service-level-objectives/get-slo-report/.

Status: [ ] approved
Feedback:

## F2. Version label is "(latest)" on a deprecated operation

What was wrong: Astro labeled the first variant "(latest)" every time. Hugo labels a deprecated one "(deprecated)".
What changed: a shared `variantLabel` in `src/lib/api/pageMeta.ts` labels a deprecated first variant "(deprecated)". The operation page's tabs and the operation `.md` headings both use it. Later variants are unchanged. Test: `src/lib/api/pageMeta.test.ts`.
Findings covered: none. It wasn't in the report; found by comparing the HTML.

To check the plaintext: search for `## v1` on each `.md` page.
To check the HTML: look at the version tab above the endpoint.
Success: local shows "v1 (deprecated)" in the tab and the `.md` heading, as the prod tab does. Staging shows "v1 (latest)".

Status: [ ] approved
Feedback:

## F4. .md drops the link on "scope" in the OAuth sentence

Covered by dashboard-lists/get-all-dashboard-lists F1. Checked on this page: local has `authorization [scope](http://localhost:4321/api/latest/scopes.md#usage-metering)`, matching prod.

## F6. Curl references a variable it never sets

What was wrong: when a required query parameter or a path parameter had no example, the curl URL used `${START_HR}` but nothing exported it, so the pasted command sent an empty `start_hr`.
What changed: `src/lib/api/curlBuilder.ts` exports each such parameter as `"CHANGE_ME"` under `# Path parameters` or `# Required query arguments`, as Hugo does, and the URL uses the lowercase name. Parameters with an example stay inlined in the URL. Test: `src/lib/api/curlBuilder.test.ts`. The lambda and get-a-dashboard view, HTML and plaintext snapshots gained the export.
Findings covered: 2. Samples: 906fa96768ca, 70108436a3bd

To check the plaintext: search for `start_hr=` on each `.md` page.
To check the HTML: open the Curl tab in Code Example.
Success: local has `export start_hr="CHANGE_ME"` and the URL uses `?start_hr=${start_hr}`, as prod does. Staging uses `${START_HR}` with no export.

Status: [ ] approved
Feedback:
