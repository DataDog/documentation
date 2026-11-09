# Resolving the value of hidden filters

## Prompt

We just implemented a revision of the filter display logic (the details are in the [plan for that revision](./conditional_filters_revision.md)).

In this revision, we decided that a hidden filter should not have a value, but this might cause `undefined` access bugs at runtime. To protect against those, let's resolve hidden filters to have the value "cdocs_noop", with their only possible value being "cdocs_noop". Where a label is required, you can use "cdocs_noop" for that too.

### Clarifications

- `CDOCS_NOOP` should be exported from `index.ts` for downstream consumers.
- `convertTraitValueToSemver` should handle cdocs_noop by returning `'cdocs_noop'` as-is.

## Claude's plan

1. **Re-create `src/schemas/constants.ts`** with `export const CDOCS_NOOP = 'cdocs_noop'`.

2. **Update `ResolvedFilterSchema` in `src/schemas/pageFilters.ts`**: Expand the `display: false` branch to include `defaultValue`, `currentValue`, and `options` fields, all using `cdocs_noop`. Both branches of the union now have the same field names but different literal types for `display`.

3. **Update `resolveFilters` in `src/api/shared/resolveFilters.ts`**: When `display` is false, populate the resolved filter with `defaultValue: CDOCS_NOOP`, `currentValue: CDOCS_NOOP`, and `options: [{ id: CDOCS_NOOP, label: CDOCS_NOOP }]`.

4. **Export `CDOCS_NOOP` from `src/index.ts`**.

5. **Update `convertTraitValueToSemver` in `src/api/shared/convertTraitValueToSemver.ts`**: Add an early return that passes `cdocs_noop` through unchanged.

6. **Update tests**: Update integration test expectations and snapshots to include the new fields on hidden filters. Add a test for the cdocs_noop early return in `convertTraitValueToSemver`.