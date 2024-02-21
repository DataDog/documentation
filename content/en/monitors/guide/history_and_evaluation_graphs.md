---
title: Monitor History and Evaluation Graphs
kind: Guide
disable_toc: false
further_reading:
- link: "monitors/manage/status/"
  tag: "Documentation"
  text: "Learn more about the Monitor Status page"
- link: "monitors/guide/monitor_aggregators/"
  tag: "Documentation"
  text: "Learn more about Monitor aggregators"
---

## Overview

The [Monitor Status page][1] gives you an overview of the data your monitor is evaluating. It displays visualizations of the history of the monitor state changes in the History Graph. And displays visualizations of the monitor data with configured aggregations over a specific evaluation window in the Evaluation Graph. Both provide insights on your monitor data, however, the graphs are different and this guide covers:
- [Why the two graphs are displaying different information](#why-are-the-graphs-different)
- [Formulas/Functions to avoid when creating the Monitor](#using-formulas-and-functions)
- [Ways to replicate the Evaluation Graph result outside of the Monitor](#troubleshooting-evaluation-graph-values)


## Evaluation vs. History graph

History Graph
: History graph shows the raw data points being submitted for the metric query in the monitor; the monitor status page uses the same graph widget in notebooks or a dashboard.

Evaluation Graph
: This graph shows results from the raw data points of a metric applied against the user defined alert conditions. This shows the data after it has been aggregated, so it is like looking at the result of a query value widget for each data point.

When you submit your raw data points to Datadog for monitoring, this information is visualized in the history graph. For example, you have the following data points over the past 5 minutes: [10, 15, 12, 8, 11]. The history graph shows each value.

{{< img src="monitors/guide/history_and_evaluation_graphs/history_graph_query_config.png" alt="Metric query configuration of the monitor highlighting the section the history graph displays" style="width:100%;" >}}

When you configure your evaluation of the query, this adds another aggregation to the metric values for your monitor to alert on. For example, you configure your monitor to evaluate the average over the past 5 minutes. The evaluation graph shows the value of 11.2 as a single data point.

`(10+15+12+8+11)/5 = 11.2`

{{< img src="monitors/guide/history_and_evaluation_graphs/eval_graph_evaluation_config.png" alt="Evaluation configuration for a metric monitor highlighting the section the evaluation graph displays" style="width:100%;" >}}


## Why are the graphs different?

Typically, the two graphs are not visualizing the same data point values. In addition, multiple other factors can contribute to the differences in the visualization graphs.

### as_count() metrics

Queries with `as_count` metrics in the formula, use a different evaluation path. The evaluation applies any aggregation before the formula. For example if you are using `A / B` and both are using the `as_count` evaluation path, it would be evaluated as: 
```
(1+2+3+4+5) / (10+10+10+10+10) 
```

For more information, see the [as_count() in Monitor Evaluations][2] guide.

### Using formulas

When using formulas note that monitors apply the aggregation function for the monitor evaluation on the formula, not the individual queries. This means that in your monitor queries, if you are using the AVG (`avg by`) aggregation function but are using SUM (`sum by`) over the past X minutes in your evaluation configuration, then the edit page/history graph will not match the values. For an example, see the [troubleshooting](#troubleshooting-different-graph-values) section.

### Evaluation delay

When using an evaluation delay, the evaluation graph does not match the timing of the history graph one for one. For example, if you add a 5 minute evaluation delay, you need to look at the data point in the history graph from 5 minutes before to correlate it to the evaluation graph.

### Metric aggregation method

You can see different results depending on the aggregation method you are using in your query and your evaluation aggregation. The History and Edit Page use the aggregation methods from your queries while the Evaluation Graph uses the aggregation method determined by the **Evaluate the** option.

Depending on the aggregation method you are choosing in your monitor setup, this can show a different value compared to what you are seeing on the edit page. For example, if your monitor queries are using AVG but you are looking to alert on the MINIMUM value over the last X minutes/hours, then the evaluation graph shows the MIN value while your history/edit page graphs shows the AVG values. This is because the monitor is alerting on the aggregation method set in the monitor evaluation, not the aggregation method set in the metric query.

## Troubleshooting evaluation graph values

You can visualize what the monitor is evaluating at a time point by using a Notebook [Query Value Widget][3]. Take the query you are using in your monitor (as well as any formulas or functions) and then set your time frame for the graph to your evaluation window. This shows the data as it is aggregated to one single point.

In the following example, take a time frame from the Evaluation graph you want to investigate:

{{< img src="path/to/your/image-name-here.png" alt="Your image description" style="width:100%;" >}}

{{< img src="path/to/your/image-name-here.png" alt="Your image description" style="width:100%;" >}}

This is the query from the Monitor edit page:



Aggregation method:

Evaluation window:

Combine the above components into a Query Value widget configuration:

### Troubleshooting an evaluation graph with formulas

In this example, troubleshoot an evaluation graph with multiple queries and a formula in a Notebook Query Value widget.



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/manage/status
[2]: /monitors/guide/as-count-in-monitor-evaluations/
[3]: /dashboards/widgets/query_value/