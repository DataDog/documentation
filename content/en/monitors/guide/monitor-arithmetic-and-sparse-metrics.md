---
title: Monitor Arithmetic and Sparse Metrics
kind: guide
aliases:
  - /monitors/guide/monitor-arithmetic-and-sparse-metrics
---

## Overview

Creating an alert based on a query with arithmetic is a common practice. There are some tools and behaviors that should be considered to ensure a monitor's settings are appropriate for evaluating these queries as intended.

## Sparse metrics

In the case of sparse or _0_ metrics in the denominator, some results can be rejected.

Consider the following metric values:

* `A = (10, 10, 10)`
* `B = (0, 1, -)`

For the formula `a/b`, the monitor would evaluate:

```text
10/0 + 10/1 + 10/NaN = 10
```

If the evaluation window includes many "null" buckets (**10/NaN + 10/Nan + ... + 10/Nan**) the evaluations will be "skipped," so you may need to make adjustments to your metric or use one of the workarounds below.

## Workarounds for sparse and misaligned metrics

### `.fill()`

You can apply a `.fill()` function to ensure all time buckets have valid values. For **gauge** metric types, the default interpolation is linear or `.fill(linear)` for 5 minutes. For **count** and **rate** type metrics, the default is `.fill(null)`, which disables interpolation. Datadog generally recommends against using interpolation for count/rate metrics in monitors.

**Original**: `sum:my_metric.has_gaps.gauge{env:a} by {timer,env}`

```text
| Timestamp           | timer:norm,env:a | timer:offset,env:a |
|:--------------------|:-----------------|:-------------------|
| 2019-03-29 12:00:00 | 1                |                    |
| 2019-03-29 12:05:00 |                  | 1                  |
| 2019-03-29 12:10:00 | 0                |                    |
| 2019-03-29 12:15:00 |                  | 1                  |
| 2019-03-29 12:20:00 | 1                |                    |
| 2019-03-29 12:25:00 |                  | 1                  |
| 2019-03-29 12:30:00 | 1                |                    |
```

Assume that `my_metric.has_gaps.gauge` is metric type **gauge** so there is linear interpolation for 5 minutes as default, but the metric reports once every 10 minutes. Consider this query:

```text
sum(last_30m):sum:my_metric.has_gaps.gauge{timer:norm,env:a} / sum:my_metric.has_gaps.gauge{timer:offset,env:a}
```

You would see mainly "skipped" evaluations.

| Path                | Evaluation                              | Result |
|:--------------------|:----------------------------------------|:-------|
| `classic_eval_path` | **1/Nan + Nan/1 + ... + 1/Nan + Nan/1** | N/A    |

By adjusting the interpolation, you can ensure that there are metrics at every time interval.

**Modified**: `sum:my_metric.has_gaps.gauge{env:a} by {timer,env}.fill(last,900)`

```text
| Timestamp           | timer:norm,env:a | timer:offset,env:a |
|:--------------------|:-----------------|:-------------------|
| 2019-03-29 12:00:00 | 1                | (1)                |
| 2019-03-29 12:05:00 | 1                | 1                  |
| 2019-03-29 12:10:00 | 0                | 1                  |
| 2019-03-29 12:15:00 | 0                | 1                  |
| 2019-03-29 12:20:00 | 1                | 1                  |
| 2019-03-29 12:25:00 | 1                | 1                  |
| 2019-03-29 12:30:00 | 1                | 1                  |
```

Modified query:

```text
sum(last_30m):sum:my_metric.has_gaps.gauge{timer:norm,env:a}.fill(last,900) / sum:my_metric.has_gaps.gauge{timer:offset,env:a}.fill(last,900)
```

With `.fill(last,900)`, the new result is:

| Path                | Evaluation                                    | Result |
|:--------------------|:----------------------------------------------|:-------|
| `classic_eval_path` | **(1)/1 + 1/1 + 0/1 + 0/1 + 1/1 + 1/1 + 1/1** | 5      |

### Short evaluation windows

It is possible to have timing issues in monitors with division over short evaluation windows. If your monitor query requires division over an evaluation window of one minute, the numerator and denominator represent time buckets on the order of a few seconds. If metrics for the numerator and denominator aren't both available at query time, you could get unwanted evaluation values.

```
| Timestamp             | sum:my_num{*}       | sum:my_denom{*}     |
| :-------------------- | :------------------ | :------------------ |
| ...                   | ...                 | ...                 |
| 2019-03-29 13:30:50   | 900                 | 1000                |
| 2019-03-29 13:30:52   | 900                 | 1000                |
| 2019-03-29 13:30:54   | 900                 | 1000                |
| 2019-03-29 13:30:56   | 120 (inc)           | 850 (inc)           |
```

In the case of a query like `min(last_1m):sum:my_num{*}/sum:my_denom{*}`, the minimum value could be skewed and could trigger your monitor unintentionally.

Therefore, adding a short evaluation delay of 30-60 seconds to adjust for timing issues should be considered for queries with divison over short evaluation windows. Alternatively, changing to a five minute evaluation window can help.

[Reach out to the Datadog support team][1] if you have any questions regarding this logic.

[1]: /help/
