---
title: RUM Analytics
kind: documentation
description: ""
aliases:
  - /real_user_monitoring/rum_analytics
  - /real_user_monitoring/analytics
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Explore your views within Datadog
- link: "https://www.datadoghq.com/blog/datadog-geomaps/"
  tag: Blog
  text: Use geomaps to visualize your app data by location
- link: "https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/"
  tag: Blog
  text: Use funnel analysis to understand and optimize key user flows
---

## Overview

Real User Monitoring (RUM) Analytics extend the RUM Explorer page with views data aggregation and split capabilities for troubleshooting and monitoring. You can control:

* The query that filters the set of views to analyze.
* The dimensions over which to split data.
* The visualization method for aggregates and splits.

With RUM Analytics visualizations, you can:

* Create a widget in a dashboard out of that visualization.
* Dive deeper into subsets of the events list depending on the interactions that the visualization enables.

## Build a query

In [RUM Analytics][1], customize your display by adding facets and measures to your search query. 

1. Choose a measure or facet to graph. A measure lets you choose the aggregation function, whereas a facet displays the unique count.

    {{< img src="real_user_monitoring/explorer/analytics/measure_selection.png" alt="measure selection" style="width:50%;">}}
2. Select the aggregation function for the measure you want to graph:

    {{< img src="real_user_monitoring/explorer/analytics/aggregation.png" alt="aggregation function for RUM Analytics" style="width:50%;">}}

3. Use a facet to split your graph.

    {{< img src="real_user_monitoring/explorer/analytics/break_down.png" alt="split by facet RUM Analytics" style="width:50%;">}}

4. Choose the time interval for your graph. Changing the global timeframe changes the list of available timestep values.

    {{< img src="real_user_monitoring/explorer/analytics/roll_up.png" alt="rollup" style="width:50%;">}}

5. Choose to display either the **top** or **bottom** values according to the selected measure.

    {{< img src="real_user_monitoring/explorer/analytics/top_bottom.png" alt="top bottom button" style="width:50%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/analytics
