---
title: Understanding End-to-End Lineage
description: "Learn how Datadog Data Observability builds lineage across ingestion, transformation, and BI tools to help you trace data issues and assess downstream impact."
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

## Overview

Datadog Data Observability automatically builds a map of how data flows through your stack—from ingestion sources through warehouse tables and transformation jobs to the dashboards your teams rely on. This map is called your **lineage graph**.

Lineage is assembled from the integrations you connect. No manual mapping is required.

Use lineage to answer questions like:
- Which dashboards are consuming this table?
- Where did this column's values originally come from?
- If this table has a quality issue, what else is affected downstream?
- Which job last wrote to this dataset?

## What lineage connects

The lineage graph covers your entire data stack, left to right from upstream to downstream:

**[Ingestion sources][14]** (Fivetran) → **[Warehouses and lakes][15]** (Snowflake, BigQuery, Databricks, Redshift) → **[Transformation jobs][16]** (dbt, Airflow, Spark, Glue) → **[BI tools][17]** (Looker, Tableau, Power BI, Metabase, Sigma)

You can enable any combination of integrations. Datadog merges lineage from all of them into one graph.

## How lineage is generated

### Warehouse tables

When you connect a data warehouse, Datadog analyzes your SQL query history to understand how tables and views are built from one another. It reads statements your warehouse has already executed—no query interception required.

Datadog tracks relationships at two levels:

- **Table-level**: which tables feed into which other tables
- **Column-level**: which specific columns flow into which other columns

Column-level lineage lets you follow a single field from its raw source through every transformation and into the dashboards that display it. The graph shows two types of column relationships:

- **Direct**: the source column's values appear in the output column
- **Filter**: the source column filters rows in a query but its values don't appear in the output

The lineage graph displays direct relationships by default. Filter relationships are tracked but not shown unless you specifically look for them.

**Lineage that ages out**: Each lineage connection Datadog tracks has a 60-day lifetime. As long as the underlying source keeps running—queries executing, BI crawlers syncing, OpenLineage events flowing—connections are refreshed automatically and stay current. If a source goes quiet (a view stops being recreated, a dbt model is removed, a Fivetran connector is paused), those connections are not refreshed and disappear after 60 days of inactivity. This means the lineage graph reflects what has been active in your stack recently, not a historical snapshot that can accumulate stale connections indefinitely.

### dbt

When you connect [dbt Cloud or dbt Core][1], Datadog imports your model dependency graph, linking each dbt model to the upstream source tables it reads and the downstream warehouse table it produces.

For dbt Cloud, Datadog fetches this automatically after each job run. For dbt Core, run your jobs with the `dbt-ol` wrapper:

```bash
dbt-ol run --consume-structured-logs --openlineage-dbt-job-name <YOUR_DBT_JOB_NAME>
```

### Airflow and other orchestration jobs

When you connect [Airflow][2] using the OpenLineage provider, Datadog captures which datasets each DAG task reads and writes. This links your Airflow jobs to the tables they produce and consume so that a failing task and its affected tables appear together in lineage.

Datadog also supports [Spark][3], [AWS Glue][4], [AWS EMR][5], and [GCP Dataproc][6]. For in-house pipelines without a native integration, you can send lineage events directly using the [OpenLineage standard][7].

### Fivetran

When you connect [Fivetran][8], Datadog reads your connector configurations to show which source systems feed which destination tables. Fivetran connectors appear at the far left of your lineage graph as the starting point of your data. Datadog refreshes this metadata every 60 minutes.

### BI tools

When you connect a BI tool, Datadog maps your reports and dashboards back to the warehouse tables and columns they read. BI assets appear at the far right of the lineage graph.

| Tool | What appears in lineage |
|------|------------------------|
| [Looker][9] | Explores, views, dashboards, Looks |
| [Tableau][10] | Fields, worksheets, dashboards, workbooks, published data sources |
| [Power BI][11] | Reports, dashboards, datasets |
| [Metabase][12] | Questions, collections, dashboards |
| [Sigma][13] | Workbooks, worksheets |

Each BI integration refreshes every 60 minutes. Initial syncs may take a few hours for large deployments.

## Exploring the lineage graph

### Opening lineage

You can access lineage from two places:

- **The Catalog**: Open any table, column, dbt model, or BI asset and select the **Lineage** tab. The selected asset becomes the anchor—the center of the graph—and lineage expands outward from there.
- **Jobs Monitoring**: Open any job run to see which datasets it read and wrote. Click any dataset to open it in the Catalog with its lineage.

### Graph view and table view

The lineage view has two display modes:

**Graph view** shows your lineage as a visual map with nodes and connecting arrows. Upstream assets appear to the left of the anchor; downstream assets appear to the right. Click any node to open a side panel with additional details—recent runs, monitor status, and a link to the asset's full page.

**Table view** shows the same information as a list with two tabs—**Upstream** and **Downstream**—each listing assets grouped by how many hops they are from the anchor. Use this view when you have a large number of connected assets that would be hard to navigate visually.

### Adjusting scope

The **scope controls** let you change what level of detail the graph shows for each integration. For example, for Snowflake you can switch between viewing individual tables or their columns. For Looker you can switch between dashboards and individual fields.

By default the graph shows the most useful level for each platform—typically tables for warehouses and top-level assets for BI tools.

### Filtering by platform

Use the **platform filter** to focus the graph on specific integrations. For example, hide BI tools to show only warehouse and transformation assets, or focus on a single platform like dbt.

### Adjusting depth

The **depth controls** limit how many hops upstream or downstream the graph shows. This is useful for large graphs where you want to focus on assets directly adjacent to the anchor.

## Using lineage to investigate data issues

Lineage is most valuable when something goes wrong and you need to understand what happened and who is affected.

**Find the blast radius**: Starting from an affected table or column, expand downstream to see every model, table, and dashboard that depends on it. The table view with hop counts separates directly affected assets from indirectly affected ones, so you can prioritize who to notify.

**Trace to root cause**: Expand upstream from the affected asset to follow the data back through transformation jobs and ingestion sources. If an upstream Airflow task failed or a Fivetran sync stalled, that status is visible inline in the graph.

**Jump to job details**: When a transformation job appears in the lineage path, click it to open a side panel with recent runs. From there you can navigate to Jobs Monitoring for logs, error details, and infrastructure context.

**Find the right owner**: Every asset in the Catalog includes ownership and tagging information, so you can quickly identify who is responsible for each asset in the lineage path.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/jobs_monitoring/dbt/
[2]: /data_observability/jobs_monitoring/airflow
[3]: /data_observability/jobs_monitoring/
[4]: /data_observability/jobs_monitoring/glue
[5]: /data_observability/jobs_monitoring/emr
[6]: /data_observability/jobs_monitoring/dataproc
[7]: https://openlineage.io/
[8]: /data_observability/quality_monitoring/elt/fivetran
[9]: /data_observability/quality_monitoring/business_intelligence/looker
[10]: /data_observability/quality_monitoring/business_intelligence/tableau
[11]: /data_observability/quality_monitoring/business_intelligence/powerbi
[12]: /data_observability/quality_monitoring/business_intelligence/metabase
[13]: /data_observability/quality_monitoring/business_intelligence/sigma
[14]: /data_observability/quality_monitoring/elt/
[15]: /data_observability/quality_monitoring/
[16]: /data_observability/jobs_monitoring/
[17]: /data_observability/quality_monitoring/business_intelligence/
