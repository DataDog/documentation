---
title: Create a Case
kind: Documentation
further_reading:
- link: "service_management/case_management/view_and_manage"
  tag: "Documentation"
  text: "View and Manage Cases"
---

## Overview

Cases can be created [manually](#manual-case-creation) or [automatically](#automatic-case-creation) from across Datadog. There are two types of cases: standard and security. Cases created from security signals and Sensitive Data Scanner are automatically made security cases. The security case type has all the features of the standard case type, along with a mandatory field for specifying the reason for closing a case (testing, false positive, or one time exception). 

## Manual case creation

On the [Case Management page][1], click **New Case**.
1. Select a project to create the case in. A case can only belong to a single project. 
1. Fill in a title for the case.
1. Optionally, add a description. 
1. Click **Create Case** to complete. 

You can also create cases manually from the following products:

| Product | Instructions    | 
| ------  | ----------- | 
| Monitors | - On a [monitor status page][2], optionally scope the monitor to a time frame and specific monitor group(s). Then, click the **Escalate** dropdown menu and select **Create a case**.<br> - In Slack, click **Create case** under a monitor notification. |
| Security signals | Click into a Security Signal to open up the side panel. Click the **Escalate Investigation** dropdown menu and select **Create a case**. |
| Error Tracking | Click into an Error Tracking issue to open the side panel. Then, click **Create a case**. |
| Watchdog | Click into an alert to open its side panel. Click the **Escalate** dropdown menu and select **Create a case**. |
| Event Management (raw events) | Click into an event to open its side panel. Click the **Escalate** dropdown menu and select **Create a case**. |
| Cloud Cost Management | Click into a cost recommendation to open its side panel. Then, click **Create case**. |
| Sensitive Data Scanner | Click **Create case** next to a Sensitive Data Scanner issue.  |

## Automatic case creation

Configure the following products to automatically create cases:
| Product | Instructions    | 
| ------  | ----------- | 
| Monitors | When creating a monitor, include `@case-{project_handle}` in the **Notify your team** or  **Say what's happening** section. Cases are automatically created when the monitor transitions to a different status. To only create cases for certain monitor transitions, use [conditional variables][3]. As an example, to create cases only when a monitor triggers, wrap the `@case` mention with `{{#is_alert}}` and `{{/is_alert}}`.   |
| Event Management (Correlations) | In Event Management, correlations configured to aggregate events from Datadog and third-party sources automatically create cases.   |
| Workflow Automation | 1. In a new or existing workflow, add a step in the Workflow builder and search for "Case Management."<br> 2. Select the **Create Case** action.<br> 3. If the workflow is configured to run based on a monitor or security signal trigger, add the workflow handle to the desired resources.|

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases
[2]: /monitors/manage/status/
[3]: /monitors/notify/variables/?tab=is_alert#conditional-variables
