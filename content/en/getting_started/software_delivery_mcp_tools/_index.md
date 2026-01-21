---
title: Getting Started with Software Delivery MCP Tools
description: Connect AI agents to your CI Visibility and Test Optimization data using the Datadog MCP Server.
further_reading:
- link: "bits_ai/mcp_server/setup"
  tag: "Documentation"
  text: "Datadog MCP Server Setup"
- link: "continuous_integration/"
  tag: "Documentation"
  text: "CI Visibility"
- link: "tests/"
  tag: "Documentation"
  text: "Test Optimization"
- link: "https://www.datadoghq.com/blog/datadog-remote-mcp-server/"
  tag: "Blog"
  text: "Connect your AI agents to Datadog tools and context using the Datadog MCP Server"
---

{{< callout url="https://www.datadoghq.com/product-preview/datadog-mcp-server/" >}}
The Software Delivery MCP tools are in Preview. If you're interested in this feature, complete this form to request access. Learn more about the Datadog MCP Server on the <a href="https://www.datadoghq.com/blog/datadog-remote-mcp-server/">Datadog blog</a>.
{{< /callout >}}

## Overview

The [Datadog MCP Server][1] enables AI agents to access your Software Delivery data through the [Model Context Protocol (MCP)][2]. The `software-delivery` toolset provides tools for interacting with [CI Visibility][3] and [Test Optimization][4] directly from AI-powered clients like Cursor, Claude Code, or OpenAI Codex.

## Use cases

The Software Delivery MCP tools unlock AI-assisted workflows for:

- **Debugging pipeline failures**: Ask your AI agent to find recent pipeline failures, analyze error logs, and suggest fixes.
- **Identifying flaky tests**: Query for flaky tests in your repository and get prioritized recommendations for which to fix first.
- **Analyzing CI performance**: Get aggregated statistics on pipeline durations, failure rates, and trends over time.
- **Triaging test failures**: Understand which tests are failing, their ownership, and historical patterns.

## Available tools

The `software-delivery` toolset includes the following tools:

| Tool | Description |
|------|-------------|
| `search_datadog_ci_pipeline_events` | Search CI pipeline events with filters and get details on failures, durations, and statuses. |
| `aggregate_datadog_ci_pipeline_events` | Aggregate CI pipeline events for statistics like average durations, failure counts, and percentile analysis. |
| `get_datadog_flaky_tests` | Find flaky tests with triage details including failure rate, category, owners, and CI impact. |
| `aggregate_datadog_test_events` | Aggregate test events to analyze reliability and performance trends. |

## Example prompts

Once connected, try prompts like:

- "Show me all the pipelines for my commit `58b1488`."
- "What's causing the `integration-test` job to fail on my branch?"
- "Find active flaky tests for the checkout service sorted by failure rate."
- "How many failed pipelines have there been in the last 2 weeks?"
- "Show me the 95th percentile of pipeline duration grouped by pipeline name."

## Setup

To use the Software Delivery tools, connect to the Datadog MCP Server with the `software-delivery` toolset enabled. Add the `toolsets` query parameter to the endpoint URL:

```text
https://mcp.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=core,software-delivery
```

For full setup instructions including client configuration for Cursor, Claude Code, VS Code, and other AI clients, see the [Datadog MCP Server documentation][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/mcp_server/setup/
[2]: https://modelcontextprotocol.io/
[3]: /continuous_integration/
[4]: /tests/
