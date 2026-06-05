---
title: Autonomous Systems View
description: Investigate the Network Path Autonomous Systems View
is_beta: true
further_reading:
- link: "/network_monitoring/network_path/list_view"
  tag: "Documentation"
  text: "Learn more about the List View in Network Path"
- link: "/network_monitoring/network_path/path_view"
  tag: "Documentation"
  text: "Learn more about the Path View in Network Path"
- link: "/network_monitoring/network_path/glossary"
  tag: "Documentation"
  text: "Network Path terms and concepts"
- link: "/network_monitoring/network_path/setup"
  tag: "Documentation"
  text: "Setup Network Path"
---

## Overview

The Autonomous Systems (AS) View shows which Autonomous Systems carry your Network Path traffic, and how traffic flows between them. Use this view to identify which service providers handle your traffic and to examine the upstream and downstream relationships between Autonomous Systems.

 Suboptimal Border Gateway Patrol (BGP) routes and issues with specific providers are often the root cause of performance degradation. The Autonomous Systems (AS) View maps BGP relationships for the Autonomous Systems in your paths, providing detailed insight into issue origination.

Select [**Autonomous Systems (AS)**][1] in the [Network Path Explorer][2] to get started. 

## Summary section

The Summary section includes an overview of global traffic, including blast radius, traffic categories, and traffic distribution by region.

### Global blast radius

The global blast radius map shows average latency by country over the selected time frame. Click any country on the map to filter the [Autonomous Systems list](#autonomous-systems-list).

## Need Attention

The Need Attention section shows Autonomous Systems with the highest average latency over the selected time frame. Select an AS from the list to view its [details](#autonomous-system-details).

## Autonomous Systems list

The Autonomous Systems list shows the Autonomous Systems that your monitored network paths go through. Each row includes:

ASN
: The Autonomous System Number.

Name
: The name of the service provider that operates the AS.

Country
: The countries where traffic is observed for the AS.

Prefixes Monitored
: The IP prefixes observed for the AS across your monitored paths.

Tests Found
: The number of tests traversing the AS.

Issues Detected
: Issues observed for the AS, such as latency spikes or packet loss.

Use the filter controls above the list to narrow the results by **AS Number**, **Country**, **Category**, or **Issues Detected**.

## Autonomous System details

Click an Autonomous System in the list to open its details. The detail view includes a **Traffic** tab, a **Neighbors** tab, and a path list.

### Traffic

The **Traffic** tab shows a relational diagram of traffic flowing from **Upstream** sources through the selected AS to **Downstream** destinations. Hover over a traffic node to view its aggregate paths and number of occurrences, and click on any AS to filter to its paths in the [path list](#path-list).

### Neighbors

The **Neighbors** tab shows a full visualization of the upstream and downstream Autonomous Systems that neighbor the one you selected. Click on any AS in the graph to filter to its paths in the [path list](#path-list).

### Path list

The path list includes individual paths through the AS, with the following columns:

Source
: The source of the path.

Destination
: The destination of the path.

Tags
: Tags associated with the path.

Avg Reachability
: The percentage of traceroute probes that successfully reached the destination over the selected time period.

Avg RTT
: The average round-trip time for the path.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network-path/autonomous-systems
[2]: hhttps://app.datadoghq.com/network-path

