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
    - link: '/blog/database-performance-monitoring-datadog/'
      tag: 'Blog'
      text: 'Database performance monitoring with Datadog'
---
## Overview

Datadog Database Monitoring allows you to easily understand the health and performance of your databases, and quickly determine the root cause of any problems.

In one place, you can view:

* Host-level metrics
* Explain plans
* Historical query performance metrics

In this guide, you will learn how to set up Datadog Database Monitoring on an example PostgreSQL database. You will identify an expensive query, troubleshoot a slow query, and quickly view changes in query volume.

## Setup

### Prerequisites

Before getting started, you need a Datadog account.

To run the example application, you need a machine with [GNU Make][1] and [Docker][2]. Have your Datadog [API key][3] available.

### Install the example application

The example application starts up the Datadog Agent and a PostgreSQL database in a Docker container. While the application runs, the Agent sends database metrics to Datadog. You can view the data from the application in Datadog Database Monitoring.

Follow these instructions to install the example application on MacOS or Linux.

1. Download the [archive][4] containing the example application.

2. Extract the archive to a location on disk:
```
tar -xvf database-management.tgz
```

3. Change to the `database-management` directory in the extracted archive:
```
cd database-management
```

4. Set the environment variable `DD_API_KEY` to your Datadog API key:
```
export DD_API_KEY=<API_KEY>
```

5. Start the application:
```
make postgres
```

The command will continue to run until you stop it by pressing Ctrl + C.

## Identify an expensive query

Which query consumes the most database time? To find out, use the Query Metrics view.

1. Navigate to Database Monitoring by clicking **APM > Databases** in the UI. You will see the Query Metrics view.

2. Sort the Normalized Query table by **Percent time** to see the query that the database spends the most time executing.

The query that consumes the most database time will appear on the first line.

{{< img src="database_monitoring/dbm_qm_sort_time.png" alt="Normalized queries sorted by percent time" style="width:100%;">}}

## Troubleshoot a slow query

In addition to identifying slow queries, Datadog Database Monitoring can help you diagnose them. A query's Explain Plan describes the steps that the database takes to resolve the query. View an Explain Plan by clicking on a sample in the Query Samples view.

Navigate to the Query Samples view within Database Monitoring by clicking **[APM > Databases][5]**, and selecting the **Query Samples** tab in the UI.

Sort the Normalized Query table by **Duration**.

{{< img src="database_monitoring/dbm_qs_sort_duration.png" alt="Normalized query samples sorted by duration" style="width:100%;">}}

Find a query in the table with data in the **Explain Plan** column, and click on it to open the Sample Details page. This Explain Plan at the bottom of Sample Details shows that the query requires an _Index Scan_.

{{< img src="database_monitoring/dbm_qs_explain_plan.png" alt="Query explain plan showing Index Scan" style="width:100%;">}}

## View changes in query volume

To understand the health and performance of your databases at a glance, add Datadog Database Monitoring metrics to a dashboard.

For example, you can see the absolute change in query volume in the past hour by adding a **Change** widget to track a query count metric.

1. Select **Dashboards > New Dashboard** in the UI.

2. Enter a name for your dashboard. Click the **New Dashboard** button to go to your new dashboard.

2. To add content to your dashboard, click **Add Widgets**.

3. In the widget carousel, select the **Change** widget.

4. Select `postgresql.queries.count` in the **Metric** dropdown. This metric counts the number of queries sent to a PostgreSQL database.

5. Select `host` in the **Break it down by** dropdown so the widget aggregates queries by host.

{{< img src="database_monitoring/dashboard_change_postgres.png" alt="Configure change widget for postgres queries metric" style="width:100%;">}}

7. Click the **Save** button. The dashboard shows your new widget.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.gnu.org/software/make/
[2]: https://www.docker.com/
[3]: https://app.datadoghq.com/account/settings#api
[4]: /resources/examples/database-management.tgz
[5]: https://app.datadoghq.com/databases
