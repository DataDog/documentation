---
title: Real User Monitoring Monitor
description: "Monitor real user performance and errors across web and mobile applications using RUM data to improve customer experience."
aliases:
- /monitors/monitor_types/real_user_monitoring
- /monitors/create/types/real_user_monitoring/
further_reading:
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Explore your RUM data"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/status/"
  tag: "Documentation"
  text: "Check your monitor status"
---

## Overview

Datadog's [Real User Monitoring (RUM)][1]  provides real-time visibility into individual user activity for web and mobile applications. It addresses performance tracking, error management, analytics, and support use cases. With [RUM without Limits™][8], you can use metric-based monitors to alert on your full unsampled traffic with 15-month retention. Metric-based monitors support advanced alerting conditions such as anomaly detection.

After you enable RUM for your organization, you can create a RUM monitor to alert you when a specific RUM event type exceeds a predefined threshold over a given period of time.

## Create a RUM monitor

To create a RUM monitor in Datadog, first navigate to [**Monitors** > **New Monitor** > **Real User Monitoring**][2].

<div class="alert alert-info">There is a default limit of 1000 RUM monitors per account. If you are encountering this limit, consider using <a href="/monitors/configuration/?tab=thresholdalert#alert-grouping">multi alerts</a>, or <a href="/help/">Contact Support</a>.</div>

From there, you can click **New Monitor**, then:

- **Start with a template**: Datadog provides several pre-built templates for common RUM monitoring scenarios like error rates, performance vitals, or availability checks. Browse the [full template gallery][9] to get started.
- **Build a custom monitor**: Choose from out-of-the-box metrics or custom metrics, then scope to your application, specific pages, or views.

### Define the search query

As you expand your search filters, the graph above the search bar updates.

1. Construct a search query using the same logic as a [RUM Explorer search][3].
2. Choose to monitor over [full traffic metrics or retained events][10].
3. Choose to monitor over a RUM event count, [facet][4], or [measure][5].
    * **Monitor over a RUM event count**: Use the search bar (optional) and do **not** select a facet or measure. Datadog evaluates the number of RUM events over a selected time frame, then compares it to the threshold conditions.
    * **Monitor over a facet**: If you select a [facet][4], the monitor alerts over the `Unique value count` of the facet.
    * **Monitor over measure**: If you select a [measure][5], the monitor alerts over the numerical value of the RUM facet (similar to a metric monitor). Select an aggregation type (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
4. Group RUM events by multiple dimensions (optional):
  All RUM events matching the query are aggregated into groups based on the value of up to four facets. When there are multiple dimensions, the top values are determined according to the first dimension, then according to the second dimension within the top values of the first dimension, and so on up to the last dimension. The dimensions limit depends on the total number of dimensions:
   * **1 facet**: 1000 top values
   * **2 facets**: 30 top values per facet (at most 900 groups)
   * **3 facets**: 10 top values per facet (at most 1000 groups)
   * **4 facets**: 5 top values per facet (at most 625 groups)

6. Add multiple queries and apply formulas and functions (optional):

    * **Multiple queries**: Click **Add Query** to analyze multiple different sets of RUM data in relation to each other.
    * **Formulas and functions**: After adding your desired queries, click the **Add Function** icon to add a mathematical computation. The example below calculates the error rate on a cart page using the formula `(a/b)*100`.

   {{< img src="monitors/monitor_types/rum/rum_multiple_queries_3.png" alt="A monitor configured to alert on the error rate of a cart page. This monitor has two queries (a and b) and contains a formula: (a/b)*100." style="width:80%;" >}}

   Optionally, you can add a [custom schedule][12] to set a specific evaluation time and control the evaluation frequency of your monitor.

### Set alert conditions

An alert is triggered whenever a metric crosses a threshold.

* Triggers when the metric is `above`, `above or equal to`, `below`, or `below or equal to`.
* The threshold during the last `5 minutes`, `15 minutes`, `1 hour`, or `custom` to set a value between 5 minutes and 48 hours.
* Alert threshold `<NUMBER>`.
* Warning threshold `<NUMBER>`.

#### No data and below alerts

To receive a notification when an application has stopped sending RUM events, set the condition to `below 1`. This notifies when no RUM events match the monitor query in a given time frame across all aggregate groups.

When splitting the monitor by any dimension (tag or facet) and using a `below` condition, the alert is triggered **if and only if** there are RUM events for a given group, and the count is below the threshold—or if there are no RUM events for **all** of the groups.

#### Alerting examples

For example, this monitor triggers if and only if there are no RUM events for all applications:

  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_application_id-1.png" alt="The monitor configuration page with the search query left blank, set to the count of all RUM events and grouped by @application.id over the last 5 minutes. The Set alert conditions section is configured to trigger when the value is below the threshold of 1, and if data is missing for more than 5 minutes it is configured to evaluate as zero" style="width:70%;" >}}

And this monitor triggers if there are no logs for the application `Shop.ist`:

  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_shopist-1.png" alt="The monitor configuration page with Application Id:Shopist entered in the search query, set to the count of all RUM events matching that application over the last 5 minutes. The Set alert conditions section is configured to trigger when the value is below the threshold of 1, and if data is missing for more than 5 minutes it is configured to evaluate as zero" style="width:70%;" >}}

#### Advanced alert conditions

For more information about advanced alert options such as evaluation delay, see [Configure Monitors][6].

### Notifications

For more information about the **Configure notifications and automations** section, see [Notifications][7].

### Permissions and audit notifications

For more information about the **Define permissions and audit notifications** section, see [Permissions][11].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: https://app.datadoghq.com/monitors/create/rum
[3]: /real_user_monitoring/explorer/search/
[4]: /real_user_monitoring/explorer/?tab=facets#setup-facets-measures
[5]: /real_user_monitoring/explorer/?tab=measures#setup-facets-measures
[6]: /monitors/configuration/#advanced-alert-conditions
[7]: /monitors/notify/
[8]: /real_user_monitoring/rum_without_limits
[9]: https://app.datadoghq.com/monitors/templates?q=real%20user%20monitoring&origination=installed&p=1
[10]: /real_user_monitoring/guide/alerting-with-rum/#choosing-between-monitoring-metrics-and-events
[11]: /monitors/configuration/?tab=evaluateddata#permissions
[12]: /monitors/guide/custom_schedules/?tab=day