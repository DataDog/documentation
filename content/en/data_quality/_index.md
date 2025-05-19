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

[1]: /integrations/snowflake_web/
[2]: /integrations/google_cloud_bigquery/