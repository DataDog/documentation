# Fixes: dashboards/get-a-dashboard

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/dashboards/get-a-dashboard.md | https://docs.datadoghq.com/api/latest/dashboards/get-a-dashboard/
- Astro local (fixed): http://localhost:4321/api/latest/dashboards/get-a-dashboard.md | http://localhost:4321/api/latest/dashboards/get-a-dashboard/
- Astro staging (before): https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/dashboards/get-a-dashboard.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/dashboards/get-a-dashboard/

## F1. Rows under an array of oneOf stop one level early

What was wrong: Astro caps rows at level 10, as Hugo does, but counted an array of oneOf (such as `queries`) one level deeper than Hugo, so every `[<oneOf>]` on the path used up an extra level and the deepest rows were cut.
What changed: in `src/lib/api/refResolver.ts`, union `items` resolve at the array's own level (`arrayItemsLevel`), so options sit at + 1 and their fields at + 2, as for a `oneOf` property. Fixing that showed a second bug: a union at level 10 still emitted its option rows at level 11. `buildUnionOptions` now returns none past the cap, as Hugo does. Tests: `src/lib/api/refResolver.test.ts` (array oneOf versus property oneOf depth, and options at the cap). The get-a-dashboard view, HTML and plaintext snapshots gained three `sort` rows under `group_by`.
Findings covered: about 988. Samples: 09f50c01991a

To check the plaintext: count table rows (`| ` lines) on each `.md` page, and search for `| sort` + `| metric`.
To check the HTML: run the row count check at the top of the investigation file.
Success: the `.md` has 13,246 table rows locally, 12,192 on staging and 13,511 on prod, counting lines that start with `| `. The `aggregation` > `Object 1` rows match prod (30 each); before this fix's cap change, local had 2 extra at level 11 under `split_group`.

What's left, and where:

- `| query | search` under `<data_source=product_analytics_extended>` (the success check in I1) had 3 locally and 32 on prod after this fix, because `query` is `ProductAnalyticsBaseQuery`, a `$ref` to a `$ref`. F2 fixed it: local now has 32.
- `| sort | metric`: local has 87 and prod 93. Every missing one sits under the `<items>` wrapper row, which costs a level. That's I4.

Status: [ ] approved
Feedback:

## F2. A schema that is only a `$ref` to another schema renders with no fields

What was wrong: `propertyToField` followed one `$ref`. `ProductAnalyticsBaseQuery` is only a `$ref` to `ProductAnalyticsEventQuery`, so the result had no `properties`, and `base_query` and `query` became leaf `object` rows.
What changed: `propertyToField` in `src/lib/api/refResolver.ts` follows the chain until the target isn't a `$ref`, adding each ref to `visited`, and keeps the first target's description ("Base query for Product Analytics."). A property's own description next to its `$ref` is still ignored; that's I5. Tests: `src/lib/api/refResolver.test.ts` (a reference to a reference, and a reference to itself). No snapshot changed, because the fixture has no such chain.
Findings covered: about 189. Samples: `base_query.data_source` and `base_query.search` under `cohort_criteria`

To check the plaintext: search for `| base_query` + `| search` and `| query` + `| search` on each `.md` page.
To check the HTML: open `<data_source=product_analytics_retention>` > `search` > `cohort_criteria` > `base_query`.
Success: local has 38 `base_query` > `search` rows and 32 `query` > `search` rows, the same as prod, with the description "Base query for Product Analytics.". Staging has none.

Status: [ ] approved
Feedback:

## F3. `additionalProperties` fields are missing

Covered by aws-integration/list-all-aws-integrations F2, with F1 and F2 on this page for the rows under it. Checked on this page: local has 56 `| additionalProperties | <any-key> |` rows (28 `object` "Base query for Product Analytics." and 28 `string`) and 18 `<any-key>` > `data_source` rows, the same as prod.

## Row count check after F1 to F3

Local `.md`: 13,484 table rows. Prod: 13,511. Every widget row that prod has and local doesn't is under the `<items>` wrapper (`group_by` > `facet`, `limit` and `sort`, and the topology map's `Object 41`), which is I4, in the next batch.

## F7. Line breaks inside .md table cells break the tables

Covered by aws-integration/list-all-aws-integrations F1. Checked on this page: local has no table row that doesn't end in `|` (staging snapshot: 35 on monitors/create-a-monitor). The 3 `graphing_json/request_json` links that lacked `.md` now have it (local has 5 `graphing_json/request_json.md` links).

## F8. .md drops the link on "scope" in the OAuth sentence

