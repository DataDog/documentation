---
title: Pipelines Usage Metrics
disable_toc: false
aliases:
  - /observability_pipelines/monitoring/metrics/
further_reading:
- link: "/metrics/summary/"
  tag: "Documentation"
  text: "Learn more about the Metrics Summary"
- link: "/metrics/explorer/"
  tag: "Documentation"
  text: "Using the Metrics Explorer to explore and analyze your metrics"
- link: "/getting_started/dashboards/"
  tag: "Documentation"
  text: "Getting started with dashboards"
- link: "/getting_started/monitors/"
  tag: "Documentation"
  text: "Getting started with monitors"
---

## Overview

This document lists some of the metrics available from Observability Pipelines. You can:

- Create your own [dashboards][1], [notebooks][2], and [monitors][3] with these metrics.
- Use [Metrics Summary][5] to see metadata and tags available for the metrics. You can also see which dashboards, notebooks, monitors, and SLOs are using those metrics.

See [Getting Started with Tags][4] for more information on how to use tags to group metrics by specific pipelines, Workers, and components.

All metrics are tagged with the following:

`pipeline_id`
: The UUID of the pipeline.

`worker_uuid`
: The UUID of the Worker emitting the metric.

`op_worker_version`
: The version of the Worker emitting the metric.

`rc_version`
: The configuration version number, incremented each time the pipeline is updated.

`pipeline_name`
: The name of the pipeline when it was last deployed or updated. Available in Worker version 2.18 and later.

**Note**: Every Worker also runs an internal pipeline that collects the Worker's own telemetry (metrics and logs) and sends it to Datadog. The components in this internal pipeline have a `component_id` that starts with an underscore. To exclude them from your queries, filter with `!component_id:_*`.

**Note**: Metrics ending in `_total` report a count for each time interval, so their raw value does not increase monotonically.

## Estimated usage metric

Observability Pipelines ingested bytes
: **Metric**: `datadog.estimated_usage.observability_pipelines.ingested_bytes`
: **Description**: The volume of data ingested by Observability Pipelines. See [Estimated Usage Metrics][6] for more information.

## Host metrics

These metrics describe the host running the Observability Pipelines Worker.

Uptime
: **Metric**: `pipelines.host.uptime`
: **Description:** The amount of time since the host was started, in seconds.

CPU time
: **Metric**: `pipelines.host.cpu_seconds_total`
: **Description:** The total CPU time consumed by the host, broken down by mode (user, system, idle, and so on) and CPU core.

Logical CPUs
: **Metric**: `pipelines.host.logical_cpus`
: **Description:** The number of logical CPU threads (hardware threads) available on the host.

Load average
: **Metric**: `pipelines.host.load1`, `pipelines.host.load5`, `pipelines.host.load15`
: **Description:** The host's system load average over the last 1, 5, and 15 minutes. Load average is the number of processes that are running or waiting to run, and on Linux also includes processes blocked on uninterruptible I/O. Compare it against `pipelines.host.logical_cpus`: a value near the CPU count indicates full utilization, and a value above it indicates the host is oversubscribed. Not emitted on Windows.

Total memory
: **Metric**: `pipelines.host.memory_total_bytes`
: **Description:** The total physical memory (RAM) installed on the host.

Available memory
: **Metric**: `pipelines.host.memory_available_bytes`
: **Description:** The number of bytes of memory available for new allocations on the host.

Disk read/write bytes
: **Metric**: `pipelines.host.disk_read_bytes_total`, `pipelines.host.disk_written_bytes_total`
: **Description:** The number of bytes read from and written to all disks on the host.

Bytes in
: **Metric**: `pipelines.host.network_receive_bytes_total`
: **Description:** The number of bytes received by the host on all interfaces. Use the `device` tag to filter per interface, for example `device:eth0`.

Bytes out
: **Metric**: `pipelines.host.network_transmit_bytes_total`
: **Description:** The number of bytes sent by the host on all interfaces. Use the `device` tag to filter per interface.

## Process metrics

These metrics describe the Observability Pipelines Worker process.

Uptime
: **Metric**: `pipelines.uptime_seconds`
: **Description:** The amount of time since the Worker process was started, in seconds.

CPU usage
: **Metric**: `pipelines.cpu_usage_seconds_total`
: **Description:** The amount of CPU time consumed by the Worker process in seconds (in the user and system space). The rate per second of that metric shows the proportion of the CPU used by the Worker.

CPU cores allocated
: **Metric**: `pipelines.cpu_max_cores`
: **Description:** The number of CPU cores allocated to the Worker, as reported by container or cgroup limits.

Memory usage
: **Metric**: `pipelines.resident_memory_used_bytes`
: **Description:** The amount of RSS memory used by the Worker process in bytes.

Memory limit
: **Metric**: `pipelines.memory_max_bytes`
: **Description:** The maximum memory the Worker is allowed to use, as set by container or cgroup limits.

Data directory available bytes
: **Metric**: `pipelines.data_dir_available_bytes`
: **Description:** The free storage space remaining on the filesystem where the Worker stores its buffer and state data. Useful for monitoring disk buffers.

Data directory capacity bytes
: **Metric**: `pipelines.data_dir_capacity_bytes`
: **Description:** The total storage capacity of the filesystem where the Worker stores its buffer and state data.

