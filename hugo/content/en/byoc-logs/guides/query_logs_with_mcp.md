---
title: Query BYOC Logs with the Datadog MCP Server
description: Learn how to query logs stored in BYOC Logs indexes using the Datadog MCP server
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-remote-mcp-server/"
  tag: "Blog"
  text: "Introducing the Datadog MCP server"
- link: "/ide_plugins/vscode/?tab=cursor#installation"
  tag: "Documentation"
  text: "Datadog Extension for VS Code & Cursor"
- link: "/byoc-logs/operate/search_logs/"
  tag: "Documentation"
  text: "Search Logs in BYOC Logs"
aliases:
  - /cloudprem/guides/query_logs_with_mcp/
---

## Overview

Use the `search_datadog_logs` tool on the [Datadog MCP (Model Context Protocol) server][1] to query logs stored in BYOC (Bring Your Own Cloud) Logs indexes. You can access the tool through AI-powered tools and integrations.

**Note**: BYOC Logs indexes are supported only by `search_datadog_logs`. The `analyze_datadog_logs` tool and the `datadog/querying-patterns` skill do not support BYOC Logs indexes.

## Prerequisites

- A running BYOC Logs deployment with logs ingested.
- Access to the [Datadog MCP server][1].
- Your BYOC Logs index name (visible in the [Datadog Log Explorer][2] under {{< ui >}}BYOC INDEXES{{< /ui >}}).

## Querying BYOC Logs

To query logs stored in BYOC Logs indexes, use `search_datadog_logs` and specify your BYOC Logs index name in addition to your standard log query.

For best results, your prompt **should also include**:
- (Recommended) Time range (for example, "in the last hour", "from the last 24 hours").
- (Recommended) Query filters (service, status, log content).

### Query parameters
The following table describes the key parameters used with `search_datadog_logs`:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `query` | Log search query using Datadog query syntax | `"*"` (all logs), `"service:web"`, `"status:error"` |
| `indexes` | Array of BYOC Logs index names to search | `["byoc--dev--main"]` |
| `from` | Start time for the query | `"now-1h"`, `"now-24h"`, `"2024-01-15T00:00:00Z"` |
| `to` | End time for the query | `"now"`, `"2024-01-15T23:59:59Z"` |
| `sort` | Sort order for results | `"-timestamp"` (descending), `"timestamp"` (ascending) |

For examples of parameter and natural language queries, see [Advanced query examples](#advanced-query-examples).

### Finding your BYOC Logs index name

To find your BYOC Logs index name:

1. Navigate to the [Datadog Log Explorer][2].
2. Look for the {{< ui >}}BYOC INDEXES{{< /ui >}} section in the left facet panel.
3. Your BYOC Logs indexes are listed there, in the format `byoc--<cluster_name>--<index_name>`.

You can also find your index names in the [BYOC Logs console][3] by selecting a cluster and clicking {{< ui >}}View Indexes{{< /ui >}}.

## Advanced query examples

When using AI-powered tools with `search_datadog_logs`, you can ask questions in natural language. The tool translates these into properly formatted BYOC Logs queries.

### Error logs from a specific service
**Prompt**:
"Show me error logs from the nginx service in the byoc--dev--main index in the last hour."

**Translates to**:
```json
{
  "query": "service:nginx status:error",
  "indexes": ["byoc--dev--main"],
  "from": "now-1h",
  "to": "now"
}
```

### Search for specific log content
**Prompt**:
"Find logs containing 'connection timeout' from the API service in byoc--prod--main from the last 24 hours."

**Translates to**:
```json
{
  "query": "service:api \"connection timeout\"",
  "indexes": ["byoc--prod--main"],
  "from": "now-24h",
  "to": "now"
}
```

### Filter by HTTP status code
**Prompt**:
"Get all 500 status code logs from the byoc--prod--main index in the last day."

**Translates to**:
```json
{
  "query": "status:500",
  "indexes": ["byoc--prod--main"],
  "from": "now-1d",
  "to": "now"
}
```

## Important notes

- The `indexes` parameter must contain valid BYOC Logs index names (in the format `byoc--<cluster_name>--<index_name>`).
- When using natural language queries, explicitly mention your BYOC Logs index name in your prompt.
- BYOC Logs data is queryable in real-time as soon as it is indexed.
- Query syntax follows standard [Datadog log search syntax][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/byoc-logs
[4]: /logs/explorer/search_syntax/
