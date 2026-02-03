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

## Estimated usage metric

Observability Pipelines ingested bytes
: **Metric**: `datadog.estimated_usage.observability_pipelines.ingested_bytes`
: **Description**: The volume of data ingested by Observability Pipelines. See [Estimated Usage Metrics][6] for more information.

## Host metrics

Uptime
: **Metrics**: `pipelines.host.uptime`
: **Description:** The host uptime in seconds.

Bytes in
: **Metrics**: `pipelines.host.network_receive_bytes_total`
: **Description:** The number of bytes received by the host on all interfaces. Use the tag `device` to filter per interface.

Bytes out
: **Metrics**: `pipelines.host.network_transmit_bytes_total`
: **Description:** The number of bytes sent by the host on all interfaces. Use the `device` tag to filter per interface.

## Process metrics

Uptime
: **Metrics**: `pipelines.uptime_seconds`
: **Description:** The worker uptime in seconds.

CPU usage
: **Metrics**: `pipelines.cpu_usage_seconds_total`
: **Description:** The amount of CPU time consumed by the worker process in seconds (in the user and system space). Turning this into a rate per second returns the proportion of a CPU used by the worker.

Memory usage
: **Metrics**: `pipelines.resident_memory_used_bytes`
: **Description:** The amount of RSS memory used by the worker process in bytes.

## Component metrics

These metrics are available for sources, processors, and destinations.

Events in
: **Metric**: `pipelines.component_received_events_total`
: **Description**: The number of events received by the component.
: **Available for**: Sources, processors, and destinations.

Events out
: **Metric**: `pipelines.component_sent_events_total`
: **Description**: The number of events the component sends downstream.
: **Available for**: Sources, processors, and destinations.

Even bytes in
: **Metric**: `pipelines.component_received_event_bytes_total`
: **Description**: The byte size of events received by the component.
: **Available for**: Sources, processors, and destinations.

Even bytes out
: **Metric**: `pipelines.component_sent_event_bytes_total`
: **Description**: The byte size of events the component sends downstream.
: **Available for**: Sources, processors, and destinations.

Errors
: **Metric**: `pipelines.component_errors_total`
: **Description**: The number of errors encountered by the component.
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

## Buffer metrics (when buffering is enabled)


{{% observability_pipelines/metrics/buffer %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/dashboards/
[2]: /notebooks/
[3]: /getting_started/monitors/
[4]: /getting_started/tagging/
[5]: https://app.datadoghq.com/metric/summary
[6]: https://docs.datadoghq.com/account_management/billing/usage_metrics/
