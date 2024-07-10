---
title: Pie Chart Widget
widget_type: "sunburst"
description: "Graph proportions of one or more datasets."
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/dashboards/widgets/treemap/"
  tag: "Documentation"
  text: "Treemap Widget"
---

The pie chart widget can display a single dataset with corresponding proportions, or multiple datasets with nested proportions.

{{< img src="dashboards/widgets/pie_chart/pie_chart_overview.png" alt="A pie chart widget. The innermost ring shows the user's country, and the outermost ring is segmented proportionally to show the share of browsers used in each country." style="width:60%;">}}


## Configuration

1. Select from the available data sources.
2. Configure the query, see the following resources for more information:
    * Metrics: See the [querying ][1] documentation to configure a metric query.
    * Events: See the [log search][2] documentation to configure a log event query.
3. (Optional) Modify query with a [formula][3].
4. Customize your graph.

## Graph customization

### Total amount display

Toggle whether to show a total count in the center of the chart. By default, the **Automatic** option shows the total count once the graph reaches a certain size.

### Legend configuration

The legend can be turned off, displayed directly over chart segments with the **Aside** option, or as a **Table** listing each value, its color, and proportion.

By default, the **Automatic** option shows a labeled Aside legend within a dashboard, and displays both the **Aside** and **Table** legends when opened in full-screen.

{{< img src="dashboards/widgets/pie_chart/legend_automatic.png" alt="Pie chart Legend and Labeling options: Automatic, Table, Aside, and None" style="width:80%;">}}

### Context links

[Context links][4] are enabled by default, and can be toggled on or off. Context links bridge dashboard widgets with other pages (in Datadog, or third-party).

## Display and interaction

### Filter and focus

In the case where multiple groups of data are plotted at once, you can choose a single category and view proportions within it.

To view a single category, hover over the outer portion of the category ring, and click. To go back to the previous view, move your cursor to the center of the chart and click.

{{< img src="dashboards/widgets/pie_chart/interaction_animation.mp4" alt="Animation of pie chart interaction to filter and focus on a single category" video="true" style="width:80%;">}}

### Full-screen

Viewing the pie chart widget in full-screen reveals the standard set of [full-screen options][5].

## API

This widget can be used with the **[Dashboards API][6]**. See the following table for the [widget JSON schema definition][7]:

<div class="alert alert-info">The widget type for Pie Chart is <strong>sunburst</strong>.</div>

{{< dashboards-widgets-api >}}

## Treemap widget

Like the pie chart widget, the [treemap][8] can also be used to display nested proportions. The primary difference between the two is that the pie chart displays proportions in radial slices, and the treemap displays nested rectangles.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /dashboards/querying
[2]: /logs/explorer/search_syntax/
[3]: /dashboards/functions/
[4]: /dashboards/guide/context-links/
[5]: /dashboards/widgets/#full-screen
[6]: /api/latest/dashboards/
[7]: /dashboards/graphing_json/widget_json/
[8]: /dashboards/widgets/treemap/
