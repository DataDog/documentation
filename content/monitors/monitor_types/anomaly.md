---
title: Anomaly monitor
kind: documentation
autotocdepth: 3
customnav: monitortypenav
aliases:
    - /guides/anomalies
description: "Detects anomalous behaviour for a metric based on historical data"
---

Anomaly detection is an algorithmic feature that allows you to identify when a metric is behaving differently than it has in the past, taking into account trends, seasonal day-of-week and time-of-day patterns. It is well-suited for metrics with strong trends and recurring patterns that are hard or impossible to monitor with threshold-based alerting.

For example, anomaly detection can help you discover when your web traffic is unusually low on a weekday afternoon&mdash;even though that same level of traffic would be perfectly normal later in the evening. Or consider a metric measuring the number of logins to your steadily-growing site. As the number is increasing every day, any threshold would be quickly outdated, whereas anomaly detection can quickly alert you if there is an unexpected drop&mdash;potentially indicating an issue with the login system.

## How to Use Anomaly Detection on Your Data

We've added a new query function called `anomalies` to our query language. When you apply this function to series, it returns the usual results along with an expected "normal" range.

Keep in mind that `anomalies` uses the past to predict what is expected in the future, so using `anomalies` on a new metric, for which you have just started collecting data, may yield poor results.

### Visualize Anomalies in Dashboards


The chart below shows a dashboard chart that uses anomaly detection. The gray band represents the region where the metric is expected to be based on past behavior. The blue and red line is the actual observed value of the metric; the line is blue when within the expected range and red when it is outside of the expected range.

**Please Note:** The resolution at which you view the metric is the resolution that `anomalies` uses to calculate the band. If you would like to keep the resolution constant while zooming in and out, use the `rollup()` function. See the FAQ for more details.

{{< img src="monitors/monitor_types/anomaly/dashboard_graph.png" responsive="true" >}}

To create an anomaly detection graph, start by adding a timeseries graph to your dashboard. As shown below, be sure to select "Timeseries" as the visualization type.

{{< img src="monitors/monitor_types/anomaly/initial_editor.png" responsive="true" >}}

Now, click on the + icon (Add functions and modifiers) on the right side of your expression. Choose the “Anomalies” function in the "Algorithms" submenu:

{{< img src="monitors/monitor_types/anomaly/function_menu.png" responsive="true" >}}

This will add anomaly detection to your expression, and you should immediately see the preview update to include the gray band. A number of the graphing options will disappear, as anomaly detection has a unique visualization.

The function has two parameters. The first parameter is for selecting which algorithm will be used. The second parameter is labeled `bounds`, and you can tune this to change the width of the grey band. You may think of `bounds` like standard deviations; a value of 2 or 3 should be large enough to include most "normal" points. After successfully adding `anomalies`, your editor should show something like this:

{{< img src="monitors/monitor_types/anomaly/final_editor.png" responsive="true" >}}

### Alert on Anomalies

In addition to viewing anomalies in dashboards, you may create monitors that trigger when metrics behave anomalously.

