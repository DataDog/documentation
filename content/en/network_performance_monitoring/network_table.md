---
title: Network Table
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

## Context

To define a context for your Network Table, select how to aggregate and filter your network flows data **based on tags**. First, select the tag key to use as the **_source_** and **_destination_**. Next, select the tags to display for each one.

The following screenshot shows the default view, which aggregates by the tag key `service` (the _source_ and _destination_). This means the throughput for every flow with the same source `service` and destination `service` are summed and represented as one row in the table for service-to-service communication:

{{< img src="network_performance_monitoring/network_table/context.png" alt="context" responsive="true" style="width:80%;">}}

The next example shows all flows from some IP addresses representing a service (`service:web-store`) as a _source_ to an availability zone (`availability-zone:us-east1-b`) as _destination_:

{{< img src="network_performance_monitoring/network_table/flow_table_filtered.png" alt="Flow table filtered" responsive="true" style="width:80%;">}}

### Facet Panels

The facet panels mirror your chosen context. Switch between the facet panels with the _Source_ and _Destination_ tabs on top:

{{< img src="network_performance_monitoring/network_table/facet_panels.png" alt="Facet panels" responsive="true" style="width:30%;">}}

## Network Data

{{< img src="network_performance_monitoring/network_table/network_data.png" alt="network data" responsive="true" style="width:90%;" >}}

Your network metrics are displayed through the graphs and the associated table. All data is shown from the `sent` and `received` perspective between the _source_ and _destination_:

- **Sent metrics**: measure the value of something from the _source_ to the _destination_.
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

### Graph Settings

On each graph, select the settings cog in the upper right corner of the graph to change the Y-axis scale or the graph type displayed:

{{< img src="network_performance_monitoring/network_table/graph_settings.png" alt="Graph settings" responsive="true" style="width:30%;">}}

### Table

The network table breaks down the _Throughput_, _Bandwith_, and _Retransmits_ metrics between each _Source_ and _Destination_ defined with your queries:

{{< img src="network_performance_monitoring/network_table/data_table.png" alt="Data table" responsive="true" style="width:80%;">}}

**Note**: Use the *Show Unresolved Flows* toggle in the upper right corner of the data table to displays network data for flows with only one _source_ or _destination_.

Select any line from the data table to get more in depth monitoring of a given _source_ <=> _destination_ network flow:

{{< img src="network_performance_monitoring/network_table/flow_details.png" alt="Flow Details" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
