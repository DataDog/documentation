# Prompt

I want to add support for conditional filters in Cdocs: filters that only display when the value of a previous filter matches a condition.

## Proposed configuration additions

The test in `test/integration/conditionalExample/conditionalExample.test.ts` reflects the desired functionality (the tests are not yet passing).

### show_if

Note the new `show_if` key in the frontmatter:

```javascript
const frontmatter: Frontmatter = {
    title: 'Programming Language Runtimes',
    content_filters: [
        {
        label: 'Programming Language',
        trait_id: 'prog_lang',
        option_group_id: 'prog_lang_options',
        },
        {
        label: 'Runtime',
        trait_id: 'runtime',
        option_group_id: '<PROG_LANG>_runtime_options',
        show_if: { prog_lang: ['java'] }, // this filter only shows when prog_lang is 'java'
        },
    ],
};
```

This configuration indicates that the second filter should only display when `prog_lang` is `java`. The key in the `show_if` object (`prog_lang`) explicitly identifies the parent trait, and the value is an array of parent option values for which the filter should be visible.

### hide_if

An identical result should also be achievable with `hide_if`:

```javascript
const frontmatter: Frontmatter = {
    title: 'Programming Language Runtimes',
    content_filters: [
        {
        label: 'Programming Language',
        trait_id: 'prog_lang',
        option_group_id: 'prog_lang_options',
        },
        {
        label: 'Runtime',
        trait_id: 'runtime',
        option_group_id: '<PROG_LANG>_runtime_options',
        hide_if: { prog_lang: ['ruby', 'python'] }, // this filter only shows when prog_lang is 'java'
        },
    ],
};
```

The idea is that a technical writer can choose whichever key is more simple for their use case.

Test coverage should be added for `hide_if`, since the above tests do not cover it.

### Why object syntax

Option group IDs can contain more than one placeholder (e.g. `<LANG>_<VERSION>_runtime_options`), so a plain array would be ambiguous — it wouldn't clarify which parent trait the condition refers to. The object syntax `show_if: { prog_lang: ['java'] }` makes the parent trait explicit. Only one trait key is allowed per `show_if`/`hide_if`.

### Constraints

`show_if` and `hide_if` should not appear on the same filter; they are mutually exclusive configuration options.

Each `show_if` / `hide_if` object must contain exactly one key (one parent trait).

## Impact of `show_if` and `hide_if` configuration

The above configuration should have the following impact.

### Validation

- Validations no longer expect these option groups to be present: `ruby_runtime_options`, `python_runtime_options`.
- The presence of a `java_runtime_options` group is still required and expected by validation.

### Filters manifest data

The filters manifest should appear as if the `ruby_runtime_options` and `python_runtime_options` groups exist, even though they do not actually exist on disk. Both groups should have only one option (also the default, obviously): `cdocs_noop`. The label can also be `cdocs_noop`.

The rendering of filters into HTML is outside the scope of the `cdocs-data` package, but the idea here is that any third-party HTML renderer can skip rendering the second filter if its value is `cdocs_noop`.

# Claude-generated plan

Generate a plan below the line. Break it into steps, and include verification steps and tests. Include the inputs and outputs you intend to use for the tests.

---

## Overview

The `<PROG_LANG>_runtime_options` template currently expects every expansion (`java_runtime_options`, `python_runtime_options`, `ruby_runtime_options`) to exist on disk. This plan adds `show_if`/`hide_if` so that only a subset need real option groups — the rest become synthetic noop groups that resolve to `cdocs_noop`.

The `show_if`/`hide_if` value is an object keyed by the parent trait ID, making it unambiguous which placeholder the condition targets — important when an `option_group_id` has multiple placeholders.

`resolveFilters` needs **no changes** — if the manifest is built correctly with synthetic noop groups, resolution works automatically.

## Step 1: Define `CDOCS_NOOP` constant

**New file:** `src/schemas/constants.ts`

```typescript
export const CDOCS_NOOP = 'cdocs_noop';
```

Also export from `src/index.ts`.

## Step 2: Add `show_if` / `hide_if` to filter config schemas

**File:** `src/schemas/frontmatter.ts`

Add to both `RawFilterConfigSchema` and `FilterConfigSchema`:

```typescript
show_if: z.record(z.string(), z.array(z.string().regex(SNAKE_CASE_REGEX))).optional(),
hide_if: z.record(z.string(), z.array(z.string().regex(SNAKE_CASE_REGEX))).optional(),
```

Add refinements to `FiltersConfigSchema`:
- Mutual exclusivity: error if both `show_if` and `hide_if` are present on the same filter.
- Single key: error if `show_if` or `hide_if` has zero or more than one key.

## Step 3: Modify `buildFiltersManifest`

