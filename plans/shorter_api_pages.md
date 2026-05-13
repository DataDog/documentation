# Shorter API pages

## Prompt

Our API documentation build process reads from an OpenAPI YAML spec and generates documentation for each category. These specs are in the data/api folder.

In its current state, this API docs build creates one page for each category, such as "Action Connection" or "Actions Datastores". Our goal is to

- Build a page for each endpoint, instead of using an H2 section for each endpoint
- On the category page, show the description and a `whatsnext` list of links to the endpoint pages
- Set up aliases for the existing `some/category#some_endpoint`, since the page will now be `some/category/some_endpoint`. New aliases will not need to exist, we just need to cover the existing ones programmatically somehow.

## Claude's plan

### Goal

Split each API category page (e.g. `/api/v2/action-connection/`) into:

- A **category page** that shows the tag description and a per-endpoint section for each operation (heading, method + path, short description, link to the full reference).
- A **per-endpoint page** at `/api/v2/action-connection/{endpoint-slug}/` that contains everything currently inside the H2 section (overview, permissions, arguments, request body, response, code examples) and preserves the v1/v2 version tabs when an endpoint exists in both versions.

Both v1 and v2 are converted. The `/api/latest/` mirror is extended to include per-endpoint pages.

### URL structure

| Today | After |
|---|---|
| `/api/v2/action-connection/` (all endpoints on this page) | `/api/v2/action-connection/` (overview + per-endpoint summaries) |
| `/api/v2/action-connection/#create-action-connection` | `/api/v2/action-connection/create-action-connection/` |
| `/api/latest/action-connection/` | `/api/latest/action-connection/` and `/api/latest/action-connection/create-action-connection/` |

Endpoint slug = `slugify(action.summary)` (same as the existing anchor slug, per Q4). The slug must be stable across v1 and v2 for shared endpoints so the page can host both tabs.

### Build script changes — [assets/scripts/build-api-pages.js](assets/scripts/build-api-pages.js)

