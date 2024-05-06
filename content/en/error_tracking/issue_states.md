---
title: Issue States and Workflows
kind: documentation
disable_toc: false
---

## Issue States
All Issues in Error Tracking have a status to help you triage and prioritize issues or dismiss noise. There are three statuses:
- Open
- Ignored
- Resolved

### OPEN
<!-- ### UNRESOLVED -->
All issues start as Open. An Open issue is one that's ongoing (the same error is continuing to occur) and needs attention because it’s either new, its a regression (the behavior has changed ), or it needs to be fixed. 

<!-- ### UNRESOLVED
**UNRESOLVED** issues can be labelled NEW, a REGRESSION, or REVIEWED. View your issues that need to be reviewed and triaged in the Error Tracking explorer and Mark as Reviewed The issue is a problem that needs to be fixed. Reviewed issues can be assigned a PRIORITY (not implemented), which will reflect whether the issue should be fixed ASAP (high prio) or LATER (low prio) -->

### IGNORED
Ignored issues require no additional investigation or action.

### RESOLVED 
Resolved issues are believed to be fixed. 

In the Resolved state, if the error occurs again in a newer version of the code (or again when no versions are set up), it will trigger a [regression](#regressions) and move to the **Open** state.

#### Auto-Resolves
Error Tracking will automatically mark issues as **RESOLVED** that appear to be inactive or resolved due to a lack of recent error occurrences. Specifically, 
- If the issue was last reported in a version that is more than 14 days old, and a newer version has been released but does not report the same error, we auto-resolve the issue. Configure your services with version tags ([APM][1], [RUM][2], [Logs][3]), to ensure auto-resolves aaccount for versions of your services. 
- If `version` tags are not set up, issue will be auto-resolved if there have been no new errors reported for that issue within the last 14 days


<!-- ### State Workflows
The diagram below shows how the statuses are updated automatically and manually: -->


## Regressions

Once you Resolve your issues in Error Tracking, regressions will be automatically detected when the same error comes back. These issues will be tagged with a **Regression** tag. 

Regressions take into account the versions of your service where the error is known to occur and only triggers on new versions after an issue is marked as **RESOLVED**. Configure your services with version tags ([APM][1], [RUM][2], [Logs][3]), to ensure auto-resolves are only triggered if the same errors occur on newer versions of your services. 

If you don't have version tags set up, issues will be tagged with a **Regression** when an error occurs on an issue marked as **RESOLVED**.

You can also set up monitors to be [alerted when regressions occur][3].

{{< img src="error_tracking/error-tracking-regression-detection.png" alt="The details of regression in Error Tracking" style="width:100%;" >}}

## Issue History
View a history of your issue activity with the **Activity Timeline**. In any Error Tracking issue, view the Activity Timeline by clicking the **Activity** tab. In the timeline you can:
- View state changes (including regressions and auto-resolves)
<!-- 
- View assignee changes
- Add and view comments
 -->

{{< img src="error_tracking/error-tracking-activity-timeline.png" alt="The Activity Timeline in the Error Tracking Issue" style="width:100%;" >}}



[1]: /tracing/services/deployment_tracking
[2]: /real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
[2]: /getting_started/tagging/unified_service_tagging/
[3]: /monitors/types/error_tracking/
