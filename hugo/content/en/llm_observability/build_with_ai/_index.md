---
title: Build with AI
description: Use the Datadog MCP server, CLI, and Claude Code skills to build and analyze LLM applications from your development environment.
---

Datadog supports coding agent workflows through the Datadog MCP server, the Pup CLI, and Claude Code skills. Use them to investigate your Agent Observability data and iterate on your LLM application without leaving your development environment.

## Get started

### Install the skills

{{< code-block lang="shell" >}}
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
{{< /code-block >}}

### Choose a data backend

The skills read your Agent Observability data through either the Datadog MCP server or the Pup CLI. Set up one of them. Each skill detects the MCP server at startup and falls back to the Pup CLI when the MCP server is unavailable.

{{% collapse-content title="Option A: Datadog MCP server" level="h4" expanded=true id="option-a-mcp-server" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Connect the MCP server to your Claude Code session:

<pre><code>claude mcp add --scope user --transport http datadog-llmo-mcp \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'</code></pre>

To run the MCP server as a local binary instead, install the Datadog MCP CLI:

{{< code-block lang="shell" >}}
curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
datadog_mcp_cli login
claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli
{{< /code-block >}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">This product is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

For the full setup, including authentication options and the available tools, see [MCP Server][2].

{{% /collapse-content %}}

{{% collapse-content title="Option B: Pup CLI" level="h4" expanded=false id="option-b-pup-cli" %}}

Install the Pup CLI with Homebrew (macOS/Linux) and authenticate:

{{< code-block lang="shell" >}}
brew tap datadog-labs/pack
brew install datadog-labs/pack/pup
pup auth login
{{< /code-block >}}

For other installation methods, supported commands, and authentication options, see [Pup CLI][1].

{{% /collapse-content %}}

{{< whatsnext desc="Build with the Datadog MCP server and skills:" >}}
    {{< nextlink href="/llm_observability/build_with_ai/mcp_server" >}}MCP Server{{< /nextlink >}}
    {{< nextlink href="/llm_observability/build_with_ai/claude_code_skills" >}}Claude Code Skills{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /cli/
[2]: /llm_observability/build_with_ai/mcp_server
