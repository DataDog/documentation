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

<!-- TODO: "L1/L7" is a working name. Update the title, menu entry, and all references when the name is final. -->

<!-- TODO (when final demo-org screenshots arrive): Every bolded UI label on this page comes from the staging prototype. Check each one against the screenshots and update it to match. This includes mode names (Single resource, Source/destination pair), buttons (Filter, Explore, Explore connection, View connection in CNM, View connection in Network Path, View connections, View details, View in APM, View in Kubernetes, Add destination), group and section labels (Upstream, Downstream, Services, Containers, App containers, Sidecar containers, Pods, Hosts, Popular across your network, Related resources, Filtered to, +N more), metric labels (Retransmits, TCP failures, Sent / received, RTT, Reachability, End-to-end latency, Packet loss), and status values (CRITICAL, DOWN, OK, UNREACHABLE). Also confirm the navigation path (Network Monitoring > L1/L7). -->

## Overview

The L1/L7 Map brings application, infrastructure, and network context into one map to help you troubleshoot issues, such as a degraded service or a slow connection between two services. Use the map to see which containers, pods, and hosts a service runs on, which resources it communicates with, and where along the path between two resources a network signal degrades.

The map combines data from Cloud Network Monitoring (CNM), APM, Container Monitoring, Kubernetes, Network Path, and Network Device Monitoring (NDM). After you narrow an investigation to a specific resource or connection, open it in its own product to examine the underlying data.

<!-- TODO: Add overview screenshot from the demo org (single resource view with full composition stack). -->

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

Before you use the map, open CNM and check that traffic appears for the resources you want to investigate. If you set up Network Path, check that the path between your source and destination appears in Network Path.

<!-- TODO: Confirm the Preview enrollment process and whether any RBAC permissions are required to view the map. -->

## How the L1/L7 Map works

### Investigation modes

The L1/L7 Map has two investigation modes:

