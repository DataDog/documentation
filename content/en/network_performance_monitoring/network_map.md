---
title: Network Map
kind: documentation
description: Map your Network data across all your tags.
further_reading:
- link: "https://www.datadoghq.com/blog/network-performance-monitoring"
  tag: "Blog"
  text: "Network Performance Monitoring"
- link: "/integrations/snmp"
  tag: "Documentation"
  text: "SNMP integration"
- link: "/network_performance_monitoring/installation"
  tag: "Documentation"
  text: "Collect your Network Data with the Datadog Agent."
- link: "/dashboards/widgets/network"
  tag: "Documentation"
  text: "Network Widget"
---

## Overview

The [network map][1] provides a topology view of your network to help you visualize network partitions, dependencies, and bottlenecks. By consolidating network data into a directional map, this page can be used to cut through the noise and isolate problem areas.

{{< img src="network_performance_monitoring/network_map/network_map_2.png" alt="network_map" >}}

## Setup

The network map visualizes data collected by the Datadog Agent automatically. Once installed, no extra steps are necessary.

## Configuration

Use the page header to configure your network map:

1. Choose the tag you want your **Nodes** to represent with the first selector at the top of the page. Available tags are the same as those offered in the network page.
2. Select the metric you want your **Edges** to represent:
    * Throughput sent
    * Throughput received
    * Retransmits
    * Round-trip time
    * Round-trip time variance
3. Filter the connections you want to display. You can choose whether or not to:
    * **Show unresolved flows**.
    * Filter traffic to a particular environment, namespace, or any other tag(s)
    * Filter your tags based on a fuzzy string match.
    * Hide network flows outside a specified percentile range of the active network metric.

{{< img src="network_performance_monitoring/network_map/filtering_network_map.mp4" alt="Filtering network map" video="true"  width="40%" >}}

## Inspection

Hovering over a node highlights it and animates the directionality of the network traffic it sends and receives:

{{< img src="network_performance_monitoring/network_map/network_map_highlight.mp4" alt="Network Map" video="true"  width="70%" >}}

Click on a node and select _Inspect_ from the menu to contextualize it within the larger network:

{{< img src="network_performance_monitoring/network_map/network_entity_zoom.mp4" alt="Network entity zoom" video="true" width="70%">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/map