**File:** `src/api/compilation/buildFiltersManifest.ts`

### 3a. New helper: `computeNoopOptionGroupIds()`

Given a filter's `show_if`/`hide_if`, the parent trait's options, and the full list of dynamic option group IDs, returns the `Set<string>` of IDs that should be synthetic noop groups.

Logic:
1. Extract parent trait ID from the key of the `show_if`/`hide_if` object
2. Validate that `option_group_id` contains a placeholder matching the parent trait (e.g. `<PROG_LANG>`)
3. For each parent option, check if it's excluded by `show_if` / included in `hide_if`
4. If excluded: resolve the template with that parent option value → that's a noop ID

### 3b. New helper: `buildSyntheticNoopOptionGroup()`

Returns `[{ id: CDOCS_NOOP, label: CDOCS_NOOP, default: true }]`.

### 3c. Modify main loop (after `buildDynamicOptionGroupIds` call)

Call `computeNoopOptionGroupIds()` and pass the result to `getPossibleDefaultsAndSelectedValues()`. Accumulate all noop IDs into an `allNoopOptionGroupIds` set for use in the option group attachment loop.

### 3d. Modify `getPossibleDefaultsAndSelectedValues()`

Add `noopOptionGroupIds?: Set<string>` param. For noop group IDs, skip the `customizationConfig` lookup and instead set:
- `defaultValsByOptionGroupId[id] = CDOCS_NOOP`
- `possibleVals.push(CDOCS_NOOP)` (deduplicated)

### 3e. Modify `getOptionLabel()`

Return `CDOCS_NOOP` directly when `optionId === CDOCS_NOOP` (it won't exist in `optionsById`).

### 3f. Modify manifest option group attachment

When attaching option groups to the manifest, if the group doesn't exist in `customizationConfig.optionGroupsById` but is in `allNoopOptionGroupIds`, insert a synthetic noop group via `buildSyntheticNoopOptionGroup()`.

### 3g. Modify `getDefaultValsByTraitId()`

When the resolved option group doesn't exist AND the filter has `show_if`/`hide_if`, set the default to `CDOCS_NOOP` instead of silently skipping. This handles the edge case where the default parent value leads to a noop group.

### 3h. Add validation in `computeNoopOptionGroupIds`

- `show_if`/`hide_if` values must be valid option IDs from the parent trait's option group → push manifest error if not.
- `show_if`/`hide_if` on a filter whose `option_group_id` does not contain a placeholder matching the referenced parent trait → push manifest error.

## Step 4: Update integration test expectations

**File:** `test/integration/conditionalExample/conditionalExample.test.ts`

Update `expectedOptionGroupIds` for the **manifest** test to include `python_runtime_options` and `ruby_runtime_options` (synthetic noop groups). Keep the **customization config** test expecting only `prog_lang_options` and `java_runtime_options` (what's on disk).

Snapshots will be auto-generated by vitest on the first passing run.

## Step 5: Add `hide_if` test coverage

**File:** `test/integration/conditionalExample/conditionalExample.test.ts`

Add a second `describe('Conditional example with hide_if', ...)` block using `hide_if: { prog_lang: ['python', 'ruby'] }` instead of `show_if: { prog_lang: ['java'] }`, verifying:
- Error-free manifest
- Same default resolution (java / jvm)
- Same python resolution (python / cdocs_noop)
- Same manifest option group IDs as the `show_if` variant

## Step 6: Add validation unit tests

**File:** `test/api/compilation/buildFiltersManifest.test.ts`

- Mutual exclusivity: both `show_if` and `hide_if` on the same filter → schema validation error
- Invalid `show_if` value not in parent options → manifest error
- `show_if` on a filter without a matching placeholder → manifest error

## File summary

| File | Change |
|------|--------|
| `src/schemas/constants.ts` | **NEW** — `CDOCS_NOOP` constant |
| `src/schemas/frontmatter.ts` | Add `show_if`/`hide_if` fields (record type) + refinements |
| `src/api/compilation/buildFiltersManifest.ts` | Core logic: noop computation, synthetic groups, validation |
| `src/index.ts` | Export `CDOCS_NOOP` |
| `test/integration/conditionalExample/conditionalExample.test.ts` | Update expectations, add `hide_if` describe block |
| `test/api/compilation/buildFiltersManifest.test.ts` | Add validation unit tests |
| `src/api/shared/resolveFilters.ts` | **No changes** |

## Verification

1. `npx vitest run` — full test suite
2. Confirm `conditionalExample` tests pass (both `show_if` and `hide_if` variants)
3. Confirm all existing tests still pass (no regressions — especially `complexExample`)
4. Inspect generated snapshots in `test/__snapshots__/conditionalExample/` for correctness
