---
title: OpenTelemetry Metrics Mapping
aliases:
  - /opentelemetry/guide/metrics_mapping/
  - /opentelemetry/schema_semantics/metrics_mapping/
further_reading:
- link: "/metrics/open_telemetry/otlp_metric_types"
  tag: "Documentation"
  text: "OTLP Metric Types"
- link: "/opentelemetry/guide/semantic_mapping"
  tag: "Documentation"
  text: "Resource attribute mapping from OpenTelemetry to Datadog"
disable_sidebar: true
---

## Overview

Datadog products and visualizations are built on metrics and tags that follow specific naming patterns. Therefore, Datadog maps incoming OpenTelemetry metrics to the appropriate Datadog metric format. This mapping process may create additional metrics, but these do not affect Datadog billing.

<div class="alert alert-info"><strong>Want to unify OpenTelemetry and Datadog metrics in your queries?</strong> Learn how to <a href="/metrics/open_telemetry/query_metrics">query across Datadog and OpenTelemetry metrics</a> from the Metrics Query Editor.</div>

## How OpenTelemetry metrics appear in Datadog

To differentiate metrics from the OpenTelemetry Collector's [hostmetrics][12] receiver and the Datadog Agent, Datadog prepends `otel.` to any received metric that starts with `system.` or `process.`. Datadog does not recommend monitoring the same infrastructure with both the Datadog Agent and the OpenTelemetry Collector

<div class="alert alert-info">Datadog is evaluating ways to improve the OTLP metric experience, including potentially deprecating this <code>otel</code> prefix.</div>

## Metrics mappings

The following table shows the metric mappings for various integrations. Use the search and filter controls to find the mappings for a specific integration.

For more information, see [OpenTelemetry integrations][11].

{{< multifilter-search resource="_data/semantic-core/unified_semantic_core.json">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[2]: /opentelemetry/otel_collector_datadog_exporter/
[3]: /universal_service_monitoring/setup/
[4]: /opentelemetry/guide/semantic_mapping/
[5]: https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&groupby=availability-zone
[6]: https://app.datadoghq.com/infrastructure
[7]: /opentelemetry/collector_exporter/#out-of-the-box-dashboards
[8]: /tracing/trace_explorer/trace_view/?tab=hostinfo
[9]: /opentelemetry/otel_collector_datadog_exporter/?tab=onahost#containers-overview-dashboard
[10]: /tracing/trace_explorer/trace_view/
[11]: /opentelemetry/integrations/
[12]: /opentelemetry/integrations/host_metrics/

