---
title: Interpolation & the fill modifier explained
kind: faq
---

## Why interpolation?

Interpolation is not about filling arbitrary large gaps in a metric series, but aligning several series together, to make it possible to perform aggregation across sources.

Most of the time graphing in Datadog is all about mix together data from separate sources into a single line for your graph. However separate sources might not submit data at the same time and with the same frequency.

```
net.bytes_rcvd    |  3:00:00  3:00:10  3:00:20  3:00:30  3:00:40 ...
------------------+-------------------------------------------------
1: host:A,env:prod|    15                         25
2: host:B,env:test|             10                         40
------------------+-------------------------------------------------
    sum (1+2)     |    15?      10?               25?      40?

```

The above example shows that merging sources directly produces absurd results just because sources are not naturally aligned.
Interpolation solves this problem by providing relevant values just for calculations.

```
net.bytes_rcvd    |  3:00:00  3:00:10  3:00:20  3:00:30  3:00:40 ...
------------------+-------------------------------------------------
1: host:A,env:prod|    15       18.3              25        X
2: host:B,env:test|     Y       10                30       40
------------------+-------------------------------------------------
    sum (1+2)     |   15 + Y    28.3              55       40 + X
```

where X and Y are interpolated using data after and before the interval displayed.

## In which cases does interpolation occur?

Interpolation occurs when more than 1 source corresponds to your graph query i.e.:

1. for space-aggregation: avg:system.cpu.user{env:prod}. If you have 2 or more hosts with the tag "env:prod", our system computes the average over time and needs interpolation to do so.
2. for group queries: net.bytes_rcvd{*} by {host}. No computation across sources may be performed here, but providing aligned series makes graph line mouse over and comparisons easier.

Interpolation is not needed:

* when you graph 1 metric submitted from 1 source: avg:net.bytes_rcvd{host:a} (we assume this host submits this metric always with the same tag list).

Interpolation is not performed for multi part queries (e.g. "avg:system.cpu.user{env:prod},avg:system.cpu.user{env:dev}").

The type of interpolation described in this article is also not performed for arithmetic. When evaluating queries, Datadog's backend rolls data up into intervals (one for each point in a timeseries graph, see [this article][1] for more details). If a query involves arithmetic, and one of these intervals is missing data for part of a query, the query system substitutes 0 for that interval. This behavior cannot be controlled with the fill modifier.

## How to control interpolation?

The default interpolation for gauge type metrics is linear and is performed up to 5 min after real samples. The default for count or rate type metrics is to disable interpolation.

The fill modifier controls interpolation parameters:

* fill(linear, X) gives you a linear interpolation up to X seconds after real samples.
* fill(last, X) just replicates the last sample value up to X secs.
* fill(zero, X) inserts 0 where the interpolation is needed up to X secs.
* fill(null, X) disables interpolation, the value of X doesn't matter.

## FAQ

**There's a gap in my metric, fill(zero) doesn't do anything, I still have a long straight line on my graph.**

Graphs in Datadog are just a series of datapoints joined by lines. If you have a long period without any data, this translates into a long straight line as interpolation is not meant to add values to your metric series.
Rather, interpolation is about aligning series to make aggregation and multi-line graphs possible.

**I have disabled interpolation but I see my metrics dropping to 0 which is not expected.**

These artificial dips are caused by front-end visualization enhancement. [See this article for more information][2].

**How to choose the interpolation method?**
The default interpolation method (which is chosen based on a metric's type) is usually fine, but it is sometimes desirable to override these defaults.

Linear interpolation is a great fit for metrics reported on a steady basis from the same sources. For sparse metrics or metrics reported from varying sources over time, it's often more interesting to disable interpolation.

Last makes sense for instance if you send datapoints only when the value of the thing you measure changes.
Null prevents graphs from displaying interpolated values 5 min after the last real value, etc.

[1]: /graphing/functions
[2]: /graphing/faq/i-see-unexpected-drops-to-zero-on-my-graph-why
