---
title: RUM Analytics
kind: documentation
description: ""
beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/dash-2019-new-feature-roundup/#real-user-monitoring"
  tag: "Blog"
  text: "Real User Monitoring"
---

## Overview

Rum analytics extend the views explorer page with views data aggregation and split capabilities for troubleshooting and monitoring. You can control:

* the query that filters the set of views to analyze
* the dimensions over which to split data
* the visualization method for aggregates and splits

From an analytics visualization, you can, additionally:

* create a widget in a dashboard out of that visualization
* create a monitor out of that query
* deep dive into subsets of the views list, depending on the interactions that the visualization enables

## Build an analytics query

Use the query to control what's displayed in your RUM Analytics:

1. Choose a [Measure][1] or [Facet][2] to graph. [Measure][1] lets you choose the aggregation function whereas [Facet][2] displays the unique count.

    {{< img src="logs/explorer/analytics/choose_measure_facet.png" alt="choose measure facet" responsive="true" style="width:50%;">}}
2. Select the aggregation function for the [Measure][1] you want to graph:

    {{< img src="logs/explorer/analytics/agg_function_log_graph.png" alt="aggregation function for Log Analytics" responsive="true" style="width:50%;">}}

3. Use a [Facet][2] to split your graph.

    {{< img src="logs/explorer/analytics/split_by_log_graph.png" alt="split by Log Analytics" responsive="true" style="width:50%;">}}

4. Choose to display either the *X* **top** or **bottom** values according to the selected [measure][1].

    {{< img src="logs/explorer/analytics/top_bottom_button.png" alt="top bottom button" responsive="true" style="width:20%;">}}

5. Choose the Timesteps graph.
  Changing the global timeframe changes the list of available Timesteps values.

    {{< img src="logs/explorer/analytics/timesteps.png" alt="Timestep" responsive="true" style="width:30%;">}}

## Visualizations

Select a RUM Analytics visualization type using the graph selector:

{{< img src="logs/explorer/analytics/graph_selector.png" alt="Log Analytics selector" responsive="true" style="width:30%;">}}

Available visualizations:

{{< tabs >}}
{{% tab "Timeseries" %}}

Visualize the evolution of a single [measure][1] (or a [facet][2] unique count of values) over a selected time frame, and (optionally) split by an available [facet][2].

You have additional display options for timeseries:

* whether you display lines, bars, or areas
* data stacking option, by value, or by percentage
* color set

Noteworthy facts about stacking:

* Stacking is available only for query requests with a split.
* Stacking options are for bar and area displays only. Line displays are always overlapping.
* When you use a toplist option that hides part of your data, stacking does not show the total overall; rather, it shows only the subtotal for the top/bottom series.
* Stacking may not make sense when you have non-unique values in the split facet.
* Stacking may not make sense for some aggregration methods for measures.

The following timeseries RUM Analytics shows:

The evolution of the **top 5 URL Paths** according to the number of **unique Client IPs** over the last month.

{{< img src="logs/explorer/analytics/timeserie_example.png" alt="timeserie example" responsive="true" style="width:90%;">}}


[1]: /logs/explorer/?tab=measures#setup
[2]: /logs/explorer/?tab=facets#setup
{{% /tab %}}

{{% tab "Top List" %}}

Visualize the top values from a [facet][1] according to the chosen [measure][2]:

The following Top List RUM Analytics shows:

The evolution of the **top 5 URL Paths** according to the number of **unique Client IPs** over the last month.

{{< img src="logs/explorer/analytics/top_list_example.png" alt="top list example" responsive="true" style="width:90%;">}}


[1]: /logs/explorer/?tab=facets#setup
[2]: /logs/explorer/?tab=measures#setup
{{% /tab %}}
{{% tab "Table" %}}

Visualize the top values from a [facet][1] according to a chosen [measure][2] (the first measure you choose in the list), and display the value of additional measures for elements appearing in this top. Update search query or drill through logs corresponding to either dimension.

* When there are multiple dimensions, the top values are determined according to the first dimension, then according to the second dimension within the top values of the first dimension, then according to the third dimension within the top values of the second dimension.
* When there are multiple measures, the top or bottom list is determined according to the first measure.
* The subtotal may differ from the actual sum of values in a group, since only a subset (top or bottom) is displayed. Events with a null or empty value for this dimension are not displayed as a sub-group.

 **Note**: A table visualisation used for one single measure and one single dimension is the same as a toplist, just with a different display.

 The following Table Log Analytics shows the evolution of the **top Status Codes** according to their **Throughput**, along with the number of unique **Client IPs**, and over the last 15 minutes:

{{< img src="logs/explorer/analytics/logs_table_example.png" alt="table example" responsive="true" style="width:90%;">}}

[1]: /logs/explorer/?tab=facets#setup
[2]: /logs/explorer/?tab=measures#setup
{{% /tab %}}

{{< /tabs >}}

## Related Events

Select or click on a section of the graph to either zoom in the graph or see the list of events corresponding to your selection:

{{< img src="logs/explorer/analytics/view_logs.mp4" alt="view logs" video="true" responsive="true" width="80%" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/?tab=measures#setup
[2]: /logs/explorer/?tab=facets#setup
