---
title: as_count in monitors
kind: faq
---

Datadog's graphs use [time aggregation][1] to reduce the point count on a timeframe. This is done for performance reasons, because granularity higher than 350 data-points in a graph doesn't provide additional insight.

#### What changed?

Previously, we allowed the creation of monitors that use `average`/`min`/`max` monitor aggregation with the `as_count` [function][2].

The only available query is `sum`, which is the only mathematically accurate function with such behavior. This behavior applies to creating new monitors only, and does not affect editing existing monitors.

#### Example

When an `avg` aggregation is applied on a count metric, it now performs AVG([5,1,2,1]) instead of AVG([5,1,2,Null,Null,Null,1]). This means that we are summing over all valid counts and dividing it by an arbitrary number of buckets with a non-null value.

If you zoom out - you might get an average of [6,2,1] which would produce a different result - if we think about number of buckets as how zoomed in/ out we arem then the zoom impacts the result.

As a workaround, change this monitor to alert on the `as_rate()` form of this metric.

[1]: /graphing/faq/what-is-the-granularity-of-my-graphs-am-i-seeing-raw-data-or-aggregates-on-my-graph
[2]: /graphing/miscellaneous/functions
