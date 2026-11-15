---
title: L1/L7 Map
description: Visualize how services, containers, pods, hosts, and network paths connect, and find where an issue starts across the application, compute, and network layers.
further_reading:
  - link: "/network_monitoring/cloud_network_monitoring/"
    tag: "Documentation"
    text: "Cloud Network Monitoring"
  - link: "/network_monitoring/network_path/"
    tag: "Documentation"
    text: "Network Path"
  - link: "/network_monitoring/devices/"
    tag: "Documentation"
    text: "Network Device Monitoring"
---

{{< callout url="TODO_PREVIEW_FORM_URL" btn_hidden="false" header="Join the Preview!">}}
The L1/L7 Map is in Preview. Use this form to request access.
{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">The L1/L7 Map is not available for the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

## Overview

The L1/L7 Map shows how the resources in your environment connect across the network stack, from the application layer down to the network path between hosts. It combines data from Cloud Network Monitoring (CNM), APM, Infrastructure Monitoring, Network Path, and Network Device Monitoring (NDM) into one view, so you can investigate an issue without switching between products or learning a different query syntax for each.

Use the map to answer questions such as:

- Why is this service unhealthy, and which upstream or downstream resource is the likely cause?
- What containers, pods, and hosts does this service run on?
- Is the problem in a resource, or in the connection between two resources?
- Where along the path from service A to service B does latency or packet loss begin?

The map is a starting point for an investigation. Each resource and connection links to the product where you can continue the investigation, such as APM, Kubernetes, CNM, or Network Path.

<!-- TODO: Add overview screenshot from the demo org (single resource view with full composition stack). -->

### Investigation modes

The L1/L7 Map supports two investigation modes:

Single resource
: Explore one service, container, pod, or host. The map shows the resource's composition stack (what it runs on or what runs on it) and its upstream and downstream dependencies. Use this mode to find the likely cause of a degraded resource.

Source/destination pair
: Explore the connection between two resources. The map shows the composition stack of each resource side by side, the network connections between them, and the hop-by-hop network path. Use this mode to find where communication between two resources breaks down.

## Prerequisites

The L1/L7 Map has no additional Agent version or configuration requirements. It builds the map from data that other Datadog products already collect.

| Product | Required | What it adds to the map |
|---|---|---|
| [Cloud Network Monitoring][1] | Yes | Network connections between resources, connection metrics (retransmits, TCP failures, throughput, RTT), and the composition stack for each resource. Without CNM data, the map cannot be drawn. |
| [APM][2] | No | The service layer at the top of each composition stack, and service metrics such as error rate and latency. |
| [Container Monitoring][3] | No | The container layer, including app containers and sidecar containers. |
| [Kubernetes][4] | No | The pod layer for workloads that run on Kubernetes. |
| [Network Path][5] | No | Hop-by-hop network paths between hosts, with reachability, latency, and packet loss for each hop. |
| [Network Device Monitoring][6] | No | Device details for network devices that appear as hops on a network path. |

<!-- TODO: Confirm with PM (Angelina Jin) whether any RBAC permissions are required to view the map. -->

## Open the map

Navigate to [**Network Monitoring > L1/L7**][7].

<!-- TODO: Confirm final navigation path and URL. Product name is also still being finalized. -->

You can also open the map from other Datadog products. When you open the map from another product, it loads with that resource or connection already selected:

| From | Where to find the link |
|---|---|
| Cloud Network Monitoring | The side panel for a client/server connection. |
| Network Path | The details for a hop on a network path. |
| APM | The **Network** tab of a span in a trace. |
| Kubernetes Explorer | The **Network** tab of a pod's side panel. |
| Containers | The **Network** tab of a container's side panel. |
| Infrastructure List | The **Network** tab of a host's side panel. |

<!-- TODO: Confirm with PM which entry points ship for the Preview, and the exact link labels. -->

## Explore a single resource

1. On the L1/L7 page, select **Single resource**.
2. In the search field, select a resource type (**Service**, **Container**, **Pod**, or **Host**), or select a resource from the **Popular across your network** list.
3. Search for and select the resource.

<!-- TODO: Add screenshot of the L1/L7 landing page with the search dropdown open. -->

The map centers on the selected resource, which is highlighted. Use the time picker to change the time frame, and use the zoom controls to zoom in, zoom out, or fit the map to the screen.

### How the map is organized

For the explored resource, the map shows:

Upstream and downstream dependencies
: Resources that send traffic to the explored resource appear on the left, under **Upstream**. Resources that receive traffic from it appear on the right, under **Downstream**. Lines between resources represent network connections observed by CNM. Dependencies can be services, containers, hosts, or external endpoints, such as an IP address or domain.

Composition stack
: The layers that the explored resource runs on, or that run on it, appear in a vertical stack. The stack is ordered from top to bottom: **Services**, **Containers**, **Pods**, and **Hosts**. Containers are split into **App containers** and **Sidecar containers** (for example, an Envoy proxy). Layers that do not apply to the resource are skipped. For example, the pod layer does not appear for workloads that do not run on Kubernetes.

When you explore a service, the stack shows the containers, pods, and hosts that the service runs on. When you explore a container, pod, or host, the stack also shows the services that run on it.

<!-- TODO: Add screenshot of the single resource view (upstream wing, composition stack, downstream wing). -->

### Health indicators

The color of each resource and connection shows its health:

- **Red**: Critical or down.
- **Orange**: Warning.
- **Gray**: Healthy.

Resources are ranked by severity, so the most degraded resources appear at the top of each group. To keep the map readable, each group shows a limited number of resources and collapses the rest into a **+N more** item. Healthy resources are collapsed first.

<!-- TODO: Confirm with eng which signals determine resource and connection health for the Preview, and confirm color meanings. -->

### Inspect a resource

Hover over a resource to see a summary of its health. The summary shows the resource type, its status, and key metrics. For example, a container shows its CPU %, memory %, and packet drops and errors.

From the summary, you can:

- Click **Filter** to filter the map to that resource. The map hides resources that are not related to it, and the side pane shows details for the filtered resource. To clear the filter, click the **X** next to **Filtered to** at the top of the map.
- Click **Explore** to make that resource the explored resource. The map redraws around it, with its own upstream and downstream dependencies and composition stack. For example, if a service is degraded, explore one of its containers to see which other services run on that container and what it communicates with.

<!-- TODO: Add screenshot of the resource hover summary with Filter and Explore buttons. -->

### Inspect a connection

Hover over a connection line to see its network metrics:

- **Retransmits**: The percentage of TCP packets that were retransmitted.
- **TCP failures**: The number of failed TCP connections.
- **Sent / received**: The throughput in each direction.
- **RTT**: The round-trip time.

From the summary, you can:

- Click **Explore connection** to open the connection in the [source/destination pair view](#investigate-a-connection-between-two-resources).
- Click **View connection in CNM** to open the connection in Cloud Network Monitoring.

<!-- TODO: Add screenshot of the connection hover summary. -->

### Side pane

The side pane on the right shows details for the explored or filtered resource:

- The resource's status, such as **CRITICAL** or **DOWN**.
- **View details**, which opens the resource's side panel. This is the same side panel you see in other Datadog products, such as the container side panel or the service side panel, with the resource's tags, metrics, logs, traces, and related resources.
- A link to open the resource in its product, such as **View in APM** for a service or **View in Kubernetes** for a container. Use the dropdown next to the link to see other destinations.
- Infrastructure context, such as the availability zone, VPC, data center, and security groups.
- Key metrics for the resource type. For example, a service shows error rate, latency, and packet drops and errors.
- A graph of network metrics over the selected time frame, such as RTT.
- **Related resources**, a searchable list of every resource on the map, sorted by severity.

## Investigate a connection between two resources

Use the source/destination pair view to see one continuous path between two resources and find where along it the problem starts.

To open the view, do one of the following:

- On the L1/L7 page, select **Source/destination pair**, then search for and select a **Source** and a **Destination**.
- While exploring a single resource, click **Add destination** and select a destination resource.
- Hover over a connection line on the map and click **Explore connection**.

<!-- TODO: Add screenshot of the source/destination pair view. -->

The map shows the composition stack for the source on the left and the destination on the right. Between them, the map shows:

- **Network connections**: Connections observed by CNM between resources in the two stacks, such as container to container. Click a connection, or a **+N more** item, to see a list of the individual network connections in the side pane.
- **Network path**: The hop-by-hop path between the source host and the destination host, from Network Path. Hops that belong to the same autonomous system (AS) are grouped, for example `AS64512 (3 hops)`. Click a group to see its hops and their status, such as **OK** or **UNREACHABLE**, in the side pane.

Hover over a segment of the network path to see its **Reachability**, **End-to-end latency**, and **Packet loss**. From the summary, click **Explore connection** to filter the map to that segment, or click **View connection in Network Path** to continue the investigation in Network Path.

The side pane shows the status of the source and destination, metrics for the connection between them (retransmits, TCP failures, sent and received throughput, and RTT), a graph of network metrics over time, and the related resources for both sides. Click **View connections** to open the connections in CNM.

<!-- TODO: Add screenshot of the network path segment hover summary. -->

## Troubleshooting missing data

The L1/L7 Map shows only the data that Datadog collects for each resource. If a layer, resource, or connection you expect does not appear, check the following:

The map is empty
: The map requires CNM data. Check that [Cloud Network Monitoring is set up][8] on the hosts that run the resource. If CNM is set up, the resource might not have sent or received traffic during the selected time frame. Try a longer time frame.

The service layer is missing
: Instrument the service with [APM][2]. You can still explore the resource from its container, pod, or host.

The pod or container layer is missing
: Check that [Kubernetes monitoring][4] is set up for the cluster, and that [container collection][3] is enabled on the host. If the workload does not run in containers or on Kubernetes, these layers do not apply and are skipped.

A host appears only as an IP address
: The Datadog Agent is not installed on that host. [Install the Agent][9] on the host to see its composition stack.

An app container is missing
: If all of a container's network traffic goes through its sidecar container, the map shows the traffic on the sidecar container and does not list the app container.

No network path appears between two hosts
: Check that [Network Path is set up][10] for the source and destination.

A network path hop appears only as an IP address
: The hop is a network device that is not monitored by NDM. [Set up Network Device Monitoring][11] to see device details for the hop.

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
