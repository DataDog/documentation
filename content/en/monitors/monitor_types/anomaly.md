---
title: Anomaly Monitor
kind: documentation
aliases:
    - /guides/anomalies
description: "Detects anomalous behavior for a metric based on historical data"
further_reading:
- link: "/monitors/notifications/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/monitor_status/"
  tag: "Documentation"
  text: "Consult your monitor status"
---

## Overview

Anomaly detection is an algorithmic feature that identifies when a metric is behaving differently than it has in the past, taking into account trends, seasonal day-of-week, and time-of-day patterns. It is well-suited for metrics with strong trends and recurring patterns that are hard to monitor with threshold-based alerting.

For example, anomaly detection can help you discover when your web traffic is unusually low on a weekday afternoon&mdash;even though that same level of traffic is normal later in the evening. Or consider a metric measuring the number of logins to your steadily-growing site. Because the number increases daily, any threshold would be quickly outdated, whereas anomaly detection can alert you if there is an unexpected drop&mdash;potentially indicating an issue with the login system.

## Monitor creation

To create an [anomaly monitor][1] in Datadog, use the main navigation: *Monitors --> New Monitor --> Anomaly*.

### Define the metric

Any metric currently reporting to Datadog is available for monitors. For more information, see the [Metric Monitor][2] page.
**Note**: The `anomalies` function uses the past to predict what is expected in the future, so using it on a new metric may yield poor results.

After defining the metric, the anomaly detection monitor provides two preview graphs in the editor:
{{< img src="monitors/monitor_types/anomaly/context.png" alt="historical context"  style="width:80%;">}}

* The **Historical View** allows you to explore the monitored query at different time scales to better understand why data may be considered anomalous or non-anomalous.
* The **Evaluation Preview** is longer than the alerting window and provides insight on what the anomalies algorithm takes into account when calculating the bounds.

### Set alert conditions

Trigger an alert if the values have been `above or below`, `above`, or `below` the bounds for the last `15 minutes`, `1 hour`, etc. or `custom` to set a value between 15 minutes and 24 hours. Recover if the values are within the bounds for at least `15 minutes`, `1 hour`, etc. or `custom` to set a value between 15 minutes and 24 hours.

Anomaly detection
: With the default option (`above or below`) a metric is considered to be anomalous if it is outside of the gray anomaly band. Optionally, you can specify whether being only `above` or `below` the bands is considered anomalous.

Trigger window
: How much time is required for the metric to be anomalous before the alert triggers. **Note**: If the alert window is too short, you might get false alarms due to spurious noise.

Recovery window
: How much time is required for the metric to not be considered anomalous so the alert recovers.

#### Advanced options

Datadog automatically analyzes your chosen metric and sets several parameters for you. However, the options are available for you to edit under **Advanced Options**.

{{< img src="monitors/monitor_types/anomaly/advanced_options.png" alt="advanced options"  style="width:80%;">}}


Deviations 
: The width of the gray band. This is equivalent to the bounds parameter used in the [anomalies function][3].

