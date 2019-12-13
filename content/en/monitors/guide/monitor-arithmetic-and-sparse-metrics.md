---
title: Monitor Arithmetic and Sparse Metrics
kind: guide
aliases:
  - /monitors/guide/monitor-arithmetic-and-sparse-metrics
---

## Overview

Creating an alert based on a query with arithmetic is a common practice. There are some tools and behaviors that should be considered to ensure a monitor's settings are appropriate for evaluating these queries as intended.

## Sparse Metrics

In the case of sparse or _0_ metrics in the denominator, some results can be rejected.

Consider the following metric values:

- `A = (10, 10, 10)`
- `B = (0, 1, -)`

For the formula `a/b`, the monitor would evaluate:

```
10/0 + 10/1 + 10/NaN = 10
```

If the evaluation window includes many "null" buckets (**10/NaN + 10/Nan + ... + 10/Nan**) the evaluations will be "skipped," so you may need to make adjustments to your metric or use one of the workarounds below.

## Workarounds for sparse and misaligned metrics

### `.rollup()`

You can apply a `.rollup()` function to ensure all time buckets being evaluated have valid values. This function can be similarly useful for any metric with gaps, regardless of whether the query involves arithmetic.

**Original**: `sum:my_metric.is.sparse{*}`

```
| Timestamp             | Value    |
| :-------------------- | :------- |
| 2019-03-29 11:00:00   | 1        |
| 2019-03-29 11:00:30   |          |
| 2019-03-29 11:01:00   | 2        |
| 2019-03-29 11:01:30   | 1        |
| 2019-03-29 11:02:00   |          |
```

**Modified**: `sum:my_metric.is.sparse{*}.rollup(sum,60)`

```
| Timestamp             | Value    |
| :-------------------- | :------- |
| 2019-03-29 11:00:00   | 1        |
| 2019-03-29 11:01:00   | 3        |
| 2019-03-29 11:02:00   | 1*       |
```

The `rollup()` function creates time buckets based on time intervals you define, which can be useful for ignoring "gaps" in your data if you set a rollup interval greater than the length of the gaps in your metric. In this case, the new buckets are the sums of the values in a 60 second window.

\*Notice that the value at timestamp `2019-03-29 11:02:00` for the modified query doesn't align with the value in the chart above. This is because the `.rollup()` function is aligned to UNIX time. In this case, you can assume there is a value of `1` at `2019-03-29 11:02:30`, which is in the rollup window, but not the monitor evaluation window. To avoid triggering your monitor based on an incomplete rollup interval containing only a small sample of data, add an **Evaluation Delay** to the monitor of at least the length of the rollup interval.

### `.fill()`

You can apply a `.fill()` function to ensure all time buckets have valid values. For **gauge** metric types, the default interpolation is linear or `.fill(linear)` for 5 minutes. For **count** and **rate** type metrics, the default is `.fill(null)`, which disables interpolation. Datadog generally recommends against using interpolation for count/rate metrics in monitors.

**Original**: `sum:my_metric.has_gaps.gauge{env:a} by {timer,env}`

```
| Timestamp             | timer:norm,env:a    | timer:offset,env:a  |
| :-------------------- | :------------------ | :------------------ |
| 2019-03-29 12:00:00   | 1                   |                     |
| 2019-03-29 12:05:00   |                     | 1                   |
| 2019-03-29 12:10:00   | 0                   |                     |
| 2019-03-29 12:15:00   |                     | 1                   |
| 2019-03-29 12:20:00   | 1                   |                     |
| 2019-03-29 12:25:00   |                     | 1                   |
| 2019-03-29 12:30:00   | 1                   |                     |
```

Assume that `my_metric.has_gaps.gauge` is metric type **gauge** so there is linear interpolation for 5 minutes as default, but the metric reports once every 10 minutes. Consider this query:

```
sum(last_30m):sum:my_metric.has_gaps.gauge{timer:norm,env:a} / sum:my_metric.has_gaps.gauge{timer:offset,env:a}
```

You would see mainly "skipped" evaluations.

| Path                | Evaluation                               | Result |
| :------------------ | :--------------------------------------- | :----- |
| `classic_eval_path` | **1/Nan + Nan/1 + ... + 1/Nan + Nan/1**  |   N/A  |

By adjusting the interpolation, you can ensure that there are metrics at every time interval.

**Modified**: `sum:my_metric.has_gaps.gauge{env:a} by {timer,env}.fill(last,900)`

```
| Timestamp             | timer:norm,env:a    | timer:offset,env:a  |
| :-------------------- | :------------------ | :------------------ |
| 2019-03-29 12:00:00   | 1                   | (1)                 |
| 2019-03-29 12:05:00   | 1                   | 1                   |
| 2019-03-29 12:10:00   | 0                   | 1                   |
| 2019-03-29 12:15:00   | 0                   | 1                   |
| 2019-03-29 12:20:00   | 1                   | 1                   |
| 2019-03-29 12:25:00   | 1                   | 1                   |
| 2019-03-29 12:30:00   | 1                   | 1                   |
```

Modified query:

```
sum(last_30m):sum:my_metric.has_gaps.gauge{timer:norm,env:a}.fill(last,900) / sum:my_metric.has_gaps.gauge{timer:offset,env:a}.fill(last,900)
```

With `.fill(last,900)`, the new result is:

| Path                | Evaluation                                    | Result |
| :------------------ | :-------------------------------------------- | :----- |
| `classic_eval_path` | **(1)/1 + 1/1 + 0/1 + 0/1 + 1/1 + 1/1 + 1/1** | 5      |


[Reach out to the Datadog support team][1] if you have any questions regarding this logic.

[1]: /help
