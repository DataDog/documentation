---
title: Trace Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > Trace Metrics
---

# Trace Metrics

## Overview{% #overview %}

{% image
   source="http://localhost:1313/images/opentelemetry/collector_exporter/trace_metrics.50651fc46c1bdd28ef8786711c1cc577.png?auto=format"
   alt="APM metrics from OpenTelemetry" /%}

To send APM stats such as hits, errors, and duration, set up the [Datadog Connector](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector).

For more information, see the OpenTelemetry project documentation for the [Datadog Connector](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector).

## Setup{% #setup %}

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

## Data collected{% #data-collected %}

See [Trace Metrics](http://localhost:1313/tracing/metrics/metrics_namespace/).

## Full example configuration{% #full-example-configuration %}

For a full working example configuration with the Datadog exporter, see [`trace-metrics.yaml`](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/trace-metrics.yaml).

## Further reading{% #further-reading %}

- [Getting Started with Collector](http://localhost:1313/opentelemetry/collector_exporter/)
- [Mapping OpenTelemetry Semantic Conventions to Service-entry Spans](http://localhost:1313/opentelemetry/guide/service_entry_spans_mapping/)
