# Mobile nav: render only the active category, lazy-load the rest

## Prompt

Lighthouse FCP on `/api/latest/action-connection/get-an-existing-action-connection/` was worse than expected. Write a plan for the "middle ground" approach: each page's mobile nav renders only the active category's operations, then pulls a JSON file of all operations on idle and renders additional categories' links as the user expands them.

## Research

### Where the FCP time goes

Lighthouse 12, mobile preset, same build, two runs each:

| Setup | FCP | LCP | DOM elements |
| --- | --- | --- | --- |
| `astro preview` (no compression) | 10.0 s | 13.6 s | 12,047 |
| Same `dist/client` served with gzip | 2.7 s | 4.5 s | 12,047 |
| gzip, mobile nav panel stripped from the HTML | 2.4–2.5 s | 4.2–4.4 s | 6,750 |

- Most of the local 10 s comes from `astro preview` not compressing responses. The HTML is 1.29 MB raw and 102 KB gzipped. Production compression is configured outside this repo, in `DataDog/documentation-ci` and the CDN, and should be confirmed separately.
- Nothing blocks rendering, and the main thread does about 0.7 s of work in total. Unthrottled, FCP is at 80–100 ms. What remains in the throttled FCP is network time (document bytes) plus the 4×-throttled parse, style and layout work on a large DOM.
- **The mobile nav panel is the largest single part of the page:** 584 KB raw (45% of the HTML), 34 KB gzipped, about 5,300 DOM elements. Removing it saves about 0.25 s of FCP and halves the DOM.

### Why the panel is so large

On `/api/` pages, [`MobileNav.astro`](../src/components/MobileNav/MobileNav.astro) renders [`MobileNavApiList.astro`](../src/components/MobileNav/MobileNavApiList.astro) with `getCategoriesView(pageLang)`. That's **all 169 categories with all 1,876 operation links**, on every one of the roughly 2,000 API pages. Only the active category starts open (`open={isActiveCategory}`); the other 168 are collapsed `<details>` the user never sees unless they expand them.

The desktop [`ApiSideNav.astro`](../src/components/ApiSideNav/ApiSideNav.astro) already uses the shape this plan wants. It takes `categories: ApiCategoryStub[]` (no operations) plus `activeCategory?: ApiCategory`, and renders operations only for the active category. That's 178 links and about 26 KB raw.

### Category size distribution

Of 169 categories, the median has **5** operations. The largest have 70, 73, 76, 92 and **176**. Rendering a typical category on the client is negligible. The 176-operation category sets the performance budget (see the CPU-throttled browser test below).

### SEO

The links being removed all already appear in server-rendered HTML:

- Every API page's desktop side nav links every category landing page and the current category's operations. It's hidden with CSS below 992px but is still in the DOM, and crawlers follow those links.
- Every category landing page links all of its operations.

Every operation therefore stays two server-rendered links from any page, and the lazily rendered mobile links don't need to be crawlable. A sitemap is also already emitted (`dist/client/api/sitemap-index.xml`, through `@astrojs/sitemap` filtered by `isSitemapPage`).

### Approaches considered

1. **Current section only, change pages on section tap, with view transitions** (how the desktop side nav works). Rejected for mobile: the page content sits behind the overlay, so every category tap costs a full page load just to change the menu. It would also need the menu re-opened, with its scroll position restored, after each navigation.
2. **Full mobile list as one static HTML fragment, fetched when the menu first opens.** Viable, but opening the menu waits on the fetch. The current page would also have to be marked in the browser rather than on the server.
3. **Middle ground (chosen).** The active category renders on the server, exactly as today. Every other category heading renders with an empty operations list. A JSON file of all operations is fetched at idle, and a category's links are rendered on the client when it's expanded.

## Design

### Overview

```
Page HTML (every API page)
├── Overview section            server-rendered, unchanged (small)
├── Active category             server-rendered: heading + operations + aria-current
└── 168 other categories        server-rendered heading, EMPTY <ul data-category-slug>

After load, on idle (mobile widths only)
└── fetch /{locale}/api/mobile-nav.json  → kept in memory

On expanding a category with an empty list
├── JSON loaded   → render operations into the <ul> before the <details> opens
├── JSON pending  → loading row, render when it arrives
└── JSON failed   → a single link to the category landing page
```

