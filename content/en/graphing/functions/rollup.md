---
title: Rollup
kind: documentation
---

`.rollup()`

*Recommended for expert users only.*

Appending the `.rollup()` function at the end of a query allows you to do a custom [time aggregation][1], i.e it defines what are the time intervals for your graph and how data points are aggregated within a given time interval.

The function takes two parameters, `<METHOD>` and `<TIME>`: `.rollup(<METHOD>,<TIME>)`.

| Parameter  | Description                                                                                                     |
|------------|-----------------------------------------------------------------------------------------------------------------|
| `<METHOD>` | Can be `sum`/`min`/`max`/`count`/`avg` and defines how data points are aggregated within a given time interval. |
| `<TIME>`   | Time in second of the interval between two data points displayed.                                               |

You can use either one individually, or both together like `.rollup(sum,120)` for instance. Find below bar graph displaying a week's worth of cpu usage for a host without using the `.rollup()` function:

{{< img src="graphing/functions/rollup/smooth_1.png" alt="smooth_1" responsive="true" style="width:60%;" >}}

And now it is the same metric, graphed using a day-long rollup with `.rollup(86400)`:

{{< img src="graphing/functions/rollup/smooth_2.png" alt="smooth_2" responsive="true" style="width:60%;" >}}

## Maximum number of points displayed

When graphing, Datadog imposes a limit of 350 points per graph. In order to respect this limit, Datadog rolls up data points automatically with the `avg` method, effectively displaying the average of all data points within a time interval for a given metric.

If a custom `.rollup()` function is applied and is lower than the Datadog limit, the Datadog limit is used instead. For example, if you're requesting `.rollup(20)` for a month-long window, data is returned at a rollup greater than 20 seconds in order to prevent returning more than 350 points.

**Note**: Queries for `COUNT` and `RATE` type metrics have the `.as_count()` modifier appended automatically in the UI, which sets the rollup method used to `sum` and disables interpolation. This `.as_count()` is explicitly visible at the end of the query:

  {{< img src="graphing/functions/rollup/as_count.png" alt="as_count" responsive="true" style="width:50%;">}}

For more details about how to use `.as_count()` and `.as_rate()` see [our blog post][2] or learn more about the effects of those functions with the [detailed documentation about in-application modifiers][3].

## Rollups in monitors

Rollups should usually be avoided in [monitor][4] queries, because of the possibility of misalignment between the rollup interval and the evaluation window of the monitor. The start and end of rollup intervals are aligned to UNIX time, not to the start and end of monitor queries, which means that a monitor may evaluate (and trigger on) an incomplete rollup interval containing only a small sample of data. To avoid this issue, delay the evaluation of your monitor by (at least) the length of the setup rollup interval.

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

[1]: /graphing/functions/#proceed-to-time-aggregation
[2]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[3]: /developers/metrics/type_modifiers
[4]: /monitors/monitor_types/metric
