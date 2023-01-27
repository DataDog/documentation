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

| Runtime | Supported technologies |
|---|----|
| Java | Kafka (self-hosted, Amazon MSK), RabbitMQ, HTTP, gRPC |
| Go | All (via [manual instrumentation][1]) |
| .NET | Kafka (self-hosted, Amazon MSK) |

### Setup

{{< partial name="data_streams/setup-languages.html" >}}

## Explore Data Streams Monitoring

### Measure End-to-end Pipeline Health with New Metrics

{{< img src="data_streams/data_streams_edge_latency.png" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

Once you've configured Data Streams Monitoring, you can measure the time it typically takes for events to traverse between any two points in your asynchronous system:

| Metric Name | Notable Tags | Use Case |
|---|----|
| dd.stream.edge_latency | `service`, `upstream_service`, `topic`, `partition` | Time elapsed from producing messages in a client to receiving messages in the consuming service. |
| dd.stream.latency_from_origin | `service`, `upstream_service`, `hash` | Time elapsed from producing messages at their point of origin to receiving messages in the selected service. |

We recommend using the "Pipeline Health" tab on any service in Data Streams Monitoring to create SLOs or monitors on end-to-end latency:

{{< img src="data_streams/data_streams_create_slo.png" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

### Attribute Incoming Messages to any Queue, Service or Cluster

{{< img src="data_streams/data_streams_throughput_tab.png" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

High lag on a consuming service, increased resource use on a Kafka broker and increased RabbitMQ queue size can all be explained by changes in the way adjacent services are producing to or consuming from these entities.

You can use the "Throughput" tab on any service or queue in Data Streams Monitoring to quickly detect changes in throughput and which service these originate from. Once you've configured the [Service Catalog][3], you can immediately pivot to the corresponding team's Slack channel, or on-call engineer.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_streams/go#manual-instrumentation
[2]: /agent/basic_agent_usage
[3]: /tracing/service_catalog/
