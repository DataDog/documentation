---
title: Build Workflows
kind: documentation
disable_toc: false
---

To build a workflow, navigate to the [Workflows page][1] under **Integrations**. The Workflows page lists existing workflows together with each workflow's author and the dates that each workflow was last modified and executed. Hover over a workflow for the options to delete or clone the workflow. Toggle **My workflows** if you want to see only workflows that you crated. 

## Create a workflow

To create a workflow, click **New workflow**, enter a name for the workflow, and click **Create**. You can build your workflow out by dragging steps into the workflow canvas, or use JSON.

### Build a workflow with the workflow builder

1. Click an integration in the catalog pane and drag the desired step onto the workflow canvas. You can also search for a step using the search bar.
{{< img src="workflows/add-step.mp4" alt="Drag a step onto the workflow canvas" video="true"  >}}
1. Click on the step in the workflow canvas to configure it or view its outputs or context variables. For more information on outputs and context variables, see [Using context variables](#context-variables).
1. After you're done configuring the step, drag another step onto the workflow canvas to continue building out your workflow, or save the workflow if you're done.

You can edit a step in the workflow at any time by clicking on it.

### Build a workflow with JSON

After you've created a workflow, you can build or edit it in JSON by clicking **Edit JSON Spec**. The JSON editor also allows you to:
- **Format JSON**: Beautify your JSON.
- **Export JSON**: Download the workflow.

A typical workflow contains three top-level keys:
- `"steps"`: An array of "step" objects. Each step defines an step in the workflow and includes a name, the action ID, and the step parameters. The `steps` object also includes a key for outbound connection data.  
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

Creating useful workflows sometimes necessitates passing data from one step to another, or configuring steps that act on data that comes from the workflow's trigger source. You can perform this kind of data interpolation with context variables.

Context variables come in three varieties:
- A small collection of standard **workflow variables** are present in all workflows. 
- **Step output variables** are built into some steps and allow you to pass data from that step to a subsequent step in your workflow.
- - **Trigger variables** are passed into the workflow by the triggering event.

The **Context Variables** tab for each step provides a map of all context variables available to that step.

{{< img src="workflows/context-variables.png" alt="The Context Variables tab" >}}

Access a context variable by enclosing it in double braces (`{{`). You can use a context variable in fields marked with the `{{` notation.
{{< img src="workflows/use-context-variable.mp4" alt="Use double fences in a supported text field to insert a context variable" video="true" >}}

### Workflow variables

All workflows have three standard variables:
- `WorkflowName`: The name of the workflow. Accessed with `{{ WorkflowName }}`.
- `WorkflowId`: The workflow ID. Accessed with `{{ WorkflowId }}`.
- `InstanceId`: Each workflow run receives a unique instance ID. Access the instance ID with `{{ InstanceId }}`.

### Step output variables

Some steps create outputs that are available to subsequent steps in a workflow. You can access a step variable with the syntax: `Steps.<step_name>.<variable>`. For example, to retrieve the pull request status variable (`state`) from the GitHub pull request status step (`Get_pull_request_status`), you'd use the following context variable:

```
{{ Steps.Get_pull_request_status.state }}
```

### Trigger variables

You can pass trigger variables into a workflow as inputs. Workflows accept a JSON object of comma-separated key-value pairs. You can access a trigger variable in your workflow steps using the syntax `{{ Trigger.key }}`. For example, to access the trigger variable `{ "user": "Bits" }`, use ` {{ Trigger.user }}` in your step.

If you add a trigger variable that doesn't exist, the variable is automatically added as a workflow input.

{{< img src="workflows/add-trigger-variable.mp4" alt="Adding a trigger variable to a step automatically adds it to the workflow" video="true" >}}

## Fallback on errors

TODO: Something about heading to triggers next

[1]: https://app.datadoghq.com/workflow
