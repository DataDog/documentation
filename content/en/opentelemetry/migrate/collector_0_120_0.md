---
title: Migrate to OpenTelemetry Collector version 0.120.0+
aliases:
- /opentelemetry/guide/migrate/collector_0_120_0
further_reading:
- link: "/opentelemetry/guide/switch_from_processor_to_connector"
  tag: "Documentation"
  text: "Migrate to OpenTelemetry Collector version 0.95.0+"
- link: "/opentelemetry/integrations/collector_health_metrics"
  tag: "Documentation"
  text: "OpenTelemetry Collector Health Dashboard"
- link: "/tracing/troubleshooting/agent_apm_metrics"
  tag: "Documentation"
  text: "APM Datadog Trace Agent Dashboard"
- link: "https://prometheus.io/docs/prometheus/latest/migration/"
  tag: "External Site"
  text: "Prometheus 3.0 Migration Guide"
---

[OTel Collector Contrib version 0.120.0][1] introduced breaking changes to metric names as part of the upgrade to Prometheus 3.0. After upgrading to this version of the OpenTelemetry Collector, you may notice differences in metric values displayed in Datadog.

<div class="alert alert-info">These breaking changes are not introduced by or directly related to Datadog. They impact all OpenTelemetry users who use Prometheus. For a complete list of changes, see the <a href="https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/36873">update</a> to the Prometheus receiver in the Collector or the Prometheus 3.0 <a href="https://prometheus.io/docs/prometheus/latest/migration/">migration guide</a>.</div>

## Changes to Collector internal metric names

[Collector Internal Metrics][2] sent using the latest Collector version have the following changes:

- Dots (`.`) in internal collector metrics and resource attributes scraped by Prometheus are no longer replaced with underscores (`_`) by default.
- The `otelcol_` prefix is no longer added to metric names.

For example:

| Before 0.120.0                                    | After 0.120.0                             |
|---------------------------------------------------|-------------------------------------------|
| `otelcol_datadog_trace_agent_otlp_traces`         | `datadog.trace_agent.otlp.traces`         |
| `otelcol_datadog_trace_agent_otlp_spans`          | `datadog.trace_agent.otlp.spans`          |
| `otelcol_datadog_trace_agent_otlp_payload`        | `datadog.trace_agent.otlp.payload`        |
| `otelcol_datadog_trace_agent_trace_writer_events` | `datadog.trace_agent.trace_writer.events` |

As a result, Datadog has updated two out-of-the-box dashboards affected by this upgrade:

- [OpenTelemetry Collector Health Dashboard](#opentelemetry-collector-health-dashboard)
- [APM Datadog Trace Agent Dashboard](#apm-datadog-trace-agent-dashboard)

### OpenTelemetry Collector health dashboard

Queries on the [OpenTelemetry Collector health dashboard][3] were modified to be compatible with metric names sent from both older (< 0.120.0) and newer (0.120.0+) versions of the Collector.

If you are using a cloned version of this dashboard or have monitors that query metric names from older Collector versions, you may need to manually update them using the [equiv_otel() function][6].

{{< img src="/opentelemetry/guide/migration/collector_health.png" alt="OpenTelemetry Collector Health Dashboard showing compatible queries" style="width:100%;" >}}

### APM Datadog Trace Agent dashboard

Queries on the [APM Datadog Trace Agent dashboard][4] were updated with filters to exclude sources `datadogexporter` and `datadogconnector` to prevent metric collisions with OpenTelemetry sources that emit the same metric names. This dashboard is designed to show only Trace Agent data, and the update ensures that data from these sources doesn't mix with OpenTelemetry data.

Only the out-of-the-box dashboard template was updated. If you are using a cloned version of this dashboard, you may need to manually update queries on custom dashboards to exclude sources `datadogexporter` and `datadogconnector` using:

```text
source NOT IN (datadogexporter, datadogconnector)
```

## Changes to Prometheus Server reader defaults

<div class="alert alert-info">If you use default configurations for your OpenTelemetry Collector's telemetry settings, you will not be impacted by these changes.</div>

You are only impacted if you have explicitly configured the Prometheus reader with custom settings, such as:

```yaml
service:
  telemetry:
    metrics:
      level: detailed
      readers:
        - pull:
            exporter:
              prometheus:
                host: localhost
                port: 8888
```

If you are affected by these changes, you may see differences in metric names, such as suffix changes and unit additions.

To revert to the previous behavior, add these three parameters to your existing Prometheus reader configuration:

```yaml
without_scope_info: true
without_type_suffix: true
without_units: true
```

For questions or assistance, contact [Datadog support][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.120.0
[2]: https://opentelemetry.io/docs/collector/internal-telemetry/
[3]: /opentelemetry/integrations/collector_health_metrics/
[4]: /tracing/troubleshooting/agent_apm_metrics/
[5]: /help/
[6]: /opentelemetry/guide/combining_otel_and_datadog_metrics/