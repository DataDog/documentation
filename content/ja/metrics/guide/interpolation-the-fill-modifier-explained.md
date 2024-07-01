---
title: Interpolation and the Fill Modifier
aliases:
    - /graphing/faq/interpolation-the-fill-modifier-explained
    - /dashboards/faq/interpolation-the-fill-modifier-explained
further_reading:
- link: /dashboards/functions/interpolation/
  tag: Documentation
  text: Learn more about Interpolation Functions
---

{{< img src="metrics/guide/graph_fill_example.png" alt="Fill() function in the graph options" style="width:100%;" >}}

## Why interpolation?

Interpolation is not about filling arbitrary large gaps in a metric series, but aligning several series together, to make it possible to perform aggregation across sources.

Most of the time graphing in Datadog is about mixing together data from separate sources into a single line for your graph. However, separate sources might not submit data at the same time and with the same frequency.

```text
net.bytes_rcvd    |  3:00:00  3:00:10  3:00:20  3:00:30  3:00:40 ...
------------------+-------------------------------------------------
1: host:A,env:prod|    15                         25
2: host:B,env:test|             10                         40
------------------+-------------------------------------------------
    sum (1+2)     |    15?      10?               25?      40?
```

The above example shows that merging sources directly produces absurd results just because sources are not naturally aligned. Interpolation solves this problem by providing relevant values just for calculations.

```text
net.bytes_rcvd    |  3:00:00  3:00:10  3:00:20  3:00:30  3:00:40 ...
------------------+-------------------------------------------------
1: host:A,env:prod|    15       18.3              25        X
2: host:B,env:test|     Y       10                30       40
------------------+-------------------------------------------------
    sum (1+2)     |   15 + Y    28.3              55       40 + X
```

Where X and Y are interpolated using data after and before the interval displayed.

## In which cases does interpolation occur?

Interpolation occurs when more than one source corresponds to your graph query, for example:

* With space aggregation (`avg:system.cpu.user{env:prod}`), if you have two or more hosts with the tag `env:prod`, Datadog computes the average over time using interpolation.
* With group queries (`net.bytes_rcvd{*} by {host}`, no computation across sources may be performed, but providing aligned series makes the graph line mouse-over and comparisons easier.

Interpolation is not needed when you graph one metric submitted from one source, for example `avg:net.bytes_rcvd{host:a}` assuming `host:a` always submits the metric `net.bytes_rcvd` with the same tags.

Interpolation is not performed for multi-part queries, for example: `avg:system.cpu.user{env:prod},avg:system.cpu.user{env:dev}`

## How to control interpolation?

The default interpolation for all metric types is linear and performed up to five minutes after real samples. Interpolation is disabled by the `.as_count()` and `.as_rate()` modifiers when used on any [metric type][1], with the exception of Gauge type metrics. See [Metric Type Modifiers][2] for more information.

The `.fill()` modifier controls interpolation parameters:

| Modifier          | Description                                                          |
|-------------------|----------------------------------------------------------------------|
| `fill(linear, X)` | Gives you a linear interpolation up to X seconds after real samples. |
| `fill(last, X)`   | Replicates the last sample value up to X secs.                       |
| `fill(zero, X)`   | Inserts 0 where the interpolation is needed up to X secs.            |
| `fill(null, X)`   | Disables interpolation, the value of X doesn't matter.               |

## FAQ

### There's a metric gap, fill(zero) doesn't do anything, there's still a long straight line on the graph
Since graphs are just a series of data points joined by lines, a long period without any data translates into a long straight line and has no need for interpolation to fill values. Interpolation is about aligning series to make aggregation and multi-line graphs possible.

In contrast, a monitor uses a rollup of a time frame to evaluate interpolated values and calculate averages.

### Choose the interpolation method
The default interpolation method (which is chosen based on a metric's type) is usually fine, but it is sometimes desirable to override these defaults.

Linear interpolation is a great fit for metrics reported on a steady basis from the same sources. For sparse metrics or metrics reported from varying sources over time, it's often more interesting to disable interpolation. This makes sense if you send data points only when the value of the thing you measure changes.

Null prevents graphs from displaying interpolated values 5 min after the last real value.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/types/
[2]: /metrics/custom_metrics/type_modifiers/?tab=gauge#in-application-modifiers
