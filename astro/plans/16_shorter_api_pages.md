# Shorter API pages

## Prompt

Each API docs page is quite long. Right now, each second level in the side nav shares one page: all entries show up on the same page, and the side nav is just linking to various headings on that same page. Instead, give each entry its own page, so `http://localhost:4321/api/latest/action-connection/#get-an-existing-action-connection` would become `http://localhost:4321/api/latest/action-connection/get-an-existing-action-connection`, and so on.

To verify that nothing else has changed, use the 12 audit categories described in the README to generate some HTML snapshots that you can use for comparison. For example, use the relevant section of a HTML snapshot of `http://localhost:4321/api/latest/action-connection/#get-an-existing-action-connection` to verify that the new shorter page, `http://localhost:4321/api/latest/action-connection/get-an-existing-action-connection`, contains the same HTML content where expected.

In its current design, our data loaders / view helpers for the API spec seem to load and process a lot of data at once. Now that we're building shorter pages with less information on them, can we more tightly scope or streamline the data processing too? Is that worth doing? Look into it and make recommendations for that in your plan.

## Claude's plan

### Goal

Split each category's "all-on-one-page" rendering into one page per operation. The URL form `/api/latest/<category>/#<op-slug>` becomes `/api/latest/<category>/<op-slug>/`. The category root URL redirects to the first operation; old anchor URLs continue to work via a tiny client-side hop.

### 1. New per-operation route

Add [src/pages/[...lang]/api/latest/[category]/[operation].astro](astro/src/pages/[...lang]/api/latest/[category]/[operation].astro):

- `getStaticPaths()` walks `getCategoriesView(lang)` for every locale and emits one path per `{ lang, category.slug, operation.slug }`. The operation stubs already carry their slug, so no spec re-walk is needed for path generation.
- At render time it calls a new `getEndpointView(catSlug, opSlug, lang)` (see §3) and a new `highlightEndpoint(endpoint)` — single endpoint, not array.
- The page renders `ApiLayout` with `categories`, `currentSlug=catSlug`, plus a new `currentOperationSlug=opSlug` prop, and a single `<ApiEndpoint data={...} />` (the same component, unchanged).
- Page title becomes `${operation.summary} - ${category.name} - Datadog API`. The `<h1>` becomes the operation summary; the category-level `<h1>` and intro `description` stay on the category landing page (§2).
- Breadcrumbs gain a fourth segment: `Docs > API Reference > <Category> > <Operation>`.

Add a sibling `[operation].md.ts` that emits a single-operation Markdoc-flavoured `.md`, by extracting a per-operation renderer out of `renderCategoryMd`.

### 2. Category landing page

[src/pages/[...lang]/api/latest/[category].astro](astro/src/pages/[...lang]/api/latest/[category].astro) stays as a real landing page (the category description belongs there, not buried in the first operation):

