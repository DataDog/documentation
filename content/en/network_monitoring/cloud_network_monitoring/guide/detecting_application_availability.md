---
title: Detecting Application Availability using Network Insights
description: Use CNM to detect application availability
further_reading:
    - link: 'https://www.datadoghq.com/blog/apm-cnm-application-debugging/'
      tag: 'Blog'
      text: 'Debug application issues with APM and Cloud Network Monitoring'
    - link: 'https://www.datadoghq.com/blog/cnm-best-practices/'
      tag: 'Blog'
      text: 'Best practices for getting started with Datadog Cloud Network Monitoring'
    - link: 'https://www.datadoghq.com/blog/monitor-containers-with-cnm/'
      tag: 'Blog'
      text: 'How to monitor containerized and service-meshed network communication with Datadog CNM'     
---

## Overview

When applications depend on each other, poor connectivity or slow service calls can lead to errors and latency that appear at the application layer. Identifying whether the issue is a network problem or a code-level bug can be challenging with visibility into only one layer.

Datadog CNM addresses this by correlating monitoring data from both the network and application layers. For example, if high TCP retransmits are detected in a specific availability zone, you can access logs, traces, and processes to identify the root cause, such as a CPU-saturating process, without leaving the network view.

## Service discovery and connectivity

CNM is designed to track traffic between entities and determine which resources are communicating and their health status.

To examine the a simple traffic flow between entities, use the following steps:

1. On the [Network Analytics page](https://app.datadoghq.com/network), set your **View clients as** and **View servers as** dropdown filters to group by `service` tags to examine a service-to-service flow, where you'll notice the basic traffic unit: a source IP communicating over a port to a destination IP on a port.

<screen shot>

Each row aggregates 5 minutes' worth of connections. While you might recognize some IPs as specific addresses or hosts depending on your network familiarity, this becomes challenging with larger, more complex networks. Therefore, the most meaningful aggregation level is rolling up the host or container associated with these IPs to tags in Datadog, such as service, availability zone, pod, and so forth.

2. To view the network traffic for all of your orders-sqlserver* pods by host and AZ, use the following filters to narrow down your search results:

<screen shot>

This initial step allows you to begin monitoring your most complex networks and start gaining insights between endpoints in your environment, including VMs, containers, services, cloud regions or datacenters, and much more.

### Service-to-Service dependency tracking

CNM tracks dependencies between services, which is essential for ensuring system performance. It helps verify important connections and highlights traffic volumes, ensuring all critical dependencies are operational.

For example, a possible cause of service latency could be too much traffic being directed to a destination endpoint, overwhelming its ability to handle incoming requests effectively.

To analyze the cause of service latency, use the following steps:

1. On the [Network Analytics](https://app.datadoghq.com/network?query=&clientService=orders-app&destG=core_network.server.auto_grouping_tags&env=%2A&filter_from=20190&filter_to=139698332917&netviz=sent_vol%3A%3A%2Ctcp_r_pct%3A%3A%2Crtt%3A%3A&refresh_mode=paused&serverService=&showGraphs=true&showRQ=false&srcG=core_network.client.auto_grouping_tags&stream_sort=timestamp%2Cdesc&team=%2A&from_ts=1732661879737&to_ts=1732662779737&live=true) page, aggregate traffic by `service`, and filter for the cloud region where you may be noticing alerts or service latency. This view displays all service-to-service dependency paths within that region. 

2. Sort the dependency table based on retransmits or latency, to identify connections with the most significant performance degradation. For instance, if you notice an unusually high number of TCP established connections alongside spikes in retransmits and latency, it may indicate that the source is overwhelming the destination's infrastructure with requests.

<screen shot>

3. Click into one of the traffic paths on this page to open the sidepanel. This provides more detailed telemetry to help you further debug your network dependencies. 

Here we can see on the Flows tab if the communication protocol is TCP or UDP, and view other metrics such as RTT, Jitter, and packets sent and received to further isolate the cause of high retransmit count.

<screen shot>

## Visibility into network traffic 

Datadog CNM consolidates relevant distributed traces, logs, and infrastructure data into a single view, allowing you to identify and trace issues back to the originating request from an application.

In the following example, we'll take a closer look at the Traces tab under Network Analytics, which displays distributed traces for requests moving between source and destination endpoints, enabling you to pinpoint where application-level errors occur. 

To identify if an issue is an Application or Network issue, you can use the following steps:

<screen shot>    

1. Navigate to [Infrastructure \> Cloud Network \> Analytics](https://app.datadoghq.com/network?showGraphs=true&showRQ=false)  
2. In the Summary graphs, click a line of communication that has a lot of volume and high RTT time:

<screen shot>

3. Click **Isolate this series**  
4. Click into this path and click on the Flows tab to observe RTT time:

<screen shot>

5. On this page, NPM correlates network metric round-trip time (RTT) with application request latency, to help us identify if the issue is a network or application issue. In this particular example, we see that the RTT time is slightly high but has come down over time and needs to be investigated further.  
     
6. On this same page, click the Traces tab and investigate the Duration column: 

<screen shot>

 We can see here that although network latency (RTT) is high, the application request latency (Duration) is normal, so in this case, the issue is likely network-related, and there's no need to investigate the app code. 

Conversely, *if network latency is stable but application latency (Duration) is high*, the problem likely stems from the app, and you can explore code-level traces to find the root cause:

<screen shot>

### Network map

The [Network map](https://app.datadoghq.com/network/map?query=&clientService=orders-app&cluster=loadbalancer&destG=core_network.server.auto_grouping_tags&env=%2A&filter_from=20190&filter_to=139698332917&highlight=true&netviz=sent_vol%3A%3A%2Ctcp_r_pct%3A%3A%2Crtt%3A%3A&refresh_mode=paused&serverService=&srcG=core_network.client.auto_grouping_tags&stream_sort=timestamp%2Cdesc&team=%2A&from_ts=1732661879737&to_ts=1732662779737&live=false) in Datadog provides a visual representation of your network topology, helping identify partitions, dependencies, and bottlenecks. It consolidates network data into a directional map, making it easier to isolate problematic areas.

Containers, for example, are efficient, portable, and scalable, but their complex, distributed, and ephemeral nature comes with challenges, particularly for tracking network traffic. Datadog’s [Network Map](https://docs.datadoghq.com/network_monitoring/performance/network_map/#map-clusters) simplifies this by visualizing real-time traffic flows between containers, pods, and deployments, even as containers change. This allows users to spot inefficiencies and misconfigurations. For example, the map can reveal if Kubernetes pods within the same cluster are communicating through an ingress controller, indicating misconfiguration that can cause increased latency.  

<add some steps and screen shot>

### Service mesh

Service meshes like Istio help manage microservice communication but add complexity to monitoring by introducing layers of abstraction. Datadog CNM simplifies this by visualizing traffic flows across Istio-managed networks and providing full visibility into the Istio environment. Datadog monitors key metrics like bandwidth and request performance, logs control plane health, and traces application requests across the mesh.

Additionally, Datadog supports Envoy monitoring, correlating Istio data with the Envoy proxy mesh. Since traffic is routed through Envoy sidecars, Datadog tags them as containers, allowing users to identify and diagnose latency issues between pods and determine if they're related to the service mesh.

# Summary

By setting up CNM, organizations can monitor and improve network performance, ensure reliable service communication, reduce costs, and resolve issues more efficiently.


## Further Reading
{{< partial name="whats-next/whats-next.html" >}}