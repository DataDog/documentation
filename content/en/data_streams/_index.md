---
title: Data Streams Monitoring
aliases:
- /data_streams/troubleshooting
- /data_streams/data_pipeline_lineage
further_reading:
    - link: '/integrations/kafka/'
      tag: 'Documentation'
      text: 'Kafka Integration'
    - link: '/integrations/amazon_sqs/'
      tag: 'Documentation'
      text: 'Amazon SQS Integration'
    - link: '/tracing/software_catalog/'
      tag: 'Documentation'
      text: 'Software Catalog'
    - link: 'https://www.datadoghq.com/blog/data-streams-monitoring/'
      tag: 'Blog'
      text: 'Track and improve the performance of streaming data pipelines with Datadog Data Streams Monitoring'
    - link: 'https://www.datadoghq.com/blog/data-streams-monitoring-apm-integration/'
      tag: 'Blog'
      text: 'Troubleshoot streaming data pipelines directly from APM with Datadog Data Streams Monitoring'
    - link: 'https://www.datadoghq.com/blog/data-streams-monitoring-sqs/'
      tag: 'Blog'
      text: 'Monitor SQS with Data Streams Monitoring'
    - link: 'https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/'
      tag: 'Blog'
      text: 'Autodiscover Confluent Cloud connectors and easily monitor performance in Data Streams Monitoring'
    - link: "https://www.datadoghq.com/blog/data-observability/"
      tag: "Blog"
      text: "Ensure trust across the entire data life cycle with Datadog Data Observability"
cascade:
    algolia:
        rank: 70
---


