---
title: Issue States in Error Tracking
further_reading:
  - link: '/error_tracking/regression_detection/'
    tag: 'Documentation'
    text: 'Regression Detection'
---

## Overview

All issues in Error Tracking have a status to help you triage and prioritize issues or dismiss noise. There are five statuses:

- {{< ui >}}FOR REVIEW{{< /ui >}}: New or regressed issues that need attention.
- {{< ui >}}REVIEWED{{< /ui >}}: Triaged issues that need to be fixed, now or later.
- {{< ui >}}RESOLVED{{< /ui >}}: Issues that have been fixed and are no longer occurring.
- {{< ui >}}IGNORED{{< /ui >}}: Issues that require no further investigation or action. You can also [snooze](#snoozing-an-issue) an issue to ignore it until a condition is met.
- {{< ui >}}EXCLUDED{{< /ui >}}: Issues that require no further investigation, stops collecting new errors, and no longer count towards usage or billing

All issues start with a FOR REVIEW status. Error Tracking automatically updates the status in the cases described below, or you can [manually update the status](#updating-the-issue-status). You can also [view the history](#issue-history) of a given error's state changes.

The diagram below shows how the Error Tracking states are updated automatically and manually:
{{< img src="error_tracking/issue-states-diagram.png" alt="Error Tracking Issue States" style="width:75%;" >}}

## Automatic review

Error Tracking automatically marks issues as {{< ui >}}REVIEWED{{< /ui >}} if one of the following actions has been taken:

- The issue has been assigned
- A work item has been created from the issue

{{< img src="error_tracking/auto-review-actions-2.png" alt="Error Tracking automatic review actions" style="width:75%;" >}}

## Automatic resolution

Error Tracking automatically marks issues as {{< ui >}}RESOLVED{{< /ui >}} that appear to be inactive or resolved due to a lack of recent error occurrences:

- If the issue was last reported in a version that is more than 14 days old, and a newer version has been released but does not report the same error, Error Tracking automatically resolves the issue. Configure your services with version tags (see instructions for [APM][1], [RUM][2], and [Logs][3]) to ensure that automatic resolution accounts for versions of your services.
- If `version` tags are not set up, Error Tracking automatically resolves an issue if there have been no new errors reported for that issue within the last 14 days.

**Note**: The auto-resolution logic does not take `version` into account.

## Automatic re-opening through regression detection

See [Regression Detection][4].

## Updating the issue status

The issue status appears anywhere the issue can be viewed, such as in the issues list or on the details panel for a given issue. To manually update the status of an issue, click the status and choose a different one in the dropdown menu.

{{< img src="error_tracking/updating-issue-status.png" alt="The Activity Timeline in the Error Tracking Issue" style="width:100%;" >}}

## Excluding an issue

The `EXCLUDED` status lets you prevent specific errors from being tracked, ensuring they are not collected or counted toward billing. This helps you remove non-actionable errors or issues caused by expected failures without needing complex exclusion rules.

To exclude an issue, click its status and choose {{< ui >}}EXCLUDED{{< /ui >}} in the dropdown menu. Excluded issues are still accessible in the {{< ui >}}IGNORED{{< /ui >}} tab. You can review their history at any time.

{{< img src="error_tracking/issue-states-excluded.png" alt="Excluded in issue status dropdown" style="width:100%;" >}}

To resume collecting errors for an excluded issue, select any status other than {{< ui >}}EXCLUDED{{< /ui >}}.

## Snoozing an issue

Snoozing an issue moves it to {{< ui >}}IGNORED{{< /ui >}} until a condition you define is met. When the condition is met, Error Tracking moves the issue back to {{< ui >}}FOR REVIEW{{< /ui >}}. Use snoozing when you need more evidence before deciding whether an issue matters: the issue stays out of your inbox, but it comes back if its impact grows.

For example, you can ignore an issue until it affects 10 distinct users.

### Snooze conditions

You can snooze an issue until one of the following conditions is met:

- **Occurrences**: The issue reaches a number of new error occurrences.
- **Affected users**: The issue affects a number of distinct users. This condition requires errors to have the `@usr.id` attribute.
- **Elapsed time**: A duration passes after you snooze the issue.

Occurrences and affected users are counted from the moment you snooze the issue. Errors that occurred before the snooze do not count toward the condition.

To combine multiple conditions, or to count distinct values of any error attribute (e.g. `@account.id`), use the [`update_datadog_error_tracking_issue`][5] tool of the Datadog MCP Server. For example, you can ignore an issue until it affects 10 distinct users or a week passes, whichever comes first. This helps you clear your backlog while still catching the issues that become important.

### Snooze an issue

1. Click the status of an issue in the issues list or on the issue details panel.
2. In the dropdown menu, hover over {{< ui >}}IGNORED{{< /ui >}}.
3. Select one of the following options, then choose a value:
   - {{< ui >}}For...{{< /ui >}} to snooze the issue for a duration.
   - {{< ui >}}Until this occurs again...{{< /ui >}} to snooze the issue until it reaches a number of new occurrences.
   - {{< ui >}}Until this affects an additional...{{< /ui >}} to snooze the issue until it affects a number of additional users.

{{< img src="error_tracking/issue-snooze-selection.png" alt="Snooze options" style="width:70%;" >}}

Snoozed issues appear in the {{< ui >}}IGNORED{{< /ui >}} tab.

### Cancel a snooze

To cancel a snooze, manually change the status of the issue. Selecting any status, including {{< ui >}}IGNORED{{< /ui >}}, cancels the active snooze and its conditions no longer apply.

## Issue history
View a history of your issue activity with the {{< ui >}}Activity Timeline{{< /ui >}}. On the details panel of any Error Tracking issue, view the Activity Timeline by clicking the {{< ui >}}Activity{{< /ui >}} tab.

{{< img src="error_tracking/issue-status-history-3.png" alt="The Activity Timeline in the Error Tracking Issue" style="width:80%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/services/deployment_tracking
[2]: /real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
[3]: /getting_started/tagging/unified_service_tagging/
[4]: /error_tracking/regression_detection/
[5]: /mcp_server/tools/#update_datadog_error_tracking_issue
