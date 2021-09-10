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

1. Download the [archive][4] containing the example application.

2. Extract the archive to a location on disk. `tar -xvf database-management.tgz`

3. Change directory to the `database` folder in the extracted archive: `cd database-management`

4. Set the environment variable `DD_API_KEY` to your Datadog API key using `export DD_API_KEY=<API_KEY>`.

5. Run `make postgres`.

The command will continue to run, executing queries, until you manually stop it with Ctrl-C.

## Data collected

Database Monitoring adds query metrics to the database state information collected from database integrations, enabling observability into database performance over time.

## Identify a slow query

Navigate to Database Monitoring by clicking APM > Databases in the UI. By default, you will start on the Query Metrics tab.

Sort the Normalized Query table by **Percent time** to see at a glance which queries are the slowest.

The query that uses the most database time will appear on the first line.

{{< img src="database_monitoring/dbm_qm_sort_time.png" alt="Normalized queries sorted by percent time" style="width:100%;">}}

## Troubleshoot a slow query

Navigate to the Query Samples view within Database Monitoring by clicking **[APM > Databases][5]**, and selecting the **Query Samples** tab in the UI.

Sort the Normalized Query table tby **Duration**.

## Create a dashboard to view historical database metrics

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.gnu.org/software/make/
[2]: https://www.docker.com/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /resources/examples/database-management.tgz
[5]: https://app.datadoghq.com/databases
