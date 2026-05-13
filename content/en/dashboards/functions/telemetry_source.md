---
title: Telemetry Source
description: Choose the data sources (OpenTelemetry, Datadog, or both) where your metric data comes from.
aliases:
    - /graphing/functions/telemetry_source/
---

Environments that submit metrics with both OpenTelemetry and Datadog agents can choose which data sources to display metrics from. For more information on querying across both sources, see [Query Across Datadog and OpenTelemetry Metrics][1].

## Combined telemetry

"Combined" mode automatically combines data from equivalent Datadog and OpenTelemetry metrics into a single query result.

In the query editor, select **Modify** and then **Combined telemetry** in the **Telemetry sources** section.

{{< img src="dashboards/functions/telemetry_source_combined.png" alt="Telemetry sources query modifier showing Combined telemetry selected." style="width:75%;" >}}

Alternatively, set `semantic_mode` to `combined` in the JSON editor.

```text
{
    "title": "Goroutine Count Metrics - DD + OTel",
    "type": "timeseries",
    "requests": [
        {
            "response_format": "timeseries",
            "queries": [
                {
                    "name": "query1",
                    "data_source": "metrics",
                    "query": "sum:go.goroutine.count{*}",
                    "semantic_mode": "combined"
                }
            ],
            "style": {
                "palette": "dog_classic",
                "order_by": "values",
                "line_type": "solid",
                "line_width": "normal"
            },
            "display_type": "line"
        }
    ]
}
```

## Native telemetry (default)

In "native" mode (the default), only the metric in the query returns data. The query does not include equivalent metrics from another telemetry source.

In the query editor, select **Modify** and then **Native telemetry** in the **Telemetry sources** section.

Alternatively, set `semantic_mode` to `native` in the JSON editor.

```text
{
    "title": "Goroutine Count Metrics",
    "type": "timeseries",
    "requests": [
        {
            "response_format": "timeseries",
            "queries": [
                {
                    "name": "query1",
                    "data_source": "metrics",
                    "query": "sum:go.goroutine.count{*}",
                    "semantic_mode": "native"
                }
            ],
            "style": {
                "palette": "dog_classic",
                "order_by": "values",
                "line_type": "solid",
                "line_width": "normal"
            },
            "display_type": "line"
        }
    ]
}
```

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/beta" >}}Beta: Use beta and rolling average functions for your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion: Exclude certain values of your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /metrics/open_telemetry/query_metrics
