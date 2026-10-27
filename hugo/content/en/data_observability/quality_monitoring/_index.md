---
title: Quality Monitoring
description: "Detect data freshness delays, unusual patterns, and column-level metric changes before they impact downstream systems."
aliases:
  - /data_observability/datasets
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/data_observability/jobs_monitoring'
    tag: 'Documentation'
    text: 'Jobs Monitoring'
  - link: '/data_observability/lineage/'
    tag: 'Documentation'
    text: 'Lineage'
  - link: '/data_observability/cicd/'
    tag: 'Documentation'
    text: 'CI/CD'
  - link: "https://www.datadoghq.com/blog/data-pipeline-monitoring/"
    tag: "Blog"
    text: "Data pipeline monitoring 101: Tracking health and performance across the data stack"
---

## Overview

Quality Monitoring detects issues such as data freshness delays, unusual data patterns, and changes in column-level metrics before they affect dashboards, machine learning models, or other downstream systems. It alerts you to potential problems and provides context to trace them back to upstream jobs or sources.

## Key capabilities

With Quality Monitoring, you can:
- Detect delayed updates and unexpected row count behavior in your tables
- Surface changes in column-level metrics such as null counts or uniqueness
- Set up monitors using static thresholds or historical baselines
- Trace quality issues using lineage views that show upstream jobs and downstream impact
- Explore end-to-end dependencies in [Lineage][1] to identify root causes and downstream impact

## Supported data sources

{{< whatsnext desc="Connect to these data warehouses:" >}}
   {{< nextlink href="data_observability/quality_monitoring/data_warehouses/snowflake" >}}Snowflake{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/data_warehouses/databricks" >}}Databricks{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/data_warehouses/bigquery" >}}BigQuery{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/data_warehouses/redshift" >}}Redshift{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Connect to these data lake catalogs:" >}}
   {{< nextlink href="data_observability/quality_monitoring/data_lakes/aws_glue" >}}Iceberg Tables (AWS Glue){{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Connect to these transactional databases:" >}}
   {{< nextlink href="data_observability/quality_monitoring/transactional_databases/postgres" >}}PostgreSQL{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Integrate with these transformation and orchestration tools:" >}}
   {{< nextlink href="data_observability/jobs_monitoring/databricks" >}}Databricks{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/airflow" >}}Airflow{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/dbt/?tab=dbtcore" >}}dbt Core{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/dbt/?tab=dbtcloud" >}}dbt Cloud{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/kubernetes" >}}Spark on Kubernetes{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/emr" >}}Spark on Amazon EMR{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/dataproc" >}}Spark on Google Dataproc{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/glue" >}}AWS Glue Jobs{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/openlineage" >}}Custom Jobs using OpenLineage{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Trace lineage from these ELT tools:" >}}
   {{< nextlink href="data_observability/quality_monitoring/elt/airbyte" >}}Airbyte{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/elt/fivetran" >}}Fivetran{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/elt/hightouch" >}}Hightouch{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Track downstream impact in these BI tools:" >}}
   {{< nextlink href="data_observability/quality_monitoring/business_intelligence/looker" >}}Looker{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/business_intelligence/tableau" >}}Tableau{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/business_intelligence/sigma" >}}Sigma{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/business_intelligence/metabase" >}}Metabase{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/business_intelligence/powerbi" >}}Power BI{{< /nextlink >}}
{{< /whatsnext >}}

## Data sent to Datadog

Quality Monitoring runs aggregate queries in your data warehouse, such as `COUNT(*)`, `MAX(<timestamp_column>)`, null counts, and distinct counts. Only the resulting metric values are sent to Datadog, not row-level data from your tables.

[Custom SQL monitors][2] are the exception, because you control what the query returns:

- The query must return a value aliased as `dd_value`, and Datadog stores that value. Queries that don't match this format, such as `SELECT *`, fail validation and are not stored.
- If the query includes a `GROUP BY` clause, Datadog also stores the value of each grouped column. Each group is evaluated as a separate series.

For example, the following query stores each distinct `region` value alongside its count:

```sql
SELECT region, COUNT(*) AS dd_value
FROM <database>.<schema>.orders
WHERE status = 'FAILED'
GROUP BY region
```

<div class="alert alert-warning">If you group by a column that contains sensitive data, such as <code>email</code> or <code>user_id</code>, those values are sent to Datadog. Group only by non-sensitive columns, or mask sensitive columns in your warehouse so that Datadog reads masked values.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/lineage/
[2]: /monitors/types/data_observability/?tab=customsql#select-your-metric-type
