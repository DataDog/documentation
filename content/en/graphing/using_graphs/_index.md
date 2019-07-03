---
title: Introduction to Graphs
kind: documentation
description: Visualize your data to gain insight
further_reading:
- link: "https://learn.datadoghq.com/course/view.php?id=8"
  tag: “Learning Center”
  text: “Building Better Dashboards”
---

## The graphing editor

Interact with the Graphing Editor using the GUI (the default method) or by writing JSON (the more advanced method). This page covers using the GUI. To learn more about using JSON, see [Graphing with JSON][1].

On each graph, a pencil icon opens the graph editor:

{{< img src="graphing/index/references-graphing-overview.png" alt="Graphing Overview" responsive="true" style="width:75%;" >}}

The graphing editor has the following tabs:

* **Share**: Embed the graph on any external web page.
* **JSON**: The more flexible editor which requires knowledge of the graph definition language.
* **Edit**: The default, GUI tab for graphing options.

When you first open the graph editor, you are on the **Edit** tab. Here you can use the UI to choose most settings. Here is an example:

{{< img src="graphing/index/references-graphing-edit-window-with-y.png" alt="Graphing Edit Tab" responsive="true" style="width:75%;" >}}

## Configuring a graph
To configure your graph follow this process:

1. [Choose the metric to graph](#choose-the-metric-to-graph)
2. [Select the visualization](#select-your-visualization)
3. [Filter](#filter)
4. [Aggregate and Rollup](#aggregate-and-rollup)
5. [Apply additional functions](#advanced-graphing)
6. [Title the graph](#create-a-title)

### Choose the metric to graph

When you create a graph, you probably have a metric in mind that you want to show. You can select that in the first dropdown under step #2, **Graph your data**. If you don't know which metric to use, you might want to start with the [Metrics Explorer][2] or a [Notebook][3]. You can also see a list of metrics in the [Metrics Summary][4].


### Select your visualization

Once you select a metric to display in your graph, choose your visualization. Check the [list of all visualizations (widgets)][5].

### Filter

Once the metric and a visualization are in place, you can filter the hosts to be graphed. To the right of the metric is the **from** dropdown which defaults to *(everything)*. Click this and choose the tag key(s) to filter by. To learn more about tags, refer to the [Tagging documentation][6].

### Aggregate and rollup
#### Aggregation method

Next to the filter dropdown is the aggregation method. This defaults to **avg by** but can be changed to **max by**, **min by**, or **sum by**. In most cases, the metric has many values for each time interval, coming from many hosts or instances. The aggregation method chosen determines how the metrics are aggregated into a single line. So if you are graphing a metric that is from 100 hosts, **sum by** adds up all of those values and displays the sum.

#### Aggregation groups

After the aggregation method, determine what constitutes a line or grouping in a graph. If you choose host, then on a line graph, there's a line for every host. If you choose role, then there is a line for every role. That line is made up of metrics from all the hosts in that role, aggregated using the method you chose above.

#### Rollup to aggregate over time

Regardless of the options chosen above, there is always some aggregation of data due to the physical size constraints of the window holding the graph. If a metric is updated every second and you are looking at 4 hours of data, you need 14,400 points to display everything. Each graph displayed has about 300 points shown at any given time.

In the example above, each point displayed on the screen represents 48 data points. In practice, metrics are collected by the Agent every 15-20 seconds. So one day's worth of data is 4,320 data points. You might consider a rollup function that looks at 5 or 10 minutes worth of data for more control over the graph.

To use the rollup function, click the plus sign to the right of the aggregation group and choose `rollup` from the dropdown. Now choose how you want to aggregate the data and the interval in seconds.

To create a single line that represents the total available disk space on average across all machines rolled up in 60-second buckets, you would use a query like this:

{{< img src="graphing/index/references-graphing-rollup-example.png" alt="rollup example" responsive="true" style="width:90%;">}}

When switching to the JSON view, the query looks like this:

```
"q": "avg:system.disk.free{*}.rollup(avg, 60)"
```

For more about using the JSON view, see [Graphing with JSON][1].

### Advanced graphing

Depending on your analysis needs, you may choose to apply other mathematical functions to the query. Examples include rates and derivatives, smoothing, and more. See the [list of available functions][7].

The Datadog UI also supports the ability to graph your metrics with various arithmetic operations. Use: `+`, `-`, `/`, `*` to modify the values displayed on your graphs. This syntax allows for both integer values and arithmetic using multiple metrics.

#### Metric arithmetic using an integer

Modify how a metric value is displayed on a graph by performing an arithmetic operation on the metric. For example, to visualize the double of a specific metric, click the **Advanced...** link in the graph editor. Then enter your arithmetic in the `Formula` box, in this case: `a * 2`.

{{< img src="graphing/index/arithmetic_2.png" alt="Arithmetic 2" responsive="true" style="width:75%;" >}}

#### Arithmetic between two metrics

To visualize the percentage of a metric by dividing one metric over another. For example:

`jvm.heap_memory / jvm.heap_memory_max`

This can be done in the same manner as above, utilizing the **Advanced...** option in the graph editor. From there, select **Add Query**. Each query is assigned a letter: the first metric is represented by **a**, the second metric is represented **b**, and so on.

Then in the `Formula` box, enter the arithmetic for this example `a / b`:

{{< img src="graphing/index/arithmetic_3.png" alt="Arithmetic 3" responsive="true" style="width:75%;" >}}

To display only your formula, un-check your metrics **a** and **b**:

{{< img src="graphing/index/arithmetic_3_bis.png" alt="Arithmetic 3 bis" responsive="true" style="width:75%;" >}}

**Note**: Formulas are not lettered. Arithmetic cannot be done between formulas.

### Create a title

If you don't enter a title, one is automatically generated based on your selections. However, it is recommended that you create a title that describes the purpose of the graph. 

### Save

Click **Done** to save your work and exit the editor. You can always come back to the editor to change the graph. If you make changes you don't want to save, click **Cancel**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/graphing_json
[2]: https://app.datadoghq.com/metric/explorer
[3]: https://app.datadoghq.com/notebook/list
[4]: https://app.datadoghq.com/metric/summary
[5]: /graphing/widgets
[6]: /tagging
[7]: /graphing/functions/#apply-functions-optional
