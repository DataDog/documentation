---
title: Exclusion
aliases:
    - /graphing/functions/exclusion/
---

## Exclude null

| Function         | Description                                                    | Example                                        |
| ---------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| `exclude_null()` | Remove groups with N/A tag values from your graph or top list. | `exclude_null(avg:system.load.1{*} by {host})` |

For example, say you have a metric with two tags: `account` and `region`. `account` has three possible values (`prod`, `build` and `N/A`) while `region` has four possible values (`us-east-1`, `us-west-1`, `eu-central-1`, and `N/A`).

When you graph this metric as a timeseries, you would have 3 x 4 = 12 lines on your graph. Applying `exclude_null()` removes lines with tag combinations containing _any_ N/A values, leaving you with 2 x 3 = 6 groups.

## Clamp

| Function      | Description                                                          | Example                                |
| ------------- | -------------------------------------------------------------------- | -------------------------------------- |
| `clamp_min()` | Set any metric values _under_ a threshold value to equal that value. | `clamp_min(avg:system.load.1{*}, 100)` |
| `clamp_max()` | Set any metric values _over_ a threshold value to equal that value.  | `clamp_max(avg:system.load.1{*}, 100)` |

Add a threshold value. The `clamp_min()` sets all datapoints below the threshold to equal that value, while `clamp_max()` limits datapoints above the threshold.

## Cutoff

| Function       | Description                                     | Example                                 |
| -------------- | ----------------------------------------------- | --------------------------------------- |
| `cutoff_min()` | Replace metric values _under_ a threshold value with NaN. | `cutoff_min(avg:system.load.1{*}, 100)` |
| `cutoff_max()` | Replace metric values _over_ a threshold value with NaN.  | `cutoff_max(avg:system.load.1{*}, 100)` |

Add a threshold value. The `cutoff_min()` replaces all metric values lower than this threshold value with `NaN`, while `cutoff_max()` replaces all metric values higher than this threshold value with `NaN`. The cutoff functions do not replace values that are **equal to** the threshold value.

**Tip**: For both the clamp and cutoff functions, it may be helpful to see the threshold value you have chosen. You can [set a horizontal marker][1] in Dashboards to indicate this value.

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
{{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://www.datadoghq.com/blog/customize-graphs-dashboards-graph-markers/
