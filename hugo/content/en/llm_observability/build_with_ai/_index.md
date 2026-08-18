---
title: Build with AI
description: Use the Datadog MCP server, CLI, and Claude Code skills to build and analyze LLM applications from your development environment.
---

Datadog offers an Agent-first development experience using our MCP, CLI and skill capabilities.

## Get started

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code># Connect the Datadog MCP server to your Claude Code session
claude mcp add --scope user --transport http datadog-llmo-mcp \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'

# Install the Datadog MCP CLI, to run the MCP server locally instead
curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
datadog_mcp_cli login
claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli

# Install the Pup CLI with Homebrew (macOS/Linux) and authenticate
brew tap datadog-labs/pack
brew install datadog-labs/pack/pup
pup auth login

# Install the Agent Observability skills
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">This product is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

For other Pup CLI installation methods, supported commands, and authentication options, see [Pup CLI][1].

[1]: /cli/

{{< whatsnext desc="Build with the Datadog MCP server and skills:" >}}
    {{< nextlink href="/llm_observability/build_with_ai/mcp_server" >}}MCP Server{{< /nextlink >}}
    {{< nextlink href="/llm_observability/build_with_ai/claude_code_skills" >}}Claude Code Skills{{< /nextlink >}}
{{< /whatsnext >}}
