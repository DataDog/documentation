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

In the example below, unique page views stemming from the RUM dataset are shown at both the country and browser level. The innermost ring shows the user’s country, and the outermost ring is segmented proportionally to show the share of browsers used in each country.


## Setup

{{< img src="dashboards/widgets/free_text/free_text_setup.png" alt="Free Text Setup" style="width:80%;">}}

### Configuration

1. Enter text to display.
2. Choose your text formatting.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][2] for additional reference.

The dedicated [widget JSON schema definition][3] for the free text widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/#screenboards
[2]: /api/v1/dashboards/
[3]: /dashboards/graphing_json/widget_json/
