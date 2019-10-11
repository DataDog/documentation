---
title: Service Level Objectives
kind: documentation
description: "Track the status of your SLOs"
disable_toc: true
aliases:
  - /monitors/monitor_uptime_widget/
further_reading:
- link: "https://www.datadoghq.com/blog/slo-monitoring-widget/"
  tag: "Blog"
  text: "Track the status of your SLOs with the new monitor uptime widget"
---

## Setup

Use the SLO and uptime widget to track your SLOs (Service Level Objectives) and uptime on screenboards and timeboards. You can use SLO by adding a widget to a dashboard, or by going to Datadog’s [Service Level Objectives page][1] to create new SLOs and view all existing ones. Select an existing SLO from the dropdown and display it on any dashboard.

*Uptime* is defined as the amount of time a monitor was in an *up* state (OK) compared to *down* state (non-OK). The status is represented in bars as green (up) and red (down). Example: ’99 % of the time latency is less than 200ms.`

You can also track success rate and event-based SLIs (Service Level Indicators). Example: `99 % of requests are successful.`

{{< img src="monitors/slo/create-slo.png" alt="create a slo" responsive="true" >}}

### Configuration

1. On the [SLO page][1], select **New SLO +**.
2. Define the source for your monitors.
3. Set your target uptime.
4. Finally, give the SLO a title and save it.

Once you have monitors set up, on the [main Service Level Objectives page][1], you can view the overall uptime percentage only—or the overall percentage, plus the uptime for each monitor.

{{< img src="monitors/slo/slo-overview.png" alt="slo main page" responsive="true" >}}

### Options

#### Define the source

| Option              | Description                                                               |
| ------------------- | ------------------------------------------------------------------------- |
| [Monitor](#monitor) | Define the percent uptime for your service.                               |
| [Event](#event)     | Define when you want Datadog to warn you about uptime for your service.   |

##### Monitor

Select a monitor based source if you want to build your SLO based on existing or new Datadog monitors. For more information about monitors, see the [Monitor documentation][2].

To set up a new SLO monitor, go to the [monitor page][3]. An example SLO on a monitor is if the latency of all user requests should be less than 250ms 99% of the time in any 30 day window. To set this up, you would:

1. Select a single monitor or,
2. Select multiple monitors (up to 20) or,
3. Select a single multi-alert monitor and select specific monitor groups (up to 20) to be included in SLO calculation.

**Supported monitor types**:

- metric monitor types - including metric, anomaly, APM, forecast, outlier, and integration metrics
- service checks
- synthetics

##### Event

Select your metrics. Define a success rate through numerator and denominator fields. Select the metrics that represent your successful events in the numerator, and select the metrics that represent your total events in the denominator.

You can add up to as many metrics as you need for both fields and add a formula to calculate the total for each.

#### Define your target

Available windows are: 7 days, month-to-date, 30 days (rolling), Previous Month, and 90 days (rolling).

**Note**: For 7 days, the widget is restricted to two decimal places. For 30 days and up, it’s restricted to two to three decimal places.

### Show error budget

By default, the widget displays the error budget. The error budget represents the amount of time you are allowed to be in the red until you breach your defined SLO. This is calculated using the value entered into your conditional formatting and the time window selected. If nothing is selected, you will see an error message that states: _No Rules Specified_. You can change this by editing the widget.

### Overall Uptime Calculation

{{< img src="monitors/slo/overall_uptime_calculation.png" alt="overall uptime calculation" responsive="true" >}}

The overall uptime result calculated for a time `T_x` can be expressed using boolean logic as the logical conjunction (the `AND` conjunction) of all of the monitor states at time `T_x`.

If at time `T_x` the state of all monitors `[m0, ..., m_n]` are all in `OK` state, then the overall uptime for time `T_x` will be the `OK` state. However, if any number of monitors at time `T_x` have state `ALERT`, then the overall uptime for time `T_x` will be the `ALERT` state.

Consider the following example:

| Monitor            | t0 | t1 | t2    | t3 | t4    | t5 | t6 | t7 | t8 | t9 | t10   |
|--------------------|----|----|-------|----|-------|----|----|----|----|----|-------|
| m0                 | OK | OK | OK    | OK | ALERT | OK | OK | OK | OK | OK | ALERT |
| m1                 | OK | OK | OK    | OK | OK    | OK | OK | OK | OK | OK | ALERT |
| m2                 | OK | OK | ALERT | OK | ALERT | OK | OK | OK | OK | OK | ALERT |
| **Overall Uptime** | OK | OK | ALERT | OK | ALERT | OK | OK | OK | OK | OK | ALERT |

#### `OK` States

- At times `t0`, `t1`, `t3`, `t5`, `t6`, `t7`, `t8`, and `t9`, all of the monitors `m0`, `m1`, `m2` are in `OK` state, so the overall uptime for these times are in `OK` state.

#### `ALERT` States

- At time `t2`, monitor `m2` is in `ALERT` state, so the overall uptime at `t2` is in `ALERT` state.
- At time `t4`, monitors `m0` and `m2` are in `ALERT` state, so the overall uptime at `t4` is in `ALERT` state.
- At time `t10`, monitors `m0`, `m1`, and `m2` are in `ALERT` state, so the overall uptime at `t10` is in `ALERT` state.

## Feature requests

To submit a feature request, reach out to [Datadog Support][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
[2]: /monitors
[3]: https://app.datadoghq.com/monitors#create/metric
