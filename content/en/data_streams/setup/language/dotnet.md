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

.NET uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services sending messages to (or consuming messages from) Kafka or RabbitMQ.

For example:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
  - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

{{% data_streams/monitoring-kafka-pipelines %}}

{{% data_streams/monitoring-sqs-pipelines %}}

{{% data_streams/monitoring-rabbitmq-pipelines %}}

{{% data_streams/monitoring-sns-to-sqs-pipelines %}}

{{% data_streams/monitoring-azure-service-bus %}}

### Monitoring connectors

#### Confluent Cloud connectors
{{% data_streams/dsm-confluent-connectors %}}

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
