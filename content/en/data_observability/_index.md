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

Data Observability helps data teams detect, resolve, and prevent issues that affect data quality, performance, and cost. It enables teams to monitor anomalies, troubleshoot faster, and maintain trust in the data powering downstream systems.

{{< img src="data_observability/data-obs-overview-1.png" alt="Lineage graph showing a failed application upstream." style="width:100%;" >}}

Data Observability consists of two products:

- **[Quality Monitoring][3]**: Detect anomalies in your tables, including freshness delays, volume changes, and unexpected column-level metric shifts.
- **[Jobs Monitoring][4]**: Track the performance, reliability, and cost of data processing jobs across platforms like Spark, Databricks, and Airflow.

Both products share end-to-end lineage, letting you trace data dependencies and correlate issues across your stack.

## Quality Monitoring

Quality Monitoring tracks metrics and metadata across your tables to detect issues before they impact downstream systems:

- **Data metrics**: Null count, null percentage, uniqueness, mean, and standard deviation
- **Metadata**: Schema, row count, and freshness

Configure static thresholds or use automatic anomaly detection to catch missing updates, unexpected row count changes, and metric outliers.

## Jobs Monitoring

Jobs Monitoring provides visibility into data processing jobs across your accounts and workspaces:

- **Performance**: Track job duration, resource utilization, and identify inefficiencies like high idle CPU
- **Reliability**: Receive alerts when jobs fail or exceed expected completion times
- **Troubleshooting**: Analyze execution details, stack traces, and compare runs to identify issues

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
[3]: /data_observability/quality_monitoring/
[4]: /data_observability/jobs_monitoring/