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

The [network map][1] provides a topology view of your network to help you visualize network partitions, dependencies, and bottlenecks. By consolidating network data into a directional map, this page can be used to cut through the noise and isolate problem areas. Also, you can access other telemetry collected by Datadog directly from this view.

{{< img src="network_performance_monitoring/network_map/network_map.png" alt="network_map" responsive="true">}}

## Setup

The network map visualizes data collected by the Datadog Agent automatically. Once installed, no extra steps are necessary.

## Configuration

{{< img src="network_performance_monitoring/network_map/configure_network_map.png" alt="configure_network_map" responsive="true" style="width:70%;">}}

Use the page header to configure your network map:

1. Choose the tag key to display as **Nodes** with the first selector at the top of the page. Available tag keys come from the tags submitted with your network data.
2. Select the metric for your **Edges** to represent between:
    * Throughtput sent
    * Throughtput received
    * Retransmits
3. Filter the connections you want to display:
    * Whether or not to **Show Unresolved Flows**.
    * Hide network flows outside a specified percentile range of the active network metric.
    * Filter your tags based on a fuzzy string match.

## Inspection

Hovering over a node highlights it and animates the directionality of the network traffic it sends and receives:

{{< img src="network_performance_monitoring/network_map/network_map_highlight.mp4" alt="Service Map" video="true" responsive="true" width="70%" >}}

Click on a node and choose _Inspect_ to isolate it and display network data from other nodes according to the type of metric selected. Below is an example result of inspecting a node:

{{< img src="network_performance_monitoring/network_map/network_entity_zoom.png" alt="network_entity_zoom" responsive="true" style="width:70%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/map
