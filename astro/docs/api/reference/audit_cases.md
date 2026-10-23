# API docs audit cases

To manually audit the Astro API docs against the Hugo API docs, you don't need to review every category page. The pages vary along a few key dimensions, and a representative set covers every rendering path.

## Page inventory

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

## Minimum audit set

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

## What to check within each endpoint

- **Header**: operation name, HTTP method badge, version badge (v1 vs "v2 (latest)")
- **Status alerts**: deprecated banner (with link to newer version if applicable), unstable/preview banner with message
- **Description**: markdown rendered correctly (links, code, lists)
- **Permissions and OAuth scopes**: displayed when present
- **Path/query/header parameters**: names, types, required flags, descriptions, nested objects, enums
- **Request body**: schema table + example JSON, toggle between Model and Example views
- **Responses**: tabs per status code (200, 400, 404, 429, etc.), each with schema + example
- **Code examples**: curl (auto-generated) + SDK tabs (Python, Ruby, Go, Java, TypeScript)
- **Region selector**: URLs update when switching between sites (US1, US3, US5, EU, AP1, AP2, GOV)
