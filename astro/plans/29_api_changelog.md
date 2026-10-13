# API changelog page

## Prompt

A recent PR ([DataDog/documentation#38300](https://github.com/DataDog/documentation/pull/38300)) added a changelog page to the Hugo API docs. Sync Astro with this change by adding a changelog page to the Astro API docs, built using Astro conventions instead of Hugo conventions.

Follow-up decisions from the user:

- The page doesn't need to look identical to Hugo's. The Astro page will replace the Hugo one; the two will never be live at the same time.
- Pagination and filtering use **prerendered static paths**, not SSR and not client-side JS.

## Research

### What the Hugo PR does

- One page at `/api/changelog/` (`hugo/content/en/api/changelog/_index.md`, layout `hugo/layouts/api/changelog.html`). It's in the API menu at weight `-9`, right after "API overview".
- **Data:** `hugo/data/changelog/<tag-slug>.yml`, one file per API product, written by the client generator. Each file is `entries: [{ change_type, date, link, operations[], title }]`. The `link` field (a docs-repo PR URL) is deliberately **not** rendered.
- **Normalization** (in the template):
  - `added`/`addition` → **Added**
  - `modified`/`changed` → **Modified**
  - `deprecated`/`deprecation` → **Deprecated**
  - `removed`/`breaking` → **Breaking**
  - Anything else keeps its raw bucket with a "modified"-colored pill.
  - A missing `change_type` defaults to `changed`, and a missing title to "API change".
- **Product name:** the API menu entry whose identifier matches the file slug. If none matches, it falls back to `humanize | title`.
- **Rendering:** all entries newest first, grouped by date into a timeline. Each entry shows a type pill, "API product: X", the title, and its operation IDs as `<code>` (not linked).
- **Filters:** single-select tabs for All, Added, Modified and Breaking. There's no Deprecated tab, so deprecated entries only appear under All.
- **Pagination:** 20 entries per page, done in client JS with `?page=N`. An out-of-range page is normalized to page 1.
- **Empty states:** no data at all shows an info alert. A filter with no matches shows "No changes match your filters" with a clear button.

### Current data (2026-10-13)

19 files, 30 entries: 8 added, 21 modified, 1 removed, 0 deprecated. The first entry is dated 2026-10-06, so expect fast growth (roughly 1,500 a year at the current rate).

I checked the live data against the live spec:

- **Every operation ID exists** in the v1 or v2 spec.
- **Every file slug except `ai-impact` matches a category slug** (`toCategorySlug` of a spec tag). The page must handle a product with no category page.

### Astro conventions that apply

- **Routes:** API pages live in `src/pages/[...lang]/api/...`. Each one sets `prerender = true` and has `getStaticPaths` over `LOCALES`. `staticApiGuard` enforces prerendering on every `/api` route and checks that output stays under `api/`/`{lang}/api/`. `/api/changelog/` meets both.
- **Route priority:** `[...lang]/api/[...legacyPath].astro` only emits `LEGACY_REDIRECTS` paths, which don't include `changelog`. A literal `changelog` segment outranks the rest param anyway.
- **Plaintext twins:** "Every API page has a `.md` twin, including translated ones" (`ApiLayout.astro`), and the copy-page button points at it. So the changelog needs `/api/changelog.md`.
- **Data loading:**
  - Hugo data is read through the `@hugo-site` alias (`specParser.ts` uses `?raw` + `yaml`).
  - A directory of files read with `import.meta.glob` can't be redirected to a fixture by `frozenApiSpecPlugin`, because the glob resolves its alias first. `@api-examples` solves this with its own alias, which `vitest.unit.config.ts` overrides. The changelog keeps reading through `@hugo-site`, so it gets a narrower alias override in the unit config instead (see Design §1).
- **Category data:**
  - `getCategoryStubsView(lang)` gives localized `{ name, slug }`.
  - `getCategoriesView(lang)` gives each category's operations with their `operationId` and `slug`. That's enough to link operation IDs to their operation pages.
  - Both are memoized.
- **Nav:** `ApiSideNav.astro` and `MobileNavApiList.astro` each render an Overview group followed by the categories. `ApiLayout` resolves overview state from the unprefixed path.
- **View transitions:**
  - API pages already use cross-document view transitions (`@view-transition { navigation: auto; }` in `src/styles/global.css`).
  - The header, banner and side nav have their own `view-transition-name`, and every group has `animation: none`. Moving between two static changelog pages swaps only the content, with no flash and no JS.
- **No interactivity needed:** with static paths, filter tabs and page numbers are plain links. Everything is vanilla Astro, and there's no Preact island.
- **Tokens:** `src/styles/tokens/colors.css` has a purple but no clear success/warning/danger trio. (`--color-warning` is a red, `#eb364b`.) The body is Light 200, so every component must set an explicit `font-weight`.

### Out of scope

- Date-based API versioning (Hugo explicitly doesn't do this either).
- Any changelog content on operation or category pages.
- Hugo-side changes. When the Hugo `/api` cutover happens, Hugo's changelog files (content, layout, menu entry, SCSS, JS) will need removing. None of them are on CLAUDE.md's list of allowed Hugo edits, so **ask first** at that step.

## Design

### URLs

Only one filter dimension (change type), single select. Each entry belongs to exactly one bucket, so the page count is about `2 × ceil(N / 20)` per locale.

| URL | Contents |
| --- | --- |
| `/api/changelog/` | All, page 1 (canonical landing page) |
| `/api/changelog/2/` | All, page 2 |
| `/api/changelog/added/` | Added, page 1 |
| `/api/changelog/added/2/` | Added, page 2 |
| `/api/changelog/modified/`, `/breaking/` | same pattern |

- **Page 1 of every filter is always emitted**, even when it's empty, so filter tabs never 404. It shows the empty state.
- **Pages past the end don't exist** and 404 like any other static path. That replaces Hugo's "normalize to page 1" behavior.
- **Filter tabs:** All, Added, Modified, Breaking, the same set as Hugo. Deprecated entries appear under All only. See Open questions.
- **Locales:** every page is emitted for every entry in `LOCALES`, like the other API pages. Entry titles stay English (they're English in the data). Product names come from the localized category stubs.

### 1. Data layer: `src/lib/api/changelog.ts`

- **Source path:** read through the existing `@hugo-site` alias, with no new alias. Every `@hugo-site` import marks something to fix when Hugo is removed, and the changelog should show up when someone searches for them. Add a `TODO` next to the glob saying the data moves with the Hugo deprecation.
- **Fixture redirect:**
  - In `vitest.unit.config.ts`, add an alias override for the more specific `@hugo-site/data/changelog` → `tests/fixtures/api/changelog`, next to the `@api-examples` override.
  - Vite's `mergeConfig` puts the override's aliases ahead of the base config's. So the specific key should match before `@hugo-site` does, and `import.meta.glob` resolves aliases from the same list.
  - Prove this with the step 1 red test (the fixture's data comes back, not the live data). If it doesn't hold, stop and ask before adding a dedicated alias.
  - Add a comment explaining why a glob needs an alias override rather than `frozenApiSpecPlugin`.
- **Raw load:** `import.meta.glob("@hugo-site/data/changelog/*.yml", { query: "?raw", import: "default", eager: true })`, parsed with `yaml`, then validated with a zod schema in `src/lib/api/schemas/changelog.ts`.
  - The schema is lenient where Hugo was: `change_type`, `title` and `operations` are optional, `link` is accepted and ignored, and `date` is a required `YYYY-MM-DD` string.
  - A malformed file throws, naming the file. That's a generator bug, and we want it loud.
- **Pure functions** (exported so tests can call them, with no Astro imports):
  - `toChangelogBucket(rawType)` maps to `"added" | "modified" | "deprecated" | "breaking"`.
    - It uses Hugo's synonyms, case-insensitive. Missing → `modified`.
    - An unknown type → `modified`. Hugo kept the raw bucket, but no tab ever showed it, so it was only ever visible under All. Mapping it to `modified` keeps it visible and filterable.
  - `normalizeChangelog(rawFilesBySlug)` → `ChangelogEntry[]` (`{ productSlug, date, bucket, title, operationIds }`).
    - Sorted by date (desc), then product slug, then title. Hugo's order within a date wasn't deterministic, and ours needs to be for snapshots.
  - `resolveChangelogEntries(entries, categoriesView, lang)` → `ResolvedChangelogEntry[]`. It adds:
    - `product: { name, href? }`. The name and href come from the category with a matching slug. Otherwise the name is a title-cased slug (`ai-impact` → "Ai Impact", like Hugo) and there's no href.
    - `operations: { operationId, href? }[]`, from an `operationId` → operation-page map built across all categories.
    - Unknown IDs render unlinked, as Hugo did. Linking known ones is the "Astro conventions" improvement.
    - If an operation ID shows up in more than one category, link the first one and add a test that pins this.
  - `buildChangelogPages(entries, pageSize = 20)` → `ChangelogPage[]`. Each item is `{ filter, pageNumber, totalPages, entries, pathParam }`, with `pathParam` being `undefined`, `"2"`, `"added"`, `"added/2"`, and so on. Both the route's `getStaticPaths` and the tests use it.
  - `changelogHref(lang, filter, pageNumber)` builds a localized href with `localizedHref`. Filter tabs, pagination and the nav all use it.
  - `groupByDate(entries)` → `{ date, entries }[]`, for the timeline.
- **Memoized entry point:** `getChangelogView(lang)` normalizes once (it's locale-independent) and resolves per locale, the same way `viewsBuilder` memoizes.

### 2. Routes

- **`src/pages/[...lang]/api/changelog/[...path].astro`**
  - `prerender = true`. `getStaticPaths` loops over `LOCALES × buildChangelogPages(...)` and passes the `ChangelogPage` as props.
  - Renders `ApiLayout` with categories from `getCategoryStubsView(lang)`, `breadcrumbs = apiBreadcrumbs(lang, "Changelog")` and `contentPath` pointing at the Hugo source (for the OG image, matching the other overview pages).
  - **Title:** "Changelog - Datadog API". Filtered pages and later pages add a qualifier, for example "Breaking changes, page 2 - Datadog API".
  - **Description:** from Hugo's frontmatter: "Review recent additions, modifications, and removals to Datadog API operations."
  - **Unknown paths:** if `getStaticPaths` didn't produce the path, return 404 (needed for dev mode).
- **`src/pages/[...lang]/api/changelog.md.ts`:** the plaintext twin.
  - `prerender = true`, emitted for every locale.
  - Renders the **whole, unpaginated** changelog as markdown, grouped by date, using `renderChangelogMarkdown(resolvedEntries)` (a pure function in `changelog.ts`). Each entry includes its type, product (linked when it has a page), title and operations (linked when known). Build the page with the `buildPlaintextPage` helpers.
  - Every paginated or filtered HTML page points its copy button at this one `.md`. Check how `rewriteInternalDocLink` maps `/api/changelog/added/2/`; it probably needs an explicit override passed into `ApiLayout`.

### 3. Components (vanilla Astro, CSS modules, full BEM)

All in `src/components/ApiChangelog/` except `Pagination`, which is generic:

- **`ApiChangelog.astro`:** the page body (intro paragraph, filter bar, timeline or empty state, pagination). The route stays a thin driver.
- **`ApiChangelogFilterBar.astro`:** a `<nav aria-label="Filter by change type">` of links, styled as a segmented control.
  - The active one gets `api-changelog-filter-bar__tab--active` and `aria-current="page"`.
  - Give the bar its own `view-transition-name` (`api-changelog-filter-bar`) and add it to the `animation: none` group list in `global.css`, so it stays put while the timeline swaps.
- **`ApiChangelogTimeline.astro`:** renders `groupByDate(entries)` as `<section>`s with a `<time>` heading and the dot-and-line timeline.
  - The line on the last section ends at its dot, using `:last-child`. Hugo needed `:has(~ :not(.d-none))` only because it hid sections in the browser.
  - The `id="changelog-timeline"` goes here.
- **`ApiChangelogEntry.astro`:** a type pill (`api-changelog-entry__pill--{bucket}`), the product (linked when it has an href), the title as `<h3>`, and the operations as `<code>`, linked when they have an href.
- **`ApiChangelogEmptyState.astro`:** two cases:
  - No entries at all (no files): "No API changes have been published yet."
  - A filter with no matches: "No {type} changes yet", plus a link back to All.
- **`src/components/Pagination/Pagination.astro`:** generic, so future paginated pages can reuse it.
  - Props: `currentPage`, `totalPages`, `hrefForPage(n) => string`, plus labels.
  - Renders nothing when `totalPages <= 1`.
  - Prev/Next links are `<a>`s with `rel="prev"`/`rel="next"`. At either end they become a non-link `<span aria-disabled="true">`.
  - The current page is a `<span aria-current="page">`. With many pages, show 1 … n-1 n n+1 … last, so it doesn't render hundreds of links.
  - Changelog pagination hrefs end in `#changelog-timeline`. Filter-tab hrefs don't, because the filter bar is already near the top.
- **Labels:**
  - English strings without a Hugo i18n key are hardcoded with a `TODO` comment: Changelog, the intro, the type names, the empty states, Prev/Next, "API product", "Operations".
  - Reuse `translate("all")` and `translate("overview")`, which exist in `shared/i18n/en.json`.
  - Don't add keys to the i18n bundle.
- **Tokens:**
  - The pills need success/attention/danger/neutral backgrounds. Add generic status tokens to `colors.css` (for example `--color-status-success-bg`), following its naming. Don't name them after the changelog.
  - Fixed widths (Hugo's 96px date column) go through layout or spacing tokens where one fits.
  - Every text element sets an explicit `font-weight`.
- **Layout:** the date column sits next to the entries on desktop. On narrow screens it stacks above each section's entries (Hugo kept a narrow grid). The pill sits above the title, so the page doesn't scroll sideways at 320px.

### 4. Nav

- **New top-level link:** "Changelog", between Overview and the first category, in both `ApiSideNav.astro` and `MobileNavApiList.astro`. It has no children.
- **Active state:**
  - `ApiLayout` computes `isChangelogSection` with an `isChangelogPath(unprefixedPath)` helper (next to `resolveOverviewState`) and passes it to `ApiSideNav`.
  - Look at how `MobileNav.astro` gets the overview state today, and pass the same flag the same way.
  - When it's active, the link gets the existing `--active` modifier and `aria-current="page"`.
- **Mobile nav JSON:** `mobile-nav.json` / `MobileNavApiListLoader` don't change; the changelog link is rendered on the server.

### 5. Build plumbing

- **`staticApiGuard`:** add `/api/changelog/` and `/api/changelog.md` to `API_PROBE_PATHS`, so a catch-all can't silently shadow them.
- **Sitemap:** only `/api/changelog/` (and its locale versions) is listed. In `isSitemapPage`, exclude filtered pages and pages 2 and up, because they're thin duplicates of the landing page. Each page keeps a self-referencing canonical.
- **`pages.json` / `llms.txt`:** add `/api/changelog.md` to `apiPageSource` (title "Changelog", breadcrumbs `API_CRUMBS`). Then check whether `llms.txt` picks it up from the same source, or needs its own one-line entry.
- **`scripts/verifyDist.mjs`:** check that the new files pass its shape checks. Add a check that `api/changelog/index.html` and `api/changelog.md` exist, so the page can't quietly disappear.
- **Dev routing:** the root `Caddyfile` already sends `/api/*` to Astro, so nothing changes.

## Implementation steps (red to green)

Write each test first and confirm it fails before implementing. While developing, run only the relevant tests: `yarn test:headless-ai <path>` or `yarn test:browser-ai <file>`. After each step, run `npx prettier --write <touched files>` from `astro/`.

> **Compaction point 0:** before starting. Everything from the research is in this plan, so the investigation doesn't need to stay in context. **Stop here and ask the user to compact.**

1. **Fixture and alias.**
   - Add `tests/fixtures/api/changelog/` with 3–4 small, hand-trimmed YAML files, each starting with a one-line provenance banner. Together they need:
     - a product whose slug is a category in `tests/fixtures/api/` (check which ones the partial spec includes)
     - the `ai-impact` file, for the no-category fallback
     - a `removed` entry
     - two entries on the same date in different products
     - one operation ID that isn't in the fixture spec
   - Add the `@hugo-site/data/changelog` fixture override to `vitest.unit.config.ts`. Red test: a minimal glob read returns the fixture's file slugs, not the live ones.
2. **`changelog.ts` pure functions,** each tested in `src/lib/api/changelog.test.ts`:
   - `toChangelogBucket`: every synonym, case-insensitivity, missing and unknown types.
   - `normalizeChangelog`: sort order including ties, default title, malformed YAML throwing with the filename.
   - `resolveChangelogEntries` against the fixture spec:
     - a known product is localized for `ja`
     - an unknown product falls back to a title-cased name with no href
     - known operations link to `/api/latest/{category}/{operation}/`, with the `/ja/` prefix for `ja`
     - unknown operations aren't linked
   - `buildChangelogPages` with synthetic arrays:
     - 0 entries
     - exactly 20
     - 21
     - 45, split across buckets
     - an empty bucket still emits page 1
     - the `pathParam` values
   - `changelogHref` and `groupByDate`.
   - `getChangelogView` returns the fixture's data.
3. **Live-data integration test** (`tests/integration/`, against the real `hugo/data/changelog`): every file parses and validates, and there's at least one entry. Unknown products and operations are allowed by design, so don't assert on them.

> **Compaction point 1:** the data layer is complete and unit-tested. No routes or components use it yet. **Stop here and ask the user to compact.**

4. **`renderChangelogMarkdown`** and the **`.md` twin route.** Unit test the markdown (grouping, links, unlinked fallbacks) against a snapshot. Then add `changelog.md.ts`.
5. **`Pagination.astro`.** Unit tests, following the pattern in existing component unit tests (see `ApiSideNav/tests/unit.test.ts`):
   - it renders nothing for 1 page
   - Prev is disabled on page 1, Next on the last page
   - `aria-current` and `rel` attributes
   - ellipsis windowing at 30 pages
   - hrefs come from `hrefForPage`
6. **ApiChangelog components and the HTML route.** Unit tests:
   - Pills get the right BEM modifier for each bucket.
   - Product and operation links render, and fall back to plain text.
   - Date grouping.
   - The active filter tab has the `--active` class and `aria-current`.
   - Both empty states.
   - The page title and qualifier.
   - The copy button's markdown href points at `/api/changelog.md` from a filtered page 2.
   - Then build the components and `[...path].astro`.

> **Compaction point 2:** the changelog renders at every static path with its `.md` twin, and the unit tests pass. It isn't in the nav yet, and the build plumbing hasn't been touched. **Stop here and ask the user to compact.**

7. **Styling pass.** Add the status tokens, the timeline visuals, the mobile stacking and explicit font weights. Add the filter bar's `view-transition-name` to the `global.css` group list. Check it in `yarn dev` at desktop and 375px widths. Before trusting browser results, kill any stale `astro dev` on :4321.
8. **Nav.** Unit tests in `ApiSideNav/tests/unit.test.ts` and `MobileNav/tests/MobileNav.unit.test.ts`:
   - The Changelog link is present right after Overview, with a localized href.
   - It's active (with `aria-current`) on `/api/changelog/` and `/api/changelog/breaking/2/`, and inactive elsewhere.
   - Overview isn't active on changelog pages.
   - Then add `isChangelogPath` and wire up the props.
9. **Build plumbing.** Unit tests:
   - `isSitemapPage`: the changelog root is included, and filtered pages and pages 2+ are excluded.
   - `apiPageSource`: includes `/api/changelog.md`.
   - Add the probe paths to `staticApiGuard` and the existence checks to `verifyDist.mjs`.
   - Check how `llms.txt` lists the page.

> **Compaction point 3:** the feature is fully wired. Only browser tests and the final regression run are left. **Stop here and ask the user to compact.**

> **Status at compaction point 3 (steps 1–9 done):** 466 related headless tests pass and `tsc` is clean. Nothing is committed.
> - The nav uses `isChangelogPath` and `CHANGELOG_ROOT_PATH` from `overviewPages.ts`. It doesn't import `changelog.ts`, which eagerly globs the YAML.
> - The test container has no i18n manifest and always renders English, so the localized nav href (`/ja/api/changelog/`) is a browser test in step 10.

9b. **Inline code in entry titles (user decision, made after step 9).** Some changelog titles contain markdown backtick spans, for example ``Document the per-device user tag limit on `UpdateDeviceUserTags` ``. Render each span as inline code instead of literal backticks, in both outputs:
    - **HTML:** the `<h3 class="api-changelog-entry__title">` in `ApiChangelogEntry.astro` renders `<code>` for each span and plain text for the rest. Don't use `set:html`; build the parts from a small pure helper, for example `splitInlineCode(title): {text, isCode}[]` in `changelog.ts`, so nothing in the title is treated as HTML.
    - **Markdown:** `renderChangelogMarkdown` emits `new Ast.Node("code", {content})` for each span instead of the raw backticks.
    - **Done.** Test caveat: the exact-string markdown check can't tell code nodes from literal backticks, because both print the same. The markdown test therefore checks the AST for `code` nodes.
    - **Red to green:** unit tests for the helper (no backticks, one span, several spans, an unmatched backtick stays literal), a component test checking for `code` inside `.api-changelog-entry__title`, and an exact-string markdown test. Add a backtick title to a fixture entry if none has one, then update the `13-changelog` HTML and plaintext snapshots with `-u` and review the diff.

10. **Browser tests** (`src/components/ApiChangelog/tests/*.browser.test.ts`), only for what unit tests can't cover:
    - Clicking a filter tab goes to its URL, and the active tab updates (check the stable BEM class).
    - Clicking Next goes to `/api/changelog/2/#changelog-timeline` and the timeline is in view. Skip this if the live data has 20 entries or fewer; there's no fixture redirect for browser tests.
    - The filter bar's computed `view-transition-name` is `api-changelog-filter-bar`.
    - At 375px, the page has no horizontal scroll.
    - The side nav's Changelog link is active on the page.
    - On `/ja/api/changelog/`, the side nav's and the mobile nav's Changelog links point at `/ja/api/changelog/`. The unit-test container can't check this.
11. **Full regression run:** `yarn test-ai`. Fix anything this feature broke, such as snapshot updates in nav tests or a page count in a guard test.
    - **Status (steps 10–11 done):** the browser tests are in `changelog.browser.test.ts`. Both page-listing tests needed to know about `/api/changelog.md`. One live-data failure remains (`regionResolver.full-spec`, prodlytics), from upstream spec drift unrelated to this feature.
12. **Hand back.** Recommend that the user run the production build (`yarn build`, which this plan doesn't run). After it, they should confirm that:
    - `staticApiGuard` and `verifyDist.mjs` pass
    - `dist/client/api/changelog/` holds the expected pages for each locale
    - the sitemap lists only the root page

## Open questions (defaults chosen; confirm or override)

- **Deprecated tab:** the default matches Hugo (no tab; deprecated entries appear under All only). Alternative: always show a Deprecated tab, or show one only when there are deprecated entries.
- **Operation links:** the default links known operation IDs to their Astro operation pages, which Hugo didn't do. Alternative: plain `<code>`, as in Hugo.
- **Locales:** the default emits the changelog for all `LOCALES`, with English titles and localized product names. Alternative: English only. That would break the "every API page exists in every locale" rule the language selector and hreflang rely on.
- **Old Hugo `?page=N` links:** these land on page 1 in Astro. The default is to accept that. The other option is a tiny inline script that redirects `?page=N` to `/api/changelog/N/`.
