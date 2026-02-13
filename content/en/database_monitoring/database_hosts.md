---
title: Exploring Database Hosts
description: Explore and dig into your database host health and configuration

---

{{< img src="database_monitoring/databases-list-4.png" alt="The Databases page in Datadog" style="width:100%;" >}}

On the [Databases page][1], you can assess the health and activity of your database hosts and [clusters](#cluster-grouping). Sort and filter the list to prioritize hosts and clusters with triggered alerts, high query volume, and other criteria. Click on any host in the list to open a details panel:


{{< img src="database_monitoring/db-list-details-panel-cropped-3.png" alt="The details panel for a single database host on the Databases page" style="width:90%;" >}}

In addition to a filterable graph of active connections for that host, the host details panel displays the following features.

|                                                 | Postgres  | SQL Server | MySQL     | Oracle    |
|-------------------------------------------------|-----------|------------|-----------|-----------|
| [Top queries](#top-queries)                     | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Stored procedures](#stored-procedures)         |           | {{< X >}}  |           |           |
| [Metrics](#metrics)                             | {{< X >}} | {{< X >}}  |           |           |
| [Active connections](#active-connections)       | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Schema](#schema)                               | {{< X >}} | {{< X >}}  |           |           |
| [Blocking queries](#blocking-queries)           | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Calling services](#calling-services)           | {{< X >}} | {{< X >}}  | {{< X >}} |           |
| [Configuration details](#configuration-details) | {{< X >}} | {{< X >}}  | {{< X >}} |           |

## Cluster grouping
A **Group into clusters** toggle appears with the list of database hosts if host tags indicate the presence of cluster topology. Enable this toggle to group hosts into clusters within the list.

Cluster rows display a **Cluster** badge and show the number of instances in the cluster. Columns for cluster rows display aggregated data from all instances within the cluster. Select a cluster row to expand it and view a list of all instances that the cluster contains.

Cluster grouping supports the following database technology and cluster topologies:

<table>
  <colgroup>
    <col style="width:15%">
    <col style="width:20%">
    <col style="width:30%">
    <col style="width:35%">
  </colgroup>
  <thead>
    <tr>
      <th>Database</th>
      <th>Topologies</th>
      <th>Grouping Tags</th>
      <th>Cluster Name Source</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Amazon RDS<br><em>(AWS integration required)</em></td>
      <td>
        <ul>
          <li>Multi-AZ clusters</li>
          <li>Read replicas</li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>dbclusteridentifier</code></li>
          <li><code>region</code></li>
          <li><code>aws_account</code></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>dbclusteridentifier</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>PostgreSQL<br><em>(Agent v7.58+ required)</em></td>
      <td>
        <ul>
          <li>Physical replication</li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>system_identifier</code></li>
          <li><code>env</code></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>postgresql_cluster_name</code> (from instance <code>cluster_name</code> config)</li>
          <li>Primary instance name</li>
          <li><code>system_identifier</code></li>
        </ul>
      </td>
    </tr>
        <tr>
      <td>MySQL<br><em>(Agent v7.68+ required)</em></td>
      <td>
        <ul>
          <li>Regular replication (not group replication)</li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>cluster_uuid</code></li>
          <li><code>env</code></li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Primary instance name</li>
          <li><code>cluster_uuid</code></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

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

### Stored procedures

Where supported, the **Top Queries** tab includes a **Stored Procedures** section that lists each stored procedure by name, along with its average duration, logical reads count, logical writes count, and more. Expand a stored procedure to view its individual SQL queries, and click on a query to view its details panel.

{{< img src="database_monitoring/stored-procedures.png" alt="A list of stored procedures, with one expanded to show its SQL query" style="width:90%;" >}}

## Metrics

On the **Metrics** tab of the host details panel, you can view and filter metrics for system health, query activity, blocking operations, function performance, and other key areas.

{{< img src="database_monitoring/db-list-metrics.png" alt="The Metrics tab of the details panel for a single database host on the Databases page" style="width:90%;" >}}

## Active connections

The **Active Connections** tab of the host details panel displays the live queries being executed on the host. Click on a query statement to open a panel that includes event attributes, related traces, and other relevant details.

{{< img src="database_monitoring/db-list-active-connections-2.png" alt="The Active Connections tab of the details panel for a single database host on the Databases page" style="width:90%;" >}}

### Cancel a live query

You can [set up the Cancel Query integration][2] to cancel live Postgres queries.

To cancel a long running database query directly from Datadog:
1. In **Active Connections**, click **Cancel Query**:
   {{< img src="database_monitoring/db-cancel-query-button.png" alt="The Cancel Query button inside the Active Connections panel" style="width:90%;" >}}
1. Select a connection and click **Run Action**:
   {{< img src="database_monitoring/db-cancel-query-modal.png" alt="The Cancel Query modal when opened" style="width:90%;" >}}

The query is canceled after the run completes.


## Schema

Use the **Schema** tab to explore database structures, tables, columns, data types, existing foreign keys, and indexing strategies for every database on a host.

{{< img src="database_monitoring/db-list-schema-tab.png" alt="The Schema tab of the details panel for a single database host on the Databases page" style="width:90%;" >}}

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
[2]: /database_monitoring/setup_postgres/advanced_configuration/#set-up-cancel-query-integration