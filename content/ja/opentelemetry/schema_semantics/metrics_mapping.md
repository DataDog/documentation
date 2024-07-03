---
aliases:
- /ja/opentelemetry/guide/metrics_mapping/
further_reading:
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentation
  text: OTLP Metric Types
- link: /opentelemetry/guide/semantic_mapping
  tag: Documentation
  text: Resource attribute mapping from OpenTelemetry to Datadog
title: OpenTelemetry Metrics Mapping
---

## 概要

Datadog products and visualizations are built on metrics and tags that adhere to specific naming patterns. Metrics from OpenTelemetry components that are sent to Datadog are mapped to corresponding Datadog metrics, as applicable. The creation of these additional metrics does not affect Datadog billing.

The following diagram shows the process of mapping the metrics from OpenTelemetry into metrics that Datadog uses:

{{< img src="opentelemetry/guide/metrics_mapping/otel-mapping-metrics.png" alt="The decision process for mapping OpenTelemetry metric names to Datadog metric names. If an OTel metric is not used by any Datadog product, or if its semantics are the same as Datadog's, it is sent as-is to Datadog. Otherwise, a Datadog-style metric is created from the OTel metric and sent to Datadog." style="width:100%;" >}}

## Use of the `otel` prefix

To differentiate the metrics captured by the `hostmetrics` receiver from Datadog Agent, we add a prefix, `otel`, for metrics collected by the collector. If a metric name starts with `system.` or `process.`, `otel.` is prepended to the metric name. Monitoring the same infrastructure artifact using both Agent and Collector is not recommended. 

<div class="alert alert-info">Datadog is evaluating ways to improve the OTLP metric experience, including potentially deprecating this <code>otel</code> prefix. If you have feedback related to this, reach out your account team to provide your input.</div>

## ホストメトリクス

Host Metrics are collected by the [host metrics receiver][1]. For information about setting up the receiver, see [OpenTelemetry Collector Datadog Exporter][2].

The metrics, mapped to Datadog metrics, are used in the following views:
- [Infrastructure Host Map][5]
- [Infrastructure List][6]
- [Host default dashboards][7]
- [APM Trace view Host info][8]

**Note**: To correlate trace and host metrics, configure [Universal Service Monitoring attributes][3] for each service, and set the `host.name` resource attribute to the corresponding underlying host for both service and collector instances. 

The following table shows which Datadog host metric names are associated with corresponding OpenTelemetry host metric names, and, if applicable, what math is applied to the OTel host metric to transform it to Datadog units during the mapping.

| Datadog metric name   | OTel metric name      | メトリクスの説明         | Transform done on OTel metric      |
|-----------------------|-----------------------|----------------------------|--------------------------|
| `system.load.1`         | `system.cpu.load_average.1m`     | The average system load over one minute. (Linux only)       |         |
| `system.load.5`         | `system.cpu.load_average.5m`        | The average system load over five minutes. (Linux only)   | |
| `system.load.15`        | `system.cpu.load_average.15m`     | The average system load over 15 minutes. (Linux only)         |            |
| `system.cpu.idle`       | `system.cpu.utilization` <br>Attribute Filter state: `idle`    | Fraction of time the CPU spent in an idle state. Shown as percent.   | Multiplied by 100     |
| `system.cpu.user`       | `system.cpu.utilization` <br>Attribute Filter state: `user`    | Fraction of time the CPU spent running user space processes. Shown as percent.  | Multiplied by 100     |
| `system.cpu.system`     | `system.cpu.utilization` <br>Attribute Filter state: `system`  | Fraction of time the CPU spent running the kernel.    | Multiplied by 100    |
| `system.cpu.iowait`     | `system.cpu.utilization` <br>Attribute Filter state: `wait`    | The percent of time the CPU spent waiting for IO operations to complete.         | Multiplied by 100       |
| `system.cpu.stolen`     | `system.cpu.utilization` <br>Attribute Filter state: `steal`     | The percent of time the virtual CPU spent waiting for the hypervisor to service another virtual CPU. Only applies to virtual machines. Shown as percent.| Multiplied by 100   |
| `system.mem.total`      | `system.memory.usage`     | The total amount of physical RAM in bytes.   | Converted to MB (divided by 2^20) |
| `system.mem.usable`     | `system.memory.usage` <br>Attributes Filter state: `(free, cached, buffered)` | Value of `MemAvailable` from `/proc/meminfo` if present. If not present, falls back to adding `free + buffered + cached memory`. In bytes.    | Converted to MB (divided by 2^20) |
| `system.net.bytes_rcvd` | `system.network.io` <br>属性フィルターの方向: `receive`   | The number of bytes received on a device per second.       |         |
| `system.net.bytes_sent` | `system.network.io` <br>Attribute Filter direction: `transmit`   | The number of bytes sent from a device per second.           |       |
| `system.swap.free`      | `system.paging.usage` <br>Attribute Filter state: `free`    | The amount of free swap space, in bytes      | Converted to MB (divided by 2^20) |
| `system.swap.used`      | `system.paging.usage` <br>Attribute Filter state: `used`     | The amount of swap space in use, in bytes.  | Converted to MB (divided by 2^20) |
| `system.disk.in_use`    | `system.filesystem.utilization`    | The amount of disk space in use as a fraction of the total.      |        |

