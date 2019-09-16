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
- link: "/network_performance_monitoring/installation"
  tag: "Documentation"
  text: "Collect your Network Data with the Datadog Agent."
---

<div class="alert alert-warning">
This feature is currently in beta. Request access by completing the <a href="https://app.datadoghq.com/network/2019signup">Datadog Network Performance Monitoring Beta Request form</a>.
</div>

## Overview

The [network map][1] provides a topology view of your network. With this map, you can visualize network partitions, dependencies, and bottlenecks.

The network map was built to provide an overview of your tags and their network data. This helps to cut through noise and isolate problem areas. Also, you can access other telemetry collected by Datadog directly from this view.

{{< img src="network_performance_monitoring/network_map/network_map.png" alt="network_map" responsive="true">}}

## Setup

The Network Map visualizes data collected by the Datadog network automatically. Once installed, no extra steps are necessary.

## Configuration


To configure your Network Map use the header:

{{< img src="network_performance_monitoring/network_map/configure_network_map.png" alt="configure_network_map" responsive="true" style="width:70%;">}}

### Tags to display

Use the page header to configure your Network Map:

1. Choose the tag key to display as **Nodes** with the first selector at the top of the page. Available tag keys come from the tags submitted with your network data.
2. Select the data to display as **Edges** between:
    * Throughtput sent
    * Throughtput received
    * Retransmits
3. Filter the connections you want to display.

#### Filter connections

To filter the connections displayed you can choose:

* Whether or not to **Show Unresolved Flows**.
* Hide network flows outside specified percentile range of the active network metric.
* Filter your tags based on a fuzzy string match.

## Inspection

Mousing over a tag highlights it and shows the network traffic as animated lines to emphasize directionality:

{{< img src="network_performance_monitoring/network_map/network_map_highlight.mp4" alt="Service Map" video="true" responsive="true" width="70%" >}}

Clicking a tag displays a menu with the option to inspect the tag by isolating it and displaying the network data from other tags according to the type of data selected. Below is an example result of inspecting a tag:

{{< img src="network_performance_monitoring/network_map/network_entity_zoom.png" alt="network_entity_zoom" responsive="true" style="width:70%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/map
