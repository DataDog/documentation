---
title: AI Tools for Work Management
description: Datadog Work Management integrates with AI tools to help automate work item triage, assignment, and resolution using the MCP Server and custom agents.
aliases:
- /service_management/case_management/mcp_server/
- /incident_response/case_management/mcp_server/
- /incident_response/case_management/ai/
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">AI features for Work Management are not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Datadog Work Management lets you assign work items to AI agents alongside people. It integrates with the Datadog MCP Server and custom agents built with Bits Agent Builder to automate work item triage, assignment, and resolution.

## MCP Server

The Datadog MCP Server exposes a `cases` toolset so that AI agents that support the [Model Context Protocol (MCP)][2] can access Work Management data. The `cases` toolset allows AI agents to create, search, update, and manage work items. Supported workflows include:

- **Searching for work items** based on status, priority, project, or other filters
- **Retrieving details of a work item** to understand the latest timeline of actions and remaining work
- **Creating a new work item** to track information related to an ongoing investigation
- **Updating an existing work item** with new findings, links to related Jira tickets, or escalated priority

For setup instructions and full details on the `cases` toolset, see the [Datadog MCP Server documentation][1].

## Custom agents

{{< callout url="https://www.datadoghq.com/product-preview/custom-agents-in-case-management/" btn_hidden="false" header="Join the Preview">}} Work Management integration with custom agents is in Preview.{{< /callout >}}

Assign work items to specialized agents built with [Bits Agent Builder][3] to automate the full work item lifecycle, from initial triage to follow-up and resolution. For example use cases, agent archetypes, and manual and automated assignment, see [Custom Agents][4].

[1]: /mcp_server
[2]: https://modelcontextprotocol.io/
[3]: /actions/agents/
[4]: /incident_response/work_management/ai/custom_agents/
