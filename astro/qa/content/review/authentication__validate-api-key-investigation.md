# Investigation: authentication/validate-api-key

Report: qa/content/out/pages/authentication\_\_validate-api-key.json (run 2026-10-16)

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/authentication/validate-api-key.md | https://docs.datadoghq.com/api/latest/authentication/validate-api-key/
- Astro local: http://localhost:4321/api/latest/authentication/validate-api-key.md | http://localhost:4321/api/latest/authentication/validate-api-key/
- Astro staging: https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/authentication/validate-api-key.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/authentication/validate-api-key/

17 findings: 7 `hugo-malformed`, 2 `changed` and 8 `structure`. The HTML coverage check found 56 of 58 prod HTML chunks in both. The other 2 are in Hugo's .md only, and they're the curl example (I3). This is the first operation page, so several items set the pattern for later operation pages. Drift check: none of #40737, #40713 or #40657 touches Authentication.

## I1. Breadcrumb trail skips the category and ends at the operation

Recommendation: human review (user, 2026-10-16)
Findings: 1 (structure). Samples: ca02b335adc5
Location: frontmatter `breadcrumbs` in the .md, and the breadcrumb bar in the HTML

Hugo .md and prod HTML: "Docs > API Reference > Authentication"
Astro .md and HTML: "Docs > API > Validate API key"

Cause: operation pages call `apiBreadcrumbs(lang, operation.summary)` (`src/pages/[...lang]/api/latest/[category]/[operation].astro:133`, `[operation].md.ts:79`). `apiBreadcrumbs` builds Docs > API > page title (`src/lib/api/pageMeta.ts:16-33`), so there's no category crumb. Prod ends at the category and doesn't show the operation. The "API" label is the same issue as dashboards I2.
Scope: every operation page.
Options: add the category crumb (Docs > API > Authentication > Validate API key), or end the trail at the category, as prod does.
Proposed fix: none.

## I2. Astro adds "Read-only." to field descriptions

Recommendation: human review (user, 2026-10-16)
Findings: 1 (changed, astro-wrong, HTML matches the Hugo .md). Samples: 16178ba358d6
Location: response 200 model table, field `valid`
Search: `authentication response is valid` on each .md page.

Hugo .md and prod HTML: "Return `true` if the authentication response is valid."
Astro .md: "Return `true` if the authentication response is valid. Read-only."

Cause: the spec marks the field `readOnly: true` (`api-spec/v1/full_spec.yaml:710`). Astro writes that in the description, and Hugo never shows `readOnly`. Not drift: the flag is in the spec both sites build from.
Scope: 505 `readOnly: true` properties across v1 and v2.
Options: keep it as extra spec information, or remove it to match prod.
Proposed fix: none.

## I3. Curl example differs

Recommendation: human review (user, 2026-10-16)
Findings: 2 (one hugo-malformed / HTML matches-neither, one changed / astro-wrong / HTML matches the Hugo .md). Samples: 676011b2f7f5, 8f3550800e6c
Location: Code Example, Curl tab
Search: `curl -X GET` on each .md page.

Prod HTML:

```
# Curl command
curl -X GET "https://api.datadoghq.com/api/v1/validate" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}"
```

Astro .md and HTML:

```
# Set your Datadog site and credentials
export DD_SITE="datadoghq.com"
export DD_API_KEY="<DD_API_KEY>"

curl -X GET "https://api.datadoghq.com/api/v1/validate" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "Accept: application/json"
```

Hugo .md: the same curl as prod, but unfenced and flattened. That part is a Hugo .md bug.
Cause: Astro builds curl itself (`src/lib/api/curlBuilder.ts:81-95`) instead of using Hugo's template (`hugo/layouts/partials/api/curl.html`). It adds the export block and puts the auth headers before Accept.
Scope: every operation's curl example.
Options: keep Astro's, or match prod's comment, exports and header order.
Proposed fix: none.

## I4. Astro .md format differs from Hugo's .md

Recommendation: human review (user, 2026-10-16)
Findings: 5 (structure). Samples: 16ab8888770e, 0848b18f6d60, be2f07d93277, ab82075a30f0, 65b48146fe87
Location: throughout the .md. The HTML isn't affected.

| Element                | Hugo .md                       | Astro .md                        |
| ---------------------- | ------------------------------ | -------------------------------- |
| API version            | `{% tab title="v1" %}`         | `## v1 (latest)`                 |
| Operation description  | under `### Overview`           | no Overview heading              |
| Code example languages | empty `#####` headings         | `{% tab label="Go" %}` and so on |
| Instructions label     | `#### Instructions`            | `**Instructions**` paragraph     |
| Schema tables          | `Field \| Type \| Description` | adds a `Parent field` column     |

Cause: Astro's plaintext renderer (plan 10). The "Parent field" column replaces nesting the .md can't express. Both HTML pages have the Overview and Instructions headings.
Scope: every operation, and every operation section on category pages.
Proposed fix: none.

## I5. Hugo .md merges run commands into the Instructions paragraph

Recommendation: no change
Findings: 6 (hugo-malformed, hugo-md-wrong, HTML matches Astro). Samples: d4e30200305f
Location: the Instructions paragraph of each SDK tab (Python, Ruby, Go, Java, Rust, TypeScript)

Cause: Hugo's .md drops the code block's fence and merges the run command into the paragraph. The prod HTML has the command as a separate code block, like Astro.

## I6. Frontmatter description differs

Recommendation: no change (per dashboards I1)
Findings: 1 (structure). Samples: d8810ef0024a
Location: frontmatter `description`

Cause: same as dashboards I1.

## I7. Endpoint table rows are in a different order

Recommendation: no change (per dashboards I4)
Findings: 1 (structure), 1 endpoint table. Samples: 92d046950d46
Location: the endpoint table

Cause: same as dashboards I4.
