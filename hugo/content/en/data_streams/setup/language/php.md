---
title: Setup Data Streams Monitoring for PHP
further_reading:
    - link: '/integrations/kafka/'
      tag: 'Documentation'
      text: 'Kafka Integration'
    - link: '/integrations/rabbitmq/'
      tag: 'Documentation'
      text: 'RabbitMQ Integration'
    - link: '/internal_developer_portal/catalog/'
      tag: 'Documentation'
      text: 'Catalog'
    - link: 'https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/'
      tag: 'Blog'
      text: 'Autodiscover Confluent Cloud connectors and easily monitor performance in Data Streams Monitoring'
aliases:
    - /data_streams/php
---

### Prerequisites

-   [Datadog Agent v7.34.0 or later][1]

### Supported libraries

| Technology | Library          | Minimum library version | Minimal tracer version                                                 | Recommended tracer version                                                 |
| ---------- | ---------------- | ----------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Kafka      | [php-rdkafka][2] | 6.0.0                   | {{< dsm-tracer-version lang="php" lib="php-rdkafka" type="minimal" >}} | {{< dsm-tracer-version lang="php" lib="php-rdkafka" type="recommended" >}} |
| RabbitMQ   | [php-amqplib][3] | 2.6.2                   | {{< dsm-tracer-version lang="php" lib="php-amqplib" type="minimal" >}} | {{< dsm-tracer-version lang="php" lib="php-amqplib" type="recommended" >}} |

### Installation

PHP uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services sending messages to (or consuming messages from) Kafka or RabbitMQ.

{{< tabs >}}
{{% tab "Environment variables" %}}

```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

{{% /tab %}}
{{% tab "INI file" %}}

```ini
datadog.data_streams_enabled = On
```

{{% /tab %}}
{{< /tabs >}}

As with other PHP tracer settings, set it at the server level, so that it is on before any of your code runs. See [PHP SDK configuration][4] for how to set it for your web server or the CLI.

Data Streams Monitoring identifies your service by `DD_SERVICE`. If it is not set, the tracer's default service name is used: `web.request` for web requests, and the script's filename for CLI scripts. Set `DD_SERVICE` on each service so that it appears under its own name in Data Streams Monitoring.

{{% data_streams/monitoring-kafka-pipelines %}}

#### Consumer lag

Data Streams Monitoring computes Kafka consumer lag from the offsets your producers write and the offsets your consumer groups commit:

- Produce offsets come from librdkafka's delivery reports. librdkafka only delivers them when your application calls `poll()` or `flush()` on the producer.
- Committed offsets come from the offset commit callback, which the tracer adds to `RdKafka\KafkaConsumer`, so both automatic and manual commits are reported. For the low-level `RdKafka\Consumer`, committed offsets are only reported when your application sets an offset commit callback with `RdKafka\Conf::setOffsetCommitCb()` and polls the consumer.

Delivery report and offset commit callbacks that your application sets keep running.

#### Kafka cluster ID

Checkpoints and offsets are tagged with the Kafka cluster ID, which librdkafka learns from the brokers' first metadata response. Until a new producer has that response, it uses the ID that other PHP processes on the same host learned for the same bootstrap servers. When no process has learned it yet, the producer's first message waits up to 100 milliseconds for it.

{{% data_streams/monitoring-rabbitmq-pipelines %}}

### Limitations

- The tracer only records Data Streams Monitoring data once it has confirmed that the Datadog Agent accepts it. A short-lived CLI script can exit before then, and send no data.

### Monitoring connectors

#### Confluent Cloud connectors

{{% data_streams/dsm-confluent-connectors %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: https://github.com/arnaud-lb/php-rdkafka
[3]: https://github.com/php-amqplib/php-amqplib
[4]: /tracing/trace_collection/library_config/php/
