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
- link: "monitors/faq"
  tag: "FAQ"
  text: Monitors FAQ
---

{{< img src="monitors/monitor_types/log/log_monitor_overview.png" alt="Log monitor overview" responsive="true" popup="true" >}}

## Overview

Log monitors alert when a specified type of log exceeds a user-defined threshold over a given period of time. Common use cases for this monitor include:

* Code exception errors monitoring 
* Build job notifications.

## Setup

1. Define the search query:
    {{< img src="monitors/monitor_types/log/define_the_search_query.png" alt="Define the search query" responsive="true" popup="true" style="width:50%;" >}}
    The search query has the same behavior as [the log explore search][1]

2. Set alert conditions:
    {{< img src="monitors/monitor_types/log/set_alert_conditions.png" alt="Set alert conditions" responsive="true" popup="true" style="width:50%;" >}}

3. Configure your **notification options**:  
    Refer to the [Notifications][2] dedicated documentation page for a detailed options.

## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explore/#search-bar
[2]: /monitors/notifications
