---
title: Service Summary Widget
kind: documentation
description: "Displays the graphs of a chosen service in your screenboard."
widget_type: "trace_service"
aliases:
    - /graphing/widgets/service_summary/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

The service summary displays the graphs of a chosen [service][1] in your screenboard.

{{< img src="dashboards/widgets/service_summary/service_summary.png" alt="service summary" >}}

## Setup

{{< img src="dashboards/widgets/service_summary/service_summary_setup.png" alt="service summary setup" style="width:80%;">}}

### Configuration

1. Select an [environment][2] and a [service][1].
2. Select a widget size.
3. Select the information to display:
    * Hits
    * Errors
    * Latency
    * Breakdown
    * Distribution
    * Resource
4. Choose your display preference by selecting a timeframe and the number of column to display your graphs across.
5. Enter a title for your graph.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][3] for additional reference.

The dedicated [widget JSON schema definition][4] for the service summary widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/service/
[2]: /tracing/send_traces/
[3]: /api/v1/dashboards/
[4]: /dashboards/graphing_json/widget_json/
