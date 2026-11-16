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
The L1/L7 Map is in Preview. If you are interested in this feature, complete the form to request access.
{{< /callout >}}

<!-- TODO: "L1/L7" is a working name. Update the title, menu entry, and all references when the name is final. -->

## Overview

The L1/L7 Map brings application, infrastructure, and network context into one map. Use it to see what a resource runs on, inspect its upstream and downstream connections, and investigate network performance between a source and a destination.

Without the map, troubleshooting an incident often means pivoting between several Datadog products. Each product has its own query syntax and field names, and the same resource can appear in more than one of them.

The map helps you narrow an investigation to a specific resource or connection. From there, open the resource or connection in its product, such as APM, Kubernetes, Cloud Network Monitoring (CNM), or Network Path, to examine the underlying data.

The layers, relationships, and metrics on the map depend on the data that Datadog collects for the selected resources during the selected time frame.

<!-- TODO: Add overview screenshot from the demo org (single resource view with full composition stack). -->

### Investigation modes

The L1/L7 Map supports two investigation modes:

Single resource
: Start with one service, container, pod, or host. The map shows what the resource runs on, what runs on it, and its upstream and downstream connections.

Source/destination pair
: Select a source and a destination. The map shows the resources that each one runs on, the traffic observed between them, and the hop-by-hop network path, if available.

## Prerequisites

The L1/L7 Map has no Agent version requirement of its own. It builds the map from data that other Datadog products collect, so follow the Agent and platform requirements for each product.

- Your organization must have access to the Preview.
- [Cloud Network Monitoring][1] must be set up on the workloads you want to investigate. CNM data is required to draw the map. Network Path data on its own does not populate the map. Before you use the map, open CNM and check that it shows traffic for the resources you want to investigate.

The following products are optional. Each one adds context to the map:

| Product | What it adds to the map |
|---|---|
| [APM][2] | The service layer. Without APM, start your investigation from a host, pod, or container. |
| [Container Monitoring][3] | The container layer. Workloads that do not run in containers do not have this layer. |
| [Kubernetes][4] | The pod layer. Workloads that do not run on Kubernetes do not have this layer. |
| [Network Path][5] | The hop-by-hop network path between a source and a destination, with reachability, latency, and packet loss. |
| [Network Device Monitoring][6] (NDM) | Device details for a network path hop that is a monitored network device. |

<!-- TODO: Confirm the Preview enrollment process and whether any RBAC permissions are required to view the map. -->

## Open the map

Navigate to [**Network Monitoring > L1/L7**][7].

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

## Read the map

The map shows two kinds of relationships:

Composition
: What runs on what. For example, a service runs on containers, which run in pods, which run on hosts. The map shows composition as a vertical stack in a fixed order, from top to bottom: **Services**, **Containers**, **Pods**, and **Hosts**. Containers are split into **App containers** and **Sidecar containers**, such as an Envoy proxy. Layers that do not apply to a resource are skipped. A composition relationship is not a measured network connection.

Connections
: Observed communication and network path measurements. CNM provides the traffic between resources, and Network Path provides the tested route between them. In single resource mode, CNM and Network Path data for the same connection can be combined into one line. Hover over the line to see which signals it includes.

To keep the map readable, each group shows a limited number of resources and connections and collapses the rest into a **+N more** item. Click **+N more** to see the rest. Use the zoom controls to zoom in on a section of the map, or to fit the map to the screen.

### Map status

The color of a resource or connection shows its status:

- **Red**: Critical or down.
- **Orange**: Warning.
- **Gray**: No issue detected.

Resources are ranked by status, so the resources with the most severe status appear at the top of each group.

In the Preview, map status is based on network signals:

- **From CNM**: Round-trip time (RTT), TCP retransmits, TCP failures, and throughput.
- **From Network Path**: Reachability, end-to-end latency, and packet loss.

The map shows only the signals that are available for each resource or connection.

