---
title: Trigger a workflow
kind: documentation
is_beta: true
disable_toc: false
further_reading:
- link: "/workflows/access/#service-accounts/"
  tag: "Documentation"
  text: "Find out more about Service Accounts for workflows"
- link: "dashboards"
  tag: "Documentation"
  text: "Find out more about setting up a dashboard"
- link: "security/explorer"
  tag: "Documentation"
  text: "Find out more about Security Signals"
- link: "monitors"
  tag: "Documentation"
  text: "Find out more about Monitors"
---

{{< callout url="https://forms.gle/VEjerYVQ2QJhauZ57" >}}
  Workflows are in public beta. If you have any feedback or questions, contact <a href="/help">Datadog support</a>.
{{< /callout >}}

You can trigger a workflow manually or automatically.

All automatically triggered workflows require you to associate the workflow with a unique service account. Automatic workflow triggers include the following trigger types:

- @mention in a monitor
- @mention in Security Signal notification rule or detection rule
- Scheduled

For more information on service accounts, see [Service accounts for Workflows][1].

## Manually trigger a workflow

To trigger a workflow manually:
1. From the workflow page, click **Run**.
1. Enter the values for existing trigger variables.
1. When you're ready to run the workflow, click **Save & Run**.

## Manually trigger a workflow from a Dashboard

To trigger a workflow from a Dashboard, add the **Run Workflow** widget:
1. From your Dashboard, click **Add Widget**.
1. Search for `workflows` and add the **Run Workflow** widget.
1. Under **Select the workflow**, find your workflow in the dropdown menu.
1. Enter a title for the widget and click **Save**

{{< img src="workflows/trigger-from-dashboard.png" alt="Click Run Workflow to trigger a workflow from Dashboard widget." >}}

To run the workflow:
1. Click **Run Workflow** on your dashboard widget.
1. Under **Execution parameters**, enter the required trigger variables for your workflow.
1. Click **Run** to run the workflow.

## Trigger a workflow from a Monitor

To trigger a workflow from a Monitor:
1. On the workflow canvas, click **Add an Automated Trigger** and select **@mention**.
1. Click **Create** to create a service account. For more information, see [Service Accounts for Workflows][1].
1. Next to **@workflow-**, enter a mention name for the trigger. Your mention name must be unique.
1. Save your Workflow.
1. Navigate to the [**Monitors** page][2] in Datadog.
1. Find the monitor you'd like to use to trigger the workflow and edit it, or create a new monitor.
1. In the message section, add the full workflow mention name:
   - The mention name should start with `@workflow-`. For example, `@workflow-my-workflow`
   - To pass trigger variables into the workflow, use a comma-separated list with the syntax `@workflow-name(key=value, key=value)`. For example, `@workflow-my-workflow(name="Bits", alert_threshold=threshold)`
1. Save the monitor.

{{< img src="workflows/monitor-trigger.png" alt="Add a monitor trigger to the message section of a Monitor" >}}

Each time the monitor threshold is hit, the monitor triggers a workflow run.

## Trigger a workflow from a Security Signal Notification Rule

You can set up a workflow to trigger every time a Security Signal Notification Rule fires.

To trigger a workflow from a Notification Rule:
1. On the workflow canvas, click **Add an Automated Trigger** and select **@mention**.
1. Click **Create** to create a service account. For more information, see [Service Accounts for Workflows][1].
1. Next to **@workflow-**, enter a mention name for the trigger. Your mention name must be unique.
1. Save your Workflow.
1. From the [Setup & Configuration][3] page, find the Detection Rule you'd like to use to trigger your workflow, or create a new rule.
1. In the **Recipient** section, add the full workflow mention name. For example, `@workflow-my-workflow`.
1. Click **Save and Activate**.

{{< img src="workflows/notification-rule-trigger.png" alt="Add the workflow name to the recipient section of a Notification rule" >}}

Each time the Notification Rule fires, it triggers a workflow run.

## Trigger a workflow on a schedule

To schedule a workflow run:
1. On the workflow canvas, click **Add an Automated Trigger** and select **Schedule**.
1. Click **Create** to create a service account. For more information, see [Service Accounts for Workflows][1].
1. Enter a time and frequency for the run.
1. (Optional) Enter a description for the workflow in the **Memo** field.
1. Click **Save**.

## Debug a workflow

After you trigger a workflow, the workflow page switches to the **Debug** view. You can also manually toggle between the **Build** and **Debug** views.

Use the **Debug** view to watch the progress of a triggered workflow, or debug a failed step. Clicking on a failed step gives you the inputs, outputs, and execution context for the step, as well as the associated error message. The example below shows a failed GitHub team membership step. The error message shows that the step failed due to missing permissions:

{{< img src="workflows/failed-step2.png" alt="A workflow with a failed step." >}}

The initial **Debug** view for a workflow provides a panel with the list of previous workflow executions and whether each execution succeeded or failed. Failures include a link to the failed workflow step. Click on a workflow execution in the list to inspect it. You can return to the initial execution history at any time by clicking on the workflow canvas.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /workflows/access/#service-accounts
[2]: https://app.datadoghq.com/monitors/manage
[3]: https://app.datadoghq.com/security/configuration/rules
