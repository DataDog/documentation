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
- link: "https://dtdg.co/fe"
  tag: "Foundation Enablement"
  text: "Join an interactive session to level up your Database Monitoring"
algolia:
  tags: ['database monitoring', 'dbm']
cascade:
    algolia:
        rank: 70
---
Datadog Database Monitoring provides deep visibility into databases across all of your hosts. Dig into historical query performance metrics, explain plans, and host-level metrics all in one place, to understand the health and performance of your databases and troubleshoot issues as they arise.

## Getting started

Datadog Database Monitoring supports self-hosted and managed cloud versions of **Postgres**, **MySQL**, **Oracle**, and **SQL Server**. To get started with Datadog Database Monitoring, configure your database and install the Datadog Agent. For setup instructions, select your database technology:

### Postgres

{{< partial name="dbm/dbm-setup-postgres" >}}
<p></p>

### MySQL

{{< partial name="dbm/dbm-setup-mysql" >}}
<p></p>

### Oracle

{{< partial name="dbm/dbm-setup-oracle" >}}
<p></p>

### SQL Server

{{< partial name="dbm/dbm-setup-sql-server" >}}
<p></p>

## Explore Datadog Database Monitoring

Navigate to [Database Monitoring][1] in Datadog.

### Dig into query performance metrics

The [Query Metrics view][2] shows historical query performance for normalized queries. Visualize performance trends by infrastructure or custom tags such as datacenter availability zone, and set alerts for anomalies.

- Identify slow queries and which queries are consuming the most time.
- Show database-level metrics not captured by APM such as rows updated/returned.
- Filter and group queries by arbitrary dimensions such as team, user, cluster, and host.

{{< img src="database_monitoring/dbm-query-metrics-2.png" alt="Database Monitoring" style="width:100%;">}}

### Explore query samples

The [Query Samples view][3] helps you understand which queries are running at a given time. Compare each execution to the average performance of the query and related queries.

- Identify unusually slow but infrequent queries not captured by metrics.
- Find outliers in a query's execution time or execution cost.
- Attribute a specific query execution to a user, application, or client host.

{{< img src="database_monitoring/dbm-query-sample-2.png" alt="Database Monitoring" style="width:100%;">}}

### Understand before you run

[Explain Plans][4] help you understand how the database plans to execute your queries.

- Step through each operation to identify bottlenecks.
- Improve query efficiency and save on costly sequential scans on large tables.
- See how a query's plan changes over time.

{{< img src="database_monitoring/dbm-explain-plan-3.png" alt="Database Monitoring" style="width:100%;">}}

### Visualize everything on enriched dashboards

Quickly pinpoint problem areas by viewing database and system metrics together on enriched integration dashboards for both self-hosted and cloud-managed instances. Clone dashboards for customization and enhancement with your own custom metrics. Click the **Dashboards** link at the top of the Query Metrics and Query Samples pages to go to the Database Monitoring dashboards.

{{< img src="database_monitoring/dbm-dashboard-postgres.png" alt="Database Monitoring" style="width:100%;">}}

### Optimize host health and performance

On the [Databases page][1], you can assess the health and activity of your database hosts. Sort and filter the list to prioritize hosts with triggered alerts, high query volume, and other criteria. Click on an individual host to view details such as its configuration, common blocking queries, and calling services. See [Exploring Database Hosts][5] for details.

{{< img src="database_monitoring/databases-list.png" alt="The Databases page in Datadog" style="width:90%;" >}}

## Further Reading

{{< learning-center-callout header="Try Monitoring a Postgres Database with Datadog DBM in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/database-monitoring">}}
  The Datadog Learning Center is full of hands-on courses to help you learn about this topic. Enroll at no cost to identify inefficiencies and optimize your Postgres database.
{{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /database_monitoring/query_metrics/
[3]: /database_monitoring/query_samples/
[4]: /database_monitoring/query_metrics/#explain-plans
[5]: /database_monitoring/database_hosts/
