---
title: Error Tracking Monitor
description: Learn about the Error Tracking monitor type.
aliases :
  - /monitors/create/types/error_tracking/
further_reading:
- link: "/error_tracking/issue_states/"
  tag: "Documentation"
  text: "Learn about Error Tracking states and how they impact monitors"
- link: "/error_tracking/"
  tag: "Documentation"
  text: "Learn about Error Tracking for Web, Mobile, and Backend"
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

Datadog [Error Tracking][1] automatically groups all your errors into issues across your web, mobile, and backend applications. Viewing errors grouped into issues helps you prioritize and find the problems that are most impactful, making it easier to minimize service downtimes and reduce user frustration.

With Error Tracking enabled for your organization, you can create an Error Tracking monitor to alert you when an issue in your web or mobile application, backend service, or logs is new, when it has a high impact, and when it starts regressing.

## Create an Error Tracking monitor

To create an Error Tracking monitor in Datadog, navigate to [**Monitors** > **New Monitor** > **Error Tracking**][3].

<div class="alert alert-info"><strong>Note</strong>: There is a default limit of 1000 Error Tracking monitors per account. <a href="/help/">Contact Support</a> to increase this limit for your account.</div>

### Select the alerting condition

There are two types of alerting conditions you can configure your Error Tracking monitor with:

| Alerting&nbsp;condition     | Description    | 
| ---  | ----------- |
|High Impact| Alert on issues with a high number of impacted end users. For example, alert for your service whenever more than 500 users are impacted by this error. |
|New Issue| Alert when an issue occurs for the first time or a regression occurs. For example, alert for your service whenever more than 2 users are impacted by a new error. |

### Define the search query

{{< tabs >}}
{{% tab "High Impact" %}}
High Impact monitors alert on issues that are **For Review** or **Reviewed** and that meet your alerting conditions. Read more about [Issue States][1].

1. Build a search query using the same logic as the [Error Tracking Explorer search][2] for the issues' error occurrences.
2. Choose the metric you want to monitor. There are three suggested options to access the most frequently used facets:

    - **Error Occurrences**: Triggers when the error count for an issue is `above` or `above or equal to`.
    - **Unique Impacted Users**: Triggers when the number of impacted user emails for an issue is `above` or `above or equal to`.
    - **Unique Impacted Sessions**: Triggers when the number of impacted session IDs for an issue is `above` or `above or equal to`.

    If you select **All** or **Backend** from the dropdown menu, only the **Error Occurrences** suggested option is available.

    You can also specify a custom measure you want to use to monitor. If you select a custom measure, the monitor alerts when the count of unique values of the facet is `above` or `above or equal to`.

3. Optionally, configure the alerting grouping strategy. For more information, see [Monitor Configuration][2].

<div class="alert alert-info"><strong>Note</strong>: Count monitors for APM can only be created based on spans retained by <a href="/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter/">custom retention filters</a> (not the intelligent retention filter).</div>

### Set alert conditions

Triggers when the error count is `above` or `above or equal to`. An alert is triggered whenever a metric crosses a threshold.

[1]: /error_tracking/issue_states
[2]: /error_tracking/explorer
{{% /tab %}}

{{% tab "New Issue" %}}

New monitors alert on issues that are **For Review** and that meet your alerting conditions. Read more about [Issue States here][1]. As regressions are transitioned to **For Review** automatically, they are automatically monitored with New Issue monitors. 


