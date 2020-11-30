---
title: Alert Value Widget
kind: documentation
description: "Graph the current value of a metric in any monitor defined on your system."
aliases:
    - /graphing/widgets/alert_value/
further_reading:
- link: "/dashboards/screenboards/"
  tag: "Documentation"
  text: "Screenboard"
- link: "/dashboards/timeboards/"
  tag: "Documentation"
  text: "Timeboards"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

Alert values are query values showing the current value of the metric in any monitor defined on your system:

{{< img src="dashboards/widgets/alert_value/alert_value.png" alt="Alert Value" >}}

## Setup
{{< img src="dashboards/widgets/alert_value/alert_value_setup.png" alt="Alert Value Setup"  style="width:80%;">}}

### Configuration

1. Choose a previously created monitor to graph.
2. Select the formating to display:
    * raw value
    * 0/1/2/3 decimals
3. Select to display:
    * `Automatic`
    * `/s` Per Second
    * `b` Bits
    * `B` Bytes
    * `Custom`

### Options

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="dashboards/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

Optionally define its size and alignment.

## API

This widget can be used with the **Dashboards API**. Refer to the [Dashboards API][1] documentation for additional reference.

The dedicated [widget JSON schema definition][2] for the alert value widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/dashboards/
[2]: /dashboards/graphing_json/widget_json/
