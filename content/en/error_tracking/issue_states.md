---
title: Issue States and Workflows
kind: documentation
disable_toc: false
---

## Issue status
All issues in Error Tracking have a status to help you triage and prioritize issues or dismiss noise. There are three statuses:
- Open
- Ignored
- Resolved

Open
: All issues start in the open status. An open issue is ongoing and needs attention because it's new, it's a regression, or it needs to be fixed. 

Ignored
: Ignored issues require no additional investigation or action.

Resolved
: Resolved issues have been fixed. The error no longer occurs.

In the Resolved state, if the same error recurs in a newer version of the code, or the error occurs again in code without versions, Error Tracking triggers a [regression](#regressions). The issue moves to the **Open** state.

<!-- ### UNRESOLVED
**UNRESOLVED** issues can be labelled NEW, a REGRESSION, or REVIEWED. View your issues that need to be reviewed and triaged in the Error Tracking explorer and Mark as Reviewed The issue is a problem that needs to be fixed. Reviewed issues can be assigned a PRIORITY (not implemented), which will reflect whether the issue should be fixed ASAP (high prio) or LATER (low prio) -->

### Automatic resolution
Error Tracking automatically marks issues as **RESOLVED** that appear to be inactive or resolved due to a lack of recent error occurrences:
- If the issue was last reported in a version that is more than 14 days old, and a newer version has been released but does not report the same error, Error Tracking auto-resolves the issue. Configure your services with version tags (see instructions for [APM][1], [RUM][2], and [Logs][3]) to ensure that automatic resolution accounts for versions of your services. 
- If `version` tags are not set up, Error Tracking auto-resolves an issue if there have been no new errors reported for that issue within the last 14 days.

<!-- ### State Workflows
The diagram below shows how the statuses are updated automatically and manually: -->

## Regressions

After you resolve your issues in Error Tracking, regressions are automatically detected if the same error comes back. These issues are tagged with a **Regression** tag. 

Regressions take into account the versions of your service where the error is known to occur, and only trigger on new versions after an issue is marked as **RESOLVED**. Configure your services with version tags (see instructions for [APM][1], [RUM][2], and [Logs][3]) to ensure that issues automatically resolve only if the same errors occur on newer versions of your services. 

If you don't have version tags set up, issues are tagged with **Regression** when an error occurs on an issue marked as **RESOLVED**.

You can also set up [monitors][4] to alert you when regressions occur.

{{< img src="error_tracking/error-tracking-regression-detection.png" alt="The details of regression in Error Tracking" style="width:100%;" >}}

## Issue history
View a history of your issue activity with the **Activity Timeline**. In any Error Tracking issue, view the Activity Timeline by clicking the **Activity** tab. In the timeline you can:
- View state changes (including regressions and automatic resolution)
<!-- 
- View assignee changes
- Add and view comments
 -->

{{< img src="error_tracking/error-tracking-activity-timeline.png" alt="The Activity Timeline in the Error Tracking Issue" style="width:100%;" >}}



[1]: /tracing/services/deployment_tracking
[2]: /real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
[3]: /getting_started/tagging/unified_service_tagging/
[4]: /monitors/types/error_tracking/
