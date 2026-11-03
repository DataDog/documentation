---
title: Feature Flags and Workflow Automation
description: Automate feature flag changes and respond to flag events with Workflow Automation.
further_reading:
- link: "/actions/workflows/build/"
  tag: "Documentation"
  text: "Build workflows"
- link: "/actions/workflows/test_and_debug/"
  tag: "Documentation"
  text: "Test and debug workflows"
- link: "/feature_flags/concepts/approvals/"
  tag: "Documentation"
  text: "Feature Flags Approvals"
- link: "/feature_flags/use_cases/progressive_rollouts/"
  tag: "Documentation"
  text: "Progressive Rollouts and Canaries"
- link: "/feature_flags/use_cases/kill_switches/"
  tag: "Documentation"
  text: "Kill Switches"
---

## Overview

Use [Workflow Automation][1] with Feature Flags to automate flag changes and respond to flag events.

- A **trigger** determines when a workflow starts. Feature flag triggers respond to events such as a flag being enabled, a rollout being paused, or an approval being requested.

- An **action** is a step the workflow performs. Feature flag actions can retrieve flag details or update flag configuration. For example, when a monitor alerts, a workflow can disable a flag in the affected environment.

Workflow executions are subject to [Workflow Automation pricing][9].

## Set up a workflow

To view automations, you need the **Feature Flag Config Read** and **Workflows Read** permissions. To create and manage automations, you also need **Feature Flag Config Write** and **Workflows Write**. Editing, enabling, disabling, or deleting an existing automation requires edit access to its workflow.

For details, see [Feature Flags permissions][4] and [Workflow permissions][10]. Configure the [connections][11] required by your actions, such as a Slack connection for sending messages.

Where you create a workflow depends on what triggers it:

- **Feature flag triggers**: Navigate to [**Feature Flags > Settings > Automations**][8] to configure events, filters, and workflow steps.
- **Other triggers**: Create a workflow in [Workflow Automation][2] and add a feature flag action.

Configure the workflow to run as its owner or a service account with access to the required resources and connections. See [Workflow identity][3] and [Feature Flags permissions][4]. Use the automation's access settings to control who can view or edit the workflow. By default, the creator has edit access and the organization has view access.

## Feature flag triggers

Select one or more of the following events. Each matching event can start a workflow run.

| Event | Runs when |
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
| Feature Flag Approval Reviewed | A proposed flag change is approved or rejected. An approved change might not be applied yet. |
| Feature Flag Targeting Rule Created | A targeting rule is created in an environment. |
| Feature Flag Targeting Rule Updated | A targeting rule is updated in an environment. |
| Feature Flag Targeting Rule Deleted | A targeting rule is deleted from an environment. |

### Configure a trigger

You can configure a trigger from Feature Flags settings or [add a Feature Flags trigger in Workflow Automation][15]. To configure one from Feature Flags settings:

