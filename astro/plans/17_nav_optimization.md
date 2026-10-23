# API side nav rendering optimization

## Prompt

Our rendered HTML for the API docs is large, as you can see in the [api-html-snapshots folder](../tests/headless/api-html-snapshots). In assessing why these were so large, I realized that 1,200+ links are being rendered in the nav.

Only one section of the nav is open at a time. It seems like we could skip rendering the links inside the closed sections, and drastically reduce the size of our HTML. Confirm that this is correct, then write a plan for making the change.

## Claude's plan

### Baseline confirmed

Counted on a real built page ([astro/dist/api/latest/dashboards/get-a-dashboard/index.html](astro/dist/api/latest/dashboards/get-a-dashboard/index.html)):

- **127** category links
- **1,222** operation links (the "1,200+" the prompt cites)
- **1** category's `<ul>` carries `api-side-nav__operations--expanded`; the other 126 are inert markup
- Closed lists are `display: none` per [ApiSideNav.module.css:79-88](astro/src/components/ApiSideNav/ApiSideNav.module.css#L79-L88) — they are not lazily revealed by client JS, they are simply hidden CSS

So every API page ships ~1,200 operation `<li><a>` pairs that the user can never see without navigating away first. Clicking a closed category in [ApiSideNav.astro:32-37](astro/src/components/ApiSideNav/ApiSideNav.astro#L32-L37) is already a full page navigation to that category's landing page, so "expanding" is implemented as navigation, not as a toggle. That makes this a free reduction: there is no client-side state to break.

Page-weight context for the same page: 7.26 MB raw, 342 KB gzipped. A rough estimate per dropped operation link is ~175 bytes uncompressed, so dropping ~1,200 of them removes ~210 KB raw / a meaningful slice of the gzipped payload, multiplied across every API page.

### Approach

In [ApiSideNav.astro](astro/src/components/ApiSideNav/ApiSideNav.astro), only render the `<ul class="api-side-nav__operations">` sub-list for the **active** category. Inactive categories render just their `<li><a class="api-side-nav__category">…</a></li>` and nothing else.

Concretely, replace the unconditional `cat.operations.map(...)` block with `isActive && (...)`. The `--expanded` modifier and the `display: none` rule for `.api-side-nav__operations` then both become dead code, since the only rendered list is always the expanded one — clean those up too.

### Behavior parity

- **Operation pages** (`currentSlug` matches a category): active category's operations render exactly as today; the active operation gets `--active`. No visual diff.
- **Category landing pages** (same `currentSlug` match): same as today.
- **Static pages** (`/api/latest/`, `using-the-api`, `rate-limits`, `scopes`): `currentSlug` matches no category, so today none of the lists is expanded — the rendered DOM is identical to what we'd produce now (categories only, no operations). No diff at all on these pages.
- **Search**: SearchBar uses Typesense, not the rendered nav DOM ([SearchBar.tsx:5](astro/src/components/SearchBar/SearchBar.tsx#L5)), so search coverage is unaffected.
- **Mobile (`max-width: 768px`)**: side nav becomes a 300 px-tall bar above content ([ApiLayout.astro:90-105](astro/src/layouts/ApiLayout.astro#L90-L105)). Same data, same logic — unaffected.
- **Internal link graph / SEO**: every operation is still linked from at least one page (its category's landing page), so crawlers can still reach all operations in 2 hops from any other page. We just stop emitting redundant copies of the link from every page.
- **Accessibility**: closed lists are already `display: none` today, which already removes them from the accessibility tree. Dropping them from HTML is a strict no-op for screen readers.

### Implementation steps

1. **Edit [ApiSideNav.astro](astro/src/components/ApiSideNav/ApiSideNav.astro)**: gate the `<ul class="api-side-nav__operations">` block on `isActive`. Drop the now-unused `--expanded` modifier from the class list (since the list only renders when active).
2. **Edit [ApiSideNav.module.css](astro/src/components/ApiSideNav/ApiSideNav.module.css)**: remove the `.api-side-nav__operations { display: none }` / `.api-side-nav__operations--expanded { display: block }` pair (rules 79-88). The list either exists and is visible, or doesn't exist.
3. **Update [ApiSideNav.test.ts](astro/src/components/ApiSideNav/ApiSideNav.test.ts)**:
   - Add a case asserting that when `currentSlug` is not passed (or doesn't match), no operation links render — i.e. the rendered HTML must not contain any `api-side-nav__operation` substring.
   - Add a case asserting that when `currentSlug='dashboards'` is passed, *only* the dashboards operations render (e.g. count of `api-side-nav__operation\b` occurrences equals the number of operations in the dashboards fixture, not the total across all categories).
   - Existing tests at [ApiSideNav.test.ts:48-103](astro/src/components/ApiSideNav/ApiSideNav.test.ts#L48-L103) already pass `currentSlug='dashboards'` for the operation-link assertions, so they keep working.
4. **Snapshot test**: [api-html-snapshots.test.ts](astro/tests/headless/api-html-snapshots.test.ts) only captures `<main>` (see the comment at lines 67-72 — the side nav is explicitly excluded as "noise"), so existing snapshots won't move. No `--update-snapshots` needed.
5. **Browser tests**: [api-i18n.spec.ts:45](astro/tests/browser/api-i18n.spec.ts#L45) and [search-bar.spec.ts:23](astro/tests/browser/search-bar.spec.ts#L23) only locate `.api-side-nav__category` and `.api-side-nav__search`, not operation links. They keep working as-is. Run `npm run test:browser` after the change to confirm no regression.
6. **Manual verification**: `npm run dev`, walk a category landing page → operation page → static page (`/api/latest/rate-limits/`) → another category, confirming the nav looks identical to today on each.
7. **Measure**: rebuild and re-check the file size of `dist/api/latest/dashboards/get-a-dashboard/index.html` (raw and gzipped) before and after, and capture both numbers in the PR description.

### Companion change: tighten the view-builder API

The HTML-weight win above lives entirely in [ApiSideNav.astro](astro/src/components/ApiSideNav/ApiSideNav.astro); the view builder doesn't need to change for the bytes to drop. But once `ApiSideNav` only reads operations for the active category, every page that calls `getCategoriesView()` solely to feed the nav is loading data nothing reads. That's wasted clarity, not wasted CPU — `getCategoriesView` is memoized per-locale ([viewsBuilder.ts:53-77](astro/src/lib/api/viewsBuilder.ts#L53-L77)) and `ApiSideNav` is a server-only `.astro` component (no `client:*`), so the unused operations live as in-process references and never hit the wire — but the type signature lies about what the nav needs.

Worth doing as a follow-on (or in the same PR) for honest types and to make the boundary obvious:

1. **Add `getCategoryStubsView(lang)`** in [viewsBuilder.ts](astro/src/lib/api/viewsBuilder.ts): returns a new `ApiCategoryStub` shape (`name`, `slug`, `description`, `deprecated` — no `operations`). Internally it can derive from the same memoized walk, just dropping the operations field.
2. **Change `ApiSideNav` props** to `categories: ApiCategoryStub[]` plus `activeCategory?: ApiCategory`. The component only ever needs the full operation list for the active category; this makes the type say so.
3. **Update callers**:
   - [rate-limits.astro](astro/src/pages/[...lang]/api/latest/rate-limits.astro), [scopes.astro](astro/src/pages/[...lang]/api/latest/scopes.astro), [using-the-api.astro](astro/src/pages/[...lang]/api/latest/using-the-api.astro), [/api/latest/index.astro](astro/src/pages/[...lang]/api/latest/index.astro): switch from `getCategoriesView` to `getCategoryStubsView`. These pages have no active category, so `activeCategory` is omitted.
   - [[category].astro](astro/src/pages/[...lang]/api/latest/[category].astro), [[category]/[operation].astro](astro/src/pages/[...lang]/api/latest/[category]/[operation].astro): use `getCategoryStubsView` for the nav, and pass the already-loaded `current` / `category` (from `getCategoryViewBySlug`) as `activeCategory`. They were already calling `getCategoryViewBySlug` for the page body, so this avoids any extra work.
   - [llms.txt.ts](astro/src/pages/llms.txt.ts) and [[category]/[operation].md.ts](astro/src/pages/[...lang]/api/latest/[category]/[operation].md.ts): keep `getCategoriesView` — they genuinely enumerate every operation (sitemap and `getStaticPaths` respectively).
4. **Update [ApiSideNav.test.ts](astro/src/components/ApiSideNav/ApiSideNav.test.ts)** fixtures to match the new prop shape.

What this does *not* do:
- Doesn't change build time meaningfully — the spec walk was already memoized.
- Doesn't change HTML output — that win is from step 1 of the main plan.
- Doesn't reduce module evaluation cost — `viewsBuilder.ts` is one module either way.

What it *does* do:
- Makes the `ApiSideNav` contract honest: a stub list of categories plus the one expanded one, which is exactly what the rendered DOM contains.
- Lets a future reader of [rate-limits.astro](astro/src/pages/[...lang]/api/latest/rate-limits.astro) see at a glance that the page doesn't need every operation in the system.

If you'd rather keep the scope minimal and ship the HTML win first, the steps in the main plan stand on their own; this section can become its own follow-up plan.

### Out of scope (explicitly)

- No client-side toggle to expand a closed category in place. That would be a UX change (making category clicks no-op the navigation) and adds a JS island where today there is none. If we want that later it can be a separate plan.
- No change to which categories/operations exist or their ordering.
- No change to `ApiLayout.astro` or `BaseLayout.astro`.
