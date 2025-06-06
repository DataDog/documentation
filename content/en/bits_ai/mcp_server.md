---
title: Datadog MCP Server
further_reading:
- link: "developers/ide_plugins/vscode/?tab=cursor"
  tag: "Documentation"
  text: "Datadog Extension for VS Code & Cursor"
- link: "bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
- link: "bits_ai/managing_incidents/"
  tag: "Documentation"
  text: "Managing Incidents"
---

{{< callout url="https://www.datadoghq.com/product-preview/" >}}
The Datadog MCP server is in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

The Datadog MCP server acts as a bridge between your observability data in Datadog and any AI agents that support the [Model Context Protocol (MCP)][1]. Providing structured access to relevant Datadog contexts, features, and tools, the MCP server lets you query and retrieve observability insights directly from AI-powered clients such as Cursor, OpenAI Codex, Claude Code, or your own AI agent.

* **Query** metrics, logs, traces, errors, dashboards, monitors, incidents, and services​
* **Generate code** based on prompts, errors, and existing code

<div class="alert alert-info"><strong>Tip:</strong> Use the <a href="https://docs.datadoghq.com/developers/ide_plugins/vscode/?tab=cursor">Datadog extension for Cursor</a> to enhance the editor's AI-assisted coding capabilities with informed insights from Datadog. The Datadog MCP server is included in the extension.</div>

## Get started

MCP server setup varies between third-party AI clients, but it often involves creating or editing the client's MCP server configuration file. Add the following to the file:

{{< tabs >}}
{{% tab "Docker" %}}
```json
{
  "mcpServers": {
    "Datadog": {
      "command": "docker",
      "args": [
        "SOME_ARGUMENT",
        "ANOTHER_ARGUMENT",
        "MAYBE_DATADOG_API_KEY",
        "MAYBE_ANOTHER_KEY",
        "mcp/datadog"
      ],
      "env": {
        "MAYBE_DATADOG_API_KEY": "<API_KEY_VALUE>",
        "MAYBE_ANOTHER_KEY": "<ANOTHER_KEY_VALUE>"
      }
    }
  }
}
```
{{% /tab %}}

{{% tab "npx" %}}
```json
{
  "mcpServers": {
    "Datadog": {
      "command": "npx",
      "args": [
        "ARGUMENT_HERE",
        "@modelcontextprotocol/server-datadog"
      ],
      "env": {
        "MAYBE_DATADOG_API_KEY": "<API_KEY_VALUE>",
        "MAYBE_ANOTHER_KEY": "<ANOTHER_KEY_VALUE>"
      }
    }
  }
}
```
{{% /tab %}}
{{< /tabs >}}

## Available tools

See the Datadog MCP server's [GitHub repository][2] for a list of available tools.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: https://github.com/DataDog/
