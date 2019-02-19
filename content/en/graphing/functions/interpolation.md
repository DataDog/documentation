---
title: Interpolation
kind: documentation
---

## Fill

| Function | Description                                       | Example                                    |
| :----    | :-------                                          | :---------                                 |
| `fill()` | Interpolate missing metric values for the metric. | `<METRIC_NAME>{*}.fill(<METHOD>, <LIMIT>)` |

The `fill()` function has two parameters:

* **`METHOD`**: The function to use as an interpolation method; choose from:
    * **linear**: Gives you a linear interpolation between the beginning and the end of the gap.
    * **last**: Fills the gap with the last value of the gap.
    * **zero**: Fills the gap with a zero value.
    * **null**: Deactivates the interpolation.

* `LIMIT`: The interpolation limit (in seconds) that represents the maximum size of a gap you want to interpolate.

## Default

`default()`

The default function function fills empty intervals with a default or interpolated (within the interpolation time limit) value. It has the following syntax:

```
default(<EXPRESSION>, <DEFAULT_VALUE>)
```

Like other functions, the default function is evaluated **after** [time and space aggregation][1]. If interpolation is enabled, the `default()` function first fills all empty values within the interpolation time limit with interpolated values. 
It then adds points with the specified default value to every interval in the query's span that doesn't already have a value.

Note: Avoid using the `default()` function with the `as_count()` function.

### Example

To demonstrate how the default function works, we created two points for a custom metric, each with a single `key:value` tag, with different values for each point:

```
$ echo -n "custom_metric:60|g|#key1:val1" | nc -4u -w0 127.0.0.1 8125
$ echo -n "custom_metric:60|g|#key1:val2" | nc -4u -w0 127.0.0.1 8125
```

When this metric is queried over the last hour, there is a single timestamp, because only one of the query's rollup intervals has a point:

```
avg:custom_metric{*} by {key1}

+---------------------+-----------+-----------+
| Timestamp           | key1:val1 | key1:val2 |
| ---------           | --------- | --------- |
| 2017-10-25 20:08:00 | 60        | 60        |
+---------------------+-----------+-----------+
```

The default function adds the value passed as the second argument (it doesn't need to be `0`) to any interval that doesn't have data:

```
default(avg:custom_metric{*} by {key1}, 0)

+---------------------+-----------+-----------+
| Timestamp           | key1:val1 | key1:val2 |
| ---------           | --------- | --------- |
| 2017-10-25 19:25:00 | 0         | 0         |
...
| 2017-10-25 20:07:30 | 0         | 0         |
| 2017-10-25 20:08:00 | 60        | 60        |
| 2017-10-25 20:08:30 | 0         | 0         |
...
| 2017-10-25 20:24:00 | 0         | 0         |
| 2017-10-25 20:24:30 | 0         | 0         |
| 2017-10-25 20:25:00 | 0         | 0         |
+---------------------+-----------+-----------+
```

The preceding queries were both grouped by the `key1` tag, just like the query for a multi-alert monitor. If no timeseries are returned for a grouped query, the default function returns a single value, `*`.

### Multi-alert monitor

The default function fills in empty intervals in the timeseries that it receives. It does not create timeseries for groups that are absent, since it does not know which groups to create.

#### DogStatsD counters

The Agent automatically sends zeroes for five minutes after the last value was reported for DogStatsD counters. It is sometimes possible to use this feature to automatically resolve monitors for such metrics. Note that Agent version 6 allows you to configure the amount of time for which zeroes are sent.

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /getting_started/from_the_query_to_the_graph/#proceed-to-space-aggregation
