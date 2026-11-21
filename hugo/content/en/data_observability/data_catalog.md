---
title: Data Catalog
description: 'Browse and search a centralized inventory of data assets, automatically populated from connected integrations.'
further_reading:
    - link: '/data_observability/'
      tag: 'Documentation'
      text: 'Data Observability Overview'
    - link: '/data_observability/quality_monitoring/'
      tag: 'Documentation'
      text: 'Quality Monitoring'
    - link: '/data_observability/lineage/'
      tag: 'Documentation'
      text: 'Lineage'
    - link: '/data_observability/jobs_monitoring/'
      tag: 'Documentation'
      text: 'Jobs Monitoring'
    - link: '/data_observability/cicd/'
      tag: 'Documentation'
      text: 'CI/CD'
    - link: "https://www.datadoghq.com/blog/data-pipeline-monitoring/"
      tag: "Blog"
      text: "Data pipeline monitoring 101: Tracking health and performance across the data stack"
---

The Data Catalog is a searchable, centralized inventory of data assets (tables, schemas, databases, and pipeline jobs) automatically populated from your connected integrations.
The catalog stays in sync with [supported data sources](/data_observability/quality_monitoring/#supported-data-sources) so your team always has an up-to-date view of what exists, who owns it, and how healthy it is.

## Browsing the catalog

When you open the catalog at [/data-obs/catalog](https://app.datadoghq.com/data-obs/catalog), you see a list of all assets across your connected integrations. Each asset card displays:

- **Asset type**: table, schema, dashboard, job, etc.
- **Name** and path (for example, `account > database > schema`)
- **Integration and account**: the source system and account it was synced from
- **Description**: pulled from the source system if available
- **Links to the source system**: direct references back to the origin platform so you can navigate from the catalog to the source in one click
- **Tags**: `key:value` metadata pairs pulled from the source system if available
- **Monitor Status**: displays the state of any active [Data Observability monitors](/data_observability/quality_monitoring/) on the asset
- **Lineage**: upstream and downstream dependencies, where supported by the integration. To explore lineage across assets, see [Lineage][1].

Use the left sidebar to filter assets by type: {{< ui >}}All assets{{< /ui >}}, {{< ui >}}Databases{{< /ui >}}, {{< ui >}}Schemas{{< /ui >}}, or {{< ui >}}Tables{{< /ui >}}. Connected integrations (such as Snowflake, dbt, and BigQuery) are also listed individually in the sidebar.

## Search & filtering

The search bar at the top of the catalog supports both free-text and field-scoped queries.

**Full-text search** matches across all asset fields. Typing a term and selecting {{< ui >}}Search all fields for...{{< /ui >}} returns any asset containing that value, anywhere in its metadata. Only the Catalog supports full-text search. Other Data Observability views like Monitors and Lineage do not.

**Tag search** lets you target a specific attribute using `key:value` syntax. The available fields depend on which integrations you have connected. As you type, the search dropdown suggests the fields available in your environment. Any tag key on your assets can also be used as a search field. For example, `data_owner:TS-OPS-ANALYTICS` filters to assets tagged with that owner.

Wildcards and unions are also supported:

- **Wildcard**: `name:dim_zendesk*` matches any asset whose name starts with `dim_zendesk`
- **Union**: `data_owner:(team-a OR team-b)` matches assets owned by either team
- **Intersection**: `dim_zendesk AND data_owner:TS-OPS-ANALYTICS`

Recent searches are saved and surfaced in the dropdown for reuse.

### Filter with facets

Use the facets panel next to the results to filter the list without typing a query. Select one or more values in a facet to narrow the results:

- **Platform**: The integration the asset comes from. This facet appears when you haven't selected an integration.
- **Asset type**: The kind of asset, shown with a readable name such as {{< ui >}}Table{{< /ui >}} or {{< ui >}}Metabase question{{< /ui >}}.
- **Attributes**: Facets such as {{< ui >}}Account{{< /ui >}}, {{< ui >}}Database{{< /ui >}}, and {{< ui >}}Schema{{< /ui >}}. The attributes listed depend on the integrations you have connected.
- **Tags**: Tag keys, grouped by source. Tags added in Datadog are listed under {{< ui >}}Custom tags{{< /ui >}}.

## Asset pages

Select an asset to open its page. The tabs on an asset page depend on the asset type. For example, a table page has {{< ui >}}Summary{{< /ui >}}, {{< ui >}}Monitors{{< /ui >}}, {{< ui >}}Lineage{{< /ui >}}, and {{< ui >}}Schema Changes{{< /ui >}} tabs. It also has a {{< ui >}}dbt{{< /ui >}} tab when a dbt model builds the table. The {{< ui >}}Summary{{< /ui >}} tab of a table page also lists the table's columns.

### Schema change and query tabs

- **Schema Changes**: The [schema changes][2] Datadog detected on the asset. Database, schema, table, and column pages have this tab, and so do Snowflake and BigQuery account pages. The tab is disabled for an asset whose account isn't configured in Data Observability.
- **Queries**: The top queries that read from or write to the asset, on separate {{< ui >}}Reads{{< /ui >}} and {{< ui >}}Writes{{< /ui >}} tabs. Snowflake, BigQuery, and Redshift table and column pages have this tab.

### Navigation tree

The sidebar on an asset page shows the asset's integration as a tree, with levels such as account, database, schema, and table. Select a node in the tree to open its page. To close or open the sidebar, click {{< ui >}}Hide Search{{< /ui >}} or {{< ui >}}Show Search{{< /ui >}} next to the tabs. To resize the sidebar, drag its right edge.

Each node that isn't expanded shows:

- **Monitor count**: The number of monitors on the node or on anything beneath it. Alerting monitors appear in a separate red count, and the other monitors appear in a gray count. Hover over the counts to see the total and the number alerting.
- **Lineage indicator**: An arrow icon, shown when the asset has downstream dependencies.

When you expand a node, its children show these details instead.

By default, the tree uses recommended sorting. Nodes with more monitors come first, then nodes with more downstream dependencies, and nodes that are still tied are sorted by name. To sort the tree alphabetically, click the sort button next to the tree's search box. The sort button is disabled while you search the tree.

### Delete an asset

To remove an asset from the catalog:

1. On the asset's page, click the vertical three-dot menu in the header.
2. Select {{< ui >}}Delete asset{{< /ui >}}.
3. Click {{< ui >}}Delete{{< /ui >}} to confirm.

Deleting an asset removes it and all of its descendants from Data Observability, and can take a few minutes. If Datadog still ingests the asset from its integration, it can reappear after the next sync. Deleting an asset requires the `Data Observability Catalog Write` permission.

[1]: /data_observability/lineage/
[2]: /monitors/types/data_observability/#browse-detected-schema-changes

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
