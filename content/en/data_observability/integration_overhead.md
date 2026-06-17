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

- **Quality Monitoring** evaluates data-quality metrics (such as freshness, row count, and column statistics) on a schedule. Depending on the warehouse and metric, an evaluation either reads table metadata or runs a SQL query against your data, so its cost is measured in **warehouse compute** (for example, Snowflake credits, Databricks DBUs, or BigQuery bytes scanned).
- **Jobs Monitoring** observes the performance of your jobs by running the **Datadog Agent** on your compute (for example, Databricks or Spark clusters). The Agent shares a small amount of the CPU and memory you already provision for your workloads.

This page describes both overhead sources and how to control them. Actual cost depends heavily on your environment: warehouse size, the amount of data scanned, how often monitors run, and warehouse auto-stop settings. Rather than a single benchmark number, this page focuses on *what* consumes resources.

## Quality Monitoring overhead

A Data Observability monitor evaluates its metric on a fixed schedule that you choose: **hourly** or **daily**. Each time a monitor runs, Data Observability collects the metric value, either by reading table metadata or by running a query against your data. How each metric is collected depends on the warehouse.

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
| **Table freshness** (base table) | `SELECT timestamp FROM (DESCRIBE HISTORY <table> LIMIT 1)` | A lightweight metadata command—scans little data, but still runs on the warehouse, so the warehouse must be active. |
| **Table freshness** (materialized view) | `DESCRIBE TABLE EXTENDED <table>` | Lightweight metadata command. |
| **Table freshness** (standard view) | *(no query)* | Views have no freshness query and add no overhead; use column-level freshness instead. |
| **Column metrics** (Nullness, Uniqueness, Cardinality, Percent Zero, Percent Negative, Min, Max, Mean, Sum, Standard Deviation, column freshness) | Aggregate `SELECT` over the column | An aggregate query against the table. Column metrics on the same table that share the same filter and grouping are combined into a single query. |
| **Custom SQL** | Your query, run as written | Cost is whatever your query costs to run. |

{{% /tab %}}
{{% tab "BigQuery" %}}

On BigQuery, **row count** and **table freshness** are read through BigQuery's table metadata API (equivalent to a `tables.get` call). No query runs and no bytes are scanned, so these checks incur no BigQuery query cost.

**Column metrics** (Nullness, Uniqueness, Cardinality, Percent Zero, Percent Negative, Min, Max, Mean, Sum, Standard Deviation, and column-level freshness) and **Custom SQL** run as BigQuery SQL against your tables and are billed by the data they process—bytes scanned under on-demand pricing, or slot time under capacity pricing. Column metrics on the same table that share the same filter and grouping are combined into a single query.

{{% /tab %}}
{{< /tabs >}}

### What drives the cost

Warehouse compute consumed by Quality Monitoring scales with:

- **Cadence**: an hourly monitor re-runs its query 24 times as often as a daily monitor.
- **Number of distinct queries**: cost scales with the number of distinct *(table, filter, grouping)* combinations being monitored, not the raw number of metrics. Multiple column metrics on the same table are batched into one query.
- **Data scanned per query**: row-count and column-statistic queries are aggregates over the table, so larger tables and partitions cost more (on Databricks and BigQuery especially). Freshness checks are lightweight: metadata reads on Snowflake and BigQuery, and lightweight metadata commands on Databricks.
- **Warehouse warm time**: on warehouse-based platforms (Snowflake, Databricks), the dominant factor on most bills is how long your warehouse stays running. Frequent checks against a warehouse with a long idle timeout keep it warm and accrue cost even between queries. BigQuery on-demand is serverless and bills only by bytes scanned, so it has no warm-time cost.

Data Observability runs these queries with bounded concurrency and a per-query timeout. A backlog of monitors does not flood your warehouse with unbounded parallel queries.

### Reducing Quality Monitoring overhead

- **Choose daily over hourly** for metrics that do not need hourly resolution.
- **Monitor the tables and columns that matter.** Cost scales with the number of distinct queries; focus on critical tables rather than monitoring everything.
- **Add a `WHERE` clause** to scope a monitor to recent partitions or a relevant data segment, reducing the data scanned.
- **Group column metrics on the same table** so they batch into a single query.
- **On Snowflake and Databricks, use a dedicated, right-sized warehouse with an aggressive auto-stop** so it shuts down promptly between checks. This is usually the single most effective lever.
- **Prefer table freshness on base tables** where it is a metadata read or lightweight command rather than a full aggregate scan.

## Jobs Monitoring overhead

To monitor jobs on Databricks **classic** clusters (all-purpose or job clusters), the Datadog Agent is installed on the cluster nodes through an init script. On **serverless** compute, no Agent installation is required. The same in-process model applies to other Spark-based compute that Jobs Monitoring supports.

### What runs on the cluster

- The **Datadog Agent** and the Java APM tracer run as processes on the cluster nodes (the driver, and optionally the workers).
- The Spark integration runs **in-process** as a Spark listener: it reacts to Spark scheduler events (job, stage, and task callbacks) to build traces and spans. It does not poll your data or run any queries against your warehouse.
- The Agent collects Spark performance metrics and cluster system metrics, and optionally tails driver and worker logs.

### Footprint

The Agent is a lightweight process that shares the CPU and memory you already provision for your workloads. It does not add separate, Datadog-provisioned compute to classic clusters. Its resource use is driven mainly by the volume of Spark spans produced and by whether log collection is enabled. (Jobs with very high task fan-out emit more spans and use more CPU.) For the underlying trace Agent's resource profile, see [APM Agent resource usage][1].

The cluster Agent issues **no queries against your warehouse**, so it adds no warehouse cost on its own.

### Reducing Jobs Monitoring overhead

- **Install on the driver only** when you do not need per-executor task detail, rather than on every worker node.
- **Disable log collection** when you do not need driver and worker logs (`DRIVER_LOGS_ENABLED` / `WORKER_LOGS_ENABLED`), or filter logs with `DD_LOGS_CONFIG_PROCESSING_RULES`. Log collection is the main tunable contributor to footprint and ingestion volume.

### A note on Databricks cost data

Jobs Monitoring can surface the DBU cost of your Databricks jobs. This cost data is read from Datadog's own cost metrics; collecting it does not add queries to your monitored clusters. Populating Databricks cost requires the Datadog Databricks cost integration, which reads from Databricks system tables through a SQL warehouse you grant access to. For the required permissions, see the [Jobs Monitoring for Databricks setup][2].

## Notes

The behaviors above are environment-dependent. Actual cost depends on your warehouse size and pricing model, the volume of data scanned, monitor cadence, and (on warehouse-based platforms) your warehouse auto-stop configuration. Validate against your own usage—for example, your warehouse's query history or billing views, or Datadog Cloud Cost Management—when sizing.

[1]: /tracing/troubleshooting/agent_apm_resource_usage/
[2]: /data_observability/jobs_monitoring/databricks/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
