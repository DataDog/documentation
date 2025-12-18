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

<div class="alert alert-info">Data Observability is in Preview.</div>

Data Observability helps data teams detect, resolve, and prevent issues that affect data quality, performance, and cost. It enables teams to monitor anomalies, troubleshoot faster, and maintain trust in the data powering downstream systems.

{{< img src="data_observability/data-obs-overview-1.png" alt="Lineage graph showing a failed application upstream." style="width:100%;" >}}

Datadog does this by monitoring key signals across your data stack, including metrics, metadata, lineage, and logs. These signals help detect issues early and maintain reliable, high-quality data.

## Key capabilities

With Data Observability, you can:

- Detect anomalies in volume, freshness, null rates, and distributions across your tables
- Analyze lineage to trace data dependencies from source to dashboard
- Correlate quality issues with job runs, data streams, and infrastructure events

## Monitor data quality

Datadog continuously tracks metrics and metadata, including:

- Data metrics such as null count, null percentage, uniqueness, mean, and standard deviation
- Metadata such as schema, row count, and freshness

You can configure static thresholds or rely on automatic anomaly detection to identify unexpected changes, including:

- Missing or delayed updates
- Unexpected row count changes
- Outliers in key metrics

## Trace lineage and understand impact

{{< img src="data_observability/data-obs-lineage-blurred.png" alt="Lineage graph tracing data flow from Kafka through a failed Spark job to a Snowflake table with an alert and four downstream nodes labeled Upstream issue." style="width:100%;" >}}

Data Observability provides end-to-end lineage, helping you:

- Visualize dependencies between tables, columns, and dashboards
- Identify upstream root causes and assess downstream impact
- Debug faster and make safer schema or transformation changes

## Correlate with pipeline and infrastructure activity

{{< img src="data_observability/data-obs-correlate-trace.png" alt="Lineage graph showing a failed Spark job with a missing S3 path error, plus a side panel with job run stats and duration trends." style="width:100%;" >}}

Understand how pipeline activity and infrastructure events impact your data. Datadog ingests logs and metadata from pipeline tools and user interactions to provide context for data quality issues, including:

- Job failures or delays (for example, Spark, Airflow)
- Query activity and dashboard usage (for example, Tableau)

This operational context helps you trace the source of data incidents and respond faster.

## Required permissions

Data Observability requires the `integrations_read` permission to read integrations in your account and dynamically render content. Without this permission, you see a permissions screen instead of the app.

This permission is included in the [Datadog Standard Role][1]. If your current role doesn't include it, add `integrations_read` to your role, then refresh the page.

## IP allowlists

If your organization enforces IP allowlists, add the IPs listed under the `webhooks` section of this [webhooks.json][2] file to your allowist.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[2]: https://ip-ranges.datadoghq.com/webhooks.json