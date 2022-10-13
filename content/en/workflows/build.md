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
1. Click the pencil icon to update the workflow name. If desired, type a new name in the text box and click **Save**.
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

Context variables come in three varieties:
- A small collection of standard **workflow variables** are present in all workflows.
- Some steps come with built-in **step output variables** that allow you to pass data from that step to a subsequent step in your workflow.
- **Trigger variables** are passed into the workflow by the triggering event.

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

### Trigger variables

You can pass trigger variables into a workflow as inputs. Workflows accept a JSON object of comma-separated key-value pairs. Access a trigger variable in workflow steps using the syntax `{{ Trigger.key }}`. For example, to access the trigger variable `{ "user": "Bits" }`, use ` {{ Trigger.user }}` in the step.

- If you add a trigger variable that doesn't exist, the variable is automatically added as a workflow input.
- If you're not sure what variable you're looking for, Datadog suggests existing steps as you type. Alternatively, you can consult the [Context Variables](#context-variables) tab for a list of available variables.

{{< img src="workflows/add-trigger-variable.mp4" alt="Adding a trigger variable to a step automatically adds it to the workflow" video="true" >}}

For more information on triggering workflows, see [Trigger a workflow][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/workflow
[2]: /workflows/trigger
