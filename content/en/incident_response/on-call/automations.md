---
title: Handover Automation
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

{{< img src="service_management/oncall/handover-automation.png" alt="The Handover Automation section on an On-Call team page" style="width:80%;" >}}

Handover automations run automatically when on-call duty passes from one person to another. They handle tasks that teams typically manage with custom scripts, such as notifying other systems about who's on-call, updating internal chat channels, or triggering downstream workflows.

Each automation is configured at the team level and scoped to one or more schedules.

**Note**: For a low-code approach to automating actions across a broader range of on-call events, see [Workflow Automation][1].

### Prerequisites

- You must have **Write** permission on the On-Call Team to create, edit, or delete automations.
- **Slack actions**: The [Datadog Slack app][2] must be installed in your workspace.
- **Microsoft Teams actions**: The [Datadog Teams app][3] must be configured for your tenant.
- **Slack: Update user group**: The Slack app requires additional `usergroups:read` and `usergroups:write` permissions. The UI displays a warning with a link to enable these if they are missing.
- **Datadog: Run Workflow**: A [Datadog Workflow][1] must already exist before you can configure this action.

### Set up a handover automation

1. Navigate to [**On-Call > Teams**][5] and open a specific team.
2. Scroll to the **Handover Automation** section.
3. Click **Add an Automation** (or **Add** if automations already exist).
4. Select an action type (see [Available actions](#available-actions)).
5. Click **Next**.
6. Complete the configuration form. Select one or more **schedules** scoped to the team, then fill in any action-specific fields.
7. Click **Add Automation** to save.

### Edit or delete an automation
- To edit: click the pencil icon on an existing automation, modify the fields, and click **Update Automation**.
- To delete: click the pencil icon, then click **Delete** in the modal footer.

## Available actions

Handover automations support actions across Datadog, Slack, and Microsoft Teams.

### Datadog

#### Run workflow

Triggers a [Datadog Workflow Automation][1] when a shift changes. The workflow receives handover context including schedule information, the previous and incoming responders, and a timestamp.

For example, you can use this action to:

- **Federate permissions**: Assign the current on-call responder an IAM role that permits scaling up or down.
- **On-call compensation**: Send shift data directly to your HR system or payroll tool.

### Slack

#### Send message

Posts a handover summary to a Slack channel showing who is handing off to whom for each selected schedule. You can also include an AI-generated shift summary.

{{< img src="service_management/oncall/handover-automation-slack-message.png" alt="Example Slack handover message showing shift change details" style="width:80%;" >}}

#### Update channel topic

Updates a Slack channel topic when a shift changes. Use numbered variables (`{{1}}`, `{{2}}`, and so on) in a customizable template to reference responders in schedule order. For example, `On-call: {{1}} (backup: {{2}})` resolves to the primary and secondary on-call responders when the shift changes.

{{< img src="service_management/oncall/handover-automation-slack-channel-topic.png" alt="Configuration form for the Slack Update channel topic automation" style="width:80%;" >}}

Channel topics have a character limit. The UI validates the template before saving.

#### Send a direct message

Sends a direct message to the incoming on-call responder when their shift begins.

{{< img src="service_management/oncall/handover-automation-slack-direct-message.png" alt="Configuration form for the Slack Send a direct message automation" style="width:80%;" >}}

#### Update user group

Updates the members of a Slack user group to match the current on-call responders for the selected schedules.

{{< img src="service_management/oncall/handover-automation-slack-update-group.png" alt="Configuration form for the Slack Update user group automation" style="width:80%;" >}}

**Note**: This action requires `usergroups:read` and `usergroups:write` permissions on the Datadog Slack app. If these permissions are missing, the UI displays a warning with a link to enable them.

### Microsoft Teams

#### Send message

Posts a handover summary to a Microsoft Teams channel showing who is handing off to whom for each selected schedule. You can also include an AI-generated shift summary.

{{< img src="service_management/oncall/handover-automation-ms-teams-message.png" alt="Configuration form for the Microsoft Teams Send message automation" style="width:80%;" >}}

#### Update channel description

Updates a Microsoft Teams channel description when a shift changes. Use numbered variables (`{{1}}`, `{{2}}`, and so on) in a customizable template to reference responders in schedule order. For example, `On-call: {{1}} (backup: {{2}})` resolves to the primary and secondary on-call responders when the shift changes.

{{< img src="service_management/oncall/handover-automation-ms-teams-channel-topic.png" alt="Configuration form for the Microsoft Teams Update channel description automation" style="width:80%;" >}}

#### Send a direct message

Sends a direct message to the incoming on-call responder when their shift begins.

{{< img src="service_management/oncall/handover-automation-ms-teams-direct-message.png" alt="Configuration form for the Microsoft Teams Send a direct message automation" style="width:80%;" >}}

## Troubleshooting

**Not receiving Slack @ mentions**

Your Slack and Datadog accounts may not be linked. To connect them, run any Datadog Slack command such as `/dd page`.

**Slack user group action is unavailable or shows a warning**

The Datadog Slack app is missing the `usergroups:read` and `usergroups:write` permissions. Follow the link in the warning banner to update the app permissions in your Slack workspace.

**Automation is not triggering**

- Confirm the automation is scoped to the correct schedule.
- Confirm the schedule has an active shift change (the automation triggers only on `shift_change` events).
- Confirm that your Slack or Microsoft Teams integration is correctly configured in Datadog.

<div class="alert alert-info">
If you need an action type that isn't listed, contact your account representative or <a href="mailto:support@datadoghq.com">support@datadoghq.com</a>.
</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/workflows/
[2]: /integrations/slack/?tab=datadogforslack#install-the-datadog-app-in-your-slack-workspace
[3]: /integrations/microsoft_teams/?tab=datadogapprecommended#overview
[5]: https://app.datadoghq.com/on-call/teams
