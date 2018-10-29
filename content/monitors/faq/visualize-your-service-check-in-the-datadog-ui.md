---
title: Visualize your service check in the Datadog UI.
kind: faq
---

Service checks can be visualized and used in 3 Datadog sections:

* [Check Summary][2]
* [Screenboards][3]
* [Custom check Monitor][4]

## Check Summary

To reach [Check Summary][2], click on the *Monitors* tab then on *Check Summary*.

{{< img src="monitors/faq/check_summary.png" alt="Check summary" responsive="true" >}}

This is the list of all your checks and their status reporting across your infrastructure in the past day. Select a check to get insights on the number of distinct checks for each of its associated tags.

## Screenboards

Service checks can be visualized in a *Check status* widget in Screenboards:

{{< img src="monitors/faq/check_status_widget.png" alt="Check status widget" responsive="true" >}}
​
After clicking on the *Check status* widget icon, the following pop-up appears:

{{< img src="monitors/faq/check_widget_config.png" alt="Check widget config" responsive="true" >}}

In this form you can:

* **Check Name**: Select your service check name.
* **Reporting Timeframe**: Select the time frame on which you want to aggregate your status.
* **Scoping**: Select a single check or a cluster of check statuses reported by a single tag value or a tag group.
* **Widget Title**: Set your widget title.

## Custom check Monitor

Even if you can't graph a custom check over time as you would for metrics, you can still monitor it.
In this case you need to go in *monitor tab* > *new monitor*, then select the **custom check** section:
 
{{< img src="monitors/faq/check_monitor.png" alt="Check monitor" responsive="true" >}}

Configure your custom check monitor: 
​
{{< img src="monitors/faq/check_monitor_config.png" alt="Check monitor configuration" responsive="true" >}}

In this form you can:

* **Pick a Custom Check**: Select your check status name to monitor
* **Pick monitor scope**: Select the context for your monitor (including/excluding tags)
* **Set alert conditions**: Choose between a simple check alert or a cluster alert
* **Say what's happening**: Edit the notification sent (find more here)
* **Notify your team**: Choose who should be notified by this monitor

Worth noticing that service check monitors for out-of-the-box datadog integrations can be set in *monitor tab* > *Integration* > *Integration status* tab on the left. For instance with HAProxy integration: 

{{< img src="monitors/faq/haproxy_service_check.gif" alt="Haproxy service check" responsive="true" >}}

Learn how to write an Agent check with the main [Agent check documentation][1].

[1]: /developers/agent_checks/
[2]: https://app.datadoghq.com/check/summary
[3]: https://app.datadoghq.com/dashboard
[4]: https://app.datadoghq.com/monitors#create/custom
