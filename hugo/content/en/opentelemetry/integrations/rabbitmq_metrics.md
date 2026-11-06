---
title: RabbitMQ Metrics
further_reading:
- link: "/opentelemetry/setup/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

<!-- TODO: Add dashboard screenshot once available -->
<!-- {{< img src="/opentelemetry/collector_exporter/rabbitmq_metrics.png" alt="OpenTelemetry RabbitMQ metrics in a RabbitMQ Overview dashboard" style="width:100%;" >}} -->

The [RabbitMQ receiver][1] collects RabbitMQ metrics that populate the [RabbitMQ Overview (Management Version)][3] and [RabbitMQ Overview (OpenMetrics Version)][4] dashboards and RabbitMQ monitors. Configure the receiver according to the specifications of the latest version of the `rabbitmqreceiver`.

For more information, see the OpenTelemetry project documentation for the [RabbitMQ receiver][1].

## Setup

To collect RabbitMQ metrics with OpenTelemetry for use with Datadog:

1. Enable the [management plugin][6] on your RabbitMQ brokers, and create a user with at least `monitoring` permissions. The receiver reads the management HTTP API.
2. Configure the [RabbitMQ receiver][1] in your OpenTelemetry Collector configuration.
3. Configure service pipelines.
4. Verify that the OpenTelemetry Collector is [configured to export to Datadog][5], and add the exporter setting shown below.

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

exporters:
  datadog/exporter:
    metrics:
      sums:
        initial_cumulative_monotonic_value: drop
```

This configuration does the following:

- Enables the `rabbitmq.node.*` metrics, which are all off by default in the receiver.
- Uses the `transform` processor to mark the node connection and queue counters as monotonic. The receiver declares them as non-monotonic sums, so without it the Datadog exporter sends the running total instead of per-interval counts.
- Sets `initial_cumulative_monotonic_value: drop` on the Datadog exporter. This setting stops the exporter from reporting the full count since broker startup as a single value after each Collector restart.

Configure one receiver for each cluster, not for each node. The management API returns every node and queue in the cluster, so a receiver on each node reports each series once for every receiver.

See the [RabbitMQ receiver documentation][1] for detailed configuration options and requirements.

### Service pipelines

```yaml
service:
  pipelines:
    metrics/rabbitmq-cluster-1:
      receivers: [rabbitmq/rabbitmq-cluster-1]
      processors: [transform/rabbitmq-cluster-1]
      exporters: [datadog/exporter]
```

## Data collected

{{< mapping-table resource="rabbitmq.csv">}}

The receiver's `rabbitmq.queue.name`, `rabbitmq.vhost.name`, and `rabbitmq.node.name` attributes map to the Datadog `queue`, `vhost`, and `rabbitmq_node` tags.

For the full mapping between OpenTelemetry and Datadog metric names, see [OpenTelemetry Metrics Mapping][2].

### Known limitations

- Starting with RabbitMQ 4.0, the broker reports `sockets_used` and `sockets_total` as `0` and no longer exposes `process_open_tcp_sockets` or `process_max_tcp_sockets`. On 4.x brokers, the socket metrics read `0`.
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
