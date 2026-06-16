# API spec pipeline checklist

Read [docs/api/reference/pipeline.md](../reference/pipeline.md) first to understand the data flow, then use this checklist when you add to or change any part of [src/lib/api/](../../../src/lib/api/). Check items off once your change is implemented.

Query the user if you recommend another approach in any case.

## Checklist

### Schemas are the source of truth

- Every view shape returned by the pipeline has a corresponding Zod schema in [src/lib/api/schemas/](../../../src/lib/api/schemas/). When you add or change a field on a view, update its schema in the same change.

- Schemas use `.strict()`, so an unexpected field is an error, not a silent pass-through. Don't loosen a schema to make a value fit — add the field deliberately or reshape the value.

- Types consumed elsewhere are imported from the schema module (e.g. `SchemaField`, `ApiVersion`), not redefined. Keep the schema the single definition.

### Both API versions

- Changes account for both `v1` and `v2`. `API_VERSIONS` in [specParser.ts](../../../src/lib/api/specParser.ts) is the canonical list; don't hardcode a single version. Operations can exist in one or both versions.

### Translations fall through silently

- Translation overlays are keyed by tag slug and operation ID and mirror the Hugo JSON format. Missing files and missing keys fall through to English by design — do not add warnings or errors for translation gaps. Coverage is owned upstream. See [translationsLoader.ts](../../../src/lib/api/translationsLoader.ts).

- New display text sourced from the spec is routed through the translation overlay where an equivalent Hugo key exists, following the project's i18n fallback order. Do not add keys to the Hugo side; hardcode English with a `TODO` if no key exists yet (see [the root CLAUDE.md](../../../CLAUDE.md)).

### Memoization correctness

- `viewsBuilder` caches per-locale (categories) and per `(locale, slug)` (endpoints). If you add a new input that varies the output (for example, a new dimension beyond locale and slug), the cache key includes it. A stale cache key returns the wrong view for the second caller.

### Schemas validated, then snapshotted

- The change is covered by the snapshot tests in [viewsBuilder.test.ts](../../../src/lib/api/viewsBuilder.test.ts). Each snapshot is preceded by a Zod `.parse()` so a shape regression surfaces as a schema error with a field path, not just a snapshot diff. Keep both the parse check and the snapshot.

- Snapshots are written with `toMatchFileSnapshot` to human-readable `__snapshots__/**/*.json` files. After an intentional change, regenerate with `npm test -- -u` and review the diff — an unexpected snapshot change is a real finding, not noise to accept.

### Fixtures vs. live spec

- Unit tests run against the **frozen** trimmed fixture in [tests/fixtures/api/](../../../tests/fixtures/api/), wired by [vitest.unit.config.ts](../../../vitest.unit.config.ts). The integration test [viewsBuilder.full-spec.test.ts](../../../tests/integration/viewsBuilder.full-spec.test.ts) validates shapes against the **live** upstream spec. Know which you're affecting.

- If your change needs spec data (a tag, path, or operation) not present in the fixture, add it to the retained set in [scripts/generate-test-fixture.mjs](../../../scripts/generate-test-fixture.mjs) (`KEEP_TAGS`), then regenerate with `npm run generate-fixture` followed by `npm test -- -u`. The full `components` section is preserved so internal `$ref`s still resolve — don't trim it.

- New curated audit cases (categories or endpoints exercised by snapshots) are added to [tests/fixtures/api/auditCases.ts](../../../tests/fixtures/api/auditCases.ts) so they're covered, not just present in the fixture.

### Build-time only

- The pipeline runs at build time. Don't introduce runtime/client-side spec parsing or pass large parsed spec structures into client islands. Views are assembled at build time and rendered to static HTML. See the [components checklist](../../components/checklists/all.md) for the island/large-props rule.

### Plaintext / llms.txt parity

- If you add a field that should appear in the plaintext API output, update [llmsTxtRenderer.ts](../../../src/lib/api/llmsTxtRenderer.ts) and its test so the HTML and plaintext renderings stay in parity.

### Testing

- All relevant [audit cases](../reference/audit_cases.md) have test coverage. For example, if a new feature is added that affects three of those audit cases, the tests for the new feature cover all three.
