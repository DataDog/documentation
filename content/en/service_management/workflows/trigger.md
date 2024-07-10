---
title: Trigger a workflow
disable_toc: false
algolia:
  tags: ['workflow', 'workflows', 'workflow automation']
aliases:
- /workflows/trigger
further_reading:
- link: "/getting_started/workflow_automation/"
  tag: "Documentation"
  text: "Getting Started with Workflow Automation"
- link: "/service_management/workflows/access/#service-accounts/"
  tag: "Documentation"
  text: "Find out more about Service Accounts for workflows"
- link: "dashboards"
  tag: "Documentation"
  text: "Find out more about setting up a dashboard"
- link: "/security"
  tag: "Documentation"
  text: "Find out more about Security Signals"
- link: "monitors"
  tag: "Documentation"
  text: "Find out more about Monitors"
- link: "/security/cloud_security_management/workflows"
  tag: "Documentation"
  text: "Automate Security Workflows with Workflow Automation"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workflow Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

You can trigger a workflow manually or automatically and a workflow can have multiple triggers. This allows you to trigger a workflow from a variety of different sources, like a Datadog monitor and a Datadog dashboard.

A workflow can either run with the identity of the user who owns it, or with the identity of a service account associated with the workflow. For more information on service accounts, see [Service accounts for Workflow Automation][1].

{{< img src="service_management/workflows/multiple-triggers.png" alt="A workflow with multiple triggers" style="width:100%;" >}}

## Manual triggers

To trigger a workflow manually:
1. From the workflow page, click **Run**.
1. Enter the values for existing trigger variables.
1. When you're ready to run the workflow, click **Save & Run**.

## Dashboard triggers

To trigger a workflow from a dashboard, add the **Run Workflow** widget:
1. From your dashboard, click **Add Widget**.
1. Search for `workflows` and add the **Run Workflow** widget.
1. Under **Select the workflow**, find your workflow in the dropdown menu. Only published workflows with dashboard triggers appear in the list.
1. Map dashboard template variables to workflow input parameters. This allows the values of your dashboard template variables to be mapped directly to the input parameters when you run the workflow.
1. Enter a title for the widget and click **Save**.

To run the workflow:
1. Click **Run Workflow** on your dashboard widget.
1. Under **Execution parameters**, any template variables you mapped to workflow inputs are automatically populated. Enter the values for any unmapped execution parameters, or edit the existing values if needed.
1. Click **Run** to run the workflow.

## Monitor triggers

To trigger a workflow from a monitor, you must first add a monitor trigger to your workflow:
1. Add a monitor trigger to your workflow:
   - If your workflow doesn't have any triggers, click **Add Trigger** > **Monitor**.
   - If your workflow already has one or more triggers and you're adding the monitor as an additional trigger, click the **Add Trigger** (lightning bolt) icon and select **Monitor**.
1. Make sure the trigger is connected to a step in the workflow. You can connect the trigger to a step by clicking and dragging the plus icon (**+**) under the trigger.
1. Click the trigger and take note of the **Mention handle**.
1. Monitor triggers are set to trigger automatically by default. If you don't want the workflow to trigger automatically, toggle the **Automatic triggering** option.
1. Save your Workflow.
1. Click **Publish** to publish your workflow. Workflows don't run automatically until you've published them. Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][11].

Add the workflow to your monitor:
1. Navigate to the [**Monitors** page][2] in Datadog.
1. Find the monitor you'd like to use to trigger the workflow and edit it, or create a new monitor.
1. In the **Configure notifications & automations** section, click **Add Workflow**.
1. Use the workflow mention name to search for your workflow and select it from the drop-down. Only workflows with monitor triggers appear in the list.
1. Optionally, to pass trigger variables into the workflow, use a comma-separated list with the syntax `@workflow-name(key=value, key=value)`. For example, `@workflow-my-workflow(name="Bits", alert_threshold=threshold)`
1. Save the monitor.

Each time the monitor threshold is hit, the monitor triggers a workflow run.

### Test a monitor trigger

You can test a monitor trigger during workflow creation. Testing a monitor generates a snippet that you can paste into your monitor notification window to trigger the workflow.

