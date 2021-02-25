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
    - link: '/dashboards/widgets/network'
      tag: 'Documentation'
      text: 'Network Widget'
---

## Overview

The [network map][1] provides a topology view of your network to help you visualize network partitions, dependencies, and bottlenecks. By consolidating network data into a directional map, this page can be used to cut through the noise and isolate problematic areas.

{{< img src="network_performance_monitoring/network_map/network_map_2.png" alt="network_map" >}}

## Setup

The network map visualizes data collected by the Datadog Agent automatically. Once installed, no extra steps are necessary.

## Configuration

Use the page header to configure your network map:

1. Choose the tag you want your **Nodes** to represent with the first selector at the top of the page. Available tags are the same as those offered in the network page.
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
      {{< img src="network_performance_monitoring/network_map/filtering_network_map.mp4" alt="Filtering network map flows" video="true"  width="50%" >}}

## Inspection

Hovering over a node highlights it and animates the directionality of the network traffic it sends and receives:

{{< img src="network_performance_monitoring/network_map/network_map_highlight.mp4" alt="Network Map" video="true"  width="70%" >}}

Click on a node and select _Inspect_ from the menu to contextualize it within the larger network:

{{< img src="network_performance_monitoring/network_map/network_entity_zoom.mp4" alt="Network entity zoom" video="true" width="70%">}}

## Network map hotkeys list

Change the layout of your network map with the following hotkey combinations:

| Hotkey                      | Description                                                         |
| --------------------------- | ------------------------------------------------------------------- |
| `shift + ctrl + 3`          | 3D projection ON/OFF                                                |
| `shift + ctrl + A`          | Arrows color (normal / edge)                                        |
| `shift + ctrl + B`          | Edges type (normal / proj3d / bundle / railway / detail1 / detail2) |
| `shift + ctrl + C`          | Edges color (normal / cluster / path / magnitude / source)          |
| `shift + ctrl + D`          | Demo mode ON/OFF                                                    |
| `shift + ctrl + E`          | Edges scale (linear / pow / sqrt / log / custom)                    |
| `shift + ctrl + F`          | Fullscreen / windowed                                               |
| `shift + ctrl + J`          | Colors/icons debug view ON/OFF                                      |
| `shift + ctrl + L`          | Nodes layout (cluster / railway / detail)                           |
| `shift + ctrl + M`          | Minimap ON/OFF                                                      |
| `shift + ctrl + N`          | Nodes scale (linear / pow / sqrt / log / custom)                    |
| `shift + ctrl + O`          | Nodes/edges outlier exclusion ON/OFF                                |
| `shift + ctrl + P`          | Picture mode ON/OFF                                                 |
| `shift + ctrl + Q`          | Map randomizer (randomize all settings)                             |
| `shift + ctrl + R`          | Rendertime ON/OFF                                                   |
| `shift + ctrl + S`          | Star-map ON/OFF                                                     |
| `shift + ctrl + T`          | Random data (keep all others parameters the same)                   |
| `shift + ctrl + U`          | Update node metadata                                                |
| `shift + ctrl + W`          | Edges hover detection ON/OFF                                        |
| `shift + ctrl + X`          | Map reset (empty all data)                                          |
| `shift + ctrl + Y`          | Edges metric value ON/OFF                                           |
| `shift + ctrl + left/right` | Rotate the layout -/+1° (-/+10° with alt)                           |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/map
