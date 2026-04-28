# Search bar and search results page

## Prompt

The Hugo site is indexed with Typesense, including the API docs that we're working on moving to Astro. In Hugo, the API pages have a search box (starting with class `nav-search-wrapper`) that offers a results popup.

We want to start creating this functionality in Astro, but we don't want our Astro site to influence any of our Typesense data. The feature should just read from the Hugo Typesense data, but send the user to the equivalent page in Astro if they click the result link.

Cosmetically, make the elements as similar to their Hugo equivalents as possible without breaking the rules in [CLAUDE.md](../CLAUDE.md). It's okay if there are some spacing differences if those are unavoidable under the tokenized design.

For now, just use a Placeholder for the "Ask AI button" at the top of the results popup.

## Research: How Typesense works in Hugo

This section maps the moving parts end-to-end so the Astro implementation has a clear reference.

### High-level architecture

Hugo doesn't talk to Typesense at *build* time. The pipeline is:

1. **Index generation** at Hugo build time — Hugo writes a JSON file (per-page records) intended as the index payload for Algolia/Typesense.
2. **External ingestion** — a separate sync job (CI, outside this repo) reads that JSON and pushes documents into Typesense collections. This is implied by [list.search.json:1](../../layouts/_default/list.search.json#L1), which gates output on `hugo.Environment == "live"` or specific CI job names (`typesense_sync_preview:manual`, `algolia_sync_preview:manual`).
3. **Runtime querying** — at page load, browser JS connects directly to a Typesense Cloud cluster with a public read-only key and queries collections via HTTP.

So Hugo is responsible for shape (what fields each document has) and content (which pages get indexed), and the live site is responsible for query UX. The Astro implementation only needs to participate in step 3.

### Indexing pipeline (step 1 + 2)

[layouts/_default/list.search.json](../../layouts/_default/list.search.json) is a Hugo template that emits a JSON array of records. Despite the path saying `algolia/`, this is the same payload that gets synced to Typesense. Per-record processing:

- Iterates `Site.AllPages`, excluding home, type=api, type=partners (those are indexed separately), private pages, FAQ pages, drafts, external redirects.
- For each surviving page: derives an `objectID` (md5 of relative path), reads `algolia.tags`/`algolia.rank`/`algolia.category`/`algolia.subcategory` from front matter, falls back to ancestor titles for subcategory.
- Cleans content (strips "is not supported" alert prefix), truncates to 10k chars.
- Splits the page by H2 headings into per-section records via `partial "algolia/page-sections.json"` ([list.search.json:38](../../layouts/_default/list.search.json#L38)) — so search hits resolve to a section, not just a page.
- If a page has no H2s, emits one full-page record instead ([list.search.json:42-68](../../layouts/_default/list.search.json#L42-L68)).
- Adds API pages and standard-attributes pages and glossary pages from sibling partials ([list.search.json:73-79](../../layouts/_default/list.search.json#L73-L79)).

**Document shape** (the fields the runtime code reads):

```text
objectID              md5 of language + file path
id                    same as objectID
title                 page title (or integration_title)
section_header        H2 heading text — empty for full-page records
content               truncated plain-text body (or section body)
type                  page Type (e.g. "api")
relpermalink          path on the site
distinct_base_url     used by Typesense distinct=1 dedup
full_url              absolute URL
language              "en", "ja", "fr", "ko", "es"
category              "Documentation" | "API" | "Integrations" | "Guides" | "Getting Started" | "Partners"
subcategory           e.g. "Logs"
rank                  default 70
order                 -1 for full-page; section order otherwise
tags                  optional array
```

The runtime code never sees the H2-splitting machinery — it just sees an opaque `hit` object with these fields plus a `_highlightResult` object that Typesense fills in per query.

### Typesense collections, presets, and config

Per-environment connection details live in [assets/scripts/config/config-docs.js](../../assets/scripts/config/config-docs.js):

- `live`: host `gk6e3zbyuntvc5dap`, public key `bDUaL3uKrCG0033PDb6Vbi8n46mKGaMG`
- `preview` and `development`: host `dnm1k9zrpctsvjowp`, public key `O2QyrgpWb3eKxVCmGVNrORNcSo3pOZJu`
- Three index aliases: `docs_alias`, `docs_api_alias`, `docs_partners_alias`. Aliases mean the underlying collection can be swapped during a re-index without changing client code.

Typesense **presets** (server-side stored search-parameter blocks) drive the scoring/filtering logic. The client only names them; the cluster knows what they do. Three are referenced:

- `docs_alias_view` — default popup search across docs ([instantsearch.js:95](../../assets/scripts/components/instantsearch.js#L95)).
- `docs_alias_api_view` — used when `body.api` is present, biasing API content ([instantsearch.js:190](../../assets/scripts/components/instantsearch.js#L190)). The actual scoring rules live in the Typesense cluster, not in this repo.
- `docs_partners_view` — partners-index preset ([instantsearch.js:99](../../assets/scripts/components/instantsearch.js#L99), [:194](../../assets/scripts/components/instantsearch.js#L194)).

### Runtime stack

[assets/scripts/components/instantsearch.js](../../assets/scripts/components/instantsearch.js) wires up three layers:

- `instantsearch.js` (Algolia's vanilla-JS UI framework) — provides connectors, widgets, URL-state routing.
- `typesense-instantsearch-adapter` — translates instantsearch's Algolia-shaped requests into Typesense `multi_search` requests, then translates Typesense responses back into the Algolia-shaped objects the connectors expect ([instantsearch.js:66-105](../../assets/scripts/components/instantsearch.js#L66-L105)). This is why hits have `_highlightResult` (Algolia naming) even though the backend is Typesense.
- `typesense` (transitive) — the underlying HTTP client.

The adapter is configured with the cluster's three nodes plus a "nearest" node for latency, and a 2-minute client-side cache for repeated queries ([instantsearch.js:66-92](../../assets/scripts/components/instantsearch.js#L66-L92)).

### Where the search bar appears in markup

Two flavors of the search bar exist in Hugo:

- **Popup variant** (the one we're porting). [layouts/partials/search.html](../../layouts/partials/search.html) renders the empty shell — a `nav-search-wrapper` div containing `searchbox-container` → `searchbox` (input target) plus a hidden `hits-container` → `hits` and `hits-partners`. instantsearch.js then mounts widgets into those IDs at runtime.
- **API side nav** specifically embeds this same partial inside the side nav at [layouts/partials/sidenav/api-sidenav.html:14-15](../../layouts/partials/sidenav/api-sidenav.html#L14-L15) (skipped on the search results page itself, [api-sidenav.html:14](../../layouts/partials/sidenav/api-sidenav.html#L14), in favor of the `async-searchbar-mount` pattern).

The standalone search results page ([content/en/search.md](../../content/en/search.md)) renders a different shell — adds an `#count` element and a `#pagination` element, and gives the wrapper an extra `search_results_page` class that the runtime sniffs for to switch behavior.

Styles live in:

- [assets/styles/instantsearch/searchbar-sidenav.scss](../../assets/styles/instantsearch/searchbar-sidenav.scss) — side-nav-specific overrides (z-index, popup width, submit button styling).
- `assets/styles/instantsearch/searchbar-with-dropdown.scss` — popup look.
- `assets/styles/instantsearch/searchbar-mobile.scss` — mobile.
- `assets/styles/instantsearch/search-page.scss` — search results page.

All four are imported via [assets/styles/_instantsearch.scss](../../assets/styles/_instantsearch.scss).

### Initialization

[loadInstantSearch](../../assets/scripts/components/instantsearch.js#L154) is called from two places:

- [datadog-docs.js:89](../../assets/scripts/datadog-docs.js#L89) — initial page load.
- [components/async-loading.js:101](../../assets/scripts/components/async-loading.js#L101) — re-initializes after async page swaps so the searchbox keeps working.

Inside `loadInstantSearch`:

1. Reads the `data-env` attribute from `<html>` to pick a config block.
2. Detects context flags: `body.api`, `body.partners`, `.kind-home`, `.search_results_page`.
3. If `body.api`, swaps in the `docs_alias_api_view` preset ([instantsearch.js:184-200](../../assets/scripts/components/instantsearch.js#L184-L200)).
4. If `.search_results_page`, switches `numHits` from 5 → 10 and uses the `searchpageHits` renderer instead of `searchbarHits`.
5. Builds an `instantsearch` instance with `routing` ([instantsearch.js:217-234](../../assets/scripts/components/instantsearch.js#L217-L234)) that mirrors the query into `?s=` in the URL and back.
6. Adds widgets in this order: `configure` (per-index params), `searchBox` (mounts the input + injects custom submit template), `hitComponent` (the per-context hits renderer), `customPagination` (only effective on search page), then a second `index` widget for partners with its own `configure` + `hitComponent`.
7. `search.start()` triggers the first render and binds DOM.

### Hits renderers

The popup uses [assets/scripts/components/instantsearch/searchbarHits.js](../../assets/scripts/components/instantsearch/searchbarHits.js):

- `connectHits(renderHits)` is the connector pattern — instantsearch hands the renderer `{ hits, results, widgetParams }` whenever results change.
- On first render it builds a static skeleton: `#ais-Hits` wrapper, an `#ais-Hits-ai-container` for the Ask AI suggestion (only on the docs container, not partners), and 5 placeholder category divs/lists ([searchbarHits.js:101-189](../../assets/scripts/components/instantsearch/searchbarHits.js#L101-L189)).
- On subsequent renders it filters hits into 5 buckets by `category` (Getting Started / Documentation / Integrations / Guides / API) plus a partners bucket (filtered by `type === 'partners'`), ([searchbarHits.js:284-307](../../assets/scripts/components/instantsearch/searchbarHits.js#L284-L307)).
- Order: Getting Started → Documentation → Guides → Partners → Integrations → API. If `bodyClassContains('api')`, API gets popped from the end and unshifted to the front ([searchbarHits.js:310-313](../../assets/scripts/components/instantsearch/searchbarHits.js#L310-L313)).
- Each hit becomes an `<li class="ais-Hits-item">` with subcategory + title + section_header breadcrumb + snippet ([searchbarHits.js:249-263](../../assets/scripts/components/instantsearch/searchbarHits.js#L249-L263)). The link target is `${basePathName}${hit.relpermalink}` (basePathName encodes preview commit refs and language prefixes).
- `no-hits` BEM modifier on each list controls visibility — list collapses to nothing when empty ([searchbarHits.js:213-225](../../assets/scripts/components/instantsearch/searchbarHits.js#L213-L225)).
- The Ask AI suggestion is created/updated only when the conversational search FF is true ([searchbarHits.js:7-12](../../assets/scripts/components/instantsearch/searchbarHits.js#L7-L12), [:94-99](../../assets/scripts/components/instantsearch/searchbarHits.js#L94-L99)) and only on the docs container.

The full search page uses [searchpageHits.js](../../assets/scripts/components/instantsearch/searchpageHits.js) — much simpler: one ungrouped `<ol>`, longer snippet, full breadcrumb (category » subcategory » title) per hit.

[customPagination.js](../../assets/scripts/components/instantsearch/customPagination.js) is a `connectPagination` renderer that emits Prev / page numbers / Next as `<a href>` elements (Algolia connector gives it `createURL` so the links survive routing) and wires click → `refine()` + smooth scroll. Skipped on non-search-page contexts ([customPagination.js:16-18](../../assets/scripts/components/instantsearch/customPagination.js#L16-L18)).

### Hit shape transform: `getHitData`

[getHitData.js](../../assets/scripts/components/instantsearch/getHitData.js) is the only place hit data is normalized:

- Strips the `/{lang}/` prefix from non-English `relpermalink`.
- Reads `_highlightResult.title.value` etc. for marked-up versions; falls back to plain fields.
- Defaults `category` to `"Documentation"` and `subcategory` to title.
- **Manually injects `<mark>` tags** for query terms that Typesense's highlighter missed, by regex over the highlighted_content string ([getHitData.js:29-45](../../assets/scripts/components/instantsearch/getHitData.js#L29-L45)). Words ≤2 chars and a tiny stopword list are skipped.
- `getSnippetForDisplay` truncates content (180 chars in the popup, 300 on the search page) and prefers a window that contains a `<mark>` if there is one ([getHitData.js:53-66](../../assets/scripts/components/instantsearch/getHitData.js#L53-L66)).

Both renderers route the hit through this transform before HTML construction.

### Interaction layer

After `search.start()`, [instantsearch.js:312-501](../../assets/scripts/components/instantsearch.js#L312-L501) wires up:

- **Global keyboard shortcuts** ([:316-337](../../assets/scripts/components/instantsearch.js#L316-L337)) — `/` or `Cmd/Ctrl+K` focuses the searchbox (and synthesizes a single-space query so the dropdown appears); `Esc` clears + blurs.
- **Searchbar keyboard nav** ([:346-408](../../assets/scripts/components/instantsearch.js#L346-L408)) — ArrowUp/Down move a `selected-item` BEM class through visible hits (Ask AI included). Enter on a hit calls `navigateToUrl(link.href)`. Enter with no selection submits to the search results page (after a 500ms delay so URL routing flushes).
- **Submit button** ([:410-415](../../assets/scripts/components/instantsearch.js#L410-L415)) — pushes to `${basePathName}search`.
- **Outside click** ([:417-439](../../assets/scripts/components/instantsearch.js#L417-L439)) — intercepts clicks inside the dropdown to send a RUM event before navigation, then closes the dropdown.
- **Search-page click handler** ([:442-462](../../assets/scripts/components/instantsearch.js#L442-L462)) — same RUM hook for results-page clicks, plus computes a "click position" from the result index across pages.
- **Mobile reposition** ([:465-474](../../assets/scripts/components/instantsearch.js#L465-L474)) — on resize, moves the entire `searchbox-container` between `.nav-search-wrapper` (desktop) and `.mobile-nav-search-wrapper` (mobile). The same DOM node hosts both, so instantsearch state survives the move.
- **`navigateToUrl`** ([:11-58](../../assets/scripts/components/instantsearch.js#L11-L58)) — handles three cases: same-page anchor scroll (with header/glossary-nav offset math), glossary cross-page (stores hash in sessionStorage so the destination can scroll after load), generic cross-page reload.

### Auxiliary integrations

- **RUM** — `sendSearchRumAction` ([instantsearch.js:120-138](../../assets/scripts/components/instantsearch.js#L120-L138)) records `userSearch` actions with query, page, language, click target, click position. Skipped under synthetics.
- **Conversational Search / Ask AI** — gated by a feature flag (`CONVERSATIONAL_SEARCH_FLAG_KEY`) initialized via [feature-flags.js](../../assets/scripts/helpers/feature-flags.js); also force-on for Datadog employees ([searchbarHits.js:10-12](../../assets/scripts/components/instantsearch/searchbarHits.js#L10-L12)). When enabled, the suggestion at the top of the popup either invokes `window.askDocsAI(query)` (provided by [conversational-search](../../layouts/partials/conversational-search.html)) or logs a docs_ai event.
- **Async page loading** — when the user navigates between pages without a full reload, [async-loading.js:101](../../assets/scripts/components/async-loading.js#L101) re-runs `loadInstantSearch(true)` so the search bar rebinds against the new DOM.

### What the Astro port actually needs

Mapping the above to what we're rebuilding:

- We can skip the Hugo indexing pipeline entirely — the Astro site reads the same Typesense aliases.
- We can skip `instantsearch.js` and the adapter by hitting Typesense's `POST /multi_search` directly with two queries (`docs_alias` + `docs_partners_alias`), each carrying the appropriate preset and `q`/`query_by`/`filter_by` etc.
- We must replicate the hit transformation (getHitData equivalent) — including the manual `<mark>` injection — because the rendering depends on it.
- We must replicate the category bucketing + ordering, with API pinned first.
- We must replicate the keyboard, focus, and outside-click behavior; can skip routing/URL-sync, RUM, mobile reposition, conversational-search FF wiring, and async-loading rebind for v1.
- The Ask AI item is replaced by a `<Placeholder />` per the prompt.

## Claude's plan

### Decisions (from Q&A)

1. **Scope**: popup only — no `/search` page in Astro this round.
2. **Cross-site navigation**: hits whose `category === 'api'` link within the Astro site (origin-relative). All other categories (Documentation, Integrations, Guides, Partners, Getting Started) link out to `https://docs.datadoghq.com${relpermalink}`.
3. **Typesense behavior**: replicate Hugo's API-page behavior exactly — `docs_alias_api_view` preset on the docs index plus `docs_partners_view` on the partners index, all categories displayed, API pinned to the top.
4. **Placement**: inside [ApiSideNav.astro](../src/components/ApiSideNav/ApiSideNav.astro), matching Hugo where [api-sidenav.html:14-18](../../layouts/partials/sidenav/api-sidenav.html#L14-L18) embeds [search.html](../../layouts/partials/search.html).
5. **Framework**: Preact island (interactive: debounced input, keyboard nav, dynamic hit list).
6. **Library**: light — direct `fetch` to Typesense `POST /multi_search`. No `instantsearch.js` / `typesense-instantsearch-adapter` / `typesense` JS client. Saves ~150 KB gzipped vs. the Hugo stack.
7. **Keyboard shortcuts**: port Hugo's `/` and `Cmd/Ctrl+K` (focus input) and `Esc` (clear + blur), plus arrow-key result navigation and Enter (open hit).
8. **Ask AI button**: render `<Placeholder />` at the top of the results popup. No FF wiring this round.
9. **Test fixtures**: colocated under `astro/src/components/SearchBar/__fixtures__/`.

### Files to add

- [astro/src/components/SearchBar/SearchBar.tsx](../src/components/SearchBar/SearchBar.tsx) — single Preact component (no `.astro` shell). Astro will SSR it at build time and hydrate on the client via `client:load`. Renders the input, the popup container, the `<Placeholder />` for Ask AI, and the category lists; owns debounced input handler (~200ms), `multi_search` fetch, hit categorization, keyboard nav state (`selected-item` BEM modifier), outside-click dismissal, and link click handling. The `externalContext` island pattern doesn't apply here — there's no large rendered HTML being serialized as a prop, and hits are fetched client-side rather than at build time.
- [astro/src/components/SearchBar/SearchBar.module.css](../src/components/SearchBar/SearchBar.module.css) — BEM-prefixed module styles using design tokens. Match Hugo's [layouts/partials/search.html](../../layouts/partials/search.html) + associated SCSS visually as closely as the tokenized system allows.
- [astro/src/components/SearchBar/SearchBar.test.ts](../src/components/SearchBar/SearchBar.test.ts) — vitest (happy-dom) interactive tests covering: empty state, query → renders categories, no-hits state, keyboard nav across hits (incl. Ask AI placeholder at index 0), Enter on a hit navigates, Cmd+K focuses input, `/` focuses input, Esc clears + blurs, API hit URL stays same-origin while non-API hit URL is rewritten to `docs.datadoghq.com`. Stubs `fetch` with the colocated fixtures.
- [astro/src/components/SearchBar/__fixtures__/typesense_basic.json](../src/components/SearchBar/__fixtures__/typesense_basic.json) — captured `multi_search` response with hits in multiple categories (incl. partners).
- [astro/src/components/SearchBar/__fixtures__/typesense_no_hits.json](../src/components/SearchBar/__fixtures__/typesense_no_hits.json) — empty results.
- [astro/src/components/SearchBar/__fixtures__/typesense_api_only.json](../src/components/SearchBar/__fixtures__/typesense_api_only.json) — only API hits (sanity check for the "API pinned to top" path being a no-op when API is the only category).
- [astro/src/utils/typesense.ts](../src/utils/typesense.ts) — small helper: `multiSearch(query, { docsIndex, partnersIndex, host, publicKey })` returning typed `{ docs, partners }` results. ~50 lines. Hardcodes `language: en`, `hits_per_page: 5`, `distinct: 1`, the `docs_alias_api_view` and `docs_partners_view` presets.
- [astro/src/config/typesense.ts](../src/config/typesense.ts) — env-keyed config (`live` / `preview` / `development`) mirroring the Hugo values in [assets/scripts/config/config-docs.js](../../assets/scripts/config/config-docs.js). Read at build time; baked into the island via Astro `import.meta.env.MODE`-driven selection.
- [astro/src/content/test_pages/search-bar.mdoc](../src/content/test_pages/) — component documentation page showing the SearchBar live with a props/state table (debounce, hit categories, keyboard shortcuts).
- [astro/tests/browser/search-bar.spec.ts](../tests/browser/search-bar.spec.ts) — Playwright: visual layout (closed, open with results, open empty), retina screenshot baselines for each visual variant.

### Files to edit

- [astro/src/components/ApiSideNav/ApiSideNav.astro](../src/components/ApiSideNav/ApiSideNav.astro) — render `<SearchBar />` at the top of the side nav, matching the Hugo position in [api-sidenav.html:14-15](../../layouts/partials/sidenav/api-sidenav.html#L14-L15).
- [astro/src/components/ApiSideNav/ApiSideNav.test.ts](../src/components/ApiSideNav/ApiSideNav.test.ts) — assert SearchBar is rendered in the expected slot.

### Notable behaviors to port

- **Hit grouping order**: Documentation, Guides, Partners, Integrations, API — but with API pinned first ([instantsearch.js:300-313](../../assets/scripts/components/instantsearch.js#L300-L313)) since the entire Astro site is API.
- **Hit card structure**: subcategory (small), title (bold) + section header breadcrumb, snippet — see [searchbarHits.js:249-263](../../assets/scripts/components/instantsearch/searchbarHits.js#L249-L263).
- **Snippet processing**: port [getHitData.js](../../assets/scripts/components/instantsearch/getHitData.js) verbatim (handles `<mark>` highlighting from Typesense's `highlight` blocks).
- **Outside-click dismissal**: clicking outside the searchbar wrapper closes the popup.
- **Selection model**: `selected-item` BEM modifier driven by ArrowUp/Down. ArrowUp from index 0 returns focus to the input. Enter on the selected item navigates.
- **Same-page hash navigation**: not relevant here — every API hit is a different page in this iteration. Skip the [instantsearch.js:11-58](../../assets/scripts/components/instantsearch.js#L11-L58) `navigateToUrl` complexity; use plain `<a href>` with normal click semantics. RUM action sending is also out of scope for this round.

### Out of scope for this PR

- Standalone `/search` results page (deferred per Q1).
- Conversational Search / real Ask AI integration — Placeholder only.
- RUM / DD_LOGS event hooks.
- URL state sync (`?s=query`).
- Mobile searchbar repositioning (the side nav has its own mobile pattern; SearchBar inherits whatever ApiSideNav already does).
- Localization — hardcoded `language: en` until Astro picks up other locales.

### Best-practice notes (will be confirmed in PR description)

- Direct `fetch` keeps the bundle ~150 KB gzipped lighter than reusing instantsearch.js.
- Server-rendering the empty popup shell + category headers (per the SEO rule) means the Preact island only mutates existing DOM nodes via `externalContext`, not serializes HTML through props.
- Fixtures are real captured Typesense responses (sanitized) so contract drift is caught when tests diverge from the live API shape.
