---
title: as_count() in Monitor Evaluations
description: "Understanding how as_count() and as_rate() modifiers affect monitor evaluations and arithmetic operations in different evaluation paths."
aliases:
  - /monitors/guide/as-count-monitor-evaluation
---

## Overview

Queries using **`as_count()`** and **`as_rate()`** modifiers are calculated in ways that can yield different results in monitor evaluations. Monitors involving arithmetic and at least 1 **`as_count()`** modifier use a separate evaluation path that changes the order in which arithmetic and time aggregation are performed.

## Error rate example

Suppose you want to monitor an error rate over 5 minutes using the metrics, `requests.error` and `requests.total`. Consider a single evaluation performed with these aligned timeseries points for the 5 min timeframe:

**Numerator**: `sum:requests.error{*}`

```text
| Timestamp           | Value |
|:--------------------|:------|
| 2018-03-13 11:00:30 | 1     |
| 2018-03-13 11:01:30 | 2     |
| 2018-03-13 11:02:40 | 3     |
| 2018-03-13 11:03:30 | 4     |
| 2018-03-13 11:04:40 | 5     |
```

**Denominator**: `sum:requests.total{*}`

```text
| Timestamp           | Value |
|:--------------------|:------|
| 2018-03-13 11:00:30 | 10    |
| 2018-03-13 11:01:30 | 10    |
| 2018-03-13 11:02:40 | 10    |
| 2018-03-13 11:03:30 | 10    |
| 2018-03-13 11:04:40 | 10    |
```

### 2 ways to calculate

Refer to this query as **`classic_eval_path`**:

```text
sum(last_5m): sum:requests.error{*}.as_rate() / sum:requests.total{*}.as_rate()
```

and this query as **`as_count_eval_path`**:

```text
sum(last_5m): sum:requests.error{*}.as_count() / sum:requests.total{*}.as_count()
```

Compare the result of the evaluation depending on the path:

| Path                     | Behavior                                       | Expanded expression                    | Result  |
|:-------------------------|:-----------------------------------------------|:---------------------------------------|:--------|
| **`classic_eval_path`**  | Aggregation function applied _after_ division  | **(1/10 + 2/10 + 3/10 + 4/10 + 5/10)** | **1.5** |
| **`as_count_eval_path`** | Aggregation function applied _before_ division | **(1+2+3+4+5) / (10+10+10+10+10)**     | **0.3** |

_Note that both evaluations above are mathematically correct. Choose a method that suits your intentions._

It may be helpful visualize the **`classic_eval_path`** as:

```text
sum(last_5m):error/total
```

and the **`as_count_eval_path`** as:

```text
sum(last_5m):error
-----------------
sum(last_5m):total
```

In general, **`avg`** time aggregation with **`.as_rate()`** is reasonable, but **`sum`** aggregation with **`.as_count()`** is recommended for error rates. Aggregation methods other than **`sum`** do not make sense to use with (and cannot be used with) **`.as_count()`**.

## Gauge metrics and pct_change()

The evaluation path also affects gauge metrics when used with rollup-dependent functions like `pct_change()`. Without `as_count()`, the monitor uses the classic evaluation path: `pct_change()` is computed per-bucket and those values are summed over the evaluation window. For sparse gauge metrics, this can produce values well below -100%.

| Path | Evaluation order | Effect on sparse gauge metrics |
|:-----|:-----------------|:-------------------------------|
| **`classic_eval_path`** (no `as_count()`) | `pct_change()` applied per-bucket; values summed over the window | Can produce large negative values (for example, -1,500%) |
| **`as_count_eval_path`** | Timeseries bucketed and aggregated first; `pct_change()` applied at the window level | Produces the intended window-level result |

To use the count-style evaluation path on a gauge metric, add `as_count()` to the query.

[Reach out to the Datadog support team][1] if you have any questions.

[1]: /help/
