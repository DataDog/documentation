# Author console e2e testing

## Prompt

When the local docs build is running, the Cdocs author console is available at `http://localhost:1313/cdocs/console/`. No Playwright tests currently exist for the console, so we should add them.

The code for the console, including recently added features, can be found at this path: `~/dd/corp-node-packages/packages/cdocs-author-console`.

Add e2e tests for each of the tabs in the console, verifying that the build has no errors and that the configuration building/lookup features work as expected. In the tests, when you need to refer to an existing option group, use one of the groups set up specifically for e2e testing, since other option groups can change. It's okay to use any traits and options available, as those usually persist.

In the Page Wizard, test both the use of existing config, and the creation of fully new config. You can draw from `~/dd/corp-node-packages/packages/cdocs-author-console/test/twoNewFilters.test.ts` to derive test inputs for the author console UI.

Take snapshots of each other console tab at load, and after the task has been completed where relevant (for example, after a Quick Lookup has been completed in the UI). In cases when the snapshot would be quite large, as is the case with the Page Wizard, snapshot areas of the page separately. For example, the form has distinct input areas, and the resulting instructions also have distinct sections that can be snapshotted.

## Claude's plan

### Context

The Cdocs author console is a standalone React SPA (Vite build, MUI components) served by Hugo as a static asset from [static/cdocs/console/index.html](static/cdocs/console/index.html). On page load it fetches [static/cdocs/console/data.json](static/cdocs/console/data.json) — which `make build-cdocs` regenerates — and renders three tabs:

1. **Build errors** — success alert, or `ErrorsReport` grouped by file path.
2. **Quick filter** — pair an *existing* trait + *existing* option group; renders generated frontmatter and example `if` blocks. Source: [QuickFilterBuilder.tsx](../../../../dd/corp-node-packages/packages/cdocs-author-console/src/components/QuickFilterBuilder.tsx).
3. **Page wizard** — build one or more filters using a mix of existing and brand-new traits/option groups/options, then render `SetupInstructions` (YAML config blocks + mdoc markup template). Source: [PageWizard.tsx](../../../../dd/corp-node-packages/packages/cdocs-author-console/src/components/PageWizard.tsx).

The tab is reflected in the URL as `?tab=build-errors|quick-filter|page-wizard`, so tests can deep-link instead of clicking.

