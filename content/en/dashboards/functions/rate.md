---
title: Rate
aliases:
    - /graphing/functions/rate/
further_reading:
- link: "/monitors/guide/alert-on-no-change-in-value/"
  tag: "Documentation"
  text: "Alert on no change in value"
---

## Per second

| Function       | Description                                                | Example                        |
|:---------------|:-----------------------------------------------------------|:-------------------------------|
| `per_second()` | Graph the rate at which the metric is changing per second. | `per_second(<METRIC_NAME>{*})` |

## Per minute

| Function       | Description                                                | Example                        |
|:---------------|:-----------------------------------------------------------|:-------------------------------|
| `per_minute()` | Graph the rate at which the metric is changing per minute. | `per_minute(<METRIC_NAME>{*})` |

## Per hour

| Function     | Description                                              | Example                      |
|:-------------|:---------------------------------------------------------|:-----------------------------|
| `per_hour()` | Graph the rate at which the metric is changing per hour. | `per_hour(<METRIC_NAME>{*})` |

## Time difference

| Function | Description                                                    | Example                |
|:---------|:---------------------------------------------------------------|:-----------------------|
| `dt()`   | Graph the time difference in seconds between submitted points. | `dt(<METRIC_NAME>{*})` |

The dt() function returns only one timeseries regardless of how many groups are involved. Within that one timeseries, it considers the time difference of all the submitted points across the various groups.

## Value difference

| Function | Description                    | Example                  |
|:---------|:-------------------------------|:-------------------------|
| `diff()` | Graph the delta of the metric. | `diff(<METRIC_NAME>{*})` |

Calculates the difference between each interval on a per interval basis. For example, a metric submits data points with a 15 second interval, the `diff()` modifier would show it over 15 second rate. **Note:** The calculation is done after applying time aggregation and before space aggregation takes place.

## Monotonic difference

| Function           | Description                                                                     | Example                            |
|:-------------------|:--------------------------------------------------------------------------------|:-----------------------------------|
| `monotonic_diff()` | Graph the delta of the metric like `diff()` but only if the delta is positive. | `monotonic_diff(<METRIC_NAME>{*})` |

## Derivative

| Function       | Description                                   | Example                        |
|:---------------|:----------------------------------------------|:-------------------------------|
| `derivative()` | Graph the derivative (diff/dt) of the metric. | `derivative(<METRIC_NAME>{*})` |

## Throughput

| Function       | Description                                                                                                                                        | Example                          |
|:---------------|:---------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------|
| `throughput()` | Converts a timeseries into a rate per second, by dividing each value by the number of seconds in the time bucket to produce the per-second value. | `throughput(<METRIC_NAME>{*})` |

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion: Exclude certain values of your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
