# Spec-shape snapshot coverage for API pages

## Prompt

Content QA of the Astro API pages against the Hugo pages surfaced many rendering bugs that the committed HTML snapshots didn't cover. QA found them by snapshotting 89 live pages, chosen to cover the spec's data shapes. Add permanent regression coverage for that range of rendering cases without committing 89 full-page snapshots.

Decisions so far:

- Use snapshots, not hand-written assertions.
- Claude maps spec shapes to rendering classes. The user reviews the mapping.

## Research

### Current coverage

- `tests/headless/api-html-snapshots.test.ts` renders 17 pages (7 categories, 7 operations, 1 empty category, the changelog) through `AstroContainer` against the frozen fixture, and snapshots `<main>`, the SEO head tags and the agent hint. Total size is 4.3 MB. `09-monitors-create-a-monitor.html` alone is 1.4 MB.
- `tests/headless/api-plaintext-snapshots/` holds the matching `.md` twins (928 KB).
- `src/lib/api/__snapshots__/` holds the view-model JSON snapshots for the cases in `tests/fixtures/api/auditCases.ts`.
- The frozen fixture is `tests/fixtures/api/v{1,2}/partial_spec.yaml` (about 1 MB), redirected in by the `frozen-api-spec` plugin in `vitest.unit.config.ts`.

### Shape inventory

QA used a throwaway detector that walks every operation and records the shapes it shows: parameter, request and response schema features (`param:minLength`, `req:anyOf+properties`, `res:additionalProperties:untyped`), response codes and content types, Markdown features in descriptions (`op-desc:code-fence`, `param-field-desc:raw-html`), and operation extensions (`op:x-permission:AND:many`). Against the live spec:

- 311 distinct shapes across 1,951 operations.
- A greedy page cover built from scratch needs 55 pages. The first page covers 128 shapes and the first five cover 203, but about 29 of the 55 pages exist to cover a single shape each.
- 22 shapes appear in exactly one operation.

The long tail is why page-level snapshots don't scale. Covering one rare shape costs a whole page, and a diff on that page doesn't say which shape it was guarding.

### Shapes are not rendering cases

The detector tells apart more than the renderer does. `format:int32` and `format:int64`, or `res:code:410` and `res:code:412`, most likely go through the same code path. The real number of rendering behaviors is well below 311. Grouping shapes into rendering classes needs each shape traced to the code that reads it (`operationBuilder`, `viewsBuilder`, `schemaExampleBuilder`, `ApiSchemaTable`, `ApiResponse`, `ApiRequestBodyTabs`, the Markdoc description pipeline, and the plaintext twins).

## Design

### 1. Shape detector as a tracked module

Port the detector to `tests/lib/specShapes.ts`: a pure function from a parsed spec to `{ operationId, version, shapes: Set<string> }[]`. Drop the QA script's dependency on `dist/`. It must read only the spec.

### 2. Shape-to-class mapping

`tests/fixtures/api-shapes/shapeClasses.ts` maps every shape to a rendering class:

```ts
export const SHAPE_CLASSES: Record<string, ShapeClassId> = {
  "param:format:int32": "schema-format",
  "param:format:int64": "schema-format",
  "res:code:410": "response-code-error",
  "res:code:412": "response-code-error",
  "op:x-pagination": NO_RENDER_EFFECT,
  // ...
};
```

- Every class has a one-line comment naming the code path that renders it. That comment is the justification for the grouping.
- `NO_RENDER_EFFECT` is an explicit bucket for shapes the renderer ignores, so "ignored" is a reviewed decision rather than a gap.
- Wildcards are allowed only for open-ended families (for example `res:code:*` for unseen status codes), and each wildcard falls back to a named class.

### 3. One trimmed case per class

Each rendering class gets one case: a real operation from the live spec, trimmed down to the part that shows the class, added to the existing frozen fixture (`tests/fixtures/api/v{1,2}/partial_spec.yaml`) under a dedicated tag (for example `Rendering Shapes`).

- Real operations, not invented ones, so the cases carry the spec's actual quirks.
- The existing fixture, so no new Vitest wiring is needed. Adding the tag churns the category, navigation and view-model snapshots once, and adding cases later churns them again. That's accepted.
- Each case declares which class it covers, plus a fragment selector:

```ts
export const SHAPE_CASES: ShapeCase[] = [
  {
    classId: "schema-format",
    operation: "get-hourly-usage-attribution",
    fragment: { section: "request", field: "start_hr" },
  },
];
```

### 4. Fragment snapshots

`tests/headless/api-shape-snapshots.test.ts` renders each case's operation page through `AstroContainer`, extracts the fragment, normalizes it, and writes `tests/headless/api-shape-snapshots/<classId>.html` with `toMatchFileSnapshot`. It writes a matching `<classId>.md` from the same section of the plaintext twin.

