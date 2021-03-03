---
title: Real User Monitoring Monitor
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

Once [Real User Monitoring is enabled][1] for your organization, you can create a RUM monitor to alert you when a specified type of RUM event exceeds a user-defined threshold over a given period of time.

## Monitor creation

To create a [RUM monitor][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> Real User Monitoring*.

### Define the search query

As you define the search query, the graph above the search fields updates.

1. Construct a search query using the same logic as a [RUM explorer search][3].
2. Choose to monitor over a RUM event count, [facet][4], or [measure][5]:
    * **Monitor over a RUM event count**: Use the search bar (optional) and do **not** select a facet or measure. Datadog evaluates the number of RUM events over a selected time frame, then compares it to the threshold conditions.
    * **Monitor over a facet**: If a [facet][4] is selected, the monitor alerts over the `Unique value count` of the facet.
    * **Monitor over measure**: If a [measure][5] is selected, the monitor alerts over the numerical value of the RUM facet (similar to a metric monitor) and aggregation needs to be selected (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
3. Define the alert grouping (optional). **Note**: With or without alert grouping defined, you get **one** alert when the aggregated value meets the set conditions. Even if you split the query by country, a single notification is sent if several countries meet the set conditions. This is done to reduce notification noise.

{{< img src="monitors/monitor_types/rum/define-the-search-query.png" alt="Define the search query"  style="width:60%;" >}}

### Set alert conditions

* Trigger when the metric is `above`, `above or equal to`, `below`, or `below or equal to`
* the threshold during the last `5 minutes`, `15 minutes`, `1 hour`, etc. or `custom` to set a value between 5 minutes and 48 hours.
* Alert threshold `<NUMBER>`
* Warning threshold `<NUMBER>`

#### No data and below alerts

To receive a notification when an application has stopped sending RUM events, set the condition to `below 1`. This notifies when no RUM events match the monitor query in a given timeframe across all aggregate groups.

When splitting the monitor by any dimension (tag or facet) and using a `below` condition, the alert is triggered **if and only if** there are RUM events for a given group, and the count is below the threshold—or if there are no RUM events for **all** of the groups.

**Examples**:

* This monitor triggers if and only if there are no RUM events for all applications:
  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_application_id.png" alt="Below monitor split by application"  style="width:70%;" >}}
* This monitor triggers if there are no logs for the application `Shop.ist`:
  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_shopist.png" alt="Below monitor for given application"  style="width:70%;" >}}

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][6] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: https://app.datadoghq.com/monitors#create/rum
[3]: /real_user_monitoring/explorer/search/
[4]: /real_user_monitoring/explorer/?tab=facets#setup-facets-measures
[5]: /real_user_monitoring/explorer/?tab=measures#setup-facets-measures
[6]: /monitors/notifications/
