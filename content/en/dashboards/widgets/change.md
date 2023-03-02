---
title: Change Widget
kind: documentation
description: "Graph the change in a value over a chosen time period."
aliases:
    - /graphing/widgets/change/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/dashboards/graphing_json/widget_json/"
  tag: "Documentation"
  text: "Widget JSON schema"
- link: "/dashboards/graphing_json/request_json/"
  tag: "Documentation"
  text: "Request JSON schema"
---
The Change graph shows you the change in a metric over a period of time:

{{< img src="dashboards/widgets/change/change.png" alt="Change graph" >}}

## Setup

### Configuration

1. Choose a metric to graph.
2. Choose an aggregation function.
3. Optional: choose a specific context for your widget.
4. Break down your aggregation by a tag key such as `host` or `service`.
5. Choose a value for the "Compare to" period:
    * an hour before
    * a day before
    * a week before
    * a month before
6. Choose between `relative` or `absolute` change.
7. Select the field by which the metrics are ordered:
    * `change`
    * `name`
    * `present value`
    * `past value`
8. Choose `ascending` or `descending` ordering.
9. Choose whether to display the current value in the graph.

### Display preference

Choose whether your widget uses a custom time frame or the dashboard's global time frame.

### Title

Choose a custom title for your widget, or leave the form blank to use a generated title.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][1] for additional reference.

The dedicated [widget JSON schema definition][2] for the change widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/dashboards/
[2]: /dashboards/graphing_json/widget_json/
