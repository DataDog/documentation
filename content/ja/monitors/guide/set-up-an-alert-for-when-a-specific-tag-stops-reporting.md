---
title: Set up an alert for when a specific tag stops reporting
further_reading:
- link: /monitors/
  tag: Documentation
  text: Learn how to create a monitor
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
aliases:
- /monitors/faq/how-can-i-setup-an-alert-for-when-a-specific-tag-stops-reporting  
---

In some cases, you would like to know when one of your tags disappears from some of your systems. It is possible to set up a [monitor][1] for such an alert scheme within Datadog:

1. Set up a classic [metric monitor][2], and specify the metric and tag that you want to be alerted on when it is missing.
1. Select an alert condition that could never be triggered. For example, `a < -1` for a positive metric such as `system.cpu.user`.
1. Activate the _Notify if data is missing_ option, as you can see on this example:

{{< img src="monitors/guide/tag_stop_reporting.png" alt="Tag stop reporting" >}}

Your alert triggers if the tag stops reporting.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/
[2]: /monitors/types/metric/