To test a monitor trigger:
1. Select the monitor trigger action in your workflow.
1. Click **Test from Monitor**.
1. If your monitor passes inputs to the workflow, enter a test value under **Workflow Inputs**.
1. Select a monitor to test.
1. Select a monitor state.
1. Click **Run From Monitor**.

## Incident triggers

To trigger a workflow from an incident notification rule, you must first add an incident trigger to your workflow:
1. Add an incident trigger to your workflow:
   - If your workflow doesn't have any triggers, click **Add Trigger** > **Incident**.
   - If your workflow already has one or more triggers and you're adding the security trigger as an additional trigger, click the **Add Trigger** (lightning bolt) icon and select **Incident**.
1. Make sure the trigger is connected to a step in the workflow. You can connect the trigger to a step by clicking and dragging the plus icon (**+**) under the trigger.
1. Click the trigger and take note of the **Mention handle**.
1. Incident triggers are set to trigger automatically by default. If you don't want the workflow to trigger automatically, toggle the **Automatic triggering** option.
1. Save your Workflow.
1. Click **Publish** to publish your workflow. Workflows don't run automatically until you've published them. Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][11].

Add the workflow to your incident notification rule:
1. [Incidents Settings][6] page, select **Rules**.
1. Click **New Rule**.
1. Configure a **Severity**, **Service**, and **Other attributes** for your notification rule.
1. Under **Notify**, paste the workflow handle that you copied earlier.
1. In the **Recipient** section, use the workflow mention name to find your workflow. For example, `@workflow-my-workflow`. The workflow must have an incident trigger before you can trigger it from an incident.
1. Enter a **Template** and configure the **Renotify** settings for the notification rule.
1. Click **Save**.

## Security Signal triggers

You can trigger a workflow automatically for any Security Signal, or manually trigger a Workflow from a Cloud SIEM Security Signal panel. Before you can add a workflow to a Security Signal, the workflow must have a security trigger.

### Security Signal Notification Rule triggers

You can set up a workflow to trigger every time a Security Signal Notification Rule fires.

To trigger a workflow from a notification rule, you must first add a security trigger to your workflow:
1. Add a security trigger to your workflow:
   - If your workflow doesn't have any triggers, click **Add Trigger** > **Security**.
   - If your workflow already has one or more triggers and you're adding the security trigger as an additional trigger, click the **Add Trigger** (lightning bolt) icon and select **Security**.
1. Make sure the trigger is connected to a step in the workflow. You can connect the trigger to a step by clicking and dragging the plus icon (**+**) under the trigger.
1. Click the trigger and take note of the **Mention handle**.
1. Security triggers are set to trigger automatically by default. If you don't want the workflow to trigger automatically, toggle the **Automatic triggering** option.
1. Save your workflow.
1. Click **Publish** to publish your workflow. Workflows don't run automatically until you've published them. Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][11].

Add the workflow to your notification rule:
1. From the [Configuration][3] page, find the notification rule you'd like to use to trigger your workflow, or create a new rule.
1. In the **Recipient** section, use the workflow mention name to find your workflow. For example, `@workflow-my-workflow`.
1. Select the workflow from the drop-down. Only workflows with security triggers appear in the list.
1. Click **Save**.

{{< img src="service_management/workflows/notification-rule-trigger2.png" alt="Add the workflow name to the recipient section of a Notification rule" >}}

Each time the notification rule fires, it triggers a workflow run.

### Cloud SIEM Security Signal triggers

You can manually start a workflow from a Cloud SIEM Security Signal panel.

1. Click **Run Workflow** at the top of the **Security Signal** panel.
1. In the search modal, enter the name of the workflow you want to run and select it. Only workflows with security triggers appear in the list.
1. If your workflow requires input parameters, enter the values as required. You can copy the values from the Signal object JSON displayed next to the input parameters, and paste them into the parameter fields.
1. Click **Run**.
1. You can see the workflow run status in the **Workflow** section of the Security Signal.

For additional examples of security workflows you can automate, see [Automate Security Workflows with Workflow Automation][4].

## API triggers

{{< callout btn_hidden="true" header="false" >}}
API triggers are in private beta.
{{< /callout >}}

Triggering a workflow using an API call requires an [API key][8] and an [application key][9] with the `workflows_run` scope. For information on adding a scope to an application key, see [Scopes][10].