Map status is not a complete assessment of a resource's health. To investigate application errors, pod state, or host utilization, open the resource in its own product. A red resource is a starting point for an investigation, not proof that it caused the issue. Hover over the resource to see which signal is degraded.

<!-- TODO: Confirm color meanings and the signals that determine status for the Preview. -->

## Investigate a single resource

1. On the L1/L7 page, select **Single resource**.
1. In the search field, select a resource type (**Service**, **Container**, **Pod**, or **Host**) and search for the resource. You can also select a resource from the **Popular across your network** list.
1. Set the time frame to the time of the issue.
1. Review the upstream and downstream connections, and the composition stack for the resource.
1. Hover over a resource or connection to see its status and network signals.
1. Continue the investigation from the resource or connection that shows a degraded signal, as described in the following sections.

<!-- TODO: Add screenshot of the L1/L7 landing page with the search dropdown open. -->

The map centers on the selected resource, called the _explored resource_, which is highlighted. Resources that send traffic to it appear on the left, under **Upstream**. Resources that receive traffic from it appear on the right, under **Downstream**. Upstream and downstream resources can be services, containers, hosts, or external endpoints, such as an IP address or domain.

When you explore a service, the composition stack shows the containers, pods, and hosts that the service runs on. When you explore a container, pod, or host, the stack also shows the services that run on it.

<!-- TODO: Add screenshot of the single resource view (upstream, composition stack, downstream). -->

### Inspect a resource

Hover over a resource to see its type, status, and available metrics. From the summary, you can:

- Click **Filter** to filter the map to the resources related to that resource. The side pane shows details for the filtered resource. To clear the filter, click the **X** next to **Filtered to** at the top of the map.
- Click **Explore** to make that resource the explored resource. The map redraws around it. For example, if a service is degraded, explore one of its containers to see which other services run on that container and what the container communicates with.

<!-- TODO: Confirm whether clicking a resource also offers "use as source" and "use as destination" options in the Preview, as described in the product brief. -->

<!-- TODO: Add screenshot of the resource hover summary with Filter and Explore buttons. -->

### Inspect a connection

Hover over a connection to see its network signals, such as:

- **Retransmits**: The percentage of TCP packets that were retransmitted.
- **TCP failures**: The number of failed TCP connections.
- **Sent / received**: The throughput in each direction.
- **RTT**: The round-trip time.

From the summary, you can:

