---
title: Monitor Uptime Widget
kind: documentation
description: "Track your monitor’s uptime via a widget in your Screenboard"
disable_toc: true
further_reading:
- link: "https://www.datadoghq.com/blog/slo-monitoring-widget/"
  tag: "Blog"
  text: "Track the status of your SLOs with the new monitor uptime widget"
---

<div class="alert alert-warning">
The monitor Uptime widget is in private beta. Interested in trying it out? <a href="https://goo.gl/forms/KmWpQebCeeOdpPAq1">Request private beta access</a>.
</div>

{{< img src="monitors/monitor_uptime_widget.png" alt="monitor uptime widget" responsive="true" >}}

Use the monitor Uptime widget to track your monitor’s uptime via a widget in your [Screenboards][1]. Monitor Uptime is defined as the amount of time a monitor was in an up state (OK) compared to down state (non-OK). Similar to the monitor status page visualization, the status is represented in bars as green (up) and red (down).

## Widget configuration

{{< img src="monitors/monitor_uptime_widget_configuration.png" alt="monitor uptime widget configuration" responsive="true" >}}

To configure the widget from a [Screenboard][1].

1. Select the monitor to display uptime for.
    
    *Optionally* - Select the monitor group ordering between the worst performing 5 groups, best performing 5 groups, or custom (select up to 5 custom groups).

    The total percentage is based on the worst state of any group, when selected by group can be calculated based on the entire monitor or scoped by the selected groups.

2. If the widget is configured to report by groups, only one duration can be selected; otherwise select up to 3 uptime durations for your widget between:
    * 7 days 
    * 30 days
    * Month to date
    * 90 days

    For 7 days the widget is restricted to 1 decimal place of accuracy. For 30 days and up the widget is restricted to 2 decimal places of accuracy. 

3. Select the conditional formatting based on the uptime percentage: Red (down) / Green (up) / Yellow (warn).

4. To finish the configuration, give a title to your widget and save it to your [Screenboard][1]. 

## Widget behavior

If the chosen monitor for the widget is configured to alert on *WARN* or *NO DATA*, those states are rendered as down (red) inside the uptime widget.

Downtimes and muted periods are disregarded: if your monitor triggers during a scheduled downtime, that period is removed from the calculated uptime.  

To ensure an accurate calculation, new monitors aren't calculated until the end of the first UTC day. Until the first UTC day is over, a warning message is displayed instead: `Calculating Uptime`.

While the widget is in private beta, Datadog engineering teams are working through the final implementation. **Thus, until the end of the beta phase, do not rely on the uptime percentage**. Should you see any discrepancies or unexpected behaviors, reach out to [the Datadog support team][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/dashboards/screenboard/
[2]: /help
