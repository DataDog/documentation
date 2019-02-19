---
title: Beta Functions
kind: documentation
---

Beta functions are available by editing the query JSON directly.

## Default

| Function    | Description                             | Example                                      |
|-------------|-----------------------------------------|----------------------------------------------|
| `default()` | Adds a default value to sparse metrics. | `default(system.load.1{*}, <default_value>)` |

**default_value**: The value to use when data is not present

## Exclude Null

| Function         | Description                                    | Example                                        |
|------------------|------------------------------------------------|------------------------------------------------|
| `exclude_null()` | Remove N/A groups from your graph or top list. | `exclude_null(avg:system.load.1{*} by {host})` |

## Lowess

| Function   | Description                                                           | Example                        |
|------------|-----------------------------------------------------------------------|--------------------------------|
| `lowess()` | Smooth the metric by applying locally-weighted polynomial regression. | `lowess(avg:system.load.1{*})` |

## Piecewise Linear

| Function             | Description                                                          | Example                                  |
|----------------------|----------------------------------------------------------------------|------------------------------------------|
| `piecewise_linear()` | Approximate the metric with a piecewise function of linear segments. | `piecewise_linear(avg:system.load.1{*})` |

## Rolling Average

| Function          | Description                                    | Example                           |
|-------------------|------------------------------------------------|-----------------------------------|
| `rollingavg_5()`  | Compute the rolling average over a span of 5.  | `rollingavg_5(system.load.1{*})`  |
| `rollingavg_13()` | Compute the rolling average over a span of 13. | `rollingavg_13(system.load.1{*})` |
| `rollingavg_21()` | Compute the rolling average over a span of 21. | `rollingavg_21(system.load.1{*})` |
| `rollingavg_29()` | Compute the rolling average over a span of 29. | `rollingavg_29(system.load.1{*})` |

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}