Single resource
: Start with one service, container, pod, or host. The map shows what the resource runs on, what runs on it, and the resources it communicates with. For a walkthrough, see the [Find the cause of a degraded resource](#find-the-cause-of-a-degraded-resource) section.

Source/destination pair
: Select a source and a destination. The map shows the resources that each one runs on, the traffic observed between them, and the hop-by-hop network path, if available. For a walkthrough, see the [Find where a connection degrades](#find-where-a-connection-degrades) section.

### Map layout

The map shows two types of relationships between resources:

- **Composition**: Where a resource runs. For example, a service runs on containers, the containers run in pods, and the pods run on hosts. Composition is not network traffic.
- **Connections**: Network communication between resources. CNM provides the observed traffic, and Network Path provides the tested route.

The map shows composition as a vertical stack, in this order from top to bottom: **Services**, **Containers**, **Pods**, and **Hosts**. Containers are split into **App containers** and **Sidecar containers**, such as an Envoy proxy. Layers that do not apply to a resource are skipped.

In single resource mode, the map centers on the selected resource, called the _explored resource_, and highlights it. The explored resource's composition stack appears in the center of the map:

- Resources that send traffic to the explored resource appear on the left, under **Upstream**.
- Resources that receive traffic from it appear on the right, under **Downstream**.
- Upstream and downstream resources can be services, containers, hosts, or external endpoints, such as an IP address or domain.
- When CNM and Network Path both have data for the same connection, the map combines the data into one line.

When you explore a service, the stack shows the containers, pods, and hosts that the service runs on. When you explore a container, pod, or host, the stack also shows the services that run on it.

<!-- TODO: Add screenshot of the single resource view (upstream, composition stack, downstream). -->

In source/destination pair mode, the map shows the source's composition stack on the left and the destination's on the right. Between them, the map shows:

- **Network connections**: Traffic observed by CNM between resources in the two stacks, such as container to container.
- **Network path**: The hop-by-hop path between the source host and the destination host, from Network Path. Hops in the same autonomous system (AS) are grouped. For example, a group labeled **AS64512** can contain three hops.

<!-- TODO: Add screenshot of the source/destination pair view. -->

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

Map status is not a complete assessment of a resource's health. A red resource is a starting point for an investigation, not proof that it caused the issue. To investigate application errors, pod state, or host utilization, open the resource in its own product.

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

<!-- TODO: Add screenshot of the L1/L7 landing page with the search dropdown open. -->

After the map loads, you can change what it shows:

- To add a destination to the explored resource, click **Add destination** and select a destination. The map switches to source/destination pair mode.
- To remove the source or destination, click the **X** next to it.
- To explore a different resource or connection, use **Explore** or **Explore connection**. For details, see the [Inspect resources and connections](#inspect-resources-and-connections) section.
- To change the time frame, use the time picker.
- To zoom in on a section of the map, or to fit the map to the screen, use the zoom controls.
- To see the resources in a collapsed group, click **+N more**.

### Inspect resources and connections

Hover over any item on the map to see a summary of it. From the summary, you can filter the map, explore the item, or open it in its product.

**Resources**: The summary shows the resource's type, status, and available metrics.

- Click **Filter** to filter the map to the resources related to that resource. To clear the filter, click the **X** next to **Filtered to** at the top of the map.
- Click **Explore** to make that resource the explored resource. The map redraws around it.

**Connections**: The summary shows the connection's network signals, such as:

- **Retransmits**: The percentage of TCP packets that were retransmitted.
- **TCP failures**: The number of failed TCP connections.
- **Sent / received**: The throughput in each direction.
- **RTT**: The round-trip time.

From the summary, click **Explore connection** to open the connection in source/destination pair mode, or click **View connection in CNM** to open it in Cloud Network Monitoring. To see a list of the individual connections that a line represents, click the line or its **+N more** item.

**Network path segments**: The summary shows the segment's **Reachability**, **End-to-end latency**, and **Packet loss**. Click **Explore connection** to filter the map to that segment, or click **View connection in Network Path** to open it in Network Path. To see the hops in an AS group and their status, such as **OK** or **UNREACHABLE**, click the group.

<!-- TODO: Confirm whether clicking a resource also offers "use as source" and "use as destination" options, as described in the product brief. -->

<!-- TODO: Add screenshots of the resource, connection, and network path segment hover summaries. -->

### Resource and connection details

The side pane to the right of the map shows details for the explored or filtered resource:

- The resource's status, such as **CRITICAL** or **DOWN**.
- **View details**, which opens the resource's side panel. This is the same side panel that the resource has in other Datadog products, such as the container side panel or the host side panel.
- A link to open the resource in its product, such as **View in APM** for a service or **View in Kubernetes** for a container. Use the dropdown next to the link to see other destinations.
- Infrastructure context, such as the availability zone, VPC, data center, and security groups.
- The available metrics for the resource, and a graph of network metrics, such as RTT, over the selected time frame.
- **Related resources**, a searchable list of the resources on the map, sorted by status.

In source/destination pair mode, the side pane shows the status of the source and the destination, the network signals for the connection between them, a graph of network metrics over time, and the related resources on both sides. Click **View connections** to open the connections in CNM.

## Investigate an issue with the L1/L7 Map

### Find the cause of a degraded resource

1. In single resource mode, select the degraded resource, such as a service with a high error rate.
1. Set the time frame to when the issue started.
1. Review the upstream and downstream resources and the composition stack. Hover over any red or orange resource or connection to see which signal is degraded.
1. To check whether the issue comes from the infrastructure that the resource runs on, click **Explore** on a degraded container, pod, or host. The map redraws around it and shows which other services run on it and which resources it communicates with.
1. To check whether the issue is in a connection, click **Explore connection** on a degraded connection.
1. When you find a likely cause, click **View details**, or open the resource in its product, to continue the investigation.

### Find where a connection degrades

1. Open source/destination pair mode for the two resources. You can select them on the L1/L7 page, click **Add destination** from the source resource, or click **Explore connection** on the connection between them.
1. Set the time frame to when the issue started.
1. Hover over the CNM connections between the two stacks to check their retransmits, TCP failures, and RTT.
1. Hover over the network path segments, and click the AS groups, to find a hop with degraded reachability, latency, or packet loss.
1. If a hop is a network device monitored by NDM, use the device details to continue the investigation.
1. To examine the underlying data, click **View connections** to open the connections in CNM, or click **View connection in Network Path**.

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
1. If CNM is set up, open the resource or pair in CNM and find a time frame with traffic. Select the same time frame on the map.
1. If CNM shows traffic but the map is still empty, contact [Datadog Support][12]. Include the resource names and the time frame.

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
[12]: /help/
[13]: /network_monitoring/devices/topology/
