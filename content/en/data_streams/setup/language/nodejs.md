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

-   [Datadog Agent v7.34.0 or later][10]

### Supported libraries

| Technology      | Library                                                                                  | Minimal tracer version                                                                   | Recommended tracer version                                                                   |
| --------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Kafka           | [kafkajs](https://www.npmjs.com/package/kafkajs)                                         | {{< dsm-tracer-version lang="nodejs" lib="kafkajs" type="minimal" >}}                    | {{< dsm-tracer-version lang="nodejs" lib="kafkajs" type="recommended" >}}                    |
| Confluent Kafka | [confluent-kafka-javascript](https://github.com/confluentinc/confluent-kafka-javascript) | {{< dsm-tracer-version lang="nodejs" lib="confluent-kafka-javascript" type="minimal" >}} | {{< dsm-tracer-version lang="nodejs" lib="confluent-kafka-javascript" type="recommended" >}} |
| RabbitMQ        | [amqplib](https://www.npmjs.com/package/amqplib)                                         | {{< dsm-tracer-version lang="nodejs" lib="amqplib" type="minimal" >}}                    | {{< dsm-tracer-version lang="nodejs" lib="amqplib" type="recommended" >}}                    |
| RabbitMQ        | [rhea](https://www.npmjs.com/package/rhea)                                               | {{< dsm-tracer-version lang="nodejs" lib="rhea" type="minimal" >}}                       | {{< dsm-tracer-version lang="nodejs" lib="rhea" type="recommended" >}}                       |
| Amazon SQS      | [client-sqs](https://www.npmjs.com/package/@aws-sdk/client-sqs)                          | {{< dsm-tracer-version lang="nodejs" lib="client-sqs" type="minimal" >}}                 | {{< dsm-tracer-version lang="nodejs" lib="client-sqs" type="recommended" >}}                 |
| Amazon Kinesis  | [client-kinesis](https://www.npmjs.com/package/@aws-sdk/client-kinesis)                  | {{< dsm-tracer-version lang="nodejs" lib="client-kinesis" type="minimal" >}}             | {{< dsm-tracer-version lang="nodejs" lib="client-kinesis" type="recommended" >}}             |
| Amazon SNS      | [client-sns](https://www.npmjs.com/package/@aws-sdk/client-sns)                          | {{< dsm-tracer-version lang="nodejs" lib="client-sns" type="minimal" >}}                 | {{< dsm-tracer-version lang="nodejs" lib="client-sns" type="recommended" >}}                 |
| Google Pub/Sub  | [google-cloud/pubsub](https://www.npmjs.com/package/@google-cloud/pubsub)                | {{< dsm-tracer-version lang="nodejs" lib="google-cloud-pubsub" type="minimal" >}}        | {{< dsm-tracer-version lang="nodejs" lib="google-cloud-pubsub" type="recommended" >}}        |

#### Support for Amazon SQS with AWS Lambda

To monitor data streams for Node.js Lambda functions calling Amazon SQS, SNS, or Kinesis, use Datadog's Node.js Lambda tracer, [`datadog-lambda-js` v.12.128.0][8] or later.

### Installation

Node.js uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services sending messages to (or consuming messages from) Kafka.

For example:

```yaml
environment:
    - DD_DATA_STREAMS_ENABLED: 'true'
    - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: 'true'
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

[10]: /agent
[2]: /tracing/trace_collection/dd_libraries/nodejs
[3]: https://pypi.org/project/confluent-kafka/
[5]: https://www.npmjs.com/package/amqplib
[6]: https://www.npmjs.com/package/rhea
[7]: /data_streams/manual_instrumentation/?tab=nodejs
[8]: https://github.com/DataDog/datadog-lambda-js/releases/tag/v12.128.0
