---
title: Tracing Kafka queues
kind: guide
further_reading:
- link: "/tracing/trace_collection"
  tags: "Documentation"
  text: "Set up trace collection"
- link: "/integrations/kafka"
  tags: "Documentation"
  text: "Kafka integration"
- link: "/tracing/troubleshooting/"
  tags: "Documentation"
  text: "Data Streams Monitoring"
---

## Monitor Kafka queues

In event-driven pipelines, queuing and streaming technologies such as Kafka are essential to the successful operation of your systems. However, ensuring that messages are being reliably and quickly conveyed between services is difficult due to the many technologies and teams involved in any such environment. Datadog's Kafka integration and its APM suite enables your team to monitor your infrastructure and pipelines health and efficiency.

### Integration

Easily visualize the performance of your cluster in real time qnd correlate the performance of Kafka with the rest of your applications by using [Datadog's Kafka integration][1]

{{< img src="tracing/guide/monitor_kafka_queues/kafka_dashboard.png" alt="Data Streams Monitoring Demo">}}
<br>

### Data Stream Monitoring

[Datadog Data Streams Monitoring][2] provides a standardized method for your teams to measure pipeline health and end-to-end latencies for events traversing across your system. The deep visibility offered by Data Streams Monitoring enables you to pinpoint faulty producers, consumers, or queues driving delays and lag in the pipeline; discover hard-to-debug pipeline issues such as blocked messages, hot partitions, or offline consumers; and collaborate seamlessly across relevant infrastructure or app teams.

{{< img src="tracing/guide/monitor_kafka_queues/dash-2022-data-streams-compressed-blurb.mp4" alt="Data Streams Monitoring Demo" video="true">}}
<br>

### Collect distributed traces

Datadog APM and distributed tracing gives you expanded visibility into the performance of your services by measuring request volume and latency. You create graphs and alerts to monitor your APM data, and you can visualize the activity of a single request in a flame graph like the one shown below to better understand the sources of latency and errors.
<br>
{{< img src="tracing/guide/monitor_kafka_queues//kafka_traces.png" alt="A kafka consumer span" >}}
<br>
Datadog APM can automatically trace requests to and from Kafka clients. This means you can collect traces without modifying the source code of your producers and consumers.

#### Setup

To trace kafka applications, we actually trace the producing and consuming calls within the Kafka SDK. So to monitor Kafka, you just have to setup APM on your services. See [the documentation][3] for guidance on getting started with APM and distributed tracing.

#### Monitor in the APM UI

A classic Kafka setup will show a trace with a producer span, and as a child, a consumer span. Any work that would generate a trace in the consumption side will be represented by child spans of the consumer span.
Each spans contain a set of tags with the `messaging` prefix. Below, the tags you can find on Kafka spans.

| Tag                             | Description                                                                                        | Availability         |
| ------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------- |
| `messaging.kafka.message_key`     |  Message keys in Kafka are used for grouping alike messages to ensure they're processed on the same partition.<br> They differ from `messaging.message_id` in that they're not unique.                                                          | Best effort             |
| `messaging.kafka.consumer_group`  |  Name of the Kafka Consumer Group that is handling the message. Only applies to consumers, not producers. | Best effort             |
| `messaging.kafka.client_id`       |  Client Id for the Consumer or Producer that is handling the message. | Best effort             |
| `messaging.kafka.partition`       |  Partition the message is sent to.                                    | Best effort             |
| `messaging.kafka.tombstone`       |  A boolean that is true if the message is a tombstone.                | Best effort             |
| `messaging.kafka.client_id`       |  Client Id for the Consumer or Producer that is handling the message. | Best effort             |
| `messaging.system`                |  `Kafka`                                                              | Always present          |
| `messaging.destination`           |  The topic the message is sent to.                                    | Best effort             |
| `messaging.destination_kind`      |  `Queue`                                                              | Best effort             |
| `messaging.message_id`            |  Identifier for the message.                                          | Best effort             |
| `messaging.operation`             |  `send`, `receive` or `process`                                       | Best effort             |
| `messaging.consumer_id`           |  `{messaging.kafka.consumer_group} - {messaging.kafka.client_id}` if both are present.<br>`messaging.kafka.consumer_group` if not.                             | Best effort             |

#### Special use cases

{{< tabs >}}

{{% tab ".NET" %}}

Usually, messages are consumed in a loop. Thus, by default, the consumer span is created when a message is consumed and closed before consuming the next message. The span duration is representative of the computation between one message consumption and the next. Use this setting when message consumption is performed in a loop.

When a message is not processed completely before consuming the next one, or when multiple messages are consumed at once., you can set `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` to false in your conssuming application. When set to false, the consumer span is created when a message is consumed and immediately closed. This unfortunately will prevent child spans to be attached to the current trace. If you have child spans to trace, follow [this documentation][4] to extract the trace context.

{{% /tab %}}

{{< /tabs >}}

#### Disable tracing for Kafka

If you want to disable tracing for Kafka, you can set `DD_TRACE_KAFKA_ENABLED` to false on the given applications.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/kafka
[2]: https://app.datadoghq.com/data-streams/onboarding
[3]: /tracing/trace_collection/
[4]: /tracing/trace_collection/custom_instrumentation/dotnet/#headers-extraction-and-injection