Navigate to the [New Monitor](https://app.datadoghq.com/monitors#/create) page and click **Anomaly**. Then fill out the **Define the metric** section just as you would for any other monitor.

{{< img src="monitors/monitor_types/anomaly/monitor_options.png" responsive="true" >}}

You should now see something like what's shown above, with a handful of selections that will help determine how sensitive your monitor is to different types of anomalies.

<ol type="a">
  <li>This number is equivalent to the <code>bounds</code> parameter used in the <code>anomalies</code> function in dashboards; it controls the width of the gray band. We recommend using a value of 2 or 3.</li>
  <li>If you only care about unusually high or unusually low values, you can choose to only alert on values above or below the bounds.</li>
  <li>We recommend using a window size of at least 15 minutes. (A 30 minute window works well in most cases.) </li>
  <li>You can change the anomaly detection algorithm used here. See the next section of this guide for tips on how to choose the best algorithm for your use case.</li>
</ol>

Complete all steps in the New Monitor form (**Say what's happening**, etc) and click **Save** to create the Anomaly monitor.

Both the Monitor Edit page and the Monitor Status pages provide "Historical Context" so that you can see how the metric behaved in the past. This should provide some insight into what the anomalies algorithm takes into account when calculating the bounds.

### Anomaly Detection Algorithms


There are four different anomaly detection algorithms:

* _Basic_: Use this algorithm for metrics that have no repeating seasonal pattern. _Basic_ uses a simple lagging rolling quantile computation to determine the range of expected values, but it uses very little data and adjusts quickly to changing conditions but has no knowledge of seasonal behavior or longer trends.

* _Agile_: Use this algorithm for seasonal metrics when you want the algorithm to quickly adjust to level shifts in the metric. _Agile_ is a robust version of the [SARIMA](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average) algorithm. It incorporates the immediate past into its predictions, allowing it to update quickly to level shifts at the expense of being less robust to recent, long-lasting anomalies.

* _Robust_: Use this algorithm for seasonal metrics where you expect the metric to be stable and want to consider slow level shifts as anomalies. _Robust_ is a [seasonal-trend decomposition](https://en.wikipedia.org/wiki/Decomposition_of_time_series) algorithm. It is very stable and its predictions remain constant even through long-lasting anomalies at the expense of taking longer to respond to intended level shifts (e.g., if the level of a metric shifts due to a code change.)

* _Adaptive_: Use this algorithm for seasonal metrics when you find _agile_ and _robust_ to be too sensitive to minor changes in the metrics behavior. This algorithm is dynamic and will adjust its predictions to a metric's changes much more readily than _agile_ or _robust_. On the other hand, it can be prone to following a metric too closely, which could lead to false negatives.

All of the seasonal algorithms may use up to a couple of months of historical data when calculating a metric's expected normal range of behavior. By using a significant amount of past data, the algorithms are able to avoid giving too much weight to abnormal behavior that might have occurred in the recent past.

The figures below illustrate how and when these four algorithms behave differently from one another. In the first figure, _basic_ will successfully identify anomalies that spike out of the normal range of values, but it does not incorporate the repeating, seasonal pattern into its predicted range of values. By contrast, _robust_, _agile_, and _adaptive_ all recognize the seasonal pattern and can detect more nuanced anomalies (e.g., if the metric was to flatline near its minimum value).

{{< img src="monitors/monitor_types/anomaly/alg_comparison_1.png" responsive="true" >}}

In the next figure, the metric exhibits a sudden level shift. _Agile_ and _adaptive_ adjust more quickly to the level shift than does _robust_. Also, the width of _robust_'s bounds increases to reflect greater uncertaintly after the level shift; the width of _agile_ and _adaptive_ bounds remains unchanged. _Basic_ is clearly a poor fit for this scenario, where the metric exhibits a strong weekly seasonal pattern.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_2.png" responsive="true" >}}

The next figure shows how the algorithms react to an hour-long anomaly. _Robust_ completely ignores this anomaly. All the other algorithms start to behave as if the anomaly is the new normal. _Agile_ and _adaptive_ even identify the metric's return to its original level as an anomaly.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_3.png" responsive="true" >}}

The algorithms also deal with scale differently. _Basic_ and _Robust_ are scale-insensitive, while _Agile_ and _Adaptive_ are not. In the graphs on the left-hand side we see both _Agile_ and _Robust_ mark the level-shift as being anomalous. On the right-hand side we add 1000 to the same metric, and _Agile_ no longer calls out the level-shift as being anomalous whereas robust continues do so.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_scale.png" responsive="true" >}}

Finally, we see how each of the algorithms handle a new metric. _Robust_ and _agile_ won't show any bounds during the first few weeks. _Basic_ and _adaptive_ will start showing bounds shortly after the metric first appears. _Adaptive_ will leverage the metric's daily seasonal patterns in its predictions, while _basic_ simply reflects the range of recent values.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_new_metric.png" responsive="true" >}}

## FAQ

* Should I use anomaly detection for everything?
* Why can't I use anomaly detection over groups in the dashboard?
* Will past anomalies affect the current predictions?
* How should I set the window size and alert threshold?
* Why does `anomalies` not add a gray prediction band in the dashboard? / Why am I getting "No Data" for an Anomaly Alert? / How much history do the algorithms require?
* Why does an anomaly "disappear" when I zoom in?
(### Is it possible to capture anomalies that occur within the bounds?