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

Log monitors alert when a specified type of log exceeds a user-defined threshold over a given period of time.

## Setup

Construct a query to control what will be monitored:

1. Define the search query:
    {{< img src="monitors/monitor_types/log/define_the_search_query.png" alt="Define the search query" responsive="true" style="width:50%;" >}}
    The search query has the same behavior as [the log explorer search][1]
    
2. Choose a [Measure][1] or [Facet][2] to monitor. [Measure][1] lets you choose the aggregation function whereas [Facet][2] displays a count.
    
    {{< img src="monitors/monitor_types/log/choose_measure_facet.png" alt="choose measure facet" responsive="true" style="width:50%;">}}
    
3. Select the aggregation function for the [Measure][1] you want to graph:
    
    {{< img src="monitors/monitor_types/log/agg_function_log_graph_2.png" alt="aggregation function for Log Analytics" responsive="true" style="width:50%;">}}

4. (Optional) Define the alert grouping:
  {{< img src="monitors/monitor_types/log/log_monitor_group_by.png" alt="Set alert conditions" responsive="true" style="width:50%;" >}}
    With or without alert grouping defined, you get **one** alert when the aggregated value meets the conditions set below. Even if you split the query by host, a single notification is sent if several hosts meet the conditions set below. This is done to reduce notification noise.

5. Set alert conditions. The following options can be used:

  {{< img src="monitors/monitor_types/log/above_below.png" alt="aggregation function for Log Analytics" responsive="true" style="width:50%;">}}

6. Configure your **notification options**:  

  {{< img src="monitors/monitor_types/log/set_alert_conditions.png" alt="Set alert conditions" responsive="true" style="width:50%;" >}}

  Refer to the [notifications][2] dedicated documentation page for detailed options.
    

## Notifications and log samples

It is possible to add up to 10 samples of logs that triggered the monitor in the notification message.
This is available for Slack, Jira, Webhook, Microsoft Teams, and email notifications.

* Samples are not displayed for recovery notifications.

 **Enabling log samples in notifications**:
    
  {{< img src="monitors/monitor_types/log/activate-log-monitor-sample.png" alt="Activate log samples in message" responsive="true" style="width:50%;" >}}
    
  **Example for a Slack notification** 

  {{< img src="monitors/monitor_types/log/slack-log-sample.png" alt="Slack notification example" responsive="true" style="width:50%;" >}}
 
## No Data alerts and Below Conditions  

To be notified if a specific set of logs are not received anymore, set the condition `below 1`. This notifies when no logs match the monitor query on the given timeframe. 

However, note that when splitting the monitor by any dimension (tag or facet) and using a `below` condition, the alert is triggered **if and only if** there are logs for a given group, and the count is below the threshold—or if there are no logs for **all** of the groups.  

Examples:  

1. The following monitor triggers if and only if there are no logs for all of the services:  
  {{< img src="monitors/monitor_types/log/log_monitor_below_by_service.png" alt="Below monitor split by service" responsive="true" style="width:50%;" >}}
2. The following monitor triggers if there are no logs for the service `backend`:  
  {{< img src="monitors/monitor_types/log/log_monitor_below_condition.png" alt="Below monitor for backend service" responsive="true" style="width:50%;" >}}

## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search
[2]: /monitors/notifications
