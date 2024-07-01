---
title: Build workflows
kind: documentation
disable_toc: false
aliases:
- /workflows/build
algolia:
  tags: [workflow, workflows, workflow automation]
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Getting Started with Workflow Automation
- link: /service_management/workflows/actions_catalog
  tag: Documentation
  text: Browse the available actions in the Actions Catalog
- link: /security/cloud_security_management/workflows
  tag: Documentation
  text: Automate Security Workflows with Workflow Automation
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
1. Enter a new name and description for the workflow.
1. Optionally, select or enter tags you'd like to apply to the workflow. For more information on Datadog tags, see [Getting Started with Tags][7].
1. Optionally, select any related [services][8] to apply to the workflow.
1. Optionally, select [teams][9] to associate with the workflow. If a team doesn't exist, you can enter a name to create it.
1. Click **Save** to apply your changes.
1. Workflow steps that require updates are marked with exclamation marks. Click on each workflow step you'd like to modify and fill in any empty fields on the **Configure** tab.
1. When you are finished modifying the workflow, Click **Run** to test your workflow.
1. When you're ready to publish your workflow, click **Publish**. Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][4].

## Create a workflow with AI

{{< callout url="https://docs.google.com/forms/d/14Heybl3cLHuyxl1XpsGrEoWvc1TPA2DVLeS7S0wgIRI" btn_hidden="false" header="Join the beta!">}}
AI functionality for Workflow Automation is in private beta.
{{< /callout >}}

If you're not sure where to start, you can automatically generate a workflow with AI. To generate a workflow:

1. From the [Workflow Automation][1] page, click **New Workflow**.
1. Click **Auto Generate**.
1. Enter a detailed description for your workflow. Specify the integrations and actions you'd like to use.
1. Click the up arrow (**↑**) to create your app.

## Create a custom workflow

To create a workflow, click **New workflow** on the [Workflow Automation][1] page.

To configure your workflow:
1. In the workflow configuration panel, enter a **Name** for your workflow.
1. Optionally, select or enter tags you'd like to apply to the workflow. For more information on Datadog tags, see [Getting Started with Tags][7].
1. Optionally, select any related [services][8] to apply to the workflow.
1. Optionally, select [teams][9] to associate with the workflow. If a team doesn't exist, you can enter a name to create it.
1. Enter input or output parameters if your workflow uses them.
1. Click **Save** to apply your changes.

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

## Workflow notifications

You can configure your workflow to send you a notification on success or failure. The following integrations are supported:
- Slack
- Microsoft Teams
- PagerDuty
- Email

To add a notification:
1. In the workflow configuration panel, scroll down to the **Notifications** section.
1. To add a notification if the workflow succeeds:
   1. Click the plus (`+`) icon next to **Notify on success**.
   1. Select the integration that you want to use for notifications.
   1. Complete the required fields for the specified integration.
   1. Click **Save** to save your workflow.
1. To add a notification if the workflow fails:
   1. Click the plus (`+`) icon next to **Notify on failure**.
   1. Select the integration that you want to use for notifications.
   1. Complete the required fields for the specified integration.
   1. Click **Save** to save your workflow.

## Error handling

You can specify the number of times you want your workflow to retry a failed step, and at what interval, before moving on to an optional error path. If no error path is present, the workflow terminates after all retries are exhausted.

### Retries

To configure retries for a step:
1. Click on the step in the workflow canvas.
1. In the **Retries** section, adjust the **Interval** and **Max retries** values.
1. Save your workflow to apply the changes.

### Add an error path

You can add an error path for the workflow to follow if it encounters an error.

To add an error path:
1. Hover over the step where you'd like to add an error path.
1. Click and drag the **Error path** icon to place a new error path on the canvas.
1. Select a workflow step to add to the error path.
1. After configuring your step, you can add more steps to an error path and even merge your error path back into the main workflow path.
1. When you're done configuring your error path steps, click **Save** to apply your changes.

{{< img src="service_management/workflows/error-path1.mp4" alt="Add an error path to your workflow" video=true >}}

## Wait until condition

Some actions allow you to add a condition that must be met before a workflow can mark a step as complete and continue.

To add a condition:
1. Click on the step in the workflow canvas.
1. In the **Wait until condition** section, use the dropdown to select a preconfigured condition, or select **Configure custom wait condition** and build your own conditional.
   - The list of available preconfigured conditions depends on the action.
   - Conditional statement variables can be either a String, a Number, a Boolean, or a step output variable.
   - Only the current step's output variables can be used in a custom conditional statement.
1. Enter a maximum wait time for the workflow. If the condition is not met in time, the step fails.

{{< img src="service_management/workflows/wait-until-condition.png" alt="An example of wait until condition" style="width:100%;" >}}

## Edit a workflow with JSON

Edit a workflow in JSON by clicking **Edit JSON Spec** on your workflow page. The JSON editor also allows you to:
- **Format JSON**: Beautify your JSON.
- **Export JSON**: Download the workflow.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][10].

[1]: https://app.datadoghq.com/workflow
[2]: https://handlebarsjs.com/guide/expressions.html#expressions
[3]: /service_management/workflows/trigger
[4]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[5]: https://app.datadoghq.com/workflow/blueprints
[6]: /service_management/workflows/actions_catalog/generic_actions/#testing-expressions-and-functions
[7]: /getting_started/tagging/
[8]: /glossary/#service
[9]: /account_management/teams/
[10]: https://datadoghq.slack.com/

