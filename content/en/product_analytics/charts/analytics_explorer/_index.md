---
title: Analytics Explorer
description: ""
aliases:
- /product_analytics/analytics_explorer/
- /product_analytics/journeys
further_reading:
- link: "/real_user_monitoring/explorer/search/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/dashboards/functions/"
  tag: "Documentation"
  text: "Add a function to your query"
- link: "https://www.datadoghq.com/blog/datadog-geomaps/"
  tag: "Blog"
  text: "Use geomaps to visualize your app data by location"
- link: "https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/"
  tag: "Blog"
  text: "Use funnel analysis to understand and optimize key user flows"
---

## Overview

The [Analytics Explorer][1] page contains views data aggregation for understanding how your product is being used. You can control:

* The event type (Sessions, Views, or Actions) to see views by.
* The query that filters the set of views to analyze.
* The dimensions over which to split data.
* The visualization method for aggregates and splits.

With Analytics visualizations, you can:

* Create a widget in a dashboard out of that visualization.
* Dive deeper into subsets of the events list depending on the interactions that the visualization enables.

## Using the analytics chart
{{< whatsnext desc="Follow these links here to learn how to use the analytics search syntax, view events, and vizualise, group, and export views. " >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/search_syntax" >}}Search syntax{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/events" >}} Events {{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/visualize" >}}Visualize{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/group" >}}Groups{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/export" >}}Export{{< /nextlink >}}
{{< /whatsnext >}}

## Build a query

In [Analytics][1], customize your display by adding facets and measures to your search query. 

1. Select a [view event type][2].

   {{< img src="product_analytics/analytics/view_type_selection1.png" alt="Drop down menu in Product Analytics scoped to the Views type selection." style="width:70%;">}}

1. Choose a measure to graph the unique count.

   {{< img src="product_analytics/analytics/measure_selection1.png" alt="Drop down menu in Product Analytics for choosing a measure to graph the unique count." style="width:70%;">}}

1. Filter by event attributes or attributes from [third party integrations][6].

   {{< img src="product_analytics/analytics/pana_analytics_filter_by.png" alt="Drop down menu in Product Analytics to filter events by their own attributes or by attributes pulled from third party integrations." style="width:70%;">}}

1. Choose an event attribute to further break down results.

   {{< img src="product_analytics/analytics/pana_analytics_breakdown_by1.png" alt="Drop down menu in Product Analytics to further breakdown events by their own attributes or by attributes pulled from third party integrations." style="width:70%;">}}

1. Apply a [function][4] to modify how the results of the query are returned for visualizations.

   {{< img src="product_analytics/analytics/pana_analytics_functions.png" alt="Button in Product Analytics to add a function to modify how the results of a metric query are returned for visualizations.." style="width:70%;">}}

1. Choose the [graph type][5] and time interval for your graph. Changing the global timeframe changes the list of available timestep values.

   {{< img src="product_analytics/analytics/pana_analytics_time_interval2.png" alt="Choose a graph type and time interval for your graph." style="width:50%;">}}



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/explorer
[2]: /real_user_monitoring/guide/understanding-the-rum-event-hierarchy/
[3]: /product_analytics/charts/analytics_explorer/group
[4]: /dashboards/functions/#overview
[5]: /product_analytics/charts/analytics_explorer/visualize/
[6]: https://app.datadoghq.com/product-analytics/integrations/custom-attributes