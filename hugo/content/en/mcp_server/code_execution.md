---
title: Code Execution with the MCP Server
description: "Run agent-authored JavaScript against Datadog APIs in a single MCP tool call to investigate issues and modify supported resources."
algolia:
  tags: ["mcp", "mcp server", "code execution", "code-exec"]
  rank: 65
further_reading:
- link: "mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server"
- link: "mcp_server/setup"
  tag: "Documentation"
  text: "Set Up the Datadog MCP Server"
- link: "mcp_server/tools"
  tag: "Documentation"
  text: "Datadog MCP Server Tools"
---

## Overview

Code execution in the Datadog MCP Server lets your AI agent write and run JavaScript against Datadog APIs in a single MCP tool call, instead of one tool call per API request. The agent's generated code runs inside a Datadog-managed sandbox. The only data sent back to the agent is the value the code returns. This keeps large API responses out of the model's context.

Use code execution for investigations that span multiple Datadog products, or that need the agent to join, filter, or summarize data from several calls. An example is correlating error logs with APM latency for the same service and time window.

With `execute_code_write`, agents can also create, update, or delete supported Datadog resources and act on findings in the same workflow. For example, an agent can investigate an error spike, create a case, and verify the case details in one script.

## Why use code execution

Without code execution, an agent instructed to enrich the top error-generating services with APM latency data needs a separate tool call for each service. It also needs additional turns to combine the results. Each of those calls and turns consumes context window space.

With code execution, the agent expresses the same investigation as a single script:

1. Query logs for the services with the most error logs in a time window.
1. For each returned service, query spans for latency data.
1. Join the two result sets and return a compact object.

The MCP Server runs the script and returns only the joined result. The agent completes the investigation in one tool call instead of one call per service.

## Available tools

The `core` and `execute_code` toolsets provide:

| Tool | Description |
| --- | --- |
| [`execute_code`][1] | Runs JavaScript with read-only API access in the sandbox for investigations and analysis, and returns a structured result. |
| [`execute_code_write`][7] | Runs JavaScript in the sandbox to create, update, or delete supported Datadog resources, and returns a structured result. |
| [`search_datadog_sdk`][2] | Looks up SDK operations, request types, and response types. |

See the linked entries in the MCP Server Tools reference for permissions and example prompts.

Generated code is JavaScript based on the public [Datadog API Client for TypeScript][3].

## What the sandbox can access

Code execution scripts run against Datadog APIs using your user identity. Every API call is authorized independently with your existing [role permissions][4]. Code execution can't grant access beyond those permissions.

- `execute_code` exposes read-only Datadog API calls for investigations and analysis.
- `execute_code_write` can create, update, or delete supported resources, such as monitors, SLOs, log configurations, incidents, and cases. Use `search_datadog_sdk` with `target: "execute_code_write"` to confirm which operations are available.
- Teams access is read-only. Creating or updating teams, changing membership, and other team write operations are unavailable through code execution.
- Dashboard and notebook creation and updates are unavailable through code execution. Use [`upsert_datadog_dashboard`][8] and the dedicated [notebook tools][9] for those actions. Code execution supports reading and deleting dashboards and notebooks.
- Credential management, user and role management, and other sensitive administrative APIs remain unavailable, even if you can access them elsewhere in Datadog.
- The sandbox is isolated. Scripts can't access your local machine, file system, arbitrary network destinations, or raw Datadog credentials.
- Raw API responses stay inside the sandbox while the script processes them. The only data sent back to the agent is the value the code returns. Review what a script returns if the underlying data is sensitive, such as customer data stored in logs.

## Enable code execution

The default `core` toolset includes all three code execution tools: `execute_code`, `execute_code_write`, and `search_datadog_sdk`.

To enable only code execution tools, set `toolsets=execute_code` when connecting your AI client to the Datadog MCP Server. See [Set Up the Datadog MCP Server][5] for client-specific connection instructions.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Based on your selected [Datadog site][6] ({{< region-param key="dd_site_name" >}}), this URL enables only code execution tools:

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=execute_code</code></pre>

`toolsets=all` also includes all three code execution tools.

[6]: /getting_started/site/
{{< /site-region >}}

### Enable write operations

The `execute_code_write` tool is included in the `core` and `execute_code` toolsets and in `toolsets=all`.

To use write operations:

1. Ask an organization administrator to enable **MCP Write Access** in Organization Settings. When it's disabled, the MCP Server hides write tools from all users. See [Write tools are missing](/mcp_server/setup/#write-tools-are-missing).
1. Assign your role the `mcp_write` permission and the permissions required for the resources being modified. For example, creating a monitor requires `Monitors Write` in addition to `mcp_write`.
1. If your AI client connected before your role had `mcp_write`, reauthorize the MCP connection to consent to the additional write scopes.

## Review and retry write operations safely

<div class="alert alert-warning"><code>execute_code_write</code> can overwrite or delete data, and rerunning a script can duplicate changes. Scripts are not transactions. Completed writes remain if a later operation fails or times out, and a lost response can leave the result of a write unknown.</div>

The AI client's normal approval behavior applies. The MCP Server does not add a separate confirmation step.

Before retrying a script:

1. Review the tool result, including partial-failure diagnostics.
1. Inspect the affected resources to determine which operations completed.
1. Retry only incomplete operations instead of rerunning the whole script.

For sensitive changes, ask the agent to show its plan before writing. Use narrowly scoped prompts, and request a compact result with affected resource IDs and completed actions.

## Example prompts

The following prompts use `execute_code_write` to change Datadog resources:

- Create a monitor for `checkout-api` that alerts when its error rate exceeds 5% over 5 minutes. Return the monitor ID and verify its query and notification message.
- Find monitors owned by `payments-team` that have not notified in 90 days. Show the proposed changes, then mute only approved monitors.
- Create a case for the current incident, assign it to the on-call team, and include links to the relevant traces and logs.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/tools/#execute_code
[2]: /mcp_server/tools/#search_datadog_sdk
[3]: https://github.com/DataDog/datadog-api-client-typescript
[4]: /account_management/rbac/permissions/
[5]: /mcp_server/setup
[7]: /mcp_server/tools/#execute_code_write
[8]: /mcp_server/tools/#upsert_datadog_dashboard
[9]: /mcp_server/tools/#notebooks
