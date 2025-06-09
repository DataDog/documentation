---
title: Datadog MCP Server
further_reading:
- link: "developers/ide_plugins/vscode/?tab=cursor"
  tag: "Documentation"
  text: "Datadog Extension for Cursor"
- link: "bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
---

{{< callout btn_hidden="true" >}}
The Datadog MCP server is in Preview.
{{< /callout >}}

The Datadog MCP server acts as a bridge between your observability data in Datadog and any AI agents that support the [Model Context Protocol (MCP)][1]. Providing structured access to relevant Datadog contexts, features, and tools, the MCP server lets you query and retrieve observability insights directly from AI-powered clients such as Cursor, OpenAI Codex, Claude Code, or your own AI agent.

* **Query** metrics, logs, traces, errors, dashboards, monitors, incidents, and services​.
* **Generate code** based on prompts, errors, and existing code.

<div class="alert alert-info"><strong>Tip:</strong> Use the <a href="https://docs.datadoghq.com/developers/ide_plugins/vscode/?tab=cursor">Datadog extension for Cursor</a> to enhance the editor's AI-assisted coding capabilities with informed insights from Datadog. The Datadog MCP server is included in the extension.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: https://github.com/DataDog/
