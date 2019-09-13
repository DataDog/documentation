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
- link: "/api/#monitors"
  tag: "Documentation"
  text: "Datadog Monitors API"
---

<div class="alert alert-warning">
This feature is currently in beta. Request access by filling out the <a href="https://app.datadoghq.com/network/2019signup">Datadog Network Performance Monitoring Beta Request form</a>.
</div>

{{< img src="network_performance_monitoring/network_page/main_page.png" alt="Main page" responsive="true">}}

The network page is divided into 4 main part:

* [Queries](#queries)
* [Graphs](#graphs)
* [Facet pannels](#facet-panels)
* [Data](#data)

## Queries

The queries allow you to aggregate and filter your network flows based on tags. Since a flow is defined with a **_source_** and a **_destination_** you need to select the tags and their associated context for each one of them.

The following screenshoot shows the default view, which aggregates by `service`. This means the throughput for every flow with the same source `service` and destination `service` are summed and represented as one row for that service-to-service communication.

{{< img src="network_performance_monitoring/network_page/query_1.png" alt="network page query 1" responsive="true" style="width:80%;">}}

The following shows all flows from IP addresses to Security groups. Only flows where the source IP address represents a specific set of services is included. This complex query shows that no two fields have to match—you can query for communication metrics between one `service` to any `consul` server, broken down by source `pod` and destination `host`, among other things.

{{< img src="network_performance_monitoring/network_page/query_2.png" alt="network page query 2" responsive="true" style="width:80%;">}}

### Facet Panels

The Facet panels mirrors what you entered in your [queries](#queries). Since you can define a context for the _source_ and the _destination_, switch between the two facet panels with the selector on top:

{{< img src="network_performance_monitoring/network_page/facet_panels.png" alt="Facet panels" responsive="true" style="width:30%;">}}

## Graphs

All graphs are displayed from the `sent` and `received` perspective between the _source_ and the _destination_:

- `Sent` metrics measure the value of something from the _source_ to the _destination_.
- `Received` metrics measure the value of something from the _destination_ to the _source_ as measured from the source.

The default collection interval is five minutes and retention is five days.

| Graph | Description |
| -------- | ------ |
| **Throughput** | The number of bytes sent or received over a period. Measured in bytes (or orders of magnitude thereof) bidirectionally.|
| **Bandwidth** | The rate of bytes sent or received over a period. Measured in bytes per second, bidirectionally. |
| **Retransmits** | TCP is a connection-oriented protocol that guarantees in-order delivery of packets. Retransmits represent detected failures that are retransmitted to ensure delivery. Measured in count of retransmits from the `source`. |

**Note**: Values displayed might be different for `metric(a to b)` and `metric(b to a)` if there is a large number of packet drops. In this case, if `b` sends a lot of bytes to `a`, the flows that originate at `b` include those bytes, but the flows that originate at `a` do not see them as received.

### Graphs Settings

On each graph, select the cog icon in the upper right corner of the graph in order to change the Y-axis scale or the graph type displayed:

{{< img src="network_performance_monitoring/network_page/graph_settings.png" alt="Graph settings" responsive="true" style="width:30%;">}}

## Data

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
