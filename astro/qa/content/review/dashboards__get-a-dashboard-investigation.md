# Investigation: dashboards/get-a-dashboard

Report: qa/content/out/pages/dashboards\_\_get-a-dashboard.json (run 2026-10-16)

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/dashboards/get-a-dashboard.md | https://docs.datadoghq.com/api/latest/dashboards/get-a-dashboard/
- Astro local: http://localhost:4321/api/latest/dashboards/get-a-dashboard.md | http://localhost:4321/api/latest/dashboards/get-a-dashboard/
- Astro staging: https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/dashboards/get-a-dashboard.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/dashboards/get-a-dashboard/

2,428 findings: 44 `astro-malformed`, 9 `hugo-malformed`, 921 `changed`, 1 `paragraph-split`, 1,421 `missing-in-astro`, 20 `extra-in-astro` and 12 `structure`. Almost all are rows in the 200 response model, the `Dashboard` schema with every widget type. The HTML coverage check found 13,389 of 13,561 prod HTML chunks in both and 172 in Hugo's .md only. Drift check: none of #40737, #40713 or #40657 touches Dashboards.

## Row count check

The 200 model is too large to compare by eye. Paste these into the browser console on each HTML page to count its rows:

- Prod: `document.querySelectorAll('#GetDashboard-200-model .table-row').length`, which returns 13486.
- Astro, local or staging: `document.querySelector('[role="tabpanel"][id$="-model-0"]').querySelectorAll('.schema-table__row').length`, which returns 12167 before the fixes.

I checked both selectors against the fetched HTML. After I1 to I4, the Astro count should come close to 13486. Any gap that's left should be explained before the items are marked done.

## I1. Rows under an array of oneOf stop one level early

Recommendation: automatic fix. done: F1
Findings: about 988 of the 1,334 missing-in-astro rows (astro-wrong, HTML matches the Hugo .md). Samples: 09f50c01991a
Location: 200 model, deep inside widget queries, such as `widgets` → `definition` → `<type=bar_chart>` → `requests` → `queries` → `<data_source=product_analytics_extended>` → `query`
Search: `| query                                     | search` on each .md page. Hugo's has 85 hits and Astro's has none.

Prod: `query` has `data_source` and `search` rows under it, and `search` has its own children.
Astro: `query` has no rows under it.

Cause: Astro caps nesting at level 10 to match Hugo (`src/lib/api/refResolver.ts:24`), but it counts levels differently under an array of oneOf. Hugo puts the option rows at the array's level + 1 and their fields at + 2. Astro goes into the items at + 1 (`refResolver.ts:501` and `:890`), and then `buildUnionOptions` adds 2 more (`:330`, called from `:440`). So the fields land at + 3. Every `[<oneOf>]` field, such as `queries`, uses up one extra level, and the deepest level gets cut.
Check: I tried a copy of `refResolver.ts` where the oneOf branch at `:440` counts one level less. It brought back 988 of the missing rows and added 8 rows that the report doesn't list (`group_by.sort` and `aggregation.Object 1` and `.Object 2`). Check those 8 against prod during the fix.
Scope: every schema deep enough to reach the cap through a `[<oneOf>]` field. Most are dashboard widgets: Get, Create, Update and Delete a dashboard, and other operations that return `Dashboard` or `Widget`.
Proposed fix: count a oneOf reached through array items at the array's level, as Hugo does. Add a resolver test that compares the levels of a property oneOf and of an array of oneOf.
Success: the Astro .md has `| query | search [*required*] | object | Search configuration for Product Analytics event query.` under `<data_source=product_analytics_extended>`, and the row count check gets closer to prod.

## I2. A schema that is only a `$ref` to another schema renders with no fields

Recommendation: automatic fix. done: F2
Findings: about 189 of the missing-in-astro rows (astro-wrong, HTML matches the Hugo .md). Samples: in the 200 model, `base_query.data_source` and `base_query.search` under `cohort_criteria`
Location: `<data_source=product_analytics_retention>` → `search` → `cohort_criteria` → `base_query`
Search: `| base_query                                | search` on each .md page. Hugo's has 38 hits and Astro's has none.

