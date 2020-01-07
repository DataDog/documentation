---
title: Viewing Analytics
kind: documentation
description: "Analytics on your APM data at infinite cardinality"
aliases:
  - /tracing/trace_search_analytics/analytics
  - /tracing/analytics
  - /tracing/visualization/analytics
  - /tracing/trace_search_and_analytics/analytics/
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
- link: "tracing/app_analytics/search"
  tag: "Documentation"
  text: "Global search of all your traces with tags"
---

## Overview

Use [App Analytics][1] to filter application performance metrics and [Analyzed Spans][2] by user-defined tags. It allows deep exploration of the web requests flowing through your service.

App Analytics can be enabled per APM [service][3] and per host. A service on which it is enabled exposes all its Analyzed Spans to Datadog.

Downstream services like databases and cache layers aren't in the list of available services (as they don't generate traces on their own), but their information is picked up by the top level services that call them.

## App Analytics query

Use the query to control what's displayed in your App Analytics:

1. Choose the `Duration` metric or a [Facet][4] to analyze. Selecting the `Duration` metric lets you choose the aggregation function whereas [Facet][4] displays the unique count.

    {{< img src="tracing/app_analytics/analytics/choose_measure_facet.png" alt="choose measure facet"  style="width:50%;">}}

2. Select the aggregation function for the `Duration` metric:

    {{< img src="tracing/app_analytics/analytics/agg_function.png" alt="aggregation function"  style="width:50%;">}}

3. Use [Tag][5] or [Facet][4] to split your Analytic.

    {{< img src="tracing/app_analytics/analytics/split_by.png" alt="split by"  style="width:50%;">}}

4. Choose to display either the *X* **top** or **bottom** values according to the selected [Facet][4] or `Duration`.

    {{< img src="tracing/app_analytics/analytics/top_bottom_button.png" alt="top bottom button"  style="width:20%;">}}

5. Choose the Analytic Timesteps.
  Changing the global timeframe changes the list of available Timesteps values.

    {{< img src="tracing/app_analytics/analytics/timesteps.png" alt="Timestep"  style="width:30%;">}}

## Visualizations

Select a App Analytics visualization type using the Analytic selector.

Available visualizations:

* [Timeseries](#timeseries)
* [Top List](#top-list)
* [Table](#table)

### Timeseries

Visualize the evolution of the `Duration` metric (or a [Facet][4] unique count of values) over a selected time frame, and (optionally) split by an available [Facet][4].

The following timeseries App Analytics shows:
The evolution of the **pc99** **duration** by steps of **5min** for each **Service**

{{< img src="tracing/app_analytics/analytics/timeserie_example.png" alt="timeserie example"  style="width:90%;">}}

### Top List

Visualize the top values from a [Facet][4] according to their `Duration` (or a [Facet][4] unique count of values):

The following Top List App Analytics shows:
The top **pc99** **duration** of **Service**

{{< img src="tracing/app_analytics/analytics/top_list_example.png" alt="top list example"  style="width:90%;">}}

### Table

Visualize the top values from a [facet][4] according to a chosen [measure][6] (the first measure you choose in the list), and display the value of additional measures for elements appearing in this top. Update search query or drill through logs corresponding to either dimension.

* When there are multiple dimensions, the top values are determined according to the first dimension, then according to the second dimension within the top values of the first dimension, then according to the third dimension within the top values of the second dimension.
* When there are multiple measures, the top or bottom list is determined according to the first measure.
* The subtotal may differ from the actual sum of values in a group, since only a subset (top or bottom) is displayed. Events with a null or empty value for this dimension are not displayed as a sub-group.

 **Note**: A table visualisation used for one single measure and one single dimension is the same as a toplist, just with a different display.

 The following Table Log Analytics shows the evolution of the **top Status Codes** according to their **Throughput**, along with the number of unique **Client IPs**, and over the last 15 minutes:

{{< img src="tracing/app_analytics/analytics/trace_table_example.png" alt="top list example"  style="width:90%;">}}

## Related Traces

Select or click on a section of the graph to either zoom in the graph or see the list of [traces][7] corresponding to your selection:

{{< img src="tracing/app_analytics/analytics/view_traces.png" alt="view Traces"  style="width:40%;">}}

## Export

{{< img src="tracing/app_analytics/analytics/export_button.png" alt="Export your analytics button"  style="width:40%;">}}

Export your App Analytics:

* To create a new [APM monitor][8]:
    This feature is not available yet.
* To an existing [Timeboard][9]:
    This functionality is in beta, [contact the Datadog support team][10] to activate it for your organization.

## Traces in Dashboard

Export [App Analytics][1] from the Trace search or build them directly in your [Dashboard][11] alongside metrics and logs.

[Learn more about the timeseries widget][12].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/app_analytics/
[2]: /tracing/visualization/#apm-event
[3]: /tracing/visualization/#services
[4]: /tracing/app_analytics/search/#facets
[5]: /tagging
[6]: /tracing/app_analytics/search/#measures
[7]: /tracing/visualization/#trace
[8]: /monitors/monitor_types/apm
[9]: /dashboards/timeboard
[10]: /help
[11]: /dashboards
[12]: /dashboards/widgets/timeseries
