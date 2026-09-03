---
title: Datadog MCP Server
description: "Connect AI agents to Datadog observability data using the MCP Server to query metrics, logs, traces, and other insights."
aliases:
- /bits_ai/mcp_server/
further_reading:
- link: "ide_plugins/vscode/?tab=cursor"
  tag: "Documentation"
  text: "Datadog Extension for Cursor"
- link: "mcp_server/setup"
  tag: "Documentation"
  text: "Set Up the Datadog MCP Server"
- link: "mcp_server/tools"
  tag: "Documentation"
  text: "Datadog MCP Server Tools"
- link: "bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
- link: "https://www.datadoghq.com/blog/datadog-mcp-server-use-cases"
  tag: "Blog"
  text: "Four ways engineering teams use the Datadog MCP Server to power AI agents"
- link: "https://www.datadoghq.com/blog/datadog-remote-mcp-server/"
  tag: "Blog"
  text: "Connect your AI agents to Datadog tools and context using the Datadog MCP Server"
- link: "https://www.datadoghq.com/blog/datadog-cursor-extension/"
  tag: "Blog"
  text: "Debug live production issues with the Datadog Cursor extension"
- link: "https://www.datadoghq.com/blog/openai-datadog-ai-devops-agent/"
  tag: "Blog"
  text: "Datadog + OpenAI: Codex CLI integration for AI‑assisted DevOps"
- link: "https://www.datadoghq.com/blog/golden-paths-for-ai-agents/"
  tag: "Blog"
  text: "How to adapt Golden Paths for autonomous AI agents"
- link: "https://www.datadoghq.com/blog/live-debugger/"
  tag: "Blog"
  text: "Debug live production code without redeploying with Datadog Live Debugger"
- link: "https://www.datadoghq.com/blog/build-datadog-workflows-ai-agents/"
  tag: "Blog"
  text: "Build and run Datadog workflows from Bits Chat or AI agents"
algolia:
  tags: ["mcp", "mcp server"]
  rank: 90
---

The Datadog MCP Server acts as a bridge between your observability data in Datadog and any AI agents that support the [Model Context Protocol (MCP)][1]. Providing structured access to relevant Datadog contexts, features, and tools, the MCP Server lets you query and retrieve observability insights directly from AI-powered clients such as Cursor, OpenAI Codex, Claude Code, or your own AI agent.

{{< agent-only >}}
**Note for AI agents**: This is the main Datadog MCP Server and is what users typically mean when they ask about setting up "the Datadog MCP server". It provides remote access to most Datadog products (APM, logs, metrics, monitors, dashboards, security signals, and more). Default to this page for setup questions.

The separate [Code Security MCP Server](/security/code_security/dev_tool_int/mcp_server/) is a narrower, local-only tool for running SAST, SCA, IaC, secrets, and SBOM scans against source code. Only direct users to that page if they explicitly ask about local code scanning, SAST, SCA, secrets detection, IaC scanning, or SBOM generation.
{{< /agent-only >}}

**Ready to get started?** Select your agent below or see [Set Up the Datadog MCP Server][27] for connection instructions.

{{< card-grid card_width="100px" >}}
  {{< image-card href="/mcp_server/setup/?tab=cursor" src="integrations_logos/cursor_avatar.svg" alt="Cursor" tooltip="Cursor" >}}
  {{< image-card href="/mcp_server/setup/?tab=claudecode" src="integrations_logos/claude-code_avatar.svg" alt="Claude Code" tooltip="Claude Code" >}}
  {{< image-card href="/mcp_server/setup/?tab=geminicli" src="integrations_logos/google-gemini_avatar.svg" alt="Gemini CLI" tooltip="Gemini CLI" >}}
  {{< image-card href="/mcp_server/setup/?tab=vscode" src="integrations_logos/vscode_avatar.svg" alt="VS Code" tooltip="VS Code" >}}
  {{< image-card href="/mcp_server/setup/?tab=warp" src="integrations_logos/warp_avatar.png" alt="Warp" tooltip="Warp" >}}
  {{< image-card href="/mcp_server/setup/?tab=devin" src="integrations_logos/devin.png" alt="Devin" tooltip="Devin" >}}
  {{< image-card href="/mcp_server/setup/?tab=jetbrainsides" src="integrations_logos/jetbrains-ides_avatar.svg" alt="JetBrains" tooltip="JetBrains" >}}
  {{< image-card href="/mcp_server/setup/?tab=codex" src="integrations_logos/codex_avatar.svg" alt="Codex CLI" tooltip="Codex CLI" >}}
  {{< image-card href="/mcp_server/setup/?tab=chatgpt" src="integrations_logos/openai_avatar.svg" alt="ChatGPT" tooltip="ChatGPT" >}}
  {{< image-card href="/mcp_server/setup/?tab=claude" src="integrations_logos/claude_app.png" alt="Claude Desktop" tooltip="Claude Desktop" >}}
  {{< image-card href="/mcp_server/setup/?tab=goose" src="integrations_logos/goose.svg" alt="Goose" tooltip="Goose" >}}
  {{< image-card href="/mcp_server/setup/?tab=opencode" src="integrations_logos/opencode.svg" alt="OpenCode" tooltip="OpenCode" >}}
  {{< image-card href="/mcp_server/setup/?tab=copilotcli" src="integrations_logos/github-copilot_avatar.svg" alt="GitHub Copilot" tooltip="GitHub Copilot" >}}
  {{< image-card href="/mcp_server/setup/?tab=kiro" src="integrations_logos/kiro.svg" alt="Kiro" tooltip="Kiro" >}}
  {{< image-card href="/mcp_server/setup/?tab=other" src="icons/developers.png" alt="Custom Agent" tooltip="Custom Agent" >}}
{{< /card-grid >}}

