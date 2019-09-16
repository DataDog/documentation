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
- link: "/network_performance_monitoring/network_installation"
  tag: "Documentation"
  text: "Collect your Network Data with the Datadog Agent."
---

<div class="alert alert-warning">
This feature is currently in beta. Request access by filling out the <a href="https://app.datadoghq.com/network/2019signup">Datadog Network Performance Monitoring Beta Request form</a>.
</div>

{{< img src="network_performance_monitoring/network_table/main_page.png" alt="Main page" responsive="true">}}

## Context

To define a context for your Network Table select how to aggregate and filter your network flows data **based on tags**. First you need to select the Tag Key to use as **_source_** and as **_destination_** then which Tags to display for each one of them.

The following screenshot shows the default view, which aggregates by tag key `service` the _source_ and _destination_. This means the throughput for every flow with the same source `service` and destination `service` are summed and represented as one row in the table below for that service-to-service communication:

{{< img src="network_performance_monitoring/network_table/context.png" alt="context" responsive="true" style="width:80%;">}}

The next example shows all flows from some IP addresses representing a service (`service:web-store`) as a _source_, to a given Availability Zone (`availability-zone:us-east1-b`) as _destination_:

{{< img src="network_performance_monitoring/network_table/flow_table_filtered.png" alt="Flow table filtered" responsive="true" style="width:80%;">}}

### Facet Panels

The facet panels mirrors what you entered in your context. Since you can define a context for the _source_ and the _destination_, switch between the two facet panels with the selector on top:

{{< img src="network_performance_monitoring/network_table/facet_panels.png" alt="Facet panels" responsive="true" style="width:30%;">}}

## Network Data

{{< img src="network_performance_monitoring/network_table/network_data.png" alt="network data" responsive="true" style="width:90%;" >}}

Your network data is displayed through the graphs on top of the page and the associated table below. All data is displayed from the `sent` and `received` perspective between the _source_ and the _destination_:

- `Sent` metrics measure the value of something from the _source_ to the _destination_.
- `Received` metrics measure the value of something from the _destination_ to the _source_ as measured from the source.

**Note**: The default collection interval is five minutes and retention is seven days.

### Gaphs

{{< img src="network_performance_monitoring/network_table/graphs_npm.png" alt="Graph npm" responsive="true" style="width:80%;" >}}

The following graphs are available:

| Graph | Description |
| -------- | ------ |
| **Throughput** | The number of bytes sent or received over a period. Measured in bytes (or orders of magnitude thereof) bidirectional.|
| **Bandwidth** | The rate of bytes sent or received over a period. Measured in bytes per second, bidirectional. |
| **Retransmits** | TCP is a connection-oriented protocol that guarantees in-order delivery of packets. Retransmits represent detected failures that are retransmitted to ensure delivery. Measured in count of retransmits from the `source`. |

**Note**: Values displayed might be different for `metric(a to b)` and `metric(b to a)` if there is a large number of packet drops. In this case, if `b` sends a lot of bytes to `a`, the flows that originate at `b` include those bytes, but the flows that originate at `a` do not see them as received.

### Graph Settings

On each graph, select the cog icon in the upper right corner of the graph in order to change the Y-axis scale or the graph type displayed:

{{< img src="network_performance_monitoring/network_table/graph_settings.png" alt="Graph settings" responsive="true" style="width:30%;">}}

### Table

The network table breaks down the _Throughput_, _Bandwith_, and _Retransmits_ metrics between each _Source_ and _Destination_ defined with your Queries:

{{< img src="network_performance_monitoring/network_table/data_table.png" alt="Data table" responsive="true" style="width:80%;">}}

**Note**: Use the *Show Unresolved Flows* toggle in the upper right corner of the data table to displays network data for flows with only one _Source_ or _Destination_.

Select any line from the data table to get more in depth monitoring of a given _Source_ <=> _Destination_ network flow:

{{< img src="network_performance_monitoring/network_table/flow_details.png" alt="Flow Details" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
