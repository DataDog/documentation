---
title: I'm switching between the sum/min/max/avg aggregators but the values look the same?
kind: faq
aliases:
    - /graphing/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same
further_reading:
    - link: '/metrics/introduction/#combining-time-series'
      tag: 'Documentation'
      text: 'Space Aggregation'
---

When using the `sum`/`min`/`max`/`avg` aggregators, you are looking across multiple series, not at points within a single series. So if the query is scoped to its most granular level, it's possible that switching between those aggregators doesn't change the values you're seeing.

For example, let's say you break down web requests by `host` and `path`, where you'll get a series for each combination. The data at a particular time may look like:

| Metric Name  | Tags                      | Value |
| ------------ | ------------------------- | ----- |
| web.requests | `host: a`, `path: /test1` | 5     |
| web.requests | `host: a`, `path: /test2` | 3     |
| web.requests | `host: b`, `path: /test1` | 2     |
| web.requests | `host: b`, `path: /test2` | 8     |

You'll get different results per aggregation method when grouping by `host`, since there are two series per `host` that must be combined.

| Query                           | host: a | host: b |
| ------------------------------- | ------- | ------- |
| `sum:web.requests(*) by {host}` | 8       | 10      |
| `min:web.requests(*) by {host}` | 3       | 2       |
| `max:web.requests(*) by {host}` | 5       | 8       |
| `avg:web.requests(*) by {host}` | 4       | 5       |

In this same example if you group by `host` **and** `path`, this results in four series where the `sum`/`min`/`max`/`avg` will be the same per series as that is the most granular level for this data.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
