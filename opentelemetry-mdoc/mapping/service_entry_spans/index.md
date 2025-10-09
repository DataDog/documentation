---
title: Mapping OpenTelemetry Semantic Conventions to Service-entry Spans
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Semantic Mapping > Mapping OpenTelemetry
  Semantic Conventions to Service-entry Spans
---

# Mapping OpenTelemetry Semantic Conventions to Service-entry Spans

## Overview{% #overview %}

Datadog uses [service-entry spans](https://docs.datadoghq.com/glossary/#service-entry-span) throughout the platform for features such as [Trace Metrics](https://docs.datadoghq.com/opentelemetry/integrations/trace_metrics/) and the [APM Trace Explorer](https://docs.datadoghq.com/tracing/trace_explorer). This convention is unique to Datadog, but can be mapped from the [`SpanKind`](https://opentelemetry.io/docs/specs/otel/trace/api/#spankind) attribute in OpenTelemetry by following the opt-in guide below.

## Requirements{% #requirements %}

- OTel Collector Contrib v0.100.0 or greater
- Datadog Agent v7.53.0 or greater

## Setup{% #setup %}

Enable the config option based on your ingestion path:

{% tab title="OTel Collector and Datadog Exporter" %}
The new service-entry span identification logic can be enabled by setting the `traces::compute_top_level_by_span_kind` config option to true in the [Datadog exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/exporter/datadogexporter/examples/collector.yaml#L365-L370) and [Datadog connector](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/connector/datadogconnector/examples/config.yaml#L48-L53). This config option needs to be enabled in both the exporter and connector if both components are being used.
{% /tab %}

{% tab title="OTLP ingest pipeline in the Datadog Agent" %}
The new service-entry span identification logic can be enabled by adding `"enable_otlp_compute_top_level_by_span_kind"` to [apm_config.features](https://github.com/DataDog/datadog-agent/blob/7.53.0/pkg/config/config_template.yaml#L1585-L1591) in the Datadog Agent config.
{% /tab %}

## Supported conventions{% #supported-conventions %}

[Trace Metrics](https://docs.datadoghq.com/opentelemetry/integrations/trace_metrics/) are generated for service entry spans and measured spans. These span conventions are unique to Datadog, so OpenTelemetry spans are identified with the following mapping:

| OpenTelemetry Convention              | Datadog Convention         |
| ------------------------------------- | -------------------------- |
| Root span                             | Service entry span         |
| Server span (`span.kind: server`)     | Service entry span         |
| Consumer span (`span.kind: consumer`) | Service entry span         |
| Client span (`span.kind: client`)     | Measured span              |
| Producer span (`span.kind: producer`) | Measured span              |
| Internal span (`span.kind: internal`) | No trace metrics generated |

## Migration{% #migration %}

This new service-entry span identification logic may increase the number of spans that generate trace metrics, which may affect existing monitors that are based on trace metrics. Users who only have internal spans will see a decrease in trace metrics.

If you have existing monitors based on trace metrics, you can update them after upgrading since this change introduces more consistency in trace metrics. If you only have internal spans, update your instrumentation according to the above table to receive trace metrics and service-entry spans.

[`SpanKind`](https://opentelemetry.io/docs/specs/otel/trace/api/#spankind) is typically set when a span is created, but can also be updated by using the [transform processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md) in the OpenTelemetry Collector to control the mapping above. For example, if trace metrics are desired for an internal span, the following configuration transforms an internal span with `http.path: "/health"` into a client span:

```yaml
  transform:
    trace_statements:
      - context: span
        statements:
          - set(kind.string, "Client") where kind.string == "Internal" and attributes["http.path"] == "/health"
```

## Further reading{% #further-reading %}

- [OpenTelemetry Trace Metrics](http://localhost:1313/opentelemetry/integrations/trace_metrics)
