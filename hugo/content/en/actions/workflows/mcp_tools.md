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

    **Note**: If you authenticate using an application key, enable [Actions API access][3] for that key from [**Organization Settings > Application Keys**][20]. Actions API access is disabled for application keys by default and is required to access the Workflow Automation APIs.

1. After connecting, you can make requests, and your AI client calls the appropriate tools on your behalf.
    - "Find workflows owned by my team that are triggered by monitor alerts."
    - "Create a workflow that runs a Bits Investigation agent when this monitor alerts, then posts the findings to Slack."
    - "Debug my last failing workflow run."

## Permissions

Workflow Automation MCP tools use the user's existing Datadog permissions. Operations are performed in the Datadog organization used to authenticate the MCP.

| Permission       | Capabilities                                                                          |
|------------------|----------------------------------------------------------------------------------------|
| Workflows Read   | Find and retrieve workflows, schemas, and actions, validate specifications, and inspect executions |
| Workflows Write  | Create, update, publish, unpublish, and permanently delete workflows                   |
| Workflows Run    | Start workflows and cancel running executions                                          |

## Available tools

The `workflows` toolset exposes the following tools, grouped by the part of the workflow lifecycle they support: finding and inspecting workflows, discovering specifications and actions, creating and managing workflows, validating specifications, running and inspecting executions, and debugging steps. When you make an automation request in natural language, your AI client calls these tools and chains their results together on your behalf to produce your desired output. See the [Datadog MCP Server tools reference][5] for full details on each tool, including permissions and example requests.

### Workflow discovery

- [`list_datadog_workflows`][6]
- [`get_datadog_workflow`][7]

### Specification and action discovery

- [`get_datadog_workflow_spec_schema`][8]
- [`search_datadog_workflow_actions`][9]
- [`get_datadog_workflow_action`][10]

### Workflow creation and management

- [`create_datadog_workflow`][11]
- [`update_datadog_workflow`][12]
- [`delete_datadog_workflow`][13]

### Workflow validation

- [`validate_datadog_workflow`][14]

### Workflow execution

- [`execute_datadog_workflow`][15]
- [`get_datadog_workflow_instance`][16]
- [`list_datadog_workflow_instances`][17]
- [`cancel_datadog_workflow_instance`][18]

### Execution debugging

- [`get_datadog_workflow_step_data`][19]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/setup/
[2]: https://modelcontextprotocol.io/
[3]: /account_management/api-app-keys/#actions-api-access
[4]: /actions/actions_catalog/
[5]: /mcp_server/tools/#workflows
[6]: /mcp_server/tools/#list_datadog_workflows
[7]: /mcp_server/tools/#get_datadog_workflow
[8]: /mcp_server/tools/#get_datadog_workflow_spec_schema
[9]: /mcp_server/tools/#search_datadog_workflow_actions
[10]: /mcp_server/tools/#get_datadog_workflow_action
[11]: /mcp_server/tools/#create_datadog_workflow
[12]: /mcp_server/tools/#update_datadog_workflow
[13]: /mcp_server/tools/#delete_datadog_workflow
[14]: /mcp_server/tools/#validate_datadog_workflow
[15]: /mcp_server/tools/#execute_datadog_workflow
[16]: /mcp_server/tools/#get_datadog_workflow_instance
[17]: /mcp_server/tools/#list_datadog_workflow_instances
[18]: /mcp_server/tools/#cancel_datadog_workflow_instance
[19]: /mcp_server/tools/#get_datadog_workflow_step_data
[20]: https://app.datadoghq.com/organization-settings/application-keys
