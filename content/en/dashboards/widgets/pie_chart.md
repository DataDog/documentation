---
title: Pie Chart Widget
kind: documentation
description: "Graph proportions of one or more datasets."
aliases:
    - /graphing/widgets/pie_chart/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/dashboards/tree_map/"
  tag: "Documentation"
  text: "Treemap Widget"  
---

The pie chart widget allows you to display proportions of one or datasets. This widget can display a single dataset with corresponding proportions, or multiple datasets with nested proportions.

*In the example below, unique page views stemming from the RUM dataset are shown at both the country and browser level. The innermost ring shows the user’s country, and the outermost ring is segmented proportionally to show the share of browsers used in each country.*

<img style="width:80%; max-width: 700px;" alt="Pie Chart Example" src="https://user-images.githubusercontent.com/19559239/175108545-a3944ec6-b900-4b2a-908a-bd2dee0f0f67.png">

## Similar Widget: Treemap

Like the pie chart widget, the tree map widget (link, also needs docs) can also be used to display nested proportions. The primary difference between the two is that the pie chart displays proportions in radial slices, whereas the tree-map displays nested rectangles.

## Setup

### Configuration Process

1. Select one or more data sources from metrics or events
  - Metrics: See the [querying documentation][1] to configure a metric query.
  - Events: See the [log search documentation][2] to configure a log event query.
2. (Optional) Modify query with a [formula][3]
3. Customize your graph with the available options (below)

### Graph Customization Options

#### Total Amount Display

Toggle whether to show a total count in the center of the chart. By default, the ‘auto’ option will show the total count once the graph reaches a certain size.

#### Legend Configuration

The legend can either be turned off, displayed directly over chart segments with the Aside option, or as a Table listing each value, its color, and proportion.

By default, the ‘auto’ option will show a labeled Aside legend within a dashboard, and will display both the Aside and Table legends when opened in full-screen.

<img style="width:80%; max-width: 700px;" alt="Pie Chart Legend Options"  src="https://user-images.githubusercontent.com/19559239/175111768-9f8e5e3f-db4d-453f-bc2c-e02af52e58a5.png">

#### Context Links

Context links are enabled by default, and can be toggled on or off. Context links bridge dashboard widgets with other pages (in Datadog, or third-party). More details on context links can be found [here][4].

<img style="width:80%; max-width: 700px;" alt="Pie Chart Context Links"  src="https://user-images.githubusercontent.com/19559239/175112166-12663086-88db-448a-b1aa-092b96011046.png">

## Display & Interaction

### Drill-Down Interaction

In the case where multiple groups of data are plotted at once, you can drill down into a single category and view proportions within it. 

To drill-down into a category, hover over the outer portion of the category ring, and click. To undo the drill-down, move your cursor to the center of the cart and click.

![toggle-gif](https://user-images.githubusercontent.com/19559239/175110093-a2b666ed-2e90-42c0-b10f-308f27175d0a.gif)

### Full-Screen Interaction

Viewing the pie chart widget in full-screen will reveal the standard set of full-screen options.

## API

This widget can be used with the [Dashboards API][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/querying
[2]: /logs/explorer/search_syntax/
[3]: /dashboards/functions/
[4]: /dashboards/guide/context-links/
[5]: /dashboards/widgets/#full-screen
[6]: /dashboards/guide/context-links/
[7]: /api/latest/dashboards/
