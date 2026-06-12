---
title: Lineage
description: Trace upstream dependencies and downstream consumers across data assets, jobs, dashboards, and applications.
further_reading:
- link: "/data_observability/data_catalog/"
  tag: "Documentation"
  text: "Data Catalog"
- link: "/data_observability/quality_monitoring/"
  tag: "Documentation"
  text: "Quality Monitoring"
- link: "/data_observability/jobs_monitoring/"
  tag: "Documentation"
  text: "Jobs Monitoring"
- link: "https://www.datadoghq.com/blog/data-lineage/"
  tag: "Blog"
  text: "Understanding data lineage"
---

## Overview

Lineage shows how data flows through your stack—from source systems and warehouse tables, through transformations and jobs, to the dashboards and applications that consume it. Use it to trace quality issues to their root cause, assess the blast radius of a failing job or a planned schema change, and route incidents to the right owner.

Datadog builds lineage automatically from metadata collected through your [Quality Monitoring][1] and [Jobs Monitoring][2] integrations (Snowflake, BigQuery, Databricks, dbt, Airflow, Fivetran, Looker, Tableau, and others). Anything in the Data Observability Catalog can appear in the graph.

{{< img src="data_observability/lineage/lineage-overview.png" alt="The Lineage page showing upstream and downstream dependencies for an anchored Snowflake table" style="width:100%;" >}}

To open Lineage, go to {{< ui >}}Data Observability{{< /ui >}} > {{< ui >}}Lineage{{< /ui >}}.

## Select anchor assets

Every lineage view centers on an **anchor**: the single asset whose upstream and downstream neighbors you want to explore. Datadog marks the anchor node with an {{< ui >}}ANCHOR{{< /ui >}} badge.

To set an anchor, use the search bar at the top of the page:

1. Choose an asset type from the {{< ui >}}Any asset{{< /ui >}} dropdown (for example, {{< ui >}}Table{{< /ui >}}, {{< ui >}}Column{{< /ui >}}, {{< ui >}}Dashboard{{< /ui >}}, or {{< ui >}}Job{{< /ui >}}). Leave it set to {{< ui >}}Any asset{{< /ui >}} to search across all types.
2. Enter the asset name. Datadog searches all connected sources in the Data Observability Catalog.
3. Select a result to anchor the graph.

#### One anchor

Search for a single asset by name to make it the anchor for the lineage graph.
{{< img src="data_observability/lineage/anchors-1-search.png" alt="The anchor search bar showing a Select ANCHOR label, an Any asset type dropdown, and a single anchor token for the fct_orders table" style="width:100%;" >}}

The graph centers on the selected anchor and shows its upstream dependencies and downstream consumers.
{{< img src="data_observability/lineage/anchors-1-map.png" alt="The lineage map with one anchor selected" style="width:100%;" >}}

#### Multiple anchors

Add multiple assets to the search bar to compare related lineage paths in the same view.
{{< img src="data_observability/lineage/anchors-2-search.png" alt="The anchor search bar with the Any asset type dropdown and two anchor tokens, fct_orders and int_orders_enriched, joined by an OR operator" style="width:100%;" >}}

Each selected asset is marked with an {{< ui >}}ANCHOR{{< /ui >}} badge, and the graph shows how their upstream and downstream paths connect.
{{< img src="data_observability/lineage/anchors-2-map.png" alt="The lineage map with 2 anchors selected" style="width:100%;" >}}

#### Search query

Use an attribute query, such as `schema:staging`, to select a dynamic set of matching assets.
{{< img src="data_observability/lineage/anchors-n-search.png" alt="The anchor search bar with the asset type dropdown set to Table and a schema:staging attribute query used to match a dynamic set of anchors" style="width:100%;" >}}

The graph marks every matching asset as an anchor so you can inspect lineage for the full query result set.
{{< img src="data_observability/lineage/anchors-n-map.png" alt="The lineage map with many anchors selected via a dynamic query" style="width:100%;" >}}

The graph renders with the anchors in the center and upstream and downstream neighbors expanding to the left and right.

## Navigate the graph

After you set an anchor, the lineage graph renders in the main panel. Upstream dependencies appear to the left; downstream consumers appear to the right. Each node shows the asset's name, type, source, and basic stats such as row or column count where available.

The toolbar on the right of the canvas provides {{< ui >}}zoom in{{< /ui >}}, {{< ui >}}zoom out{{< /ui >}}, {{< ui >}}Reset view{{< /ui >}}, and {{< ui >}}Center anchors{{< /ui >}}.

The time selector in the top-right corner (`1w`, `Past 1 Week`, and so on) sets the window used to evaluate lineage. Datadog derives relationships from query history and job runs within this window: widen it to surface older or less frequent dependencies, narrow it to show only what's active.

