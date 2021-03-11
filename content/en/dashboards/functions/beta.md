---
title: Beta Functions
kind: documentation
aliases:
    - /graphing/functions/beta/
---

Beta functions are available by editing the query JSON directly.

## Rolling average

| Function          | Description                                    | Example                           |
|-------------------|------------------------------------------------|-----------------------------------|
| `rollingavg_5()`  | Compute the rolling average over a span of 5.  | `rollingavg_5(system.load.1{*})`  |
| `rollingavg_13()` | Compute the rolling average over a span of 13. | `rollingavg_13(system.load.1{*})` |
| `rollingavg_21()` | Compute the rolling average over a span of 21. | `rollingavg_21(system.load.1{*})` |
| `rollingavg_29()` | Compute the rolling average over a span of 29. | `rollingavg_29(system.load.1{*})` |

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
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