1. Build a search query using the same logic as the [Error Tracking Explorer search][2] for the issues' error occurrences.
2. Optionally, choose the metric and alert conditions. 

    By default, new issue monitors will alert on the first error occurrence for a new issue in the past day. However, you can "Define an alert metric" to adjust the alerting thresholds to reduce noise. 

    **Choose metric**: There are three suggested options to access the most frequently used facets.

    - **Error Occurrences**: Triggers when the error count for an issue is `above` or `above or equal to`.
    - **Unique Impacted Users**: Triggers when the number of impacted user emails for an issue is `above` or `above or equal to`.
    - **Unique Impacted Sessions**: Triggers when the number of impacted session IDs for an issue is `above` or `above or equal to`.

    If you select **All** or **Backend** from the dropdown menu, only the **Error Occurrences** suggested option is available.

    **Set alert conditions**: The monitor triggers when the number of errors is `above` or `above or equal to`.

    - Set a timespan between 5 minutes and 48 hours (such as `5 minutes`, `15 minutes`. `1 hour`, or `custom`) over which the monitor metric is evaluated.
    - Set the alerting threshold > `<NUMBER>`.

3. Optionally, configure the alerting grouping strategy. For more information, see [Monitor Configuration][3].


[1]: /error_tracking/issue_states
[2]: /error_tracking/explorer
[3]: /monitors/configuration/#alert-grouping/
{{% /tab %}}
{{< /tabs >}}

#### Advanced Alert Conditions

For more information about advanced alert options such as evaluation frequency, see [Configure Monitors][4].

### Notifications

To display triggering tags in the notification title, click **Include triggering tags in notification title**.

In addition to [matching attribute variables][7], the following Error Tracking specific variables are available
for alert message notifications:

* `{{issue.attributes.error.type}}`
* `{{issue.attributes.error.message}}`
* `{{issue.attributes.error.stack}}`
* `{{issue.attributes.error.file}}`
* `{{issue.attributes.error.is_crash}}`
* `{{issue.attributes.error.category}}`
* `{{issue.attributes.error.handling}}`

For more information about the **Configure notifications and automations** section, see [Notifications][5].


### Muting monitors
Error Tracking monitors use [Issue States][2] to ensure that your alerts stay focused on high-priority matters, reducing distractions from non-critical issues. 

**Ignored** issues are errors requiring no additional investigation or action. By marking issues as **Ignored**, these issues are automatically muted from monitor notifications.

## Troubleshooting

### New Issue monitors do not take into account issue age
`issue.age` and `issue.regression.age` are not added by default because they can cause missed alerts. For instance, if an issue first appears in `env:staging` and then a week later appears in `env:prod` for the first time, the issue would be considered a week old and wouldn't trigger an alert in `env:prod` for the first time.

As a result, Datadog does not recommend using `issue.age` and `issue.regression.age`. However, If state-based monitor behavior is not suitable for you, these filters can still be used if manually specified.

**Note**: If you plan to use `issue.age` and `issue.regression.age` in your monitor, this filter key is not consistent across products. For example, it could be `@issue.age` or `issue.age`.

### New Issue monitors are generating too much noise
New Issue monitors trigger alerts on issues marked **For Review** that meet your alerting criteria. If issues are not properly triaged (marked as **Reviewed**, **Ignored**, or **Resolved**), a New Issue monitor may trigger more than once for the same issue if the issue fluctuates between OK and ALERT states.

If your monitors are generating too much noise, consider the following adjustments:
- **Triage your alerts**: Set issues to **Reviewed**, **Ignored**, or **Resolved** when appropriate
- **Expand the evaluation time window**: The default evaluation window is 1 day. If errors occur infrequently (for example, every other day), the monitor may switch between OK and ALERT states. Expanding the window helps prevent re-triggering and keeps the monitor in the ALERT state.
- **Increase the alerting threshold**: The default threshold is set to `0`, meaning alerts fire on the first occurrence of a new issue. To reduce noise from one-off or sporadic errors, increase the threshold to alert only after multiple occurrences of an error

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /error_tracking/
[2]: /error_tracking/issue_states/
[3]: https://app.datadoghq.com/monitors/create/error-tracking
[4]: /monitors/configuration/#advanced-alert-conditions
[5]: /monitors/notify/
[6]: /logs/
[7]: /monitors/notify/variables/#matching-attributetag-variables
