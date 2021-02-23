---
title: What is the "Do (not) require a full window of data for evaluation" monitor parameter?
kind: faq
further_reading:
- link: "/monitors/monitor_types/"
  tag: "Documentation"
  text: "Learn how to create a monitor"
---

{{< img src="monitors/faq/Require_screen.png" alt="Require_screen"  >}}

Sometimes, you do not want evaluation to occur on sparse data. There are 2 main scenarios for which you'll likely need to **require a full window of data** for evaluation:

* Multi-alert [monitors][1] triggering a separate alert per {group}, where new groups can appear.
* [Monitors][1] using the alerting method **In total**.

**Example 1**: a multi-alert CPU monitor triggering one separate alert per host, over the average of the past 10 min of data:

* If a new host is provisioned it may have high CPU for a minute or two, but you would not want alerts to trigger if the CPU drops shortly after.
* Without a full window of data, 2 min after any host provision, the monitor looks at the past 10 min, only has 2 min of data but evaluates the alert anyway and triggers an alert.

**Example 2**: a monitor triggering alerts on the custom metric "error_number" in total over the past 5 min. This metric value is collected by your system every 2 min and is expected to be 2 in normal times:

* Datadog monitors are evaluated every minute, so 50% of the time, the monitor sees 2 values over the past 5 minutes (monitor value 4). The other 50% of the time, 3 values are seen (monitor value 6).
* Without requiring a full window of data, even with constant data, the monitor sees compares different values over time against the threshold you set up.

**Disable** the full window of data in 2 main scenarios, they correspond to sparse metrics :

* Metric not sent at a regular interval
* Metric not often sent compared to the alerting window

**Example 1**: a monitor based on an error counter, only incremented if an error happens:

* With the full window of data activated, the monitor likely doesn't detect any full window, so it may skip all evaluations and not alert you at all.

**Example 2**: a monitor alerting on the past 10 min, for a metric submitted every 20 min:

* It doesn't really make sense to ask for a full window of data, and using this parameter may cause the monitor to skip all evaluations and not alert you at all.

For other scenarios, this **full window of data** doesn't have much influence on your monitor.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/
