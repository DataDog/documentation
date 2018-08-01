---
title: Rank
kind: documentation
--- 

## Top

`top()`

Select the top series responsive to a given query, according to some ranking method:

* a metric query string with some grouping, e.g. `avg:system.cpu.idle{*} by {host}`
* the number of series to be displayed, as an integer.
* one of `max`, `min`, `last`, `l2norm`, or `area`.  `area` is the signed area under the curve being graphed, which can be negative.  `l2norm` uses the <a href="http://en.wikipedia.org/wiki/Norm_(mathematics)#p-norm">L2 Norm</a> of the time series, which is always positive, to rank the series.
* either `desc` (rank the results in descending order) or `asc` (ascending order).

The `top()` method also has convenience functions of the following form, all of which take a single series list as input:

`[top, bottom][5, 10, 15, 20]_[mean, min, max, last, area, l2norm]()`

For example, `bottom10_min()` retrieves lowest-valued 10 series using the `min` metric.

## Top offset

`top_offset()`

Similar to `top()`, except with an additional offset parameter, which controls where in the ordered sequence of series the graphing starts.

For example, an offset of 2 would start graphing at the number 3 ranked series, according to the chosen ranking metric.

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Soothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}