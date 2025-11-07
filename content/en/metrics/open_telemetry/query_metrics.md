---
title: Query Across Datadog and OpenTelemetry Metrics
aliases:
- metrics/open_telemetry/otlp_metrics/
further_reading:
- link: "opentelemetry/"
  tag: "Documentation"
  text: "OpenTelemetry"
---

{{< callout url="https://www.datadoghq.com/product-preview/datadog-and-opentelemetry-metric-compatibility/" btn_hidden="false" >}}
Querying across Datadog and OpenTelemetry metrics is in Preview. To enable this feature, click <strong>Request Access</strong> and complete the form.
{{< /callout >}}

Many organizations use OpenTelemetry (OTel) alongside Datadog, creating hybrid environments where some hosts emit OTel metrics and others emit Datadog metrics. Because OTel and Datadog metrics often use different naming conventions and semantic definitions, creating a unified view of your infrastructure in these environments can be challenging.

Datadog helps you bridge this gap by enabling you to:

- Query OTel and Datadog metrics together.
- Understand metric sources and mappings.

## Unify OpenTelemetry and Datadog metrics in queries

The [Metrics Query Editor][1] includes a Semantic Mode selector, allowing you to control how Datadog handles potentially equivalent metrics from OTel and Datadog sources.

{{< img src="/metrics/otel/semantic_mode.png" alt="Semantic mode selector on Metrics Explorer page." style="width:100%;" >}}

Choose between two modes:

### Strictly adhere to native data source (Default)

- This mode queries only the specific metric name you enter (whether it's a Datadog or OTel metric).
- It does not include data from any equivalent metrics.

### Combine data from all telemetry sources

- This mode automatically combines data from equivalent Datadog and OTel metrics into a single query, even if you only enter one of the metric names.
- It handles the mapping between equivalent metrics (including complex ones) and aggregates all related timeseries as a single metric.
- This works whether you start with a Datadog metric or an OTel metric.

### Example

Imagine you're monitoring system load using two different metrics:

- **OTel native**: `otel.system.cpu.load_average.15m`
- **Datadog Agent**: `system.load.15`

If you query for `otel.system.cpu.load_average.15m`, apply a max space aggregation, and set the Semantic Mode to **Combine data from all telemetry sources**, Datadog automatically:

1. Identifies the equivalent Datadog metric: `system.load.15`.
2. Combines the timeseries from both `otel.system.cpu.load_average.15m` and `system.load.15`.
3. Applies the max aggregation across all datapoints from both sources.

## Understand metric sources and mappings

To provide clarity when querying, the metric source and equivalent metrics are displayed:

- **Source pill**: In the query editor, a **Datadog** or **OTel** pill appears next to the metric name, indicating its origin.

- **Equivalent metrics list**: The editor also shows a list of metrics considered equivalent to the one you've queried. This includes complex one-to-many mappings. For example, `otel.system.cpu.utilization` maps to multiple Datadog CPU state metrics (`system.cpu.idle`, `system.cpu.iowait`, etc.).

{{< img src="/metrics/otel/source.png" alt="Source pill and equivalent metrics list" style="width:75%;" >}}

## View detailed mappings

For a comprehensive view of how specific OTel and Datadog metrics relate, check the Metrics Summary page:

1. Navigate to [**Metrics > Summary**][2].
2. Search for a known Datadog or OTel metric.
3. Open the **Metric Details** side panel.

Alternatively, click **Edit in Metrics Summary** when inputting a metric in the query editor.

This panel displays metric mappings, including complex relationships. For example, it shows how `otel.system.cpu.utilization` maps to multiple Datadog metrics like `system.cpu.idle`, `system.cpu.user`, and others.

{{< img src="/metrics/otel/mappings.png" alt="Metrics Summary Details panel showing OTel and Datadog mappings" style="width:100%;" >}}

You can also see the tag-based logic used for these mappings. Hover over an equivalent metric to see the specific conditions. For example, hovering over `system.cpu.idle` shows that it maps to `otel.system.cpu.utilization` when `state=idle`, and the value is multiplied by 100.

{{< img src="/metrics/otel/tooltip.png" alt="Hover-over tooltip showing tag-based mapping logic" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: https://app.datadoghq.com/metric/summary
