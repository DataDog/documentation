---
title: Trace Metrics
aliases:
- /opentelemetry/collector_exporter/trace_metrics/
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

[Trace Metrics][2] are generated for service entry spans and measured spans. These span conventions are unique to Datadog, so OpenTelemetry spans are identified with the following mapping:
| OpenTelemetry Convention | Datadog Convention |
| --- | --- |
| Root span | Service entry span |
| Server span (`span.kind: server`) | Service entry span |
| Consumer span (`span.kind: consumer`) | Service entry span |
| Client span (`span.kind: client`) | Measured span |
| Producer span (`span.kind: producer`) | Measured span |
| Internal span (`span.kind: internal`) | No trace metrics generated |

[`SpanKind`][3] is typically set when a span is created, but can also be updated by using the [transform processor][4] to control the mapping above. For example, if trace metrics are desired for an internal span, the following configuration transforms an internal span with `http.path: "/health"` into a server span:
```yaml
  transform:
    trace_statements:
      - context: span
        statements:
          - set(kind.string, "Server") where kind.string == "Internal" and attributes["http.path"] == "/health"
```

<div class="alert alert-info">
This service entry span logic may increase the number of spans that generate trace metrics. If needed, you can disable this change by enabling the <code>disable_otlp_compute_top_level_by_span_kind</code> APM feature, but this may result in OpenTelemetry spans being misidentified as service entry spans. <code>apm_config.compute_stats_by_span_kind</code> also needs to be disabled to turn off computing stats by `SpanKind` for OTel traces.
</div>

## Full example configuration

For a full working example configuration with the Datadog exporter, see [`trace-metrics.yaml`][5].


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[2]: /tracing/metrics/metrics_namespace/
[3]: https://opentelemetry.io/docs/specs/otel/trace/api/#spankind
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/trace-metrics.yaml