- Click **Explore connection** to open the connection in [source/destination pair mode](#investigate-a-connection-between-two-resources).
- Click **View connection in CNM** to open the connection in Cloud Network Monitoring.

<!-- TODO: Add screenshot of the connection hover summary. -->

### Resource details in the side pane

The side pane on the right shows details for the explored or filtered resource:

- The resource's status, such as **CRITICAL** or **DOWN**.
- **View details**, which opens the resource's side panel. This is the same side panel that the resource has in other Datadog products, such as the container side panel or the host side panel.
- A link to open the resource in its product, such as **View in APM** for a service or **View in Kubernetes** for a container. Use the dropdown next to the link to see other destinations.
- Infrastructure context, such as the availability zone, VPC, data center, and security groups.
- The available metrics for the resource, and a graph of network metrics, such as RTT, over the selected time frame.
- **Related resources**, a searchable list of the resources on the map, sorted by status.

## Investigate a connection between two resources

Use source/destination pair mode to see the path between two resources and find where along it a signal is degraded.

You can open source/destination pair mode in the following ways:

- On the L1/L7 page, select **Source/destination pair**, then search for and select a **Source** and a **Destination**.
- While you explore a single resource, click **Add destination** and select a destination.
- Hover over a connection on the map and click **Explore connection**.

To investigate the connection:

1. Open source/destination pair mode, and check the source and destination at the top of the page.
1. Review the composition stack for each resource and the connections between them.
1. Hover over the CNM connections and the network path hops to find where a signal is degraded.
1. Click a connection or hop to see its details in the side pane. If a hop is a network device monitored by NDM, use the device details to continue the investigation.
1. Click **View connections**, or the link for the selected connection, to examine the data in CNM or Network Path.

<!-- TODO: Add screenshot of the source/destination pair view. -->

The map shows the composition stack for the source on the left and for the destination on the right. Between them, the map shows:

- **Network connections**: Traffic observed by CNM between resources in the two stacks, such as container to container. Click a connection, or a **+N more** item, to see a list of the individual connections in the side pane.
- **Network path**: The hop-by-hop path between the source host and the destination host, from Network Path. Hops in the same autonomous system (AS) are grouped. For example, a group labeled **AS64512** can contain three hops. Click a group to see its hops and their status, such as **OK** or **UNREACHABLE**, in the side pane.

Hover over a segment of the network path to see its **Reachability**, **End-to-end latency**, and **Packet loss**. From the summary, click **Explore connection** to filter the map to that segment, or click **View connection in Network Path** to open it in Network Path.

The side pane shows the status of the source and the destination, the network signals for the connection between them, a graph of network metrics over time, and the related resources on both sides.

<!-- TODO: Add screenshot of the network path segment hover summary. -->

## Preview limitations

- CNM data is required. The map cannot be drawn from Infrastructure Monitoring data or Network Path data alone.
- The map shows only what Datadog observed during the selected time frame. A missing connection or hop does not mean that an outage occurred or that no dependency exists.
- Network devices appear only as hops on a network path. You cannot start an investigation from a network device.
- The map does not compare forward and reverse paths, compare paths over time, detect route changes, or correlate deployments with network changes.
- The map does not show physical topology or routing relationships, such as connections derived from ARP or routing tables. To see physical connections between network devices, use the [Device Topology Map][12].

## Troubleshooting

### The map is not available

Check that your organization has access to the Preview. If you still cannot access the map, contact [Datadog Support][13].

### The map is empty

The map is empty when CNM has no traffic data for the selected resource or pair during the selected time frame. An empty map can mean that CNM is not set up for the resource, or that the resource had no traffic. The map does not distinguish between these cases.

1. If CNM is not set up for the workloads, [set up Cloud Network Monitoring][8].
1. If CNM is set up, open the resource or pair in CNM and find a time frame with traffic. Select the same time frame on the map.
1. If CNM shows traffic but the map is still empty, contact [Datadog Support][13]. Include the resource names and the time frame.

Network Path data on its own does not populate the map.

### A service, container, or pod is missing

Check that the workload is monitored and that it appears in the corresponding product, such as APM, Containers, or the Kubernetes Explorer. If the service layer is missing, start the investigation from the host, pod, or container. Workloads that do not run in containers or on Kubernetes do not have container or pod layers.

If your environment uses CNM sidecar attribution, an app container whose traffic all goes through its sidecar container does not appear on the map. Its traffic appears on the sidecar container instead, and exploring the app container shows an empty map. Investigate the sidecar container or the pod instead.

### A host appears as an IP address

The Datadog Agent is not installed on the host. [Install the Agent][9] on the host to see its composition stack.

### A connection has no hop-by-hop path

Check that [Network Path is set up][10] for the source and destination, and that it has results for the selected time frame. Open the pair in Network Path to confirm. Traffic in CNM does not mean that a Network Path test or a complete route exists for the same pair.

### A hop appears as an IP address instead of a device

Check whether the device is monitored by [Network Device Monitoring][11]. If it is not, the hop appears as an IP address or external endpoint, with the AS or location information that is available.

### A status or metric is different in another product

Compare the same resource or pair over the same time frame, and check which signal each product shows. Map status is based on network signals, so it can be different from the resource's health in APM or Infrastructure Monitoring. A missing value does not mean that the resource is healthy.

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
[12]: /network_monitoring/devices/topology/
[13]: /help/
