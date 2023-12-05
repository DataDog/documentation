---
title: Exploring Database Hosts
kind: documentation
description: Explore and dig into your database host health and configuration

---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

{{< img src="database_monitoring/databases-list.png" alt="The Databases page in Datadog" style="width:90%;" >}}

On the [Databases page][1], you can assess the health and activity of your database hosts. Sort and filter the list to prioritize hosts with triggered alerts, high query volume, and other criteria. Click on any host in the list to open a details panel:

{{< img src="database_monitoring/db-list-details-panel.png" alt="The details panel for a single database host on the Databases page" style="width:90%;" >}}

In addition to a filterable graph of active connections for that host, the host details panel displays the following features.

|                                                 | Postgres  | SQL Server | MySQL     | Oracle    |
|-------------------------------------------------|-----------|------------|-----------|-----------|
| [Top queries](#top-queries)                     | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Metrics](#metrics)                             | {{< X >}} | {{< X >}}  |           |           |
| [Active connections](#active-connections)       | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Blocking queries](#blocking-queries)           | {{< X >}} | {{< X >}}  |           |           |
| [Calling services](#calling-services)           | {{< X >}} | {{< X >}}  | {{< X >}} |           |
| [Configuration details](#configuration-details) | {{< X >}} | {{< X >}}  | {{< X >}} |           |

## Top queries

On the **Top Queries** tab of the host details panel, you can sort the most common queries by maximum duration, average latency, and more.

{{< img src="database_monitoring/db-list-top-queries.png" alt="The Top Queries tab of the details panel for a single database host on the Databases page" style="width:90%;" >}}

Click on any query statement to open a details panel that includes:
- query insights
- graphs for average latency and other key metrics
- explain plans
- blocking activity
- hosts that have run the query
- calling services

{{< img src="database_monitoring/db-list-query-details.png" alt="The details panel for an individual top query" style="width:90%;" >}}

## Metrics

On the **Metrics** tab of the host details panel, you can view and filter metrics for system health, query activity, blocking operations, function performance, and other key areas.

{{< img src="database_monitoring/db-list-metrics.png" alt="The Metrics tab of the details panel for a single database host on the Databases page" style="width:90%;" >}}

## Active connections

The **Active Connections** tab of the host details panel displays the live queries being executed on the host.

{{< img src="database_monitoring/db-list-active-connections.png" alt="The Active Connections tab of the details panel for a single database host on the Databases page" style="width:90%;" >}}

Click on a query statement to open a panel that includes event attributes, related traces, and other relevant details.

{{< img src="database_monitoring/db-list-active-connection-details.png" alt="Details panel for an individual active connection" style="width:90%;" >}}

## Blocking queries

On the **Blocking Queries** tab of host details panel, you can view visualizations for:

- blocking query durations
- blocking query executions
- the number of waiting queries

You can search and filter the queries or samples. Click any individual query row to view details.

{{< img src="database_monitoring/db-list-blocking-queries.png" alt="The Blocking Queries tab of the details panel for a single database host on the Databases page" style="width:90%;" >}}

## Calling services

On the **Calling Services** tab of the host details panel, you can view the list of services that have called the host. The displayed service information includes when the service was deployed, the number of requests made to the host per second, how many database queries were executed, and more.

{{< img src="database_monitoring/db-list-calling-services.png" alt="The Calling Services tab of the details panel for a single database host on the Databases page" style="width:90%;" >}}

Click any service row to view its APM dashboard.

## Configuration details

<div class="alert alert-info">The host must have <code>collect_settings</code> enabled in its <a href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L397">instance configuration</a> for this feature to work properly.</div>

The **Configuration** tab of the host details panel provides a direct view into the host's configuration parameters without compromising database security. Use it to identify misconfigured database parameters and adjust settings to optimize database performance.

{{< img src="database_monitoring/db-list-configuration.png" alt="The Configuration tab of the details panel for a single database host on the Databases page" style="width:90%;" >}}

[1]: https://app.datadoghq.com/databases