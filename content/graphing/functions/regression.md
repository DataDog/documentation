---
title: Regression
kind: documentation
---

## Robust trend

`robust_trend()`

Fit a robust regression trend line using Huber loss:

The most common type of linear regression -- ordinary least squares (OLS) -- can be heavily influenced by a small number of points with extreme values. Robust regression is an alternative method for fitting a regression line; it is not influenced as strongly by a small number of extreme values. As an example, see the following plot.

{{< img src="graphing/functions/regression/robust-trend.png" alt="robust trend" responsive="true" style="width:80%;">}}

The original metric is shown as a solid blue line. The purple dashed line is an OLS regression line, and the yellow dashed line is a robust regression line. The one short-lived spike in the metric leads to the OLS regression line trending upward, but the robust regression line ignores the spike and does a better job fitting the overall trend in the metric.

## Trend line

`trend_line()`

Fit an ordinary least squares regression line through the metric values

## Piecewise constant

`piecewise_constant()`

Approximate the metric with a piecewise function composed of constant-valued segments

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Soothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}