---
title: Network Path
kind: documentation
description: Investigate network traffic paths 
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

<div class="alert alert-warning">Network Path for Datadog Network Performance Monitoring is in private beta.</div>

## Overview

Network Path shows the hops that traffic takes through the network to get from point A to point B. The value for customers is having the ability to pin-point where your network issues are originating from. (internal to network or ISP, etc). If things are being mis-routed etc. Each row represents a path from a source to a destination. 
Source and destination facet panel.

## How it works

We run a traceroute at the host level, show me the hops a packet would take to reach "google.com". We then show the latency at each hop. Each host is running its own traceroute and the path visualizes the list. each host is running it's own path.

{{< img src="network_performance_monitoring/network_path/network_path.png" alt="Diagram of how Network path works" >}}

### List view

explain how search bar works, grouping by sources, static only toggle, what is a static path. Unreachable and Reachable at top. Build Multi-path Map.

### Path view

Path view page - click into a path goes into the path view page, legend, explain node status (color meaning) and edge color, thickness and stroke (solid/dash). Define all of those.
Explain health bars (end to end latency, end to end packet loss) on that path. 
Then explain the graphs


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}