<div class="alert alert-info">Unscoped keys do not include the <code>workflows_run</code> scope by default. Ensure that you're following security best practice and use an application key with the minimum scopes needed to perform the desired task.</div>

You can trigger a workflow by sending a POST request with the workflow ID to the endpoint `https://api.datadoghq.com/api/v2/workflows/WORKFLOW-ID/instances`. When you add an API trigger to a workflow, the trigger interface gives you an example cURL request that you can use to trigger the workflow.

To add an API trigger to a workflow:
1. Click **Add Trigger** > **API**.
1. On the workflow canvas, click **API** and note the example workflow cURL request, which includes the required headers and data to trigger your workflow.

   A cURL request to trigger a workflow looks something like this:
   {{< code-block lang="shell" >}}
curl -X POST \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d {} \
  https://api.datadoghq.com/api/v2/workflows/32866005-d275-4553-be86-9f1b13066d84/instances
{{< /code-block >}}

   If the workflow includes input parameters, include them in the request payload. The following example uses two input parameters, `example_input1` and `example_input2`:

   {{< code-block lang="shell" >}}
curl -X POST \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d { "meta": { "payload": { \
    "example_input1": "...", \
    "example_input2": "..." \
  } } } \
  https://api.datadoghq.com/api/v2/workflows/32866005-d275-4553-be86-9f1b13066d84/instances
   {{< /code-block >}}
1. Click **Save**.
1. Click **Publish** to publish the workflow. A workflow must be published before you can trigger it with a POST request. Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][11].

## Scheduled triggers

To schedule a workflow run:
1. On the workflow canvas, click **Add an Automated Trigger** and select **Schedule**.
1. Click **Create** to create a service account. For more information, see [Use a service account][1].
1. Enter a time and frequency for the run.
1. (Optional) Enter a description for the workflow in the **Memo** field.
1. Click **Save**.
1. Click **Publish**. Scheduled workflows don't run until you've published them. Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][11].

## Trigger a workflow from a workflow

You can trigger a child workflow from another workflow using the **Trigger Workflow** action. For example, if you have a complex series of steps that you need to reuse in several workflows, there's no need to recreate those steps for all of your workflows. Instead, add the steps to a new workflow and trigger it in your other workflows using the Trigger Workflow action.

<div class="alert alert-info">For billing purposes, triggering a child workflow registers as a new workflow execution.</div>

If the child workflow has [input parameters][5], these parameters appear as required fields in the Trigger Workflow action. In the example below, the **service_name** input parameter is required because `service_name` is set as an input parameter in the child workflow.

{{< img src="service_management/workflows/trigger-workflow-step.png" alt="The service_name input parameter is required in the child workflow" style="width:100%;" >}}

## Run history

After you trigger a workflow, the workflow page switches to the workflow's **Run History**. Click **Configuration** or **Run History** in the top-left to switch between the configuration and run history views.

Use run history to watch the progress of a triggered workflow, or debug a failed step. Clicking on a failed step gives you the inputs, outputs, and execution context for the step, as well as the associated error message. The example below shows a failed _GitHub pull request status_ step. The error message shows that the step failed due to missing permissions:

{{< img src="service_management/workflows/failed-step4.png" alt="A workflow with a failed step." >}}

The initial run history for a workflow provides a panel with the list of previous workflow executions and whether each execution succeeded or failed. Failures include a link to the failed workflow step. Click on a workflow execution in the list to inspect it. You can return to the initial execution history at any time by clicking anywhere on the workflow canvas.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][7].

[1]: /service_management/workflows/access/#use-a-service-account
[2]: https://app.datadoghq.com/monitors/manage
[3]: https://app.datadoghq.com/security/configuration/notification-rules
[4]: /security/cloud_security_management/workflows
[5]: /service_management/workflows/build/#input-parameters
[6]: https://app.datadoghq.com/incidents/settings#Rules
[7]: https://datadoghq.slack.com/
[8]: /account_management/api-app-keys/#api-keys
[9]: /account_management/api-app-keys/#application-keys
[10]: /account_management/api-app-keys/#scopes
[11]: https://www.datadoghq.com/pricing/?product=workflow-automation#products