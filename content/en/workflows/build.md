---
title: Build Workflows
kind: documentation
disable_toc: false
further_reading:
- link: "/workflows/actions_catalog"
  tag: "Documentation"
  text: "Browse the available actions in the Actions Catalog"
---

You can create workflows or edit existing workflows from the [**Workflows** page][1] in Datadog. The Workflows page lists existing workflows together with each workflow's author and the dates that each workflow was last modified and executed.
- Hover over a workflow for the options to delete or clone the workflow.
- Toggle **My workflows** if you want to see only workflows that you created.

## Build a workflow from a blueprint

1. Click the **Blueprints** tab.
1. If desired, use the search bar to narrow the list of blueprints by name, category, or integration.
1. Find the blueprint you would like to use, and click on it. The workflow canvas appears.
1. Click the pencil icon (**Edit**) to update the workflow name. If desired, type a new name in the text box and click **Save**.
1. Workflow steps that require updates are marked with exclamation mark icons.
1. Click on each workflow step you would like to modify and fill in any empty fields on the **Configure** tab.
1. When you are finished modifying the workflow, click **Create From Blueprint**. The workflow canvas updates to show your newly created workflow.

## Create a custom workflow

To create a workflow:
1. Click **New workflow**.
1. Enter a name for the workflow, and click **Create**.
1. Click **Add a step to get started** to start adding steps to your workflow. Alternatively, click **Edit JSON Spec** if you want to build a workflow using the JSON editor.

### Build a workflow with the workflow builder

