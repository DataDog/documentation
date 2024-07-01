---
title: Alert on No Change in value
aliases:
  - /monitors/faq/how-can-i-configure-a-metric-monitor-to-alert-on-no-change-in-value
further_reading:
- link: /monitors/
  tag: Documentation
  text: Learn how to create a monitor
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
---

A simple way to trigger an alert when a metric value does not change over a set period of time is to start by using the `diff()` function on your query. This will produce the delta values from consecutive data points.

* `diff(avg:system.mem.free{*})`

Next, apply the abs() function to take the absolute value of these deltas.

* `abs(diff(avg:system.mem.free{*}))`

These functions can be applied to your query in the UI.

{{< img src="monitors/guide/alert_value_difference.png" alt="Apply diff function through Sigma icon > Rate > Value difference" >}}

Alternatively, your complex query can be manually entered in the 'edit monitor' UI, via the Source tab (or applied programmatically via the [API][1]). See image below.

For [alert conditions][2] in the metric monitor itself, configure as follows:

* Select threshold alert
* Set the "Trigger when the metric is..." dropdown selector to **below** or **equal to**
* Set the "Alert Threshold" field to 0 (zero)

This configuration will trigger an alert event when no change in value has been registered over the selected timeframe.

Other [alert conditions/options][2] can be set to preference. Your monitor's UI configuration should end up looking something like this:

{{< img src="monitors/faq/zero_alert.png" alt="zero_alert" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/
[2]: /monitors/configuration/
