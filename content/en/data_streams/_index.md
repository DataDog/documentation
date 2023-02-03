---
title: Data Streams Monitoring
kind: documentation
further_reading:
    - link: '/integrations/kafka/'
      tag: 'Documentation'
      text: 'Kafka Integration'
    - link: '/tracing/service_catalog/'
      tag: 'Documentation'
      text: 'Service Catalog'
---

{{< img src="data_streams/data_streams_hero.png" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

Data Streams Monitoring provides a standardized method for teams to understand and manage pipelines at scale by making it easy to:
* Measure pipeline health with end-to-end latencies for events traversing across your system.
* Pinpoint faulty producers, consumers or queues, then pivot to related logs or clusters to troubleshoot faster.
* Prevent cascading delays by equipping service owners to stop backed up events from overwhelming downstream services.

## Setup

To get started, follow the installation instructions to configure services with Data Streams Monitoring:

{{< partial name="data_streams/setup-languages.html" >}}

<br/>

| Runtime | Supported technologies |
|---|----|
| Java | Kafka (self-hosted, Amazon MSK), RabbitMQ, HTTP, gRPC |
| Go | All (with [manual instrumentation][1]) |
| .NET | Kafka (self-hosted, Amazon MSK) |


## Explore Data Streams Monitoring

### Measure end-to-end pipeline health with new metrics

Once Data Streams Monitoring is configured, you can measure the time it usually takes for events to traverse between any two points in your asynchronous system:

| Metric Name | Notable Tags | Description |
|---|---|-----|
| dd.stream.edge_latency | `service`, `upstream_service`, `topic`, `partition` | Time elapsed from producing messages in a client to receiving messages in the consuming service. |
| dd.stream.latency_from_origin | `service`, `upstream_service`, `hash` | Time elapsed from producing messages at their point of origin to receiving messages in the selected service. |

Datadog recommends using the **Pipeline Health** tab on any service in Data Streams Monitoring to create SLOs or monitors on end-to-end latency:

{{< img src="data_streams/data_streams_create_slo.png" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

You can also graph and visualize these metrics on any dashboard or notebook:

{{< img src="data_streams/data_streams_edge_latency.png" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

### Attribute incoming messages to any queue, service, or cluster

High lag on a consuming service, increased resource use on a Kafka broker and increased RabbitMQ queue size are frequently explained by changes in the way adjacent services are producing to or consuming from these entities.

{{< img src="data_streams/data_streams_throughput_tab.png" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

Click on the **Throughput** tab on any service or queue in Data Streams Monitoring to quickly detect changes in throughput, and which upstream or downstream service these changes originate from. Once the [Service Catalog][2] is configured, you can immediately pivot to the corresponding team's Slack channel or on-call engineer.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_streams/go#manual-instrumentation
[2]: /tracing/service_catalog/
