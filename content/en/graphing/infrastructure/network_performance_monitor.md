---
title: Network Performance Monitoring
kind: documentation
description: Explore metrics for point to point communication on your infrastructure.
beta: true
aliases:
  - monitors/network_flow_monitors/
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
This feature is currently in beta.
</div>

## Overview

Network Flow Monitoring allows you to explore metrics for point-to-point communication between anything in your environment.

Each end of any point-to-point communication represents a hash of a `{host | process ID | port}` or `{container | process ID | port}` for uniqueness. This is resolved in Datadog to any collected tag. This allows you to aggregate communication based on arbitrary queries.

{{< img src="monitors/network_flow_monitoring/network_flow_overview.png" alt="notification" responsive="true" >}}

## Setup
### Installation

Network flow monitoring requires Datadog Agent 6.12+. To enable network flow monitoring, configure your `agent.yaml` file based on the [configurations listed here][1].

### Queries

Queries aggregate and filter all flows based on tags, similar to a timeseries. The following is the default view, which aggregates by `service`. This means the throughput for every flow with the same source `service` and destination `service` are summed and represented as one row for that service-to-service communication.

{{< img src="monitors/network_flow_monitoring/query_1.png" alt="notification" responsive="true" >}}

The following shows all flows from IP addresses to Security groups. Only flows where the source IP address represents a specific set of services is included. This complex query shows that no two fields have to match—you can query for communication metrics between one `service` to any `consul` server, broken down by source `pod` and destination `host`, among other things.

{{< img src="monitors/network_flow_monitoring/query_2.png" alt="notification" responsive="true" >}}

### Metric collection

- `Sent` metrics measure the value of something from the `source` to the `destination`
- `Received` metrics measure the value of something from the `destination` to the `source` as measured from the source.

Metrics might be different for `some.metric(a to b)` and `some.metric(b to a)` if there is a large number of packet drops on one leg of the trip. In this case, if `b` sends a lot of bytes to `a`, the flows that originate at `b` include those bytes, but the flows that originate at `a` do not see them as received.

- **Throughput** - The number of bytes sent or received over a period. Measured in bytes (or orders of magnitude thereof) bidirectionally.
- **Bandwidth** - The rate of bytes sent or received over a period. Measured in bytes per second, bidirectionally.
- **Retransmits** - TCP is a connection-oriented protocol that guarantees in-order delivery of packets. Retransmits represent detected failures that are retransmitted to ensure delivery. Measured in count of retransmits from the `source`.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://gist.github.com/sunhay/ce7b072c9c9a0193b12f81f18eeaf2e7
