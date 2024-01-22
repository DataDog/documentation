---
title: Build workflows
kind: documentation
disable_toc: false
aliases:
- /workflows/build
algolia:
  tags: ['workflow', 'workflows', 'workflow automation']
further_reading:
- link: "/getting_started/workflow_automation/"
  tag: "Documentation"
  text: "Getting Started with Workflow Automation"
- link: "/service_management/workflows/actions_catalog"
  tag: "Documentation"
  text: "Browse the available actions in the Actions Catalog"
- link: "/security/cloud_security_management/workflows"
  tag: "Documentation"
  text: "Automate Security Workflows with Workflow Automation"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workflow Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

You can create workflows or edit existing workflows from the [Workflow Automation][1] page. The page lists information about existing workflows, such as the workflow's owner, the trigger type, the dates that each workflow was last modified and executed, and whether the workflow is published or not.
- Hover over a workflow for the options to delete, clone, or edit the permissions for the workflow.
- Toggle **My workflows** if you want to see only workflows that you created.

## Build a workflow from a blueprint

1. Click the [**Blueprints**][5] tab.
1. If desired, use the search bar to narrow the list of blueprints by name, category, or integration.
1. Find the blueprint you'd like to use, and click on it. The workflow canvas appears.
1. Click **Create From Blueprint**. The workflow canvas updates to show your newly created workflow.
1. Enter a new name and description for the workflow and click **Save**.
1. Workflow steps that require updates are marked with exclamation marks. Click on each workflow step you'd like to modify and fill in any empty fields on the **Configure** tab.
1. When you are finished modifying the workflow, Click **Run** to test your workflow.
1. When you're ready to publish your workflow, click **Publish**. Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][4].

## Create a workflow with AI

<div class="alert alert-info">Auto Generate is in beta.</a></div>

If you're not sure where to start, you can automatically generate a workflow with AI. To generate a workflow:

1. From the [Workflow Automation][1] page, click **New Workflow**.
1. Click **Auto Generate**.
1. Enter a detailed description for your workflow. Specify the integrations and actions you'd like to use.
1. Click the up arrow (**↑**) to create your app.

## Create a custom workflow

To create a workflow, click **New workflow** on the [Workflow Automation][1] page.

To configure your workflow:
1. In the workflow configuration panel, enter a **Name** for your workflow.
1. Select relevant **Tags**, **Services**, or **Teams**.
1. Enter input or output parameters if your workflow uses them.

If you're not sure about your workflow configuration, you can return to the panel later by clicking anywhere on the workflow canvas.

### Build a workflow with the workflow builder

1. If your workflow requires a trigger, click **Add Trigger**. For more information, see [Trigger a Workflow][3].
1. Click **Add Step** to start adding steps to your workflow.
1. Search for an action using the search bar or browse through the integrations and their related actions to find the action you're looking for. Click an action to add it as a step on your workflow canvas.
1. Click on the step in the workflow canvas to configure it or view its outputs or context variables. For more information on outputs and context variables, see [Context variables](#context-variables).
1. After you've configured the step, click the plus (`+`) icon to add another step, or save the workflow if you're done.
1. When you're ready to publish your workflow, click **Publish**. Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][4].

You can edit a step in the workflow at any time by clicking on it. Click and drag steps on your workflow to rearrange them.

## Test a step

To ensure a step functions as desired without having to run the entire workflow, you can test the step independently.

To test a workflow step:
1. Click **Test** in the step **Inputs** section.
1. Optionally, adjust the step configuration. If your step uses output variables from a previous step, enter some hardcoded test data for the step to use.
1. Click **Test** to test the action.
1. When you're finished testing the step, click **Use in configuration** to use your new configuration in the workflow, or close the screen to return to the workflow without saving your test configuration.

Testing is not available for branching and logic actions. To test a JavaScript function or expression action that uses output variables from a previous step, comment out the variables in your code and replace them with test data. For more information, see [Testing expressions and functions][6].

## Publish a workflow

Scheduled and triggered workflows don't trigger automatically until you've published them. To publish the workflow, click **Publish** from the workflow's page.

Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][4].

## Context variables

Creating useful workflows sometimes necessitates passing data from one step to another, or configuring steps that act on data from the workflow's trigger source. You can perform this kind of data interpolation with context variables.

- **Workflow variables** give you information about the current workflow:
    - `WorkflowName`: The name of the workflow.
    - `WorkflowId`: The ID of the workflow.
    - `InstanceId`: The ID of the execution instance of the workflow.
- Some steps come with built-in **step output variables** that allow you to pass data from that step to a subsequent step in your workflow.
- **Trigger variables** are passed into the workflow by the triggering event.
- **Source object variables** are passed into the workflow by the triggering event.

The **Context Variables** tab for each step provides a map of all context variables available to that step.

{{< img src="service_management/workflows/context-variables4.png" alt="The Context Variables tab" >}}

Access a context variable in a step by enclosing it in double braces (`{{`). To access fields within context variables, use [Handlebars expression syntax][2].

### Step output variables

