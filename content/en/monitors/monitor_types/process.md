---
title: Live Process Monitor
kind: documentation
description: "Check if a process is running on a host"
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "monitors/monitor_status"
  tag: "Documentation"
  text: "Check your monitor status"
---

## Overview

Live process monitors are based on data collected by the [Process Agent][1]. Create monitors that warn or alert you based on the behavior of any group of processes across your hosts or tags.

## Monitor creation

To create a [live process monitor][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> Live Process*.

### Select processes

Search for a process to monitor using a space separated list of strings. The search performs a partial match, fuzzy search across all processes on your infrastructure. Use tags to refine your monitor to a specific scope.

Matching processes and counts are displayed below the search:

{{< img src="monitors/monitor_types/process/select_processes.png" alt="Select processes" responsive="true" style="width:90%;">}}

After defining your search, a graph is displayed above the search inputs with the total number of processes found.

#### Alert grouping

`Simple Alert` (default): aggregates alerts over all reporting sources. You receive one alert when the aggregated value meets the set conditions.

`Multi Alert`: applies the alert to each source according to your group parameters. You receive an alert for each group that meets the set conditions.

### Set alert conditions

* The count was `above`, `above or equal to`, `below`, or `below or equal to`
* the threshold during the last `5 minutes`, `15 minutes`, `1 hour`, etc.

Use thresholds to set a numeric value for triggering an alert. Datadog has two types of notifications (alert and warning). Live process monitors recover automatically based on the alert or warning threshold.

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][3] page.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}


[1]: /graphing/infrastructure/process
[2]: https://app.datadoghq.com/monitors#create/live_process
[3]: /monitors/notifications
