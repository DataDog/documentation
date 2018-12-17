---
title: Anomaly monitor
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

Anomaly detection is an algorithmic feature that allows you to identify when a metric is behaving differently than it has in the past, taking into account trends, seasonal day-of-week, and time-of-day patterns. It is well-suited for metrics with strong trends and recurring patterns that are hard or impossible to monitor with threshold-based alerting.

For example, anomaly detection can help you discover when your web traffic is unusually low on a weekday afternoon&mdash;even though that same level of traffic would be perfectly normal later in the evening. Or consider a metric measuring the number of logins to your steadily-growing site. As the number is increasing every day, any threshold would be quickly outdated, whereas anomaly detection can quickly alert you if there is an unexpected drop&mdash;potentially indicating an issue with the login system.

## How to Create an Anomaly Detection Monitor

There is an `anomalies` function in the Datadog query language. When you apply this function to a series, it returns the usual results along with an expected "normal" range.

Anomaly detection monitors provide both "Historical Context" (see how the metric behaved in the past) and a separate "Evaluation Window" that is longer than the alerting window to provide immediate context. This provides insight into what the anomalies algorithm takes into account when calculating the bounds.

{{< img src="monitors/monitor_types/anomaly/context.png" alt="historical context" responsive="true" style="width:80%;">}}

Keep in mind that `anomalies` uses the past to predict what is expected in the future, so using `anomalies` on a new metric, for which you have just started collecting data, may yield poor results.

To create an anomaly detection monitor, navigate to the [New Monitor][1] page and click **Anomaly Detection**. Then fill out the **Define the metric** section just as you would for any other monitor.

{{< img src="monitors/monitor_types/anomaly/monitor_options.png" alt="monitor options" responsive="true" style="width:80%;">}}

You should now see the form above, with a handful of parameters that help determine when to alert on anomalous behavior. If you only care about unusually high or unusually low values, choose to only alert on values above or below the bounds. The next selection determines the length of the alert window, which specifies how long a metric needs to be anomalous before an alert triggers. Beware that if the alert window is too short, you might get false alarms due to spurious noise. Finally, the recovery period specifies for how long the metric must be normal before the alert recovers.

