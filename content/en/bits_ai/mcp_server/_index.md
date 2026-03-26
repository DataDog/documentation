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

## Toolsets


The Datadog MCP Server supports _toolsets_, which allow you to use only the tools you need, saving valuable context window space. These toolsets are available:

- `core`: The default toolset for logs, metrics, traces, dashboards, monitors, incidents, hosts, services, events, and notebooks
- `alerting`: Tools for validating monitors, searching monitor groups, and retrieving monitor templates
- `apm`: Tools for in-depth [APM][28] trace analysis, span search, Watchdog insights, and performance investigation
- `cases`: Tools for [Case Management][38], including creating, searching, and updating cases; managing projects; and linking Jira issues
- `dashboards`: Tools for retrieving, creating, updating, and deleting [dashboards][41]
- `dbm`: Tools for interacting with [Database Monitoring][26]
- `error-tracking`: Tools for interacting with Datadog [Error Tracking][25]
- `feature-flags`: Tools for managing [feature flags][29], including creating, listing, and updating flags and their environments
- `llmobs`: Tools for searching and analyzing [LLM Observability][30] spans and experiments
- `product-analytics`: Tools for interacting with [Product Analytics][35] queries
- `networks`: Tools for [Cloud Network Monitoring][31] analysis and [Network Device Monitoring][32]
- `onboarding`: Agentic onboarding tools for guided Datadog setup and configuration
- `security`: Tools for code security scanning and searching [security signals][33] and [security findings][34]
- `software-delivery`: Tools for interacting with Software Delivery ([CI Visibility][21] and [Test Optimization][24])
- `synthetics`: Tools for interacting with Datadog [Synthetic tests][20]
- `workflows`: Tools for [Workflow Automation][39], including listing, inspecting, executing, and configuring workflows for agent use

To use a toolset, include the `toolsets` query parameter in the endpoint URL when connecting to the MCP Server ([remote authentication][27] only). 

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
For example, based on your selected [Datadog site][36] ({{< region-param key="dd_site_name" >}}):

- Retrieve only the core tools (this is the default if `toolsets` is not specified):
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Retrieve only Synthetic Testing-related tools:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- Retrieve core, Synthetic Testing, and Software Delivery tools:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

[36]: /getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

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
[18]: /account_management/rbac/permissions/#mcp
[19]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[20]: /synthetics/
[21]: /continuous_integration/
[24]: /tests/
[25]: /error_tracking/
[26]: /database_monitoring/
[27]: /bits_ai/mcp_server/setup
[28]: /tracing/
[29]: /feature_flags/
[30]: /llm_observability/mcp_server/
[31]: /network_monitoring/cloud_network_monitoring/
[32]: /network_monitoring/devices/
[33]: /security/threats/security_signals/
[34]: /security/misconfigurations/findings/
[35]: /product_analytics
[37]: https://help.datadoghq.com/hc/en-us/requests/new
[38]: /service_management/case_management/
[39]: /actions/workflows/
[40]: /bits_ai/mcp_server/setup#local-binary-authentication
[41]: /dashboards/
