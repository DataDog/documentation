---
title: CNM Terms and Concepts
description: Glossary for Cloud Network Monitoring (CNM)
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
    - link: '/network_monitoring/network_path/glossary'
      tag: 'Documentation'
      text: 'Network Path Terms and Concepts'
---

## Overview

Cloud Network Monitoring (CNM) provides end-to-end visibility into network communication across services, containers, hosts, and cloud environments. It aggregates connection-level data into meaningful service-to-service dependencies, helping you analyze traffic patterns, troubleshoot latency and connectivity issues, and monitor the health of your applications.

For additional definitions and descriptions of important CNM terms such as _policy based routing_, see the [main Glossary][6]. 

## Terminology

| Concept                                                 | Description                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cloud Network Monitoring (CNM)**                      | Cloud Network Monitoring (CNM) provides visibility into network traffic between services, containers, availability zones, and other tags in Datadog, aggregating raw connection-level data (IP, port, PID) into application-layer dependencies between client and server endpoints.  |
| **Flow data**                                           | The low-level data collected by CNM (connections at IP, port, PID levels) that CNM uses to build higher-level representations of network dependencies and traffic flow.                                                                                                                     |
| **Network Address Translation (NAT)**                   | A method for remapping one IP address to another. This allows multiple devices on a private network to share a single public IP address to connect to the internet. |
| **[Network Health][1]**                                      |  Displays the overall health of network connections, surfacing connectivity problems and degraded network performance across hosts and services. |
| **[Network Analytics][2]**          | A CNM view that lets you graph and analyze network data between each client and server based on grouping tags, so you can investigate traffic patterns, dependencies, or anomalies.  |
| **[Network Map][3]**                                         | A visualization view in CNM that maps network data between tags such as `service`, `kube_service`, `short_image`, and `container_name`.  |
| **[CNM Monitor][4]**              | A Datadog monitor that alerts when a CNM (TCP network) metric crosses a user-defined threshold, for example network throughput between a specific client and server.                    |
| **[CNM tags][5]**                               | Tags that CNM uses to group and display traffic, for example, service-to-service or zone-to-zone communication.                                           |
| **[Traffic volume][9] (Bytes Sent and Received)**     | A primary network metric in CNM representing the amount of data transferred between endpoints. Often visualized in the network load section of dashboards or the network analytics page to spot spikes or traffic bottlenecks. |
| **[TCP metrics][8] (Connections, Retransmits, Latency)** | Metrics CNM tracks for TCP flows, including open and closed connections, packet retransmissions, and round-trip time to detect connectivity issues, packet loss, or network congestion. |
| **[Unresolved or NA traffic][10]**                     | Network flows that cannot be associated with defined tags (client or server). Often shown as "unresolved" or "NA," indicating that the origin or destination cannot be identified or grouped meaningfully. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/network_health/
[2]: /network_monitoring/cloud_network_monitoring/network_analytics/
[3]: /network_monitoring/cloud_network_monitoring/network_map/
[4]: /monitors/types/cloud_network_monitoring/
[5]: /network_monitoring/cloud_network_monitoring/tags_reference/
[6]: /glossary/?product=cloud-network-monitoring
[8]: /network_monitoring/cloud_network_monitoring/network_analytics/#tcp
[9]: /network_monitoring/cloud_network_monitoring/network_analytics/#network-load
[10]: /network_monitoring/cloud_network_monitoring/network_analytics/#unresolved-traffic