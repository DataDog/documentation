---
title: Watchdog Monitor
description: "Algorithmically detects application and infrastructure issues."
aliases:
- /monitors/monitor_types/watchdog
- /monitors/create/types/watchdog/
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /watchdog/
  tag: Documentation
  text: Watchdog, algorithmically detect application and infrastructure issues
---

## Overview

[Watchdog][1] is an algorithmic feature for APM, Infrastructure, and Logs. It automatically detects potential issues by continuously observing trends and patterns in metrics and logs, and looking for atypical behavior.

## Monitor creation

To create a [Watchdog monitor][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> Watchdog*.

{{< img src="/monitors/monitor_types/watchdog/watchdog-monitor-1.png" alt="Configuring a Watchdog Monitor" style="width:80%;">}}

## Define your query
Select the scope to be alerted on with the following optional configurations (wildcards are supported):

**1. Predefined selectors**
* Environment. These values are derived from the `env` tag.
* Alert Category. Scope the monitor to a subset of Watchdog alerts.
* Team. These values are derived from the Service Catalog.

**2. Additional scoping**
* Filter on any additional tag available on the Watchdog event.
* Group By the dimensions you want to [group notifications by][3].
{{< img src="/monitors/monitor_types/watchdog/watchdog-monitor-2.png" alt="Configuring a Watchdog Monitor with advanced settings" style="width:90%;">}}

After your selections are made, the graph at the top of the monitor creation page displays the matching Watchdog events over the selected time frame.

### Notifications

For more instructions on the **Configure notifications and automations** section, see the [Notifications][4] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /watchdog/
[2]: https://app.datadoghq.com/monitors#create/watchdog
[3]: /monitors/configuration/?tab=thresholdalert#alert-grouping
[4]: /monitors/notify/
