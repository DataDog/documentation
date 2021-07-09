---
title: Querying
kind: documentation
aliases:
  - /graphing/using_graphs/
description: Query your data to gain insight
further_reading:
- link: "https://learn.datadoghq.com/course/view.php?id=8"
  tag: "Learning Center"
  text: "Building Better Dashboards"
---

## Overview

Whether you are using metrics, logs, traces, monitors, dashboards, notebooks, etc., all graphs in Datadog have the same basic functionality. This page describes querying with the graphic editor. Advanced users can create and edit graphs with JSON. To learn more, see [Graphing with JSON][1].

## Graphing editor

On widgets, open the graphing editor by clicking on the pencil icon in the upper right corner. The graphing editor has the following tabs:

* **Share**: Embed the graph on any external web page.
* **JSON**: A more flexible editor, which requires knowledge of the graph definition language.
* **Edit**: The default UI tab for graphing options.

When you first open the graphing editor, you are on the **Edit** tab. Here, you can use the UI to choose most settings. Here is an example:

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Graphing Edit Tab"  style="width:75%;" >}}

## Configuring a graph

To configure your graph on dashboards, follow this process:

1. [Select the visualization](#select-your-visualization)
2. [Choose the metric to graph](#choose-the-metric-to-graph)
3. [Filter](#filter)
4. [Aggregate and rollup](#aggregate-and-rollup)
5. [Apply additional functions](#advanced-graphing)
6. [Title the graph](#create-a-title)

### Select your visualization

Select your visualization from the available [widgets][2].

### Choose the metric to graph

Choose the metric to graph by searching or selecting it from the dropdown next to **Metric**. If you don't know which metric to use, the metric dropdown also provides additional information about the metric, including the `unit`, `type`, `interval`, `description`, `tags`, and number of `tag's values`. 

{{< img src="dashboards/querying/metric_dropdown.png" alt="Metric Selector Dropdown"  style="width:75%;" >}}

If you want to explore your metrics further, start with the [Metrics Explorer][3] or a [notebook][4]. You can also see a list of metrics on the [Metrics Summary page][5].

### Filter

Your chosen metric can be filtered by host or tag using the **from** dropdown to the right of the metric. The default filter is *(everywhere)*.

{{< img src="dashboards/querying/filter-2.png" alt="Graphing Filter"  style="width:75%;" >}}

You can also use [advanced filtering][6] within the `from` dropdown to evaluate boolean filtered or wildcard filtered queries such as:

{{< img src="dashboards/querying/booleanfilters.png" alt="Graphing with Boolean Filters"  style="width:75%;" >}} 

To learn more about tags, refer to the [Tagging][7] documentation.

### Aggregate and rollup

#### Aggregation method

Aggregation method is next to the filter dropdown. This defaults to `avg by` but you can change the method to `max by`, `min by`, or `sum by`. In most cases, the metric has many values for each time interval, coming from many hosts or instances. The aggregation method chosen determines how the metrics are aggregated into a single line.

#### Aggregation groups

Next to the aggregation method dropdown, choose what constitutes a line or grouping on a graph. For example, if you choose `host`, there is a line for every `host`. Each line is made up of the selected metric on a particular `host` aggregated using the chosen method.

Additionally, you can click the tags in the metric dropdown used for [choosing the metric](#choose-the-metric-to-graph) to group and aggregate your data.

{{< img src="dashboards/querying/metric_tags.png" alt="Metric Tags"  style="width:75%;" >}}

#### Rollup to aggregate over time

Regardless of the options chosen above, there is always some aggregation of data due to the physical size constraints of the window holding the graph. If a metric is updated every second, and you are looking at 4 hours of data, you need 14,400 points to display everything. Each graph displayed has about 300 points shown at any given time. Therefore, each point displayed on the screen represents 48 data points.

In practice, metrics are collected by the Agent every 15-20 seconds. So one day's worth of data is 4,320 data points. If you display a day's worth of data on single graph, Datadog automatically rolls up the data. For more details, see the [Metrics Introduction][8].

To manually rollup the data, use the [rollup function][9]. Click the plus sign to the right of the aggregation group and choose `rollup` from the dropdown. Then choose how you want to aggregate the data and the interval in seconds.

This query creates a single line that represents the total available disk space, on average, across all machines rolled up in 1 min buckets:

{{< img src="dashboards/querying/references-graphing-rollup-example-2.png" alt="rollup example"  style="width:90%;">}}

When switching to the JSON view, the query looks like this:

```text
"query": "avg:system.disk.free{*}.rollup(avg, 60)"
```

The full JSON looks like this:

```text
{
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "query1"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.disk.free{*}.rollup(avg, 60)"
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ],
    "yaxis": {
        "scale": "linear",
        "min": "auto",
        "max": "auto",
        "include_zero": true,
        "label": ""
    },
    "markers": []
}
```

For more about using the JSON view, see [Graphing with JSON][1].

### Advanced graphing

Depending on your analysis needs, you may choose to apply other mathematical functions to the query. Examples include rates and derivatives, smoothing, and others. See the [list of available functions][10].

Datadog also supports the ability to graph your metrics, logs, traces, and other data sources with various arithmetic operations. Use: `+`, `-`, `/`, and `*` to modify the values displayed on your graphs. This syntax allows for both integer values and arithmetic using multiple metrics.

To graph metrics separately, use the comma (`,`). For example, `a, b, c`.

**Note**: Queries using commas are only supported in visualisations, they do not work on monitors. Use [boolean operators][11] or arithmetic operations to combine multiple metrics in a monitor.

#### Metric arithmetic using an integer

Modify the displayed value of a metric on a graph by performing an arithmetic operation. For example, to visualize the double of a specific metric, click the **Advanced...** link in the graph editor. Then enter your arithmetic in the `Formula` box, in this case: `a * 2`:

{{< img src="dashboards/querying/arithmetic_4.png" alt="Formula example - multiply"  style="width:75%;" >}}

#### Arithmetic between two metrics

Visualize the percentage of a metric by dividing one metric over another, for example:

```text
jvm.heap_memory / jvm.heap_memory_max
```

Use the **Advanced...** option in the graph editor and select **Add Query**. Each query is assigned a letter in alphabetical order: the first metric is represented by `a`, the second metric is represented by `b`, etc.

Then in the `Formula` box, enter the arithmetic (`a / b` for this example). To display only the formula on your graph, click on the check marks next to the metrics `a` and `b`.

{{< img src="dashboards/querying/arithmetic_5.png" alt="Formula example - ratio"  style="width:75%;" >}}

Here is another example showing how you can graph the ratio between `error` logs and `info` logs.

```text
status:error / status:info
```

{{< img src="dashboards/querying/arithmetic_6.png" alt="Formula example - logs ratio"  style="width:75%;" >}}


**Note**: Formulas are not lettered. Arithmetic cannot be done between formulas.

### Create an alias

You can create a custom alias for your data sources to make it easier for your users to interpret the graph results.

{{< img src="dashboards/querying/custom_alias.png" alt="Custom alias"  style="width:75%;" >}}

### Create a title

If you do not enter a title, one is automatically generated based on your selections. However, it is recommended that you create a title that describes the purpose of the graph.

### Save

Click **Done** to save your work and exit the editor. You can always come back to the editor to change the graph. If you make changes you don't want to save, click **Cancel**.

## Configuring an APM stats graph

To configure your graph using APM stats data, follow these steps:

1. [Select your visualization](#select-your-visualization) (same as for Metrics)
2. [Choose your level of detail](#level-of-detail)
3. [Choose your parameters](#apm-stats-parameters)
4. [Title the graph](#create-a-title) (same as for Metrics)

### Level of detail
Choose what level of detail you want to see statistics for: one or more services, resources, or spans. (Not all of these are available for every widget type.)

### APM stats parameters
Select the following parameters from the graphing editor: Environment (`env`), Primary tag (`primary_tag`), Service (`service`), and Operation name (`name`).

If your level of detail is resource or span, some widget types also require you to select a Resource name (`resource`) to narrow the scope of your query.

## Configuring an Incident Analytics graph
Incident Analytics provides you with the following measures:

* Incident Count
* Customer Impact Duration
* Status Active Duration
* Status Stable Duration
* Time to Repair (customer impact end time - created time)
* Time to Resolve (resolved time - created time)

Incident Analytics is supported in the following widgets:

* Timeseries
* Top List 
* Query Value 

To configure your graph using Incident Analytics data, follow these steps:

1. [Select your visualization](#select-your-visualization) (same as for metrics)
2. Select `Incidents` from the data source dropdown menu
3. Select a measure from the yellow dropdown menu
     - **Default Statistic:** Count the number of incidents
5. Select an aggregation for the measure
6. (Optional) Select a rollup for the measure
7. (Optional) Use the search bar to filter the statistic down to a specific subset of incidents
8. (Optional) Select a facet in the pink dropdown menu to break the measure up by group and select a limited number of groups to display 
9. [Title the graph](#create-a-title) (same as for metrics)
10. Save your widget

**Example:** Weekly Outage Customer Impact Duration by Service

1. Widget: Timeseries Line Graph
2. Datasource: `Incidents`
3. Measure: `Customer Impact Duration`
4. Aggregation: `avg`
5. Rollup: `1w`
6. Filter: `severity:(“SEV-1” OR “SEV-2”)`
7. Group: `Services`, limit to top 5

## Additional options

### Event overlays

View event correlations by using the **Event Overlays** section in the graphing editor. In the search field, enter any text or structured search query. For details on searching, see the Datadog [Event Query Language][12].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/graphing_json/
[2]: /dashboards/widgets/
[3]: https://app.datadoghq.com/metric/explorer
[4]: https://app.datadoghq.com/notebook/list
[5]: https://app.datadoghq.com/metric/summary
[6]: /metrics/advanced-filtering/
[7]: /getting_started/tagging/
[8]: /metrics/introduction/
[9]: /dashboards/functions/rollup/
[10]: /dashboards/functions/#apply-functions-optional
[11]: /metrics/advanced-filtering/#boolean-filtered-queries
[12]: /events/#event-query-language
