---
title: Arithmetic
kind: documentation
---

## Absolute

`abs()`

Absolute value for a given metric.

## Logarithm 

### log2

`log2()`

Base-2 logarithm for a given metric.

### log10

`log10()`

Base-10 logarithm for a given metric.

## Cumulative Sum

`cumsum()`

Cumulative sum over visible time window for a given metric.

## Exclude null

`exclude_null()`
Filter to remove `N/A` (Not Applicable) entries on a timeseries.

## Integral

`integral()`

Cumulative sum of `\[time delta] x \[value delta]` over all consecutive pairs of points in the visible time window for a given metric.

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Soothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}