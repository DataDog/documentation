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

The API reference pages are generated at build time. The pipeline has three stages: **the spec parser** loads the OpenAPI YAML into a JS object once per build, **memoized view helpers** walk the spec and assemble component-ready view shapes on demand, and **Astro routes** render the pages.

### 1. YAML source specs

Two OpenAPI 3.x spec files are the source of truth for all API data:

- `@hugo-site/data/api/v1/full_spec.yaml` — v1 endpoints
- `@hugo-site/data/api/v2/full_spec.yaml` — v2 endpoints

The `@hugo-site` Vite alias points at the sibling Hugo repo's `data/` folder until a shared source is wired up. Each spec contains `tags` (which map to page categories), `paths` (endpoint definitions), `components/schemas` (reusable data models), and `servers` (region-specific base URLs). The files are imported as raw strings via Vite's `?raw` import and parsed once per build by [`src/data/api/spec.ts`](src/data/api/spec.ts).

Translation overlays for non-English locales live alongside the specs (`translate_tags.{lang}.json`, `translate_actions.{lang}.json`) and are loaded by [`src/data/api/translations.ts`](src/data/api/translations.ts).

### 2. View helpers

[`src/data/api/views.ts`](src/data/api/views.ts) is the public surface for pages. It walks the parsed specs directly, resolves `$ref`s on demand, and assembles the `ApiCategory` and `EndpointData` view shapes that components consume. Module-scoped caches memoize the results: a `Map<lang, ApiCategory[]>` for categories and a `Map<${lang}:${slug}, EndpointData[]>` for endpoints.

| View helper | Returns | Work |
|---|---|---|
| `getCategoriesView(lang)` | `ApiCategory[]` for the side-nav | Walks `spec.tags` for both versions, applies the locale's tag overlay, then walks operations to attach stubs (operationId, summary, slug, menu order, version) to their categories. Sorts categories alphabetically by name and operations by menu order |
| `getCategoryViewBySlug(slug, lang)` | `ApiCategory \| undefined` | Convenience over `getCategoriesView` |
| `getEndpointsView(slug, lang)` | `EndpointData[]` for the rendered endpoints | For each matching operation: applies the locale's action overlay, merges path-level + operation-level parameters, calls `splitParameters` / `paramsToFields` / `extractRequestBody` / `extractResponses` against the parsed spec, builds curl variants per region with `buildCurlByRegion`, and prepends curl to the SDK examples returned by `getCodeExamplesForOperation` |

The leaf helpers (`schemaToFields`, `extractRequestBody`, `extractResponses`, `paramsToFields`, `buildCurlByRegion`, `generateCurl`, `getRegions`, `getOverlay`, `translateAction`, `renderMarkdown`) are pure functions that take a parsed spec and operation/schema object.

[`src/data/api/highlight.ts`](src/data/api/highlight.ts) runs Shiki syntax highlighting over the resolved `EndpointData` at page render time, mutating the entries in place. Highlighting stays at the page boundary so the cached view shapes don't carry highlighted HTML on first build.

### 3. Page generation (Astro routes)

The dynamic route [`src/pages/[...lang]/api/latest/[category].astro`](src/pages/[...lang]/api/latest/[category].astro) generates one page per `(lang, category)` combination:

1. `getStaticPaths()` calls `getCategoriesView(lang)` for each locale to produce one route per category slug (e.g. `/api/latest/monitors/`, `/ja/api/latest/monitors/`).
2. At render time, the page calls `getCategoriesView(lang)` (for the side nav), `getCategoryViewBySlug(slug, lang)` (for the page header), and `getEndpointsView(slug, lang)` (for the rendered endpoints).
3. `highlightEndpoints(endpoints)` runs Shiki highlighting over all code examples and JSON request/response bodies, mutating the resolved data in place.
4. The page renders inside [`ApiLayout.astro`](src/layouts/ApiLayout.astro), passing all categories (for side navigation) and the current slug.
5. Each endpoint is rendered as `<ApiEndpoint data={JSON.stringify(ep)}>`, with the assembled `EndpointData` object serialized as a JSON string prop.

