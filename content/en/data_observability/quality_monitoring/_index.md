---
title: Quality Monitoring
description: "Detect data freshness delays, unusual patterns, and column-level metric changes before they impact downstream systems."
aliases:
  - /data_observability/datasets
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability'
  - link: '/data_observability/jobs_monitoring'
    tag: 'Documentation'
    text: 'Jobs Monitoring'
---

## Overview

Quality Monitoring detects issues such as data freshness delays, unusual data patterns, and changes in column-level metrics before they affect dashboards, machine learning models, or other downstream systems. It alerts you to potential problems and provides context to trace them back to upstream jobs or sources.

## Key capabilities

With Quality Monitoring, you can:
- Detect delayed updates and unexpected row count behavior in your tables
- Surface changes in column-level metrics such as null counts or uniqueness
- Set up monitors using static thresholds or historical baselines
- Trace quality issues using lineage views that show upstream jobs and downstream impact

## Supported data sources

{{< whatsnext desc="Connect to these data warehouses:" >}}
   {{< nextlink href="data_observability/quality_monitoring/data_warehouses/snowflake" >}}Snowflake{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/data_warehouses/databricks" >}}Databricks{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/data_warehouses/bigquery" >}}BigQuery{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Integrate with these transformation and orchestration tools:" >}}
   {{< nextlink href="data_observability/jobs_monitoring/databricks" >}}Databricks{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/airflow" >}}Airflow{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/dbtcore" >}}dbt Core{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/dbtcloud" >}}dbt Cloud{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/kubernetes" >}}Spark on Kubernetes{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/emr" >}}Spark on Amazon EMR{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/dataproc" >}}Spark on Google Dataproc{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/openlineage" >}}Custom Jobs using OpenLineage{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Track downstream impact in these BI tools:" >}}
   {{< nextlink href="data_observability/quality_monitoring/business_intelligence/tableau" >}}Tableau{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/business_intelligence/sigma" >}}Sigma{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/business_intelligence/metabase" >}}Metabase{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/business_intelligence/powerbi" >}}Power BI{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

