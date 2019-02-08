---
title: Graphing
kind: documentation
aliases:
    - /guides/graphing
    - /graphing/miscellaneous/metrics_arithmetic
    - /graphing/faq/is-there-a-way-for-me-to-set-the-maximum-and-minimum-values-on-the-y-axis-of-a-graph
    - /graphing/faq/is-it-possible-to-adjust-the-y-axis-for-my-graphs
description: Visualize your data to gain insight
further_reading:
- link: "https://learn.datadoghq.com/course/view.php?id=8"
  tag: "Learning Center"
  text: "Building Better Dashboards"
---

Graphs are the window to your monitored systems. You see graphs throughout Datadog, in email notifications, Slack, HipChat, and other chat clients. Graphs are at the center of monitoring and observability, so it is essential to understand how to define graphs.

## The graphing editor

There are two ways to interact with the Graphing Editor: using the GUI (the default method) and writing JSON (the more complete method). This page covers using the GUI. To learn more about using JSON, see [Graphing Primer using JSON][1].

On each graph, a pencil icon opens the graph editor:

{{< img src="graphing/index/references-graphing-overview.png" alt="Graphing Overview" responsive="true" style="width:75%;" >}}

The graphing editor has the following tabs:

* **Share**: Embed the graph on any external web page.
* **JSON**: The more flexible editor which requires knowledge of the graph definition language.
* **Edit**: The default, GUI tab for graphing options.

When you first open the graph editor, you are on the **Edit** tab. Here you can use the UI to choose most settings. Here is an example:

{{< img src="graphing/index/references-graphing-edit-window-with-y.png" alt="Graphing Edit Tab" responsive="true" style="width:75%;" >}}

Configuring a graph is a multi-step process:

1. [Choose the metric to graph](#choose-the-metric-to-graph)
2. [Select the visualization](#select-your-visualization)
3. [Filter](#filter)
4. [Aggregate and Rollup](#aggregate-and-rollup)
5. [Apply additional functions](#advanced-graphing)
6. [Enhance the graph](#graphs-enhancement)
7. [Title the graph](#create-a-title)

## Choose the metric to graph

When you create a graph, you probably have a metric in mind that you want to show. You can select that in the first dropdown under step #2, **Graph your data**. If you don't know which metric to use, you might want to start with the [Metrics Explorer][2] or a [Notebook][3]. You can also see a list of metrics in the [Metrics Summary][4].

The Metrics Explorer allows you to play around with different graph settings in a more ad-hoc way. The Metrics Summary shows the type and default unit for a metric.

## Select your visualization

Once you have a metric in mind to display in your graph, select your visualization. Check the [list of all visualizations (widgets)][5].

### Appearance

Graphs can be displayed as Areas, Bars, or Lines. For all graph types, Datadog offers various color options to differentiate multiple metrics displayed on the same graph:

| Palette | Description                                                                                              |
|---------|----------------------------------------------------------------------------------------------------------|
| Classic | The simple colors light blue, dark blue, light purple, purple, light yellow, and yellow (colors repeat). |
| Cool    | A gradient color scheme made from green and blue.                                                        |
| Warm    | A gradient color scheme made from yellow and orange.                                                     |
| Purple  | A gradient color scheme made from purple.                                                                |
| Orange  | A gradient color scheme made from orange.                                                                |
| Gray    | A gradient color scheme made from gray.                                                                  |

For line graphs, different metrics can be assigned specific palettes by separating the queries in JSON.

#### Line graphs

Line graphs include two additional parameters:

| Parameter | Options               |
|-----------|-----------------------|
| Style     | Solid, Dashed, Dotted |
| Stroke    | Normal, Thin, Thick   |

## Filter

Once the metric and a visualization are in place, you can filter the hosts to be graphed. To the right of the metric is the **from** dropdown which defaults to *(everywhere)*. Click this and choose the tag(s) you want to filter by. To learn more about tags, refer to the [Tagging documentation][6].

## Aggregate and rollup
### Aggregation method

Next to the filter dropdown is the aggregation method. This defaults to **avg by** but can be changed to **max by**, **min by**, or **sum by**. In most cases, the metric has many values for each time interval, coming from many hosts or instances. The aggregation method chosen determines how the metrics are aggregated into a single line. So if you are graphing a metric that is from 100 hosts, **sum by** adds up all of those values and displays the sum.

### Aggregation groups

After the aggregation method, determine what constitutes a line or grouping in a graph. If you choose host, then you have a line (on line graphs) for every host. If you choose role, then there is a line for every role. That line is made up of metrics from all the hosts in that role, aggregated using the method you chose above.

### Rollup to aggregate over time

Regardless of the options chosen above, there is always some aggregation of data due to the physical size constraints of the window holding the graph. If a metric is updated every second and you are looking at 4 hours of data, you need 14,400 points to display everything. Each graph displayed has about 300 points shown at any given time.

In the example above, each point displayed on the screen represents 48 data points. In practice, metrics are collected by the Agent every 15-20 seconds. So one day's worth of data is 4,320 data points. You might consider a rollup function that looks at 5 or 10 minutes worth of data for more control over the graph.

To use the rollup function, click the plus sign to the right of the aggregation group and choose `rollup` from the dropdown. Now choose how you want to aggregate the data and the interval in seconds.

To create a single line that represents the total available disk space on average across all machines rolled up in 60-second buckets, you would use a query like this:

{{< img src="graphing/index/references-graphing-rollup-example.png" alt="rollup example" responsive="true" style="width:90%;">}}

When switching to the JSON view, the query looks like this:

```
"q": "avg:system.disk.free{*}.rollup(avg, 60)"
```

For more about using the JSON view, see [Graphing Primer using JSON][1].

## Advanced graphing

Depending on your analysis needs, you may choose to apply other mathematical functions to the query. Examples include rates and derivatives, smoothing, and more. See the [list of available functions][7].

The Datadog UI also supports the ability to graph your metrics with various arithmetic operations. Use: `+`, `-`, `/`, `*` to modify the values displayed on your graphs. This syntax allows for both integer values and arithmetic using multiple metrics.

### Metric arithmetic using an Integer

Modify how a metric value is displayed on a graph by performing an arithmetic operation on the metric. For example, to visualize the double of a specific metric, click the **Advanced...** link in the graph editor. Then enter your arithmetic in the `Formula` box, in this case: `a * 2`.

{{< img src="graphing/index/arithmetic_2.png" alt="Arithmetic 2" responsive="true" style="width:75%;" >}}

### Arithmetic between two metrics

To visualize the percentage of a metric by dividing one metric over another. For example:

`jvm.heap_memory / jvm.heap_memory_max`

This can be done in the same manner as above, utilizing the **Advanced...** option in the Graph Editor. From there, select **Add Query**. Each query is assigned a letter: the first metric is represented by **a**, the second metric is represented **b**, and so on.

Then in the `Formula` box, enter the arithmetic for this example `a / b`:

{{< img src="graphing/index/arithmetic_3.png" alt="Arithmetic 3" responsive="true" style="width:75%;" >}}

To display only your formula, un-check your metrics **a** and **b**:

{{< img src="graphing/index/arithmetic_3_bis.png" alt="Arithmetic 3 bis" responsive="true" style="width:75%;" >}}

**Note**: Formulas are not lettered. Arithmetic cannot be done between formulas.

## Graphs enhancement

### Metric aliasing

Each query or formula can be aliased. The alias overrides the display on the graph and legend, which is useful for long metric names. At the end of the query/formula click on **as...**, then enter your metric alias:

{{< img src="graphing/index/metric_alias.png" alt="metric alias" responsive="true" style="width:75%;" >}}

### Set Y-axis scale

The Datadog y-axis controls are available via the UI and the JSON editor. They allow you to:

* Clip the y-axis to specific ranges.
* Remove outliers either by specifying a percentage or an absolute value to remove outliers.
* Change the y-axis scale from linear to log, pow, or sqrt.

Change the Y-axis scale by expanding the **Y-Axis Controls**:

{{< img src="graphing/index/y_axis_control.png" alt="y axis control" responsive="true" style="width:75%;" >}}

The following configuration options are available:

| Option                | Required | Description                                                                                                                                                                                                       |
|-----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`/`Max`           | No       | Specify the minimum and / or maximum value to show on y-axis. It takes a number or `Auto` as the default value.                                                                                                   |
| `Scale`               | No       | Specifies the scale type. Possible values:<br>- *linear*: A linear scale (default)<br>- *log*: A logarithmic scale<br>- *pow*: A Power of 2 scale (2 is default, modify in JSON)<br>- *sqrt*: A square root scale |
| `Always include zero` | No       | Always include zero or fit the axis to the data range. The default is to always include zero.                                                                                                                     |

**Note**: Because the mathematical log function doesn't accept negative values, the Datadog log scale only works if values are of the same sign (everything > 0 or everything < 0). Otherwise an empty graph is returned.

### Overlay events for additional context

Add events from related systems to add more context to your graph. For example, you can add GitHub commits, Jenkins deploys, or Docker creation events. Expand the **Event Overlays** section and enter a query to display those events. Use the same query format as for the [Event Stream][8], for example:

| Query                       | Description                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Shows all events from the Jenkins source.                  |
| `tag:role:web`              | Shows all events with the tag `role:web`.                  |
| `tags:$<TEMPLATE_VARIABLE>` | Shows all events from the selected [Template Variable][9]. |

{{< img src="graphing/index/overlay_events.png" alt="Overlay Events" responsive="true" style="width:75%;" >}}

## Create a title

If you don't enter a title, one is automatically generated based on your selections. But it may be more useful to the users of the [dashboard][10] to create a title that more aptly describes the purpose of the graph. Linking the technical purpose to the business benefits adds even more value.

## Save

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
[8]: /graphing/event_stream
[9]: /graphing/dashboards/template_variables
[10]: /graphing/dashboards
