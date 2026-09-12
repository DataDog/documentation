---
title: Analytics
description: "Build and visualize custom analytics queries using events, measures, filters, and breakdowns."
aliases:
- /product_analytics/analytics_explorer/
- /product_analytics/journeys
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-geomaps/"
  tag: "Blog"
  text: "Use geomaps to visualize your app data by location"
---

Analytics charts start from a single query: an event, a measure, and any filters. Define these once, then choose how to visualize the result. 

Use analytics charts to:

- Scope results to a specific event type, such as sessions, views, or actions.
- Filter events down to the specific set you want to analyze.
- Split results across one or more dimensions.
- Choose the visualization that best fits your aggregated data.
- Turn a visualization into a dashboard widget.
- Examine the underlying events behind any chart.

{{< img src="/product_analytics/analytics/analytics_chart.png" alt="An example Analytics chart." style="width:90%;" >}}

## Build a query

A query defines what an analytics chart measures, independent of how you later choose to display it.

{{< img src="/product_analytics/analytics/analytics_query_builder.png" alt="An Analytics query builder with numbered callouts for the query display name, the event picker, the measure selector, and the filter, breakdown, function, and additional query controls." style="width:90%;" >}}
   
1. In {{< ui >}}Product Analytics{{< /ui >}}, select {{< ui >}}Create New{{< /ui >}} > {{< ui >}}Analytics{{< /ui >}}.

2. (Optional) Enter a {{< ui >}}Query display name{{< /ui >}} to label the query.
   
3. Click the event picker to select which events the query includes, such as a specific view or session. Use the tabs inside the picker to narrow the list by event category: {{< ui >}}Sessions{{< /ui >}}, {{< ui >}}Views{{< /ui >}}, {{< ui >}}Labeled actions{{< /ui >}}, {{< ui >}}Actions{{< /ui >}}, or {{< ui >}}Server actions{{< /ui >}}.

4. Choose how the query measures selected events using {{< ui >}}Viewed as count of{{< /ui >}}. Select {{< ui >}}All events{{< /ui >}} to count every occurrence, or select a specific property, such as {{< ui >}}User Id{{< /ui >}}, to count unique values instead.

5. (Optional) Scope the query by event, user, segment, or account properties, including custom attributes from third-party integrations, using {{< ui >}}Add filter{{< /ui >}}.

6. (Optional) Compare results across the values of a property, such as country or view name, using {{< ui >}}Add breakdown{{< /ui >}}.

   <div class="alert alert-info">{{< ui >}}Query Value{{< /ui >}} charts remove breakdowns, and {{< ui >}}Geomap{{< /ui >}} charts convert them to a location facet.</div>

7. (Optional) Apply a function that transforms the query, such as calculating a rate of change or smoothing the data, using {{< ui >}}Σ{{< /ui >}}. See [Functions][1] for details.
   
8. (Optional) Run a second, independent query alongside the first using {{< ui >}}Add Query{{< /ui >}}. Combine multiple queries into a single result, using {{< ui >}}Add Formula{{< /ui >}}.

   <div class="alert alert-info">Formulas are supported only for the {{< ui >}}Timeseries{{< /ui >}}, {{< ui >}}Table{{< /ui >}}, and {{< ui >}}Change{{< /ui >}} chart types.</div>

## Understand an analytics chart

After you build a query, the chart displays your data using the event, measure, filters, and breakdown you defined. From here, you can change how that data is visualized and displayed without changing the underlying query.

Not every option applies to every chart type. Rollup interval and display style, for example, apply only to {{< ui >}}Timeseries{{< /ui >}} charts.

{{< img src="product_analytics/analytics/analytics_analysis.png" alt="An Analytics chart with numbered callouts for the chart type selector, the rollup interval, the time range selector, the display selector, the datapoint options menu, and an in-progress interval." style="width:100%;" >}}

1. Use the chart type selector to switch between [chart types][2].

2. For {{< ui >}}Timeseries{{< /ui >}} charts, use the rollup selector to set the time interval each datapoint represents. Choose {{< ui >}}Default{{< /ui >}} to let the interval scale with the time range, or fix it to a specific value.

3. Use the time range selector to set the period of data the chart analyzes, from {{< ui >}}Past 1 Hour{{< /ui >}} to {{< ui >}}Past 1 Year{{< /ui >}}, or select a custom range from the calendar.

4. For {{< ui >}}Timeseries{{< /ui >}} charts, use the display selector to switch between {{< ui >}}Bars{{< /ui >}}, {{< ui >}}Lines{{< /ui >}}, and {{< ui >}}Areas{{< /ui >}}.

5. Hover over a datapoint to view details or click it to access options to zoom in, view underlying events, or search or exclude that value from the query.

6. Hatched segments indicate intervals that are still in progress. 

## Learn more
{{< whatsnext desc="Learn how to search, group, and visualize analytics events, and export or drill into individual events." >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/search_syntax" >}}Search syntax{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/events" >}} Events {{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/visualize" >}}Visualize{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/group" >}}Groups{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/export" >}}Export{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/functions/
[2]: /product_analytics/charts/analytics_explorer/visualize/