- Renders `<h1>{category.name}</h1>`, the category description, and a TOC list linking to each operation (`<a href="<op-slug>/">` with the operation summary, possibly with method badge).
- No longer calls `getEndpointsView` or `highlightEndpoints` — only the cheap `getCategoryViewBySlug`. The per-page work shrinks to nearly nothing.
- Includes a small inline `<script>` that runs on load: if `location.hash` is non-empty and matches a known operation slug for this category, replace the location with `/api/latest/<cat>/<hash-without-#>/`. The op slug list is inlined as a small JSON array. This is the **backward-compat hop**: Hugo-era links like `/api/latest/<cat>/#<op-slug>` continue to land on the new per-operation page (browsers don't send the hash to the server, so this must be client-side).
- Empty deprecated categories (`screenboards`): the same template handles them — `<h1>`, description, deprecated alert from the new `ApiStatusAlert`, and no operations list when `category.operations` is empty. Behavior identical to today.

The category-level `.md` route is removed (operation-level `.md` replaces it). `llms.txt` updates to enumerate operation pages instead of categories — one bullet per operation, grouped under their category heading. Format:

```
## <Category Name>
- [<Operation Summary>](<site>/api/latest/<cat>/<op>.md)
```

### 3. Data layer streamlining (recommendation: yes, do it)

The current `getEndpointsView(slug, lang)` builds *every* endpoint in a category, caches the array, and is consumed by both the HTML and `.md` route. With one operation per page, that's wasted work — a category's HTML page now only needs one of N operations, but builds and caches all N. Recommended changes to [src/data/api/views.ts](astro/src/data/api/views.ts):

- **Add `getEndpointView(catSlug, opSlug, lang): EndpointData | undefined`.** Refactor the per-operation body of `buildEndpoints` (the `matches.map((op) => { ... })` block) into `buildEndpoint(op, lang)` and call it from the new helper. Cache key: `${lang}:${catSlug}:${opSlug}`. The `RawOperation` lookup uses `getAllOperations()` filtered by both slugs, which is already memoised.
- **Keep `getEndpointsView(slug, lang)`** for the category-empty fallback case and any future "all-in-one" view, but stop calling it from the new per-operation route. With it removed from the hot path, the per-category `EndpointData[]` cache stops growing.
- **Add `highlightEndpoint(ep)`** as a single-endpoint variant of `highlightEndpoints`. Trivial — wraps the existing per-endpoint loop body.
- **Net effect on a build**: each page does the schema/curl/examples work and Shiki passes for one operation only, instead of the whole category. Per-page peak memory drops roughly N-fold for medium/large categories (`incidents` has 56 ops, `usage-metering` 49, etc.). Overall build memory should also fall — module-scoped caches now hold one `EndpointData` per route built, not the full category bundle for every category whose pages were rendered.

I considered also dropping the per-operation cache (each page is rendered once, so no reuse), but the `.md` route renders the same operation a second time, so a small cache still pays off.

Not recommended right now: lazier resolution inside `paramsToFields` / `extractResponses` etc. Those are already pure per-operation work; the win is in not running them N-1 extra times, which §3 already gets us.

### 4. Side nav update

[ApiSideNav.astro](astro/src/components/ApiSideNav/ApiSideNav.astro):

- Add `currentOperationSlug?: string` prop.
- Each operation `<a>` href changes from `${categoryHref}#${op.slug}` to `${categoryHref}${op.slug}/`.
- Add `api-side-nav__operation--active` BEM modifier when `op.slug === currentOperationSlug`. Style it with the existing active-link tokens.
- Active category logic unchanged (still keyed off `currentSlug`), so the parent category remains visually expanded/active when on an operation page.

[ApiLayout.astro](astro/src/layouts/ApiLayout.astro) gains a passthrough `currentOperationSlug` prop and forwards it to `ApiSideNav`.

### 5. Audit / verification

Per the README's 12-page audit set, plus the per-endpoint checklist, build the new site and snapshot HTML for each *category landing page* and each *first operation* of the 12 categories. For each of the 12, automate this with a small node script that:

1. For each category in the audit set, fetch the legacy single-page HTML (`/api/latest/<cat>/`) from the production-build dist before this change is applied. Save to `astro/tmp/audit/before/<cat>.html`.
2. For each operation in that category, fetch the new per-operation HTML (`/api/latest/<cat>/<op>/`) from the production build after the change. Save to `astro/tmp/audit/after/<cat>/<op>.html`.
3. For each `<op>`, extract the legacy section bounded by `<h2 id="<op-slug>">` through the next sibling `<h2>` from the "before" file, and compare to the operation-section subtree in the "after" file. Differences expected (and OK): `<h1>` instead of `<h2>` for the operation title, page-level layout (breadcrumbs, title tag), absent sibling operations. Differences NOT expected: any change inside the rendered endpoint body — params tables, request body, responses, code examples, alerts.

I'll commit only the diff summary to the PR description, not the dumps. The audit script lives under `astro/scripts/` and is not part of the production build.

### 6. Tests

- **Vitest**: add a test for the new `getEndpointView` (returns the right operation; returns `undefined` for unknown ops). Add a side-nav render test that asserts the new active-operation BEM class. Update existing side-nav and category-page tests for the URL-shape change.
- **Playwright**: update navigation specs that click side-nav operation links — they now navigate to a new page rather than scroll. Add one spec that visits an old-style anchor URL (`/api/latest/action-connection/#get-an-existing-action-connection`) and asserts the browser ends up at `/api/latest/action-connection/get-an-existing-action-connection/` (covers the backward-compat hop). Refresh screenshot baselines for any category landing page (now a stub) and capture new baselines per operation page where reasonable — keep this scoped, don't snapshot all ~120×N operations.

### 7. Open follow-ups (not in scope)

- Whether to keep a "view full category as one page" download/print mode. If we want it later, the retained `getEndpointsView` + a thin route can serve it.
- Search index — `SearchBar` likely needs to be rebuilt against per-operation pages so results deep-link correctly. Flagging only; the current search is mocked.

### Order of work

1. Refactor `views.ts` (§3): extract `buildEndpoint`, add `getEndpointView`, add `highlightEndpoint`. No route changes yet, all existing tests still pass.
2. Add the new `[category]/[operation].astro` + `.md.ts` routes.
3. Update `ApiSideNav` + `ApiLayout` props and tests.
4. Convert the existing `[category].astro` to the redirect stub (with empty-category fallback).
5. Remove the category-level `.md` route; update `llms.txt` + `renderLlmsTxt` to enumerate operations.
6. Run the audit script on the 12 categories, fix any unexpected diffs.
7. Update Playwright + Vitest suites; capture snapshots.