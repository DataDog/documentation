---
title: Setup Data Streams Monitoring for Python
further_reading:
    - link: '/integrations/kafka/'
      tag: 'Documentation'
      text: 'Kafka Integration'
    - link: '/tracing/service_catalog/'
      tag: 'Documentation'
      text: 'Service Catalog'
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

### Supported libraries

| Technology     | Library                                                      | Minimal tracer version | Recommended tracer version |
|----------------|--------------------------------------------------------------|------------------------|----------------------------|
| Kafka          | [confluent-kafka](https://pypi.org/project/confluent-kafka/) | 1.16.0                 | 2.11.0 or later            |
| RabbitMQ       | [Kombu](https://pypi.org/project/kombu/)                     | 2.6.0                  | 2.6.0 or later             |
| Amazon SQS     | [Botocore](https://pypi.org/project/botocore/)               | 1.20.0                 | 2.8.0 or later             |
| Amazon Kinesis | [Botocore](https://pypi.org/project/botocore/)               | 1.20.0                 | 2.8.0 or later             |
| Amazon SNS     | [Botocore](https://pypi.org/project/botocore/)               | 1.20.0                 | 2.8.0 or later             |

### Installation

Python uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services sending messages to (or consuming messages from) Kafka.

For example:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

### Monitoring SQS Pipelines
Data Streams Monitoring uses one [message attribute][4] to track a message's path through an SQS queue. As Amazon SQS has a maximum limit of 10 message attributes allowed per message, all messages streamed through the data pipelines must have 9 or less message attributes set, allowing the remaining attribute for Data Streams Monitoring.

### Monitoring Kinesis Pipelines
There are no message attributes in Kinesis to propagate context and track a message's full path through a Kinesis stream. As a result, Data Streams Monitoring's end-to-end latency metrics are approximated based on summing latency on segments of a message's path, from the producing service through a Kinesis Stream, to a consumer service. Throughput metrics are based on segments from the producing service through a Kinesis Stream, to the consumer service. The full topology of data streams can still be visualized through instrumenting services.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/python
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: https://pypi.org/project/kombu/
