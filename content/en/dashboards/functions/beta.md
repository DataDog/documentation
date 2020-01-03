---
title: Beta Functions
kind: documentation
aliases:
    - /graphing/functions/beta/
---

Beta functions are available by editing the query JSON directly.

## Default Zero

| Function         | Description                             | Example                          |
| ---------------- | --------------------------------------- | -------------------------------- |
| `default_zero()` | Adds a default value to sparse metrics. | `default_zero(system.load.1{*})` |

The `default_zero` function fills empty intervals using interpolation (if interpolation is enabled, which is the default for `GAUGE` type metrics) or the value 0. Like most functions, it is evaluated **after** [time and space aggregation][1].

### Use Cases

The `default_zero` function is intended to address the following use cases (though it may also work for other use cases):

- Aligning gauges as 0 when performing arithmetic on sparse metrics (note: `COUNT` or `RATE` type metrics queried `as_count()` or `as_rate()` are _always_ aligned as 0, so using `default_zero` does not change how they are aligned; it only affects `GAUGE` type metrics).
- Resolving monitors from a no-data condition. This works for both simple and multi-alerts, but the value 0 must not cause the monitor to trigger. For example, this would not work for a monitor with the query `avg(last_10m):avg:system.cpu.idle{*} < 10` because this monitor triggers (instead of resolving) when it evaluates to 0. Avoid using this function for error rate monitors with `as_count()` queries (see [this article][2] for details).
- Filling in empty intervals in sparse (but nonempty) series for visual reasons or to affect the min/max/average of a timeseries in a monitor evaluation.
- Showing the value 0 on the query value widget when there is no data.

### Example

To demonstrate how the `default_zero` function works, consider this single point created for a custom metric [using DogStatsD][3]:

```text
$ echo -n "custom_metric:1|g" | nc -4u -w0 127.0.0.1 8125
```

When this metric is queried over the past 30 minutes, there is a single timestamp, because only one of the query's rollup intervals has a point:

```text
avg:custom_metric{*}

+---------------------+---------------+
| Timestamp           | custom_metric |
+---------------------+---------------+
| ---------           | ---------     |
| 2019-04-17 17:45:00 | 1             |
+---------------------+---------------+
```

The `default_zero` function interpolates this point five minutes forward in time (the default interpolation limit for gauges), then fills the remaining empty intervals with zeros:

```text
default_zero(avg:custom_metric{*})

+---------------------+-----------------------------+
| Timestamp           | default_zero(custom_metric) |
+---------------------+-----------------------------+
| ---------           | ---------                   |
| 2019-04-17 17:30:00 | 0                           |
| 2019-04-17 17:31:00 | 0                           |
...
| 2019-04-17 17:44:00 | 0                           |
| 2019-04-17 17:45:00 | 1                           |
| 2019-04-17 17:46:00 | 1                           |
| 2019-04-17 17:47:00 | 1                           |
| 2019-04-17 17:48:00 | 1                           |
| 2019-04-17 17:49:00 | 1                           |
| 2019-04-17 17:50:00 | 1                           |
| 2019-04-17 17:51:00 | 0                           |
| 2019-04-17 17:52:00 | 0                           |
...
+---------------------+-----------------------------+
```

## Exclude Null

| Function         | Description                                    | Example                                        |
|------------------|------------------------------------------------|------------------------------------------------|
| `exclude_null()` | Remove N/A groups from your graph or top list. | `exclude_null(avg:system.load.1{*} by {host})` |

## Rolling Average

| Function          | Description                                    | Example                           |
|-------------------|------------------------------------------------|-----------------------------------|
| `rollingavg_5()`  | Compute the rolling average over a span of 5.  | `rollingavg_5(system.load.1{*})`  |
| `rollingavg_13()` | Compute the rolling average over a span of 13. | `rollingavg_13(system.load.1{*})` |
| `rollingavg_21()` | Compute the rolling average over a span of 21. | `rollingavg_21(system.load.1{*})` |
| `rollingavg_29()` | Compute the rolling average over a span of 29. | `rollingavg_29(system.load.1{*})` |

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /getting_started/from_the_query_to_the_graph/#proceed-to-space-aggregation
[2]: /monitors/guide/as-count-in-monitor-evaluations
[3]: /developers/metrics
