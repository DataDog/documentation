---
title: Mapping OpenTelemetry Semantic Conventions to Service-entry Spans
aliases:
- /opentelemetry/guide/service_entry_spans_mapping/
further_reading:
- link: /opentelemetry/integrations/trace_metrics
  tag: Documentation
  text: OpenTelemetry Trace Metrics
---

&lt;div class="alert alert-info"&gt; この機能はベータ版です。フィードバックがあれば、&lt;a href="/help/"&gt;Datadog サポート&lt;/a&gt;までご連絡ください。 &lt;/div&gt;

## 概要
Datadog uses [service-entry spans][1] throughout the platform for features such as [Trace Metrics][2] and the [APM Trace Explorer][3]. This convention is unique to Datadog, but can be mapped from the [`SpanKind`][4] attribute in OpenTelemetry by following the opt-in guide below.

## 機能へのオプトイン
This feature requires OTel Collector Contrib v0.100.0 or greater and Datadog Agent v7.53.0 or greater. To opt into the **public beta**, enable the config option depending on the ingestion path.

{{< tabs >}}
{{% tab "OTel Collector and Datadog Exporter" %}}

The new service-entry span identification logic can be enabled by setting the `traces::compute_top_level_by_span_kind` config option to true in the [Datadog exporter][2] and [Datadog connector][1]. This config option needs to be enabled in both the exporter and connector if both components are being used.

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/connector/datadogconnector/examples/config.yaml#L48-L53
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/exporter/datadogexporter/examples/collector.yaml#L365-L370
{{% /tab %}}
{{% tab "OTLP ingest pipeline in the Datadog Agent" %}}

The new service-entry span identification logic can be enabled by adding `"enable_otlp_compute_top_level_by_span_kind"` to [apm_config.features][1] in the Datadog Agent config.

[1]: https://github.com/DataDog/datadog-agent/blob/7.53.0/pkg/config/config_template.yaml#L1585-L1591
{{% /tab %}}
{{< /tabs >}}

## サポートされる規約

[Trace Metrics][2] are generated for service entry spans and measured spans. These span conventions are unique to Datadog, so OpenTelemetry spans are identified with the following mapping:
| OpenTelemetry Convention | Datadog Convention |
| --- | --- |
| Root span | Service entry span |
| Server span (`span.kind: server`) | Service entry span |
| Consumer span (`span.kind: consumer`) | Service entry span |
| Client span (`span.kind: client`) | Measured span |
| Producer span (`span.kind: producer`) | Measured span |
| Internal span (`span.kind: internal`) | No trace metrics generated |

## 移行

This new service-entry span identification logic may increase the number of spans that generate trace metrics, which may affect existing monitors that are based on trace metrics. Users who only have internal spans will see a decrease in trace metrics.

If you have existing monitors based on trace metrics, you can update them after upgrading since this change introduces more consistency in trace metrics. If you only have internal spans, update your instrumentation according to the above table to receive trace metrics and service-entry spans.

[`SpanKind`][4] is typically set when a span is created, but can also be updated by using the [transform processor][5] in the OpenTelemetry Collector to control the mapping above. For example, if trace metrics are desired for an internal span, the following configuration transforms an internal span with `http.path: "/health"` into a client span:
```yaml
  transform:
    trace_statements:
      - context: span
        statements:
          - set(kind.string, "Client") where kind.string == "Internal" and attributes["http.path"] == "/health"
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/glossary/#service-entry-span
[2]: https://docs.datadoghq.com/opentelemetry/integrations/trace_metrics/
[3]: https://docs.datadoghq.com/tracing/trace_explorer
[4]: https://opentelemetry.io/docs/specs/otel/trace/api/#spankind
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md