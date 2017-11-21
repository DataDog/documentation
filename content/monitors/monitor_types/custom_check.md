---
title: Custom check monitor
kind: documentation
autotocdepth: 3
customnav: monitortypenav
description: "Monitor status of arbitrary custom checks"
---

{{< img src="monitors/monitor_types/custom_check/custom_monitor.png" alt="custom monitor" responsive="true" >}}

Custom monitors encompass any service checks that are not reported by one of the
out-of-the-box integrations included with the Agent.

Refer to the [Guide to Agent Checks](/agent/agent_checks/) for detailed
information on writing your own checks that send metrics, events,
or service checks.

1. Select your **custom check**.

2. Select **host or tags** that you would like to monitor. The check will run
   for every unique set of tags from all monitored hosts. For example, the
   `Nginx` service check reports one status per `{host,port}`. So if you have
   multiple servers running on a single host, then each one will alert separately
   in the case of failure.

3.  Select your **alert options**.

   While each check run will send a status of either CRITICAL, WARNING or OK,
   you can choose at what consecutive conditions to cause a state change and a
   notification. For example, you might want to know immediately when your check
   fails and only have it recover if it stays that way. In this case you might
   choose to notify on 1 critical status, 1 warning status and 4 OK statuses.

   You can optionally **notify on no data** after a configurable timeframe. You
   must choose at least 2 minutes for your timeframe.

4. Configure your **notification options**. Refer to the [Notifications](/monitors/notifications) dedicated documentation page for a detailed walkthrough of the common notification options.