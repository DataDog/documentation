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

Each component has a dedicated page showing its properties and visual permutations. After starting the dev server, browse them at [http://localhost:4321/docs/components/](http://localhost:4321/docs/components/).

## Other commands

| Command              | Description                          |
|----------------------|--------------------------------------|
| `npm run build`      | Production build to `dist/`          |
| `npm run preview`    | Preview the production build locally |
| `npm run test`       | Run unit tests (Vitest)              |
| `npm run test:browser` | Run browser tests (Playwright)     |

## How API docs are rendered from YAML

The API reference pages are generated at build time from OpenAPI spec files through a multi-stage pipeline. Here is the step-by-step process:

### 1. YAML source specs

Two OpenAPI 3.x spec files are the source of truth for all API data:

- [`src/data/api/v1/full_spec.yaml`](src/data/api/v1/full_spec.yaml) — v1 endpoints
- [`src/data/api/v2/full_spec.yaml`](src/data/api/v2/full_spec.yaml) — v2 endpoints

Each spec contains `tags` (which map to page categories), `paths` (endpoint definitions), `components/schemas` (reusable data models), and `servers` (region-specific base URLs). These files are imported at build time as raw strings using Vite's `?raw` import syntax, so no runtime file I/O is needed.

### 2. Data extraction and transformation

A set of TypeScript modules in [`src/data/api/`](src/data/api/) parse and transform the raw YAML into structured data:

1. **[`index.ts`](src/data/api/index.ts)** — Parses both specs with the `yaml` package, validates structure with Zod schemas, and extracts **categories** from OpenAPI `tags`. Each category gets a `name`, `slug`, rendered HTML `description`, and a list of operations. Results are cached after the first call. Exports `getApiCategories()` and `getCategoryBySlug()`.

2. **[`endpoints.ts`](src/data/api/endpoints.ts)** — The core transformation module. For each operation in a category, it extracts:
   - Core fields (operationId, summary, method, path, version, deprecated/unstable status)
   - **Parameters** — merges path-level and operation-level params, splits by location (path/query/header), converts to `SchemaField[]` via `resolver.ts`
   - **Request body** — resolves `$ref` references, extracts JSON schema, collects or generates examples
   - **Responses** — per status code, resolves schema and examples
   - **Permissions and OAuth scopes** — from `x-permission` and `security` extensions
   - **Region URLs** — builds per-region API base URLs from the spec's `servers` block
   - **SDK code examples** — loaded from disk via `examples.ts`
   - **Curl commands** — generated via `curl.ts`

   Exports `getEndpointsForCategory(slug)` returning `EndpointData[]`.

3. **[`resolver.ts`](src/data/api/resolver.ts)** — Handles `$ref` resolution (following JSON Pointer paths through the spec) and recursive schema-to-field conversion. Supports `oneOf`/`anyOf` unions, `allOf` merging, nested objects, arrays, enums, and circular reference protection (with a `visited` set and max depth of 10).

4. **[`markdown.ts`](src/data/api/markdown.ts)** — Wraps the `marked` library to convert Markdown descriptions (from tags and operations) into HTML at build time.

5. **[`regions.ts`](src/data/api/regions.ts)** — Reads the `servers[0].variables.site.enum` from the spec to discover supported Datadog regions (us1, us3, us5, eu, ap1, ap2, gov) and builds region-specific API URLs.

6. **[`examples.ts`](src/data/api/examples.ts)** — Reads `CodeExamples.json` manifests and loads SDK example files (`.py`, `.rb`, `.go`, `.java`, `.ts`) from the [`src/data/api/v1/examples/`](src/data/api/v1/examples/) and [`src/data/api/v2/examples/`](src/data/api/v2/examples/) directories.

7. **[`curl.ts`](src/data/api/curl.ts)** — Generates curl command snippets with auth headers, path parameter interpolation, and request body payloads.

8. **[`highlight.ts`](src/data/api/highlight.ts)** — Runs Shiki syntax highlighting over all code examples and JSON response/request bodies, producing pre-rendered HTML with Datadog light and dark themes.

### 3. Page generation (Astro routes)

The dynamic route [`src/pages/api/latest/[category].astro`](src/pages/api/latest/[category].astro) generates one page per API category:

1. `getStaticPaths()` calls `getApiCategories()` to produce one route per category slug (e.g., `/api/latest/monitors/`, `/api/latest/dashboards/`).
2. At render time, the page calls `getEndpointsForCategory(slug)` to get the full `EndpointData[]` for that category.
3. `highlightEndpoints(endpoints)` runs Shiki highlighting over all code examples and response bodies.
4. The page renders inside [`ApiLayout.astro`](src/layouts/ApiLayout.astro), passing all categories (for side navigation) and the current slug.
5. Each endpoint is rendered as an `<ApiEndpoint data={JSON.stringify(ep)}>` component, with the entire `EndpointData` object serialized as a JSON string prop.

An index page at [`src/pages/api/latest/index.astro`](src/pages/api/latest/index.astro) serves as the landing page.

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
| HTTP method + path | [`HttpMethodBadge.astro`](src/components/HttpMethodBadge/HttpMethodBadge.astro) | Static |
| Parameters (path, query, header) | [`SchemaTable.tsx`](src/components/SchemaTable/SchemaTable.tsx) | Preact island |
| Request body (schema + examples) | [`RequestBodyTabs.tsx`](src/components/RequestBodyTabs/RequestBodyTabs.tsx) | Preact island |
| Responses (status codes + bodies) | [`ApiResponse.tsx`](src/components/ApiResponse/ApiResponse.tsx) | Preact island |
| SDK code examples | [`ApiCodeExample.tsx`](src/components/ApiCodeExample/ApiCodeExample.tsx) | Preact island |

Interactive components (schema expansion, tab switching) use Preact islands via Astro's `client:load` directive, meaning they hydrate on the client while the rest of the page is static HTML.

### Data flow diagram

```
v1/full_spec.yaml ──┐
                     ├─ Vite ?raw import → yaml.parse()
v2/full_spec.yaml ──┘         │
                               ├─→ index.ts ──→ ApiCategory[] (names, slugs, operations)
                               │
                               └─→ endpoints.ts ──→ EndpointData[]
                                       │
                          ┌────────────┼────────────────┐
                          │            │                 │
                    resolver.ts   examples.ts        curl.ts
                  ($ref, schemas)  (SDK snippets)  (curl commands)
                          │            │                 │
                          └────────────┼────────────────┘
                                       │
                                 highlight.ts (Shiki syntax highlighting)
                                       │
                                       ▼
                          [category].astro (getStaticPaths)
                                       │
                                 ApiLayout.astro
                                       │
                                 BaseLayout.astro + ApiSideNav
                                                │
                                         ApiEndpoint ×N
                                  ┌──────────┼──────────┐
                            SchemaTable  ApiResponse  ApiCodeExample
                           RequestBodyTabs
                          (Preact islands, client:load)
```

## Auditing guidelines

To manually audit the Astro API docs against the Hugo API docs, you don't need to review all 124 category pages. The pages vary along a few key dimensions, and a representative set covers every rendering path.

### Page inventory

There are **4 static pages** and **124 dynamic category pages** (one per OpenAPI tag).

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
