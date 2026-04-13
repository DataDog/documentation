---
title: Security MCP Tools
description: Use AI agents to investigate security signals and analyze security findings with the Datadog MCP Server's security toolset.
further_reading:
- link: "bits_ai/mcp_server/setup"
  tag: "Documentation"
  text: "Set Up the Datadog MCP Server"
- link: "bits_ai/mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server Overview"
- link: "security/threats/security_signals/"
  tag: "Documentation"
  text: "Security Signals"
- link: "security/guide/findings-schema/?tab=library_vulnerability"
  tag: "Documentation"
  text: "Security Findings"
algolia:
  tags: ["mcp", "mcp server", "security", "security signals", "security findings"]
---

## Overview

The [Datadog MCP Server][1] lets AI agents query your security data through the [Model Context Protocol (MCP)][2]. The `security` toolset gives AI clients like Cursor, Claude Code, and OpenAI Codex access to your security signals and findings, so you can investigate threats and analyze your security posture using natural language.

<div class="alert alert-info">This page covers the <code>security</code> toolset of the remote Datadog MCP Server. For the Code Security MCP Server, which runs locally and scans source code during development, see <a href="/security/code_security/dev_tool_int/mcp_server/">Code Security MCP Server</a>.</div>

## Quickstart

The `security` toolset is not enabled by default. You can enable it by adding a parameter to your URL, which allows security tools to interact with your AI client.

1. [Set up the Datadog MCP Server][4].
2. When connecting to the Datadog MCP Server, add `security` to the `toolsets` parameter. For example, for your [Datadog site][3] ({{< region-param key="dd_site_name" >}}), use:
   ```text
   https://mcp.{{< region-param key="dd_site" >}}/api/unstable/mcp-server/mcp?toolsets=core,security
   ```

<div class="alert alert-warning">Without <code>?toolsets=security</code> in the URL, the security tools are not available to your AI client — even if the MCP Server is otherwise connected and working.</div>

## Use cases

You can use the `security` toolset to:

- **Triage security signals**: Ask your AI agent to surface recent high-severity Cloud SIEM signals, App & API Protection alerts, or Workload Protection threats, and get a summary of patterns and affected resources.
- **Analyze your security posture**: Query findings across Cloud Security with SQL to understand the distribution of misconfigurations, vulnerabilities, and identity risks across your environment.
- **Investigate specific findings**: Retrieve full details for a set of findings to understand scope, affected resources, and remediation context.
- **Correlate signals and findings**: Cross-reference active security signals with open findings to determine whether an alert is tied to a known posture issue.
- **Remediate vulnerabilities with an AI agent**: Pull library vulnerability findings, including code location and remediation guidance, and pass them to your AI agent to apply patches directly in your codebase.

## Available tools

The `security` toolset exposes the following tools to your AI client. For general information on how to use MCP tools, see the [Datadog MCP Server Overview][1].

`search_datadog_security_signals`
: Searches and retrieves security signals from Datadog, including Cloud SIEM signals, App & API Protection signals, and Workload Protection signals. Use this to surface and investigate suspicious activity.
: *Permissions required: `Security Signals Read`*

`security_findings_schema`
: Returns the available fields and their types for security findings. Call this before using `analyze_security_findings` to discover which fields you can filter and group by. Supports filtering by finding type.
: *Permissions required: `Security Monitoring Findings Read`*

`analyze_security_findings`
: Primary tool for analyzing security findings using SQL. Queries live data from the last 24 hours with support for aggregations, filtering, and grouping. Call `security_findings_schema` first to discover available fields.
: *Permissions required: `Security Monitoring Findings Read`, `Timeseries`*

`search_security_findings`
: Retrieves full security finding objects. Use this when you need complete finding details or when SQL-based analysis is not sufficient. Prefer `analyze_security_findings` for most analysis tasks.
: *Permissions required: `Security Monitoring Findings Read`*

## Required permissions

The Datadog role assigned to you must include the following permissions to use each tool:

| Tool | Required permissions |
|---|---|
| `search_datadog_security_signals` | `Security Signals Read` |
| `security_findings_schema` | `Security Monitoring Findings Read` |
| `analyze_security_findings` | `Security Monitoring Findings Read`, `Timeseries` |
| `search_security_findings` | `Security Monitoring Findings Read` |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/mcp_server/
[2]: https://modelcontextprotocol.io/
[3]: /getting_started/site/
[4]: /bits_ai/mcp_server/setup/
