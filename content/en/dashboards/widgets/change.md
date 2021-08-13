---
title: Change Widget
kind: documentation
description: "Graph the change in a value over a chosen time period."
aliases:
    - /graphing/widgets/change/
further_reading:
- link: "/dashboards/timeboards/"
  tag: "Documentation"
  text: "Timeboards"
- link: "/dashboards/screenboards/"
  tag: "Documentation"
  text: "Screenboard"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
- link: "/dashboards/graphing_json/widget_json/"
  tag: "Documentation"
  text: "Widget JSON schema"
- link: "/dashboards/graphing_json/request_json/"
  tag: "Documentation"
  text: "Request JSON schema"
---
The Change graph shows you the change in a value over the time period chosen:

{{< img src="dashboards/widgets/change/change.png" alt="Change graph" >}}

## Setup

{{< img src="dashboards/widgets/change/change_setup.png" alt="Change graph Setup" style="width:80%;">}}

### Configuration

1. Choose a metric to graph.
2. Choose an aggregation function.
3. Optional: choose a specific context for your widget.
4. Break down your aggregation on a tag key i.e `host`, `service`...
5. Choose the "Compared" period from:
    * an hour before
    * a day before
    * a week before
    * a month before
6. Select to show the `relative` or `absolute` change between the two periods.
7. Select your ranking by sorting your result by:
    * `change`
    * `name`
    * `present value`
    * `past value`
8. Indicate whether `increases` or `decreases` changes is better. The better one is highlighted in green; the other one in red.
9. Optional: display current value.

### Options

#### Display preference

{{< img src="dashboards/widgets/options/display_preferences.png" alt="Display preferences" style="width:80%;">}}

##### Global time

On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

###### Legend

Use *Show legend on graph* to toggle the legend display on your widget. Optionally, select the number of entries to display.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="dashboards/widgets/options/title.png" alt="Widget title" style="width:80%;">}}

Optionally define its size and alignment.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][1] for additional reference.

The dedicated [widget JSON schema definition][2] for the change widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/dashboards/
[2]: /dashboards/graphing_json/widget_json/