{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Data Streams Monitoring is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

{{< img src="data_streams/map_view2.png" alt="Data Streams Monitoring page in Datadog, showing the Map view. Highlights a service called 'authenticator'. A topology map visualization of left-to-right data flow, where the authenticator service is displayed in the center with its upstream and downstream services and queues." style="width:100%;" >}}

Data Streams Monitoring provides a standardized method for teams to understand and manage pipelines at scale by making it easy to:
* Measure pipeline health with end-to-end latencies for events traversing across your system.
* Pinpoint faulty producers, consumers or queues, then pivot to related logs or clusters to troubleshoot faster.
* Prevent cascading delays by equipping service owners to stop backed up events from overwhelming downstream services.

### Supported languages and technologies

Data Streams Monitoring instruments Kafka _clients_ (consumers/producers). If you can instrument your client infrastructure, you can use Data Streams Monitoring.

|   | Java | Python | .NET | Node.js | Go | Ruby |
| - | ---- | ------ | ---- | ------- | -- | ---- |
| Apache Kafka <br/>(self-hosted, Amazon MSK, Confluent Cloud, or any other hosting platform) | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Amazon Kinesis | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |
| Amazon SNS | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |
| Amazon SQS | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |
| Azure Service Bus | | | {{< X >}} | | | |
| Google Pub/Sub | {{< X >}} | | | {{< X >}} | | |
| IBM MQ | | | {{< X >}} | | | |
| RabbitMQ | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |

Data Streams Monitoring requires minimum Datadog tracer versions. See each setup page for details.

#### Support for OpenTelemetry
Data Streams Monitoring supports OpenTelemetry. If you have set up Datadog APM to work with OpenTelemetry, no additional setup is required to use Data Streams Monitoring. See [OpenTelemetry Compatibility][11].

## Setup

### By language

{{< partial name="data_streams/setup-languages.html" >}}


### By technology

{{< partial name="data_streams/setup-technologies.html" >}}

<br/>

## Explore Data Streams Monitoring

### Visualize the architecture of your streaming data pipelines

{{< img src="data_streams/topology_map.png" alt="A DSM topology map visualization. " style="width:100%;" >}}

Data Streams Monitoring provides an out-of-the-box [topology map][10], so that you can visualize data flow across your pipelines and identify producer/consumer services, queue dependencies, service ownership, and key health metrics.

### Measure end-to-end pipeline health with new metrics

With Data Streams Monitoring, you can measure the time it usually takes for events to traverse between any two points in your asynchronous system:

| Metric Name | Notable Tags | Description |
|---|---|-----|
| data_streams.latency | `start`, `end`, `env` | End to end latency of a pathway from a specified source to destination service. |
| data_streams.kafka.lag_seconds | `consumer_group`, `partition`, `topic`, `env` | Lag in seconds between producer and consumer. Requires Java Agent v1.9.0 or later. |
| data_streams.payload_size | `consumer_group`, `topic`, `env` | Incoming and outgoing throughput in bytes.|


You can also graph and visualize these metrics on any dashboard or notebook:

{{< img src="data_streams/data_streams_metric_monitor.png" alt="Datadog Data Streams Monitoring monitor" style="width:100%;" >}}

### Monitor end-to-end latency of any pathway

Depending on how events traverse through your system, different paths can lead to increased latency. With the [**Measure** tab][7], you can select a start service and end service for end-to-end latency information to identify bottlenecks and optimize performance. Easily create a monitor for that pathway, or export to a dashboard.

Alternatively, click a service to open a detailed side panel and view the **Pathways** tab for latency between the service and upstream services.

### Alert on slowdowns in event-driven applications

Slowdowns caused by high consumer lag or stale messages can lead to cascading failures and increase downtime. With out-of-the-box alerts, you can pinpoint where bottlenecks occur in your pipelines and respond to them right away. For supplementary metrics, Datadog provides additional integrations for message queue technologies like [Kafka][4] and [SQS][5].

Through Data Stream Monitoring's out-of-the-box monitor templates, you can setup monitors on metrics like consumer lag, throughput, and latency in one click.

{{< img src="data_streams/add_monitors_and_synthetic_tests.png" alt="Datadog Data Streams Monitoring Monitor Templates" style="width:100%;" caption="Click 'Add Monitors and Synthetic Tests' to view monitor templates" >}}

### Attribute incoming messages to any queue, service, or cluster

High lag on a consuming service, increased resource use on a Kafka broker, and increased RabbitMQ or Amazon SQS queue size are frequently explained by changes in the way adjacent services are producing to or consuming from these entities.

Click on the **Throughput** tab on any service or queue in Data Streams Monitoring to quickly detect changes in throughput, and which upstream or downstream service these changes originate from. Once the [Software Catalog][2] is configured, you can immediately pivot to the corresponding team's Slack channel or on-call engineer.

By filtering to a single Kafka, RabbitMQ, or Amazon SQS cluster, you can detect changes in incoming or outgoing traffic for all detected topics or queues running on that cluster:

### Quickly pivot to identify root causes in infrastructure, logs, or traces

Datadog automatically links the infrastructure powering your services and related logs through [Unified Service Tagging][3], so you can easily localize bottlenecks. Click the **Infra**, **Logs** or **Traces** tabs to further troubleshoot why pathway latency or consumer lag has increased.

### Monitor connector throughput and status
{{< img src="data_streams/connectors_topology.png" alt="A DSM topology map, showing a connector called 'analytics-sink'. The visualization indicates that the connector has a status of FAILED." style="width:100%;" >}}

Datadog can automatically detect your managed [Confluent Cloud][8] connectors and visualize them in the Data Streams Monitoring topology map. Install and configure the [Confluent Cloud integration][9] to collect information from your Confluent Cloud connectors—including throughput, status, and topic dependencies.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_streams/go#manual-instrumentation
[2]: /tracing/software_catalog/
[3]: /getting_started/tagging/unified_service_tagging
[4]: /integrations/kafka/
[5]: /integrations/amazon_sqs/
[6]: /tracing/trace_collection/runtime_config/
[7]: https://app.datadoghq.com/data-streams/measure
[8]: https://www.confluent.io/confluent-cloud/
[9]: /integrations/confluent_cloud/
[10]: https://app.datadoghq.com/data-streams/map
[11]: /opentelemetry/compatibility
