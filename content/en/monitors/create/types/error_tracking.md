---
title: Error Tracking Monitor
kind: documentation
description: Learn about the Error Tracking monitor type.
further_reading:
- link: "/real_user_monitoring/error_tracking/"
  tag: "Documentation"
  text: "Learn more about Error Tracking"
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

Once [Real User Monitoring][1] or [APM][2] is enabled for your organization, you can create an [Error Tracking][3] monitor to alert you when an issue starts, when it has a high impact, and when it starts regressing.

## Create an Error Tracking monitor

To create an Error Tracking monitor in Datadog, navigate to [**Monitors** > **New Monitor** > **Error Tracking**][4].

<div class="alert alert-info"><strong>Note</strong>: There is a default limit of 1,000 Error Tracking monitors per account. <a href="/help/">Contact Support</a> to lift this limit for your account.</div>

### Select the alerting condition

Alerts are grouped by issue ID and are based on error volume.

Choose **Count** to alert on issues with a high number of errors and **New Issue** to detect additional issues.

### Define the search query

{{< tabs >}}
{{% tab "Count" %}}

As you expand your search filter, the Count graph above **Select the alerting condition** updates.

1. Optionally, select a query suggestion such as **Error Occurrences**, **Impacted Users**, and **Impacted Sessions** to alert on. 
2. Select **Web and Mobile Apps** or **Backend Services** and choose to monitor over a count, facet, or measure.
   - For error occurrences, monitor over an overall count based on the issue ID.
   - For impacted users, monitor over a unique count of user emails based on the issue ID or over a measure. 
   - For impacted sessions, monitor over a unique count of session IDs based on the issue ID. 
   - Monitor over a measure. If you select a measure, the monitor alerts over the numerical value of the RUM facet (similar to a metric monitor). Select an aggregation type (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
4. Construct a search query using the same logic as a [RUM Explorer search][1] for the issues’ error occurrences.
5. Configure the alerting grouping strategy (optional).
   - Simple-Alert: Simple alerts aggregate over all reporting sources. You receive one alert when the aggregated value meets the set conditions. If the query has a `group by` and you select **Simple-Alert**, you get one alert when one or multiple groups’ values breach the threshold. You may use this strategy to reduce notification noise.
   - Multi-Alert: Multiple alerts apply the alert to each source according to your group parameters. An alerting event is generated for each group that meets the set conditions. For example, you can group a query by `@browser.name` to receive a separate alert for each browser when the number of errors is high.


[1]: /real_user_monitoring/explorer/search/
{{% /tab %}}

{{% tab "New Issue" %}}

As you expand your search filter, the issue details list above **Select the alerting condition** updates. The list displays older issues that are considered new in larger time frames such as the past 24 hours or the past week. 

1. Select or input a custom time period for the monitor to consider an issue as new after its first occurrence. The selected threshold is evaluated in the given time frame. After the specific time period, the monitor stops alerting and turns green.
2. Select **Web and Mobile Apps** or **Backend Services** and choose to monitor over a count or [measure][1]. 
   - Monitor over a unique count based on the issue ID. 
   - Monitor over a measure. If you select a measure, the monitor alerts over the numerical value of the RUM facet (similar to a metric monitor). Select an aggregation type (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
3. Construct a search query using the same logic as a [RUM Explorer search][2] or [APM Explorer search][3] for the issues’ error occurrences.
4. Configure the alerting grouping strategy (optional).
   - Simple-Alert: Simple alerts aggregate over all reporting sources. You receive one alert when the aggregated value meets the set conditions. If the query has a `group by` and you select **Simple-Alert**, you get one alert when one or multiple groups’ values breach the threshold. You may use this strategy to reduce notification noise.
   - Multi-Alert: Multiple alerts apply the alert to each source according to your group parameters. An alerting event is generated for each group that meets the set conditions. For example, you can group a query by `@browser.name` to receive a separate alert for each browser when the number of errors is high.


[1]: /real_user_monitoring/explorer/?tab=measures#setup-facets-measures
[2]: /real_user_monitoring/explorer/search/
[3]: /tracing/trace_explorer/?tab=listview#filtering
{{% /tab %}} 
{{< /tabs >}}

### Set alert conditions

For **Web and Mobile Apps**, select between **Count** and **New Issue**.

#### Count

{{< tabs >}}
{{% tab "Error Occurrences" %}}

Triggers when the error count is `above` or `above or equal to`.

{{% /tab %}}
{{% tab "Impacted Users" %}}

Triggers when the number of impacted user emails is `above` or `above or equal to`.

{{% /tab %}}
{{% tab "Impacted Sessions" %}}

Triggers when the number of impacted session IDs is `above` or `above or equal to`.

{{% /tab %}} 
{{< /tabs >}}

#### New Issue

Triggers when the number of impacted session IDs is `above` or `above or equal to`. An alert is triggered whenever a metric crosses a threshold.

For **Backend Services**, select **New Issue**.

#### New Issue

Triggers when the error count is `above` or `above or equal to`. An alert is triggered whenever a metric crosses a threshold.

- The threshold during the last `5 minutes`, `15 minutes`. `1 hour`, or `custom` to set a value between 5 minutes and 48 hours. 
- Alerting threshold `<NUMBER>`.
- Warning threshold `<NUMBER>`.

#### Advanced Alert Conditions

For more information about advanced alert options such as evaluation frequency, see [Configure Monitors][5].

### Notifications

To display triggering tags in the notification title, click **Include triggering tags in notification title**.

For more information about the **Notify your team** and **Say what’s happening** sections, see [Notifications][6].

#### Breaching Values Toplist

When an Error Tracking monitor is triggered, values can be added to the notification message. 

| Monitor Over     | Can be added to notification message                                                               |
|------------------|----------------------------------------------------------------------------------------------------|
| Facet or measure | Grouped: The top 10 facet or measure values.<br>Ungrouped: The top 10 facet or measure values. |

This monitor integrates with [platforms][7] such as Slack, Jira, Webhooks, Microsoft Teams, Pagerduty, and email. To display breaching facets and measure values, click **Include a table of the top 10 breaching values**.

#### Examples

For examples, see the [Logs Monitor documentation][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /tracing/
[3]: /real_user_monitoring/error_tracking/
[4]: https://app.datadoghq.com/monitors/create/error-tracking
[5]: /monitors/create/configuration/#advanced-alert-conditions
[6]: /monitors/notify/
[7]: /monitors/notify/#integrations
[8]: /monitors/create/types/log/#examples
