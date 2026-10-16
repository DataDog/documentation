# Investigation: monitors/create-a-monitor

Report: qa/content/out/pages/monitors\_\_create-a-monitor.json (run 2026-10-16)

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/monitors/create-a-monitor.md | https://docs.datadoghq.com/api/latest/monitors/create-a-monitor/
- Astro local: http://localhost:4321/api/latest/monitors/create-a-monitor.md | http://localhost:4321/api/latest/monitors/create-a-monitor/
- Astro staging: https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/monitors/create-a-monitor.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/monitors/create-a-monitor/

235 findings: 53 `astro-malformed`, 11 `hugo-malformed`, 83 `changed`, 61 `missing-in-astro`, 13 `extra-in-astro` and 14 `structure`. The HTML coverage check found 832 of 903 prod HTML chunks in both, 69 in Hugo's .md only and 2 in Astro only. Drift check: none of #40737, #40713 or #40657 touches Monitors.

## I1. OAuth scope: Hugo shows the last AuthZ entry and Astro the first

Recommendation: human review (user, 2026-10-16)
Findings: 2 (one extra-in-astro prose, matches-neither; part of one missing-in-astro prose). Samples: f353d03fbbab, 8358345b0fd7
Location: the OAuth sentence after the endpoint table
Search: `authorization scope` on each page.

Prod HTML: "OAuth apps require the `monitors_draft_write` authorization scope to access this endpoint."
Astro .md and HTML: "OAuth apps require the `monitors_write` authorization scope to access this endpoint."

Cause: the spec lists two AuthZ alternatives, `monitors_write` and `monitors_draft_write` (`api-spec/v1/full_spec.yaml`, CreateMonitor `security`). Hugo loops over every entry and keeps the last (`hugo/layouts/partials/api/permissions.html:10-17`). Astro returns the first (`src/lib/api/operationBuilder.ts:94-110`). Either scope works, and neither site says so.
Scope: 17 operations have more than one AuthZ entry.
Options: list every scope ("`monitors_write` or `monitors_draft_write`"), or match Hugo and use the last one.
Proposed fix: none.

## I2. Request tables leave out read-only fields

Recommendation: human review (user, 2026-10-16)
Findings: 26 (missing-in-astro tableRow, astro-wrong, HTML matches the Hugo .md). Samples: a3522a3adf30, b2d5e271d521
Location: the request model table
Search: `overall_state` on each HTML page. Prod has 3 hits and Astro has 2, because the request copy is missing.

Prod: the request table includes `created`, `creator` (and its children), `deleted`, `id`, `matching_downtimes.id`, `modified`, `multi`, `options.aggregation` (and its children), `options.device_ids`, `overall_state` and `state` (with `state.groups` and its `<any-key>` children).
Astro: none of those rows.

Cause: Astro drops read-only fields from request bodies on purpose (`src/lib/api/operationBuilder.ts:142`, "a client cannot send" them). Hugo lists them.
Scope: every request body with read-only fields.
Options: keep omitting them, or include them as prod does.
Proposed fix: none.

## I3. Prod shows three request examples and three curl examples. Astro shows one of each.

Recommendation: human review (per incidents/create-an-incident I1)
Findings: 33 (24 missing-in-astro code, 1 hugo-malformed with no Astro side, 8 extra-in-astro code). Samples: 0b33d11bd4c3, 390e147f0d72-2, a5f84f5724eb, c2fd8d7e2c0e
Location: Request Example tab, Code Example curl tab, and the 200 Example tab
Search: `curl -X POST` on each .md page. Hugo's has 3 and Astro's has 1.

Cause: Hugo shows up to three request examples from `request.CreateMonitor*.json` (there are 9 under `hugo/content/en/api/v1/monitors/`), and one curl example for each. Astro has no request files, so it shows the spec's single example and one curl. The 200 response example differs as in dashboard-lists/get-all-dashboard-lists I3.

## I4. `additionalProperties` fields are missing

Recommendation: automatic fix (per aws-integration/list-all-aws-integrations I2)
Findings: 8 (missing-in-astro tableRow). Samples: in the 200 response model, `additionalProperties.<any-key>` and `<any-key>.last_nodata_ts`
Location: 200 response model, `state.groups`

Success: the Astro 200 model shows `<any-key>` under `state.groups`, with `last_nodata_ts`, `name`, `status` and so on.

## I5. Line breaks inside .md table cells break the tables

Recommendation: automatic fix (per aws-integration/list-all-aws-integrations I1)
Findings: 53 (astro-malformed, `table-cell-line-break`). Samples: 4608f5f4225d, 062fa6646375

## I6. Astro shows "Default: false." and "Default: 0."

