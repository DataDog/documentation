---
title: Anomaly Monitors
aliases:
- /monitors/faq/anomaly-monitor.md
---

### Should I use anomaly detection for everything?

No. Anomaly detection assists with visualizing and monitoring metrics that have predictable patterns. For example, `my_site.page_views{*}` is driven by user traffic and varies predictably by time of day and day of week. Therefore, it is well suited for anomaly detection.

**Note**: Anomaly detection requires historical data to make good predictions. If you have only been collecting a metric for a few hours or days, anomaly detection won't be useful.

### Why can't I use anomaly detection over groups in the dashboard?

Adding many separate timeseries in a single graph can lead to [spaghettification][1], and the problem gets worse when the anomaly detection visualization is added:

{{< img src="monitors/monitor_types/anomaly/spaghetti.png" alt="Spaghettification" style="width:80%;">}}

However, it is possible to add multiple series to a single graph one at a time. The gray band only shows up on mouseover:

{{< img src="monitors/monitor_types/anomaly/anomaly_multilines.png" alt="anomaly multi lines" style="width:80%;" >}}

### Do past anomalies affect the current predictions?

All the algorithms except `basic` use extensive amounts of historical data, so they are robust to most anomalies. In the first graph, the gray band stays around 400K even after the metric has dropped to 0.

{{< img src="monitors/monitor_types/anomaly/anomalous_history.png" alt="anomalous_history" style="width:80%;">}}

The second graph shows the same metric a day later. Even though it uses the previous day in the calculation of the band, it is unaffected by the anomaly that occurred previously.

{{< img src="monitors/monitor_types/anomaly/no_effect.png" alt="no effect" style="width:80%;">}}

### Why does an anomaly "disappear" when I zoom in?

At different zoom levels, the same query can result in timeseries with different characteristics. When looking at longer time periods, each point represents the aggregate of many more-granular points. Therefore, each of these aggregate points may hide noise observed in the more granular points. For example, charts that show one week often appear smoother (less noisy) than charts that show just 10 minutes.

The width of the gray band is key to accurate anomaly monitoring. The band must be wide enough that ordinary noise is mostly inside the band and doesn't appear as anomalous. Unfortunately, when the band is wide enough to include ordinary noise, it might also be wide enough to hide some anomalies, especially when viewing short time windows.

For example, the metric `app.requests` is noisy but has a constant average value of 8. On one day, there is a 10-minute anomalous period, starting a 9:00, during which the metric has an average value of 10. The graph below shows a series with a one-day time window; each point in the graph summarizes 5 minutes.

{{< img src="monitors/monitor_types/anomaly/disappearing_day.png" alt="disappearing day" style="width:70%;" >}}

The gray band here makes sense. It is wide enough to capture the noise in the timeseries, yet narrow enough that the anomaly at 9:00 stands out clearly. The next chart shows a zoomed-in view of a half-hour time window that includes the 10-minute anomaly; each point in the graph summarizes 10 seconds.

{{< img src="monitors/monitor_types/anomaly/disappearing_half_hour.png" alt="disappearing half hour" style="width:70%;" >}}

Again, the band seems to be reasonably sized, because the non-anomalous data from 8:50 - 9:00 and from 9:10 - 9:20 is inside the band. A band any narrower would start to highlight normal data as anomalous. Notice the band in this graph is ~8x wider than the one in the previous graph. The anomalous period from 9:00 - 9:10 looks different from the rest of the series, but it is not extreme enough to fall outside of the band.

In general, if an anomaly disappears when you zoom in, this doesn't mean that it's not an anomaly. It means, while the individual points in the zoomed-in view are not anomalous in isolation, many slightly unusual points occurring together is anomalous.

### Why do I get a query parsing error when trying to combine some functions with anomaly detection?

Not all functions may be nested inside of calls to the `anomalies()` function. In particular, you may not include any of the following functions in an anomaly detection monitor or dashboard query: `cumsum()`, `integral()`, `outliers()`, `piecewise_constant()`, `robust_trend()`, or `trend_line()`.

Anomaly detection uses historical data to establish a baseline of normal behavior for a series. The functions above are sensitive to the placement of the query window. The value of the series at a single timestamp can change significantly based upon where it falls within the query window. This sensitivity prevents anomaly detection from determining a consistent baseline for the series.

### What happened to the adaptive algorithm?

Datadog has evolved our algorithms to no longer use the adaptive algorithm. Existing monitors that use the `adaptive` algorithm are untouched and continue to work.

### What is the count_default_zero argument?

Previously, Datadog treated count metrics as gauges, and thus interpolated between reported points. Anomalies are no longer interpolating between counts, but for legacy monitors, the old behavior is preserved using the `count_default_zero` argument.

### What if I want my count metric treated as a gauge?

Not interpolating between counts makes sense if your count metric is something like errors. However, if you have regularly scheduled jobs that happen every hour, it might make more sense if the metric is not reporting a value of 0.0 between runs. There are two different ways to accomplish this:

1. Set the rollup (found in the advanced options section) to be one hour.
2. Explicitly set `count_default_zero='false'` using the API.

### How does setting the rollup interval in "Advanced Options" differ from setting it on the query using .rollup()?

If the rollup is set explicitly on the query, the rollup interval option for the anomaly monitor is ignored.

### I don't care if my metric is anomalous if its value is less than X, can I somehow ignore those anomalies?

Create **A**: an anomaly monitor to alert on values above the bounds; and **B**: a separate [metric monitor][2] with a threshold alert to trigger on values greater than X. Then create a [composite monitor][3] on **A && B**.

### Why am I prevented from saving a monitor with the message "alert and alert recovery criteria are such that the monitor can be simultaneously in alert and alert recovery states"?

Setting different windows for the alert and alert recovery periods might lead to an ambiguous state. The alert and alert recovery window sizes should be set such that both cannot be satisfied at the same time. For example, setting an alert threshold at 50% for a 2-hour window (as in, 1 hour has to be anomalous to trigger the alert) and the [recovery threshold][4] at 50% for a 10-minute window (as in, 5 minutes have to be non-anomalous to recover) might result in triggering the alert and the alert recovery states simultaneously. If the last 5 minutes are not anomalous but the 1 hour before _was_ anomalous, both the alert and the alert recovery are triggered.

### How does daylight savings affect anomaly detection monitors?

Datadog monitors use UTC time and by default are agnostic to local time zones. User activity is shifted relative to UTC time because activity typically remains the same for the user's local time. This could be detected as an unexpected anomaly. 

Datadog allows you to configure a timezone for each anomaly detection monitor that automatically corrects for the time shift. For more details, see [How to update an anomaly detection monitor to account for local timezone][5].

[1]: https://www.datadoghq.com/blog/anti-patterns-metric-graphs-101
[2]: /monitors/types/metric/
[3]: /monitors/types/composite/
[4]: /monitors/guide/recovery-thresholds/
[5]: /monitors/guide/how-to-update-anomaly-monitor-timezone/
