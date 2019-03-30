---
title: Division in Monitor Evaluations
kind: guide
aliases:
  - /monitors/faq/Division-in-Monitor-Evaluations
---

## Overview

Creating an alert based on a query with division is a common practice. There are some tools and behaviors that should be considered to ensure monitor settings are appropriate for evaluating these queries as intended.

## Error Rate Example

Suppose you want to monitor an error rate over 5 minutes using the metrics, `requests.error` and `requests.total`. There are 2 possible ways to perform this calculation.

Consider a single evaluation performed with these aligned timeseries points for the 5 min timeframe:

**Numerator**: `sum:requests.error{*}`

```
| Timestamp             | Value       |
| :-------------------- | :---------- |
| 2018-03-13 11:00:30   | 1           |
| 2018-03-13 11:01:30   | 2           |
| 2018-03-13 11:02:40   | 3           |
| 2018-03-13 11:03:30   | 4           |
| 2018-03-13 11:04:40   | 5           |
```

**Denominator**: `sum:requests.total{*}`

```
| Timestamp             | Value    |
| :-------------------- | :------- |
| 2018-03-13 11:00:30   | 5        |
| 2018-03-13 11:01:30   | 5        |
| 2018-03-13 11:02:40   | 5        |
| 2018-03-13 11:03:30   | 5        |
| 2018-03-13 11:04:40   | 5        |
```

### Division with `as_count()`

Monitors involving division and at least 1 `as_count()` modifier use a separate evaluation path than other monitors. This impacts queries of the format `queryA.as_count() / queryB.as_count()`. Queries without division (`+`, `-`, or `*`) are not impacted.

Refer this query **`as_count_eval_path`**:

```
sum(last_5m): sum:requests.error{*}.as_count() / sum:requests.total{*}.as_count()
```

and this query **`classic_eval_path`**\*:

```
sum(last_5m): sum:requests.error{*}.as_rate() / sum:requests.total{*}.as_rate()
```

Compare the result of the evaluation depending of the path:

| Path                     | Behavior                                       | Expanded expression         | Result  |
| :----------------------- | :--------------------------------------------- | :-------------------------- | :------ |
| **`as_count_eval_path`** | Aggregation function applied _before_ division | **(1+2+...+5)/(5+5+...+5)** | **0.6** |
| **`classic_eval_path`**  | Aggregation function applied _after_ division  | **(1/5 + 2/5 + ... + 5/5)** | **3**   |

You could also use `avg` and `as_rate()` to get the same result as `sum` and `as_count()` :

```
avg(last_5m): sum:requests.error{*}.as_rate() / sum:requests.total{*}.as_rate()
```

| Path                    | Behavior                                      | Expanded expression           | Result  |
| :---------------------- | :-------------------------------------------- | :---------------------------- | :------ |
| **`classic_eval_path`** | Aggregation function applied _after_ division | **(1/5 + 2/5 + ... + 5/5)/5** | **0.6** |

_Note that all evaluations above are mathematically correct. Choose a method to suit your intention._

\*If the metric is a rate, you can optionally omit `.as_rate()`. Include this modifier to be explicit.

## Sparse Metrics

In case of sparse or _0_ metrics in the denominator some results are rejected in case of the `classic_eval_path`.

Let's consider the following metric values:

- `A = (10, 10, 10)`
- `B = (0, 1, -)`

Here is the behavior difference:

| Path                 | Evaluation of `A/B`                | Result |
| :------------------- | :--------------------------------- | :----- |
| `as_count_eval_path` | **(10 + 10 + 10) / (0 + 1 + NaN)** | 30     |
| `classic_eval_path`  | **10/0 + 10/1 + 10/NaN**           | 10     |

_Note that both of these evaluations are mathematically correct._

If the evaluation window includes many "null" buckets (**10/NaN + 10/Nan + ... + 10/Nan**) the evaluations will be "skipped" so you may need to make adjustments to your metric or use one of the workarounds below.

## Workarounds for Sparse and Misaligned Metrics

## `.rollup()`

You can apply a `.rollup()` function to ensure all time buckets being evaluated have valid values. This function can be similarly useful for any metric with gaps, regardless of whether the query involves artithmetic.

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

The `rollup()` function will create time buckets based on time intervals you define, which can be useful for ignoring "gaps" in your data if you set a rollup interval greater than the length of the gaps in your metric. In this case, the new buckets are the sums of the values in a 60 second window.

