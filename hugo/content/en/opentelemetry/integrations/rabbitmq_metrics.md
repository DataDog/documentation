---
title: RabbitMQ Metrics
further_reading:
- link: "/opentelemetry/setup/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/rabbitmq_metrics.png" alt="The RabbitMQ Overview (Management Version) dashboard, showing integration and RabbitMQ status tiles, and tables of disk and memory alarms by service." style="width:100%;" >}}

The [RabbitMQ receiver][1] collects RabbitMQ metrics that populate the [RabbitMQ Overview (Management Version)][3] and [RabbitMQ Overview (OpenMetrics Version)][4] dashboards and RabbitMQ monitors. Configure the receiver according to the specifications of the latest version of the `rabbitmqreceiver`.

For more information, see the OpenTelemetry project documentation for the [RabbitMQ receiver][1].

## Setup

To collect RabbitMQ metrics with OpenTelemetry for use with Datadog:

1. Enable the [management plugin][6] on your RabbitMQ brokers, and create a user for the receiver. The receiver reads the management HTTP API.
2. Configure the [RabbitMQ receiver][1] in your OpenTelemetry Collector configuration.
3. Configure the processors that convert the receiver's connection, queue, and message counters to per-interval counts.
4. Add the service pipelines to your Collector configuration.
5. Set up the OpenTelemetry Collector with the [recommended configuration][5], which exports to Datadog with the OTLP HTTP exporter (`otlp_http`).

### RabbitMQ user

Enable the management plugin on each RabbitMQ node, then create a user with the `monitoring` tag:

```shell
rabbitmq-plugins enable rabbitmq_management
rabbitmqctl add_user <USERNAME> <PASSWORD>
rabbitmqctl set_user_tags <USERNAME> monitoring
rabbitmqctl set_permissions -p / <USERNAME> "" "" ""
```

Run `set_permissions` for each virtual host you want to monitor, replacing `/` with its name.

### RabbitMQ receiver

```yaml
receivers:
  rabbitmq/rabbitmq-cluster-1:
    endpoint: "http://<HOST>:15672"
    username: "<USERNAME>"
    password: "<PASSWORD>"
    collection_interval: 10s
    metrics:
      rabbitmq.node.connection_closed:
        enabled: true
      rabbitmq.node.connection_created:
        enabled: true
      rabbitmq.node.disk_free:
        enabled: true
      rabbitmq.node.disk_free_alarm:
        enabled: true
      rabbitmq.node.fd_total:
        enabled: true
      rabbitmq.node.fd_used:
        enabled: true
      rabbitmq.node.mem_alarm:
        enabled: true
      rabbitmq.node.mem_limit:
        enabled: true
      rabbitmq.node.mem_used:
        enabled: true
      rabbitmq.node.proc_total:
        enabled: true
      rabbitmq.node.proc_used:
        enabled: true
      rabbitmq.node.queue_created:
        enabled: true
      rabbitmq.node.queue_declared:
        enabled: true
      rabbitmq.node.queue_deleted:
        enabled: true
      rabbitmq.node.run_queue:
        enabled: true
      rabbitmq.node.sockets_total:
        enabled: true
      rabbitmq.node.sockets_used:
        enabled: true

processors:
  transform/rabbitmq-cluster-1:
    metric_statements:
      - context: metric
        statements:
          - set(metric.is_monotonic, true) where metric.name == "rabbitmq.node.connection_closed"
          - set(metric.is_monotonic, true) where metric.name == "rabbitmq.node.connection_created"
          - set(metric.is_monotonic, true) where metric.name == "rabbitmq.node.queue_created"
          - set(metric.is_monotonic, true) where metric.name == "rabbitmq.node.queue_declared"
          - set(metric.is_monotonic, true) where metric.name == "rabbitmq.node.queue_deleted"
  cumulativetodelta/rabbitmq-cluster-1:
    initial_value: drop
    include:
      match_type: strict
      metrics:
        - rabbitmq.node.connection_closed
        - rabbitmq.node.connection_created
        - rabbitmq.node.queue_created
        - rabbitmq.node.queue_declared
        - rabbitmq.node.queue_deleted
        - rabbitmq.message.acknowledged
```

Configure one receiver for each cluster, not for each node. The management API returns data for the whole cluster, so a receiver on each node duplicates every series.

See the [RabbitMQ receiver documentation][1] for detailed configuration options and requirements.

### Service pipelines

Add this pipeline under `service.pipelines` in your Collector configuration. The `otlp_http` exporter comes from the [recommended configuration][5].

```yaml
service:
  pipelines:
    metrics/rabbitmq-cluster-1:
      receivers: [rabbitmq/rabbitmq-cluster-1]
      processors: [transform/rabbitmq-cluster-1, cumulativetodelta/rabbitmq-cluster-1]
      exporters: [otlp_http]
```

## Data collected

{{< mapping-table resource="rabbitmq.csv">}}

The receiver's `rabbitmq.queue.name`, `rabbitmq.vhost.name`, and `rabbitmq.node.name` attributes map to the Datadog `queue`, `vhost`, and `rabbitmq_node` tags.

For the full mapping between OpenTelemetry and Datadog metric names, see [OpenTelemetry Metrics Mapping][2].

### Known limitations

- Starting with RabbitMQ 4.0, the broker reports `sockets_used` and `sockets_total` as `0` and no longer exposes `process_open_tcp_sockets` or `process_max_tcp_sockets`.
- Channel-level metrics, queue totals, and management API `.rate` metrics are not mapped, because their OpenTelemetry counterparts are scoped or typed differently. These include:
  - `rabbitmq.channels`
  - `rabbitmq.channel.messages.*`
  - `rabbitmq.global.consumers`
  - `rabbitmq.queue.messages`
  - `rabbitmq.queue.messages_ready`
  - `rabbitmq.queue.messages_unacknowledged`
  - `rabbitmq.queue.messages.published.count`
  - `rabbitmq.queue.messages.delivered.count`
  - `rabbitmq.queue.messages.*.rate`
- Exchange metrics are not mapped.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/rabbitmqreceiver
[2]: /opentelemetry/mapping/metrics_mapping/
[3]: https://app.datadoghq.com/dash/integration/237/rabbitmq-overview-management-version
[4]: https://app.datadoghq.com/dash/integration/37/rabbitmq-overview-openmetrics-version
[5]: /opentelemetry/setup/collector_exporter/
[6]: https://www.rabbitmq.com/docs/management
