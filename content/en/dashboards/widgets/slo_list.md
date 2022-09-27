---
title: SLO List Widget
kind: documentation
description: "Display a list of SLOs"
aliases:
further_reading:
- link: "https://www.datadoghq.com/blog/slo-monitoring-tracking/"
  tag: "Blog"
  text: "Track the status of all your SLOs in Datadog"
---

The SLO List widget displays a subset of [SLOs][1], based on your query. 

{{< img src="dashboards/widgets/slo_list/slo_list_widget.png" alt="slo list widget" >}}

## Setup

{{< img src="dashboards/widgets/slo_list/slo_list_editor.png" alt="slo list widget editor" >}}

### Configuration

1. Add an SLO List widget to a dashboard.
2. Use tags to filter the list of SLOs (e.g., `service:foo, env:prod`). Template variables are supported. 
3. Choose the maximum number of SLOs to display (default is 100). The most recently created SLOs will appear at the top of the list. 
4. Optionally, give the widget a title.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][2] for additional reference.

The dedicated [widget JSON schema definition][3] for the SLO List widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/service_level_objectives/
[2]: /api/v1/dashboards/
[3]: /dashboards/graphing_json/widget_json/
