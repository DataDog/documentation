---
title: OpenTelemetry Metrics Mapping
aliases:
- /opentelemetry/guide/metrics_mapping/
further_reading:
- link: "/metrics/open_telemetry/otlp_metric_types"
  tag: "Documentation"
  text: "OTLP Metric Types"
- link: "/opentelemetry/guide/semantic_mapping"
  tag: "Documentation"
  text: "Resource attribute mapping from OpenTelemetry to Datadog"
---

## Overview

Datadog products and visualizations are built on metrics and tags that adhere to specific naming patterns. Metrics from OpenTelemetry components that are sent to Datadog are mapped to corresponding Datadog metrics, as applicable. The creation of these additional metrics does not affect Datadog billing.

The following diagram shows the process of mapping the metrics from OpenTelemetry into metrics that Datadog uses:

{{< img src="opentelemetry/guide/metrics_mapping/otel-mapping-metrics.png" alt="The decision process for mapping OpenTelemetry metric names to Datadog metric names. If an OTel metric is not used by any Datadog product, or if its semantics are the same as Datadog's, it is sent as-is to Datadog. Otherwise, a Datadog-style metric is created from the OTel metric and sent to Datadog." style="width:100%;" >}}

## Use of the `otel` prefix

To differentiate the metrics captured by the `hostmetrics` receiver from Datadog Agent, we add a prefix, `otel`, for metrics collected by the collector. If a metric name starts with `system.` or `process.`, `otel.` is prepended to the metric name. Monitoring the same infrastructure artifact using both Agent and Collector is not recommended. 

<div class="alert alert-info">Datadog is evaluating ways to improve the OTLP metric experience, including potentially deprecating this <code>otel</code> prefix. If you have feedback related to this, reach out your account team to provide your input.</div>

## Metrics mappings

Metrics mappings between Datadog and OpenTelemetry are defined on [OTel integration][11] pages. Select the integration you are using for more information.

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

