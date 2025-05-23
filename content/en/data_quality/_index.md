---
title: Data Quality Monitoring
---

Data Quality Monitoring helps you detect and troubleshoot issues in your data workflows before they cause problems in dashboards, machine learning models, or other downstream systems. It alerts you to common issues such as missing updates, unexpected changes in row counts, or unusual column values, and helps trace those issues back to the upstream jobs or data sources that may have caused them.

{{< img src="data_quality/data_quality_tables.png" alt="Data Quality Monitoring page showing a list of tables with columns for query count, storage size, row count, and last data update; one table is flagged with a triggered alert" style="width:100%;" >}}

## Supported data sources and integrations

To use Data Quality Monitoring, you must enable the appropriate data source integrations in Datadog. The table below outlines the required setup steps.

| Data source | Required configuration                                                                                                |
|-------------|---------------------------------------------------------------------------------------------------------------------|
| Snowflake   | 1. Enable the [Snowflake integration][1] in Datadog.<br>2. Enable Query History Logs.<br>3. (Optional) Enable Access History for lineage and usage metrics. |
| BigQuery    | 1. Enable the [BigQuery integration][2] in Datadog.<br>2. (Optional) Additional setup may be required for usage monitoring.         |

## Key capabilities

### Detects freshness and volume anomalies

Data Quality Monitoring automatically tracks when data was last updated and how much data is being written to each table. It uses built-in anomaly detection to identify issues such as delayed updates or unexpected changes in row counts. These signals help detect problems early, before they affect downstream dashboards, machine learning models, or data products.

### Surfaces column-level quality metrics

Column-level metrics such as null counts and uniqueness can help identify unexpected changes in column properties or structure. These changes may point to issues such as pipeline regressions or data entry problems that don’t affect freshness or volume but still degrade quality.

### Supports alerting through monitors

Data Quality Monitoring includes monitor templates for metrics such as freshness, volume, and row count changes. Metric monitors use predefined thresholds, such as a maximum update interval, while anomaly monitors detect deviations from historical patterns. After creating a monitor, you can manage its conditions, notification settings, and tags from the [Monitors][3] page to scope alerts by team, priority, or dataset.

### Provides usage insights

Usage metrics highlight which tables are frequently queried and which are not. This context supports cost optimization and helps prioritize where to focus monitoring. Usage data is available when access history logging is enabled in your data platform (such as Snowflake).

### Maps upstream and downstream dependencies

Lineage views show which jobs or systems wrote to a dataset and which downstream assets depend on it. This context makes it easier to troubleshoot the root cause of data quality issues and assess their impact across your environment.

[1]: /integrations/snowflake_web/
[2]: /integrations/google_cloud_bigquery/
[3]: /monitors