# API spec pipeline

The API reference pages are generated at build time by transforming the OpenAPI spec YAML into view shapes that rendering components consume. This pipeline lives in [src/lib/api/](../../../src/lib/api/). No spec parsing happens on the client — views are assembled during the build and rendered to static HTML.

The data flow runs in five stages. Knowing the stages tells you which one a change touches.

## 1. Parse

Two OpenAPI 3.x spec files are the source of truth for all API data:

- `@hugo-site/data/api/v1/full_spec.yaml` — v1 endpoints
- `@hugo-site/data/api/v2/full_spec.yaml` — v2 endpoints

The `@hugo-site` Vite alias points at the sibling Hugo repo's `data/` folder until a shared source is wired up. Each spec contains `tags` (which map to page categories), `paths` (endpoint definitions), `components/schemas` (reusable data models), and `servers` (region-specific base URLs).

[specParser.ts](../../../src/lib/api/specParser.ts) imports the files as raw strings via Vite's `?raw` import, parses each once per build, and memoizes the resulting `OpenAPIV3.Document` per version. `API_VERSIONS` (`['v1', 'v2']`) is the canonical version list — code iterates it rather than hardcoding a single version. The parser does not validate the spec structure at runtime; it trusts that the YAML is valid OpenAPI 3.x as enforced upstream by linting, and types the result as `OpenAPIV3.Document` from `openapi-types` for compile-time safety.

## 2. Resolve

[refResolver.ts](../../../src/lib/api/refResolver.ts) follows `$ref` pointers on demand (`resolveRef`) and flattens schemas into the flat `SchemaField[]` shape the tables render (`schemaToFields`, `topLevelSchemaToFields`, `paramsToFields`). The full `components` section of each spec is retained so internal `$ref`s always resolve.

[regionResolver.ts](../../../src/lib/api/regionResolver.ts) derives the available Datadog regions and per-region API URLs from the spec's `servers` block (`getRegions`, `buildApiUrlFromServers`), with a fallback to the default region set.

## 3. Build

This is the stage that assembles the view shapes components consume.

[operationBuilder.ts](../../../src/lib/api/operationBuilder.ts) extracts the pieces of a single operation: `splitParameters` (path vs. query vs. header), `extractRequestBody`, `extractResponses`, `extractPermissions`, `extractOauthScopes`, and `buildCurlByRegion` (which composes per-region curl commands via [curlBuilder.ts](../../../src/lib/api/curlBuilder.ts)'s `buildCurlCommand`). SDK examples come from [codeExampleLoader.ts](../../../src/lib/api/codeExampleLoader.ts)'s `getCodeExamplesForOperation`, with curl prepended.

[viewsBuilder.ts](../../../src/lib/api/viewsBuilder.ts) is the public surface for pages. It walks the parsed specs, resolves refs on demand, and assembles the view shapes — each backed by a Zod schema in [schemas/](../../../src/lib/api/schemas/):

| Helper | Returns | Work |
|---|---|---|
| `getCategoriesView(lang)` | `ApiCategory[]` | Walks `spec.tags` for both versions, applies the locale's tag overlay, attaches operation stubs to their categories, and sorts |
| `getCategoryStubsView(lang)` | `ApiCategoryStub[]` | Lightweight category list (no operation detail) for the side nav |
| `getCategoryViewBySlug(slug, lang)` | `ApiCategory \| undefined` | A single category by slug |
| `getOperationView(catSlug, opSlug, lang)` | `ApiOperationView \| undefined` | Finds the matching operation group, builds an `EndpointData` variant per spec version (v1/v2 operations that share a slug become `variants`), applies the action overlay, and merges path-level + operation-level parameters |

Results are memoized in module-scoped caches: a per-locale map for categories and a `${lang}:${catSlug}:${opSlug}` map for operations. Any new input that varies the output must be folded into the cache key, or a stale entry returns the wrong view for the next caller.

## 4. Overlay

[translationsLoader.ts](../../../src/lib/api/translationsLoader.ts) applies per-locale tag and action translations. Overlay files (`translate_tags.{lang}.json`, `translate_actions.{lang}.json`) live alongside the specs and mirror the Hugo JSON format. At build time Vite's `import.meta.glob` eagerly inlines all matching JSON; `getTranslationOverlay(version, lang)` selects the right file for a `(version, lang)` pair and caches the assembled bundle per pair. English short-circuits to an empty bundle — the spec is the source of truth for English. Missing files and missing keys fall through to English by design; coverage is owned upstream, so the loader emits no warnings for gaps.

## 5. Consume

Pages under [src/pages/[...lang]/api/](../../../src/pages/) render the assembled views:

- **Category landing page** ([`[category].astro`](../../../src/pages/)) — one page per `(lang, category)`. `getStaticPaths()` emits a route per category slug; at render time it draws the category name, description, a deprecation alert when applicable, and a TOC of operation links.
- **Per-operation page** ([`[category]/[operation].astro`](../../../src/pages/)) — one page per `(lang, category, operation)`, rendered inside `ApiLayout.astro`. A single `<ApiEndpoint>` renders the operation; [syntaxHighlighter.ts](../../../src/lib/api/syntaxHighlighter.ts)'s `highlightEndpoint` runs Shiki over the resolved `EndpointData` at the page boundary, so cached views never carry highlighted HTML.
- **Static pages** — index, `using-the-api`, `rate-limits`, and `scopes`.

Markdown in descriptions is rendered by [markdownRenderer.ts](../../../src/lib/api/markdownRenderer.ts) (`renderMarkdown`, `renderMarkdownInline`).

### Plaintext / llms.txt variant

Each page has a plaintext sibling (`.md.ts`) that emits Markdoc-compatible Markdown — for example [`[category]/[operation].md.ts`](../../../src/pages/) at `/api/latest/<cat>/<op>.md`. [llmsTxtRenderer.ts](../../../src/lib/api/llmsTxtRenderer.ts)'s `renderLlmsTxt` powers [`/llms.txt`](../../../src/pages/), which lists every operation by name and `.md` URL grouped under its category heading. A field that should appear in plaintext output must be added to the renderer (and its test) so the HTML and plaintext renderings stay in parity.
