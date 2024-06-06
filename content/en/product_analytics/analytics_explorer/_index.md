---
title: Analytics
kind: documentation
description: ""
aliases:
  - /real_user_monitoring/rum_analytics
  - /real_user_monitoring/analytics
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

The Analytics page contains views data aggregation for understanding how your product is being used. You can control:

* The event type (Sessions, Views, or Actions) to see views by.
* The query that filters the set of views to analyze.
* The dimensions over which to split data.
* The visualization method for aggregates and splits.

With Analytics visualizations, you can:

* Create a widget in a dashboard out of that visualization.
* Dive deeper into subsets of the events list depending on the interactions that the visualization enables.

## Build a query

In [Analytics][1], customize your display by adding facets and measures to your search query. 

1. Select a [view event type][2].

   {{< img src="product_analytics/analytics/view_type_selection.png" alt="View type selection." style="width:50%;">}}

2. Choose a measure to graph the unique count.

    {{< img src="product_analytics/analytics/measure_selection.png" alt="Choose a measure to graph the unique count." style="width:50%;">}}

4. Choose a field to [group][3] the measure by.

    {{< img src="product_analytics/analytics/group_breakdown.png" alt="Group the measure by specific fields." style="width:50%;">}}

5. Choose the time interval for your graph. Changing the global timeframe changes the list of available timestep values.

    {{< img src="product_analytics/analytics/time_interval.png" alt="Choose a time interval for your graph." style="width:50%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/analytics
[2]: /real_user_monitoring/guide/understanding-the-rum-event-hierarchy/
[3]: /product_analytics/group/