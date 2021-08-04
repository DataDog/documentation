---
title: Update to Distribution Metrics Workflow FAQ
kind: faq
is_beta: true
---

## What is changing?

Datadog has unified the way metric queries are evaluated for Top Lists and Query Value Widgets so that you get more consistent results for the same metric viewed in a Top List and a Query Value Widget. 

As a refresher, regardless of the type of widget, each metric query consists of the same first two evaluation steps: 1. Time aggregation, 2. Space aggregation (see [The anatomy of a metric query][1] for more information). 

* A Query Value widget reduces the results of those two steps into a single value.
* A Top List widget returns a single value per group.

With this update, the evaluation steps used for Top List widgets match the steps used for Query Value widgets:

| Widget      | Old evaluation steps                                                                                                               | New evaluation steps             |
|-------------|------------------------------------------------------------------------------------------------------------------------------------|----------------------------------|
| Query Value | 1. Time aggregation<br/> 2. Space aggregation<br/> 3. Time aggregation (reduces values to a single number)<br/> 4. Apply arithmetic and functions | Same as old steps                |
| Top List    | 1. Time aggregation<br/> 2. Space aggregation<br/> 3. Apply arithmetic and functions<br/> 4. Time aggregation (reduces values to a single number) | Same as Query Value widget steps |

The following functions are not available for Query Value and Top List widgets: 
* `forecast`
* `top`
* `dt`
* `robust_trend`
* `trend_line`
* `piecewise_constant`
* `moving_rollup`
* `autosmooth`
* `ewma_X`
* `median_X`

## Why is this update happening? 

Datadog received feedback from multiple customers that there are inconsistencies in the values between the two widgets that have the same query over the same time frame. We’re removing this inconsistency entirely. 

Example queries with different behavior:
(INSERT TABLE HERE) 

## Are there billing implications tied to this change? 

No. This solely affects the values that are returned when you’re visualizing your metrics with a Top List or Query Value widget. 

## Can you opt out of this change?

This change involves no downside or billing impact and leads long-term reduction in the inconsistencies among your query results, so opting out is not available.


[1]: https://docs.datadoghq.com/metrics/#anatomy-of-a-metric-query
