---
title: Comment monitorer les redémarrages éphémères de mes serveurs?
kind: faq
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: Apprenez à créer un monitor
- link: "monitors/notifications"
  tag: "Documentation"
  text: Configurez les notifications de votre monitor
---

Ephemeral environments spin up and terminate hosts constantly which can make it challenging to distinguish new hosts from rebooted hosts.

A metric monitor on the `system.uptime` metric can be used to address this. The uptime metric is an ever increasing timer which resets to 0 when a host boots up and can be evaluated using the diff() [function][1], to distinguish between a start at 0 (new server) and a change (diff) of a running uptime value to a 0 value.

The example shown below captures how this can be setup:

{{< img src="monitors/faq/ephemeral_set_up.png" alt="ephemeral_set_up" responsive="true" popup="true" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/miscellaneous/functions
