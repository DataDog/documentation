---
title: Anomaly monitor
kind: documentation
autotocdepth: 3
customnav: monitortypenav
aliases:
    - /guides/anomalies
description: "Detects anomalous behaviour for a metric based on historical data"
further_reading:
- link: "/monitors/notifications"
  tag: "Documentation"
  text: Configure your monitor notifications
- link: "/monitors/downtimes"
  tag: "Documentation"
  text: Schedule a dowtime to mute a monitor
- link: "/monitors/faq"
  tag: "FAQ"
  text: Monitors FAQ
---

Anomaly detection is an algorithmic feature that allows you to identify when a metric is behaving differently than it has in the past, taking into account trends, seasonal day-of-week and time-of-day patterns. It is well-suited for metrics with strong trends and recurring patterns that are hard or impossible to monitor with threshold-based alerting.

For example, anomaly detection can help you discover when your web traffic is unusually low on a weekday afternoon&mdash;even though that same level of traffic would be perfectly normal later in the evening. Or consider a metric measuring the number of logins to your steadily-growing site. As the number is increasing every day, any threshold would be quickly outdated, whereas anomaly detection can quickly alert you if there is an unexpected drop&mdash;potentially indicating an issue with the login system.

## How to Use Anomaly Detection on Your Data

There is an `anomalies` function in the Datadog query language. When you apply this function to a series, it returns the usual results along with an expected "normal" range.

Keep in mind that `anomalies` uses the past to predict what is expected in the future, so using `anomalies` on a new metric, for which you have just started collecting data, may yield poor results.

When selecting your alert time range, smaller window sizes leads to faster alerts, however, with very small windows (<= 10 minutes), metrics often appear noisy, making it difficult to visualize the difference between anomalies and noise.

**Note**: Setting the window size to X minutes doesn't require an anomaly to last X minutes before an alert is triggered. Tune the threshold to control how long an anomaly must last to trigger an alert.  

For example, with the window size sets to 30 minutes, you can get alerted when an anomaly lasts for just five minutes by setting the threshold to 5/30 = 17%. That said, we have found that anomaly alerts are most reliable when the window size is between 15 minutes and an hour and the threshold is on the higher side (> 40%).

### Visualize Anomalies in Dashboards

The chart below shows a dashboard chart that uses anomaly detection. The gray band represents the region where the metric is expected to be based on past behavior. The blue and red line is the actual observed value of the metric; the line is blue when within the expected range and red when it is outside of the expected range.

**Note:** The resolution at which you view the metric is the resolution that `anomalies` uses to calculate the band. If you would like to keep the resolution constant while zooming in and out, use the `rollup()` function. See the FAQ for more details.

{{< img src="monitors/monitor_types/anomaly/dashboard_graph.png" alt="dashboard graph" responsive="true" popup="true">}}

To create an anomaly detection graph, start by adding a timeseries graph to your dashboard. As shown below, be sure to select "Timeseries" as the visualization type.

{{< img src="monitors/monitor_types/anomaly/initial_editor.png" alt="initial editor" responsive="true" popup="true">}}

Now, click on the + icon (Add functions and modifiers) on the right side of your expression. Choose the “Anomalies” function in the "Algorithms" submenu:

{{< img src="monitors/monitor_types/anomaly/function_menu.png" alt="function menu" responsive="true" popup="true">}}

This adds anomaly detection to your expression, and you should immediately see the preview update to include the gray band. A number of the graphing options disappear, as anomaly detection has a unique visualization.

The function has two parameters. The first parameter is for selecting which algorithm is used. The second parameter is labeled `bounds`, and you can tune this to change the width of the Grey band. You may think of `bounds` like standard deviations; a value of 2 or 3 should be large enough to include most "normal" points. After successfully adding `anomalies`, your editor should show something like this:

{{< img src="monitors/monitor_types/anomaly/final_editor.png" alt="final editor" responsive="true" popup="true">}}

### Alert on Anomalies

In addition to viewing anomalies in dashboards, you may create monitors that trigger when metrics behave anomalously.

