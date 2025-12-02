---
title: CNM Terms and Concepts
description: CNM Glossary
further_reading:
    - link: 'https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/'
      tag: 'Knowledge Center'
      text: 'SNMP Monitoring Overview'
---

## Overview

Cloud Network Monitoring (CNM) provides end-to-end visibility into network communication across services, containers, hosts, and cloud environments. It aggregates connection-level data into meaningful service-to-service dependencies, helping you analyze traffic patterns, troubleshoot latency or connectivity issues, and ensure the health of your cloud-native applications.

## Terminology

| Concept                                                 |Description                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cloud Network Monitoring (CNM)**                      | Cloud Network Monitoring provides visibility into network traffic between services, containers, availability zones, and any other tag in Datadog, aggregating raw connection-level data (IP, port, PID) into application-layer dependencies between client and server endpoints.  |
| **Flow data**                                           | The low-level data collected by CNM (connections at IP, port, PID levels) which CNM uses to build higher-level representations of network dependencies and traffic flow.                                                                                                                     |
| **[Network Health][3]**                                      |  Displays the overall health of network connections, for example surface issues like connectivity problems or degraded network performance across hosts/services. |
| **[Network Analytics][2]**          | The tool within CNM allowing users to graph and analyze network data between each client and server based on chosen grouping tags, enabling investigation of traffic patterns, dependencies, or anomalies.  |
| **[Network Map][1]**                                         | A visualization view in CNM that maps network data between tags (services, containers, zones, etc.), showing how different endpoints communicate.  |
| **[CNM Monitor][4]**              | A type of monitor in Datadog that can alert when a CNM (TCP network) metric crosses a user-defined threshold — e.g., network throughput between a specific client/server.                    |
| **[CNM Tags][5]**                               | Metadata labels (for example, service, container, availability zone, custom tags) that can be used to group client/server endpoints; CNM uses tags to aggregate and display traffic at logical groupings (service-to-service, zone-to-zone, etc.).                                                   |

## Network Path

Network Path provides hop-by-hop visibility into the route between a source and destination, helping you identify where latency, packet loss, or routing changes occur.
| Concept                                 | Description                                                                                                                                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Network Path**                        | A Datadog feature that maps the hop-by-hop route between a source and a destination, helping identify where latency, drops, or routing issues occur. It visualizes each hop, ASN, and region along the route. |
| **Path View**                           | The Network Path visualization that displays each hop, grouped by Autonomous System, region, or network, along with probe status and hop metrics.                                                             |
| **Hop**                                 | A network node along a route between source and destination, identified by IP address and associated metadata (ASN, cloud region, provider).                                                                  |
| **Autonomous System (AS / ASN)**        | A collection of IP routing prefixes managed by a single network operator. Network Path groups hops by ASN to show routing domains along the path.                                                             |
| **Source**                              | The starting point of a Network Path probe, typically an agent-monitored host or container running the Datadog network monitoring tracer.                                                                     |
| **Destination**                         | The endpoint that the Network Path probe is targeting, such as a service, public endpoint, or domain.                                                                                                         |
| **Trace Route / Traceroute-like Probe** | The underlying mechanism Network Path uses to determine intermediate hops and latency. CNM sends controlled probes to discover each hop on the route.                                                         |
| **Latency per Hop**                     | The round-trip time between the probe source and each hop. Helps identify slow or congested nodes.                                                                                                            |
| **Packet Loss per Hop**                 | The percentage of probe packets dropped before reaching or returning from a hop. Useful for diagnosing reliability issues.                                                                                    |

### Path view
| Concept                             |  Description                                                                                                                                                                                              |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Aggregated Hop**                  | A group of multiple identical hops (same IP, ASN, region), collapsed into a single representation to simplify visualization.                                                                                          |
| **ICMP Timeout / No Response**      | A hop where no ICMP response was received. Often appears as a grey or unknown hop in the Path View.                                                                                                                   |
| **Missing Hop**                     | A point in the path where the probe cannot identify a network node, often due to firewall filtering, ICMP rate limits, or private routing. Displayed as a dashed or empty hop.                                        |
| **Path Change Indicator**           | Any visual marker showing that the observed route changed over time (e.g., AS shift or new hop).                                                                                                                      |
| **Provider / Cloud Provider Label** | Labels indicating the network or cloud vendor (AWS, Azure, GCP, ISP) that owns or operates the hop.                                                                                                                   |
| **AS Grouping**                     | The cluster of hops belonging to the same Autonomous System, helping identify which network operator controls each segment of the path.                                                                               |
| **Region Grouping**                 | The cluster of hops located within the same cloud region or geographic region. Helpful for identifying inter-regional routing.                                                                                        |
| **End Node**                        | The destination node where the probe terminates. Represented at the far right of the Path View.                                                                                                                       |
| **Hop Status Indicator**            | The icon or color indicating the hop’s health — healthy, degraded, or unreachable — based on latency and loss.                                                                                                        |
| **Start Node**                      | The initial node (source) where the probe begins. Represented at the far left of the Path View.                                                                                                                       |
| **Traversed Count**                 | The number of times a hop appears across all collected route samples during the selected timeframe. Higher counts suggest that the hop is consistently part of the route; lower counts may indicate path instability. |
| **Probe Status**                    | Visual indication showing whether the probe reached a hop successfully (success), partially (partial/unknown), or failed. Helps identify where traffic stops or degrades.                                             |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/network_map/
[2]: /network_monitoring/cloud_network_monitoring/network_analytics/
[3]: /network_monitoring/cloud_network_monitoring/network_health/
[4]: /monitors/types/cloud_network_monitoring/
[5]: /network_monitoring/cloud_network_monitoring/tags_reference/