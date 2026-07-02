---
title: Security MCP Tools
description: Use AI agents to investigate security signals and analyze security findings with the Datadog MCP Server's security toolset.
further_reading:
- link: "mcp_server/setup"
  tag: "Documentation"
  text: "Set Up the Datadog MCP Server"
- link: "mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server Overview"
- link: "security/threats/security_signals/"
  tag: "Documentation"
  text: "Security Signals"
- link: "security/guide/findings-schema/?tab=library_vulnerability"
  tag: "Documentation"
  text: "Security Findings"
- link: "security/detection_rules/"
  tag: "Documentation"
  text: "Detection Rules"
- link: "security/suppressions/"
  tag: "Documentation"
  text: "Suppressions"
algolia:
  tags: ["mcp", "mcp server", "security", "security signals", "security findings", "detection rules", "suppressions"]
---

## Overview

The [Datadog MCP Server][1] lets AI agents query your security data through the [Model Context Protocol (MCP)][2]. The `security` toolset gives AI clients like Cursor, Claude Code, and OpenAI Codex access to your security signals and findings, so you can investigate threats and analyze your security posture using natural language.

<div class="alert alert-info">This page covers the <code>security</code> toolset of the remote Datadog MCP Server. For the Code Security MCP Server, which runs locally and scans source code during development, see <a href="/security/code_security/dev_tool_int/mcp_server/">Code Security MCP Server</a>.</div>

### Use cases

You can use the `security` toolset to:

- **Analyze and understand security signals**: Ask your AI agent to surface recent high-severity Cloud SIEM signals, App & API Protection alerts, or Workload Protection threats, and get a summary of patterns and affected resources.
- **Triage security signals**: Update triage state or assignee across a set of matching signals in bulk.
- **Analyze your security posture**: Query findings across Cloud Security with SQL to understand the distribution of misconfigurations, vulnerabilities, and identity risks across your environment.
- **Investigate specific findings**: Retrieve full details for a set of findings to understand scope, affected resources, and remediation context.
- **Triage security findings**: Create Jira issues, ServiceNow tickets, or Case Management cases for findings. Assign findings to team members, or mute false positives and accepted risks.
- **Correlate signals and findings**: Cross-reference active security signals with open findings to determine whether an alert is tied to a known posture issue.
- **Inspect and manage detection rules**: List, retrieve, create, update, and delete detection rules to understand and manage the logic generating signals.
- **Manage suppressions**: Create, update, and delete suppressions to silence noisy rules for specific conditions without disabling them entirely.
- **Respond to attacks with App & API Protection**: Block or unblock IPs, users, and user agents on the denylist, and suppress false positives with passlist exclusion filters.
- **Remediate vulnerabilities with an AI agent**: Pull library vulnerability findings, including code location and remediation guidance, and pass them to your AI agent to apply patches directly in your codebase.

## Quickstart

The `security` toolset is not enabled by default. You can enable it by adding a parameter to your URL, which allows security tools to interact with your AI client.

1. [Set up the Datadog MCP Server][4].
2. When connecting to the Datadog MCP Server, add `security` to the `toolsets` parameter. For example, for your [Datadog site][3] ({{< region-param key="dd_site_name" >}}), use:
   ```text
   https://mcp.{{< region-param key="dd_site" >}}/v1/mcp?toolsets=core,security
   ```

<div class="alert alert-warning"><code>?toolsets=security</code> must be in the URL. Otherwise, security tools are not available to your AI client, even if the MCP Server is otherwise connected and working.</div>

## Available tools

The `security` toolset exposes the following tools to your AI client. Each tool performs a specific action on your security data. When you ask a question in natural language, your AI client calls these tools on your behalf to retrieve the information it needs. For general information on how to use MCP tools, see the [Datadog MCP Server Overview][1].

### Security Signals

`get_datadog_security_signals_schema`
: Returns the available fields and their types for security signals. Signal types map to `@workflow.rule.type` values such as `Log Detection`, `Application Security`, and `Workload Security`.
: *Permissions required: `Security Signals Read`*

`search_datadog_security_signals`
: Searches and retrieves security signals from Datadog, including Cloud SIEM signals, App & API Protection signals, and Workload Protection signals. Use this to surface and investigate suspicious activity.
: *Permissions required: `Security Signals Read`*

`analyze_datadog_security_signals`
: Analyzes security signals using SQL for aggregations, grouping, and trend analysis. Use this for counts, top-N breakdowns, and time-based questions. To list signals or retrieve a single signal, use `search_datadog_security_signals` or `get_datadog_security_signal` instead. Call `get_datadog_security_signals_schema` first to discover queryable fields.
: *Permissions required: `Security Signals Read`, `Timeseries`*

`get_datadog_security_signal`
: Retrieves the full details of a single security signal by ID, including attributes, rule information, triage state, tags, and case correlations. Use `search_datadog_security_signals` to find signal IDs first.
: *Permissions required: `Security Signals Read`*

`update_datadog_security_signals_triage`
: Updates the triage state or assignee of one or more security signals in bulk (up to 500 signals). Accepts either a list of signal IDs or a filter query matching all signals to update.
: *Permissions required: `Security Signals Write`*

### Security Findings

`get_datadog_security_findings_schema`
: Returns the available fields and their types for security findings. Call this before using `analyze_datadog_security_findings` to discover which fields you can filter and group by. Supports filtering by finding type.
: *Permissions required: `Security Monitoring Findings Read`*

`analyze_datadog_security_findings`
: Primary tool for analyzing security findings using SQL. Queries live data from the last 24 hours with support for aggregations, filtering, and grouping. Call `get_datadog_security_findings_schema` first to discover available fields.
: *Permissions required: `Security Monitoring Findings Read`, `Timeseries`*