Covered by dashboard-lists/get-all-dashboard-lists F1. Checked on this page: local has `authorization [scope](http://localhost:4321/api/latest/scopes.md#dashboards)`.

## F4. Astro adds a wrapper row under a oneOf option that is an array or a oneOf

What was wrong: an option that is an array of objects resolved to a nameless array field with the item fields under it, so the .md showed `| Object 1 | <items> | [object] | …` and the item fields had `<items>` as their parent. The HTML showed an extra nameless row with the same description. An option that is itself a oneOf (`Object 41`, the topology map `definition`) had the same nameless row above its inner options. The investigation listed `Object 41` under I4 as an array; it's a nested oneOf.
What changed: `buildUnionOptions` in `src/lib/api/refResolver.ts` builds each option's rows with the new `optionFields`. An array option of objects gets its item fields directly, and its option row keeps the `[object]` type. A union option gets its inner options as rows of their own (`optionAsField`). Both resolve at the levels Hugo's `rowRecursive` uses, so the depth cap cuts at the same row. Tests: `src/lib/api/refResolver.test.ts` (item fields under an array option, their depth, and inner options under a union option). The get-a-dashboard view, HTML and plaintext snapshots lost the `<items>` row under `group_by` > `Object 1`.
Findings covered: about 120. Samples: 2644bb8c05d8, 6f647121c3ac, b6ea035736f6, 9fb9fd42bc78

To check the plaintext: search for `<items>` on each `.md` page, and for `| Object 1 | facet`.
To check the HTML: search for `List of objects used to group by.` on each page, and open `definition` > `Object 41`.
Success: local `.md` has no `<items>` rows and has `| Object 1 | facet [*required*] | string | Event facet. |`. `List of objects used to group by.` appears 31 times on the local HTML page, as on prod. `Object 1` and `Object 2` sit directly under `Object 41`, as on prod.

Status: [ ] approved
Feedback:

## F5. A property's own description and deprecated flag next to a `$ref` are ignored

What was wrong: the spec writes properties such as `{$ref: LogQueryDefinition, deprecated: true, description: "Deprecated - Use …"}`. `propertyToField` read `description` and `deprecated` only from the target schema, so `apm_query` read "The log query." with no deprecated marker, and `rollup` read "Calendar interval definition.".
What changed: while `propertyToField` in `src/lib/api/refResolver.ts` follows a `$ref` chain, it keeps the first `description` it finds, starting with the property's own, and marks the field deprecated if any link in the chain is. Tests: `src/lib/api/refResolver.test.ts` (own description, own deprecated flag). The get-a-dashboard snapshots show nine `*_query` rows as deprecated, with the description "Deprecated - Use `queries` and `formulas` instead.".
Findings covered: about 300. Samples: 0253856c3e7e, a361de3f8cde, a3c5d461cf83, 7f901e52f94f, dc0b72924ec6

To check: search for `Use queries and formulas instead` on each `.md` page, and for `Calendar-aligned time bucket` on each page.
Success: local `.md` has 232 matches for ``Use `queries` and `formulas` instead``, the same as prod. Local HTML has 232 too, each with the DEPRECATED marker. `rollup` reads "Calendar-aligned time bucket for time series queries …". `Calendar interval definition` still shows 19 times, as on prod, where the property has no description of its own.

Status: [ ] approved
Feedback:

## F6. .md drops enum values on oneOf option rows

What was wrong: the plaintext twin built an option row's description from the option's description alone. It skipped the enum values and default that it adds for field rows, and that the HTML shows.
What changed: `src/components/ApiSchemaTable/plaintext/ApiSchemaTable.ts` builds option-row descriptions with the same enum and default parts as field rows (`getOptionDescription`, sharing `valueParts` with `getFieldDescription`). Test: `src/components/ApiSchemaTable/plaintext/tests/unit.test.ts`. No snapshot changed, because the fixture has no enum option.
Findings covered: 30. Samples: c9c8753eac77

To check: search for `Standard aggregation types for events-based queries.` on each `.md` page.
Success: the local row reads ``| aggregation | Object 1 | enum | Standard aggregation types for events-based queries. Allowed values: `avg`, `cardinality`, `count`, `delta`, `earliest`, `latest`, `max`, `median`, `min`, `most_frequent`, `sum`. |``.

Status: [ ] approved
Feedback:

## Row count check after F4 to F6

Local `.md` has 13,512 lines that start with `| `, and prod has 13,511. Comparing the parent and field columns of every row, the only schema row that differs is local's `widgets | (recursive)` (I9, human review). The other differences are table format: Astro's parameter tables have a `Parent field` column, and the region table bolds the method (both covered by the .md format items).
