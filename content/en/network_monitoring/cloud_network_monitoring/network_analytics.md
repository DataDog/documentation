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

{{< img src="network_performance_monitoring/network_analytics/cnm_network_analytics_2.png" alt="Network Analytics landing page under Cloud Network Monitoring" >}}

## Queries

To refine your search to traffic between particular endpoints, aggregate and filter your network connections **with tags**. Tags from Datadog integrations or [Unified Service Tagging][12] can be used for aggregating and filtering automatically. When utilizing tagging in Network Monitoring, you can take advantage of how network traffic flows across availability zones for a particular service or for your entire infrastructure. Grouping by `client` and `server` tags visualizes the network flow _between_ those two sets of tags.

Additionally, Datadog provides a list of default [out-of-the-box](#default-tags) tags that you can use to efficiently query and analyze the network traffic most relevant to your needs.

{{< img src="network_performance_monitoring/network_analytics/network_diagram_with_tags.png" alt="network diagram showing how requests are seen when grouping by tags" style="width:100%;">}}

For example, if you want to see network traffic between your ordering service called `orders-app` and all of your availability zones, use `client_service:orders-app` in the search bar, add the `service` tag in the **View clients as** drop-down, then use the `availability-zone` tag in the **View servers as** drop-down to visualize the traffic flow between these two sets of tags:

{{< img src="network_performance_monitoring/network_analytics/network_analytics_with_client_and_server_tag.png" alt="Network Analytics page showing how requests are seen when filtering on service and grouping by availability zone" style="width:90%;">}}

For information on `NA/Untagged` traffic paths, see [Unresolved traffic](#unresolved-traffic).

Additionally, the following diagram illustrates inbound and outbound requests when grouping by `client` and `server` tags. The client is where the connection originated, and the server is where the connection terminated.

{{< img src="network_performance_monitoring/network_analytics/network_diagram2.png" alt="network diagram showing inbound and outbound requests" style="width:100%;">}}

The following screenshot shows the default view, which aggregates the client and server by the `service` tag. Accordingly, each row in the table represents service-to-service aggregate connections when aggregated over a one hour time period. Select "Auto-grouped traffic" to see traffic bucketed into several commonly used tags such as `service`, `kube_service`, `short_image`, and `container_name`.

{{< img src="network_performance_monitoring/network_analytics/cnm_default_view_2.png" alt="CNM default view with drop downs showing view clients and servers as auto grouped traffic" style="width:90%;">}}

The next example shows all aggregate connections from IP addresses representing services in region `us-east-1` to availability zones:

{{< img src="network_performance_monitoring/network_analytics/cnm_flow_table_region_2.png" alt="Aggregate connection table filtered" style="width:90%;">}}

You can further aggregate to isolate to traffic where the client or server matches a CIDR using `CIDR(network.client.ip, 10.0.0.0/8)` or `CIDR(network.server.ip, 10.0.0.0/8)`.

### Understanding client and server roles in relation to traffic direction

The Network Analytics page shows directional traffic flows from clients in one zone to servers in another. These flows are not symmetrical and may not show equal "bytes sent" and "bytes received" when reversed.

In this context:

- Client refers to the side that initiates the connection.
- Server is the side that responds to that connection.

Datadog monitors traffic based on who opened the connection. The reverse direction (server to client) is shown as a separate flow and may have different volume metrics, or no data at all if no connections are initiated in that direction.

For example, if a client in `us-east-1d` talks to a server in `us-east-1c`, you may see significant traffic. However, if there is no server in `us-east-1d`, the reverse row (`us-east-1c → us-east-1d`) may show little or no data.

**Note**: Asymmetries in traffic can also result from application behavior or infrastructure elements (for example, proxies or NATs), or lack of connection initiation in one direction.

### Recommended queries

{{< img src="network_performance_monitoring/network_analytics/recommended_queries_2.png" alt="The Network Analytics page in Datadog displaying three recommended queries">}}

Recommended queries allow you to begin investigating into your network—whether you're troubleshooting a specific issue or gaining a better overall understanding of your network. The recommended queries help you quickly find relevant network information without needing to search for or group the traffic. For example, the recommended query `Find dependencies of service: web-store` populates the search bar with the query `client_service: web-store` and displays the top services that the service web-store is sending traffic to within the network, and therefore its downstream dependencies.

Any available recommended queries are provided at the top of the Analytics page, and there are three recommended queries at the top of the [DNS page][10]. Use these queries to access commonly used data, and see any changes in that data in the last hour.

To run a recommended query, click on the tile. Hovering over the tile displays a description and summary of the data the query returns.

{{< img src="network_performance_monitoring/network_analytics/recommended_query_detail.png" alt="The detail view of a recommended query displaying a description and query information, with four query dimensions displayed: Search for, View clients as, View servers as, and Visualize as" style="width:80%;">}}

### Facet panels

You can use the facet panels to browse through all of the tags available on your flows, or filter traffic when you don't remember the exact tags you were looking for. Facet panels mirror the tags in your search bar query. Switch between the facet panels with the **Client** and **Server** tabs on top:

{{< img src="network_performance_monitoring/network_analytics/destination_panel2.png" alt="Destination panel" style="width:20%;">}}

#### Custom facets

Aggregate and filter your traffic data by any tags on the network analytics page. A list of included tags is located on the left side of the screen under the **Client** and **Server** tags, and in the **View clients as** and **View servers as** dropdown menus.

{{< img src="network_performance_monitoring/network_analytics/drop_down_cnm.png" alt="Dropdown menu from network analytics page showing the facet list" style="width:90%;">}}

Include listed tags are `service`, `availability zone`, `env`, `environment`, `pod`, `host`, `ip`, and `port`, among others. If you want to aggregate or filter traffic by a tag that is not already in the menu, add it as a custom Facet:

1. Select the **+ Add** button on the top right of the facet panels.
2. Enter the relevant tag you want to create a custom facet upon.
3. Click **Add**.

Once the custom facet is created, use this tag to filter and aggregate traffic on the network analytics page and network map. All custom facets can be viewed in the bottom `Custom` section of the facet panels.

### Wildcard search
To perform a multi-character wildcard search, use the `*` symbol as follows:

- `client_service:web*` matches all client services that start with web.
- `client_service:*web` matches all client services that end with web.
- `client_service:*web*` matches all client services that contain the string web.

Wildcard searches work within facets with this syntax. This query returns all the client services that end with the string "mongo":

`client_service:*mongo`

To learn more, see the [search syntax][1] documentation.

### Group by

Groups allow you to group your data by a given tag's value. For example, if you select a grouping such as **host**, results are grouped by individual hosts. You can also choose to view all your data in a single group using the **Ungrouped traffic** option. Additionally, you may have large chunks of data that are not tagged by the grouping you're interested in. In these situations, you can use **Auto-grouped traffic** to group data by whichever tags are available.

If you want to investigate connections from all of your hosts in a single grouping, add the `host` tag in the **View clients as** dropdown, and add `Ungrouped traffic` in the **View servers as** dropdown. 

{{< img src="network_performance_monitoring/network_analytics/cnm_un-grouped.png" alt="NPM analytics page sorting by host and grouped by Ungrouped traffic" style="width:90%;">}}

If you have traffic that is not tagged by a specific group, you can select **Auto-grouped traffic** to group data by any available tags. For example, to see which tags are available for a specific `service`, use the `service` tag in the **View clients as** dropdown, and add `Auto-grouped traffic` in the **View servers as** dropdown:

{{< img src="network_performance_monitoring/network_analytics/cnm_auto-grouped.png" alt="NPM analytics page sorting by service tags" style="width:90%;">}}

The **Auto-grouped traffic** option can help you identify the source of your tags. For example, hover over the individual icons to display a tooltip that indicates the tag's origin:

{{< img src="network_performance_monitoring/network_analytics/npm_icon_tooltip.png" alt="Hovering over the icon tooltip to display the tag source" style="width:90%;">}}

Using the search bar and the group by feature together is helpful to further isolate your network traffic. For example, to find all traffic from your `auth-dotnet` service across all data centers, enter `service:auth-dotnet` in the search bar and select `datacenter` in the **View clients** as dropdown:

{{< img src="network_performance_monitoring/network_analytics/search_bar_with_groupby_2.png" alt="Using group by option with search field" style="width:90%;">}}

### Neutral tags

Neutral tags are tags that are not specific to a client or server, and instead apply to an entire flow. You can search for and filter on traffic with these neutral tags. For example, you can use these tags to filter for traffic that is TLS encrypted.

{{< img src="network_performance_monitoring/network_analytics/cnm_using_neutral_tags.png" alt="Screenshot showing how to search for neutral tags, with an example on searching for 'tls_encrypted' traffic" style="width:90%;">}}

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

{{< img src="network_performance_monitoring/network_analytics/summary_graph_visualization_options.png" alt="The summary graph visualization options, displaying options to adjust Y-Axis Scale with Linear, Log, Pow, and Sqrt, and to adjust Graph Type with Area, Line, Bars, Toplist, Change, and Piechart" style="width:80%;">}}

To hide a specific graph, click on the hide icon next to the pencil icon. You can display as little as one graph or as many as three graphs. To add graphs, click on the plus icon `+` on the right side of the summary graph and select the graph to add. You can also reset the graphs to the default graphs when adding a new graph.

{{< img src="network_performance_monitoring/network_analytics/summary_graphs_reset_graphs.png" alt="The summary graphs section displaying the options to Add graph and Reset Graphs" style="width:80%;">}}

## Network data

{{< img src="network_performance_monitoring/network_analytics/network_data2.png" alt="network data" style="width:90%;" >}}

Your network metrics are displayed through the graphs and the associated table. All sent and received metrics are displayed from the perspective of the source:

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

### Cloud service autodetection

If you're relying on managed cloud services like S3 or Kinesis, you can monitor the performance of traffic to those services from your internal applications. Scope your view to a particular AWS, Google Cloud, or Azure dependency to pinpoint latency, assess database performance, and visualize your network more completely.

{{< img src="network_performance_monitoring/network_analytics/cloud-service-hero-docs2.png" alt="Cloud Service Map" >}}

For instance, you can:

- Visualize data flow from your internal Kubernetes cluster to `server_service:aws.s3` in the [Network Map][2].
- Pivot to the [Network Page](#table) to isolate which pods are establishing the most connections to that service, and
- Validate that their request is successful by analyzing S3 performance metrics, which are correlated with traffic performance directly in the side panel for a given dependency, under the *Integration Metrics* tab.

CNM automatically maps:

- Network calls to S3 (which can broken down by `s3_bucket`), RDS (which can be broken down by `rds_instance_type`), Kinesis, ELB, Elasticache, and other [AWS services][3].
- API calls to AppEngine, Google DNS, Gmail, and other [Google Cloud services][4].

To monitor other endpoints where an Agent cannot be installed (such as public APIs), group the destination in the Network Overview by the [`domain` tag](#domain-resolution). Or, see the section below for cloud service resolution.

### Cloud service enhanced resolution
If you have [setup][9] enhanced resolution for AWS or Azure, CNM can filter and group network traffic with several resources collected from these cloud providers. Depending on the cloud provider and resource, you have different sets of tags available to query with. Datadog applies the tags defined below in addition to the user-defined tags.

 #### Amazon Web Services
 {{< tabs >}}
 {{% tab "Loadbalancers" %}}
 - name
 - loadbalancer
 - load_balancer_arn
 - dns_name (format loadbalancer/dns:)
 - region
 - account_id
 - scheme
 - custom (user-defined) tags applied to AWS Loadbalancers
 {{% /tab %}}

 {{% tab "NAT Gateways" %}}
 - gateway_id
 - gateway_type
 - aws_nat_gateway_id
 - aws_nat_gateway_public_ip
 - aws_account
 - availability-zone
 - region
 - custom (user) tags applied to AWS Nat Gateways
 {{% /tab %}}

 {{% tab "VPC Internet Gateway" %}}
 - gateway_id
 - gateway_type
 - aws_internet_gateway_id
 - aws_account
 - region
 - custom (user) tags applied to VPC Internet Gateways
 {{% /tab %}}

{{% tab "VPC Endpoint" %}}
 - gateway_id
 - gateway_type
 - aws_vpc_endpoint_id
 - custom (user) tags applied to VPC Internet Endpoints
 {{% /tab %}}

 {{< /tabs >}}

#### Azure
##### Loadbalancers and Application Gateways
 - name
 - loadbalancer
 - cloud_provider
 - region
 - type
 - resource_group
 - tenant_name
 - subscription_name
 - subscription_id
 - sku_name
 - custom (user-defined) tags applied to Azure Loadbalancers and Application Gateways

### Domain resolution

Starting with Agent 7.17+, the Agent resolves IPs to human-readable domain names for external and internal traffic. Domain allows you to monitor cloud provider endpoints where a Datadog Agent cannot be installed, such as S3 buckets, application load balancers, and APIs. Unrecognizable domain names such as DGA domains from C&C servers may point to network security threats. `domain` **is encoded as a tag in Datadog**, so you can use it in search bar queries and the facet panel to aggregate and filter traffic.

{{< img src="network_performance_monitoring/network_analytics/domain_aggregation_3.png" alt="Domain aggregation" >}}

**Note**: DNS resolution is supported for hosts where the system probe is running on the root network namespace, which is usually caused by running the system-probe in a container without using the host network.

### Network Address Translation (NAT)

NAT is a tool used by Kubernetes and other systems to route traffic between containers. When investigating a specific dependency (for example, service to service), you can use the presence or absence of pre-NAT IPs to distinguish between Kubernetes-native services, which do their own routing, and services that rely on external clients for routing. This feature does not currently include resolution of NAT gateways.

To view pre-NAT and post-NAT IPs, use the **Show pre-NAT IPs** toggle in the table settings. When this setting is toggled off, IPs shown in the **Client IP** and **Server IP** columns are by default post-NAT IPs. In cases where you have multiple pre-NAT IPs for one post-NAT IP, the top 5 most common pre-NAT IPs are displayed. `pre_nat.ip` is a tag like any other in the product, so you can use it to aggregate and filter traffic.

{{< img src="network_performance_monitoring/network_analytics/prenat_ip2.png" alt="pre-NAT IPs" >}}

### Network ID

CNM users may configure their networks to have overlapping IP spaces. For instance, you may want to deploy in multiple VPCs (virtual private clouds) which have overlapping address ranges and communicate only through load balancers or cloud gateways.

To correctly classify traffic destinations, CNM uses the concept of a network ID, which is represented as a tag. A network ID is an alphanumeric identifier for a set of IP addresses that can communicate with one another. When an IP address mapping to several hosts with different network IDs is detected, this identifier is used to determine the particular host network traffic is going to or coming from.

In AWS and Google Cloud, the network ID is automatically set to the VPC ID. For other environments, the network ID may be set manually, either in `datadog.yaml` as shown below, or by adding the `DD_NETWORK_ID` to the process and core Agent containers.

  ```yaml
  network:
     Id: <your-network-id>
  ```

### Saved views

Organize and share views of traffic data. Saved Views make debugging faster and empower collaboration. For instance, you can create a view, save it for the future for common queries, and copy its link to share network data with your teammates.

{{< img src="network_performance_monitoring/network_analytics/cnm_saved_views.png" alt="Cloud Network Monitoring Saved Views" >}}

- To save a view: click the *+ Save* button and name the view to record your current query, table configuration, and graph metric selections.
- To load a view: click *Views* at the top left to see your Saved Views and select a view from the list.
- To rename a view: hover over a view in the Saved Views list and click the gear icon to *Edit name*.
- To share a view: hover over a view in the Saved Views list and click the link icon to *Copy permalink*.

To learn more, see the [Saved Views][5] documentation.

## Table

The network table breaks down the _Volume_, _Throughput_, _TCP Retransmits_, _Round-trip Time (RTT)_, and _RTT variance_ metrics between each _source_ and _destination_ defined by your query.

{{< img src="network_performance_monitoring/network_analytics/network_table2.png" alt="Data table" >}}

You can configure the columns in your table using the `Customize` button at the top right of the table.

Configure the traffic shown with the `Filter Traffic` button.

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

Select any row from the data table to see associated logs, traces, and processes for a given **client** <=> **server** aggregate connection:

{{< img src="network_performance_monitoring/network_analytics/flow_details.png" alt="Aggregate Connection Details" style="width:80%;">}}

### Pivot to network path

Hover over a row in the analytics table to pivot to [network path][11] and see the paths between the source and destination specified in CNM.

{{< img src="network_performance_monitoring/network_analytics/view_network_path_2.png" alt="Example of hovering over a row in the Analytics table to show the Network Path toggle" style="width:90%;">}}

## Sidepanel

The sidepanel provides contextual telemetry to help you debug network dependencies. Use the Flows, Logs, Traces, and Processes tabs to determine whether a high retransmit count or latency in traffic between two endpoints is due to:
- A spike in traffic volume from a particular port or IP.
- Heavy processes consuming the CPU or memory of the destination endpoint.
- Application errors in the code of the client endpoint.

{{< img src="network_performance_monitoring/network_analytics/cnm_sidepanel.png" alt="CNM sidepanel detailing traffic between the client service orders-app and the server service azure.sql_database" style="width:80%;">}}

### Common tags

The top of the sidepanel displays common client and server tags shared by the inspected dependency's most recent connections. Use common tags to gain additional context into a faulty endpoint. For instance, when troubleshooting latent communication to a particular service, common destination tags surface the following:
- Granular context such as the container, task, or host to which traffic is flowing.
- Wider context such as the availability zone, cloud provider account, or deployment in which the service runs.

### Security

The **Security** tab highlights potential network threats and findings detected by [Workload Protection][6] and [Cloud Security Misconfigurations][7]. These signals are generated when Datadog detects network activity that matches a [detection or compliance rule][8], or if there are other threats and misconfigurations related to the selected network flow.

## Default tags

The following is a list of default `server` and `client` tags available out-of-the-box for querying and analyzing network traffic.
| server                    | client                      |
|---------------------------|-----------------------------|
| server_team               | client_team                |
| server_role               | client_role                |
| server_env                | client_env                 |
| server_environment        | client_environment         |
| server_app                | client_app                 |
| server_domain             | client_datacenter          |
| server_dns_server         | client_instance-id         |
| server_datacenter         | client_instance-type       |
| server_instance-id        | client_security-group-name |
| server_instance-type      | client_security-group      |
| server_security-group-name| client_name                |
| server_security-group     | client_image               |
| server_name               | client_account             |
| server_image              | client_kernel_version      |
| server_account            | client_autoscaling_group   |
| server_kernel_version     | client_region              |
| server_autoscaling_group  | client_terraform.module    |
| server_region             | client_site                |
| server_terraform.module   | client_image_name          |
| server_site               | client_pod_name            |
| server_image_name         | client_kube_deployment     |
| server_pod_name           | client_kube_replica_set    |
| server_kube_deployment    | client_kube_job            |
| server_kube_replica_set   | client_kube_cronjob        |
| server_kube_job           | client_kube_daemon_set     |
| server_kube_cronjob       | client_kube_stateful_set   |
| server_kube_daemon_set    | client_kube_cluster_name   |
| server_kube_stateful_set  | client_kube_service        |
| server_kube_cluster_name  | client_kube_namespace      |
| server_kube_service       | client_kubernetes_cluster  |
| server_kube_namespace     | client_cluster-name        |
| server_kubernetes_cluster | client_kube_container_name |
| server_cluster-name       | client_kube-labels         |
| server_kube_container_name| client_task_name           |
| server_kube-labels        | client_task_version        |
| server_task_name          | client_task_family         |
| server_task_version       | client_ecs_cluster         |
| server_task_family        | client_loadbalancer        |
| server_ecs_cluster        | client_mesos_task          |
| server_loadbalancer       | client_marathon_app        |
| server_cacheclusterid     | client_chronos_job         |
| server_mesos_task         | client_chronos_job_owner   |
| server_marathon_app       | client_nomad_task          |
| server_chronos_job        | client_nomad_group         |
| server_chronos_job_owner  | client_nomad_job           |
| server_nomad_task         | client_rancher_container   |
| server_nomad_group        | client_rancher_service     |
| server_nomad_job          | client_rancher_stack       |
| server_rancher_container  | client_swarm_service       |
| server_rancher_service    | client_swarm_namespace     |
| server_rancher_stack      | client_container_id        |
| server_swarm_service      | client_container_name      |
| server_swarm_namespace    | client_image_tag           |
| server_container_id       | client_short_image         |
| server_container_name     | client_docker_image        |
| server_image_tag          | client_kubernetescluster   |
| server_short_image        | client_kube_cluster        |
| server_cluster            | client_protocol            |
| server_docker_image       |                             |
| server_kubernetescluster  |                             |
| server_kube_cluster       |                             |
| server_s3_bucket          |                             |
| server_rds_instance_id    |                             |
| server_cloud_endpoint_detection |                      |
| server_gateway_id         |                             |
| server_protocol           |                             |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/search_syntax/
[2]: /network_monitoring/cloud_network_monitoring/network_map/
[3]: /network_monitoring/cloud_network_monitoring/supported_cloud_services/aws_supported_services/
[4]: /network_monitoring/cloud_network_monitoring/supported_cloud_services/gcp_supported_services/
[5]: /logs/explorer/saved_views/
[6]: /security/workload_protection/
[7]: /security/cloud_security_management/misconfigurations/
[8]: /security/detection_rules/
[9]: /network_monitoring/cloud_network_monitoring/setup/#enhanced-resolution
[10]: /network_monitoring/dns/#recommended-queries
[11]: /network_monitoring/network_path
[12]: /getting_started/tagging/unified_service_tagging/

