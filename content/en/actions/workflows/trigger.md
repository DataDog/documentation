---
title: Trigger a workflow
description: Learn how to trigger workflows manually or automatically from dashboards, monitors, security signals, and other sources.
disable_toc: false
algolia:
  tags: ['workflow', 'workflows', 'workflow automation']
aliases:
- /workflows/trigger
- /service_management/workflows/trigger
further_reading:
- link: https://www.datadoghq.com/blog/datadog-automation-rules
  tag: Blog
  text: Instantly respond to changes in your data with Datadog automation rules
- link: "/getting_started/workflow_automation/"
  tag: "Documentation"
  text: "Getting Started with Workflow Automation"
- link: "/actions/workflows/access_and_auth/#use-a-service-account"
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

### Add a monitor trigger to your workflow

1. Add a monitor trigger to your workflow:
   - If your workflow doesn't have any triggers, click **Add Trigger** > **Monitor**.
   - If your workflow already has one or more triggers and you're adding the monitor as an additional trigger, click the **Add Trigger** (lightning bolt) icon and select **Monitor**.
1. Make sure the trigger is connected to a step in the workflow. You can connect the trigger to a step by clicking and dragging the plus icon (**+**) under the trigger.
1. Click the trigger and take note of the **Mention handle**.
1. Monitor triggers are set to trigger automatically by default. If you don't want the workflow to trigger automatically, toggle the **Automatic triggering** option.
1. Save your Workflow.
1. Click **Publish** to publish your workflow. Workflows don't run automatically until you've published them. Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][11].

### Add the workflow to your monitor

1. Navigate to the [**Monitors** page][2] in Datadog.
1. Find the monitor you'd like to use to trigger the workflow and edit it, or create a new monitor.
1. In the **Configure notifications & automations** section, click **+ Add Workflow**.
1. Use the workflow mention name to search for your workflow and select it from the dropdown. Only workflows with monitor triggers appear in the list.<br>A mention for the monitor appears in the notification message field, in the format `@workflow-name` if it takes no input parameters or `@workflow-name(param="")` if it takes input parameters.
1. If the workflow takes input parameters:
    1. Click **Configure Inputs** next to the monitor name and ID.
        {{< img src="service_management/workflows/monitor-configure-inputs-arrow.png" alt="An attached workflow with a Configure Inputs link available" style="width:100%;" >}}
    1. Enter values for the input parameters.<br>**Note**: Values can include monitor message template variables. To see a list of available variables, click **Use Message Template Variables** in the upper-right of the **Configure notifications & automations** section.
    <br>The parameters populate in the mention within the notification message field.<br>For example, if you configure a workflow named `@workflow-test-inputs` to have the following parameters:
        {{< img src="service_management/workflows/monitor-configure-inputs-modal.png" alt="Configure Inputs panel with values set as follows: im_a_string to 'abc', im_a_number to 123, im_a_boolean toggled to true, and i_have_a_default_value to 'override this'" style="width:70%;" >}}
        the mention changes to `@workflow-test-inputs(im_a_string="abc", im_a_number=123, im_a_boolean=true, i_have_a_default_value="override this")`.
1. Save the monitor.

Each time the monitor threshold is reached, the monitor triggers a workflow run.

### Test a monitor trigger

See the test and debug page for information on [how to test a monitor trigger][12].

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

## Security triggers

You can trigger a workflow automatically for any Security Signal or Security Finding.
You can also manually trigger a Workflow from a Cloud SIEM Security Signal panel, a Misconfiguration panel or an Identity Risk panel.
Before you can add a workflow to a Security Signal or Finding, the workflow must have a security trigger.

### Security Notification Rule triggers

You can set up a workflow to trigger every time a Security Notification Rule fires, for both Security Signals and Security Findings.

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

### Manual trigger

You can manually start a workflow from a Cloud SIEM Security Signal panel, a Misconfiguration panel or an Identity Risk panel.

1. Click **Run Workflow** at the top of the **Security Signal** panel.
1. In the search modal, enter the name of the workflow you want to run and select it. Only workflows with security triggers appear in the list.
1. If your workflow requires input parameters, enter the values as required. You can copy the values from the Signal object JSON displayed next to the input parameters, and paste them into the parameter fields.
1. Click **Run**.
1. You can see the workflow run status in the **Workflow** section of the Security Signal.

For additional examples of security workflows you can automate, see [Automate Security Workflows with Workflow Automation][4].

## Software Catalog triggers

To run a workflow from a software catalog entity, you must first add a software catalog trigger to your workflow:

