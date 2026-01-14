---
title: Data Observability
description: "Monitor data quality, performance, and cost with Data Observability to detect anomalies, analyze data lineage, and prevent issues affecting downstream systems."
further_reading:
 - link: '/data_observability/quality_monitoring/'
   tag: 'Documentation'
   text: 'Quality Monitoring'
 - link: '/data_observability/jobs_monitoring'
   tag: 'Documentation'
   text: 'Jobs Monitoring'
 - link: 'https://www.datadoghq.com/about/latest-news/press-releases/datadog-metaplane-aquistion/'
   tag: 'Blog'
   text: 'Datadog Brings Observability to Data teams by Acquiring Metaplane'
---

## Overview
Data Observability (DO) helps data teams improve the reliability of data for analytics and AI applications and optimize the performance and costs of data pipelines. By unifying quality and jobs monitoring from production to consumption, teams can detect and remediate issues faster while optimizing cost and performance.

{{< img src="data_observability/do_suite_root_cause_analysis-1.png" alt="Datadog Data Observability end-to-end lineage with Spark job traces." style="width:100%;" >}}

## Key capabilities

- **Detect failures early**: Catch bad data in warehouses like Snowflake, Databricks, and BigQuery through ML-powered monitors before dashboards, stakeholders, or AI models are impacted. Detect upstream pipeline failures in jobs run on Databricks, Spark, Airflow, or dbt.
- **Accelerate remediation**: Triage faster using end-to-end lineage to pinpoint root causes, assess incident blast radius, and route to the right owner. View which job in the pipeline failed or was delayed, and pivot into job execution traces and logs to determine why.
- **Optimize cost & performance**: Get visibility into the cost and efficiency of Spark and Databricks jobs and clusters, and use recommendations to optimize cluster configuration, code, and queries.
- **Unify end-to-end observability**: Correlate data quality, pipeline execution, and infrastructure signals in one place, spanning the entire data lifecycle.

## Get started

{{< whatsnext desc="Data Observability consists of the following:" >}}
   {{< nextlink href="/data_observability/quality_monitoring/" >}}Quality Monitoring: Identify data issues before downstream BI and AI applications are impacted.{{< /nextlink >}}
   {{< nextlink href="/data_observability/jobs_monitoring/" >}}Jobs Monitoring: Observe, troubleshoot, and optimize jobs across your data pipelines.{{< /nextlink >}}
{{< /whatsnext >}}
