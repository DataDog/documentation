---
title: Notifications and Integrations
aliases:
- /service_management/case_management/create_notifications_and_third_party_tickets
- /service_management/case_management/notifications_integrations/
- /incident_response/case_management/notifications_integrations/
further_reading:
- link: "https://www.datadoghq.com/blog/servicenow-datadog-incident-response"
  tag: "Blog"
  text: "Integrate ServiceNow ITSM with Datadog to Accelerate Incident Response"
- link: "/incident_response/work_management/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting third-party integrations"
---

## Overview

Work Management provides the capability to create third-party integrations for generating notifications or tickets automatically or manually:
- Automatically: Each time a new work item is created, it generates a new ticket or notification.
- Manually: Users choose to create tickets or notifications for specific work items.

By linking Work Management with third-party systems, you can integrate Datadog solutions into your existing workflows and processes. With the Jira and ServiceNow integrations, you can resolve work items using full-stack telemetry in Datadog while keeping a record in these third-party systems.


## Notifications

To get notified when a new work item is created, create a view:
1. Navigate to the project you want to receive notifications for.
1. If you are not already a member of the project, click **Join This Project**.
1. Click **Add view**.
1. Give the view a name in the **Name** field.
1. In the search box, enter a filtered query to retrieve the work items you want to be notified for.
1. Select how you would like to be notified within the recipients field.
1. Click **Save**.

### Notification options

| Integration     | Configuration    |
| --------------- | ---------------- |
| Email           | Select one or more email addresses. |
| Slack           | Select a Slack workspace and channel. |
| Microsoft Teams | If you've connected Microsoft Teams tenants to Datadog, select a tenant, team, and channel. Otherwise, select a connector.|
| PagerDuty       | Select a service. |
| Webhooks        | Select the name of a webhook. |

## Notification rules

You can configure notification rules in your project settings to receive alerts for key work item updates. To create a notification rule:

1. Go to [**Project Settings**][1] and click on a project to expand its settings.
1. In the expanded menu, click **Notifications**.
1. Click **+ Create Rule** to add a notification rule.
1. In the query field, enter a filter to scope notifications to specific work items. For example:
   ```
   priority:P1 OR priority:P2
   ```
   To receive notifications for **all work items**, leave the query blank.
1. Select which conditions will send a notification. You can choose one or more of the following:
   - Work item creation
   - Status transitions
   - Priority changes
   - Assignee changes
   - New alert correlation (for event management work items)
1. Choose a notification destination. Supported destinations include:
   - Email
   - Slack
   - Microsoft Teams
   - PagerDuty
   - Webhook
1. Click **Save** to activate the rule.

## On-Call paging rules

From work items, you can manually or automatically page users with [Datadog On-Call][4].

To manually trigger a page:
1. Open the work item details.
2. Click the **Page** button.

To automatically trigger a page, configure automated paging rules in your project settings:
1. Go to [**Project Settings**][1] and click on a project to expand its settings.
1. In the expanded menu, click **Integrations** > **Datadog On-Call**.
1. Toggle on **Automatically page work items to On-Call**. This opens the Paging Rule modal, where you can define your first rule.
1. In the modal, enter a query. If a work item matches the specified query at any point in its lifecycle, Datadog automatically pages the designated team.
1. Choose which team to page:
   - **Specific Team**: Select a particular team to always be paged when the rule is triggered.
   - **Dynamic Team Selection**: Automatically page the team associated with the work item through the `Team` attribute.
1. Click **Add Rule**.
1. View your rule on the Datadog On-Call settings page. You can return to this page to manage this configuration or add multiple rules by clicking **New Paging Rule**.
1. (Optional) Toggle on the ability to automatically assign the work item to the on-call user when a page is triggered.

## Third party tickets
In Project Settings, you can manage membership, configure the auto-closing of work items, and set up third-party integrations like Jira and ServiceNow.

{{% collapse-content title="Jira Configuration" level="h4" expanded=false %}}
1. Ensure the Jira integration is configured.
1. In Work Management project settings, enable **Jira** for manual Jira issue creation from the project.
1. Select a Jira account, a project to create issues in, and the desired issue type (such as story, epic, bug, or task).
1. You can opt into the automatic creation of a Jira issue for each work item created in the project.
1. For the following attributes—work item title, description, assignee, comments, status, and priority—select one of the options below:
  | Option                              | Description                                                                                                                                   |
  |-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
  | Once to Jira at work item creation  | The field syncs from Work Management to Jira only at the time the work item is created. Subsequent changes are not reflected on either side.  |
  | Two-way sync (bi-directional)       | Changes in Work Management are reflected in Jira, and vice versa                                                                              |
  | Don't sync                          | The field does not sync to Jira.                                                                                                              |
1. For work item status and priority, select which values they map to on the Jira side.
1. Save changes.

