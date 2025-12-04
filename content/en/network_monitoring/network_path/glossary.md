---
title: Network Path Terms and Concepts
description: Glossary for Network Path
further_reading:
    - link: '/network_monitoring/cloud_network_monitoring/setup/'
      tag: 'Documentation'
      text: 'Setting Up Cloud Network Monitoring'
    - link: '/network_monitoring/cloud_network_monitoring/tags_reference/'
      tag: 'Documentation'
      text: 'CNM Tags Reference'
    - link: '/monitors/types/cloud_network_monitoring/'
      tag: 'Documentation'
      text: 'CNM Monitors and Alerts'
---

## Network Path

Network Path provides hop-by-hop visibility into the route between a source and destination, helping you identify where latency, packet loss, or routing changes occur.

## Terminology
| Concept                                 | Description                                                                                                                                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Network Path][6]**                        | Network Path provides hop-by-hop visibility into the route between a source and a destination, so you can identify where latency, packet loss, or routing changes occur. |
| **Autonomous System (AS / ASN)**        | A collection of IP routing prefixes managed by a single network operator. Network Path groups hops by Autonomous System (AS) or Autonomous System Number (ASN) to show routing domains along the path.      
| **[Path View][7]**                           | The Network Path visualization that displays each hop, grouped by Autonomous System Number (ASN), region, or network, along with probe status and hop metrics.                                                             |
| **Hop**                                 | A network node along a route between source and destination, identified by IP address and associated metadata (ASN, cloud region, provider).                                                                  |                                                      |
| **Source**                              | The starting point of a Network Path probe, typically an Agent-monitored host or container running the Datadog network monitoring tracer.                                                                     |
| **Destination**                         | The endpoint that the Network Path probe is targeting, such as a service, public endpoint, or domain.                                                                                                         |
| **Traceroute** | The mechanism that Network Path uses to determine intermediate hops and latency. CNM sends controlled probes, similar to traceroute, to discover each hop on the route.                                                         |
| **Latency per hop**                     | The round-trip time between the probe source and each hop. This helps identify slow or congested nodes.                                                                                                            |
| **Packet loss per hop**                 | The percentage of probe packets dropped before reaching or returning from a hop, useful for diagnosing reliability issues.                                                                                    |

### Path View
| Concept                             |  Description                                                                                                                                                                                              |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Aggregated hop**                  | A group of multiple identical hops (same IP, ASN, region), collapsed into a single representation to simplify visualization.                                                                                          |
| **ICMP timeout or no response**      | A hop where no ICMP response was received. Often appears as a gray or unknown hop in the Path View.                                                                                                                   |
| **Missing hop**                     | A point in the path where the probe cannot identify a network node, often due to firewall filtering, ICMP rate limits, or private routing. Displayed as a dashed or empty hop.                                        |
| **Path change indicator**           | A visual marker that shows when the observed route changes over time, for example an AS shift or a new hop.                                                                          |
| **AS grouping**                     | The cluster of hops belonging to the same Autonomous System, helping identify which network operator controls each segment of the path.                                                                               |
| **Region grouping**                 | The cluster of hops located within the same cloud region or geographic region. Helpful for identifying inter-regional routing.   
| **Start node**                      | The initial node (source) where the probe begins. Represented at the far left of the Path View.                                                                                       |
| **End node**                        | The destination node where the probe terminates. Represented at the far right of the Path View.                                                                                                                       |
| **Hop status indicator**            | The icon or color indicating whether the hop is healthy, degraded, or unreachable, based on latency and loss.                       |
| **Probe status**                    | Shows whether the probe reached a hop successfully, partially, or not at all. This helps you identify where traffic stops or degrades.              |                                             |
| **Traversed count**                 | Represents the number of traceroute active probing packets received by reach hop. Higher counts suggest that the hop is consistently part of the route; lower counts may indicate path instability. |
| **Traversal completion**            | Represents whether or not the traceroute was able to successfully reach the destination. |
| **Reachability**                    | The level of packet loss the destination is experiencing. |
| **Latency**                         | How long the traceroute took to get from a source to its destination. |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[6]: /network_monitoring/network_path/
[7]: /network_monitoring/network_path/path_view