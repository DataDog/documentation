---
title: Rollup
kind: documentation
aliases:
    - /graphing/functions/rollup/
---

`.rollup()`

*Recommended for expert users only.*

Appending the `.rollup()` function at the end of a query allows you to perform custom [time aggregation][1], i.e. this function enables you to define:

* The time intervals for a given graph  ([if larger than the query-enforced rollup interval](#rollup-interval-enforced-vs-custom)).
* How data points are aggregated within a given time interval.

The function takes two parameters, `<METHOD>` and optionally `<TIME>`: `.rollup(<METHOD>,<TIME>)` or `.rollup(<METHOD>)`.

| Parameter  | Description                                                                                                     |
|------------|-----------------------------------------------------------------------------------------------------------------|
| `<METHOD>` | Can be `sum`/`min`/`max`/`count`/`avg` and defines how data points are aggregated within a given time interval. |
| `<TIME>`   | Time (in seconds) of the interval between two data points displayed. Optional.                                            |

You can use them individually or together, for instance `.rollup(sum,120)`. The following bar graph displays a week's worth of CPU usage for a host **without** using the `.rollup()` function:

{{< img src="dashboards/functions/rollup/smooth_1.png" alt="smooth_1"  style="width:60%;" >}}

The following bar graph displays the same metric, graphed using a day-long rollup with `.rollup(avg,86400)`:

{{< img src="dashboards/functions/rollup/smooth_2.png" alt="smooth_2"  style="width:60%;" >}}

## Moving rollup


| Function        | Description                                    | Example |
|------------------|------------------------------------------------|------------------|
| `moving_rollup` | Rollup to combine the points in the last X seconds. | `moving_rollup(<METRIC_NAME>, <TIME> , <METHOD>)` |


Applying the `moving_rollup()` function to a query allows you to combine points from the most recent specified time range—that is, the last X seconds. Like with `.rollup()`, `<METHOD>` can be `sum`/`min`/`max`/`count`/`avg` and defines how data points are aggregated within the given time interval.

## Rollup interval: enforced vs custom

When graphing, Datadog imposes a limit of 350 points per graph. In order to respect this limit, Datadog rolls up data points automatically with the `avg` method, effectively displaying the average of all data points within a time interval for a given metric.

A custom `.rollup()` function can be used to enforce the type of time aggregation applied (`avg`, `min`, `max`, `count`, or `sum`) and the time interval to rollup. However, if a custom `.rollup()` function is applied and uses a smaller time interval than the Datadog limit, the Datadog limit is used instead while still using the specified rollup method. For example, if you're requesting `.rollup(20)` for a month-long window, data is returned at a rollup greater than 20 seconds in order to prevent returning more than 350 points.

**Note**: Queries for `COUNT` and `RATE` type metrics have the `.as_count()` modifier appended automatically in the UI, which sets the rollup method used to `sum` and disables interpolation. This `.as_count()` is explicitly visible at the end of the query:

  {{< img src="dashboards/functions/rollup/as_count.png" alt="as_count"  style="width:50%;">}}

For more details about how to use `.as_count()` and `.as_rate()` see the [blog post][2] or learn more about the effects of those functions with the [documentation on in-application modifiers][3].

## Rollups in monitors

Rollups should usually be avoided in [monitor][4] queries, because of the possibility of misalignment between the rollup interval and the evaluation window of the monitor. The start and end of rollup intervals are aligned to UNIX time, not to the start and end of monitor queries. Therefore, a monitor may evaluate (and trigger on) an incomplete rollup interval containing only a small sample of data. To avoid this issue, delay the evaluation of your monitor by (at least) the length of the setup rollup interval.

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion: Exclude certain values of your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /dashboards/functions/#proceed-to-time-aggregation
[2]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[3]: /developers/metrics/type_modifiers/
[4]: /monitors/monitor_types/metric/
