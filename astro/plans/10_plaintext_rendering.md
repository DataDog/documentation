# Plaintext rendering of API pages (not pages written in .mdoc)

## Prompt

To support AI agents, we want Astro to render static paths for `.md` pages, where `<SOME_URL>` is a HTML page, and `<SOME_URL>.md` is the plaintext version of that same page.

Even though the API pages are not written in Markdoc, we still want the plaintext version to be parseable Markdoc. This means that some tags should be represented: `{% tab %}`, `{% alert %}`, anything that represents a nested chunk of content.

The API schema table would need to be a Markdown table. Since the Markdown version doesn't have expand/collapse functionality, the parent field, when there is one, would need to be listed explicitly in the table. Something like this:

```
| Parent field | Field                    | Type    | Description                                             |
|--------------|--------------------------|---------|---------------------------------------------------------|
|              | data                     | object  | Data related to the connection.                         |
| attributes   | integration [*required*] | <oneOf> | The definition of `ActionConnectionIntegration` object. |
| data         | attributes [*required*]  | object  | The definition of `ActionConnectionAttributes` object.  |
| integration  | Option 1                 | object  | The definition of `AWSIntegration` object.              |
```

Similarly, customizable content would need to be explicitly laid out, like this table of URLs by DD site:

```
| Datadog site      | API endpoint                                                                 |
| ----------------- | ---------------------------------------------------------------------------- |
| ap1.datadoghq.com | GET https://api.ap1.datadoghq.com/api/v2/actions/connections/{connection_id} |
| ap2.datadoghq.com | GET https://api.ap2.datadoghq.com/api/v2/actions/connections/{connection_id} |
| app.datadoghq.eu  | GET https://api.datadoghq.eu/api/v2/actions/connections/{connection_id}      |
| app.ddog-gov.com  | GET https://api.ddog-gov.com/api/v2/actions/connections/{connection_id}      |
| app.datadoghq.com | GET https://api.datadoghq.com/api/v2/actions/connections/{connection_id}     |
| us3.datadoghq.com | GET https://api.us3.datadoghq.com/api/v2/actions/connections/{connection_id} |
| us5.datadoghq.com | GET https://api.us5.datadoghq.com/api/v2/actions/connections/{connection_id} |
```

Because the Hugo site already has this feature (though its rendering is imperfect), you can see a full example page at https://docs.datadoghq.com/api/latest/action-connection.md. Again, this rendering is not perfect, and we don't need our output to look exactly the same.

## Claude's plan

### Approach: twin renderers per component

Each component that contributes to an API page gets a sibling `*.md.ts` file next to its `.astro` (or `.tsx`) HTML renderer. Both consume the same typed data ([EndpointData](../src/data/api/endpoints.ts), [SchemaField](../src/data/api/resolver.ts), [ResponseData](../src/data/api/endpoints.ts), [CodeExampleSet](../src/data/api/examples.ts)). The HTML tree stays untouched; the markdown tree is a parallel set of pure functions returning Markdoc strings.

**Why not a single component with a `format` prop?** Astro components always wrap their output as HTML and re-render markdown via `marked`, so a `format="md"` mode wouldn't be able to emit a raw text response cleanly. It collapses to TS-only renderers anyway.

**Why not HTML → Markdown post-conversion?** Two reasons:

1. The Markdoc tags (`{% tab %}`, `{% alert %}`) don't survive a generic HTML→MD pass.
2. The plaintext output requires *information additions* the HTML version doesn't contain — the schema table needs a flattened parent-field column, and the region URL block becomes an explicit table. A converter has no way to produce those; the typed source data does.

### Surface area

The components that need markdown twins, with their target Markdoc shape:

