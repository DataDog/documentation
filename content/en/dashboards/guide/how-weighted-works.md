---
title: How does weighted() work?
kind: guide
disable_toc: false
further_reading:
- link: "/dashboards/functions/smoothing"
  tag: "Documentation"
  text: "Smoothing"
---

Every metrics query has a standard order of evaluation (see the [Anatomy of a query][1] for a quick review). For example, the following query is calculated as follows: 
`sum:kubernetes.cpu.requests{*} by {kube_container_name}.rollup(avg, 10)`

1. Time aggregation -- Sum the values for each timeseries (defined by a unique tag value combination) in time for each 10s rollup time interval. The number of unique tag value combinations is determined by the most volatile / high granularity tag, let's say `container_id`, on this metric. 
2. Then, per `kube_container_name` (space aggregation), take the sum of all averaged values as a single representative value. The summed values for each `kube_container_name` is dependent upon the number of unique `container_id`s there are for each rollup interval.

The `weighted()` function accounts for the short lifespan of the `container_id` tag values when summing by `kube_container_name` for this gauge metric.

#### Example
Consider this query with the following assumptions: <br>
`sum:kubernetes.cpu.requests{*} by {shard}.rollup(avg, 60)`

- The gauge metric's submission interval is defined at 10 seconds. 
- A datapoint is graphed every 60 seconds in time.
- There is a Kubernetes cluster with 2 pods at any given time. Each pod is labeled with a shard and there is only ever 1 pod per shard. 

With a couple of deploys that switch out pods, the raw data over 60 seconds could resemble: 

| Time                 | 0s  |  10s |  20s |  30s |  40s |  50s |
| ---                  | --  | ---  | ---  | ---  |  --- |  --- |
| `pod:a`, `shard:1`   | 12  | NAN  | NAN  | NAN  | NAN  | NAN  |
| `pod:b`, `shard:1`   | NAN | 12   | 12   | 12   | NAN  | NAN  |
| `pod:c`, `shard:1`   | NAN | NAN  | NAN  | NAN  | 12   | 12   |
| `pod:d`, `shard:2`   | 12  | NAN  | NAN  | NAN  | NAN  | NAN  |
| `pod:e`, `shard:2`   | NAN | 16   | 16   | 16   | NAN  | NAN  |
| `pod:f`, `shard:2`   | NAN | NAN  | NAN  | NAN  | 18   | 18   |


1. _Time Aggregation -- Rolling up data_
With time aggregation, we're rolling up data either `avg` (without weighted) or the proposed `weighted` average: 
| Time aggregation   | .rollup(avg) | With .weighted() |
| ----------------   | ------------ | ---------------- |
| `pod:a`, `shard:1` | 12           | 2.0              |
| `pod:b`, `shard:1` | 12           | 6.0              |
| `pod:c`, `shard:1` | 12           | 4.0              |
| `pod:d`, `shard:2` | 12           | 2.0              |
| `pod:e`, `shard:2` | 16           | 8.0              |
| `pod:f`, `shard:2` | 18           | 6.0              |

2. _Space Aggregation_ 
Finally, the metric is aggregated by shard to get the final values below: 
| Space aggregation by shard | .rollup(avg) | With .weighted() |
| ------------------------   | ------------ | ---------------- |
| `shard:1`                  | 36           | 12               |
| `shard:1`                  | 46           | 16               |


The `weighted()` function remedies any inconsistent behavior with short-lived tags by weighing the values against their submission rate

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/#anatomy-of-a-metric-query
