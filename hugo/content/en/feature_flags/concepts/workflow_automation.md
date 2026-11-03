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

## Set up a workflow

Where you create a workflow depends on what triggers it:

- **Feature flag triggers**: Navigate to [**Feature Flags > Settings > Automations**][8] to configure events, filters, and workflow steps.
- **Other triggers**: Create a workflow in [Workflow Automation][2] and add a feature flag action.

Configure the workflow's execution identity with the permissions required by its actions. See [Workflow identity][3] and [Feature Flags permissions][4].

## Feature flag triggers

Feature flag triggers start workflows when the following events occur:

| Event category | When it occurs |
| --- | --- |
| Flag changes | A flag is created, archived, enabled, or disabled. |
| Rollout changes | A rollout is scheduled, started, paused, stopped, resumed, or advances to a step. |
| Targeting changes | A targeting rule is created, updated, or deleted. |
| Approvals | Approval is requested for a change, or an approval request is reviewed. |

### Configure a trigger

1. Navigate to **Feature Flags > Settings > Automations**.
1. Click **Create Automation** and enter an **Automation name**.
1. Under **Event**, select one or more events.
1. If the event supports filters, select **All flags** or **Specific flags**, and optionally select **Environments**.
1. Select **Choose an action** to configure workflow steps, or **Clone existing workflow** to copy an existing workflow's configuration.
1. Complete the action inputs and click **Create**.
1. When you are ready for the automation to run, click the toggle at the top of the page to enable it.

{{< img src="/feature_flags/workflow_automation_trigger.png" alt="Feature flag automation with a rollout-paused trigger, flag and environment filters, and a Slack notification action" style="width:100%;" >}}

**Note**: Flag-created events do not support flag or environment filters. Flag-archived events support flag filtering only.

Trigger data includes information about the flag and, where applicable, its environment and the change. Use this data in subsequent steps to customize notifications or configure actions. An approval-reviewed event includes the review decision. An approved request does not mean the change has been applied.

### Example: Notify your team when a rollout pauses

Select the **Feature Flag Rollout Paused** event and choose the flags and environments to monitor. Add a Slack **Send message** action, then configure the message, channel, and workspace.

When a rollout pauses for a selected flag and environment, the workflow sends a Slack notification. The workflow responds to the pause; it does not pause the rollout itself.

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
