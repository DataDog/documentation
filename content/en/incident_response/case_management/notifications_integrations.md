---
title: Notifications and Integrations
aliases:
- /service_management/case_management/create_notifications_and_third_party_tickets
- /service_management/case_management/notifications_integrations/
further_reading:
- link: "/incident_response/case_management/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting third-party integrations"
---

## Overview

Case Management provides the capability to create third-party integrations for generating notifications or tickets automatically or manually:
- Automatically: Each time a new case is created, it generates a new ticket or notification.
- Manually: Users choose to create tickets or notifications for specific cases.

By linking Case Management with third-party systems, you can integrate Datadog solutions into your existing workflows and processes. With the Jira and ServiceNow integrations, you can resolve cases using full-stack telemetry in Datadog while keeping a record in these third-party systems.


## Notifications

To get notified when a new case is created, create a view:
1. Navigate to the project you want to receive notifications for.
1. If you are not already a member of the project, click **Join This Project**.
1. Click **Add view**.
1. Give the view a name in the **Name** field.
1. In the search box, enter a filtered query to retrieve the cases you want to be notified for.
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

You can configure notification rules in your project settings to receive alerts for key case-related updates. To create a notification rule:

1. Go to [**Project Settings**][1] and click on a project to expand its settings.
1. In the expanded menu, click **Notifications**.
1. Click **+ Create Rule** to add a notification rule.
1. In the query field, enter a filter to scope notifications to specific cases. For example:
   ```
   priority:P1 OR priority:P2
   ```
   To receive notifications for **all cases**, leave the query blank.
1. Select which conditions will send a notification. You can choose one or more of the following:
   - Case creation
   - Status transitions
   - Priority changes
   - Assignee changes
   - New alert correlation (for event management cases)
1. Choose a notification destination. Supported destinations include:
   - Email
   - Slack
   - Microsoft Teams
   - PagerDuty
   - Webhook
1. Click **Save** to activate the rule.

## On-Call paging rules

From cases, you can manually or automatically page users with [Datadog On-Call][4].

To manually trigger a page:
1. Open the case details.
2. Click the **Page** button.

To automatically trigger a page, configure automated paging rules in your project settings:
1. Go to [**Project Settings**][1] and click on a project to expand its settings.
1. In the expanded menu, click **Integrations** > **Datadog On-Call**.
1. Toggle on **Automatically page cases to On-Call**. This opens the Paging Rule modal, where you can define your first rule.
1. In the modal, enter a query. If a case matches the specified query at any point in its lifecycle, Datadog automatically pages the designated team.
1. Choose which team to page:
   - **Specific Team**: Select a particular team to always be paged when the rule is triggered.
   - **Dynamic Team Selection**: Automatically page the team associated with the case through the `Team` attribute.
1. Click **Add Rule**.
1. View your rule on the Datadog On-Call settings page. You can return to this page to manage this configuration or add multiple rules by clicking **New Paging Rule**.
1. (Optional) Toggle on the ability to automatically assign the case to the on-call user when a page is triggered.

## Third party tickets
In Project Settings, you can manage membership, configure the auto-closing of cases, and set up third-party integrations like Jira and ServiceNow.

{{% collapse-content title="Jira Configuration" level="h4" expanded=false %}}
{{< img src="/service_management/case_management/settings/settings_jira.png" alt="Jira configuration options for case management settings" style="width:100%;" >}}

1. Ensure the Jira integration is configured.
1. In Case Management project settings, enable **Jira** for manual Jira issue creation from the project.
1. Select a Jira account, a project to create issues in, and the desired issue type (such as story, epic, bug, or task).
1. You can opt into the automatic creation of a Jira issue for each case created in the project.
1. For the following attributes—case title, description, assignee, comments, status, and priority—select one of the options below:
  | Option                        | Description                                                                                                                             |
  |-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
  | Once to Jira at case creation | The field syncs from Case Management to Jira only at the time the case is created. Subsequent changes are not reflected on either side. |
  | Two-way sync (bi-directional) | Changes in Case Management are reflected in Jira, and vice versa                                                                        |
  | Don't sync                    | The field does not sync to Jira.                                                                                                        |
1. For case status and priority, select which values they map to on the Jira side.
1. Save changes.

**Notes**:
- A case can only be synced with one external resource at a time, per project. To enable Jira syncing, ServiceNow automatic creation and syncing must be disabled.
- Only cases using the core statuses of "Open", "In Progress" and "Closed" can sync with Jira.
- Two-way syncing requires [webhook support][2].
- Issue creation is available for Jira Cloud and Data Center. Field syncing is only available for Jira Cloud.
{{% /collapse-content %}}

{{% collapse-content title="ServiceNow Configuration" level="h4" expanded=false id="servicenow" %}}
1. Configure the ServiceNow integration by following the [ITOM and ITSM setup instructions][3].
1. In Case Management project settings, enable ServiceNow for manual ServiceNow incident creation from the project.
1. Select a ServiceNow instance and assignment group.
1. You can opt into the automatic creation of a ServiceNow incident for each case created in the project.
1. For the following attributes—status, comments—select one of the options below:
  | Option     | Description    |
  | ---  | ----------- |
  |Once to ServiceNow at case creation|The field syncs from Case Management to ServiceNow only at the time the case is created. Subsequent changes are not reflected on either side.|
  |All updates to ServiceNow |Changes in Case Management are reflected in ServiceNow, but changes in ServiceNow are not reflected in Case Management.|
  |Two-way sync (bi-directional)|Changes in Case Management are reflected in ServiceNow, and vice versa.|
  |Don't sync|The field does not sync to ServiceNow.|
1. Select ServiceNow state values that Case Management status values should map to.
1. Save changes.

**Note**: A case can only be synced with one external resource at a time, per project. To enable ServiceNow syncing, Jira automatic creation and syncing must be disabled. Only cases using the core statuses of "Open", "In Progress" and "Closed" can sync with ServiceNow.
{{% /collapse-content %}}

## Incident auto-escalation

Manual incident declaration during high event volumes can cause delays and increase risk exposure during critical situations. Incident auto-escalation from Cases allows you to automatically declare incidents when cases match your defined criteria, removing the need for manual intervention.

Navigate to the [Project Settings page][1], click **Integrations** > **Datadog Incidents**, and toggle on **Auto-escalate cases to Incidents**.

{{< img src="/service_management/case_management/notifications_integrations/case_auto_escalation.png" alt="Case Management settings page showing incident auto-escalation configuration" style="width:70%;" >}}

When enabled, any case that meets your specified query criteria (at any point in its lifecycle) automatically triggers an incident, enabling faster response times for your team.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases/settings
[2]: /integrations/jira/#configure-a-jira-webhook
[3]: /integrations/servicenow/#itom-and-itsm-setup
[4]: /incident_response/on-call/
