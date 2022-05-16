---
title: How do I monitor ephemeral servers for reboots?
kind: faq
further_reading:
- link: "/monitors/create/"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
---

Ephemeral environments spin up and terminate hosts constantly which can make it challenging to distinguish new hosts from rebooted hosts.

A metric monitor on the `system.uptime` metric can be used to address this. The uptime metric is an ever increasing timer which resets to 0 when a host boots up and can be evaluated using the `diff()` function, to distinguish between a start at 0 (new server) and a change (diff) of a running uptime value to a 0 value.

The example shown below captures how this can be setup:

{{< img src="monitors/faq/ephemeral_set_up.png" alt="ephemeral_set_up"  >}}

{{< partial name="whats-next/whats-next.html" >}}
