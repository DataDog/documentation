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

**Notes**:
- Every Worker also runs an internal pipeline that collects the Worker's own telemetry (metrics and logs) and sends it to Datadog. The components in this internal pipeline have a `component_id` tag whose value starts with an underscore (`_`). To exclude these metrics from your queries, use `!component_id:_*`.
- Metrics ending in `_total` report a count for each time interval, so their raw value does not increase monotonically.

## Estimated usage metric

Observability Pipelines ingested bytes
: **Metric**: `datadog.estimated_usage.observability_pipelines.ingested_bytes`
: **Description**: The volume of data ingested by Observability Pipelines. See [Estimated Usage Metrics][6] for more information.

## Host metrics

These metrics provide information about the host running the Observability Pipelines Worker.

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
: **Description:** The host's system load average over the last 1, 5, and 15 minutes. Load average is the number of processes that are running or waiting to run, and on Linux also includes processes blocked on uninterruptible I/O. Compare the load average value against the `pipelines.host.logical_cpus` value: a load average value near the CPU count indicates full utilization, and a value above it indicates the host is oversubscribed. Not emitted on Workers running in Windows.

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

These metrics provide information about the Observability Pipelines Worker process.

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

Worker starts
: **Metric**: `pipelines.started_total`
: **Description:** The number of times the Worker instance has been started.

Worker stops
: **Metric**: `pipelines.stopped_total`
: **Description:** The number of times the Worker instance has been stopped.

Worker reloads
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

Bytes in
: **Metric**: `pipelines.component_received_bytes_total`
: **Description**: The number of raw bytes read from the source's input, before any decoding or transformation.
: **Available for**: Sources.

Bytes out
: **Metric**: `pipelines.component_sent_bytes_total`
: **Description**: The number of raw bytes written to the destination's output, after encoding and transformations.
: **Available for**: Destinations.

Events included
: **Metric**: `pipelines.included_events_total`
: **Description**: The number of events that matched the processor's filter query and were processed. Events that do not match the filter query skip the processor and continue to the next component.
: **Available for**: Processors.

Event bytes included
: **Metric**: `pipelines.included_event_bytes_total`
: **Description**: The byte size of events that matched the processor's filter query and were processed.
: **Available for**: Processors.

Errors
: **Metric**: `pipelines.component_errors_total`
: **Description**: The number of errors encountered by the component. Depending on the component, this metric can include an `error_code`, `error_type`, or `reason` tag that describes the error.
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

Source lag time
: **Metric**: `pipelines.source_lag_time_seconds`
: **Description**: The difference, in seconds, between an event's own timestamp and when the Worker received it. High values indicate stale or delayed data arriving at the pipeline.
: **Available for**: Sources.

Utilization
: **Metric**: `pipelines.utilization`
: **Description**: The component's activity. A value of `0` indicates an idle component that is waiting for input. A value close to `1` indicates a component that is never idle, meaning that the component is likely a bottleneck in the processing topology that is creating backpressure. This might cause events to be dropped.
: **Available for**: Processors and destinations.

CPU usage
: **Metric**: `pipelines.component_cpu_usage_ns_total`
: **Description**: The CPU time consumed by a component, in nanoseconds. Use this metric to attribute CPU cost to individual processors. Available in Worker version 2.18 and later for Linux and MacOS.
: **Available for these log processors**:<br>- Custom Processor<br>- Dedupe<br>- Enrichment Table<br>- Grok Parser<br>- Parse JSON<br>- Parse XML<br>- Reduce<br>- Remap to OCSF<br>- Sensitive Data Scanner<br>- Split Array<br>- Throttle log processors
: **Available for these metrics processors**:<br>- Aggregate <br>- Tag Cardinality Limit metrics

Send latency
: **Metric**: `pipelines.source_send_latency_seconds`
: **Description**: The time it takes for the source to send a chunk of events to the next component. Available in Worker version 2.16 and later.
: **Available for**: Sources.

