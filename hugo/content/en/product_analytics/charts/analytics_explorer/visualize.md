---
title: Visualize
description: Choose a chart type, such as a timeseries, table, or treemap, to display your Product Analytics query results.
aliases:
- /product_analytics/analytics_explorer/visualize
---

After building an analytics query, use the chart type selector to control how results display.

Most chart types visualize a measure, a facet, or both:

Measure
: An attribute with a numerical value contained in your Product Analytics events, such as loading time.

Facet
: An attribute whose unique values you group or compare, such as country or browser.

You can click into most chart components for more detail, such as the underlying events for a datapoint or a narrower time range. The available options vary by chart type.

<div class="alert alert-tip">To see paginated, event-level results instead of an aggregated chart, use the {{< ui >}}Events{{< /ui >}} page. Events are ideal when individual results matter and you don't need prior knowledge of what defines a matching result.</div>

## Timeseries

Visualize the evolution of a single measure or facet over a selected time frame.

Choose additional display options, such as:

- Display: Results display as bars (recommended for counts and unique counts), lines (recommended for statistical aggregations), or areas. Several color sets are available.
- Rollup interval: Determines the width of buckets in the bars.

{{< img src="product_analytics/analytics/visualize/analytics-timeseries-3.png" alt="A view of the Timeseries chart in the Analytics chart builder" style="width:90%;" >}}

## Query value

Display a single aggregated value for a measure or facet over the selected time frame. Query value charts don't support breakdowns.

Optionally enable {{< ui >}}Change{{< /ui >}} to show how the value increased or decreased over a comparison period, such as the previous hour, day, or week.

{{< img src="product_analytics/analytics/visualize/analytics-query-value-1.png" alt="A view of the Query value chart in the Analytics chart builder" style="width:90%;" >}}

## Top list

Visualize an ordered ranking of a facet's top or bottom values by your chosen measure.

{{< img src="product_analytics/analytics/visualize/analytics-top-list-3.png" alt="A view of the Top list chart in the Analytics chart builder" style="width:90%;" >}}

## Bar chart

Compare a measure across the values of a facet using vertical columns.

{{< img src="product_analytics/analytics/visualize/analytics-bar-chart-1.png" alt="A view of the Bar chart in the Analytics chart builder" style="width:90%;" >}}

## Table

Visualize the top or bottom values from up to four facets, according to your chosen measure (the first measure you choose in the list). Additional measures display their values for elements that appear in the table. Update the search query or investigate the events corresponding to a dimension.

- When a table includes multiple measures, the top or bottom ranking is determined by the first measure.
- The subtotal may differ from the actual sum of values in a group, since only a subset (top or bottom) displays. Events with a null or empty value for a dimension don't display as a subgroup.

<div class="alert alert-info">A table with a single measure and a single breakdown is equivalent to a <a href="#top-list">top list</a>, displayed differently.</div>

{{< img src="product_analytics/analytics/visualize/analytics-table-1.png" alt="A view of the Table chart in the Analytics chart builder" style="width:90%;">}}

## Change

Show how a measure increased or decreased between the selected time period and a comparison period, such as the previous hour, day, or week. Optionally add a facet to see the change broken down by its values.

{{< img src="product_analytics/analytics/visualize/analytics-change-1.png" alt="A view of the Change chart in the Analytics chart builder" style="width:90%;" >}}

## Treemap

A treemap helps you organize and show data as a percentage of a whole in a visually appealing format. Treemaps display data in nested rectangles. Compare different facets using both the size and color of the rectangles.

{{< img src="product_analytics/analytics/visualize/analytics-treemap-1.png" alt="A view of the Treemap chart in the Analytics chart builder" style="width:90%;">}}

## Pie chart

A pie chart helps you organize and show data as a percentage of a whole. It's useful when comparing the relationship between different facets, such as countries, browsers, or view names.

{{< img src="product_analytics/analytics/visualize/analytics-pie-chart-2.png" alt="A view of the Pie chart in the Analytics chart builder" style="width:90%;">}}

## Geomap

Visualize a single measure or facet on a world map.

{{< img src="product_analytics/analytics/visualize/analytics-geomap-1.png" alt="A view of the Geomap chart in the Analytics chart builder" style="width:90%;">}}