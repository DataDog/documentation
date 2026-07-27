# Revert content collections design

## Prompt

### Context

A previous branch refactored the API docs data loading to use Astro content collections (four collections: `apiSchemas`, `apiOperations`, `apiCodeExamples`, `apiCategories`), then slimmed those collections so entries hold raw OpenAPI spec slices and resolution happens at view-helper time. After review, we decided content collections are the wrong abstraction for this use case: the data is one structured YAML file consumed by one route, not authored content with many files. The content-layer indirection adds code and memory without a payoff (no second consumer queries it; no markdown rendering; no auto-generated routes).

We're reverting to **plain memoized functions** that walk the spec directly. The view-helper signatures stay the same so page code doesn't have to change.

The Markdoc `docs` collection in [src/content.config.ts](../src/content.config.ts) stays — that one is a legitimate use of content collections (authored `.mdoc` files in `src/content/docs/`). Only the four API collections go away.

### Files to change

#### Delete

- [src/data/api/loaders/](../src/data/api/loaders/) — entire directory (4 loader files + `schemaField.ts`)

#### Update

- [src/content.config.ts](../src/content.config.ts) — remove the four API collections from the imports and the `collections` export. Keep only `docs`.
- [src/data/api/views.ts](../src/data/api/views.ts) — rewrite the body of `getCategoriesView`, `getCategoryViewBySlug`, `getEndpointsView` to walk the parsed spec directly instead of calling `getCollection` / `getEntry`. Keep the **exported function signatures and return types unchanged** so callers don't need updating. Add module-scoped caches (`Map<lang, ApiCategory[]>` and `Map<${lang}:${slug}, EndpointData[]>`) to avoid re-walking on each call.
  - Walk the spec via `getOpenApiDocument(version)` from [src/data/api/specParser.ts](../src/data/api/specParser.ts).
  - For each `(lang, version, operationId)`: apply translation overlays via [src/data/api/translationsLoader.ts](../src/data/api/translationsLoader.ts), then resolve params/request body/responses using the helpers in [src/data/api/operationData.ts](../src/data/api/operationData.ts) and [src/data/api/resolver.ts](../src/data/api/resolver.ts). Generate curl variants with `buildCurlByRegion`. Pull SDK examples with `getCodeExamplesForOperation` from [src/data/api/examples.ts](../src/data/api/examples.ts). Don't change any helper signatures.
  - Apply the same `SLUG_OVERRIDES` map (`'case-management' → 'cases'`, `'scorecards' → 'service-scorecards'`) and `toSlug` helper that the loaders had.
  - Slug derived from the **untranslated English summary** (so deep links survive locale switches) — `toSlug(operation.summary)`, not the translated summary.

#### Keep as-is

- [src/data/api/specParser.ts](../src/data/api/specParser.ts) — shared spec parser
- [src/data/api/operationData.ts](../src/data/api/operationData.ts) — extraction helpers (`splitParameters`, `extractRequestBody`, `extractResponses`, `extractPermissions`, `extractOauthScopes`, `buildCurlByRegion`)
- [src/data/api/resolver.ts](../src/data/api/resolver.ts) — `$ref` resolution and `schemaToFields`
- [src/data/api/regions.ts](../src/data/api/regions.ts), [curl.ts](../src/data/api/curl.ts), [markdown.ts](../src/data/api/markdown.ts), [translationsLoader.ts](../src/data/api/translationsLoader.ts), [examples.ts](../src/data/api/examples.ts), [highlight.ts](../src/data/api/highlight.ts), [pageTitles.ts](../src/data/api/pageTitles.ts) — all unchanged
- All page consumers of `views.ts` (`[category].astro`, `[category].md.ts`, `llms.txt.ts`, the four static pages, `ApiLayout.astro`, `ApiSideNav.astro`) — unchanged

### Two correctness fixes that MUST stay in place

These are real bugs the snapshot suite caught during the refactor. They predate the refactor; don't undo them.

