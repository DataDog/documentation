---
title: Logs Monitor
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
  text: "Check your monitor status"
---

## Overview

A logs monitor alerts when a specified type of log exceeds a user-defined threshold over a given period of time.

## Monitor creation

To create a [logs monitor][1] in Datadog, use the main navigation: *Monitors --> New Monitor --> Logs*.

### Define the search query

As you define the search query, the graph above the search fields updates.

* If you have [multiple log indexes][2], select the index to search.
* Construct a search query using the same logic as a [log explorer search][3].
* Choose to monitor over a log count, [facet][4], or [measure][5]:
    * **Monitor over a log count**: Use the search bar (optional) and do **not** select a facet or measure. Datadog evaluates the amount of logs over a selected time frame then compares it to the threshold conditions.
    * **Monitor over a facet**: If a facet is selected, the monitor alerts over the `Unique value count` of the facet.
    * **Monitor over measure**: If a measure is selected, the monitor alerts over the numerical value of the log facet (similar to a metric monitor) and aggregation needs to be selected (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
* Define the alert grouping (optional). **Note**: With or without alert grouping defined, you get **one** alert when the aggregated value meets the set conditions. Even if you split the query by host, a single notification is sent if several hosts meet the set conditions. This is done to reduce notification noise.

### Set alert conditions

* Trigger when the metric is `above`, `above or equal to`, `below`, or `below or equal to`
* the threshold during the last `5 minutes`, `15 minutes`, `1 hour`, etc.
* Alert threshold `<NUMBER>`
* Warning threshold `<NUMBER>`

#### No data and below alerts

To receive a notification when all groups in a service have stopped sending logs, set the condition to `below 1`. This notifies when no logs match the monitor query in a given timeframe across all aggregate groups.

When splitting the monitor by any dimension (tag or facet) and using a `below` condition, the alert is triggered **if and only if** there are logs for a given group, and the count is below the threshold—or if there are no logs for **all** of the groups.

**Examples**:

* This monitor triggers if and only if there are no logs for all services:
  {{< img src="monitors/monitor_types/log/log_monitor_below_by_service.png" alt="Below monitor split by service" responsive="true" style="width:60%;" >}}
* This monitor triggers if there are no logs for the service `backend`:
  {{< img src="monitors/monitor_types/log/log_monitor_below_condition.png" alt="Below monitor for backend service" responsive="true" style="width:60%;" >}}

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][6] page.

#### Log samples

By default, when a logs monitor is triggered:

* **Monitor over a log count**: Up to 10 log samples are added to the notification message.
* **Monitor over a facet or measure**: The top 10 facet or measure values are added to the notification message.

These are available for notifications sent to Slack, Jira, Webhook, Microsoft Teams, and Email. **Note**: Samples are not displayed for recovery notifications.

Notifications from monitors split by group include the top 10 breaching values instead of log samples.

To disable log samples, uncheck the box next at the bottom of the **Say what's happening** section. The text next to the box is based on your monitor's grouping:

* Grouped: `Include a table of the top 10 breaching values`
* Ungrouped: `Include a sample of 10 logs in the alert notification`

#### Examples

Include a table of the top 10 breaching values:
{{< img src="monitors/monitor_types/log/top_10_breaching_values.png" alt="Top 10 breaching values" responsive="true" style="width:60%;" >}}

Include a sample of 10 logs in the alert notification:
{{< img src="monitors/monitor_types/log/10_sample_logs.png" alt="Top 10 breaching values" responsive="true" style="width:60%;" >}}


## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/log
[2]: /logs/indexes
[3]: /logs/explorer/search
[4]: /logs/explorer/?tab=facets#setup
[5]: /logs/explorer/?tab=measures#setup
[6]: /monitors/notifications
