---
title: Automations
site_support_id: actions
further_reading:
- link: "/actions/workflows/"
  tag: "Documentation"
  text: "Workflow Automation"
- link: "/incident_response/incident_management/incident_settings/notification_rules"
  tag: "Documentation"
  text: "Notification Rules"
---

## Overview

{{< img src="/incident_response/incident_automations_workflow.png" alt="Incident automations workflow diagram showing automation actions." style="width:100%;" >}}

Automations enable you to customize and extend incident management to fit your organization's specific processes. Automatically trigger actions based on incident events such as severity changes, role assignments, state transitions, or postmortem generation.

Automations are powered by [Datadog Workflow Automation][1] and are included in your Incident Management billing at no additional cost.

## Prerequisites

To create and manage automations, you must have the following permissions:

- `Workflows Write` permission
- `Incident Settings Write` **OR** `Incident Notification Settings Write` permission

To run automations on **private incidents**, use a user or service account with the `Private Incidents Global Access` permission. Without this permission, the automation cannot access incident data.

For more information on permissions, see [Datadog Role Permissions][2].

## Accessing automations

Automations are configured per [incident type][3]. To manage automations:

1. Navigate to [**Incidents > Settings**][4].
2. Select an incident type from the list.
3. Click the **Automations** tab.

From this page, you can view, create, enable, disable, and manage your automations.

<div class="alert alert-info">Any user with <code>Incident Settings Write</code> or <code>Incident Notification Settings Write</code> permissions can toggle automations on or off. This is true even if they don't have edit access to the automation itself. Administrators can quickly disable problematic automations if needed.</div>

## Creating an automation

When you click **New Automation**, you have two options for building your workflow:

### Start with a blueprint

Blueprints provide pre-configured automation templates for common use cases, such as sending a Slack message to the incident channel. Using a blueprint is the fastest way to get started.

### Choose an action

For custom processes, you can build an automation from scratch by starting with an individual action. You can choose from incident-specific actions (such as "Create a postmortem") or explore the full Datadog [Action Catalog][5], which contains thousands of integrations.

## Configuring triggers and conditions

### Trigger types

Select when your automation should run:

| Trigger Type | Description |
|--------------|-------------|
| **When the incident is declared** | Runs once when an incident is first declared and meets the defined conditions. |
| **When the incident is declared or updated** | Runs when an incident is declared or when any field changes that cause the incident to meet the conditions. |
| **On a schedule** | Runs repeatedly on a per-incident basis (for example, every 10 minutes for each active incident that meets the conditions). Useful for periodic reminders and status checks. |

### Conditions

Define conditions to specify which incidents trigger the automation. Conditions are based on incident attributes such as Severity, State, Teams, or other custom property fields.

*   **Logic within a row**: Selecting multiple values for a single property (like `SEV-1` and `SEV-2`) uses `OR` logic.
*   **Logic across rows**: Adding multiple property filters uses `AND` logic.

**Example**: Set conditions for `severity:SEV-1`, `severity:SEV-2`, and `summary:is empty`. The automation runs when the incident is (SEV-1 **OR** SEV-2) **AND** the summary is empty.

{{< img src="/incident_response/incident_automations_conditions.png" alt="Screenshot showing incident automation conditions configuration in Datadog. Displays UI for setting trigger, severity, and summary conditions." style="width:90%;" >}}

## Building automation workflows

Automations use the Datadog Workflow Automation engine. Each automation is a workflow that can include multiple actions and logic steps.

### Using incident data

Automations have access to all incident data through the `incident` context variable, which includes:

- `incident.id`: The incident's unique identifier
- `incident.attributes`: All incident attributes (severity, state, title, custom fields, and more)
- `incident.fieldDiffs`: A list of fields that changed (for update triggers)

Use these variables in your automation actions by referencing them with curly braces, such as `{{ incident.id }}`.

### Configuring actions

Each action in your automation requires configuration. For example, to send a message to an incident's Slack channel:

1. Add the **Get incident Slack channel** action.
2. Set the input parameter to `{{ incident.id }}`.
3. Add the **Send Slack message** action.
4. Configure the message content using incident variables.

The workflow editor provides autocomplete for available variables and validates your configuration.

## Testing automations

There are two ways to test your automations:

### Option 1: Declare a test incident

1. Enable [test incidents][6] in your incident settings.
2. Declare a test incident that matches your automation's conditions.
3. View the automation execution in the incident timeline.

### Option 2: Test from an existing incident

1. Open the automation in the workflow editor.
2. Click the **Run** button.
3. Select **Test from incident**.
4. Choose an existing incident to simulate the trigger.

This populates the `incident` context variable with data from the selected incident without actually triggering the automation for that incident.

