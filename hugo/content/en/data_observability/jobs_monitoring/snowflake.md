---
title: "Snowflake Task Monitoring"
description: "Monitor Snowflake task run history in Datadog Data Observability."
further_reading:
  - link: '/data_observability/quality_monitoring/data_warehouses/snowflake/'
    tag: 'Documentation'
    text: 'Snowflake integration setup'
  - link: '/data_observability/jobs_monitoring/'
    tag: 'Documentation'
    text: 'Data Observability: Jobs Monitoring'
  - link: '/data_observability/lineage/'
    tag: 'Documentation'
    text: 'Data Observability: Lineage'
---

<div class="alert alert-info">Snowflake Task Monitoring is in Preview.</div>

## Overview

Datadog reads the run history of your scheduled Snowflake [tasks][1]. Each task run appears in Data Observability as a span, grouped into a trace for its task graph (DAG).

This covers task **run history** only. To monitor Snowflake data quality and lineage, enable Data Observability for Snowflake in the [Snowflake integration setup][2].

## Prerequisites

Connect the [Snowflake integration][2] to Data Observability. The standard setup script already grants everything this feature needs. The grant specific to task monitoring is **`MONITOR EXECUTION ON ACCOUNT`**, which lets Datadog read your Snowflake task run history.

## Enable Task History Traces

1. In Data Observability, go to your Snowflake account configuration.
2. Under **Data Jobs Monitoring**, turn on **Task History Traces**.
3. Choose a **Traces collection period** (`5 Min`, `15 Min`, `30 Min`, `Hourly`, or `Daily`).

Task runs are read from Snowflake's `ACCOUNT_USAGE.TASK_HISTORY` view. When you first enable the feature, Datadog backfills task runs from roughly the last 18 hours. Because that view has a latency of up to 45 minutes, new runs may take that long to appear.

## What Datadog collects

For each task run, Datadog creates a span with:

- **Timing** — scheduled time, completed time, and duration.
- **Status** — success or failure, with the error code and message on failed runs.
- **The SQL statement** the task ran.

Runs are grouped into a **task graph (DAG)** trace, so a root task and its dependent tasks appear together.

## View your task runs

- In the Data Observability catalog, the same **Task Runs** view appears in two places:
    - the **Task Runs** tab on the task's entity page, and
    - the **side panel** that opens when you click a task in the Lineage map.
- In **Trace Explorer**.

{{< img src="data_jobs/snowflake_task_runs.png" alt="Task Runs on a Snowflake task's entity page in Data Observability" style="width:100%;" >}}

{{< img src="data_jobs/snowflake_task_runs_lineage.png" alt="Task runs in the side panel of a Snowflake task in the Data Observability Lineage map" style="width:100%;" >}}

## Troubleshooting

If no task runs appear:

- Confirm the task has actually run. A suspended task, or one that hasn't reached its next scheduled time, produces no runs to collect.
- New task runs can take up to 45 minutes to appear (`ACCOUNT_USAGE.TASK_HISTORY` latency), so allow time after a task completes.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.snowflake.com/en/user-guide/tasks-intro
[2]: /data_observability/quality_monitoring/data_warehouses/snowflake/
