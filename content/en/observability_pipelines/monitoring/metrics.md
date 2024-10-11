---
title: Metrics
disable_toc: false
aliases:
- /path-to-old-doc/
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
- link: "/getting_started/dashboards/"
  tag: "Documentation"
  text: "Getting started with dashboards"
- link: "/getting_started/monitors/"
  tag: "Documentation"
  text: "Getting started with monitors"
---

## Overview

Use Observability Pipelines' metrics to create [dashboards][1], [notebooks][2], and [monitors][3] for you specific use case. Use [Metrics Summary][5] to see metadata and tags available for the metrics. You can also see which dashboards, notebooks, monitors, and SLOs are using those metrics. See [Getting Started with Tags][4] for more information on how to use tags to group metrics by specific pipelines, Workers, and components.

## Pipeline metrics

Bytes in per second
: **Metrics**: `pipelines.host.network_receive_bytes_total`
: **Description:** The number of events the pipeline receives per second.

Bytes out per second
: **Metrics**: `pipelines.host.network_receive_bytes_total`
: **Description:** The number of bytes the pipeline receives per second.

## Component metrics

These metrics are available for sources, processors, and destinations.

**Note**: `pipelines.utilization` is only available for processors and destinations.

Bytes in per second
: **Metric**: `pipelines.component_received_bytes_total`
: **Description**: The number of bytes the component receives per second.
: **Available for**: Sources, processors, and destinations.

Bytes out per second
: **Metric**: `pipelines.component_sent_event_bytes_total`
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
: **Description**: The number of events dropped. Break down the metric by using the `intentional:true` tag to filter for events that are intentionally dropped or the `intentional:false` tag for events that are not intentionally dropped.
: **Available for**: Sources, processors, and destinations.

Utilization
: **Metric**: `pipelines.utilization`
: **Description**: The component's activity. A value of `0` indicates an idle component that is waiting for input. A value of `1` indicates a component that is never idle. A value of `1` indicates that the component is busy and likely a bottleneck in the processing topology and creating backpressure, which could cause events to be dropped.
: **Available for**: Processors and destinations.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/dashboards/
[2]: /notebooks/
[3]: /getting_started/monitors/
[4]: /getting_started/tagging/
[5]: https://app.datadoghq.com/metric/summary