1. Click **Add a step to get started** to add the first step to your workflow.
1. Search for an action using the search bar or browse through the integrations and their related actions to find the action you're looking for. Click an action to add it as a step on your workflow canvas.
{{< img src="workflows/workflow-builder.mp4" alt="Drag a step onto the workflow canvas" video="true"  >}}
1. Click on the step in the workflow canvas to configure it or view its outputs or context variables. For more information on outputs and context variables, see [Context variables](#context-variables).
1. After you've configured the step, click the plus (`+`) icon to add another step, or save the workflow if you're done.

You can edit a step in the workflow at any time by clicking on it. Click and drag steps on your workflow to rearrange them.

### Build a workflow with JSON

Build or edit a workflow in JSON by clicking **Edit JSON Spec** on your workflow page. The JSON editor also allows you to:
- **Format JSON**: Beautify your JSON.
- **Export JSON**: Download the workflow.

A typical workflow contains three top-level keys:
- `"steps"`: An array of "step" objects. Each step defines a step in the workflow and includes a name, the action ID, and the step parameters. The `steps` object also includes a key for outbound connection data.
- `"startStepName"`: The name of the first step in the workflow.
- `"connectionEnvs"`: Connection data and environment variables.

An example of a workflow with a single step that sends a message to a Slack channel named `#workflows-test`:

{{< code-block lang="json" collapsible="true" filename="Example workflow" >}}
{
    "steps": [
        {
            "outboundConnections": [],
            "name": "Send_message",
            "actionId": "com.datadoghq.slack.send_simple_message",
            "parameters": [
                {
                    "name": "teamId",
                    "value": "ABC1234"
                },
                {
                    "name": "channel",
                    "value": "#workflows-test"
                },
                {
                    "name": "mentionTargets",
                    "value": [
                        "@Bits"
                    ]
                },
                {
                    "name": "text",
                    "value": "Hello world!"
                }
            ]
        }
    ],
    "startStepName": "Send_message",
    "connectionEnvs": [
        {
            "env": "default",
            "connections": []
        }
    ]
}
{{< /code-block >}}

## Context variables

Creating useful workflows sometimes necessitates passing data from one step to another, or configuring steps that act on data from the workflow's trigger source. You can perform this kind of data interpolation with context variables.

Context variables come in the following varieties:
- A small collection of standard **workflow variables** are present in all workflows.
- Some steps come with built-in **step output variables** that allow you to pass data from that step to a subsequent step in your workflow.
- **Trigger variables** are passed into the workflow by the triggering event.
- **Source object variables** are passed into the workflow by the triggering event.

The **Context Variables** tab for each step provides a map of all context variables available to that step.

{{< img src="workflows/context-variables.png" alt="The Context Variables tab" >}}

Access a context variable in a step by enclosing it in double braces (`{{`). Context variables are available in fields marked with the `{{` notation.
{{< img src="workflows/use-context-variable.mp4" alt="Use double fences in a supported text field to insert a context variable" video="true" >}}

### Workflow variables

All workflows have three standard variables:
- `WorkflowName`: The name of the workflow. Accessed with `{{ WorkflowName }}`.
- `WorkflowId`: The workflow ID. Accessed with `{{ WorkflowId }}`.
- `InstanceId`: Each workflow run receives a unique instance ID. Access the instance ID with `{{ InstanceId }}`.

### Step output variables

Some steps create outputs that are available to subsequent steps in a workflow. Access a step variable with the syntax: `Steps.<step_name>.<variable>`. For example, to retrieve the pull request status variable (`state`) from the GitHub pull request status step (`Get_pull_request_status`), you'd use the following context variable:

```
{{ Steps.Get_pull_request_status.state }}
```

If you're not sure what variable you're looking for, Datadog suggests existing steps as you type. Alternatively, you can consult the [Context Variables](#context-variables) tab for a list of available variables.

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

{{< img src="workflows/input-parameter.png" alt="Adding an input parameter to a step automatically adds it to the workflow" style="width:100%;">}}

The **Input Parameters** section displays the names of all existing input parameters together with a counter. Hover over a counter to see which steps are using the parameter.

You can add an implicit input parameter (a parameter that doesn't already exist in the workflow) by typing it into a workflow step using the `{{ Trigger.<parameter name> }}` syntax. The next time you save the workflow, a dialog appears allowing you to convert the parameter to an explicit parameter. For more information on triggering workflows, see [Trigger a workflow][2].

If you're looking for an existing input parameter, start typing `{{ Trigger.` to see if it appears as a suggestion. Alternatively, consult the [Context Variables](#context-variables) tab for a list of available parameters.

### Source object variables

Source object variables are properties of the triggering event that are resolved at execution. The variables available in the workflow depend on the type of trigger that initiated the workflow instance. For example, if the workflow instance is triggered by a monitor, the monitor ID variable is available using `{{Source.monitor.id}}`. If the workflow is triggered by a security signal detection or notification rule, the signal ID is available using `{{Source.securitySignal.id}}`.

All the variables of the Source object are visible in the Context Variables tab.

{{< img src="workflows/context-variables-tab-source-object-variables.png" alt="The Source object variables in the Context Variables tab" >}}

## Error handling and fallbacks

In the event that a step fails, you can specify the number of times you want your workflow to retry the step and at what interval, before moving on to an optional fallback step. If no fallback step is provided, the workflow terminates after all retries have been exhausted.

To configure error handling for a step:
1. Click on the step in the workflow canvas.
1. Click the **+** icon next to the **Error Handling & Retries** section.
1. Adjust the **Interval** and **Max retries** values.
1. Optionally, [add a fallback step](#add-a-fallback).
1. Save your workflow to apply the changes.

{{< img src="workflows/error-handling.png" alt="The Error Handling and Retries section" style="width:100%;" >}}

### Add a fallback

To handle a step failure, you can add a downstream workflow step as a fallback by selecting it from the **Fallback** dropdown menu.

Alternatively, you can create a fallback step that branches from the main workflow tree:
1. From the **Fallback** dropdown menu, select **Add a new fallback**. The workflow canvas is replaced with a fallback tree.
1. Click the **+** icon on the fallback tree to add a step.
1. [Add steps using the workflow builder](#build-a-workflow-with-the-workflow-builder). You can add as many steps as needed to the fallback tree.
1. When you're done configuring your fallback steps, click **Save** to apply your changes.

To get back to the main workflow canvas, click **Main** above the fallback tree. From the workflow canvas, a fallback icon appears next to steps with a fallback. Click the icon and select the fallback step to open the fallback tree. Alternatively, you can access the fallback tree by clicking **Edit Fallback Tree** in the **Error Handling & Retries** section of a step. The **Edit Fallback Tree** button only appears if the fallback step is not an existing downstream step in the main workflow.

{{< img src="workflows/fallback-icon.png" alt="A step with a fallback" style="width:60%;" >}}

### Remove a fallback

1. From the main workflow canvas, click on the step with the fallback you wish to remove.
1. In the **Error Handling & Retries** section, click **Clear**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/workflow
[2]: /workflows/trigger
