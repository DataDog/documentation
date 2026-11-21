---
title: Data Observability Billing
description: "Learn how Datadog counts monitored tables for Quality Monitoring and job usage for Jobs Monitoring."
algolia:
  tags: ['data observability billing', 'data observability pricing', 'quality monitoring billing', 'jobs monitoring billing', 'monitored tables']
further_reading:
  - link: "/data_observability/quality_monitoring/"
    tag: "Documentation"
    text: "Learn about Quality Monitoring"
  - link: "/data_observability/jobs_monitoring/"
    tag: "Documentation"
    text: "Learn about Jobs Monitoring"
  - link: "/data_observability/integration_overhead/"
    tag: "Documentation"
    text: "Learn about the overhead that Data Observability adds to your data platforms"
  - link: "/monitors/types/data_observability/"
    tag: "Documentation"
    text: "Data Observability Monitor"
---

## Overview

Data Observability includes two products that are billed separately:

- [Quality Monitoring][1] is billed per monitored table, per month.
- [Jobs Monitoring][2] is billed per host hour, per job hour, or per Databricks Unit (DBU), depending on where your jobs run.

For prices, see the [Quality Monitoring pricing page][3] and the [Jobs Monitoring pricing page][4].

Datadog charges are separate from the compute that Data Observability uses in your data platforms, such as the warehouse queries that monitors run. To understand and control that cost, see [Integration Overhead][5].

## Quality Monitoring

### Monitored tables

A table, view, or materialized view becomes a monitored table when you add a monitor to it or to one of its columns. Tables that Datadog syncs from your warehouses and databases don't count as monitored tables until you add a monitor. There is no minimum number of monitored tables.

Datadog measures the number of monitored tables each hour and bills the average over the month.

### Monitored tables by monitor type

| Monitor | Monitored tables |
|---|---|
| Freshness, row count, and column metric monitors, such as nullness and uniqueness | One per table, regardless of how many of these monitors the table has, or whether they apply to the table or to its columns. |
| [Custom SQL][6] | One per Custom SQL monitor, added to the count from other monitors. |
| [Source to target][7] (Preview) | Counts toward the target table only. |
| [Schema change][8] (Preview) | Not billed. |
| Any monitor that uses [Group by][9] | The number of groups doesn't affect the count. A group-by monitor on one table counts as one monitored table. |

For example, a table has a freshness monitor, a row count monitor, and three Custom SQL monitors. The freshness and row count monitors count as one monitored table. Each Custom SQL monitor adds one more, for a total of four monitored tables.

### Included at no additional charge

The following are included with Quality Monitoring and don't add monitored tables:

- Syncing tables, schemas, and metadata from your warehouses and databases.
- [Lineage][10], including column-level lineage for tables that you don't monitor.
- Connecting more integrations. Datadog bills for the tables you monitor and for any Jobs Monitoring usage, regardless of how many integrations you connect.

## Jobs Monitoring

Jobs Monitoring is billed in three categories. Each category covers different jobs and has its own billing unit.

| Category | Jobs | Billing unit |
|---|---|---|
| Clusters | Databricks jobs on classic compute, and Apache Spark jobs on Kubernetes, Amazon EMR, and Google Dataproc | Per host, per hour (Data Observability Job Host Hours) |
| Databricks Serverless | Lakeflow jobs on Databricks serverless compute | Per DBU |
| Orchestrators | Airflow DAGs and tasks, dbt jobs and models, AWS Glue jobs, and custom jobs | Per job, per hour (Data Observability Job Hours) |

Jobs Monitoring usage doesn't depend on your [job monitors][11]. A job that you exclude from a job monitor, or that no monitor covers, still counts toward usage.

### Clusters

Datadog counts the unique hosts instrumented for Jobs Monitoring every five minutes. Each hour's host count is the average of the 12 samples in that hour.

For example, suppose Datadog observes the following host counts in one hour:

| Interval | Unique hosts |
|---|---|
| 1:00 p.m. to 1:05 p.m. | 100 |
| 1:05 p.m. to 1:10 p.m. | 300 |
| 1:10 p.m. to 1:15 p.m. | 150 |
| 1:15 p.m. to 1:20 p.m. | 50 |
| 1:20 p.m. to 2:00 p.m. (eight intervals) | 0 |

The samples add up to 600, and 600 / 12 = 50 host hours for that hour. If this pattern occurs once a day for 30 days, usage for the month is 50 × 30 = 1500 Data Observability Job Host Hours.

### Orchestrators

Usage is the sum of the durations of all job runs in the month, rounded up to the next full hour.

For example, suppose Datadog observes the following runs in one month:

| Run | Duration (hours) |
|---|---|
| Job 1, run 1 | 3.4 |
| Job 1, run 2 | 5 |
| Job 2, run 1 | 0.1 |
| Job 2, run 2 | 0.15 |
| Job 2, run 3 | 0.25 |

The durations add up to 8.9 hours, which rounds up to 9 Data Observability Job Hours for the month.

### Databricks Serverless

Usage is the total number of DBUs consumed in Databricks by the serverless job runs that Datadog collects in the month.

### Usage in other Datadog products

Jobs Monitoring can generate usage in other Datadog products:

- Job execution traces from the Clusters category generate APM span ingestion and span indexing usage. Each Jobs Monitoring host includes an allotment of 0.205 GB of ingested spans and 1370 indexed spans per hour. Usage beyond the allotment can incur additional charges. See [APM Billing][12].
- For jobs on Kubernetes, the Clusters category generates container monitoring usage. Each Jobs Monitoring host includes an allotment of 10 containers. See [Containers Billing][13].
- Log collection is optional. Logs that you collect with Jobs Monitoring are billed through [Log Management][14].
- Hosts where Jobs Monitoring is enabled don't require Infrastructure Monitoring and aren't billed as Infrastructure hosts, except for Spark on Kubernetes. For Spark on Kubernetes, any node that runs the Datadog Agent counts as an Infrastructure host. Only nodes that are actively running Spark jobs count toward Data Observability Job Host Hours.

## Databricks workspaces connected to more than one organization

If you connect a Databricks workspace to more than one [Datadog organization][15], Datadog bills each organization for that workspace's Data Observability usage.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/quality_monitoring/
[2]: /data_observability/jobs_monitoring/
[3]: https://www.datadoghq.com/pricing/?product=quality-monitoring#products
[4]: https://www.datadoghq.com/pricing/?product=jobs-monitoring#products
[5]: /data_observability/integration_overhead/
[6]: /monitors/types/data_observability/?tab=customsql#select-your-metric-type
[7]: /monitors/types/data_observability/#source-to-target-monitors
[8]: /monitors/types/data_observability/#schema-change-monitors
[9]: /monitors/types/data_observability/#group-by
[10]: /data_observability/lineage/
[11]: /monitors/types/data_observability/#job-monitors
[12]: /account_management/billing/apm_tracing_profiler/
[13]: /account_management/billing/containers/
[14]: /account_management/billing/log_management/
[15]: /account_management/multi_organization/
