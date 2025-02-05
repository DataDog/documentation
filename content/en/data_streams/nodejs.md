---
title: Setup Data Streams Monitoring for Node.js
further_reading:
    - link: '/integrations/kafka/'
      tag: 'Documentation'
      text: 'Kafka Integration'
    - link: '/tracing/software_catalog/'
      tag: 'Documentation'
      text: 'Software Catalog'
---
### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

### Supported libraries

| Technology     | Library                                                                   | Minimal tracer version    | Recommended tracer version |
|----------------|---------------------------------------------------------------------------|---------------------------|----------------------------|
| Kafka          | [kafkajs](https://www.npmjs.com/package/kafkajs)                          | 2.39.0 or 3.26.0 or 4.5.0 | 5.25.0 or later            |
| RabbitMQ       | [amqplib](https://www.npmjs.com/package/amqplib)                          | 3.48.0 or 4.27.0 or 5.3.0 | 5.3.0 or later             |
| Amazon SQS     | [client-sqs](https://www.npmjs.com/package/@aws-sdk/client-sqs)           | 3.47.0 or 4.26.0 or 5.2.0 | 5.18.0 or later            |
| Amazon Kinesis | [client-kinesis](https://www.npmjs.com/package/@aws-sdk/client-kinesis)   | 3.47.0 or 4.26.0 or 5.2.0 | 5.18.0 or later            |
| Amazon SNS     | [client-sns](https://www.npmjs.com/package/@aws-sdk/client-sns)           | 3.47.0 or 4.26.0 or 5.2.0 | 5.18.0 or later            |
| Google Pub/Sub | [google-cloud/pubsub](https://www.npmjs.com/package/@google-cloud/pubsub) | 5.25.0 or 4.49.0          | 5.25.0 or later            |

### Installation

Node.js uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services sending messages to (or consuming messages from) Kafka.

For example:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

### Monitoring SQS pipelines
Data Streams Monitoring uses one [message attribute][4] to track a message's path through an SQS queue. As Amazon SQS has a maximum limit of 10 message attributes allowed per message, all messages streamed through the data pipelines must have 9 or fewer message attributes set, allowing the remaining attribute for Data Streams Monitoring.

### Monitoring SNS-to-SQS pipelines
To monitor a data pipeline where Amazon SNS talks directly to Amazon SQS, you must enable [Amazon SNS raw message delivery][8].

### Monitoring Kinesis pipelines
There are no message attributes in Kinesis to propagate context and track a message's full path through a Kinesis stream. As a result, Data Streams Monitoring's end-to-end latency metrics are approximated based on summing latency on segments of a message's path, from the producing service through a Kinesis Stream, to a consumer service. Throughput metrics are based on segments from the producing service through a Kinesis Stream, to the consumer service. The full topology of data streams can still be visualized through instrumenting services.

### Manual instrumentation
Data Streams Monitoring propagates context through message headers. If you are using a message queue technology that is not supported by DSM, a technology without headers (such as Kinesis), or Lambdas, use [manual instrumentation to set up DSM][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/nodejs
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: https://www.npmjs.com/package/amqplib
[6]: https://www.npmjs.com/package/rhea
[7]: /data_streams/manual_instrumentation/?tab=nodejs
[8]: https://docs.aws.amazon.com/sns/latest/dg/sns-large-payload-raw-message-delivery.html