---
title: Trace Metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Getting Started with Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/trace_metrics.png" alt="APM metrics from OpenTelemetry" style="width:100%;" >}}

To send APM stats such as hits, errors, and duration, set up the [Datadog Connector][1].

For more information, see the OpenTelemetry project documentation for the [Datadog Connector][1].

## Setup

Add the following lines to your Collector configuration:

```yaml
processors:
  probabilistic_sampler:
    sampling_percentage: 20
connectors:
    # add the "datadog" connector definition and further configurations
    datadog/connector:
exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
service:
  pipelines:
   traces:
     receivers: [otlp]
     processors: [batch]
     exporters: [datadog/connector]
   traces/2:
     receivers: [datadog/connector]
     processors: [batch, probabilistic_sampler]
     exporters: [datadog]
  metrics:
    receivers: [datadog/connector]
    processors: [batch]
    exporters: [datadog]
```

## Data collected

See [Trace Metrics][2].

## Full example configuration

For a full working example configuration with the Datadog exporter, see [`trace-metrics.yaml`][3].




[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[2]: /tracing/metrics/metrics_namespace/
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/trace-metrics.yaml