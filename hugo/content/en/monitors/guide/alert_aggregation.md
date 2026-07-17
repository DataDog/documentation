---
title: Alert aggregation
description: "Learn about simple and multi alert aggregation strategies to manage alert noise and ensure actionable notifications for your monitoring system."
further_reading:
- link: "/monitors/configuration/?tab=thresholdalert#configure-notifications-and-automations"
  tag: "Documentation"
  text: "Learn more about configuring notifications and automations"
- link: "/monitors/guide/monitor_aggregators/"
  tag: "Documentation"
  text: "Monitor Aggregators"
---

## Overview

Ensuring system health and performance requires timely and actionable notifications. However, effective alerts depend not only on timing, but also on the number of alerts generated. Alert aggregation is critical in managing this balance.

For example, if you manage an an e-commerce site and issues arise, do you want one summarized alert or multiple specific alerts detailing each aspect of the failure?   
The answer depends on your system's architecture, the nature of the issue, and your team's workflow. Understanding alert aggregations can help ensure teams are informed of issues without excess notifications. 

This guide explores various alert aggregation capabilities and strategies for different scenarios.

## Types of alert aggregation 

By default, Datadog sends an alert for each monitored group. However, you can choose to receive a single notification, regardless of how many monitored groups breach the threshold.

Consider this example, you have a monitor query grouped by multiple attributes, in this case the query is grouped by `topic` and `partition`.

{{< img src="/monitors/guide/alert_aggregation/monitor_query_multi_alert.png" alt="Example monitor query grouped by topic and partition" style="width:100%;" >}}

### Simple alert

A simple alert monitor aggregates your alerts into a single unique alert.
{{< img src="monitors/guide/alert_aggregation/simple_alert_notification.png" alt="Notification configuration for a simple alert monitor" style="width:100%;" >}}

Using the example, no matter which `topic` or `partition` breaches the threshold, the monitor sends a single alert. All notifications are aggregated into one alert.

For more information, see [Configure Monitors - Simple alert][1].

### Multi alert

A multi alert monitor sends a notification for each unique combination of groups.  
{{< img src="/monitors/guide/alert_aggregation/multi_alert_notification.png" alt="Notification configuration for a multi alert monitor" style="width:100%;" >}}
Using the example, the monitor sends a notification each time a combination of `topic` and `partition` breaches the threshold.  
With multi alert monitors, use [variables][2] to get more granularity in your notification. They help customize messages based on the specific group that triggers the alert.

For more information, see [Configure Monitors - Multi alert][3].

## Use cases

{{% collapse-content title="Simple Alert" level="h4" expanded=false %}}
#### Scenario
You're monitoring a Kafka-based logging system grouped by `error-logs` and `user-events`. If any partition gets a message lag of more than 500, you want to know about it, but you don't need multiple alerts if multiple partitions are lagging.  

#### Benefits of aggregation
A simple alert is useful for teams that don't want excessive notifications but still need to act when issues arise.  
However, if multiple partitions are lagging, you might not see every single affected partition in a single notification.

{{% /collapse-content %}}

{{% collapse-content title="Multi Alert" level="h4" expanded=false %}}
Multi alerts are great for when a service is owned by multiple teams (each team is responsible for a dedicated component). Depending on which component is causing an issue, a different team should be notified.

#### Scenario
You're running an e-commerce order processing system, and messages are sent to the "order-events" topic.  
  
#### Benefits of aggregation
If multiple partitions lag (for example, partition 1 and partition 3), you need separate alerts because different partitions might correspond to different types of orders (such as domestic vs. international).  

This level of detail helps engineers respond quickly and with precision.

{{% /collapse-content %}}


## How to do this with the API

If you are managing your monitors with the API, use the variable `notify_by` to make your monitor a simple alert or a multi alert.  

| Type of Alert     | Configuration Example                  |
|-------------------|----------------------------------------|
| Simple Alert      | `"notify_by": ["*"]`                     |
| Multi Alert       | `"notify_by": [<group>]`, for example, `"notify_by": ["topic"]` |

For more information, see the [API documentation][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/configuration/?tab=thresholdalert#simple-alert
[2]: /monitors/notify/variables/?tab=is_alert#triggered-variables
[3]: /monitors/configuration/?tab=thresholdalert#multi-alert
[4]: /api/latest/monitors/#create-a-monitor
