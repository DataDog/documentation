---
title: SLO Widget
kind: documentation
description: "Track your SLOs."
further_reading:
- link: "https://www.datadoghq.com/blog/slo-monitoring-widget/"
  tag: "Blog"
  text: "Track the status of your SLOs with the new monitor uptime widget"
aliases:
 - /monitors/monitor_uptime_widget/
 - /monitors/slo_widget/
---

<div class="alert alert-info">
Service Level Objectives are now generally available.
</div>

{{< img src="graphing/widgets/slo/summary_editor.png" alt="monitor uptime widget" responsive="true" >}}

Use the SLO and uptime widget to track your SLOs (Service Level Objectives) and uptime on screenboards and timeboards. Go to Datadog’s [Service Level Objectives page][1] to create new SLOs and view all existing ones. Select an existing SLO from the dropdown and display it on any dashboard.

Any time window that’s been configured for your SLOs will be available for viewing on the widget, but you can select and deselect them depending on what you want to see. You can also enable calendar time windows like a week-to-date, month-to-date, previous week, and the previous month. These will be made available depending on the time windows you have previously configured. For instance, the 7-day window will enable week-to-date while the 30-day one will enable month-to-date, etc. Additional calendar windows will be available as the underlying data permits.

To reconfigure your targets or enable more time windows, edit the source SLO. 

SLOs in the preview can be clicked to open their related detail panels.

*Uptime* defined as the amount of time a monitor was in an *up* state (OK) compared to *down* state (non-OK). Similar to the monitor status page visualization, the status is represented in bars as green (up) and red (down). Example: ’99 % of the time latency is less than 200ms.`

You can also track success rate and event-based SLIs (Service Level Indicators). Example: ’99 % of requests are successful.`

### Viewing options

For monitor based SLOs, you can select between displaying the monitor’s uptime percentage, its worst-performing groups, or both. Those options are also available for SLOs aggregating multiple monitors so you can view those monitors individually instead of the groups. 

The overall uptime value represents the proportion of time that none of the groups in the widget’s scope were in an alert state.

Groups (or aggregated monitors in the case of multi-monitor SLOs) are sorted by worst status in the shortest time window. You can switch the sorting time window by clicking on that window’s label inside the preview. 

## Widget configuration for timeboards or screenboards

### Selecting your data for monitor uptime

{{< img src="graphing/widgets/slo/slo_uptime-choose_a_monitor.png" alt="Choose a monitor" responsive="true" >}}

Monitor uptime is available under the time-based SLI dropdown in the widget. This lets you know how much time something spent in an OK state.

{{< img src="graphing/widgets/slo/slo_uptime-choose_a_source.png" alt="Choose a monitor" responsive="true" >}}

1. First, select a [monitor](#supported-monitor-types).

2. Optionally, you can view uptime by monitor groups in three different ways:

    * Worst performing five groups
    * Best performing five groups
    * Custom (select up to 20 groups)

3. You can view the uptime percentage for the overall monitor, by selected groups, or both. For calculation, the total uptime percentage when selected by the group can be calculated, as well as on the total of the monitors (all groups regardless of what’s selected) or for only the selected groups.

    **Note**: The overall uptime value represents the proportion of time that none of the groups in the widget’s scope were in an alert state. 

    {{< img src="graphing/widgets/slo/slo_uptime-view_mode.png" alt="View Mode" responsive="true" >}}

4. You can also query multiple monitors and use the monitor search query to select your specific monitors.

5. Visually, you can view the overall uptime percentage only—or the overall percentage, plus the uptime for each monitor.

    {{< img src="graphing/widgets/slo/slo_uptime-view_mode2.png" alt="View Mode" responsive="true" >}}

    Datadog recommends searching by [monitor tags][2] to select multiple monitors. For example, you can choose by service: `service:a`.

    You can select up to 20 monitors.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
[2]: /tagging/using_tags/?tab=assignment#monitors
