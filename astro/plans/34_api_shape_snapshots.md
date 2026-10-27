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

When the shape snapshots are in place, reduce `api-html-snapshots` to the pages that guard page structure: the multi-version operation (`aws-integration`), the empty category, the changelog, and two or three category landings. Drop the large operation pages whose content the shape cases now cover. Keep the plaintext twins in step.

Category landings stay because the shape cases cover operation pages only. The landings, and `ApiEndpointSummary`, which renders only on them, have no other page-level guard.

The `getOperationView` JSON snapshots in `src/lib/api/__snapshots__/` also hold SDK and request-file data that the trimmed cases don't have. Remove them only together with the operation pages they mirror, and only after you've checked that the remaining tests cover that data. Keep the category view snapshots.

### 7. Prune redundant tests

After every class has a case, delete the existing tests that a fragment snapshot now covers. A survey of the API test files estimated about 260 tests and 3,900 lines, mostly in `refResolver`, `operationBuilder`, `curlBuilder`, and the HTML and plaintext tests for `ApiSchemaTable`, `ApiEndpoint`, `ApiResponse` and `ApiRequestBodyTabs`.

Rules:

- **Delete a test only when the shape it asserts maps to a class that has a case,** and that case's fragment would visibly change if the asserted behavior broke. For each batch, list the deleted tests and the class that covers each in the compaction-point status note.
- **Keep tests for shapes that don't occur in the live spec.** No case will ever cover them. Known examples: a required header with no example, query-parameter API key auth, AuthZ combined with other schemes, required exploded bracketed arrays, `additionalProperties: true`, responses with several content types, and a required `Content-Encoding` header. Run the detector to confirm before deleting anything that looks unusual.
- **Keep logic tests a snapshot can't localize:** `$ref` resolution and circular guards, depth caps, discriminant-threshold rules, the readOnly and writeOnly strip functions, request-file logic, shell escaping, `x-displayName`, ordering and tie-break rules, null returns and thrown errors.
- **Keep SDK-driven tests** (`ApiCodeExample` multi-language tabs, accordion, run instructions), because the trimmed cases have no SDK files.
- **Keep browser tests.** They cover interaction, not shapes.
- **Collapse near-duplicates that survive** into `test.each`, for example the 14 strip-function tests in `refResolver`.

## Implementation steps

