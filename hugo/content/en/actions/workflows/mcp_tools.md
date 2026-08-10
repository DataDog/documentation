---
title: Workflow Automation MCP Tools
description: Use AI agents to build, manage, run, and debug Workflow Automations with the Datadog MCP Server's workflows toolset.
further_reading:
- link: "mcp_server/setup"
  tag: "Documentation"
  text: "Set Up the Datadog MCP Server"
- link: "mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server Overview"
- link: "mcp_server/tools"
  tag: "Documentation"
  text: "Datadog MCP Server Tools"
- link: "actions/workflows/"
  tag: "Documentation"
  text: "Workflow Automation"
algolia:
  tags: ["mcp", "mcp server", "workflow", "workflows", "workflow automation"]
---

## Overview

The [Datadog MCP Server][1] lets AI agents build and manage Workflow Automations through the [Model Context Protocol (MCP)][2].

The `workflows` toolset gives AI clients such as Claude Code, Cursor, and OpenAI Codex access to your workflows, Action Catalog, workflow schema, and execution data. Using natural language, you can create and update workflows, validate their specifications, run published workflows, and investigate execution results.

## Quickstart

<div class="alert alert-info">The <code>workflows</code> toolset is not enabled by default for external MCP clients.</div>

1. [Set up the Datadog MCP Server][1].
1. When connecting your AI client to the Datadog MCP Server, add `workflows` to the `toolsets` parameter. For example, for the Datadog US1 site:

    {{< code-block lang="none" >}}
https://mcp.datadoghq.com/v1/mcp?toolsets=core,workflows
{{< /code-block >}}

    **Note**: If you authenticate using an application key, enable [Actions API access][3] for that key before using Workflow Automation tools. Actions API access is disabled for application keys by default and is required to access the Workflow Automation APIs. Enable it from **Organization Settings > Application Keys**.

1. After connecting, you can make requests and your AI client calls the appropriate tools on your behalf.
    - "Find workflows owned by my team that are triggered by monitor alerts."
    - "Create a workflow that runs a Bits Investigation agent when this monitor alerts, then posts the findings to Slack."
    - "Debug my last failing workflow run."

## Available tools

The `workflows` toolset exposes the following tools. Each tool performs a specific action to create a new workflow or edit an existing workflow. When you make an automation request in natural language, your AI client calls these tools and chains their results together on your behalf to produce your desired output.

### Workflow discovery

#### `list_datadog_workflows`

*Permissions required*: `Workflows Read`

Lists and searches workflows in your team org by name, tags, owner, handle, or trigger type. Use this tool to find existing workflows before retrieving, updating, or reusing their configurations.

Example requests:

- "List workflows owned by my team."
- "Find workflows triggered by monitor alerts."
- "Search for my incident escalation workflow."

#### `get_datadog_workflow`

*Permissions required*: `Workflows Read`

Retrieves a single workflow by ID, including its name, description, publication state, tags, and complete specification. Call this tool before updating a workflow so you can preserve fields and specification content that should not change.

Example requests:

- "Show me how this workflow is configured."
- "Explain the triggers and steps in this workflow."
- "Retrieve the current spec before changing its schedule."

### Specification and action discovery

#### `get_datadog_workflow_spec_schema`

*Permissions required*: `Workflows Read`

Returns the JSON schema for a Workflow Automation specification, including the required structure for triggers, steps, and connections. Call this tool before constructing a specification for `create_datadog_workflow`, `validate_datadog_workflow`, or `update_datadog_workflow`.

Example requests:

- "What fields does a schedule trigger require?"
- "Show me the schema for a valid workflow spec."
- "What structure should I use to connect these steps?"

#### `search_datadog_workflow_actions`

*Permissions required*: `Workflows Read`

Searches the Datadog [Action Catalog][4] by integration, bundle, title, keyword, or description. Use this tool to find the building blocks needed for a workflow's steps.

Example requests:

- "Find actions for sending and reacting to Slack messages."
- "What actions are available for AWS S3?"
- "Find an action that continues only when a value matches an expected result."

#### `get_datadog_workflow_action`

*Permissions required*: `Workflows Read`

Retrieves the complete definition of an action by `action_id`, including its input and output schema and usage details. Use this tool after `search_datadog_workflow_actions` to construct the step parameters correctly.

Example requests:

- "Get the input parameters for the `com.datadoghq.http.request` action."
- "Show me the outputs returned by this action."
- "How should I configure this action as a workflow step?"

### Workflow creation and management

#### `create_datadog_workflow`

*Permissions required*: `Workflows Write`

