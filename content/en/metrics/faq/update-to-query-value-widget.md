---
title: Update to Distribution Metrics Workflow FAQ
kind: faq
is_beta: true
---

## What is changing?

We have unified the way metric queries are evaluated for Top Lists and Query Value Widgets such that you will have more consistent results for the same metric viewed in a Top List and a Query Value Widget. 

As a refresher, regardless of the type of widget, each metric query consists of the same two evaluation steps to start: 1. Time aggregation, 2. Space aggregation (see [The anatomy of a metric query][1] for more information). 

* A Query Value widget reduces the results of those two steps into a single value.
* A Top List Widget returns a single value per group.

So we’ve unified the evaluation steps used for the Top List Widget to match the Query Value Widget’s (as shown in the table below):


  | Widget                               | Old Evaluation Steps                                                                                                     | New Evaluation Steps             |
|-------------------------------------------|----------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| Query Value                              | 1. Time Aggregation | No Change  |
| Top List | Evaluation Steps Here | Now matches Query Value widget|

The following functions will not be available for Query Value and Top List Widgets: 
* forecast()
* top()
* dt()
* robust_trend()
* trend_line()
* piecewise_constant()
* moving_rollup()
* autosmooth()
* ewma_X()
* median_X()

## Why is this update happening? 

We’ve received feedback from multiple customers that there are inconsistencies in the values between the two widgets that have the same query over the same timeframe. We’re removing this inconsistency entirely. 

Example queries with different behavior:
(INSERT TABLE HERE) 

## Are there billing implications tied to this change? 

No. This solely affects the values that are returned when you’re visualizing your metrics with a Top List or Query Value widget. 

## Can I opt out of this change?

There is no downside or billing impact here. This change will lead to long-term reduction in the inconsistencies among your query results, so opting out is not available.






[1]: https://docs.datadoghq.com/metrics/#anatomy-of-a-metric-query
