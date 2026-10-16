# Investigation: aws-integration/list-all-aws-integrations

Report: qa/content/out/pages/aws-integration\_\_list-all-aws-integrations.json (run 2026-10-16)

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/aws-integration/list-all-aws-integrations.md | https://docs.datadoghq.com/api/latest/aws-integration/list-all-aws-integrations/
- Astro local: http://localhost:4321/api/latest/aws-integration/list-all-aws-integrations.md | http://localhost:4321/api/latest/aws-integration/list-all-aws-integrations/
- Astro staging: https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/aws-integration/list-all-aws-integrations.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/aws-integration/list-all-aws-integrations/

59 findings: 14 `astro-malformed`, 16 `hugo-malformed`, 9 `changed`, 2 `paragraph-split`, 3 `missing-in-astro`, 3 `extra-in-astro` and 12 `structure`. The HTML coverage check found 197 of 206 prod HTML chunks in both. This page has two versions, v2 (latest) and v1. The version tab labels match prod. Drift check: none of #40737, #40713 or #40657 touches AWS Integration.

## I1. Line breaks inside .md table cells break the tables

Recommendation: automatic fix. done: F1
Findings: 14 (astro-malformed, reason `table-cell-line-break`). Samples: 4a1671b5806b, 4fb649be4bba, 0302e84f8aeb
Location: the arguments table and both 200 model tables, in the .md only
Search: `aws_account_id | string | Optional query` on the Astro .md.

Astro .md:

```
|              | aws_account_id | string | Optional query parameter to filter accounts by AWS Account ID.
  If not provided, all accounts are returned. |
```

Hugo .md: the same cell on one line.
Astro HTML: fine.

Cause: the spec description has a line break. `tableMd` (`src/lib/plaintext/helpers.ts:106-127`) parses each cell as Markdown, and the break survives as a soft break, so the serializer writes a newline in the middle of the row. A Markdown table row can't span lines, so the row breaks, and here a blank line after it splits the table.
Scope: every .md table cell whose text has a line break, on every page with such a description.
Proposed fix: in `tableMd`, collapse line breaks in cell text to single spaces before parsing. Add a helper test with a multi-line cell.
Success: each row on the Astro .md is one line, and `If not provided, all accounts are returned.` is on the same line as `aws_account_id`.

## I2. `additionalProperties` fields are missing

Recommendation: automatic fix (user, 2026-10-16). done: F2
Findings: 1 (missing-in-astro, astro-wrong, HTML matches the Hugo .md). Samples: 3bc9f0250cb0
Location: v1 response 200 model, under `accounts.account_specific_namespace_rules`
Search: `<any-key>` on each page.

Hugo .md: `| additionalProperties | <any-key> | boolean | A list of additional properties. |`
Prod HTML: a `<any-key>` row (boolean, "A list of additional properties.") nested under `account_specific_namespace_rules`.
Astro .md and HTML: no row.

Cause: the spec has `additionalProperties: {type: boolean, description: …}` on the field (`api-spec/v1/full_spec.yaml:63`). Nothing in `src/lib/api/` reads `additionalProperties`.
Scope: 284 schemas with an object `additionalProperties` across v1 and v2.
Proposed fix: resolve `additionalProperties` into a child field named `<any-key>`, with its type and description. It goes in the HTML table and the .md, with the parent in Parent field. Add a resolver test and update the snapshots.
Success: both Astro pages show `<any-key>` (boolean, "A list of additional properties.") under `account_specific_namespace_rules`.

## I3. Astro shows "Default: false."

Recommendation: human review (user, 2026-10-16)
Findings: 3 (changed, astro-wrong, `astro-adds-default`, HTML matches the Hugo .md). Samples: bc1d78befe14, 6b5beffdf061, 9a56e02a8ed8
Location: v1 response 200 model, such as `accounts.cspm_resource_collection_enabled`

Astro .md and HTML: "… Default: `false`."
Prod: no default. Prod does show "default: true" and "default: account".

Cause: the spec has `default: false`. Hugo's template treats `false` as empty and skips it. Astro shows it. Astro is accurate, and Hugo's behavior looks like a bug.
Proposed fix: none.

## I4. Hugo .md omits non-false defaults

Recommendation: no change
Findings: 2 (changed, hugo-md-wrong, `astro-adds-default`, HTML matches Astro). Samples: 17316db82e5e, 7f3711bdaf0f

`metrics_collection_enabled` (default `true`) and `data.type` (default `account`). The prod HTML shows the defaults, as Astro does. Only Hugo's .md drops them.

## I5. Response examples come from the spec, not the schema

Recommendation: human review (per dashboard-lists/get-all-dashboard-lists I3)
Findings: 4 (two missing-in-astro, two extra-in-astro, code). Samples: ed489a194a6c, 41c502651610, 948674273fe2, 7c1eb52e55b2
Location: the 200 Example tab in v2 and v1

Worse here: the v2 spec example is `{"data": []}`, so Astro's v2 example is empty. Prod's has a full account object built from the schema.

## I6. Astro adds "Read-only." to field descriptions

Recommendation: human review (per authentication/validate-api-key I2)
Findings: 2 (changed, astro-wrong). Samples: 664a2a742c07

## I7. Astro adds a "This endpoint is deprecated." alert on v1

Recommendation: human review (per usage-metering/get-hourly-usage-for-lambda I3)
Findings: 1 (extra-in-astro, HTML not-found). Samples: 97eb5db34cf4

The v1 description already starts with "This endpoint is deprecated - use the V2 endpoints instead."

## I8. Overview text is split and placed differently

Recommendation: human review (per dashboard-lists/get-all-dashboard-lists I2)
Findings: 2 (paragraph-split). Samples: 0f91a0bb13d3, d2d90bcdc52f

## I9. Curl example differs

Recommendation: human review (per authentication/validate-api-key I3)
Findings: 4 (two hugo-malformed / matches-neither, two changed / astro-wrong). Samples: 808a0ae81bd1, 510cb63750fb

## I10. Breadcrumb trail skips the category and ends at the operation

Recommendation: human review (per authentication/validate-api-key I1)
Findings: 1 (structure). Samples: b62d1d8d915c

## I11. Astro .md format differs from Hugo's .md

Recommendation: human review (per authentication/validate-api-key I4)
Findings: 9 (structure). Samples: e8aa014c833f, 56e3e7a3390d, 424236a66fd4, 79cc9345e95c, ad6f0c2aede1, 9524ca79b433, 802cfb7ae14f, e8fb5fd04460, 6eda9a40093f

Three new forms, all in the .md only. The HTML for each matches prod, apart from spacing.

| Element          | Hugo .md                                     | Astro .md                                  |
| ---------------- | -------------------------------------------- | ------------------------------------------ |
| Enum values      | `Allowed enum values: aws,aws-cn,aws-us-gov` | `Allowed values: aws, aws-cn, aws-us-gov.` |
| Deprecated field | `DEPRECATED: Deprecated in favor of …`       | `Deprecated in favor of … Deprecated.`     |
| oneOf array type | `[ <oneOf>]`                                 | `[<oneOf>]`                                |

## I12. Hugo .md merges run commands into the Instructions paragraph

Recommendation: no change (per authentication/validate-api-key I5)
Findings: 14 (hugo-malformed, hugo-md-wrong, HTML matches Astro). Samples: 745604375b36

## I13. Frontmatter description differs

Recommendation: no change (per dashboards I1)
Findings: 1 (structure). Samples: 621b07c0de94

## I14. Endpoint table rows are in a different order

Recommendation: no change (per dashboards I4)
Findings: 1 (structure). Samples: 3c585c6b77f9
