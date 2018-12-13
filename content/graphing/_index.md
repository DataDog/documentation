---
title: Graphing
kind: documentation
aliases:
    - /guides/graphing
    - /graphing/miscellaneous/metrics_arithmetic
    - /graphing/faq/is-there-a-way-for-me-to-set-the-maximum-and-minimum-values-on-the-y-axis-of-a-graph
    - /graphing/faq/is-it-possible-to-adjust-the-y-axis-for-my-graphs
description: Visualize your data to gain insight
---

Graphs are the window onto your monitored systems. Most of the times that you visit Datadog, you look at [dashboards][1] made up of graphs. Other times you see email notifications that include a graph of some fluctuation in the system. And yet other times you see graphs in your Slack, HipChat, and other chat clients documenting the changes in metrics over the course of time. Graphs are at the heart of monitoring and observability, so it is essential to understand how to define great graphs.

## The graphing editor

There are two ways to interact with the Graphing Editor: using the GUI (the default method) and writing JSON (the more complete method). This page covers using the GUI. To learn more about using JSON, visit the [JSON Graphing Primer Page][2]

On each graph there is a pencil icon that opens the graph editor.

{{< img src="graphing/index/references-graphing-overview.png" alt="Graphing Overview" responsive="true" style="width:75%;" >}}

The graphing editor has three tabs:

* **Share**: Allows you to embed the graph on any external web page (Note: The share tab is only available on Timeboards.).
* **JSON**: The more flexible editor, but it requires knowledge of the graph definition language to make use of it.
* **Edit**: Default tab that allows you to use a GUI to select the graphing options.

When you first open the graphing editor window, you are on the **Edit** tab. Here you can use the UI to choose most settings to tweak your graphs. Here is an example of what you might see. This example comes from the first graph in the standard Postgres Integration dashboard:

{{< img src="graphing/index/references-graphing-edit-window-with-y.png" alt="Graphing Edit Tab" responsive="true" style="width:75%;" >}}

Configuring a graph is a multi-step process:

1. [Choose the metric to graph][3]
2. [Select the visualization][4]
3. [Filter][5]
4. [Aggregate and Rollup][6]
5. [Apply additional functions][7]
6. [Enhance your graphs][8]
7. [Title the graph][9]

## Choose the metric to graph

When you create a graph, you probably have a metric in mind that you want to show. You can select that in the first dropdown in the **Choose metrics and events** section. If you aren't sure exactly which metric to use, you might want to start with the [Metrics Explorer][10] or a [Notebook][11]. You can also look in the [Metrics Summary][12].

The Metrics Explorer allows you to play around with different graph settings in a more ad-hoc way. The Metrics Summary allows to learn more about the type of metric as well as setting the default unit for a metric.

## Select your visualization

Once you have a metric in mind to display in your graph, select your visualization. Check the [list of all visualizations][13].

## Filter

Now that you have the metric and a visualization in place, you can filter down the hosts to be graphed. To the right of the metric is a dropdown which by default says *(everywhere)*. Click this and choose the tag(s) you want to filter by. To learn more about tags, refer to the [Tagging documentation][14].

## Aggregate and rollup
### Aggregation method

Next to the filter dropdown is the aggregation method. This defaults to **avg by** but can be changed to **max by**, **min by**, or **sum by**. In most cases, the metric has many values for each time interval, coming from many hosts or instances.
The aggregation method chosen determines how the metrics is aggregated into a single line. So if you are graphing a metric that is from 100 hosts, **sum by** adds up all of those values and display the sum.

### Aggregation groups

After the aggregation method you can determine what constitutes a line or grouping in a graph. If you choose host, then you have a line (in the case of line graphs) for every host. If you choose role, then there is a line for every role. Then that line is made up of metrics from all the hosts in that role, aggregated using the method you chose above.

### Rollup to aggregate over time

Regardless of the options chosen above, there is always some aggregation of data due to the physical size constraints of the window holding the graph. If a metric is updated every second and you are looking at 4 hours of data, you need 14,400 points to display everything. Each graph we display has about 300 points shown at any given time.

In the example above, each point displayed on the screen represents 48 data points. In practice, metrics are collected by the Agent every 15-20 seconds. So one day's worth of data is 4,320 data points. You might consider a rollup function that looks at 5 or 10 minutes worth of data if you would like to have more control over the display of your data for a graph that shows 1 day.

To use the rollup function, click the plus sign to the right of the aggregation group and choose `rollup` from the dropdown. Now choose how you want to aggregate the data and the interval in seconds.

To create a single line that represents the total available disk space on average across all machines rolled up in 60 seconds buckets, you would use a query like this:

{{< img src="graphing/index/references-graphing-rollup-example.png" alt="rollup example" responsive="true" style="width:90%;">}}

When switching to the JSON view, the query looks like this:

    "q": "avg:system.disk.free{*}.rollup(avg, 60)"

For more about using the JSON view, visit the [JSON Graphing Primer page][2].

## Advanced graphing

Depending on your analysis needs, you may choose to apply other mathematical functions to the query. Examples include rates and derivatives, smoothing, and more. For a list of available functions [click here][15]

