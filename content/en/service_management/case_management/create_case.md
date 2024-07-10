---
title: Create a Case
further_reading:
- link: "service_management/case_management/view_and_manage"
  tag: "Documentation"
  text: "View and Manage Cases"
---

## Overview

Cases can be created [manually](#manual-case-creation), [automatically](#automatic-case-creation) from across Datadog, or [programmatically](#api) with the API. There are two types of cases: standard and security. Cases created from security signals and Sensitive Data Scanner are automatically made security cases. The security case type has all the features of the standard case type, along with a mandatory field for specifying the reason for closing a case (testing, false positive, or one time exception). 

## Manual case creation

{{< img src="/service_management/case_management/create/manual_case_creation_cropped.png" alt="Case Management page with the New Case modal opened to create a case manually" style="width:100%;" >}}

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
| Slack  | Click the **Create Case** button under a monitor notification in Slack.  |

## Automatic case creation

Configure the following products to automatically create cases:
| Product | Instructions    | 
| ------  | ----------- | 
| Monitors | Navigate to the [Project Settings page][4], click **Integrations** > **Datadog Monitors**, and click on the toggle to get your @case-<project_handle>. <br><br> When creating a monitor, include `@case-{project_handle}` in the **Configure notifications and automations** section. Cases are automatically created when the monitor transitions to a different status. To only create cases for certain monitor transitions, use [conditional variables][3]. As an example, to create cases only when a monitor triggers, wrap the `@case` mention with `{{#is_alert}}` and `{{/is_alert}}`. |
| Event Management (Correlations) | In Event Management, correlations configured to aggregate events from Datadog and third-party sources automatically create cases.   |
| Workflow Automation | 1. In a new or existing workflow, add a step in the Workflow builder and search for "Case Management."<br> 2. Select the **Create Case** action.<br> 3. If the workflow is configured to run based on a monitor or security signal trigger, add the workflow handle to the desired resources.|

## API

Create a case through the [API endpoint][5]. 

**Note**: This endpoint requires the `cases_write` authorization scope.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases
[2]: /monitors/manage/status/
[3]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: https://app.datadoghq.com/cases/settings
[5]: /api/latest/case-management/#create-a-case