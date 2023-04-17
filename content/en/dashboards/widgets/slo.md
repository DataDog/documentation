---
title: SLO Summary Widget
kind: documentation
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
---

## Setup

Use the SLO Summary widget to visualize a [Service Level Objective (SLO)][1] on a dashboard.

{{< img src="dashboards/widgets/slo/slo_summary_editor.png" alt="slo summary widget"  >}}

### Configuration

1. Select an SLO from the dropdown menu.

2. **For Metrics-based SLOs**: You can filter your query with tags. Leverage [template variables][2] to dynamically scope your results. You can use template variables in the filter by field to scope your results. For example, `filter by $datacenter` scopes your SLO query to whatever value you choose in the dashboard for the *datacenter* template variable.

3. Select up to three different time windows.

### Options

#### Set the time window

Select up to three different rolling time windows. Optionally, you can select a calendar time window or select the Global Time.

The `Global Time` allows you to display your SLO's status and error budget over arbitrary time periods within the past 90 days. 

You can specify an optional unique SLO target for the arbitrary time period. To display an error budget and to color code the SLO status value as green or red, you need to specify an SLO target. 

**Note**: If the SLO input target is not specified, only the SLO status is shown and the font color remains gray.

#### Display preferences

Select whether to show or hide remaining error budget by toggling the `Show error budget` option. If you are visualizing a monitor-based SLO with multiple groups or multiple monitors, select your `View mode`:

- For monitor-based SLOs configured with a single monitor broken into multiple groups, there are the following three view modes:
  - `Status`: displays the overall SLO status percentages and targets
  - `Groups`: displays a table of status percentages for each group
  - `Both`: displays both the overall SLO status percentages and targets and table of status percentages for each group

- For monitor-based SLOs configured with multiple monitors, there are the following three view modes:
  - `Status`: displays the overall SLO status percentages and targets
  - `Monitors`: displays a table of status percentages for each monitor
  - `Both`: displays both the overall SLO status percentages and targets and table of status percentages for each monitor

**Note:** When the `Global Time` time window option is selected you can only use the `Status` view mode.

{{< img src="dashboards/widgets/slo/slo_summary-view_mode.png" alt="view mode"  >}}

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][3] for additional reference.

The dedicated [widget JSON schema definition][4] for the SLO Summary widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/service_level_objectives/
[2]: /dashboards/template_variables/
[3]: /api/latest/dashboards/
[4]: /dashboards/graphing_json/widget_json/