Some steps create outputs that are available to subsequent steps in a workflow. Access a step variable with the syntax: `Steps.<step_name>.<variable>`. For example, to retrieve the pull request status variable (`state`) from the GitHub pull request status step (`Get_pull_request_status`), you'd use the following context variable:

```
{{ Steps.Get_pull_request_status.state }}
```

If you're not sure what variable you're looking for, Datadog suggests existing step outputs as you type. Alternatively, you can consult the [Context Variables](#context-variables) tab for a list of available variables.

{{< img src="service_management/workflows/step-outputs1.png" alt="Datadog suggests existing step outputs as you type." style="width:100%;" >}}

### Input parameters

Use input parameters to pass data into a workflow. You can use input parameters in workflows that:
- are triggered manually, such as from a Dashboard.
- use mention triggers, such as Monitors and Security Signal Notification Rules.

To add an input parameter:
1. Click on the workflow canvas.
1. Click the **+** icon next to **Input Parameters**.
1. Add a parameter name, data type, and description for the parameter. The display name is generated automatically from the parameter name. Check the **Use custom display name** box to customize it. The display name is a human readable name for the parameter, while the parameter name is used to reference the parameter in your workflow steps.
1. Optionally, add a default value for the parameter. If you add a default value, the parameter is optional at runtime.

To reference the input parameter in a step, use the syntax `{{ Trigger.<parameter name>}}`. For example, to reference an input parameter named `user`, use `{{Trigger.user}}`.

{{< img src="service_management/workflows/input-parameter2.png" alt="Adding an input parameter to a step automatically adds it to the workflow" style="width:100%;">}}

The **Input Parameters** section displays the names of all existing input parameters together with a counter. Hover over a counter to see which steps are using the parameter.

You can add an implicit input parameter (a parameter that doesn't already exist in the workflow) by typing it into a workflow step using the `{{ Trigger.<parameter name> }}` syntax. The next time you save the workflow, a dialog appears allowing you to convert the parameter to an explicit parameter. For more information on triggering workflows, see [Trigger a workflow][3].

If you're looking for an existing input parameter, start typing `{{ Trigger.` to see if it appears as a suggestion. Alternatively, consult the [Context Variables](#context-variables) tab for a list of available parameters.

### Source object variables

Source object variables are properties of the triggering event that are resolved at execution. The variables available in the workflow depend on the type of trigger that initiated the workflow instance. For example, if the workflow instance is triggered by a monitor, the monitor ID variable is available using `{{Source.monitor.id}}`. If the workflow is triggered by a security signal detection or notification rule, the signal ID is available using `{{Source.securitySignal.id}}`.

All the variables of the Source object are visible in the Context Variables tab.

{{< img src="service_management/workflows/context-variables-tab-source-object-variables.png" alt="The Source object variables in the Context Variables tab" >}}

## Error handling and fallbacks

In the event that a step fails, you can specify the number of times you want your workflow to retry the step and at what interval, before moving on to an optional fallback step. If no fallback step is provided, the workflow terminates after all retries have been exhausted.

To configure error handling for a step:
1. Click on the step in the workflow canvas.
1. Click the **+** icon next to the **Error Handling & Retries** section.
1. Adjust the **Interval** and **Max retries** values.
1. Optionally, [add a fallback step](#add-a-fallback).
1. Save your workflow to apply the changes.

{{< img src="service_management/workflows/error-handling1.png" alt="The Error Handling and Retries section" style="width:100%;" >}}

### Add a fallback

To handle a step failure, you can add a downstream workflow step as a fallback by selecting it from the **Fallback** dropdown menu.

Alternatively, you can create a fallback step that branches from the main workflow tree:
1. From the **Fallback** dropdown menu, select **Add a new fallback**. The workflow canvas is replaced with a fallback tree.
1. Click the **+** icon on the fallback tree to add a step.
1. [Add steps using the workflow builder](#build-a-workflow-with-the-workflow-builder). You can add as many steps as needed to the fallback tree.
1. When you're done configuring your fallback steps, click **Save** to apply your changes.

To get back to the main workflow canvas, click **Main** above the fallback tree. From the workflow canvas, a fallback icon appears next to steps with a fallback. Click the icon and select the fallback step to open the fallback tree. Alternatively, you can access the fallback tree by clicking **Edit Fallback Tree** in the **Error Handling & Retries** section of a step. The **Edit Fallback Tree** button only appears if the fallback step is not an existing downstream step in the main workflow.

{{< img src="service_management/workflows/fallback-icon2.png" alt="A step with a fallback" style="width:60%;" >}}

### Remove a fallback

1. From the main workflow canvas, click on the step with the fallback you wish to remove.
1. In the **Error Handling & Retries** section, click **Clear**.

### Edit a workflow with JSON

Edit a workflow in JSON by clicking **Edit JSON Spec** on your workflow page. The JSON editor also allows you to:
- **Format JSON**: Beautify your JSON.
- **Export JSON**: Download the workflow.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/workflow
[2]: https://handlebarsjs.com/guide/expressions.html#expressions
[3]: /service_management/workflows/trigger
[4]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[5]: https://app.datadoghq.com/workflow/blueprints
[6]: /service_management/workflows/actions_catalog/generic_actions/#testing-expressions-and-functions

