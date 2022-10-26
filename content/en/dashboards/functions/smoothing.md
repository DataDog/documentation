---
title: Smoothing
kind: documentation
aliases:
    - /graphing/functions/smoothing/
---

## Autosmooth

| Function       | Description                                                           | Example                        |
| :----          | :-------                                                              | :---------                     |
| `autosmooth()` | Automatically removes noise while preserving the trend of the metric. | `autosmooth(<METRIC_NAME>{*})` |

The `autosmooth()` function applies a moving average with an automatically selected span. It smooths a timeseries while preserving its trend. In this example, the function chooses the optimal span to smooth the timeseries:

{{< img src="dashboards/functions/smoothing/autosmooth_illustration.png" alt="autosmooth illustration" style="width:80%;">}}

When used on a `group by` query, such as `avg by`, the same span is applied on all the timeseries. If used on several metrics in the same graph, different spans can be selected to optimally smooth each one of the metric timeseries.

The algorithm is inspired by the [ASAP algorithm][1]-you can read more about it in this [blog post][2].

The `autosmooth()` function cannot be used in monitors. Being that the span is chosen dynamically, the result of applying the function could change from minute to minute, making threshold setting difficult and leading to alert flapping.

## Exponentially weighted moving average

### Ewma 3

| Function   | Description                                                         | Example                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_3()` | Compute the exponentially weighted moving average over a span of 3. | `ewma_3(<METRIC_NAME>{*})` |

Note: The span value is the number of data points. So `ewma_3()` uses the last 3 data points to calculate the average.

Example:

If a metric `10 + x%10 {*}` increments itself by 1 starting from 10 until it drops back to 10 after 10 data points, then `ewma3(10 + x%10 {*})` has the following shape:

{{< img src="dashboards/functions/smoothing/ewma3.png" alt="EWMA3" style="width:80%;">}}

### Ewma 5

| Function   | Description                                                         | Example                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_5()` | Compute the exponentially weighted moving average over a span of 5. | `ewma_5(<METRIC_NAME>{*})` |

Note: The span value is the number of data points. So `ewma_5()` uses the last 5 data points to calculate the average.

Example:

If a metric `10 + x%10 {*}` increments itself by 1 starting from 10 until it drops back to 10 after 10 data points, then `ewma5(10 + x%10 {*})` has the following shape:

{{< img src="dashboards/functions/smoothing/ewma5.png" alt="EWMA5" style="width:80%;">}}

### Ewma 7

| Function   | Description                                                         | Example                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_7()` | Compute the exponentially weighted moving average over a span of 7. | `ewma_7(<METRIC_NAME>{*})` |

Note: The span value is the number of data points. So `ewma_7()` uses the last 7 data points to calculate the average.

### Ewma 10

| Function    | Description                                                          | Example                     |
| :----       | :-------                                                             | :---------                  |
| `ewma_10()` | Compute the exponentially weighted moving average over a span of 10. | `ewma_10(<METRIC_NAME>{*})` |

Note: The span value is the number of data points. So `ewma_10()` uses the last 10 data points to calculate the average.

Example:

If a metric `10 + x%10 {*}` increments itself by 1 starting from 10 until it drops back to 10 after 10 data points, then `ewma10(10 + x%10 {*})` has the following shape:

{{< img src="dashboards/functions/smoothing/ewma10.png" alt="EWMA10" style="width:80%;">}}

### Ewma 20

| Function    | Description                                                          | Example                     |
| :----       | :-------                                                             | :---------                  |
| `ewma_20()` | Compute the exponentially weighted moving average over a span of 20. | `ewma_20(<METRIC_NAME>{*})` |

Note: The span value is the number of data points. So `ewma_20()` uses the last 20 data points to calculate the average.

Example:

If a metric `10 + x%10 {*}` increments itself by 1 starting from 10 until it drops back to 10 after 10 data points, then `ewma20(10 + x%10 {*})` has the following shape:

{{< img src="dashboards/functions/smoothing/ewma20.png" alt="EWMA20" style="width:80%;">}}

## Median

### Median 3

| Function     | Description                      | Example                      |
| :----        | :-------                         | :---------                   |
| `median_3()` | Rolling median with a span of 3. | `median_3(<METRIC_NAME>{*})` |

Note: The span value is the number of data points. So `median_3()` uses the last 3 data points to calculate the median.

### Median 5

| Function     | Description                      | Example                      |
| :----        | :-------                         | :---------                   |
| `median_5()` | Rolling median with a span of 5. | `median_5(<METRIC_NAME>{*})` |

Note: The span value is the number of data points. So `median_5()` uses the last 5 data points to calculate the median.

### Median 7

| Function     | Description                      | Example                      |
| :----        | :-------                         | :---------                   |
| `median_7()` | Rolling median with a span of 7. | `median_7(<METRIC_NAME>{*})` |

Note: The span value is the number of data points. So `median_7()` uses the last 7 data points to calculate the median.

### Median 9

| Function     | Description                      | Example                      |
| :----        | :-------                         | :---------                   |
| `median_9()` | Rolling median with a span of 9. | `median_9(<METRIC_NAME>{*})` |

Note: The span value is the number of data points. So `median_9()` uses the last 9 data points to calculate the median.

## Weighted 
Note: Weighted() is only available when querying `SUM BY` on gauge type metrics. 

| Function       | Description                                                           | Example                        |
| :----          | :-------                                                              | :---------                     |
| `weighted()`   | Automatically removes noise while preserving the trend of the metric. | `sum:(<GAUGE_METRIC_NAME>{*}).weighted()` |

The `weighted()` function accounts for the short-lived lifespan of transient, churning tag values when summing gauge metrics in space to prevent artificial spikes. 

This function is automatically appended to queries on gauges if both of the following conditions are met: 
1. The metric has a regular submission interval that is also specified on Metrics Summary
2. The metric is queried with `SUM by` (i.e. a query string that resembles `sum: mygaugemetric{*}`)

Here is an example graph of our original query with inaccurate spikes (in purple) and the query with the properly weighted calculation (in green): 

{{< img src="dashboards/functions/smoothing/weighed.png" alt="autosmooth illustration" style="width:80%;">}}

### How does .weighted() work? 
Every metrics query has a standard order of evaluation (quick review of that order [here][3]). For example, the following query is calculated as follows: 
`sum:kubernetes.cpu.requests{*} by {kube_container_name}.rollup(avg, 60)`

1. Time aggregation -- We first sum the values across all unique tag value combinations (aka timeseries) in time for each 60s rollup time interval. The number of unique tag value combinations is actually determined by the most volatile / high granularity tag, let's say `container_id`,  on this metric. 
2. Then per `kube_container_name` (space aggregation), we sum of all averaged values as a single representative value. So summing values for each `kube_container_name` is dependent upon the number of unique `container_id`s there are for each rollup interval.
3. The `weighted()` function properly accounts for the lifespan of the churning `container_id` tag values when summing by `kube_container_name` for this gauge metric.

#### Example
Let's suppose our gauge metric's submission interval is defined at 10s. And we're graphing a datapoint every 60s in time. Our raw data could resemble: 
(INSERT TABLE HERE) 

1. _Time Aggregation -- Rolling up data_
With time aggregation, we're rolling up data every 60s with either `avg` (without weighted) or the proposed `weighted_avg`: 
(INSERT TABLE HERE) 
3. _Space Aggregation_ 

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
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: http://futuredata.stanford.edu/asap
[2]: https://www.datadoghq.com/blog/auto-smoother-asap
[3]: https://docs.datadoghq.com/metrics/#anatomy-of-a-metric-query
