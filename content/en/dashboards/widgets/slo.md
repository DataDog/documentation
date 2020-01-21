---
title: SLO Widget
kind: documentation
description: "Track your SLOs."
aliases:
 - /monitors/monitor_uptime_widget/
 - /monitors/slo_widget/
 - /graphing/widgets/slo/
further_reading:
- link: "https://www.datadoghq.com/blog/slo-monitoring-widget/"
  tag: "Blog"
  text: "Track the status of your SLOs with the new monitor uptime widget"
---

## Setup

Use the SLO and uptime widget to track your SLOs (Service Level Objectives) and uptime on screenboards and timeboards. You can use SLO by adding a widget to a dashboard, or by going to Datadog’s [Service Level Objectives page][1] to create new SLOs and view all existing ones. Select an existing SLO from the dropdown and display it on any dashboard.

*Uptime* - the amount of time a monitor was in an *up* state (OK) compared to *down* state (non-OK). The status is represented in bars as green (up) and red (down).

You can also track success rate and event-based SLIs (Service Level Indicators). Example: `99 % of the time latency is less than 200ms`:

{{< img src="dashboards/widgets/slo/summary_editor.png" alt="monitor uptime widget"  >}}

### Configuration

1. On the dashboard page, add an SLO widget. Monitor uptime is available under the time-based SLI dropdown in the widget. This lets you know how much time something spent in an OK state.
2. Select a monitor or monitors.
3. Select how you want to view uptime by monitor groups.
4. Set a time window.
5. Set conditional formatting - define the percent uptime you expect, and define when you want to be warned.
6. Define how you want the SLO to be displayed.

Once you have monitors set up, you can view the overall uptime percentage only—or the overall percentage, plus the uptime for each monitor.

{{< img src="dashboards/widgets/slo/slo_uptime-view_mode2.png" alt="View Mode"  >}}

### Options

#### Select monitors

You can select up to 20 monitors at once. You can query multiple monitors and use the monitor search query to select specific monitors. Datadog recommends searching by [monitor tags][2] to select multiple monitors. For example, you can choose by service: `service:<SERVICE_NAME>`.

{{< img src="dashboards/widgets/slo/slo_uptime-choose_a_monitor.png" alt="Choose a monitor"  >}}

#### Uptime by group

You can view uptime by monitor groups in three different ways:

- Worst performing five groups
- Best performing five groups
- Custom (select up to 20 groups)

#### Time window

You can view the uptime percentage for the overall monitor, by the selected groups, or both. For calculation, the total uptime percentage can be calculated by the selected group, the total monitors (all groups regardless of what’s selected), or for the selected groups only.

**Note**: The overall uptime value represents the proportion of time that none of the groups in the widget’s scope were in an alert state.

{{< img src="dashboards/widgets/slo/slo_uptime-view_mode.png" alt="View Mode"  >}}

#### Conditional formatting

| Option              | Description                                                               |
| ------------------- | ------------------------------------------------------------------------- |
| SLO                 | Define the percent uptime for your service.                               |
| Warning threshold   | Define when you want Datadog to warn you about uptime for your service.   |

### Viewing options

For monitor based SLOs, you can select between displaying the monitor’s uptime percentage, its worst-performing groups, or both. These options are also available for SLOs aggregating multiple monitors so you can view the monitors individually instead of the groups.

Groups (or aggregated monitors in the case of multi-monitor SLOs) are sorted by worst status in the shortest time window. You can switch the sorting time window by clicking on that window’s label inside the preview.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
[2]: /tagging/using_tags/?tab=assignment#monitors
