---
title: as_count() monitor evaluation changes
kind: faq
---

## Overview

Currently all monitors that have `as_count` modifier are using a separate evaluation path that the other monitors, which can lead in certain use-cases to a different monitor behavior one could expect. **We intend to migrate monitor with `as_count` to the same endpoint as all monitor. Here is the impact of such decisions.**  

Let's call the current evaluation path for `as_count` monitors `current_eva_path` and the new one `new_eva_path`. The biggest difference between the two paths is that:

* `current_eva_path`: applies the time aggregation function for each metric series **before** evaluating the expression.
* `new_eva_path`: applies the time aggregation function for each metric series **after** evaluating the expression.

The consequence of this is that complex monitor query, **especially those that have division**, produce different result depending on the time aggregation function.

## Example

Let’s take this query for the  *2018-03-13T11:00:00* *2018-03-13T11:05:00* time frame.:

`sum(last_5m):sum:dd.alerting.sla.missing.1m0s{*}.as_count() / sum:dd.alerting.sla.expected.1m0s{*}.as_count()`   

For the 5mn timeframe there are 5 time series for each metric (zeros excluded):

Numerator, `sum:dd.alerting.sla.missing.1m0s{*}.as_count()`:

```
| 2018-03-13 11:00:30 | 82        |
| 2018-03-13 11:01:30 | 78        |
| 2018-03-13 11:02:40 | 608       |
| 2018-03-13 11:03:30 | 161.00001 |
| 2018-03-13 11:04:40 | 166       |
```

Denominator, `sum:dd.alerting.sla.expected.1m0s{*}.as_count()`:

```
| 2018-03-13 11:00:30 | 464972 |
| 2018-03-13 11:01:30 | 464974 |
| 2018-03-13 11:02:40 | 464973 |
| 2018-03-13 11:03:30 | 464974 |
| 2018-03-13 11:04:40 | 464973 |
```

The complete results for numerator and denominator of can be found [here][1]

Here is the result of the evaluation depending of the path:

| Path | Expanded expression | Result|
|:--------|:--------|:-----|
|`current_eva_path`: Aggregation function applied **before** evaluation | **(a0+...+a4)/(b0+...+b4)** | **0.00047099 ~ 0.0005**|
|`new_eva_path`: Aggregation function applied **after** evaluation|**(a0/b0+...+a4/b4)**|**0.0023549 ~ 0.0024**|

As one may notice the results are completely different.

## Sparse metric problem

In case of sparse or *0* metrics in the denominator some results are rejected in case of `new_eva_path`.

Let’s have following metrics:

* `A = (10, 10, 10)` 
* `B = (0, 1, -)`

Here is the behavior difference: 

| Path | Evaluation | Result |
|:------|:------|:-------|
| `current_eva_path` | (10 + 10 + 10) / (0 + 1 + NaN) | 30 |
| `new_eva_path` | 10/0 + 10/1 + 10/NaN | 10 |

## Quiz: which result is correct?

**Both**, it depends on your intention. The understanding of the internals of each way is crucial to properly treat the results, feel free [to reach out to us](/help) if you have any question regarding those changes

[1]: https://gist.github.com/niamster/45e94337063000b4dfec9f03afcf1411