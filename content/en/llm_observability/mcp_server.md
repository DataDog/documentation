---
title: LLM Observability MCP Tools
description: "Connect AI agents to your LLM Observability traces and experiments using the Datadog MCP Server."
further_reading:
- link: "bits_ai/mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server"
- link: "/llm_observability/experiments"
  tag: "Documentation"
  text: "Set up and use LLM Observability Experiments"
- link: "/llm_observability/monitoring"
  tag: "Documentation"
  text: "Monitor your application with LLM Observability"
---

## Overview

{{< callout url="#" btn_hidden="true" header="Preview Feature">}}
LLM Observability MCP Tools are in Preview.
{{< /callout >}}

The [Datadog MCP Server][1] enables AI agents to access your [LLM Observability][2] data through the Model Context Protocol (MCP). The `llmobs` toolset provides tools for searching and analyzing traces, inspecting span details and content, and evaluating experiment results directly from AI-powered clients like Cursor, Claude Code, or OpenAI Codex.

## Use cases

The LLM Observability MCP tools enable AI-assisted workflows for:

- **Debugging agent execution**: Search for traces by ML app, error status, or custom tags, then examine span hierarchies and content to identify failures.
- **Analyzing trace structure**: Visualize the full span tree of a trace to understand how agents, LLMs, tools, and retrievals interact.
- **Investigating agent loops**: Review an agent's step-by-step execution loop to understand decision-making and tool invocation patterns.
- **Evaluating experiments**: Get summary statistics for experiment metrics, compare results across dimension segments, and inspect individual events.
- **Discovering experiment patterns**: Filter and sort experiment events by metric performance to find the best and worst-performing cases.

## Available tools

The `llmobs` toolset includes the following tools:

### Trace and span tools

`search_llmobs_spans`
: Search for spans matching filters or a raw query.

`get_llmobs_trace`
: Get the full structure of a trace as a span hierarchy tree, including span counts by kind, error indicators, and total duration.

`get_llmobs_span_details`
: Get detailed metadata for one or more spans, including timing, error info, LLM details (model, token counts), metrics, and evaluations.

`get_llmobs_span_content`
: Retrieve the actual content of a span field (input, output, messages, documents, or metadata) with optional JSONPath extraction.

`find_llmobs_error_spans`
: Find all error spans in a trace with propagation context, grouped by span kind with error messages and stack traces.

`expand_llmobs_spans`
: Load children of specific spans for progressive tree exploration when `get_llmobs_trace` returns collapsed nodes.

`get_llmobs_agent_loop`
: Get a chronological view of an agent's execution loop, showing each step (LLM calls, tool invocations, decisions) in order.

### Experiment tools

`get_llmobs_experiment_summary`
: Get a high-level experiment summary with pre-computed statistics for all evaluation metrics. Start here before using other experiment tools.

`list_llmobs_experiment_events`
: List experiment events with filtering by dimension or metric and sorting by metric value.

`get_llmobs_experiment_event`
: Get full details for a single experiment event, including input, output, expected output, all metrics, and dimensions.

`get_llmobs_experiment_metric_values`
: Get statistical analysis for a specific evaluation metric, optionally segmented by a dimension for comparison.

`get_llmobs_experiment_dimension_values`
: Get unique values for a dimension with counts, useful for discovering valid filter and segment values.

## Recommended workflows

### Trace analysis

1. **Search**: Use `search_llmobs_spans` to find traces by ML app, status, span kind, or custom tags.
2. **Visualize**: Use `get_llmobs_trace` to see the full span hierarchy tree.
3. **Inspect**: Use `get_llmobs_span_details` to get metadata, timing, and evaluations for specific spans.
4. **Read content**: Use `get_llmobs_span_content` to retrieve the actual I/O, messages, or documents.
5. **Debug errors**: Use `find_llmobs_error_spans` to locate all errors in a trace with propagation context.
6. **Expand**: Use `expand_llmobs_spans` to load children of collapsed spans for deeper exploration.
7. **Agent review**: Use `get_llmobs_agent_loop` to see the step-by-step execution flow of an agent span.

### Experiment analysis

1. **Summarize**: Use `get_llmobs_experiment_summary` to get overall statistics and discover available metrics and dimensions.
2. **Browse events**: Use `list_llmobs_experiment_events` to find events of interest, filtering by dimension or sorting by metric.
3. **Inspect events**: Use `get_llmobs_experiment_event` to view full details for a specific event.
4. **Analyze metrics**: Use `get_llmobs_experiment_metric_values` to get percentile distributions, true/false rates, or compare across dimension segments.
5. **Discover dimensions**: Use `get_llmobs_experiment_dimension_values` to find valid filter and segment values.

## Example prompts

After you are connected, try prompts like:

