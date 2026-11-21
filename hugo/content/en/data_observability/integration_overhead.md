---
title: Data Observability Integration Overhead
description: "Understand the compute overhead Data Observability adds when monitoring data quality and jobs, and how to control it."
further_reading:
  - link: "/data_observability/"
    tag: "Documentation"
    text: "Data Observability Overview"
  - link: "/data_observability/quality_monitoring/"
    tag: "Documentation"
    text: "Quality Monitoring"
  - link: "/data_observability/jobs_monitoring/databricks/"
    tag: "Documentation"
    text: "Jobs Monitoring for Databricks"
  - link: "/monitors/types/data_observability/"
    tag: "Documentation"
    text: "Data Observability Monitors"
  - link: "/tracing/troubleshooting/agent_apm_resource_usage/"
    tag: "Documentation"
    text: "APM Agent resource usage"
---

## Overview

Data Observability monitors your data through two products, each with a different overhead profile:

- **Quality Monitoring** evaluates data-quality metrics (such as freshness, row count, and column statistics) on a schedule. Depending on the warehouse and metric, an evaluation either reads table metadata or runs a SQL query against your data, so its cost is measured in **warehouse compute** (for example, Snowflake credits, Databricks DBUs, or BigQuery bytes scanned). On PostgreSQL, MySQL, and SQL Server, the Datadog Agent runs these queries against your database, so the cost is load on your database server.
- **Jobs Monitoring** observes the performance of your jobs by running the **Datadog Agent** on your compute (for example, Databricks or Spark clusters). The Agent shares a small amount of the CPU and memory you already provision for your workloads.

This page describes both overhead sources and how to control them. Actual cost depends heavily on your environment: warehouse size, the amount of data scanned, how often monitors run, and warehouse auto-stop settings. This page focuses on what consumes resources, not a single benchmark number.

## Quality Monitoring overhead

A Data Observability monitor evaluates its metric on the schedule you set in [Monitor schedule][1]: {{< ui >}}Hourly{{< /ui >}}, {{< ui >}}Every 3 hours{{< /ui >}}, {{< ui >}}Every 6 hours{{< /ui >}}, {{< ui >}}Every 12 hours{{< /ui >}}, {{< ui >}}Daily{{< /ui >}}, or a {{< ui >}}Custom schedule{{< /ui >}} cron expression that runs as often as every 15 minutes. A {{< ui >}}Manual{{< /ui >}} (Preview) monitor runs only when triggered through the API, and doesn't run on PostgreSQL, MySQL, or SQL Server. Each time a monitor runs, Data Observability collects the metric value, either by reading table metadata or by running a query against your data. How each metric is collected depends on the platform. Data Observability support for ClickHouse Cloud, Microsoft Fabric Warehouse, PostgreSQL, MySQL, and SQL Server is in Preview.

{{< tabs >}}
{{% tab "Snowflake" %}}

On Snowflake, **row count** and **table freshness** are read from table metadata rather than by scanning the table. Datadog reads the `ROW_COUNT` and `LAST_ALTERED` columns from `INFORMATION_SCHEMA.TABLES`, and batches many tables in a database into a single query. This reads metadata only and does not scan table data. However, querying `INFORMATION_SCHEMA` requires a running warehouse, so it uses a small, roughly fixed amount of warehouse compute per batch, regardless of table size.

**Column metrics** (Nullness, Uniqueness, Cardinality, Percent Zero, Percent Negative, Min, Max, Mean, Sum, Standard Deviation, and column-level freshness) and **Custom SQL** run as `SELECT` queries against your tables and are billed as normal warehouse usage. Column metrics on the same table that share the same filter and grouping are combined into a single query.

{{% /tab %}}
{{% tab "Databricks" %}}

On Databricks, every metric is collected by running a SQL statement on the SQL warehouse you connect for Quality Monitoring. There is no separate no-cost metadata layer for row count or freshness; these values are computed by querying the warehouse. As a result, each evaluation requires that SQL warehouse to be active and consumes DBUs while it runs.

| Metric | Statement run on the SQL warehouse | Notes |
|---|---|---|
| **Row count** | `SELECT COUNT(1) FROM <table>` | An aggregate query against the table. The data actually scanned depends on table size and Delta optimizations such as data skipping and statistics. |
| **Table freshness** (base table) | `SELECT timestamp FROM (DESCRIBE HISTORY <table> LIMIT 1)` | A lightweight metadata command that scans little data. It still runs on the warehouse, so the warehouse must be active. |
| **Table freshness** (materialized view) | `DESCRIBE TABLE EXTENDED <table>` | Lightweight metadata command. |
| **Table freshness** (standard view) | *(no query)* | Views have no freshness query and add no overhead; use column-level freshness instead. |
| **Column metrics** (Nullness, Uniqueness, Cardinality, Percent Zero, Percent Negative, Min, Max, Mean, Sum, Standard Deviation, column freshness) | Aggregate `SELECT` over the column | An aggregate query against the table. Column metrics on the same table that share the same filter and grouping are combined into a single query. |
| **Custom SQL** | Your query, run as written | Cost is whatever your query costs to run. |

