---
title: Reduce alert flapping
kind: guide
further_reading:
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
aliases:
- /monitors/faq/how-do-i-reduce-alert-flapping-noise
---

A frequent issue or pain point can be alert fatigue, or when alerts 'flap' (rapidly switching from an 'ok' to an 'alert' status).

There is functionality within Datadog that often leads to less noisy, more meaningful alerts.

* Re-Evaluate the Alert Threshold Value
    * The easiest way to reduce flapping when the alert <-> ok or state changes are frequent could be to increase/decrease the threshold condition.
* Use the `min` threshold
    * This triggers the alert only when all data points for the metric in the timeframe violate the threshold

* Reframe the query using Functions- rates, moving averages, or time-shift differentials
    * This means, you can compare the difference between a metric stream's values with the values from a week ago and set alert conditions based off the difference
    * A time-shift differential allows you to combine functions and can give a historical view as well. For example:
 `abs(system.cpu.system{*} - week_before(system.cpu.system{*}))`
    * If your metric frequently spikes, and those spikes are not inherently indicative of issues, applying a rate or average to it will allow you to set a more meaningful threshold.

* Consider the states of other monitors using Composite alerts
    * The most recent addition to Datadog's alerting capabilities, composite alerts will allow you to combine two or more previously created alerts.
    For example: if CPU is high AND disk is high on a host, trigger the alert.

* Use some built-in analysis modules with Anomaly or Outlier
    * [Anomaly Detection][2] uses some seasonality analysis to issue an alert when a data stream behaves in a historically inconsistent way.
    * [Outlier Detection][3] uses other data streams of the same context to issue an alert when a stream behaves in a way different compared with its peers
    * Both can also be used in conjunction with Composite alerts.

If the issue is alert routing, [template variables][4] and the separation of **warning** or **alert** states with [conditional variables][5] will be of interest!

{{< partial name="whats-next/whats-next.html" >}}

[2]: /monitors/types/anomaly/
[3]: /monitors/types/outlier/
[4]: /monitors/notify/variables/?tab=is_alert#template-variables
[5]: /monitors/notify/variables/?tab=is_alert#conditional-variables
