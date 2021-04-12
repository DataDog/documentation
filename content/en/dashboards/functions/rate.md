---
title: Rate
kind: documentation
aliases:
    - /graphing/functions/rate/
---

## Per second

| Function       | Description                                                | Example                        |
|:---------------|:-----------------------------------------------------------|:-------------------------------|
| `per_second()` | Graph the rate at which the metric is changing per second. | `per_second(<METRIC_NAME>{*})` |

## Per minute

| Function       | Description                                                | Example                        |
|:---------------|:-----------------------------------------------------------|:-------------------------------|
| `per_minute()` | Graph the rate at which the metric is changing per minute. | `per_minute(<METRIC_NAME>{*})` |

## Per hour

| Function     | Description                                              | Example                      |
|:-------------|:---------------------------------------------------------|:-----------------------------|
| `per_hour()` | Graph the rate at which the metric is changing per hour. | `per_hour(<METRIC_NAME>{*})` |

## Delta time

| Function | Description                                                    | Example                |
|:---------|:---------------------------------------------------------------|:-----------------------|
| `dt()`   | Graph the time difference in seconds between submitted points. | `dt(<METRIC_NAME>{*})` |

## Delta value

| Function | Description                    | Example                  |
|:---------|:-------------------------------|:-------------------------|
| `diff()` | Graph the delta of the metric. | `diff(<METRIC_NAME>{*})` |

## Monotonic delta value

| Function           | Description                                                                     | Example                            |
|:-------------------|:--------------------------------------------------------------------------------|:-----------------------------------|
| `monotonic_diff()` | Graph the delta of the metric like `diff()` but only if the delta is positive. | `monotonic_diff(<METRIC_NAME>{*})` |

## Derivative

| Function       | Description                                   | Example                        |
|:---------------|:----------------------------------------------|:-------------------------------|
| `derivative()` | Graph the derivative (diff/dt) of the metric. | `derivative(<METRIC_NAME>{*})` |

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion: Exclude certain values of your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}
