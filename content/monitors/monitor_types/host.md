---
title: Host monitor
kind: documentation
description: "Check if one or more hosts are reporting to Datadog"
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: Configure your monitor notifications
- link: "monitors/downtimes"
  tag: "Documentation"
  text: Schedule a dowtime to mute a monitor
- link: "monitors/monitor_status"
  tag: "Documentation"
  text: Consult your monitor status
---

*Requires Datadog Agent version >= 5.0.0.*

## Overview

Every Datadog Agent collection reports a heartbeat called `datadog.agent.up`
with a status `UP`. You can monitor this heartbeat across one or more hosts.

## Configuration

1. Select your **host by name or tag(s)**. Providing a tag monitors every host that has that tag or tag combination.
    {{< img src="monitors/monitor_types/host/host_monitor_pick_hosts.png" alt="host monitor pick hosts" responsive="true" style="width:80%;">}}

2. Select the **no-data timeframe**: If the heartbeat stops reporting for more than the number of minutes you have selected, then you get notified.
    {{< img src="monitors/monitor_types/host/no_data_timeframe.png" alt="host monitor no data timeframe" responsive="true" style="width:80%;">}}

3. Configure your **notification options**:  
    Refer to the [Notifications][1] dedicated documentation page for a detailed walkthrough of the common notification options.

## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/notifications
