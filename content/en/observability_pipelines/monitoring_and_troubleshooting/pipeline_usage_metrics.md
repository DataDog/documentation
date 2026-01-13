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

## Pipeline metrics

Bytes in per second
: **Metrics**: `pipelines.host.network_receive_bytes_total`
: **Description:** The number of events the pipeline receives per second.

Bytes out per second
: **Metrics**: `pipelines.host.network_receive_bytes_total`
: **Description:** The number of bytes the pipeline receives per second.

## Component metrics

These metrics are available for sources, processors, and destinations.

Bytes in per second
: **Metric**: `pipelines.component_received_bytes_total`
: **Description**: The number of bytes the component receives per second.
: **Available for**: Sources, processors, and destinations.

Bytes out per second
: **Metric**: `pipelines.component_sent_events_total`
: **Description**: The number of bytes the component sends to the destinations.
: **Available for**: Sources, processors, and destinations.

Events in per second
: **Metric**: `pipelines.component_received_event_bytes_total`
: **Description**: The number of events the component receives per second.
: **Available for**: Sources, processors, and destinations.

Events out per second
: **Metric**: `pipelines.component_sent_event_bytes_total`
: **Description**: The number of events the component sends to the destinations.
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
: **Description**: The number of events that timed out.
: **Available for**: Sources, processors, and destinations.

Timed out requests
: **Metric**: `pipelines.component_timed_out_requests_total`
: **Description**: The number of requests that timed out.
: **Available for**: Sources, processors, and destinations.

Utilization
: **Metric**: `pipelines.utilization`
: **Description**: The component's activity. A value of `0` indicates an idle component that is waiting for input. A value of `1` indicates a component that is never idle, which means that the component is likely a bottleneck in the processing topology that is creating backpressure, which might cause events to be dropped.
: **Available for**: Processors and destinations.

## Buffer metrics (when buffering is enabled)

Track buffer behavior with these metrics:

{{% observability_pipelines/metrics/buffer %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/dashboards/
[2]: /notebooks/
[3]: /getting_started/monitors/
[4]: /getting_started/tagging/
[5]: https://app.datadoghq.com/metric/summary
[6]: https://docs.datadoghq.com/account_management/billing/usage_metrics/
