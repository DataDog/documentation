---
title: Count
aliases:
    - /graphing/functions/count/
---

## Count non zero

| Function          | Description                           | Example                           |
| :----             | :-------                              | :---------                        |
| `count_nonzero()` | Compute count of all non-zero values. | `count_nonzero(<METRIC_NAME>{*})` |

For a query grouped by one or more [tag keys][1], count the number of tag values with non-zero metric values at each point.

Example: `count_nonzero(system.cpu.user{*} by {host})` returns a timeseries representing the number of hosts with non-zero system load at each point.

{{< img src="dashboards/functions/count/count_nonzero.png" alt="count non zero" style="width:80%;">}}

Note: `count_nonzero_finite()` can be used as an alias for `count_nonzero()`.

## Count not null

| Function           | Description                           | Example                            |
| :----              | :-------                              | :---------                         |
| `count_not_null()` | Compute count of all not null values. | `count_not_null(<METRIC_NAME>{*})` |

For a query grouped by one or more [tag keys][1], count the number of tag values with non-null metric values at each point. A null metric value is when there is no finite value.

Example: `count_not_null(system.cpu.user{*} by {host})` returns a timeseries representing the number of hosts with non-null system load at each point.

{{< img src="dashboards/functions/count/count_not_null.png" alt="count not null" style="width:80%;">}}

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion: Exclude certain values of your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /getting_started/tagging/
