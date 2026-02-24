---
title: Data Observability Monitor
description: "Monitor freshness, row count, column-level metrics, and custom SQL queries across your data warehouses."
further_reading:
  - link: "/data_observability/"
    tag: "Documentation"
    text: "Data Observability Overview"
  - link: "/data_observability/quality_monitoring/"
    tag: "Documentation"
    text: "Quality Monitoring"
  - link: "/monitors/notify/"
    tag: "Documentation"
    text: "Configure your monitor notifications"
  - link: "/monitors/downtimes/"
    tag: "Documentation"
    text: "Schedule a downtime to mute a monitor"
  - link: "/monitors/status/"
    tag: "Documentation"
    text: "Consult your monitor status"
---

## Overview

[Data Observability][1] monitors use anomaly detection that learns from seasonality, trends, and user feedback to catch delayed data, incomplete loads, and unexpected value changes before they affect downstream dashboards, AI applications, or business decisions. Combined with end-to-end data and code lineage, these monitors help teams detect issues early, assess downstream impact, and route to the right owner.

Data Observability monitors support the following metric types:

**Table-level metric types:**
| Metric type | Description |
|---|---|
| Freshness | Tracks the time elapsed since a table was last updated. |
| Row Count | Tracks the number of rows in a table or view. |
| Custom SQL | Tracks a custom metric value returned by a SQL query. |

**Column-level metric types:**
| Metric type | Description |
|---|---|
| Freshness | Tracks the most recent date seen in a datetime column. |
| Uniqueness | Tracks the percentage of unique values. |
| Nullness | Tracks the percentage of null values. |
| Cardinality | Tracks the number of distinct values. |
| Percent Zero | Tracks the percentage of values equal to zero. |
| Percent Negative | Tracks the percentage of negative values. |
| Min / Max / Mean / Sum / Standard Deviation | Tracks statistical measures across column values. |

Datadog collects metrics such as row count and freshness from warehouse system metadata (for example, `INFORMATION_SCHEMA`) when available. This avoids running a query against your warehouse and reduces compute costs. Not all warehouses expose system metadata. For metrics that cannot be collected from system metadata, the monitor runs a query directly against your warehouse to compute the value.

Data Observability monitors require [Quality Monitoring][2] to be set up with at least one supported data warehouse (for example, [Snowflake][3], [Databricks][4], or [BigQuery][5]).

## Monitor creation

To create a Data Observability monitor in Datadog, navigate to [**Data Observability** > **Monitors** > **New Monitor**][6] or [**Monitors** > **New Monitor** > **Data Observability**][6]. To view all existing Data Observability monitors, see the [Data Observability Monitors page][7].

## Choose data to monitor

First, select whether to monitor the **Table** or **Column** level:

{{< img src="monitors/monitor_types/data_observability/entity_type_selection_and_aastra.png" alt="Input field for selecting entity type and inputting a query" style="width:60%;" >}}

Then, use the **Edit** tab to search for tables, views, or columns by typing `key:value` filters into the search field. The following attributes are available:

| Filter | Example | Description |
|---|---|---|
| Name | `name:USERS*` | Match by name. Supports `*` wildcards. |
| Schema | `schema:PROD` | Match by schema. |
| Database | `database:ANALYTICS_DB` | Match by database. |
| Account | `account:my_account` | Match by account. |

Combine filters with `AND` or `OR`, use parentheses to group conditions, and prefix with `-` to exclude.

**Examples:**

| Goal | Query |
|---|---|
| All tables in the PROD schema, excluding temp tables | `schema:PROD AND -name:TEMP*` |
| All timestamp columns | `name:*_AT OR name:*_TIMESTAMP` |
| Tables in either PROD or STAGING for a specific database | `database:ANALYTICS_DB AND (schema:PROD OR schema:STAGING)` |

A single monitor can track up to 5,000 tables, views, or columns. This limit cannot be increased. If your query matches more, split them across multiple monitors.

Switch to the **Source** tab to see the backing query generated from your selections. The query follows this format:

{{< code-block lang="text" >}}
search for [ENTITY_TYPE] where `[FILTER_CONDITIONS]`
{{< /code-block >}}

## Select your metric type

