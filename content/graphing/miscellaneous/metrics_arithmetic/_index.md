---
title: Metrics Arithmetic
kind: documentation
---

## Metric Arithmetic in Graphs / Monitors

The Datadog UI supports the ability to graph your metrics with various arithmetic options. You can utilize any of: +, -, /, * to modify the values that are displayed on your graphs. This syntax allows for both integer values as well as arithmetic using multiple metrics.

## Metric Arithmetic Using an Integer

You can modify how a metric value is displayed on a graph by performing an arithmetic operation on the metric. For example, if you would like to visualize the double of a specific metric, say system.load.5

{{< img src="graphing/metrics/Metric_a.png" alt="Metric_a" responsive="true" popup="true">}}

This can be done inside a graph editor by clicking on the Graph Editor and selecting "advanced...". From there you can enter your arithmetic in the "Graph these queries as" box. In this case: a * 2. 
{{< img src="graphing/metrics/Metric_a_ 2.png" alt="Metric_a_ 2" responsive="true" popup="true">}}

## Arithmetic between two Metrics

For example, if you would like to visualize the percentage of `jvm.heap_memory` used, you can perform the following arithmetic across two metrics already being reported to Datadog: `jvm.heap_memory` / `jvm.heap_memory_max`. This can be done in the same manner as above, utilizing the "advanced..." option in the Graph Editor. From there, you can select "add a metric to this expression. Once you have added all of the metrics you would like to visualize, you will notice they are each assigned a letter, the first metric represented by a, the second b, and so on. Then in the "Graph these queries as" box, you can enter the arithmetic you would like, in this case: ( a / b )

{{< img src="graphing/metrics/Metric_arithmetic.png" alt="Metric arithmetic 2" responsive="true" popup="true">}}

## Metric Arithmetic via JSON

In addition to this feature being available in the Graph Editor, you can perform any of this arithmetic in the JSON editor of the graph. An example of doubling the system.load.5 metric grouped by each "host" is:

```json
{
 "requests": [
   {
     "q": "avg:system.load.5{*} by {host} * 2",
     "type": "area",
     "conditional_formats": [],
     "aggregator": "avg"
   }
 ],
 "viz": "timeseries",
 "autoscale": true
}
```