{{% /tab %}}
{{% tab "BigQuery" %}}

On BigQuery, **row count** and **table freshness** are read through BigQuery's table metadata API (equivalent to a `tables.get` call). No query runs and no bytes are scanned, so these checks incur no BigQuery query cost.

**Column metrics** (Nullness, Uniqueness, Cardinality, Percent Zero, Percent Negative, Min, Max, Mean, Sum, Standard Deviation, and column-level freshness) and **Custom SQL** run as BigQuery SQL against your tables and are billed by the data they process—bytes scanned under on-demand pricing, or slot time under capacity pricing. Column metrics on the same table that share the same filter and grouping are combined into a single query.

{{% /tab %}}
{{% tab "Redshift" %}}

On Redshift, every metric is collected by running a SQL query on the provisioned cluster or Serverless workgroup you connect, so each evaluation uses Redshift compute.

| Metric | Statement run on Redshift | Notes |
|---|---|---|
| **Row count** | `SELECT COUNT(1) FROM <table>` | An aggregate query against the table. |
| **Table freshness** | *(no query)* | Redshift has no table freshness monitor. Use column-level freshness instead. |
| **Column metrics** (Nullness, Uniqueness, Cardinality, Percent Zero, Percent Negative, Min, Max, Mean, Sum, Standard Deviation, column freshness) | Aggregate `SELECT` over the column | An aggregate query against the table. Column metrics on the same table that share the same filter and grouping are combined into a single query. |
| **Custom SQL** | Your query, run as written | Cost is whatever your query costs to run. |

{{% /tab %}}
{{% tab "ClickHouse Cloud" %}}

On ClickHouse Cloud, **row count** and **table freshness** are read from table metadata rather than by scanning the table. Datadog reads `total_rows` from `system.tables` and the modification time of the latest active part from `system.parts`, and batches many tables into a single query. Tables with no stored row count, such as `Distributed` tables, the `Log` engine family, and materialized views defined with `TO`, use `SELECT COUNT(1) FROM <table>` for row count instead.

**Column metrics** (Nullness, Uniqueness, Cardinality, Percent Zero, Percent Negative, Min, Max, Mean, Sum, Standard Deviation, and column-level freshness) and **Custom SQL** run as `SELECT` queries against your tables. Column metrics on the same table that share the same filter and grouping are combined into a single query. Row count and column metrics never query tables with a stream or remote engine, such as `Kafka`, `S3Queue`, or `MySQL`. Only custom SQL monitors run on those tables.

All of these queries run on your ClickHouse Cloud service. Datadog reads table metadata every hour, and a query against an idle service wakes it up and uses compute.

{{% /tab %}}
{{% tab "Microsoft Fabric Warehouse" %}}

On Microsoft Fabric Warehouse, every metric is collected by running a T-SQL query on the warehouse's SQL endpoint.

| Metric | Statement run on the SQL endpoint | Notes |
|---|---|---|
| **Row count** | `SELECT COUNT_BIG(1) FROM <table>` | An aggregate query against the table. |
| **Table freshness** | *(no query)* | Fabric doesn't expose a table-level last-modified time, so there is no table freshness monitor. Use column-level freshness instead. |
| **Column metrics** (Nullness, Uniqueness, Cardinality, Percent Zero, Percent Negative, Min, Max, Mean, Sum, Standard Deviation, column freshness) | Aggregate `SELECT` over the column | An aggregate query against the table. Column metrics on the same table that share the same filter and grouping are combined into a single query. |
| **Custom SQL** | Your query, run as written | Cost is whatever your query costs to run. |

{{% /tab %}}
{{% tab "PostgreSQL" %}}

On PostgreSQL, the Datadog Agent runs every monitor query against your database through its Postgres check. Datadog delivers the queries to the Agent over Remote Configuration, and the Agent runs the queries that are due one at a time.

| Metric | Statement the Agent runs | Notes |
|---|---|---|
| **Row count** | `SELECT COUNT(1) FROM <table>` | An aggregate query against the table. |
| **Table freshness** | *(no query)* | PostgreSQL has no table freshness monitor. Use column-level freshness instead. |
| **Column metrics** (Nullness, Uniqueness, Cardinality, Percent Zero, Percent Negative, Min, Max, Mean, Sum, Standard Deviation, column freshness) | Aggregate `SELECT` over the column | An aggregate query against the table. Column metrics on the same table that share the same filter and grouping are combined into a single query. |
| **Custom SQL** | Your query, run as written | Cost is whatever your query costs to run. |

