---
title: Telemetry Source
description: Control whether a metric query uses only the queried metric or combines equivalent Datadog and OpenTelemetry metrics.
aliases:
    - /graphing/functions/telemetry_source/
further_reading:
- link: "/metrics/open_telemetry/query_metrics"
  tag: "Documentation"
  text: "Query Across Datadog and OpenTelemetry Metrics"
---

The Telemetry source query modifier controls whether a metric query uses only the queried metric or combines equivalent Datadog and OpenTelemetry metrics. For more information about querying across both sources, see [Query Across Datadog and OpenTelemetry Metrics][1].

In the query editor, select **Modify** and then choose an option in the **Telemetry sources** section.

{{< img src="dashboards/functions/telemetry_source_combined.png" alt="Telemetry sources query modifier showing Combined telemetry selected." style="width:75%;" >}}

| UI option | JSON value | Behavior |
|---|---|---|
| **Native telemetry** (default) | `"semantic_mode": "native"` | Returns only the queried metric. Does not include equivalent metrics from another telemetry source. |
| **Combined telemetry** | `"semantic_mode": "combined"` | Combines equivalent Datadog and OpenTelemetry metrics into a single query result. |

To set the telemetry source in the JSON editor, add the `semantic_mode` key to your query object:

{{< highlight json "hl_lines=6" >}}
"queries": [
    {
        "name": "query1",
        "data_source": "metrics",
        "query": "sum:go.goroutine.count{*}",
        "semantic_mode": "combined"
    }
]
{{< /highlight >}}

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implement anomaly or outlier detection.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform arithmetic operations.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: Count non-zero or non-null values.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion: Exclude certain values of your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Fill or set default values.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate: Calculate a custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: Apply a machine learning function.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Control the number of raw data points used. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/beta" >}}Beta: Compute the rolling average of a metric.{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/open_telemetry/query_metrics
