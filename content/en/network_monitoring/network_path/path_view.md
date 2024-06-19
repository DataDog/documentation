---
title: Path View
kind: documentation
description: Investigate the Network Path - Path View 
further_reading:
- link: "https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/"
  tag: "Blog"
  text: "Monitor cloud architecture and app dependencies with Datadog NPM"
- link: "https://www.datadoghq.com/blog/network-performance-monitoring"
  tag: "Blog"
  text: "Network Performance Monitoring"
  tag: "Blog"
  text: "Monitor cloud endpoint health with cloud service autodetection"
---


## Overview 

The Path View section in [Network Path][1] allows for detailed examination of a particular route, assisting in resolving potential problems that might occur from the starting point to the endpoint. It offers comprehensive data on both end-to-end latency and packet loss throughout the route.

To access the path view page, click into a path from the [List view][2]. On this page, you have the ability to change the latency edge thickness and color, and observe the status of each path.

{{< img src="network_performance_monitoring/network_path/path_view_2.png" alt="Path view in Network path highlighting a path selected from source to destination" >}}

Click any path from the source to the destination to observe additional details such as `Hop TTL`, `Hop Latency`, and `Traversed count`. Then, click **View Device Details** to navigate to the Device details page for the selected device.

{{< img src="network_performance_monitoring/network_path/path_details.png" alt="Path view in Network path highlighting path details." >}}

## Health bar

Drag the latency reachability health bar to observe a snapshot of the end-to-end latency and end-to-end packet loss for a specific time interval along the path.

**Note**: Changing the health bar does not affect the global time range at the top of the page.

{{< img src="network_performance_monitoring/network_path/latency_health_bar.mp4" alt="Video of the network path, selecting the latency health bar and dragging to a time period." video="true" >}}

## Graphs

The lower section of the path view page provides additional insights about each path through a series of graphs.  

### End-to-end metrics graph

The end-to-end metrics graph presents a visual representation of both the end-to-end latency and end-to-end packet loss for each path, allowing you to compare and analyze them effectively.


{{< img src="network_performance_monitoring/network_path/end-to-end-metrics-graph.png" alt="Path view page showing the end-to-end-metrics graph." >}}

### Hop-to-hop latency graph

The hop-to-hop latency graph provides a detailed view of the latency for each hop along the path, making it easier to identify potential bottlenecks or problem areas.


{{< img src="network_performance_monitoring/network_path/hop-to-hop-latency-graph.png" alt="Path view page showing the hop-to-hop-latency graph." >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /network_monitoring/network_path/list_view