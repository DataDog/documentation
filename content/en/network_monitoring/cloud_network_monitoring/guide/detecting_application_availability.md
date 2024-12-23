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

When applications rely on each other, poor connectivity or slow service calls can cause errors and latency at the application layer. Datadog's Cloud Network Monitoring (CNM) offers actionable insights for resolving application and network issues by capturing, analyzing, and correlating network metrics such as latency, packet loss, and throughput across various applications and services.

## Discovery of services and connectivity

CNM is designed to track traffic between entities, determine which resources are communicating, and report their health status.

To examine the a basic traffic flow between entities, take the following steps:

1. On the [Network Analytics page][1], set your **View clients as** and **View servers as** dropdown filters to group by `service` tags to examine a service-to-service flow. Here you can observe the basic traffic unit: a source IP communicating over a port to a destination IP on a port.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_service_service.png" alt="CNM analytics page, grouping by service to service with Client and Server IP highlighted">}}

   Each row aggregates 5 minutes' worth of connections. While you might recognize some IPs as specific addresses or hosts, depending on your network familiarity, this becomes challenging with larger, more complex networks. The most relevant aggregation level involves correlating each host or container associated with these IPs to tags in Datadog, such as `service`, `availability zone`, `pod`, and more, as shown in the following example.

2. Narrow down your search results using filters. For example, to view the network traffic for all of your `orders-sqlserver*` pods by host and availability zone, use the `client_pod_name:orders-sqlserver*` filter:

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_host_az.png" alt="CNM analytics page, grouping by host and availability zone for specific client pod name">}}

This first step enables you to monitor your most complex networks and being gaining insights into the connections between endpoints in your environment, such as VMs, containers, services, cloud regions, data centers, and more.

### Service-to-service dependency tracking

CNM tracks dependencies between services, which is essential for ensuring system performance. It helps verify important connections and highlights traffic volumes, ensuring all critical dependencies are operational.

For example, a possible cause of service latency could be too much traffic being directed to a destination endpoint, overwhelming its ability to handle incoming requests effectively.

To analyze the cause of service latency, take the following steps:

1. On the [Network Analytics][1] page, aggregate traffic by `service`, and filter for the cloud region where you may be noticing alerts or service latency. This view displays all service-to-service dependency paths within that region. 

2. Sort the dependency table based on retransmits or latency, to identify connections with the most significant performance degradation. For instance, if you notice an unusually high number of TCP established connections alongside spikes in retransmits and latency, it may indicate that the source is overwhelming the destination's infrastructure with requests.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_service_region_retransmits.png" alt="CNM analytics page, grouping by service and region for specific cloud region">}}

3. Click one of the traffic paths on this page to open the side panel. The side panel provides more detailed telemetry to help you further debug your network dependencies. 

4. While on the side panel view, check the **Flows** tab to determine if the communication protocol is TCP or UDP, and review metrics like RTT, Jitter, and packets sent and received. If you're investigating a high retransmit count, this information can help you identify the cause.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_sidepanel_flows.png" alt="Side panel of a traffic flow, highlighting the Flows tab">}}

## Insight into network traffic 

Datadog CNM consolidates relevant distributed traces, logs, and infrastructure data into a single view, allowing you to identify and trace issues back to the originating request from an application.

In the example below, check the **Traces** tab under Network Analytics to view distributed traces of requests between source and destination endpoints, which can help you pinpoint where application-level errors occur.

To identify if an issue is an application or network issue, take can use the following steps:

1. Navigate to [**Infrastructure** > **Cloud Network** > **Analytics**][1].  
2. In the **Summary** graphs, click a line of communication that has a lot of volume and high RTT time:

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_isolate_series.png" alt="CNM analytics page, clicking on a path with high RTT Time">}}

