---
title: Data Catalog
description: "Browse and search a centralized inventory of data assets, automatically populated from connected integrations."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/data_observability/quality_monitoring/'
    tag: 'Documentation'
    text: 'Quality Monitoring'
  - link: '/data_observability/jobs_monitoring/'
    tag: 'Documentation'
    text: 'Jobs Monitoring'
---

The Data Catalog is a searchable, centralized inventory of data assets — tables, schemas, databases, and pipeline jobs — automatically populated from your connected integrations.
The catalog stays in sync with [supported data sources](/data_observability/quality_monitoring/#supported-data-sources) so your team always has an up-to-date view of what exists, who owns it, and how healthy it is.

## Browsing the Catalog

When you open the catalog at [/data-obs/catalog](https://app.datadoghq.com/data-obs/catalog), you see a list of all assets across your connected integrations. Each asset card displays:

- **Asset type** — table, schema, dashboard, job, etc
- **Name** and path (e.g. `account > database > schema`)
- **Integration and account** — the source system and account it was synced from
- **Description** — pulled from the source system if available
- **Links to the source system** — direct references back to the origin platform so you can navigate from the catalog to the source in one click
- **Tags** — key:value metadata pairs pulled from the source system if available
- **Monitor Status** — displays the state of any active [Data Quality Monitors](/data_observability/quality_monitoring/) on the asset
- **Lineage** — upstream and downstream dependencies, where supported by the integration

Use the left sidebar to filter assets by type: **All assets**, **Databases**, **Schemas**, or **Tables**. Connected integrations (such as Snowflake, dbt, and BigQuery) are also listed individually in the sidebar, letting you scope the catalog to a single source system.

## Search & Filtering

The search bar at the top of the catalog supports both free-text and field-scoped queries.

**Full-text search** matches across all asset fields — name, description, tags, and more. Typing a term and selecting "Search all fields for..." returns any asset containing that value anywhere in its metadata. Only the Catalog supports full-text search. Other Data Observability views like Monitors and Lineage do not.

**Tag search** lets you target a specific attribute using `key:value` syntax. The available fields depend on which integrations you have connected — as you type, the search dropdown suggests the fields available in your environment. Any tag key on your assets can also be used as a search field — for example, `data_owner:TS-OPS-ANALYTICS` filters to assets tagged with that owner.

**Wildcards and unions** are also supported:
- Wildcard: `name:dim_zendesk*` matches any asset whose name starts with `dim_zendesk`
- Union: `data_owner:(team-a OR team-b)` matches assets owned by either team
- Intersection: `dim_zendesk AND data_owner:TS-OPS-ANALYTICS`

Recent searches are saved and surfaced in the dropdown for quick reuse.