Cause: `ProductAnalyticsBaseQuery` is `{$ref: ProductAnalyticsEventQuery, description: …}`, a reference to another reference. `propertyToField` follows only one `$ref` (`refResolver.ts:829`). Then the result has no `properties`, so `base_query` becomes a leaf `object`. Hugo resolves the whole chain.
Check: the same patched copy, which followed the chain and kept the outer description, brought back another 189 rows.
Scope: `ProductAnalyticsBaseQuery` is the only schema like this in v1. There are none in v2. It's used in retention, journey and extended queries across all widget types.
Proposed fix: follow `$ref` chains until the target isn't a `$ref`, still checking `visited`. Keep the outermost description (see I5). Add a resolver test with a schema that is only a reference.
Success: the Astro .md has `data_source` and `search` rows under `base_query`.

## I3. `additionalProperties` fields are missing

Recommendation: automatic fix (per aws-integration/list-all-aws-integrations I2). done: covered by aws-integration/list-all-aws-integrations F2
Findings: 92 (missing-in-astro tableRow: 56 `additionalProperties.<any-key>`, plus 36 `<any-key>.data_source` and `<any-key>.search`)
Location: `search` → `node_objects` in user journey queries

Success: the Astro .md shows `| additionalProperties | <any-key> | object | Base query for Product Analytics. |` with `data_source` and `search` under `<any-key>`.

## I4. Astro adds a wrapper row under a oneOf option that is an array

Recommendation: automatic fix (user, 2026-10-16). done: F4
Findings: about 120: 15 extra-in-astro (`Object 1.<items>`, `Object 41.<items>`, with the HTML check not-found), 41 changed matches-neither (Astro's parent is `<items>` where Hugo's is the option), and about 65 missing-in-astro (`Object 1.facet`, `Object 1.limit`, `Object 1.sort`, `sort.*`). Samples: 2644bb8c05d8, 6f647121c3ac, b6ea035736f6, 9fb9fd42bc78
Location: `group_by` under events queries ("Object 1 [object] List of objects used to group by."), and the `definition` option for the topology map widget (Object 41)
Search: `List of objects used to group by.` on each HTML page. Prod has it 31 times and Astro 44 times, because the wrapper repeats it.

Prod: `Object 1 | [object] | List of objects used to group by.`, with `facet`, `limit` and `sort` directly under it.
Astro HTML: the same option row, then a row with no name showing `[object]` and the same description, then `facet`, `limit` and `sort` under that row.
Astro .md: the wrapper row is `| Object 1 | <items> | [object] | …`, and its children have `<items>` as their parent.

Cause: an option that is an array resolves to a single nameless array field with the item fields as children (`buildUnionOptions`, `refResolver.ts:330`). The scalar-option handling right after it lifts a nameless leaf onto the option row, but nothing does the same for a nameless array. The plaintext twin labels the nameless field `<items>` (`src/components/ApiSchemaTable/plaintext/ApiSchemaTable.ts:21`).
Scope: 9 schemas have a oneOf option that is an array of objects: v1 `FormulaAndFunctionEventQueryGroupByConfig` and `SharedDashboardInvitesData`; v2 `AnyValue`, `CIAppAggregateBucketValue`, `CIAppCreatePipelineEventRequestDataSingleOrArray`, `LLMObsPromptTemplate`, `LogsAggregateBucketValue`, `RUMAggregateBucketValue` and `SpansAggregateBucketValue`.
Proposed fix: when an option's only field is a nameless array, put that array's children directly under the option, and keep the option's `[object]` type. Add a resolver test and update the snapshots.
Success: `List of objects used to group by.` shows up 31 times on the Astro HTML page, and the Astro .md has `| Object 1 | facet [*required*] | string | Event facet. |` with no `<items>` rows.

## I5. A property's own description and deprecated flag next to a `$ref` are ignored

Recommendation: automatic fix (user, 2026-10-16). done: F5
Findings: about 300: 210 changed `deprecated-marker-differs,other`, 31 `deprecated-marker-differs`, and most of the 89 `other` rows that are astro-wrong and match the Hugo .md. All are astro-wrong, and the HTML matches the Hugo .md. Samples: 0253856c3e7e, a361de3f8cde, a3c5d461cf83, 7f901e52f94f, dc0b72924ec6
Location: 200 model, such as `requests.apm_query`, `compute.rollup`, `default_timeframe` and `requests.request_type`
Search: `Use queries and formulas instead` on each .md page.

