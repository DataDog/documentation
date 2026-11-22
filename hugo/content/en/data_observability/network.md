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

- **Datadog connects to your data platform.** For data warehouse integrations and the Databricks APIs, Datadog connects to your account over HTTPS with the credentials you provide. If your platform restricts inbound access by IP address, add Datadog's webhook IP addresses to your allowlist.
- **Your environment connects to Datadog.** OpenLineage emitters and the Datadog Agent send job runs, lineage events, monitor results, and telemetry to Datadog over HTTPS on port 443. Your hosts open these connections, and Datadog doesn't open connections back to them. If your network restricts outbound traffic, allow the Datadog domains they use.

{{< img src="data_observability/network/network_connection_direction.png" alt="Diagram of who opens each connection: Datadog connects to your warehouse and Databricks APIs, and your emitters and Agent connect out to the intake." style="width:100%;" >}}

For Amazon Redshift, Amazon Athena, and AWS Glue, Datadog calls AWS APIs with your connected AWS account instead of connecting to your network. See [AWS integrations](#aws-integrations).

To see the values for your [Datadog site][1], click the {{< ui >}}DATADOG SITE{{< /ui >}} selector on the right.

| Source | Who opens the connection | What to allow |
|---|---|---|
| [Data warehouse integrations](#data-warehouse-integrations) | Datadog, to your warehouse | Datadog's {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP addresses" >}} |
| [AWS integrations](#aws-integrations) | Datadog, to AWS APIs | No network rule |
| [Databricks APIs](#databricks-apis) | Datadog, to your Databricks workspace | Datadog's {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP addresses" >}} |
| [OpenLineage emitters](#openlineage-emitters) | Your hosts, to Datadog | `data-obs-intake.`{{< region-param key="dd_site" code="true" >}} on port 443 |
| [Datadog Agent on Spark clusters](#datadog-agent-on-spark-clusters) | Your cluster, to Datadog | The standard Agent destinations, and `data-obs-intake.`{{< region-param key="dd_site" code="true" >}} if you collect Spark lineage with OpenLineage |
| [Datadog Agent for PostgreSQL](#postgresql) (Preview) | Your Agent host, to Datadog | The standard Agent destinations, including Remote Configuration and Database Monitoring, and `data-obs-intake.`{{< region-param key="dd_site" code="true" >}} |

## Data warehouse integrations

For data warehouse integrations, Datadog connects to your warehouse to sync metadata and query history and to run monitor queries. Datadog stores the metadata and query history it syncs. Monitor queries compute aggregate values, and Datadog stores those values, not row-level data from your tables. For Custom SQL monitors, Datadog stores the values that your query returns, including the values of grouped columns. See [Data sent to Datadog][2].

If your warehouse restricts network access by IP address, add Datadog's {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP addresses" >}} to the location in the following table.

| Warehouse | Datadog connects to | Where to add the IP addresses |
|---|---|---|
| [Snowflake][3] | Your account URL, `<ACCOUNT_IDENTIFIER>.snowflakecomputing.com`, on port 443 | Your Snowflake network policy allowlist |
| [Databricks][4] | Your workspace URL on port 443 | Your workspace IP access list |
| [BigQuery][5] | The BigQuery API, `bigquery.googleapis.com`, on port 443 | Your Google Cloud project allowlist |
| [ClickHouse Cloud][6] (Preview) | Your service's HTTPS endpoint on port 8443 | Your service's IP Access List in ClickHouse Cloud |

IP ranges are different for each Datadog site. Confirm that you use the IP ranges list for your site.

For [Microsoft Fabric][7] (Preview), Datadog connects to each warehouse's SQL endpoint. Workspaces that restrict inbound public access, such as workspaces that use private links, aren't supported.

## AWS integrations

For [Amazon Redshift][8], [Amazon Athena][9], and [AWS Glue][10], Datadog calls AWS APIs with the IAM role in your [connected AWS account][11]. Datadog runs Redshift queries through the [Amazon Redshift Data API][12]. Your cluster or workgroup doesn't need an inbound rule for Datadog.

To send Spark lineage from AWS Glue jobs, see [OpenLineage emitters](#openlineage-emitters).

## Databricks APIs

Jobs Monitoring for Databricks uses the Databricks APIs to collect traces for job runs, along with tags and other metadata. If you use IP access lists for these APIs, allow Datadog's {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP addresses" >}}.

Monitoring jobs on serverless compute doesn't require the Datadog Agent. Datadog reads job data from the Unity Catalog system tables through the SQL warehouse that you provide during setup. See [Jobs Monitoring for Databricks][13].

To monitor workspaces that use Databricks Private Link, see [Private Link Connectivity][14].

## OpenLineage emitters

The following sources send OpenLineage events to the Data Observability intake domain, `data-obs-intake.`{{< region-param key="dd_site" code="true" >}}:

- [Apache Airflow][15]
- [dbt Core][16]
- [AWS Glue][17], when you send Spark lineage from Glue jobs
- [Custom jobs using OpenLineage][18]

Emitters send events over HTTPS (port 443) to the `/api/v1/lineage` path. If your network restricts outbound traffic, allow `data-obs-intake.`{{< region-param key="dd_site" code="true" >}} by domain name from the hosts that run your emitters.

If you [set up the Datadog Agent as an OpenLineage proxy][19], your applications send events to the Agent over HTTP. The Agent listens on its trace port, `8126` by default, and forwards the events to `data-obs-intake.`{{< region-param key="dd_site" code="true" >}} over HTTPS. In this setup, allow the domain from the Agent's host. If the Agent runs on a different host than your applications, also allow traffic from your applications to the Agent on that port.

## Datadog Agent on Spark clusters

Jobs Monitoring for Spark on [Databricks][13] clusters, [Amazon EMR][20], [Google Cloud Dataproc][21], and [Kubernetes][22] runs the Datadog Agent on your cluster. The Agent sends metrics, traces, and logs (if you enable log collection) to the standard Agent destinations. For the list of destinations, see [Network Traffic][23].

If you collect Spark lineage with OpenLineage on Amazon EMR or Kubernetes, the Datadog Java tracer sends lineage events to the local Agent. The Agent forwards them to `data-obs-intake.`{{< region-param key="dd_site" code="true" >}}. Allow this domain for outbound traffic from your cluster.

When you enable OpenLineage on Amazon EMR, the bootstrap action downloads the OpenLineage Spark JAR from Maven Central (`repo1.maven.org`). If an OpenLineage Spark JAR is already in `/usr/lib/spark/jars`, the bootstrap action skips the download. If your cluster can't reach Maven Central, set `DD_OPENLINEAGE_JAR_PATH` in the bootstrap action to the local path of an OpenLineage Spark JAR on the node. The bootstrap action copies that JAR to `/usr/lib/spark/jars` instead of downloading it.

## PostgreSQL

Data Observability for [PostgreSQL][24] is in Preview. Datadog doesn't connect to your database directly. The Datadog Agent runs on a host that can reach your database and makes the following outbound connections over HTTPS:

- Table metadata: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}
- Monitor queries, which the Agent receives through [Remote Configuration][25]: `config.`{{< region-param key="dd_site" code="true" >}}
- Monitor query results: `data-obs-intake.`{{< region-param key="dd_site" code="true" >}}

The Agent also sends metrics to the standard Agent destinations. See [Network Traffic][23].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: /data_observability/quality_monitoring/#data-sent-to-datadog
[3]: /data_observability/quality_monitoring/data_warehouses/snowflake/
[4]: /data_observability/quality_monitoring/data_warehouses/databricks/
[5]: /data_observability/quality_monitoring/data_warehouses/bigquery/
[6]: /data_observability/quality_monitoring/data_warehouses/clickhouse/
[7]: /data_observability/quality_monitoring/data_warehouses/fabric/
[8]: /data_observability/quality_monitoring/data_warehouses/redshift/
[9]: /data_observability/quality_monitoring/data_lakes/amazon_athena/
[10]: /data_observability/quality_monitoring/data_lakes/aws_glue/
[11]: /integrations/amazon-web-services/
[12]: https://docs.aws.amazon.com/redshift/latest/mgmt/data-api.html
[13]: /data_observability/jobs_monitoring/databricks/
[14]: /data_observability/jobs_monitoring/databricks/private_link/
[15]: /data_observability/jobs_monitoring/airflow/
[16]: /data_observability/jobs_monitoring/dbt/
[17]: /data_observability/jobs_monitoring/glue/
[18]: /data_observability/jobs_monitoring/openlineage/
[19]: /data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage/
[20]: /data_observability/jobs_monitoring/emr/
[21]: /data_observability/jobs_monitoring/dataproc/
[22]: /data_observability/jobs_monitoring/kubernetes/
[23]: /agent/configuration/network/
[24]: /data_observability/quality_monitoring/transactional_databases/postgres/
[25]: /remote_configuration/
