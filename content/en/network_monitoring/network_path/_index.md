---
title: Network Path
kind: documentation
description: Investigate network traffic paths 
further_reading:
- link: "/network_monitoring/network_path/list_view"
  tag: "Doc"
  text: "Learn more about the List View in Network Path"
- link: "/network_monitoring/network_path/list_view"
  tag: "Doc"
  text: "Learn more about the Path View in Network Path"
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Network Path for Datadog Network Performance Monitoring is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-warning">Network Path for Datadog Network Performance Monitoring is in private beta. Reach out to your Account Representative to sign up.</div>

## Overview

Network Path displays the path that traffic takes through the network, from one point to another. This provides network administrators with the capability to precisely identify the origin of network problems, whether they're internal or from an Internet Service Provider (ISP), or due to other issues such as mis-routing. Each row signifies a route from a source to a destination, as depicted in the `source` and `destination` facet panel.

{{< img src="network_performance_monitoring/network_path/network_path_default_view.png" alt="The Network Path default view, sorting by Datacenter and Un-Grouped Destination" >}}

## How it works

At the host level, Datadog execute a `traceroute` to depict the hops a packet takes to reach its destination. Through the `traceroute`, Datadog collects hops as well as the latency at each hop. Every host runs its own `traceroute`, and the path is a visual representation of this list. 


{{< img src="network_performance_monitoring/network_path/network_path.png" alt="Diagram of how Network path works" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}