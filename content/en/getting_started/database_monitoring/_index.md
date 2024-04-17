---
title: Getting Started with Database Monitoring
kind: documentation
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
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">Database Monitoring is not available for your selected Datadog site ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

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

To run the example application, you need a machine with [GNU Make][2] and [Docker][3]. Have your Datadog [API key][4] available.

### Install the example application

The example application starts up the Datadog Agent and a PostgreSQL database in a Docker container. While the application runs, the Agent sends database metrics to Datadog. You can view the data from the application in Datadog Database Monitoring.

Follow these instructions to install the example application on MacOS or Linux.

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

4. Start the application:
    ```
    make postgres
    ```

The command continues to run until you stop it by pressing Ctrl + C.

## Identify an expensive query

Which query consumes the most database time? To find out, use the Query Metrics view.

1. On the [Database Monitoring][6] page, click the **Query metrics** tab in the UI.

2. Sort the Normalized Query table by **Percent time** to see the query that the database spends the most time executing.

   The query that consumes the most database time appears on the first line:

   {{< img src="database_monitoring/dbm_qm_sort_time.png" alt="Normalized queries sorted by percent time" style="width:100%;">}}

## Troubleshoot a slow query

In addition to identifying slow queries, Datadog Database Monitoring can help you diagnose them. A query's Explain Plan describes the steps that the database takes to resolve the query. View an Explain Plan by clicking on a sample in the Query Samples view.

1. Navigate to the Query Samples view within [Database Monitoring][6] by selecting the **Samples** tab.

2. In the **In** dropdown, select **Explain Plans**. 

3. Sort the Normalized Query table by **Duration**.

   {{< img src="database_monitoring/dbm_qs_explain_plan_duration.png" alt="Normalized query samples sorted by duration">}}

4. Find a query in the table with data in the **Explain Plan** column and click on it to open the Sample Details page. 

5. Under **Explain Plan**, click **List View**. This Explain Plan at the bottom of the Explain Plan Sample page shows that the query requires an _Index Scan_.

   {{< img src="database_monitoring/dbm_qs_explain_plan_list_view.png" alt="Query explain plan showing Index Scan">}}

## Visualize database health and performance

To understand the health and performance of your databases at a glance, add Datadog Database Monitoring metrics to a dashboard.

### View changes in query volume

For example, you can see the absolute change in query volume in the past hour by adding a **Change** widget to track a query count metric.

1. Select **Dashboards > New Dashboard** in the UI.

2. Enter a name for your dashboard. Click the **New Dashboard** button to go to your new dashboard.

2. To add content to your dashboard, click **Add Widgets**.

3. In the widget carousel, select the **Change** widget.

4. Select `postgresql.queries.count` in the **Metric** dropdown. This metric counts the number of queries sent to a PostgreSQL database.

5. Select `host` in the **Break it down by** dropdown so that the widget aggregates queries by host.

   {{< img src="database_monitoring/dashboard_change_postgres.png" alt="Configure change widget for postgres queries metric" style="width:100%;">}}

7. Click the **Save** button. The dashboard shows your new widget.

   {{< img src="database_monitoring/dashboard_change_widget.png" alt="Change widget showing query count" style="width:100%;">}}

### View out-of-the-box dashboards

Observe current database activity, resource utilization, and more on out-of-the-box dashboards provided by Datadog Database Monitoring.

To access the dashboards, from the [Database Monitoring][6] page, select the **Dashboards** tab and choose the dashboard that you want to see.

You can clone and modify out-of-the-box dashboards to suit your needs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://www.gnu.org/software/make/
[3]: https://www.docker.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://github.com/DataDog/dd-database-monitoring-example
[6]: https://app.datadoghq.com/databases
