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

<!-- TODO: All images on this page are placeholders cropped from the staging prototype. Replace them with final demo-org screenshots. -->

<!-- TODO (when final demo-org screenshots arrive): Every bolded UI label on this page comes from the staging prototype. Check each one against the screenshots and update it to match. This includes view names (Resource View, Connection View), buttons (Filter, Explore, Explore connection, View connection in CNM, View connection in Network Path, View connections, View details, View in APM, View in Kubernetes, Add destination, Add as source, Add as destination, Explore Relationships, Enable CNM, Set up Network Path), group and section labels (Upstream, Downstream, Services, Containers, Pods, Hosts, Popular across your network, Related resources, Filtered to, +N more, Groups, and the Groups facets), metric labels (Failed setup rate, Reset rate, Retransmit rate, Sent, Unanswered run rate, Probe loss rate, End-to-end latency), status values (Healthy, Degraded, Critical, Unknown, OK, WARNING, UNREACHABLE), and empty-state messages (You are seeing a partial view of data, No observed composition, No observed traffic, Get detailed network route information with Network Path). -->

## Overview

The L1 to L7 Map visualizes network relationships to help you diagnose problems with a resource, or find out why one resource cannot reach another. Use it to:

- **Investigate a resource**: See what a service, container, pod, or host runs on, and its upstream and downstream connections, with network signals such as retransmits and failed connections.
- **Investigate a connection**: Select a source and a destination to compare their supporting resources, observed traffic, and Network Path hops. See where along the path the connection degrades.

The map combines context from Cloud Network Monitoring (CNM), APM, Container Monitoring, Kubernetes, Network Path, and Network Device Monitoring (NDM). The map helps you identify dependencies and likely causes of issues in one place.

The L1 to L7 Map differs from other network maps in Datadog:

- The [CNM Network Map][20] shows traffic between groups of resources across your environment. Use the L1 to L7 Map to investigate one resource or one connection across the application, infrastructure, and network layers.
- The [Device Topology Map][13] shows the physical connections between network devices. The L1 to L7 Map shows network devices as hops on a network path.

{{< img src="network_performance_monitoring/l1_l7_map/map-overview.png" alt="The L1 to L7 Map in Resource View, showing a service with its upstream and downstream resources, its composition stack, and the details pane" >}}

## Prerequisites

The L1 to L7 Map has no Agent version requirement of its own. It builds the map from data that the following Datadog products collect. Follow the Agent and platform requirements for each product that you use.

| Product | Required | What it adds to the map |
|---|---|---|
| [Cloud Network Monitoring][1] | Yes | The connections between resources, and where each resource runs (its composition stack). Without CNM data, the map shows a partial view that omits the composition stack and observed traffic. Network Path data still appears where it is available. |
| [APM][2] | No | The service layer. Without APM, start your investigation from a host, pod, or container. |
| [Container Monitoring][3] | No | The container layer. Workloads that do not run in containers do not have this layer. |
| [Kubernetes][4] | No | The pod layer. Workloads that do not run on Kubernetes do not have this layer. |
| [Network Path][5] | No | The hop-by-hop network path between a source and a destination, with end-to-end latency, probe loss, and unanswered test runs. |
| [Network Device Monitoring][6] | No | The status and side panel of a network path hop that is a monitored network device. |

Before you use the map, open [CNM][14] and check that traffic appears for the resources you want to investigate. If you set up Network Path, check that the path between your source and destination appears in [Network Path][15].

## How the L1 to L7 Map works

### Map layout

