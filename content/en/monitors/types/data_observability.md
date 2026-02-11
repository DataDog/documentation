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

With the [Data Observability][1] monitor type, you can create monitors that alert on data quality issues across your data warehouses. These monitors detect problems such as data freshness delays, unexpected changes in row count, shifts in column-level metrics, and custom SQL query results before they affect downstream dashboards, machine learning models, or other consumers.

Data Observability monitors require [Quality Monitoring][2] to be set up with at least one supported data warehouse (Snowflake, Databricks, or BigQuery).

## Monitor creation

To create a Data Observability monitor in Datadog, navigate to [**Monitors** > **New Monitor** > **Data Observability**][3] in the UI.

<div class="alert alert-info">There is a default limit of 1000 Data Observability monitors per account. If you are encountering this limit, consider using <a href="/monitors/configuration/?tab=thresholdalert#multi-alert">multi alerts</a>, or <a href="/help/">Contact Support</a> to lift this limit for your account.</div>

## Select an entity type and monitor type

First, select the **entity type** to determine whether you are monitoring at the table level or column level:

- **Table**: Monitor table-level signals such as freshness, row count, or a custom SQL query result.
- **Column**: Monitor column-level metrics such as nullness, uniqueness, cardinality, or statistical measures.

Then, choose a monitor type based on the data quality signal you want to track:

{{< tabs >}}
{{% tab "Freshness" %}}

**Freshness** monitors detect when data has not been updated within an expected time window. Use freshness monitors to catch stale data before it affects downstream reports or models.

- **Table freshness** tracks the time elapsed since the table was last updated.
- **Column freshness** tracks the most recent date seen in a datetime column.

1. Select the entity type: **Table** or **Column**.
1. Select **Freshness** as the monitor type.
1. Choose the target table or column to monitor.
1. Select the detection method:
    - **Anomaly**: Alert when the freshness deviates from an expected pattern.
    - **Threshold**: Alert when the freshness crosses a fixed value.
1. Define the expected update frequency (for example, the table should be updated at least every 6 hours).

{{% /tab %}}
{{% tab "Row Count" %}}

**Row Count** monitors track row count changes in your tables. Use row count monitors to detect unexpected drops or spikes in data that could indicate pipeline failures or upstream issues.

1. Select **Table** as the entity type.
1. Select **Row Count** as the monitor type.
1. Choose the target table to monitor.
1. Select the detection method:
    - **Anomaly**: Alert when the row count deviates from its historical baseline.
    - **Threshold**: Alert when the row count is above or below a fixed value.

{{% /tab %}}
{{% tab "Column Metric" %}}

**Column Metric** monitors track column-level metrics to detect data drift or quality degradation. Select from the following metrics:

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

**Custom SQL** monitors track a custom metric value returned by a SQL query that you define. Use Custom SQL monitors when built-in metrics do not cover your use case, such as monitoring business-specific data quality rules.

1. Select **Table** as the entity type.
1. Select **Custom SQL** as the monitor type.
1. Choose the target table to monitor.
1. Select a **model type** that describes the value returned by your query:
    - **Default**: The query returns a scalar value. Use this in most cases.
    - **Freshness**: The query returns the difference (in seconds) between the current time and the last time an event occurred.
    - **Percentage**: The query returns a percentage value between 0 and 100.
1. Write a SQL query that returns a single value aliased as `dd_value`. For example:
{{< code-block lang="sql" >}}
SELECT SUM(column_name) as dd_value FROM schema.table
{{< /code-block >}}
1. Click **Validate** to verify your query syntax.
1. Select the detection method:
    - **Anomaly**: Alert when the metric deviates from an expected pattern.
    - **Threshold**: Alert when the metric crosses a fixed value.

{{% /tab %}}
{{< /tabs >}}

## Set alert conditions

1. Set an alert to trigger whenever the monitored value is `above`, `above or equal to`, `below`, `below or equal to`, `equal to`, or `not equal to` a threshold that you define. For help configuring the options in this view, see [Configure Monitors][5].
1. Set a **Critical** threshold (required) and optionally a **Warning** threshold for early detection.
1. Determine your desired behavior when data is missing, for example, `evaluate as zero`, `show NO DATA`, `show NO DATA and notify`, or `show OK`.

<div class="alert alert-info">When using the <strong>Anomaly</strong> detection method, the monitor triggers based on deviation from the expected baseline. Threshold values are not required for anomaly detection.</div>

### No data alerts

To receive a notification when Datadog stops receiving quality monitoring data for a table, set the condition to trigger on **No Data**. This is useful for detecting cases where a data warehouse connection has dropped or metadata collection has stopped.

### Advanced alert conditions

For more information about advanced alert options such as evaluation delay, see [Configure Monitors][6].

## Configure notifications and automations

For detailed instructions on the **Configure notifications and automations** section, see [Notifications][4].

You can use the following template variables in your notification messages:

| Variable            | Description                                    |
|---------------------|------------------------------------------------|
| `{{table.name}}`    | The name of the affected table.               |
| `{{schema.name}}`   | The schema containing the affected table.      |
| `{{warehouse.name}}`| The data warehouse containing the affected table.|
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
Data quality issue detected on {{warehouse.name}}.{{schema.name}}.{{table.name}}:
current value {{value}} has breached the threshold of {{threshold}}.
{{/is_alert}}

{{#is_recovery}}
Data quality issue on {{warehouse.name}}.{{schema.name}}.{{table.name}} has recovered.
Current value {{value}} is within the threshold of {{threshold}}.
{{/is_recovery}}
{{< /code-block >}}

**Anomaly monitor:**

{{< code-block lang="text" >}}
{{#is_alert}}
Anomaly detected on {{warehouse.name}}.{{schema.name}}.{{table.name}}:
observed value {{observed}} is outside the expected range of {{lower_bound}} to {{upper_bound}}
(predicted: {{predicted}}).
{{/is_alert}}

{{#is_recovery}}
{{warehouse.name}}.{{schema.name}}.{{table.name}} has recovered.
Observed value {{observed}} is within the expected range.
{{/is_recovery}}
{{< /code-block >}}

## Example monitors

### Stale table detection

This monitor alerts when a critical table has not been updated within the expected time window.

#### Build the monitoring query

1. In Datadog, go to [**Monitors > New Monitor > Data Observability**][3].
1. Select **Table** as the entity type.
1. Select **Freshness** as the monitor type.
1. Select the target table (for example, `analytics.orders`).
1. Select **Threshold** as the detection method.
1. Set the expected update frequency to **6 hours**.

#### Set the alert threshold

1. Set the **Alert threshold** to trigger when the table has not been updated for more than 6 hours.
1. Optionally, set a **Warning threshold** at 4 hours to receive an early warning.

#### Configure notifications

1. Under **Configure notifications and automations**, write the notification message. For detailed instructions, see [Notifications][4]. You can use this text for the message body:
{{< code-block lang="text" >}}
{{#is_alert}}
Table {{warehouse.name}}.{{schema.name}}.{{table.name}} has not been updated
in over {{threshold}}. Investigate potential pipeline delays.
{{/is_alert}}

{{#is_recovery}}
Table {{warehouse.name}}.{{schema.name}}.{{table.name}} has been updated.
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

1. In Datadog, go to [**Monitors > New Monitor > Data Observability**][3].
1. Select **Table** as the entity type.
1. Select **Row Count** as the monitor type.
1. Select the target table (for example, `warehouse.events`).
1. Select **Anomaly** as the detection method.

#### Set the alert threshold

1. The anomaly detection automatically triggers when the row count deviates from its historical baseline.
1. To gain context on normal row count ranges, expand the time frame using the dropdown menu at the top of the chart.

#### Configure notifications

1. Under **Configure notifications and automations**, write the notification message. For detailed instructions, see [Notifications][4]. You can use this text for the message body:
{{< code-block lang="text" >}}
{{#is_alert}}
Row count anomaly detected for {{warehouse.name}}.{{schema.name}}.{{table.name}}.
Observed: {{observed}} rows (expected: {{predicted}}, range: {{lower_bound}} to {{upper_bound}}).
{{/is_alert}}

{{#is_recovery}}
Row count for {{warehouse.name}}.{{schema.name}}.{{table.name}} has recovered
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

1. In Datadog, go to [**Monitors > New Monitor > Data Observability**][3].
1. Select **Column** as the entity type.
1. Select **Nullness** as the monitor type.
1. Select the target column (for example, `warehouse.users.email`).
1. Select **Anomaly** as the detection method.

#### Set the alert threshold

1. Set the **Alert threshold** to trigger when the null percentage deviates significantly from the historical baseline.
1. To gain context on normal null percentage ranges, expand the time frame to **Past 1 Month** using the dropdown menu at the top of the chart.

#### Configure notifications

1. Under **Configure notifications and automations**, write the notification message. For detailed instructions, see [Notifications][4]. You can use this text for the message body:
{{< code-block lang="text" >}}
{{#is_alert}}
Null percentage for column {{warehouse.name}}.{{schema.name}}.{{table.name}}.email
has exceeded expected levels with a value of {{value}}.
{{/is_alert}}

{{#is_recovery}}
Null percentage for column {{warehouse.name}}.{{schema.name}}.{{table.name}}.email
has returned to expected levels.
{{/is_recovery}}
{{< /code-block >}}
1. Add yourself to the notification recipients by typing and then selecting your name in the **Notify your services and your team members** box.

#### Verify and save the monitor

1. To verify the monitor setup, click **Test Notifications**. Trigger a test alert by choosing **Alert**, then click **Run Test**.
1. Click **Create** to save the monitor.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/
[2]: /data_observability/quality_monitoring/
[3]: https://app.datadoghq.com/monitors/create/data-observability
[4]: /monitors/notify/
[5]: /monitors/configuration/?tab=thresholdalert#thresholds
[6]: /monitors/create/configuration/#advanced-alert-conditions