## Viewing automation executions

### From the incident timeline

Every automation execution appears in the [incident timeline][7]. Timeline entries include:

- The automation name
- Execution timestamp
- Link to the detailed execution view
- Execution status (success or failure)

You can filter the timeline to show only automation executions or exclude them entirely.

### From execution history

To view all executions of an automation:

1. Open the automation.
2. Click **Execution** in the workflow editor.

The execution history shows:
- All input parameters and their values
- The `incident` context data
- The `fieldDiffs` showing what changed
- Step-by-step execution results
- Any errors or failures

## Permissions and access control

### Edit access

By default, only the automation creator can edit an automation. To grant edit access to others:

1. Open the automation.
2. Click **Edit Access**.
3. Add users or service accounts.

<div class="alert alert-tip">Granting edit access allows others to use the Datadog API as you or as the service account. Use service accounts for shared automations to avoid issues when users leave the organization.</div>


### Service accounts

Using a service account to run automations provides several benefits:

- Automations continue running if the creator leaves the organization
- Better separation of duties and access control
- Clearer audit trails

To use a service account:

1. Open the automation.
2. Click **Run as Service Account**.
3. Create a new service account with appropriate roles or select an existing one.

You must have the `Service Account Write` permission to configure service accounts for automations.

### Viewer access

By default, anyone in your organization can view automations and their execution history. To restrict viewer access:

1. Open the automation.
2. Click the **Permissions** icon.
3. Select **No access** for the **Viewers** role.

<!-- TODO **Note**: This capability is scheduled for release in early January 2026. -->

## Private incidents

Automations can run on private incidents with the following considerations:

### Required permissions

To run automations on private incidents, use a user or service account with the `Private Incidents Global Access` permission. Without this permission, the automation cannot access incident data.

### Security considerations

Be aware that execution history (including private incident data) is visible to anyone in your organization. To run automations on private incidents securely:

1. Use a service account with `Private Incidents Global Access` permission.
1. Restrict viewer access to only users who should see private incident data.

## Differences from notification rules

Both automations and [notification rules][8] can respond to incident events, but they serve different purposes:

| Feature | Automations | Notification Rules |
|---------|-------------|-------------------|
| **Purpose** | Execute complex workflows and integrations | Send notifications to stakeholders |
| **Triggers** | Declared, updated, or scheduled | Declared or updated |
| **Actions** | Access to full Datadog Action Catalog | Limited to notification channels |
| **Complexity** | Multi-step workflows with logic | Single notification per rule |
| **Cost** | Included in Incident Management | Included in Incident Management |

Use notification rules for straightforward notifications and automations for complex, multi-step processes.


## Use cases and examples

Use the following examples to help you build your own incident automations.

{{% collapse-content title="Enforce postmortem requirements" level="h4" expanded=false %}}

**Trigger**: On a schedule (every day)<br>
**Condition**: State is `Resolved`, no postmortem exists, and resolved more than 3 days ago<br>
**Actions**:
1. Reopen the incident
2. Send Slack message to incident commander
3. Update incident timeline with reminder
{{% /collapse-content %}}

{{% collapse-content title="Auto-page team on assignment" level="h4" expanded=false %}}

**Trigger**: When declared or updated<br>
**Condition**: Severity is `SEV-1` or `SEV-2`<br>
**Actions**:
1. Detect when teams field changes
2. Page the on-call engineer for the newly added team
3. Send welcome message to incident channel
{{% /collapse-content %}}

{{% collapse-content title="Generate enhanced postmortems" level="h4" expanded=false %}}

**Trigger**: When declared or updated<br>
**Condition**: State changes to `Resolved`<br>
**Actions**:
1. Query external monitoring systems
2. Fetch relevant dashboards and logs
3. Generate postmortem with aggregated data
{{% /collapse-content %}}

{{% collapse-content title="Periodic status reminders" level="h4" expanded=false %}}

**Trigger**: On a schedule (every 30 minutes)<br>
**Condition**: Severity is `SEV-1` or `SEV-2`, State is `Active` or `Stable`<br>
**Actions**:
1. Check time since last update
2. Send Slack reminder if > 30 minutes
3. Prompt commander to update incident status
{{% /collapse-content %}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/workflows/
[2]: /account_management/rbac/permissions/#case-and-incident-management
[3]: /incident_response/incident_management/incident_settings/#incident-types
[4]: https://app.datadoghq.com/incidents/settings
[5]: https://app.datadoghq.com/actions/action-catalog
[6]: /incident_response/incident_management/incident_settings/information#test-incidents
[7]: /incident_response/incident_management/investigate/timeline
[8]: /incident_response/incident_management/incident_settings/notification_rules