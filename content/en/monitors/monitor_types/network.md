---
title: Network monitor
kind: documentation
description: "Check the status of TCP/HTTP endpoints"
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

Network monitors cover the TCP and HTTP checks available in the Agent. Read the [HTTP check documentation][1] for details on Agent configuration.

## Network Status

1. Choose a **network check**. The available options are all monitored `HTTP` or `TCP` checks being submitted by your Agents.  
    {{< img src="monitors/monitor_types/network/network_check_pick.png" alt="network check pick" responsive="true" style="width:80%;">}}
2. Pick **monitor scope**. Only hosts or tags from the checks you selected are available.
    {{< img src="monitors/monitor_types/network/network_check_monitor_scope.png" alt="network check monitor scope" responsive="true" style="width:80%;">}}
3. Select **alerting options**:
    {{< img src="monitors/monitor_types/network/network_check_alert_conditions.png" alt="network check alert conditions" responsive="true" style="width:80%;">}}

    **Note**: Contrary to [metric monitors][2], it's not possible to get alerted after the endpoint is unavailable for `X` min. Instead you can only be alerted after 5 max consecutive bad statuses. Unless a high timeout value is used in the Agent configuration, if a site goes down this translates into 5 * ~15-20 seconds (Agent collection period) or 90 seconds without data.

4. Configure **notification options**. Refer to the [Notifications][3] documentation for a detailed walkthrough of the common notification options.

## Network Metric

1. Choose a **network metric**. You are able to choose either the `TCP` or `HTTP` response time metric.

2. Pick the **monitor scope**. Only hosts or tags from the metric you selected are available.

3. Select **alerting options**. Refer to the alert-conditions section in the [metric monitor][2] documentation for details.

4. Configure **notification options**. Refer to the [Notifications][3] documentation for a detailed walkthrough of the common notification options.

## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/http_check
[2]: /monitors/monitor_types/metric
[3]: /monitors/notifications