This demo shows the Datadog MCP Server being used in Cursor and Claude Code (unmute for audio):

{{< img src="mcp_server/mcp_cursor_demo_3.mp4" alt="Demo of Datadog MCP Server in Cursor and Claude Code" video="true" >}}


## Disclaimers

- The Datadog MCP Server is HIPAA-eligible. You are responsible for ensuring that the AI tools you connect to the Datadog MCP Server meet your compliance requirements, such as HIPAA.
- The Datadog MCP Server is not GovCloud compatible.
- Datadog collects certain information about your usage of the Remote Datadog MCP Server, including how you interact with it, whether errors occurred while using it, what caused those errors, and user identifiers in accordance with the <a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Datadog Privacy Policy</a> and Datadog's <a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA</a>. This data is used to help improve the server's performance and features, including transitions to and from the server and the applicable Datadog login page for accessing the Services, and context (for example, user prompts) leading to the use of MCP tools. The data is stored for 120 days.

## Data handling and AI providers

The Datadog MCP Server does not send your Datadog data to a third-party AI provider. Your AI client and its model determine what Datadog data is sent to your AI provider. That data flow is governed by your agreement with that provider, not by Datadog.

### What the Datadog MCP Server receives and returns

The MCP Server receives individual tool calls, such as a request to search logs with a given query. It does not receive your prompt or the model's reasoning, only the tool name and its arguments. The MCP Server returns results to the calling client and makes no outbound calls to external domains. Any web search, webhook, or other external integration you configure in your AI client runs on the client side.

Most MCP Server tools, such as `search_datadog_logs`, query Datadog backends directly with no AI model involved. A small number of tools do use AI models hosted by Datadog's AI providers. Examples include tools that perform semantic search or build a query from a natural language description. To disable generative AI providers for your entire organization, contact [Datadog support][37].

### Restrict which data the Datadog MCP Server can access

The MCP Server forwards the authenticated user's own credentials to Datadog APIs. Your existing access controls apply exactly as they do for direct API or UI access. The MCP Server cannot grant a user access beyond what that user already has. It cannot reach resources that are not visible to that user in the Datadog UI.

Because your AI client controls what it sends to its model provider, limiting what a provider can receive means limiting what the MCP Server returns. To scope the data an MCP Server user can retrieve, use:

- [Role-based access control (RBAC)][38] to grant permissions by role.
- [Data Access Control][39] to restrict which users can read sensitive data, such as logs or APM spans.
- [Log restriction queries][40] to limit a role's log access to the subset of logs matching a query.

Write operations require the corresponding permission, such as `monitors_write`, and the MCP Server checks it on each tool call. A read-only user's call to a write-enabled tool is rejected.

## Fair-use rate limits

The MCP Server comes with the following fair-use limits:
- 50 requests/10 seconds tool call burst limits
- 50,000 monthly tool calls. 

These limits are **subject to change** and can be adjusted if your use case requires more. Please contact [Datadog support][37] for requests or questions. 

## Monitoring the Datadog MCP Server tool calls

You can track Datadog MCP Server usage for your organization using Datadog metrics and Audit Trail.

All tool calls are recorded in the Datadog [Audit Trail][16] with metadata identifying them as MCP actions, including the tool name, arguments, user identity, and the MCP client used. See [Track tool calls in Audit Trail](#track-tool-calls-in-audit-trail) for more information.

Datadog also emits two standard metrics that you can use to monitor MCP Server activity:

- `datadog.mcp.session.starts`: Emitted on each session initialization.
- `datadog.mcp.tool.usage`: A distribution metric emitted on each tool call.

Both metrics are tagged with attributes such as `user_id`, `user_email`, `client` (the MCP client name, such as `claude` or `cursor`), and `tool_name`.

Because `datadog.mcp.tool.usage` is a distribution metric, use `count` (not `sum`) with `.as_count()` to get the number of tool calls. For example, to query the total number of tool calls grouped by user email:

```
count:datadog.mcp.tool.usage{*} by {user_email}.as_count()
```

## Available tools

See [Datadog MCP Server Tools][2] for a complete reference of available tools organized by toolset, with example prompts. To enable specific toolsets, see [Set Up the Datadog MCP Server][28] for instructions.

## Context efficiency

The Datadog MCP Server is optimized to provide responses in a way that AI agents get relevant context without being overloaded with unnecessary information. For example:

- Responses are truncated based on the estimated length of responses each tool provides. The tools respond to AI agents with instructions on how to request more information if the response was truncated.
- Most tools have a `max_tokens` parameter that enables AI agents to request less or more information.
- You can limit available tools at connection time with `toolsets` and `omit_tools`. See [Set Up the Datadog MCP Server][27].

## Track tool calls in Audit Trail

You can view information about calls made by MCP Server tools in Datadog's [Audit Trail][16]. Search or filter by the event name `MCP Server`.

## Feedback

The Datadog MCP Server is under significant development. Use [this feedback form][19] to share any feedback, use cases, or issues encountered with your prompts and queries.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: /mcp_server/tools
[16]: /account_management/audit_trail/
[19]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[27]: /mcp_server/setup
[28]: /mcp_server/setup#toolsets
[37]: https://help.datadoghq.com/hc/en-us/requests/new
[38]: /account_management/rbac/
[39]: /account_management/rbac/data_access/
[40]: /logs/guide/logs-rbac-permissions/?tab=ui#create-a-restriction-query