- Review error traces for my `customer-support-bot` app over the past week. Summarize the most common failure patterns, how often they occur, and recommend which ones to fix first.
- Find traces where my agent's responses were flagged by evaluations as low quality. Look at the inputs and outputs, then suggest specific changes to my system prompt to improve response quality.
- Look at recent agent traces for my app and find cases where the agent looped more than necessary. Analyze the decision-making at each step and suggest how to improve my tool descriptions to reduce unnecessary tool calls.
- A user reported a bad response. Here's the trace ID: `trace-123`. Walk me through exactly what happened: what the user asked, what the agent did at each step, and where things went wrong. Suggest a code fix.
- Analyze experiment `exp-456` and generate a markdown table of the worst-performing dimensions broken down by evaluation scores. Include any other relevant columns that help me understand where and why performance is degrading.
- Compare experiment `exp-123` (baseline) against experiment `exp-456`. Summarize what improved, what regressed, and by how much. Give me a recommendation on whether the changes are worth shipping.
- Summarize experiment `exp-456` and identify the top 5 lowest-scoring events. For each, show the input, output, and which evaluations failed.

## Combine with other Datadog tools

The `core` toolset included in the setup URL gives your AI agent access to additional Datadog tools that pair naturally with LLM Observability analysis.

### Export analysis to Datadog Notebooks

The `core` toolset includes `create_datadog_notebook` and `edit_datadog_notebook`, which let your AI agent create [Datadog Notebooks][3] directly from analysis results. You can export findings from agent chats into a collaborative, shareable notebook that lives in Datadog alongside your traces and experiments.

Try prompts like:

- Analyze experiment `exp-456`, identify the worst-performing dimensions, and export a summary report to a Datadog Notebook with a breakdown by evaluation scores.
- Review error traces for my `customer-support-bot` over the past week and create a Datadog Notebook with the findings, including common failure patterns and recommended fixes.

For custom visualizations that go beyond standard Datadog widgets, like comparison charts or quadrant plots, Notebooks also render [Mermaid diagrams][4] natively. Try prompts like:

- Analyze experiment `exp-456`, compare the `accuracy` scores across each prompt version, and export the results to a Datadog Notebook that includes a Mermaid bar chart of the average score for each version.
- Analyze experiment `exp-456` and export a Datadog Notebook that plots each prompt version on a Mermaid quadrant chart with `relevance` on one axis and `accuracy` on the other. Identify which versions are underperforming on both dimensions.

## Setup

To use the LLM Observability tools, connect to the Datadog MCP Server with the `llmobs` toolset enabled.

<div class="alert alert-info">For full setup instructions, including Cursor and VS Code extension configuration, see <a href="/bits_ai/mcp_server/setup/">Set Up the Datadog MCP Server</a>.</div>

Add the `toolsets=llmobs,core` query parameter to the MCP Server endpoint for your [Datadog site][5]:

```text
https://mcp.<DD_SITE>/api/unstable/mcp-server/mcp?toolsets=llmobs,core
```

For example:
- **US1**: `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=llmobs,core`
- **EU1**: `https://mcp.datadoghq.eu/api/unstable/mcp-server/mcp?toolsets=llmobs,core`

{{< tabs >}}
{{% tab "Remote authentication" %}}

This method uses the MCP specification's [Streamable HTTP][1] transport.

**Claude Code** (command line):

```bash
claude mcp add --transport http datadog-mcp "https://mcp.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=llmobs,core"
```

**Configuration file** (Codex CLI, Gemini CLI, Kiro CLI, or any MCP-compatible client):

```json
{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "https://mcp.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=llmobs,core"
    }
  }
}
```

[1]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http
{{% /tab %}}

{{% tab "Local binary authentication" %}}

This method uses the MCP specification's [stdio][2] transport. Use this if direct remote authentication is not available for you.

1. Install the Datadog MCP Server binary:

    ```bash
    curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
    ```

    This installs the binary to `~/.local/bin/datadog_mcp_cli`.

2. Run `datadog_mcp_cli login` to complete the OAuth login flow.

3. Configure your AI client. For Claude Code, add the following code to `~/.claude.json`, making sure to replace `<USERNAME>` in the command path:

    ```json
    {
      "mcpServers": {
        "datadog": {
          "type": "stdio",
          "command": "/Users/<USERNAME>/.local/bin/datadog_mcp_cli",
          "args": [],
          "env": {}
        }
      }
    }
    ```

    Or run:

    ```bash
    claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli
    ```

[2]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#stdio
{{% /tab %}}
{{< /tabs >}}

### Authentication

The MCP Server uses OAuth 2.0 for authentication. If you cannot go through the OAuth flow, provide a Datadog [API key and application key][6] as `DD_API_KEY` and `DD_APPLICATION_KEY` HTTP headers:

{{< code-block lang="json" >}}
{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "https://mcp.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=llmobs,core",
      "headers": {
          "DD_API_KEY": "<YOUR_API_KEY>",
          "DD_APPLICATION_KEY": "<YOUR_APPLICATION_KEY>"
      }
    }
  }
}
{{< /code-block >}}

For security, use a scoped API key and application key from a [service account][7] that has only the required permissions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/mcp_server/setup/
[2]: /llm_observability/
[3]: /notebooks/
[4]: /notebooks/guide/build_diagrams_with_mermaidjs/
[5]: /getting_started/site/
[6]: /account_management/api-app-keys/
[7]: /account_management/org_settings/service_accounts/
