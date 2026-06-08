---
title: Getting Started with Database Monitoring
description: Monitor database health and performance, troubleshoot slow queries, and create dashboards for query analysis and optimization.
further_reading:
    - link: '/database_monitoring/'
      tag: 'Documentation'
      text: 'Database Monitoring'
    - link: '/database_monitoring/troubleshooting/'
      tag: 'Documentation'
      text: 'Troubleshooting'
    - link: 'https://www.datadoghq.com/blog/database-performance-monitoring-datadog/'
      tag: 'Blog'
      text: 'Database performance monitoring with Datadog'
    - link: 'https://dtdg.co/fe'
      tag: 'Foundation Enablement'
      text: 'Join an interactive session to level up your Database Monitoring'
    - link: 'https://learn.datadoghq.com/courses/database-monitoring'
      tag: 'Learning Center'
      text: 'Monitoring a Postgres Database with Datadog DBM'
---

## Overview

Datadog Database Monitoring helps you to better understand the health and performance of your databases and to determine the root cause of any problems.

In one place, you can view:

* Host-level metrics
* Explain plans
* Historical query performance metrics

Work through this guide to set up Datadog Database Monitoring on an example PostgreSQL database. Next, identify an expensive query, troubleshoot a slow query, and create a dashboard to view changes in query volume.

## Setup

### Prerequisites

Before getting started, you need a [Datadog account][1].

To run the example application, you need a machine with [GNU Make][2] and [Docker Desktop][3]. Have your Datadog [API key][4] available.

### Install the example application

The example application runs three containers: a PostgreSQL or MySQL database, the Datadog Agent, and a Go orders app that continuously generates realistic database traffic. While the app runs, the Agent sends the following signals to Datadog:

| Signal | Description |
|---|---|
| Query metrics | Per-query latency, execution count, and rows examined. |
| Explain plans | Execution plans sampled at runtime, surfacing costly operations. |
| Full table scan | The `SELECT * FROM orders WHERE status = ?` query has no index on `status`, causing a sequential scan.
| Lock contention | The app uses `SELECT ... FOR UPDATE` to simulate concurrent row locks. |
| APM ↔ DBM correlation | Traces from the orders service are linked to their database queries, enabling end-to-end visibility. |

You can view this data in Datadog Database Monitoring.

Follow these instructions to install the example application on macOS or Linux.

1. Clone the [repository][5] containing the example application:
    ```
    git clone https://github.com/DataDog/dd-database-monitoring-example
    ```

2. Change to the `dd-database-monitoring-example` directory:
    ```
    cd dd-database-monitoring-example
    ```

3. Set the environment variable `DD_API_KEY` to your Datadog API key:
    ```
    export DD_API_KEY=<API_KEY>
    ```

4. Start the application. Choose the database you want to monitor:
   - **PostgreSQL:**
     ```
     make postgres
     ```
   - **MySQL:**
     ```
     make mysql
     ```

   If your Datadog account is not on the US1 site, also export `DD_SITE` before running `make`:
   ```
   export DD_SITE=datadoghq.eu   # example: EU site
   ```

   The command continues to run until you stop it by pressing Ctrl + C.

## Identify an expensive query

Which query consumes the most database time? To find out, use the Query Metrics view.

1. On the [Database Monitoring][6] page, click the {{< ui >}}Query metrics{{< /ui >}} tab in the UI.

2. Sort the Normalized Query table by {{< ui >}}Percent time{{< /ui >}} to see the query that the database spends the most time executing.

   The query that consumes the most database time appears on the first line. Look for the query scanning the `orders` table by `status` — for example, `SELECT * FROM orders WHERE status = ?`. This query is expensive because there is no index on the `status` column, so the database performs a full sequential scan of the table on every execution.

   {{< img src="database_monitoring/dbm_qm_sort_time.png" alt="Normalized queries sorted by percent time" style="width:100%;">}}

## Troubleshoot a slow query

In addition to identifying slow queries, Datadog Database Monitoring can help you diagnose them. A query's Explain Plan describes the steps that the database takes to resolve the query. View an Explain Plan by clicking on a sample in the Query Samples view.

