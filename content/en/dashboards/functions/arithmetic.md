---
title: Arithmetic
aliases:
    - /graphing/functions/arithmetic/
---

## Absolute

| Function | Description                             | Example                 |
| :----    | :-------                                | :---------              |
| `abs()`  | Graph the absolute value of the metric. | `abs(<METRIC_NAME>{*})` |

Transforms this sine timeseries `sin{*}`:

{{< img src="dashboards/functions/arithmetic/sinus.png" alt="Sinus function" style="width:80%;">}}

into this one `abs(sin{*})`:

{{< img src="dashboards/functions/arithmetic/sinus_abs.png" alt="Sinus function with abs" style="width:80%;">}}

## Logarithm

### Log base 2

| Function | Description                               | Example                  |
| :----    | :-------                                  | :---------               |
| `log2()` | Graph the Base-2 logarithm of the metric. | `log2(<METRIC_NAME>{*})` |

Example:

If a metric, `x{*}`, increments itself by 1 for each data point, then `log2(x{*})` has the following shape:

{{< img src="dashboards/functions/arithmetic/log2.png" alt=" log2 function" style="width:80%;">}}

### Log base 10

| Function  | Description                                | Example                   |
| :----     | :-------                                   | :---------                |
| `log10()` | Graph the Base-10 logarithm of the metric. | `log10(<METRIC_NAME>{*})` |

Example:

If a metric, `x{*}`, increments itself by 1 for each data point, then `log10(x{*})` has the following shape:

{{< img src="dashboards/functions/arithmetic/log10.png" alt="log10 function" style="width:80%;">}}

## Cumulative sum

| Function   | Description                                                          | Example                    |
| :----      | :-------                                                             | :---------                 |
| `cumsum()` | Graph the cumulative sum of the metric over the visible time window. | `cumsum(<METRIC_NAME>{*})` |

Example:

If a metric, `const_1{*}`, is a constant with the value of `1`, then `cumsum(const_1{*})` has the following shape:

{{< img src="dashboards/functions/arithmetic/cumsum.png" alt="cum sum function with abs" style="width:80%;">}}

## Cumulative sum in monitors

Cumulative sum should be avoided in monitor queries, because the cumulative sum function is a visual function. When used in a dashboard or notebook, the points will reflect values based on the selected timeframe. This doesn't translate well in a monitor as the monitor doesn't have a sense of which timeframe to use.

Instead, configure [Cumulative Time Windows][1] in your monitor evaluation period.

## Integral

| Function     | Description                       | Example                             |
| :----        | :-------                          | :---------                          |
| `integral()` | Graph the integral of the metric. | `integral(<METRIC_NAME>{*})` |

**Note**: Datadog's `integral()` is the cumulative sum of `[time delta] x [value delta]` over all consecutive pairs of points in the visible time window for a given metric.

{{< img src="dashboards/functions/arithmetic/integral.png" alt="integral function with abs" style="width:80%;">}}

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
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

[1]: /monitors/configuration/?tab=thresholdalert#cumulative-time-windows
