---
title: Log monitor
kind: documentation
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: Configure your monitor notifications
- link: "monitors/downtimes"
  tag: "Documentation"
  text: Schedule a dowtime to mute a monitor
- link: "monitors/monitor_status"
  tag: "Documentation"
  text: Consult your monitor status
---

{{< img src="monitors/monitor_types/log/log_monitor_overview.png" alt="Log monitor overview" responsive="true" >}}

## Overview

Log monitors alert when a specified type of log exceeds a user-defined threshold over a given period of time. Common use cases for this monitor include:

* Code exception errors monitoring 
* Build job notifications.

## Setup

1. Define the search query:
    {{< img src="monitors/monitor_types/log/define_the_search_query.png" alt="Define the search query" responsive="true" style="width:50%;" >}}
    The search query has the same behavior as [the log explore search][1]

2. Set alert conditions:
    {{< img src="monitors/monitor_types/log/set_alert_conditions.png" alt="Set alert conditions" responsive="true" style="width:50%;" >}}

3. Configure your **notification options**:  
    Refer to the [Notifications][2] dedicated documentation page for a detailed options.

## Notifications and log samples

 It is possible to add up to 10 samples of log that triggered the monitor in the notification message.
For now this is available for Slack and Emails notifications.

 **Enable log samples in notification message**
    
{{< img src="monitors/monitor_types/log/activate-log-monitor-sample.png" alt="Activate log samples in message" responsive="true" style="width:50%;" >}}
    
**Example for slack notifications** 

 {{< img src="monitors/monitor_types/log/slack-log-sample.png" alt="Slack notification example" responsive="true" style="width:50%;" >}}

## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search/
[2]: /monitors/notifications