Complete the rest of the steps in the New Monitor form (**Say what's happening**, etc) and click **Save** to create the Anomaly monitor.

### Advanced Options

Datadog automatically analyzes your chosen metric and sets several parameters for you. However, the options are available for you to edit under the advanced tab:

{{< img src="monitors/monitor_types/anomaly/advanced_options.png" alt="advanced options" responsive="true" style="width:80%;">}}

Options:

* The width of the gray band. "Deviations" is equivalent to the bounds parameter used in the anomalies function in dashboards.
* The [anomaly detection algorithm][2] used.
* The [rollup][3] interval.
* The percentage of points that need to be anomalous for alerting/warning/recovery.
* If the seasonality is set to:
    - Weekly - the algorithm expects that a given day of the week behaves like past days of the week, for example this Tuesday behaves like past Tuesdays. 
    - Daily - the algorithm expects the same time today behaves like past days, for example 5pm today behaves like 5pm yesterday.
    - Hourly - the algorithm expects the same minute after the hour behaves like past minutes after the hour, for example 5:15 behaves like 4:15, 3:15, etc.

**Note**: Machine learning algorithms require at least twice as much historical data time as the chosen seasonality time to be fully efficient.

### Anomaly Detection Algorithms

There are three different anomaly detection algorithms:

* **Basic**: Use this algorithm for metrics that have no repeating seasonal pattern.
*Basic* uses a simple lagging rolling quantile computation to determine the range of expected values, but it uses very little data and adjusts quickly to changing conditions but has no knowledge of seasonal behavior or longer trends.

* **Agile**: Use this algorithm for seasonal metrics when you want the algorithm to quickly adjust to level shifts in the metric.
*Agile* is a robust version of the [SARIMA][4] algorithm. It incorporates the immediate past into its predictions, allowing it to update quickly to level shifts at the expense of being less robust to recent, long-lasting anomalies.

* **Robust**: Use this algorithm for seasonal metrics where you expect the metric to be stable and want to consider slow level shifts as anomalies.
*Robust* is a [seasonal-trend decomposition][5] algorithm. It is very stable and its predictions remain constant even through long-lasting anomalies at the expense of taking longer to respond to intended level shifts (e.g., if the level of a metric shifts due to a code change.)

All of the seasonal algorithms may use up to a couple of months of historical data when calculating a metric's expected normal range of behavior. By using a significant amount of past data, the algorithms are able to avoid giving too much weight to abnormal behavior that might have occurred in the recent past.

The figures below illustrate how and when these three algorithms behave differently from one another. In the first figure, _basic_ successfully identifies anomalies that spike out of the normal range of values, but it does not incorporate the repeating, seasonal pattern into its predicted range of values. By contrast, _robust_ and _agile_ both recognize the seasonal pattern and can detect more nuanced anomalies (e.g., if the metric was to flatline near its minimum value).

{{< img src="monitors/monitor_types/anomaly/alg_comparison_1.png" alt="alg comparison 1" responsive="true" style="width:90%;">}}

In the next figure, the metric exhibits a sudden level shift. _Agile_ adjusts more quickly to the level shift than does _robust_. Also, the width of _robust_'s bounds increases to reflect greater uncertainty after the level shift; the width of _agile_'s bounds remains unchanged. _Basic_ is clearly a poor fit for this scenario, where the metric exhibits a strong weekly seasonal pattern.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_2.png" alt="algorithm comparison 2" responsive="true" style="width:90%;">}}

The next figure shows how the algorithms react to an hour-long anomaly. _Robust_ completely ignores this anomaly. All the other algorithms start to behave as if the anomaly is the new normal. _Agile_ even identifies the metric's return to its original level as an anomaly.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_3.png" alt="algorithm comparison 3" responsive="true" style="width:90%;">}}

The algorithms also deal with scale differently. _Basic_ and _Robust_ are scale-insensitive, while _Agile_ is not. In the graphs on the left-hand side we see both _Agile_ and _Robust_ mark the level-shift as being anomalous. On the right-hand side we add 1000 to the same metric, and _Agile_ no longer calls out the level-shift as being anomalous whereas robust continues do so.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_scale.png" alt="algorithm comparison scale" responsive="true" style="width:90%;">}}

Finally, we see how each of the algorithms handle a new metric. _Robust_ and _agile_ won't show any bounds during the first few seasons (here the seasonality is set to "weekly"). _Basic_ starts showing bounds shortly after the metric first appears.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_new_metric.png" alt="algorithm comparison new metric" responsive="true" style="width:90%;">}}

## Anomaly Monitors via the API

Enterprise-level customers can create an anomaly detection monitor via the API with the standard [create-monitor API endpoint][6] if you add the `anomalies` function to the monitor query. The query then follows this formula:

```
time_aggr(eval_window_length):anomalies(space_aggr:metric{tags}, 'basic/agile/robust', deviation_number, direction='both/above/below', alert_window='alert_window_length', interval=seconds, count_default_zero='true') >= threshold_value
```

**Note**: Anomaly detection monitors may only be used by enterprise-level customer subscriptions. If you have a pro-level customer subscription and would like to use the anomaly detection monitoring feature, reach out to your customer success representative or email the [Datadog billing team][7].

### Example

If you wanted to create an anomaly detection monitor to notify you when your average Cassandra node's CPU was three standard deviations above the ordinary value for over the last 5 minutes, you could use the following query in your API call:

```
avg(last_1h):anomalies(avg:system.cpu.system{name:cassandra}, 'basic', 3, direction='above', alert_window='last_5m', interval=20, count_default_zero='true') >= 1
```

## FAQ

###  Should I use anomaly detection for everything?

No. Anomaly detection is designed to assist with visualizing and monitoring metrics that have predictable patterns. For example, `my_site.page_views{*}` might be driven by user traffic and thus vary predictably by time of day and day of week.
If your metric does not have any sort of repeated/predictable pattern, then a simple chart overlay or threshold alert might be better than anomaly detection.

Also, anomaly detection requires historical data to make good predictions. If you have only been collecting a metric for a few hours or a few days, anomaly detection probably won't be very useful.

### Why can't I use anomaly detection over groups in the dashboard?

Looking at many separate timeseries in a single graph can lead to [spaghettification][8], and the problem gets only worse once the anomaly detection visualization is added.

{{< img src="monitors/monitor_types/anomaly/spaghetti.png" alt="spaghetti" responsive="true" style="width:80%;">}}

However, it is possible to add multiple series to a single graph one at a time. The gray envelope only shows up on mouseover.

{{< img src="monitors/monitor_types/anomaly/anomaly_multilines.png" alt="anomaly multi lines" responsive="true" style="width:80%;" >}}

### Do past anomalies affect the current predictions?

All the algorithms outside of _Basic_ use extensive amounts of historical data so that they are robust to most anomalies. In the first graph, note how the envelope stays around 400K even after the metric has dropped to 0, and how it continues to do so throughout the day.

{{< img src="monitors/monitor_types/anomaly/anomalous_history.png" alt="anomalous_history" responsive="true" style="width:80%;">}}

The second graph shows the same metric, a day later. Even though it uses the previous day in the calculation of the envelope, it is unaffected by the anomaly that occurred then.

{{< img src="monitors/monitor_types/anomaly/no_effect.png" alt="no effect" responsive="true" style="width:80%;">}}

### Why does an anomaly "disappear" when I zoom in?

At different zoom levels, the same query can result in timeseries with very different characteristics. When looking at longer time periods, each point represents the aggregate of many more-granular points. Therefore, each of these aggregate points may hide noise observed in the more granular points. For example, charts that show one week often appear smoother (less noisy) than charts that show just 10 minutes.

The width of the gray band that is drawn by Datadog's anomaly detection algorithm is, in part, based on the noisiness of the timeseries in the plot. The band must be wide enough that ordinary noise is mostly inside the band and doesn't appear as anomalous. Unfortunately, when the band is wide enough to include ordinary noise, it might also be wide enough to hide some anomalies, especially when viewing short time windows.

Here's a concrete example to illustrate. The `app.requests` metric is noisy but has a constant average value of 8. On one day, there is a 10-minute anomalous period, starting a 9:00, during which the metric has an average value of 10. The chart below shows this series in a graph with a one-day time window; each point in the graph summarizes 5 minutes.

{{< img src="monitors/monitor_types/anomaly/disappearing_day.png" alt="disappearing day" responsive="true" style="width:70%;" >}}

The gray band here makes sense; it is wide enough to capture the noise in the timeseries. Yet, it is narrow enough that the anomaly at 9:00 stands out clearly. This next chart shows a zoomed-in view of a half-hour time window that includes the 10-minute anomaly; each point in the graph summarizes 10 seconds.

{{< img src="monitors/monitor_types/anomaly/disappearing_half_hour.png" alt="disappearing half hour" responsive="true" style="width:70%;" >}}

Again, the band seems to be reasonably sized, because the non-anomalous data from 8:50 - 9:00 and from 9:10 - 9:20 is inside the band. A band any narrower would start to highlight normal data as anomalous.
Notice the band in this graph is ~8x wider than the one in the previous graph. The anomalous period from 9:00 - 9:10 looks a little different from the rest of the series, but it is not extreme enough to fall outside of the band.

In general, if an anomaly disappears when you zoom in, this doesn't mean that it's not an anomaly. It means that, while the individual points in the zoomed-in view are not anomalous in isolation, the fact that many slightly unusual points occur together is anomalous.

### Why do I get a query parsing error when trying to combine some functions with anomaly detection?

Not all functions may be nested inside of calls to the `anomalies()` function. In particular, you may not include any of the following functions in an anomaly detection monitor or dashboard query: `cumsum()`, `integral()`, `outliers()`, `piecewise_constant()`, `robust_trend()`, or `trend_line()`.

Anomaly detection uses historical data to establish a baseline for normal behavior for a series. The above-listed functions are sensitive to the placement of the query window; the value of the series at a single timestamp can change significantly based upon where it falls within the query window. This sensitivity prevents anomaly detection from determining a consistent baseline for the series.

### What happened to the `adaptive` algorithm?

We used to expose an algorithm called `adaptive` which would try to figure out a metric's inherent seasonality and adjust its predictions accordingly. Now that we automatically detect the seasonality of a metric when setting up a monitor, there is less need for this particular algorithm, which was slower and required more data than the other algorithms. Existing monitors that use the `adaptive` algorithm are untouched and continue to work.

### What is the `count_default_zero` argument?

Previously we were treating count metrics as gauges, and thus interpolating between reported points. This led to some very odd-looking metrics for sparsely reported counts. Anomalies are no longer interpolating between counts, but for legacy monitors, the old behavior is preserved using the `count_default_zero` argument.

### But what if I prefer it if my count metric were treated as a gauge?

Not interpolating between counts makes sense if the thing you are counting is something like errors. However, if you have regularly scheduled jobs that happen every hour, it might make more sense if the metric is not reporting a value of 0.0 between runs. There are two different ways to accomplish this: 1) set the rollup (found in the advanced options section) to be one hour; or 2) explicitly set `count_default_zero='false'` using the API.