1. **`createPages(apiYaml, deref, apiVersion)`**
   - Continue writing the tag-level `_index.md` (frontmatter: `title`, `headless: true`) for `content/en/api/{version}/{tag-slug}/`.
   - Additionally, for each operation under the tag, write `content/en/api/{version}/{tag-slug}/{endpoint-slug}/_index.md` with frontmatter:
     - `title: {action.summary}`
     - `headless: true`
     - `operationid: {action.operationId}`
     - `tag: {tag.name}`
     - `versions: [...]` (aggregated across v1/v2 for shared endpoints — see #3)
     - `aliases: ["/api/{version}/{tag-slug}/#{endpoint-slug}"]` *(harmless if Hugo ignores fragments; included so the relationship is discoverable in grep)*
   - Mirror everything to `content/en/api/latest/{tag-slug}/{endpoint-slug}/_index.md` with `headless` omitted (matches current `latest/` behavior for tag pages).

2. **`createResources` — no change.**
   - Continue writing `examples.json` at the tag-level directory. The endpoint page partials already look up by `operationId`, so a per-tag `examples.json` keyed by operationId is sufficient.

3. **`updateMenu(specData, specs, languages)`**
   - Keep the parent (tag) entries unchanged.
   - Change each generated child entry:
     - `url: /api/latest/{tag-slug}/{endpoint-slug}/` (was `#{endpoint-slug}`)
     - `pageRef: /api/{version}/{tag-slug}/{endpoint-slug}/` *(new param; used by the endpoint page lookup)*
   - Keep `params.versions`, `params.operationids`, `params.unstable`, `params.order` — same shape as today. When an endpoint exists in both versions, the existing logic that pushes `apiVersion` into `versions` and `operationId` into `operationids` keeps working as-is.

### Layout changes

1. **New: [layouts/api/single.html](layouts/api/single.html)** (per-endpoint page)
   - Takes the page's `operationid` from frontmatter and resolves the menu entry to get `versions`/`operationids`/`unstable`.
   - Renders everything the current `layouts/api/list.html` puts inside the `endpoint-content` block: version tabs, URL pattern, overview, permissions, arguments, request body, response, code example.
   - Extracted as a partial first (`layouts/partials/api/endpoint.html`) so both `list.html` (for the category page summary) and `single.html` (for the full page) can consume it at different detail levels.

2. **Updated: [layouts/api/list.html](layouts/api/list.html)** (category page)
   - At the top, render the tag's `description` (from the spec) as the lead paragraph (replaces the existing `partial "api/intro.html"` content where appropriate — keep the intro partial but make it expand the tag description).
   - For each menu child (same loop as today), render a compact block:
     - `<h2 id="{endpoint-slug}">` with `{summary}` — preserves the existing anchor target so old `#endpoint-slug` deep links scroll to the right place.
     - HTTP method badge + URL pattern (single line).
     - First paragraph of `action.description` (truncated at the first `\n\n` or first 200 chars; falls back to full description if short).
     - Inline link: `<a href="./{endpoint-slug}/">See full reference →</a>`.
     - Optional inline badges: `deprecated`, `x-unstable` (matches existing visual cues; don't re-render the full warning blocks).
   - Drop everything below — no arguments/schemas/code examples on the category page.

3. **New partial: [layouts/partials/api/endpoint-summary.html](layouts/partials/api/endpoint-summary.html)**
   - Pulled out of the rewrite of `list.html` so the summary rendering is reusable and testable.

4. **Routing**
   - The per-endpoint `_index.md` files are headless today by convention, which suppresses URL generation. **They must not be headless** for `single.html` to apply. Drop `headless: true` from the per-endpoint frontmatter (we keep `headless: true` on the tag-level `_index.md` only to keep its current behavior in `latest/`). Verify in `config/_default/config.yaml` that no `disableKinds` or section config blocks rendering for `content/en/api/{v1,v2}/`.

### Anchor preservation (the "alias" requirement)

Option B from the discussion: each category page keeps `<h2 id="{endpoint-slug}">` for every endpoint, so existing `/api/v2/foo/#bar` links continue to scroll to the matching summary block. No Hugo `aliases:` or JS redirect needed. The summary block contains enough context (method, path, description, link) that the user immediately sees what they need or clicks through to the full reference.

The per-endpoint frontmatter still lists the legacy anchor URL in `aliases:` as documentation, but Hugo's alias system won't act on it (fragments are client-side); it's there for grep/discoverability.

### Translations

- Per-endpoint pages still read from `data/api/{version}/translate_actions.{lang}.json`. The existing `translate_action` lookup keyed by `operationId` works unchanged inside the new `endpoint.html` partial.
- Tag-level `translate_tags.{lang}.json` continues to provide the translated tag description for the category page.
- No new translation keys are introduced.

### `latest/` mirror

`createPages` already mirrors the tag-level `_index.md` to `content/en/api/latest/{tag-slug}/_index.md`. Extend to mirror per-endpoint pages to `content/en/api/latest/{tag-slug}/{endpoint-slug}/_index.md`. Menu entries already point to `/api/latest/{tag}/{endpoint}/` (#3 above).

### Tests — [assets/scripts/tests/build-api-pages.test.js](assets/scripts/tests/build-api-pages.test.js)

- Update existing tests that assert on the shape of generated `_index.md` and the menu structure.
- Add assertions that:
  - One `_index.md` is written per endpoint at the expected path.
  - Frontmatter contains `operationid`, `tag`, `versions`.
  - Menu children have `url` pointing to `/api/latest/{tag}/{endpoint}/`.
  - Shared v1/v2 endpoints produce one page with both versions in the menu entry.
  - The `latest/` mirror gets the endpoint pages.

### Rollout / order of work

1. Refactor `list.html` to extract the endpoint-rendering chunk into `partials/api/endpoint.html` with no behavior change. Verify the existing category page renders identically.
2. Update `build-api-pages.js` to emit per-endpoint `_index.md` files (no layout change yet; pages will 404 or be blank).
3. Add `layouts/api/single.html` that uses `partials/api/endpoint.html`. Verify a single endpoint page renders correctly end-to-end.
4. Update `build-api-pages.js` to change child menu `url` to the new per-endpoint path.
5. Replace the body of `list.html` with the new summary view (tag description + per-endpoint summary blocks with preserved H2 anchors).
6. Update tests.
7. Sanity-check a sampling of pages: an endpoint that only exists in v2, one that exists in both v1 and v2, one marked `x-unstable`, one marked deprecated, and one translated page (`ja` or `fr`).

### Risks / open questions

- **Hugo section behavior.** Per-endpoint pages need to render as full pages, not as headless leaves of the tag section. If Hugo treats `content/en/api/v2/action-connection/{endpoint}/_index.md` as a sub-section, the layout lookup will hit `list.html` instead of `single.html` and could re-trigger the category rendering. Need to verify during step 3 — may need to switch to `index.md` (leaf bundle) or set the layout explicitly in frontmatter.
- **Sidebar UX.** The current sidebar collapses each tag and lists endpoints as children pointing to anchors on the same page. With endpoints now distinct pages, navigation between siblings becomes a full page load each time. Acceptable but worth confirming with the sidebar partial behavior before finalizing.
- **Sitemap and search.** Per-endpoint pages will be indexed separately, which is the desired outcome but ~10x the page count for `/api/`. Confirm sitemap generation and Algolia indexing config handle the volume.
- **`whatsnext`.** The original prompt called for a `whatsnext` list. The design instead uses per-endpoint H2 summary blocks (richer than a flat link list) on the category page. If the standard `whatsnext` component is required for visual consistency with the rest of docs, the summary blocks can be replaced with `whatsnext` entries — at the cost of less content per endpoint on the category page.

