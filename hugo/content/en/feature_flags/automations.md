---
title: Feature Flag Automations
description: Automatically run workflows when Datadog feature flags, rollouts, approvals, or targeting rules change.
further_reading:
- link: "/actions/workflows/trigger/#datadog-feature-flags-triggers"
  tag: "Documentation"
  text: "Add a Feature Flags trigger in Workflow Automation"
- link: "/feature_flags/concepts/scheduled_rollouts/"
  tag: "Documentation"
  text: "Scheduled Rollouts"
- link: "/feature_flags/concepts/approvals/"
  tag: "Documentation"
  text: "Feature Flag Approvals"
---

## Overview

Feature Flag automations run workflows in response to flag events. Use them to notify a team when a rollout pauses, send an approval request to a Slack channel, or coordinate follow-up actions when a flag is enabled or disabled.

Automations use [Datadog Workflow Automation][1]. Each automation combines one or more event triggers, optional conditions, and workflow actions. Workflow executions are subject to [Workflow Automation pricing][2].

## Prerequisites

To view automations, you need the **Feature Flag Config Read** and **Workflows Read** permissions. To create and manage automations, you also need **Feature Flag Config Write** and **Workflows Write**. Editing, enabling, disabling, or deleting an existing automation requires edit access to its workflow.

For details, see [Feature Flags permissions][3] and [Workflow permissions][4]. Configure the [connections][5] required by your actions, such as a Slack connection for sending messages.

## Access automations

1. Navigate to [**Feature Flags > Settings**][6].
1. Select {{< ui >}}Automations{{< /ui >}}.

The Automations page lists workflows with Feature Flags triggers. Search by name, open an automation to edit it, or use its toggle to enable or disable it.

## Create an automation

