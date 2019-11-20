---
title: Rollup
kind: documentation
disable_toc: true
---

`.rollup()`

Recommended for expert users only. Datadog rolls up data points automatically, based on the in-app metric type: `GAUGE` type metrics are averaged by default, whereas `COUNT` and `RATE` metrics are summed. Appending this function to the end of a query allows you to override the default behavior: to control the rollup method, or the number of raw points rolled up into a single point plotted on the graph.

The function takes two parameters, method and time: `.rollup(method,time)`. The method can be `sum`/`min`/`max`/`count`/`avg` and time is in seconds. You can use either one individually, or both together like `.rollup(sum,120)`. Datadog impose a limit of 350 points per time range. For example, if you're requesting `.rollup(20)` for a month-long window, data is returned at a rollup far greater than 20 seconds in order to prevent returning a gigantic number of points.

Here is a bar graph displaying a week's worth of cpu usage for a host without using the `.rollup()` function:

{{< img src="graphing/functions/rollup/smooth_1.png" alt="smooth_1" responsive="true" style="width:60%;" >}}

And here is the same metric, graphed using a day-long rollup with `.rollup(86400)`:

{{< img src="graphing/functions/rollup/smooth_2.png" alt="smooth_2" responsive="true" style="width:60%;" >}}

Rollups should usually be avoided in [monitor][1] queries, because of the possibility of misalignment between the rollup interval and the evaluation window of the monitor. The start and end of rollup intervals are aligned to UNIX time, not to the start and end of monitor queries, which means that a monitor may evaluate (and trigger on) an incomplete rollup interval containing only a small sample of data. To avoid this issue, delay the evaluation of your monitor by (at least) the length of the setup rollup interval.

**Note**: Queries for `COUNT` and `RATE` type metrics have the `.as_count()` modifier appended automatically in the UI, which sets `.rollup(sum)` and disables interpolation. This `.as_count()` is explicitly visible at the end of the query:

  {{< img src="graphing/functions/rollup/as_count.png" alt="as_count" responsive="true" style="width:50%;">}}

For more details about how to use `.as_count()` and `.as_rate()` see [our blog post][2] or learn more about the effects of those functions with the [detailed documentation about in-application modifiers][3].

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
[2]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[3]: /developers/metrics/type_modifiers