## Lineage Controls

The {{< ui >}}Lineage Controls{{< /ui >}} panel on the left configures the shape and contents of the graph.

<div class="alert alert-info">Lineage controls do not apply to anchor assets. Anchors remain visible even when depth, filter, or grouping settings would otherwise hide matching assets.</div>

### Map, List, and Find

Toggle between {{< ui >}}Map{{< /ui >}} (the default graph view) and {{< ui >}}List{{< /ui >}} (a flat, sortable list of every asset in the current slice). Use {{< ui >}}List{{< /ui >}} to export, copy, or scan a large lineage; use {{< ui >}}Map{{< /ui >}} to understand structure visually.

The magnifying-glass icon next to the toggle fits the graph to the viewport.

The {{< ui >}}Find in map{{< /ui >}} search box highlights nodes in the current graph by name. Unlike the top-of-page search, it does not change the anchor—it only locates nodes already on screen.

### Depth

{{< ui >}}Depth{{< /ui >}} controls how many hops of lineage to load on either side of the anchor.

- The left selector sets **upstream depth** (levels of parents).
- The right selector sets **downstream depth** (levels of children).
- Set either to `∞` to load all available hops in that direction.

{{< img src="data_observability/lineage/depth-controls.png" alt="The Depth controls showing upstream and downstream selectors flanking the ANCHOR badge" style="width:40%;" >}}

Increase depth to find a distant root cause or downstream consumer. Decrease depth when the graph is too dense to navigate.

### Filter

The {{< ui >}}Filter{{< /ui >}} section controls which asset types are displayed. For Snowflake, the available types are {{< ui >}}Column{{< /ui >}} and {{< ui >}}Table{{< /ui >}}; BI integrations add dashboards and reports; jobs add tasks and DAGs. The number next to each type shows how many of those assets exist in the current slice.

Filter when the slice contains the right assets but the graph is too noisy. For example, when scoping the blast radius of a column change, uncheck {{< ui >}}Table{{< /ui >}} to remove table-level clutter and leave {{< ui >}}Column{{< /ui >}} checked.

Filtering does not change the anchor or the depth—it only hides nodes from the rendered graph.

### Group by

{{< ui >}}Group by{{< /ui >}} sets the level of aggregation. Available levels depend on the source. For Snowflake, you can group by {{< ui >}}Accounts{{< /ui >}}, {{< ui >}}Databases{{< /ui >}}, {{< ui >}}Schemas{{< /ui >}}, {{< ui >}}Tables{{< /ui >}}, or {{< ui >}}Columns{{< /ui >}}.

Grouping is most useful for zooming out: group by {{< ui >}}Schemas{{< /ui >}} to see how data flows across a warehouse, then drill down to {{< ui >}}Tables{{< /ui >}} or {{< ui >}}Columns{{< /ui >}} after you find the area of interest.

## Common workflows

### Root cause analysis

When a downstream asset—a dashboard, a model, an ML feature—is broken or stale, lineage helps you walk backward to the source.

1. Anchor on the broken asset (a Looker dashboard, a Snowflake table, a dbt model).
2. Set downstream depth to `0` to focus on upstream assets.
3. Group by {{< ui >}}Tables{{< /ui >}} for the broad structure; switch to {{< ui >}}Columns{{< /ui >}} if the issue is at column level.
4. Step backward through upstream nodes. Failures, freshness anomalies, and schema changes flagged by Quality Monitoring or Jobs Monitoring appear as status indicators on the graph.
5. Open a flagged node to jump to its quality monitors, recent job runs, or schema history.

### Impact analysis (blast radius)

Before changing or dropping a column, table, or model, use lineage to see what depends on it.

1. Anchor on the asset you plan to change.
2. Set downstream depth to `∞` and upstream depth to `0`.
3. Filter to the asset types you care about—for example, leave dashboards and reports visible to identify affected BI consumers.
4. Switch to {{< ui >}}List{{< /ui >}} view to export the full list of affected assets or share it with the owning teams.

{{< img src="data_observability/lineage/impact-analysis-list-view.png" alt="The List view showing every downstream asset that depends on a given Snowflake table, with type and source columns" style="width:100%;" >}}

### Tracing a column end-to-end

Most integrated sources support column-level lineage.

1. In the search bar, change the asset type to {{< ui >}}Column{{< /ui >}} and search for the column to trace.
2. Anchor on the result.
3. Group by {{< ui >}}Columns{{< /ui >}} to keep the graph at column granularity.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/quality_monitoring/
[2]: /data_observability/jobs_monitoring/
