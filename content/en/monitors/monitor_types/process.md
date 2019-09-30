---
title: Process monitor
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
  text: "Consult your monitor status"
---

## Overview

Process monitors are configured to check the status of individual or groups of processes. Process monitors are evaluated every minute.

## Live Process Monitors

{{< img src="monitors/monitor_types/process/live_process_monitor_select.png" alt="live process monitor" responsive="true" style="width:35%;">}}

Live Process Monitors are based on data collected by the [Process Agent][1] which allows you to centrally create monitors that warn or alert based on the behavior of any group of processes across any hosts or tags.

### Configuration

1. **Search for the Process to monitor.**
  This can be a space separated list of strings. The search performs a partial match, fuzzy search across all processes on your infrastructure.
  Matching processes and counts are displayed in the table below:

    {{< img src="monitors/monitor_types/process/search_process.png" alt="Search process" responsive="true" style="width:80%;">}}

2. **Use tags to refine your monitor to a specific scope.**
  You only see hosts or tags that are reporting a status for the selected process.

    {{< img src="monitors/monitor_types/process/selecting_scope.png" alt="Selecting scope" responsive="true" style="width:80%;">}}

    **Note**: Above the *Select process* section is displayed the graph of the number of processes in the scope for the monitor over time.
    Selecting `multi-alert` split this graph into one line per group.

3. **Select alerting options.**

    {{< img src="monitors/monitor_types/process/set_alert_conditions.png" alt="Set alert conditions" responsive="true" style="width:80%;">}}

4. **Configure your notification options**.
  Refer to the [Notifications][2] dedicated documentation page for a detailed options.

## Process Check

{{< img src="monitors/monitor_types/process/process_check_select.png" alt="process check" responsive="true" style="width:35%;">}}

A process check monitor watches the status produced by the `process.up` service check reported by the check in the Agent. At the Agent level you can configure thresholds based on the number of matching processes.

Read more about configuration on the [Process Check][3] page.

For each process, a single service check status is produced. Through this creation interface, you can choose which of those checks to monitor and at what point they should notify.

### Configuration

1. **Pick the process to monitor.**
  You see the names configured in any Agent with an active process check.
    {{< img src="monitors/monitor_types/process/process_monitor_pick.png" alt="process monitor pick" responsive="true" style="width:80%;">}}

2. **Pick the monitor scope**.
  You only see hosts or tags that are reporting a status for the selected process.
    {{< img src="monitors/monitor_types/process/process_monitor_scope.png" alt="process monitor scope" responsive="true" style="width:80%;">}}

3. **Select alerting options**:

    The monitor is evaluated every minute, therefore setting a threshold to `X consecutive failures` means that the process was down for `X consecutive minutes`.
    {{< img src="monitors/monitor_types/process/process_check_alert_conditions.png" alt="process monitor alert conditions" responsive="true" style="width:80%;">}}

4. **Configure your notification options**:
    Refer to the [Notifications][4] dedicated documentation page for a detailed walkthrough of the common notification options.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/infrastructure/process
[2]: /monitors/notifications
[3]: /integrations/process
[4]: /monitors/notifications
