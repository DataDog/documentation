---
title: Setup Data Streams Monitoring for Node.js
further_reading:
    - link: '/integrations/kafka/'
      tag: 'Documentation'
      text: 'Kafka Integration'
    - link: '/tracing/software_catalog/'
      tag: 'Documentation'
      text: 'Software Catalog'
    - link: 'https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/'
      tag: 'Blog'
      text: 'Autodiscover Confluent Cloud connectors and easily monitor performance in Data Streams Monitoring'
aliases:
  - /data_streams/nodejs
---
### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

### Supported libraries

| Technology     | Library                                                                   | Minimal tracer version    | Recommended tracer version |
|----------------|---------------------------------------------------------------------------|---------------------------|----------------------------|
| Kafka          | [kafkajs](https://www.npmjs.com/package/kafkajs)                          | 2.39.0 or 3.26.0 or 4.5.0 | 5.25.0 or later            |
| Confluent Kafka          | [confluent-kafka-javascript](https://github.com/confluentinc/confluent-kafka-javascript)                          | 5.52.0| 5.52.0 or later            |
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
  - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

{{% data_streams/monitoring-kafka-pipelines %}}

{{% data_streams/monitoring-sqs-pipelines %}}

{{% data_streams/monitoring-rabbitmq-pipelines %}}

{{% data_streams/monitoring-sns-to-sqs-pipelines %}}

{{% data_streams/monitoring-kinesis-pipelines %}}

### Manual instrumentation
Data Streams Monitoring propagates context through message headers. If you are using a message queue technology that is not supported by DSM, a technology without headers (such as Kinesis), or Lambdas, use [manual instrumentation to set up DSM][7].

### Monitoring connectors

#### Confluent Cloud connectors
{{% data_streams/dsm-confluent-connectors %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/nodejs
[3]: https://pypi.org/project/confluent-kafka/
[5]: https://www.npmjs.com/package/amqplib
[6]: https://www.npmjs.com/package/rhea
[7]: /data_streams/manual_instrumentation/?tab=nodejs
