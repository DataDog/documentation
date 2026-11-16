---
title: L1/L7 Map
description: Visualize how services, containers, pods, hosts, and network paths connect, and narrow an investigation to a specific resource or connection.
further_reading:
  - link: "/network_monitoring/cloud_network_monitoring/setup/"
    tag: "Documentation"
    text: "Set up Cloud Network Monitoring"
  - link: "/network_monitoring/network_path/setup/"
    tag: "Documentation"
    text: "Set up Network Path"
  - link: "/network_monitoring/devices/"
    tag: "Documentation"
    text: "Network Device Monitoring"
  - link: "/network_monitoring/devices/topology/"
    tag: "Documentation"
    text: "Device Topology Map"
site_support_id: network_l1_l7_map
---

{{< callout url="TODO_PREVIEW_FORM_URL" btn_hidden="false" header="Join the Preview!">}}
The L1/L7 Map is in Preview. Complete the form to request access.
{{< /callout >}}

<!-- TODO: All images on this page are placeholders cropped from the staging prototype. Replace them with final demo-org screenshots. -->

<!-- TODO: "L1/L7" is a working name. Update the title, menu entry, and all references when the name is final. -->

<!-- TODO (when final demo-org screenshots arrive): Every bolded UI label on this page comes from the staging prototype. Check each one against the screenshots and update it to match. This includes mode names (Single resource, Source/destination pair), buttons (Filter, Explore, Explore connection, View connection in CNM, View connection in Network Path, View connections, View details, View in APM, View in Kubernetes, Add destination), group and section labels (Upstream, Downstream, Services, Containers, App containers, Sidecar containers, Pods, Hosts, Popular across your network, Related resources, Filtered to, +N more), metric labels (Retransmits, TCP failures, Sent / received, RTT, Reachability, End-to-end latency, Packet loss), and status values (CRITICAL, DOWN, OK, UNREACHABLE). Also confirm the navigation path (Network Monitoring > L1/L7). -->

## Overview

The L1/L7 Map brings application, infrastructure, and network context into one map to help you troubleshoot issues, such as a degraded service or a slow connection between two services. Use the map to see which containers, pods, and hosts a service runs on, which resources it communicates with, and where along the path between two resources a network signal degrades.

The map combines data from Cloud Network Monitoring (CNM), APM, Container Monitoring, Kubernetes, Network Path, and Network Device Monitoring (NDM). After you narrow an investigation to a specific resource or connection, open it in its own product to examine the underlying data.

{{< img src="network_performance_monitoring/l1_l7_map/map-overview.png" alt="The L1/L7 Map in single resource mode, showing a service with its upstream and downstream resources, its composition stack, and the details pane" >}}

## Prerequisites

The L1/L7 Map has no Agent version requirement of its own. It builds the map from data that the following Datadog products collect. Follow the Agent and platform requirements for each product that you use.

| Product | Required | What it adds to the map |
|---|---|---|
| [Cloud Network Monitoring][1] | Yes | The connections between resources and the composition stack for each resource. The map cannot be drawn without CNM data, including when Network Path data is available. |
| [APM][2] | No | The service layer. Without APM, start your investigation from a host, pod, or container. |
| [Container Monitoring][3] | No | The container layer. Workloads that do not run in containers do not have this layer. |
| [Kubernetes][4] | No | The pod layer. Workloads that do not run on Kubernetes do not have this layer. |
| [Network Path][5] | No | The hop-by-hop network path between a source and a destination, with reachability, latency, and packet loss. |
| [Network Device Monitoring][6] | No | Device details for a network path hop that is a monitored network device. |

Before you use the map, open [CNM][14] and check that traffic appears for the resources you want to investigate. If you set up Network Path, check that the path between your source and destination appears in [Network Path][15].

<!-- TODO: Confirm the Preview enrollment process and whether any RBAC permissions are required to view the map. -->

## How the L1/L7 Map works

### Investigation modes

{{< img src="network_performance_monitoring/l1_l7_map/investigation-modes.png" alt="The L1/L7 landing page, with options to select single resource mode or source/destination pair mode and a search field" style="width:70%;" >}}

The L1/L7 Map has two investigation modes:

