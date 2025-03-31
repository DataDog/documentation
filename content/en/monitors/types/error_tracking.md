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

### Define alert conditions

{{< tabs >}}

{{% tab "New Issue" %}}
#### Issues to alert on

New issue monitors alert on issues that are **For Review** and that meet your alerting conditions. Read more about [Issue States here][1]. As regressions are transitioned to **For Review** automatically, they are automatically monitored with New Issue monitors.

1. Select **All**, **Browser**, **Mobile**, or **Backend** issues and construct a search query using the same logic as the [Error Tracking Explorer search][2] for the issues' error occurrences.
2. Refine your query.

<div class="alert alert-info"><strong>Note</strong>: New Issue monitors only look at issues that were created or regressed within the last 24 hours before the monitor was created or last edited.</div>

#### Define alert threshold

Choose one of the following options:

* **Alert on all new issues**: The monitor triggers when any new issue is detected (number of errors per issue ID greater than 0 over the past day).
* **Define an alert metric**:
    1. Choose the metric you want to monitor. There are three suggested filter options to access the most frequently used facets:

       - **Error Occurrences**: Triggers when the error count is `above` or `above or equal to`.
       - **Impacted Users**: Triggers when the number of impacted user emails is `above` or `above or equal to`.
       - **Impacted Sessions**: Triggers when the number of impacted session IDs is `above` or `above or equal to`.

        If you select **All** or **Backend** issues, only the **Error Occurrences** option is available.

        You can also specify a custom measure you want to use to monitor. If you select a custom measure, the monitor alerts when the count of unique values of the facet is `above`.

    2. Have a notification for each issue that matches your query, and group the results by any other field you require (e.g. have a notification for each issue matching the query, on each environment).

    3. Query data over the last day (by default) or any other time window.

    4. Choose a threshold for the monitor to trigger (by default 0, i.e. at the first occurrence).

[1]: /error_tracking/issue_states
[2]: /error_tracking/explorer
[3]: /monitors/configuration/#alert-grouping/
{{% /tab %}}

{{% tab "High Impact" %}}
#### Issues to alert on

High Impact monitors alert on issues that are **For Review** or **Reviewed** and that meet your alerting conditions. Read more about [Issue States][1].

1. Select **All**, **Browser**, **Mobile**, or **Backend** issues and construct a search query using the same logic as the [Error Tracking Explorer search][2] for the issues' error occurrences.
2. Refine your query.

#### Define alert threshold
1. Choose the metric you want to monitor. There are three suggested filter options to access the most frequently used facets:

    - **Error Occurrences**: Triggers when the error count is `above` or `above or equal to`.
    - **Impacted Users**: Triggers when the number of impacted user emails is `above` or `above or equal to`.
    - **Impacted Sessions**: Triggers when the number of impacted session IDs is `above` or `above or equal to`.

    If you select **All** or **Backend** issues, only the **Error Occurrences** option is available.

    You can also specify a custom measure you want to use to monitor. If you select a custom measure, the monitor alerts when the count of unique values of the facet is `above`.

2. Have a notification for each issue that matches your query, and group the results by any other field you require (e.g. have a notification for each issue matching the query, on each environment).

3. Query data over the last day (by default) or any other time window.

4. Choose a threshold for the monitor to trigger (by default 0, i.e. at the first occurrence).

<div class="alert alert-info"><strong>Note</strong>: Count monitors for APM can only be created based on spans retained by <a href="/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter/">custom retention filters</a> (not the intelligent retention filter).</div>

[1]: /error_tracking/issue_states
[2]: /error_tracking/explorer
{{% /tab %}}
{{< /tabs >}}

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

[1]: /error_tracking/issue_states
[2]: /error_tracking/explorer
[3]: https://app.datadoghq.com/monitors/create/error-tracking
[4]: /monitors/configuration/#advanced-alert-conditions
[5]: /monitors/notify/
[6]: /logs/
[7]: /monitors/notify/variables/#matching-attributetag-variables
