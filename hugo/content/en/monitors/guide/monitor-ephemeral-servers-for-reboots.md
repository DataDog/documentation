---
title: Monitor ephemeral servers for reboots
description: "Monitor ephemeral servers for reboots using the system.uptime metric with the diff() function to distinguish new hosts from rebooted hosts."
further_reading:
- link: "/monitors/"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
aliases:
- /monitors/faq/how-do-i-monitor-ephemeral-servers-for-reboots
---

Ephemeral environments spin up and terminate hosts constantly, which can make it challenging to distinguish new hosts from rebooted hosts.

You can use a metric monitor on the `system.uptime` metric can to address this. The uptime metric is an ever increasing timer which resets to 0 when a host boots up. You can use the `diff()` function with the metric to distinguish between a new server, which has an uptime of 0 (new server), and a rebooted server, which will show a change (diff) from a running uptime value to a 0.

The example shown below captures how you can set this up:

{{< img src="monitors/guide/ephemeral_set_up_2025-05-20.png" alt="The New Monitor page in Datadog, showing a metric monitor with a threshold alert set to 0 for the system.uptime metric, averaged by host" >}}


{{< partial name="whats-next/whats-next.html" >}}
