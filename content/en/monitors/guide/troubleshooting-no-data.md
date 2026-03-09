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
- [Troubleshooting the causes of No Data](#additional-causes-for-no-data).
- [Troubleshooting why monitors are *not* alerting on No Data](#monitor-does-not-alert-on-no-data).

Begin with [Key configuration settings](#key-configuration-settings) to check the three most common issues. To enable notifications, see [Enabling No Data notifications](#enabling-no-data-notifications).

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

## Additional causes for No Data

{{% collapse-content title="No data actually exists" level="h3" %}}

The monitor shows `No Data`, and when you graph the metric, no data appears.

#### Verify whether data exists
1. Identify the metric (such as AWS metric or custom metric).
2. Graph it in a notebook or dashboard.
3. Scope to the correct timeframe.
4. Check if data points appear.

#### Understanding (no groups found) vs. No Data
While they look similar, `(no groups found)` is specific to multi alert monitors (grouped by a tag). It indicates that the monitor has no active entities to evaluate, whereas `No Data` refers to the metric itself being empty and is controlled by your monitor's [If data is missing](#enabling-no-data-notifications) settings.

`(no groups found)` typically occurs in the following cases:

- New Setup: The monitor has received no data for any groups since creation.
- Aged Out: Previously active groups stopped reporting and have been cleared from the monitor's memory. Different types of groups have different retention periods:
  - **Standard Monitors**: Groups age out after 24 hours.
  - **Host/Service Checks**: Groups age out after 48 hours.
  - **Custom**: This can be extended through the **Missing data options** setting (**If a group stops reporting data, resolve after X hours**).

{{% /collapse-content %}}

{{% collapse-content title="Data is sparse or delayed" level="h3" %}}

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

{{% collapse-content title="Query contains a rollup" level="h3" %}}

The monitor shows `No Data` even though data exists.

#### Why this happens
Rollups aggregate metric data into buckets. If the monitor doesn't have at least one complete bucket, it reports `No Data`. Datadog does not recommend defining rollups in monitor queries, unless you are monitoring aggregated values over long periods or sparse metrics (typically over 24 hours).

#### Solution
If you use rollups in your monitor query, add an evaluation delay at least equal to the rollup period. This ensures the monitor has at least one bucket of data to evaluate. For example, a 1-hour rollup requires a 3600-second evaluation delay.

<div class="alert alert-tip">The <code>cumsum</code> function is a visual function designed for dashboards and notebooks. It doesn't work reliably in monitors because monitors lack context about which timeframe to use. Instead, use <a href="/monitors/configuration/?tab=thresholdalert#cumulative-time-windows">cumulative time windows</a> to monitor cumulative metrics.</div>

{{% /collapse-content %}}

{{% collapse-content title="Tags contain N/A values" level="h3" %}}

The monitor shows `No Data`, but data exists in dashboards.

#### Verify
1. Create a notebook or dashboard with your monitor query.
2. Look for groups with N/A tag values.

#### Why this happens
When a metric is missing one or more of the tags your monitor groups by, Datadog assigns N/A to those tags. In dashboards, N/A values are displayed automatically, but monitors use AND logic — all specified tags must be present on the metric. If any required tag is N/A, the monitor reports `No Data`. For example, a query scoped by `env:production` won't match metrics where the `env` tag is N/A.

#### Solution
Ensure that all tags specified in your monitor are present on your metric data. If any tag is missing (shows as N/A), update your metric submission to include all required tags, or adjust your monitor query to group or scope only by tags that are always available.

{{% /collapse-content %}}

{{% collapse-content title="Insufficient historical data (Anomaly and Forecast monitors)" level="h3" %}}

Anomaly or Forecast monitor shows `No Data`.

#### Why this happens
`No Data` in Anomaly or Forecast monitors is typically caused by either insufficient historical data or by the presence of rollups in your monitor query.

| Cause                        | Details                                                                                                                                                                                                                    |
|------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Insufficient historical data** | - Anomaly monitors require at least 3 seasons (repeating cycles, such as daily or weekly) of historical data to establish a baseline.<br>- Forecast monitors need varying amounts of historical data depending on the length of the forecast period.                |
| **Rollups in the monitor query** | Adding a rollup in the monitor query overrides Datadog's automatic rollup, which is based on your alert timeframe. Datadog automatically selects rollups to provide 4-6 data points per evaluation. Manual rollups may result in too few points, increasing the risk of `No Data` or inaccurate evaluations.<br><br> Adjusting anomaly rollups can be used to address:<br>- **Sparse metrics**: Increase the rollup interval to capture more points<br>- **Noisy metrics**: Increase the rollup to smooth data by averaging points together|

#### Solution
- **Insufficient historical data**: Allow time for the metric to accumulate more data.
- **Manual rollups**: Remove the rollup from your monitor query, or add an evaluation delay at least equal to the rollup period.

{{% /collapse-content %}}

{{% collapse-content title="Arithmetic with NaN values" level="h3" %}}

A monitor evaluation with arithmetic (`a / b`) shows `No Data`, or a graph displays 0 values.

#### Why this happens
If any part of an arithmetic expression is NaN (Not a Number, which can happen in cases like trying to divide by zero), the entire expression becomes NaN and won't evaluate. For example:
- Expression: `a + b`.
- If `a` is NaN, then `a + b` is NaN.
- The monitor won't evaluate.

<div class="alert alert-info">The exception is that queries using <code>as_count()</code> return 0 for missing values instead of NaN. For more information, see the <a href="/monitors/guide/as-count-in-monitor-evaluations/">as_count() documentation</a>.</div>

#### How to troubleshoot
1. Create a notebook or dashboard.
2. Graph each part of the arithmetic expression separately.
3. Identify which query returns NaN.
4. If at least one query meets `No Data` criteria, the monitor behaved as expected.

{{% /collapse-content %}}


## Troubleshoot No Data alerts

If you expect a `No Data` alert but don't receive one, make sure you have the required settings:
1. **If data is missing** must be set to **Show NO DATA and notify**.
2. **Notification message** must:
   - Apply to all state changes (without conditional blocks), or
   - Include the `{{#is_no_data}}` template variable.

### Common causes for missing alerts
If your monitor has the correct settings but still isn't alerting as expected, check if the following causes could apply to your configuration:

- `No Data` timeframe is shorter than the evaluation window.
- Notification message uses conditional blocks that exclude `No Data`.
- Monitor has `notify_no_data` disabled.

## Enable No Data notifications

1. Set **If data is missing** to **Show NO DATA and notify**.
2. Set the **No Data timeframe** to at least 2x the evaluation window.
3. Set the **Notification message** to either:
   - Apply to all state changes (no conditional blocks), or
   - Use the `{{#is_no_data}}` template variable.

<div class="alert alert-info">
If <code>notify_no_data</code> is <code>true</code> but <code>no_data_timeframe</code> is missing:<br>
- Metric monitors use the evaluation window (<code>last_1h</code>).<br>
- Service checks use the default context expiration (24 hours).
</div>


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/configuration/#new-group-delay
[2]: /monitors/guide/adjusting-no-data-alerts-for-metric-monitors/
[3]: /monitors/configuration/?tab=thresholdalert#cumulative-time-windows
[4]: /monitors/guide/as-count-in-monitor-evaluations/
[5]: /monitors/guide/troubleshooting-apm-monitors/
[6]: /monitors/types/metric/?tab=threshold#advanced-alert-conditions
