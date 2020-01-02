---
title: Anomaly Monitor
kind: documentation
aliases:
    - /guides/anomalies
description: "Detects anomalous behavior for a metric based on historical data"
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "monitors/monitor_status"
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
{{< img src="monitors/monitor_types/anomaly/context.png" alt="historical context" responsive="true" style="width:80%;">}}

* The **Historical View** allows you to explore the monitored query at different time scales to better understand why data may be considered anomalous or non-anomalous.
* The **Evaluation Preview** is longer than the alerting window and provides insight on what the anomalies algorithm takes into account when calculating the bounds.

### Set alert conditions

* Trigger an alert if the values have been `above or below`, `above`, or `below`
* the bounds for the last `15 minutes`, `1 hour`, `2 hours`, etc.
* Recover if the values are within the bounds for at least `15 minutes`, `1 hour`, `2 hours`, etc.

**Anomaly direction** - With the default option (`above or below`) a metric is considered to be anomalous if it is outside of the gray anomaly band. Optionally, you can specify whether being only `above` or `below` the bands is considered anomalous.

**Trigger window** - How much time is required for the metric to be anomalous before the alert triggers. **Note**: If the alert window is too short, you might get false alarms due to spurious noise.

**Recovery window** - How much time is required for the metric to not be considered anomalous so the alert recovers.

#### Advanced Options

Datadog automatically analyzes your chosen metric and sets several parameters for you. However, the options are available for you to edit under **Advanced Options**.

{{< img src="monitors/monitor_types/anomaly/advanced_options.png" alt="advanced options" responsive="true" style="width:80%;">}}

| Option                      | Description                                                                                                                |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Deviations                  | The width of the gray band. This is equivalent to the bounds parameter used in the [anomalies function][3].                |
| Algorithm                   | The [anomaly detection algorithm](#anomaly-detection-algorithms) (`basic`, `agile`, or `robust`).                          |
| [Seasonality](#seasonality) | The seasonality (`hourly`, `daily`, or `weekly`) of the cycle for the `agile` or `robust` algorithm to analyze the metric. |
| [Daylight&nbsp;savings][4]  | Available for `agile` or `robust` anomaly detection with `weekly` or `daily` seasonality.                                  |
| [Rollup][5]                 | The rollup interval.                                                                                                       |
| Thresholds                  | The percentage of points that need to be anomalous for alerting, warning, and recovery.                                    |

##### Seasonality

| Option | Description                                                                                                                                   |
|--------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| Hourly | The algorithm expects the same minute after the hour behaves like past minutes after the hour, for example 5:15 behaves like 4:15, 3:15, etc. |
| Daily  | The algorithm expects the same time today behaves like past days, for example 5pm today behaves like 5pm yesterday.                           |
| Weekly | The algorithm expects that a given day of the week behaves like past days of the week, for example this Tuesday behaves like past Tuesdays.   |

**Note**: Machine learning algorithms require at least twice as much historical data time as the chosen seasonality time to be fully efficient.

##### Anomaly Detection Algorithms

| Option | Use case                                                                                       | Description                                                                                                                                                                                                                                                           |
|--------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Basic  | Metrics with no repeating seasonal pattern                                                     | Uses a simple lagging rolling quantile computation to determine the range of expected values. It uses very little data and adjusts quickly to changing conditions but has no knowledge of seasonal behavior or longer trends.                                         |
| Agile  | Seasonal metrics expected to shift, the algorithm should quickly adjust to metric level shifts | A robust version of the [SARIMA][6] algorithm, it incorporates the immediate past into its predictions, allowing quick updates for level shifts at the expense of being less robust to recent, long-lasting anomalies.                                                |
| Robust | Seasonal metrics expected to be stable, slow level shifts are considered anomalies             | A [seasonal-trend decomposition][7] algorithm, it is very stable and predictions remain constant even through long-lasting anomalies at the expense of taking longer to respond to intended level shifts (e.g. if the level of a metric shifts due to a code change.) |

All of the seasonal algorithms may use up to a couple of months of historical data when calculating a metric's expected normal range of behavior. By using a significant amount of past data, the algorithms can avoid giving too much weight to abnormal behavior that might have occurred in the recent past.

**Examples**:<br>
The graphs below illustrate how and when these three algorithms behave differently from one another.

In this example, `basic` successfully identifies anomalies that spike out of the normal range of values, but it does not incorporate the repeating, seasonal pattern into its predicted range of values. By contrast, `robust` and `agile` both recognize the seasonal pattern and can detect more nuanced anomalies, for example if the metric was to flat-line near its minimum value.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_1.png" alt="alg comparison 1" responsive="true" style="width:90%;">}}

In this example, the metric exhibits a sudden level shift. `Agile` adjusts more quickly to the level shift than `robust`. Also, the width of `robust`'s bounds increases to reflect greater uncertainty after the level shift; the width of `agile`'s bounds remains unchanged. `Basic` is clearly a poor fit for this scenario, where the metric exhibits a strong weekly seasonal pattern.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_2.png" alt="algorithm comparison 2" responsive="true" style="width:90%;">}}

This example shows how the algorithms react to an hour-long anomaly. `Robust` completely ignores this anomaly. The other algorithms start to behave as if the anomaly is the new normal. `Agile` even identifies the metric's return to its original level as an anomaly.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_3.png" alt="algorithm comparison 3" responsive="true" style="width:90%;">}}

The algorithms deal with scale differently. `Basic` and `robust` are scale-insensitive, while `agile` is not. The graphs on the left below show `agile` and `robust` mark the level-shift as being anomalous. On the right, we add 1000 to the same metric, and `agile` no longer calls out the level-shift as being anomalous whereas `robust` continues do so.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_scale.png" alt="algorithm comparison scale" responsive="true" style="width:90%;">}}

This example shows how each algorithm handles a new metric. `Robust` and `agile` won't show any bounds during the first few seasons (weekly). `Basic` starts showing bounds shortly after the metric first appears.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_new_metric.png" alt="algorithm comparison new metric" responsive="true" style="width:90%;">}}

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][8] page.

## API

Enterprise-level customers can create anomaly detection monitors using the [create-monitor API endpoint][9]. Datadog recommends [exporting a monitor's JSON][10] to build the query for the API.

Below is an example query for an anomaly detection monitor, which alerts when the average Cassandra node's CPU is three standard deviations above the ordinary value over the last 5 minutes:

```text
avg(last_1h):anomalies(avg:system.cpu.system{name:cassandra}, 'basic', 3, direction='above', alert_window='last_5m', interval=20, count_default_zero='true') >= 1
```

**Note**: Anomaly detection monitors are only available to enterprise-level customers. Pro-level customers interested in anomaly detection monitors should reach out to their customer success representative or email the [Datadog billing team][11].

## Troubleshooting

* [Anomaly Monitor FAQ][12]
* [Contact Datadog support][13]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/anomaly
[2]: /monitors/monitor_types/metric/#define-the-metric
[3]: /graphing/functions/algorithms/#anomalies
[4]: /monitors/faq/how-to-update-anomaly-monitor-timezone
[5]: /graphing/functions/rollup
[6]: https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average
[7]: https://en.wikipedia.org/wiki/Decomposition_of_time_series
[8]: /monitors/notifications
[9]: /api/#monitor-create
[10]: /monitors/monitor_status/#settings
[11]: mailto:billing@datadoghq.com
[12]: /monitors/faq/anomaly-monitor
[13]: /help
