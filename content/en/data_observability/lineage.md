---
title: Data Lineage
description: "Trace upstream dependencies and downstream consumers across data assets, jobs, dashboards, and applications."
aliases:
  - /data_observability/lineage/
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

Data Lineage shows how data flows through your stack—from source systems and warehouse tables, through transformations and jobs, to the dashboards and applications that consume it. Use it to trace quality issues to their root cause, assess the blast radius of a failing job or a planned schema change, and route incidents to the right owner.

Datadog builds lineage automatically from metadata collected through your [Quality Monitoring][1] and [Jobs Monitoring][2] integrations (Snowflake, BigQuery, Databricks, dbt, Airflow, Fivetran, Looker, Tableau, and others). Anything in the Data Observability Catalog can appear in the graph.

To open Data Lineage, go to **Data Observability > Lineage**.

## Select anchor assets

Every lineage view centers on an **anchor**: the single asset whose upstream and downstream neighbors you want to explore. Datadog marks the anchor node with an `ANCHOR` badge.

To set an anchor, use the search bar at the top of the page:

1. Choose an asset type from the **Any asset** dropdown (for example, *Table*, *Column*, *Dashboard*, or *Job*). Leave it set to **Any asset** to search across all types.
2. Enter the asset name. Datadog searches all connected sources in the Data Observability Catalog.
3. Select a result to anchor the graph.

The graph renders with the anchors in the center and upstream and downstream neighbors expanding to the left and right.

## Navigate the graph

After you set an anchor, the lineage graph renders in the main panel. Upstream dependencies appear to the left; downstream consumers appear to the right. Each node shows the asset's name, type, source, and basic stats such as row or column count where available.

The toolbar on the right of the canvas provides **zoom in**, **zoom out**, **Reset view**, and **Center anchors**.

The time selector in the top-right corner (`1w`, `Past 1 Week`, and so on) sets the window used to evaluate lineage. Datadog derives relationships from query history and job runs within this window: widen it to surface older or less frequent dependencies, narrow it to show only what's active.

## Lineage Controls

The **Lineage Controls** panel on the left configures the shape and contents of the graph.

### Map, List, and Find

Toggle between **Map** (the default graph view) and **List** (a flat, sortable list of every asset in the current slice). Use **List** to export, copy, or scan a large lineage; use **Map** to understand structure visually.

The magnifying-glass icon next to the toggle fits the graph to the viewport.

The **Find in map** search box highlights nodes in the current graph by name. Unlike the top-of-page search, it does not change the anchor—it only locates nodes already on screen.

### Depth

**Depth** controls how many hops of lineage to load on either side of the anchor.

- The left selector sets **upstream depth** (levels of parents).
- The right selector sets **downstream depth** (levels of children).
- Set either to `∞` to load all available hops in that direction.

Increase depth to find a distant root cause or downstream consumer. Decrease depth when the graph is too dense to navigate.

### Filter

The **Filter** section controls which asset types are displayed. For Snowflake, the available types are **Column** and **Table**; BI integrations add dashboards and reports; jobs add tasks and DAGs. The number next to each type shows how many of those assets exist in the current slice.

Filter when the slice contains the right assets but the graph is too noisy. For example, when scoping the blast radius of a column change, uncheck **Table** to remove table-level clutter and leave **Column** checked.

Filtering does not change the anchor or the depth—it only hides nodes from the rendered graph.

### Group by

**Group by** sets the level of aggregation. Available levels depend on the source. For Snowflake, you can group by **Accounts**, **Databases**, **Schemas**, **Tables**, or **Columns**.

Grouping is most useful for zooming out: group by **Schemas** to see how data flows across a warehouse, then drill down to **Tables** or **Columns** after you find the area of interest.

## Common workflows

### Root cause analysis

When a downstream asset—a dashboard, a model, an ML feature—is broken or stale, lineage helps you walk backward to the source.

1. Anchor on the broken asset (a Looker dashboard, a Snowflake table, a dbt model).
2. Set downstream depth to `0` to focus on upstream assets.
3. Group by **Tables** for the broad structure; switch to **Columns** if the issue is at column level.
4. Step backward through upstream nodes. Failures, freshness anomalies, and schema changes flagged by Quality Monitoring or Jobs Monitoring appear as status indicators on the graph.
5. Open a flagged node to jump to its quality monitors, recent job runs, or schema history.

### Impact analysis (blast radius)

Before changing or dropping a column, table, or model, use lineage to see what depends on it.

1. Anchor on the asset you plan to change.
2. Set downstream depth to `∞` and upstream depth to `0`.
3. Filter to the asset types you care about—for example, leave dashboards and reports visible to identify affected BI consumers.
4. Switch to **List** view to export the full list of affected assets or share it with the owning teams.

### Tracing a column end-to-end

Most integrated sources support column-level lineage.

1. In the search bar, change the asset type to **Column** and search for the column to trace.
2. Anchor on the result.
3. Group by **Columns** to keep the graph at column granularity.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/quality_monitoring/
[2]: /data_observability/jobs_monitoring/
