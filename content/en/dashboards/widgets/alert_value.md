---
title: Alert Value Widget
kind: documentation
widget_type: alert_value
description: "Graph the current value of a metric in any simple-alert metric monitor defined on your system."
aliases:
- /graphing/widgets/alert_value/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

Alert values are query values showing the current value of the metric in any simple-alert metric monitor defined on your system:

{{< img src="dashboards/widgets/alert_value/alert_value_2023.png" alt="Three alert value widgets with three different monitor statuses for disk space, high cpu and checkout error rate" >}}

## Setup
{{< img src="dashboards/widgets/alert_value/alert_value_setup_2023.png" alt="Alert Value setup page for high cpu monitor" style="width:100%;">}}

### Configuration

1. Choose an existing metric monitor to graph.
2. Select the formatting to display:
    * Decimal
    * Units
    * Alignment
3. Give your graph a title.

## API

This widget can be used with the **[Dashboards API][1]**. See the following table for the [widget JSON schema definition][2]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/dashboards/
[2]: /dashboards/graphing_json/widget_json/
