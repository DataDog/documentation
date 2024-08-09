---
title: Setup Data Streams Monitoring for .NET
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">Data Streams Monitoring is not supported in the AP1 region.</a></div>
{{< /site-region >}}

### Prerequisites

To start with Data Streams Monitoring, you need recent versions of the Datadog Agent and .NET libraries:
* [Datadog Agent v7.34.0 or later][1]
* .NET Tracer ([.NET Core][2], [.NET Framework][3])
  * Kafka and RabbitMQ: v2.28.0 or later
  * Amazon SQS: v2.48.0

### Installation

.NET uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services sending messages to (or consuming messages from) Kafka or RabbitMQ.

For example:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```
### Supported libraries
Data Streams Monitoring supports the [confluent-kafka library][4].

### Monitoring SQS pipelines
Data Streams Monitoring uses one [message attribute][5] to track a message's path through an SQS queue. As Amazon SQS has a maximum limit of 10 message attributes allowed per message, all messages streamed through the data pipelines must have 9 or fewer message attributes set, allowing the remaining attribute for Data Streams Monitoring.


[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/dotnet-core
[3]: /tracing/trace_collection/dd_libraries/dotnet-framework
[4]: https://pypi.org/project/confluent-kafka/
[5]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