| HTML component | `.md.ts` output |
|---|---|
| [ApiEndpoint.astro](../src/components/ApiEndpoint/ApiEndpoint.astro) | Heading + region table + sections, composed of the renderers below |
| [ApiStatusAlert.astro](../src/components/ApiStatusAlert/ApiStatusAlert.astro) | `{% alert level="..." %}…{% /alert %}` |
| [ApiMethodBadge.astro](../src/components/ApiMethodBadge/ApiMethodBadge.astro) | Inline `**GET**` (or just bold method name) |
| Region URL line in `ApiEndpoint` | Markdown table of site → URL (per the prompt) |
| [ApiSchemaTable.tsx](../src/components/ApiSchemaTable/ApiSchemaTable.tsx) | Flattened markdown table with `Parent field` column |
| [ApiRequestBodyTabs.astro](../src/components/ApiRequestBodyTabs/ApiRequestBodyTabs.astro) | `{% tabs %}{% tab title="Request" %}…{% /tab %}…{% /tabs %}` |
| [ApiResponse.astro](../src/components/ApiResponse/ApiResponse.astro) | Nested `{% tabs %}` — outer per status code, inner per schema/example |
| [ApiCodeExample.astro](../src/components/ApiCodeExample/ApiCodeExample.astro) | `{% tabs %}` with one tab per language, each holding a fenced code block |

