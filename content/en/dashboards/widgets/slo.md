---
title: SLO Summary Widget
kind: documentation
widget_type: slo
description: "Track your SLOs"
aliases:
 - /monitors/monitor_uptime_widget/
 - /monitors/slo_widget/
 - /graphing/widgets/slo/
 - /dashboards/faq/how-can-i-graph-host-uptime-percentage/
further_reading:
- link: "https://www.datadoghq.com/blog/slo-monitoring-tracking/"
  tag: "Blog"
  text: "Track the status of all your SLOs in Datadog"
- link: "/dashboards/guide/slo_graph_query"
  tag: "Documentation"
  text: "Scope metric-based SLO queries"
---

## Setup

Use the SLO Summary widget to visualize a [Service Level Objective (SLO)][1] on a dashboard.

{{< img src="/dashboards/widgets/slo/metric_slo_filter_by.png" alt="metric-based slo summary widget graph editor " >}}

### Configuration

1. Select an SLO from the dropdown menu.
2. **For metric-based SLOs**: You can filter your query with tags and leverage [template variables][2] to dynamically scope your results:
    - Take advantage of template variables by using the *filter by* field to scope the SLO statuses the widget displays. For example, `filter by $datacenter` scopes your SLO query to whatever value you choose in the dashboard for the *datacenter* template variable.
    - Add additional scope and context to your SLO metric queries even if the tags were not included in the original SLO configuration. For example, if the original SLO query is `sum:trace.flask.request.hits{*} by {resource_name}.as_count()` and you filter by `env:prod` in the widget, your data will be scoped to only that from your `prod` environment.
3. Select up to three different time windows.

### Options

#### Set the time window

Select up to three different rolling time windows. Optionally, you can select a calendar time window or select **Global Time**.

`Global Time` allows you to display your SLO's status and error budget over arbitrary time periods within the past 90 days. 

You can specify an optional unique SLO target for the arbitrary time period. To display an error budget and to color code the SLO status value as green or red, you need to specify an SLO target. 

**Note**: If the SLO input target is not specified, only the SLO status is shown and the font color remains gray.

#### Display preferences

Select whether to show or hide remaining error budget by toggling the `Show error budget` option. If you are visualizing a monitor-based SLO with multiple groups or multiple monitors, select your `View mode`:

- For monitor-based SLOs configured with a single monitor broken into multiple groups, there are the following three view modes:
  - `Overall`: displays the overall SLO status percentages and targets
  - `Groups`: displays a table of status percentages for each group
  - `Both`: displays both the overall SLO status percentages and targets and table of status percentages for each group

- For monitor-based SLOs configured with multiple monitors, there are the following three view modes:
  - `Overall`: displays the overall SLO status percentages and targets
  - `Groups`: displays a table of status percentages for each group
  - `Both`: displays both the overall SLO status percentages and targets and table of status percentages for each monitor

**Note:** When the `Global Time` time window option is selected you can only use the `Overall` view mode.

## API

This widget can be used with the **[Dashboards API][3]**. See the following table for the [widget JSON schema definition][4]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/service_level_objectives/
[2]: /dashboards/template_variables/
[3]: /api/latest/dashboards/
[4]: /dashboards/graphing_json/widget_json/
