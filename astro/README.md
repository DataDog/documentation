# Astro Docs

This is the next-generation Datadog documentation site, built with Astro 5, Markdoc, and Preact.

## Prerequisites

- Node.js >= 20

## Getting started

```bash
cd astro
npm install
npm run dev
```

The dev server starts at **http://localhost:4321**.

## Component documentation

Each component has a dedicated page showing its properties and visual permutations. After running `npm run build`, browse the index at [http://localhost:4322/docs/test_pages/](http://localhost:4322/docs/test_pages/) (via `npm run preview`). The pages are also reachable under `npm run dev`, but client-side hydration only behaves correctly in a production build.

## Other commands

| Command              | Description                          |
|----------------------|--------------------------------------|
| `npm run build`      | Production build to `dist/`          |
| `npm run preview`    | Preview the production build locally |
| `npm run test`       | Run unit tests (Vitest)              |
| `npm run test:browser` | Run browser tests (Playwright)     |

## Testing

### Unit tests (Vitest)

Fast, runs in Node with happy-dom. No dev server required.

```bash
npm test
```

### Browser tests (Playwright)

Runs against a dev server. Playwright starts one automatically via the config's `webServer`; if you already have `npm run dev` on port 4321, it reuses it.

```bash
npm run test:browser
```

Useful flags (pass them after `--`):

| Flag | Purpose |
|------|---------|
| `-- tabs.spec.ts` | Run a single spec file |
| `-- --ui` | Interactive UI mode — time-travel, re-run individual tests, inspect DOM |
| `-- --headed` | Watch tests run in a real Chromium window |
| `-- --debug` | Step through with the Playwright Inspector |
| `-- --update-snapshots` | Regenerate screenshot baselines after an intentional visual change |

After a failed run, open the HTML report for side-by-side diffs of expected vs. actual PNGs:

```bash
npx playwright show-report
```

Screenshot baselines are captured at 2x retina (1440×900 viewport, `deviceScaleFactor: 2`, `scale: 'device'`) and currently live under `tests/browser/*-snapshots/` with a `-chromium-darwin.png` suffix. They need to be regenerated on the CI platform once CI is wired up; Playwright's per-platform suffix lets Mac and CI baselines coexist.

## How API docs are rendered from YAML

The API reference pages are generated at build time. The pipeline has three stages:

1. **The spec parser** ([src/lib/api/specParser.ts](src/lib/api/specParser.ts)) loads the OpenAPI YAML into a JS object once per build.
2. **Memoized view helpers** ([src/lib/api/views.ts](src/lib/api/views.ts)) walk the spec and assemble component-ready view shapes on demand.
3. **Astro routes** ([src/pages/\[...lang\]/api/latest/\[category\].astro](src/pages/%5B...lang%5D/api/latest/%5Bcategory%5D.astro)) render the pages.

### 1. YAML source specs

Two OpenAPI 3.x spec files are the source of truth for all API data:

- `@hugo-site/data/api/v1/full_spec.yaml` — v1 endpoints
- `@hugo-site/data/api/v2/full_spec.yaml` — v2 endpoints

The `@hugo-site` Vite alias points at the sibling Hugo repo's `data/` folder until a shared source is wired up. Each spec contains `tags` (which map to page categories), `paths` (endpoint definitions), `components/schemas` (reusable data models), and `servers` (region-specific base URLs). The files are imported as raw strings via Vite's `?raw` import and parsed once per build by [`src/lib/api/specParser.ts`](src/lib/api/specParser.ts). 

The parser does not validate the spec structure at runtime — it trusts that the YAML files are valid OpenAPI 3.x, as enforced upstream by OpenAPI linting tools. The parsed result is typed as `OpenAPIV3.Document` from `openapi-types` for compile-time type safety.

Translation overlays for non-English locales live alongside the specs (`translate_tags.{lang}.json`, `translate_actions.{lang}.json`) and are loaded by [`src/lib/api/translationsLoader.ts`](src/lib/api/translationsLoader.ts). 

At build time, Vite's `import.meta.glob` eagerly inlines all matching JSON files into a single object keyed by file path. `getTranslationOverlay(version, lang)` then uses a regex to find the right file for a given `(version, lang)` pair, assembles a bundle of tag and action overlays, and caches it in a `Map<"v1|v2:lang", OverlayBundle>` so the filesystem scan only happens once per pair. English short-circuits to an empty bundle — the spec is the source of truth for English.

### 2. View helpers

[`src/lib/api/viewsBuilder.ts`](src/lib/api/viewsBuilder.ts) is the public surface for pages. It walks the parsed specs directly, resolves `$ref`s on demand, and assembles the `ApiCategory` and `EndpointData` view shapes that components consume. Module-scoped caches memoize the results: a `Map<lang, ApiCategory[]>` for categories and a `Map<${lang}:${catSlug}:${opSlug}, EndpointData>` for individual endpoints.

| View helper | Returns | Work |
|---|---|---|
| `getCategoriesView(lang)` | `ApiCategory[]` for the side-nav | Walks `spec.tags` for both versions, applies the locale's tag overlay, then walks operations to attach stubs (operationId, summary, slug, menu order, version) to their categories. Sorts categories alphabetically by name and operations by menu order |
| `getCategoryViewBySlug(slug, lang)` | `ApiCategory \| undefined` | Convenience over `getCategoriesView` |
| `getEndpointView(catSlug, opSlug, lang)` | `EndpointData \| undefined` for a single operation | Finds the matching `RawOperation` by both slugs, applies the locale's action overlay, merges path-level + operation-level parameters, calls `splitParameters` / `paramsToFields` / `extractRequestBody` / `extractResponses` against the parsed spec, builds curl variants per region with `buildCurlByRegion`, and prepends curl to the SDK examples returned by `getCodeExamplesForOperation` |

The leaf helpers (`schemaToFields`, `extractRequestBody`, `extractResponses`, `paramsToFields`, `buildCurlByRegion`, `buildCurlCommand`, `getRegions`, `getTranslationOverlay`, `translateAction`, `renderMarkdown`) are pure functions that take a parsed spec and operation/schema object.

[`src/lib/api/highlight.ts`](src/lib/api/highlight.ts) runs Shiki syntax highlighting over the resolved `EndpointData` at page render time, mutating the entries in place. Highlighting stays at the page boundary so the cached view shapes don't carry highlighted HTML on first build.

### 3. Page generation (Astro routes)

Two dynamic routes generate the API pages:

**Category landing page** ([`[category].astro`](src/pages/[...lang]/api/latest/[category].astro)) — one page per `(lang, category)`:

1. `getStaticPaths()` calls `getCategoriesView(lang)` for each locale to produce one route per category slug (e.g. `/api/latest/monitors/`).
2. At render time, calls `getCategoriesView(lang)` (side nav) and `getCategoryViewBySlug(slug, lang)` (page content).
3. Renders the category name, description, deprecated alert if applicable, and a TOC list of operation links.
4. Includes an inline script for backward-compat: if `location.hash` matches a known operation slug, it redirects to the per-operation page (covers Hugo-era `/api/latest/<cat>/#<op-slug>` links).

**Per-operation page** ([`[category]/[operation].astro`](src/pages/[...lang]/api/latest/[category]/[operation].astro)) — one page per `(lang, category, operation)`:

1. `getStaticPaths()` walks all categories and their operations to emit one path per `{ lang, category.slug, operation.slug }`.
2. At render time, calls `getEndpointView(catSlug, opSlug, lang)` and `highlightEndpoint(endpoint)`.
3. Renders inside [`ApiLayout.astro`](src/layouts/ApiLayout.astro) with `currentSlug=catSlug` and `currentOperationSlug=opSlug`. A single `<ApiEndpoint>` renders the operation.
4. Page title is `${operation.summary} - ${category.name} - Datadog API`.

A plaintext sibling at [`[category]/[operation].md.ts`](src/pages/[...lang]/api/latest/[category]/[operation].md.ts) emits Markdoc-compatible Markdown at `/api/latest/<cat>/<op>.md`. The static index page is at [`index.astro`](src/pages/[...lang]/api/latest/index.astro), and `/llms.txt` ([`llms.txt.ts`](src/pages/llms.txt.ts)) lists every operation by name and `.md` URL, grouped under their category heading.

### 4. Layout and navigation

[`ApiLayout.astro`](src/layouts/ApiLayout.astro) composes [`BaseLayout.astro`](src/layouts/BaseLayout.astro), which supplies the shared announcement banner, header, and footer placeholders. It then provides the API-specific page shell:

- [`ApiSideNav.astro`](src/components/ApiSideNav/ApiSideNav.astro) — Left sidebar listing all categories; the active category expands to show its operations as links to per-operation pages; the active operation gets an `api-side-nav__operation--active` BEM modifier
- [`RegionSelector`](src/components/RegionSelector/RegionSelector.tsx) — A Preact island that lets users switch between Datadog regions, updating displayed URLs
- [`Breadcrumbs.astro`](src/components/Breadcrumbs/Breadcrumbs.astro) — Breadcrumb navigation
- Theme detection and toggle (inline script reading/writing `localStorage`)

### 5. Endpoint rendering

[`ApiEndpoint.astro`](src/components/ApiEndpoint/ApiEndpoint.astro) receives the JSON-serialized `EndpointData` and renders each endpoint section:

| Section | Component | Type |
|---------|-----------|------|
| Deprecated/unstable alerts | [`ApiStatusAlert.astro`](src/components/ApiStatusAlert/ApiStatusAlert.astro) | Static |
| HTTP method + path | [`ApiMethodBadge.astro`](src/components/ApiMethodBadge/ApiMethodBadge.astro) | Static |
| Parameters (path, query, header) | [`ApiSchemaTable.tsx`](src/components/ApiSchemaTable/ApiSchemaTable.tsx) | Preact island |
| Request body (schema + examples) | [`ApiRequestBodyTabs.astro`](src/components/ApiRequestBodyTabs/ApiRequestBodyTabs.astro) | Astro shell + nested islands |
| Responses (status codes + bodies) | [`ApiResponse.astro`](src/components/ApiResponse/ApiResponse.astro) | Astro shell + nested islands |
| SDK code examples | [`ApiCodeExample.astro`](src/components/ApiCodeExample/ApiCodeExample.astro) | Astro shell + nested islands |

Interactive components (schema expansion, tab switching) use Preact islands via Astro's `client:load` directive, meaning they hydrate on the client while the rest of the page is static HTML.

## Auditing guidelines

To manually audit the Astro API docs against the Hugo API docs, you don't need to review every category page. The pages vary along a few key dimensions, and a representative set covers every rendering path.

### Page inventory

There are **4 static pages**, **~120 dynamic category landing pages**, and **~N per-operation pages** (one per OpenAPI operation across all categories — counts drift as the spec evolves).

**Static pages:**

| Page | Description |
|------|-------------|
| `/api/latest/` | Landing/index page |
| `/api/latest/using-the-api/` | Usage guide |
| `/api/latest/rate-limits/` | Rate limits |
| `/api/latest/scopes/` | OAuth scopes |

**Dynamic pages** are generated from the v1 and v2 OpenAPI specs. Each **category landing page** (`/api/latest/<cat>/`) renders the category name, description, and a TOC linking to its operations. Each **per-operation page** (`/api/latest/<cat>/<op>/`) renders a single endpoint. Categories vary by:

- **Spec version**: v1-only, v2-only, or mixed v1+v2
- **Endpoint status flags**: normal, deprecated (with optional link to newer version), unstable/preview
- **Category-level deprecation**: entire category marked deprecated (may have 0 endpoints)
- **Size**: from 1 endpoint to 90+
- **HTTP methods**: GET, POST, PUT, PATCH, DELETE (each rendered with a colored badge)

### Minimum audit set

Each dynamic category is audited at two levels: the category landing page and one representative operation page. This set covers every rendering variation:

| # | Page | What it covers |
|---|------|----------------|
| 1 | `/api/latest/` | Static index page |
| 2 | `/api/latest/using-the-api/` | Static content page |
| 3 | `/api/latest/rate-limits/` | Static content page |
| 4 | `/api/latest/scopes/` | Static content page |
| 5 | `/api/latest/authentication/` | Category landing — smallest category (1 v1 endpoint) |
| 5 | `/api/latest/authentication/validate-api-key/` | Operation page — v1, single endpoint |
| 6 | `/api/latest/dashboards/` | Category landing — v1-only, medium size (14 ops) |
| 6 | `/api/latest/dashboards/get-a-dashboard/` | Operation page — v1 |
| 7 | `/api/latest/incidents/` | Category landing — v2-only, large (56 ops) |
| 7 | `/api/latest/incidents/create-an-incident/` | Operation page — v2 |
| 8 | `/api/latest/aws-integration/` | Category landing — mixed v1+v2, deprecated + unstable ops |
| 8 | `/api/latest/aws-integration/list-all-aws-integrations-v1/` | Operation page — v1 (slug collision with v2 produces `-v1`/`-v2` suffixes) |
| 8 | `/api/latest/aws-integration/list-all-aws-integrations-v2/` | Operation page — v2 (slug collision case) |
| 9 | `/api/latest/monitors/` | Category landing — mixed v1+v2, deprecated + unstable ops |
| 9 | `/api/latest/monitors/create-a-monitor/` | Operation page — mixed v1+v2 |
| 10 | `/api/latest/dashboard-lists/` | Category landing — category-level deprecated (with endpoints) |
| 10 | `/api/latest/dashboard-lists/get-all-dashboard-lists/` | Operation page — deprecated category |
| 11 | `/api/latest/screenboards/` | Category landing — empty deprecated category (0 endpoints, no op page) |
| 12 | `/api/latest/usage-metering/` | Category landing — large (49 ops), all GET, many deprecated |
| 12 | `/api/latest/usage-metering/get-hourly-usage-for-lambda/` | Operation page — deprecated op |

### What to check within each endpoint

- **Header**: operation name, HTTP method badge, version badge (v1 vs "v2 (latest)")
- **Status alerts**: deprecated banner (with link to newer version if applicable), unstable/preview banner with message
- **Description**: markdown rendered correctly (links, code, lists)
- **Permissions and OAuth scopes**: displayed when present
- **Path/query/header parameters**: names, types, required flags, descriptions, nested objects, enums
- **Request body**: schema table + example JSON, toggle between Model and Example views
- **Responses**: tabs per status code (200, 400, 404, 429, etc.), each with schema + example
- **Code examples**: curl (auto-generated) + SDK tabs (Python, Ruby, Go, Java, TypeScript)
- **Region selector**: URLs update when switching between sites (US1, US3, US5, EU, AP1, AP2, GOV)
