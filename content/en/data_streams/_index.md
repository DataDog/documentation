---
title: Data Streams Monitoring
kind: documentation
further_reading:
    - link: '/integrations/kafka/'
      tag: 'Documentation'
      text: 'Kafka Integration'
    - link: '/integrations/amazon_sqs/'
      tag: 'Documentation'
      text: 'Amazon SQS Integration'
    - link: '/tracing/service_catalog/'
      tag: 'Documentation'
      text: 'Service Catalog'
    - link: 'https://www.datadoghq.com/blog/data-streams-monitoring/'
      tag: 'Blog'
      text: 'Track and improve the performance of streaming data pipelines with Datadog Data Streams Monitoring'
    - link: 'https://www.datadoghq.com/blog/data-streams-monitoring-apm-integration/'
      tag: 'Blog'
      text: 'Troubleshoot streaming data pipelines directly from APM with Datadog Data Streams Monitoring'
cascade:
    algolia:
        rank: 70
---


{{% site-region region="gov,ap1" %}}
<div class="alert alert-warning">
    Data Streams Monitoring is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

{{< img src="data_streams/data_streams_hero_feature.jpg" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

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
| Java/Scala | Kafka (self-hosted, Amazon MSK, Confluent Cloud / Platform), RabbitMQ, HTTP, gRPC, Amazon SQS |
| Python | Kafka (self-hosted, Amazon MSK, Confluent Cloud / Platform), Amazon SQS |
| .NET | Kafka (self-hosted, Amazon MSK, Confluent Cloud / Platform), RabbitMQ, Amazon SQS |
| Node.js | Kafka (self-hosted, Amazon MSK, Confluent Cloud / Platform), Amazon SQS |
| Go | All (with [manual instrumentation][1]) |
  

## Explore Data Streams Monitoring

### Measure end-to-end pipeline health with new metrics

Once Data Streams Monitoring is configured, you can measure the time it usually takes for events to traverse between any two points in your asynchronous system:

| Metric Name | Notable Tags | Description |
|---|---|-----|
| data_streams.latency | `start`, `end`, `env` | End to end latency of a pathway from a specified source to destination service |
| data_streams.kafka.lag_seconds | `consumer_group`, `partition`, `topic`, `env` | Lag in seconds between producer and consumer. Requires Java Agent v1.9.0 or later. |

You can also graph and visualize these metrics on any dashboard or notebook:

{{< img src="data_streams/data_streams_monitor.jpg" alt="Datadog Data Streams Monitoring monitor" style="width:100%;" >}}

### Monitor end-to-end latency of any pathway

Depending on how events traverse through your system, different paths can lead to increased latency. With the **Measure** tab, you can select a start service and end service for end-to-end latency information to identify bottlenecks and optimize performance. Easily create a monitor for that pathway, or export to a dashboard.

{{< img src="path/to/your/measure.3.0.mp4" alt="Datadog Data Stream Monitoring measure" video="true" >}}

Alternatively, view the **Pathways** tab for latency between the select service and upstream services.

{{< img src="data_streams/data_streams_pathway.jpg" alt="Datadog Data Streams Monitoring Pathway tab" style="width:100%;" >}}

### Alert on slowdowns in event-driven applications
Slowdowns caused by high consumer lag or stale messages can lead to cascading failures and increase downtime. With out-of-the-box alerts, you can pinpoint where bottlenecks occur in your pipelines and respond to them right away. For supplementary metrics, Datadog provides additional integrations for message queue technologies like [Kafka][4] and [SQS][5].

{{< img src="data_streams/Product_Doc_Kafka_Lag.png" alt="Datadog Data Streams Monitoring Kafka Lag" style="width:100%;" >}}

Through Data Stream Monitoring’s out-of-the-box recommended monitors, you can setup monitors on metrics like consumer lag, throughput, and latency in one click. 

{{< img src="data_streams/Product_Doc_Recommended_Monitors.png" alt="Datadog Data Streams Monitoring Recommended Monitors" style="width:100%;" >}}

### Attribute incoming messages to any queue, service, or cluster

High lag on a consuming service, increased resource use on a Kafka broker, and increased RabbitMQ or Amazon SQS queue size are frequently explained by changes in the way adjacent services are producing to or consuming from these entities.

Click on the **Throughput** tab on any service or queue in Data Streams Monitoring to quickly detect changes in throughput, and which upstream or downstream service these changes originate from. Once the [Service Catalog][2] is configured, you can immediately pivot to the corresponding team's Slack channel or on-call engineer.

By filtering to a single Kafka, RabbitMQ, or Amazon SQS cluster, you can detect changes in incoming or outgoing traffic for all detected topics or queues running on that cluster:

{{< img src="data_streams/data_streams_throughput.jpg" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

### Quickly pivot to identify root causes in infrastructure, logs, or traces 

Datadog automatically links the infrastructure powering your services and related logs through [Unified Service Tagging][3], so you can easily localize bottlenecks. Click the **Infra**, **Logs** or **Traces** tabs to further troubleshoot why pathway latency or consumer lag has increased.
  
{{< img src="data_streams/data_streams_infra.jpg" alt="Datadog Data Streams Monitoring Infra tab" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_streams/go#manual-instrumentation
[2]: /tracing/service_catalog/
[3]: /getting_started/tagging/unified_service_tagging
[4]: /integrations/kafka/
[5]: /integrations/amazon_sqs/
