---
title: Algorithms
kind: documentation
disable_toc: true
---

## Anomalies

| Function      | Description                                                                                | Example                                                    |
| :----         | :-------                                                                                   | :---------                                                 |
| `anomalies()` | Overlay a gray band on the metric showing the expected behavior of a series based on past. | `anomalies(avg:<METRIC_NAME>{*}, '<ALGORITHM>', <BOUNDS>)` |

The `anomalies()` function has two parameters:

* `ALGORITHM`:  Methodology used to detect anomalies.
* `BOUNDS`:  Width of the gray band. `bounds` can be interpreted as the standard deviations for your algorithm; a value of 2 or 3 should be large enough to include most "normal" points.

Here's a two-minute video walkthrough:

{{< vimeo 188833506 >}}

See the [Anomaly Monitor][1] page for more info.

## Outliers

| Function     | Description                | Example                                                                    |
| :----        | :-------                   | :---------                                                                 |
| `outliers()` | Highlight outliers series. | `outliers(avg:<METRIC_NAME>{*}, '<ALGORITHM>', <TOLERANCE>, <PERCENTAGE>)` |

The `outliers()` function has three parameters:

* `ALGORITHM`: The outliers algorithm to use.
* `TOLERANCE`: The tolerance of the outliers algorithm.
* `PERCENTAGE`: The percentage of outlying points required to mark a series as an outlier (available only for MAD and scaledMAD algorithms)

{{< img src="graphing/functions/algorithms/outlier.gif" alt="outlier detection" responsive="true" style="width:70%;">}}

See the [Outlier Monitor][2] page for more info.

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
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

[1]: /monitors/monitor_types/anomaly
[2]: /monitors/monitor_types/outlier
