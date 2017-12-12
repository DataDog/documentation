---
title: Custom check monitor
kind: documentation
autotocdepth: 3
customnav: monitortypenav
description: "Monitor status of arbitrary custom checks"
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

{{< img src="monitors/monitor_types/custom_check/custom_monitor.png" alt="custom monitor" responsive="true" popup="true">}}

## Overview

Custom monitors encompass any service checks that are not reported by one of the
out-of-the-box integrations included with the Agent.

Refer to the [Guide to Agent Checks](/agent/agent_checks/) for detailed
information on writing your own checks that send metrics, events,
or service checks.

## Configuration

1. Select your **custom check**.

2. Select **host or tags** that you would like to monitor. The check runs
   for every unique set of tags from all monitored hosts. For example, the
   `Nginx` service check reports one status per `{host,port}`. So if you have
   multiple servers running on a single host, then each one alerts separately
   in the case of failure.

3.  Select your **alert options**.

   While each check run sends a status of either CRITICAL, WARNING or OK,
   you can choose at what consecutive conditions to cause a state change and a
   notification. For example, you might want to know immediately when your check
   fails and only have it recover if it stays that way. In this case you might
   choose to notify on 1 critical status, 1 warning status and 4 OK statuses.

   You can optionally **notify on no data** after a configurable timeframe. You
   must choose at least 2 minutes for your timeframe.

4. Configure your **notification options**. Refer to the [Notifications](/monitors/notifications) dedicated documentation page for a detailed walkthrough of the common notification options.

## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}
