---
title: Integrate Jira with Error Tracking
is_beta: false
private: false
further_reading:
  - link: '/error_tracking/explorer/'
    tag: 'Documentation'
    text: 'Error Tracking Explorer'
  - link: '/error_tracking/issue_states/'
    tag: 'Documentation'
    text: 'Issue States in Error Tracking'
  - link: '/integrations/jira/'
    tag: 'Documentation'
    text: 'Jira Integration'
---

## Overview

Integrate Jira with Error Tracking to create and link Jira tickets to Error Tracking issues. With Jira for Error tracking, you can:

- Create Jira tickets directly from the Error Tracking issue panel
- Group multiple Error Tracking issues into a single ticket
- Automatically route issues to specific Jira boards using automation rules
- Automatically create Jira tickets for Error Tracking issues matching specific criteria.

## Setup

You need the following [permissions][1] to use the Jira integration for Error Tracking:

- Error Tracking Read
- Error Tracking Issue Write
- Cases Read
- Cases Write

## Create a ticket from an issue

You can create a Jira ticket directly from the issue panel to group investigation efforts on that issue:

1. Navigate to the [Error Tracking Explorer][2].
2. Click on an issue to open the issue panel.
3. In the issue panel, in the **Actions** dropdown, click **Add Jira ticket**.
4. Choose the Jira account and project in which the ticket should be created. Then, choose the ticket type you want to create.
5. Optionally, access Data Sync settings to configure how data should be synced between Datadog and Jira.
6. Click **Create** to create the ticket.

{{< img src="error_tracking/create-ticket.png" alt="Create a Jira ticket from an Error Tracking issue" style="width:100%;" >}}

Once created, the ticket is linked to the Error Tracking issue. The ticket link appears in the issue panel, and the issue status automatically changes to **REVIEWED**.

