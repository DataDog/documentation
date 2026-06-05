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

The Autonomous Systems (AS) View provides visibility into the network providers and Internet Service Providers that carry your traffic across the BGP (Border Gateway Protocol) routing layer. This view monitors latency and performance metrics for every AS in your network paths, helping you pinpoint exactly which upstream providers are experiencing issues when your network performance degrades.

BGP routing issues and provider-specific problems are difficult to diagnose because they sit outside your direct control. The AS View makes these invisible layers visible, giving you the data to answer questions like "Is this a peering issue?" or "Did our traffic shift to a different transit provider?" without manually tracing routes or parsing BGP tables.

Select [**Autonomous Systems (AS)**][1] in the [Network Path Explorer][2] to get started. 

## Dashboard

The dashboard surfaces performance data through several lenses:

### Global blast radius

The global blast radius map shows average latency by country over the selected time frame. Click any country on the map to filter the [Autonomous Systems list](#autonomous-systems-table).

### Traffic categories
The traffic categories panel shows whether your traffic primarily flows through hosting providers or traditional ISPs.

### Traffic distribution
The traffic distribution panel breaks down what percentage of your paths traverse each region. 

### Need Attention

The Need Attention section automatically flags ASes with latency spikes or performance anomalies, ranking them by severity so you know where to focus your investigation. Select an AS from the list to view its [details](#autonomous-system-details).

## Autonomous Systems table

The detailed AS table provides operational data for troubleshooting: which prefixes each AS announces, how many of your monitored paths traverse that AS, and what specific issues have been detected (latency spikes, routing changes, or connectivity problems). When a customer reports degraded performance, you can quickly determine whether the issue originates with your infrastructure, a specific transit provider, or a last-mile ISP—critical information for escalating to the right team or vendor.

The AS table shows the Autonomous Systems that your monitored network paths go through. Each row includes:

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

