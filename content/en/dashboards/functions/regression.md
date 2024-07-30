---
title: Regression
aliases:
    - /graphing/functions/regression/
---

## Robust trend

| Function         | Description                                          | Example                              |
| :----            | :-------                                             | :---------                           |
| `robust_trend()` | Fit a robust regression trend line using Huber loss. | `robust_trend(avg:<METRIC_NAME>{*})` |

The most common type of linear regression—ordinary least squares (OLS)—can be heavily influenced by a small number of points with extreme values. Robust regression is an alternative method for fitting a regression line; it is not influenced as strongly by a small number of extreme values. As an example, see the following plot.

{{< img src="dashboards/functions/regression/robust_trend.png" alt="robust trend" style="width:80%;">}}

The original metric is shown as a solid blue line. The purple dashed line is an OLS regression line, and the yellow dashed line is a robust regression line. The one short-lived spike in the metric leads to the OLS regression line trending upward, but the robust regression line ignores the spike and does a better job fitting the overall trend in the metric.

## Trend line

| Function       | Description                                                              | Example                            |
| :----          | :-------                                                                 | :---------                         |
| `trend_line()` | Fit an ordinary least squares regression line through the metric values. | `trend_line(avg:<METRIC_NAME>{*})` |

Example:

The function `sin(x) * x/2 + x` then `trend_line(sin(x) * x/2 + x)` has the following shape:

{{< img src="dashboards/functions/regression/trend_line_function.png" alt="Trend line function" style="width:80%;">}}

## Piecewise constant

| Function               | Description                                                                            | Example                                    |
| :----                  | :-------                                                                               | :---------                                 |
| `piecewise_constant()` | Approximate the metric with a piecewise function composed of constant-valued segments. | `piecewise_constant(avg:<METRIC_NAME>{*})` |

Example:

The function `x` then `piecewise_constant(x)` has the following shape:

{{< img src="dashboards/functions/regression/piecewise_constant.png" alt="piecewise constant" style="width:80%;">}}

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion: Exclude certain values of your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}
