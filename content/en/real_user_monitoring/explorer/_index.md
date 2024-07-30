---
title: RUM Explorer
aliases:
- /real_user_monitoring/rum_explorer
further_reading:
- link: "/real_user_monitoring/explorer/search/"
  tag: "Documentation"
  text: "Learn more about search in the RUM Explorer"
- link: "https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals"
  tag: "Blog"
  text: "Monitor Core Web Vitals with RUM"
- link: "https://www.datadoghq.com/blog/modern-frontend-monitoring/"
  tag: "Blog"
  text: "Start monitoring single-page applications"
---

## Overview

The [Real User Monitoring (RUM) Explorer][1] allows you to examine data collected from your applications and granular information about your RUM events.

You can:

- Navigate through user sessions
- Investigate performance issues affecting views, resources, or actions
- Troubleshoot application errors and long tasks

{{< img src="real_user_monitoring/explorer/rum-explorer-2.png" alt="RUM Explorer" style="width:95%;" >}}

## View by application

Use the application selector in the top navigation to select and view all RUM data for a specific application.

{{< img src="real_user_monitoring/explorer/application-selector-2.png" alt="Click the application selector to view all RUM data for a specific application" style="width:95%;" >}}

## Search and filter

Search and filter your RUM events by typing in the search bar and selecting a visualization type in the [RUM Explorer][1]. You can narrow down, broaden, and shift your focus on subsets of events you are interested in.

## Group

Group the RUM events you have queried into higher-level entities that may help you derive or consolidate information about an issue. To identify event patterns and aggregate events by subsets, see [Group RUM Events][2]. 

To start creating queries and using facets, see [Search Syntax][3]. 

## Visualize 

Select a visualization for your filters and aggregations that displays your RUM events in a helpful perspective for you to uncover decisive information. 

For example, you can view RUM events in a list, organize RUM data into columns, and see RUM data in a timeseries graph that displays your RUM telemetry over time. 

To start visualizing RUM data in the RUM Explorer, see [Create RUM Visualizations][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/sessions
[2]: /real_user_monitoring/explorer/group
[3]: /real_user_monitoring/explorer/search_syntax
[4]: /real_user_monitoring/explorer/visualize