1. Add a software catalog trigger to your workflow:
   - If your workflow doesn't have any triggers, click **Add Trigger** > **Software Catalog**.
   - If your workflow already has one or more triggers and you're adding the software catalog as an additional trigger, click the **Add Trigger** (lightning bolt) icon and select **Software Catalog**.
2. Make sure the trigger is connected to a step in the workflow. You can connect the trigger to a step by clicking and dragging the plus icon (**+**) under the trigger.
3. Save your Workflow.
4. Click **Publish** to publish your workflow. Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][11].

Run the workflow from your Software Catalog entity:

1. On the [Software Catalog page][14], choose an entity from the list.
1. Click **Run Workflow** at the top of the side panel.
1. In the search modal, enter the name of the workflow you want to run and select it. Only workflows with Software Catalog triggers appear in the list.
1. If your workflow requires input parameters, enter the values as required.
1. Click **Run** to run the workflow.

## GitHub triggers

<div class="alert alert-info">Your GitHub account must have permission to create webhooks to use this feature.</div>

You can trigger a workflow from GitHub using the following steps.

1. Add a GitHub trigger to your workflow:
   - If your workflow doesn't have any triggers, click **Add Trigger > GitHub**.
   - If your workflow already has one or more triggers and you're adding GitHub as an additional trigger, click the **Add Trigger** (lightning bolt) icon and select **GitHub**.
1. Navigate to the GitHub repo you want to use to trigger your workflow.
1. In GitHub, click **Settings**, click **Webhooks**, and then click **Add webhook**.
1. In the **Configure** tab of your workflow, copy the **Payload URL**. Paste it into the **Payload URL** field on the GitHub webhook creation page.
1. In GitHub, set the **Content type** of your webhook to `application/json`.
1. In GitHub, create a secret that is at least 16 characters long, then copy this secret to the **Secret** field of your workflow trigger.
1. In GitHub, choose which events you would like to trigger your webhook, then click **Add webhook**.
1. _Optionally_, in your workflow, click the **plus** (+) to add a **Rate Limit**.
1. Click **Save** on your workflow.
1. Click **Publish** to publish the workflow. A workflow must be published before you can trigger it from GitHub. Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][11].

## Slack triggers

<div class="alert alert-info">You must install the Datadog App in your Slack workspace to use this feature. For more information, see <a href="/integrations/slack/?tab=datadogforslack#setup">Slack Setup</a>.</div>

<div class="alert alert-info"><strong>Quick start</strong>: Click to create a <a href="https://app.datadoghq.com/workflow/create?source=slack">workflow</a> with a Slack trigger.</div>

You can trigger a workflow from Slack using the following steps.

1. Add a Slack trigger to your workflow:
   - If your workflow doesn't have any triggers, click **Add Trigger** > **Slack**.
   - If your workflow already has one or more triggers and you're adding the Slack trigger as an additional trigger, click the **Add Trigger** (lightning bolt) icon and select **Slack**.
1. Make sure the trigger is connected to a step in the workflow. You can connect the trigger to a step by clicking and dragging the plus icon (**+**) under the trigger.
1. Click **Save** on your workflow.
1. Click **Publish** to publish the workflow. A workflow must be published before you can trigger it from Slack. Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][11].
1. In a Slack channel with the Datadog App, run `/datadog workflow` to select and run a workflow. You can also use the `/dd` alias to run /datadog commands.

## API triggers

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

### Access the result of a child workflow

You can pass the result of a child workflow back to the parent workflow by defining **Output parameters** in the child workflow. Use the `WorkflowOutputs` context variable in the parent workflow to retrieve the output parameters of the child workflow. For example, given a child workflow named `Example_workflow` with an output parameter named `exampleList`, use `Steps.Example_workflow.workflowOutputs.exampleList` to access the result of the child workflow.

## Run history

After you trigger a workflow, the workflow page switches to the workflow's **Run History**. Click **Configuration** or **Run History** in the top-left to switch between the configuration and run history views. Use run history to watch the progress of a triggered workflow or [debug a failed step][13].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][7].

[1]: /actions/workflows/access_and_auth/#use-a-service-account
[2]: https://app.datadoghq.com/monitors/manage
[3]: https://app.datadoghq.com/security/configuration/notification-rules
[4]: /security/cloud_security_management/workflows
[5]: /service_management/workflows/build/#input-parameters
[6]: https://app.datadoghq.com/incidents/settings#Rules
[7]: https://chat.datadoghq.com/
[8]: /account_management/api-app-keys/#api-keys
[9]: /account_management/api-app-keys/#application-keys
[10]: /account_management/api-app-keys/#scopes
[11]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[12]: /service_management/workflows/test_and_debug/#test-a-monitor-trigger
[13]: /service_management/workflows/test_and_debug/#debug-a-failed-step
[14]: https://app.datadoghq.com/software
