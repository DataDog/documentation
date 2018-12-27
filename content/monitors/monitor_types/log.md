---
title: Log monitor
kind: documentation
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

{{< img src="monitors/monitor_types/log/log_monitor_overview.png" alt="Log monitor overview" responsive="true" >}}

## Overview

Log monitors alert when a specified type of log exceeds a user-defined threshold over a given period of time. Common use cases for this monitor include:

* Code exception errors monitoring 
* Build job notifications

## Setup

1. Define the search query:
    {{< img src="monitors/monitor_types/log/define_the_search_query.png" alt="Define the search query" responsive="true" style="width:50%;" >}}
    The search query has the same behavior as [the log explorer search][1]

2. (Optional) Define the alert grouping:
  {{< img src="monitors/monitor_types/log/log_monitor_group_by.png" alt="Set alert conditions" responsive="true" style="width:50%;" >}}
    With or without alert grouping defined, you get one alert when the aggregated value meets the conditions set below. Even if you split the query by host, a single notification is sent if several hosts meet the conditions set below. This is done to reduce notification noise.

3. Set alert conditions:
    {{< img src="monitors/monitor_types/log/set_alert_conditions.png" alt="Set alert conditions" responsive="true" style="width:50%;" >}}

4. Configure your **notification options**:  
    Refer to the [notifications][2] dedicated documentation page for detailed options.
    

## Notifications and log samples

It is possible to add up to 10 samples of logs that triggered the monitor in the notification message.
This is available for Slack and email notifications.

Samples are not available for multi-alerts.

 **Enable log samples in notification message**
    
{{< img src="monitors/monitor_types/log/activate-log-monitor-sample.png" alt="Activate log samples in message" responsive="true" style="width:50%;" >}}
    
**Example for Slack notifications** 

 {{< img src="monitors/monitor_types/log/slack-log-sample.png" alt="Slack notification example" responsive="true" style="width:50%;" >}}
 
## No Data alerts and Below Conditions

To be notified if a specific set of logs are not received anymore, set the condition `below 1`. This notifies when no logs match the monitor query on the given timeframe.

However, note that when splitting the monitor by any dimension (tag or facet) and using a `below` condition, the alert is triggered **if and only if** there are logs for a given group, and the count is below the threshold—or if there are no logs at all for all of the groups.

Examples:

1. The following monitor triggers if and only if there are no logs for all of the services:

{{< img src="monitors/monitor_types/log/log_monitor_below_by_service.png" alt="Below monitor split by service" responsive="true" style="width:50%;" >}}

2. The following monitor triggers if there are no logs for the service `backend`: 

{{< img src="monitors/monitor_types/log/log_monitor_below_condition.png" alt="Below monitor for backend service" responsive="true" style="width:50%;" >}}

## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search
[2]: /monitors/notifications