1. Navigate to [**Feature Flags > Settings > Automations**][8].
1. Click **Create Automation** and enter an **Automation name**.
1. Under **Event**, select one or more events.
1. Configure the flag and environment [conditions](#conditions) that apply to the selected events.
1. Select **Choose an action** to configure workflow steps, or **Clone existing workflow** to copy an existing workflow's configuration.
1. Complete the action inputs, review the workflow's access settings, and click **Create**.
1. When you are ready for the automation to run, click the toggle at the top of the page to enable it.

{{< img src="/feature_flags/workflow_automation_trigger.png" alt="Feature flag automation with a rollout-paused trigger, flag and environment filters, and a Slack notification action" style="width:100%;" >}}

New automations start disabled. For changes made in the workflow editor, publish any unpublished changes before enabling the automation.

Select at least one trigger event before choosing an action from the [Action Catalog][13]. Use **Edit** in the workflow preview to configure action inputs, add more steps, and connect logic branches.

To clone a workflow, click **Clone existing workflow**, select a workflow, and click **Copy into form**. Review the copied events, conditions, actions, and execution identity before creating the automation.

Use **View in Workflow Editor** to open the saved automation in Workflow Automation for additional actions and logic.

### Conditions

For events that support flag filters, choose {{< ui >}}All flags{{< /ui >}} or {{< ui >}}Specific flags{{< /ui >}}. When choosing specific flags, select at least one flag. For events associated with an environment, select {{< ui >}}Environments{{< /ui >}} or leave the field empty to match all environments.

- Multiple selected flags use **OR** logic: any selected flag can match.
- Multiple selected environments use **OR** logic: any selected environment can match.
- Flag and environment filters use **AND** logic: the event must match both fields when both are configured.

For example, select {{< ui >}}Feature Flag Disabled{{< /ui >}}, two specific flags, and the production environment. The workflow runs when either flag is disabled in production.

Some events support only a subset of filters, including when you select multiple event types:

| Event | Supported conditions |
|-------|----------------------|
| Feature Flag Created | None. The event runs for every newly created flag. |
| Feature Flag Archived | Flag filters only. Archiving applies to the whole flag. |
| All other Feature Flags events | Flag and environment filters. |

If individual events have different filters, edit them in the workflow editor. The Automations form preserves those filters and directs you to the editor.

### Use feature flag data

Use [source object variables][12] in action inputs to access the triggering flag:

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

### Example: Notify your team when a rollout pauses

Select the **Feature Flag Rollout Paused** event and choose the flags and environments to monitor. Add a Slack **Send message** action, then configure the message, channel, and workspace.

Use source variables in the message, for example:

```text
Feature flag {{Source.featureFlag.key}} rollout paused in {{Source.featureFlag.environmentName}}.
```

When a rollout pauses for a selected flag and environment, the workflow sends a Slack notification. The workflow responds to the pause; it does not pause the rollout itself.

### Example: Notify reviewers of an approval request

- **Event:** Feature Flag Approvals Requested.
- **Conditions:** Select the flags and environments that require review.
- **Action:** Send a message with the flag name and `{{Source.featureFlag.changedBy.name}}` so reviewers know who requested the change.

<!-- vale Datadog.headings = NO -->
### Example: Report approval decisions
<!-- vale Datadog.headings = YES -->

- **Event:** Feature Flag Approval Reviewed.
- **Conditions:** Select the flags and environments to monitor.
- **Actions:** Branch on `{{Source.approvalReview.decision}}` and send an approval or rejection notification.

## Feature flag actions

Add actions from the **Datadog Feature Flags** integration to read or update flag configuration:

| Action category | Available actions |
| --- | --- |
| Read configuration | {{< ui >}}List feature flags{{< /ui >}}<br>{{< ui >}}Get feature flag{{< /ui >}}<br>{{< ui >}}List environments{{< /ui >}} |
| Create and edit flags | {{< ui >}}Create feature flag{{< /ui >}}<br>{{< ui >}}Update feature flag metadata{{< /ui >}} |
| Control flags | {{< ui >}}Enable feature flag{{< /ui >}}<br>{{< ui >}}Disable feature flag{{< /ui >}}<br>{{< ui >}}Archive feature flag{{< /ui >}} |
| Configure evaluation | {{< ui >}}Update default variant{{< /ui >}}<br>{{< ui >}}Set feature flag targeting rules{{< /ui >}} |

In the workflow builder, add a step, search for the action, and configure its inputs. When using variables for flag or environment inputs, supply their IDs rather than their keys or names.

**Note**: **Set feature flag targeting rules** replaces the complete targeting configuration for the selected environment. Existing allocations omitted from the input are removed.

### Example: Disable a flag when a monitor alerts

Use a monitor to automatically disable a flag when a service metric crosses a threshold. For example, disable the flag for a new checkout feature when the checkout service's error rate exceeds the monitor's alert threshold.

<div class="alert alert-info">If disabling the flag requires approval, the action creates a suggested change and returns an error with a review link. The action does not disable the flag, and the workflow does not resume automatically after approval.</div>

1. Create a workflow in [Workflow Automation][2].
1. Add a **Monitor** trigger and keep **Automatic triggering** enabled.
1. Add the **Disable feature flag** action and connect it to the trigger.
1. Select a **Feature flag** and **Environment** to use for testing.
1. [Test the workflow][5], then verify the result in **Run History**. Testing runs the disable action, so use a flag in a test environment.
1. Change the **Feature flag** and **Environment** to the ones the workflow should disable, save the workflow, and click **Publish**.
1. Edit the monitor. Under **Configure notifications & automations**, click **+ Add Workflow** and select the workflow.
1. Place the generated workflow mention inside an alert condition, then save the monitor:

   ```text
   {{#is_alert}}
   @workflow-<WORKFLOW_HANDLE>
   {{/is_alert}}
   ```

See [Monitor triggers][6] for configuration details.

{{< img src="/feature_flags/workflow_automation_monitor_rollback.png" alt="Monitor-triggered workflow with a Disable feature flag action configured for New Checkout Flow in prod, followed by a Slack notification" style="width:100%;" >}}

Confirm that your application behaves as intended when the flag is disabled. The resulting behavior depends on the default value configured in your application code. See [Flag Evaluation Results][7].

Add a notification action after the disable action to notify the team when the flag is disabled. Other workflows can notify reviewers when approval is requested or notify the team when a flag is enabled.

## Test automations and view executions

1. Create an automation for a test flag and environment. Use an event that supports both flag and environment filters, such as {{< ui >}}Feature Flag Enabled{{< /ui >}}.
1. Enable the automation.
1. Perform the selected operation on the test flag, such as enabling or disabling it.
1. Open the automation and click {{< ui >}}View in Workflow Editor{{< /ui >}}.
1. Open {{< ui >}}Run History{{< /ui >}} to inspect the triggering context, step inputs and outputs, and any errors.

For more information, see [Test and Debug Workflows][14].

## Manage automations

The [Automations page][8] lists workflows with Feature Flags triggers. Search by name, open an automation to edit it, or use its toggle to enable or disable it.

### Edit, enable, or disable

Open an automation from the list to change its name, events, conditions, or workflow. Changes to the saved automation's name, events, and filters save automatically. Wait for {{< ui >}}All changes saved{{< /ui >}} before leaving the page.

Use the toggle on the automation page or in the list to enable or disable it. Publish or discard any unpublished draft in the workflow editor before editing events or filters from the Automations page.

### Delete an automation

Click the delete icon on the automation's list entry and confirm with {{< ui >}}Delete Workflow{{< /ui >}}. This permanently deletes the entire workflow from both Feature Flags automations and Workflow Automation, including its triggers and actions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/workflows/
[2]: https://app.datadoghq.com/workflow
[3]: /actions/workflows/access_and_auth/#workflow-identity
[4]: /feature_flags/concepts/permissions/
[5]: /actions/workflows/test_and_debug/#test-a-monitor-trigger
[6]: /actions/workflows/trigger/#monitor-triggers
[7]: /feature_flags/concepts/evaluation_results/
[8]: https://app.datadoghq.com/feature-flags/settings/automations
[9]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[10]: /actions/workflows/access_and_auth/#workflow-permissions
[11]: /actions/connections/
[12]: /actions/workflows/variables/#source-object-variables
[13]: /actions/actions_catalog/
[14]: /actions/workflows/test_and_debug/
[15]: /actions/workflows/trigger/#feature-flags-triggers
