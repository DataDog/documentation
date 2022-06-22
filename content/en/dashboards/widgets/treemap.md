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
- link: "/dashboards/pie_chart/"
  tag: "Documentation"
  text: "Pie Chart Widget"  
---

The treemap widget allows you to display proportions of one or datasets. This widget can display a single dataset with corresponding proportions, or multiple datasets with nested proportions.

*In the example below, unique page views stemming from the Real User Monitoring (RUM) dataset are shown at both the country and browser level. The outer groups - distinguished by color - shows the user’s country. These 'country' groups are segmented proportionally into secondary gorups to show the share of browsers used in each country.*

<img width="80%" alt="Treemap Widget Example" src="https://user-images.githubusercontent.com/19559239/175114419-91ffa888-c21c-43e3-991d-e7ab8fa3c454.png">

## Similar Widget: Pie Chart

Like the Treemap widget, the [Pie Chart Widget][8] can also be used to display nested proportions. The primary difference between the two is that the pie chart displays proportions in radial slices, whereas the tree-map displays nested rectangles.

## Setup

### Configuration Process

1. Select one or more data sources from metrics or events
  - Metrics: See the [querying documentation][1] to configure a metric query.
  - Events: See the [log search documentation][2] to configure a log event query.
2. (Optional) Modify query with a [formula][3]
3. Customize your graph with the available options (below)

### Graph Customization Options

#### Context Links

Context links are enabled by default, and can be toggled on or off. Context links bridge dashboard widgets with other pages (in Datadog, or third-party). More details on context links can be found [here][4].

<img style="width:80%; max-width: 500px;" alt="Pie Chart Context Links"  src="https://user-images.githubusercontent.com/19559239/175112166-12663086-88db-448a-b1aa-092b96011046.png">

## Display & Interaction

### Drill-Down Interaction

In the case where multiple groups of data are plotted at once, you can drill down into a single category and view proportions within it. 

To drill-down into a category, hover over the outer portion of the category, and click. To undo the drill-down, click the ‘back’ button on the top left header of the widget.

![Treemap drilldown animation](https://user-images.githubusercontent.com/19559239/175114136-bfe55f69-eaaf-45aa-9c8c-0cab95785db6.gif)

<img width="80%" alt="Treemap drilldown animation" src="[https://user-images.githubusercontent.com/19559239/175116834-c4cd20c2-12bb-48b8-88a9-7c8a684273d4.png](https://user-images.githubusercontent.com/19559239/175114136-bfe55f69-eaaf-45aa-9c8c-0cab95785db6.gif)">

### Context Menu Access

To access the content menu, first hover over an individual category: this can be a nested category, or group - such as Canada, or Canada > Chrome in the example before. This should reveal a vertical ellipsis button in the top right corner. When clicked, the context menu will appear.

<img width="80%" alt="How to access the context menu on a treemap widget" src="https://user-images.githubusercontent.com/19559239/175116834-c4cd20c2-12bb-48b8-88a9-7c8a684273d4.png">

### Full-Screen Interaction

Viewing the pie chart widget in full-screen will reveal the standard set of [full-screen options][5].

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
[8]: /dashboards/widgets/pie_chart/
