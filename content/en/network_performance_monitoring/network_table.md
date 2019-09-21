---
title: Network Page
kind: documentation
disable_toc: true
description: Explore your Network data between each source and destination across your stack.
further_reading:
- link: "https://www.datadoghq.com/blog/network-performance-monitoring"
  tag: "Blog"
  text: "Network Performance Monitoring"
- link: "https://www.datadoghq.com/blog/monitoring-101-alerting/"
  tag: "Blog"
  text: "Monitoring 101: Alerting on what matters"
- link: "/network_performance_monitoring/installation"
  tag: "Documentation"
  text: "Collect your Network Data with the Datadog Agent."
---

<div class="alert alert-warning">
This feature is currently in beta. Request access by completing the <a href="https://app.datadoghq.com/network/2019signup">Datadog Network Performance Monitoring Beta Request form</a>.
</div>

{{< img src="network_performance_monitoring/network_table/main_page.png" alt="Main page" responsive="true">}}

## Queries

To refine your search to traffic between particular endpoints, aggregate and filter your network flows **with tags**. You can select tags for the **_source_** and **_destination_** by using the search bar at the top of the page. 

The following screenshot shows the default view, which aggregates the _source_ and _destination_ by the `service` tag. Accordingly, each row in the table represents service-service flows when aggregated over a five-minute time period.

{{< img src="network_performance_monitoring/network_table/context.png" alt="context" responsive="true" style="width:80%;">}}

The next example shows all flows from IP addresses representing a service (`service:web-store`) to an availability zone (`availability-zone:us-east1-b`):

{{< img src="network_performance_monitoring/network_table/flow_table_filtered.png" alt="Flow table filtered" responsive="true" style="width:80%;">}}

### Facet Panels

The facet panels mirror the tags in your search bar query. Switch between the facet panels with the _Source_ and _Destination_ tabs on top:

{{< img src="network_performance_monitoring/network_table/facet_panels.png" alt="Facet panels" responsive="true" style="width:30%;">}}

## Network Data

{{< img src="network_performance_monitoring/network_table/network_data.png" alt="network data" responsive="true" style="width:90%;" >}}

Your network metrics are displayed through the graphs and the associated table. All sent and received metrics are displayed from the perspective of the source :

- **Sent metrics**: measure the value of something from the _source_ to the _destination_ from the source's perspective.
- **Received metrics**: measure the value of something from the _destination_ to the _source_ from the source's perspective.

Values displayed might be different for `sent_metric(source to destination)` and `received_metric(destination to source)` if there is a large number of packet drops. In this case, if the `destination` sends a lot of bytes to the `source`, the flows that originate at `destination` include those bytes, but the flows that originate at `source` do not see them as received.

**Note**: The default collection interval is five minutes and retention is seven days.

### Graphs

{{< img src="network_performance_monitoring/network_table/graphs_npm.png" alt="Graph npm" responsive="true" style="width:80%;" >}}

The following graphs are available:

| Graph | Description |
| -------- | ------ |
| **Throughput** | The number of bytes sent or received over a period. Measured in bytes (or orders of magnitude thereof) bidirectional.|
| **Bandwidth** | The rate of bytes sent or received over a period. Measured in bytes per second, bidirectional. |
| **Retransmits** | TCP is a connection-oriented protocol that guarantees in-order delivery of packets. Retransmits represent detected failures that are retransmitted to ensure delivery. Measured in count of retransmits from the `source`. |

On each graph, select the settings cog in the upper right corner to change the Y-axis scale or the graph type displayed:

{{< img src="network_performance_monitoring/network_table/graph_settings.png" alt="Graph settings" responsive="true" style="width:30%;">}}

### Table

The network table breaks down the _Throughput_, _Bandwidth_, and _Retransmits_ metrics between each _source_ and _destination_ defined by your query.

{{< img src="network_performance_monitoring/network_table/data_table.png" alt="Data table" responsive="true" style="width:80%;">}}

**Note**: Use the *Show Unresolved Flows* toggle in the upper right corner of the data table to filter out flows with unresolved (`N/A`) sources or destinations, which indicate external traffic outside of your private network.

Select any row from the data table to see associated logs and traces for a given _source_ <=> _destination_ flow:

{{< img src="network_performance_monitoring/network_table/flow_details.png" alt="Flow Details" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
