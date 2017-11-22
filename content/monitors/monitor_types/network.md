---
title: Network monitor
kind: documentation
autotocdepth: 3
customnav: monitortypenav
description: "Check the status of TCP/HTTP endpoints"
---

{{< img src="monitors/monitor_types/network/network_monitor.png" alt="network monitor" responsive="true" popup="true">}}

Network monitors cover the TCP and HTTP checks available in the Agent. Read
the [guide to network checks](/integrations/tcp_check) for details on Agent
configuration.

## Network Status

1. Choose a **network check**. You will be able to choose from all HTTP and TCP checks being submitted by your Agents.

2. Pick **monitor scope**. You will only see hosts or tags reporting the check you have chosen.

3. Select **alerting options**.

4. Configure your **notification options** Refer to the [Notifications](/monitors/notifications) dedicated documentation page for a detailed walkthrough of the common notification options.

## Network Metric

1. Choose a **network metric**. You will be able to choose either the TCP or HTTP response time metric.

2. Pick **monitor scope**. You will only see hosts or tags reporting the metric you have chosen.

3. Select **alerting options**. Please refer to the [alert-conditions](#metrics-monitors) section for details on the available options.

4. Configure your **notification options** Refer to the [Notifications](/monitors/notifications) dedicated documentation page for a detailed walkthrough of the common notification options.


##  Built a network monitor on an http check.

[Once you have created an HTTP check](/integrations/http_check/) with your Datadog Agent, you might want to monitor it on your Datadog application

To build a Network monitor on an http check you need to:

1. Create a network monitor: Monitor > New monitor
2. Enter your network monitor setting:
    {{< img src="monitors/monitor_types/network/network_monitor_settings.png" alt="alert type"  responsive="true" popup="true">}}

    Don't forget to select the threshold values for your monitor

3. Configure the 4 - "Say what's happening" section to receive the correct notification. Find more about this [here](/monitors/notifications)

**Note**: Contrary to metric monitor it's not possible to get alerted after the endpoint is unavailable for X min. Instead you can only be alert after 5 max consecutive bad statuses. Unless a high timeout value is used in the agent config, if a site goes down this translates into 5 * ~15-20 seconds (agent collection period) i.e. 1min30 without data.
