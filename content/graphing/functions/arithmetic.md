---
title: Arithmetic
kind: documentation
---

## Absolute

| Function | Description                            | Example                 |
| :----    | :-------                               | :---------              |
| `abs()`  | Graph the absolute value of the metric. | `abs(<METRIC_NAME>{*})` |

Transforms this sinus timeseries `sin{*}`: 

{{< img src="graphing/functions/arithmetic/sinus_function.png" alt="Sinus function" responsive="true" style="width:80%;">}}

into this one `abs(sin{*})`:

{{< img src="graphing/functions/arithmetic/sinus_function_with_abs.png" alt="Sinus function with abs" responsive="true" style="width:80%;">}}

## Logarithm 

### log2

| Function | Description                               | Example                  |
| :----    | :-------                                  | :---------               |
| `log2()` | Graph the Base-2 logarithm of the metric. | `log2(<METRIC_NAME>{*})` |

### log10

| Function  | Description                                | Example                   |
| :----     | :-------                                   | :---------                |
| `log10()` | Graph the Base-10 logarithm of the metric. | `log10(<METRIC_NAME>{*})` |

## Cumulative Sum


| Function   | Description                                                          | Example                    |
| :----      | :-------                                                             | :---------                 |
| `cumsum()` | Graph the cumulative sum of the metric over the visible time window. | `cumsum(<METRIC_NAME>{*})` |


## Integral

| Function     | Description                       | Example                             |
| :----        | :-------                          | :---------                          |
| `integral()` | Graph the integral of the metric. | `Graph the integral of the metric.` |

**Note**: Datadog `integral()` is the cumulative sum of `[time delta] x [value delta]` over all consecutive pairs of points in the visible time window for a given metric.

## Other functions

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