3. Click **Isolate this series**. This opens a page that allows you to observe the network traffic only on this line of communication.
4. While on this page, click into one of the network communications paths, then click the **Flows** tab to observe RTT time:

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_sidepanel_rtt.png" alt="CNM sidepanel, highlighting the RTT time column">}}

   On this page, CNM correlates network metric round-trip time (RTT) with application request latency, to help identify if the issue is a network or application issue. In this particular example, observe that the RTT time is slightly high but has come down over time and needs to be investigated further.  
     
5. On this same page, click the **Traces** tab and investigate the **Duration** column: 

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_traces_duration.png" alt="CNM sidepanel, highlighting the Traces tab and duration column">}}

   Observe that although network latency (RTT) is high, the application request latency (Duration) is normal, so in this case, the issue is likely network-related, and there's no need to investigate the app code. 

   Conversely, *if network latency is stable but application latency (Duration) is high*, the problem likely stems from the app, and you can explore code-level traces by clicking on one of the service paths in the **Traces** tab to find the root cause, which takes you to the APM flame graph relative to this service:

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_apm_traces.png" alt="APM flame graph screenshot after clicking on a service from the CNM sidepanel traces tab">}}

### Network Map

The [Network Map][2] in Datadog provides a visual representation of your network topology, helping identify partitions, dependencies, and bottlenecks. It consolidates network data into a directional map, making it easier to isolate problematic areas. Additionally, it visualizes network traffic between any tagged object in your environment, from `services` to `pods` to `cloud regions`.

For complex networks in large containerized environments, Datadog's Network Map simplifies your troubleshooting by using directional arrows, or edges, to visualize real-time traffic flows between containers, pods, and deployments, even as containers change. This allows you to spot inefficiencies and misconfigurations. For example, the map can reveal if Kubernetes pods within the same cluster are communicating through an ingress controller, rather than directly to each other, indicating a misconfiguration that can cause increased latency. 

To identify if there might be a communication problem with your Kubernetes pods and their underlying services, perform the following steps:

1. On the [Network Map][2], set the **View** dropdown to `pod_name`, the **By** dropdown to "Client Availability Zone", and set the **Metric** dropdown to "Volume Sent" (this is the [metric][6] you want your edges to represent):

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_network_map.png" alt="CNM Network Map page showing a clustering example">}}

2. Hover over a node to observe the edges (or directional arrows) to visualize the traffic flow between clusters and availability zones. In this particular example, observe there are edges between all of your pods. If no edges are present, it could represent a misconfiguration issue.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_network_map_node.png" alt="CNM Network Map page showing a clustering example, highlighting a specific node">}}

    The edge thickness is associated with the metric chosen from the drop down. In this particular example, a thicker edge is associated with the metric `volume sent`. Optionally, you can also navigate directly back to the [Network Analytics][1] page by clicking on the dotted edge directly to investigate the network connections further.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_network_map_thicker_edge.png" alt="CNM Network Map page showing a clustering example, highlighting a thicker edge">}}

### Service mesh

Service meshes like [Istio][4] help manage microservice communication, but add complexity to monitoring by introducing layers of abstraction. Datadog CNM simplifies this complexity by visualizing traffic flows across Istio-managed networks and providing full visibility into the Istio environment. Datadog monitors key metrics like bandwidth and request performance, logs control plane health, and traces application requests across the mesh.

Additionally, Datadog supports [Envoy][5] monitoring, correlating Istio data with the Envoy proxy mesh. Since traffic is routed through Envoy sidecars, Datadog tags them as containers, allowing users to identify and diagnose latency issues between pods and determine if they're related to the service mesh.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/service_mesh_edit_2.png" alt="CNM Network Map page showing a service mesh example">}}


## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map
[3]: https://docs.datadoghq.com/network_monitoring/performance/network_map/#map-clusters
[4]: https://istio.io/
[5]: https://istio.io/latest/docs/ops/deployment/architecture/#envoy
[6]: /network_monitoring/cloud_network_monitoring/network_map/#usage