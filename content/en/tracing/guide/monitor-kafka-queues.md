---
title: Monitoring Kafka Queues
kind: guide
further_reading:
- link: "/tracing/trace_collection"
  tags: "Documentation"
  text: "Set up trace collection"
- link: "/integrations/kafka"
  tags: "Documentation"
  text: "Kafka integration"
- link: "/data_streams/"
  tags: "Documentation"
  text: "Data Streams Monitoring"
---

## Overview

In event-driven pipelines, queuing and streaming technologies such as Kafka are essential to the successful operation of your systems. Ensuring that messages are being reliably and quickly conveyed between services can be difficult due to the many technologies and teams involved in such an environment. The Datadog Kafka integration and APM enable your team to monitor the health and efficiency of your infrastructure and pipelines.

### The Kafka integration

Visualize the performance of your cluster in real time and correlate the performance of Kafka with the rest of your applications by using [the Datadog Kafka integration][1]. Datadog also provides a [MSK integration][2].

{{< img src="tracing/guide/monitor_kafka_queues/kafka_dashboard.png" alt="Kafka Dashboard">}}

### Data Stream Monitoring

[Datadog Data Streams Monitoring][3] provides a standardized method for your teams to measure pipeline health and end-to-end latencies for events traversing your system. The deep visibility offered by Data Streams Monitoring enables you to pinpoint faulty producers, consumers, or queues driving delays and lag in the pipeline. You can discover hard-to-debug pipeline issues such as blocked messages, hot partitions, or offline consumers. And you can collaborate seamlessly across relevant infrastructure or app teams.

{{< img src="tracing/guide/monitor_kafka_queues/dash-2022-data-streams-compressed-blurb.mp4" alt="Data Streams Monitoring Demo" video="true">}}

### Distributed traces

APM's distributed tracing gives you expanded visibility into the performance of your services by measuring request volume and latency. Create graphs and alerts to monitor your APM data, and visualize the activity of a single request in a flame graph, like the one shown below, to better understand the sources of latency and errors.

{{< img src="tracing/guide/monitor_kafka_queues/kafka_trace.png" alt="A Kafka consumer span" >}}

APM can automatically trace requests to and from Kafka clients. This means you can collect traces without modifying your source code. Datadog injects headers in the Kafka messages so as to propagate the context of the trace from the producer to the consumer.

Check which Kafka libraries are supported in our [compatibility pages][4].

#### Setup

To trace Kafka applications, Datadog traces the producing and consuming calls within the Kafka SDK. So to monitor Kafka, you just have to setup APM on your services. See [the APM trace collection documentation][5] for guidance on getting started with APM and distributed tracing.

## Monitor your application in APM

A classic Kafka setup shows a trace with a producer span, and as a child, a consumer span. Any work that generates a trace in the consumption side is represented by child spans of the consumer span. Each span has a set of tags with the `messaging` prefix. The following table describes the tags you can find on Kafka spans.

<div class="alert alert-info">
  <div class="alert-info">
    <div>To get a more global understanding of spans metadata in Datadog, read <a href="/tracing/trace_collection/tracing_naming_convention">Span Tags Semantics</a></strong>.</div>
  </div>
</div>

| **Name**                         | **Type** | **Description**                                                                                                     |
|----------------------------------|----------|---------------------------------------------------------------------------------------------------------------------|
| `messaging.system`               | `string` | `Kafka`                                                                                                             |
| `messaging.destination`          | `string` | The topic the message is sent to.                                                                                   |
| `messaging.destination_kind`     | `string` | `Queue`                                                                                                             |
| `messaging.protocol`             | `string` | The name of the transport protocol.                                                                                 |
| `messaging.protocol_version`     | `string` | The version of the transport protocol.                                                                              |
| `messaging.url`                  | `string` | The connection string to the messaging system.                                                                      |
| `messaging.message_id`           | `string` | A value used by the messaging system as an identifier for the message, represented as a string.                     |
| `messaging.conversation_id`      | `string` | The conversation ID for the conversation that the message belongs to, represented as a string.             |
| `messaging.message_payload_size` | `number` | The size of the uncompressed message payload in bytes.                                                              |
| `messaging.operation`            | `string` | A string identifying the kind of message consumption. <br>Examples: `send` (a message sent to a producer), `receive` (a message is received by a consumer), or `process` (a message previously received is processed by a consumer).                                                                |
| `messaging.consumer_id`          | `string` | `{messaging.kafka.consumer_group} - {messaging.kafka.client_id}` if both are present.<br>`messaging.kafka.consumer_group` if not.                                                                                                                                                                |
| `messaging.kafka.message_key`    | `string` |  Message keys in Kafka are used for grouping alike messages to ensure they're processed on the same partition.<br> They differ from `messaging.message_id` in that they're not unique.                                                                                                             |
| `messaging.kafka.consumer_group` | `string` |  Name of the Kafka Consumer Group that is handling the message. Only applies to consumers, not producers.
| `messaging.kafka.client_id`      | `string` |  Client ID for the Consumer or Producer that is handling the message.                                               |
| `messaging.kafka.partition`      | `string` |  Partition the message is sent to.                                                                                  |
| `messaging.kafka.tombstone`      | `string` |  A Boolean that is true if the message is a tombstone.                                                              |
| `messaging.kafka.client_id`      | `string` |  Client ID for the Consumer or Producer that is handling the message.                                               |

## Special use cases

{{< tabs >}}

{{% tab "Java" %}}

The Datadog Kafka integration works with Kafka version 0.11+, which supports the Header API. This API is used to inject and extract trace context. If you run a mixed version environment, the Kafka broker can incorrectly report the newer version of Kafka. This causes an issue when the tracer tries to inject headers that are not supported by the local producer. Additionally, older consumers are unable to consume the message because of the presence of headers. To prevent these issues, if you run a mixed version Kafka environment with versions older than 0.11, disable context propagation with the environment variable `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false`.

{{% /tab %}}

{{% tab ".NET" %}}

The [Kafka .NET Client documentation][1] states that a typical Kafka consumer application is centered around a consume loop, which repeatedly calls the Consume method to retrieve records one-by-one. The `Consume` method polls the system for messages. Thus, by default, the consumer span is created when a message is returned and closed before consuming the next message. The span duration is then representative of the computation between one message consumption and the next.

When a message is not processed completely before consuming the next one, or when multiple messages are consumed at once, you can set `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` to `false` in your consuming application. When this setting is `false`, the consumer span is created and immediately closed. If you have child spans to trace, follow [the headers extraction and injection documentation for .NET custom instrumentation][2] to extract the trace context.

The .NET tracer allows tracing Confluent.Kafka since [v1.27.0][3]. The trace context propagation API is available since [v2.7.0][4]

[1]: https://docs.confluent.io/kafka-clients/dotnet/current/overview.html#the-consume-loop
[2]: /tracing/trace_collection/custom_instrumentation/dotnet/#headers-extraction-and-injection
[3]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.27.0
[4]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.7.0
{{% /tab %}}

{{% tab "Ruby" %}}

The Kafka integration provides tracing of the `ruby-kafka` gem. Follow [Ruby's tracer documentation][1] to enable it

[1]: /tracing/trace_collection/dd_libraries/ruby/#kafka
{{% /tab %}}

{{< /tabs >}}

### Disable tracing for Kafka

If you want to disable Kafka tracing on an application, set its `DD_TRACE_KAFKA_ENABLED` setting to `false`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/kafka
[2]: /integrations/amazon_msk/
[3]: https://app.datadoghq.com/data-streams/onboarding
[4]: /tracing/trace_collection/compatibility/
[5]: /tracing/trace_collection/