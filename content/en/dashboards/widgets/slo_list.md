---
title: SLO List Widget
kind: documentation
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

The SLO List widget displays a subset of [SLOs][1], based on your query. 

{{< img src="dashboards/widgets/slo_list/slo_list_widget.png" alt="The SLO List widget displaying a list of SLOs" style="width:90%;" >}}

## Setup

{{< img src="dashboards/widgets/slo_list/slo_list_editor.png" alt="A search query defining the service as web-store in the SLO List widget editor" style="width:90%;" >}}

### Configuration

1. Add an SLO List widget to a dashboard.
2. Use tags to filter the list of SLOs (such as `service:foo, env:prod`). Template variables are supported. 
3. Choose the maximum number of SLOs to display (the default is 100). The most recently created SLOs appear at the top of the list. 
4. Optionally, give the widget a title.

When you are ready to create the widget, click **Save**.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][2] for additional reference.

The dedicated [widget JSON schema definition][3] for the SLO List widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/service_level_objectives/
[2]: /api/v1/dashboards/
[3]: /dashboards/graphing_json/widget_json/
