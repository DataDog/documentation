---
title: Setup Data Streams Monitoring for .NET
further_reading:
  - link: 'https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/'
    tag: 'Blog'
    text: 'Autodiscover Confluent Cloud connectors and easily monitor performance in Data Streams Monitoring'
aliases:
  - /data_streams/dotnet
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

### Supported libraries

| Technology                                                  | Library                          | Minimal tracer version                                                                   | Recommended tracer version                                                                   |
|-------------------------------------------------------------|----------------------------------|------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| Kafka                                                       | [Confluent.Kafka][3]             | {{< dsm-tracer-version lang="dotnet" lib="confluent-kafka" type="minimal" >}}            | {{< dsm-tracer-version lang="dotnet" lib="confluent-kafka" type="recommended" >}}            |
| RabbitMQ                                                    | [RabbitMQ.Client][4]             | {{< dsm-tracer-version lang="dotnet" lib="rabbitmq-client" type="minimal" >}}            | {{< dsm-tracer-version lang="dotnet" lib="rabbitmq-client" type="recommended" >}}            |
| Amazon SQS                                                  | [Amazon SQS SDK][5]              | {{< dsm-tracer-version lang="dotnet" lib="amazon-sqs-sdk" type="minimal" >}}             | {{< dsm-tracer-version lang="dotnet" lib="amazon-sqs-sdk" type="recommended" >}}             |
| Amazon SNS                                                  | [Amazon SNS SDK][6]              | {{< dsm-tracer-version lang="dotnet" lib="amazon-sns-sdk" type="minimal" >}}             | {{< dsm-tracer-version lang="dotnet" lib="amazon-sns-sdk" type="recommended" >}}             |
| Amazon Kinesis                                              | [Amazon Kinesis SDK][7]          | {{< dsm-tracer-version lang="dotnet" lib="amazon-kinesis-sdk" type="minimal" >}}         | {{< dsm-tracer-version lang="dotnet" lib="amazon-kinesis-sdk" type="recommended" >}}         |
| IBM MQ                                                      | [IBMMQDotnetClient][8]           | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="minimal" >}}          | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="recommended" >}}          |
| Azure Service Bus <br><br> (requires [additional setup][9]) | [Azure.Messaging.ServiceBus][10] | {{< dsm-tracer-version lang="dotnet" lib="azure-messaging-servicebus" type="minimal" >}} | {{< dsm-tracer-version lang="dotnet" lib="azure-messaging-servicebus" type="recommended" >}} |

### Installation

.NET uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. 

{{< tabs >}}
{{% tab ".NET Tracer >= v3.22.0 (Recommended)" %}}

Starting with version 3.22.0 of the .NET tracer, Data Streams Monitoring is **enabled by default**, and `DD_DATA_STREAMS_ENABLED` does not need to be set.

See [Default Enabled Mode](#default-enabled-mode) for more information.

{{% /tab %}}
{{% tab ".NET Tracer < v3.22.0 (Legacy)" %}}

To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services sending messages to (or consuming messages from) your streaming applications.

For example:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
  - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

{{% /tab %}}
{{< /tabs >}}

{{% data_streams/monitoring-kafka-pipelines %}}

{{% data_streams/monitoring-sqs-pipelines %}}

{{% data_streams/monitoring-rabbitmq-pipelines %}}

{{% data_streams/monitoring-sns-to-sqs-pipelines %}}

{{% data_streams/monitoring-azure-service-bus %}}

### Monitoring connectors

#### Confluent Cloud connectors
{{% data_streams/dsm-confluent-connectors %}}

### Default enabled mode

Starting with version 3.22.0 of the .NET tracer, Data Streams Monitoring is in a default-enabled state. As long as you pay for the Data Streams Monitoring product (for example, APM Pro), you will start seeing metrics and data.

In default mode, the following caveats apply:

* Schema tracking is disabled.
* Data Streams is not enabled when running in a serverless environment.
* Data Streams information is not propagated for certain messages which are too small or too large. See [Message sizes](#message-sizes) for more details.
* Message sizes are not tracked.

These features can be enabled by explicitly setting `DD_DATA_STREAMS_ENABLED` to `true` on your services.

```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
  - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

When `DD_DATA_STREAMS_ENABLED` is set to `true`, then:

* Schema tracking is enabled.
* Data Streams is enabled for serverless environments.
* Data Streams information is sent for **all** messages.
* Message sizes are tracked.

To disable Data Streams Monitoring completely, set `DD_DATA_STREAMS_ENABLED` to `false` on your services.

#### Message sizes

When Data Streams Monitoring is enabled in default mode, some messages are not instrumented when they are too small, or too large.

The following size thresholds apply when Data Streams Monitoring is enabled in default mode:

- **Kafka**
  - Messages less than 34 bytes are not instrumented by default.

- **RabbitMQ**
  - Messages greater than 128 kilobytes are not instrumented by default.

- **Amazon Kinesis**
  - Messages less than 34 bytes are not instrumented by default.

**Note:** When `DD_DATA_STREAMS_ENABLED` is explicitly set to `true`, all messages are instrumented regardless of size.


#### Additional notes

**Mixed tracer environments:** When Data Streams Monitoring is in default mode, data is only forwarded to the DSM backend when **all** services in your environment are using compatible tracers with default-enabled functionality. If you have a mixed environment, DSM does not forward any data to ensure data completeness and accuracy.

If you want to receive partial .NET data in a mixed tracer environment, reach out here.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[3]: https://www.nuget.org/packages/Confluent.Kafka
[4]: https://www.nuget.org/packages/RabbitMQ.Client
[5]: https://www.nuget.org/packages/AWSSDK.SQS
[6]: https://www.nuget.org/packages/AWSSDK.SimpleNotificationService
[7]: https://www.nuget.org/packages/AWSSDK.Kinesis
[8]: https://www.nuget.org/packages/IBMMQDotnetClient
[9]: #monitoring-azure-service-bus
[10]: https://www.nuget.org/packages/Azure.Messaging.ServiceBus
[11]: https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/core/Azure.Core/samples/Diagnostics.md#enabling-experimental-tracing-features
