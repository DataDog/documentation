---
title: Network Page
kind: documentation
description: Explore your Network data between each source and destination across your stack.
aliases:
- network_performance_monitoring/network_table
further_reading:
- link: "https://www.datadoghq.com/blog/network-performance-monitoring"
  tag: "Blog"
  text: "Network Performance Monitoring"
- link: "/integrations/snmp"
  tag: "Documentation"
  text: "SNMP integration"
- link: "/network_performance_monitoring/installation"
  tag: "Documentation"
  text: "Collect your Network Data with the Datadog Agent."
- link: "/dashboards/widgets/network"
  tag: "Documentation"
  text: "Network Widget"
---

{{< img src="network_performance_monitoring/network_page/main_page_npm.png" alt="Main page" >}}

## Queries

To refine your search to traffic between particular endpoints, aggregate and filter your network flows **with tags**. You can select tags for the **_source_** and **_destination_** by using the search bar at the top of the page.

The following screenshot shows the default view, which aggregates the _source_ and _destination_ by the `service` tag. Accordingly, each row in the table represents service-to-service flows when aggregated over a one hour time period.

{{< img src="network_performance_monitoring/network_page/context_npm.png" alt="context"  style="width:80%;">}}

The next example shows all flows from IP addresses representing services in region `us-east-1` to availability zones:

{{< img src="network_performance_monitoring/network_page/flow_table_region_az.png" alt="Flow table filtered"  style="width:80%;">}}

You can set the timeframe over which traffic is aggregated using the time selector at the top right of the page:

{{< img src="network_performance_monitoring/network_page/npm_timeframe.png" alt="Time frame NPM"  style="width:30%;">}}

### Facet Panels

The facet panels mirror the tags in your search bar query. Switch between the facet panels with the _Source_ and _Destination_ tabs on top:

{{< img src="network_performance_monitoring/network_page/destination_panel.png" alt="Destination panel"  style="width:20%;">}}

#### Custom Facets

Aggregate and filter your traffic data by any tags in Datadog network page. A whitelist of tags is provided by default, which you can find in the search bar dropdown menu.

A whitelist of tags is provided by default, which you can find in the search bar dropdown menu.

Whitelisted tags include `service`, `availability zone`, `environment`, `pod`, `host`, `ip`, and `port`, among others. If you want to aggregate or filter traffic by a tag that is not already in the menu, add it as a custom Facet:

1. Select the `+` button on the top right of the facet panels.
2. Enter the relevant tag you want to create a custom facet upon.
3. Click `Create`.

Once the custom facet is created, use this tag to filter and aggregate traffic in the network page and map. All custom facets can be viewed in the bottom `Custom` section of the facet panels.

## Network Data

{{< img src="network_performance_monitoring/network_page/network_data.png" alt="network data"  style="width:90%;" >}}

Your network metrics are displayed through the graphs and the associated table. All sent and received metrics are displayed from the perspective of the source :

* **Sent metrics**: measure the value of something from the _source_ to the _destination_ from the source's perspective.
* **Received metrics**: measure the value of something from the _destination_ to the _source_ from the source's perspective.

Values displayed might be different for `sent_metric(source to destination)` and `received_metric(destination to source)` if there is a large number of packet drops. In this case, if the `destination` sends a lot of bytes to the `source`, the flows that originate at `destination` include those bytes, but the flows that originate at `source` do not see them as received.

**Note**: The default collection interval is five minutes and retention is seven days.

### Metrics

#### Network Load

The following network load metrics are available:

| Metric | Description |
| -------- | ------ |
| **Volume** | The number of bytes sent or received over a period. Measured in bytes (or orders of magnitude thereof) bidirectional.|
| **Throughput** | The rate of bytes sent or received over a period. Measured in bytes per second, bidirectional. |
| **Retransmits** | Retransmits represent detected failures that are retransmitted to ensure delivery. Measured in count of retransmitted frames from the `source`. |

#### TCP

TCP is a connection-oriented protocol that guarantees in-order delivery of packets. The following TCP metrics are available:

| Metric | Description |
| -------- | ------ |
| **Retransmits** | Retransmits represent detected failures that are retransmitted to ensure delivery. Measured in count of retransmits from the `source`. |
| **Round-trip Time (RTT)** | Round-trip time is a proxy for latency. Measured as the time between a TCP frame being sent and acknowledged. |
| **RTT Variance** | RTT is a proxy for jitter. |

### DNS Resolution

Starting with Agent 7.17+, using reverse-DNS lookup, the Agent resolves IP’s to human-readable domain names for external and internal traffic. DNS allows you to monitor cloud provider endpoints where a Datadog Agent cannot be installed, such as S3 buckets, application load balancers, and API’s. Unrecognizable domain names such as DGA domains from C&C servers may point to network security threats. **DNS is encoded as a tag in Datadog**, so you can use it in search bar queries and the facet panel to aggregate and filter traffic.

{{< img src="network_performance_monitoring/network_page/dns_aggregation.png" alt="DNS aggregation" >}}

**Note**: DNS resolution is supported only for agents running on a host.

## Table

The network table breaks down the *Volume*, *Throughput*, *TCP Retransmits*, *Round-trip Time (RTT)*, and *RTT variance* metrics between each *source* and *destination* defined by your query.

{{< img src="network_performance_monitoring/network_page/data_table.png" alt="Data table" >}}

### Unresolved Traffic

Unresolved source and destination tags are marked as `N/A`. A traffic source or destination endpoint may be unresolved because:

* The host or container source or destination IPs are not tagged with the source or destination tags used for traffic aggregation.
* The endpoint is outside of your private network, and accordingly is not tagged by the Datadog Agent.
* The endpoint is a firewall, service mesh or other entity where a Datadog Agent cannot be installed.

Use the *Show Unresolved Flows* toggle in the upper right corner of the data table to filter out flows with unresolved (`N/A`) sources or destinations.

Select any row from the data table to see associated logs and traces for a given _source_ <=> _destination_ flow:

{{< img src="network_performance_monitoring/network_page/flow_details.png" alt="Flow Details"  style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
