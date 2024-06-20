---
title: Rank
aliases:
    - /graphing/functions/rank/
---

## Top

| Function | Description               | Example                                              |
| :----    | :-------                  | :---------                                           |
| `top()`  | Graph the top N elements. | `top(<METRIC_NAME>{*}, <LIMIT_TO>, '<BY>', '<DIR>')` |

The `top()` function has three parameters:

* `LIMIT_TO`: The number of series to be displayed; choose from:
    - `5`
    - `10`
    - `25`
    - `50`
    - `100`
* `BY`: Aggregation method; choose from:
    - `max`: Maximum of all metrics values.
    - `mean`: Mean of all metrics values.
    - `min`: Min of all metrics values.
    - `sum`: Sum of all metrics values.
    - `last`: Last metrics value.
    - `l2norm`: Uses the [norm][1] of the timeseries, which is always positive, to rank the series.
    - `area`: Signed area under the curve being graphed, which can be negative

* `DIR`: The direction of ranking; choose between:
    - `asc`: Rank the results in ascending order.
    - `desc`: Rank the results in descending order.

The `top()` method also has convenience functions of the following form, all of which take a single series list as input:

`[top, bottom][5, 10, 15, 20]_[mean, min, max, last, area, l2norm][2]`

For example, `bottom10_min()` retrieves the 10 lowest-valued series using the `min` metric.

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion: Exclude certain values of your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}


[1]: http://en.wikipedia.org/wiki/Norm_(mathematics)
