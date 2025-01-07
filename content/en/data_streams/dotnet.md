---
title: Setup Data Streams Monitoring for .NET
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

### Supported libraries

| Technology        | Library                         | Minimal tracer version | Recommended tracer version |
|-------------------|---------------------------------|------------------------|----------------------------|
| Kafka             | [Confluent.Kafka][3]            | 2.28.0                 | 2.41.0 or later            |
| RabbitMQ          | [RabbitMQ.Client][4]            | 2.28.0                 | 2.37.0 or later            |
| Amazon SQS        | [Amazon SQS SDK][5]             | 2.48.0                 | 2.48.0 or later            |
| Amazon SNS        | [Amazon SNS SDK][6]             | 3.6.0                  | 3.6.0 or later             |
| IBM MQ            | [IBMMQDotnetClient][7]          | 2.49.0                 | 2.49.0 or later            |
| Azure service bus | [Azure.Messaging.ServiceBus][8] | 2.38.0                 | 2.38.0 or later            |

### Installation

.NET uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services sending messages to (or consuming messages from) Kafka or RabbitMQ.

For example:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

### Monitoring SQS pipelines
Data Streams Monitoring uses one [message attribute][2] to track a message's path through an SQS queue. As Amazon SQS has a maximum limit of 10 message attributes allowed per message, all messages streamed through the data pipelines must have 9 or fewer message attributes set, allowing the remaining attribute for Data Streams Monitoring.


[1]: /agent
[2]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[3]: https://www.nuget.org/packages/Confluent.Kafka
[4]: https://www.nuget.org/packages/RabbitMQ.Client
[5]: https://www.nuget.org/packages/AWSSDK.SQS
[6]: https://www.nuget.org/packages/AWSSDK.SimpleNotificationService
[7]: https://www.nuget.org/packages/IBMMQDotnetClient
[8]: https://www.nuget.org/packages/Azure.Messaging.ServiceBus
