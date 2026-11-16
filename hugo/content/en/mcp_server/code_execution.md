---
title: Code Execution with the MCP Server
description: "Run agent-authored JavaScript against Datadog APIs in a single MCP tool call to investigate issues that span multiple Datadog products."
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

## Why use code execution

Without code execution, an agent instructed to enrich the top error-generating services with APM latency data needs a separate tool call for each service. It also needs additional turns to combine the results. Each of those calls and turns consumes context window space.

With code execution, the agent expresses the same investigation as a single script:

1. Query logs for the services with the most error logs in a time window.
1. For each returned service, query spans for latency data.
1. Join the two result sets and return a compact object.

The MCP Server runs the script and returns only the joined result. The agent completes the investigation in one tool call instead of one call per service.

## Available tools

Code execution tools are part of both the `core` and `code-exec` toolsets:

- **`execute_code`**: Runs agent-authored JavaScript in the sandbox and returns a structured result. Scripts can only read data. See [`execute_code`][1] in the MCP Server Tools reference for permissions and example prompts.
- **`execute_code_write`**: Runs agent-authored JavaScript that can read, create, update, or delete Datadog resources. See [`execute_code_write`][7] in the MCP Server Tools reference.
- **`search_datadog_sdk`**: Looks up the SDK functions and API methods available to the agent for writing scripts. See [`search_datadog_sdk`][2] in the MCP Server Tools reference.

Generated code is JavaScript based on the public [Datadog API Client for TypeScript][3].

## What the sandbox can access

Code executed by the code execution tools runs against Datadog APIs using your user identity. An agent can only read data that you have permission to access. Other access limitations include:

- The sandbox is isolated. Scripts can't access your local machine, file system, arbitrary network destinations, or raw Datadog credentials.
- `execute_code` only exposes read-only Datadog API calls. An agent can't use it to perform write actions, such as creating a monitor.
- `execute_code_write` can perform write actions. It requires [MCP write access][8] to be enabled for your organization, and each call also requires the role permissions for the APIs the script uses.
- API calls made from a script apply your existing [role permissions][4]. If you don't have access to a dataset, the agent can't query it through `execute_code` either.
- Raw API responses stay inside the sandbox while the script processes them. The only data sent back to the agent is the value the code returns. Review what a script returns if the underlying data is sensitive, such as customer data stored in logs.

## Enable code execution

Code execution tools are included in the default `core` toolset, so they are available without extra configuration. To enable them alongside other toolsets that don't include `core`, add `code-exec` to the `toolsets` query parameter when you connect your AI client to the Datadog MCP Server. See [Set Up the Datadog MCP Server][5] for client-specific connection instructions.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
For example, based on your selected [Datadog site][6] ({{< region-param key="dd_site_name" >}}), this URL enables only the code execution tools:

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=code-exec</code></pre>

`code-exec` is included in `toolsets=all`, so you don't need to add it separately if you already enable all generally available toolsets.

[6]: /getting_started/site/
{{< /site-region >}}

## Disable code execution

To remove code execution tools from a session, list them in the [`omit_tools`][9] query parameter, for example `omit_tools=execute_code,execute_code_write,search_datadog_sdk`.

Omitting a product-specific tool, such as `search_datadog_logs`, doesn't stop `execute_code` from calling the same Datadog API. If you need to keep certain data away from AI agents, omit the code execution tools as well, and restrict access to the data itself with [role permissions][4] and, for logs, [restriction queries][10]. Tool lists change over time, so review your `omit_tools` list when tools are added to a toolset you use.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/tools/#execute_code
[2]: /mcp_server/tools/#search_datadog_sdk
[3]: https://github.com/DataDog/datadog-api-client-typescript
[4]: /account_management/rbac/permissions/
[5]: /mcp_server/setup
[7]: /mcp_server/tools/#execute_code_write
[8]: /mcp_server/setup/#organization-wide-access
[9]: /mcp_server/setup/#omit-specific-tools
[10]: /logs/guide/logs-rbac/