Write each test first and confirm it fails before implementing. Snapshot steps are the exception: a new snapshot has no red state, so review its contents instead. While developing, run only the relevant tests (`yarn test:headless-ai <path>`). After each step, run `npx prettier --write <touched files>` from `astro/`. Tick each box when its step is done. At each compaction point, add a short status note below it (what's done, test counts, anything the next steps need to know), then hand back.

> **Compaction point 0:** before starting. Everything from the research is in this plan, so the investigation doesn't need to stay in context. **Stop here and ask the user to compact.**

1. [x] **Shape detector.** Port the QA detector to `tests/lib/specShapes.ts`, reading only the spec. Unit test it against small inline spec snippets: one per shape family (parameter, request, response, description Markdown, operation extension), plus a recursive `$ref` that must not loop.
2. [x] **Live inventory.** Run the detector against the live spec. Record the shape count and, for each shape, its operation count and up to three sample operations, as the working input for step 3.
3. [x] **Shape-to-class mapping.** Trace each shape to the code that renders it, and write `tests/fixtures/api-shapes/shapeClasses.ts` with a code-path note per class. Use `NO_RENDER_EFFECT` for shapes the renderer ignores. Add a short summary to this plan: the class count, the largest merges, and any shapes that were hard to place.

> **Compaction point 1 (review gate):** the mapping is drafted. Nothing renders yet. **Stop here. Ask the user to review the grouping, then to compact.** Don't build cases until the mapping is approved.

**Status (CP1):**

- **Detector:** `tests/lib/specShapes.ts` exports `detectOperationShapes(spec, version)` and `detectTagShapes(spec)`. Its 8 unit tests are in `tests/lib/specShapes.test.ts`. `tests/lib/**/*.test.ts` was added to the unit include list in `vitest.unit.config.ts`. On all 1,959 live operations, the port's output matched the QA script's exactly, before the one fix below. Operations are keyed by `version` plus `operationId`. The 40 repeated operationIds are all v1/v2 pairs.
- **Detector fix:** the QA script tagged both a required request body and a schema `required` list as `req:required`, so the body flag was hidden. Body-level tags are now `req:body-required` (806 ops) and `req:body-optional` (11 ops).
- **Live inventory:** 312 operation shapes, plus 7 tag-description shapes, across 1,959 operations.
- **Mapping:** `tests/fixtures/api-shapes/shapeClasses.ts` sorts the shapes into 105 classes, plus 61 `NO_RENDER_EFFECT` shapes and 6 `PAGE_SNAPSHOT` shapes. `SHAPE_CLASS_PATHS` holds each class's code-path note. `shapeBucket(shape)` checks exact matches, then wildcards. Every live shape is mapped. The only class without a live shape is `operation-no-sdk-examples`, which by design doesn't come from the spec.
- **Largest merges:**
  - `response-error`: 19 shapes, every 4xx and 5xx code plus `res:ref-response`.
  - `field-desc-inline`: 9 shapes. Description Markdown for parameter, request and response rows shares `SchemaFieldRow`, so location doesn't split classes.
  - `schema-scalar-types`, `schema-format`, `schema-default` and `schema-example-scalar`: 8 shapes each, because request and response share `refResolver` and `schemaExampleBuilder`.
- **Big `NO_RENDER_EFFECT` groups:**
  - Every bound and `pattern`, plus `nullable`, `uniqueItems` and `x-enum-varnames`.
  - Every `param:format:*`, because `parameterType` ignores `format`.
  - Every `param-field-desc:*`, because parameter rows show the parameter's description, not its schema's.
  - `x-pagination`, `x-sunset`, `x-terraform-resource`, `x-codegen-request-body-name`, `style`, `explode: false` and response `headers`.
- **Deviation from design step 2:** added a `PAGE_SNAPSHOT` bucket for the `tag-desc:*` shapes. They render only on category landings, which design step 6 keeps as whole-page snapshots. Step 11's coverage check must treat `PAGE_SNAPSHOT` like `NO_RENDER_EFFECT` and not ask for a case.
- **Hard to place (review these):**
  - `res:examples:*` and `res:media-example` are `NO_RENDER_EFFECT`. JSON responses ignore them, and only text responses read them, which `response-non-json-text` covers. The case for that class must use the spec example.
  - `op:x-menu-order` is `NO_RENDER_EFFECT`. It only orders the nav, which the category view snapshots cover.
  - `additionalProperties: false` is `NO_RENDER_EFFECT`. In `schemaExampleBuilder`, it only blocks the `oneOf` branch, and `schema-oneOf-with-additionalProperties` covers that.
  - `param:example-{path,query,header}` fold into the `param-location-*` classes. Each location case must include one parameter with an example and one without, so curl shows both the value and `CHANGE_ME`.
  - `param:bracket-name-optional` folds into `param-location-query`. An optional parameter never reaches curl, so the bracketed name renders like any other name.
  - **Region support isn't a shape.** The detector sees `op:servers-override`, but not which sites the `site` enum leaves out, or the five operations that use `exact_domains`. The `region-servers-override` case should be one of the exact-domain operations that leaves out some sites. If one case can't show both, add a second.
  - **oneOf discriminant labels aren't a shape.** The `schema-oneOf` case should be a union that gets discriminant labels. `schema-oneOf-inline-variant` covers the `Object N` fallback.
  - **Six mapped entries don't occur live.** They're `param-desc:numbered-list`, `req:array-items-untyped`, `req:required-not-in-properties`, `req:additionalProperties:number`, `res:exclusiveMinimum` and `res:exclusiveMaximum`. The shared request and response helpers emit them, and they're harmless. Remove them by hand if they bother you.

4. [x] **Shared normalizer.** Move the normalizer out of `api-html-snapshots.test.ts` into a shared helper. The existing HTML snapshots must come out byte-identical.
5. [x] **Fragment extraction.** Write the extractor for a section or a schema row, keyed by stable BEM class and field name. Add `data-` attributes to components where a fragment can't be addressed otherwise. Unit test the extractor on a small rendered page.
6. [x] **Harness with first cases.** Add the dedicated fixture tag with two or three trimmed cases (one parameter, one request body, one response), the snapshot test, the plaintext fragments and the 50 KB warning. Update the churned category, navigation and view-model snapshots, and confirm the only change in them is the new tag.

> **Compaction point 2:** the pipeline works end to end for a few cases. **Stop here and ask the user to compact.**

**Status (CP2):**

- **Mapping approval:** the user said "continue" after the CP1 review. That's taken as approval of the mapping and the `PAGE_SNAPSHOT` bucket.
- **Normalizer:** moved to `tests/lib/normalizeSnapshotHtml.ts` (`normalizeSnapshotHtml`). The 16 existing HTML snapshots came out unchanged. The move fixed a machine-dependent bug: the script-`src` rewrite cut the absolute path at the first `/src/`, so a checkout under some other `src/` folder (like `~/go/src/…`) failed all 16 snapshots. It's anchored on the project root now.
- **Extractor:** `tests/lib/apiFragment.ts` exports `extractApiFragment(html, selector)` and `extractPlaintextFragment(md, selector)`, with 19 unit tests in `tests/lib/apiFragment.test.ts`. Two of them render real fixture pages to prove every section is reachable.
  - `FragmentSelector` is `{ sections, field?, responseCode?, version? }`.
  - The sections are:
    - `overview`: status alert, description, permissions and scopes.
    - `endpoint-url`: hosts for every region. The plaintext twin shows the region table.
    - `arguments` and `request`.
    - `response`.
    - `curl`: `us` region only.
  - `field` narrows a schema section to one row plus its nested rows. `responseCode` narrows `response` to one code's panel, or its tab in the plaintext twin.
  - Missing sections, fields or codes throw.
  - Plaintext splits only on `## vN` and the five fixed `###` headings, outside code fences.
- **Component change:** `ApiEndpoint.astro` sets `data-api-section="arguments"` and `"request"` on its two `api-endpoint__section` blocks, the only sections without a unique class. I didn't add wrapper elements, because `ApiEndpoint.module.css` styles direct children (`.api-endpoint > pre`, `overview-heading + *`). This churned 5 operation snapshots by that one attribute (8 lines).
- **Harness:**
  - `tests/fixtures/api-shapes/shapeCases.ts` holds `SHAPE_CASES`, and `tests/headless/api-shape-snapshots.test.ts` writes `tests/headless/api-shape-snapshots/<classId>.{html,md}`.
  - Each snapshot starts with an HTML comment that names its class and page.
  - The test also checks that each class has at most one case, and warns above 50 KB. `--silent` hides the warning in `test:headless-ai`, so check sizes with `wc -c`.
- **Fixture:**
  - The v2 `partial_spec.yaml` has a `Rendering Shapes` tag (slug `rendering-shapes`) and three cases at the end of `paths`, which stays sorted, under a provenance comment:
    - `param-required-query` → GetInterfaces, with `{ sections: ["arguments", "curl"] }`
    - `request-json` → SetOnDemandConcurrencyCap, with `["request", "curl"]`
    - `response-error` → DeleteRumMetric, with `["response"]` and `responseCode: "404"`
  - The fixture quotes status codes and `$ref`s with double quotes.
  - How the cases are trimmed:
    - Inline the `$ref` parameters and schemas, unless the `$ref` is part of the class.
    - Reuse the fixture's shared error responses.
    - Cut the parts the fragment doesn't show down to a bare `"200": description: OK`.
- **Churn:** only `getCategoriesView/en.json` changed: the new category was added. 548 tests pass across `src/lib/api`, `tests/headless`, `ApiSideNav` and `src/integrations`.
- **Fragment size:** the three cases total 24 KB. The largest is `request-json.html`, at 9.5 KB.
- **Temp helpers:** `cand.mts` and `dump.mts` in `astro/` are untracked scratch scripts. Delete them before step 16.
  - `node cand.mts "<shape>+<shape>"` lists the smallest live v2 operations that show all the given shapes.
  - `node dump.mts <path> <method>` prints a live operation plus every component it references.

7. [x] **Parameter cases.** One trimmed case per parameter class. Review the snapshots.
8. [x] **Request body cases.** One case per request-body class, with the generated curl and JSON body examples in each fragment. Review the snapshots.

> **Compaction point 3:** parameter and request-body classes are covered. **Stop here and ask the user to compact.**

**Status (CP3):**

- **Cases:** 26 of them, one per parameter class (13) and request class (12), plus `response-error` from CP2. They produce 52 snapshot files, 214 KB in total. The largest is `request-json-variant.html` at 14 KB, mostly Shiki markup. 53 tests pass in the shape snapshot test.
- **Fixture:** 22 new trimmed operations: 21 in v2 and one in v1 (`SubmitDistributionPoints`, the only live `text/json`-only body). The v1 fixture gets its own `Rendering Shapes` tag with the same description, and the category merges both versions. One schema component was added: `OrgGroupPolicyFilterPolicyTypeValue`, since a `$ref` is part of the `param-ref-with-siblings` class. Everything else is inlined.
- **Shared operations:** cases can share an operation when their fragments differ. For example, `SetOnDemandConcurrencyCap` serves `request-json` (`request`), `request-curl-examples-one` (`curl`) and `param-none` (`endpoint-url`), and `SubmitLog` serves `request-multiple-content-types` (`request`) and `request-curl-examples-many` (`curl`). `request-json` dropped its curl for this. Some overlap is left: `request-none`'s curl is the same as `param-required-query`'s.
- **New selector option:** `absent?: ApiSection[]`. Extraction throws when a listed section renders. It covers classes that are a missing section (`param-none`, `request-none`), which a fragment can't show. There are 2 new extractor tests, 21 in total.
- **Mapping change (review this):** `request-non-json` is removed. In the live spec, `text/plain`, `application/logplex-1` and `application/json;simple` only occur beside `application/json`, which `resolveRequestBodyContent` picks, so the non-JSON path never renders. Those three shapes now map to `request-multiple-content-types`. Per design step 7, keep the unit tests for non-JSON bodies.
- **Trimming:** long descriptions are cut to their first sentence, examples to a few fields, and every success response to a bare description. Operation-level `security`, `servers`, `x-permission`, `x-unstable` and `x-menu-order` are dropped, because step 10 covers those. The STIX and GCP delegate bodies lost their `description`, so `request-required` and `request-optional` don't double as `request-description`.
- **Behavior now pinned (existing, Hugo parity):**
  - An exploded array exports placeholder values (`row_id_0="row_id_0"`), not the spec example.
  - A multipart curl sends `-F idp_file=@string`, while the Example tab shows `@/path/to/file`.
  - Several curl examples each get a `## <summary or id>` heading, including `## default`.
  - A top-level array body's Example tab shows one item, not an array.
  - HTML enum values sit in one `<code>`, while the plaintext twin uses one per value.
- **Churn:** `getCategoriesView/en.json` only gained operations in the Rendering Shapes category (+448 lines, no deletions). 623 tests pass across `src/lib/api`, `tests/headless`, `tests/lib`, `ApiSideNav` and `src/integrations`.
- **Temp helpers:** `cand.mts` and `dump.mts` take `V=v1` to read the v1 spec.

9. [x] **Response cases.** One case per response class (codes, content types, schema shapes). Review the snapshots.

**Status (step 9):** done after CP3, in two passes split by a compaction.

- **Cases:** all 10 `response-*` and 38 `schema-*` classes have cases. 73 of the 101 classes are covered, and the shape test has 147 tests, all passing. 671 pass across `src/lib/api`, `tests/headless` and `tests/lib`. The 38 schema snapshot pairs total about 620 KB. The largest single file is `schema-depth-cap.html` at 37 KB.
- **Mapping changes, for review:**
  - Removed `schema-title`. Only a union's own `title` names its row, and no live union has one, so `title` is `NO_RENDER_EFFECT`.
  - Removed `schema-top-level-scalar`. A string body is always `text/plain` beside JSON, so `req:top-level-string` maps to `request-multiple-content-types`. String responses are text or file downloads, so `res:top-level-string` maps to `response-non-json-text`.
  - Removed `schema-default-array`. Array rows never show a default, and the example builder returns the items' example first, so `default:array` is `NO_RENDER_EFFECT`.
  - Corrected two descriptions. `schema-array-of-arrays` renders `[array]`, not `[[type]]`. For `schema-recursive-ref`, `[Circular]` is Hugo's internal sentinel and the example shows an empty value.
- **Fixture:** 19 new trimmed v2 operations, one of them `UpsertRows` beside the existing `GetRowsByID` path, and 5 new v1 operations. Two components, `AstNode` (recursive) and `CasePriority` (the target of a `$ref` with siblings), stay as `$ref`s because their classes need them. Union branches outside a case's chain were dropped: only the API entity in `UpsertCatalogEntity`, only `ocsf_mapper` in `GetPipeline`.
- **`ShapeCase.category`:** extended to any operation already in the fixture under another tag, since a path can't be listed twice. `schema-format-date-time` and `schema-deprecated` use `dashboards/get-all-dashboards`, and `schema-no-type` uses `monitors/monitors-group-search`.
- **`extractPlaintextFragment` fix:** a map's `<any-key>` row names `additionalProperties` as its parent, so field narrowing used to drop it. It's now kept, with a unit test.
- **Picked by checking the renderer, not the detector:** some detected shapes don't render where they occur.
  - An untyped map beside properties is ignored, so `SubmitLog` and `SubmitCILog` were dropped.
  - A nested `[array]` hides `points`' item union, so `schema-array-of-oneOf` uses `GetRestrictionQuery`.
  - Only `GetPipeline`'s rows actually reach the depth cap. A scratch resolver with the cap raised found it.
- **Behavior pinned (Hugo parity, worth a look):**
  - A `oneOf` whose first branch has no properties builds an example of `{"description": "undefined", "type": "undefined"}`. This happens with `AnyValue` (`schema-oneOf-array-variant`) and with a map of inline primitives (`schema-oneOf-primitive-variant`).
  - `additionalProperties: false` beside a `oneOf` gives `{}`.
- **Churn:** `getCategoriesView/en.json` only gained the new operations.
- **Scratch helpers:** `cand.mts`, `dump.mts`, `fix.mts`, `tree.mts`, `trim.mts` and `merge.mts` in `astro/`, untracked. `trim.mts` inlines and prunes a live operation, and `merge.mts` inserts it in path order. Delete them before step 16.

10. [x] **Description and operation-level cases.** Description Markdown, permissions, deprecation, extensions, region availability, and the no-SDK-examples class. Review the snapshots.

**Status (CP4):**

- **Cases:** 28 new ones: 15 `operation-*`, 7 `op-desc-*`, 2 `region-*` and 4 `field-desc-*`. All 101 classes have a case. The shape test has 203 tests, all passing, and 732 pass across `src/lib/api`, `tests/headless` and `tests/lib`. The 202 snapshot files total 1.3 MB on disk.
- **Mapping changes, for review:**
  - Replaced `region-servers-extra-variables` with `region-servers-subdomain`. Only `servers[0]` is read, and every live extra variable is in a later block (the `{protocol}://{name}` proxy server), so `op:servers-extra-variables` is `NO_RENDER_EFFECT`. A `servers[0]` subdomain does render, so the detector has a new shape, `op:servers-subdomain`, which skips the global default `api`. It has a unit test.
  - `region-servers-override` now covers only the per-region hosts and "Not supported" rows. The subdomain is the other class.
  - Corrected `op-desc-raw-html` and `field-desc-raw-html`. The live spec has no raw HTML. Every hit is an angle bracket inside inline code (`` `<WEBHOOK NAME>` ``), so the cases pin that it's escaped.
- **New fragment sections**, each with HTML and plaintext unit tests (26 extractor tests in total):
  - `heading`: the page title and the endpoint's version tab, which sit outside `.api-endpoint`. Deprecation shows only there (`v2 (deprecated)`), and `x-displayName` shows in the title and the curl caption.
  - `code-tabs`: ApiCodeExample's language tabs without their panels, for `operation-no-sdk-examples`.
- **Fixture:** 17 new trimmed v2 operations and 2 v1 operations (`DeleteWebhooksIntegration`, `GetIPRanges`). `trim.mts` takes a `keep` list of operation-level keys (`deprecated`, `x-unstable`, `x-displayName`, `x-permission`, `security`, `servers`). Edits to existing operations: `ValidateCsvBudget` gets its live `security: []`, and `DownloadCSMThreatsPolicy` and `UploadSourceMap` get their full live descriptions back. `operation-auth-api-keys` uses the existing `authentication/validate-api-key`, which has the only small `apiKeyAuth`-only requirement.
- **Behavior pinned (existing, worth a look):**
  - In plaintext, a numbered list in a description renders as `1.` for every item.
  - A list in a row description collapses inline in the plaintext table (`- \`active\`: … - \`inactive\`: …`).
  - In the on-call host list, both gov regions get `navy.oncall.datadoghq.com`, the spec's default.
  - The `x-displayName` relabel reaches the HTML curl caption, but the plaintext curl tab has no caption.
- **Churn:** `getCategoriesView/en.json` (+1439) and `getScopeGroupsView.json` (+18) only gained lines.
- **Scratch helpers:** also `fx.mts` (shapes in the frozen fixture) and `desc.mts` (shortest live row descriptions that match a regex), in `astro/`, untracked.

> **Compaction point 4:** every class has a case. **Stop here and ask the user to compact.**

11. [x] **Coverage check.** Unit test the gap-finding function first: an unmapped shape and a caseless class are reported, and a fully mapped input reports nothing. Then add `tests/integration/specShapes.full-spec.test.ts` and confirm it passes, printing a warning only if there are real gaps.
12. [x] **Trim the whole-page snapshots.** Reduce `api-html-snapshots` and the plaintext twins as described in design step 6, keeping two or three category landings.

**Status (CP5):**

- **Coverage check:** `tests/lib/shapeCoverage.ts` holds `findShapeCoverageGaps` and `formatShapeCoverageGaps`, with 5 unit tests. `tests/integration/specShapes.full-spec.test.ts` checks every live operation plus each version's tag list, and passes. Run unsilenced, it prints no warning, so the live spec has no gaps today. Caseless classes are checked against every class in `SHAPE_CLASS_PATHS`, not only the classes a live shape maps to.
- **Pages kept**, in both the HTML and plaintext tests: the authentication, aws-integration and dashboard-lists landings, `08-aws-integration-list` (multi-version), the empty screenboards landing and the changelog, plus `01-api-landing.md`. File names are unchanged, so the kept snapshots didn't churn.
- **Pages dropped:** 6 operation pages and 4 landings (dashboards, incidents, monitors, usage-metering), 20 files. Snapshots went from 5.3 MB to 0.8 MB, with 60,286 lines deleted.
- **`getOperationView` JSON snapshots kept.** They're the only view-level guard of SDK example and request-file data, which the trimmed shape cases don't have. Removing them needs that coverage checked first. That fits step 13's `operationBuilder` pass.

> **Compaction point 5:** the new coverage is complete and the whole-page snapshots are trimmed. Only pruning and the regression run are left. **Stop here and ask the user to compact.**

13. [x] **Prune `src/lib/api` tests.** Apply the design step 7 rules to `refResolver`, `operationBuilder`, `curlBuilder`, `schemaExampleBuilder`, `regionResolver` and `multipartFormExamples`. Run each file's tests after pruning it.

**Status (step 13):** 108 tests deleted, and the five pruned files went from 4,075 to 2,254 lines. The 115 tests left in them pass. Each deleted test's class is listed below, and the fragment for that class shows the asserted output.

- **`refResolver` (38 deleted, 1,920 → 1,160 lines):**
  - **Object and type column:** simple object fields (`schema-scalar-types`, `schema-required`); enum values and the `enum` type (`schema-enum`); deprecated and readOnly flags (`schema-deprecated`, `response-readonly-writeonly`); format alone (`schema-format`); base type fallback (`schema-scalar-types`); `any` (`schema-no-type`); `[any]` (`schema-array-items-untyped`); the parameter format rule (`param-type`); the parameter `enum` (`param-enum`); `paramsToFields` basics (`param-location-path`, `param-default`).
  - **Arrays and top-level bodies:** `[string]` (`schema-array`); `[object]` for `$ref` items (`schema-ref-with-siblings`); a top-level array unwrap (`schema-top-level-array`); the non-array fall-through and object-body required (`schema-required`); the top-level `oneOf` describe (`schema-top-level-oneOf`).
  - **Unions:** inline union labels and types (`schema-oneOf-inline-variant`, `schema-oneOf-primitive-variant`); discriminant labels and raw angle brackets (`schema-oneOf`); arrays of a union, inline and `$ref` (`schema-array-of-oneOf`); five union-option-type tests and the array-option layout (`schema-oneOf-primitive-variant`, `schema-oneOf-array-variant`, `schema-oneOf`); scalar-variant enum values (the `schema-depth-cap` fragment shows one); the sibling-type describe (`schema-oneOf-with-type`, `schema-oneOf`).
  - **Maps, `$ref` siblings and defaults:** `<any-key>` of a scalar, object or union, and properties winning (`schema-map-of-scalars`, `schema-map-of-objects`, `schema-map-of-oneOf`, `schema-map-with-properties`); a `$ref`'s own description (`schema-ref-with-siblings`); unquoted string defaults (`schema-default`).
- **`operationBuilder` (34 deleted, 1,125 → 610 lines):**
  - **Responses:** schema description (`response-success`); writeOnly omitted from the response model and example (`response-readonly-writeonly`); JSON with media type parameters (`response-json-variant`); CSV (`response-non-json-text`); binary (`response-non-json-file`); empty body (`response-empty-body`).
  - **Permissions and scopes:** OR and AND permissions (`operation-permissions-any`, `-all`); single-entry scopes (`operation-oauth-scopes`).
  - **Request bodies:** text/json, multipart, preferring JSON, the schema-built example and readOnly stripping (`request-json-variant`, `request-multipart`, `request-multiple-content-types`, `request-json`, `request-readonly-strip`).
  - **Curl bodies:** one and several spec examples (`request-curl-examples-one`, `-many`); the schema-built body (`request-json`); no `-d` for multipart (`request-multipart`); no body (`request-none`).
  - **Curl headers and parameters:** the DD_SITE comment in plaintext and its absence in HTML (`operation-method`); Accept with and without a 204 (`response-no-content`); Content-Type (`request-none`, `request-json`); a required header (`param-required-header`); exploded arrays (`param-explode`); optional query parameters left out (`param-location-query`); multipart `-F` (`request-multipart`); the four per-region host tests (`region-servers-override`). This emptied six describes, which were removed.
- **`curlBuilder` (26 deleted, 629 → 258 lines):**
  - **Basics and body:** GET and POST basics (`operation-method`, `request-curl-examples-one`); comment-line layout and the uncompressed body (every curl fragment).
  - **Parameters:** path parameters with and without an example (`param-location-path`); required query with and without an example, bracket names, and optional query left out (`param-required-query`, `param-bracket-name-required`, `param-location-query`); exploded placeholders (`param-explode`).
  - **Hosts and headers:** DD_SITE and the other-sites comment (every curl fragment); no Content-Type without a body, and no Accept with a 204 (`region-servers-override`, `response-no-content`); the required header's position (`param-required-header`); multipart fields (`request-multipart`); the fixed host and other-hosts comment (`region-servers-override`); the custom subdomain (`region-servers-subdomain`).
  - **Auth:** security-driven auth headers, AuthZ bearer, global fallback and no auth (`operation-auth-api-keys`, `-bearer`, `-default`, `-none`).
- **`schemaExampleBuilder` (8 deleted):** type placeholders (`schema-scalar-types`); own examples (`schema-example-scalar`); nesting (`schema-nested-object`); `<any-key>` (`schema-map-of-scalars`); first oneOf variant (`schema-oneOf`); top-level array unwrap (`schema-top-level-array`); readOnly and writeOnly skipping (`request-readonly-strip`, `response-readonly-writeonly`); `$ref` sibling override (`schema-ref-with-siblings`).
- **`regionResolver` (none deleted):** kept as unit tests by request, although the region fragments show the same URLs.
- **`multipartFormExamples` (2 deleted):** `-F` with `@` (`request-multipart`); encoding-typed JSON (`request-multipart-encoding`).
- **Kept on purpose:**
  - `$ref` resolution and chains, circular guards, depth and level rules, and `getBestDiscriminant`.
  - The strip functions and writeOnly flagging.
  - Request-file and content-encoding logic, and shell escaping.
  - Shapes that aren't live: `anyOf`, `allOf`, `additionalProperties: true`, query-parameter auth, AuthZ combined with other schemes, a required header with no example, bracketed exploded arrays, and responses with several content types.
  - Precedence rules: enum ahead of format, operation security over global, and header order.
  - Null returns.
- **`getOperationView` JSON:** 6 of 7 deleted, with the operation pages they mirrored. Every audit case is still parsed against the view schema, and the aws-integration view snapshot stays beside its page snapshot. Other tests cover the data that only these snapshots held:
  - SDK loading, including the legacy languages: `codeExampleLoader.test.ts`.
  - Request-file loading: `requestFileLoader.test.ts`.
  - Request-file curls in every region: the `viewsBuilder` curl test.
14. [x] **Prune component tests.** Apply the same rules to the HTML and plaintext unit tests for `ApiSchemaTable`, `ApiEndpoint`, `ApiResponse`, `ApiRequestBodyTabs` and `ApiCodeExample`. Run each component's tests after pruning it.
15. [x] **Collapse survivors.** Merge the remaining near-duplicates into `test.each`. Record the final deleted test and line counts in this plan.

**Status (CP6):**

- **Component tests (step 14):** 76 deleted, and the ten files went from 2,138 to 1,032 lines. The 80 component tests left pass.
  - **`ApiSchemaTable` HTML (19 deleted):**
    - **Type column:** the bracketed `<oneOf>` and `[<oneOf>]`, and plain types (`schema-oneOf`, `schema-array-of-oneOf`, every table).
    - **Toolbar:** the toolbar's absence on a flat table and presence on a nested one (`param-location-path`, `schema-nested-object`).
    - **Rows:** the flat- and nested-row describes, with their toggles, hidden children and collapsed state (`schema-nested-object`); required (`schema-required`); readonly and deprecated modifiers (`response-readonly-writeonly`, `schema-deprecated`); the enum details overflow (`schema-depth-cap`); union option rows (`schema-oneOf`); HTML escaping of `<any-key>` and `<oneOf>` (every map and union fragment).
    - **Headers and paragraphs:** the Name and Field column headers (`param-location-path`, `response-success`); one `<p>` per paragraph (`field-desc-inline`).
  - **`ApiEndpoint` HTML (12 deleted):**
    - **Regions:** region URLs, "Not supported" and `data-region` (`region-servers-override`, `operation-method`).
    - **Alerts and permissions:** no alert when deprecated (`operation-deprecated`); single, any and all permissions (`operation-permissions-*`); the scope link (`operation-oauth-scopes`).
    - **Headings:** argument table titles (`param-location-*`); the request heading markers (`request-required`, `request-optional`).
  - **`ApiResponse` HTML (10 deleted):**
    - **Structure:** root, outer tabs, panels, description class, and Model and Example tabs (`response-success`, `response-multiple-2xx`); no inner tabs without a body (`response-no-content`).
    - **Table and description:** the Field header and the schema description above the table (`response-success`).
    - **Bodies:** the non-JSON text, binary and empty body tests (`response-non-json-text`, `response-non-json-file`, `response-empty-body`).
  - **`ApiRequestBodyTabs` HTML (4 deleted):** the Model and Example pair, untitled examples, the Field header, and language highlighting (`request-json`, `request-multipart`).
  - **`ApiCodeExample` HTML (2 deleted):** root and heading; per-region blocks (`region-servers-override`).
  - **Plaintext twins (29 deleted):**
    - **`ApiSchemaTable`:** the Parent field column, nested flattening, `<oneOf>`, inline enum and default, field DEPRECATED, and the `additionalProperties` parent.
    - **`ApiEndpoint`:** the region table and unsupported regions, alerts, description, sections, permissions and scope link, argument titles, and request markers.
    - **`ApiResponse`:** outer and inner tabs, description order, non-JSON, binary and empty bodies.
    - **`ApiRequestBodyTabs`:** the tab pair, untitled examples, and fence language.

    Each one maps to the same class as its HTML twin.
  - **Kept on purpose:**
    - Everything in `ApiSchemaTableNav`, since it covers interaction.
    - The `ApiCodeExample` SDK tests: multi-language tabs, accordion, label bar and run instructions.
    - Null and empty renders.
    - The Overview heading when there's no description, because no case has permissions without a description.
    - Unstable on a deprecated endpoint, deprecated union options, `anyOf`, and the expand-all toolbar for a union-only table or with `showExpandAll` false.
    - Reference-link rewriting, and request-example titling rules.
    - The section-id absence check.
- **Collapsed (step 15):**
  - The 14 `stripReadOnlyFields` and `stripWriteOnlyFields` tests are now one `describe.each` over both flags. It has 7 shared tests, and both flags now get the "everything flagged" case. One writeOnly-only test stays: read-only fields are kept.
  - The three top-level-array required tests are now one `it.each`.
  - The remaining duplicates differ in their expected output, so they stay separate.
- **Totals across the 15 test files changed in steps 13–15** (including `viewsBuilder`): 184 tests deleted. Static test blocks went from 384 to 192, and lines from 6,600 to 3,649. Five orphaned one-line doc comments left by the deletions were removed.

> **Compaction point 6:** pruning is done. Only the regression run is left. **Stop here and ask the user to compact.**

16. [x] **Regression run.** Run `yarn test-ai` once. Then recommend that the user runs the prod build. Don't run it.

**Status (step 16):** Typecheck has 0 errors, the headless suite passes 1,880 of 1,880 tests, and the browser suite passes 306 with 5 skipped. The scratch helpers are deleted. The prod build hasn't been run yet.