### How does setting the rollup interval in "Advanced Options" differ from setting it on the query using `.rollup()`?

If the rollup is set explicitly on the query, the rollup interval option for the anomaly monitor is ignored.

### I don't care if my metric is anomalous if its value is less than X, can I somehow ignore those anomalies?

Create **A**: an anomaly monitor to alert on values above the bounds; and **B**: a separate [metric monitor][9] with a threshold alert to alert on values greater than X; and then finally a [composite monitor][10] on **A && B**.

### Why am I prevented from saving a monitor with a message like ''alert and alert recovery criteria are such that the monitor can be simultaneously in alert and alert recovery states?"

Setting different windows for the alert and alert recovery periods might lead to an ambiguous state. The alert and alert recovery window sizes should be set such that both cannot be satisfied at the same time. For example, setting an alert threshold at 50% for a 2-hour window (i.e., 1 hour has to be anomalous to trigger the alert) and the recovery threshold at 50% for a 10-minute window (i.e., 5 minutes have to be non-anomalous to recover) might result in triggering the alert and the alert recovery states simultaneously. If the last 5 minutes are not anomalous but the 1 hour before that _was_ anomalous, both the alert and the alert recovery are triggered.

### How does daylight savings affect anomaly detection monitors?  

Datadog monitors use UTC time and by default are agnostic to local time zones (e.g. EST, PST, CST). User activity is shifted relative to UTC time because activity typically remains the same for the user's local time. This could be detected as unexpected anomaly. 

Datadog allows you to configure a timezone for each anomaly detection monitor that automatically corrects for the time shift. See [How to update an anomaly detection monitor to account for local timezone][11] for instructions.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/create
[2]: #anomaly-detection-algorithms
[3]: /graphing/#aggregate-and-rollup
[4]: https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average
[5]: https://en.wikipedia.org/wiki/Decomposition_of_time_series
[6]: /api/#monitor-create
[7]: mailto:billing@datadoghq.com
[8]: https://www.datadoghq.com/blog/anti-patterns-metric-graphs-101
[9]: /monitors/monitor_types/metric
[10]: /monitors/monitor_types/composite
[11]: /monitors/faq/how-to-update-anomaly-monitor-timezone
