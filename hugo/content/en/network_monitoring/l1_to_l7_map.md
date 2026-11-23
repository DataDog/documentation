---
title: L1 to L7 Map
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
  - link: "/network_monitoring/cloud_network_monitoring/network_map/"
    tag: "Documentation"
    text: "CNM Network Map"
site_support_id: network_l1_l7_map
---

{{< callout url="https://www.datadoghq.com/product-preview/l1-to-l7-map/" btn_hidden="false" header="Join the Preview!">}}
The L1 to L7 Map is in Preview. Complete the form to request access.
{{< /callout >}}

<!-- TODO: The two landing page images (investigation-modes.png, landing-page-search.png) are placeholders. The demo landing page title still reads "L1/L7 Explore" (2026-11-23). When it reads "L1 to L7 Map", retake both under new filenames: the landing page, and the landing page with the search menu open to Search by type. -->

<!-- TODO: Labels not yet checked against the demo org: Explore Relationships (entry points in other products), View in Kubernetes, Add as source, and the Groups facet names. -->

## Overview

The L1 to L7 Map brings application, infrastructure, and network context together on one map. Use it to:

- **Investigate a resource**: See what a service, container, pod, or host runs on and which resources it communicates with. Network signals, such as retransmits and failed connections, show the health of each connection.
- **Investigate a connection**: Select a source and a destination to compare their supporting resources, observed traffic, and Network Path {{< tooltip text="hops" tooltip="A router or other network device that traffic passes through on the way to the destination." >}}. See the latency of each segment along the path.

The map uses data from Cloud Network Monitoring (CNM), APM, Container Monitoring, Kubernetes, Network Path, and Network Device Monitoring (NDM).

The L1 to L7 Map differs from other network maps in Datadog:

- The [CNM Network Map][20] shows traffic between groups of resources across your environment. The L1 to L7 Map shows one resource or one connection across the application, infrastructure, and network layers.
- The [Device Topology Map][13] shows the physical connections between network devices. The L1 to L7 Map shows network devices as hops on a network path.

