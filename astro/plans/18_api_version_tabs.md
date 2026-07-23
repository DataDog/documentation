# API version tabs

## Prompt

The Astro API docs build a separate page for versions v1 and v2 of an endpoint (for example, AWS Integration > List all AWS integrations). We want to match Hugo, which only describes an endpoint once, and has tabs for v1 and v2.

Unlike Hugo, we can just lay out the tabs the same way the other tabs are laid out: Pills start flush left. When there is only one version, we still use a pill, it's just the only pill available so it's disabled.

The default active tab should be the latest version, which also is the first tab.

## Claude's plan

### Goal

One page per logical operation, with pill-style version tabs in-page. Replace the current `…-v1/` / `…-v2/` split pages.

### Reference behavior in Hugo

- `/api/latest/aws-integration/` renders `<h2 id="list-all-aws-integrations">` once, followed by a tab bar with one pill per version. Each tab pane has an ID of the form `<slug>-<version>` and holds the full per-version body.
- "(latest)" is per-operation, not a global hardcode: `validate-api-key` (v1-only) renders `v1 (latest)`; the colliding AWS operation renders `v1` and `v2 (latest)`. Astro currently hardcodes `(latest)` to v2 at `ApiEndpoint.astro:76` — that bug gets fixed by this work.
- Single-version operations still render a tab bar (Hugo uses a disabled single pill).

### Data layer (`src/lib/api/viewsBuilder.ts`)

- A logical operation is keyed on `(categorySlug, summary)`. The `RawOperation -> slug` map at lines 291-309 currently disambiguates collisions by appending `-v1` / `-v2`. Drop that: the slug is always the bare summary slug.
- Introduce a new view shape so each `ApiCategory` operation entry holds an ordered list of version variants (sorted newest → oldest) instead of being flattened per version. Sketch:
  ```ts
  interface ApiOperationView {
    slug: string;          // shared across versions
    summary: string;
    menuOrder?: number;
    deprecated: boolean;   // true only if all variants are deprecated
    variants: ApiEndpointView[]; // ordered newest-first
  }
  ```
- Sidebar/category stubs collapse to one entry per `ApiOperationView`.
- `getEndpointView(catSlug, opSlug, lang)` returns the full `ApiOperationView` with every variant resolved. Existing single-endpoint snapshots are replaced by per-operation snapshots that include all versions.
- The `menuOrder` collision (two variants sharing one slug) is resolved by taking the lowest `menuOrder` among the variants, matching Hugo.

### Routing

- Operation page lives at `/api/latest/[category]/[operation]/` with no version suffix. Update `getStaticPaths` in `src/pages/[...lang]/api/latest/[category]/[operation].astro` to emit one path per `ApiOperationView`.
- Old prototype URLs `…-v1/` and `…-v2/` are still in dev's wild. Add a small client-side redirect in `[operation].astro` that, when the URL slug ends in `-v1` / `-v2` and the bare slug exists, replaces the location with `/<bare-slug>/#<bare-slug>-<version>`. The existing hash-based redirect in `[category].astro:82-89` continues to fire for legacy `…/#<slug>` links.

### Operation page rendering

- For a single-variant operation: render `<ApiEndpoint>` directly inside a `<Tabs variant="pills">` with one disabled tab labeled `<version> (latest)`.
- For multi-variant operations: render one `<ApiEndpoint>` per variant inside `<Tabs variant="pills">`. Tab labels: `vN (latest)` for the first (newest) variant, plain `vN` for the rest. Panel IDs: `<slug>-<version>`. Default active = first tab (= latest).
- Remove the inline version badge from `ApiEndpoint.astro:74-77`. Tabs are the version indicator; an inline badge inside the tab body is noise. The `version` field stays on `EndpointData` because plaintext export (`ApiEndpoint.md.ts`) and `llmsTxtRenderer` still consume it.
- Heading + breadcrumb use the shared summary; the per-variant `<ApiEndpoint>` keeps its `headingLevel={2}` for the path/method block sub-headings (Overview, Arguments, etc.) and drops the top `<h1>` summary heading it currently renders. The page's `<h1>` lives in the Astro page above the tabs.

### Tabs component extensions

`Tabs.astro` and `TabsNav.tsx` need two new features:

1. **Disabled tabs.** Accept a parallel `disabled: boolean[]` (or similar) and render the button with `disabled` + `aria-disabled` when set. `setActiveTab` ignores clicks on disabled tabs. Used only for the single-variant pill.
2. **Hash-driven initial activation.** On mount, if `window.location.hash` matches one of the panel IDs, set `activeIndex` to that panel's index before first paint. Also listen for `hashchange` so in-page links between version anchors flip the tab. This is the deep-link behavior `#list-all-aws-integrations-v1` depends on.

Both are additive — existing Tabs consumers don't need to change.

### Sidebar

`ApiSideNav.astro` already drives off `activeCategory.operations`. Once the view layer collapses variants into one entry per operation, the sidebar renders one link per logical operation automatically. No template changes expected; verify against an existing snapshot test.

### Tests / snapshots that need updating

- `src/lib/api/__snapshots__/getEndpointView/aws-integration.list-all-aws-integrations-v1.json` and `-v2.json` → single combined snapshot (or per-variant snapshots under a new shape).
- `src/lib/api/__snapshots__/getCategoryViewBySlug/screenboards.json` and similar — variants array replaces flattened entries.
- `tests/headless/api-html-snapshots/08-aws-integration-list-v1.html` and `08-aws-integration-list-v2.html` → one consolidated `08-aws-integration-list-all-aws-integrations.html`.
- Playwright screenshot baselines for the AWS operation page (per-platform `.png`s). Regenerate with `npx playwright test --update-snapshots` after the UI is in place.
- `ApiSideNav.test.ts` — sidebar entry count drops for categories with v1/v2 collisions.
- New TabsNav unit tests covering disabled-button behavior and hash-driven activation.

### Out of scope / explicit non-goals

- No change to API spec parsing, region resolver, code-example pipeline, or syntax highlighter.
- Hugo-side templates and i18n bundle stay untouched (per `astro/CLAUDE.md` "Stay inside `astro/`" rule).
- Not adding a Hugo-style global "API Reference" landing page rework — only the operation page and its sidebar entry.

### Open assumption to flag

Grouping is by `(categorySlug, summary)` — same key the current slug disambiguator uses. If a category ever has two endpoints with the same summary that are *not* really the same logical operation (different paths, different intent), they will get merged into one page incorrectly. This is the same risk the current `-v1`/`-v2` slug suffix logic inherits, so this change doesn't make it worse, but it is worth knowing.

