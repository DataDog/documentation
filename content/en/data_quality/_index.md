---
title: Data Quality Monitoring
---

Data Quality Monitoring helps you detect and troubleshoot issues in your data workflows before they cause problems in dashboards, machine learning models, or other downstream systems. It alerts you to common issues such as missing updates, unexpected changes in row counts, or unusual column values, and helps trace those issues back to the upstream jobs or data sources that may have caused them.

## Supported data sources and integrations

To use Data Quality Monitoring, you must enable the appropriate data source integrations in Datadog. The table below outlines the required setup steps.

| Data source | Required configuration                                                                                                |
|-------------|---------------------------------------------------------------------------------------------------------------------|
| Snowflake   | 1. Enable the [Snowflake integration][1] in Datadog.<br>2. Enable Query History Logs.<br>3. (Optional) Enable Access History for lineage and usage metrics. |
| BigQuery    | 1. Enable the [BigQuery integration][2] in Datadog.<br>2. (Optional) Additional setup may be required for usage monitoring.         |

## Key capabilities

### Detect and alert on data quality issues

### Perform custom checks with SQL

### Trace issues using data lineage

### Monitor data usage and optimize cost

## Key capabilities

### Detect freshness and volume anomalies

Describe how DQM surfaces delayed or missing data and unusual spikes or drops in row counts. Emphasize built-in anomaly detection for common data quality symptoms.

### Perform column-level checks

Highlight checks like null count and uniqueness at the column level. Mention that these are automatic once the integration is enabled and configured.

### Monitor usage patterns

Explain how table usage can be surfaced—frequently accessed vs. unused tables—and how this helps prioritize monitoring or identify cost waste. Note that this requires access history to be enabled (Snowflake).

### Trace upstream and downstream dependencies

Explain the role of lineage in understanding which jobs wrote to a table and which assets depend on it. Emphasize that this context helps users troubleshoot issues more efficiently.

## Common use cases

## Core monitoring concepts and components  ← TBD

## Related products  ← TBD

## Next steps  ← TBD

[1]: /integrations/snowflake_web/
[2]: /integrations/google_cloud_bigquery/