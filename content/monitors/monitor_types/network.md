---
title: Network monitor
kind: documentation
autotocdepth: 3
hideguides: true
customnav: monitortypenav
description: "Check the status of TCP/HTTP endpoints"
---

{{< img src="monitors/monitor_types/network/network_monitor.png" >}}

Network monitors cover the TCP and HTTP checks available in the Agent. Read
the [guide to network checks](/integrations/tcp_check) for details on Agent
configuration.

## Network Status

1. Choose a **network check**. You will be able to choose from all HTTP and TCP
   checks being submitted by your Agents.

2. Pick **monitor scope**. You will only see hosts or tags reporting
   the check you have chosen.

3. Select **alerting options**. Please refer to the
   [custom monitors](#custom-monitors) section for details on the available
   options.

4. Configure your **notification options** Refer to the
   [Notifications](/monitors/notifications) section of this guide for a detailed
   walkthrough of the common notification options.

## Network Metric

1. Choose a **network metric**. You will be able to choose either the TCP or
   HTTP response time metric.

2. Pick **monitor scope**. You will only see hosts or tags reporting
   the metric you have chosen.

3. Select **alerting options**. Please refer to the
   [alert-conditions](#metrics-monitors) section for details on the available
   options.

4. Configure your **notification options** Refer to the
   [Notifications](/monitors/notifications) section of this guide for a detailed walkthrough of the common notification options.