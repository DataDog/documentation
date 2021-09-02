---
title: Live Process Monitor
kind: documentation
description: "Check if a process is running on a host"
aliases:
- /monitors/monitor_types/process
further_reading:
- link: "/monitors/notifications/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/monitor_status/"
  tag: "Documentation"
  text: "Check your monitor status"
---

## Overview

Live process monitors are based on data collected by the [Process Agent][1]. Create monitors that warn or alert based on the count of any group of processes across hosts or tags.

## Monitor creation

To create a [live process monitor][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> Live Process*.

### Select processes

Search for a process to monitor using a space separated list of strings. The search performs a partial match, fuzzy search across all processes on your infrastructure. Search operators `AND`, `OR`, and `NOT` are supported. See the [Live Process Monitoring][3] page for details. Additionally, filter by tags to refine your monitor to a specific scope.

Matching processes and counts are displayed below the search:

{{< img src="monitors/monitor_types/process/select_processes.png" alt="Select processes"  style="width:90%;">}}

After defining your search, a graph is displayed above the search inputs with an approximation of the total number of processes found.  For more granular data, visit your [Live Process Page][4].

#### Alert grouping

`Simple Alert` (default): aggregates alerts over all reporting sources. You receive one alert when the aggregated value meets the set conditions.

`Multi Alert`: applies the alert to each source according to your group parameters. You receive an alert for each group that meets the set conditions.

### Set alert conditions

* The count was `above`, `above or equal to`, `below`, or `below or equal to`
* the threshold during the last `5 minutes`, `15 minutes`, `1 hour`, etc. or `custom` to set a value between 1 minute and 48 hours.

Use thresholds to set a numeric value for triggering an alert. Datadog has two types of notifications (alert and warning). Live process monitors recover automatically based on the alert or warning threshold.

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][5] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /infrastructure/process/
[2]: https://app.datadoghq.com/monitors#create/live_process
[3]: /infrastructure/process/#search-syntax
[4]: https://app.datadoghq.com/process
[5]: /monitors/notifications/
