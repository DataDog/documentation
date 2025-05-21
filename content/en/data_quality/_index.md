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

### Detect freshness and volume anomalies

Data Quality Monitoring automatically tracks when data was last updated and how much data is being written to each table. It uses built-in anomaly detection to identify issues such as delayed updates or unexpected changes in row counts. These signals help you catch problems early, before they affect downstream dashboards, machine learning models, or data products.

### Perform column-level quality checks

You can monitor column-level signals like null counts and uniqueness to detect unexpected changes in data shape. These checks help surface schema drift, pipeline regressions, or data entry issues that might not affect freshness or volume but still degrade quality.

### Set up alerts using monitors

From each dataset page, you can create monitors for metrics like freshness and volume using prebuilt templates. These monitors rely on statistical thresholds and automatically flag abnormal behavior. After creating a monitor, you can manage it through the [Monitors][3] page, where you can adjust conditions, notification settings, or tags to scope alerts by team, priority, or dataset.

### Understand how data is used

Usage metrics help you identify which tables are frequently queried and which are not. This context supports cost optimization and helps prioritize where to focus monitoring. Usage data is available when access history logging is enabled in your data platform (such as Snowflake).

### Investigate upstream and downstream dependencies

Lineage views allow you to trace which jobs or systems wrote to a dataset and which downstream assets depend on it. This makes it easier to troubleshoot the root cause of data quality issues and assess their impact across your environment.

[1]: /integrations/snowflake_web/
[2]: /integrations/google_cloud_bigquery/
[3]: /monitors