- Move the normalizer in `api-html-snapshots.test.ts` (hash, uid and island-id canonicalization plus Prettier) into a shared helper that both tests import.
- Fragment extraction uses stable BEM classes. If a section or a schema row can't be addressed by a stable class and field name, add a `data-` attribute to the component rather than matching on markup structure.
- Fragments can be as large as coverage needs, up to a whole page section (operation description, permissions, deprecation notice, request body, a response code). Size is controlled by trimming the case's operation, not by narrowing the fragment.
- **Regions.** The static HTML holds every region's host, and the region picker only switches between them in the browser, so there is no single-region render to choose. Region behavior (`servers` variables, operations unavailable on some sites) gets its own classes and cases. All other fragments leave out the endpoint-host block.
- **Code examples.** Request-shape fragments include the examples generated from the spec, meaning the curl command and the JSON request-body example (`curlBuilder`, `schemaExampleBuilder`), because those change with the request schema. They leave out the SDK language tabs, which are copied from the SDK repos and don't depend on schema shape. The remaining whole-page snapshots and the `codeExampleLoader` tests cover SDK-tab rendering.
- **No SDK examples.** Trimmed cases under the dedicated tag have no SDK example files, so one class covers how an operation renders without them.
- The test warns, without failing, when a fragment is over 50 KB and names the case, since that usually means the operation wasn't trimmed.
- Target total size: a few hundred KB for roughly 100 to 150 classes.

### 5. Coverage check against the live spec

`tests/integration/specShapes.full-spec.test.ts` runs the detector on the live spec and **warns, without failing**, when:

- a live shape has no entry in `SHAPE_CLASSES`, or
- a class other than `NO_RENDER_EFFECT` has no case in `SHAPE_CASES`.

The test always passes. It prints one `console.warn` listing each gap, with up to three live operations that show each unmapped shape, so the fix (map it, add a case) is direct. A spec update upstream never breaks the build. The warning is the prompt to keep coverage current.

### 6. Trim the whole-page snapshots

When the shape snapshots are in place, reduce `api-html-snapshots` to the pages that guard page structure: one category landing, one multi-version operation, the empty category and the changelog. Drop the large operation pages whose content the shape cases now cover. Keep the plaintext twins in step.

## Implementation steps

Write each test first and confirm it fails before implementing. Snapshot steps are the exception: a new snapshot has no red state, so review its contents instead. While developing, run only the relevant tests (`yarn test:headless-ai <path>`). After each step, run `npx prettier --write <touched files>` from `astro/`. Tick each box when its step is done. At each compaction point, add a short status note below it (what's done, test counts, anything the next steps need to know), then hand back.

> **Compaction point 0:** before starting. Everything from the research is in this plan, so the investigation doesn't need to stay in context. **Stop here and ask the user to compact.**

1. [ ] **Shape detector.** Port the QA detector to `tests/lib/specShapes.ts`, reading only the spec. Unit test it against small inline spec snippets: one per shape family (parameter, request, response, description Markdown, operation extension), plus a recursive `$ref` that must not loop.
2. [ ] **Live inventory.** Run the detector against the live spec. Record the shape count and, for each shape, its operation count and up to three sample operations, as the working input for step 3.
3. [ ] **Shape-to-class mapping.** Trace each shape to the code that renders it, and write `tests/fixtures/api-shapes/shapeClasses.ts` with a code-path note per class. Use `NO_RENDER_EFFECT` for shapes the renderer ignores. Add a short summary to this plan: the class count, the largest merges, and any shapes that were hard to place.

> **Compaction point 1 (review gate):** the mapping is drafted. Nothing renders yet. **Stop here. Ask the user to review the grouping, then to compact.** Don't build cases until the mapping is approved.

4. [ ] **Shared normalizer.** Move the normalizer out of `api-html-snapshots.test.ts` into a shared helper. The existing HTML snapshots must come out byte-identical.
5. [ ] **Fragment extraction.** Write the extractor for a section or a schema row, keyed by stable BEM class and field name. Add `data-` attributes to components where a fragment can't be addressed otherwise. Unit test the extractor on a small rendered page.
6. [ ] **Harness with first cases.** Add the dedicated fixture tag with two or three trimmed cases (one parameter, one request body, one response), the snapshot test, the plaintext fragments and the 50 KB warning. Update the churned category, navigation and view-model snapshots, and confirm the only change in them is the new tag.

> **Compaction point 2:** the pipeline works end to end for a few cases. **Stop here and ask the user to compact.**

7. [ ] **Parameter cases.** One trimmed case per parameter class. Review the snapshots.
8. [ ] **Request body cases.** One case per request-body class, with the generated curl and JSON body examples in each fragment. Review the snapshots.

> **Compaction point 3:** parameter and request-body classes are covered. **Stop here and ask the user to compact.**

9. [ ] **Response cases.** One case per response class (codes, content types, schema shapes). Review the snapshots.
10. [ ] **Description and operation-level cases.** Description Markdown, permissions, deprecation, extensions, region availability, and the no-SDK-examples class. Review the snapshots.

> **Compaction point 4:** every class has a case. **Stop here and ask the user to compact.**

11. [ ] **Coverage check.** Unit test the gap-finding function first: an unmapped shape and a caseless class are reported, and a fully mapped input reports nothing. Then add `tests/integration/specShapes.full-spec.test.ts` and confirm it passes, printing a warning only if there are real gaps.
12. [ ] **Trim the whole-page snapshots.** Reduce `api-html-snapshots` and the plaintext twins as described in design step 6.

> **Compaction point 5:** the feature is done. Only the regression run is left. **Stop here and ask the user to compact.**

13. [ ] **Regression run.** Run `yarn test-ai` once. Then recommend that the user runs the prod build. Don't run it.
