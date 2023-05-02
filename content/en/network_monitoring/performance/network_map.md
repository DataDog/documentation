---
title: Network Map
kind: documentation
description: Map your Network data across all your tags.
aliases:
    - /network_performance_monitoring/network_map/
further_reading:
    - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
      tag: 'Blog'
      text: 'Network Performance Monitoring'
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

Select the **map** tab to configure your network map:

{{< img src="network_performance_monitoring/network_map/network_map_search.png" alt="Network map page search bar" >}}

{{< img src="network_performance_monitoring/network_map/network_map_search_additional_filter.png" alt="Network map page search bar" >}}

1. Choose the tag you want your **Nodes** to represent with the first selector at the top of the page. Available tags are the same as those offered in the network page.
    - If there are too many nodes, a second tag is automatically selected to group by. You can change this using the dropdown shown in the above screenshot. See [Clustering](#map-clusters) more information about clustering.
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

{{< img src="network_performance_monitoring/network_map/network_map_search_additional_filter.png" alt="Network map page search bar" >}}

For complex networks, the map's query editor includes additional grouping fields. This enables you to render datasets that would otherwise have too many nodes to show at once on the map, as well as improve the performance of high cardinality queries.

{{< img src="network_performance_monitoring/network_map/network_map_3.png" alt="network_map" >}}

Once loaded, you can view the nodes within a cluster by clicking on it to expand it. To collapse the cluster, click the gray area surrounding the nodes.

{{< img src="network_performance_monitoring/network_map/expanded_network_cluster.png" alt="expanded network cluster map view" >}}

Clustering is an additional dimension of grouping the nodes in the map. Large maps will automatically get clustered to improve load time and readability of the map; smaller maps will not be clustered. To view the nodes within a cluster, click into the cluster to expand. To collapse the cluster, click within the gray cluster area. 

A red border around a cluster indicates that there is at least one alerting monitor with the same tag as what the nodes are being grouped by. For example, if the map is grouped by service, then the map will look for monitors with the tag service:nodeName. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/map