### 1. JSON endpoint

New file `src/pages/[...lang]/api/mobile-nav.json.ts`, `prerender = true`, with `getStaticPaths` over `LOCALES`. It follows the existing `.md.ts` routes and `pages-index.json.ts`. It builds from `getCategoriesView(lang)`, which is memoized, so this adds no rebuild cost.

The file contains only what the mobile links need:

```json
{
  "categories": [
    {
      "slug": "action-connection",
      "href": "/api/latest/action-connection/",
      "operations": [
        { "slug": "get-an-existing-action-connection", "summary": "Get an existing action connection" }
      ]
    }
  ]
}
```

- Each category's `href` is computed on the server with `localizedHref`, so the client never duplicates locale-prefix logic. Each operation's href is `category.href + operation.slug + "/"`, matching `MobileNavApiList` today.
- Put the payload types and a pure `buildMobileNavData(categories, lang)` function in `src/lib/api/mobileNavData.ts`, so both the endpoint and the unit tests use the same builder.
- Expected size is about 100–150 KB raw and about 25 KB gzipped.
- Confirm that `isSitemapPage` excludes it and that `scripts/verifyDist.mjs` accepts the extra file, or update `verifyDist.mjs` to expect it.

### 2. Shared operations list component, written once

New Preact component `MobileNavOperationItems.tsx` that renders the `<li><a>` rows for one category. It has the same classes as today (`mobile-nav__link`, `mobile-nav__link--compact`, `mobile-nav__link--active`, `data-level="1"`, `--depth:1`) and `aria-current` on the active operation. It's used in two places, so the markup lives in one place:

- **On the server:** `MobileNavApiList.astro` renders it **with no `client:` directive** inside the active category's `<ul>`, so it ships as static HTML with no hydration.
- **In the browser:** the lazy-loading island renders it into an empty `<ul>` with Preact's `render()`.

It uses `classListFactory(styles)` with `MobileNav.module.css`, as `MobileNavToggle.tsx` already does, so the hashed and plain classes match what the server renders.

### 3. `MobileNavApiList.astro` changes

- Props change to mirror `ApiSideNav`: `categories: ApiCategoryStub[]` and `activeCategory?: ApiCategory`, replacing `categories: ApiCategory[]` and `activeCategorySlug`. `MobileNav.astro` passes `getCategoryStubsView(pageLang)` and `getCategoryViewBySlug(...)` for the active category, again matching how `ApiLayout` feeds `ApiSideNav`.
- Every category still renders its `<details>`/`<summary>` and caret, so headings, order and the expand UI are unchanged.
- **Active category:** `<ul class="mobile-nav__sublist">` containing `<MobileNavOperationItems>` (rendered on the server, with the current page marked).
- **Other categories:** an empty `<ul class="mobile-nav__sublist" data-category-slug={slug}>`.
- The Overview section and `ScrollActiveIntoView` are unchanged. The active operation is still in the server HTML, so scrolling it into view before first paint still works.

### 4. Lazy-loading island: `MobileNavLazyOperations.tsx`

A small Preact island using the existing hybrid pattern: `client:idle`, with `externalContext` pointing at the API list root. Keeping it separate from `MobileNavToggle` gives it its own isolated scope.

