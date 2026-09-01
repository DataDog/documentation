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

Select your environment in the [recommended Collector setup][3] and use its complete `span_metrics` connector block, including the dimensions required for Datadog APM features.

## Data collected

See [Trace Metrics][2].

## Full example configuration

For full working example files, see the [`opentelemetry-examples` repository][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /opentelemetry/setup/collector_exporter/install/#span-metrics-connector
[2]: /tracing/metrics/metrics_namespace/
[3]: /opentelemetry/setup/collector_exporter/install/#2-create-the-collector-configuration
[4]: /opentelemetry/setup/collector_exporter/datadog_exporter/
[5]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector
