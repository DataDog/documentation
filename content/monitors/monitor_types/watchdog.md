---
title: Watchdog monitor
kind: documentation
description: "Algorithmically detects application and infrastructure issues."
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "watchdog"
  tag: "Documentation"
  text: "Watchdog, algorithmically detect application and infrastructure issues"
---

## Overview

[Watchdog][1] is an algorithmic feature that automatically detects application and infrastructure issues, by continuously observing trends and patterns in application metrics—like error rate, request rate, and latency—and looking for unexpected behavior. 

Watchdog monitors allow you to set up monitors and receive alert notifications when Watchdog detects a potential problem in your systems.

## Creating a Watchdog Monitor
* Choose "Watchdog" on the [New Monitor][2] page.

* The graph at the top of the [Create Monitor][3] page shows the number of Watchdog events over time, along with a list of events.

{{< img src="monitors/monitor_types/watchdog/wmonitor-create-top.png" alt="Watchdog" responsive="true" style="width:80%;">}}

* Select what type of story you want your monitor to be based on: Service or Infrastructure

{{< img src="monitors/monitor_types/watchdog/wmonitor-1.png" alt="Select story type" responsive="true" style="width:80%;">}}

* If you've chosen a Service story, select the sources you want to be alerted on.

{{< img src="monitors/monitor_types/watchdog/wmonitor-2.png" alt="Select sources" responsive="true" style="width:80%;">}}

* Configure your notification message. You can use [template variables][4] to customize your message.

{{< img src="monitors/monitor_types/watchdog/wmonitor-3.png" alt="Say what's happening" responsive="true" style="width:80%;">}}

Choosing the “Include triggering tags in notification title” option appends the service name, resource name, and primary tag (e.g. availability-zone) to the title.

* Configure the recipients of your notification.

{{< img src="monitors/monitor_types/watchdog/wmonitor-4.png" alt="Notify your team" responsive="true" style="width:80%;">}}

## Template variables in notifications

* `{{event.id}}`: ID of the event
* `{{event.title}}`: Title of the event, which also provides story details

## Watchdog Alerts

Watchdog monitors appear in the [Manage Monitors][5] page, as well as in the [Triggered Monitors][6] page, when you filter for monitors with the type “Watchdog”.

Once you receive an alert, you can see more information about the underlying Watchdog story that triggered the alert by scrolling down the [Triggered Monitors][6] page to the events section and clicking on the details link.

{{< img src="monitors/monitor_types/watchdog/wmonitor-triggered.png" alt="Events" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /watchdog
[2]: https://app.datadoghq.com/monitors#/create
[3]: https://app.datadoghq.com/monitors#create/watchdog
[4]: /monitors/notifications/?tab=is_alertis_warning#variables
[5]: https://app.datadoghq.com/monitors/manage
[6]: https://app.datadoghq.com/monitors/triggered
