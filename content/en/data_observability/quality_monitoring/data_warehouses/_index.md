---
title: Warehouse Integrations
description: "Connect your data warehouse to Datadog to monitor data quality, track costs, and analyze usage patterns."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
---
## Overview

Datadog Data Observability connects directly to your cloud data warehouse to help monitor the health of your data. When connected, Datadog automatically syncs your warehouse's metadata and query history to detect data quality, cost, performance, and usage issues.

Use these integrations to:
- **Sync your data schema** to keep Datadog in sync with your warehouse structure
- **Create data quality monitors** to catch anomalies before they impact downstream dashboards and models
- **Analyze query and job history** to understand usage patterns, costs, and performance
- **Trace column-level lineage** to map dependencies and pinpoint root causes of data issues

{{< whatsnext desc="Connect to these data warehouses:" >}}
   {{< nextlink href="data_observability/quality_monitoring/data_warehouses/snowflake" >}}Snowflake{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/data_warehouses/databricks" >}}Databricks{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/data_warehouses/bigquery" >}}BigQuery{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/data_warehouses/aws_glue" >}}AWS Glue{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
