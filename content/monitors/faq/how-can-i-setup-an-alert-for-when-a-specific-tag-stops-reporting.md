---
title: How can I setup an alert for when a specific tag stops reporting?
kind: faq
customnav: monitornav
---

In some cases, you would like to know when one of your tag disappears from some of your systems. It is possible to setup a [monitor](/monitors/) for such an alert scheme within Datadog:

* First, setup a classic [metric monitor](/monitors/monitor_types/metric), and specify the metric and tag that you want to be alerted on
* Then, select some simple alert condition which should never be triggered, such as an alert over a very large value or under an impossible negative value
* Finally, activate the notify if data is missing option, as you can see on this example:

{{< img src="monitors/faq/tag_stop_reporting.png" alt="Tag stop reporting" responsive="true">}}

You should then be notified when the tag stops to be sent along with the chosen metric!