---
title: Troubleshooting No Data in Monitors
description: Learn how to diagnose and resolve No Data issues in monitor evaluations
further_reading:
- link: "/monitors/configuration/"
  tag: "Documentation"
  text: "Configure monitors"
- link: "/monitors/guide/adjusting-no-data-alerts-for-metric-monitors/"
  tag: "Documentation"
  text: "Adjusting No Data alerts for metric monitors"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor notifications"
---

## Overview

When a monitor displays `No Data` or fails to evaluate as expected, there are several configuration settings and data characteristics to check. This guide helps you diagnose and resolve `No Data` issues in monitor evaluations, specifically:
- [Troubleshooting the causes of unexpected No Data monitors](#troubleshooting-unexpected-no-data-monitors).
- [Troubleshooting monitors that are *not* alerting on No Data](#troubleshooting-missing-no-data-alerts).

Begin with [Key configuration settings](#key-configuration-settings) to check the three most common issues.

## Key configuration settings

When a monitor shows `No Data` but you expect it to have data, check these three settings first:

Evaluation window (alert timeframe)
: Found under **Evaluation Details**, this setting defines the time period the monitor uses to evaluate your query. A window that's too small may not capture enough data points.

Evaluation delay / New group delay
: Found under **Advanced Options**, this setting adds a delay before the monitor evaluates data. This is crucial for metrics that report with a delay, such as cloud provider metrics.
  - **AWS and crawler-based metrics**: Minimum 15 minutes (900 seconds) delay recommended.
  - See [New Group Delay][1] for more details on handling sparse data.

Require a full window of data
: Found under **Advanced Options**, this setting determines whether the monitor requires a complete evaluation window of data before alerting.
  - **Do not require**: Monitor evaluates on partial data (recommended for sparse metrics).
  - **Require**: Monitor waits for a full window before evaluating.

{{< img src="/monitors/guide/troubleshooting_no_data/key_configuration_ui.png" alt="Key configuration settings in monitor configuration UI" style="width:80%;" >}}

## Troubleshooting unexpected No Data monitors

Use the following sections to identify why your monitor is showing `No Data` when you expect it to have data.

{{% collapse-content title="No data appears when you graph metrics" level="h4" %}}

#### Root cause
The monitor shows `No Data` when you graph the metric. No data appears because there is no data.

#### Verify whether data exists
1. Identify the metric (such as AWS metric or custom metric).
2. Graph it in a notebook or dashboard.
3. Scope the graph to the same timeframe as the monitor.
4. Check if data points appear.

#### Understanding (no groups found) vs. No Data
While they look similar, `(no groups found)` is specific to multi alert monitors (grouped by a tag). It indicates that the monitor has no active entities to evaluate, whereas `No Data` refers to the metric itself being empty and is controlled by your monitor's **If data is missing** settings.

`(no groups found)` typically occurs in the following cases:

- New Setup: The monitor has received no data for any groups since creation.
- Aged Out: Previously active groups stopped reporting and have been cleared from the monitor's memory. Different types of groups have different retention periods:
  - **Standard Monitors**: Groups age out after 24 hours.
  - **Host/Service Checks**: Groups age out after 48 hours.
  - **Custom**: This can be extended through the **Missing data options** setting (**If a group stops reporting data, resolve after X hours**).

{{% /collapse-content %}}

{{% collapse-content title="Data is sparse or delayed" level="h4" %}}

#### Root cause
Data exists but doesn't appear consistently or arrives late.

#### Verify data frequency
1. Graph the metric over 2-3 times the evaluation timeframe.
   - Example: For a 5-minute evaluation window, graph the last 15 minutes.
2. Look for gaps between data points or inconsistent reporting intervals, which indicate sparse or delayed metrics.

#### Possible solutions
- In [Metric monitor Advanced Options][6], enable the **"Do not require a full window of data for evaluation"** setting.
- Increase the evaluation window to capture more data points.
- Add an evaluation delay to account for data ingestion delays.
- For aggregations like `avg`, `min`, and `max`, consider a larger timeframe.

To learn how to apply these changes, see [Adjusting No Data alerts for metric monitors][2].

{{% /collapse-content %}}

{{% collapse-content title="Query with a rollup shows No Data" level="h4" %}}

#### Root cause
The monitor shows `No Data` even though data exists. If your query contains a [`rollup`][7] function, this could be causing `No Data`.

#### Why this happens
Rollups aggregate metric data into buckets. If the monitor doesn't have at least one complete bucket, it reports `No Data`. Additionally, rollup intervals are aligned to UNIX time, not to the start and end of monitor queries. A monitor may evaluate an incomplete rollup interval containing only a small sample of data, which can result in `No Data`.

For example, if a monitor has a 4-minute rollup and a 20-minute evaluation window, it produces one data point every 4 minutes, leading to a maximum of 5 data points within the window. If the **Require Full Window** option is enabled, the evaluation may result in "No Data" because the window is not fully populated.

#### Solution
<div class="alert alert-tip">Unless you are monitoring one aggregated value over a long period or monitoring sparse metrics (typically over 24 hours), Datadog recommends avoiding rollups in monitor queries. For more information on rollups, see <a href="/dashboards/functions/rollup/#rollups-in-monitors">Rollups in monitors</a>.</div>

If you use rollups in your monitor query, add an evaluation delay at least equal to the rollup period. This ensures the monitor has at least one bucket of data to evaluate. For example, a 1-hour rollup requires a 3600-second evaluation delay.

{{% /collapse-content %}}

{{% collapse-content title="Tags contain N/A values" level="h4" %}}

#### Root cause
The monitor shows `No Data`, but data exists in dashboards. The metric is missing one or more tags that the monitor groups by.

#### Why this happens
When a metric is missing one or more of the tags your monitor query groups by, Datadog assigns N/A to those tags. In dashboards, N/A values are displayed automatically, but monitors use AND logic — all specified tags must be present on the metric. If any required tag is N/A, the monitor reports `No Data`. For example, a query scoped by `env:production` won't match metrics where the `env` tag is N/A.

#### Identify N/A tag values
Confirm that N/A tag values are causing No Data in your monitor:
1. Create a notebook or dashboard with your monitor query.
2. Look for groups with N/A tag values.

#### Solution
Ensure that all tags specified in your monitor query are present on your metric data. If any tag is missing (shows as N/A), update your metric submission to include all required tags, or adjust your monitor query to group or scope only by tags that are always available.

{{% /collapse-content %}}

{{% collapse-content title="Insufficient historical data (Anomaly and Forecast monitors)" level="h4" %}}

#### Root cause
Unlike standard monitors, Anomaly and Forecast monitors depend on historical data to evaluate. Without enough history, they cannot produce a result and report `No Data`.

#### Why this happens
- Anomaly monitors require at least 3 seasons (repeating cycles, such as daily or weekly) of historical data to establish a baseline.
- Forecast monitors need varying amounts of historical data depending on the length of the forecast period.

If your query contains a rollup, see [Query with a rollup shows No Data](#query-with-a-rollup-shows-no-data).

#### Solution
Allow time for the metric to accumulate more data.

{{% /collapse-content %}}

{{% collapse-content title="Arithmetic with NaN values" level="h4" %}}

#### Root cause
A monitor reports `No Data` when any query in its arithmetic expression returns NaN.

#### Why this happens
If any part of an arithmetic expression is NaN (Not a Number, which can happen in cases like trying to divide by zero), the entire expression becomes NaN and won't evaluate. For example:
- Expression: `a + b`.
- If `a` is NaN, then `a + b` is NaN.
- The monitor won't evaluate.

<div class="alert alert-info">The exception is that queries using <code>as_count()</code> return 0 for missing values instead of NaN. For more information, see the <a href="/monitors/guide/as-count-in-monitor-evaluations/">as_count() documentation</a>.</div>

#### Identify the NaN query
Graph each part of the arithmetic expression separately to confirm which query is returning NaN:
1. Create a notebook or dashboard.
2. Graph each part of the arithmetic expression separately.
3. Identify which query returns NaN.
4. If at least one query meets `No Data` criteria, the monitor behaved as expected.

{{% /collapse-content %}}

## Troubleshooting missing No Data alerts

If you expect a `No Data` alert but don't receive one, make sure you have the required settings:
1. **If data is missing** must be set to **Show NO DATA and notify**.
    {{< img src="/monitors/guide/troubleshooting_no_data/enabling_no_data_notifications.png" alt="Enabling No Data notifications in monitor configuration" style="width:90%;" >}}
2. **Notification message** must:
   - Apply to all state changes (without conditional blocks), or
   - Include the `{{#is_no_data}}` template variable.
   ```
   {{#is_no_data}}
   No Data: {{monitor.name}} has stopped reporting.
   Check your data pipeline to confirm metrics are reporting as expected.
   {{/is_no_data}}
   ```

### Additional settings to check
If your monitor still isn't alerting as expected, verify the following:
  - Set the `No Data` timeframe to at least 2x the evaluation window.
  - Remove conditional blocks that exclude `No Data` from the notification message, or add the `{{#is_no_data}}` template variable.
  - Confirm that **No Data notification** is enabled in your monitor configuration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/configuration/#new-group-delay
[2]: /monitors/guide/adjusting-no-data-alerts-for-metric-monitors/
[6]: /monitors/types/metric/?tab=threshold#advanced-alert-conditions
[7]: /dashboards/functions/rollup/