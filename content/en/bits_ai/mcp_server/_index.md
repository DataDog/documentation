---
title: Datadog MCP Server
description: "Connect AI agents to Datadog observability data using the MCP Server to query metrics, logs, traces, and other insights."
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-remote-mcp-server/"
  tag: "Blog"
  text: "Connect your AI agents to Datadog tools and context using the Datadog MCP Server"
- link: "ide_plugins/vscode/?tab=cursor"
  tag: "Documentation"
  text: "Datadog Extension for Cursor"
- link: "bits_ai/mcp_server/setup"
  tag: "Documentation"
  text: "Set Up the Datadog MCP Server"
- link: "bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
- link: "https://www.datadoghq.com/blog/datadog-cursor-extension/"
  tag: "Blog"
  text: "Debug live production issues with the Datadog Cursor extension"
- link: "https://www.datadoghq.com/blog/openai-datadog-ai-devops-agent/"
  tag: "Blog"
  text: "Datadog + OpenAI: Codex CLI integration for AI‑assisted DevOps"
algolia:
  tags: ["mcp", "mcp server", "setup"]
  rank: 90
---

The Datadog MCP Server acts as a bridge between your observability data in Datadog and any AI agents that support the [Model Context Protocol (MCP)][1]. Providing structured access to relevant Datadog contexts, features, and tools, the MCP Server lets you query and retrieve observability insights directly from AI-powered clients such as Cursor, OpenAI Codex, Claude Code, or your own AI agent.

Ready to get started? See [Set Up the Datadog MCP Server][27] for connection instructions.

This demo shows the Datadog MCP Server being used in Cursor and Claude Code (unmute for audio):

{{< img src="bits_ai/mcp_server/mcp_cursor_demo_3.mp4" alt="Demo of Datadog MCP Server in Cursor and Claude Code" video="true" >}}


## Disclaimers

- The Datadog MCP Server is HIPAA-eligible. You are responsible for ensuring that the AI tools you connect to the Datadog MCP Server meet your compliance requirements, such as HIPAA.
- The Datadog MCP Server has fair-use rate limits in place. For questions or requests, [contact Datadog support][37].
- The Datadog MCP Server is not GovCloud compatible.
- Datadog collects certain information about your usage of the Remote Datadog MCP Server, including how you interact with it, whether errors occurred while using it, what caused those errors, and user identifiers in accordance with the <a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Datadog Privacy Policy</a> and Datadog's <a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA</a>. This data is used to help improve the server's performance and features, including transitions to and from the server and the applicable Datadog login page for accessing the Services, and context (for example, user prompts) leading to the use of MCP tools. The data is stored for 120 days.

## Monitoring the Datadog MCP Server usage

You can track Datadog MCP Server usage for your organization using Datadog metrics and Audit Trail.

All tool calls are recorded in the Datadog [Audit Trail][16] with metadata identifying them as MCP actions, including the tool name, arguments, user identity, and the MCP client used. See [Track tool calls in Audit Trail](#track-tool-calls-in-audit-trail) for more information.

Datadog also emits two standard metrics that you can use to monitor MCP Server activity:

- `datadog.mcp.session.starts`: Emitted on each session initialization.
- `datadog.mcp.tool.calls`: Emitted on each tool call, tagged with `tool_name`.

Both metrics are tagged with `user_id`, `user_email`, and `client` (the MCP client name, such as `claude` or `cursor`).

## Available tools

See [Datadog MCP Server Tools][2] for a complete reference of available tools organized by toolset, with example prompts.

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
[37]: https://help.datadoghq.com/hc/en-us/requests/new
