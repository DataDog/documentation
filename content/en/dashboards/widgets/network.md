---
title: Network Widget
kind: documentation
description: "Displays a timeseries of network data."
widget_type: "timeseries"
aliases:
    - /graphing/widgets/network/
further_reading:
- link: "/network_monitoring/performance/"
  tag: "Documentation"
  text: "Network Performance Monitoring"
- link: "/dashboards/screenboards/"
  tag: "Documentation"
  text: "Screenboard"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The network widget supplements the [Network Performance Monitoring][1] feature by allowing you to create timeseries of network data, including volume and TCP retransmit counts of traffic between services, hosts, containers, and any other Datadog tag. Timeseries created with this widget can be placed in dashboards alongside visualizations of logs, traces, and processes data.

{{< img src="dashboards/widgets/network/network_1.png" alt="Image"  width="80%" >}}

**Note**: This widget only supports timeseries visualizations.

## Setup

1. Select "Network Traffic" from the dropdown menu. By default, this is set to "Metric".

    {{< img src="dashboards/widgets/network/network_2.png" alt="Image"   width="80%" >}}

2. Select any source and destination entities you want to group by in the network page, such as service, host, container, and availability zone.

    {{< img src="dashboards/widgets/network/network_3.png" alt="Image"  width="80%" >}}

    You can also filter down to a specific service, host, etc., by adding tags to the source and destination search bars.

    {{< img src="dashboards/widgets/network/network_4-2.png" alt="Image"  width="80%" >}}

3. Select the type of data you want to view: bytes sent, bytes received, or retransmits.

    {{< img src="dashboards/widgets/network/network_5-2.png" alt="Image"  width="80%" >}}

4. Select your preferred visualization settings. You can choose to view the data in many colors and as lines, areas, or bars.

    {{< img src="dashboards/widgets/network/network_6.png" alt="Image" responsive="false" style="width:60%;" >}}

## API

This widget can be used with the **Dashboards API**. Refer to the [Dashboards API][2] documentation for additional reference.

The dedicated [widget JSON schema definition][3] for the network widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/performance
[2]: /api/v1/dashboards/
[3]: /dashboards/graphing_json/widget_json/