**Notes**:
- A work item can only be synced with one external resource at a time, per project. To enable Jira syncing, ServiceNow automatic creation and syncing must be disabled.
- Only work items using the core statuses of "Open", "In Progress" and "Closed" can sync with Jira.
- Two-way syncing requires [webhook support][2].
- Issue creation is available for Jira Cloud and Data Center. Field syncing is only available for Jira Cloud.
{{% /collapse-content %}}

{{% collapse-content title="ServiceNow Configuration" level="h4" expanded=false id="servicenow" %}}
1. Configure the ServiceNow integration by following the [ITOM and ITSM setup instructions][3].
1. In Work Management project settings, enable ServiceNow for manual ServiceNow incident creation from the project.
1. Select a ServiceNow instance and assignment group.
1. You can opt into the automatic creation of a ServiceNow incident for each work item created in the project.
1. For the following attributes—status, comments—select one of the options below:
  | Option     | Description    |
  | ---  | ----------- |
  |Once to ServiceNow at work item creation|The field syncs from Work Management to ServiceNow only at the time the work item is created. Subsequent changes are not reflected on either side.|
  |All updates to ServiceNow |Changes in Work Management are reflected in ServiceNow, but changes in ServiceNow are not reflected in Work Management.|
  |Two-way sync (bi-directional)|Changes in Work Management are reflected in ServiceNow, and vice versa.|
  |Don't sync|The field does not sync to ServiceNow.|
1. Select ServiceNow state values that Work Management status values should map to.
1. Save changes.

**Note**: A work item can only be synced with one external resource at a time, per project. To enable ServiceNow syncing, Jira automatic creation and syncing must be disabled. Only work items using the core statuses of "Open", "In Progress" and "Closed" can sync with ServiceNow.
{{% /collapse-content %}}

{{% collapse-content title="Linear Configuration" level="h4" expanded=false id="linear" %}}
1. Ensure the [Linear integration][5] is configured.
1. In Work Management project settings, enable **Linear** for manual Linear issue creation from the project.
1. Select a Linear workspace and team to create issues in.
1. You can opt into the automatic creation of a Linear issue for each work item created in the project.
1. For the following attributes—work item title, description, assignee, comments, status, and priority—select one of the options below:
  | Option                                  | Description                                                                                                                                    |
  |-----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
  | Once to Linear at work item creation    | The field syncs from Work Management to Linear only at the time the work item is created. Subsequent changes are not reflected on either side.  |
  | Two-way sync (bi-directional)           | Changes in Work Management are reflected in Linear, and vice versa.                                                                            |
  | Don't sync                              | The field does not sync to Linear.                                                                                                             |
1. For work item status, select which states they map to on the Linear side.
1. Save changes.

**Notes**:
- Only work items using the core statuses of "Open", "In Progress", and "Closed" can sync with Linear.
- Two-way syncing requires [webhook support][6].
{{% /collapse-content %}}

## Incident auto-escalation

Manual incident declaration during high event volumes can cause delays and increase risk exposure during critical situations. Incident auto-escalation from Work Management allows you to automatically declare incidents when work items match your defined criteria, removing the need for manual intervention.

Navigate to the [Project Settings page][1], click **Integrations** > **Datadog Incidents**, and toggle on **Auto-escalate work items to Incidents**.

When enabled, any work item that meets your specified query criteria (at any point in its lifecycle) automatically triggers an incident, enabling faster response times for your team.

## Slack mirroring
With the Slack integration, replies in Slack notification threads linked to a work item are automatically mirrored to the work item activity timeline. This keeps the work item context up to date without requiring manual updates in Datadog. Slack thread mirroring to work items is supported for:
- [Slack notifications][8] generated from Work Management
- Slack notifications generated from Monitors using [case handles][7]
- Slack threads for work items created directly from Slack using the [Slack integration][9]

**To configure Slack thread mirroring**:

Make sure the [Slack integration][9] is configured for your Datadog organization.

Slack thread mirroring is enabled by default for all Work Management projects. To disable it for a specific project:
1. Navigate to [**Project Settings**][1] and click on a project to expand its settings.
1. In the expanded menu, click **Integrations** > **Slack**.
1. Toggle off **Slack thread mirroring**.

### How it works

- For any work item notifications sent to Slack, activity in the notification thread is mirrored back to the work item.
- Mirrored activity includes any text replies (attachments are not supported). Each mirrored message shows the Slack user's name and Slack as the source.
- Multiple Slack threads can mirror comments into a single work item.
- Mirroring is one-directional: messages flow from Slack to the work item, not from the work item to Slack.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work/settings
[2]: /integrations/jira/#configure-a-jira-webhook
[3]: /integrations/servicenow/#itom-and-itsm-setup
[4]: /incident_response/on-call/
[5]: /integrations/linear/
[6]: /integrations/linear/#configure-a-linear-webhook
[7]: /incident_response/work_management/create_work_item#automatic-work-item-creation
[8]: /incident_response/work_management/notifications_integrations#notifications
[9]: /integrations/slack/?tab=datadogforslack
