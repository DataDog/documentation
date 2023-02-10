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

While you run your Workflow, it can either run with the identity of the user who owns the Workflow or the identity of a service account associated to the Workflow.
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
1. In the second step, you will be asked to map template variables to the workflow input parameters if any.\
_This will allow the values of the template variables to be mapped directly to the input parameters when you run the Workflow._
1. Enter a title for the widget if you want and click **Save**

{{< img src="workflows/trigger-from-dashboard2.png" alt="Click Run Workflow to trigger a workflow from Dashboard widget." >}}

To run the workflow:
1. Click **Run Workflow** on your dashboard widget.
1. Under **Execution parameters** any values selected in the template variables mapped to the input parameters will automatically be mapped. You can edit these inputs.
1. Click **Run** to run the workflow.

## Trigger a workflow from a Monitor

To trigger a workflow from a Monitor:
1. On the workflow canvas, click **Add an Automated Trigger** and select **@mention**.
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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /workflows/access/#service-accounts
[2]: https://app.datadoghq.com/monitors/manage
[3]: https://app.datadoghq.com/security/configuration/rules
