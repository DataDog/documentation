---
title: Data Observability Monitor
description: "Monitor freshness, row count, column-level metrics, and custom SQL queries across your data warehouses."
aliases:
  - /monitors/monitor_types/data_observability
  - /monitors/create/types/data_observability/
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

[Data Observability](/data_observability/) monitors use anomaly detection that learns from seasonality, trends, and user feedback to catch delayed data, incomplete loads, and unexpected value changes before they affect downstream dashboards, AI applications, or business decisions. Combined with end-to-end data and code lineage, these monitors help teams detect issues early, assess downstream impact, and route to the right owner.

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

Where possible, Datadog collects metrics such as row count and freshness from system metadata (for example, `INFORMATION_SCHEMA`). When system metadata is not available for a given metric, the monitor pushes down a query directly to the warehouse to compute the value.

Data Observability monitors require [Quality Monitoring](/data_observability/quality_monitoring/) to be set up with at least one supported data warehouse (for example, [Snowflake](/data_observability/quality_monitoring/data_warehouses/snowflake/), [Databricks](/data_observability/quality_monitoring/data_warehouses/databricks/), or [BigQuery](/data_observability/quality_monitoring/data_warehouses/bigquery/)).

## Monitor creation

To create a Data Observability monitor in Datadog, navigate to [**Monitors** > **New Monitor** > **Data Observability**](https://app.datadoghq.com/monitors/create/data-observability) in the UI.

## Select an entity type and metric type

First, select the **entity type** to determine whether you are monitoring at the table level or column level:

- **Table**: Monitor table-level signals such as freshness, row count, or a custom SQL query result.
- **Column**: Monitor column-level metrics such as nullness, uniqueness, cardinality, or statistical measures.

Then, choose a metric type based on the data quality signal you want to track:

{{< tabs >}}
{{% tab "Freshness" %}}

The **Freshness** metric type detects when data has not been updated within an expected time window. Use it to catch stale data before it affects downstream reports or models.

- **Table freshness** tracks the time elapsed since the table was last updated.
- **Column freshness** tracks the most recent date seen in a datetime column.

1. Select the entity type: **Table** or **Column**.
1. Select **Freshness** as the metric type.
1. Choose the target table or column to monitor.
1. Select the detection method:
    - **Anomaly**: Alert when the freshness deviates from an expected pattern.
    - **Threshold**: Alert when the freshness crosses a fixed value.
1. Define the expected update frequency (for example, the table should be updated at least every 6 hours).

{{% /tab %}}
{{% tab "Row Count" %}}

The **Row Count** metric type tracks row count changes in your tables. Use it to detect unexpected drops or spikes in data that could indicate pipeline failures or upstream issues.

1. Select **Table** as the entity type.
1. Select **Row Count** as the metric type.
1. Choose the target table to monitor.
1. Select the detection method:
    - **Anomaly**: Alert when the row count deviates from its historical baseline.
    - **Threshold**: Alert when the row count is above or below a fixed value.

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

1. Select **Column** as the entity type.
1. Select the column-level metric to track (for example, **Nullness**, **Cardinality**, **Mean**).
1. Choose the target column to monitor.
1. Select the detection method:
    - **Anomaly**: Alert when the metric deviates from its historical baseline.
    - **Threshold**: Alert when the metric crosses a fixed value.

{{% /tab %}}
{{% tab "Custom SQL" %}}

The **Custom SQL** metric type tracks a custom metric value returned by a SQL query that you define. Use it when built-in metric types do not cover your use case, such as monitoring business-specific data quality rules.

1. Select **Table** as the entity type.
1. Select **Custom SQL** as the metric type.
1. Choose the target table to monitor.
1. Select a **model type** that describes the value returned by your query:
    - **Default**: The query returns a scalar value. Use this in most cases.
    - **Freshness**: The query returns the difference (in seconds) between the current time and the last time an event occurred.
    - **Percentage**: The query returns a percentage value between 0 and 100.
1. Write a SQL query that returns a single value aliased as `dd_value`. For example:
{{< code-block lang="sql" >}}
SELECT SUM(AMOUNT) as dd_value FROM PROD.ORDERS
{{< /code-block >}}
1. Click **Validate** to verify your query syntax.
1. Select the detection method:
    - **Anomaly**: Alert when the metric deviates from an expected pattern.
    - **Threshold**: Alert when the metric crosses a fixed value.

{{% /tab %}}
{{< /tabs >}}

## Select entities to monitor

After selecting a metric type, choose which tables or columns to monitor. You can select entities using the search field, or write a query to match entities by name or attribute.

### Query syntax

Queries follow this format:

{{< code-block lang="text" >}}
search for [ENTITY_TYPE] where `[FILTER_CONDITIONS]`
{{< /code-block >}}

Where `ENTITY_TYPE` is `table` or `column`, and `FILTER_CONDITIONS` supports the following:

| Filter | Example | Description |
|---|---|---|
| Name | `` name:USERS* `` | Match by name. Supports `*` wildcards. |
| Attribute | `` database:ANALYTICS_DB `` | Match by attribute such as `database`, `schema`, or `account`. |
| AND | `` database:ANALYTICS_DB AND schema:PROD `` | Match entities meeting all conditions. |
| OR | `` schema:PROD OR schema:STAGING `` | Match entities meeting any condition. |
| Negation | `` -database:DEV `` | Exclude entities matching a condition. |

**Examples:**

{{< code-block lang="text" >}}
search for table where `schema:PROD AND database:ANALYTICS_DB`
search for column where `name:EMAIL`
search for table where `database:ANALYTICS_DB AND name:USERS*`
{{< /code-block >}}

### Group by

You can add a **Group by** clause to split a single monitor into multiple groups, each evaluated independently. For example, grouping a row count monitor by a `REGION` column produces a separate alert for each geography.

The default limit is 100 groups per monitor. To increase this limit, <a href="/help/">contact Support</a>.

## Set alert conditions

1. Set an alert to trigger whenever the monitored value is `above`, `above or equal to`, `below`, `below or equal to`, `equal to`, or `not equal to` a threshold that you define. For help configuring the options in this view, see [Configure Monitors](/monitors/configuration/?tab=thresholdalert#thresholds).
1. Set a **Critical** threshold (required) and optionally a **Warning** threshold for early detection.
1. Determine your desired behavior when data is missing, for example, `evaluate as zero`, `show NO DATA`, `show NO DATA and notify`, or `show OK`.

<div class="alert alert-info">When using the <strong>Anomaly</strong> detection method, the monitor triggers based on deviation from the expected baseline. Threshold values are not required for anomaly detection. The anomaly model requires <strong>3 to 7 days</strong> to train (including a weekend), depending on how frequently the underlying data updates. During the training period, the monitor does not trigger alerts.</div>

### No data alerts

To receive a notification when Datadog stops receiving quality monitoring data for a table, set the condition to trigger on **No Data**. This is useful for detecting cases where a data warehouse connection has dropped or metadata collection has stopped.

### Advanced alert conditions

For more information about advanced alert options such as evaluation delay, see [Configure Monitors](/monitors/create/configuration/#advanced-alert-conditions).

## Configure notifications and automations

For detailed instructions on the **Configure notifications and automations** section, see [Notifications](/monitors/notify/).

You can use the following template variables in your notification messages:

| Variable            | Description                                    |
|---------------------|------------------------------------------------|
| `{{table.name}}`    | The name of the affected table.               |
| `{{schema.name}}`   | The schema containing the affected table.      |
| `{{database.name}}` | The database containing the affected table.      |
| `{{threshold}}`     | The alert threshold value.                     |
| `{{value}}`         | The current value that triggered the alert.    |

The following additional variables are available for **Anomaly** detection monitors:

| Variable            | Description                                    |
|---------------------|------------------------------------------------|
| `{{observed}}`      | The actual observed value of the metric.       |
| `{{predicted}}`     | The expected value based on the historical baseline. |
| `{{upper_bound}}`   | The upper confidence bound of the prediction.  |
| `{{lower_bound}}`   | The lower confidence bound of the prediction.  |

### Example notification

**Threshold monitor:**

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

**Anomaly monitor:**

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

## Example monitors

### Stale table detection

This monitor alerts when a critical table has not been updated within the expected time window.

#### Build the monitoring query

1. In Datadog, go to [**Monitors > New Monitor > Data Observability**](https://app.datadoghq.com/monitors/create/data-observability).
1. Select **Table** as the entity type.
1. Select **Freshness** as the metric type.
1. Select the target table (for example, `ANALYTICS_DB.PROD.ORDERS`).
1. Select **Threshold** as the detection method.
1. Set the expected update frequency to **6 hours**.

#### Set the alert threshold

1. Set the **Alert threshold** to trigger when the table has not been updated for more than 6 hours.
1. Optionally, set a **Warning threshold** at 4 hours to receive an early warning.

#### Configure notifications

1. Under **Configure notifications and automations**, write the notification message. For detailed instructions, see [Notifications](/monitors/notify/). You can use this text for the message body:
{{< code-block lang="text" >}}
{{#is_alert}}
Table {{database.name}}.{{schema.name}}.{{table.name}} has not been updated
in over {{threshold}}. Investigate potential pipeline delays.
{{/is_alert}}

{{#is_recovery}}
Table {{database.name}}.{{schema.name}}.{{table.name}} has been updated.
Freshness has recovered.
{{/is_recovery}}
{{< /code-block >}}
1. Add yourself to the notification recipients by typing and then selecting your name in the **Notify your services and your team members** box.

#### Verify and save the monitor

1. To verify the monitor setup, click **Test Notifications**. Trigger a test alert by choosing **Alert**, then click **Run Test**.
1. Click **Create** to save the monitor.

### Unexpected row count drop

This monitor detects a significant decrease in row count that could indicate a pipeline failure or missing data.

#### Build the monitoring query

1. In Datadog, go to [**Monitors > New Monitor > Data Observability**](https://app.datadoghq.com/monitors/create/data-observability).
1. Select **Table** as the entity type.
1. Select **Row Count** as the metric type.
1. Select the target table (for example, `ANALYTICS_DB.PROD.EVENTS`).
1. Select **Anomaly** as the detection method.

#### Set the alert threshold

1. The anomaly detection automatically triggers when the row count deviates from its historical baseline.
1. To gain context on normal row count ranges, expand the time frame using the dropdown menu at the top of the chart.

#### Configure notifications

1. Under **Configure notifications and automations**, write the notification message. For detailed instructions, see [Notifications](/monitors/notify/). You can use this text for the message body:
{{< code-block lang="text" >}}
{{#is_alert}}
Row count anomaly detected for {{database.name}}.{{schema.name}}.{{table.name}}.
Observed: {{observed}} rows (expected: {{predicted}}, range: {{lower_bound}} to {{upper_bound}}).
{{/is_alert}}

{{#is_recovery}}
Row count for {{database.name}}.{{schema.name}}.{{table.name}} has recovered
to expected levels.
{{/is_recovery}}
{{< /code-block >}}
1. Add yourself to the notification recipients by typing and then selecting your name in the **Notify your services and your team members** box.

#### Verify and save the monitor

1. To verify the monitor setup, click **Test Notifications**. Trigger a test alert by choosing **Alert**, then click **Run Test**.
1. Click **Create** to save the monitor.

### Column null percentage spike

This monitor detects when a column's null percentage exceeds normal levels, which may indicate data ingestion issues.

#### Build the monitoring query

1. In Datadog, go to [**Monitors > New Monitor > Data Observability**](https://app.datadoghq.com/monitors/create/data-observability).
1. Select **Column** as the entity type.
1. Select **Nullness** as the metric type.
1. Select the target column (for example, `ANALYTICS_DB.PROD.USERS.EMAIL`).
1. Select **Anomaly** as the detection method.

#### Set the alert threshold

1. Set the **Alert threshold** to trigger when the null percentage deviates significantly from the historical baseline.
1. To gain context on normal null percentage ranges, expand the time frame to **Past 1 Month** using the dropdown menu at the top of the chart.

#### Configure notifications

1. Under **Configure notifications and automations**, write the notification message. For detailed instructions, see [Notifications](/monitors/notify/). You can use this text for the message body:
{{< code-block lang="text" >}}
{{#is_alert}}
Null percentage for {{database.name}}.{{schema.name}}.{{table.name}}.EMAIL
has exceeded expected levels with a value of {{value}}.
{{/is_alert}}

{{#is_recovery}}
Null percentage for {{database.name}}.{{schema.name}}.{{table.name}}.EMAIL
has returned to expected levels.
{{/is_recovery}}
{{< /code-block >}}
1. Add yourself to the notification recipients by typing and then selecting your name in the **Notify your services and your team members** box.

#### Verify and save the monitor

1. To verify the monitor setup, click **Test Notifications**. Trigger a test alert by choosing **Alert**, then click **Run Test**.
1. Click **Create** to save the monitor.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

