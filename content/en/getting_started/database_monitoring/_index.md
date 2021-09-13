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

With historical query performance metrics, explain plans, and host-level metrics all in one place, Datadog Database Monitoring enables developers and database administrators to easily understand the health and performance of their databases, and quickly troubleshoot any issues that arise.

This guide demonstrates how to set up Datadog Database Monitoring on a sample system. You will learn how to identify and troubleshoot a slow query, and how to view historical database metrics in a dashboard.

## Setup

### Prerequisites

Before getting started, you need a Datadog account linked to a host with the Datadog Agent installed. To verify, check your Infrastructure List in Datadog.

To run the example application, you need a machine with [GNU Make][1] and [Docker][2]. Have your Datadog [API key][3] available.

### Install the example application

Follow these instructions to install the example application on MacOS or Linux.

{{< tabs >}}

{{% tab "Postgres" %}}

1. Download the [archive][1] containing the example application.

2. Extract the archive to a location on disk. `tar -xvf database-management.tgz`

3. Change to the `database-management` directory in the extracted archive: `cd database-management`

4. Set the environment variable `DD_API_KEY` to your Datadog API key using `export DD_API_KEY=<API_KEY>`.

5. Run `make postgres`.

The command will continue to run until you stop it by pressing Ctrl + C.


[1]: /resources/examples/database-management.tgz
{{% /tab %}}

{{% tab "MySQL" %}}

1. Download the [archive][1] containing the example application.

2. Extract the archive to a location on disk. `tar -xvf database-management.tgz`

3. Change to the `database-management` directory in the extracted archive: `cd database-management`

4. Set the environment variable `DD_API_KEY` to your Datadog API key using `export DD_API_KEY=<API_KEY>`.

5. Run `make mysql`.

The command will continue to run until you stop it by pressing Ctrl + C.


[1]: /resources/examples/database-management.tgz
{{% /tab %}}

{{< /tabs >}}

## Data collected

Database Monitoring adds query metrics to the database state information collected from database integrations, enabling observability into database performance over time.

Note from Ursula: I am considering removing this section entirely, because it doesn't fit in with the main goal of this doc of teaching basic use of DBM.

## Identify a slow query

Navigate to Database Monitoring by clicking APM > Databases in the UI. By default, you will start on the Query Metrics tab.

Sort the Normalized Query table by **Percent time** to see at a glance which queries are the slowest.

The query that uses the most database time will appear on the first line.

{{< img src="database_monitoring/dbm_qm_sort_time.png" alt="Normalized queries sorted by percent time" style="width:100%;">}}

## Troubleshoot a slow query

Navigate to the Query Samples view within Database Monitoring by clicking **[APM > Databases][4]**, and selecting the **Query Samples** tab in the UI.

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
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/databases
