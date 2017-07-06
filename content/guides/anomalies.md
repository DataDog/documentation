---
title: Anomaly Detection
kind: guide
listorder: 16
beta: false
---


Anomaly detection is an algorithmic feature that allows you to identify when a metric is behaving differently than it has in the past, taking into account trends, seasonal day-of-week and time-of-day patterns. It is well-suited for metrics with strong trends and recurring patterns that are hard or impossible to monitor with threshold-based alerting.

For example, anomaly detection can help you discover when your web traffic is unusually low on a weekday afternoon&mdash;even though that same level of traffic would be perfectly normal later in the evening. Or consider a metric measuring the number of logins to your steadily-growing site. As the number is increasing every day, any threshold would be quickly outdated, whereas anomaly detection can quickly alert you if there is an unexpected drop&mdash;potentially indicating an issue with the login system.

## How to Use Anomaly Detection on Your Data

We've added a new query function called `anomalies` to our query language. When you apply this function to series, it returns the usual results along with an expected "normal" range.

Keep in mind that `anomalies` uses the past to predict what is expected in the future, so using `anomalies` on a new metric, for which you have just started collecting data, may yield poor results.

### 1. Visualize Anomalies in Dashboards
{: #dashboards}

The chart below shows a dashboard chart that uses anomaly detection. The gray band represents the region where the metric is expected to be based on past behavior. The blue and red line is the actual observed value of the metric; the line is blue when within the expected range and red when it is outside of the expected range.

**Please Note:** The resolution at which you view the metric is the resolution that `anomalies` uses to calculate the band. If you would like to keep the resolution constant while zooming in and out, use the `rollup()` function. See the FAQ for more details.

<img src="/static/images/anomalies/dashboard_graph.png" style="width:100%; border:1px solid #777777"/>

To create an anomaly detection graph, start by adding a timeseries graph to your dashboard. As shown below, be sure to select "Timeseries" as the visualization type.

<img src="/static/images/anomalies/initial_editor.png" style="width:100%; border:1px solid #777777"/>

Now, click on the + icon (Add functions and modifiers) on the right side of your expression. Choose the “Anomalies” function in the "Algorithms" submenu:

<img src="/static/images/anomalies/function_menu.png" style="width:500px; border:1px solid #777777"/>

This will add anomaly detection to your expression, and you should immediately see the preview update to include the gray band. A number of the graphing options will disappear, as anomaly detection has a unique visualization.

The function has two parameters. The first parameter is for selecting which algorithm will be used. The second parameter is labeled `bounds`, and you can tune this to change the width of the grey band. You may think of `bounds` like standard deviations; a value of 2 or 3 should be large enough to include most "normal" points. After successfully adding `anomalies`, your editor should show something like this:

<img src="/static/images/anomalies/final_editor.png" style="width:100%; border:1px solid #777777"/>

### 2. Alert on Anomalies
{: #alerts}

In addition to viewing anomalies in dashboards, you may create monitors that trigger when metrics behave anomalously.

Start by navigating to the [New Monitor](https://app.datadoghq.com/monitors#/create) page and selecting Metric. Define the metric in step (1) just like you would for any other metric alert. In step (2), select "Anomaly Alert".

<img src="/static/images/anomalies/monitor_options.png" style="width:100%; border:1px solid #777777"/>

You should now see something like what's shown above, with a handful of selections that will help determine how sensitive your monitor is to different types of anomalies.

<ol type="a">
  <li>This number is equivalent to the <code>bounds</code> parameter used in the <code>anomalies</code> function in dashboards; it controls the width of the gray band. We recommend using a value of 2 or 3.</li>
  <li>If you only care about unusually high or unusually low values, you can choose to only alert on values above or below the bounds.</li>
  <li>We recommend using a window size of at least 15 minutes. (A 30 minute window works well in most cases.) </li>
  <li>You can change the anomaly detection algorithm used here. See the next section of this guide for tips on how to choose the best algorithm for your use case.</li>
</ol>

Continue with steps (3) and (4) as you would for any other monitor.

### 3. Anomaly Detection Algorithms

We currently offer four different anomaly detection algorithms.

* _Basic_: Use this algorithm for metrics that have no repeating seasonal pattern. _Basic_ uses a simple lagging rolling quantile computation to determine the range of expected values, but it uses very little data and adjusts quickly to changing conditions but has no knowledge of seasonal behavior or longer trends.

* _Agile_: Use this algorithm for seasonal metrics when you want the algorithm to quickly adjust to level shifts in the metric. _Agile_ is a robust version of the [SARIMA](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average) algorithm. It incorporates the immediate past into its predictions, allowing it to update quickly to level shifts at the expense of being less robust to recent, long-lasting anomalies.

* _Robust_: Use this algorithm for seasonal metrics where you expect the metric to be stable and want to consider slow level shifts as anomalies. _Robust_ is a [seasonal-trend decomposition](https://en.wikipedia.org/wiki/Decomposition_of_time_series) algorithm. It is very stable and its predictions remain constant even through long-lasting anomalies at the expense of taking longer to respond to intended level shifts (e.g., if the level of a metric shifts due to a code change.)

* _Adaptive_: Use this algorithm for seasonal metrics when you find _agile_ and _robust_ to be too sensitive to minor changes in the metrics behavior. This algorithm is dynamic and will adjust its predictions to a metric's changes much more readily than _agile_ or _robust_. On the other hand, it can be prone to following a metric too closely, which could lead to false negatives.

All of the seasonal algorithms may use up to a couple of months of historical data when calculating a metric's expected normal range of behavior. By using a significant amount of past data, the algorithms are able to avoid giving too much weight to abnormal behavior that might have occurred in the recent past.

The figures below illustrate how and when these four algorithms behave differently from one another. In the first figure, _basic_ will successfully identify anomalies that spike out of the normal range of values, but it does not incorporate the repeating, seasonal pattern into its predicted range of values. By contrast, _robust_, _agile_, and _adaptive_ all recognize the seasonal pattern and can detect more nuanced anomalies (e.g., if the metric was to flatline near its minimum value).

<img src="/static/images/anomalies/alg_comparison_1.png" style="width:100%; border:1px solid #777777"/>

In the next figure, the metric exhibits a sudden level shift. _Agile_ and _adaptive_ adjust more quickly to the level shift than does _robust_. Also, the width of _robust_'s bounds increases to reflect greater uncertaintly after the level shift; the width of _agile_ and _adaptive_ bounds remains unchanged. _Basic_ is clearly a poor fit for this scenario, where the metric exhibits a strong weekly seasonal pattern.

<img src="/static/images/anomalies/alg_comparison_2.png" style="width:100%; border:1px solid #777777"/>

The next figure shows how the algorithms react to an hour-long anomaly. _Robust_ completely ignores this anomaly. All the other algorithms start to behave as if the anomaly is the new normal. _Agile_ and _adaptive_ even identify the metric's return to its original level as an anomaly.

<img src="/static/images/anomalies/alg_comparison_3.png" style="width:100%; border:1px solid #777777"/>

The algorithms also deal with scale differently. _Basic_ and _Robust_ are scale-insensitive, while _Agile_ and _Adaptive_ are not. In the graphs on the left-hand side we see both _Agile_ and _Robust_ mark the level-shift as being anomalous. On the right-hand side we add 1000 to the same metric, and _Agile_ no longer calls out the level-shift as being anomalous whereas robust continues do so.

<img src="/static/images/anomalies/alg_comparison_scale.png" style="width:100%; border:1px solid #777777"/>

Finally, we see how each of the algorithms handle a new metric. _Robust_ and _agile_ won't show any bounds during the first few weeks. _Basic_ and _adaptive_ will start showing bounds shortly after the metric first appears. _Adaptive_ will leverage the metric's daily seasonal patterns in its predictions, while _basic_ simply reflects the range of recent values.

<img src="/static/images/anomalies/alg_comparison_new_metric.png" style="width:100%; border:1px solid #777777"/>


## Frequently Asked Questions

### Should I use anomaly detection for everything?

No. Anomaly detection is designed to assist with visualizing and monitoring metrics that have predictable patterns. For example, `my_site.page_views{*}` might be driven by user traffic and thus vary predictably by time of day and day of week. If your metric does not have any sort of repeated/predictable pattern, then a simple chart overlay or threshold alert might be better than anomaly detection.

Also, anomaly detection requires historical data to make good predictions. If you have only been collecting a metric for a few hours or a few days, anomaly detection probably won't be very useful.

Take care when creating multi-alerts. A metric such as `service.requests_served{*}` could be a good candidate for anomaly detection, but `service.requests_served{*} by {host}`is probably not. If your hosts are load-balanced, then an [outlier monitor](https://docs.datadoghq.com/guides/outliers/) will be better for detecting hosts that are behaving abnormally. If your service scales up, each new host won’t be monitored at all until there is a minimum amount of history for anomaly detection to kick in, and even then alerts might be noisy due to instability in the number of requests handled by those hosts.

### Why can't I use anomaly detection over groups in the dashboard?

Looking at many separate timeseries in a single graph can lead to [spaghettification](https://www.datadoghq.com/blog/anti-patterns-metric-graphs-101/), and the problem gets only worse once the anomaly detection visualization is added in.

<img src="/static/images/anomalies/spaghetti.png" style="width:500px; border:1px solid #777777"/>

You can, however, add multiple series in a single graph one at a time. The gray envelope will only show up on mouseover.

<img src="/static/images/anomalies/anomaly_multilines.png" style="width:500px; border:1px solid #777777"/>

### Will past anomalies affect the current predictions?

All the algorithms outside of _Basic_ use extensive amounts of historical data so that they are robust to most anomalies. In the first graph, note how the envelope stays around 400K even after the metric has dropped to 0, and how it continues to do so throughout the day.

<img src="/static/images/anomalies/anomalous_history.png" style="width:500px; border:1px solid #777777"/>

The second graph shows the same metric, a day later. Even though it uses the previous day in the calculation of the envelope, it is unaffected by the anomaly that occurred then.

<img src="/static/images/anomalies/no_effect.png" style="width:500px; border:1px solid #777777"/>

### How should I set the window size and alert threshold?

Smaller window sizes will lead to faster alerts, however, with very small windows (<= 10 minutes), metrics often appear noisy, making it difficult to visualize the difference between anomalies and noise.

Note that setting the window size to X minutes doesn't require an anomaly to last X minutes before an alert is triggered. You can tune the threshold to control how long an anomaly must last to trigger an alert. For example, with the window size set to 30 minutes, you can get alerted when an anomaly lasts for just five minutes by setting the threshold to 5/30 = 17%. That said, we have found that anomaly alerts are most reliable when the window size is between 15 minutes and an hour and the threshold is on the higher side (> 40%).

### Why does `anomalies` not add a gray prediction band in the dashboard? / Why am I getting "No Data" for an Anomaly Alert? / How much history do the algorithms require?

All the algorithms besides _Basic_ require historical data before they can start making predictions. If your metric has only started reporting data for a short while, then _Agile_ and _Robust_ won't try to make any predictions until it has at least two weeks of history. _Adaptive_ will start working after it has at least two hours worth of history.

### Why does an anomaly "disappear" when I zoom in?

At different zoom levels, the same query can result in time series with very different characteristics. When looking at longer time periods, each point represents the aggregate of many more-granular points. Therefore, each of these aggregate points may hide noise observed in the more granular points. For example, charts that show one week often appear smoother (less noisy) than charts that show just 10 minutes.

The width of the gray band that is drawn by our anomaly detection algorithm is, in part, based on the noisiness of the time series in the plot. The band must be wide enough that ordinary noise is mostly inside the band and doesn't appear as anomalous. Unfortunately, when the band is wide enough to include ordinary noise, it might also be wide enough to hide some anomalies, especially when viewing short time windows.

Here's a concrete example to illustrate. The `app.requests` metric is noisy but has a constant average value of 8. On one day, there is a 10-minute anomalous period, starting a 9:00, during which the metric has an average value of 10. The chart below shows this series in a graph with a one-day time window; each point in the graph summarizes 5 minutes.

<img src="/static/images/anomalies/disappearing_day.png" style="width:500px; border:1px solid #777777"/>

The gray band here makes sense; it is wide enough to capture the noise in the time series. Yet, it is narrow enough that the anomaly at 9:00 stands out clearly. This next chart shows a zoomed-in view of a half-hour time window that includes the 10-minute anomaly; each point in the graph summarizes 10 seconds.

<img src="/static/images/anomalies/disappearing_half_hour.png" style="width:500px; border:1px solid #777777"/>

Again, the band seems to be reasonably sized, because the non-anomalous data from 8:50 - 9:00 and from 9:10 - 9:20 is inside the band. A band any narrower would start to highlight normal data as anomalous. Notice the band in this graph is ~8x wider than the one in the previous graph. The anomalous period from 9:00 - 9:10 looks a little different from the rest of the series, but it is not extreme enough to fall outside of the band.

In general, if an anomaly disappears when you zoom in, this doesn't mean that it's not an anomaly. It means that, while the individual points in the zoomed-in view are not anomalous in isolation, the fact that many slightly unusual points occur together is anomalous.

### Is it possible to capture anomalies that occur within the bounds?

If the reason anomalies are occurring within the bounds is that the volatility of a metric leads to wide bounds that mask true anomalies (as described in the FAQ above), you may be able apply functions to the series to reduce its volatility, leading to narrower bounds and better anomaly detection.

For example, many important metrics (e.g., `successful.logins`, `checkouts.completed`, etc.) represent the success of some user-driven action. It can be useful to monitor for anomalous drops in one of those metrics, as this may be an indication that something is preventing successful completion of these events and that the user experience is suffering.

It's common that these metrics have points that are at or near zero, especially when viewing the metric over a short window of time. Unfortunately, this results in the bounds of the anomaly detection forecast include zero, making it impossible to detect anomalous drops in the metric. An example is shown below.

<img src="/static/images/anomalies/raw_profile_updates.png" style="width:500px; border:1px solid #777777"/>

How can we work around this problem? One approach is to add a `rollup()` to force the use of a larger interval. `rollup()` takes as an argument the number of seconds that should be aggregated into a single point on the graph. For example, applying `rollup(120)` will lead to a series with one point every two minutes. With larger intervals, zeros become rare and can correctly be categorized as anomalies. Here's the same series as above but with a 2-minute rollup applied.

<img src="/static/images/anomalies/rollup_profile_updates.png" style="width:500px; border:1px solid #777777"/>

Another option is to apply the `ewma()` function to take a moving average. Like with rollups, this function will smooth away intermittent zeros so that drops in the metric can correctly be identified as anomalies.

<img src="/static/images/anomalies/ewma_profile_updates.png" style="width:500px; border:1px solid #777777"/>
