---
title: Trace Metrics
aliases:
- /opentelemetry/collector_exporter/trace_metrics/
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Getting Started with Collector"
- link: "/opentelemetry/guide/service_entry_spans_mapping/"
  tag: "Documentation"
  text: "Mapping OpenTelemetry Semantic Conventions to Service-entry Spans"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/trace_metrics.png" alt="APM metrics from OpenTelemetry" style="width:100%;" >}}

To send APM stats such as hits, errors, and duration, set up the [`span_metrics` connector][1]. Configure the connector to receive all traces before any sampling processors so that trace metrics represent unsampled traffic.

The Datadog Connector remains fully supported for existing configurations. To maintain a configuration that uses it, see [Configure the Datadog Exporter and Connector][4].

## Setup

Use the complete [`span_metrics` configuration][1], including the recommended dimensions for Datadog APM features.

## Data collected

See [Trace Metrics][2].

## Full example configuration

For a full working example, see the [OpenTelemetry Collector configuration][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /opentelemetry/setup/collector_exporter/install/#span-metrics-connector
[2]: /tracing/metrics/metrics_namespace/
[4]: /opentelemetry/setup/collector_exporter/datadog_exporter/
