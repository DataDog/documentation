---
title: Migrate to OpenTelemetry Collector version 0.120.0+
---

[OTel Collector Contrib version 0.120.0][1] introduced breaking changes to metric names as part of the upgrade to Prometheus 3.0. After upgrading to this version of the OpenTelemetry Collector, you may notice differences in metric values displayed on the Datadog platform.

<div class="alert alert-info">These breaking changes are not introduced by or directly related to Datadog. They impact all OpenTelemetry users who use Prometheus. For a complete list of changes, see the <a href="https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/36873">update</a> to the prometheus receiver in the Collector or the Prometheus 3.0 <a href="https://prometheus.io/docs/prometheus/latest/migration/">migration guide</a>.</div>

## Collector internal metric names have changed

[Collector Internal Metrics][2] sent using the latest Collector version have the following changes:

- Dots (.) in internal collector metrics and resource attributes scraped by Prometheus are no longer replaced with underscores (_) by default.
- The `otelcol_` prefix is no longer added to metric names.

Examples of metric renaming (version < 0.120.0 → v0.120.0+):

- `otelcol_datadog_trace_agent_otlp_traces` → `datadog.trace_agent.otlp.traces`
- `otelcol_datadog_trace_agent_otlp_spans` → `datadog.trace_agent.otlp.spans`
- `otelcol_datadog_trace_agent_otlp_payload` → `datadog.trace_agent.otlp.payload`
- `otelcol_datadog_trace_agent_trace_writer_events` → `datadog.trace_agent.trace_writer.events`

As a result, Datadog has updated two out-of-the-box dashboards affected by this upgrade:

1. [OpenTelemetry Collector Health][3]
2. [APM Datadog Trace Agent][4]

### OpenTelemetry Collector Health Dashboard

Queries on this dashboard were modified to be compatible with metric names sent from both older (< 0.120.0) and newer (v0.120.0+) versions of the Collector.

<div class="alert alert-warning">If you are using a cloned version of this dashboard or have monitors that query metric names from older Collector versions, you may need to manually update them using the <a href="https://docs.datadoghq.com/opentelemetry/guide/combining_otel_and_datadog_metrics/">equiv_otel() function</a>.</div>

![OpenTelemetry Collector Health Dashboard Example][image1]

### APM Datadog Trace Agent Dashboard

Queries on this dashboard were updated with filters to exclude sources 'datadogexporter' and 'datadogconnector' to prevent metric collisions with OTel sources that emit the same metric names. This dashboard is designed to show only trace agent data, and the update ensures that data from these sources doesn't mix with OTel data.

<div class="alert alert-warning">Only the out-of-the-box dashboard template was updated. If you are using a cloned version of this dashboard, you may need to manually update queries on custom dashboards to exclude sources 'datadogexporter' and 'datadogconnector' using: <code>source NOT IN (datadogexporter, datadogconnector)</code></div>

## Prometheus Server reader defaults have changed

On the Prometheus server side, customers who have customized the Prometheus reader in their service telemetry configuration to be different than the default may experience changes in metric names, units, and metadata.

<div class="alert alert-info">Users who do not customize the Prometheus reader and use the default configuration should not be impacted.</div>

For questions or assistance, contact [Datadog support][5].

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.120.0
[2]: https://opentelemetry.io/docs/collector/internal-telemetry/
[3]: https://docs.datadoghq.com/opentelemetry/integrations/collector_health_metrics/
[4]: https://docs.datadoghq.com/tracing/troubleshooting/agent_apm_metrics/
[5]: https://docs.datadoghq.com/help/
[image1]: /path/to/your/dashboard/image.png