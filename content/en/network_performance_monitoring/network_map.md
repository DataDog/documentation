---
title: Network Map
kind: documentation
description: Map your Network data across all your tags.
further_reading:
- link: "https://www.datadoghq.com/blog/network-performance-monitoring"
  tag: "Blog"
  text: "Network Performance Monitoring"
- link: "https://www.datadoghq.com/blog/monitoring-101-alerting/"
  tag: "Blog"
  text: "Monitoring 101: Alerting on what matters"
- link: "/network_performance_monitoring/network_installation"
  tag: "Documentation"
  text: "Collect your Network Data with the Datadog Agent."
---

<div class="alert alert-warning">
This feature is currently in beta. Request access by filling out the <a href="https://app.datadoghq.com/network/2019signup">Datadog Network Performance Monitoring Beta Request form</a>.
</div>

[The Network map][1] provides a topology view of your network. With this map, you can visualize network partitions, dependencies, and bottlenecks.

{{< img src="network_performance_monitoring/network_map/network_map.png" alt="network_map" responsive="true">}}

## Setup

The Network Map visualizes data collected by Datadog Network automatically, once installed no extra steps are necessary.

## Ways to use it

The Network Map was built to provide an overview of your tags and their network data. This helps to cut through noise and isolate problem areas. Also, you can access other telemetry collected by Datadog directly from this view.

To configure your Network Map use the header:

{{< img src="network_performance_monitoring/network_map/configure_network_map.png" alt="configure_network_map" responsive="true" style="width:70%;">}}

### Tags to display

Use the page header to configure your Network Map:

1. Choose wich tag key to display as **Nodes** with the most left selector on the upper left side of the page. Tag keys available are coming from the tags submitted with your Network data.
2. Select the data to display as **Edges** between:
    * Throughtput sent
    * Throughtput received
    * Retransmits
3. Filter the connections you want to display.

#### Filter connections

To filter the connections displayed you can choose either:

* Whether or not to display Unresolved flow.
* Hide network flows outside specified percentile range of the active network metric.
* Filter your Tags based on a fuzzy string match.

## Inspection

Mousing over a tag highlights it and shows its network traffic as animated lines to better emphasize directionality:

{{< img src="network_performance_monitoring/network_map/network_map_highlight.mp4" alt="Service Map" video="true" responsive="true" width="70%" >}}

Clicking a tag offers you the option to inspect it by isolating it and displaying the network data from other tags according to the type of data selected:

{{< img src="network_performance_monitoring/network_map/network_entity_zoom.png" alt="network_entity_zoom" responsive="true" style="width:70%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/map