The Datadog UI also supports the ability to graph your metrics with various arithmetic options. Use any of: `+`, `-`, `/`, `*` to modify the values that are displayed on your graphs.
This syntax allows for both integer values as well as arithmetic using multiple metrics.

### Metric arithmetic using an Integer

You can modify how a metric value is displayed on a graph by performing an arithmetic operation on the metric.
For example, if you would like to visualize the double of a specific metric, say `system.load.5`.
This can be done inside a graph editor by clicking on the Graph Editor and selecting **Advanced...** .
From there, enter your arithmetic in the `Formula` box, in this case: `a * 2`.

{{< img src="graphing/index/arithmetic_2.png" alt="Arithmetic 2" responsive="true" style="width:75%;" >}}

### Arithmetic between two metrics

If you would like to visualize the percentage of `jvm.heap_memory` used for instance, perform the following arithmetic across two metrics already being reported to your Datadog application:

`jvm.heap_memory / jvm.heap_memory_max`

This can be done in the same manner as above, utilizing the **Advanced...** option in the Graph Editor. From there, select:

* `Add Query +`

Once you have added all of the metrics you would like to visualize with their context, notice they are each assigned a letter: the first metric is represented by **a**, the second metric is represented **b**, and so on.

Then in the `Formula` box, enter the arithmetic you would like, in this case: `( a / b )`:

{{< img src="graphing/index/arithmetic_3.png" alt="Arithmetic 3" responsive="true" style="width:75%;" >}}

To display only your formula, un-check your metrics **a** and **b**:

{{< img src="graphing/index/arithmetic_3_bis.png" alt="Arithmetic 3 bis" responsive="true" style="width:75%;" >}}

**Note**: Formula are not lettered, you cannot do Arithmetic between formulas.

## Graphs enhancement

### Metric aliasing

Each query or formula can be aliased. The alias overrides the display on the graph and legend, which is particularly helpful for long metric names or to clarify a formula.
At the end of your query/formula click on the **as...** button, then enter your metric alias:

{{< img src="graphing/index/metric_alias.png" alt="metric alias" responsive="true" style="width:75%;" >}}

### Set Y-axis scale

The Datadog y-axis controls are available via the UI and the JSON editor. They allow you to:

* Clip y-axis to specific ranges
* Remove outliers either by specifying a percentage or an absolute value to remove outliers
* Change y-axis scale from linear to log, sqrt or power scale

Change the Y-axis scale with the **Show Y-Axis Controls** button:

{{< img src="graphing/index/y_axis_control.png" alt="y axis control" responsive="true" style="width:75%;" >}}

There are three configuration settings:

* `Min`/`max` (optional): Specifies minimum (and/or maximum) value to show on y-axis. It takes a number, or "auto" for default behavior. Default value is "auto".

* `Scale` (optional): Specifies the scale type. Possible values:

    * *linear*: A linear scale (default scale)
    * *log*: A logarithmic scale
    * *pow*: A Power of 2 scale (2 is default, but can be modified in json)
    * *sqrt*: A square root scale

* `Always include zero` (optional):  Specifies whether or not to always include zero or fit the axis to the data range. Default is to always include zero.

Note: as the mathematical log function doesn't accept negative values, the Datadog log scale only works if values are of the same sign (everything > 0 or everything < 0). Otherwise an empty graph is returned.

### Overlay events for additional context

Add events from related systems to add even more context to your graph. For example, you can add Github commits, Jenkins deploys, or Docker creation events. Click the Overlay Events button and enter a query to find and display your events. Use the same query format as for [the event stream][16], for example:

| Query                  | Description                                               |
| -----                  | ----                                                      |
| `sources:jenkins`      | Shows all events from the Jenkins source                  |
| `tag:role:web`         | Shows all events with the tag `role:web`                  |
| `tags:$<TEMPLATE_VAR>` | Shows all events from the [selected `<TEMPLATE_VAR>`][17] |



{{< img src="graphing/index/overlay_events.png" alt="Overlay Events" responsive="true" style="width:75%;" >}}

## Create a title

If you don't enter a title, we automatically generate a title based on the selections you have made. But it may be more useful to the users of the [dashboard][1] to create a title that more aptly describes the purpose of the graph. Linking the technical purpose to the business benefits adds even more value.

## Save

The final step is to click Save. You can always come back in to the editor and tweak the graph further depending on your needs.

[1]: /graphing/dashboards
[2]: /graphing/graphing_json
[3]: /graphing/#choose-the-metric-to-graph
[4]: /graphing/#select-your-visualization
[5]: /graphing/#filter
[6]: /graphing/#aggregate-and-rollup
[7]: /graphing/#advanced-graphing
[8]: /graphing/#graphs-enhancement
[9]: /graphing/#create-a-title
[10]: https://app.datadoghq.com/metric/explorer
[11]: https://app.datadoghq.com/notebook/list
[12]: https://app.datadoghq.com/metric/summary
[13]: /graphing/dashboards/widgets
[14]: /tagging
[15]: /graphing/functions
[16]: /graphing/event_stream
[17]: /graphing/dashboards/#editing-template-variables
