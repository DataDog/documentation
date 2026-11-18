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

PHP uses auto-instrumentation to inject and extract the metadata that Data Streams Monitoring needs to measure end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services that send messages to or consume messages from Kafka or RabbitMQ. Datadog also recommends setting `DD_TRACE_STATS_COMPUTATION_ENABLED` to `true`.

{{< tabs >}}
{{% tab "Environment variables" %}}

```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
  - DD_TRACE_STATS_COMPUTATION_ENABLED: "true"
```

{{% /tab %}}
{{% tab "INI file" %}}

```ini
datadog.data_streams_enabled = On
datadog.trace.stats_computation_enabled = On
```

{{% /tab %}}
{{< /tabs >}}

As with other PHP SDK settings, set these at the server level so that they take effect before any of your code runs. To set them for your web server or the CLI, see [Configuring the PHP SDK][4].

Data Streams Monitoring identifies your service by `DD_SERVICE`. If `DD_SERVICE` is not set, the SDK uses a default service name: `web.request` for web requests, and the script's filename for CLI scripts. Set `DD_SERVICE` on each service so that it appears under its own name in Data Streams Monitoring.

{{% data_streams/monitoring-kafka-pipelines %}}

{{% data_streams/monitoring-rabbitmq-pipelines %}}

### Monitoring connectors

#### Confluent Cloud connectors

{{% data_streams/dsm-confluent-connectors %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: https://github.com/arnaud-lb/php-rdkafka
[3]: https://github.com/php-amqplib/php-amqplib
[4]: /tracing/trace_collection/library_config/php/