## Worker lifecycle metrics

These metrics track Observability Pipelines Worker lifecycle events.

Started
: **Metric**: `pipelines.started_total`
: **Description:** The number of times the Worker instance has been started.

Stopped
: **Metric**: `pipelines.stopped_total`
: **Description:** The number of times the Worker instance has been stopped.

Reloaded
: **Metric**: `pipelines.reloaded_total`
: **Description:** The number of times the Worker instance has been reloaded, such as after a configuration change.

## Component metrics

These metrics are available for sources, processors, and destinations.

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the type of source, processor, or destination, such as `quota` for the Quota processor.
- Use the `component_kind` tag to filter or group by `source`, `transform` (processor) or `sink` (destination).

Events in
: **Metric**: `pipelines.component_received_events_total`
: **Description**: The number of events received by the component.
: **Available for**: Sources, processors, and destinations.

Events out
: **Metric**: `pipelines.component_sent_events_total`
: **Description**: The number of events the component sends downstream.
: **Available for**: Sources, processors, and destinations.

Event bytes in
: **Metric**: `pipelines.component_received_event_bytes_total`
: **Description**: The byte size of events received by the component.
: **Available for**: Sources, processors, and destinations.

Event bytes out
: **Metric**: `pipelines.component_sent_event_bytes_total`
: **Description**: The byte size of events the component sends downstream.
: **Available for**: Sources, processors, and destinations.

Events included
: **Metric**: `pipelines.included_events_total`
: **Description**: The number of events that matched the processor's include clause and were processed. Events that do not match the filter clause skip the processor and continue to the next component.
: **Available for**: Processors.

Event bytes included
: **Metric**: `pipelines.included_event_bytes_total`
: **Description**: The byte size of events that matched the processor's include clause and were processed.
: **Available for**: Processors.

Errors
: **Metric**: `pipelines.component_errors_total`
: **Description**: The number of errors encountered by the component. Depending on the component, this metric can carry an `error_code`, `error_type`, or `reason` tag that describes the error.
: **Available for**: Sources, processors, and destinations.

Data dropped intentionally or unintentionally
: **Metric**: `pipelines.component_discarded_events_total`
: **Description**: The number of events dropped. **Note**: To break down this metric, use the `intentional:true` tag to filter for events that are intentionally dropped or the `intentional:false` tag for events that are not intentionally dropped.
: **Available for**: Sources, processors, and destinations.

Timed out events
: **Metric**: `pipelines.component_timed_out_events_total`
: **Description**: The number of events that waited more than 5 seconds to be sent to the first processor and resulted in a HTTP 503 error. This could happen when delivery of events are blocked.
: **Available for**: HTTP-based sources that have a configured timeout, such as the Datadog Agent.

Timed out requests
: **Metric**: `pipelines.component_timed_out_requests_total`
: **Description**: The number of requests that timed out for sources that send events to the Worker in batches using HTTP requests.
: **Available for**: HTTP-based sources that have a configured timeout, such as the Datadog Agent.

Utilization
: **Metric**: `pipelines.utilization`
: **Description**: The component's activity. A value of `0` indicates an idle component that is waiting for input. A value of `1` indicates a component that is never idle, which means that the component is likely a bottleneck in the processing topology that is creating backpressure, which might cause events to be dropped.
: **Available for**: Processors and destinations.

CPU usage
: **Metric**: `pipelines.component_cpu_usage_ns_total`
: **Description**: The CPU time consumed by a component, in nanoseconds. Use this metric to attribute CPU cost to individual processors. Available in Worker version 2.18 and later.
: **Available for**: The Remap (VRL), Sensitive Data Scanner, Grok Parser, Parse JSON, Parse XML, OCSF Mapper, Enrichment Table, Reduce, Dedupe, Split Array, and Throttle log processors, and the Aggregate and Tag Cardinality Limit metrics processors.

Send latency
: **Metric**: `pipelines.source_send_latency_seconds`
: **Description**: The time it takes for the source to send a chunk of events to the next component. Available in Worker version 2.16 and later.
: **Available for**: Sources.

Send batch latency
: **Metric**: `pipelines.source_send_batch_latency_seconds`
: **Description**: The time it takes for the source to send a batch, which can contain multiple event chunks, to the next component. Available in Worker version 2.16 and later.
: **Available for**: Sources.

## HTTP client metrics

{{% observability_pipelines/metrics/http_client %}}

## Adaptive concurrency metrics

{{% observability_pipelines/metrics/adaptive_concurrency %}}

## Buffer metrics (when enabled)

Use these metrics to analyze buffer performance. All metrics are emitted on a one-second interval, unless otherwise stated.

### Source buffer metrics

{{% observability_pipelines/metrics/buffer/sources %}}

### Processor buffer metrics

{{% observability_pipelines/metrics/buffer/processors %}}

### Destination buffer metrics

{{% observability_pipelines/metrics/buffer/destinations %}}

### Deprecated buffer metrics

{{% observability_pipelines/metrics/buffer/deprecated_destination_metrics %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/dashboards/
[2]: /notebooks/
[3]: /getting_started/monitors/
[4]: /getting_started/tagging/
[5]: https://app.datadoghq.com/metric/summary
[6]: https://docs.datadoghq.com/account_management/billing/usage_metrics/
