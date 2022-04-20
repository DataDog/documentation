---
title: Real User Monitoring Monitor
kind: documentation
aliases:
- /monitors/monitor_types/real_user_monitoring
further_reading:
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Explore your RUM data"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/notify/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/manage/status/"
  tag: "Documentation"
  text: "Check your monitor status"
---

## Overview

Once [Real User Monitoring is enabled][1] for your organization, you can create a RUM monitor to alert you when a specific RUM event type exceeds a predefined threshold over a given period of time.

## Create a RUM monitor

To create a Real User Monitoring monitor in Datadog, first navigate to [**Monitors** > **New Monitor** > **Real User Monitoring**][2].

<div class="alert alert-info"><strong>Note</strong>: There is a default limit of 1,000 RUM monitors per account. <a href="/help/">Contact Support</a> to lift this limit for your account.</div>

### Define the search query

As you expand your search filters, the graph above the search bar updates.

1. Construct a search query using the same logic as a [RUM Explorer search][3].
2. Choose to monitor over a RUM event count, [facet][4], or [measure][5].
    * **Monitor over a RUM event count**: Use the search bar (optional) and do **not** select a facet or measure. Datadog evaluates the number of RUM events over a selected time frame, then compares it to the threshold conditions.
    * **Monitor over a facet**: If you select a [facet][4], the monitor alerts over the `Unique value count` of the facet.
    * **Monitor over measure**: If you select a [measure][5], the monitor alerts over the numerical value of the RUM facet (similar to a metric monitor). Select an aggregation type (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
3. Group RUM events by multiple dimensions (optional). All RUM events matching the query are aggregated into groups based on the value of up to four facets.
4. Configure the alerting grouping strategy (optional).
   * **Simple-Alert**: Simple alerts aggregate over all reporting sources. You receive one alert when the aggregated value meets the set conditions. If the query has a `group by` and you select **Simple-Alert**, you get one alert when one or multiple groups values breach the threshold. You may use this strategy to reduce notification noise.
   * **Multi-Alert**: Multiple alerts apply the alert to each source according to your group parameters. An alerting event is generated for each group that meets the set conditions. For example, you can group a query by `@browser.name` to receive a separate alert for each browser when the number of errors is high.
   
   {{< img src="monitors/monitor_types/rum/define-the-search-query.png" alt="Define the search query" style="width:80%;" >}}

5. Add multiple queries and apply formulas and functions (optional):

    * **Multiple queries**: Click **Add Query** to analyze multiple different sets of RUM data in relation to each other.
    * **Formulas and functions**: After adding your desired queries, click **Add Formula** to add a mathematical computation. The example below calculates the error rate on a cart page using the formula `(a/b)*100`.

   {{< img src="monitors/monitor_types/rum/rum_multiple_queries_1.png" alt="Multiple queries in the search filter" style="width:80%;" >}}

### Set alert conditions

An alert is triggered whenever a metric crosses a threshold.

* Triggers when the metric is `above`, `above or equal to`, `below`, or `below or equal to`.
* The threshold during the last `5 minutes`, `15 minutes`, `1 hour`, or `custom` to set a value between 5 minutes and 48 hours.
* Alert threshold `<NUMBER>`.
* Warning threshold `<NUMBER>`.

#### No data and below alerts

To receive a notification when an application has stopped sending RUM events, set the condition to `below 1`. This notifies when no RUM events match the monitor query in a given time frame across all aggregate groups.

When splitting the monitor by any dimension (tag or facet) and using a `below` condition, the alert is triggered **if and only if** there are RUM events for a given group, and the count is below the threshold—or if there are no RUM events for **all** of the groups.

#### Alerting Examples

For example, this monitor triggers if and only if there are no RUM events for all applications:

  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_application_id.png" alt="Below monitor split by application" style="width:70%;" >}}

And this monitor triggers if there are no logs for the application `Shop.ist`:

  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_shopist.png" alt="Below monitor for given application" style="width:70%;" >}}

#### Advanced alert conditions

For more information about advanced alert options such as evaluation delay, see [Configure Monitors][6].

### Notifications

For more information about the **Say what's happening** and **Notify your team** sections, see [Notifications][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: https://app.datadoghq.com/monitors/create/rum
[3]: /real_user_monitoring/explorer/search/
[4]: /real_user_monitoring/explorer/?tab=facets#setup-facets-measures
[5]: /real_user_monitoring/explorer/?tab=measures#setup-facets-measures
[6]: /monitors/create/configuration/#advanced-alert-conditions
[7]: /monitors/notify/
