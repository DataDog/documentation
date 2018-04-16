---
title: as_count() monitor evaluation changes
kind: faq
---

## Overview

Currently all monitors that have the `as_count` modifier are using a separate evaluation path than the other monitors. In certain use-cases this this can result in unexpected behavior. **We intend to migrate all monitors with `as_count` to the same evaluation path as other monitors.**

Let's call the current evaluation path for `as_count` monitors **`current_eva_path`** and the new one **`new_eva_path`**.  

The difference between those two evaluation paths is that complex monitor queries, **especially those that have division or multiplication**, produce different results depending on the time aggregation function:

| Path | Behavior | Expanded expression |
|:--------|:--------|:--------|
|**`current_eva_path`** | Aggregation function applied **before** evaluation | **(a0+...+a4)/(b0+...+b4)** |
|**`new_eva_path`** | Aggregation function applied **after** evaluation |**(a0/b0+...+a4/b4)**|

#### Why ?

Many of our customers need to be alerted when the total global error rate over a certain time-period is too high.

Normal timeserie graphs like:  

`sum:requests.error{*}.as_count()/ sum:requests.total{*}.as_count()` 

compute the point by point ratio so it wasn't possible to accommodate such an important use case as what's my ratio of request error. Thus an exception has been made for monitors involving arithmetics and at least 1 `as_count` modifier.

## Example

Let’s take this query for the  *2018-03-13T11:00:00* *2018-03-13T11:05:00* time frame.:

`sum:requests.error{*}.as_count()/sum:requests.total{*}.as_count()`   

For the 5 min timeframe there are 5 time series points (zeros excluded):

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
|**`current_eva_path`** | Aggregation function applied **before** evaluation | **(a0+...+a4)/(b0+...+b4)** | **0.6**|
|**`new_eva_path`** | Aggregation function applied **after** evaluation|**(a0/b0+...+a4/b4)**|**3**|

As one may notice the results are completely different.

### Sparse metric problem

In case of sparse or *0* metrics in the denominator some results are rejected in case of `new_eva_path`.

Let’s have following metrics:

* `A = (10, 10, 10)`
* `B = (0, 1, -)`

Here is the behavior difference:

| Path | Evaluation | Result |
|:------|:------|:-------|
| `current_eva_path` | (10 + 10 + 10) / (0 + 1 + NaN) | 30 |
| `new_eva_path` | 10/0 + 10/1 + 10/NaN | 10 |

Note that both evaluations are correct -- it depends on your intention. Because the current query language is ambiguous, we recommend rewriting your query to make your intended query explicit. Please [reach out to us][1] if you have any question regarding those changes.  


## Workaround

Since this special behavior is tied to the `as_count`​ modifier, we encourage replacing `as_count` with `as_rate()` or `rollup(sum)` in these scenarios.  

*Example*: Suppose you wish to monitor the error rate of a service:

`min(last_5m):sum:requests.error{*}.as_rate() / sum:requests.total{*}.as_rate() > 0.5 ` alerts you when the error rate is above 50% at all times during the past 5 min.

[1]: /help
