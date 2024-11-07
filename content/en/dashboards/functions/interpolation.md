---
title: Interpolation
aliases:
    - /graphing/functions/interpolation/
further_reading:
- link: "/dashboards/functions/"
  tag: "Documentation"
  text: "Other function types"
- link: "/metrics/guide/interpolation-the-fill-modifier-explained/"
  tag: "Documentation"
  text: "Interpolation and the Fill Modifier"
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

* `LIMIT` [*optional*, *default*=**300**, *maximum*=**600**]: The interpolation limit (in seconds) that represents the maximum size of a gap you want to interpolate.

Read [Interpolation and the Fill Modifier][1] for a detailed explanation of the `.fill()` function and its impact on interpolation.

## Default zero

| Function         | Description                             | Example                          |
| ---------------- | --------------------------------------- | -------------------------------- |
| `default_zero()` | Adds a default value to sparse metrics. | `default_zero(system.load.1{*})` |

The `default_zero()` function fills empty time intervals using the value 0 or, if interpolation is enabled, with interpolation. **Note**: Interpolation is enabled by default for `GAUGE` type metrics. Like most functions, `default_zero()` is applied **after** [time and space aggregation][2].

### Use cases

The `default_zero()` function is intended to address the following use cases (though it may also work for other use cases):

- Aligning gauges as 0 when performing arithmetic on sparse metrics (note: `COUNT` or `RATE` type metrics queried `as_count()` or `as_rate()` are _always_ aligned as 0, so using `default_zero()` does not change how they are aligned; it only affects `GAUGE` type metrics).
- Resolving monitors before they enter a no-data condition. This works for both simple and multi alerts, but the value 0 must not cause the monitor to trigger. For example, this would not work for a monitor with the query `avg(last_10m):avg:system.cpu.idle{*} < 10` because this monitor triggers (instead of resolving) when it evaluates to 0. Avoid using this function for error rate monitors with `as_count()` queries. See the [as_count() in Monitor Evaluations guide][3] for more details.
- Filling in empty intervals in sparse (but nonempty) series for visual reasons or to affect the min/max/average of a timeseries in a monitor evaluation. If the evaluation window doesn't contain any points of data, `default_zero()` has no effect.
- Showing the value 0 on the timeseries widget when there is no data.

### Example

To demonstrate how the `default_zero()` function works, consider this single point created for a custom metric [using DogStatsD][4]:

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

The `default_zero()` function interpolates this point five minutes forward in time (the default interpolation limit for gauges), then fills the remaining empty intervals with zeros:

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/guide/interpolation-the-fill-modifier-explained/
[2]: /dashboards/functions/#add-a-function
[3]: /monitors/guide/as-count-in-monitor-evaluations/
[4]: /metrics/