The map has two views, Resource View and Connection View, and its layout depends on the view. To choose a view, see the [Open the map](#open-the-map) section.

The map shows two types of relationships between resources:

- **Composition**: Where a resource runs. For example, a service runs on containers, the containers run in pods, and the pods run on hosts. Composition is not network traffic.
- **Connections**: Network communication between resources. CNM provides the observed traffic, and Network Path provides the tested route.

The map shows composition as a vertical stack, in this order from top to bottom: **Services**, **Containers**, **Pods**, and **Hosts**. The map skips layers that do not apply to a resource.

To keep the map readable, each resource group and each connection line shows a limited number of items. The rest collapse into a **+N more** item.

#### Resource View layout

{{< img src="network_performance_monitoring/l1_l7_map/single-resource-map.png" alt="An explored container in the center of the map, with the services that run on it above, upstream resources on the left, and downstream resources on the right" >}}

In Resource View, the map centers on and highlights the selected resource, called the _explored resource_. Its composition stack appears in the middle of the map. When you explore a service, the stack shows the containers, pods, and hosts that the service runs on. When you explore a container, pod, or host, the stack also shows the services that run on it.

The explored resource's connections appear on either side of the stack:

- Resources that send traffic to the explored resource appear on the left, under **Upstream**.
- Resources that receive traffic from it appear on the right, under **Downstream**.

Upstream and downstream resources are the same type as the explored resource, such as services for a service or pods for a pod. Downstream resources can also be external endpoints, such as an IP address or a hostname and port. You cannot explore an endpoint on its own. To investigate a connection to an endpoint, use the endpoint as the destination in Connection View. When CNM and Network Path both have data for the same connection, the map combines the data into one line.

#### Connection View layout

{{< img src="network_performance_monitoring/l1_l7_map/source-destination-map.png" alt="Connection View, showing the composition stacks of two containers side by side with the network connection between them" >}}

In Connection View, the map shows the source's composition stack on the left and the destination's on the right.

The source and the destination must be the same type of resource, such as two services or two pods. The destination can also be an endpoint, such as an IP address or a hostname and port. An endpoint cannot be the source.

Between the two stacks, the map shows CNM and Network Path data as separate lines:

- **Network connections**: Traffic that CNM observes between the source and the destination.
- **Network path**: The hop-by-hop path from Network Path, at the host layer. The path runs between the hosts that the source and the destination run on, or from the source's host to a destination endpoint. The map shows this path even when the source and the destination are services, containers, or pods.

When Network Path tests more than one pair of hosts, the map shows the least healthy path. The other paths collapse into a **+N more** item. The path that the map shows does not necessarily pass through the least healthy hosts in the two stacks.

The map groups hops in the same autonomous system (AS). Each line between two hops or AS groups is a _network path segment_.

### Map status and network signals

Each resource and connection on the map has a status of **Healthy**, **Degraded**, **Critical**, or **Unknown**. Status is based on network signals from CNM and Network Path for the selected time frame. **Unknown** means that the map cannot determine a status, for example, because neither product has data for the resource or connection. In hover summaries, Healthy appears as **OK** and Degraded appears as **WARNING**. The details pane shows statuses in uppercase, such as **HEALTHY**.

The outline color of a resource and the color of a connection line show their status:

- **Red**: Critical
- **Orange**: Degraded
- **Green**: Healthy connection
- **No color**: A Healthy or Unknown resource, or an Unknown connection

Healthy and Unknown resources look the same on the map. To see a resource's status, hover over it or find it in the **Related resources** list in the details pane.

Each group lists its resources from most to least severe status: Critical, Degraded, Healthy, then Unknown.

The following signals appear on the map. Some signals set status, and the rest provide context only:

| Signal | Source | What it measures | Effect on status |
|---|---|---|---|
| Failed setup rate | CNM | The percentage of TCP connections that failed to open, for example, because they were refused or timed out. | Can set Critical or Degraded |
| Reset rate | CNM | The percentage of TCP connections that were reset. | Can set Critical |
| Retransmit rate | CNM | The percentage of TCP packets that were retransmitted. | Can set Degraded |
| Sent | CNM | The average throughput that the client sends. | None |
| Unanswered run rate | Network Path | The percentage of test runs that received no response. | Can set Critical |
| Probe loss rate | Network Path | The percentage of probes that did not reach the destination. | Can set Degraded |
| End-to-end latency | Network Path | The average round-trip time between the source and the destination. | None |

When CNM has data for a resource or connection, the CNM signals set its status. The Network Path signals set the status only when the CNM status is Unknown. Network Path signals count only for TCP tests, so a path with only UDP or ICMP tests has an Unknown status.

Data from other products does not affect map status. For example, APM errors, Kubernetes pod states, host utilization, and NDM device status do not change a resource's status on the map.

The map shows only the signals that are available for each resource or connection. The hover summary for a resource or connection shows which signal determines its status. If a signal is missing, such as when Network Path does not test a connection, the map cannot detect issues with that signal.

Map status is not a complete assessment of a resource's health. A resource with a healthy map status can still have issues that network signals do not capture. A red or orange resource is a starting point for an investigation, not proof that it caused the issue. To investigate application errors, pod state, or host utilization, open the resource in [APM][2], the [Kubernetes Explorer][16], or the [Infrastructure List][17].

## Navigate the L1 to L7 Map

### Open the map

To open the map, navigate to [**Network Monitoring > L1 to L7**][7].

You can also open the map from other Datadog products. The map loads with that resource or connection already selected:

| From | Where to find the link |
|---|---|
| Cloud Network Monitoring | In the CNM analytics table, open the action menu for a row, or open the side panel for a connection. Click **Explore connection** to open the connection in Connection View. |
| APM | In the **Network** tab of a span in a trace, click **Explore Relationships**. |
| Kubernetes Explorer | In the **Network** tab of a pod's side panel, click **Explore Relationships**. |
| Containers | In the **Network** tab of a container's side panel, click **Explore Relationships**. |
| Infrastructure List | In the **Network** tab of a host's side panel, click **Explore Relationships**. |

**Explore Relationships** opens the resource in Resource View.

{{< img src="network_performance_monitoring/l1_l7_map/investigation-modes.png" alt="The L1 to L7 Map page, with options to select Resource View or Connection View and a search field" style="width:70%;" >}}

On the L1 to L7 Map page, select a view:

- **Resource View**: Start with one service, container, pod, or host. In the search field, select a resource type (**Service**, **Container**, **Pod**, or **Host**) and search for the resource. You can also select a resource from the **Popular across your network** list. For a walkthrough, see the [Find the cause of a degraded resource](#find-the-cause-of-a-degraded-resource) section.
- **Connection View**: Search for and select a **Source** and a **Destination**. For a walkthrough, see the [Find where a connection degrades](#find-where-a-connection-degrades) section.

{{< img src="network_performance_monitoring/l1_l7_map/landing-page-search.png" alt="The L1 to L7 Map page in Resource View, with the search menu open to resource types and popular resources" style="width:70%;" >}}

### Change what the map shows

After the map loads, you can change what it shows:

- To add a destination, click **Add destination** next to the search field at the top of the map, and select a destination. The map switches to Connection View.
- To remove the source or destination, click the **X** at the end of its search field. When you remove the destination, the map returns to Resource View for the source. When you remove the source, the destination becomes the explored resource.
- To explore a different resource or connection, use **Explore** or **Explore connection**. For details, see the [Hover over resources and connections](#hover-over-resources-and-connections) section.
- To change the time frame, use the time picker.
- To zoom in on a section of the map, or to fit the map to the screen, use the zoom controls.
- To see the resources in a collapsed group, click **+N more** at the bottom of the group. The map filters to those resources, and the details pane lists them.
- To narrow the map to an environment, availability zone, or other infrastructure group, use the **Groups** panel. For details, see the [Filter by group](#filter-by-group) section.

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

Hover over any item on the map to see its summary. The actions available from the summary depend on the type of item. To see what happens when you click an item, see the [Details pane for a clicked item](#details-pane-for-a-clicked-item) section.

#### Resource summaries

The summary for a resource shows its type, status, and available metrics. From the summary, you can:

- Click **Filter** to narrow the map to that resource, called the _filtered resource_, and its related resources, such as the pod and host that it runs on. The explored resource stays at the center of the map, and the details pane shows the filtered resource. To clear the filter, click the **X** next to **Filtered to** at the top of the map.
- Click **Explore** to make that resource the explored resource. The map redraws around it. Endpoints do not have this action.
- For an upstream resource, click **Add as source**. For a downstream resource, click **Add as destination**. The map switches to Connection View for the connection between that resource and the explored resource.

{{< img src="network_performance_monitoring/l1_l7_map/resource-hover-summary.png" alt="A hover summary for a container, showing its status, CPU, memory, and packet drops, with Filter and Explore buttons" >}}

#### Network connection summaries

The summary for a network connection shows its **Failed setup rate**, **Reset rate**, **Retransmit rate**, and **Sent** throughput. For what each signal measures, see the [Map status and network signals](#map-status-and-network-signals) section.

From the summary, click **Explore connection** to open the connection in Connection View, or click **View connection in CNM**.

{{< img src="network_performance_monitoring/l1_l7_map/connection-hover-summary.png" alt="A hover summary for a connection between two containers, showing retransmits, TCP failures, throughput, and RTT" >}}

#### Network path segment summaries

The summary for a network path segment shows its **End-to-end latency**, **Probe loss rate**, and **Unanswered run rate**. From the summary, click **Explore connection** to investigate the segment in Connection View, with its two hops as the source and the destination. You can also click **View connection in Network Path**.

<!-- TODO (screenshots): Check whether a network path segment's hover summary still offers Explore connection. The source/destination rules reject an endpoint as the source, and hops are often IP addresses. If the action is gone, remove it here and in step 4 of the Find where a connection degrades workflow. -->

The summary for a hop that is a network device shows the device's status.

{{< img src="network_performance_monitoring/l1_l7_map/network-path-segment-hover-summary.png" alt="A hover summary for a network path segment between two network devices, showing reachability, end-to-end latency, and packet loss" >}}

### Use the details pane

The details pane, to the right of the map, shows information about the explored resource, the filtered resource, or the connection between a source and a destination. It also shows details for some items that you click on the map. The content depends on the view and on what you click.

#### Details pane in Resource View

In Resource View, the details pane shows the following for the explored or filtered resource:

- The resource's status, such as **HEALTHY** or **CRITICAL**.
- **View details**, which opens the resource's side panel over the map to show more data, such as logs and traces.
- A link to open the resource in its product, such as **View in APM** for a service or **View in Kubernetes** for a container. Use the dropdown next to the link to open the resource in another product.
- Infrastructure context, such as the environment, availability zone, VPC, data center, and security groups.
- The resource's metrics from CNM, Network Path, and other products, such as APM and Infrastructure, with charts over the selected time frame.
- **Related resources**, a searchable list of the resources on the map, sorted by status.

{{< img src="network_performance_monitoring/l1_l7_map/filtered-resource-side-pane.png" alt="The details pane for a filtered container, showing its status, links to view details and open it in Kubernetes, infrastructure context, metrics, and an RTT graph" >}}

#### Details pane in Connection View

In Connection View, the details pane shows the following for the connection between the source and the destination:

- The status of the source and the destination, such as **HEALTHY** or **CRITICAL**.
- **View connections**, which opens the connections in CNM. Use the dropdown next to the link to open the connections in another product.
- The network signals for the connection, with charts over the selected time frame. For definitions, see the [Map status and network signals](#map-status-and-network-signals) section.
- **Related resources**, a searchable list of the resources on both sides of the connection, sorted by status.

{{< img src="network_performance_monitoring/l1_l7_map/connection-details-pane.png" alt="The details pane in Connection View, showing the status of the source and destination containers, a View connections button, connection signals, and an RTT graph" style="width:50%;" >}}

#### Details pane for a clicked item

When you click a resource, its side panel opens over the map. For example, clicking a host opens the host side panel. When you click a hop that is a network device, the device's side panel from NDM opens.

When you click other items, the details pane shows details for that item:

- **+N more in a resource group**: A list of the collapsed resources.
- **A connection, or +N more on a connection**: A searchable list of the individual CNM connections that the line represents.
- **An AS group on a network path**: The hops in the group and their reachability, such as **OK** or **UNREACHABLE**.
- **A network path segment**: The segment's end-to-end latency, probe loss rate, and unanswered run rate, with a link to open the segment in Network Path. The map also filters to the segment.

## Investigate an issue with the L1 to L7 Map

### Find the cause of a degraded resource

Use this workflow when a resource, such as a service, is slow or failing. It helps you find out whether the cause is in the resource's dependencies, infrastructure, or connections.

1. In Resource View, select the degraded resource, such as a service with high latency in APM. For details, see the [Open the map](#open-the-map) section.
1. Set the time frame to when the issue started.
1. Review the upstream and downstream resources and the composition stack. Hover over any red or orange resource or connection to see which signal is degraded.

    **Note**: The resource you started from might not be red, because map status is based on network signals only.
1. To check whether the issue comes from the infrastructure that the resource runs on, hover over a degraded container, pod, or host, and click **Explore**. The map redraws around it and shows which other services run on it and which resources it communicates with.
1. To check whether the issue is in a connection, hover over a degraded connection and click **Explore connection**. The map switches to Connection View. To continue, follow the [Find where a connection degrades](#find-where-a-connection-degrades) workflow.
1. When you find a likely cause, continue from the details pane. Click **View details** to open the resource's side panel. To open the resource in its product, click the link, such as **View in APM**.

### Find where a connection degrades

Use this workflow when two resources cannot communicate, or communicate slowly. It helps you find the point on the path where a network signal degrades.

1. Open Connection View for the two resources. Select them on the L1 to L7 Map page, click **Add destination** while the source is the explored resource, or click **Explore connection** on the connection between them. For details, see the [Change what the map shows](#change-what-the-map-shows) section.
1. Set the time frame to when the issue started.
1. Hover over the network connections between the two stacks to check their failed setup, reset, and retransmit rates.
1. Hover over the network path segments, and click the AS groups, to find where along the path latency, probe loss, or unanswered test runs begin. To investigate a degraded segment on its own, hover over it and click **Explore connection**.
1. If a hop is a network device monitored by [NDM][6], hover over the hop to see its status. Click the hop to open the device's side panel.
1. To examine the underlying traffic in CNM, click **View connections** in the details pane.
1. To examine the hop-by-hop path, hover over a network path segment and click **View connection in Network Path**. The connection's [path view][19] opens in Network Path.

## Troubleshooting

### The map is not available

Check that your organization has access to the Preview. The L1 to L7 Map is not available on Datadog for Government sites. If you still cannot access the map, contact [Datadog Support][12].

### The map shows a partial view or is empty

When CNM has no traffic data for the selected resource or connection during the selected time frame, the map shows only part of the data. The map displays **You are seeing a partial view of data**, and composition groups without CNM data display **No observed composition**. In Connection View, when CNM observes no traffic between the source and the destination, the map displays **No observed traffic** between them. Network Path data still appears where it is available.

The missing data can mean that CNM is not set up for the resource, or that the resource had no traffic. The map does not distinguish between these cases.

1. If CNM is not set up for the workloads, click **Enable CNM** on the map, or [set up Cloud Network Monitoring][8].
1. If CNM is set up, open the resource or connection in [CNM][14] and find a time frame with traffic. Select the same time frame on the map.
1. If CNM shows traffic but the map still shows a partial view, contact [Datadog Support][12]. Include the resource names and the time frame.

### A service, container, or pod is missing

Check that the workload appears in the corresponding product, such as [APM][2], the [Containers Explorer][18], or the [Kubernetes Explorer][16]. If the service layer is missing, start the investigation from the host, pod, or container. Workloads that do not run in containers have no container layer. Workloads that do not run on Kubernetes have no pod layer.

### A host appears as an IP address

If a host in your infrastructure appears as an IP address, the Datadog Agent might not be installed on it. [Install the Agent][9] on the host to see its composition stack.

### A connection has no hop-by-hop path

If Network Path is not set up, the map displays **Get detailed network route information with Network Path**. Click **Set up Network Path**, or see [Set up Network Path][10]. If Network Path has no tests for the resources on the map, the map displays a link to create path tests. In Resource View, the link appears in the **Upstream** and **Downstream** groups. In Connection View, it appears between the source and destination hosts.

Check that Network Path has results for the source and destination during the selected time frame. Open the source and destination in [Network Path][15] to confirm. Traffic in CNM does not guarantee that a Network Path test or a complete route exists for the same source and destination.

### A hop appears as an IP address instead of a device

Check whether Network Device Monitoring monitors the device. If it does not, the hop appears as an IP address or external endpoint, with any available AS or location information. To see the device's status and side panel from the hop, [set up NDM][11] for the device.

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
[19]: /network_monitoring/network_path/path_view/
[20]: /network_monitoring/cloud_network_monitoring/network_map/
