---
title: Database Monitoring
kind: documentation
description: Learn about Database Monitoring and get started
further_reading:
- link: "https://www.datadoghq.com/blog/database-performance-monitoring-datadog"
  tag: "Blog"
  text: "Monitor and visualize database performance"
- link: "https://www.datadoghq.com/blog/sql-server-and-azure-managed-services-database-monitoring/"
  tag: "Blog"
  text: "Monitor SQL Server and Azure managed databases with Datadog DBM"
- link: "/database_monitoring/data_collected/"
  tag: "Documentation"
  text: "Data Collected"
- link: "/database_monitoring/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting"
algolia:
  tags: ['database monitoring', 'dbm']
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

{{< img src="database_monitoring/dbm-main.png" alt="Database Monitoring" style="width:100%;">}}

Datadog Database Monitoring provides deep visibility into databases across all of your hosts. Dig into historical query performance metrics, explain plans, and host-level metrics all in one place, to understand the health and performance of your databases and troubleshoot issues as they arise.

## Getting started

Datadog Database Monitoring supports self-hosted and managed cloud versions of **Postgres**, **MySQL**, and **SQL Server**. To get started with Datadog Database Monitoring, configure your database and install the Datadog Agent. For setup instructions, select your database technology:

### Postgres

{{< partial name="dbm/dbm-setup-postgres" >}}
<p></p>

### MySQL

{{< partial name="dbm/dbm-setup-mysql" >}}
<p></p>

### SQL Server

{{< partial name="dbm/dbm-setup-sql-server" >}}
<p></p>

## Explore Datadog Database Monitoring

Navigate to Database Monitoring by clicking **[APM > Databases][1]** in the UI.

### Dig into query performance metrics

The [Query Metrics view][2] shows historical query performance for normalized queries. Visualize performance trends by infrastructure or custom tags such as datacenter availability zone, and set alerts for anomalies.

- Identify slow queries and which queries are consuming the most time.
- Show database-level metrics not captured by APM such as rows updated/returned.
- Filter and group queries by arbitrary dimensions such as team, user, cluster, and host.

{{< img src="database_monitoring/dbm-query-metrics.png" alt="Database Monitoring" style="width:100%;">}}

### Explore query samples

The [Query Samples view][3] helps you understand which queries are running at a given time. Compare each execution to the average performance of the query and related queries.

- Identify unusually slow but infrequent queries not captured by metrics.
- Find outliers in a query's execution time or execution cost.
- Attribute a specific query execution to a user, application, or client host.

{{< img src="database_monitoring/dbm-query-sample.png" alt="Database Monitoring" style="width:100%;">}}

### Understand before you run

[Explain Plans][4] help you understand how the database plans to execute your queries.

- Step through each operation to identify bottlenecks.
- Improve query efficiency and save on costly sequential scans on large tables.
- See how a query's plan changes over time.

{{< img src="database_monitoring/dbm-explain-plan.png" alt="Database Monitoring" style="width:100%;">}}

### Visualize everything on enriched dashboards

Quickly pinpoint problem areas by viewing database and system metrics together on enriched integration dashboards for both self-hosted and cloud-managed instances. Clone dashboards for customization and enhancement with your own custom metrics. Click the **Dashboards** link at the top of the Query Metrics and Query Samples pages to go to the Database Monitoring dashboards.

{{< img src="database_monitoring/dbm-dashboard-postgres.png" alt="Database Monitoring" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /database_monitoring/query_metrics/
[3]: /database_monitoring/query_samples/
[4]: /database_monitoring/query_metrics/#explain-plans