When an issue is linked to a ticket, their state, assignee and comments are two-way synced. See [State dual-way sync between issues and tickets](#state-dual-way-sync-between-issues-and-tickets) for more information on how the issue state and ticket status are synced.

## Group multiple issues into a single ticket

You can attach multiple Error Tracking issues to a single Jira ticket to group correlated issues into a single unit of work:

1. Navigate to the [Error Tracking Explorer][2].
2. Click on an issue to open the issue panel.
3. In the issue panel, in the **Actions** dropdown, click **Add Jira ticket**.
4. In the **Add to Existing** tab, paste the URL of the ticket in which you want to group your issues.
5. Optionally, access Data Sync settings to configure how data should be synced between Datadog and Jira.
6. Click **Link to Issue** to attach the issue to the ticket.
7. Repeat these actions on all the issues you want to add to this group.

{{< img src="error_tracking/add-to-existing-ticket.png" alt="Add an Error Tracking issue to an existing Jira ticket" style="height:300px;" >}}

When several issues are linked to a single ticket, their state, assignee and comments are two-way synced. See [State dual-way sync between issues and tickets](#state-dual-way-sync-between-issues-and-tickets) for more information on how the issues states and ticket status are synced.

The relationship between tickets and issues is a 1:N relationship. A single ticket can be linked to multiple issues, but an issue can only be linked to one single Jira ticket.

## State dual-way sync between issues and tickets

If two-way sync is enabled and configured between Datadog and Jira projects, the states of Error Tracking issues and Jira tickets are mirrored. If you encounter any unexpected behavior on this states sync, see the [Troubleshooting](#troubleshooting) section for how to fix your configuration.

### Single Error Tracking issue linked to a Jira ticket

When a single Error Tracking issue is linked to a Jira ticket, their states are two-way synced. The mapping between these states can be configured in the Data Sync settings of the ticket creation or automation rule forms:

{{< img src="error_tracking/jira-status-mapping.png" alt="Map Error Tracking issue states to Jira ticket statuses" style="width:100%;" >}}

### Multiple Error Tracking issues linked to the same Jira ticket

When multiple Error Tracking issues are linked to the same Jira ticket, there is also a sync between their states, depending on the situation. If you update the status of the ticket, all linked issues are updated to mirror this state according to your mapping.

Assuming that your mapping is defined as follows:

| Case Management status group | Jira Ticket status |
|------------------------------|--------------------|
| `Open`                       | `To Do`            |
| `In Progress`                | `In Progress`      |
| `Closed`                     | `Done`             |

If you update the state of an issue, the resulting state of other linked issues and the Jira ticket follows these rules:

| Initial state                                                      | Action                                                 | Resulting state                                                                                    |
|--------------------------------------------------------------------|--------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| The ticket is `Done` and all issues are `Resolved`.                | You update one issue to `For Review`.                  | The ticket is `To Do` but all other issues remain `Resolved`.                                      |
| The ticket is `To Do` and all issues are `For Review`.             | You update one issue to `Resolved`.                    | The ticket is `To Do`, one issue is `Resolved`, all other issues remain `For Review`.              |
| The ticket is `Done` and you have one unlinked issue `For Review`. | You link the `For Review` issue to your `Done` ticket. | The ticket is `Done` and all issues are `Resolved` (including the newly linked issue).             |
| The ticket is `To Do` and you have one unlinked `Resolved` issue.  | You link the `Resolved` issue to your `To Do` ticket.  | The ticket is `To Do` and all issues are `For Review` except the new one which remains `Resolved`. |

## Automation rules

You can configure rules to match specific issues to Jira boards. When an issue matches a rule, any ticket created manually or automatically for that issue will be defaulted into the board specified by your rule.

### Setup

To create automation rules for your Error Tracking issues, you need one (1) of the following [permissions][1] :
- Error Tracking Write
- Error Tracking Settings Write

### Create an automation rule

To create an automation rule for Jira:

1. Navigate to [Error Tracking Settings][3], in the **Ticketing & Automation** section.
2. Click **New Rule**.
3. Configure the rule:
    - **Match Criteria**: Define conditions that issues must meet to trigger the rule
    - **Destination**: Select the destination Jira account and project when tickets are created from issues that match the rule. Select the type of ticket you want to create, and provide values for any required fields of the ticket.
    - **Auto-create**: Optionally enable automatic ticket creation when issues match
4. Click **Save Rule**.

{{< img src="error_tracking/create-jira-automation-rule.png" alt="Create a Jira automation rule" style="width:100%;" >}}

### Match criteria

Configure rules based on the following attributes:

- **Service**: Match issues from specific services (for example, `service:web-store`)
- **Team**: Match issues based on [Issue Team Ownership][4] (for example, `team:Shopist`)

You can combine multiple criteria to create precise routing rules. The issue matching query supports the following operators:

- `AND`: logical AND (for example, `service:web-store AND team:Shopist`)
- `OR`: logical OR (for example, `service:web-store OR team:Shopist`)
- `-`: logical NOT (for example, `service:web-store -team:Shopist`)

<div class="alert alert-info"> Rules are ordered. The first rule that matches an issue is applied.</div>

### Automatic ticket creation

When adding an automation rule, you can enable automatic Jira ticket creation for issues matching your rule.

{{< img src="error_tracking/enable-auto-ticket-creation.png" alt="Enable automatic case creation" style="height:300px;" >}}

When a new Error Tracking issue is created, rules are evaluated and the first rule that matches is applied. If automatic ticket creation is enabled on that matching rule, a new Jira ticket will be created on the Jira board specified in your rule, and attached to the matching issue.

## Troubleshooting

If you experience unexpected behavior with Error Tracking ticketing integrations, the troubleshooting steps below can help you resolve the issue quickly. If you continue to have trouble, reach out to [Datadog support][5].

### Sync is broken between Jira and Error Tracking

If you experience syncing issues between your Jira tickets and the corresponding Error Tracking issues (such as the issue state not being updated when you close the Jira ticket), verify that the following steps are all properly configured:

1. In the issue panel, make sure that the issue is correctly linked to the Jira ticket.
2. A Case Management case was automatically created by Datadog to act as a linking point for the Error Tracking issue and the Jira ticket. You can access this case from the issue panel, to find the  Case Management project in which it was created. In Case Management settings, make sure that the Jira integration is enabled for this project, and the correct Jira account and board are configured.

{{< img src="error_tracking/enable-jira-for-case-management-project.png" alt="Enable Jira for your Case Management project" style="width:100%;" >}}

3. In Case Management settings, make sure that sync between Case Management and Jira is enabled for this project. Check that the fields you want to sync are configured for two-way sync between Datadog and Jira.

{{< img src="error_tracking/sync-data-between-case-management-and-jira.png" alt="Sync data between Case Management and Jira" style="width:100%;" >}}

4. A webhook must be configured to automatically sync updates between Datadog and Jira. In your Jira settings, check for this webhook. If the webhook is missing, follow [these steps][6] to add it and fix the sync between Datadog and Jira.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[3]: https://app.datadoghq.com/error-tracking/settings/automation/
[4]: /error_tracking/issue_team_ownership/
[5]: /help/
[6]: /integrations/jira/#configure-a-jira-webhook