1. **Per-spec `resolveRef` cache.** In [resolver.ts](../src/data/api/resolver.ts), the cache is a `WeakMap<spec, Map<refString, resolved>>`, NOT a single `Map<refString, resolved>`. The Datadog v1 and v2 specs share ref strings (e.g. `#/components/schemas/APIErrorResponse`) that resolve to *different* schemas. A cache keyed only by ref string will leak v1 schemas into v2 lookups and vice versa. Verify the WeakMap-by-spec is intact; do not "simplify" it back to a single Map.

2. **OperationId + version composite key.** 37 `operationId` values are shared between v1 and v2 (e.g. `CreateAPIKey`, `CancelDowntime`). Anywhere you key by operationId — caches, lookups, the slug for in-page anchors, etc. — also include `version`. The `(lang, version, operationId)` tuple is unique; `(lang, operationId)` is not.

### How to verify

A local-only HTML snapshot suite covers 12 representative API pages: 4 static pages, 8 dynamic categories spanning v1-only / v2-only / mixed / deprecated / large / small. Baselines were captured *after* the two correctness fixes above were applied, so a clean revert should keep all 12 snapshots green.

```bash
cd astro
npm run build                                      # default heap is fine — should NOT need NODE_OPTIONS
npm run test -- tests/headless/api-html-snapshots.test.ts
```

Expected: all 12 pass.

If any snapshot diffs:

1. **Investigate first** — diff the failing baseline at [tests/headless/api-html-snapshots/`<name>`.html](../tests/headless/api-html-snapshots/) against the rebuilt page in [dist/api/latest/`<slug>`/index.html](../dist/api/latest/). The normalizer in the test file canonicalizes asset hashes and astro-island uids — content diffs are real diffs.
2. **Common causes:** a slug computed from the translated (not English) summary; a missing `SLUG_OVERRIDES` mapping; the `resolveRef` cache reverting to per-string keying; operationId-only keying losing v1↔v2 distinct ops.
3. **Don't accept-and-update** the baselines unless you can identify the specific intentional change. The whole point of the suite is parity verification — a green run means the revert preserved rendering.

The snapshot test file is at [tests/headless/api-html-snapshots.test.ts](../tests/headless/api-html-snapshots.test.ts) and baselines live in [tests/headless/api-html-snapshots/](../tests/headless/api-html-snapshots/). **Don't commit the test file or the baselines** — they're a local safety check the user will remove before merging.

### Memory expectation

The original (pre-refactor) code ran fine in default Node heap. The collection-based version needed `NODE_OPTIONS="--max-old-space-size=8192"` (initially) and ~2.6GB peak (after slimming). After this revert, peak should drop to roughly the pre-refactor level (well under default heap). If you find you need a heap flag, something's wrong — investigate before adding the flag.

### Other touch-ups

- Update the `## How API docs are rendered from YAML` section in [README.md](../README.md) to describe the plain-function architecture: spec parsed once → memoized `getCategoriesView` / `getEndpointsView` walk the spec → highlighting at page time → routes. Replace the four-collections table and the data-flow diagram. Keep numbering consistent.
- The plan doc at [astro/plans/14_content_collections.md](14_content_collections.md) describes the abandoned approach; leave it but consider adding a `## Outcome` note at the bottom recording that we reverted and why (one paragraph).

### Acceptance

- `npm run build` completes in default heap
- `npm run test -- tests/headless/api-html-snapshots.test.ts` — all 12 pass
- `npm run test` — all unit tests pass
- No imports of `astro:content` `getCollection` / `getEntry` for `apiCategories`, `apiOperations`, `apiCodeExamples`, or `apiSchemas` remain anywhere in `src/`
- The `docs` collection (Markdoc files) is untouched
- The two correctness fixes (per-spec cache; version+operationId keying) are verifiably present
- README's API-rendering section reflects the plain-function architecture
