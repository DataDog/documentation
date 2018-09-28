---
title: Monitor Uptime Widget
kind: documentation
description: "Track your monitor’s uptime via a widget in your Screenboard"
private: true
disable_toc: true
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

    The total percentage when selected by group can be calculated based on the total uptime of the monitor or based on the average uptime for the selected groups.

2. If the widget is configured to report by groups, only one duration can be selected; otherwise select up to 3 uptime durations for your widget between:
    * 7 days 
    * 30 days
    * Month to date
    * 90 days
    * 365 days 
    * Year to date

    For 7 days the widget is restricted to 1 decimal place of accuracy. For 30 days and up the widget is restricted to 2 decimal places of accuracy. 

3. Select the conditional formatting based on the uptime percentage: Red (down) / Green (up) / Yellow (warn).

4. To finish the configuration, give a title to your widget and save it to your [Screenboard][1]. 

## Widget behavior

If the chosen monitor for the widget is configured to alert on *WARN* or *NO DATA*, those states are rendered as down (red) inside the uptime widget.

Downtimes and muted periods are disregarded: if your monitor triggers during an scheduled downtime, that period is removed from the calculated uptime.  

Whilst the widget is in private beta. Datadog engineering teams are working through the final implementation. **Thus, until the end of the beta phase, you mustn't rely on the uptime percentage**. Should you see any discrepancies or unexpected behaviors, reach out to [the Datadog support team][2]. 

[1]: /graphing/dashboards/screenboard/
[2]: /help
