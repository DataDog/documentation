---
title: Visualize
kind: documentation
further_reading:
- link: "/real_user_monitoring/explorer/search/"
  tag: "Documentation"
  text: "Search for your events"
---

## Overview

Visualizations define the outcomes of the filters and aggregates displayed in the [RUM Explorer][1]. Select the relevant visualization type to surface the information you need under the search query.

## Lists

Lists are paginated results of events and are ideal when individual results matter. You do not need prior knowledge of what defines a matching result to use lists.

{{< img src="real_user_monitoring/explorer/visualize/rum_explorer_lists-1.mp4" alt="Lists in the RUM Explorer" video="true" style="width:70%;" >}}

The information you search for is displayed in columns. You can manage the following:

- The table with available interactions on the first row. You can sort, rearrange, and remove columns.
- The facet panel on the left or the RUM [event side panel][2] on the right. You can add a column for a field. 

By default, RUM events in the list visualization are organized by timestamp, with the most recent events listed first. You can sort events in any way you want, such as with facets. Surface RUM events with the lowest or highest value for a measure first, then sort your events lexicographically for the unique value of a facet. This orders a column according to the facet.

While you can add attributes and tags in columns, Datadog recommends sorting the table if you have [declared a facet][3] first. To see the value of a custom attribute for a line item on the table, you can add non-faceted attributes in the columns, but they may not sort correctly.

The RUM events table configuration is stored with additional elements of your troubleshooting context in [Saved Views][4].

### List widget

The [List Widget on dashboards][8] shows individual events for a given data source, including RUM data. You can use the list widget to view any RUM events on a dashboard, like all errors on a particular page for example. 

In addition to dashboards, the list widget can be used in Notebooks as well, allowing you to add RUM events as part of reports and investigations. 

## Timeseries

Visualize the evolution of a single measure (or a [facet][5] unique count of values) over a selected time frame, and optionally, split by an available [facet][5].

{{< img src="real_user_monitoring/explorer/visualize/timeseries-2.png" alt="Timeseries graph in the RUM Explorer" style="width:90%;" >}}

The timeseries graph depicts the evolution of the number of pageviews on the Shopist application over the past day for every view path.

You can choose additional display options such as:

- Display: Results are shown as bars (recommended for counts and unique counts), lines (recommended for statistical aggregations), areas, and several color sets are available.
- The roll-up interval: Determines the width of buckets in the bars.

## Top list

Visualize the top values from a facet based on your chosen measure.

{{< img src="real_user_monitoring/explorer/visualize/top-list-2.png" alt="Top list bar graph in the RUM Explorer" style="width:90%;" >}}

The top list includes the top browsers used to visit the Shopist website over the last day.

## Nested tables

Visualize the top values from up to three [facets][5] according to your chosen [measure][5] (the first measure you choose in the list) and display the value of additional measures for elements that appear in the nested table. Update the search query or investigate the RUM events corresponding to either dimension.

* When there are multiple measures, the top or bottom list is determined according to the first measure.
* The subtotal may differ from the actual sum of values in a group since only a subset (top or bottom) is displayed. Events with a null or empty value for this dimension are not displayed as a sub-group.

 **Note**: A table visualization used for one single measure and one single dimension is the same as a [top list](#top-list), just with a different display.

 The following RUM Analytics table shows the **top 5 URL paths** for **two countries**, US and Japan, grouped by browser, over the last day:

{{< img src="real_user_monitoring/explorer/visualize/nested-table-4.png" alt="Nested table in the RUM Explorer" style="width:90%;">}}

## Distributions

You can display the distribution of measure attributes over the selected time frame to see the values fluctuate. 

{{< img src="real_user_monitoring/explorer/visualize/distribution-2.png" alt="Distribution graph in the RUM Explorer" style="width:90%;">}}

The distribution graph displays the distribution of the Largest Contentful Paint that measures the user experience of the Shopist landing page. 

## Geomaps

Visualize a single [measure][5] (or a [facet][5] unique count of values) on the world map.

{{< img src="real_user_monitoring/explorer/visualize/geomap-2.png" alt="Geographical map in the RUM Explorer" style="width:90%;">}}

The RUM Analytics geomap shows the 75th percentile of the **Largest Contentful Paint** over the past day.

## Funnels
Learn about [funnel analysis][9].
## Tree Maps
A tree map helps you organize and show data as a percentage of a whole in a visually appealing format. Tree maps display data in nested rectangles. Compare different dimensions using both size and colors of the rectangles. You can also select multiple attributes to view a hierarchy of rectangles.

The following tree map shows the percentage breakdown by **View Name**.

{{< img src="real_user_monitoring/explorer/visualize/tree-map.png" alt="Tree map in the RUM Explorer" style="width:90%;">}}
## Pie charts
A pie chart helps you organize and show data as a percentage of a whole. It is useful when comparing the relationship between different dimensions such as services, users, hosts, countries, etc. within your log data.

The following pie chart shows the percentage breakdown by **View Path**.

{{< img src="real_user_monitoring/explorer/visualize/pie-chart.png" alt="Pie chart in the RUM Explorer" style="width:90%;">}}

## Related events

For all visualizations besides the [funnel](#funnels), select a section of the graph or click on the graph to either zoom in or see a list of events that correspond to your selection.

{{< img src="real_user_monitoring/explorer/visualize/related-events-2.png" alt="Related events link available when you click on the graph" width="90%" >}}

For funnel graphs, click on the graph to see a list of converted and dropped off sessions that correspond to your queries.

For the remaining visualization options, click on the graph and click **View events** to see a list of events that correspond to your selection. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/
[2]: /real_user_monitoring/explorer/events/
[3]: /logs/explorer/facets/
[4]: /real_user_monitoring/explorer/saved_views/
[5]: /real_user_monitoring/explorer/search#setup-facets-and-measures
[6]: /notebooks
[7]: /real_user_monitoring/explorer/export/
[8]: /dashboards/widgets/list/
[9]: /product_analytics/funnel_analysis
