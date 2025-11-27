---
title: Datadog MCP Server
description: "Connect AI agents to Datadog observability data using the MCP Server to query metrics, logs, traces, and other insights."
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-remote-mcp-server/"
  tag: "Blog"
  text: "Connect your AI agents to Datadog tools and context using the Datadog MCP Server" 
- link: "developers/ide_plugins/vscode/?tab=cursor"
  tag: "Documentation"
  text: "Datadog Extension for Cursor"
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
  tags: ["mcp", "mcp server"]
  rank: 10
---

{{< callout url="https://www.datadoghq.com/product-preview/datadog-mcp-server/" >}}
The Datadog MCP Server is in Preview. If you're interested in this feature, complete this form. Read more about the MCP Server on the <a href="https://www.datadoghq.com/blog/datadog-remote-mcp-server/">Datadog blog</a>.
{{< /callout >}}

The Datadog MCP Server acts as a bridge between your observability data in Datadog and any AI agents that support the [Model Context Protocol (MCP)][1]. Providing structured access to relevant Datadog contexts, features, and tools, the MCP Server lets you query and retrieve observability insights directly from AI-powered clients such as Cursor, OpenAI Codex, Claude Code, or your own AI agent.

* **Query** metrics, logs, traces, errors, dashboards, monitors, incidents, and services​.
* **Generate code** based on prompts, errors, and existing code.

<div class="alert alert-tip">Use the <a href="https://docs.datadoghq.com/developers/ide_plugins/vscode/?tab=cursor">Datadog extension for Cursor</a> to enhance the editor's AI-assisted coding capabilities with informed insights from Datadog. The Datadog MCP Server is included in the extension.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: https://github.com/DataDog/
