---
title: Error Tracking Monitor
description: Learn about the Error Tracking monitor type.
aliases :
  - /monitors/create/types/error_tracking/
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: Learn about Error Tracking for Web and Mobile Applications
- link: /tracing/error_tracking/
  tag: Documentation
  text: Learn about Error Tracking for Backend Services
- link: /logs/error_tracking/
  tag: Documentation
  text: Learn about Error Tracking for Logs
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Check your monitor status
---

## Overview

Datadog Error Tracking automatically groups all your errors into issues across your web, mobile, and backend applications. Viewing errors grouped into issues helps you prioritize and find the problems that are most impactful, making it easier to minimize service downtimes and reduce user frustration.

With [Real User Monitoring][1], [APM][2], or [Logs][6] enabled for your organization, you can create an Error Tracking monitor to alert you when an issue in your web or mobile application, backend service, or logs starts, when it has a high impact, and when it starts regressing.

## Create an Error Tracking monitor

To create an Error Tracking monitor in Datadog, navigate to [**Monitors** > **New Monitor** > **Error Tracking**][3].

<div class="alert alert-info"><strong>Note</strong>: There is a default limit of 1000 Error Tracking monitors per account. <a href="/help/">Contact Support</a> to increase this limit for your account.</div>

### Select the alerting condition

There are two types of alerting conditions you can configure your Error Tracking monitor with:

| Alerting&nbsp;condition     | Description    | 
| ---  | ----------- |
|Count| Alert on issues with a high number of errors. For example, alert for your service whenever more than 500 occurrences of your error happen. |
|New Issue| Triggers when an issue occurs for the first time. You have the option to be notified if a regression occurs, and set a threshold to reduce alerting fatigue.|

### Define the search query

{{< tabs >}}
{{% tab "Count" %}}

1. Select **RUM Events**, **Traces**, or **Logs** from the dropdown menu and choose what metric you want to monitor: a count, facet, or measure.
   - For error occurrences, monitor over an overall count based on the issue ID.
   - For impacted users, monitor over a unique count of user emails based on the issue ID or over a measure.
   - For impacted sessions, monitor over a unique count of session IDs based on the issue ID.
   - Monitor over a measure. If you select a measure, the monitor alerts over the numerical value of the RUM facet (similar to a metric monitor). Select an aggregation type (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).

   There are three quickfilter options to access the most frequently used facets:

   - **Error Occurrences**: Triggers when the error count is `above` or `above or equal to`.
   - **Impacted Users**: Triggers when the number of impacted user emails is `above` or `above or equal to`.
   - **Impacted Sessions**: Triggers when the number of impacted session IDs is `above` or `above or equal to`.

   If you select **Traces** or **Logs** from the dropdown menu, only the **Error Occurrences** option is available.

2. Construct a search query using the same logic as a [RUM Explorer search][1], [APM Explorer search][3], or [Log Explorer search][4] for the issues' error occurrences.
3. Optionally, configure the alerting grouping strategy. For more information, see [Monitor Configuration][2].

<div class="alert alert-info"><strong>Note</strong>: Count monitors for APM can only be created based on spans retained by <a href="/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter/">custom retention filters</a> (not the intelligent retention filter).</div>

### Set alert conditions

Triggers when the error count is `above` or `above or equal to`. An alert is triggered whenever a metric crosses a threshold.

[1]: /real_user_monitoring/explorer/search/
[2]: /monitors/configuration/#alert-grouping/
[3]: /tracing/trace_explorer/?tab=listview#filtering
[4]: /logs/explorer/search/
{{% /tab %}}

{{% tab "New Issue" %}}

1. Select or input a custom time period for the monitor to consider an issue as new after its first occurrence. The selected threshold is evaluated in the given time frame. After the specific time period, the monitor stops alerting and turns green.

   The list of issues on top has a separate time frame selector. It can be used to find which issues would be considered new in this time frame.
2. Select **RUM Events**, **Traces**, or **Logs** and choose to monitor over a count or [measure][1].
   - Monitor the count of occurrences for a specific issue ID.
   - Monitor over a measure. If you select a measure, the monitor alerts over the numerical value of the RUM or APM facet (similar to a metric monitor). Select an aggregation type (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
3. Construct a search query using the same logic as a [RUM Explorer search][2], [APM Explorer search][3], or [Log Explorer search][5] for the issues' error occurrences.
4. Optionally, configure the alerting grouping strategy. For more information, see [Monitor Configuration][4].

### Set alert conditions

The monitor triggers when the number of errors is `above` or `above or equal to`.

- Set a timespan between 5 minutes and 48 hours (such as `5 minutes`, `15 minutes`. `1 hour`, or `custom`) over which the monitor metric is evaluated.
- Set the alerting threshold > `<NUMBER>`.
- Set the warning threshold > `<NUMBER>`.

[1]: /real_user_monitoring/explorer/?tab=measures#setup-facets-measures
[2]: /real_user_monitoring/explorer/search/
[3]: /tracing/trace_explorer/?tab=listview#filtering
[4]: /monitors/configuration/#alert-grouping/
[5]: /logs/explorer/search/
{{% /tab %}}
{{< /tabs >}}

#### Advanced Alert Conditions

For more information about advanced alert options such as evaluation frequency, see [Configure Monitors][4].

### Notifications

To display triggering tags in the notification title, click **Include triggering tags in notification title**.

For more information about the **Configure notifications and automations** section, see [Notifications][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /tracing/
[3]: https://app.datadoghq.com/monitors/create/error-tracking
[4]: /monitors/configuration/#advanced-alert-conditions
[5]: /monitors/notify/
[6]: /logs/
