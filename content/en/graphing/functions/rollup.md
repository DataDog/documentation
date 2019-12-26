---
title: Rollup
kind: documentation
---

`.rollup()`

Recommended for expert users only. Datadog rolls up data points automatically, based on the in-app metric type: `gauge` metrics are averaged by default, whereas `count` and `rate` metrics are summed. Appending this function to the end of a query allows you to override the default behavior: to control the rollup method, or the number of raw points rolled up into a single point plotted on the graph.

The function takes two parameters, method and time: `.rollup(method,time)`. The method can be sum/min/max/count/avg and time is in seconds. You can use either one individually, or both together like `.rollup(sum,120)`. We impose a limit of 350 points per time range. For example, if you're requesting `.rollup(20)` for a month-long window, we return data at a rollup far greater than 20 seconds in order to prevent returning a gigantic number of points.

Note that rollups should usually be avoided in [monitor][1] queries, because of the possibility of misalignment between the rollup interval and the evaluation window of the monitor. The start and end of rollup intervals are aligned to UNIX time, not to the start and end of monitor queries, which means that a monitor may evaluate (and trigger on) an incomplete rollup interval containing only a small sample of data. To avoid this issue, users should delay the evaluation of the monitor by (at least) the length of the rollup interval.

## .as_count() or as_rate()

These functions are only intended for metrics submitted as rates or counters via StatsD. These functions have no effect for other metric types. For more details about how to use `.as_count()` and `.as_rate()` see [our Metric Type Modifiers documentation][2].

Note: [The only available query with `as_count()` is `sum()`][3] (unless using a rollup summary), which is the only mathematical accurate function with such behavior.

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /monitors/monitor_types/metric
[2]: /developers/metrics/type_modifiers/?tab=count
[3]: /graphing/faq/as_count_validation
