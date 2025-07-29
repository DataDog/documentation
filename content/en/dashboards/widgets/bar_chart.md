---
title: Bar Chart Widget
widget_type: bar_chart
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/dashboards/widgets/top_list"
  tag: "Documentation"
  text: "Top List Widget"
- link: "/dashboards/widgets/pie_chart"
  tag: "Documentation"
  text: "Pie Chart Widget"
- link: "/dashboards/guide/context-links/#overview/"
  tag: "Documentation"
  text: "Context Links"
---

## Overview

{{< img src="/dashboards/widgets/bar_chart/bar_chart.png" alt="Bar chart widget example visualization" style="width:100%;" >}}

The Bar Chart widget is part of the same data family as the Top List, Treemap, and Pie Chart widgets, using categorical axes rather than temporal axes like timeseries bar graphs. It displays categorical data using vertical bars, allowing you to compare values across different categories or groups. Unlike the horizontal top list widget, the bar chart uses a vertical orientation which is particularly useful for dashboards with wide and short aspect ratios, or when you want to focus on value comparison rather than ranking.

Use the Bar Chart when visual comparison across categories matters more than reading exact tag values. Use the Top List to prioritize label readability (such as long tag names) or need a ranked list format.

## Setup

### Configuration

1. Select from the available data sources.
2. Configure the query, see the following resources for more information:
    * Metrics: See the [querying ][1] documentation to configure a metric query.
    * Events: See the [log search][2] documentation to configure a log event query.
3. (Optional) Modify query with a [formula][3].
4. Customize your graph.

### Options
#### Display mode

The bar chart widget supports multiple levels of grouping with stacked visualization, enabling you to break down data by multiple dimensions. You can choose between **Stacked** mode to show grouped data as layered bars, or **Flat** mode to display individual bars for each group.

- **Stacked mode**: Shows grouped data as layered bars within each category.
- **Flat mode**: Displays individual bars for each group.
- **Relative mode**: Shows values as percentages of the total (only for scalar data).
- **Absolute mode**: Shows raw count values.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dashboards/
[2]: /dashboards/graphing_json/widget_json/
[3]: /dashboards/guide/context-links/