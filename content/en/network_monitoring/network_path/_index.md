---
title: Network Path
description: Investigate network traffic paths
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-network-path-monitoring/"
  tag: "Blog"
  text: "Get end-to-end network visibility with Datadog Network Path"
- link: "https://www.datadoghq.com/blog/network-path/"
  tag: "Blog"
  text: "Identify slowdowns across your entire network with Datadog Network Path"
- link: "network_monitoring/network_path/glossary"
  tag: "Doc"
  text: "Network Path terms and concepts"
---

## Overview

Network Path illustrates the route that network traffic follows from its origin to its destination. This provides network administrators with the capability to precisely identify the source of network problems, whether they're internal or from an Internet Service Provider (ISP), or due to other issues such as misrouting. Each row signifies a path from a source to its destination, as depicted in the `source` and `destination` facet panel.


{{< img src="network_performance_monitoring/network_path/network_path_view_4.png" alt="Path view in Network path highlighting a path selected from source to destination" >}}

## How it works

Datadog performs a `traceroute` at the host level to illustrate the packet's journey and latency at each hop from a source to its destination. Each host runs its own `traceroute`, and the path shown is a visual representation of this list. Network Path automatically sends either TCP or UDP packets to running applications.

The following diagram depicts the typical flow of a network path from a source (Host) to its destination.

{{< img src="network_performance_monitoring/network_path/network_path_diagram.png" alt="Diagram of how Network path works" >}}

## Next steps

Use the following views and tools to set up Network Path and investigate network performance and connectivity issues:

- [Setup][4]: Setup and configure Network Path on your environments.
- [List View][2]: A comprehensive overview of all monitored network paths, allowing you to detect connectivity issues, analyze performance metrics, and filter for paths that need attention.
- [Path View][3]: A visual display of the network path between a source and destination, enabling you to identify where issues arise, whether within your own infrastructure or with external providers.
- [Traceroute variants][5]: Learn how to use the `traceroute` and `tracert` commands to diagnose and resolve network issues.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /network_monitoring/network_path/list_view
[3]: /network_monitoring/network_path/path_view
[4]: /network_monitoring/network_path/setup
[5]: /network_monitoring/network_path/guide/traceroute_variants