Fixture option groups that were created specifically for e2e testing (won't churn) live in [customization_config/en/option_groups/dd_e2e_testing.yaml](customization_config/en/option_groups/dd_e2e_testing.yaml):

```
dd_e2e_mobile_prog_lang_options, dd_e2e_backend_prog_lang_options,
dd_e2e_database_options, dd_e2e_postgres_host_options, dd_e2e_mysql_host_options,
dd_e2e_mongo_db_host_options, dd_e2e_platform_options,
dd_e2e_ios_prog_lang_options, dd_e2e_android_prog_lang_options
```

Traits are not e2e-owned; per the prompt we can use any available trait (e.g. `prog_lang`, `database`, `platform`), since `data.json` is populated from the full [customization_config/en/traits/](customization_config/en/traits/) tree and these are stable.

### Key obstacles to plan around

1. **The last-build timestamp is dynamic.** `App.tsx` renders `<ReactTimeAgo date={consoleData.timestamp} />` in the h1 and colors it red after 5 minutes. Direct snapshots drift every run.
2. **Production `data.json` has no errors.** We can't assert on the error state without mocking.
3. **`data.json` contents change** when `make build-cdocs` runs, so autocomplete dropdown contents for traits/options also drift.
4. **MUI Autocomplete** doesn't expose options until you click (or focus + ArrowDown). Searching by typing is the most reliable interaction.

Solution for (1)–(2): intercept `data.json` with `page.route()` in `beforeEach` and **patch the live response** rather than replace it. Fetch the real JSON (`await route.fetch()`), then:

- Overwrite `timestamp` with a fixed value (pins the `ReactTimeAgo` output).
- For the error-state test only, splice a couple of sample entries into `errorsByFilePath`.

Leave `customizationConfig` untouched. This means the config drifts with the live build — that's fine for tests written against `dd_e2e_*` option groups (stable by design) and against traits like `prog_lang` / `database` / `platform` (long-lived). If one of those is ever renamed, the test fails loudly and we update the single constant at the top of the spec — cheaper than maintaining a frozen blob.

The patch helper lives in `e2e/author-console/helpers.ts`; the only checked-in fixture is a tiny `errors-overlay.json` containing just the `errorsByFilePath` object to splice in.

### Layout

New directory (mirrors existing `e2e/components/*/` and `e2e/integration/*/` layout):

```
e2e/author-console/
  cdocs-author-console.spec.ts
  cdocs-author-console.spec.ts-snapshots/
  fixtures/
    errors-overlay.json        // just the errorsByFilePath blob to splice in
  helpers.ts                   // Autocomplete + route patch helpers
```

`e2e/author-console/helpers.ts` holds console-specific helpers; [e2e/helpers.ts](e2e/helpers.ts) is for Hugo-rendered cdoc pages (pills, toggleables) and doesn't belong here.

### Fixtures

- **`errors-overlay.json`**: just an `errorsByFilePath` object with two sample paths, each mapped to a `CdocsCoreError[]`. Inspect `node_modules/cdocs-data/dist/...` (or `cdocs-data`'s published types) for the required shape before writing — don't guess fields. This is the only hand-maintained JSON.

### Helpers to write

`e2e/author-console/helpers.ts`:

- `patchConsoleData(page, { timestamp, errorsByFilePath? })` — registers `page.route('**/data.json', async route => { const r = await route.fetch(); const json = await r.json(); json.timestamp = timestamp; if (errorsByFilePath) json.errorsByFilePath = errorsByFilePath; await route.fulfill({ response: r, json }); })`. Leaves `customizationConfig` as-is so the live build feeds the app.
- `freezeClock(page, iso)` — `await page.addInitScript` overriding `Date.now` and `new Date()` to return a fixed time. Required so `ReactTimeAgo` renders a deterministic string ("1 minute ago") regardless of wall-clock drift between the patched timestamp and the test run.
- `selectAutocomplete(page, locator, optionLabelSubstring)` — clicks the input, types the substring, waits for `role=listbox`, clicks the matching `role=option`. Covers `StrictTraitSelector`, `StrictOptionGroupSelector`, `FlexibleTraitSelector`, `FlexibleOptionGroupSelector`.
- `openAccordion(page, summaryText)` / `clickAccordionButton(page, summaryText, buttonText)` — thin wrappers that find the accordion by its summary text (e.g. `"Add a new trait"`) and click inside it. MUI wraps accordions in a way that `getByRole` alone is awkward.
- `screenshotSection(page, locator, name, opts?)` — wraps `expect(locator).toHaveScreenshot(name, opts)` with a default `mask: [page.locator('#title span')]` so the last-build line is never part of the image even if a test forgets `freezeClock`.

### Tests

Pattern-match on [e2e/components/tabs/cdocs-tabs.spec.ts](e2e/components/tabs/cdocs-tabs.spec.ts): snapshot + targeted assertions, one behavior per test.

**Shared setup** (`test.beforeEach`):

```ts
await freezeClock(page, '2026-04-20T12:00:00Z');
await patchConsoleData(page, { timestamp: Date.parse('2026-04-20T11:59:30Z') });
await page.goto('/cdocs/console/');
await page.waitForSelector('h1#title');
```

The error-state test re-registers the route before `page.goto` with `patchConsoleData(page, { timestamp: ..., errorsByFilePath: require('./fixtures/errors-overlay.json') })`.

#### Build errors tab

1. **No-errors state snapshot** (default fixture) — navigate to `?tab=build-errors`, snapshot `main` (or the tab panel). Assert the success alert text `The latest cdocs build has no errors.` is visible.
2. **Errors state snapshot** — override with `data-with-errors.json`, navigate, snapshot. Assert:
   - The error alert title `The latest cdocs build has errors.` is visible.
   - `h2` "Compilation errors" is visible.
   - For each fixture file path, a `Paper` contains an `<h3>` with the filename, a "copy full path" link, and an "open file in VS Code" link with `href` starting `vscode://file/`.
   - The errors table renders one row per `CdocsCoreError`.

#### Quick filter tab

3. **Initial snapshot** — navigate to `?tab=quick-filter`, snapshot the tab panel. Assert no `<h2>Generated markup</h2>` yet.
4. **Trait-only selection does not generate markup** — pick a trait (e.g. `database`). Assert the form still shows no "Generated markup" heading.
5. **Full lookup generates markup** — pick trait `database`, then option group `dd_e2e_database_options`. Assert:
   - `<h2>Generated markup</h2>` appears.
   - The frontmatter `<code>` block contains `trait_id: database` and `option_group_id: dd_e2e_database_options`.
   - The `if` blocks `<code>` block contains `eq($database, "postgres")` (first option + default) and `eq($database, "mysql")`.
6. **Post-lookup snapshot** — snapshot the full tab panel after step 5 completes, to cover both the generated YAML and the example `if` blocks.

#### Page wizard tab — existing config path

7. **Initial snapshot** — navigate to `?tab=page-wizard`, snapshot the tab panel. Assert the intro copy and that only an "Add filter" button is visible.
8. **Add filter using existing trait + existing option group**:
   - Click "Add filter".
   - In `FlexibleTraitSelector`, select existing trait `prog_lang` via the top Autocomplete (do not open the "Add a new trait" accordion).
   - In `FlexibleOptionGroupSelector`, select `dd_e2e_backend_prog_lang_options`.
   - Click "Save".
   - Assert the filter row summary reads something like `Programming Language: JavaScript, Python, Ruby, Go, Java`.
   - Assert `<h1>Setup instructions</h1>` renders.
   - Because no new config is required, assert `<h2>Add the required YAML configuration to the docs site</h2>` is **absent** (YamlConfigInstructions returns null).
   - Snapshot **the "Filters" area** and **the "Create the page" mdoc template** as separate images (one per logical section, to keep diffs small).

#### Page wizard tab — all-new config path (mirrors `twoNewFilters.test.ts`)

9. **Build a brand-new filter: `favorite_monster_movie`**.
   - Click "Add filter".
   - Open the "Add a new trait" accordion. Fill ID=`favorite_monster_movie`, label=`Favorite monster movie`, type=`Text`, notes blank. Click "Save".
   - Open the "Add a new option group" accordion. Fill ID=`favorite_monster_movie_options`.
   - Open the inner "Add a new option" accordion. Create `jaws` / `Jaws`, save. Then `godzilla` / `Godzilla`, save.
   - The autocomplete multi-select should now show both options; click outside to dismiss, then click the outer "Save" on the option group accordion.
   - Click the filter-level "Save".
10. **Build a second brand-new filter: `favorite_movie_candy`** (`twizzlers` default + `skittles`).
11. **Assertions after both filters are saved**:
    - Two filter rows are listed, with summaries in order.
    - `<h1>Setup instructions</h1>` renders.
    - `YamlConfigInstructions` renders three sub-sections: **Add new traits** (yaml contains `favorite_monster_movie:` and `favorite_movie_candy:`), **Add new options** (contains `jaws:`, `godzilla:`, `twizzlers:`, `skittles:`), **Add new option groups** (contains both `_options` keys, with `default: true` on the first option of each).
    - The mdoc template (`CdocMarkupTemplate`) contains both `trait_id: favorite_monster_movie` and `trait_id: favorite_movie_candy`.
12. **Section snapshots (per prompt guidance — avoid one huge image)**:
    - Form input area (Filters + any open filter builder) — taken mid-way through step 9 while the accordions are open, to exercise the form layout.
    - Filters list after both filters saved.
    - YAML config instructions — one snapshot per sub-section (`traits`, `options`, `option groups`) targeted by the `<h3>` and its immediate sibling `<pre>`.
    - Mdoc template section.

#### Cross-tab

13. **URL ↔ tab sync** — click through the three tabs; assert the URL query param updates to `build-errors`, `quick-filter`, `page-wizard` respectively. Directly navigating to `?tab=page-wizard` selects the correct tab on load.

### Locator conventions

- Prefer role-based locators (`getByRole('tab', { name: 'Quick filter' })`, `getByRole('button', { name: 'Add filter' })`) and text-scoped queries (`locator('p', { hasText: 'Filter configuration' })`).
- Do **not** use `.nth()` — the page is dense and ordering shifts as state changes.
- For YAML/generated code, assert on text content (`toContainText`) rather than matching the whole block — the syntax highlighter wraps tokens in spans.

### Running

Assumes the docs site is already running on `localhost:1313` — the user starts it (the `yarn start` build takes a while and is not a CI-style one-shot). The same convention as every existing spec in `e2e/`.

```bash
# First run — generate snapshots
npx playwright test e2e/author-console --update-snapshots

# Normal run
npx playwright test e2e/author-console

# Confirm stability (re-run same spec twice, no diffs)
npx playwright test e2e/author-console
```

### Files to create

- `e2e/author-console/cdocs-author-console.spec.ts`
- `e2e/author-console/helpers.ts`
- `e2e/author-console/fixtures/data-no-errors.json`
- `e2e/author-console/fixtures/data-with-errors.json`
- `e2e/author-console/cdocs-author-console.spec.ts-snapshots/*.png` (generated)

No source files in this repo need to change. No changes to `playwright.config.ts` — `testDir: './e2e'` already picks up the new subdirectory.

### Verification

Ask the user to confirm the site is running on `localhost:1313` before running tests. Then:

1. `npx playwright test e2e/author-console` passes on a clean run.
2. Re-run the same command — all snapshots stable, no flakes.
3. Confirm the error-state test still passes even when the live `data.json` has no errors (proves the route patch is effective).

### Out of scope / follow-ups

- No test for the `data.json` being absent / malformed (the app renders `'No Cdocs build data found.'`). Easy to add later if needed.
- No assertion on the syntax-highlighter styling of the YAML / text blocks — we only check text content.
- No test for the "copy to clipboard" behavior (clicking a `Code` block or `copy full path` link). Requires a clipboard permissions workaround in Playwright and isn't what the prompt asks for.
- If the console grows a keyboard-nav story, add tests modeled on the one in [cdocs-content-filtering.spec.ts](e2e/integration/content-filtering/cdocs-content-filtering.spec.ts).