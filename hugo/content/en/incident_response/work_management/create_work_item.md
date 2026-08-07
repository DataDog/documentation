---
title: Create a Work Item
aliases:
- /service_management/case_management/create_case/
- /incident_response/case_management/create_case/
further_reading:
- link: "/incident_response/work_management/view_and_manage"
  tag: "Documentation"
  text: "View and Manage Work Items"
- link: "/incident_response/work_management/customization"
  tag: "Documentation"
  text: "Work Management Customization"

---

## Overview

Work items can be created [manually](#manual-work-item-creation), [automatically](#automatic-work-item-creation) from across Datadog, or [programmatically](#api) with the API. There are two types of work items: standard and security. Work items created from security signals and Sensitive Data Scanner are automatically made security cases. The security work item type has all the features of the standard work item type, along with a mandatory field for specifying the reason for closing a work item (testing, false positive, or one time exception).

## Manual work item creation

1. Navigate to the [Work Management page][1].
1. Select a project to create the work item in. **Note**: A work item can only belong to a single project.
1. Click **New Work Item**.
1. Fill in a title for the work item.
1. Select a [work item type](#work-item-types).
1. (Optional) Add a description.
1. Click **Create Work Item** to complete.

You can also create work items manually from the following products:

| Product | Instructions    |
| ------  | ----------- |
| Monitors | - On a [monitor status page][2], optionally scope the monitor to a time frame and specific monitor group(s). Then, under **More Actions**, click **Create a work item**.<br> - In Slack, click **Create work item** under a monitor notification. |
| Security signals | Beside a signal, in the **Cases** column, click the **Create Case** icon. Then, enter the work item details in the **Create Case** window that opens. |
| Error Tracking | Click into an Error Tracking issue to open the side panel. Then, click **Actions** and select **Add a work item**. |
| Watchdog | Click into an alert to open its side panel. Click the **Actions** dropdown menu and select **Create a work item**. |
| Event Management (raw events) | Click into an event to open its side panel. Click the **Actions** dropdown menu and select **Create a work item**. |
| Cloud Cost Management | Click into a cost recommendation to open its side panel. Then, click **Create a work item**. |
| Sensitive Data Scanner | Click **Create case** next to a Sensitive Data Scanner issue.  |
| Slack  | Click the **Create Work Item** button under a monitor notification in Slack.  |

## Automatic work item creation

Configure the following products to automatically create work items:
| Product | Instructions    |
| ------  | ----------- |
| Monitors | Navigate to the [Project Settings page][4], click **Integrations** > **Datadog Monitors**, and click on the toggle to get your @case-<project_handle>. <br><br> When creating a monitor, include `@case-{project_handle}` in the **Configure notifications and automations** section. Work items are automatically created when the monitor transitions to a different status. To only create work items for certain monitor transitions, use [conditional variables][3]. As an example, to create work items only when a monitor triggers, wrap the `@case` mention with `{{#is_alert}}` and `{{/is_alert}}`.<br><br> Toggle on **Auto-close work items when the monitor group resolves** to reduce manual cleanup.|
| Event Management (Correlations) | In Event Management, correlations configured to aggregate events from Datadog and third-party sources automatically create work items.   |
| Workflow Automation | 1. In a new or existing workflow, add a step in the Workflow builder and search for "Case Management."<br> 2. Select the **Create Case** action.<br> 3. If the workflow is configured to run based on a monitor or security signal trigger, add the relevant workflow triggers and ensure that you've added the workflow handle to the desired resources. For more information, see [Trigger a workflow][6].|
| Error Tracking | In Error Tracking, work items are automatically created when an issue is commented on or assigned. |

## Work item types

Add work item types when you are creating a work item. Not all work item types are available for configuration between manual and automatic creation. For example, only `Standard`, `Security` and `Change Request`, `Event Management` types are available when creating work items manually.

To add and enable custom work item types, see [Work Management Customization][7].

| Work Item Type  | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| Standard         | A general-purpose work item for operational tasks, investigations, and more.     |
| Change Request   | Used in change management workflows to track planned or approved changes.   |
| Event Management | Integrated with the Event Management product to house correlated events.    |
| Security         | Used by security teams and products to manage investigations or alerts.     |
| Error Tracking   | Linked to the Error Tracking product to track and remediate application issues. |
| Custom Type      | Add a custom work item type. For more information, see [Work Management Customization][7]. |

## API

Create a work item through the [API endpoint][5].

**Note**: This endpoint requires the `cases_write` authorization scope.

<div class="alert alert-info">The Work Management API endpoints use <code>case-management</code> terminology, which reflects the product's previous name.</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work
[2]: /monitors/status/
[3]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: https://app.datadoghq.com/work/settings
[5]: /api/latest/case-management/#create-a-case
[6]: /actions/workflows/trigger/
[7]: /incident_response/work_management/customization
