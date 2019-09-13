---
title: Service Level Objectives
kind: documentation
description: "Track the status of your SLOs"
disable_toc: true
beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/slo-monitoring-widget/"
  tag: "Blog"
  text: "Track the status of your SLOs with the new monitor uptime widget"
aliases:
    - /monitors/monitor_uptime_widget/
---

<div class="alert alert-info">
Service Level Objectives are now generally available.
</div>

## Configuring Service Level Objectives (SLOs) 

Select time or event based SLIs: 

### Time based SLIs use Datadog Monitors

Example: the latency of all user requests should be less than 250ms 99% of the time in any 30 day window.

a. Select a single monitor or, 
b. Select multiple monitors (up to 20) or, 
c. Select a single multi-alert monitor and select specific monitor groups (up to 20) to be
included in SLO calculation 

**Note**: We support up to 20 monitors. 

If you need to create a new Monitor in-app go to https://app.datadoghq.com/monitors#create/metric. Check out the docs here: https://docs.datadoghq.com/monitors/ 

**Note**: for 7 days, the widget is restricted to 2 decimal places of accuracy. For 30 days and up, it’s restricted to 2-3 decimal places of accuracy. Currently, this is not customizable. 

### Supported monitor types

Currently, [metric monitor types][1], service checks, and synthetics are supported in the widget. Only supported monitors will be available to select within the widget. All other monitor types are not currently supported. 

Supported metrics monitor types include metric, anomaly, APM, forecast, outlier, and integration metrics. For more info, see [here][1] for monitor types.

### Selecting your time window

Next, select the time window you want to report within.

For single monitors, you can select up to 3 windows. For monitor-by-group or multi-monitor selection, you can only select one window. The widget is currently not compatible with Global Time.

Available windows are: 7 days, month-to-date, 30 days (rolling), Previous Month, and 90 days (rolling)

**Note**: for seven days, the widget displays two decimal places. For 30 days and up, it displays two to three decimal places.

### Setting the conditional formatting

Next, select the conditional formatting based on the uptime percentage. This can be red (`down`) or yellow (`warn`).

### Save your widget

Finally, give the widget a title and save it to your dashboard.

## Show error budget

By default, the widget displays the error budget. The error budget represents the amount of time you are allowed to be in the red until you breach your defined SLO. This is calculated using the value entered into your conditional formatting and the time window selected. If nothing is selected, you will see an error message that states: No Rules Specified. You can change this by editing the widget.

### Selecting your data for event SLIs

Toggle to event SLIs.

{{< img src="graphing/widgets/slo/slo_uptime-choose_a_source2.png" alt="Choose a source" responsive="true" >}}

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

To submit feature requests, reach out to [Datadog Support][2], and someone from the team will assist you.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: 
[2]: 
