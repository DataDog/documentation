---
title: Algorithms
kind: documentation
disable_toc: true
---

## Anomalies
`anomalies()`

Overlay a gray band showing the expected behavior of a series based on past.

{{< img src="graphing/functions/algorithms/anomalies_graph.png" alt="anomalies graph" responsive="true" style="width:80%;">}}

The function has two parameters:

* The first parameter is for selecting which algorithm is used.
* The second parameter is labeled `bounds`, tune it to change the width of the gray band. `bounds` can be interpreted as the standard deviations for your algorithm; a value of 2 or 3 should be large enough to include most "normal" points.

See our [Anomaly Monitor][1] page for more info.

## Outliers

`outliers()`

Highlight outliers series; see our [Outlier Monitor][2] page for more info.

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Soothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}


[1]: /monitors/monitor_types/anomaly
[2]: /monitors/monitor_types/outlier