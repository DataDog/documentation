---
title: Workflow Automation MCP Tools
description: Use AI agents to build, manage, run, and debug workflows with the Datadog MCP Server's workflows toolset.
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

The [Datadog MCP Server][1] lets AI agents build and manage workflows through the [Model Context Protocol (MCP)][2].

The `workflows` toolset gives AI clients such as Claude Code, Cursor, and OpenAI Codex access to your workflows, Action Catalog, workflow schema, and execution data. Using natural language, you can create and update workflows, validate their specifications, run published workflows, and investigate execution results.

## Use cases

Use the `workflows` toolset to build automations that:

- **Investigate monitor alerts**: When a service error-rate monitor alerts, run Bits Investigation to correlate latency, recent deployments, and downstream service health, then send the findings to the owning team in Slack.
- **Use custom agents**: Create a custom Bits Agent Builder agent for a specialized system, such as payments, data pipelines, or Kubernetes, and invoke it from a workflow whenever an alert requires that domain expertise.
- **Automate incident escalation**: When a critical incident is declared, gather relevant service context, page the appropriate on-call team, create a case, and notify stakeholders.
- **Investigate deployment regressions**: After a deployment, compare current service behavior with recent changes and, when a likely regression is found, start a Bits Code session to investigate the relevant code and propose a fix.
- **Trigger remediation from an alert**: When a monitor detects a known failure condition, run a remediation action such as restarting a service, invoking an AWS Lambda function, or calling an internal remediation endpoint.
- **Create code fixes**: Investigate an issue, have Bits Code propose a code change, require human review, and implement the change after the proposed fix is approved.
- **Escalate high-severity security findings**: When a critical finding is detected, create a case or ticket, notify the owning team, and page the appropriate responder.

## Quickstart

<div class="alert alert-info">The <code>workflows</code> toolset is not enabled by default for external MCP clients.</div>

1. [Set up the Datadog MCP Server][1].
1. When connecting your AI client to the Datadog MCP Server, add `workflows` to the `toolsets` parameter. For example, for the Datadog US1 site:

    {{< code-block lang="none" >}}
https://mcp.datadoghq.com/v1/mcp?toolsets=core,workflows
{{< /code-block >}}

    **Note**: If you authenticate using an application key, enable [Actions API access][3] for that key from [**Organization Settings > Application Keys**][4]. Actions API access is disabled for application keys by default and is required to access the Workflow Automation APIs.

1. After connecting, you can make requests, and your AI client calls the appropriate tools on your behalf.
    - "Find workflows owned by my team that are triggered by monitor alerts."
    - "Create a workflow that runs Bits Investigation when this monitor alerts, then posts the findings to Slack."
    - "Debug my last failing workflow run."

## Permissions

Workflow Automation MCP tools use the user's existing Datadog permissions. Operations are performed in the Datadog organization used to authenticate the MCP.

| Permission       | Capabilities                                                                          |
|------------------|----------------------------------------------------------------------------------------|
| Workflows Read   | Find and retrieve workflows, schemas, and actions, validate specifications, and inspect executions |
| Workflows Write  | Create, update, publish, unpublish, and permanently delete workflows                   |
| Workflows Run    | Start workflows and cancel running executions                                          |

## Available tools

The `workflows` toolset exposes the following tools, grouped by the part of the workflow life cycle they support. This includes finding and inspecting workflows, discovering specifications and actions, creating and managing workflows, validating specifications, running and inspecting executions, and debugging steps. When you make an automation request in natural language, your AI client calls these tools on your behalf. It chains their results together to produce your desired output. See the [Datadog MCP Server tools reference][5] for full details on each tool, including permissions and example requests.

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
- [`publish_datadog_workflow`][13]
- [`unpublish_datadog_workflow`][14]
- [`delete_datadog_workflow`][15]
- [`validate_datadog_workflow`][16]

### Workflow execution

- [`execute_datadog_workflow`][17]
- [`get_datadog_workflow_instance`][18]
- [`list_datadog_workflow_instances`][19]
- [`cancel_datadog_workflow_instance`][20]
- [`get_datadog_workflow_step_data`][21]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/setup/
[2]: https://modelcontextprotocol.io/
[3]: /account_management/api-app-keys/#actions-api-access
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /mcp_server/tools/#workflows
[6]: /mcp_server/tools/#list_datadog_workflows
[7]: /mcp_server/tools/#get_datadog_workflow
[8]: /mcp_server/tools/#get_datadog_workflow_spec_schema
[9]: /mcp_server/tools/#search_datadog_workflow_actions
[10]: /mcp_server/tools/#get_datadog_workflow_action
[11]: /mcp_server/tools/#create_datadog_workflow
[12]: /mcp_server/tools/#update_datadog_workflow
[13]: /mcp_server/tools/#publish_datadog_workflow
[14]: /mcp_server/tools/#unpublish_datadog_workflow
[15]: /mcp_server/tools/#delete_datadog_workflow
[16]: /mcp_server/tools/#validate_datadog_workflow
[17]: /mcp_server/tools/#execute_datadog_workflow
[18]: /mcp_server/tools/#get_datadog_workflow_instance
[19]: /mcp_server/tools/#list_datadog_workflow_instances
[20]: /mcp_server/tools/#cancel_datadog_workflow_instance
[21]: /mcp_server/tools/#get_datadog_workflow_step_data
[22]: /actions/actions_catalog/