Recommendation: human review (per aws-integration/list-all-aws-integrations I3)
Findings: 10 (changed, astro-wrong, `astro-adds-default`, HTML matches the Hugo .md). Samples: 4ba993d16e36, 0a760d54e6fc

New: `0` is dropped too (`options.min_failure_duration`, "Default: 0."). Hugo treats every falsy default as empty.

## I7. Hugo .md shortens descriptions and enum lists

Recommendation: no change
Findings: 60 (changed: 18 `astro-adds-default`, 4 `astro-adds-default,other`, 2 `other`, all hugo-md-wrong / matches-astro; 28 `enum-values-differ` hugo-md-wrong / matches-astro; 4 `enum-values-differ` astro-wrong / ambiguous; 2 `other` unreviewed / matches-neither; 2 `astro-adds-default,other` astro-wrong / matches-hugo-md). Samples: 108495320ca0, cc0b97eb277d, 615b521eb3b2, 7028f1cf7f12, d7c234255573

- Enum lists: Hugo's .md stops after 10 values, and its HTML cuts off with "…" behind an expander. Astro lists every value. The 4 "ambiguous" rows name `count_unique`, which both HTML pages have 4 times.
- `type [required]`: same cut-off. The prod HTML text ends in "…", so the tool reports matches-neither.
- `draft_status`: the description has three paragraphs. Hugo's .md keeps only the first. Both HTML pages have the full text ("appears as Draft" twice on each). The tool's HTML text kept only the first paragraph, so it reported astro-wrong.
- Defaults other than false and 0, and the second sentences of descriptions such as `options.new_group_delay`: the prod HTML has them and only Hugo's .md drops them.

## I8. Nested list in the description is flattened in Hugo's .md

Recommendation: no change
Findings: 1 (changed prose, unreviewed, matches-neither). Samples: e89aad521814
Location: the "Cost Alert Query" part of the operation description
Search: `timeframe_type` on each .md page.

Hugo .md: `- timeframe_type The timeframe type to evaluate the cost - for forecast supports current - …` on one line.
Astro .md: a nested list, as the spec writes it.

## I9. Hugo .md merges permissions and code into prose

Recommendation: no change
Findings: 4 (extra-in-astro prose, hugo-md-wrong, matches-astro) and the rest of 8358345b0fd7. Samples: e1d78386ea00, e2c0ca64458c

Hugo's .md runs "# an integer or decimal number…", the permission list ("monitors_write``monitors_draft_write") and the OAuth sentence together into one paragraph. The prod HTML separates them, as Astro does. The OAuth scope itself is I1.

## I10. Astro adds "Read-only." to field descriptions

Recommendation: human review (per authentication/validate-api-key I2)
Findings: 11 (changed, astro-wrong). Samples: d540aae6e98a, f058a436ce4c

## I11. Curl example differs

Recommendation: human review (per authentication/validate-api-key I3 and incidents/create-an-incident I9)
Findings: 4 (two hugo-malformed / matches-neither, one changed / astro-wrong, one structure `curl-comment-heading`). Samples: 390e147f0d72, 502a817a2d64, 56d4fc461a42

## I12. .md drops the link on "scope" in the OAuth sentence

Recommendation: automatic fix (per dashboard-lists/get-all-dashboard-lists I1)
Findings: 1 (missing-in-astro, link). Samples: 7d2bc7813633

## I13. Request heading and label differ

Recommendation: human review (per incidents/create-an-incident I2)
Findings: 2 (one structure, one missing-in-astro label). Samples: b5e6c2d36bce, 52d93cfe52e7

## I14. Breadcrumb trail skips the category and ends at the operation

Recommendation: human review (per authentication/validate-api-key I1)
Findings: 1 (structure). Samples: 24cc67ab6fdd

## I15. Astro .md format differs from Hugo's .md

Recommendation: human review (per authentication/validate-api-key I4 and aws-integration/list-all-aws-integrations I11)
Findings: 9 (structure). Samples: bff20c8395bb, e7613606a1ae, 073d6530eb3a, f84b3d62e9d4, 1580fece9f3f, 00bba82791ef, 1a63ca1b04ec, 1349df32e0e5, c6b95b387b13

New: `request-example-title` (f84b3d62e9d4). Hugo's .md has an empty h5 above each request example, where its HTML names the example. Astro has one example and no title.

## I16. Hugo .md merges run commands into the Instructions paragraph

Recommendation: no change (per authentication/validate-api-key I5)
Findings: 8 (hugo-malformed, hugo-md-wrong, HTML matches Astro). Samples: b13c4357da1d

## I17. Frontmatter description differs

Recommendation: no change (per dashboards I1)
Findings: 1 (structure). Samples: a796ec93389a

## I18. Endpoint table rows are in a different order

Recommendation: no change (per dashboards I4)
Findings: 1 (structure). Samples: 94a3f336ffd5