To start using the map, see the [Navigate the L1 to L7 Map](#navigate-the-l1-to-l7-map) section. For step-by-step workflows, see the [Investigate an issue with the L1 to L7 Map](#investigate-an-issue-with-the-l1-to-l7-map) section.

{{< img src="network_performance_monitoring/l1_l7_map/l1-to-l7-map-overview.png" alt="The L1 to L7 Map in Resource View for a service, with its upstream services, downstream endpoints, containers, and pods on the map, and the details pane on the right" >}}

## Prerequisites

The L1 to L7 Map has no Agent version requirement of its own. It uses data that the following Datadog products collect. Follow the Agent and platform requirements for each product that you use.

| Product | Required | What it adds to the map |
|---|---|---|
| [Cloud Network Monitoring][1] | Yes | The network traffic between resources, and the containers, pods, and hosts that each resource runs on (its composition stack). Without CNM data, the map shows a partial view that omits the composition stack and observed traffic. Network Path data appears where it is available. |
| [APM][2] | No | Services in the composition stack. |
| [Container Monitoring][3] | No | Containers in the composition stack, for workloads that run in containers. |
| [Kubernetes][4] | No | Pods in the composition stack, for workloads that run on Kubernetes. |
| [Network Path][5] | No | The hop-by-hop network path between a source and a destination, with end-to-end latency, probe loss, and unanswered test runs. |
| [Network Device Monitoring][6] | No | The side panel for network devices that appear as hops on a network path. |

Before you use the map, open [CNM][14] and check that traffic appears for the resources you want to investigate. If it does not, [set up Cloud Network Monitoring][8] before you continue. If you use Network Path, also open [Network Path][15] and check that it has a path between the source and destination you want to investigate.

## How the L1 to L7 Map works

### Map layout

The map shows two types of relationships between resources:

- **Composition**: Where a resource runs. For example, a service runs on containers, the containers run in pods, and the pods run on hosts. Composition is not network traffic.
- **Connections**: Network communication between resources. CNM shows the real traffic between resources, as the Datadog Agent observes it. Network Path shows the route that its tests take, hop by hop.

The map shows composition as a vertical stack, called the _composition stack_, in the following order from top to bottom: **Services**, **Containers**, **Pods**, and **Hosts**. The map skips layers that do not apply to a resource.

To keep the map readable, each resource group and each connection line shows a limited number of items. The rest collapse into a **+N more** item.

The rest of the layout depends on the view: Resource View or Connection View.

#### Resource View layout

{{< img src="network_performance_monitoring/l1_l7_map/resource-view-layout.png" alt="Resource View for a host, with the services, containers, and pods that run on it stacked above it, upstream hosts on the left, and downstream endpoints on the right" style="width:60%;" >}}

In Resource View, the map centers on and highlights the selected resource, called the _explored resource_. Its composition stack appears in the middle of the map. When you explore a service, the stack shows the containers, pods, and hosts that the service runs on. When you explore a container, pod, or host, the stack also shows the services that run on it.

The explored resource's connections appear on either side of the stack:

- Resources that send traffic to the explored resource appear on the left, under **Upstream**.
- Resources that receive traffic from it appear on the right, under **Downstream**.

Upstream and downstream resources are the same type as the explored resource, such as services for a service or pods for a pod. The exception is {{< tooltip text="external endpoints" tooltip="A destination identified by an IP address or a hostname and port, rather than by a service, container, pod, or host." >}}, which can appear downstream of any type of resource. When CNM and Network Path both have data for the same connection, the map combines the data into one line.

#### Connection View layout

{{< img src="network_performance_monitoring/l1_l7_map/connection-view-layout.png" alt="Connection View from a host to an external endpoint, with the host's services, containers, and pods stacked above it, a CNM connection line, and a network path through two AS groups with the latency of each segment" >}}

In Connection View, the map shows the source's composition stack on the left and the destination's on the right.

The source and the destination must be the same type of resource, such as two services or two pods. The one exception is an {{< tooltip text="external endpoint" tooltip="A destination identified by an IP address or a hostname and port, rather than by a service, container, pod, or host." >}}, which can be the destination for any type of source.

Between the two stacks, the map shows CNM and Network Path data as separate lines:

- **Network connections**: Traffic that CNM observes between the source and the destination.
- **Network path**: The route from a host that the source runs on to a host that the destination runs on, or to a destination endpoint. The map shows each {{< tooltip text="hop" tooltip="A router or other network device that traffic passes through on the way to the destination." >}} along the route, which is based on Network Path {{< tooltip text="test results" tooltip="Network Path runs tests from a host to a destination and records the route that each test takes. The map uses test results from the selected time frame." >}}.

For services, containers, and pods, the map shows a path only when the test's destination is a host that the destination resource runs on. Paths to other destinations, such as a load balancer in front of the destination, do not appear.

When Network Path tests more than one pair of hosts, the map shows the least healthy path. The other paths collapse into a **+N more** item. The least healthy path does not necessarily run between the least healthy hosts in the two stacks.

The map groups hops in the same {{< tooltip text="autonomous system (AS)" tooltip="A network that one organization operates, such as an internet service provider or a cloud provider." >}}. Each line between two hops or AS groups is a _network path segment_.

### Map status and network signals

Each resource and connection on the map has a status: **Healthy**, **Degraded**, **Critical**, or **Unknown**. The map uses CNM and Network Path signals to determine status over the selected time frame. CNM evaluates TCP connection signals, such as failed setups, resets, and retransmits. Network Path evaluates TCP test runs, including probe loss and unanswered runs. UDP and ICMP tests do not affect status.

#### Resource status

A resource's status is calculated from the network observations that are relevant to that resource in the current view. For example, an upstream or downstream resource's status covers only its traffic with the explored resource. In Connection View, statuses cover only the source's traffic to the destination. A resource's status can change when you explore it.

CNM determines the resource's status when the CNM status is known. If the CNM status is Unknown, Network Path determines the status. If neither product has enough data, the status is Unknown.

#### Relationship status

Each line between two resources represents a relationship. Its status depends on the type of relationship:

- **CNM connection**: The status is based on CNM signals for the connection.
- **Network path**: The status is based on Network Path signals for the test.
- **Combined connection**: In Resource View, a line that combines CNM and Network Path data gets a status from each product. CNM determines the line's status when the CNM status is known. Otherwise, Network Path determines it.
- **Composition**: No status. A composition line represents a structural relationship, such as a service running on a container.

#### Status colors

The outline color of a resource and the color of a connection line show their status:

- **Red**: Critical
- **Orange**: Degraded
- **Green**: A Healthy connection
- **No color**: A Healthy resource, or an Unknown resource or connection. To tell a Healthy resource from an Unknown one, hover over it or find it in the **Related resources** list in the details pane.

Within each group, resources with the most severe status appear first.

**Note**: Network path segments are not colored by status. A segment where all {{< tooltip text="probes" tooltip="Packets that a Network Path test sends to the destination to measure latency and loss." >}} failed shows **FAILED** on a dotted line.

#### Network signals

The following signals appear on the map. Some signals set status, and the rest provide context only:

| Signal | Source | What it measures | Effect on status |
|---|---|---|---|
| Failed setup rate | CNM | The percentage of TCP connections that failed to open, such as connections that were refused or timed out. | Can set Critical or Degraded |
| Reset rate | CNM | The percentage of TCP connections that were reset. | Can set Critical |
| Retransmit rate | CNM | The percentage of TCP packets that were retransmitted. | Can set Degraded |
| Sent | CNM | The average throughput that the client sends. | None |
| Unanswered run rate | Network Path | The percentage of test runs that received no response. | Can set Critical |
| Probe loss rate | Network Path | The percentage of probes that did not reach the destination. | Can set Degraded |
| End-to-end latency | Network Path | The average round-trip time between the source and the destination. | None |

## Navigate the L1 to L7 Map

### Open the map

To open the map, navigate to [**Network Monitoring > L1 to L7**][7].

{{< img src="network_performance_monitoring/l1_l7_map/investigation-modes.png" alt="The L1 to L7 Map page, with options to select Resource View or Connection View and a search field" style="width:70%;" >}}

On the L1 to L7 Map page, select a view:

- **Resource View**: Start with one service, container, pod, or host. In the search field, select a resource type (**Service**, **Container**, **Pod**, or **Host**) and search for the resource. You can also select a resource from the **Popular across your network** list.
- **Connection View**: Search for and select a **Source** and a **Destination**.

{{< img src="network_performance_monitoring/l1_l7_map/landing-page-search.png" alt="The L1 to L7 Map page in Resource View, with the search menu open to resource types and popular resources" style="width:70%;" >}}

#### Open the map from another product

You can also open the map from other Datadog products, with a resource or connection selected. **Explore Relationships** opens the resource in Resource View, and **Explore connection** opens the connection in Connection View.

| From | Where to find the link |
|---|---|
| Cloud Network Monitoring | In the CNM analytics table, open the action menu for a row, or open the side panel for a connection. Click **Explore connection**. The action appears only when each side of the row is a single service, container, pod, or host, and both sides are the same type. |
| APM | In the **Network** tab of a span in a trace, click **Explore Relationships**. |
| Kubernetes Explorer | In the **Network** tab of a pod's side panel, click **Explore Relationships**. |
| Containers | In the **Network** tab of a container's side panel, click **Explore Relationships**. |
| Infrastructure List | In the **Network** tab of a host's side panel, click **Explore Relationships**. |

### Use the details pane

The details pane, to the right of the map, shows information about the explored resource, the filtered resource, or the connection between a source and a destination.

#### Details pane in Resource View

In Resource View, the details pane shows the following for the explored or filtered resource:

- The resource's status, such as **HEALTHY** or **CRITICAL**.
- **View details**, which opens the resource's side panel over the map to show more data, such as logs and traces.
- A link to open the resource in its product, such as **View in APM** for a service or **View in Kubernetes** for a pod. Use the dropdown next to the link to open the resource in another product.
- Infrastructure context, such as the environment, availability zone, VPC, data center, and security groups.
- The resource's metrics from CNM, Network Path, and other products, such as APM and Infrastructure, with charts over the selected time frame.
- **Related resources**, a searchable list of the resources on the map, sorted by status.

{{< img src="network_performance_monitoring/l1_l7_map/details-pane-resource-view.png" alt="The details pane for a service in Resource View, showing its HEALTHY status, View details and View in APM buttons, environment, availability zone, and VPC tags, collapsible metric sections, and a failed setup rate chart" style="width:50%;" >}}

#### Details pane in Connection View

In Connection View, the details pane shows the following for the connection between the source and the destination:

- The status of the source and the destination, such as **HEALTHY** or **CRITICAL**.
- **View connection in CNM**, which opens the connection in CNM. When the destination is an endpoint, the button is **View network path**. Use the dropdown next to the button to open the connection in another product.
- The connection's metrics from CNM and Network Path, with charts over the selected time frame. The charts use each product's own data, so their values can differ from the values in the map's hover summaries.
- **Related resources**, a searchable list of the resources on both sides of the connection, sorted by status.

{{< img src="network_performance_monitoring/l1_l7_map/details-pane-connection-view.png" alt="The details pane in Connection View, showing the source and destination with HEALTHY statuses, a View connection in CNM button, collapsible metric sections, and a failed setup rate chart" style="width:50%;" >}}

### Change what the map shows

After the map loads, you can change what it shows:

- To add a destination, click **Add destination** next to the search field at the top of the map. The map switches to Connection View.
- To remove the source or destination, click the **X** on its card in the details pane. When you remove the destination, the map returns to Resource View for the source. When you remove the source, the destination becomes the explored resource. If the destination is an endpoint, you cannot remove the source.
- To explore a different resource or connection, hover over it and click **Explore** or **Explore connection**.
- To see the resources in a collapsed group, click **+N more** at the bottom of the group. The details pane lists the group's resources, and the map does not change.

#### Filter by group

Use the **Groups** panel, in the lower-left corner of the map, to narrow the map to resources in specific infrastructure groups. For example, show only the resources in one environment or availability zone. The panel has the following facets:

- **Environment**
- **Availability zone (AZ)**
- **Virtual private clouds (VPC)**
- **Data centers**
- **Security groups**

To filter the map:

1. Expand the **Groups** panel.
1. Find a value in a facet, or use **Search groups**.
1. Include or exclude the value, or select **only** to show that value alone. The map, the details pane, and the group counts update to match.

Group filters stay applied when you explore a different resource or connection, and they limit the suggestions in the search field. A facet count of **≥ N** is approximate, and **—** means that the count is unavailable. Hover over a count for details.

### Hover over resources and connections

Hover over any item on the map to see its summary. The actions available from the summary depend on the type of item.

#### Resource summaries

The summary for a resource shows its type, status, and available metrics. The summary labels a Healthy status as **OK** and a Degraded status as **WARNING**. From the summary, you can:

- Click **Filter** to narrow the map to that resource, called the _filtered resource_, and its related resources, such as the pod and host that it runs on. The explored resource stays at the center of the map, and the details pane shows the filtered resource. For an upstream or downstream resource, the map filters to its connection with the explored resource, and the details pane shows that connection. To clear the filter, click the **X** next to **Filtered to** at the top of the map.
- Click **Explore** to make that resource the explored resource. The map redraws around it.
- For an upstream resource, click **Add as source**. For a downstream resource, click **Add as destination**. The map switches to Connection View for the connection between that resource and the explored resource.

**Note**: Endpoints do not have the **Explore** action. To investigate a connection to an endpoint, click **Add as destination**.

{{< img src="network_performance_monitoring/l1_l7_map/resource-summary-hover.png" alt="A hover summary for a container with a WARNING status, showing its failed setup, reset, and retransmit rates, with Filter and Explore buttons" style="width:50%;" >}}

#### Network connection summaries

The summary for a network connection shows its **Failed setup rate**, **Reset rate**, **Retransmit rate**, and **Sent** throughput from CNM. From the summary, click **Explore connection** to open the connection in Connection View, or click **View in CNM**.

In Resource View, if Network Path also tests the connection, the summary adds its **End-to-end latency**, **Probe loss rate**, and **Unanswered run rate**, and a **View in Network Path** link.

{{< img src="network_performance_monitoring/l1_l7_map/connection-summary-hover.png" alt="A hover summary for a connection between two services in Resource View, showing CNM and Network Path signals, with Explore connection, View in CNM, and View in Network Path buttons" >}}

#### Network path segment summaries

The summary for a network path segment shows the signals of the whole path: **End-to-end latency**, **Probe loss rate**, and **Unanswered run rate**. Every segment of the path shows the same values. To compare segments, use the latency label on each segment's line. A segment where all probes failed shows **FAILED** on a dotted line.

From the summary, click **View in Network Path** to open the Network Path explorer, filtered to the hosts at the ends of the path. For services, containers, and pods, you can also click **Explore connection** to open Connection View for the hosts at the ends of the path.

{{< img src="network_performance_monitoring/l1_l7_map/path-segment-summary-hover.png" alt="A hover summary for a network path segment between two AS groups, showing probe loss rate, unanswered run rate, and end-to-end latency, with a View in Network Path button" >}}

#### Network path hop summaries

The summary for a hop shows its IP address, AS name and number, city and country, and **Hop RTT Latency**. For a hop that is a network device monitored by NDM, the summary also links to the device's details. Click the hop to open the device's side panel.

{{< img src="network_performance_monitoring/l1_l7_map/path-hop-summary-hover.png" alt="A hover summary for a network path hop, showing its IP address, AS name, city, country, AS number, hop latency, and traversed count" style="width:50%;" >}}

### Click items on the map

When you click a resource, its side panel opens over the map. For example, clicking a host opens the host side panel. When you click a hop that is a network device, the device's side panel from NDM opens.

When you click a **+N more** item, the details pane shows a searchable list of the resources, connections, or network paths that the item represents.

Clicking a single connection line, a network path segment, or an AS group does not change the map or the details pane. To see the hops in an AS group, hover over the group and click **Expand**.

## Investigate an issue with the L1 to L7 Map

### Find the cause of a degraded resource

Use this workflow when a resource, such as a service, is slow or failing. It helps you find out whether the cause is in the resource's dependencies, infrastructure, or connections.

1. In Resource View, select the degraded resource, such as a service with high latency in APM.
1. Set the time frame to when the issue started.
1. Review the upstream and downstream resources and the composition stack. Hover over any red (Critical) or orange (Degraded) resource or connection to see its signals.

    **Note**: The resource you started from might not be red, because map status is based on network signals only.
1. To check whether the issue comes from the infrastructure that the resource runs on, hover over a degraded container, pod, or host, and click **Explore**. The map redraws around it and shows which other services run on it and which resources it communicates with.
1. To check whether the issue is in a connection, hover over a degraded connection and click **Explore connection**. The map switches to Connection View. To continue, follow the [Find where a connection degrades](#find-where-a-connection-degrades) workflow.
1. When you find a likely cause, continue from the details pane. Click **View details** to open the resource's side panel. To open the resource in its product, click the product link, such as **View in APM**.

### Find where a connection degrades

Use this workflow when two resources cannot communicate, or communicate slowly. It helps you check the connection's network signals and the latency of each segment along the path.

1. Open Connection View for the two resources. Select them on the L1 to L7 Map page, click **Add destination** while the source is the explored resource, or click **Explore connection** on the connection between them.
1. Set the time frame to when the issue started.
1. Hover over the network connections between the two stacks to check their failed setup, reset, and retransmit rates.
1. Check the network path between the two stacks. The label on each segment's line shows that segment's latency, and **FAILED** marks a segment where all probes failed. To see the hops in an AS group, hover over the group and click **Expand**. Hover over a hop to see its latency.
1. If a hop is a network device monitored by NDM, click the hop to open the device's side panel.
1. To examine the underlying traffic in CNM, click **View connection in CNM** in the details pane.
1. To examine the Network Path tests, hover over a network path segment and click **View in Network Path**. The Network Path explorer opens, filtered to the hosts at the ends of the path.

## Troubleshooting

### The map is not available

If the L1 to L7 Map does not appear under **Network Monitoring**, check that your organization has access to the Preview. If your organization does not use CNM, the page shows that the map is not available, with a link to set up CNM. The L1 to L7 Map is not available on Datadog for Government sites. If you cannot access the map, contact [Datadog Support][12].

### The map shows a partial view or is empty

When CNM has no traffic data for the selected resource or connection during the selected time frame, the map shows only part of the data, or no connected resources at all. Without CNM data, the map cannot show the composition stack or the traffic between resources. Network Path data appears where it is available.

The missing data can mean that CNM is not set up for the resource, or that the resource had no traffic. The map does not distinguish between these cases.

1. If CNM is not set up for the workloads, [set up Cloud Network Monitoring][8].
1. If CNM is set up, open the resource or connection in [CNM][14] and find a time frame with traffic. Select the same time frame on the map.
1. If CNM shows traffic but the map shows a partial view, contact [Datadog Support][12]. Include the resource names and the time frame.

### A service, container, or pod is missing

Check that the workload appears in the corresponding product, such as [APM][2], the [Containers Explorer][18], or the [Kubernetes Explorer][16]. If services are missing, start the investigation from the host, pod, or container. For the products that add each layer, see the [Prerequisites](#prerequisites) section.

### A host appears as an IP address

The Datadog Agent might not be installed on the host. [Install the Agent][9] on the host to see its composition stack.

### A connection has no hop-by-hop path

If Network Path is not set up for the source and destination, [set up Network Path][10] and create tests between them.

Check that Network Path has results for the source and destination during the selected time frame. Open the source and destination in [Network Path][15] to confirm. Traffic in CNM does not guarantee that a Network Path test or a complete route exists for the same source and destination. For services, containers, and pods, the map shows a path only when the test's destination is a host that the destination resource runs on. Paths to other destinations, such as a load balancer in front of the destination, do not appear.

### A hop appears as an IP address instead of a device

Check whether NDM monitors the device. If it does not, the hop appears as an IP address, with any available AS or location information. To open the device's side panel from the hop, [set up NDM][11] for the device.

### A status or metric is different in another product

Compare the same resource or connection over the same time frame, and check which signal each product shows. Map status is based on network signals, so it can differ from the resource's health in [APM][2] or the [Infrastructure List][17]. For more information, see the [Map status and network signals](#map-status-and-network-signals) section.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/
[2]: /tracing/
[3]: /containers/
[4]: /containers/kubernetes/
[5]: /network_monitoring/network_path/
[6]: /network_monitoring/devices/
[7]: https://app.datadoghq.com/network/l1-to-l7-map
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
[20]: /network_monitoring/cloud_network_monitoring/network_map/
