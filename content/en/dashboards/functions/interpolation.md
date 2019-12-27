---
title: Interpolation
kind: documentation
aliases:
    - /graphing/functions/interpolation/
---

## Fill

| Function | Description                                       | Example                                    |
| :----    | :-------                                          | :---------                                 |
| `fill()` | Interpolate missing metric values for the metric. | `<METRIC_NAME>{*}.fill(<METHOD>, <LIMIT>)` |

The `fill()` function has two parameters:

* **`METHOD`**: The function to use as an interpolation method; choose from:
    * **linear**: Gives you a linear interpolation between the beginning and the end of the gap.
    * **last**: Fills the gap with the last value of the gap.
    * **zero**: Fills the gap with a zero value.
    * **null**: Deactivates the interpolation.

* `LIMIT` [*optional*, *default*=**300**, *maximum*=**600**]: The interpolation limit (in seconds) that represents the maximum size of a gap you want to interpolate.

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}
