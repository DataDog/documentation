---
title: Datadog MCP Server
description: "Connect AI agents to Datadog observability data using the MCP Server to query metrics, logs, traces, and other insights."
further_reading:
- link: "ide_plugins/vscode/?tab=cursor"
  tag: "Documentation"
  text: "Datadog Extension for Cursor"
- link: "bits_ai/mcp_server/setup"
  tag: "Documentation"
  text: "Set Up the Datadog MCP Server"
- link: "bits_ai/mcp_server/tools"
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

{{< card-grid card_width="90px" >}}
  {{< image-card href="/bits_ai/mcp_server/setup/?tab=cursor" src="integrations_logos/cursor_avatar.svg" alt="Cursor" tooltip="Cursor" >}}
  {{< image-card href="/bits_ai/mcp_server/setup/?tab=claudecode" src="integrations_logos/claude-code_avatar.svg" alt="Claude Code" tooltip="Claude Code" >}}
  {{< image-card href="/bits_ai/mcp_server/setup/?tab=geminicli" src="integrations_logos/google-gemini_avatar.svg" alt="Gemini CLI" tooltip="Gemini CLI" >}}
  {{< image-card href="/bits_ai/mcp_server/setup/?tab=vscode" src="integrations_logos/vscode_avatar.svg" alt="VS Code" tooltip="VS Code" >}}
  {{< image-card href="/bits_ai/mcp_server/setup/?tab=warp" src="integrations_logos/warp_avatar.png" alt="Warp" tooltip="Warp" >}}
  {{< image-card href="/bits_ai/mcp_server/setup/?tab=devin" src="integrations_logos/devin.png" alt="Devin" tooltip="Devin" >}}
  {{< image-card href="/bits_ai/mcp_server/setup/?tab=jetbrainsides" src="integrations_logos/jetbrains-ides_avatar.svg" alt="JetBrains" tooltip="JetBrains" >}}
  {{< image-card href="/bits_ai/mcp_server/setup/?tab=codex" src="integrations_logos/codex_avatar.svg" alt="Codex CLI" tooltip="Codex CLI" >}}
  {{< image-card href="/bits_ai/mcp_server/setup/?tab=claude" src="integrations_logos/claude_app.png" alt="Claude Desktop" tooltip="Claude Desktop" >}}
  {{< image-card href="/bits_ai/mcp_server/setup/?tab=goose" src="integrations_logos/goose.svg" alt="Goose" tooltip="Goose" >}}
  {{< image-card href="/bits_ai/mcp_server/setup/?tab=opencode" src="integrations_logos/opencode.svg" alt="OpenCode" tooltip="OpenCode" >}}
  {{< image-card href="/bits_ai/mcp_server/setup/?tab=vscode" src="integrations_logos/github-copilot_avatar.svg" alt="GitHub Copilot" tooltip="GitHub Copilot" >}}
  {{< image-card href="/bits_ai/mcp_server/setup/?tab=kiro" src="integrations_logos/kiro.svg" alt="Kiro" tooltip="Kiro" >}}
  {{< image-card href="/bits_ai/mcp_server/setup/?tab=other" src="icons/developers.png" alt="Custom Agent" tooltip="Custom Agent" >}}
{{< /card-grid >}}

This demo shows the Datadog MCP Server being used in Cursor and Claude Code (unmute for audio):

{{< img src="bits_ai/mcp_server/mcp_cursor_demo_3.mp4" alt="Demo of Datadog MCP Server in Cursor and Claude Code" video="true" >}}


## Disclaimers

- The Datadog MCP Server is HIPAA-eligible. You are responsible for ensuring that the AI tools you connect to the Datadog MCP Server meet your compliance requirements, such as HIPAA.
- The Datadog MCP Server is not GovCloud compatible.
- Datadog collects certain information about your usage of the Remote Datadog MCP Server, including how you interact with it, whether errors occurred while using it, what caused those errors, and user identifiers in accordance with the <a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Datadog Privacy Policy</a> and Datadog's <a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA</a>. This data is used to help improve the server's performance and features, including transitions to and from the server and the applicable Datadog login page for accessing the Services, and context (for example, user prompts) leading to the use of MCP tools. The data is stored for 120 days.

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

## Track tool calls in Audit Trail

You can view information about calls made by MCP Server tools in Datadog's [Audit Trail][16]. Search or filter by the event name `MCP Server`.

## Feedback

The Datadog MCP Server is under significant development. Use [this feedback form][19] to share any feedback, use cases, or issues encountered with your prompts and queries.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: /bits_ai/mcp_server/tools
[16]: /account_management/audit_trail/
[19]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[27]: /bits_ai/mcp_server/setup
[28]: /bits_ai/mcp_server/setup#toolsets
[37]: https://help.datadoghq.com/hc/en-us/requests/new