1. Click {{< ui >}}Create Automation{{< /ui >}}.
1. Enter an {{< ui >}}Automation name{{< /ui >}}.
1. In the {{< ui >}}Trigger{{< /ui >}} section, select one or more event types from {{< ui >}}Event{{< /ui >}}.
1. Configure the flag and environment [conditions](#conditions) that apply to the selected events.
1. In the {{< ui >}}Workflow{{< /ui >}} section, choose an action or clone an existing workflow.
1. Configure the actions and review the workflow's access settings.
1. Click {{< ui >}}Create{{< /ui >}} to save the automation.
1. Review the saved workflow and enable the automation with its toggle when it is ready to run.

New automations start disabled. For changes made in the workflow editor, publish any unpublished changes before enabling the automation.

{{< img src="feature_flags/automations/create-automation.png" alt="Feature Flags automation creation form with the Event menu open, showing flag lifecycle and rollout triggers." style="width:100%;" >}}

### Choose an action

Click {{< ui >}}Choose an action{{< /ui >}} to select an action from the [Action Catalog][7]. Select at least one trigger event before choosing an action. Use {{< ui >}}Edit{{< /ui >}} in the workflow preview to configure action inputs, add more steps, and connect logic branches.

### Clone an existing workflow

Click {{< ui >}}Clone existing workflow{{< /ui >}}, select a workflow, and click {{< ui >}}Copy into form{{< /ui >}}. This copies its configuration into the new automation form. Review the copied events, conditions, actions, and execution identity before creating the automation.

## Configure triggers and conditions

### Event types

Select one or more of the following events. Each matching event can start a workflow run.

| Trigger | Runs when |
|---------|-----------|
| Feature Flag Created | A feature flag is created. |
| Feature Flag Archived | A feature flag is archived. |
| Feature Flag Enabled | A feature flag is enabled in an environment. |
| Feature Flag Disabled | A feature flag is disabled in an environment. |
| Feature Flag Rollout Scheduled | A rollout is scheduled. |
| Feature Flag Rollout Started | A rollout starts. |
| Feature Flag Rollout Step | A rollout advances to a step. |
| Feature Flag Rollout Paused | A rollout is paused. |
| Feature Flag Rollout Resumed | A rollout resumes. |
| Feature Flag Rollout Stopped | A rollout is stopped. |
| Feature Flag Approvals Requested | Approval is requested for a proposed flag change. |
| Feature Flag Approval Reviewed | A proposed flag change is approved or rejected. Approval does not necessarily mean the change has been applied. |
| Feature Flag Targeting Rule Created | A targeting rule is created in an environment. |
| Feature Flag Targeting Rule Updated | A targeting rule is updated in an environment. |
| Feature Flag Targeting Rule Deleted | A targeting rule is deleted from an environment. |

### Conditions

For events that support flag filters, choose {{< ui >}}All flags{{< /ui >}} or {{< ui >}}Specific flags{{< /ui >}}. When choosing specific flags, select at least one flag. For events associated with an environment, select {{< ui >}}Environments{{< /ui >}} or leave the field empty to match all environments.

- Multiple selected flags use **OR** logic: any selected flag can match.
- Multiple selected environments use **OR** logic: any selected environment can match.
- Flag and environment filters use **AND** logic: the event must match both fields when both are configured.

For example, select {{< ui >}}Feature Flag Disabled{{< /ui >}}, two specific flags, and the production environment. The workflow runs when either flag is disabled in production.

The following exceptions apply even when you select multiple event types:

| Event | Supported conditions |
|-------|----------------------|
| Feature Flag Created | No flag or environment filters. Runs for any newly created flag. |
| Feature Flag Archived | Flag filters only. Archiving applies to the whole flag. |
| All other Feature Flags events | Flag and environment filters. |

If individual events have different filters, edit them in the workflow editor. The Automations form preserves those filters and directs you to the editor.

{{< img src="feature_flags/automations/trigger-conditions.png" alt="Workflow editor showing a Feature Flag Enabled trigger filtered to one feature flag and the Staging environment, connected to a Slack message action." style="width:100%;" >}}

## Build automation workflows

### Use feature flag data

Use [source object variables][8] in action inputs to access the triggering flag:

| Variable | Description |
|----------|-------------|
| `{{Source.featureFlag.id}}` | Flag ID. |
| `{{Source.featureFlag.key}}` | Flag key. |
| `{{Source.featureFlag.name}}` | Flag name. |
| `{{Source.featureFlag.environmentId}}` | Environment ID, when applicable. |
| `{{Source.featureFlag.environmentName}}` | Environment name, when applicable. |
| `{{Source.featureFlag.changedBy.id}}` | ID of the user responsible for the event. |
| `{{Source.featureFlag.changedBy.name}}` | Name of the user responsible for the event. |
| `{{Source.featureFlag.changedBy.email}}` | Email of the user responsible for the event. |

For approval requests, `changedBy` identifies the requester. Unavailable user identity fields contain empty strings.

Some events include additional context. For example, the {{< ui >}}Feature Flag Approval Reviewed{{< /ui >}} event provides `{{Source.approvalReview.decision}}`, with a value of `approved` or `rejected`. The workflow editor provides autocomplete for available variables.

### Configure notification actions

To notify a Slack channel when a flag is disabled:

1. Select {{< ui >}}Feature Flag Disabled{{< /ui >}} as the event.
1. Select the flags and environments to monitor.
1. Choose a Slack action that sends a message and configure its connection and channel.
1. Use source variables in the message, for example:

   `Feature flag {{Source.featureFlag.key}} was disabled in {{Source.featureFlag.environmentName}}.`

1. Save the automation and enable it.

Use {{< ui >}}View in Workflow Editor{{< /ui >}} to open the saved automation in Workflow Automation for additional actions and logic.

## Test automations and view executions

1. Create an automation for a test flag and environment using an event that supports both filters.
1. Enable the automation.
1. Perform the selected operation on the test flag, such as enabling or disabling it.
1. Open the automation and click {{< ui >}}View in Workflow Editor{{< /ui >}}.
1. Open {{< ui >}}Run History{{< /ui >}} to inspect the triggering context, step inputs and outputs, and any errors.

For more information, see [Test and Debug Workflows][9].

## Manage automations

### Edit, enable, or disable

Open an automation from the list to change its name, events, conditions, or workflow. Changes to the saved automation's name, events, and filters save automatically. Wait for {{< ui >}}All changes saved{{< /ui >}} before leaving the page.

Use the toggle on the automation page or in the list to enable or disable it. If the workflow has an unpublished draft, publish or discard that draft in the workflow editor before editing events or filters from the Automations page.

### Delete an automation

Click the delete icon on the automation's list entry and confirm with {{< ui >}}Delete Workflow{{< /ui >}}. This permanently deletes the entire workflow from both Feature Flags automations and Workflow Automation, including its triggers and actions.

## Permissions and execution identity

Use the automation's access settings to control who can view or edit the workflow. By default, the creator has edit access and the organization has view access.

Feature Flags triggers run automatically, so configure the workflow to run as its owner or a service account with access to the required resources and connections. For setup instructions, see [Workflow identity][10].

## Use cases and examples

### Notify a team when a rollout pauses

- **Event:** Feature Flag Rollout Paused.
- **Conditions:** Select the flags being released and the production environment.
- **Action:** Send a Slack message containing the flag key and environment name.

### Notify reviewers of an approval request

- **Event:** Feature Flag Approvals Requested.
- **Conditions:** Select the flags and environments that require review.
- **Action:** Send a message with the flag name and `{{Source.featureFlag.changedBy.name}}` so reviewers know who requested the change.

### Report approval decisions

- **Event:** Feature Flag Approval Reviewed.
- **Conditions:** Select the flags and environments to monitor.
- **Actions:** Branch on `{{Source.approvalReview.decision}}` and send an approval or rejection notification. An approved decision does not necessarily mean the change has been applied.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/workflows/
[2]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[3]: /feature_flags/concepts/permissions/
[4]: /actions/workflows/access_and_auth/#workflow-permissions
[5]: /actions/connections/
[6]: https://app.datadoghq.com/feature-flags/settings/automations
[7]: /actions/actions_catalog/
[8]: /actions/workflows/variables/#source-object-variables
[9]: /actions/workflows/test_and_debug/
[10]: /actions/workflows/access_and_auth/#workflow-identity
