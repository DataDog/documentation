---
title: Network Data Table
description: View and analyze network data in the Analytics table and sidepanel.
further_reading:
    - link: '/network_monitoring/cloud_network_monitoring/network_analytics'
      tag: 'Documentation'
      text: 'Network Analytics'
    - link: '/logs/explorer/saved_views/'
      tag: 'Documentation'
      text: 'Saved Views'
    - link: '/network_monitoring/network_path'
      tag: 'Documentation'
      text: 'Network Path'
---

## Overview

The network data table and sidepanel provide detailed views of traffic flows between sources and destinations in your infrastructure. Use these tools to analyze metrics, troubleshoot issues, and investigate dependencies.

## Table

The network table breaks down the Volume, Throughput, TCP Retransmits, Round-trip Time (RTT), and RTT variance metrics between each **source** and **destination** defined by your query.

{{< img src="network_performance_monitoring/network_analytics/network_table_3.png" alt="Network data table showing auto-grouped traffic and throughput columns." >}}

You can configure the columns in your table using the **Customize** gear icon (⚙️) at the top right of the table.

Configure the traffic shown with the `Filter Traffic` button at the top right of the page.

{{< img src="network_performance_monitoring/network_analytics/filter_traffic_toggle.png" alt="Flow Details" style="width:50%;">}}

External traffic (to public IPs) and Datadog Agent traffic is shown by default. To narrow down your view, you can choose to toggle off the `Show Datadog Traffic` and `Show External Traffic` toggles.

### Unresolved traffic

Unresolved client and server tags are marked as `N/A`. A traffic client or server endpoint may be unresolved because it lacks identifiable metadata, such as source or destination information. This can occur when Datadog cannot resolve the traffic to known entities like load balancers, cloud services, or specific IP addresses within the monitored infrastructure. Typically, unresolved traffic may arise due to:

* The host or container client or server IPs are not tagged with the client or server tags used for traffic aggregation.
* The endpoint is outside of your private network, and accordingly is not tagged by the Datadog Agent.
* The endpoint is a firewall, service mesh or other entity where a Datadog Agent cannot be installed.
* The destination has not been tagged with a service, or an IP has not been mapped to any service.

Monitoring unresolved traffic is essential for identifying blind spots in network visibility and ensuring all relevant traffic is accounted for in performance and security analysis.

Use the **Show N/A (Unresolved Traffic)** toggle in the upper right corner of the data table to filter out aggregate connections with unresolved (`N/A`) clients or servers.

### Pivot to network path

Click the three dots menu in the analytics table to pivot to [network path][3] and see the paths between the source and destination specified in CNM.

{{< img src="network_performance_monitoring/network_analytics/view_network_path_3.png" alt="Clicking on the three dots menu in the Analytics table to show the Network Path toggle" style="width:90%;">}}

## Sidepanel

The sidepanel provides contextual telemetry to help you debug network dependencies. Use the Flows, Logs, Traces, and Processes tabs to determine whether a high retransmit count or latency in traffic between two endpoints is due to:

- A spike in traffic volume from a particular port or IP.
- Heavy processes consuming the CPU or memory of the destination endpoint.
- Application errors in the code of the client endpoint.

{{< img src="network_performance_monitoring/network_analytics/cnm_sidepanel_2.png" alt="CNM sidepanel detailing traffic between the client service traffic." style="width:90%;">}}

### Common tags

The top of the sidepanel displays common client and server tags shared by the inspected dependency's most recent connections. Use common tags to gain additional context into a faulty endpoint. For instance, when troubleshooting latent communication to a particular service, common destination tags surface the following:
- Granular context such as the container, task, or host to which traffic is flowing.
- Wider context such as the availability zone, cloud provider account, or deployment in which the service runs.

### Security

The **Security** tab highlights potential network threats and findings detected by [Workload Protection][1] and [Cloud Security Misconfigurations][2]. These signals are generated when Datadog detects network activity that matches a [detection or compliance rule][4], or if there are other threats and misconfigurations related to the selected network flow.

## Saved views

Organize and share views of traffic data. Saved Views make debugging faster and empower collaboration. For instance, you can create a view, save it for the future for common queries, and copy its link to share network data with your teammates.

- To save a view: click the **+ Save** button and name the view to record your current query, table configuration, and graph metric selections.
- To load a view: click **Views** at the top left to see your Saved Views and select a view from the list.
- To rename a view: hover over a view in the Saved Views list and click the gear icon to **Edit name**.
- To share a view: hover over a view in the Saved Views list and click the link icon to **Copy permalink**.

To learn more, see the [Saved Views][5] documentation.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/workload_protection/
[2]: /security/cloud_security_management/misconfigurations/
[3]: /network_monitoring/network_path
[4]: /security/detection_rules/
[5]: /logs/explorer/saved_views/

