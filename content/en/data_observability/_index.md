---
title: Data Observability
description: "Monitor data quality, performance, and cost with Data Observability to detect anomalies, analyze data lineage, and prevent issues affecting downstream systems."
further_reading:
  - link: '/data_observability/datasets'
    tag: 'Documentation'
    text: 'Datasets'
  - link: '/data_jobs'
    tag: 'Documentation'
    text: 'Data Jobs Monitoring'
  - link: '/data_streams'
    tag: 'Documentation'
    text: 'Data Streams Monitoring'
  - link: '/database_monitoring'
    tag: 'Documentation'
    text: 'Database Monitoring'
  - link: 'https://www.datadoghq.com/about/latest-news/press-releases/datadog-metaplane-aquistion/'
    tag: 'Blog'
    text: 'Datadog Brings Observability to Data Teams by Acquiring Metaplane'
---

<div class="alert alert-info">Data Observability is in Preview.</div>

Data Observability helps data teams detect, resolve, and prevent issues that impact data quality, performance, and cost. It enables teams to monitor anomalies, troubleshoot faster, and maintain trust in the data powering downstream systems.

{{< img src="data_observability/data_observability_overview.png" alt="Lineage graph showing a failed Spark job upstream of a Snowflake table with an alert and four downstream nodes labeled Upstream issue." style="width:100%;" >}}

Datadog makes this possible by monitoring key signals across your data stack, including metrics, metadata, lineage, and logs. These signals help detect issues early and support reliable, high-quality data.

## Key capabilities

With Data Observability, you can:

- Detect anomalies in volume, freshness, null rates, and distributions
- Analyze lineage to trace data dependencies from source to dashboard
- Integrate with pipelines to correlate issues with job runs, data streams, and infrastructure events

## Monitor data quality

{{< img src="data_observability/data_observability_lineage_quality.png" alt="Lineage graph centered on the quoted_pricing Snowflake table with an alert on a pricing metric and sidebar charts for freshness, row count, and size." style="width:100%;" >}}

Datadog continuously tracks metrics and metadata, including:

- Data metrics such as null count, null percentage, uniqueness, mean, and standard deviation
- Metadata such as schema, row count, and freshness

You can configure static thresholds or rely on automatic anomaly detection to identify unexpected changes, including:

- Missing or delayed updates
- Unexpected row count changes
- Outliers in key metrics

## Trace lineage and understand impact

{{< img src="data_observability/data_observability_lineage_trace.png" alt="Lineage graph tracing data flow from Kafka through a failed Spark job to a Snowflake table with an alert and four downstream nodes labeled Upstream issue." style="width:100%;" >}}

Data Observability provides end-to-end lineage, helping you:

- Visualize dependencies between tables, columns, and dashboards
- Identify upstream root causes and assess downstream impact
- Debug faster and make safer schema or transformation changes

## Correlate with pipeline and infrastructure activity

{{< img src="data_observability/data_observability_pipeline_infra_correlation.png" alt="Lineage graph showing a failed Spark job with a missing S3 path error, plus a side panel with job run stats and duration trends." style="width:100%;" >}}

Understand how pipeline activity and infrastructure events impact your data. Datadog ingests logs and metadata from pipeline tools and user interactions to provide context for data quality issues, including:

- Job failures or delays (for example, Spark, Airflow)
- Query activity and dashboard usage (for example, Tableau)

This operational context helps you trace the source of data incidents and respond faster.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}