---
title: Monitor Uptime Widget
kind: documentation
description: "Track your monitor’s uptime via a widget in your Screenboard"
private: true
disable_toc: true
---

<div class="alert alert-warning">
The Monitor Uptime Widget is currently in private beta. Interested in trying it out?  <a href="https://docs.google.com/forms/d/1EITy8IbRe484X-vfVyX8foU-_QXMyYKB6ciKXh3YUvU/edit">Request private beta access</a>.
</div>

{{< img src="monitors/monitor_uptime_widget.png" alt="monitor uptime widget" responsive="true" >}}

Use the monitor Uptime widget to track your monitor’s uptime via a widget in your [Screenboards][1]. Monitor Uptime is defined as the amount of time a monitor was in an up state (OK) compared to down state (non-OK). Similar to the monitor status page visualization, the status is represented in bars as green (up) and red (down).

## Widget configuration

{{< img src="monitors/monitor_uptime_widget_configuration.png" alt="monitor uptime widget configuration" responsive="true" >}}

To configure the widget from a [Screenboard][1].

1. Select the monitor to display uptime from.
    Optionally - Select the monitor group ordering between the worst performing 5 groups, best performing 5 groups, or custom (select up to 5 custom groups). The total percentage when selected by group can be calculated: Based on the total uptime of the monitor or the average uptime for the selected groups.

2. If the widget is configured to report by groups, only one commune duration can be selected otherwise select up to 3 uptime durations for your widget between:
    * 7 days 
    * 30 days
    * Month to date
    * 90 days
    * 365 days 
    * Year to date

    For 7 days the widget is restricted to 1 decimal place of accuracy. For 30 days and up the widget is restricted to 2 decimal places of accuracy. 

3. Select the conditional formatting based on the uptime percentage, choose between: Red (down) / Green (up) / Yellow (warn). 

4. To finish the configuration, give a title to your widget and save it to your [Screenboard][1]. 

## Widget behavior

Find below a list of behavior description for the monitor uptime widget:

* If the chosen monitor for the widget is configured to alert on warn or alert on no data, those states translates to down (red) inside the widget.

* Downtimes and muted periods are disregarded: if your monitor triggers during a downtime that periods is removed from the calculated uptime.  

While the widget is in private beta, Datadog engineering teams are still working through the final implementation for calculating the monitor uptime percentage. **Thus, until the end of the beta phase you mustn't rely on this percentage for reporting to your customers**. Should you see any discrepancies or unexpected behaviors, reach out to [Datadog support team][2]. 

[1]: /graphing/dashboard/screenboard
[2]: /help