## Container metrics

The Docker Stats receiver generates container metrics for the OpenTelemetry Collector. The Datadog Exporter translates container metrics to their Datadog counterparts for use in the following views:

- [Containers Overview default dashboard][9]
- [APM Trace view][10] with container metrics

**Note**: To correlate trace and container metrics, configure [Universal Service Monitoring attributes][3] for each service, and set the following resource attributes for each service: 
  - `k8s.container.name` 
  - `k8s.pod.name` 
  - `container.name` 
  - `container.id`

  Learn more about [mapping between OpenTelemetry and Datadog semantic conventions for resource attributes][4].

The following table shows what Datadog container metric names are associated with corresponding OpenTelemetry container metric names

| Datadog Metric Name     | OTel Docker Stats Metric Name         | Metric Description             |
|-------------------------|--------------------------------|----------------------|
| `container.cpu.usage`    | `container.cpu.usage.total`       | The container total CPU Usage     |
| `container.cpu.user`     | `container.cpu.usage.usermode`         | The container userspace CPU usage   |
| `container.cpu.system`    | `container.cpu.usage.system`    | The container system CPU usage      |
| `container.cpu.throttled`    | `container.cpu. throttling_data.throttled_time`      | The total cpu throttled time      |
| `container.cpu.throttled.periods` | `container.cpu. throttling_data.throttled_periods`       | The number of periods during which the container was throttled |
| `container.memory.usage`          | `container.memory.usage.total`      | The container total memory usage      |
| `container.memory.kernel`         | `container.memory.active_anon`        | The container kernel memory usage     |
| `container.memory.limit`          | `container.memory. hierarchical_memory_limit`    | The container memory limit    |
| `container.memory.soft_limit`     | `container.memory.usage.limit`       | The container memory soft limit     |
| `container.memory.cache`          | `container.memory.total_cache`      | The container cache usage   |
| `container.memory.swap`           | `container.memory.total_swap`         | The container swap usage      |
| `container.io.write`              | `container.blockio. io_service_bytes_recursive` <br>Attribute Filter operation=`write` | The number of bytes written to disks by this container         |
| `container.io.read`               | `container.blockio. io_service_bytes_recursive` <br>Attribute Filter operation=`read`  | The number of bytes read from disks by this container          |
| `container.io.write.operations`   | `container.blockio. io_serviced_recursive` <br>Attribute Filter operation=`write`      | The number of write operations done by this container          |
| `container.io.read.operations`    | `container.blockio. io_serviced_recursive` <br>Attribute Filter operation=`read`       | The number of read operations done by this container           |
| `container.net.sent`              | `container.network.io. usage.tx_bytes`      | The number of network bytes sent (per interface)    |
| `container.net.sent.packets`      | `container.network.io. usage.tx_packets`    | The number of network packets sent (per interface)   |
| `container.net.rcvd`              | `container.network.io. usage.rx_bytes`     | The number of network bytes received (per interface)   |
| `container.net.rcvd.packets`      | `container.network.io. usage.rx_packets`   | The number of network packets received (per interface)    |

## Kafka metrics

