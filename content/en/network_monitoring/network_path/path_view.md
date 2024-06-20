---
title: Path View
kind: documentation
description: Investigate the Network Path - Path View 
further_reading:
- link: "/network_monitoring/network_path/setup"
  tag: "Documentation"
  text: "Setup Network Path"
- link: "https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/"
  tag: "Blog"
  text: "Monitor cloud architecture and app dependencies with Datadog NPM"
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Network Path for Datadog Network Performance Monitoring is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Network Path for Datadog Network Performance Monitoring is in private beta. Reach out to your Datadog representative to sign up.</div>

## Overview 

The Path View section in Network Path allows for detailed examination of a particular route, assisting in resolving potential problems that might occur from the source to the destination. It offers comprehensive data on both end-to-end latency and packet loss throughout the route.

To access the path view page, click into a path from the [List view][2]. On this page, you have the ability to change the latency threshold colors, and view the status of each hop.

{{< img src="network_performance_monitoring/network_path/path_view_3.png" alt="Path view in Network path highlighting a path selected from source to destination" >}}

Click any path from the hop between the source to the destination to observe additional details such as `Hop TTL`, `Hop Latency`, and `Traversed count`. Then, click **View Device Details** to navigate to the Device details in [NDM][3] for the selected device.

{{< img src="network_performance_monitoring/network_path/path_details.png" alt="Path view in Network path highlighting path details." style="width:50%;" >}}

## Legend

The legend provides additional details about the status of each hop.

{{< img src="network_performance_monitoring/network_path/legend.png" alt="Path view in Network path showing the legend." style="width:50%;" >}}

Traversal count 
: Number of `traceroutes` that have ran through the hop.

Traversal completion 
: Represents whether or not the `traceroute` was able to successfully reach the destination.

Reachability
: The level of packet loss the destination is experiencing.

Latency 
: How long the `traceroute` took to get from a source to its destination.

**Note**: Hop to hop latency may show `N/A` for hops that were incomplete.
## Health bar

Drag the latency reachability health bar to observe a snapshot of the end-to-end latency and end-to-end packet loss for a specific time interval along the path.

**Note**: Changing the health bar does not affect the global time range at the top of the page.

{{< img src="network_performance_monitoring/network_path/latency_health_bar_2.mp4" alt="Video of the network path, selecting the latency health bar and dragging to a time period." video="true" >}}

## Graphs

The lower section of the path view page provides additional insights about each path through a series of graphs.  

### End-to-end metrics graph

The end-to-end metrics graph presents a visual representation of both the end-to-end latency and end-to-end packet loss for each path, allowing you to compare and analyze them effectively.


{{< img src="network_performance_monitoring/network_path/end-to-end-metrics-graph.png" alt="Path view page showing the end-to-end-metrics graph." >}}

### Hop-to-hop latency graph

The hop-to-hop latency graph provides a detailed view of the latency for each hop along the path, making it easier to identify potential bottlenecks or problem areas.


{{< img src="network_performance_monitoring/network_path/hop-to-hop-latency-graph_2.png" alt="Path view page showing the hop-to-hop-latency graph." >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /network_monitoring/network_path/list_view
[3]: /network_monitoring/devices