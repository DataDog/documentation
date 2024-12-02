---
title: Setup Data Streams Monitoring for Node.js
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

| Technology     | Library                                                                   | Minimal tracer version    | Recommended tracer version |
|----------------|---------------------------------------------------------------------------|---------------------------|----------------------------|
| Kafka          | [kafka-node](https://www.npmjs.com/package/kafka-node)                    | 2.39.0 or 3.26.0 or 4.5.0 | 5.25.0 or later            |
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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/nodejs
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: https://www.npmjs.com/package/amqplib
[6]: https://www.npmjs.com/package/rhea
