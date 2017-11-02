---
title: Is it possible to capture anomalies that occur within the bounds?
kind: faq
customnav: monitornav
---

If the reason anomalies are occurring within the bounds is that the volatility of a metric leads to wide bounds that mask true anomalies (as described in the FAQ above), you may be able apply functions to the series to reduce its volatility, leading to narrower bounds and better anomaly detection.

For example, many important metrics (e.g., `successful.logins`, `checkouts.completed`, etc.) represent the success of some user-driven action. It can be useful to monitor for anomalous drops in one of those metrics, as this may be an indication that something is preventing successful completion of these events and that the user experience is suffering.

It's common that these metrics have points that are at or near zero, especially when viewing the metric over a short window of time. Unfortunately, this results in the bounds of the anomaly detection forecast include zero, making it impossible to detect anomalous drops in the metric. An example is shown below.

{{< img src="monitors/monitor_types/anomaly/raw_profile_updates.png" alt="raw profile updates" responsive="true">}}

How can we work around this problem? One approach is to add a `rollup()` to force the use of a larger interval. `rollup()` takes as an argument the number of seconds that should be aggregated into a single point on the graph. For example, applying `rollup(120)` will lead to a series with one point every two minutes. With larger intervals, zeros become rare and can correctly be categorized as anomalies. Here's the same series as above but with a 2-minute rollup applied.

{{< img src="monitors/monitor_types/anomaly/rollup_profile_updates.png" alt="rollup profile updates" responsive="true" >}}

Another option is to apply the `ewma()` function to take a moving average. Like with rollups, this function will smooth away intermittent zeros so that drops in the metric can correctly be identified as anomalies.

{{< img src="monitors/monitor_types/anomaly/ewma_profile_updates.png" alt="Ewma profile updates" responsive="true">}}