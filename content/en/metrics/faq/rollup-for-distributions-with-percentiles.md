---
title: Rollup Update for Distribution Metrics with Percentiles?
is_beta: false
---
**This FAQ is useful for users who query percentiles on distributions over a given timeframe, or users who want to query percentiles for specific intervals within a given timeframe.**

Time aggregation `(.rollup(<aggregator>, <time interval>)` and how it works with distributions with percentile aggregations has changed.

## Does this update to rollup change the values of my existing queries on distributions with percentiles? 
No - your existing queries are unaffected. The `.rollup <aggregator>` parameter has been removed because it had no effect on query results but caused user confusion for how the resulting value was calculated. 

## What has been updated for distributions with percentiles?
You no longer need to specify an additional time aggregator (as in `.rollup(avg)`) when you've already selected `p50`, `p75`, `p90`, `p95`, or `p99`. You only need to specify a rollup `<time interval>` which determines the interval of time your data is aggregated over. 

**Old UI**
{{< img src="metrics/faq/old-rollup-distUI.jpg" alt="Old Rollup UI">}}

**New UI**
{{< img src="metrics/faq/new-rollup-distUI.jpg" alt="New Rollup UI">}}

## Why can't I specify a rollup/time aggregator anymore on distribution with percentiles?
The rollup `<aggregator>` parameter has no effect on distribution metrics queried with percentiles. That is, these two queries would both return the same 99th percentile value calculated over one-minute rollup intervals. 
Query #1: `p99:distribution.rollup(avg, 60)`
Query #2: `p99:distribution.rollup(60)`

Unlike COUNT, GAUGE, and RATE metric types which aggregate first in time and then in space the distribution metric type is stored as DDSketches. Distributions with percentiles are merged in time and space at the same time. By selecting `p99 by`, you're aggregating the distribution metric by the 99th percentile in time and space.

_Example: Suppose you're graphing on a dashboard timeframe of the Past 4 hours, p99:distribution.rollup(60)._
Datadog merges the sketch data server-side to represent a rollup interval of a minute (for every minute within the dashboard timeframe of 4 hours). After the rollup is calculated, Datadog calculates a 99th percentile value for each minute interval.
