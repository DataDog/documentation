---
title: Network monitor
kind: documentation
autotocdepth: 3
customnav: monitortypenav
description: "Check the status of TCP/HTTP endpoints"
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

Network monitors cover the TCP and HTTP checks available in the Agent. Read
the [HTTP check documentation](/integrations/http_check/) for details on Agent configuration.

## Network Status

1. Choose a **network check**. You are able to choose from all `HTTP` and `TCP` checks being submitted by your Agents.  
    {{< img src="monitors/monitor_types/network/network_check_pick.png" alt="network check pick" responsive="true" popup="true">}}
2. Pick **monitor scope**. You only see hosts or tags reporting the check you have chosen.
    {{< img src="monitors/monitor_types/network/network_check_monitor_scope.png" alt="network check monitor scope" responsive="true" popup="true">}}
3. Select **alerting options**:
    {{< img src="monitors/monitor_types/network/network_check_alert_conditions.png" alt="network check alert conditions" responsive="true" popup="true">}}
    **Note**: Contrary to [metric monitor](/monitors/monitor_types/metric) it's not possible to get alerted after the endpoint is unavailable for X min. Instead you can only be alert after 5 max consecutive bad statuses. Unless a high timeout value is used in the agent configuration, if a site goes down this translates into 5 * ~15-20 seconds (agent collection period) i.e. 1min30 without data.

4. Configure your **notification options**:  
    Refer to the [Notifications](/monitors/notifications) dedicated documentation page for a detailed walkthrough of the common notification options.

## Network Metric

1. Choose a **network metric**. You are able to choose either the `TCP` or `HTTP` response time metric.

2. Pick **monitor scope**. You only see hosts or tags reporting the metric you have chosen.

3. Select **alerting options**. Refer to the [alert-conditions](#metrics-monitors) section for details on the available options.

4. Configure your **notification options**:  
    Refer to the [Notifications](/monitors/notifications) dedicated documentation page for a detailed walkthrough of the common notification options.

## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}