Choose a metric type based on the data quality signal you want to track. Each monitor tracks one metric type.

{{< tabs >}}
{{% tab "Freshness" %}}

The **Freshness** metric type detects when data has not been updated within an expected time window. Use it to catch stale data before it affects downstream reports or models.

- **Table freshness** tracks the time elapsed since the table was last updated. Table freshness is not available for views or for data warehouses that do not provide updated timestamps for tables in system metadata. Use column-level freshness instead.
- **Column freshness** tracks the most recent date seen in a datetime column.

{{% /tab %}}
{{% tab "Row Count" %}}

The **Row Count** metric type tracks row count changes in your tables. Use it to detect unexpected drops or spikes in data that could indicate pipeline failures or upstream issues.

{{% /tab %}}
{{% tab "Column Metric" %}}

**Column** metric types track column-level metrics to detect data drift or quality degradation. Select from the following:

| Metric | Description |
|---|---|
| **Uniqueness** | The percentage of values in a column that are unique. |
| **Nullness** | The percentage of values in a column that are null. |
| **Cardinality** | The number of distinct values in a column. |
| **Percent Zero** | The percentage of values in a column that are equal to zero. |
| **Percent Negative** | The percentage of values in a column that are negative. |
| **Min** | The minimum of all values in a column. |
| **Max** | The maximum of all values in a column. |
| **Mean** | The average of all values in a column. |
| **Standard Deviation** | The measure of variation within values in a column. |
| **Sum** | The sum of all values in a column. |

<div class="alert alert-info">Some column metrics are only available for specific column types. Numeric metrics (Percent Zero, Percent Negative, Min, Max, Mean, Standard Deviation, Sum) require numeric columns.</div>

{{% /tab %}}
{{% tab "Custom SQL" %}}

The **Custom SQL** metric type tracks a custom metric value returned by a SQL query that you define. Use it when built-in metric types do not cover your use case, such as monitoring business-specific data quality rules.

1. Select a **model type** that describes the value returned by your query:
    - **Default**: The query returns a scalar value. Use this in most cases.
    - **Freshness**: The query returns the difference (in seconds) between the current time and the last time an event occurred.
    - **Percentage**: The query returns a percentage value between 0 and 100.
2. Write a SQL query that returns a single value aliased as `dd_value`, for example: `SELECT COUNT(*) as dd_value FROM ANALYTICS_DB.PROD.ORDERS WHERE STATUS = 'FAILED'`
3. Click **Validate** to verify your query syntax.

If your SQL query includes a `GROUP BY` clause, list the grouped columns as a comma-separated list in the **Group by** field (for example, `column_a, column_b`). Each group is evaluated independently.

**Note**: Each Custom SQL monitor counts as an individual monitored table for billing purposes.

