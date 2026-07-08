---
title: Database Monitoring
description: Learn about Database Monitoring and get started
further_reading:
- link: "https://www.datadoghq.com/blog/analyzing-roundtrip-query-latency"
  tag: "Blog"
  text: "Analyzing round trip query latency"
- link: "https://www.datadoghq.com/blog/database-monitoring-recommendations/"
  tag: "Blog"
  text: "Improve database host and query performance with Database Monitoring Recommendations"
- link: "https://www.datadoghq.com/blog/database-performance-monitoring-datadog"
  tag: "Blog"
  text: "Monitor and visualize database performance"
- link: "https://www.datadoghq.com/blog/sql-server-and-azure-managed-services-database-monitoring/"
  tag: "Blog"
  text: "Monitor SQL Server and Azure managed databases with Datadog DBM"
- link: "https://www.datadoghq.com/blog/mongodb-database-monitoring/"
  tag: "Blog"
  text: "Track and troubleshoot MongoDB performance with Datadog Database Monitoring"
- link: "https://www.datadoghq.com/blog/datadog-database-research/"
  tag: "Blog"
  text: "How microservice architectures have shaped the usage of database technologies"
- link: "/database_monitoring/data_collected/"
  tag: "Documentation"
  text: "Data Collected"
- link: "/database_monitoring/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting"
- link: "https://dtdg.co/fe"
  tag: "Foundation Enablement"
  text: "Join an interactive session to level up your Database Monitoring"
- link: "https://learn.datadoghq.com/courses/database-monitoring"
  tag: "Learning Center"
  text: "Monitoring a Postgres Database with Datadog DBM"
algolia:
  tags: ['database monitoring', 'dbm']
cascade:
    algolia:
        rank: 70
---


{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Database">}}
  With Database Monitoring, learn how to quickly pinpoint costly and slow queries. Drill into precise execution details to address bottlenecks.
{{< /learning-center-callout >}}

Datadog Database Monitoring provides deep visibility into databases across all of your hosts. Dig into historical query performance metrics, explain plans, and host-level metrics all in one place, to understand the health and performance of your databases and troubleshoot issues as they arise.

## Getting started

Datadog Database Monitoring supports self-hosted and managed cloud versions of **Postgres**, **MySQL**, **Oracle**, **SQL Server**, **MongoDB**, **Amazon DocumentDB**, and **ClickHouse**. To get started with Datadog Database Monitoring, configure your database and install the Datadog Agent. For setup instructions, select your database technology:

### Postgres

{{< card-grid >}}
  {{< image-card href="/database_monitoring/setup_postgres/selfhosted" src="integrations_logos/postgres.png" alt="Selfhosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_postgres/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_postgres/aurora" src="integrations_logos/aurora.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_postgres/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
  {{< image-card href="/database_monitoring/setup_postgres/alloydb" src="integrations_logos/google_cloud_alloydb.png" alt="Google Cloud SQL" image_width="80">}}
  {{< image-card href="/database_monitoring/setup_postgres/azure" src="integrations_logos/azure_db_for_postgresql.png" alt="PostgreSQL" >}}
  {{< image-card href="/database_monitoring/setup_postgres/heroku" src="integrations_logos/heroku.png" alt="PostgreSQL" >}}
  {{< image-card href="/database_monitoring/setup_postgres/supabase" src="integrations_logos/supabase.png" alt="Supabase" >}}
{{< /card-grid >}}
<p></p>

### MySQL

{{< card-grid card_width="130px">}}
  {{< image-card href="/database_monitoring/setup_mysql/selfhosted" src="integrations_logos/mysql.png" alt="Selfhosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_mysql/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_mysql/aurora" src="integrations_logos/aurora.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_mysql/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
  {{< image-card href="/database_monitoring/setup_mysql/azure" src="integrations_logos/azure_db_for_mysql.png" alt="MySQL" >}}
{{< /card-grid >}}
<p></p>

### Oracle

{{< card-grid card_width="130px">}}
  {{< image-card href="/database_monitoring/setup_oracle/selfhosted" src="integrations_logos/oracle.png" alt="Selfhosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_oracle/rds" src="integrations_logos/amazon_rds.png" alt="RDS" title="RDS" >}}
  {{< image-card href="/database_monitoring/setup_oracle/rac" src="integrations_logos/oracle.png" alt="RAC" title="RAC" >}}
  {{< image-card href="/database_monitoring/setup_oracle/exadata" src="integrations_logos/oracle.png" alt="Exadata" title="Exadata" >}}
  {{< image-card href="/database_monitoring/setup_oracle/autonomous_database" src="integrations_logos/oracle.png" alt="Selfhosted" title="Autonomous Database" >}}
{{< /card-grid >}}
<p></p>

### SQL Server

{{< card-grid >}}
  {{< image-card href="/database_monitoring/setup_sql_server/selfhosted" src="integrations_logos/sqlserver.png" alt="Selfhosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/azure" src="integrations_logos/azure.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
{{< /card-grid >}}
<p></p>

### MongoDB

{{< card-grid >}}
  {{< image-card href="/database_monitoring/setup_mongodb/selfhosted" src="integrations_logos/mongo.png" alt="Self-hosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_mongodb/mongodbatlas" src="integrations_logos/mongodb_atlas.png" alt="MongoDB Atlas" title="MongoDB Atlas" >}}
{{< /card-grid >}}
<p></p>

### Amazon DocumentDB

{{< card-grid >}}
  {{< image-card href="/database_monitoring/setup_documentdb/amazon_documentdb" src="integrations_logos/amazon_documentdb.png" alt="Amazon DocumentDB" title="Amazon DocumentDB" >}}
{{< /card-grid >}}
<p></p>

### ClickHouse

{{< card-grid >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/selfhosted" src="integrations_logos/clickhouse.png" alt="Self-hosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/cloud" src="integrations_logos/clickhouse.png" alt="ClickHouse Cloud" title="ClickHouse Cloud" >}}
{{< /card-grid >}}
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

### Collect custom metrics

Use [`custom_queries`][7] to collect metrics from your own database tables — application state, business counters, queue depths, or any data you want correlated with query performance.

### Visualize everything on enriched dashboards

Quickly pinpoint problem areas by viewing database and system metrics together on enriched integration dashboards for both self-hosted and cloud-managed instances. Clone dashboards for customization and enhancement with your own custom metrics. Click the {{< ui >}}Dashboards{{< /ui >}} link at the top of the Query Metrics and Query Samples pages to go to the Database Monitoring dashboards.

{{< img src="database_monitoring/dbm-dashboard-postgres.png" alt="Database Monitoring" style="width:100%;">}}

### Optimize host health and performance

On the [Databases page][1], you can assess the health and activity of your database hosts. Sort and filter the list to prioritize hosts with triggered alerts, high query volume, and other criteria. Click on an individual host to view details such as its configuration, common blocking queries, and calling services. See [Exploring Database Hosts][5] for details.

{{< img src="database_monitoring/databases-list.png" alt="The Databases page in Datadog" style="width:90%;" >}}

### View optimization recommendations

The [Recommendations page][6] highlights problems and optimization opportunities, helping you save time by prioritizing what's most important. Select a recommendation to view details, including a summary of the problem, as well as potential next steps to address the issue.

{{< img src="database_monitoring/recommendations-page.png" alt="The Recommendations page in Datadog" style="width:90%;" >}}


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
[6]: /database_monitoring/recommendations/
[7]: /database_monitoring/custom_metrics/
