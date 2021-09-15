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

* host-level metrics
* explain plans
* historical query performance metrics

In this guide, you will learn how to set up Datadog Database Monitoring on a sample Postgres or MySQL database. You will identify and troubleshoot a slow query, and view historical database metrics in a dashboard.

## Setup

### Prerequisites

Before getting started, you need a Datadog account.

To run the example application, you need a machine with [GNU Make][1] and [Docker][2]. Have your Datadog [API key][3] available.

### Install the example application

The example application starts up the Datadog Agent and a Postgres database in a Docker container. While the application runs, the Agent sends database metrics to Datadog. You can view the data from the application in Datadog Database Monitoring.

Follow these instructions to install the example application on MacOS or Linux.

1. Download the [archive][4] containing the example application.

2. Extract the archive to a location on disk. `tar -xvf database-management.tgz`

3. Change to the `database-management` directory in the extracted archive: `cd database-management`

4. Set the environment variable `DD_API_KEY` to your Datadog API key using `export DD_API_KEY=<API_KEY>`.

5. Run `make postgres`.

The command will continue to run until you stop it by pressing Ctrl + C.

## Identify a slow query

Which query uses the most database time? To find out, use the Query Metrics view.

1. Navigate to Database Monitoring by clicking APM > Databases in the UI. By default, you will start on the Query Metrics tab.

2. Sort the Normalized Query table by **Percent time** to see at a glance which queries are the slowest.

The query that uses the most database time will appear on the first line.

{{< img src="database_monitoring/dbm_qm_sort_time.png" alt="Normalized queries sorted by percent time" style="width:100%;">}}

## Troubleshoot a slow query

After identifying a slow query, you may want to understand why it runs slowly. A query's Explain Plan describes the steps that the database takes to resolve the query. You can view an Explain Plan by clicking on a sample in the Query Samples view.

Navigate to the Query Samples view within Database Monitoring by clicking **[APM > Databases][5]**, and selecting the **Query Samples** tab in the UI.

Sort the Normalized Query table by **Duration**.

{{< img src="database_monitoring/dbm_qs_sort_duration.png" alt="Normalized query samples sorted by duration" style="width:100%;">}}

Find a query in the table with data in the Explain Plan column, and click on it to open the Sample Details page. This Explain Plan at the bottom of Sample Details shows that this query requires an Index Scan.

{{< img src="database_monitoring/dbm_qs_explain_plan.png" alt="Query explain plan showing Index Scan" style="width:100%;">}}

## Create a dashboard to view historical database metrics

Note from Ursula: I am on the fence about including this part. My current thinking is that 2 use cases is sufficient for the Getting Started Guide, and information on which DBM metrics can be added to dashboards should go in the main DBM docs.

If I did flesh out this section, these would be the steps:
1. create new dashboard
2. click Add Widgets
3. select Change
4. set Metric to `postgresql.queries.count`. break it down by `Host`
5. Screenshot
6. set title to "Query Volume Changes By Host"
7. click Save
8. Screenshot

alternately, show them the default dashboard that Datadog creates automatically?

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.gnu.org/software/make/
[2]: https://www.docker.com/
[3]: https://app.datadoghq.com/account/settings#api
[4]: /resources/examples/database-management.tgz
[5]: https://app.datadoghq.com/databases