{{< img src="monitors/monitor_types/data_observability/custom_sql_example.png" alt="Input field for custom SQL monitor creation." style="width:60%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Configure monitor

### Detection method

Select a detection method:

- **Anomaly**: Alert when the metric deviates from an expected pattern. Threshold values are not required. The anomaly model requires **3 to 7 days** to train (including a weekend), depending on how frequently the underlying data updates. During the training period, the monitor does not trigger alerts and will be visualized in blue. After training completes, the monitor will be shown in green when in a normal state and red when in an outlier state.
- **Threshold**: Alert when the metric crosses a fixed value. Set the comparison operator (`above`, `above or equal to`, `below`, `below or equal to`, `equal to`, or `not equal to`) and define a **Critical** threshold (required) and optionally a **Warning** threshold. For more details, see [Configure Monitors][8].

### WHERE clause

Add a **WHERE** clause to filter the data evaluated by the monitor. This is useful for monitoring specific segments of data or only recent records. For example:

- `created_at >= DATEADD(day, -7, CURRENT_TIMESTAMP())` — only monitor rows from the past week.
- `region = 'US'` — only monitor data for a specific region.

### Group by

You can add a **Group by** clause to split a single monitor into multiple groups, each evaluated independently. For example, grouping a row count monitor by a `REGION` column produces a separate alert for each geography.

{{< img src="monitors/monitor_types/data_observability/group_by_column_selection.png" alt="Input field for selecting GROUP BY dimensions." style="width:80%;" >}}

The default limit is 100 groups per monitor. To increase this limit, [contact Support][9].

### Monitor schedule

Set how often the monitor evaluates your data:

- **Hourly**: The monitor runs every hour.
- **Daily**: The monitor runs once per day.

### Set alert conditions

Choose an aggregation type:

- **Simple Alert**: Send a single notification when any monitored table or column meets the condition.
- **Multi Alert**: Send a notification for each group meeting the condition. Customize which dimensions to group by (for example, `table`, `schema`, `database`) to control alert granularity. For example, grouping by `schema` only sends one alert per schema, bundling all affected tables together to reduce noise.

### Example notification

{{< tabs >}}
{{% tab "Threshold" %}}

{{< code-block lang="text" >}}
{{#is_alert}}
Data quality issue detected on {{database.name}}.{{schema.name}}.{{table.name}}:
current value {{value}} has breached the threshold of {{threshold}}.
{{/is_alert}}

{{#is_recovery}}
Data quality issue on {{database.name}}.{{schema.name}}.{{table.name}} has recovered.
Current value {{value}} is within the threshold of {{threshold}}.
{{/is_recovery}}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Anomaly" %}}

{{< code-block lang="text" >}}
{{#is_alert}}
Anomaly detected on {{database.name}}.{{schema.name}}.{{table.name}}:
observed value {{observed}} is outside the expected range of {{lower_bound}} to {{upper_bound}}
(predicted: {{predicted}}).
{{/is_alert}}

{{#is_recovery}}
{{database.name}}.{{schema.name}}.{{table.name}} has recovered.
Observed value {{observed}} is within the expected range.
{{/is_recovery}}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Example monitors

{{< tabs >}}
{{% tab "Row count drop" %}}

Detect a significant decrease in row count that could indicate a pipeline failure or missing data.

1. Select **Table** > **Row Count** and choose the target table (for example, `ANALYTICS_DB.PROD.EVENTS`).
1. Select **Anomaly** as the detection method. The monitor triggers when the row count deviates from its historical baseline.

{{% /tab %}}
{{% tab "Stale table" %}}

Alert when a critical table has not been updated within the expected time window.

1. Select **Table** > **Freshness** and choose the target table (for example, `ANALYTICS_DB.PROD.ORDERS`).
1. Select **Threshold** as the detection method.
1. Set the **Alert threshold** to **6 hours** and optionally a **Warning threshold** at **4 hours**.

{{% /tab %}}
{{% tab "Null percentage spike" %}}

Detect when a column's null percentage exceeds normal levels, which may indicate data ingestion issues.

1. Select **Column** > **Nullness** and choose the target column (for example, `ANALYTICS_DB.PROD.USERS.EMAIL`).
1. Select **Anomaly** as the detection method.

{{% /tab %}}
{{< /tabs >}}

## Annotate bounds

For monitors using the **Anomaly** detection method, you can annotate bound ranges to provide feedback and improve the model over time. Unlike infrastructure metrics, data quality metrics are often business-specific, so use annotations to teach the model what behavior is normal for your data.

{{< img src="/monitors/monitor_types/data_observability/annotate_bounds.png" alt="Hover menu for annotating a monitor bound." style="width:90%;" >}}

On a monitor's status page, click **Annotate Bounds**, select a time range on the chart, and choose one of the following annotations:

| Annotation | Description |
|---|---|
| **Expected** | Expand bounds to include the marked behavior permanently. |
| **Reset for now** | Mark behavior as OK, but alert if it happens again. |
| **Missed alert** | Contract bounds to alert on this behavior. |
| **Ignore** | Exclude annotated data when modeling bounds. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/
[2]: /data_observability/quality_monitoring/
[3]: /data_observability/quality_monitoring/data_warehouses/snowflake/
[4]: /data_observability/quality_monitoring/data_warehouses/databricks/
[5]: /data_observability/quality_monitoring/data_warehouses/bigquery/
[6]: https://app.datadoghq.com/monitors/create/data-quality
[7]: https://app.datadoghq.com/data-obs/monitors
[8]: /monitors/configuration/?tab=thresholdalert#thresholds
[9]: /help/