Description strings from the spec are already raw Markdown on `ep.description`, `field.description`, etc., so the markdown renderers emit them verbatim — no `marked` conversion needed (that's an HTML-only concern). The one wrinkle: spec authors occasionally embed raw HTML (e.g. `<br>`, `<a href>`, `<code>`) inside those descriptions. See step 6 for how that gets normalized to Markdown before emit.

### Plan

#### 1. Establish the renderer convention

For each component above, add `<ComponentName>.md.ts` exporting a single function:

```ts
export function renderApiEndpointMd(ep: EndpointData): string { … }
```

Renderers return a string ending in a single trailing newline. The parent renderer joins children with `\n\n`. No global formatter — each renderer owns its own whitespace contract, documented in a one-line jsdoc.

Place the test file alongside as `<ComponentName>.md.test.ts`. These are pure functions, so the standard non-interactive vitest setup applies (no happy-dom needed).

#### 2. Region URL table

Inside `ApiEndpoint.md.ts`, emit a markdown table with two columns (`Datadog site`, `API endpoint`) sourced from `ep.regionUrls` and `allowedRegions` from [regionConfig.ts](../src/data/api/regionConfig.ts) (introduced in plan 09). Rows for unsupported regions get the `Not supported in the {NAME} region` string in the URL cell, matching the HTML side. This replaces the `<code data-region>` switching used in HTML — plaintext has no runtime, so all sites are listed inline.

#### 3. Schema table flattening

`ApiSchemaTable.md.ts` walks the `SchemaField[]` tree depth-first and emits a flat markdown table with columns: `Parent field`, `Field`, `Type`, `Description`.

- Top-level rows have empty `Parent field`.
- Child rows carry the parent's `name` in `Parent field`.
- Required fields render as `name [*required*]` in the `Field` column (matching the example in the prompt).
- Union options (`unionOptions`) render as additional rows where `Field` is the option label (`Option 1`, `Option 2`) and `Parent field` is the union field's name; that option's nested fields then appear with the option label as their parent.
- Enum values and defaults inline into the description column, since plaintext has no expand/collapse.

Cell text is escaped for pipe characters (`|` → `\|`) and newlines (collapsed to single spaces). Table alignment is dash-only — no padding — to keep the renderer simple; readers don't need fixed-width columns.

#### 4. Tabs / alerts → Markdoc tags

For `ApiStatusAlert`, `ApiRequestBodyTabs`, `ApiResponse`, and `ApiCodeExample`, emit Markdoc tag syntax with content indented as required. Sample output for code examples:

````markdown
{% tabs %}
{% tab title="cURL" %}
```bash
curl -X GET "https://api.datadoghq.com/api/v2/…"
```
{% /tab %}
{% tab title="Python" %}
```python
…
```
{% /tab %}
{% /tabs %}
````

Code highlighting (Shiki) is HTML-only — markdown emits raw fenced blocks with language identifiers. This means we can skip the `await highlightEndpoints(endpoints)` step on the markdown render path, which also makes the `.md.ts` route faster to build.

#### 5. Page-level static endpoint

Add `astro/src/pages/api/latest/[category].md.ts`:

```ts
export const getStaticPaths: GetStaticPaths = () => {
  return getApiCategories().map((cat) => ({ params: { category: cat.slug } }));
};

export const GET: APIRoute = ({ params }) => {
  const cat = getCategoryBySlug(params.category!);
  const endpoints = getEndpointsForCategory(params.category!);
  const body = renderCategoryMd(cat, endpoints);
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
```

`renderCategoryMd` lives in `astro/src/data/api/renderCategoryMd.ts` and composes: `# {category.name}` → `category.description` (raw markdown) → each endpoint via `renderApiEndpointMd`. Astro static-builds this to `dist/api/latest/<slug>.md`.

The `.md.ts` suffix is reserved for page routes; component renderers also use `.md.ts` because they're in `src/components/` (Astro only routes from `src/pages/`), so there's no collision in practice.

#### 6. Normalize HTML inside description strings

Spec descriptions are mostly plain Markdown, but a small number contain raw HTML fragments (typically `<br>`, `<a href>`, `<code>`, `<strong>`, `<em>`, occasionally `<ul>`/`<li>`). Pass-through would technically render in most Markdown viewers, but it makes the output less Markdoc-clean and breaks our "parseable Markdoc" contract for downstream agents.

Add `astro/src/data/api/htmlToMd.ts` exporting `htmlToMd(input: string): string`:

- Uses [`turndown`](https://github.com/mixmark-io/turndown) (small, well-maintained, ~10KB) to convert HTML fragments to CommonMark.
- Configure: `headingStyle: 'atx'`, `codeBlockStyle: 'fenced'`, `bulletListMarker: '-'`. These match the rest of our markdown output.
- Add a small custom rule for `<br>` → `  \n` (Markdown hard break) since `turndown`'s default emits an HTML `<br>` back out.
- The function is a no-op for inputs containing no `<` characters — fast path for the common case.

Wire it into the markdown renderers wherever a description field is emitted: `ApiEndpoint.md.ts` for endpoint and category descriptions, `ApiSchemaTable.md.ts` for field descriptions (where the result is then collapsed to a single line for the table cell), and `ApiResponse.md.ts` for response descriptions.

This is an HTML-only concern, so HTML rendering keeps its current `marked`-based path unchanged.

Test coverage: add `htmlToMd.test.ts` with cases for the HTML tags actually observed in the spec — grep `data/api/v{1,2}/full_spec.yaml` for `<` to enumerate the real-world inputs before writing the test cases. Don't try to cover hypothetical HTML the spec doesn't contain.

#### 7. Tests

- **Per-component**: each `<ComponentName>.md.test.ts` covers a representative input and snapshots the output string. Snapshot tests are appropriate here because the *exact* whitespace and tag structure matter for downstream Markdoc parsing.
- **Round-trip parse**: one integration test per top-level Markdoc-emitting renderer (`ApiResponse`, `ApiCodeExample`, `ApiRequestBodyTabs`, `ApiStatusAlert`) that runs the output through the project's Markdoc parser ([markdoc.config.mjs](../markdoc.config.mjs)) and asserts the AST has no `error` nodes. This is the contract that says "parseable Markdoc."
- **Page-level**: a vitest run that imports `renderCategoryMd` for the action-connection category and asserts the output contains the expected section headers, the region table, and at least one `{% tabs %}` block. Compare structure, not full text — full text is covered by component snapshots.
- **Build smoke**: `npm run build` should produce `dist/api/latest/action-connection.md`. Add a Playwright test that fetches the built file and asserts `Content-Type: text/markdown`.

### Open questions / risks

- **Schema description newlines.** Some spec descriptions are multi-paragraph. Collapsing them to a single line for the schema table loses structure but is the only way to fit a markdown table cell. The HTML version has the same constraint. Acceptable.
- **Curl per region.** Plan 09 stores `curlByRegion` per endpoint. The markdown renderer should pick the default region's curl (US1) to avoid 7× duplication inside `{% tab title="cURL" %}`. If readers need per-region curl, they can read the URL table and substitute — the URL is the only thing that varies.
- **Endpoint anchor links.** HTML endpoints get `id={ep.slug}` for in-page navigation. Markdown headings auto-generate slugs in most renderers, but they may not match. If we need stable anchors, emit an explicit `{% anchor id="…" /%}` (or whatever the project's Markdoc convention is) before each endpoint heading. Confirm with the writer team before adding.
- **Build time.** Adding ~200 `.md` files to the static output is cheap, but `getEndpointsForCategory` is currently called twice per category (once for `.astro`, once for `.md.ts`). If that becomes a bottleneck, memoize per category. Don't optimize preemptively.
