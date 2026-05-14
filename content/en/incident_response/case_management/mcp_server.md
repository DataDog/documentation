---
title: MCP Server
aliases:
- /service_management/case_management/mcp_server/
further_reading:
- link: "/bits_ai/mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server"
---

## Overview

The [Datadog MCP Server][1] exposes a  `cases` toolset so that AI agents that support the [Model Context Protocol (MCP)][2] can access Case Management data. The `cases` toolset allows AI agents to create, search, update, and manage cases. Supported workflows include:

- **Searching for cases** based on status, priority, project, or other filters
- **Retrieving details of a case** to undersatnd the latest timeline of actions and remainining work
- **Creating a new case** to track information related to an ongoing investigation
- **Updating an existing case** with new findings, links to related Jira tickets, or escalated priority

## Available tools

For setup instructions and full details on the `cases` toolset, see the [Datadog MCP Server documentation][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/mcp_server
[2]: https://modelcontextprotocol.io/
