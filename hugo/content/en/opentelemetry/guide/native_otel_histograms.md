---
title: Send Native OpenTelemetry Histograms
description: "Send OpenTelemetry histograms from DDOT to Datadog with their original buckets, without converting them."
further_reading:
- link: "/agent/configuration/metrics-v3-intake/"
  tag: "Documentation"
  text: "Metrics v3 Intake"
- link: "/metrics/distributions/"
  tag: "Documentation"
  text: "Distributions"
- link: "/opentelemetry/guide/otlp_delta_temporality/"
  tag: "Guide"
  text: "Producing Delta Temporality Metrics with OpenTelemetry"
---

{{< callout header="false" btn_hidden="true" >}}
Native OpenTelemetry histograms in DDOT are in Preview.
{{< /callout >}}

## Overview

By default, DDOT (the [DDOT Collector][1] and the [Agent's Collector][2]) converts OpenTelemetry histograms into Datadog [distributions][3] in an approximate format (DDSketch). With native histograms, DDOT sends each histogram with its original bucket boundaries and counts, and Datadog computes percentiles from those buckets.

Use native histograms when you need percentiles that match the buckets your application produces. Before you turn them on, read [What changes](#what-changes): some histogram metrics are no longer sent, and dashboards and monitors that use them need new queries.

## Requirements

- DDOT 7.87.0 or later.
- Every metrics destination uses v3 for distributions, including a multi-region failover destination, even while failover is off. Datadog URLs use v3 by default. See [When v2 is used][4].
- DDOT converts cumulative histograms and counters to delta temporality with the `cumulativetodelta` processor, which it adds automatically. Without this conversion, DDOT drops cumulative histograms **and counters**. This happens if:
  - `DD_OTELCOLLECTOR_CONVERTER_FEATURES` doesn't include `cumulativetodelta`, or the converter is off.
  - Your own `cumulativetodelta` processor converts only some metrics, for example with `include` or `exclude` filters.
  - You use the DaemonSet and gateway setup with the Datadog Operator, or with a Datadog Helm chart older than 3.272.0.

<div class="alert alert-warning">If any metrics destination uses v2 for distributions, DDOT doesn't start and sends no telemetry. Check the requirements before you enable native histograms.</div>

## Enable native histograms

Enable the `datadog.serializerexporter.NativeOTelHistograms` feature gate on every DDOT instance that exports metrics to Datadog. In the DaemonSet and gateway setup, this is the gateway.

{{< tabs >}}
{{% tab "Helm" %}}

For DDOT running with the Agent, in your `values.yaml`:

```yaml
datadog:
  otelCollector:
    featureGates: "datadog.serializerexporter.NativeOTelHistograms"
```

For the gateway:

```yaml
otelAgentGateway:
  featureGates: "datadog.serializerexporter.NativeOTelHistograms"
```

If `featureGates` already has a value, add the gate to it, separated by a comma.

{{% /tab %}}
{{% tab "Datadog Operator" %}}

The Datadog Operator supports feature gates only for the gateway. In your `DatadogAgent` resource:

```yaml
spec:
  features:
    otelAgentGateway:
      featureGates: "datadog.serializerexporter.NativeOTelHistograms"
```

{{% /tab %}}
{{% tab "Command line" %}}

Add the flag to the arguments of the DDOT process:

```shell
--feature-gates=+datadog.serializerexporter.NativeOTelHistograms
```

{{% /tab %}}
{{< /tabs >}}

To turn native histograms off, remove the feature gate and restart DDOT.

## What changes

### Histogram metrics

The `histograms::mode` and `histograms::send_aggregation_metrics` settings of the Datadog Exporter have no effect, and DDOT logs a warning at startup if you change them from their defaults. DDOT doesn't send the extra `.count`, `.sum`, `.min`, `.max`, and `.bucket` metrics that these settings add. If you use these metrics, query the histogram metric instead:

| Instead of | Query |
|---|---|
| `<METRIC_NAME>.count` | `count:<METRIC_NAME>{*}.as_count()` |
| `<METRIC_NAME>.sum` | `sum:<METRIC_NAME>{*}.as_count()` |
| `<METRIC_NAME>.min`, `<METRIC_NAME>.max` | `min:<METRIC_NAME>{*}`, `max:<METRIC_NAME>{*}` |
| `<METRIC_NAME>.bucket` | Percentile or threshold queries on `<METRIC_NAME>` (there is no per-bucket query) |

- `min` and `max` are available only if your SDK sends them. Histograms converted by the `cumulativetodelta` processor don't have them.
- As with other distributions, percentile, threshold, and heatmap queries require [percentiles enabled on the metric][5].

### Idle series

DDOT sends histogram points with a count of 0, for example for intervals in which a cumulative histogram received no new values. These series report 0 instead of no data, which can affect monitors that alert on missing data.

### Metric names

With the default settings, metric names don't change. If you turned off the `exporter.datadogexporter.DisableAllMetricRemapping` feature gate, DDOT stops adding the `otel.` prefix to some metrics, such as `system.*` metrics, and stops copying runtime metrics under Datadog names.

## Limitations

- Native histograms are available only in DDOT, not in OTLP ingestion in the Datadog Agent or the Datadog Exporter in the upstream OpenTelemetry Collector.
- DDOT drops histogram data points that don't follow the OpenTelemetry specification, for example points with bucket boundaries that don't increase. It also drops points that have more than 2,147,483,647 values in a single bucket.
- If some DDOT instances send converted histograms and others send native histograms under the same metric name, percentiles for that metric can be inaccurate.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/setup/ddot_collector/
[2]: /opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/
[3]: /metrics/distributions/
[4]: /agent/configuration/metrics-v3-intake/#when-v2-is-used
[5]: /metrics/distributions/#enabling-advanced-query-functionality
