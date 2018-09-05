---
title: as_count() monitor evaluation changes
kind: faq
---

## Overview

Monitors that have the `as_count` modifier use a separate evaluation path than other monitors. In certain use cases this can result in unexpected behavior. We intend to migrate all monitors with `as_count` to the same evaluation path as other monitors, but this doc explains the underlying issue and will guide you through the migration process.

Let's call the current evaluation path for `as_count` monitors `current_eval_path` and the new one `new_eval_path`.

The difference between those two evaluation paths is that complex monitor queries, especially those that have division, may produce **unintended results** depending on the time aggregation function. Let's say that you have 2 metrics, *A* and *B*:

* *A* has datapoints (a0, a1, ..., ax)
* *B* has datapoints (b0, b1, ..., bx)

#### Why ?

Many of our customers need to be alerted when the total global error rate over a certain time-period is too high.

Normal timeseries graphs compute the point by point ratio so it wasn't possible to accommodate such an important use case as what's my ratio of request error. Thus an exception has been made for monitors involving arithmetic and at least 1 `as_count` modifier.

This impacts queries of the format `A.as_count() OP B.as_count()`, where OP is division (`/`). Queries where OP is `+`, `-` or `*` are not impacted.

## Example

Suppose we wish to monitor an error rate, which we calculate as:

`sum:requests.error{*}.as_count() / sum:requests.total{*}.as_count()`

Let's take this query for the time frame between *11:00:00* and *11:05:00*:

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

| Path | Behavior | Expanded expression | Result|
|:--------|:--------|:-----|:-----|
|**`current_eval_path`** | Aggregation function applied *before* evaluation | **(1+2+...+5)/(5+5+...+5)** | **0.6**|
|**`new_eval_path`** | Aggregation function applied *after* evaluation|**(1/5 + 2/5 + ... + 5/5)**|**3**|

Notice that the results are completely different. Remember that each query consists of an underlying time-series, which we refer to as (a0, a1, ..., ).:

| Path | Behavior | Expanded expression |
|:--------|:--------|:--------|
|**`current_eval_path`** | Aggregation function applied *before* evaluation | **(a0 + a1 + ... + a4)/(b0 + b1 + ... + b4)** |
|**`new_eval_path`** | Aggregation function applied *after* evaluation |**(a0/b0 + a1/b2 + ... + a4/b4)**|


### Sparse metric problem

In case of sparse or *0* metrics in the denominator some results are rejected in case of `new_eval_path`.

Let's have following metrics:

* `A = (10, 10, 10)`
* `B = (0, 1, -)`

Here is the behavior difference:

| Path | Evaluation of `A/B` | Result |
|:------|:------|:-------|
| `current_eval_path` | (10 + 10 + 10) / (0 + 1 + NaN) | 30 |
| `new_eval_path` | 10/0 + 10/1 + 10/NaN | 10 |

Note that both evaluations are correct -- it depends on your intention.

## Workaround

Since this special behavior is tied to the `as_count` modifier, we encourage replacing `as_count()` with the `as_rate()` operator to make your intended query explicit. **Reminder: this replacement should only be done for queries with division.**

*Example:* Suppose you wish to monitor the error rate of a service:

Suppose you want to be alerted when the error rate is above 50% in total during the past 5 min. You might have a query like:
`sum(last_5m):sum:requests.error{*}.as_count() / sum:requests.total{*}.as_count() > 0.5 `

To correctly rewrite it in the explicit format, the query can be rewritten like:

`sum(last_5m): ( default(sum:requests.error{*}.as_rate(),0) / sum:requests.total{*}.as_rate() )`

[Reach out to the Datadog support team][1] if you have any questions regarding these changes.

[1]: /help