- **Data module** (`mobileNavDataClient.ts`, plain TS so it's testable without a DOM). `loadMobileNavData()` returns a single cached promise for `/{locale}/api/mobile-nav.json` (fetched with `priority: "low"`), so any number of callers share one request. A failed request is cleared from the cache so a later expand can retry.
- **Fetch on idle.** On mount (which `client:idle` already delays until the browser is idle), call `loadMobileNavData()`, but only when `matchMedia` reports a mobile width and `navigator.connection?.saveData` isn't set. At desktop widths the panel is `display: none`, so nothing is fetched.
- **Expand handling.** One delegated `click` listener on the list root, filtered to a `summary` whose sibling `ul[data-category-slug]` is still empty:
  - **Data loaded:** render `MobileNavOperationItems` into the `<ul>` synchronously, inside the click handler, before the browser opens the `<details>`. The section opens already filled, with no empty frame.
  - **Data pending or not requested:** render a loading row in the `<ul>` (`aria-busy="true"`), then render the operations when the data arrives. If several categories are expanded during that time, fill every one of them.
  - **Request failed:** render a single row linking to the category landing page (the category `href` is already on the summary's section, so add `data-category-href` to the `<ul>`).
  - The loading and fallback labels use hardcoded English with `TODO` comments until authoritative i18n keys exist, per CLAUDE.md.
- Signal hydration with `markSelfAsHydrated` so browser tests can wait on it.

### Expected result

The page keeps about 169 category headings plus one category's operations. The headings are about 85 KB raw (about 505 bytes each, mostly the inline caret SVG and duplicated class names), down from 584 KB for the whole panel. That should give close to the "panel stripped" row above: about 0.25 s FCP and roughly 5,000 fewer DOM elements per page.

## Implementation steps (red to green)

Write each test first and confirm it fails before implementing.

Each **Compaction point** below marks a natural place to stop and compact. Each one comes after a self-contained piece of work whose tests pass. The plan file and the code hold everything the next step needs, so little conversation context has to carry over.

> **Compaction point 0:** before starting. This plan holds the research, so the investigation that led to it doesn't need to stay in context.

1. **`buildMobileNavData` and the endpoint.**
   - Unit test against the API fixture: every category is present, in `getCategoriesView` order. Operation counts match. Hrefs are localized: `/api/latest/...` for `en` and `/ja/api/latest/...` for `ja`.
   - Then implement `src/lib/api/mobileNavData.ts` and the route.
2. **`MobileNavOperationItems`.**
   - Unit test: hrefs, BEM classes, `--compact`, and the active operation getting `mobile-nav__link--active` plus `aria-current="page"`.
   - Then implement.

> **Compaction point 1:** the data payload and the shared component exist and are unit-tested. Nothing on any page uses them yet.

3. **Server rendering in `MobileNavApiList`.** Update [`MobileNav.unit.test.ts`](../src/components/MobileNav/tests/MobileNav.unit.test.ts):
   - All category summaries are still present.
   - Operation links appear only inside the active category.
   - Non-active categories have an empty `ul[data-category-slug][data-category-href]`.
   - On the API root and overview pages, no category has operations.
   - The Overview section is unchanged.
   - Then change the props and the markup.

> **Compaction point 2:** the page HTML is now slim. Non-active categories expand empty until steps 4–5 land, so don't ship at this point. Run `active-page.browser.test.ts` before compacting to confirm the server-rendered active category still works.

4. **Data client.**
   - Unit tests with a mocked `fetch`: one request for concurrent callers, a failed request clears the cache, and the URL is localized.
   - Then implement.
5. **Lazy-loading island.** Unit tests (happy-dom):
   - Clicking an empty summary with data loaded fills the list synchronously, inside the click.
   - Clicking with data pending shows the loading row, then the links.
   - Failure shows the fallback link.
   - Clicking the active category or an already-filled category does nothing.
   - At desktop widths and with save-data on, no request is made.
   - Then implement and add the island to `MobileNavApiList` or `MobileNav.astro`.

> **Compaction point 3:** the feature works from start to finish and is unit-tested. Before compacting, check it once by hand in `yarn dev` at a phone width.

6. **Browser tests** (new `lazy-operations.browser.test.ts`, 390px viewport):
   - After the JSON loads, expanding a non-active category shows links with valid hrefs, and following one lands on that operation page.
   - With the JSON delayed through `page.route`, expanding shows the loading row and then the links.
   - With the JSON request aborted, expanding shows the fallback link to the category page.
   - At a 1280px viewport, no request for `mobile-nav.json` is made.
   - **Performance budget:** throttle the CPU 4× through CDP (`Emulation.setCPUThrottlingRate`), find the category with the most operations from the JSON, and assert that expanding it to the last link being rendered takes under about 50 ms. If this proves flaky in CI, keep it as a recorded measurement rather than a hard failure, and say so in the test.
7. **Existing tests.**
   - `active-page.browser.test.ts` should pass unchanged, since the active category is still rendered on the server.
   - `visual.browser.test.ts` uses a category landing page with everything else collapsed, so its snapshot should not change. If it does, inspect the diff before updating the snapshot.
   - `sections.browser.test.ts` covers the docs accordion on non-API pages and is unaffected.
8. Run Prettier on the touched files, `yarn test:headless-ai` and `yarn test:browser-ai` for the touched areas, then the full `yarn test-ai`.

> **Compaction point 4:** all tests pass and the code is formatted. Before compacting, note in this plan any deviations from the design (for example, whether the performance budget test became a measurement only), so the verification step has them.

### Deviations from the design

- **Data URL is computed on the server.** `loadMobileNavData(url)` takes the URL as an argument. `MobileNavApiList` computes it with `mobileNavDataUrl(lang)` (in `mobileNavData.ts`) and passes it to the island as the `dataUrl` prop, so the client never works out the locale itself. The cache is keyed by URL.
- **Click listener uses the capture phase.** It reads `details.open` before the click toggles it, and fills the list before the section opens. happy-dom toggles `<details>` during bubbling, so a bubbling listener saw the state after the toggle.
- **Island placement.** The island is mounted in `MobileNavApiList` (not `MobileNav.astro`), with `externalContext` pointing at `ul#mobile-nav-api-list`. It marks that list root as hydrated (`.mobile-nav__list--api[data-hydrated="true"]`), and the browser tests wait on that.
- **Test helper.** `MobileNav.unit.test.ts` registers the Preact renderer (`addClientRenderer`), because `MobileNavApiList` now contains a Preact island.
- **Sitemap.** `sitemapFilter.ts` excludes `*/api/mobile-nav.json`, so the endpoint doesn't appear as a page in the sitemap.
- **Performance budget kept as a hard assertion.** At 4× CPU throttling, the largest non-active category in the dev server's data (`security-monitoring`, 176 operations) renders in about 9 ms, against the 50 ms budget. The test also records the time as a `render-ms` annotation. If it turns out flaky in CI, make it a measurement only.
- **HTML snapshots updated.** All 15 files in `tests/headless/api-html-snapshots/` lost the inline `client:idle` bootstrap `<script>`. Astro emits it once per page, before the first idle island. That island is now the mobile nav one, which is outside the `<main>` the snapshots capture. Nothing else in the snapshots changed.
- **Visual snapshot unchanged.** `visual.browser.test.ts` passed without an update.

## Verification

1. The user runs `yarn build`. Don't run the production build from the agent.
2. Serve `dist/client` with gzip (a small local static server, not `astro preview`) and run Lighthouse 12 (mobile) on `/api/latest/action-connection/get-an-existing-action-connection/` twice. Compare against the table above: expect FCP of about 2.4–2.5 s and DOM size of about 7,000 elements.
3. Manually check the built page's HTML: one category's operations inline, 168 empty lists, and the JSON present at `/api/mobile-nav.json` and `/{locale}/api/mobile-nav.json`.

## Out of scope / follow-ups

- **Production compression:** confirm the CDN serves HTML, JS and CSS gzip- or brotli-compressed. It's the largest FCP factor, and it's configured outside this repo.
- **Caret SVG:** the inline caret SVG in every heading (169 copies) could become a CSS mask or background, saving a large share of the remaining 85 KB of headings.
- **Repeated class names:** every element carries both the readable and hashed class (490 KB raw sitewide on this page). This barely matters after gzip, so it's skipped.
- **Non-API docs accordion:** `MobileNavSection` / `getDocsNavTree` has the same every-page-renders-everything shape. The same pattern applies, and it matters more as the site grows towards 30K pages, but it's a separate plan.
