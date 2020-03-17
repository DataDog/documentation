---
title: Log Analytics
kind: documentation
description: "Perform Log Analytics"
aliases:
  - /logs/graph
  - /logs/analytics
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: "Discover how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "logs/explorer"
  tag: "Documentation"
  text: "See how to explore your logs"
- link: "logs/explorer/patterns"
  tag: Documentation
  text: "Detect patterns inside your logs"
---

## Overview

Log analytics extend the log search page with log aggregation and split capabilities for troubleshooting and monitoring.
You can access the analytics page from any log explorer view by clicking on the "Analytics" icon next to the search query bar.

{{< img src="logs/explorer/analytics/explorer-button.png" alt="Logs Explorer" style="width:50%;" >}}

You can control:

* the query that filters the set of logs to analyze
* the dimensions over which to split data
* the visualization method for aggregates and splits

From an analytics visualization, you can, additionally:

* create a widget in a dashboard out of that visualization
* create a monitor out of that query
* deep dive into subsets of the log list, depending on the interactions that the visualization enables

Save a log analytics view with the "Save As" button. You can load your teammates' saved views from the "Saved Views" tab.

## Build an analytics query

Use the query to control what's displayed in your Log Analytics:

1. Choose a [Measure][1] or [Facet][1] to graph. [Measure][1] lets you choose the aggregation function whereas [Facet][1] displays the unique count.

    {{< img src="logs/explorer/analytics/choose_measure_facet.png" alt="choose measure facet"  style="width:50%;">}}
2. Select the aggregation function for the [Measure][1] you want to graph:

    {{< img src="logs/explorer/analytics/agg_function_log_graph.png" alt="aggregation function for Log Analytics"  style="width:50%;">}}

3. Use [Tag][1] or [Facet][1] to split your graph.

    {{< img src="logs/explorer/analytics/split_by_log_graph.png" alt="split by Log Analytics"  style="width:50%;">}}

4. Choose to display either the *X* **top** or **bottom** values according to the selected [measure][1].

    {{< img src="logs/explorer/analytics/top_bottom_button.png" alt="top bottom button"  style="width:20%;">}}

5. Choose the Timesteps graph.
  Changing the global timeframe changes the list of available Timesteps values.

    {{< img src="logs/explorer/analytics/timesteps.png" alt="Timestep"  style="width:30%;">}}

## Visualizations

Select a Log Analytics visualization type using the graph selector:

{{< img src="logs/explorer/analytics/graph_selector.png" alt="Log Analytics selector"  style="width:30%;">}}

Available visualizations:

{{< tabs >}}
{{% tab "Timeseries" %}}

Visualize the evolution of a single [measure][1] (or a [facet][1] unique count of values) over a selected time frame, and (optionally) split by an available [facet][1].

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

The following timeseries Log Analytics shows:
The evolution of the **top 5 URL Paths** according to the number of **unique Client IPs** over the last month.

{{< img src="logs/explorer/analytics/timeserie_example.png" alt="timeserie example"  style="width:90%;">}}

[1]: /logs/explorer/facets
{{% /tab %}}

{{% tab "Top List" %}}

Visualize the top values from a [facet][1] according to the chosen [measure][1]:

The following Top List Log Analytics shows:
The evolution of the **top 5 URL Paths** according to the number of **unique Client IPs** over the last month.

{{< img src="logs/explorer/analytics/top_list_example.png" alt="top list example"  style="width:90%;">}}

[1]: /logs/explorer/facets
{{% /tab %}}

{{% tab "Table" %}}

Visualize the top values from a [facet][1] according to a chosen [measure][1] (the first measure you choose in the list), and display the value of additional measures for elements appearing in this top. Update search query or drill through logs corresponding to either dimension.

* When there are multiple dimensions, the top values are determined according to the first dimension, then according to the second dimension within the top values of the first dimension, then according to the third dimension within the top values of the second dimension.
* When there are multiple measures, the top or bottom list is determined according to the first measure.
* The subtotal may differ from the actual sum of values in a group, since only a subset (top or bottom) is displayed. Events with a null or empty value for this dimension are not displayed as a sub-group.

 **Note**: A table visualisation used for one single measure and one single dimension is the same as a toplist, just with a different display.

 The following Table Log Analytics shows the evolution of the **top Status Codes** according to their **Throughput**, along with the number of unique **Client IPs**, and over the last 15 minutes:

{{< img src="logs/explorer/analytics/logs_table_example.png" alt="table example"  style="width:90%;">}}

[1]: /logs/explorer/facets
{{% /tab %}}

{{< /tabs >}}

## Related logs

Select or click on a section of the graph to either zoom in the graph or see the list of logs corresponding to your selection:

{{< img src="logs/explorer/analytics/view_logs.mp4" alt="view logs" video="true"  width="80%" >}}

## How aggregations work behind the scenes

Datadog computes an aggregation (whether it is a mean, a sum, a percentile, etc.) by using the set of logs included in the targeted time frame.

Let's illustrate this on a fictive bar timeline where each bar represents a time interval. In this example, Datadog creates one aggregation for each of the time intervals for the entire set of logs. Note that log events are not necessarily uniformly time-distributed, so you can not necessarily create aggregations for the same amount of logs.

In the following example, each dot represents one log event. The X-axis is the timestamp of the log, and the Y-axis is the value of a duration attribute borne by logs. The timeseries displays a maximum-aggregation. Datadog displays a timeline with a rollout parameter; for example, there are 4 bars for the whole time frame.

{{< img src="logs/explorer/analytics/aggregation_howto.mp4" alt="top list example" video="true"  >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/facets
