---
title: CNM Terms and Concepts
description: Glossary for Cloud Network Monitoring (CNM)
further_reading:
    - link: 'https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/'
      tag: 'Knowledge Center'
      text: 'SNMP Monitoring Overview'
---

## Overview

Cloud Network Monitoring (CNM) provides end-to-end visibility into network communication across services, containers, hosts, and cloud environments. It aggregates connection-level data into meaningful service-to-service dependencies, helping you analyze traffic patterns, troubleshoot latency and connectivity issues, and monitor the health of your applications.

## Terminology

| Concept                                                 | Description                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cloud Network Monitoring (CNM)**                      | Cloud Network Monitoring (CNM) provides visibility into network traffic between services, containers, availability zones, and other tags in Datadog, aggregating raw connection-level data (IP, port, PID) into application-layer dependencies between client and server endpoints.  |
| **Flow data**                                           | The low-level data collected by CNM (connections at IP, port, PID levels) that CNM uses to build higher-level representations of network dependencies and traffic flow.                                                                                                                     |
| **[Network Health][1]**                                      |  Displays the overall health of network connections, surfacing connectivity problems and degraded network performance across hosts and services. |
| **[Network Analytics][2]**          | A CNM view that lets you graph and analyze network data between each client and server based on grouping tags, so you can investigate traffic patterns, dependencies, or anomalies.  |
| **[Network Map][3]**                                         | A visualization view in CNM that maps network data between tags such as services, containers, and zones, showing how different endpoints communicate.  |
| **[CNM Monitor][4]**              | A Datadog monitor that alerts when a CNM (TCP network) metric crosses a user-defined threshold, for example network throughput between a specific client and server.                    |
| **[CNM Tags][5]**                               | CNM uses tags to group and display traffic, for example, service-to-service or zone-to-zone communication.                                           |

## Network Path

Network Path provides hop-by-hop visibility into the route between a source and destination, helping you identify where latency, packet loss, or routing changes occur.
| Concept                                 | Description                                                                                                                                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Network Path][6]**                        | Network Path provides hop-by-hop visibility into the route between a source and a destination, so you can identify where latency, packet loss, or routing changes occur. |
| **Autonomous System (AS / ASN)**        | A collection of IP routing prefixes managed by a single network operator. Network Path groups hops by Autonomous System (AS) or Autonomous System Number (ASN) to show routing domains along the path.      
| **[Path View][7]**                           | The Network Path visualization that displays each hop, grouped by Autonomous System Number (ASN), region, or network, along with probe status and hop metrics.                                                             |
| **Hop**                                 | A network node along a route between source and destination, identified by IP address and associated metadata (ASN, cloud region, provider).                                                                  |                                                      |
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

[1]: /network_monitoring/cloud_network_monitoring/network_health/
[2]: /network_monitoring/cloud_network_monitoring/network_analytics/
[3]: /network_monitoring/cloud_network_monitoring/network_map/
[4]: /monitors/types/cloud_network_monitoring/
[5]: /network_monitoring/cloud_network_monitoring/tags_reference/
[6]: /network_monitoring/cloud_network_monitoring/network_path/
[7]: /network_monitoring/cloud_network_monitoring/network_path/path_view