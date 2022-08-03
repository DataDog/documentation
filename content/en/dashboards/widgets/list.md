---
title: List Widget
kind: documentation
widget_type: "list"
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/notebooks/"
  tag: "Documentation"
  text: "Notebooks"
---

The list widget enables you to display a list of top issues.

{{< img src="dashboards/widgets/list/list_overview.png" alt="List widget displaying a list of Java errors and their error count." >}}

## Setup

{{< img src="dashboards/widgets/list/list_setup.png" alt="List widget configuration modal" style="width:80%;">}}

### Configuration

1. Choose the type of data to graph. You can create a list widget from Issues, Logs, Audit Trail, or Events.

2. Optional: Give your graph a title (or leave blank for suggested title)

### Options

#### Global time

On screenboards and notebooks, choose whether your widget has a custom timeframe or uses the global timeframe.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][1] for additional reference.

The dedicated [widget JSON schema definition][2] for the top list widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/dashboards/
[2]: /dashboards/graphing_json/widget_json/
