---
title: Can I set up a monitor for a metric that hasn't been reported to Datadog yet?
kind: faq
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
---

**But why create a monitor for a metric that doesn't even exist?**

This is useful in situations where you want to be alerted on a system-critical metric that won't become available until a later time. A common use case is you're getting ready to launch a new app and want to set up some monitors in advance. However, since your app is still in staging and your Agents only monitor your prod environment, the metrics that you want to monitor don't exist in the UI:

{{< img src="monitors/faq/my_custom_metric.png" alt="my_custom_metric"  >}}

To workaround this, you can make use of the monitor's Source tab or create events via the [API][1].

**Using the monitor's Source tab**

Open up the monitor's Source tab, where you'll be prompted to enter the JSON metric query definition:

{{< img src="monitors/faq/raw_edit_monitor.png" alt="raw_edit_monitor"  >}}

Though the metric may not yet be recognized by Datadog, the monitor should still save and will update the graph as soon as datapoints are submitted for this metric.

**Using the API**

Refer to our [Monitors API][2] on creating a metric monitor.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api
[2]: /api/#monitors
