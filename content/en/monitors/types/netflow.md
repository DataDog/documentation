---
title: NetFlow Monitor
kind: Documentation
further_reading:
- link: "/network_monitoring/devices/netflow/"
  tag: "Documentation"
  text: "Learn more about NetFlow Monitoring"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/manage/status/"
  tag: "Documentation"
  text: "Check your monitor status"
---

{{< callout btn_hidden="true" header="Join the Beta!">}}
The NetFlow monitor is in private beta. Reach out to your Datadog representative to sign up for access.
{{< /callout >}}

## Overview

Datadog [Network Device Monitoring][1] (NDM) provides visibility into your on-premises and virtual network devices, such as routers, switches, and firewalls. As a part of NDM, [NetFlow Monitoring][2] to examine, interpret, and analyze your network traffic flow data over time, and identify top contributors to network congestion. 

After enabling NetFlow Monitoring, you can create a NetFlow monitor to alert you when a flow metric such as a monitoring network throughput for a specific source or destination pair crosses a threshold that you have set.

## Monitor creation

To create an NPM monitor in Datadog, use the main navigation: [**Monitors** --> **New Monitor** --> **NetFlow**][3]. 

### Define the search query

As you define the search query, the top graph updates in real time.

{{< img src="monitors/monitor_types/netflow/monitor.png" alt="Example monitor configuration using NetFlow data" style="width:100%;" >}}

1. Construct a search query using the same logic as the [NetFlow widgets][4] in your dashboards. 
1. Select if you want to alert on bytes or packets for traffic.
1. Choose the tags you want to filter the alerted traffic by. See the [full list of available facets][4].

### Using formulas and functions

You can create NetFlow monitors using formulas and functions. This can be used, for example, to create monitors on the volume of traffic sent by source and device. 

{{< img src="monitors/monitor_types/netflow/formula.png" alt="Example monitor configuration using NetFlow data and a formula" style="width:100%;" >}}

For more information, see the [Functions][5] documentation.

### Set alert conditions

Configure monitors to trigger if the query value crosses a threshold and customize advanced alert options for recovery thresholds and evaluations delays. For more information, see [Configure Monitors][6].

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** section, see the [Notifications][7] page.

## Monitor NetFlow events

For more information about events you can create NetFlow monitors on, see the [NetFlow Monitoring documentation][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/
[2]: /network_monitoring/devices/netflow/
[3]: https://app.datadoghq.com/monitors/create/netflow
[4]: /network_monitoring/devices/netflow/#visualization
[5]: /dashboards/functions/
[6]: /monitors/configuration/
[7]: /monitors/notify/