Prod: `apm_query | object | DEPRECATED: Deprecated - Use queries and formulas instead.`
Astro: `apm_query | object | The log query.`, with no deprecated marker.
Prod: `rollup | object | Calendar-aligned time bucket for time series queries (…). Mutually exclusive with interval.`
Astro: `rollup | object | Calendar interval definition.`

Cause: the spec writes `{$ref: LogQueryDefinition, deprecated: true, description: "Deprecated - Use …"}`. `propertyToField` resolves the `$ref` and then reads `description` and `deprecated` only from the target schema (`refResolver.ts:829` and the returns at `:848-913`), so it drops the property's own values. Hugo uses the property's own values.
Scope: about 200 `$ref`s with a description of their own that differs from the target's (132 in v1, 69 in v2), and 98 with `deprecated: true` of their own (97 in v1). I counted roughly, over components and paths.
Proposed fix: when a `$ref` has its own `description` or `deprecated`, use those over the target schema's. That covers the HTML and the .md, which both read the resolved field. Add resolver tests for both and update the snapshots.
Success: both Astro pages show `apm_query` as deprecated, with the description "Deprecated - Use `queries` and `formulas` instead.", and `rollup` reads "Calendar-aligned time bucket…".

## I6. .md drops enum values on oneOf option rows

Recommendation: automatic fix. done: F6
Findings: 30 (changed `other`, astro-wrong, HTML matches the Hugo .md). Samples: c9c8753eac77
Location: `aggregation` → `Object 1` in events and retention compute
Search: `Standard aggregation types for events-based queries.` on each page.

Prod HTML and Astro HTML: "Standard aggregation types for events-based queries. Allowed enum values: avg, cardinality, …, sum".
Astro .md: `| aggregation | Object 1 | enum | Standard aggregation types for events-based queries. |`, with no values.

Cause: the plaintext twin builds an option row from `opt.description` alone (`src/components/ApiSchemaTable/plaintext/ApiSchemaTable.ts:61-68`). It skips the enum, default and other parts that `getFieldDescription` adds for fields (`:102`). The component shows them, so the twin is out of sync.
Scope: every oneOf option that is an enum, or has a default, across all pages.
Proposed fix: build option-row descriptions the same way as field descriptions. Add a plaintext unit test.
Success: the Astro .md row ends with ``Allowed values: `avg`, `cardinality`, … `sum`.``.

## I7. Line breaks inside .md table cells break the tables

Recommendation: automatic fix (per aws-integration/list-all-aws-integrations I1). done: covered by aws-integration/list-all-aws-integrations F1
Findings: 44 (astro-malformed, `table-cell-line-break`), plus 3 extra-in-astro links. Samples: 83adab2257d1

New: the 3 `graphing_json/request_json` links that didn't get `.md` (Astro .md line 608) all sit in a cell that breaks right after the link. Check that they get `.md` once this fix is in. If they don't, look at `mdLinkHref` (`src/lib/plaintext/helpers.ts:172`).

## I8. .md drops the link on "scope" in the OAuth sentence

Recommendation: automatic fix (per dashboard-lists/get-all-dashboard-lists I1). done: covered by dashboard-lists/get-all-dashboard-lists F1
Findings: 1 (missing-in-astro, link). Samples: f60aff4241c0

## I9. Astro shows a "(recursive)" row in the group widget

Recommendation: human review (user, 2026-10-16)
Findings: 1 (extra-in-astro, HTML check not-found). Samples: b1fbf16f813f
Location: `definition` → `<type=group>` → `widgets`
Search: `Circular reference to Widget` on each page. Only Astro has it.

Astro: `widgets | (recursive) | Widget | Circular reference to Widget.`
Prod: no row. Hugo replaces the circular `items` with `[Circular]` and renders nothing under it (`hugo/assets/scripts/build-api-pages.js`, in the `rowRecursive` array branch).
Options: keep the row, which tells the reader the schema repeats, or drop it to match prod.
Proposed fix: none.

## I10. .md leaves bare URLs in descriptions unlinked

Recommendation: human review (user, 2026-10-16)
Findings: 85 (missing-in-astro links, unreviewed): 60 `setting_primary_tags_to_scope`, 24 `widget_colors` and 1 `vega-lite`. Samples: 4c9e47bdfe2a, 7edf49c8f241, b9e66d27d08c
Search: `palettes can be found at` on each .md page.

