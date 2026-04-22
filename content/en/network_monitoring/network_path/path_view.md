---
title: Path View
description: Investigate the Network Path - Path View 
further_reading:
- link: "/network_monitoring/network_path/setup"
  tag: "Documentation"
  text: "Setup Network Path"
- link: "https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/"
  tag: "Blog"
  text: "Monitor cloud architecture and app dependencies with Datadog NPM"
---

## Overview 

The Path View section in Network Path allows for detailed examination of a particular route, assisting in resolving potential problems that might occur from the source to the destination. It offers comprehensive data on both end-to-end latency and packet loss throughout the route.

To access the path view page, click into a path from the [List view][2]. On this page, you have the ability to change the latency threshold colors, and view the status of each hop.

{{< img src="network_performance_monitoring/network_path/network_path_view_5.png" alt="Network Path view showing a reachable destination with 0% packet loss, 103ms latency, and latency and reachability history" >}}

Click any path from the hop between the source to the destination to observe additional details such as `Hop TTL`, `Hop Latency`, and `Traversed count`. Then, click **View Device Details** to navigate to the Device details in [NDM][3] for the selected device.

{{< img src="network_performance_monitoring/network_path/path_details.png" alt="Path view in Network path highlighting path details." style="width:30%;" >}}

## Legend

The legend provides additional details about the status of each hop.

{{< img src="network_performance_monitoring/network_path/legend.png" alt="Path view in Network path showing the legend." style="width:30%;" >}}

Traversal count 
: Number of `traceroutes` that have ran through the hop.

Traversal completion 
: Represents whether or not the `traceroute` was able to successfully reach the destination.

Reachability
: The level of packet loss the destination is experiencing.

Latency 
: How long the `traceroute` took to get from a source to its destination.

**Note**: Hop-to-hop latency may show `N/A` for hops that were incomplete.

## Health bar

Drag the latency reachability health bar to observe a snapshot of the end-to-end latency and end-to-end packet loss for a specific time interval along the path.

**Note**: Changing the health bar does not affect the global time range at the top of the page.

{{< img src="network_performance_monitoring/network_path/latency_health_bar_3.mp4" alt="Video of the network path, selecting the latency health bar and dragging to a time period." video="true" >}}

## Visual comparison

Use the visual comparison view to compare two path visualizations side-by-side and identify what changed before and after an incident.

The comparison view provides:

- Side-by-side snapshots of the same Network Path across different time frames.
- Side-by-side snapshots of two different Network Paths (different source and destination pairs).
- A vertical layout that highlights the delta between the two queries.
- Automatic identification of common and unique hops.
- An overlaid timeseries graph comparing RTT latency, packet loss, jitter, and hop count.

{{< img src="network_performance_monitoring/network_path/visual_comparison_paths_2.png" alt="Visual Comparison view showing path A with a reachable destination above path B with an unreachable destination, and an RTT latency timeline across the top" style="width:100%;" >}}

### Open the comparison view

To open the comparison view, click **Compare** near the time range controls on the Network Path view. By default, the view populates with your previously selected time range and compares it to the preceding equivalent time block. For example, a 3-hour range is compared to the previous 3-hour range. Use the top controls to adjust the compared time ranges.

### Navigate the comparison

Navigate the split paths independently using the zoom controls, the minimap, or by holding ⌘/Ctrl and scrolling with your mouse.

Click **Inspect** on a shared hop to open a sidebar detailing the metadata and confirming that the hop is present in both views. Unique hops are wrapped in a distinct color to indicate that they exist in only one view.

The **Analysis** tab provides a side-by-side, hop-by-hop breakdown of packets and RTT latency for each time range.

{{< img src="network_performance_monitoring/network_path/network_path_analysis_comparison.png" alt="Analysis tab of the Visual Comparison view showing a side-by-side Hop RTT Latency table for paths A and B" style="width:100%;" >}}

## Graphs

The lower section of the path view page provides additional insights about each path through a series of graphs.  

### End-to-end metrics graph

The end-to-end metrics graph presents a visual representation of both the end-to-end latency and end-to-end packet loss for each path, allowing you to compare and analyze them effectively.


{{< img src="network_performance_monitoring/network_path/end-to-end-metrics-graph.png" alt="Path view page showing the end-to-end-metrics graph." >}}

### Hop-to-hop latency graph

The hop-to-hop latency graph provides a detailed view of the latency for each hop along the path, making it easier to identify potential bottlenecks or problem areas.


{{< img src="network_performance_monitoring/network_path/hop-to-hop-latency-graph_3.png" alt="Path view page showing the hop-to-hop-latency graph." >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /network_monitoring/network_path/list_view
[3]: /network_monitoring/devices