---
title: Supported Platforms
description: "Check which Data Observability capabilities are available for each data platform, job technology, and ELT or BI tool."
further_reading:
  - link: '/data_observability/quality_monitoring/'
    tag: 'Documentation'
    text: 'Quality Monitoring'
  - link: '/data_observability/jobs_monitoring/'
    tag: 'Documentation'
    text: 'Jobs Monitoring'
  - link: '/data_observability/lineage/'
    tag: 'Documentation'
    text: 'Lineage'
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitor'
---

## Overview

Data Observability connects to data warehouses, data lakes, databases, job technologies, and ELT and BI tools. The capabilities available for each platform differ. Use the tables on this page to check what a platform supports before you connect it. Each platform name links to its setup page.

In the tables on this page:

- **Yes** means the capability is available.
- **Preview** means the capability is in Preview. See [Request Preview access](#request-preview-access).
- A blank cell means the capability isn't listed as supported for that platform.

## Data warehouses, data lakes, and databases

The **Freshness**, **Row count**, **Custom SQL**, and **Column metrics** columns are the metric types of [Data Observability monitors][1]. The **Schema change** column covers [schema change monitors][2]. The **Query history** column means that Datadog collects the queries that run on the platform.

| Platform | Freshness | Row count | Custom SQL | Column metrics | Schema change | Lineage | Query history |
|---|---|---|---|---|---|---|---|
| [Snowflake][3] | Yes | Yes | Yes | Yes | Preview | Yes | Yes |
| [Databricks][4] | Yes | Yes | Yes | Yes | Preview | Yes | Yes |
| [BigQuery][5] | Yes | Yes | Yes | Yes | Preview | Yes | Yes |
| [Amazon Redshift][6] | Yes (column) | Yes | Yes | Yes | Preview | Yes | Yes |
| [ClickHouse Cloud][7] | Preview | Preview | Preview | Preview | Preview | | |
| [Microsoft Fabric Warehouse][8] | Preview (column) | Preview | Preview | Preview | | Preview | Preview |
| [AWS Glue (Iceberg tables)][9] | Yes | Yes | | | | | |
| [Amazon Athena][10] | | | | | | Preview | Preview |
| [PostgreSQL][11] | Preview (column) | Preview | Preview | Preview | | | |

- Freshness marked **(column)** is measured from a datetime column. Table-level freshness isn't available.
- **Lineage** means that Datadog builds lineage from the platform's own metadata or query history. Where this cell is blank, lineage can still come from dbt or OpenLineage jobs that read or write the platform's tables.
- Lineage and query history for Microsoft Fabric Warehouse require the Contributor role or higher on the workspace. They also require the {{< ui >}}Collect query history{{< /ui >}} option in the integration settings.
- Querying AWS Glue tables with Amazon Athena is in Preview. It adds group-by and custom filters on metrics, and monitoring for Glue tables that don't use the Iceberg table format.
- Amazon Athena query history builds lineage between the AWS Glue tables that your queries read and write.

## Job technologies

The **Jobs Monitoring** column means that [Jobs Monitoring][12] collects runs of the technology's jobs. The **Lineage** column means that the technology adds jobs, datasets, or the relationships between them to [Lineage][13].

| Technology | Jobs Monitoring | Lineage |
|---|---|---|
| [Databricks][14] | Yes | Yes |
| [Airflow][15] | Yes | Yes |
| [dbt Core and dbt Cloud][16] | Yes | Yes |
| [AWS Glue jobs][17] | Yes | Yes |
| [Azure Data Factory][18] | Yes | Yes |
| [Apache Spark on Kubernetes][19] | Yes | Yes |
| [Apache Spark on Amazon EMR][20] | Yes | Yes |
| [Apache Spark on Google Dataproc][21] | Yes | |
| [Custom jobs (OpenLineage)][22] | Yes | Yes |

- For AWS Glue jobs, lineage is available for jobs that run with the Spark engine, through an optional setup step.
- For Apache Spark on Kubernetes and Amazon EMR, lineage requires OpenLineage collection, which is an optional setup step.

## ELT and BI tools

ELT and BI tools add lineage between your warehouse tables and the tool's connectors, syncs, projects, or dashboards. Lineage is derived from your data warehouse, so you also need at least one [supported data warehouse][23] connected to Datadog.

| Tool | Type | Lineage |
|---|---|---|
| [Airbyte][24] | ELT | Yes |
| [Fivetran][25] | ELT | Yes |
| [Hightouch][26] | Reverse ETL | Yes |
| [Hex][27] | BI | Yes |
| [Looker][28] | BI | Yes |
| [Tableau][29] | BI | Yes |
| [Sigma][30] | BI | Yes |
| [Metabase][31] | BI | Yes |
| [Power BI][32] | BI | Yes |

## Request Preview access

Datadog enables most Data Observability Preview features for each organization. To request access, contact your Datadog representative or [Datadog Support][33].

After Datadog enables a Preview feature for your organization, follow the setup steps on that feature's page.

## Agent requirements

Some sources are collected through the Datadog Agent and require a minimum Agent version:

| Source | Requirements |
|---|---|
| [PostgreSQL][11] | Datadog Agent 7.82.0 or later. [Remote Configuration][34] must be enabled for your organization, for the Agent's API key, and on the Agent. |
| [Apache Spark on Kubernetes][19] | Datadog Agent 7.64.0 or later, and Java tracer 1.38.0 or later. To collect lineage with OpenLineage, Java tracer 1.48.0 or later. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/data_observability/#select-your-metric-type
[2]: /monitors/types/data_observability/#schema-change-monitors
[3]: /data_observability/quality_monitoring/data_warehouses/snowflake/
[4]: /data_observability/quality_monitoring/data_warehouses/databricks/
[5]: /data_observability/quality_monitoring/data_warehouses/bigquery/
[6]: /data_observability/quality_monitoring/data_warehouses/redshift/
[7]: /data_observability/quality_monitoring/data_warehouses/clickhouse/
[8]: /data_observability/quality_monitoring/data_warehouses/fabric/
[9]: /data_observability/quality_monitoring/data_lakes/aws_glue/
[10]: /data_observability/quality_monitoring/data_lakes/amazon_athena/
[11]: /data_observability/quality_monitoring/transactional_databases/postgres/
[12]: /data_observability/jobs_monitoring/
[13]: /data_observability/lineage/
[14]: /data_observability/jobs_monitoring/databricks/
[15]: /data_observability/jobs_monitoring/airflow/
[16]: /data_observability/jobs_monitoring/dbt/
[17]: /data_observability/jobs_monitoring/glue/
[18]: /data_observability/jobs_monitoring/azure_data_factory/
[19]: /data_observability/jobs_monitoring/kubernetes/
[20]: /data_observability/jobs_monitoring/emr/
[21]: /data_observability/jobs_monitoring/dataproc/
[22]: /data_observability/jobs_monitoring/openlineage/
[23]: /data_observability/quality_monitoring/data_warehouses/
[24]: /data_observability/quality_monitoring/elt/airbyte/
[25]: /data_observability/quality_monitoring/elt/fivetran/
[26]: /data_observability/quality_monitoring/elt/hightouch/
[27]: /data_observability/quality_monitoring/business_intelligence/hex/
[28]: /data_observability/quality_monitoring/business_intelligence/looker/
[29]: /data_observability/quality_monitoring/business_intelligence/tableau/
[30]: /data_observability/quality_monitoring/business_intelligence/sigma/
[31]: /data_observability/quality_monitoring/business_intelligence/metabase/
[32]: /data_observability/quality_monitoring/business_intelligence/powerbi/
[33]: /help/
[34]: /remote_configuration/
