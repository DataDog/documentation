---
title: OpenTelemetry Metrics Mapping
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Semantic Mapping > OpenTelemetry Metrics
  Mapping
---

# OpenTelemetry Metrics Mapping

## Overview{% #overview %}

Datadog products and visualizations are built on metrics and tags that follow specific naming patterns. Therefore, Datadog maps incoming OpenTelemetry metrics to the appropriate Datadog metric format. This mapping process may create additional metrics, but these do not affect Datadog billing.

{% alert level="info" %}
**Want to unify OpenTelemetry and Datadog metrics in your queries?** Learn how to [query across Datadog and OpenTelemetry metrics](http://localhost:1313/metrics/open_telemetry/query_metrics) from the Metrics Query Editor.
{% /alert %}

## How OpenTelemetry metrics appear in Datadog{% #how-opentelemetry-metrics-appear-in-datadog %}

To differentiate metrics from the OpenTelemetry Collector's [hostmetrics](http://localhost:1313/opentelemetry/integrations/host_metrics/) receiver and the Datadog Agent, Datadog prepends `otel.` to any received metric that starts with `system.` or `process.`. Datadog does not recommend monitoring the same infrastructure with both the Datadog Agent and the OpenTelemetry Collector

{% alert level="info" %}
Datadog is evaluating ways to improve the OTLP metric experience, including potentially deprecating this `otel` prefix.
{% /alert %}

## Metrics mappings{% #metrics-mappings %}

The following table shows the metric mappings for various integrations. Use the search and filter controls to find the mappings for a specific integration.

For more information, see [OpenTelemetry integrations](http://localhost:1313/opentelemetry/integrations/).

|  |
|  |

## Further reading{% #further-reading %}

- [OTLP Metric Types](http://localhost:1313/metrics/open_telemetry/otlp_metric_types)
- [Resource attribute mapping from OpenTelemetry to Datadog](http://localhost:1313/opentelemetry/guide/semantic_mapping)