Separately from monitor queries, the Agent collects schema metadata every 600 seconds by default (`collect_schemas.collection_interval`).

{{% /tab %}}
{{% tab "MySQL" %}}

On MySQL, the Datadog Agent runs every monitor query against your database through its MySQL check. Datadog delivers the queries to the Agent over Remote Configuration, and the Agent runs the queries that are due one at a time over a single connection. If the same database user also runs Database Monitoring, Data Observability uses one additional connection.

| Metric | Statement the Agent runs | Notes |
|---|---|---|
| **Row count** | `SELECT COUNT(1) FROM <database>.<table>` | An aggregate query against the table. |
| **Table freshness** | *(no query)* | MySQL has no table freshness monitor. Use column-level freshness instead. |
| **Column metrics** (Nullness, Uniqueness, Cardinality, Percent Zero, Percent Negative, Min, Max, Mean, Sum, Standard Deviation, column freshness) | Aggregate `SELECT` over the column | An aggregate query against the table. Column metrics on the same table that share the same filter and grouping are combined into a single query. |
| **Custom SQL** | Your query, run as written | Cost is whatever your query costs to run. |

Separately from monitor queries, the Agent collects schema metadata every 600 seconds by default (`collect_schemas.collection_interval`).

{{% /tab %}}
{{% tab "SQL Server" %}}

On SQL Server, the Datadog Agent runs every monitor query against your database through its SQL Server check. Datadog delivers the queries to the Agent over Remote Configuration, and the Agent runs the queries that are due one at a time. Queries against the same database share one connection.

| Metric | Statement the Agent runs | Notes |
|---|---|---|
| **Row count** | `SELECT COUNT_BIG(1) FROM <table>` | An aggregate query against the table. |
| **Table freshness** | *(no query)* | SQL Server has no table freshness monitor. Use column-level freshness instead. |
| **Column metrics** (Nullness, Uniqueness, Cardinality, Percent Zero, Percent Negative, Min, Max, Mean, Sum, Standard Deviation, column freshness) | Aggregate `SELECT` over the column | An aggregate query against the table. Column metrics on the same table that share the same filter and grouping are combined into a single query. |
| **Custom SQL** | Your query, run as written | Cost is whatever your query costs to run. |

Separately from monitor queries, the Agent collects schema metadata every 600 seconds by default (`collect_schemas.collection_interval`), as part of Database Monitoring.

{{% /tab %}}
{{< /tabs >}}

### What drives the cost

Warehouse compute consumed by Quality Monitoring scales with:

- **Cadence**: an hourly monitor reruns its query 24 times as often as a daily monitor, and a custom schedule that runs every 15 minutes reruns it 96 times a day.
- **Number of distinct queries**: cost scales with the number of distinct *(table, filter, grouping)* combinations being monitored, not the raw number of metrics. Multiple column metrics on the same table are batched into one query.
- **Data scanned per query**: column-statistic queries (and Custom SQL) are aggregates that scan table data, so larger tables and partitions cost more on every warehouse. Row count runs `COUNT` against the table on Databricks, Redshift, Microsoft Fabric Warehouse, PostgreSQL, MySQL, and SQL Server. On Snowflake, BigQuery, and ClickHouse Cloud, it is a metadata read that does not grow with table size, except for ClickHouse tables with no stored row count. Table freshness is lightweight where it is available: metadata reads on Snowflake, BigQuery, and ClickHouse Cloud, and metadata commands on Databricks. On the other platforms, track freshness with column-level freshness, which is an aggregate over the column.
- **Warehouse warm time**: on warehouse-based platforms (Snowflake, Databricks), the dominant factor on most bills is how long your warehouse stays running. Frequent checks against a warehouse with a long idle timeout keep it warm and accrue cost even between queries. BigQuery on-demand is serverless and bills only by bytes scanned, so it has no warm-time cost. On ClickHouse Cloud, a query against an idle service wakes it up.

Data Observability runs these queries with bounded concurrency and a per-query timeout. A backlog of monitors does not flood your warehouse with unbounded parallel queries.

### Reducing Quality Monitoring overhead

- **Choose a less frequent schedule**, such as {{< ui >}}Every 12 hours{{< /ui >}} or {{< ui >}}Daily{{< /ui >}}, for metrics that do not need hourly resolution.
- **Monitor the tables and columns that matter.** Cost scales with the number of distinct queries; focus on critical tables rather than monitoring everything.
- **Add a `WHERE` clause** to scope a monitor to recent partitions or a relevant data segment, reducing the data scanned.
- **Group column metrics on the same table** so they batch into a single query.
- **On Snowflake and Databricks, use a dedicated, right-sized warehouse with an aggressive auto-stop** so it shuts down promptly between checks. This is usually the most impactful optimization.
- **Prefer table freshness on base tables** where it is a metadata read or lightweight command rather than a full aggregate scan.