Creates a Workflow from a complete specification containing its triggers, steps, inputs, and outputs. The request can also define the workflow's name, description, and initial publication state. The response includes the generated workflow ID.

Example requests:

- "Create a workflow that posts a Slack message when triggered by an agent."
- "Build a workflow with a schedule trigger that runs every day at 9:00 AM."
- "Create this workflow but leave it unpublished for review."

#### `update_datadog_workflow`

*Permissions required*: `Workflows Write`

Updates an existing workflow by ID. Only the provided fields are changed. Supported fields include the workflow's name, description, publication state, user tags, and specification.

Providing `spec` replaces the complete existing specification rather than merging individual changes into it. Providing `user_tags` also replaces the complete existing tag set.

Call `get_datadog_workflow` first and carry over any content that should not be overwritten.

Example requests:

- "Rename this workflow and update its description."
- "Publish this workflow now that it is ready."
- "Change the schedule trigger's recurrence rule."

#### `delete_datadog_workflow`

*Permissions required*: `Workflows Write`

Permanently deletes a workflow by ID. The operation is irreversible and requires explicit confirmation with `confirm: true` before it executes.

Example request:

- "Delete the old incident escalation workflow."

### Workflow validation

#### `validate_datadog_workflow`

*Permissions required*: `Workflows Read`

Checks whether a workflow specification is valid without creating or modifying a workflow. The response includes a pass or fail result and any validation errors.

Example requests:

- "Check whether this workflow spec is valid before I create it."
- "Why is my updated workflow spec failing validation?"
- "Validate the triggers and step connections in this spec."

<div class="alert alert-info">Validation checks the workflow definition but does not guarantee the behavior of external systems or every possible production input, and does not execute its actions.</div>

### Workflow execution

#### `execute_datadog_workflow`

*Permissions required*: `Workflows Run`

Starts an on-demand execution of a published workflow. The workflow must contain an agent trigger. The request can include an optional input payload.

The response includes the workflow instance ID, which can be passed to `get_datadog_workflow_instance`.

<div class="alert alert-danger">Canceling an execution is irreversible; the execution cannot be resumed.</div>

Example requests:

- "Run this workflow with service set to `checkout-api`."
- "Execute the workflow with the staging environment as input."
- "Start this remediation workflow for the current alert."

#### `get_datadog_workflow_instance`

*Permissions required*: `Workflows Read`

Retrieves the status and result of a specific workflow execution instance.

Use the instance ID returned by `execute_datadog_workflow` or `list_datadog_workflow_instances`.

Example requests:

- "Has this workflow run completed?"
- "Show me the result of this workflow instance."
- "Did the execution succeed or fail?"

#### `list_datadog_workflow_instances`

*Permissions required*: `Workflows Read`

Lists execution history for a workflow, including instance IDs, start and end times, and statuses.

Results can be filtered by status and sorted.

Example requests:

- "Show me the last 10 runs of this workflow."
- "Have any recent executions of the deployment rollback workflow failed?"
- "List the currently running instances."

#### `cancel_datadog_workflow_instance`

*Permissions required*: `Workflows Run`

Cancels a workflow execution that is currently running.

A canceled execution cannot be resumed. Use `execute_datadog_workflow` to start another execution when needed.

Example request:

- "Cancel the workflow run I just triggered. I used the wrong input."

### Execution debugging

#### `get_datadog_workflow_step_data`

*Permissions required*: `Workflows Read`

Retrieves execution data for one step of a workflow instance. The response includes the step's inputs, evaluated inputs and outputs, and, optionally, the execution context against which its expressions were evaluated. Use this tool to determine why a step failed, received an unexpected value, or produced an incorrect result.

Example requests:

- "Why did the send-slack-message step receive the wrong channel value?"
- "Show me what the loop step evaluated on iteration 3."
- "What inputs and outputs did this failed step use?"

## Permissions

Workflow Automation MCP tools use the user's existing Datadog permissions. Operations are performed in the Datadog organization used to authenticate the MCP.

| Permission       | Capabilities                                                                          |
|------------------|----------------------------------------------------------------------------------------|
| Workflows Read   | Find and retrieve workflows, retrieve schemas and actions, validate specifications, and inspect executions |
| Workflows Write  | Create, update, publish, unpublish, and permanently delete workflows                   |
| Workflows Run    | Start workflows and cancel running executions                                          |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/setup/
[2]: https://modelcontextprotocol.io/
[3]: /account_management/api-app-keys/#actions-api-access
[4]: /actions/actions_catalog/
