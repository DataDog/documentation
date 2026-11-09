# Conditional filters architectural revision

## Prompt

### Problem

Recently, we implemented a feature that allows a content filter to be displayed or hidden based on its `show_if` and `hide_if` criteria. For details, read the [plan for conditional filters](./conditional_filters.md).

With more testing, the design we used has turned out to be problematic, and I want to revise it.

Our decision to use a `cdocs_noop` sentinel value forces every conditionally displayed filter to use placeholders (such as `<PROG_LANG>`) and the corresponding dynamic option groups. This approach couples the concepts of "conditional display" and "dynamic options" too tightly.

In a more minor concern, the `cdocs_noop` value just introduces awkwardness around validation (see [our recent fixes for this](skip_cdocs_noop_validation.md)), and is less intuitive than each filter having something like `isShown: true` inside the FiltersManifest for a page.

Instead of using the `cdocs_noop` sentinel value, I want to implement logic that only addresses the concern of filter visibility, regardless of whether the filter has dynamic options or not.

### Desired frontmatter configuration

The feature currently only allows one trait. Update the configuration to allow multiple conditions. 

Each entry in the `show_if` array represents one condition, with an implied "and" between the entries in the condition. There is an implied "or" between separate conditions: the filter will show if *any* of the conditions are true.

```yaml
show_if:
  - prog_lang: ["java"]
    os: ["linux", "windows"]
  - prog_lang: ["python"]
    os: ["mac_os"]
```

To translate the above configuration to English: the filter will show if `prog_lang` is `java` and `os` is `linux` or `windows`. It will also show if `prog_lang` is `python` and `os` is `mac_os`.

`hide_if` should be structured the same way:

```yaml
hide_if:
  - prog_lang: ["java"]
    os: ["linux", "windows"]
  - prog_lang: ["python"]
    os: ["mac_os"]
```

The filter will be hidden if *any* of the conditions are true, and there is an implied *and* between two key-value entries inside the same condition.

### Requirements

#### Configuration input structure

- Frontmatter configuration should still use `show_if` and `hide_if`, which are still mutually exclusive.
- The configuration structure should be updated to allow multiple conditions, as shown in the desired frontmatter configuration example above. Each array entry under `show_if` and `hide_if` represents a condition. There is an implied "and" between the key-value entries of a single condition. There is an implied "or" between the conditions in the array.

#### Placeholders and dynamic options

A conditionally displayed filter can still have dynamic options (an option group ID that uses placeholders like `<PROG_LANG>`). Dynamic options are a separate concern from display logic, but the display logic does influence which option groups need to be validated as existing for the filter. 

Validations irrelevant to a filter should be skipped. For example, if the filter's option group ID is `<PROG_LANG>_runtime_options`, but it contains the configuration `hide_if: [{ prog_lang: ["go"]}]`, it does not need to validate that `go_runtime_options` exists, because it will not be displayed at all when `prog_lang` is `go`.

#### FiltersManifest updates

- The FiltersManifest should directly include the `show_if` and `hide_if` configuration data inside the filter configuration information.
- In the FiltersManifest, the resolved filter should also have a `isShown: true` or `isShown: false` value, the result of its `show_if` / `hide_if` conditions being checked.

### Removal of `cdocs_noop`

Remove `cdocs_noop` and synthetic noop option groups entirely from the codebase, including all related code and tests. The new `isShown` boolean replaces the purpose of `cdocs_noop`.

### Resolution behavior when hidden

`resolveFilters()` computes the `isShown` attribute on each resolved filter based on the user's current trait selections and the filter's `show_if`/`hide_if` config. When a filter has `isShown: false`, it should not be resolved further — there is no need to give the filter a value, option group, or available options.

### Filters without conditions

Filters that have no `show_if`/`hide_if` always have `isShown: true`.

### Implementation

This feature is complex. Use isolated functions where possible when resolving questions like "Should this filter be displayed?" or "Which traits are relevant to this filter?" Write tests for those isolated functions and ensure they're passing before using the functions more broadly.

### Rendering

We don't have to worry about HTML rendering logic. That's handled by another package. It's enough to include information in the FiltersManifest about whether the resolved filter should be displayed.

### Testing

