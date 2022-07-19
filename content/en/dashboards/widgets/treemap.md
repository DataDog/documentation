---
title: Treemap Widget
kind: documentation
description: "Graph proportions of one or more datasets"
aliases:
    - /graphing/widgets/treemap/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/dashboards/widgets/pie_chart/"
  tag: "Documentation"
  text: "Pie Chart Widget"
---

The treemap widget allows you to display proportions of one or datasets. This widget can display a single dataset with corresponding proportions, or multiple datasets with nested proportions.

{{< img src="dashboards/widgets/treemap/treemap_overview.png" alt="A treemap widget with unique page views stemming from the Real User Monitoring (RUM) dataset are shown at both the country and browser level. The outer groups - distinguished by color - shows the user’s country.">}}

## Configuration

1. Select one or more data sources from metrics or events.
    * Metrics: See the [querying ][1] documentation to configure a metric query.
    * Events: See the [log search][2] documentation to configure a log event query.
2. (Optional) Modify query with a [formula][3].
3. Customize your graph.

## Customization

### Context links

[Context links][4] are enabled by default, and can be toggled on or off. Context links bridge dashboard widgets with other pages (in Datadog, or third-party).

## Display and interaction

### Filter and focus

In the case where multiple groups of data are plotted at once, you can filter the widget to a single category and view proportions within it.

To filter and focus on a single category, hover over the outer portion of the category, and click. To go back to the previous view, click the **back** button on the top left header of the widget.

{{< img src="dashboards/widgets/treemap/focus_animation.mp4" alt="Animation showing how to filter and view a single category at a time in the treemap widget." video="true">}}

### Accessing the context menu

To access the context menu, first hover over an individual category: this can be a nested category, or group - such as **Canada**, or **Canada > Chrome** in the following example. This reveals a vertical ellipsis button in the top right corner. When clicked, the context menu appears.

{{< img src="dashboards/widgets/treemap/context_menu.png" alt="The triple ellipsis button is revealed when hovering over a category">}}

### Full-screen

Viewing the pie chart widget in full-screen reveals the standard set of [full-screen options][5].

## API

This widget can be used with the [Dashboards API][6].

The dedicated [widget JSON schema definition][7] for the treemap widget is:

{{< dashboards-widgets-api >}}

## Pie chart widget

Like the treemap widget, the [pie chart widget][8] can also be used to display nested proportions. The primary difference between the two is that the pie chart displays proportions in radial slices, and the treemap displays nested rectangles.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/querying
[2]: /logs/explorer/search_syntax/
[3]: /dashboards/functions/
[4]: /dashboards/guide/context-links/
[5]: /dashboards/widgets/#full-screen
[6]: /api/latest/dashboards/
[7]: /dashboards/graphing_json/widget_json/
[8]: /dashboards/widgets/pie_chart/