| OpenTelemetry メトリクス | Datadog Metric | ソース | Transform done on Datadog Metric |
|---|---|---|---|
| otel.kafka.producer.request-rate | kafka.producer.request_rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer} | |
| otel.kafka.producer.response-rate | kafka.producer.response_rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer} | |
| otel.kafka.producer.request-latency-avg|kafka.producer.request_latency_avg | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer}| |
| kafka.producer.outgoing-byte-rate | kafka.producer.outgoing-byte-rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer}| |
| kafka.producer.io-wait-time-ns-avg | kafka.producer.io_wait | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer}| |
| kafka.producer.byte-rate | kafka.producer.bytes_out | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer} | |
| kafka.consumer.total.bytes-consumed-rate | kafka.consumer.bytes_in | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-consumer} | |
| kafka.consumer.total.records-consumed-rate | kafka.consumer.messages_in | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-consumer} | |
| kafka.network.io{state:out} | kafka.net.bytes_out.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.network.io{state:in} | kafka.net.bytes_in.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.purgatory.size{type:produce} | kafka.request.producer_request_purgatory.size | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.purgatory.size{type:fetch} | kafka.request.fetch_request_purgatory.size | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.partition.under_replicated | kafka.replication.under_replicated_partitions | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.isr.operation.count{operation:shrink} | kafka.replication.isr_shrinks.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.isr.operation.count{operation:expand} | kafka.replication.isr_expands.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge | 
| kafka.leader.election.rate | kafka.replication.leader_elections.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge | 
| kafka.partition.offline | kafka.replication.offline_partitions_count | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.request.time.avg{type:produce} | kafka.request.produce.time.avg | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.request.time.avg{type:fetchconsumer} | kafka.request.fetch_consumer.time.avg | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.request.time.avg{type:fetchfollower} | kafka.request.fetch_follower.time.avg |JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.message.count |kafka.messages_in.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.request.failed{type:produce} | kafka.request.produce.failed.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.request.failed{type:fetch} | kafka.request.fetch.failed.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.request.time.99p{type:produce} | kafka.request.produce.time.99percentile | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.request.time.99p{type:fetchconsumer} | kafka.request.fetch_consumer.time.99percentile | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.request.time.99p{type:fetchfollower} | kafka.request.fetch_follower.time.99percentile | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.partition.count | kafka.replication.partition_count | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.max.lag | kafka.replication.max_lag | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.controller.active.count | kafka.replication.active_controller_count | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.unclean.election.rate | kafka.replication.unclean_leader_elections.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.request.queue | kafka.request.channel.queue.size | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.logs.flush.time.count | kafka.log.flush_rate.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.consumer.bytes-consumed-rate | kafka.consumer.bytes_consumed | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-consumer} | |
| kafka.consumer.records-consumed-rate | kafka.consumer.records_consumed | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-consumer} | |
| otel.kafka.consumer.fetch-size-avg | kafka.consumer.fetch_size_avg | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-consumer} | |
| otel.kafka.producer.compression-rate | kafka.producer.compression-rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer} | |
| otel.kafka.producer.record-error-rate | kafka.producer.record_error_rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer} | |
| otel.kafka.producer.record-retry-rate | kafka.producer.record_retry_rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer} | |
| otel.kafka.producer.record-send-rate | kafka.producer.record_send_rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer} | |
| kafka.partition.current_offset | kafka.broker_offset | kafkametricsreceiver | |
| kafka.consumer_group.lag | kafka.consumer_lag | kafkametricsreceiver
| kafka.consumer_group.offset | kafka.consumer_offset | kafkametricsreceiver
| jvm.gc.collections.count{name:Copy && name:PS Scavenge && name:ParNew && name:G1 Young Generation} | jvm.gc.min&&_collection_count | JMX Receiver / JMX Metrics Gatherer {target_system:jvm} | Compute rate per second and submitted as Gauge |
| jvm.gc.maj&&_collection_count{name:MarkSweepCompact && name:PS MarkSweep &&name:ConcurrentMarkSweep &&name:G1 Mixed Generation && G1 Old Generation && Shenandoah Cycles && ZGC} | jvm.gc.maj&&_collection_count | JMX Receiver / JMX Metrics Gatherer {target_system:jvm} | Compute rate per second and submitted as Gauge |
| jvm.gc.collections.elapsed{name:Copy && name:PS Scavenge && name:ParNew && name:G1 Young Generation} | jvm.gc.min&&_collection_time | JMX Receiver / JMX Metrics Gatherer {target_system:jvm} | Compute rate per second and submitted as Gauge |
| jvm.gc.collections.elapsed{name:MarkSweepCompact && name:PS MarkSweep &&name:ConcurrentMarkSweep &&name:G1 Mixed Generation && G1 Old Generation && Shenandoah Cycles && ZGC} | jvm.gc.major_collection_time | JMX Receiver / JMX Metrics Gatherer {target_system:jvm} | Compute rate per second and submitted as Gauge

**Note:** In Datadog `-` gets translated to `_`. For the metrics prepended by `otel.`, this means that the OTel metric name and the Datadog metric name are the same (for example, `kafka.producer.request-rate` and `kafka.producer.request_rate`). In order to avoid double counting for these metrics, the OTel metric is then prepended with `otel.`.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[2]: /ja/opentelemetry/otel_collector_datadog_exporter/
[3]: /ja/universal_service_monitoring/setup/
[4]: /ja/opentelemetry/guide/semantic_mapping/
[5]: https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&groupby=availability-zone
[6]: https://app.datadoghq.com/infrastructure
[7]: /ja/opentelemetry/collector_exporter/#out-of-the-box-dashboards
[8]: /ja/tracing/trace_explorer/trace_view/?tab=hostinfo
[9]: /ja/opentelemetry/otel_collector_datadog_exporter/?tab=onahost#containers-overview-dashboard
[10]: /ja/tracing/trace_explorer/trace_view/