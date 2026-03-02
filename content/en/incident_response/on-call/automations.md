---
title: Automations
aliases:
- /service_management/on-call/automations/
further_reading:
- link: '/incident_response/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
- link: '/incident_response/on-call/schedules'
  tag: 'Documentation'
  text: 'On-Call Schedules'
- link: '/service_management/workflows/'
  tag: 'Documentation'
  text: 'Workflow Automation'
- link: '/integrations/slack/'
  tag: 'Documentation'
  text: 'Slack Integration'
- link: '/integrations/microsoft_teams/'
  tag: 'Documentation'
  text: 'Microsoft Teams Integration'
---

## Overview

Automations allow you to trigger actions based on events in On-Call. There are two types:
- **Handover automations**: Triggered automatically when an on-call shift changes.
- **[Workflow automations][1]**: A low-code/no-code solution that lets you define actions based on various on-call activities.


## Handover automations

Handover automations run automatically when on-call duty passes from one person to another. They handle tasks that teams typically manage with custom scripts—such as notifying other systems about who's on-call, updating internal chat channels, or triggering downstream workflows.

By using built-in automations instead of maintaining cron jobs or custom scripts, you can eliminate manual steps and help make sure the right actions always run when a shift changes.

Handover automations are configured at the team level. Each automation is scoped to one or more schedules within that team.

### Prerequisites

- You must have **Write** permission on the On-Call team to create, edit, or delete automations.
- **Slack actions**: The [Datadog Slack app][2] must be installed in your workspace.
- **Microsoft Teams actions**: The [Datadog Teams app][3] must be configured for your tenant.
- **Slack: Update user group**: The Slack app requires additional `usergroups:read` and `usergroups:write` permissions. The UI displays a warning with a link to enable these if they are missing.
- **Datadog: Run Workflow**: A [Datadog Workflow][1] must exist before you can select it.

### Set up a handover automation

1. Navigate to [**On-Call > Teams**][5] and open a specific team.
2. Scroll to the **Handover Automation** section.
3. Click **Add an Automation** (or **Add** if automations already exist).
4. In **Step 1**, select an action type from the left column. Actions are organized by integration: Datadog, Slack, and Microsoft Teams. A live preview appears in the right column.
   {{< img src="service_management/oncall/handover-automation-step1.png" alt="Step 1 of the handover automation modal showing available action types" style="width:80%;" >}}
5. Click **Next**.
6. In **Step 2**, complete the configuration form. All actions require you to select one or more **schedules** scoped to the team. Fill in any additional integration-specific fields (see [Available actions](#available-actions) below).
   {{< img src="service_management/oncall/handover-automation-step2.png" alt="Step 2 of the handover automation modal showing configuration fields" style="width:80%;" >}}
7. Click **Add Automation** to save.

### Edit or delete an automation

- To edit: click the pencil icon on an existing automation, modify the fields, and click **Update Automation**.
- To delete: click the pencil icon, then click **Delete** in the modal footer.

---

## Available actions

Handover automations support eight actions across three integrations.

### Datadog

#### Run workflow {{< preview-inline >}}

Triggers a [Datadog Workflow Automation][1] when a shift change occurs. The workflow receives handover context including schedule information, previous and incoming responders, and a timestamp.

| Field | Required |
|-------|----------|
| Schedules | Yes |
| Workflow | Yes |

### Slack

#### Send message

Posts a handover summary to a Slack channel showing who is handing off to whom for each selected schedule. Optionally include an AI-generated shift summary.

{{< img src="service_management/oncall/handover-automation-slack-message.png" alt="Example Slack handover message showing shift change details" style="width:80%;" >}}

| Field | Required |
|-------|----------|
| Schedules | Yes |
| Workspace | Yes |
| Channel | Yes |
| Include AI shift summary | No |

**Note**: This requires the Datadog Slack app—make sure it's [added to your workspace][2].

#### Update channel topic {{< preview-inline >}}

Updates a Slack channel topic when a shift changes. Use a customizable template with numbered variables (`{{1}}`, `{{2}}`, and so on) to dynamically reference responders in schedule order.

| Field | Required |
|-------|----------|
| Schedules | Yes |
| Workspace | Yes |
| Channel | Yes |
| Template | Yes |

Channel topics have a maximum character length. The UI validates this before saving.

#### Send a direct message {{< preview-inline >}}

Sends a direct message to the incoming on-call person when their shift begins.

| Field | Required |
|-------|----------|
| Schedules | Yes |
| Workspace | Yes |

#### Update user group {{< preview-inline >}}

Updates the members of a Slack user group to match the current on-call responders for the selected schedules.

| Field | Required |
|-------|----------|
| Schedules | Yes |
| Workspace | Yes |
| User Group | Yes |

**Note**: This action requires `usergroups:read` and `usergroups:write` permissions on the Datadog Slack app. If these permissions are missing, the UI displays a warning with a link to enable them.

### Microsoft Teams

#### Send message

Posts a handover summary to a Microsoft Teams channel showing who is handing off to whom for each selected schedule. Optionally include an AI-generated shift summary.

| Field | Required |
|-------|----------|
| Schedules | Yes |
| Tenant | Yes |
| Team | Yes |
| Channel | Yes |
| Include AI shift summary | No |

**Note**: This requires the Datadog Teams app—make sure it's [added to your workspace][3].

#### Update channel description {{< preview-inline >}}

Updates a Microsoft Teams channel description when a shift changes. Use a customizable template with numbered variables (`{{1}}`, `{{2}}`, and so on) to dynamically reference responders in schedule order.

| Field | Required |
|-------|----------|
| Schedules | Yes |
| Tenant | Yes |
| Team | Yes |
| Channel | Yes |
| Template | Yes |

#### Send a direct message {{< preview-inline >}}

Sends a direct message to the incoming on-call person when their shift begins.

| Field | Required |
|-------|----------|
| Schedules | Yes |
| Tenant | Yes |

---

## Template variables

The **Update channel topic** and **Update channel description** actions support dynamic templates. Use numbered variables in the format `{{1}}`, `{{2}}`, and so on to reference on-call responders by their position in the schedule's layer member list.

For example, if your template is `On-call: {{1}} (backup: {{2}})`, Datadog replaces `{{1}}` with the primary on-call responder and `{{2}}` with the secondary.

---

## Troubleshooting

**Not receiving Slack @ mentions**
Your Slack and Datadog accounts may not be linked. To connect them, run any Datadog Slack command such as `/dd page`.

**Slack user group action is unavailable or shows a warning**
The Datadog Slack app is missing the `usergroups:read` and `usergroups:write` permissions. Follow the link in the warning banner to update the app permissions in your Slack workspace.

**Automation is not triggering**
- Confirm the automation is scoped to the correct schedule.
- Confirm the schedule has an active shift change (the automation fires on `shift_change` events only).
- Confirm the integration (Slack, Microsoft Teams) is correctly configured in your Datadog account.

<div class="alert alert-info">
If you need an action type that isn't listed, contact your account representative or <a href="mailto:support@datadoghq.com">support@datadoghq.com</a>.
</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/workflows/
[2]: /integrations/slack/?tab=datadogforslack#install-the-datadog-app-in-your-slack-workspace
[3]: /integrations/microsoft_teams/?tab=datadogapprecommended#overview
[4]: /incident_response/on-call/schedules
[5]: https://app.datadoghq.com/on-call/teams
