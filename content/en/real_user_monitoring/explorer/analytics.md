---
title: RUM Analytics
kind: documentation
description: ""
aliases:
  - /real_user_monitoring/rum_analytics
  - /real_user_monitoring/analytics
further_reading:
- link: "/real_user_monitoring/explorer/search/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
---

## Overview

Real User Monitoring (RUM) Analytics extend the RUM Explorer page with views data aggregation and split capabilities for troubleshooting and monitoring. You can control:

* The query that filters the set of views to analyze.
* The dimensions over which to split data.
* The visualization method for aggregates and splits.

From an analytics visualization, you can, additionally:

* Create a widget in a dashboard out of that visualization.
* Dive deeper into subsets of the events list, depending on the interactions that the visualization enables.

## Build an analytics query

Use the query to control what's displayed in your RUM Analytics:

1. Choose a [measure][1] or [facet][2] to graph. [measure][1] lets you choose the aggregation function whereas [facet][2] displays the unique count.

    {{< img src="real_user_monitoring/explorer/analytics/measure_selection.png" alt="measure selection"  style="width:50%;">}}
2. Select the aggregation function for the [measure][1] you want to graph:

    {{< img src="real_user_monitoring/explorer/analytics/aggregation.png" alt="aggregation function for RUM Analytics" style="width:50%;">}}

3. Use a [facet][2] to split your graph.

    {{< img src="real_user_monitoring/explorer/analytics/break_down.png" alt="split by facet RUM Analytics" style="width:50%;">}}

4. Choose the time interval for your graph.
  Changing the global timeframe changes the list of available timestep values.

    {{< img src="real_user_monitoring/explorer/analytics/roll_up.png" alt="rollup" style="width:50%;">}}

5. Choose to display either the *X* **top** or **bottom** values according to the selected [measure][1].

    {{< img src="real_user_monitoring/explorer/analytics/top_bottom.png" alt="top bottom button" style="width:50%;">}}

## Visualizations

Select a RUM Analytics visualization type using the graph selector:

{{< img src="real_user_monitoring/explorer/analytics/graph_selector.png" alt="RUM Analytics graph selector" style="width:50%;">}}

Available visualizations:

{{< tabs >}}
{{% tab "Timeseries" %}}

Visualize the evolution of a single [measure][1] (or a [facet][2] unique count of values) over a selected time frame, and (optionally) split by an available [facet][2].

You have additional display options for timeseries:

* Whether you display lines, bars, or areas.
* Data stacking option: by value or by percentage.
* Color set.

Noteworthy facts about stacking:

* Stacking is available only for query requests with a split.
* Stacking options are for bar and area displays only. Line displays are always overlapping.
* When you use a toplist option that hides part of your data, stacking does not show the total overall; rather, it shows only the subtotal for the top/bottom series.
* Stacking may not make sense when you have non-unique values in the split facet.
* Stacking may not make sense for some aggregation methods for measures.

The following RUM Analytics timeseries shows:

The evolution of the **Browser Family** according to the **90th percentile** of **DOM interactive time** over the last 7 days.

{{< img src="real_user_monitoring/explorer/analytics/rum_timeserie_example.png" alt="timeserie rum example" style="width:90%;">}}

[1]: /real_user_monitoring/rum_explorer/?tab=measures#facets-measures
[2]: /real_user_monitoring/rum_explorer/?tab=facets#facets-measures
{{% /tab %}}

{{% tab "Top List" %}}

Visualize the top values from a [facet][1] according to the chosen [measure][2]:

The following RUM Analytics Top List shows:

The evolution of the **top 10 URL Paths** according to the number of **unique Sessions ID** over the last day.

{{< img src="real_user_monitoring/explorer/analytics/top_list_rum.png" alt="top list rum example" style="width:90%;">}}

[1]: /real_user_monitoring/rum_explorer/?tab=facets#facets-measures
[2]: /real_user_monitoring/rum_explorer/?tab=measures#facets-measures
{{% /tab %}}
{{% tab "Table" %}}

Visualize the top values from a [facet][1] according to a chosen [measure][2] (the first measure you choose in the list), and display the value of additional measures for elements appearing in this top value. Update search query or drill through events corresponding to either dimension.

* When there are multiple dimensions, the top values are determined according to the first dimension, then according to the second dimension within the top values of the first dimension, then according to the third dimension within the top values of the second dimension.
* When there are multiple measures, the top or bottom list is determined according to the first measure.
* The subtotal may differ from the actual sum of values in a group, since only a subset (top or bottom) is displayed. Events with a null or empty value for this dimension are not displayed as a sub-group.

 **Note**: A table visualization used for one single measure and one single dimension is the same as a toplist, just with a different display.

 The following RUM Analytics table shows the **top 5 URL path** for **two countries**: US and Japan consulted according to their amount of **Unique Session ID**, along with the 90th percentile of **Duration**, and over the last day:

{{< img src="real_user_monitoring/explorer/analytics/rum_table_example.png" alt="RUM table example" style="width:90%;">}}

[1]: /real_user_monitoring/rum_explorer/?tab=facets#facets-measures
[2]: /real_user_monitoring/rum_explorer/?tab=measures#facets-measures
{{% /tab %}}

{{< /tabs >}}

## Related events

Select or click on a section of the graph to either zoom in the graph or see the list of events corresponding to your selection:

{{< img src="real_user_monitoring/explorer/analytics/view_events.png" alt="view events" style="width:30%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/rum_explorer/?tab=measures#facets-measures
[2]: /real_user_monitoring/rum_explorer/?tab=facets#facets-measures