Hugo .md: `palettes can be found at [https://docs.datadoghq.com/dashboards/guide/widget_colors](https://docs.datadoghq.com/dashboards/guide/widget_colors.md)`
Astro .md: `palettes can be found at https://docs.datadoghq.com/dashboards/guide/widget_colors`
Both HTML pages link the URL.

Hugo's .md cuts the primary tag URL off at `setting_primary_tag`, because it reads `_tags_` as emphasis. That's a Hugo bug.
Options: leave the URLs bare, since most Markdown readers autolink them, or turn bare docs URLs into links to their `.md` versions, like other docs links.
Proposed fix: none.

## I11. Hugo .md shortens descriptions and enum lists and drops defaults

Recommendation: no change (per monitors/create-a-monitor I7 and aws-integration/list-all-aws-integrations I4)
Findings: about 560 (changed: 173 `enum-values-differ` hugo-md-wrong, 169 `astro-adds-default` hugo-md-wrong, 124 `enum-values-differ` ambiguous, 46 `astro-adds-default` ambiguous, 8 `other` hugo-md-wrong, and the mixed types). Samples: fcd88dbaa6f4, 2b4870b84d4a, acef4caaf85d, 9b92e9415733

- The 124 ambiguous enum rows: Hugo's .md stops after 10 values. The prod HTML lists them all behind "Show N more", as Astro does.
- The 46 ambiguous default rows (42 are `Default: desc`): the prod HTML shows "default: desc", as Astro does.
- `style.order_by` and `is_read_only`: the prod HTML has the full description, as Astro does.

## I12. Astro shows "Default: false."

Recommendation: human review (per aws-integration/list-all-aws-integrations I3)
Findings: 1 (changed, astro-wrong, HTML matches the Hugo .md). Samples: a64627af5d11

## I13. Astro adds "Read-only." to field descriptions

Recommendation: human review (per authentication/validate-api-key I2)
Findings: 7 (changed, astro-wrong). Samples: de47a3661411

## I14. Response example comes from the spec, not the schema

Recommendation: human review (per dashboard-lists/get-all-dashboard-lists I3)
Findings: 2 (one missing-in-astro, one extra-in-astro, code). Samples: 743229e05dbf, 84c244731cf5

## I15. Curl example differs

Recommendation: human review (per authentication/validate-api-key I3)
Findings: 3 (one hugo-malformed `unfenced-code`, two changed code). Samples: bb4c95b002b0, 7f6491aaa003

Prod exports the path parameter (`export dashboard_id="CHANGE_ME"`). Check that the curl variable fix (usage-metering/get-hourly-usage-for-lambda I6) covers path parameters here.

Checked after usage-metering/get-hourly-usage-for-lambda F6: local exports `dashboard_id="CHANGE_ME"` and the URL uses `${dashboard_id}`. The rest stays human review.

## I16. Overview text is split and placed differently

Recommendation: human review (per dashboard-lists/get-all-dashboard-lists I2)
Findings: 1 (paragraph-split). Samples: 2951c4f6ab0c

## I17. Breadcrumb trail skips the category and ends at the operation

Recommendation: human review (per authentication/validate-api-key I1)
Findings: 1 (structure). Samples: 02a1356e9530

## I18. Astro .md format differs from Hugo's .md

Recommendation: human review (per authentication/validate-api-key I4 and aws-integration/list-all-aws-integrations I11)
Findings: 9 (structure). Samples: 17497aa94a02, b9355345eb17, 5fec5fa7776f, bd883508748c, 90d001de9052, 99e120a157ce, 414149b74017, e0d4758bb826, 01eaa291b519

## I19. Hugo .md merges run commands into the Instructions paragraph

Recommendation: no change (per authentication/validate-api-key I5)
Findings: 8 (hugo-malformed, hugo-md-wrong, HTML matches Astro). Samples: aa3f54ac3c2b

## I20. Frontmatter description differs

Recommendation: no change (per dashboards I1)
Findings: 1 (structure). Samples: f7d207ea639c

## I21. Endpoint table rows are in a different order

Recommendation: no change (per dashboards I4)
Findings: 1 (structure). Samples: 940860b7f6c1