## Jobs Monitoring overhead

Jobs Monitoring collects telemetry in one of two ways, each with a different overhead profile:

- **Datadog Agent**: for Spark jobs on Databricks, Amazon EMR, Google Dataproc, and Kubernetes, you install the Datadog Agent on your compute. Its footprint is described in this section.
- **OpenLineage events**: for Apache Airflow, dbt, and custom pipelines, you run an open source OpenLineage integration in your own environment, which emits events to Datadog. See [OpenLineage-based integrations](#openlineage-based-integrations).

On Databricks **classic** clusters (all-purpose or job clusters), the Agent is installed on the cluster nodes through an init script. On **serverless** compute, no Agent installation is required.

### What runs on the cluster

- The **Datadog Agent** and the Java APM tracer run as processes on the cluster nodes (the driver and the executors).
- The Spark integration runs **in-process** as a Spark listener: it reacts to Spark scheduler events (job, stage, and task callbacks) to build traces and spans. It does not poll your data or run any queries against your warehouse.
- The Agent collects Spark performance metrics and cluster system metrics, and optionally tails driver and worker logs.

### Footprint

The Agent is a lightweight process that shares the CPU and memory you already provision for your workloads. It does not add separate, Datadog-provisioned compute to classic clusters.

Jobs Monitoring traces are coarse-grained. The Spark integration emits one span per application, job, stage, SQL execution, and streaming micro-batch, plus one span for each *failed* task. Successful tasks are aggregated into stage-level metrics instead of emitting individual spans. As a result, trace volume scales with a job's number of stages and jobs, not its task count or data volume. Trace throughput therefore stays low for typical jobs. The larger contributors to the Agent's footprint are Spark metric collection and, if enabled, log collection. For the Datadog SDK's resource profile, see [APM Agent resource usage][2].

The cluster Agent issues no queries against your warehouse, so it adds no warehouse cost on its own.

### Reducing Jobs Monitoring overhead

- **Disable log collection** when you do not need driver and worker logs (`DRIVER_LOGS_ENABLED` / `WORKER_LOGS_ENABLED`), or filter logs with `DD_LOGS_CONFIG_PROCESSING_RULES`. Log collection is the main tunable contributor to footprint and ingestion volume.

### Databricks cost data

Jobs Monitoring can surface the DBU cost of your Databricks jobs. This cost data is read from Datadog's own cost metrics; collecting it does not add queries to your monitored clusters. Populating Databricks cost requires the Datadog Databricks cost integration, which reads from Databricks system tables through a SQL warehouse you grant access to. For the required permissions, see the [Jobs Monitoring for Databricks setup][3].

### OpenLineage-based integrations

Apache Airflow, dbt, and custom pipelines are monitored without the Datadog Agent. Instead, an open source [OpenLineage][4] integration emits lineage events to Datadog. These components are maintained by the OpenLineage and Apache Airflow projects, and their configuration and performance are documented in their respective project documentation. The overhead is the integration's, not the Datadog Agent's.

These integrations capture run, job, and dataset metadata and emit events at run lifecycle points. The cost is proportional to the number of runs, tasks, and the metadata collected, not to your data volume.

- **Airflow**: the [`apache-airflow-providers-openlineage`][5] provider runs in your Airflow schedulers and workers and emits an event at task and DAG lifecycle points. Its [configuration reference][6] documents options that affect overhead, such as selectively enabling OpenLineage and limiting collected metadata.
- **dbt**: for dbt Core, the [`openlineage-dbt`][7] wrapper (`dbt-ol`) follows dbt's structured logs and emits events as the run progresses. Because it reads logs rather than instrumenting execution, it does not affect dbt's performance. dbt Cloud sends job-run events to Datadog through a webhook, with no component running in your environment.
- **Custom pipelines**: you emit events yourself with the OpenLineage client or a raw HTTP call, so the overhead is whatever your emitting code does.

For setup and the Datadog-optimized transport, see [Custom Jobs using OpenLineage][8]. See the OpenLineage documentation for the full set of tuning and overhead controls.

## Estimating your actual costs

The behaviors described on this page are environment-dependent. Actual cost depends on your warehouse size and pricing model, the data scanned, and how often monitors run. On warehouse-based platforms, it also depends on your auto-stop configuration. To estimate costs, validate against your own usage: your warehouse's query history or billing views, or Datadog Cloud Cost Management.

[1]: /monitors/types/data_observability/#monitor-schedule
[2]: /tracing/troubleshooting/agent_apm_resource_usage/
[3]: /data_observability/jobs_monitoring/databricks/
[4]: https://openlineage.io/docs/integrations/about
[5]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/
[6]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html
[7]: https://openlineage.io/docs/integrations/dbt
[8]: /data_observability/jobs_monitoring/openlineage/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
