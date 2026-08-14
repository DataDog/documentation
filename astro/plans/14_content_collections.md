# API data content collections

## Prompt

Our current processing of the API data, and rendering the API docs pages, does not use content collections at all. This seems strange, since several aspects of the YAML (such as paths and components) seem to lend themselves fairly well to become a content collection. Our logic seems to be implementing content collections again, rather than using what Astro already has to offer.

Assess the existing code and decide which entities, if any, should be a content collection instead. Skip syntax highlighting until the page is being rendered (in other words, don't bake syntax highlighting into a collection).

Create the content collections, and use them to render the API docs pages. Preferably, do not limit the "depth" of the content collections; if it's in the spec, put it in a content collection as well. If this is inadvisable for some reason, object.

## Decisions (settled with user)

- **Depth**: Top-level named entities (`components.schemas.*`, tags, paths) become collection entries. Inline nested fields inside an operation (request body fields, response fields) stay as a tree on the operation entry — flattening every nested `SchemaField` would lose the natural recursive structure of OpenAPI and produce an enormous, mostly-uninteresting collection.
- **Localization**: One entry per locale, single collection, keyed `${lang}/${id}`, with a `lang` discriminator field. `getCollection('apiOperations', e => e.data.lang === lang)` is the access pattern. Locale-agnostic collections (`apiSchemas`, `apiCodeExamples`) are keyed without `lang`.
- **Code examples & curl**: Separate `apiCodeExamples` collection, one entry per `(version, operationId)`, with curl variants baked in by the loader. SDK examples + curl are siblings in the entry. No syntax highlighting in the loader.
- **Existing modules**: Demoted to internal helpers called by the loaders. The loaders own the public API; pages stop importing `getApiCategories` / `getEndpointsForCategory` and call `getCollection` / `getEntry` instead.
- **Spec source**: Stays at `@hugo-site/data/api/` via the existing Vite alias.

## Existing code, mapped to collections

| Today | Becomes |
|---|---|
| `data/api/index.ts` `getApiCategories(lang)` | `apiCategories` collection loader |
| `data/api/endpoints.ts` `getEndpointsForCategory(slug, lang)` | `apiOperations` collection loader |
| `data/api/resolver.ts` `resolveRef`, `schemaToFields` | Helper, called by all loaders |
| `data/api/translationsLoader.ts` `getTranslationOverlay`, `translateTag`, `translateAction` | Helper, called by `apiCategories` and `apiOperations` loaders |
| `data/api/examples.ts` `getCodeExamplesForOperation` | `apiCodeExamples` collection loader |
| `data/api/curl.ts` `buildCurlCommand` | Helper, called by `apiCodeExamples` loader |
| `data/api/regions.ts` `getRegions`, `buildApiUrlFromServers` | Helper, called by `apiOperations` and `apiCodeExamples` loaders |
| `data/api/markdown.ts` `renderMarkdown` | Helper, called by all loaders |
| `data/api/highlight.ts` `highlightEndpoints` | **Stays** — runs at page time after `getCollection`, not inside loaders |
| `data/api/pageTitles.ts`, `i18n` helpers | Unchanged |
| Manual `Map` caches in `index.ts` and `endpoints.ts` | Removed — Astro caches collection results between dev rebuilds |

## Collection design

### `apiSchemas` (locale-agnostic)

One entry per `(version, schemaName)` from `components.schemas.*`.

```ts
id: `${version}/${schemaName}`        // e.g. "v2/Dashboard"
data: {
  version: 'v1' | 'v2',
  name: string,                        // "Dashboard"
  description: string,                 // rendered HTML, no highlighting
  fields: SchemaField[],               // resolved tree (existing shape)
  deprecated: boolean,
}
```

Loader walks `components.schemas` for each version. `$ref` resolution stays inline within the tree (matching today's `schemaToFields`); we don't try to model field-level cross-references.

### `apiCategories` (per-locale)

One entry per `(lang, categorySlug)`, derived from spec tags + slug overrides.

```ts
id: `${lang}/${slug}`                  // e.g. "en/dashboards", "ja/dashboards"
data: {
  lang: Locale,
  slug: string,                        // "dashboards"
  name: string,                        // translated
  description: string,                 // translated, rendered HTML
  deprecated: boolean,
  operationRefs: Array<reference('apiOperations')>,  // sorted by menu order
}
```

`operationRefs` lets the category page get its operations without re-filtering the entire `apiOperations` collection. Each ref points at `${lang}/${operationId}` in `apiOperations`.

### `apiOperations` (per-locale)

One entry per `(lang, version, operationId)`.

```ts
id: `${lang}/${operationId}`           // e.g. "en/ListDashboards" — operationIds are globally unique across versions in the Datadog spec
data: {
  lang: Locale,
  version: 'v1' | 'v2',
  operationId: string,
  categorySlug: string,
  summary: string,                     // translated
  slug: string,                        // English-derived anchor (today's behavior)
  method: 'GET' | 'POST' | ...,
  path: string,
  description: string,                 // translated, rendered HTML
  deprecated: boolean,
  unstable: boolean,
  unstableMessage?: string,
  permissions?: string[],
  oauthScopes?: string[],
  regionUrls: Record<string, string>,
  pathParams?: SchemaField[],
  queryParams?: SchemaField[],
  headerParams?: SchemaField[],
  requestBody?: RequestBodyData,
  responses: ResponseData[],
  menuOrder: number,                   // promoted from runtime sort to entry data
  codeExamplesRef: reference('apiCodeExamples'),
}
```

`codeExamples` lives separately — the operation entry only carries a reference. Pages that need to render code blocks resolve the reference; listing pages don't pay for it.

`menuOrder` is promoted out of the spec into the entry so sort logic doesn't have to re-parse the spec at page time (the current `getMenuOrder` does this).

### `apiCodeExamples` (locale-agnostic)

One entry per `(version, operationId)`. Code examples aren't translated upstream, so no per-locale variant.

```ts
id: `${version}/${operationId}`        // e.g. "v2/ListDashboards"
data: {
  version: 'v1' | 'v2',
  operationId: string,
  examples: CodeExampleSet[],          // existing shape; curl prepended as first set
                                       // each entry has { code, syntax, regionVariants? }
                                       // no `highlightedCode` — that's a page-time concern
}
```

The loader generates curl variants per region using the resolved operation parameters and the request body example, exactly as `buildCurlByRegion` does today. The output is plain text; highlighting runs at page time.

## Loader implementation notes

- Each loader uses Astro's [content layer custom loader API](https://docs.astro.build/en/reference/content-loader-reference/) (`{ name, load: async ({ store, ... }) => ... }`).
- Loaders parse the YAML once per build and share the parsed object via a module-scoped variable (the manual cache disappears, but the *parse-once* property is preserved by virtue of the loader running once per build).
- The `apiOperations` loader iterates `LOCALES × {v1,v2} × paths × methods`. Inner loops reuse the resolver's `refCache` (already module-scoped).
- The `apiCategories` loader runs after `apiOperations` is populated *conceptually*, but in practice the two loaders walk the same spec and can be independent — `operationRefs` is built by computing operation IDs deterministically (no need to read the other collection).
- Loaders emit entries via `store.set({ id, data })`. We don't use `parseData` since the data is already validated by the zod schema declared in `content.config.ts`.

## Page rewiring

`src/pages/[...lang]/api/latest/[category].astro`:

```diff
- import { getApiCategories, getCategoryBySlug } from '../../../../data/api/index';
- import { getEndpointsForCategory } from '../../../../data/api/endpoints';
+ import { getCollection, getEntry } from 'astro:content';

  export const getStaticPaths = async () => {
+   const cats = await getCollection('apiCategories');
    const paths = [];
-   for (const lang of LOCALES) {
-     for (const cat of getApiCategories(lang)) {
-       paths.push({ params: { lang: lang === 'en' ? undefined : lang, category: cat.slug } });
-     }
-   }
+   for (const cat of cats) {
+     paths.push({
+       params: {
+         lang: cat.data.lang === 'en' ? undefined : cat.data.lang,
+         category: cat.data.slug,
+       },
+     });
+   }
    return paths;
  };

- const categories = getApiCategories(lang);
- const current = getCategoryBySlug(slug, lang);
- const endpoints = getEndpointsForCategory(slug, lang);
+ const categories = await getCollection('apiCategories', e => e.data.lang === lang);
+ const current = await getEntry('apiCategories', `${lang}/${slug}`);
+ const endpoints = await Promise.all(current.data.operationRefs.map(ref => getEntry(ref)));
+ const codeExamples = await Promise.all(endpoints.map(ep => getEntry(ep.data.codeExamplesRef)));

- await highlightEndpoints(endpoints);
+ await highlightEndpoints(endpoints, codeExamples);
```

`highlightEndpoints` is updated to accept the code-examples entries alongside the operations and emit `highlightedCode` on the page-side render data (not on the collection entry).

The `[category].md.ts` plaintext route, `llms.txt.ts`, search-page builders, and any other consumers of `getApiCategories`/`getEndpointsForCategory` get the same treatment.

## Testing

### HTML snapshot tests for the 12 audit pages — built FIRST, before any refactor

The refactor's success criterion is "no visible change to the rendered API docs." We lock that in with a vitest suite that snapshots the built HTML for the audit set from [README.md:205-222](../README.md#L205-L222) **before any other code changes**, then reruns at each step to confirm parity (or to surface intentional improvements).

**Audit set** (12 pages, covering every rendering variation):

| # | Page | What it covers |
|---|------|----------------|
| 1 | `/api/latest/` | Static index page |
| 2 | `/api/latest/using-the-api/` | Static content page |
| 3 | `/api/latest/rate-limits/` | Static content page |
| 4 | `/api/latest/scopes/` | Static content page |
| 5 | `/api/latest/authentication/` | Smallest category (1 v1 endpoint) |
| 6 | `/api/latest/dashboards/` | v1-only, medium size (14 ops) |
| 7 | `/api/latest/incidents/` | v2-only, large (56 ops) |
| 8 | `/api/latest/aws-integration/` | Mixed v1+v2, has deprecated + unstable ops |
| 9 | `/api/latest/monitors/` | Mixed v1+v2, has deprecated + unstable ops |
| 10 | `/api/latest/dashboard-lists/` | Category-level deprecated (with endpoints) |
| 11 | `/api/latest/screenboards/` | Empty deprecated category (0 endpoints) |
| 12 | `/api/latest/usage-metering/` | Large (49 ops), all GET, many deprecated |

Pages 1–4 are static and shouldn't be affected by this refactor — including them is cheap insurance against accidental regressions in shared layout code. Pages 5–12 cover the dynamic category template, which is the actual surface under change.

**Test mechanics** (`tests/headless/api-html-snapshots.test.ts`):

1. `beforeAll`: run `astro build` once (or skip if `dist/` is fresh — controlled by an env var so CI rebuilds, local re-runs reuse).
2. For each audit URL, read the corresponding `dist/<path>/index.html`.
3. Normalize non-deterministic content before snapshotting:
   - Asset hashes: `/_astro/foo.abc123.css` → `/_astro/foo.HASHED.css`
   - Any other build-fingerprint strings discovered while baselining
4. Compare with `expect(html).toMatchFileSnapshot('./api-html-snapshots/<sanitized-path>.html')`.

**Workflow**:

1. Write the test file and the normalizer.
2. Run `npm run test -- api-html-snapshots --update` against `master`-equivalent code (i.e., the current state, before any other change). This creates the baseline files under `tests/headless/api-html-snapshots/`.
3. Commit the baselines as a discrete commit so the diff is reviewable.
4. Begin the refactor (steps 1–8 in the implementation order below).
5. Re-run the test after each step. A diff means either:
   - **Bug** — fix it, the snapshot must stay green.
   - **Intentional improvement** (e.g., a category description that previously failed to render now does) — review the diff, agree it's an improvement, then `--update` to refresh the baseline.

The baselines are large (some categories serialize to hundreds of KB of HTML). That's intentional — the goal is exhaustive structural coverage, not human readability of the snapshot file.

### Other tests

- Unit tests for loaders: assert that for a known fixture spec, the emitted entries have the expected shape and counts. Replaces the existing tests of `index.ts` / `endpoints.ts` indirectly.
- Existing tests (`renderCategoryMd.test.ts`, `renderLlmsTxt.test.ts`, `translations.test.ts`) keep working — they test the rendering output, which doesn't change. Their imports get pointed at `getCollection` instead of the old functions.

## Out of scope

- Schema-level cross-references (operations linking nested fields back to `apiSchemas` entries). The collection exists; surfacing it in operation rendering is a follow-up.
- Migrating non-API data (banners, menus, footer) to collections.
- Live loaders / on-demand updates. All loaders run at build time.

## Implementation order

0. **Write the HTML snapshot test and capture pre-refactor baselines** for the 12 audit pages. Commit the test + baselines as their own commit so the refactor's diff is isolated. (See "Testing" above.)
1. `apiSchemas` loader + zod schema — smallest, locale-agnostic, no dependencies on other collections. Verify with a quick `getCollection` call from a debug page. Re-run snapshots — expect no diff (this collection isn't yet wired into rendering).
2. `apiCodeExamples` loader — also locale-agnostic; uses `regions.ts` and `curl.ts` helpers. Re-run snapshots — expect no diff (not wired yet).
3. `apiOperations` loader — biggest; references `apiCodeExamples`. Re-run snapshots — expect no diff (not wired yet).
4. `apiCategories` loader — references `apiOperations`. Re-run snapshots — expect no diff (not wired yet).
5. Rewire `[category].astro` to read from collections. Re-run snapshots — **this is the parity gate**. Investigate every diff; either fix or knowingly accept-and-update.
6. Rewire `[category].md.ts`, `llms.txt.ts`, and any other callers. Re-run snapshots.
7. Delete `getApiCategories` / `getCategoryBySlug` / `getEndpointsForCategory` (the public functions on the existing modules); keep the internal helpers they used. Re-run snapshots.
8. Update unit tests for the loaders. Re-run snapshots one more time before opening the PR.

## Outcome

Reverted. The four API collections (`apiSchemas`, `apiOperations`, `apiCodeExamples`, `apiCategories`) added indirection without a payoff: the data is one structured YAML file consumed by one route, not authored content with many files. There is no second consumer querying it, no markdown rendering, no auto-generated routes. The collection layer cost a heap-flag bump (peak ~2.6 GB even after slimming entries to raw spec slices) and a pile of loader code that mostly re-derived what a direct spec walk produces. We replaced it with plain memoized functions in [`views.ts`](../src/data/api/views.ts) that walk the parsed spec, keeping the public `getCategoriesView` / `getCategoryViewBySlug` / `getEndpointsView` signatures so page code didn't move. See [15_content_collections_revert.md](15_content_collections_revert.md) for the revert plan; the two correctness fixes the snapshot suite caught during this work (per-spec `resolveRef` cache; version+operationId composite keying) carried forward and stayed in place.
