---
title: Build Workflows
kind: documentation
disable_toc: false
---
<!--
- Create Workflow
  - P1 (In dev) Build Workflows with OOTB Templates 
  - P1 Build Workflows through Workflow Builder 
  - P3 Build Workflows in JSON 
  - P1 Inputs, outputs and context variables (Or Passing data between actions) 
- P2 Edit Workflows 
- P2 Delete Workflows 
- Triggering your Workflows
  - P1 Manual 
  - P1 Webhook 
  - (In dev) P1 Datadog Monitors 
  - (In dev) P1 Schedule 
  - (In dev) P1 Datadog Dashboard 
- Fallback on Errors
  - P2 Set Action retries 
  - P2 Set Fallback Actions 
  - P2 Set Fallback Workflows 
-->

To build a workflow, navigate to the [Workflows page][1] under **Integrations**. The Workflows page lists existing workflows together with each workflow's author and the dates that each workflow was last modified and executed. Hover over a workflow for the options to delete or clone the workflow. Toggle **My workflows** if you want to see only workflows that you crated. 

## Create a workflow

To create a workflow, click **New workflow**, enter a name for the workflow, and click **Create**. You can build your workflow out by dragging steps into the workflow canvas, or use JSON.

### Build a workflow with the workflow builder

1. Click an integration in the catalog pane and drag the desired step onto the workflow canvas. You can also search for a step using the search bar.
{{< img src="workflows/add-step.mp4" alt="Drag a step onto the workflow canvas" video="true"  >}}
1. Click on the step in the workflow canvas to configure it or view its outputs or context variables. For more information on outputs and context variables, see [Passing data between steps](#passing-data-between-steps)(#inputs-outputs-and-context-variables).
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

## Passing data between steps

Some steps create outputs that are available to subsequent steps in a workflow.

Inputs, outputs, and context variables

## Trigger a workflow

## Fallback on errors

[1]: https://app.datadoghq.com/workflow
