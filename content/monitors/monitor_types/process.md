---
title: Process monitor
kind: documentation
autotocdepth: 3
customnav: monitortypenav
description: "Check if a process is running on a host"
further_reading:
- link: "/monitors/notifications"
  tag: "Documentation"
  text: Configure your monitor notifications
- link: "/monitors/downtimes"
  tag: "Documentation"
  text: Schedule a dowtime to mute a monitor
- link: "/monitors/faq"
  tag: "FAQ"
  text: Monitors FAQ
---

{{< img src="monitors/monitor_types/process/process_monitor.png" alt="process monitor" responsive="true" popup="true">}}

## Overview

A process monitor watches the status produced by the `process.up` service
check reported by the check in the Agent. At the Agent level you can configure
thresholds based on the number of matching processes.

Read more about configuration on the [Process Check](/integrations/process/)
page.

For each process, a single service check status is produced. Through this
creation interface, you can choose which of those checks to monitor and at what
point they should notify.

## Configuration

1. Pick the **process** to monitor. You see the names configured in any Agent with an active process check.

2. Pick the **monitor scope**. You only see hosts or tags that are reporting a status for the selected process.

3. Select **alerting options**. Refer to the [custom monitors](#custom-monitors) section for details on the available options.

4. Configure your **notification options** Refer to the [Notifications](#monitor-notifications) dedicated documentation page for a detailed walkthrough of the common notification options.

## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}