\*Notice that the value at timestamp `2019-03-29 11:02:00` for the modified query doesn't align with the value in the chart above. This is because the `.rollup()` function is aligned to UNIX time. In this case, we can assume there is a value of `1` at `2019-03-29 11:02:30` which is in the rollup window, but not the monitor evaluation window. To avoid triggering your monitor based on an incomplete rollup interval containing only a small sample of data, you should add an **Evaluation Delay** to the monitor of at least the length of the rollup interval.

## `.fill()`

You can apply a `.fill()` function to ensure all time buckets have valid values. For **gauge** metric types, the default interpolation is linear or `.fill(linear)`. For **count** and **rate** type metrics, the default is `.fill(null)`, which disables interpolation.

**Original**: `sum:my_metric.misaligned.groups.rate{env:a} by {timer,env}`

```
| Timestamp             | timer:1min,env:a    | timer:2min,env:a    |
| :-------------------- | :------------------ | :------------------ |
| 2019-03-29 12:00:00   | 1                   | 1                   |
| 2019-03-29 12:01:00   | 1                   |                     |
| 2019-03-29 12:02:00   | 1                   | 1                   |
| 2019-03-29 12:03:00   | 1                   |                     |
| 2019-03-29 12:04:00   | 1                   | 1                   |
```

Let's assume that `my_metric.misaligned.groups` is metric type **rate** so there is no interpolation as default. Consider this query:

```
sum(last_5m):sum:my_metric.misaligned.groups.rate{timer:1min,env:a} / sum:my_metric.misaligned.groups.rate{timer:2min,env:a}
```

You would see the following

| Path                | Evaluation                          | Result |
| :------------------ | :---------------------------------- | :----- |
| `classic_eval_path` | **1/1 + 1/Nan + 1/1 + 1/Nan + 1/1** | 3      |

By adding interpolation, you can ensure that metrics at every time interval

**Modified**: `sum:my_metric.misaligned.groups.rate{env:a} by {timer,env}.fill(last)`

```
| Timestamp             | timer:1min,env:a    | timer:2min,env:a    |
| :-------------------- | :------------------ | :------------------ |
| 2019-03-29 12:00:00   | 1                   | 1                   |
| 2019-03-29 12:01:00   | 1                   | 1                   |
| 2019-03-29 12:02:00   | 1                   | 1                   |
| 2019-03-29 12:03:00   | 1                   | 1                   |
| 2019-03-29 12:04:00   | 1                   | 1                   |
```

Modified query:

```
sum(last_5m):sum:my_metric.misaligned.groups.rate{timer:1min,env:a} / sum:my_metric.misaligned.groups.rate{timer:2min,env:a}.fill(last)
```

With `.fill(last)` the new result would be:

| Path                | Evaluation                      | Result |
| :------------------ | :------------------------------ | :----- |
| `classic_eval_path` | **1/1 + 1/1 + 1/1 + 1/1 + 1/1** | 5      |

## Short Evaluation Windows

Monitors can have timing issues with division queries over short evaluation windows. Considering that the transmission of a metric commonly happens through this standard path below, it is not reasonable to expect this to happen instantaneously:

```
Datadog Agent (15-20s) -> The Web -> Datadog Intake and Processing -> Monitor Query
```

If your monitor query requires division over an evaluation window of 1 minute, the numerator and denominator represent time buckets on the order of a few seconds. Whether through a delay in any part of the pipeline, or a query that is slowed due to a large number of contexts, querying the available values for the most recent time buckets could produce incomplete results for one of the operands, despite the metric being available soon after evaluation time.

```
| Timestamp             | sum:my_num{*}       | sum:my_denom{*}     |
| :-------------------- | :------------------ | :------------------ |
| ...                   | ...                 | ...                 |
| 2019-03-29 13:30:50   | 900                 | 1000                |
| 2019-03-29 13:30:52   | 900                 | 1000                |
| 2019-03-29 13:30:54   | 900                 | 1000                |
| 2019-03-29 13:30:56   | 12 (inc)            | 850                 |
```

In the case of a query like `avg(last_1m):sum:my_num{*}/sum:my_denom{*}`, the average value could be skewed quite a bit and could trigger your monitor unintentionally.

Therefore, adding a short evaluation delay of 30-60 seconds to adjust for a reasonable expectation of data transmission and processing should be considered for queries with divison over short evaluation windows, especially for metrics with a large number of tags.

[Reach out to the Datadog support team][1] if you have any questions regarding this logic.

[1]: /help
