---
title: Trace Metrics
aliases:
- /opentelemetry/collector_exporter/trace_metrics/
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Getting Started with Collector"
- link: "/opentelemetry/ingestion_sampling/"
  tag: "Documentation"
  text: "Ingestion Sampling with OpenTelemetry"
- link: "/opentelemetry/guide/service_entry_spans_mapping/"
  tag: "Documentation"
  text: "Mapping OpenTelemetry Semantic Conventions to Service-entry Spans"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/trace_metrics.png" alt="APM metrics from OpenTelemetry" style="width:100%;" >}}

Datadog APM uses trace metrics, which measure request rate, errors, and duration (RED), to power the Catalog, Service Page, Resource Page, and anything built on `trace.*` metrics.

This page covers setups that send OTLP data to Datadog, such as the [upstream OpenTelemetry Collector][1]. If you use the [DDOT Collector][4] or the [Datadog Exporter and Connector][6], the Datadog Connector computes trace metrics. For DDOT SDKs (Datadog SDKs in OpenTelemetry mode), see [trace metric extrapolation setup and minimum versions][3].

## Choose a source

You can compute trace metrics from three sources. Datadog recommends the `span_metrics` connector.

| Source | Sampling behavior | Billing |
|---|---|---|
| [`span_metrics` connector](#use-the-span_metrics-connector) (recommended) | Computes metrics from every span the Collector receives. Place the connector before any sampling processor. | Included in APM. |
| [HTTP metrics from the SDK](#use-http-metrics-from-the-sdk) | Not affected by span sampling, because the SDK aggregates every request before export. | The attributes used for trace metrics are included in APM. The raw HTTP metrics are billed as [custom metrics][7] unless you drop them. |
| [Spans sent to the Datadog intake](#compute-trace-metrics-in-the-datadog-intake) | Computes metrics only from the spans the intake receives. To cover all traffic, send unsampled spans. | Included in APM. |

Do not use HTTP metrics alongside the `span_metrics` connector, because Datadog then computes trace metrics from both sources.

## Use the span_metrics connector

Select your environment in the [recommended Collector setup][1] and use its complete `span_metrics` connector block. Retain all of its dimensions, which Datadog uses to derive host tags, peer services, operation names, and resource names.

Place the connector before any sampling processors so that it computes metrics from all spans the Collector receives.

In a [gateway deployment][8], give each upstream Collector its own `span_metrics` connector. A gateway that receives already-sampled spans produces undercounted metrics.

## Use HTTP metrics from the SDK

Datadog can compute trace metrics from the [HTTP metrics][9] that OpenTelemetry SDKs emit. This source has the following limits:

- Not every language SDK emits HTTP metrics.
- HTTP metrics have no equivalent for RPC, database, or messaging spans.
- Only `http.server.request.duration` and `http.client.request.duration` are stable in the OpenTelemetry specification.

To use this source, set `trace_metrics.instrumentation_metrics_calc` to `true` in the [`dd-otel-metric-config` header][10]. Set `raw_instrumentation_metrics_drop` to keep or drop the raw HTTP metrics.

The following table shows the result of each combination. Both fields default to `false`.

| `trace_metrics.instrumentation_metrics_calc` | `raw_instrumentation_metrics_drop` | Result |
|---|---|---|
| `true` | `true` | HTTP metrics power trace metrics at reduced cardinality. Datadog drops the raw HTTP metrics, so they are not billed as custom metrics. |
| `true` | `false` | HTTP metrics power trace metrics. Datadog also keeps the raw HTTP metrics at full cardinality as custom metrics, which you can use in your own dashboards and monitors. |
| `false` | `true` | No effect, because `raw_instrumentation_metrics_drop` applies only when `trace_metrics.instrumentation_metrics_calc` is `true`. Datadog keeps the raw HTTP metrics at full cardinality as custom metrics. To drop them without powering trace metrics, filter them in the Collector or turn them off in the SDK. |
| `false` | `false` | Datadog keeps the raw HTTP metrics at full cardinality as custom metrics. |

## Compute trace metrics in the Datadog intake

Datadog does not compute trace metrics for traces sent to the OTLP traces intake by default. To compute them from the spans you send, set the `compute_stats` header to `true` on the exporter that sends traces. For examples, see [Send traces to the OTLP intake][11].

## Data collected

See [Trace Metrics][2].

## Full example configuration

For full working example files, see the [`opentelemetry-examples` repository][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /opentelemetry/setup/collector_exporter/#span-metrics-connector
[2]: /tracing/metrics/metrics_namespace/
[3]: /opentelemetry/ingestion_sampling/#trace-metric-extrapolation-for-datadog-sdks
[4]: /opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/#datadog-connector
[5]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector
[6]: /opentelemetry/setup/collector_exporter/datadog_exporter/
[7]: /metrics/custom_metrics/
[8]: https://opentelemetry.io/docs/collector/deploy/gateway/
[9]: https://opentelemetry.io/docs/specs/semconv/http/http-metrics/
[10]: /opentelemetry/setup/collector_exporter/#dd-otel-metric-config-header
[11]: /opentelemetry/setup/otlp_ingest/traces/