Navigate to the [New Monitor](https://app.datadoghq.com/monitors#/create) page and click **Anomaly Detection**. Then fill out the **Define the metric** section just as you would for any other monitor.

{{< img src="monitors/monitor_types/anomaly/monitor_options.png" alt="monitor options" responsive="true" popup="true">}}

You should now see something like what's shown above, with a handful of selections that help determine how sensitive your monitor is to different types of anomalies.

1.  This number is equivalent to the `bounds` parameter used in the `anomalies` function in dashboards; it controls the width of the gray band. We recommend using a value of 2 or 3.
2.  If you only care about unusually high or unusually low values, you can choose to only alert on values above or below the bounds.
3.  We recommend using a window size of at least 15 minutes. (A 30 minute window works well in most cases.)
4.  [Change the anomaly detection algorithm used](/#anomaly-detetion-algorithms).

Complete all steps in the New Monitor form (**Say what's happening**, etc) and click **Save** to create the Anomaly monitor.

Both the Monitor Edit page and the Monitor Status pages provide "Historical Context" so that you can see how the metric behaved in the past. This should provide some insight into what the anomalies algorithm takes into account when calculating the bounds.

### Anomaly Detection Algorithms

There are four different anomaly detection algorithms:

* _Basic_: Use this algorithm for metrics that have no repeating seasonal pattern. _Basic_ uses a simple lagging rolling quantile computation to determine the range of expected values, but it uses very little data and adjusts quickly to changing conditions but has no knowledge of seasonal behavior or longer trends.

* _Agile_: Use this algorithm for seasonal metrics when you want the algorithm to quickly adjust to level shifts in the metric. _Agile_ is a robust version of the [SARIMA](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average) algorithm. It incorporates the immediate past into its predictions, allowing it to update quickly to level shifts at the expense of being less robust to recent, long-lasting anomalies.

* _Robust_: Use this algorithm for seasonal metrics where you expect the metric to be stable and want to consider slow level shifts as anomalies. _Robust_ is a [seasonal-trend decomposition](https://en.wikipedia.org/wiki/Decomposition_of_time_series) algorithm. It is very stable and its predictions remain constant even through long-lasting anomalies at the expense of taking longer to respond to intended level shifts (e.g., if the level of a metric shifts due to a code change.)

* _Adaptive_: Use this algorithm for seasonal metrics when you find _agile_ and _robust_ to be too sensitive to minor changes in the metrics behavior. This algorithm is dynamic and adjusts its predictions to a metric's changes much more readily than _agile_ or _robust_. On the other hand, it can be prone to following a metric too closely, which could lead to false negatives.

All of the seasonal algorithms may use up to a couple of months of historical data when calculating a metric's expected normal range of behavior. By using a significant amount of past data, the algorithms are able to avoid giving too much weight to abnormal behavior that might have occurred in the recent past.

The figures below illustrate how and when these four algorithms behave differently from one another. In the first figure, _basic_ successfully identifies anomalies that spike out of the normal range of values, but it does not incorporate the repeating, seasonal pattern into its predicted range of values. By contrast, _robust_, _agile_, and _adaptive_ all recognize the seasonal pattern and can detect more nuanced anomalies (e.g., if the metric was to flatline near its minimum value).

{{< img src="monitors/monitor_types/anomaly/alg_comparison_1.png" alt="alg comparision 1" responsive="true" popup="true">}}

In the next figure, the metric exhibits a sudden level shift. _Agile_ and _adaptive_ adjust more quickly to the level shift than does _robust_. Also, the width of _robust_'s bounds increases to reflect greater uncertainty after the level shift; the width of _agile_ and _adaptive_ bounds remains unchanged. _Basic_ is clearly a poor fit for this scenario, where the metric exhibits a strong weekly seasonal pattern.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_2.png" alt="algorithm comparison 2" responsive="true" popup="true">}}

The next figure shows how the algorithms react to an hour-long anomaly. _Robust_ completely ignores this anomaly. All the other algorithms start to behave as if the anomaly is the new normal. _Agile_ and _adaptive_ even identify the metric's return to its original level as an anomaly.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_3.png" alt="algorithm comparison 3" responsive="true" popup="true">}}

The algorithms also deal with scale differently. _Basic_ and _Robust_ are scale-insensitive, while _Agile_ and _Adaptive_ are not. In the graphs on the left-hand side we see both _Agile_ and _Robust_ mark the level-shift as being anomalous. On the right-hand side we add 1000 to the same metric, and _Agile_ no longer calls out the level-shift as being anomalous whereas robust continues do so.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_scale.png" alt="algorithm comparison scale" responsive="true" popup="true">}}

Finally, we see how each of the algorithms handle a new metric. _Robust_ and _agile_ won't show any bounds during the first few weeks. _Basic_ and _adaptive_ start showing bounds shortly after the metric first appears. _Adaptive_ leverages the metric's daily seasonal patterns in its predictions, while _basic_ simply reflects the range of recent values.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_new_metric.png" alt="algorithm comparison new metric" responsive="true" popup="true">}}

## Anomaly Monitors via the API

If you are an enterprise-level customer, create an anomaly detection monitor via the API with the standard [create-monitor API endpoint](/api/#monitor-create) if you add the `anomalies` function to the monitor query. The query then follows this formula:
```
time_aggr(time_window):anomalies(space_aggr:metric{tags}, 'algorithm_used', deviation_number, direction='both/above/below') >= threshold_value
```

Acceptable algorithm values are basic, agile, robust, or adaptive.

**Note**: that anomaly detection monitors may only be used by enterprise-level customer subscriptions. If you have a pro-level customer subscription and would like to use the anomaly detection monitoring feature, you can reach out to your customer success representative or [email our billing team](mailto:billing@datadoghq.com) to discuss that further. 

### Example

If you wanted to create an anomaly detection monitor to notify you when your average Cassandra node's CPU was three standard deviations above the ordinary value for 80% of the time over the last 5 minutes, you could use the following query in your API call:

```
avg(last_5m):anomalies(avg:system.cpu.system{name:cassandra}, 'basic', 3, direction='above') >= 0.8
```

## FAQ

###  Should I use anomaly detection for everything?

No. Anomaly detection is designed to assist with visualizing and monitoring metrics that have predictable patterns. For example, `my_site.page_views{*}` might be driven by user traffic and thus vary predictably by time of day and day of week.  
If your metric does not have any sort of repeated/predictable pattern, then a simple chart overlay or threshold alert might be better than anomaly detection.

Also, anomaly detection requires historical data to make good predictions. If you have only been collecting a metric for a few hours or a few days, anomaly detection probably won't be very useful.

### Why can't I use anomaly detection over groups in the dashboard?

Looking at many separate timeseries in a single graph can lead to [spaghettification](https://www.datadoghq.com/blog/anti-patterns-metric-graphs-101/), and the problem gets only worse once the anomaly detection visualization is added in.

{{< img src="monitors/monitor_types/anomaly/spaghetti.png" alt="spaghetti" responsive="true" popup="true" >}}

You can, however, add multiple series in a single graph one at a time. The gray envelope only shows up on mouseover.

{{< img src="monitors/monitor_types/anomaly/anomaly_multilines.png" alt="anomaly multi lines" responsive="true" popup="true" >}}

### Does past anomalies affect the current predictions?

All the algorithms outside of _Basic_ use extensive amounts of historical data so that they are robust to most anomalies. In the first graph, note how the envelope stays around 400K even after the metric has dropped to 0, and how it continues to do so throughout the day.

{{< img src="monitors/monitor_types/anomaly/anomalous_history.png" alt="anomalous_history" responsive="true" popup="true" >}}

The second graph shows the same metric, a day later. Even though it uses the previous day in the calculation of the envelope, it is unaffected by the anomaly that occurred then.

{{< img src="monitors/monitor_types/anomaly/no_effect.png" alt="no effect" responsive="true" popup="true" >}}

### Does past anomalies affect the current predictions?

All the algorithms outside of _Basic_ use extensive amounts of historical data so that they are robust to most anomalies. In the first graph, note how the envelope stays around 400K even after the metric has dropped to 0, and how it continues to do so throughout the day.

{{< img src="monitors/monitor_types/anomaly/anomalous_history.png" alt="anomalous_history" responsive="true" popup="true" >}}

The second graph shows the same metric, a day later. Even though it uses the previous day in the calculation of the envelope, it is unaffected by the anomaly that occurred then.

{{< img src="monitors/monitor_types/anomaly/no_effect.png" alt="no effect" responsive="true" popup="true" >}}

### Why does an anomaly "disappear" when I zoom in?

At different zoom levels, the same query can result in time series with very different characteristics. When looking at longer time periods, each point represents the aggregate of many more-granular points. Therefore, each of these aggregate points may hide noise observed in the more granular points. For example, charts that show one week often appear smoother (less noisy) than charts that show just 10 minutes.

The width of the gray band that is drawn by our [anomaly detection algorithm](/monitors/monitor_types/anomaly) is, in part, based on the noisiness of the time series in the plot. The band must be wide enough that ordinary noise is mostly inside the band and doesn't appear as anomalous. Unfortunately, when the band is wide enough to include ordinary noise, it might also be wide enough to hide some anomalies, especially when viewing short time windows.

Here's a concrete example to illustrate. The `app.requests` metric is noisy but has a constant average value of 8. On one day, there is a 10-minute anomalous period, starting a 9:00, during which the metric has an average value of 10. The chart below shows this series in a graph with a one-day time window; each point in the graph summarizes 5 minutes.

{{< img src="monitors/monitor_types/anomaly/disappearing_day.png" alt="disappearing day" responsive="true" popup="true" >}}

The gray band here makes sense; it is wide enough to capture the noise in the time series. Yet, it is narrow enough that the anomaly at 9:00 stands out clearly. This next chart shows a zoomed-in view of a half-hour time window that includes the 10-minute anomaly; each point in the graph summarizes 10 seconds.

{{< img src="monitors/monitor_types/anomaly/disappearing_half_hour.png" alt="disappearing half hour" responsive="true" popup="true" >}}

Again, the band seems to be reasonably sized, because the non-anomalous data from 8:50 - 9:00 and from 9:10 - 9:20 is inside the band. A band any narrower would start to highlight normal data as anomalous.  
Notice the band in this graph is ~8x wider than the one in the previous graph. The anomalous period from 9:00 - 9:10 looks a little different from the rest of the series, but it is not extreme enough to fall outside of the band.

In general, if an anomaly disappears when you zoom in, this doesn't mean that it's not an anomaly. It means that, while the individual points in the zoomed-in view are not anomalous in isolation, the fact that many slightly unusual points occur together is anomalous.

### Is it possible to capture anomalies that occur within the bounds?

If the reason [anomalies](/monitors/monitor_types/anomaly) are occurring within the bounds is that the volatility of a metric leads to wide bounds that mask true anomalies (as described in the FAQ above), you may be able apply functions to the series to reduce its volatility, leading to narrower bounds and better anomaly detection.

For example, many important metrics (e.g., `successful.logins`, `checkouts.completed`, etc.) represent the success of some user-driven action. It can be useful to monitor for anomalous drops in one of those metrics, as this may be an indication that something is preventing successful completion of these events and that the user experience is suffering.

It's common that these metrics have points that are at or near zero, especially when viewing the metric over a short window of time. Unfortunately, this results in the bounds of the anomaly detection forecast include zero, making it impossible to detect anomalous drops in the metric. An example is shown below.

{{< img src="monitors/monitor_types/anomaly/raw_profile_updates.png" alt="raw profile updates" responsive="true" popup="true" >}}

#### How can we work around this problem?

One approach is to add a `rollup()` to force the use of a larger interval. `rollup()` takes as an argument the number of seconds that should be aggregated into a single point on the graph. For example, applying `rollup(120)` leads to a series with one point every two minutes. With larger intervals, zeros become rare and can correctly be categorized as anomalies. Here's the same series as above but with a 2-minute rollup applied.

{{< img src="monitors/monitor_types/anomaly/rollup_profile_updates.png" alt="rollup profile updates" responsive="true" popup="true">}}

Another option is to apply the `ewma()` [function](/graphing/miscellaneous/functions) to take a moving average. Like with rollups, this function smooths away intermittent zeros so that drops in the metric can correctly be identified as anomalies.

{{< img src="monitors/monitor_types/anomaly/ewma_profile_updates.png" alt="Ewma profile updates" responsive="true" popup="true" >}}

### Why do I get a query parsing error when trying to combine some functions with anomaly detection?

Not all functions may be nested inside of calls to the `anomalies()` function. In particular, you may not include any of the following functions in an anomaly detection monitor or dashboard query: `cumsum()`, `integral()`, `outliers()`, `piecewise_constant()`, `robust_trend()`, or `trend_line()`.

Anomaly detection uses historical data to establish a baseline for normal behavior for a series. The above-listed functions are sensitive to the placement of the query window; the value of the series at a single timestamp can change significantly based upon where it falls within the query window. This sensitivity prevents anomaly detection from determining a consistent baseline for the series.

## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}
