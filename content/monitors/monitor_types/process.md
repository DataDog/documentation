---
title: Process monitor
kind: documentation
autotocdepth: 3
customnav: monitortypenav
description: "Check if a process is running on a host"
---

{{< img src="monitors/monitor_types/process/process_monitor.png" alt="process monitor" responsive="true" >}}

A process monitor will watch the status produced by the `process.up` service
check reported by the check in the Agent. At the Agent level you can configure
thresholds based on the number of matching processes.

Read more about configuration on the [Process Check](/integrations/process/)
page.

For each process, a single service check status will be produced. Through this
creation interface, you can choose which of those checks to monitor and at what
point they should notify.

1. Pick the **process** to monitor. You will see the names configured in any Agent with an active process check.

2. Pick the **monitor scope**. You will only see hosts or tags that are reporting a status for the selected process.

3. Select **alerting options**. Please refer to the [custom monitors](#custom-monitors) section for details on the available options.

4. Configure your **notification options** Refer to the [Notifications](#monitor-notifications) dedicated documentation page for a detailed walkthrough of the common notification options.