A plaintext sibling route at [`[category].md.ts`](src/pages/[...lang]/api/latest/[category].md.ts) reuses the same view helpers to emit Markdoc-compatible Markdown at `/api/latest/<slug>.md`. The static index page is at [`index.astro`](src/pages/[...lang]/api/latest/index.astro), and `/llms.txt` ([`llms.txt.ts`](src/pages/llms.txt.ts)) lists every category by name and `.md` URL.

### 4. Layout and navigation

[`ApiLayout.astro`](src/layouts/ApiLayout.astro) composes [`BaseLayout.astro`](src/layouts/BaseLayout.astro), which supplies the shared announcement banner, header, and footer placeholders. It then provides the API-specific page shell:

- [`ApiSideNav.astro`](src/components/ApiSideNav/ApiSideNav.astro) — Left sidebar listing all categories; the active category expands to show its operations as anchor links
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

### Data flow diagram

```
v1/full_spec.yaml ──┐
                     ├─ Vite ?raw import → spec.ts (yaml.parse, cached per build)
v2/full_spec.yaml ──┘         │
translate_*.{lang}.json ──────┤
                               │
                               ▼
              ┌─── views.ts (memoized, build-time) ──────┐
              │                                           │
              │   getCategoriesView(lang) → ApiCategory[] │
              │     cache: Map<lang, ApiCategory[]>       │
              │                                           │
              │   getEndpointsView(slug, lang)            │
              │     cache: Map<`${lang}:${slug}`,         │
              │              EndpointData[]>              │
              │     ↓ walk spec + resolve refs            │
              │   EndpointData[] (SchemaField trees,      │
              │     curl variants, request/response data) │
              └──────────────────┬────────────────────────┘
                                 │
                          highlight.ts (Shiki syntax highlighting)
                                 │
                                 ▼
                  [category].astro / [category].md.ts
                                 │
                          ApiLayout / BaseLayout
                                 │
                          ApiSideNav + ApiEndpoint × N
                          ┌──────────┼──────────┐
                ApiSchemaTable  ApiResponse  ApiCodeExample
                ApiRequestBodyTabs
                  (Preact islands, client:load)
```

## Auditing guidelines

To manually audit the Astro API docs against the Hugo API docs, you don't need to review every category page. The pages vary along a few key dimensions, and a representative set covers every rendering path.

### Page inventory

There are **4 static pages** and **~120 dynamic category pages** (one per OpenAPI tag — count drifts as the spec evolves).

**Static pages:**

| Page | Description |
|------|-------------|
| `/api/latest/` | Landing/index page |
| `/api/latest/using-the-api/` | Usage guide |
| `/api/latest/rate-limits/` | Rate limits |
| `/api/latest/scopes/` | OAuth scopes |

**Dynamic category pages** are generated from the v1 and v2 OpenAPI specs. Each category page renders all of its endpoints on a single page. Categories vary by:

- **Spec version**: v1-only, v2-only, or mixed v1+v2
- **Endpoint status flags**: normal, deprecated (with optional link to newer version), unstable/preview
- **Category-level deprecation**: entire category marked deprecated (may have 0 endpoints)
- **Size**: from 1 endpoint to 90+
- **HTTP methods**: GET, POST, PUT, PATCH, DELETE (each rendered with a colored badge)

### Minimum audit set (12 pages)

This set covers every rendering variation:

| # | Page | What it covers |
|---|------|----------------|
| 1 | `/api/latest/` | Static index page |
| 2 | `/api/latest/using-the-api/` | Static content page |
| 3 | `/api/latest/rate-limits/` | Static content page |
| 4 | `/api/latest/scopes/` | Static content page |
| 5 | `/api/latest/authentication/` | Smallest category (1 v1 endpoint) |
| 6 | `/api/latest/dashboards/` | v1-only, medium size (14 ops) |
| 7 | `/api/latest/incidents/` | v2-only, large (56 ops) |
| 8 | `/api/latest/aws-integration/` | Mixed v1+v2, has deprecated + unstable ops |
| 9 | `/api/latest/monitors/` | Mixed v1+v2, has deprecated + unstable ops |
| 10 | `/api/latest/dashboard-lists/` | Category-level deprecated (with endpoints) |
| 11 | `/api/latest/screenboards/` | Empty deprecated category (0 endpoints) |
| 12 | `/api/latest/usage-metering/` | Large (49 ops), all GET, many deprecated |

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
