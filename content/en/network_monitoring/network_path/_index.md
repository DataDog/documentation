---
title: Network Path
kind: documentation
description: Investigate network traffic paths 
is_beta: true
further_reading:
- link: "/network_monitoring/network_path/list_view"
  tag: "Documentation"
  text: "Learn more about the List View in Network Path"
- link: "/network_monitoring/network_path/path_view"
  tag: "Documentation"
  text: "Learn more about the Path View in Network Path"
- link: "/network_monitoring/network_path/setup"
  tag: "Documentation"
  text: "Setup Network Path"
- link: "https://www.datadoghq.com/blog/datadog-network-path-monitoring/"
  tag: "Blog"
  text: "Get end-to-end network visibility with Datadog Network Path"
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Network Path for Datadog Network Performance Monitoring is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Network Path for Datadog Network Performance Monitoring is in private beta. Reach out to your Datadog representative to sign up.</div>

## Overview

Network Path illustrates the route that network traffic follows from its origin to its destination. This provides network administrators with the capability to precisely identify the source of network problems, whether they're internal or from an Internet Service Provider (ISP), or due to other issues such as misrouting. Each row signifies a path from a source to its destination, as depicted in the `source` and `destination` facet panel.

**Note**: [Network Performance Monitoring][2] must be enabled to use Network Path functionality.

{{< img src="network_performance_monitoring/network_path/network_path_default_view_2.png" alt="The Network Path default view, sorting by Datacenter and Un-Grouped Destination" >}}

## How it works

Datadog performs a `traceroute` at the host level to illustrate the packet's journey and latency at each hop from a source to its destination. Each host runs its own `traceroute`, and the path shown is a visual representation of this list. 

The following diagram depicts the typical flow of a network path from a source (Host) to its destination.

{{< img src="network_performance_monitoring/network_path/network_path_diagram.png" alt="Diagram of how Network path works" >}}

**Note**: By default, Datadog executes a `traceroute` every five minutes.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /network_monitoring/performance/