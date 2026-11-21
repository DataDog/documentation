---
title: Network Requirements for Data Observability
description: "Find the IP ranges and intake domains to allow for Data Observability Quality Monitoring, lineage, and Jobs Monitoring."
further_reading:
  - link: '/data_observability/quality_monitoring/'
    tag: 'Documentation'
    text: 'Quality Monitoring'
  - link: '/data_observability/jobs_monitoring/'
    tag: 'Documentation'
    text: 'Jobs Monitoring'
  - link: '/agent/configuration/network/'
    tag: 'Documentation'
    text: 'Agent network traffic and destinations'
---

## Overview

Data Observability uses two kinds of network connections:

- **Datadog connects to your data platform.** For data warehouse integrations and the Databricks APIs, Datadog connects to your account with the credentials you provide. If your platform restricts inbound access by IP address, add Datadog's IP ranges to your allowlist.
- **Your environment sends data to Datadog.** OpenLineage emitters and the Datadog Agent send job runs, lineage events, monitor results, and telemetry to Datadog over HTTPS. If your network restricts outbound traffic, allow the Datadog domains they use.

To see the values for your [Datadog site][1], click the {{< ui >}}DATADOG SITE{{< /ui >}} selector on the right.

| Source | Direction | What to allow |
|---|---|---|
| [Data warehouse integrations](#data-warehouse-integrations) | Datadog to your warehouse | IP addresses in the `webhooks` section of the {{< region-param key="ip_ranges_url" link="true" text="IP ranges list" >}} |
| [Databricks APIs](#databricks-apis) | Datadog to your Databricks workspace | IP addresses in the `webhooks` section of the {{< region-param key="ip_ranges_url" link="true" text="IP ranges list" >}} |
| [OpenLineage emitters](#openlineage-emitters) | Your environment to Datadog | `data-obs-intake.`{{< region-param key="dd_site" code="true" >}} |
| [Datadog Agent on Spark clusters](#datadog-agent-on-spark-clusters) | Your cluster to Datadog | The standard Agent destinations, and `data-obs-intake.`{{< region-param key="dd_site" code="true" >}} if you collect Spark lineage with OpenLineage |
| [Datadog Agent for PostgreSQL](#postgresql) (Preview) | Your Agent host to Datadog | The standard Agent destinations, including Remote Configuration and Database Monitoring, and `data-obs-intake.`{{< region-param key="dd_site" code="true" >}} |

## Data warehouse integrations

For data warehouse integrations, Datadog connects to your warehouse to sync metadata and query history and to run monitor queries. Only the resulting metric values are sent to Datadog, not row-level data from your tables. For custom SQL monitors, Datadog stores the values that your query returns. See [Data sent to Datadog][2].

If your warehouse restricts network access by IP address, add Datadog's IP addresses to the location in the following table. Use the addresses in the `webhooks` section of the {{< region-param key="ip_ranges_url" link="true" text="IP ranges list" >}}.

| Warehouse | Where to add the IP addresses |
|---|---|
| [Snowflake][3] | Your Snowflake network policy allowlist |
| [Databricks][4] | Your Databricks workspace allowlist |
| [BigQuery][5] | Your Google Cloud project allowlist |
| [Amazon Redshift][6] | The inbound rules of your VPC security group |
| [ClickHouse Cloud][7] (Preview) | Your service's IP Access List in ClickHouse Cloud |

IP ranges are different for each Datadog site. Confirm that you use the IP ranges list for your site.

## Databricks APIs

Jobs Monitoring for Databricks uses the Databricks APIs to collect traces for job runs, along with tags and other metadata. If you use IP access lists for these APIs, allow Datadog's {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP addresses" >}}.

Monitoring jobs on serverless compute doesn't require the Datadog Agent. Datadog reads job data from the Unity Catalog system tables through the SQL warehouse that you provide during setup. See [Jobs Monitoring for Databricks][8].

To monitor workspaces that use Databricks Private Link, see [Private Link Connectivity][9].

## OpenLineage emitters

The following sources send OpenLineage events to the Data Observability intake domain, `data-obs-intake.`{{< region-param key="dd_site" code="true" >}}:

- [Apache Airflow][10]
- [dbt Core][11]
- [AWS Glue][12], when you send Spark lineage from Glue jobs
- [Custom jobs using OpenLineage][13]

Emitters send events over HTTPS (port 443) to the `/api/v1/lineage` path. If your network restricts outbound traffic, allow `data-obs-intake.`{{< region-param key="dd_site" code="true" >}} by domain name from the hosts that run your emitters.

If you [set up the Datadog Agent as an OpenLineage proxy][14], your applications send events to the Agent. The Agent forwards them to `data-obs-intake.`{{< region-param key="dd_site" code="true" >}}. In this setup, allow the domain from the Agent's host.

## Datadog Agent on Spark clusters

Jobs Monitoring for Spark on [Databricks][8] clusters, [Amazon EMR][15], [Google Cloud Dataproc][16], and [Kubernetes][17] runs the Datadog Agent on your cluster. The Agent sends metrics, traces, and logs (if you enable log collection) to the standard Agent destinations. For the list of destinations, see [Network Traffic][18].

If you collect Spark lineage with OpenLineage on Amazon EMR or Kubernetes, the Datadog Java tracer sends lineage events to the local Agent. The Agent forwards them to `data-obs-intake.`{{< region-param key="dd_site" code="true" >}}. Allow this domain for outbound traffic from your cluster.

When you enable OpenLineage on Amazon EMR, the bootstrap action downloads the OpenLineage Spark JAR from Maven Central (`repo1.maven.org`). If an OpenLineage Spark JAR is already in `/usr/lib/spark/jars`, the bootstrap action skips the download.

## PostgreSQL

Data Observability for [PostgreSQL][19] is in Preview. Datadog doesn't connect to your database directly. The Datadog Agent runs on a host that can reach your database and makes the following outbound connections:

- Table metadata: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}
- Monitor queries, which the Agent receives through [Remote Configuration][20]: `config.`{{< region-param key="dd_site" code="true" >}}
- Monitor query results: `data-obs-intake.`{{< region-param key="dd_site" code="true" >}}

The Agent also sends metrics to the standard Agent destinations. See [Network Traffic][18].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: /data_observability/quality_monitoring/#data-sent-to-datadog
[3]: /data_observability/quality_monitoring/data_warehouses/snowflake/
[4]: /data_observability/quality_monitoring/data_warehouses/databricks/
[5]: /data_observability/quality_monitoring/data_warehouses/bigquery/
[6]: /data_observability/quality_monitoring/data_warehouses/redshift/
[7]: /data_observability/quality_monitoring/data_warehouses/clickhouse/
[8]: /data_observability/jobs_monitoring/databricks/
[9]: /data_observability/jobs_monitoring/databricks/private_link/
[10]: /data_observability/jobs_monitoring/airflow/
[11]: /data_observability/jobs_monitoring/dbt/
[12]: /data_observability/jobs_monitoring/glue/
[13]: /data_observability/jobs_monitoring/openlineage/
[14]: /data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage/
[15]: /data_observability/jobs_monitoring/emr/
[16]: /data_observability/jobs_monitoring/dataproc/
[17]: /data_observability/jobs_monitoring/kubernetes/
[18]: /agent/configuration/network/
[19]: /data_observability/quality_monitoring/transactional_databases/postgres/
[20]: /remote_configuration/
