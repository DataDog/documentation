---
title: Service Summary Widget
description: "Displays the graphs of a chosen service in a dashboard widget."
widget_type: "trace_service"
aliases:
- /graphing/widgets/service_summary/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Learn more about the APM Service Page"
---

A service is a set of processes that do the same job, for example, a web framework or database. Datadog provides out-of-the-box graphs to display service information, as seen on the Service page. Use the service summary widget to display the graphs of a chosen [service][1] in your dashboard.

{{< img src="dashboards/widgets/service_summary/service_summary.png" alt="service summary" >}}

## Setup

### Configuration

1. Select an [environment][2] and a [service][1].
2. Select a widget size.
3. Select the information to display:
    * Hits
    * Errors
    * Latency
    * Breakdown
    * Distribution
    * Resource (**Note**: You need to select the large widget size to see this option.)
4. Choose your display preference by selecting the number of columns to display your graphs across.
5. Enter a title for your graph.

## API

This widget can be used with the **[Dashboards API][3]**. See the following table for the [widget JSON schema definition][4]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/services/service_page/
[2]: /tracing/send_traces/
[3]: /api/latest/dashboards/
[4]: /dashboards/graphing_json/widget_json/