`search_datadog_security_findings`
: Retrieves full security finding objects. Use this when you need complete finding details or when SQL-based analysis is not sufficient. Prefer `analyze_datadog_security_findings` for most analysis tasks.
: *Permissions required: `Security Monitoring Findings Read`*

`get_datadog_security_findings_ticket_suggestions`
: Returns ranked project suggestions for ticketing security findings. Shows available Case Management, Jira, and ServiceNow projects with usage data. Call this before `create_datadog_security_findings_ticket` to discover which project to use.
: *Permissions required: `Security Monitoring Findings Read`, `Cases Read`*

`create_datadog_security_findings_ticket`
: Creates a Case Management case, Jira issue, or ServiceNow ticket for security findings. Requires specific finding IDs and a project ID. Use `get_datadog_security_findings_ticket_suggestions` first to discover available projects.
: *Permissions required: `Security Monitoring Findings Write`, `Cases Read`, `Cases Write`*

`detach_datadog_security_findings_ticket`
: Detaches security findings from their linked case or ticket. Since Jira and ServiceNow tickets are linked through Case Management, detaching the case also detaches any downstream ticket.
: *Permissions required: `Security Monitoring Findings Write`, `Cases Write`*

`mute_datadog_security_findings`
: Mutes or unmutes security findings to suppress them from alerts and dashboards. Requires a mute reason (`PENDING_FIX`, `FALSE_POSITIVE`, `ACCEPTED_RISK`, or `OTHER`) and supports an optional description and expiration date.
: *Permissions required: `Security Monitoring Findings Write`*

`assign_datadog_security_findings`
: Assigns or unassigns security findings to a user. Assignment cascades to any linked cases. Omit the assignee ID to unassign.
: *Permissions required: `Security Monitoring Findings Write`*

### Detection Rules

`get_datadog_security_detection_rules_schema`
: Returns the authoring reference and schema for detection rules. Covers supported rule types, detection methods, query syntax, tag conventions, and field names that can be used as search facets. Use this before authoring or querying detection rules. Currently supported rule types: log detection and API security.
: *Permissions required: `Security Monitoring Rules Read`*

`get_datadog_security_detection_rules`
: Retrieves security detection rules. Supports two modes: provide `rule_id` to get the full definition of a single rule by ID, or omit `rule_id` to list rules (optionally filtered with `query` and token-limited with `max_tokens`). The two modes are mutually exclusive.
: *Permissions required: `Security Monitoring Rules Read`*

`create_datadog_security_detection_rule`
: Creates a new detection rule. Call `get_datadog_security_detection_rules_schema` first to fetch the required payload grammar, then supply a complete rule payload. On success, returns the full rule including its server-assigned ID.
: *Permissions required: `Security Monitoring Rules Write`*

`update_datadog_security_detection_rule`
: Updates an existing custom detection rule by replacing it entirely. Use this to enable or disable a rule, change thresholds, add cases, and more. Call `get_datadog_security_detection_rules` first to fetch the current rule body, modify the fields you need to change, and submit the full updated object. Cannot update Datadog-shipped default rules. On success, returns the full updated rule.
: *Permissions required: `Security Monitoring Rules Write`*

`delete_datadog_security_detection_rules`
: Deletes one or more custom detection rules by ID. Only custom (non-default) rules can be deleted. Each rule is authorized individually; rules that cannot be deleted appear in `failed_rules` without aborting the batch. Returns `deleted_rules` and `failed_rules`.
: *Permissions required: `Security Monitoring Rules Write`*

### Suppressions

`get_datadog_security_suppressions`
: Retrieves security monitoring suppressions. Supports three modes: list all suppressions, get a single suppression by ID, or get suppressions affecting a specific detection rule. Suppressions prevent detection rules from generating signals for matching conditions.
: *Permissions required: `Security Monitoring Suppressions Read`*

`create_datadog_security_suppression`
: Creates a new suppression rule that prevents a detection rule from generating signals matching specific conditions. At least one of `suppression_query` or `data_exclusion_query` must be provided.
: *Permissions required: `Security Monitoring Suppressions Write`*

`update_datadog_security_suppression`
: Updates an existing suppression rule. Only changes provided fields. Providing `version` enables optimistic concurrency control to prevent overwriting concurrent edits.
: *Permissions required: `Security Monitoring Suppressions Write`*

`delete_datadog_security_suppression`
: Deletes a suppression rule.
: *Permissions required: `Security Monitoring Suppressions Write`*

### App & API Protection

`get_datadog_security_passlist`
: Returns all WAF exclusion filter (passlist) entries for the organization to review existing suppressions.
: *Permissions required: `Application Security Management Protect Read`*

`upsert_datadog_security_passlist`
: Creates or updates a WAF exclusion filter (passlist) entry to suppress noisy rules on a specific service or endpoint.
: *Permissions required: `Application Security Management Protect Write`*

`delete_datadog_security_passlist`
: Deletes an existing WAF exclusion filter (passlist) entry.
: *Permissions required: `Application Security Management Protect Write`*

`get_datadog_security_denylist`
: Lists blocked IPs, users, and user agents (denylist entries), with optional filtering.
: *Permissions required: `Application Security Management Protect Read`*

`upsert_datadog_security_denylist_entry`
: Adds or updates a denylist block for an IP, user, or user agent with an expiration.
: *Permissions required: `Application Security Management Protect Write`*

`delete_datadog_security_denylist_entry`
: Unblocks a previously denylisted entity by setting its expiration in the past.
: *Permissions required: `Application Security Management Protect Write`*

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/
[2]: https://modelcontextprotocol.io/
[3]: /getting_started/site/
[4]: /mcp_server/setup/