Make a dedicated folder that contains these tests. Use the `conditionalExample.test.ts` as an example of how the tests should be set up, but skip all of the console logs and do not defer the assertions until the end.

#### Configuration

The tests should use three traits:

- `os`, with the options `linux`, `windows`, and `mac_os`.
- `prog_lang`, with the options `java`, `python`, and `ruby`.
- `runtime`, which can have dynamic options as needed for the test cases listed below. (The options themselves can be fake, they don't have to exist in real life.)

Store the required configuration in dedicated files, such as `conditional_filter_options.yaml`, rather than mixing them in with configuration used for other tests.

#### Test cases

The tests should conditionally hide or show the `runtime` filter across the following test cases.

##### Single trait, with no dynamic options/placeholders

Use the option group ID `java_runtime_options` in the frontmatter's `runtime` filter configuration.

Test these configuration cases:

  - `hide_if` the `prog_lang` trait is `python` or `ruby`.
  - `show_if` the `prog_lang` trait is `java`.

##### Multiple traits, with no dynamic options/placeholders

Use the option group ID `java_runtime_options` in the frontmatter's `runtime` filter configuration.

Test these configuration cases:

  - `hide_if` the `os` is `windows` and the `prog_lang` trait is `python` or `ruby`.
  - `show_if` the `os` is `linux` or `mac_os` and the `prog_lang` trait is `java`.

##### Single trait, with one placeholder (dynamic options)

Use the option group ID `<PROG_LANG>_runtime_options` in the frontmatter's `runtime` filter configuration.

Test these configuration cases:

  - `show_if` the `prog_lang` trait is `java` or `python`.
  - `hide_if` the `prog_lang` trait is `ruby`.

##### Two traits, with one placeholder (dynamic options)

Use the option group ID `<PROG_LANG>_runtime_options` in the frontmatter's `runtime` filter configuration.

Test these configuration cases:

  - `show_if` the `os` is `linux` or `mac_os` and the `prog_lang` trait is `java` or `python`.
  - `hide_if` the `os` is `windows` and `prog_lang` trait is `ruby`.

##### Two traits, two placeholders (dynamic options)

Use the option group ID `<OS>_<PROG_LANG>_runtime_options` in the frontmatter's `runtime` filter configuration.

Test these configuration cases:

  - `show_if` the `os` is `linux` or `mac_os` and the `prog_lang` trait is `java` or `python`.
  - `hide_if` the `os` is `windows` and `prog_lang` trait is `ruby`.

## Claude's plan

### Overview

This revision decouples display logic from the `cdocs_noop` sentinel value approach. Instead of synthesizing fake option groups for hidden filters, each resolved filter gets an `isShown` boolean computed at resolve time. The `show_if`/`hide_if` schema changes from a single-key record to an array of multi-key conditions (OR of ANDs). `cdocs_noop` and all synthetic noop machinery are removed entirely.

### Step 1: Update the `show_if`/`hide_if` schema

**File:** `src/schemas/frontmatter.ts`

Change the type of `show_if` and `hide_if` from `z.record(z.string(), z.array(z.string()))` to an array of records:

```typescript
const ConditionalDisplaySchema = z.array(
  z.record(z.string(), z.array(z.string().regex(SNAKE_CASE_REGEX)))
).optional();
```

Apply to both `RawFilterConfigSchema` and `FilterConfigSchema`.

Update the `FiltersConfigSchema` refinements:
- **Mutual exclusivity**: Keep the existing check (both cannot appear on the same filter).
- **Remove the single-key constraint**: The old refinement enforced exactly one key per `show_if`/`hide_if` object. Remove this entirely — each array entry can now have multiple keys.

### Step 2: Write the isolated `shouldDisplayFilter` function

**New file:** `src/api/shared/shouldDisplayFilter.ts`

```typescript
export function shouldDisplayFilter(p: {
  filterConfig: FilterConfig;
  valsByTraitId: Record<string, string>;
}): boolean
```

Logic:
1. If the filter has no `show_if` and no `hide_if`, return `true`.
2. If the filter has `show_if`, evaluate the conditions. Return `true` if **any** condition matches (OR). A condition matches if **all** of its entries match (AND). An entry matches if the current trait value is in the entry's array of values.
3. If the filter has `hide_if`, evaluate the conditions. Return `false` if **any** condition matches (same OR-of-ANDs logic). Otherwise return `true`.

Export from `src/index.ts`.

### Step 3: Write the isolated `getExcludedTraitValues` function

**Same file:** `src/api/shared/shouldDisplayFilter.ts`

```typescript
export function getExcludedTraitValues(p: {
  filterConfig: FilterConfig;
  parentTraitId: string;
  parentOptionIds: string[];
}): string[]
```

Given a filter's `show_if`/`hide_if` and a specific parent trait, return the parent option values for which the filter would **always** be hidden (regardless of other traits). This is used during manifest building to determine which dynamic option groups can be skipped during validation.

Logic:
- For each parent option value, check whether there is **any** combination of other trait values that would make the filter visible. If not, the value is excluded.
- For simple cases (single-trait conditions), this reduces to: `show_if` excludes values not in the allowed list; `hide_if` excludes values in the blocked list.
- For multi-trait conditions, a parent value is only excluded if the filter is hidden for **every** possible combination of the other traits. Since we don't enumerate all combinations at manifest-build time, conservatively only exclude a parent value if every condition in `show_if` explicitly excludes it (i.e., the trait either isn't mentioned or the value isn't in the list) OR if any condition in `hide_if` would match for **all** possible other-trait values (i.e., the condition only references this one trait and the value is in the list).

A simpler approach: only exclude values when the conditions reference a single trait. When conditions involve multiple traits, don't exclude any values (validate all option groups). This is conservative but correct — multi-trait conditions can't definitively exclude a parent value without knowing other trait selections.

### Step 4: Write unit tests for Step 2 and Step 3

**New file:** `test/api/shared/shouldDisplayFilter.test.ts`

Test `shouldDisplayFilter`:
- No conditions → returns `true`
- `show_if` single trait, single condition → true/false based on match
- `show_if` with multiple conditions (OR logic) → true if any matches
- `show_if` with multi-key condition (AND logic) → true only if all keys match
- `hide_if` single trait → false when matched, true otherwise
- `hide_if` with multiple conditions (OR logic)
- `hide_if` with multi-key condition (AND logic)

Test `getExcludedTraitValues`:
- `show_if` single-trait condition → excludes values not in allowed list
- `hide_if` single-trait condition → excludes values in blocked list
- Multi-trait conditions → conservatively excludes nothing (returns empty)

Run these tests and ensure they pass before proceeding.

### Step 5: Update `ResolvedFilterSchema` to include `isShown`

**File:** `src/schemas/pageFilters.ts`

Add `isShown: z.boolean()` to `ResolvedFilterSchema`. However, since hidden filters are not fully resolved, restructure as a discriminated union:

```typescript
export const ResolvedFilterSchema = z.union([
  z.strictObject({
    id: z.string().regex(SNAKE_CASE_REGEX),
    label: z.string(),
    isShown: z.literal(true),
    defaultValue: z.string().regex(SNAKE_CASE_REGEX),
    options: z.array(ResolvedFilterOptionSchema),
    currentValue: z.string().regex(SNAKE_CASE_REGEX),
  }),
  z.strictObject({
    id: z.string().regex(SNAKE_CASE_REGEX),
    label: z.string(),
    isShown: z.literal(false),
  }),
]);
```

When `isShown: true`, all the usual fields are present. When `isShown: false`, only `id` and `label` are present.

### Step 6: Update `resolveFilters`

**File:** `src/api/shared/resolveFilters.ts`

Import and use `shouldDisplayFilter`. For each filter config:

1. Call `shouldDisplayFilter({ filterConfig, valsByTraitId })`.
2. If `false`, emit `{ id, label, isShown: false }` and continue to the next filter.
3. If `true`, resolve the filter as before and add `isShown: true` to the result.

Remove the `cdocs_noop` import if present.

### Step 7: Update `buildFiltersManifest`

**File:** `src/api/compilation/buildFiltersManifest.ts`

#### 7a: Remove `cdocs_noop` machinery

- Remove import of `CDOCS_NOOP`.
- Remove `computeNoopOptionGroupIds()` function and its call.
- Remove `buildSyntheticNoopOptionGroup()` function.
- Remove `allNoopOptionGroupIds` set and all references.
- Remove the `noopOptionGroupIds` parameter from `getPossibleDefaultsAndSelectedValues()` and all noop-related logic inside it.
- Remove the `CDOCS_NOOP` handling from `getOptionLabel()`.
- Remove the `CDOCS_NOOP` fallback from `getDefaultValsByTraitId()`.
- Remove the noop-related branch in the option group attachment loop.
- Remove the `cdocs_noop` skip in the semver validation loop.

#### 7b: Use `getExcludedTraitValues` for validation skipping

When building dynamic option group IDs, use `getExcludedTraitValues` to determine which expanded option group IDs can be skipped during validation. After `buildDynamicOptionGroupIds` produces all possible IDs, filter out those corresponding to excluded parent trait values before passing them to `getPossibleDefaultsAndSelectedValues`.

Specifically, for each placeholder trait in the option group ID:
1. Call `getExcludedTraitValues` with the filter config, the placeholder trait ID, and the parent trait's option IDs.
2. Filter the expanded option group IDs to exclude any that were generated from an excluded parent value.

#### 7c: `getDefaultValsByTraitId` update

When the resolved option group doesn't exist for a conditional filter (because the default parent value leads to an excluded combination), use the first non-excluded option group's default instead. If no valid default can be determined (all combinations are excluded), push a manifest error.

### Step 8: Remove `cdocs_noop` from the rest of the codebase

**Files to update:**

| File | Change |
|------|--------|
| `src/schemas/constants.ts` | Delete the file (or remove the `CDOCS_NOOP` export) |
| `src/index.ts` | Remove `CDOCS_NOOP` export |
| `src/api/shared/convertTraitValueToSemver.ts` | Remove the `cdocs_noop` early return and its import |
| `test/api/shared/semverComparisons.test.ts` | Remove the two `cdocs_noop` tests (~lines 100-106) |
| `test/api/compilation/buildFiltersManifest.test.ts` | Remove the `cdocs_noop` semver test (~lines 118-152), update conditional filter validation tests for the new array schema |
| `test/integration/conditionalExample/` | Remove or rewrite entirely — this test suite is built around `cdocs_noop` |
| `test/__snapshots__/conditionalExample/` | Delete snapshot files (they'll be regenerated or no longer needed) |

### Step 9: Update the existing conditional filter validation tests

**File:** `test/api/compilation/buildFiltersManifest.test.ts`

Update the `buildFiltersManifest conditional filter validation` describe block:
- Update frontmatter to use the new array syntax for `show_if`/`hide_if` (e.g., `show_if: [{ lang: ['java'] }]`).
- Remove the "single key" validation test (no longer applicable).
- Keep the mutual exclusivity test, updated for array syntax.
- Keep the invalid `show_if` value test, updated for array syntax.
- Remove or update the "no matching placeholder" test. With the new architecture, `show_if`/`hide_if` no longer require a matching placeholder in the option group ID — a filter can have a static option group ID with conditional display. This test should be removed.

### Step 10: Create test configuration files

**New directory:** `test/integration/conditionalFilterRevision/`

**New files:**

`customization_config/en/traits/traits.yaml`:
```yaml
traits:
- id: os
  label: Operating System
  type: text
- id: prog_lang
  label: Programming Language
  type: text
- id: runtime
  label: Runtime
  type: text
```

`customization_config/en/options/options.yaml`:
```yaml
options:
  - id: linux
    label: Linux
  - id: windows
    label: Windows
  - id: mac_os
    label: macOS
  - id: java
    label: Java
  - id: python
    label: Python
  - id: ruby
    label: Ruby
  - id: jvm
    label: JVM
  - id: graal_vm
    label: GraalVM
  - id: cpython
    label: CPython
  - id: pypy
    label: PyPy
```

Option group files (one per file, following existing convention):

- `os_options.yaml` — linux (default), windows, mac_os
- `prog_lang_options.yaml` — java (default), python, ruby
- `java_runtime_options.yaml` — jvm (default), graal_vm
- `python_runtime_options.yaml` — cpython (default), pypy

For the two-placeholder test cases (`<OS>_<PROG_LANG>_runtime_options`), create the necessary option groups:
- `linux_java_runtime_options.yaml`, `linux_python_runtime_options.yaml`
- `mac_os_java_runtime_options.yaml`, `mac_os_python_runtime_options.yaml`
- (Windows and ruby combinations are excluded by the test conditions, so they don't need to exist.)

### Step 11: Write the integration tests

**New file:** `test/integration/conditionalFilterRevision/conditionalFilterRevision.test.ts`

Follow the pattern from `conditionalExample.test.ts` but with inline assertions (no deferred logic, no console logs).

Each test case group (`describe` block) follows this pattern:
1. Load the shared customization config.
2. Define frontmatter with the specific `option_group_id` and `show_if`/`hide_if`.
3. Build the manifest and assert no errors.
4. Resolve filters with representative trait values and assert:
   - `isShown: true` with expected `currentValue` when conditions are met.
   - `isShown: false` (with no `currentValue` / `options`) when conditions are not met.

#### Test case: Single trait, no dynamic options — `hide_if`

Frontmatter: `option_group_id: 'java_runtime_options'`, `hide_if: [{ prog_lang: ['python', 'ruby'] }]`

Assertions:
- `prog_lang: 'java'` → runtime has `isShown: true`, `currentValue: 'jvm'`
- `prog_lang: 'python'` → runtime has `isShown: false`
- `prog_lang: 'ruby'` → runtime has `isShown: false`

#### Test case: Single trait, no dynamic options — `show_if`

Frontmatter: `option_group_id: 'java_runtime_options'`, `show_if: [{ prog_lang: ['java'] }]`

Assertions:
- `prog_lang: 'java'` → runtime has `isShown: true`, `currentValue: 'jvm'`
- `prog_lang: 'python'` → runtime has `isShown: false`

#### Test case: Multiple traits, no dynamic options — `hide_if`

Frontmatter: `option_group_id: 'java_runtime_options'`, `hide_if: [{ os: ['windows'], prog_lang: ['python', 'ruby'] }]`

Assertions:
- `os: 'linux', prog_lang: 'java'` → runtime `isShown: true`
- `os: 'windows', prog_lang: 'python'` → runtime `isShown: false` (both conditions match)
- `os: 'windows', prog_lang: 'java'` → runtime `isShown: true` (only `os` matches, not `prog_lang`)
- `os: 'linux', prog_lang: 'ruby'` → runtime `isShown: true` (only `prog_lang` matches, not `os`)

#### Test case: Multiple traits, no dynamic options — `show_if`

Frontmatter: `option_group_id: 'java_runtime_options'`, `show_if: [{ os: ['linux', 'mac_os'], prog_lang: ['java'] }]`

Assertions:
- `os: 'linux', prog_lang: 'java'` → runtime `isShown: true`
- `os: 'mac_os', prog_lang: 'java'` → runtime `isShown: true`
- `os: 'windows', prog_lang: 'java'` → runtime `isShown: false` (os doesn't match)
- `os: 'linux', prog_lang: 'python'` → runtime `isShown: false` (prog_lang doesn't match)

#### Test case: Single trait, one placeholder — `show_if`

Frontmatter: `option_group_id: '<PROG_LANG>_runtime_options'`, `show_if: [{ prog_lang: ['java', 'python'] }]`

Assertions:
- `prog_lang: 'java'` → runtime `isShown: true`, `currentValue: 'jvm'`
- `prog_lang: 'python'` → runtime `isShown: true`, `currentValue: 'cpython'`
- `prog_lang: 'ruby'` → runtime `isShown: false`
- Manifest error-free (no validation error for missing `ruby_runtime_options`)

#### Test case: Single trait, one placeholder — `hide_if`

Frontmatter: `option_group_id: '<PROG_LANG>_runtime_options'`, `hide_if: [{ prog_lang: ['ruby'] }]`

Assertions:
- `prog_lang: 'java'` → runtime `isShown: true`
- `prog_lang: 'python'` → runtime `isShown: true`
- `prog_lang: 'ruby'` → runtime `isShown: false`
- Manifest error-free (no validation error for missing `ruby_runtime_options`)

#### Test case: Two traits, one placeholder — `show_if`

Frontmatter: `option_group_id: '<PROG_LANG>_runtime_options'`, `show_if: [{ os: ['linux', 'mac_os'], prog_lang: ['java', 'python'] }]`

Assertions:
- `os: 'linux', prog_lang: 'java'` → runtime `isShown: true`, `currentValue: 'jvm'`
- `os: 'mac_os', prog_lang: 'python'` → runtime `isShown: true`, `currentValue: 'cpython'`
- `os: 'windows', prog_lang: 'java'` → runtime `isShown: false`
- `os: 'linux', prog_lang: 'ruby'` → runtime `isShown: false`
- Manifest validates `java_runtime_options` and `python_runtime_options` exist, but not `ruby_runtime_options` (conservatively: since multi-trait conditions are involved, we may validate all — see Step 3 note)

#### Test case: Two traits, one placeholder — `hide_if`

Frontmatter: `option_group_id: '<PROG_LANG>_runtime_options'`, `hide_if: [{ os: ['windows'], prog_lang: ['ruby'] }]`

Assertions:
- `os: 'linux', prog_lang: 'java'` → runtime `isShown: true`
- `os: 'windows', prog_lang: 'ruby'` → runtime `isShown: false`
- `os: 'windows', prog_lang: 'java'` → runtime `isShown: true` (only os matches)

#### Test case: Two traits, two placeholders — `show_if`

Frontmatter: `option_group_id: '<OS>_<PROG_LANG>_runtime_options'`, `show_if: [{ os: ['linux', 'mac_os'], prog_lang: ['java', 'python'] }]`

Assertions:
- `os: 'linux', prog_lang: 'java'` → runtime `isShown: true`
- `os: 'mac_os', prog_lang: 'python'` → runtime `isShown: true`
- `os: 'windows', prog_lang: 'java'` → runtime `isShown: false`
- Manifest error-free (no validation errors for missing `windows_*` or `*_ruby_*` option groups)

#### Test case: Two traits, two placeholders — `hide_if`

Frontmatter: `option_group_id: '<OS>_<PROG_LANG>_runtime_options'`, `hide_if: [{ os: ['windows'], prog_lang: ['ruby'] }]`

Assertions:
- `os: 'linux', prog_lang: 'java'` → runtime `isShown: true`
- `os: 'windows', prog_lang: 'ruby'` → runtime `isShown: false`
- `os: 'linux', prog_lang: 'ruby'` → runtime `isShown: true` (os doesn't match)

### Step 12: Verification

1. Run `npx vitest run` — full test suite passes.
2. All new tests in `test/integration/conditionalFilterRevision/` pass.
3. All new unit tests in `test/api/shared/shouldDisplayFilter.test.ts` pass.
4. Existing tests in `test/api/compilation/buildFiltersManifest.test.ts` pass (after updates).
5. No references to `cdocs_noop` or `CDOCS_NOOP` remain in `src/` or `test/` (only in `plans/` and docs).
6. No regressions in other integration tests (`complexExample`, etc.).

### File summary

| File | Change |
|------|--------|
| `src/schemas/frontmatter.ts` | Change `show_if`/`hide_if` type to array of records; remove single-key refinement |
| `src/schemas/pageFilters.ts` | Add `isShown` boolean to `ResolvedFilterSchema` as discriminated union |
| `src/schemas/constants.ts` | Delete file |
| `src/index.ts` | Remove `CDOCS_NOOP` export |
| `src/api/shared/shouldDisplayFilter.ts` | **NEW** — `shouldDisplayFilter()` and `getExcludedTraitValues()` |
| `src/api/shared/resolveFilters.ts` | Use `shouldDisplayFilter` to compute `isShown`; skip resolution when `false` |
| `src/api/shared/convertTraitValueToSemver.ts` | Remove `cdocs_noop` early return |
| `src/api/compilation/buildFiltersManifest.ts` | Remove all noop machinery; use `getExcludedTraitValues` for validation skipping |
| `test/api/shared/shouldDisplayFilter.test.ts` | **NEW** — unit tests for display logic |
| `test/api/shared/semverComparisons.test.ts` | Remove `cdocs_noop` tests |
| `test/api/compilation/buildFiltersManifest.test.ts` | Update conditional tests for new schema; remove noop tests |
| `test/integration/conditionalExample/` | Remove or rewrite (replaced by new test suite) |
| `test/__snapshots__/conditionalExample/` | Delete snapshots |
| `test/integration/conditionalFilterRevision/` | **NEW** — full integration test suite with dedicated config |

