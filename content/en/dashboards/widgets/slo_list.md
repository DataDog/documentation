---
title: SLO List Widget
widget_type: slo_list
description: "Display a list of SLOs"
aliases:
further_reading:
- link: "https://www.datadoghq.com/blog/slo-monitoring-tracking/"
  tag: "Blog"
  text: "Track the status of all your SLOs in Datadog"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON" 
---

SLOs (service-level objectives) are an agreed-upon target that must be achieved for each activity, function, and process to provide the best opportunity for customer success. SLOs represent the performance or health of a service.

The SLO List widget displays a subset of SLOs over their primary time window. All other configured time windows are available in the SLO's side panel on the SLO page. For more information, see the [SLO][1] documentation.

{{< img src="dashboards/widgets/slo_list/slo-list-widget-latest.png" alt="The SLO List widget displaying a list of SLOs" style="width:90%;" >}}

## Setup

{{< img src="dashboards/widgets/slo_list/slo-list-widget-editor-latest.png" alt="A search query defining the service as web-store in the SLO List widget editor" style="width:90%;" >}}

### Configuration

1. Add an SLO List widget to a dashboard.
2. Use tags to filter the list of SLOs (such as `service:foo, env:prod`). Template variables are supported. 
3. Choose the maximum number of SLOs to display (the default is 100) and sort by either status or error budget.
4. Optionally, give the widget a title.

When you are ready to create the widget, click **Save**.

## API

This widget can be used with the **[Dashboards API][2]**. See the following table for the [widget JSON schema definition][3]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/service_level_objectives/
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/