Send batch latency
: **Metric**: `pipelines.source_send_batch_latency_seconds`
: **Description**: The time it takes for the source to send a batch, which can contain multiple event chunks, to the next component. Available in Worker version 2.16 and later.
: **Available for**: Sources.

## HTTP server metrics

These metrics are emitted by sources that receive data over HTTP, such as the Datadog Agent, HTTP/S Server, OpenTelemetry, and Splunk HEC sources.

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the source type.

`pipelines.http_server_requests_received_total`
: **Description**: The number of HTTP requests received.
: **Metric type**: count

`pipelines.http_server_responses_sent_total`
: **Description**: The number of HTTP responses sent.
: **Metric type**: count

`pipelines.http_server_handler_duration_seconds`
: **Description**: The time spent handling an HTTP request.
: **Metric type**: distribution

## HTTP client metrics

These metrics are emitted by destinations that send data over HTTP, including:

- CrowdStrike NG-SIEM
- Datadog Logs
- Datadog Metrics
- Elasticsearch
- Google SecOps
- HTTP Client destination
- Microsoft Sentinel
- New Relic
- OpenSearch
- SentinelOne
- Splunk HEC

**Note**: AWS-based destinations (such as Amazon S3, Amazon OpenSearch, and Amazon Security Lake) do not emit these metrics.

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the destination type.

`pipelines.http_client_requests_sent_total`
: **Description**: The number of HTTP requests sent, tagged by request method.
: **Metric type**: count

`pipelines.http_client_responses_total`
: **Description**: The number of HTTP responses received, tagged by response status.
: **Metric type**: count

`pipelines.http_client_errors_total`
: **Description**: The number of HTTP client errors, tagged by error kind.
: **Metric type**: count

`pipelines.http_client_rtt_seconds`
: **Description**: The round-trip time, in seconds, for HTTP requests, from when the request is sent to when the final response or error is received.
: **Metric type**: distribution

`pipelines.http_client_response_rtt_seconds`
: **Description**: The round-trip time, in seconds, of HTTP requests, tagged by response status.
: **Metric type**: distribution

`pipelines.http_client_error_rtt_seconds`
: **Description**: The round-trip time, in seconds, of HTTP requests that resulted in an error, tagged by error kind.
: **Metric type**: distribution

## Adaptive concurrency metrics

These metrics provide information about the adaptive concurrency controller, which automatically tunes how many in-flight HTTP requests a destination allows based on observed response times. They are emitted by destinations that send data over HTTP, including AWS-based destinations.

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the destination type.

`pipelines.active_endpoints`
: **Description**: The number of destination endpoints that are marked healthy.
: **Metric type**: gauge

`pipelines.adaptive_concurrency_limit`
: **Description**: The concurrency limit for HTTP requests to this destination, automatically adjusted by the adaptive concurrency controller based on response times.
: **Metric type**: distribution

`pipelines.adaptive_concurrency_in_flight`
: **Description**: The number of HTTP requests in flight to a destination, compared against the adaptive concurrency limit to determine when to throttle.
: **Metric type**: distribution

`pipelines.adaptive_concurrency_reached_limit`
: **Description**: Whether the adaptive concurrency controller reached its computed limit (`1`) or not (`0`) during the last measurement interval.
: **Metric type**: distribution

`pipelines.adaptive_concurrency_back_pressure`
: **Description**: Whether the adaptive concurrency controller detected back pressure (`1`) or not (`0`) during the last measurement interval.
: **Metric type**: distribution

`pipelines.adaptive_concurrency_averaged_rtt`
: **Description**: The smoothed average round-trip time (RTT), in seconds, for HTTP requests to this destination, used as the baseline for adaptive concurrency calculations.
: **Metric type**: distribution

`pipelines.adaptive_concurrency_observed_rtt`
: **Description**: The round-trip time (RTT), in seconds, observed for the most recent HTTP request to this destination.
: **Metric type**: distribution

`pipelines.adaptive_concurrency_past_rtt_mean`
: **Description**: The historical mean RTT, in seconds, for HTTP requests to this destination, used as the long-term baseline for adaptive concurrency adjustments.
: **Metric type**: distribution

## Buffer metrics

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