Single resource
: Start with one service, container, pod, or host. The map shows what the resource runs on, what runs on it, and the resources it communicates with. For a walkthrough, see the [Find the cause of a degraded resource](#find-the-cause-of-a-degraded-resource) section.

Source/destination pair
: Select a source and a destination. The map shows the resources that each one runs on, the traffic observed between them, and the hop-by-hop network path, if available. For a walkthrough, see the [Find where a connection degrades](#find-where-a-connection-degrades) section.

### Map layout

The map shows two types of relationships between resources:

- **Composition**: Where a resource runs. For example, a service runs on containers, the containers run in pods, and the pods run on hosts. Composition is not network traffic.
- **Connections**: Network communication between resources. CNM provides the observed traffic, and Network Path provides the tested route.

{{< img src="network_performance_monitoring/l1_l7_map/single-resource-map.png" alt="An explored container in the center of the map, with the services that run on it above, upstream resources on the left, and downstream resources on the right" >}}

The map shows composition as a vertical stack, in this order from top to bottom: **Services**, **Containers**, **Pods**, and **Hosts**. Containers are split into **App containers** and **Sidecar containers**, such as an Envoy proxy. Layers that do not apply to a resource are skipped.

In single resource mode, the map centers on the selected resource, called the _explored resource_, and highlights it. The explored resource's composition stack appears in the center of the map:

- Resources that send traffic to the explored resource appear on the left, under **Upstream**.
- Resources that receive traffic from it appear on the right, under **Downstream**.
- Upstream and downstream resources can be services, containers, hosts, or external endpoints, such as an IP address or domain.
- When CNM and Network Path both have data for the same connection, the map combines the data into one line.

When you explore a service, the stack shows the containers, pods, and hosts that the service runs on. When you explore a container, pod, or host, the stack also shows the services that run on it.

{{< img src="network_performance_monitoring/l1_l7_map/source-destination-map.png" alt="Source/destination pair mode, showing the composition stacks of two containers side by side with the network connection between them" >}}

In source/destination pair mode, the map shows the source's composition stack on the left and the destination's on the right. Between them, the map shows:

- **Network connections**: Traffic observed by CNM between resources in the two stacks, such as container to container.
- **Network path**: The hop-by-hop path between the source host and the destination host, from Network Path. Hops in the same autonomous system (AS) are grouped. For example, a group labeled **AS64512** can contain three hops.

To keep the map readable, each group shows a limited number of resources and connections and collapses the rest into a **+N more** item.

### Map status

The color of a resource or connection shows its status:

- **Red**: Critical or down
- **Orange**: Warning
- **Gray**: No issue detected

Resources are ranked by status, so the resources with the most severe status appear at the top of each group.

Map status is based on the following network signals:

- **From CNM**: Round-trip time (RTT), TCP retransmits, TCP failures, and throughput
- **From Network Path**: Reachability, end-to-end latency, and packet loss

The map shows only the signals that are available for each resource or connection. Hover over a resource or connection to see which signal set its status.

Map status is not a complete assessment of a resource's health. A red resource is a starting point for an investigation, not proof that it caused the issue. To investigate application errors, pod state, or host utilization, open the resource in [APM][2], the [Kubernetes Explorer][16], or the [Infrastructure List][17].

<!-- TODO: Confirm color meanings and the signals that determine status. -->

## Navigate the L1/L7 Map

### Select resources and a time frame

To open the map, navigate to [**Network Monitoring > L1/L7**][7].

<!-- TODO: Confirm final navigation path and URL.

Entry points from other products, from the product brief's milestone 1 plan. Confirm which ones ship for the Preview, and their link labels, before uncommenting:

You can also open the map from other Datadog products. When you open the map from another product, it loads with that resource or connection already selected:

| From | Where to find the link |
|---|---|
| Cloud Network Monitoring | The side panel for a client/server connection. |
| Network Path | The details for a hop on a network path. |
| APM | The **Network** tab of a span in a trace. |
| Kubernetes Explorer | The **Network** tab of a pod's side panel. |
| Containers | The **Network** tab of a container's side panel. |
| Infrastructure List | The **Network** tab of a host's side panel. |
-->

On the L1/L7 page, select a mode:

- **Single resource**: In the search field, select a resource type (**Service**, **Container**, **Pod**, or **Host**) and search for the resource. You can also select a resource from the **Popular across your network** list.
- **Source/destination pair**: Search for and select a **Source** and a **Destination**.

{{< img src="network_performance_monitoring/l1_l7_map/landing-page-search.png" alt="The L1/L7 landing page in single resource mode, with the search menu open to resource types and popular resources" style="width:70%;" >}}

After the map loads, you can change what it shows:

- To add a destination to the explored resource, click **Add destination**, next to the search field at the top of the map, and select a destination. The map switches to source/destination pair mode.
- To remove the source or destination, click the **X** at the end of its search field.
- To explore a different resource or connection, use **Explore** or **Explore connection**. For details, see the [Inspect resources and connections](#inspect-resources-and-connections) section.
- To change the time frame, use the time picker.
- To zoom in on a section of the map, or to fit the map to the screen, use the zoom controls.
- To see the resources in a collapsed group, click **+N more**.

### Inspect resources and connections

Hover over any item on the map to see a summary of it. The actions available from the summary depend on the type of item.

#### Resource summaries

The summary for a resource shows its type, status, and available metrics. From the summary, you can:

- Click **Filter** to filter the map to the resources related to that resource. To clear the filter, click the **X** next to **Filtered to** at the top of the map.
- Click **Explore** to make that resource the explored resource. The map redraws around it.

<!-- TODO: Confirm whether clicking a resource also offers "use as source" and "use as destination" options, as described in the product brief. -->

{{< img src="network_performance_monitoring/l1_l7_map/resource-hover-summary.png" alt="A hover summary for a container, showing its status, CPU, memory, and packet drops, with Filter and Explore buttons" >}}

#### Connection summaries

The summary for a connection shows its network signals, such as:

- **Retransmits**: The percentage of TCP packets that were retransmitted.
- **TCP failures**: The number of failed TCP connections.
- **Sent / received**: The throughput in each direction.
- **RTT**: The round-trip time.

From the summary, click **Explore connection** to open the connection in source/destination pair mode, or click **View connection in CNM** to open it in Cloud Network Monitoring. To see a list of the individual connections that a line represents, click the line or its **+N more** item.

{{< img src="network_performance_monitoring/l1_l7_map/connection-hover-summary.png" alt="A hover summary for a connection between two containers, showing retransmits, TCP failures, throughput, and RTT" >}}

#### Network path segment summaries

The summary for a network path segment shows its **Reachability**, **End-to-end latency**, and **Packet loss**. Click **Explore connection** to filter the map to that segment, or click **View connection in Network Path** to open it in Network Path. To see the hops in an AS group and their status, such as **OK** or **UNREACHABLE**, click the group.

{{< img src="network_performance_monitoring/l1_l7_map/network-path-segment-hover-summary.png" alt="A hover summary for a network path segment between two network devices, showing reachability, end-to-end latency, and packet loss" >}}

### Resource and connection details

The details pane, to the right of the map, shows details for the explored resource, the filtered resource, or the connection between a source and a destination. The content of the pane depends on the investigation mode.

#### Resource details

In single resource mode, the details pane shows the following for the explored or filtered resource:

- The resource's status, such as **CRITICAL** or **DOWN**.
- **View details**, which opens the resource's side panel over the map, with more data about the resource, such as its logs and traces.
- A link to open the resource in its product, such as **View in APM** for a service or **View in Kubernetes** for a container. Use the dropdown next to the link to see other destinations.
- Infrastructure context, such as the availability zone, VPC, data center, and security groups.
- The available metrics for the resource, and a graph of network metrics, such as RTT, over the selected time frame.
- **Related resources**, a searchable list of the resources on the map, sorted by status.

{{< img src="network_performance_monitoring/l1_l7_map/filtered-resource-side-pane.png" alt="The details pane for a filtered container, showing its status, links to view details and open it in Kubernetes, infrastructure context, metrics, and an RTT graph" >}}

#### Connection details

In source/destination pair mode, the details pane shows the following for the connection between the source and the destination:

- The status of the source and the destination, such as **UP** or **DOWN**.
- **View connections**, which opens the connections in CNM. Use the dropdown next to the link to see other destinations.
- The network signals for the connection: retransmits, TCP failures, sent and received throughput, and RTT.
- A graph of network metrics, such as RTT, over the selected time frame.
- **Related resources**, a searchable list of the resources on both sides of the connection, sorted by status.

When you select an item on the map, the details pane shows that item instead:

- **A connection or a +N more item**: A searchable list of the individual network connections.
- **An AS group**: The hops in the group and their status, such as **OK** or **UNREACHABLE**.
- **A filtered network path segment**: The segment's reachability, end-to-end latency, and packet loss, and a link to open it in Network Path.

{{< img src="network_performance_monitoring/l1_l7_map/connection-details-pane.png" alt="The details pane in source/destination pair mode, showing the status of the source and destination containers, a View connections button, connection signals, and an RTT graph" style="width:50%;" >}}

## Investigate an issue with the L1/L7 Map

### Find the cause of a degraded resource

1. In single resource mode, select the degraded resource, such as a service with a high error rate.
1. Set the time frame to when the issue started.
1. Review the upstream and downstream resources and the composition stack. Hover over any red or orange resource or connection to see which signal is degraded.
1. To check whether the issue comes from the infrastructure that the resource runs on, click **Explore** on a degraded container, pod, or host. The map redraws around it and shows which other services run on it and which resources it communicates with.
1. To check whether the issue is in a connection, click **Explore connection** on a degraded connection.
1. When you find a likely cause, continue the investigation from the details pane. Click **View details** to open the resource's side panel, or click the link to open the resource in its product, such as **View in APM**.

### Find where a connection degrades

1. Open source/destination pair mode for the two resources. You can select them on the L1/L7 page, click **Add destination** from the source resource, or click **Explore connection** on the connection between them.
1. Set the time frame to when the issue started.
1. Hover over the CNM connections between the two stacks to check their retransmits, TCP failures, and RTT.
1. Hover over the network path segments, and click the AS groups, to find a hop with degraded reachability, latency, or packet loss.
1. If a hop is a network device monitored by [NDM][6], use the device details to continue the investigation.
1. To examine the underlying data, click **View connections** to open the connections in CNM, or click **View connection in Network Path** to open the path in the [Network Path path view][19].

## Limitations

- You cannot start an investigation from a network device. Network devices appear only as hops on a network path.
- The map does not show physical topology or routing relationships, such as connections derived from ARP or routing tables. To see physical connections between network devices, use the [Device Topology Map][13].
- The map shows only what Datadog observed during the selected time frame. A missing connection or hop does not mean that an outage occurred or that no dependency exists.
- The map does not compare forward and reverse paths, compare paths over time, detect route changes, or correlate deployments with network changes.

## Troubleshooting

### The map is not available

Check that your organization has access to the Preview. If you still cannot access the map, contact [Datadog Support][12].

### The map is empty

The map is empty when CNM has no traffic data for the selected resource or pair during the selected time frame. An empty map can mean that CNM is not set up for the resource, or that the resource had no traffic. The map does not distinguish between these cases.

1. If CNM is not set up for the workloads, [set up Cloud Network Monitoring][8].
1. If CNM is set up, open the resource or pair in [CNM][14] and find a time frame with traffic. Select the same time frame on the map.
1. If CNM shows traffic but the map is still empty, contact [Datadog Support][12]. Include the resource names and the time frame.

Network Path data on its own does not populate the map.

### A service, container, or pod is missing

Check that the workload is monitored and that it appears in the corresponding product, such as [APM][2], the [Containers Explorer][18], or the [Kubernetes Explorer][16]. If the service layer is missing, start the investigation from the host, pod, or container. Workloads that do not run in containers or on Kubernetes do not have container or pod layers.

If your environment uses CNM sidecar attribution, an app container whose traffic all goes through its sidecar container does not appear on the map. Its traffic appears on the sidecar container instead, and exploring the app container shows an empty map. Investigate the sidecar container or the pod instead.

<!-- TODO: Link "CNM sidecar attribution" to its setup doc, if one exists. Ask the CNM team. -->

### A host appears as an IP address

The Datadog Agent is not installed on the host. [Install the Agent][9] on the host to see its composition stack.

### A connection has no hop-by-hop path

Check that [Network Path is set up][10] for the source and destination, and that it has results for the selected time frame. Open the pair in [Network Path][15] to confirm. Traffic in CNM does not mean that a Network Path test or a complete route exists for the same pair.

### A hop appears as an IP address instead of a device

Check whether the device is monitored by [Network Device Monitoring][11]. If it is not, the hop appears as an IP address or external endpoint, with the AS or location information that is available.

### A status or metric is different in another product

Compare the same resource or pair over the same time frame, and check which signal each product shows. Map status is based on network signals, so it can be different from the resource's health in [APM][2] or [Infrastructure Monitoring][20]. A missing value does not mean that the resource is healthy.

<!-- TODO: Confirm empty-state behavior and in-app CTA copy with eng before Preview. -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/
[2]: /tracing/
[3]: /containers/
[4]: /containers/kubernetes/
[5]: /network_monitoring/network_path/
[6]: /network_monitoring/devices/
[7]: https://app.datadoghq.com/network/cross-osi
[8]: /network_monitoring/cloud_network_monitoring/setup/
[9]: /agent/
[10]: /network_monitoring/network_path/setup/
[11]: /network_monitoring/devices/setup/
[12]: /help/
[13]: /network_monitoring/devices/topology/
[14]: https://app.datadoghq.com/network
[15]: https://app.datadoghq.com/network/path
[16]: /containers/monitoring/kubernetes_explorer/
[17]: /infrastructure/list/
[18]: /containers/monitoring/containers_explorer/
[19]: /network_monitoring/network_path/path_view/
[20]: /infrastructure/
