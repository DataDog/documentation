---
title: SLO Widget
kind: documentation
description: "Track your monitor’s uptime with a widget in your Screenboard"
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

{{< img src="monitors/monitor_uptime_widget.png" alt="monitor uptime widget" responsive="true" >}}

Use the SLO and uptime widget to track your SLOs (Service Level Objectives) and uptime on screenboards and timeboards. Go to Datadog’s Service Level Objectives page to create new SLOs and view all existing ones in a central page. Using the new widget, you can select an existing SLO from the dropdown and view it on any dashboard.

The SLO widget has been updated since its initial beta release. You are no longer required to create your objectives directly from the widget. Instead, go to Datadog’s Service Level Objectives (link to docs) to create new SLOs and view all existing ones in a central page. Using the new widget, you can select an existing SLO from the dropdown and view it on any dashboard. 

Any time window  that’s been configured for your SLOs will be available for viewing on the widget but you can select and deselect them depending on what you want to see. You can also enable calendar time windows like week-to-date, month-to-date, previous week and previous month. These will be made available depending on the time windows you have previously configured. For instance, the 7-day window will enable week-to-date while the 30-day one will enable month-to-date, etc. Additional calendar windows will be available as the underlying data permits.

To reconfigure your targets or enable more time windows, edit the source SLO. 

SLOs in the preview can be clicked to open their related detail panels.

### Viewing options

For monitor based SLOs, you can select between displaying the monitor’s uptime percentage , its worst performing groups, or both. Those options are also available for SLOs aggregating multiple monitors so you can view those monitors individually instead of the groups. 

The overall uptime value represents the proportion of time that none of the groups in the widget’s scope were in an alert state.

Groups (or aggregated monitors in the case of multi monitor SLOs) will be sorted by worst status in the shortest time window. You can switch the sorting time window by clicking on that window’s label inside the preview. 

*Uptime* is defined as the amount of time a monitor was in an *up* state (OK) compared to *down* state (non-OK). Similar to the monitor status page visualization, the status is represented in bars as green (up) and red (down). Example: `99% of the time latency is less than 200ms.`

You can also track success rate and event-based SLIs (Service Level Indicators). Example: `99% of requests are successful.`

## Widget configuration for timeboards or screenboards

### Selecting your data for monitor uptime

{{< img src="monitors/slo_widget/slo_uptime-choose_a_monitor.png" alt="Choose a monitor" responsive="true" >}}

Monitor uptime is available under the time-based SLI dropdown in the widget. This lets you know how much time something spent in an OK state.

{{< img src="monitors/slo_widget/slo_uptime-choose_a_source.png" alt="Choose a monitor" responsive="true" >}}

First, select a [monitor](#supported-monitor-types).

Optionally, you can view uptime by monitor groups in three different ways:

* Worst performing 5 groups
* Best performing 5 groups
* Custom (select up to 20 groups)

You can view the uptime percentage for the overall monitor, by selected groups, or both. For calculation, the total uptime percentage when selected by group can be calculated, as well as on the total of the monitors (all groups regardless of what’s selected) or for only the selected groups.

**Note**: The overall uptime value represents the proportion of time that none of the groups in the widget's scope were in an alert state.  

{{< img src="monitors/slo_widget/slo_uptime-view_mode.png" alt="View Mode" responsive="true" >}}

You can also query multiple monitors and use the monitor search query to select your specific monitors.

Visually, you can view the overall uptime percentage only—or the overall, plus the uptime for each individual monitor

{{< img src="monitors/slo_widget/slo_uptime-view_mode2.png" alt="View Mode" responsive="true" >}}

Datadog recommends searching by [monitor tags][1] to select multiple monitors. For example, you can select by service: `service:a`.

You can select up to 20 monitors.

### Supported monitor types

Currently only [metric monitor types][2], service checks, and synthetics are supported in the widget. Only supported monitors will be available to select within the widget. All other monitor types are not currently supported. 

Supported metric monitor types include: metric, anomaly, APM, forecast, outlier, and integration metrics. For more info, see [here][2] for monitor types.

### Selecting your time window

Next, select the time window you want to report within.

For single monitors, you can select up to 3 windows. For monitor-by-group or multi-monitor selection, you can only select 1 window. The widget is currently not compatible with Global Time.

Available windows are: 7 days, month-to-date, 30 days (rolling), Previous Month, and 90 days (rolling)

**Note**: for 7 days, the widget is restricted to 2 decimal places of accuracy. For 30 days and up, it’s restricted to 2-3 decimal places of accuracy.

### Setting the conditional formatting

Next, select the conditional formatting based on the uptime percentage. This can be red (`down`) or yellow (`warn`).

### Save your widget

Finally, give the widget a title and save it to your dashboard.

## Show error budget

By default, the widget displays the error budget. The error budget represents the amount of time you are allowed to be in the red until your defined SLO is breached. This is calculated using the value entered into your conditional formatting and the time window selected. If nothing is selected, you will see an error message that states: No Rules Specified. You can change this by editing the widget.

### Selecting your data for event SLIs

Toggle to event SLIs.

{{< img src="monitors/slo_widget/slo_uptime-choose_a_source2.png" alt="Choose a source" responsive="true" >}}

Select your metrics. You are defining a success rate through numerator and denominator fields.

Select the metrics that represent your successful events in the numerator, and select the metrics that represent your total events in the denominator.

You can add up to as many metrics as you need for both fields and add a formula to calculate the total for each. 

### Selecting your time window

Next, select the time window you want to report within. 

The widget is currently not compatible with Global Time.

Available windows are: 7 days, month-to-date, 30 days (rolling), Previous Month, and 90 days (rolling)

**Note**: Datadog displays up to 3 decimal places for all time windows.

### Setting the conditional formatting

Next, select the conditional formatting based on the uptime percentage. This can be red (`down`) or yellow (`warn`).

### Save your widget

Finally, give the widget a title and save it to your dashboard.


## Feature requests

To submit feature requests, reach out to [Datadog Support][3], and someone from the team will assist you.

## Widget behavior

While the widget is in public beta, the documentation is subject to change. Datadog recommends that you currently do not rely on the widget for reporting.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tagging/using_tags/?tab=assignment#monitors
[2]: /api/?lang=python#create-a-monitor
[3]: /help
