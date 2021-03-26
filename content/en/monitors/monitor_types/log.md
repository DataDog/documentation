---
title: Logs Monitor
kind: documentation
further_reading:
- link: "/monitors/notifications/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/monitor_status/"
  tag: "Documentation"
  text: "Check your monitor status"
---

## Overview

Once [log management is enabled][1] for your organization, you can create a logs monitor to alert you when a specified type of log exceeds a user-defined threshold over a given period of time.

## Monitor creation

To create a [logs monitor][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> Logs*.

### Define the search query

As you define the search query, the graph above the search fields updates.

1. Construct a search query using the same logic as a [log explorer search][3].
2. Choose to monitor over a log count, [facet][4], or [measure][4]:
    * **Monitor over a log count**: Use the search bar (optional) and do **not** select a facet or measure. Datadog evaluates the number of logs over a selected time frame, then compares it to the threshold conditions.
    * **Monitor over a facet**: If a [facet][4] is selected, the monitor alerts over the `Unique value count` of the facet.
    * **Monitor over measure**: If a [measure][4] is selected, the monitor alerts over the numerical value of the log facet (similar to a metric monitor) and aggregation needs to be selected (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
3. Configure the alerting grouping strategy (optional):
    * **Simple-Alert**: Simple alerts aggregate over all reporting sources. You receive one alert when the aggregated value meets the set conditions. This works best to monitor a metric from a single host or the sum of a metric across many hosts. This strategy may be selected to reduce notification noise.
    * **Multi-Alert**: Multi alerts apply the alert to each source according to your group parameters, up to 100 matching groups. An alerting event is generated for each group that meets the set conditions. For example, you could group `system.disk.in_use` by `device` to receive a separate alert for each device that is running out of space.

### Set alert conditions

* Trigger when the metric is `above`, `above or equal to`, `below`, or `below or equal to`
* the threshold during the last `5 minutes`, `15 minutes`, `1 hour`, etc. or `custom` to set a value between 5 minutes and 48 hours.
* Alert threshold `<NUMBER>`
* Warning threshold `<NUMBER>`

#### No data and below alerts

`NO DATA` is a state given when no logs match the monitor query during the timeframe

To receive a notification when all groups matching a specific query have stopped sending logs, set the condition to `below 1`. This notifies when no logs match the monitor query in a given timeframe across all aggregate groups.

When splitting the monitor by any dimension (tag or facet) and using a `below` condition, the alert is triggered **if and only if** there are logs for a given group, and the count is below the threshold—or if there are no logs for **all** of the groups.

**Examples**:

* This monitor triggers if and only if there are no logs for all services:
  {{< img src="monitors/monitor_types/log/log_monitor_below_by_service.png" alt="Below monitor split by service"  style="width:60%;" >}}
* This monitor triggers if there are no logs for the service `backend`:
  {{< img src="monitors/monitor_types/log/log_monitor_below_condition.png" alt="Below monitor for backend service"  style="width:60%;" >}}

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][5] page.

#### Log samples and breaching values toplist

When a logs monitor is triggered, samples or values can be added to the notification message.

| Monitor over     | Can be added to notification message                                                                     |
|------------------|----------------------------------------------------------------------------------------------------------|
| Log count        | Grouped: The top 10 breaching values and their corresponding counts.<br>Ungrouped: Up to 10 log samples. |
| Facet or measure | Grouped: The top 10 facet or measure values.<br>Ungrouped: The top 10 facet or measure values.           |

These are available for notifications sent to Slack, Jira, webhooks, Microsoft Teams, Pagerduty, and email. **Note**: Samples are not displayed for recovery notifications.

To disable log samples, uncheck the box at the bottom of the **Say what's happening** section. The text next to the box is based on your monitor's grouping (as stated above).

#### Examples

Include a table of the top 10 breaching values:
{{< img src="monitors/monitor_types/log/top_10_breaching_values.png" alt="Top 10 breaching values"  style="width:60%;" >}}

Include a sample of 10 logs in the alert notification:
{{< img src="monitors/monitor_types/log/10_sample_logs.png" alt="Top 10 breaching values"  style="width:60%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/
[2]: https://app.datadoghq.com/monitors#create/log
[3]: /logs/explorer/search/
[4]: /logs/explorer/facets/
[5]: /monitors/notifications/
