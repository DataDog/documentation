---
title: Network Map
description: Map your Network data across all your tags.
aliases:
    - /network_performance_monitoring/network_map/
further_reading:
    - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
      tag: 'Blog'
      text: 'Network Performance Monitoring'
    - link: 'https://www.datadoghq.com/blog/datadog-npm-search-map-updates/'
      tag: 'Blog'
      text: 'Streamline network investigations with an enhanced querying and map experience'
    - link: '/network_monitoring/devices'
      tag: 'Documentation'
      text: 'Network Device Monitoring'
    - link: '/network_monitoring/performance/setup'
      tag: 'Documentation'
      text: 'Collect your Network Data with the Datadog Agent.'
---

## Overview

The [network map][1] provides a topology view of your network to help you visualize network partitions, dependencies, and bottlenecks. By consolidating network data into a directional map, this page can be used to cut through the noise and isolate problematic areas.

{{< img src="network_performance_monitoring/network_map/network_map_3.png" alt="network_map" >}}

## Setup

The network map visualizes data collected by the Datadog Agent automatically. Once installed, no extra steps are necessary.

## Usage

Select the **Map** tab to configure your network map:

{{< img src="network_performance_monitoring/network_map/network_map_search.png" alt="Network map page search bar" >}}

1. Choose the tag you want your **Nodes** to represent with the first selector at the top of the page. Available tags are the same as those offered in the network page.

    {{< img src="network_performance_monitoring/network_map/network_map_search_additional_filter.png" alt="Network map page search bar" >}}

    - If there are too many nodes, a second tag is automatically added to the grouping. You can change the tag in the **By** dropdown menu. See [Clustering](#map-clusters) more information.
2. Select the metric you want your **Edges** to represent:

    - Throughput sent
    - Throughput received
    - TCP Retransmits
    - TCP Latency
    - TCP Jitter
    - Established Connnections
    - Closed Connections

3. Filter the connections you want to display. You can choose whether or not to:

    - Filter traffic to a particular environment, namespace, or any other tag(s)
    - Filter your tags based on a fuzzy string match.
      {{< img src="network_performance_monitoring/network_map/filtering_npm_map_search.mp4" alt="Filtering network map with search" video="true" >}}

    - **Show unresolved traffic**.
    - Hide network traffic outside a specified percentile range of the active network metric.
        {{< img src="network_performance_monitoring/network_map/filtering_network_map.mp4" alt="Filtering network map flows" video="true" width="50%" >}}

## Inspection

Hovering over a node highlights it and animates the directionality of the network traffic it sends and receives:

{{< img src="network_performance_monitoring/network_map/network_map_highlight.mp4" alt="Network Map" video="true" width="70%" >}}

Click on a node and select _Inspect_ from the menu to contextualize it within the larger network:

{{< img src="network_performance_monitoring/network_map/network_entity_zoom.mp4" alt="Network entity zoom" video="true" width="70%">}}

## Map clusters

For complex networks, the map's query editor includes additional grouping fields. This enables you to render datasets that would otherwise have too many nodes to show at once on the map. Using the additional grouping fields also improves the performance of high cardinality queries.

{{< img src="network_performance_monitoring/network_map/network_map_search_additional_filter.png" alt="Network map page search bar" >}}

{{< img src="network_performance_monitoring/network_map/network_map_3.png" alt="network_map" >}}

Clustering adds an additional dimension for grouping the nodes in the map. Large maps are automatically clustered to improve load time and readability of the map. To view the nodes within a cluster, click the cluster to expand it. To collapse the cluster, click the gray area surrounding the nodes.

A red border around a cluster indicates that at least one alerting monitor carries a tag that matches the tag by which the nodes are grouped. For example, if the map is grouped by service, then the map looks for monitors with the tag `service:<nodeName>`. If the monitor is in an alert state, the map outlines any clusters containing `<nodeName>` in red.  

{{< img src="network_performance_monitoring/network_map/expanded_network_cluster.png" alt="expanded network cluster map view" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/map
