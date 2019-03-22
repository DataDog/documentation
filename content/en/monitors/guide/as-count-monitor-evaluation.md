---
title: as_count() monitor evaluation with division
kind: guide
aliases:
    - /monitors/faq/as-count-monitor-evaluation
---

## Overview

Monitors involving arithmetic division and at least 1 `as_count` modifier use a separate evaluation path than other monitors. This impacts queries of the format `A.as_count() OP B.as_count()`, where `OP` is division (`/`). Queries where OP is `+`, `-` or `*` are not impacted. 

## Example

You have 2 metrics, *A* and *B*:

* *A* has datapoints (a0, a1, ..., ax)
* *B* has datapoints (b0, b1, ..., bx)

Call the current evaluation path for `as_count` monitors with division query `as_count_eval_path` and all other monitors evaluation path `classic_eval_path`.

Suppose Datadog monitors an error rate, which is calculated as:

`sum:requests.error{*}.as_count() / sum:requests.total{*}.as_count()`

Take this query for the time frame between *11:00:00* and *11:05:00*:

`sum(last_5m): sum:requests.error{*}.as_count() / sum:requests.total{*}.as_count()`

For the 5 min timeframe there are 5 timeseries points (zeros excluded):

**Numerator**, `sum:requests.error{*}.as_count()`:

```
| Timestamp             | Value       |
| :-------------------- | :---------- |
| 2018-03-13 11:00:30   | 1           |
| 2018-03-13 11:01:30   | 2           |
| 2018-03-13 11:02:40   | 3           |
| 2018-03-13 11:03:30   | 4           |
| 2018-03-13 11:04:40   | 5           |
```

**Denominator**, `sum:requests.total{*}.as_count()`:

```
| Timestamp             | Value    |
| :-------------------- | :------- |
| 2018-03-13 11:00:30   | 5        |
| 2018-03-13 11:01:30   | 5        |
| 2018-03-13 11:02:40   | 5        |
| 2018-03-13 11:03:30   | 5        |
| 2018-03-13 11:04:40   | 5        |
```

Here is the result of the evaluation depending of the path:

| Path                    | Behavior                                         | Expanded expression         | Result  |
| :--------               | :--------                                        | :-----                      | :-----  |
| **`as_count_eval_path`** | Aggregation function applied *before* evaluation | **(1+2+...+5)/(5+5+...+5)** | **0.6** |
| **`classic_eval_path`**     | Aggregation function applied *after* evaluation  | **(1/5 + 2/5 + ... + 5/5)** | **3**   |

Notice that the results are completely different. Remember that each query consists of an underlying time-series, which we refer to as (a0, a1, ..., ).:

| Path | Behavior | Expanded expression |
|:--------|:--------|:--------|
|**`as_count_eval_path`** | Aggregation function applied *before* evaluation | **(a0 + a1 + ... + a4)/(b0 + b1 + ... + b4)** |
|**`classic_eval_path`** | Aggregation function applied *after* evaluation |**(a0/b0 + a1/b2 + ... + a4/b4)**|


### Sparse metric

In case of sparse or *0* metrics in the denominator some results are rejected in case of `classic_eval_path`.

Let's have following metrics:

* `A = (10, 10, 10)`
* `B = (0, 1, -)`

Here is the behavior difference:

| Path                 | Evaluation of `A/B`            | Result   |
| :------              | :------                        | :------- |
| `as_count_eval_path` | (10 + 10 + 10) / (0 + 1 + NaN) | 30       |
| `classic_eval_path`  | 10/0 + 10/1 + 10/NaN           | 10       |

Note that both evaluations are correct -- it depends on your intention.

## Workaround

Since this special behavior is tied to the `as_count` modifier, replace `as_count()` with the `as_rate()` operator to make your intended query explicit. **Reminder: this replacement should only be done for queries with division.**

*Example:* Suppose you wish to monitor the error rate of a service:

If you want to be alerted when the error rate is above 50% in total during the past 5 min. You might have a query like:
`sum(last_5m):sum:requests.error{*}.as_count() / sum:requests.total{*}.as_count() > 0.5 `

To correctly rewrite it in the explicit format, the query can be rewritten like:

`sum(last_5m): ( default(sum:requests.error{*}.as_rate(),0) / sum:requests.total{*}.as_rate() )`

[Reach out to the Datadog support team][1] if you have any questions regarding this logic.

[1]: /help
