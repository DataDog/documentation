---
title: Monitor FAQ
kind: documentation
autotocdepth: 2
hideguides: true
customnav: monitornav
---


### Can I manage my monitors programatically?

  Yes. Refer to the [Datadog API docs](http://docs.datadoghq.com/api/#alerts)
  for detailed information on managing monitors through the API using the
  available libraries or cURL.

### Can you alert on a function?

  Yes, selecting the 'Source' tab of a monitor editor (Step 1) will allow you to
  alert on custom queries and functions, similar to the JSON editor for graphs.

### Can I manually resolve a monitor?

Yes, you can manually resolve monitors but it only makes sense in a couple cases:

- If the monitor is in a "no data" state then resolving it will hide it from the
triggered monitors page.
- If the monitor is in the triggered state but has stopped reporting data then
resolving it will hide it from the triggered monitors page.

Otherwise the monitor will pick up the current state on the next evaluation. In other
words, if the value is still above/below the configured threshold then the monitor may
re-trigger upon the next evaluation (in about 60 seconds).

### Should I use anomaly detection for everything?

No. Anomaly detection is designed to assist with visualizing and monitoring metrics that have predictable patterns. For example, `my_site.page_views{*}` might be driven by user traffic and thus vary predictably by time of day and day of week. If your metric does not have any sort of repeated/predictable pattern, then a simple chart overlay or threshold alert might be better than anomaly detection.

Also, anomaly detection requires historical data to make good predictions. If you have only been collecting a metric for a few hours or a few days, anomaly detection probably won't be very useful.

Take care when creating multi-alerts. A metric such as `service.requests_served{*}` could be a good candidate for anomaly detection, but `service.requests_served{*} by {host}`is probably not. If your hosts are load-balanced, then an [outlier monitor](/monitors/monitor_types/outliers/) will be better for detecting hosts that are behaving abnormally. If your service scales up, each new host won’t be monitored at all until there is a minimum amount of history for anomaly detection to kick in, and even then alerts might be noisy due to instability in the number of requests handled by those hosts.

### Why can't I use anomaly detection over groups in the dashboard?

Looking at many separate timeseries in a single graph can lead to [spaghettification](https://www.datadoghq.com/blog/anti-patterns-metric-graphs-101/), and the problem gets only worse once the anomaly detection visualization is added in.

{{< img src="monitors/monitor_types/anomaly/spaghetti.png" >}}

You can, however, add multiple series in a single graph one at a time. The gray envelope will only show up on mouseover.

{{< img src="monitors/monitor_types/anomaly/anomaly_multilines.png" >}}

### Will past anomalies affect the current predictions?

All the algorithms outside of _Basic_ use extensive amounts of historical data so that they are robust to most anomalies. In the first graph, note how the envelope stays around 400K even after the metric has dropped to 0, and how it continues to do so throughout the day.

{{< img src="monitors/monitor_types/anomaly/anomalous_history.png" >}}

The second graph shows the same metric, a day later. Even though it uses the previous day in the calculation of the envelope, it is unaffected by the anomaly that occurred then.

{{< img src="monitors/monitor_types/anomaly/no_effect.png" >}}

### How should I set the window size and alert threshold?

Smaller window sizes will lead to faster alerts, however, with very small windows (<= 10 minutes), metrics often appear noisy, making it difficult to visualize the difference between anomalies and noise.

Note that setting the window size to X minutes doesn't require an anomaly to last X minutes before an alert is triggered. You can tune the threshold to control how long an anomaly must last to trigger an alert. For example, with the window size set to 30 minutes, you can get alerted when an anomaly lasts for just five minutes by setting the threshold to 5/30 = 17%. That said, we have found that anomaly alerts are most reliable when the window size is between 15 minutes and an hour and the threshold is on the higher side (> 40%).

### Why does `anomalies` not add a gray prediction band in the dashboard? / Why am I getting "No Data" for an Anomaly Alert? / How much history do the algorithms require?

All the algorithms besides _Basic_ require historical data before they can start making predictions. If your metric has only started reporting data for a short while, then _Agile_ and _Robust_ won't try to make any predictions until it has at least two weeks of history. _Adaptive_ will start working after it has at least two hours worth of history.

### Why does an anomaly "disappear" when I zoom in?

At different zoom levels, the same query can result in time series with very different characteristics. When looking at longer time periods, each point represents the aggregate of many more-granular points. Therefore, each of these aggregate points may hide noise observed in the more granular points. For example, charts that show one week often appear smoother (less noisy) than charts that show just 10 minutes.

The width of the gray band that is drawn by our anomaly detection algorithm is, in part, based on the noisiness of the time series in the plot. The band must be wide enough that ordinary noise is mostly inside the band and doesn't appear as anomalous. Unfortunately, when the band is wide enough to include ordinary noise, it might also be wide enough to hide some anomalies, especially when viewing short time windows.

Here's a concrete example to illustrate. The `app.requests` metric is noisy but has a constant average value of 8. On one day, there is a 10-minute anomalous period, starting a 9:00, during which the metric has an average value of 10. The chart below shows this series in a graph with a one-day time window; each point in the graph summarizes 5 minutes.

{{< img src="monitors/monitor_types/anomaly/disappearing_day.png" >}}

The gray band here makes sense; it is wide enough to capture the noise in the time series. Yet, it is narrow enough that the anomaly at 9:00 stands out clearly. This next chart shows a zoomed-in view of a half-hour time window that includes the 10-minute anomaly; each point in the graph summarizes 10 seconds.

{{< img src="monitors/monitor_types/anomaly/disappearing_half_hour.png" >}}

Again, the band seems to be reasonably sized, because the non-anomalous data from 8:50 - 9:00 and from 9:10 - 9:20 is inside the band. A band any narrower would start to highlight normal data as anomalous. Notice the band in this graph is ~8x wider than the one in the previous graph. The anomalous period from 9:00 - 9:10 looks a little different from the rest of the series, but it is not extreme enough to fall outside of the band.

In general, if an anomaly disappears when you zoom in, this doesn't mean that it's not an anomaly. It means that, while the individual points in the zoomed-in view are not anomalous in isolation, the fact that many slightly unusual points occur together is anomalous.

### Is it possible to capture anomalies that occur within the bounds?

If the reason anomalies are occurring within the bounds is that the volatility of a metric leads to wide bounds that mask true anomalies (as described in the FAQ above), you may be able apply functions to the series to reduce its volatility, leading to narrower bounds and better anomaly detection.

For example, many important metrics (e.g., `successful.logins`, `checkouts.completed`, etc.) represent the success of some user-driven action. It can be useful to monitor for anomalous drops in one of those metrics, as this may be an indication that something is preventing successful completion of these events and that the user experience is suffering.

It's common that these metrics have points that are at or near zero, especially when viewing the metric over a short window of time. Unfortunately, this results in the bounds of the anomaly detection forecast include zero, making it impossible to detect anomalous drops in the metric. An example is shown below.

{{< img src="monitors/monitor_types/anomaly/raw_profile_updates.png" >}}

How can we work around this problem? One approach is to add a `rollup()` to force the use of a larger interval. `rollup()` takes as an argument the number of seconds that should be aggregated into a single point on the graph. For example, applying `rollup(120)` will lead to a series with one point every two minutes. With larger intervals, zeros become rare and can correctly be categorized as anomalies. Here's the same series as above but with a 2-minute rollup applied.

{{< img src="monitors/monitor_types/anomaly/rollup_profile_updates.png" >}}

Another option is to apply the `ewma()` function to take a moving average. Like with rollups, this function will smooth away intermittent zeros so that drops in the metric can correctly be identified as anomalies.

{{< img src="monitors/monitor_types/anomaly/ewma_profile_updates.png" >}}

### I set up an alert with one of my integration metrics. Why am I getting so many No Data alerts?


For the AWS No Data errors, the issue here has to do with how frequently we
receive AWS metrics. Because our crawlers are rate-limited by the Cloudwatch
APIs, data is often delayed by 10 or more minutes, so we generally recommend
that an alert for an AWS metric be set to have a threshold window of at least
30 minutes or an hour (you can see this in step 3 of alert creation, “during
the last…”). Switching the time frame on this alert will resolve this issue, or
you can install the agent on some AWS hosts to get more up-to-date data to
alert on. Overall, we’re always working towards getting data more efficiently
from AWS.

### Is it possible to set up alerts based on % utilisation? For example alerting when 50% of memory has been used or 80% of disk space is used?


* Yes, this can be done! Here is an example for creating a disk space in use
alert when at 80% or above:
  1. Select a metric like "system.disk.in_use".
  2. Select the "threshold alert" type.
  3. For set alert grouping, select "simple alert".
  4. Set alert conditions: Select Above and for the value put 0.8.
  5. Add a custom message for alert if you'd like.
* You can read more about setting up monitors [here][alerts-1].

[alerts-1]: /monitors
