---
title: Setup Data Streams Monitoring for Python
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
  - /data_streams/python
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
  - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

{{% data_streams/monitoring-kafka-pipelines %}}

{{% data_streams/monitoring-sqs-pipelines %}}

{{% data_streams/monitoring-rabbitmq-pipelines %}}

{{% data_streams/monitoring-kinesis-pipelines %}}

{{% data_streams/monitoring-sns-to-sqs-pipelines %}}

### Manual instrumentation
Data Streams Monitoring propagates context through message headers. If you are using a message queue technology that is not supported by DSM, a technology without headers (such as Kinesis), or Lambdas, use [manual instrumentation to set up DSM][6].

### Monitoring connectors

#### Confluent Cloud connectors
{{% data_streams/dsm-confluent-connectors %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/python
[3]: https://pypi.org/project/confluent-kafka/
[5]: https://pypi.org/project/kombu/
[6]: /data_streams/manual_instrumentation/?tab=python
