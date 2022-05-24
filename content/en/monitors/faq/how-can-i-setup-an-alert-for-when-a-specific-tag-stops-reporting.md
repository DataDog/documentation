---
title: How can I setup an alert for when a specific tag stops reporting?
kind: faq
further_reading:
- link: "/monitors/create/"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
---

In some cases, you would like to know when one of your tag disappears from some of your systems. It is possible to setup a [monitor][1] for such an alert scheme within Datadog:

* First, setup a classic [metric monitor][2], and specify the metric and tag that you want to be alerted on when it is missing
* Then, select some simple alert condition which should never be triggered, such as an alert over a large value (for example, `a > 1000000`) or under an impossible negative value (for example, `a < -1` for a positive metric such as `system.cpu.user`)
* Finally, activate the _Notify if data is missing_ option, as you can see on this example:

{{< img src="monitors/faq/tag_stop_reporting.png" alt="Tag stop reporting"  >}}

You should then be notified when the tag stops to be sent along with the chosen metric!

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/
[2]: /monitors/create/types/metric/
