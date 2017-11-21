---
title: Host monitor
kind: documentation
autotocdepth: 3
customnav: monitortypenav
description: "Check if one or more hosts are reporting to Datadog"
---

*Requires Datadog Agent version >= 5.0.0.*

{{< img src="monitors/monitor_types/host/host_monitor.png" alt="host monitor" responsive="true" >}}

Every Datadog Agent collection reports a heartbeat called `datadog.agent.up`
with a status `UP`. You can monitor this heartbeat across one or more hosts.

1. Select your **host by name or tag(s)**. Providing a tag will monitor every host that has that tag or tag combination.

2. Select the **no-data timeframe**. If the heartbeat stops reporting for more than the number of minutes you have selected, then you will get notified.

3. Configure your **notification options** Refer to the [Notifications](monitors/notifications) dedicated documentation page for a detailed walkthrough of the common notification options.
