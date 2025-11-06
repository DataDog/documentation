---
title: Network Analytics
description: Explore your Network data between each source and destination across your stack.
aliases:
    - /network_performance_monitoring/network_table
    - /network_performance_monitoring/network_page
    - /network_monitoring/performance/network_page
    - /network_monitoring/performance/network_analytics
further_reading:
    - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
      tag: 'Blog'
      text: 'Cloud Network Monitoring'
    - link: 'https://www.datadoghq.com/blog/datadog-npm-search-map-updates/'
      tag: 'Blog'
      text: 'Streamline network investigations with an enhanced querying and map experience'
    - link: '/network_monitoring/devices'
      tag: 'Documentation'
      text: 'Network Device Monitoring'
    - link: '/network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/'
      tag: 'Guide'
      text: 'Detecting Application Availability using Network Insights'
---

## Overview

The Network Analytics page provides insights into your overall network health and shows [recommended queries](#recommended-queries) at the top of the page. These recommended queries enable you to run common queries and see snapshots of relevant metrics, so that you can see changes in throughput, latency, DNS errors, and more. Clicking on a recommended query automatically populates the search bar, group bys, and summary graphs to provide you with relevant insights into your network.

{{< img src="network_performance_monitoring/network_analytics/cnm_network_analytics_3.png" alt="Network Analytics landing page under Cloud Network Monitoring" >}}

## Queries

To refine your search to traffic between particular endpoints, aggregate and filter your network connections **with tags**. Tags from Datadog integrations or [Unified Service Tagging][12] can be used for aggregating and filtering automatically. When utilizing tagging in Network Monitoring, you can take advantage of how network traffic flows across availability zones for a particular service or for your entire infrastructure. Grouping by `client` and `server` tags visualizes the network flow _between_ those two sets of tags.

Additionally, Datadog provides a list of default [out-of-the-box](#default-tags) tags that you can use to efficiently query and analyze the network traffic most relevant to your needs.

{{< img src="network_performance_monitoring/network_analytics/network_diagram_with_tags.png" alt="network diagram showing how requests are seen when grouping by tags" style="width:100%;">}}

For example, if you want to see network traffic between your ordering service called `orders-app` and all of your availability zones, use `client_service:orders-app` in the search bar, and add the `client_service` and `server_availability-zone` tags in the **Group By** drop-down to visualize the traffic flow between these two sets of tags:

{{< img src="network_performance_monitoring/network_analytics/network_analytics_with_client_and_server_tag_2.png" alt="Network Analytics page showing how requests are seen when filtering on service and grouping by availability zone" style="width:90%;">}}

The default view aggregates the client and server by the `service` tag. Accordingly, each row in the table represents service-to-service aggregate connections when aggregated over a one hour time period. Select **Auto-grouped traffic** to see traffic bucketed into several commonly used tags such as `service`, `kube_service`, `short_image`, and `container_name`.

**Note**: For information on `NA/Untagged` traffic paths, see [Unresolved traffic](#unresolved-traffic).

### Understanding client and server roles in relation to traffic direction

The Network Analytics page shows directional traffic flows from clients in one zone to servers in another. These flows are not symmetrical and may not show equal "bytes sent" and "bytes received" when reversed.

In this context:

- Client refers to the side that initiates the connection.
- Server is the side that responds to that connection.

Datadog monitors traffic based on who opened the connection. The reverse direction (server to client) is shown as a separate flow and may have different volume metrics, or no data at all if no connections are initiated in that direction.

For example, if a client in `us-east-1d` talks to a server in `us-east-1c`, you may see significant traffic. However, if there is no server in `us-east-1d`, the reverse row (`us-east-1c → us-east-1d`) may show little or no data.

**Note**: Asymmetries in traffic can also result from application behavior or infrastructure elements (for example, proxies or NATs), or lack of connection initiation in one direction.

### Recommended queries

{{< img src="network_performance_monitoring/network_analytics/recommended_queries_3.png" alt="The Network Analytics page in Datadog displaying three recommended queries">}}

Recommended queries allow you to begin investigating into your network—whether you're troubleshooting a specific issue or gaining a better overall understanding of your network. The recommended queries help you find relevant network information without needing to search for or group the traffic. For example, the recommended query `Find dependencies of service: web-store` populates the search bar with the query `client_service: web-store` and displays the top services that the service web-store is sending traffic to within the network, and therefore its downstream dependencies.

Any available recommended queries are provided at the top of the Analytics page, and there are three recommended queries at the top of the [DNS page][10]. Use these queries to access commonly used data, and see any changes in that data in the last hour.

To run a recommended query, click on the tile. Hovering over the tile displays a description and summary of the data the query returns.

{{< img src="network_performance_monitoring/network_analytics/recommended_query_detail.png" alt="The detail view of a recommended query displaying a description and query information, with four query dimensions displayed: Search for, View clients as, View servers as, and Visualize as" style="width:70%;">}}

### Facet panels

Use the facet panels to browse all available tags on your flows or filter traffic without needing to remember exact tag names. Facet panels mirror the tags in your search bar query. Use the **Client** and **Server** tabs to switch between facet panels.

#### Custom facets

Aggregate and filter your traffic data by any tags on the network analytics page. A list of included tags is located on the left side of the screen under the **Client** and **Server** tabs, and in the **Group By** dropdown menu.

Include listed tags are `service`, `availability zone`, `env`, `environment`, `pod`, `host`, `ip`, and `port`, among others. If you want to aggregate or filter traffic by a tag that is not already in the menu, add it as a custom Facet:

1. Select the **+ Add** button on the top right of the facet panels.
2. Enter the relevant tag you want to create a custom facet upon.
3. Click **Add**.

After the custom facet is created, use this tag to filter and aggregate traffic on the network analytics page and network map. All custom facets can be viewed in the bottom `Custom` section of the facet panels.

### Wildcard search
To perform a multi-character wildcard search, use the `*` symbol as follows:

- `client_service:web*` matches all client services that start with web.
- `client_service:*web` matches all client services that end with web.
- `client_service:*web*` matches all client services that contain the string web.

Wildcard searches work within facets with this syntax. This query returns all the client services that end with the string "mongo":

`client_service:*mongo`

To learn more, see the [search syntax][1] documentation.

### Group by

Groups allow you to group your data by a given tag's value. For example, if you select a grouping such as **host**, results are grouped by individual hosts. Additionally, you may have large chunks of data that are not tagged by the grouping you're interested in. In these situations, you can use **Auto-grouped traffic** to group data by whichever tags are available.

If you want to investigate connections from all of your hosts in a single grouping, add the `client_host` and  `Auto-Grouped-Servers` tags in the **Group By** dropdown.

{{< img src="network_performance_monitoring/network_analytics/cnm_auto-grouped_client.png" alt="NPM analytics page sorting by host and grouped by Auto-grouped traffic" style="width:90%;">}}

The **Auto-grouped traffic** option can help you identify the source of your tags. For example, hover over the individual icons to display a tooltip that indicates the tag's origin:

{{< img src="network_performance_monitoring/network_analytics/npm_icon_tooltip.png" alt="Hovering over the icon tooltip to display the tag source" style="width:90%;">}}

### Neutral tags

Neutral tags are tags that are not specific to a client or server, and instead apply to an entire flow. You can search for and filter on traffic with these neutral tags. For example, you can use these tags to filter for traffic that is TLS encrypted.

{{< img src="network_performance_monitoring/network_analytics/cnm_using_neutral_tags_2.png" alt="Screenshot showing how to search for neutral tags, with an example on searching for 'tls_encrypted' traffic" style="width:90%;">}}

The following is the list of neutral tags available for use:

<table>
<thead>
<tr>
<th style="white-space: nowrap; width: 300px; min-width: 300px;">Tag</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>gateway_availability-zone</code></td>
<td>Availability zone hosting the gateway (for example, <code>us-east-1a</code>).</td>
</tr>
<tr>
<td><code>gateway_id</code></td>
<td>Unique identifier for the AWS gateway resource.</td>
</tr>
<tr>
<td><code>gateway_public_ip</code></td>
<td>Public IP address assigned to the NAT gateway.</td>
</tr>
<tr>
<td><code>gateway_region</code></td>
<td>AWS region of the gateway (for example, <code>us-east-1</code>).</td>
</tr>
<tr>
<td><code>gateway_type</code></td>
<td>Type of AWS gateway (internet, NAT, or Transit).</td>
</tr>
<tr>
<td><code>intra_availability_zone</code></td>
<td>Indicates whether network flows are within an availability zone (<code>true</code>), cross-availability zone (<code>false</code>), or undetermined (<code>unknown</code>). <strong>Note</strong>: Not applicable for Azure.</td>
</tr>
<tr>
<td><code>intra_region</code></td>
<td>Indicates whether network flows are within a region (<code>true</code>), cross-region (<code>false</code>), or undetermined (<code>unknown</code>).</td>
</tr>
<tr>
<td><code>is_agent_traffic</code></td>
<td>Indicates if the traffic was generated by the Datadog Agent.</td>
</tr>
<tr>
<td><code>tgw_attachment_id</code></td>
<td>Unique identifier for the AWS Transit Gateway attachment.</td>
</tr>
<tr>
<td><code>tgw_attachment_type</code></td>
<td>Type of Transit Gateway attachment (for example, VPC, VPN, Direct Connect).</td>
</tr>
<tr>
<td><code>tls_cipher_insecure</code></td>
<td>Indicates if the cipher used is considered secure.</td>
</tr>
<tr>
<td><code>tls_cipher_suite</code></td>
<td>Identifies the TLS cipher suite used (for example, <code>tls_ecdhe_rsa_with_aes_128_gcm_sha256</code>).</td>
</tr>
<tr>
<td><code>tls_client_version</code></td>
<td>The TLS version supported by the client (<code>tls_1.2</code> or <code>tls_1.3</code>).</td>
</tr>
<tr>
<td><code>tls_encrypted</code></td>
<td>Specifies if the connection is encrypted using TLS.</td>
</tr>
<tr>
<td><code>tls_version</code></td>
<td>The TLS version used (<code>tls_1.2</code> or <code>tls_1.3</code>).</td>
</tr>
<tr>
<td><code>vpc_endpoint_id</code></td>
<td>Unique identifier for the VPC endpoint.</td>
</tr>
</tbody>
</table>

## Summary graphs

The summary graphs are a condensed view of your network, which you can modify to display volume, throughput, connections, or latency as needed. Display up to three summary graphs at a time, and change the data and visualization type to suit your organization. To update a graph's data source, click on the graph's title and make a selection from the dropdown menu.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_options.png" alt="The summary graph section of the Network Analytics page, displaying the available options to filter the data: Volume Sent, Throughput Sent, Volume Received, Throughput Received, Established Connections, Closed Connections, Established Connections / Second, Closed Connections / Second, and TCP Latency" style="width:80%;">}}

To change the visualization type, click on the pencil icon in the top right corner of the graph. Select from the options available, as shown in the screenshot below.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_visualization_options.png" alt="The summary graph visualization options, displaying options to adjust Y-Axis Scale with Linear, Log, Pow, and Sqrt, and to adjust Graph Type with Area, Line, Bars, Toplist, Change, and Piechart" style="width:60%;">}}

To hide a specific graph, click on the **hide graph** icon next to the pencil icon. You can display as little as one graph or as many as three graphs. To add graphs, click on the plus icon `+` on the right side of the summary graph and select the graph to add. You can also reset the graphs to the default graphs when adding a new graph.

## Network data

Network metrics are displayed through the graphs and the associated table. All sent and received metrics are displayed from the perspective of the source:

* **Sent metrics**: measure the value of something from the _source_ to the _destination_ from the source's perspective.
* **Received metrics**: measure the value of something from the _destination_ to the _source_ from the source's perspective.

Values displayed might be different for `sent_metric(source to destination)` and `received_metric(destination to source)` if there is a large number of packet drops. In this case, if the `destination` sends a lot of bytes to the `source`, the aggregate connections that originate at `destination` include those bytes, but the aggregate connections that originate at `source` do not see them as received.

**Note:** Data is collected every 30 seconds, aggregated in five minute buckets, and retained for 14 days.

### Metrics

#### Network load

The following network load metrics are available:

| Metric          |  Description                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Volume**      | The number of bytes sent or received over a period. Measured in bytes (or orders of magnitude thereof) bidirectional.                           |
| **Throughput**  | The rate of bytes sent or received over a period. Measured in bytes per second, bidirectional.                                                  |

#### TCP

TCP is a connection-oriented protocol that guarantees in-order delivery of packets. 

The following TCP metrics are available: 

| Metric | Description |
|---|---|
| **Closed Connections** | The number of TCP connections in a closed state. Measured in connections per second from the client. |
| **Established Connections** | The number of TCP connections in an established state. Measured in connections per second from the client. |
| **Host Unreachable** | Indicates when the target host is offline or traffic is blocked by routers or firewalls. Available in **Agent 7.68+**. |
| **Network Unreachable** | Indicates local networking issues on the Agent's host machine. Available in **Agent 7.68+**. |
| **Connection Cancels** | Tracks TCP connection cancellations and userspace connection timeouts in language runtimes such as `Go` and `Node.js`. Available in **Agent 7.70+**. |
| **TCP Jitter** | Measured as TCP smoothed round-trip time variance. |
| **TCP Latency** | Measured as TCP smoothed round-trip time, that is, the time between a TCP frame being sent and acknowledged. |
| **TCP Refusals**  | The number of TCP connections that were refused by the server. Typically this indicates an attempt to connect to an IP/port that isn't receiving connections, or a firewall/security misconfiguration. |
| **TCP Resets**  | The number of TCP connections that were reset by the server.  |
| **TCP Retransmits** | TCP Retransmits represent detected failures that are retransmitted to ensure delivery. Measured in count of retransmits from the client. |
| **TCP Timeouts**  | The number of TCP connections that timed out from the perspective of the operating system. This can indicate general connectivity and latency issues.  |

All metrics are measured from the `client` side of the connection when available, otherwise from the server side.

For information about monitoring cloud services and external endpoints, see [Cloud Service Monitoring][13].

For information about analyzing data in the network table and sidepanel, see [Network Data Table][14].

For a complete reference of default tags available for querying and filtering network traffic, see [Tags Reference][15].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/search_syntax/
[2]: /network_monitoring/cloud_network_monitoring/network_map/
[3]: /network_monitoring/cloud_network_monitoring/supported_cloud_services/aws_supported_services/
[4]: /network_monitoring/cloud_network_monitoring/supported_cloud_services/gcp_supported_services/
[10]: /network_monitoring/dns/#recommended-queries
[12]: /getting_started/tagging/unified_service_tagging/
[13]: /network_monitoring/cloud_network_monitoring/cloud_service_monitoring/
[14]: /network_monitoring/cloud_network_monitoring/network_data_table/
[15]: /network_monitoring/cloud_network_monitoring/tags_reference/

