---
title: SLO Summary Widget
kind: documentation
description: "Track your SLOs."
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

Use the SLO Summary widget to track your [SLOs (Service Level Objectives)][1] on screenboards and timeboards. You can use Datadog’s [Service Level Objectives page][2] to create new SLOs and view all existing ones. You can then select an existing SLO and use the SLO Summary widget to display it on any dashboard.

{{< img src="dashboards/widgets/slo/slo_summary_editor.png" alt="slo summary widget"  >}}

### Configuration

1. On the dashboard page, add an SLO Summary widget. 
2. Select an SLO from the dropdown menu.
3. Select up to three different time windows.

**Note:** SLOs can be configured with 7-, 30- or 90-day time windows. If an SLO has a 7-day time window configured, you can select `Week to date` as a time window. If an SLO has a 30-day time window configured, additionally you can select `Previous week` as a time window. If an SLO has a 90-day time window configured, additionally you can select `Month to date` or `Previous month` as a time window.

### Options

#### Display preferences

Select whether to show or hide remaining error budget by toggling the `Show error budget` option. If you are visualizing a monitor-based SLO with multiple groups or multiple monitors, select your `View mode`:
  
- For monitor-based SLOs configured with a single monitor broken into multiple groups, there are the following three view modes:
  - `Status`: displays the overall SLO status percentages and targets
  - `Groups`: displays a table of status percentages for each group
  - `Both`: displays both the overall SLO status percentages and targets and table of status percentages for each group

- For monitor-based SLOs configured with multiple monitors, there are the following three view modes:
  - `Status`: displays the overall SLO status percentages and targets
  - `Groups`: displays a table of status percentages for each monitor
  - `Both`: displays both the overall SLO status percentages and targets and table of status percentages for each monitor

{{< img src="dashboards/widgets/slo/slo_summary-view_mode.png" alt="view mode"  >}}

#### Title

Display a custom title for your widget by checking the `Show a title` check box:

{{< img src="dashboards/widgets/slo/slo_summary-show_title.png" alt="widget title"  >}}

You can optionally define the title’s size and alignment.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/service_level_objectives/
[2]: https://app.datadoghq.com/slo