1. Navigate to the Query Samples view within [Database Monitoring][6] by selecting the {{< ui >}}Samples{{< /ui >}} tab.

2. In the {{< ui >}}In{{< /ui >}} dropdown, select {{< ui >}}Explain Plans{{< /ui >}}. 

3. Sort the Normalized Query table by {{< ui >}}Duration{{< /ui >}}.

   {{< img src="database_monitoring/dbm_qs_explain_plan_duration.png" alt="Normalized query samples sorted by duration">}}

4. Find a query in the table with data in the {{< ui >}}Explain Plan{{< /ui >}} column and click on it to open the Sample Details page. 

5. Under {{< ui >}}Explain Plan{{< /ui >}}, click {{< ui >}}List View{{< /ui >}}. This Explain Plan at the bottom of the Explain Plan Sample page shows that the query performs a **Seq Scan** on the `orders` table. Because there is no index on the `status` column, PostgreSQL reads every row in the table to find matches.

   {{< img src="database_monitoring/dbm_qs_explain_plan_list_view.png" alt="Query explain plan showing Seq Scan on orders table">}}

   To fix this, add an index on the `status` column:

   ```sql
   CREATE INDEX idx_orders_status ON orders(status);
   ```

   After adding the index, the explain plan changes from a Seq Scan to an Index Scan, and query latency drops significantly.

## Correlate traces and database queries

The orders app emits APM traces that are automatically linked to the database queries they generate. Use this correlation to move seamlessly between a slow trace and the exact query responsible.

1. Navigate to [APM > Traces][7] and find a trace from the orders service.

2. On the trace flame graph, click a database span to open its details panel.

3. In the details panel, click {{< ui >}}View in DBM{{< /ui >}} to jump directly to that query in Database Monitoring.

Conversely, in a Query Sample in Database Monitoring, click {{< ui >}}View Trace{{< /ui >}} to open the originating APM trace.

{{< img src="database_monitoring/dbm_apm_correlation.png" alt="APM trace linked to a DBM query sample" style="width:100%;">}}

## Visualize database health and performance

To understand the health and performance of your databases at a glance, add Datadog Database Monitoring metrics to a dashboard.

### View changes in query volume

For example, you can see the absolute change in query volume in the past hour by adding a {{< ui >}}Change{{< /ui >}} widget to track a query count metric.

1. Select {{< ui >}}Dashboards{{< /ui >}} > {{< ui >}}New Dashboard{{< /ui >}} in the UI.

2. Enter a name for your dashboard. Click the {{< ui >}}New Dashboard{{< /ui >}} button to go to your new dashboard.

2. To add content to your dashboard, click {{< ui >}}Add Widgets{{< /ui >}}.

3. In the widget carousel, select the {{< ui >}}Change{{< /ui >}} widget.

4. Select `postgresql.queries.count` in the {{< ui >}}Metric{{< /ui >}} dropdown. This metric counts the number of queries sent to a PostgreSQL database. If you are monitoring MySQL, use `mysql.queries` instead.

5. Select `host` in the {{< ui >}}Break it down by{{< /ui >}} dropdown so that the widget aggregates queries by host.

   {{< img src="database_monitoring/dashboard_change_postgres.png" alt="Configure change widget for postgres queries metric" style="width:100%;">}}

7. Click the {{< ui >}}Save{{< /ui >}} button. The dashboard shows your new widget.

   {{< img src="database_monitoring/dashboard_change_widget.png" alt="Change widget showing query count" style="width:100%;">}}

### View out-of-the-box dashboards

Observe current database activity, resource utilization, and more on out-of-the-box dashboards provided by Datadog Database Monitoring.

To access the dashboards, from the [Database Monitoring][6] page, select the {{< ui >}}Dashboards{{< /ui >}} tab and choose the dashboard that you want to see.

You can clone and modify out-of-the-box dashboards to suit your needs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://www.gnu.org/software/make/
[3]: https://www.docker.com/products/docker-desktop/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://github.com/DataDog/dd-database-monitoring-example
[6]: https://app.datadoghq.com/databases
[7]: https://app.datadoghq.com/apm/traces
