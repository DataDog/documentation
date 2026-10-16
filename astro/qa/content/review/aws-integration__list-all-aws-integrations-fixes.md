# Fixes: aws-integration/list-all-aws-integrations

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/aws-integration/list-all-aws-integrations.md | https://docs.datadoghq.com/api/latest/aws-integration/list-all-aws-integrations/
- Astro local (fixed): http://localhost:4321/api/latest/aws-integration/list-all-aws-integrations.md | http://localhost:4321/api/latest/aws-integration/list-all-aws-integrations/
- Astro staging (before): https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/aws-integration/list-all-aws-integrations.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/aws-integration/list-all-aws-integrations/

## F1. Line breaks inside .md table cells break the tables

What was wrong: `tableMd` parsed each cell as Markdown, and a line break in a spec description survived into the row. A Markdown table row can't span lines, so the row broke, and a blank line could split the table in two.
What changed: `tableMd` in `src/lib/plaintext/helpers.ts` collapses line breaks in cell text to single spaces before parsing. Test: `src/lib/plaintext/helpers.test.ts`. Four plaintext snapshots changed: the joined rows, plus re-padded columns.
Findings covered: 14. Samples: 4a1671b5806b, 4fb649be4bba, 0302e84f8aeb

To check the plaintext: search for `aws_account_id | string | Optional query` on the `.md` page.
To check the HTML: no change; the HTML was already fine.
Success: local has `If not provided, all accounts are returned.` on the same line as `aws_account_id`, and every table row is one line, as in the Hugo `.md`. Staging breaks the row.

Worth a look:

- Lists and paragraphs in a cell description become one run of text. For example, `display_type` reads "Combination of: - A severity error, warning, ok, or info - A line type: …". A table cell can't hold a list, so this is the best a plain row can do, but compare it with the Hugo `.md`.
- A cell that had two paragraphs used to fall back to raw text, so links in it weren't parsed. They now are, so their docs links get `.md` like links in other cells. Example: `is_read_only` on dashboards/get-a-dashboard links to `restriction-policies.md`.

Status: [ ] approved
Feedback:

## F2. `additionalProperties` fields are missing

What was wrong: nothing in the resolver read `additionalProperties`, so a map-like object such as `account_specific_namespace_rules` showed no rows under it.
What changed: `schemaToFields` in `src/lib/api/refResolver.ts` turns a non-empty `additionalProperties` object into one child field named `<any-key>`, resolved like any property, so `$ref`s, objects and `oneOf`s expand under it. As in Hugo, it's skipped when the object has `properties`, and `true` or `{}` add no row. The plaintext twin (`src/components/ApiSchemaTable/plaintext/ApiSchemaTable.ts`) puts `additionalProperties` in the parent column of the `<any-key>` row, as Hugo's `.md` does. Tests: `src/lib/api/refResolver.test.ts` and `src/components/ApiSchemaTable/plaintext/tests/unit.test.ts`. The aws-integration, incidents and monitors view, HTML and plaintext snapshots gained the rows; nothing else in them changed.
Findings covered: 1. Samples: 3bc9f0250cb0

To check the plaintext: search for `<any-key>` on each `.md` page.
To check the HTML: open the v1 tab, expand the 200 response, then `accounts` > `account_specific_namespace_rules`.
Success: both local pages show `<any-key>` (boolean, "A list of additional properties.") under `account_specific_namespace_rules`, and the `.md` row is `| additionalProperties | <any-key> | boolean | A list of additional properties. |`, as prod does. Staging has no row.

Status: [ ] approved
Feedback:
