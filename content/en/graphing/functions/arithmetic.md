---
title: Arithmetic
kind: documentation
---

## Absolute

| Function | Description                             | Example                 |
| :----    | :-------                                | :---------              |
| `abs()`  | Graph the absolute value of the metric. | `abs(<METRIC_NAME>{*})` |

Transforms this sine timeseries `sin{*}`:

{{< img src="graphing/functions/arithmetic/sinus.png" alt="Sinus function" responsive="true" style="width:80%;">}}

into this one `abs(sin{*})`:

{{< img src="graphing/functions/arithmetic/sinus_abs.png" alt="Sinus function with abs" responsive="true" style="width:80%;">}}

## Logarithm

### log2

| Function | Description                               | Example                  |
| :----    | :-------                                  | :---------               |
| `log2()` | Graph the Base-2 logarithm of the metric. | `log2(<METRIC_NAME>{*})` |

Example:

If we have a metric `x{*}` that just increments itself by 1 for each data point, then `log2(x{*})` has the following shape:

{{< img src="graphing/functions/arithmetic/log2.png" alt=" log2 function" responsive="true" style="width:80%;">}}

### log10

| Function  | Description                                | Example                   |
| :----     | :-------                                   | :---------                |
| `log10()` | Graph the Base-10 logarithm of the metric. | `log10(<METRIC_NAME>{*})` |

Example:

If we have a metric `x{*}` that just increments itself by 1 for each data point, then `log10(x{*})` has the following shape:

{{< img src="graphing/functions/arithmetic/log10.png" alt="log10 function" responsive="true" style="width:80%;">}}

## Cumulative Sum

| Function   | Description                                                          | Example                    |
| :----      | :-------                                                             | :---------                 |
| `cumsum()` | Graph the cumulative sum of the metric over the visible time window. | `cumsum(<METRIC_NAME>{*})` |

Example:

If we have a metric `const_1{*}` that is a constant with the value of `1`, then `cumsum(const_1{*})` has the following shape:

{{< img src="graphing/functions/arithmetic/cumsum.png" alt="cum sum function with abs" responsive="true" style="width:80%;">}}

## Integral

| Function     | Description                       | Example                             |
| :----        | :-------                          | :---------                          |
| `integral()` | Graph the integral of the metric. | `integral(<METRIC_NAME>{*})` |

**Note**: Datadog's `integral()` is the cumulative sum of `[time delta] x [value delta]` over all consecutive pairs of points in the visible time window for a given metric.

{{< img src="graphing/functions/arithmetic/integral.png" alt="integral function with abs" responsive="true" style="width:80%;">}}

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}
