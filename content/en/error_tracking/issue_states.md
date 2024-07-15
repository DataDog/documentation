---
title: Issue States in Error Tracking
further_reading:
  - link: '/error_tracking/regression_detection/'
    tag: 'Documentation'
    text: 'Regression Detection'
---

## Overview

All issues in Error Tracking have a status to help you triage and prioritize issues or dismiss noise. There are four statuses:

- **FOR REVIEW**: Ongoing and in need of attention because the issue is new or it's a regression.
- **REVIEWED**: Triaged and needs to be fixed, either now or later. 
- **IGNORED**: Requiring no additional investigation or action.
- **RESOLVED**: Fixed and no longer occurring.

All issues start with a FOR REVIEW status. Error Tracking automatically updates the status in the cases described below, or you can [manually update the status](#updating-an-error-status). You can also [view the history](#issue-history) of a given error's state changes.

The diagram below shows how the Error Tracking states are updated automatically and manually:
{{< img src="error_tracking/issue-states-diagram.png" alt="Error Tracking Issue States" style="width:75%;" >}}

## Automatic review

Error Tracking automatically marks issues as **REVIEWED** if one of the following actions has been taken:

- The issue has been assigned
- A case has been created from the issue

{{< img src="error_tracking/auto-review-actions.png" alt="Error Tracking automatic review actions" style="width:75%;" >}}

## Automatic resolution

Error Tracking automatically marks issues as **RESOLVED** that appear to be inactive or resolved due to a lack of recent error occurrences:

- If the issue was last reported in a version that is more than 14 days old, and a newer version has been released but does not report the same error, Error Tracking automatically resolves the issue. Configure your services with version tags (see instructions for [APM][1], [RUM][2], and [Logs][3]) to ensure that automatic resolution accounts for versions of your services. 
- If `version` tags are not set up, Error Tracking automatically resolves an issue if there have been no new errors reported for that issue within the last 14 days.

## Automatic re-opening through regression detection

See [Regression Detection][4].

## Updating the issue status

The issue status appears anywhere the issue can be viewed, such as in the issues list or on the details panel for a given issue. To manually update the status of an issue, click the status and choose a different one in the dropdown menu.

{{< img src="error_tracking/updating-issue-status.png" alt="The Activity Timeline in the Error Tracking Issue" style="width:100%;" >}}

## Issue history
View a history of your issue activity with the **Activity Timeline**. On the details panel of any Error Tracking issue, view the Activity Timeline by clicking the **Activity** tab. 

{{< img src="error_tracking/issue-status-history.png" alt="The Activity Timeline in the Error Tracking Issue" style="width:80%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/services/deployment_tracking
[2]: /real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
[3]: /getting_started/tagging/unified_service_tagging/
[4]: /error_tracking/regression_detection/
