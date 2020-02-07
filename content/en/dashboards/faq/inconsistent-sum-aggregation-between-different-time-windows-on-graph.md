---
title: Inconsistent sum aggregation between different time windows on graph
kind: faq
aliases:
    - /graphing/faq/inconsistent-sum-aggregation-between-different-time-windows-on-graph
---

You may see conflicting values at different time windows because we have less granularity (fewer data points) on graphs of larger time windows. We do this so we don't stress our query processes.

By default, the way we 'rollup' datapoints into bins is by taking the average values. However, for 'sum' it would make more sense to have the bins rolled up using 'sum'. You can adjust this with a .rollup() function (unfortunately this can't be used in Metric Explorer, only in dashboards), using rollup(sum) (or max/min) as the parameter. See the [graph functions page][1] for more info.

[1]: /dashboards/functions