Algorithm
: The [anomaly detection algorithm](#anomaly-detection-algorithms) (`basic`, `agile`, or `robust`).

Seasonality 
: The [seasonality](#seasonality) (`hourly`, `daily`, or `weekly`) of the cycle for the `agile` or `robust` algorithm to analyze the metric.

Daylight savings
: Available for `agile` or `robust` anomaly detection with `weekly` or `daily` seasonality. For more information, see [Anomaly Detection and Time Zones][4].

Rollup  
: The [rollup interval][5].

Thresholds
: The percentage of points that need to be anomalous for alerting, warning, and recovery.

##### Seasonality

Hourly
: The algorithm expects the same minute after the hour behaves like past minutes after the hour, for example 5:15 behaves like 4:15, 3:15, etc.

Daily
: The algorithm expects the same time today behaves like past days, for example 5pm today behaves like 5pm yesterday.

Weekly
: The algorithm expects that a given day of the week behaves like past days of the week, for example this Tuesday behaves like past Tuesdays.

**Note**: Machine learning algorithms require at least twice as much historical data time as the chosen seasonality time to be fully efficient.

##### Anomaly detection algorithms

Basic
: Use when metrics have no repeating seasonal pattern.  Basic uses a simple lagging rolling quantile computation to determine the range of expected values. It uses very little data and adjusts quickly to changing conditions but has no knowledge of seasonal behavior or longer trends. 

Agile
: Use when metrics are seasonal and expected to shift. The algorithm quickly adjusts to metric level shifts. A robust version of the [SARIMA][6] algorithm, it incorporates the immediate past into its predictions, allowing quick updates for level shifts at the expense of being less robust to recent, long-lasting anomalies.

Robust
: Use when seasonal metrics expected to be stable, and slow, level shifts are considered anomalies. A [seasonal-trend decomposition][7] algorithm, it is very stable and predictions remain constant even through long-lasting anomalies at the expense of taking longer to respond to intended level shifts (e.g. if the level of a metric shifts due to a code change.)

All of the seasonal algorithms may use up to a couple of months of historical data when calculating a metric's expected normal range of behavior. By using a significant amount of past data, the algorithms can avoid giving too much weight to abnormal behavior that might have occurred in the recent past.

**Examples:**<br>
The graphs below illustrate how and when these three algorithms behave differently from one another.

In this example, `basic` successfully identifies anomalies that spike out of the normal range of values, but it does not incorporate the repeating, seasonal pattern into its predicted range of values. By contrast, `robust` and `agile` both recognize the seasonal pattern and can detect more nuanced anomalies, for example if the metric was to flat-line near its minimum value.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_1.png" alt="alg comparison 1"  style="width:90%;">}}

In this example, the metric exhibits a sudden level shift. `Agile` adjusts more quickly to the level shift than `robust`. Also, the width of `robust`'s bounds increases to reflect greater uncertainty after the level shift; the width of `agile`'s bounds remains unchanged. `Basic` is clearly a poor fit for this scenario, where the metric exhibits a strong weekly seasonal pattern.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_2.png" alt="algorithm comparison 2"  style="width:90%;">}}

This example shows how the algorithms react to an hour-long anomaly. `Robust` completely ignores this anomaly. The other algorithms start to behave as if the anomaly is the new normal. `Agile` even identifies the metric's return to its original level as an anomaly.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_3.png" alt="algorithm comparison 3"  style="width:90%;">}}

The algorithms deal with scale differently. `Basic` and `robust` are scale-insensitive, while `agile` is not. The graphs on the left below show `agile` and `robust` mark the level-shift as being anomalous. On the right, we add 1000 to the same metric, and `agile` no longer calls out the level-shift as being anomalous whereas `robust` continues do so.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_scale.png" alt="algorithm comparison scale"  style="width:90%;">}}

This example shows how each algorithm handles a new metric. `Robust` and `agile` won't show any bounds during the first few seasons (weekly). `Basic` starts showing bounds shortly after the metric first appears.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_new_metric.png" alt="algorithm comparison new metric"  style="width:90%;">}}

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][8] page.

## API

Enterprise-level customers can create anomaly detection monitors using the [create-monitor API endpoint][9]. Datadog **strongly recommends** [exporting a monitor's JSON][10] to build the query for the API. By using the [monitor creation page][1] in Datadog, customers benefit from the preview graph and automatic parameter tuning to help avoid a poorly configured monitor.

**Note**: Anomaly detection monitors are only available to enterprise-level customers. Pro-level customers interested in anomaly detection monitors should reach out to their customer success representative or email the [Datadog billing team][11].

Anomaly monitors are managed using the [same API][12] as other monitors. These fields are unique for anomaly monitors:

### `query`

The `query` property in the request body should contain a query string in the following format:

```text
avg(<query_window>):anomalies(<metric_query>, '<algorithm>', <deviations>, direction='<direction>', alert_window='<alert_window>', interval=<interval>, count_default_zero='<count_default_zero>' [, seasonality='<seasonality>']) >= <threshold>
```

`query_window`
: A timeframe like `last_4h` or `last_7d`. The time window displayed in graphs in notifications. Must be at least as large as the `alert_window` and is recommended to be around 5 times the `alert_window`.

`metric_query`
: A standard Datadog metric query (e.g., `sum:trace.flask.request.hits{service:web-app}.as_count()`).

`algorithm`
: `basic`, `agile`, or `robust`.

`deviations`
: A positive number; controls the sensitivity of the anomaly detection.

`direction`
: The directionality of anomalies that should trigger an alert: `above`, `below`, or `both`.

`alert_window`
: The timeframe which will be checked for anomalies (e.g., `last_5m`, `last_1h`).

`interval`
: A positive integer representing the number of seconds in the rollup interval. We recommend that the `interval` be at least a fifth of the `alert_window` duration.

`count_default_zero`
: Use `true` for most monitors. Set to `false` only if submitting a count metric in which the lack of a value should _not_ be interpreted as a zero.

`seasonality`
: `hourly`, `daily`, or `weekly`. Exclude this parameter when using the `basic` algorithm.

`threshold`
: A positive number no larger than 1. The fraction of points in the `alert_window` that must be anomalous in order for a critical alert to trigger.

Below is an example query for an anomaly detection monitor, which alerts when the average Cassandra node's CPU is three standard deviations above the ordinary value over the last 5 minutes:

```text
avg(last_1h):anomalies(avg:system.cpu.system{name:cassandra}, 'basic', 3, direction='above', alert_window='last_5m', interval=20, count_default_zero='true') >= 1
```

### `options`

Most of the properties under `options` in the request body are the same as for other query alerts, except for `thresholds` and `threshold_windows`.

`thresholds`
: Anomaly monitors support `critical`, `critical_recovery`, `warning`, and `warning_recovery` thresholds. Thresholds are expressed as numbers from 0 to 1, and are interpreted as the fraction of the associated window that is anomalous. For example, an `critical` threshold value of `0.9` means that a critical alert triggers when at least 90% of the points in the `trigger_window` (described below) are anomalous. Or, a `warning_recovery` value of 0 means that the monitor recovers from the warning state only when 0% of the points in the `recovery_window` are anomalous.
: The `critical` `threshold` should match the `threshold` used in the `query`.

`threshold_windows`
: Anomaly monitors have a `threshold_windows` property in `options`. `threshold_windows` must include both two properties—`trigger_window` and `recovery_window`. These windows are expressed as timeframe strings, such as `last_10m` or `last_1h`. The `trigger_window` must match the `alert_window` from the `query`. The `trigger_window` is the time range which is analyzed for anomalies when evaluating whether a monitor should trigger. The `recovery_window` is the time range that analyzed for anomalies when evaluating whether a triggered monitor should recover.

A standard configuration of thresholds and threshold window looks like:

```json
"options": {
  ...
  "thresholds": {
    "critical": 1,
    "critical_recovery": 0
  },
  "threshold_windows": {
    "trigger_window": "last_30m",
    "recovery_window": "last_30m"
  }
}
```

## Troubleshooting

* [Anomaly Monitor FAQ][13]
* [Contact Datadog support][14]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/anomaly
[2]: /monitors/monitor_types/metric/#define-the-metric
[3]: /dashboards/functions/algorithms/#anomalies
[4]: /monitors/faq/how-to-update-anomaly-monitor-timezone/
[5]: /dashboards/functions/rollup/
[6]: https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average
[7]: https://en.wikipedia.org/wiki/Decomposition_of_time_series
[8]: /monitors/notifications/
[9]: /api/v1/monitors/#create-a-monitor
[10]: /monitors/monitor_status/#settings
[11]: mailto:billing@datadoghq.com
[12]: /api/v1/monitors/
[13]: /monitors/faq/anomaly-monitor/
[14]: /help/
