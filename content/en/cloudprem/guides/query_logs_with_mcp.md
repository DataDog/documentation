---
title: Query CloudPrem Logs with Datadog MCP Server
description: Learn how to query logs stored in CloudPrem indexes using the Datadog MCP server
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-remote-mcp-server/"
  tag: "Blog"
  text: "Introducing the Datadog MCP server"
- link: "https://docs.datadoghq.com/developers/ide_plugins/vscode/?tab=cursor#installation"
  tag: "Documentation"
  text: "Datadog Extension for VS Code & Cursor"
- link: "/cloudprem/operate/search_logs/"
  tag: "Documentation"
  text: "Search Logs in CloudPrem"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

The [Datadog MCP (Model Context Protocol) server][1] allows you to query your Datadog logs, including logs stored in CloudPrem indexes, directly through AI-powered tools and integrations. Querying CloudPrem logs with the Datadog MCP server unlocks several valuable capabilities, including:

- **Unified, Context-Aware Troubleshooting**: Query and correlate logs, metrics, and traces from any environment in one place, and pivot across telemetry types to identify root causes faster.
- **Natural Language Interaction**: Ask plain-language questions, and let AI generate the appropriate log queries without needing to remember syntax.

## Prerequisites

- A running CloudPrem deployment with logs ingested.
- Access to the [Datadog MCP server][1].
- Your CloudPrem index name (visible in the [Datadog Log Explorer][2] under **CLOUDPREM INDEXES**).

## Querying CloudPrem logs

To query logs stored in CloudPrem indexes, you **must** specify two critical parameters in addition to your standard log query:

- (Required) **`indexes`**: The name(s) of your CloudPrem index(es).
- (Required) **`storage_tier`**: Must be set to `"cloudprem"`.

Without both parameters, queries will default to searching standard Datadog log indexes instead of CloudPrem.

For best results, your prompt **should also include**:
- (Recommended) Time range (for example, "in the last hour", "from the last 24 hours").
- (Recommended) Query filters (service, status, log content).

### Query parameters
The following table describes the key parameters used when querying logs with the MCP server:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `query` | Log search query using Datadog query syntax | `"*"` (all logs), `"service:web"`, `"status:error"` |
| `indexes` | Array of CloudPrem index names to search | `["cloudprem-dev"]` |
| `storage_tier` | Storage tier to query (must be `"cloudprem"` for CloudPrem logs) | `"cloudprem"` |
| `from` | Start time for the query | `"now-1h"`, `"now-24h"`, `"2024-01-15T00:00:00Z"` |
| `to` | End time for the query | `"now"`, `"2024-01-15T23:59:59Z"` |
| `sort` | Sort order for results | `"-timestamp"` (descending), `"timestamp"` (ascending) |

For examples of parameter and natural language queries, see [Advanced query examples](#advanced-query-examples).

### Finding your CloudPrem index name

To find your CloudPrem index name:

1. Navigate to the [Datadog Log Explorer][2].
2. Look for the **CLOUDPREM INDEXES** section in the left facet panel.
3. Your CloudPrem indexes are listed there, typically in the format `cloudprem-<cluster_id>`.

You can also find your index name in the [CloudPrem console][3], where your cluster ID is displayed.

## Advanced query examples

When using AI-powered tools with the Datadog MCP server, you can ask questions in natural language. The MCP server will automatically translate these into properly formatted CloudPrem queries.

### Error logs from a specific service
**Prompt**:
"Show me error logs from the nginx service in the cloudprem-dev index in the last hour."

**Translates to**:
```json
{
  "query": "service:nginx status:error",
  "indexes": ["cloudprem-dev"],
  "storage_tier": "cloudprem",
  "from": "now-1h",
  "to": "now"
}
```

### Search for specific log content
**Prompt**:
"Find logs containing 'connection timeout' from the API service in cloudprem-prod from the last 24 hours."

**Translates to**:
```json
{
  "query": "service:api \"connection timeout\"",
  "indexes": ["cloudprem-prod"],
  "storage_tier": "cloudprem",
  "from": "now-24h",
  "to": "now"
}
```

### Filter by HTTP status code
**Prompt**:
"Get all 500 status code logs from the cloudprem-prod index in the last day."

**Translates to**:
```json
{
  "query": "status:500",
  "indexes": ["cloudprem-prod"],
  "storage_tier": "cloudprem",
  "from": "now-1d",
  "to": "now"
}
```

## Important notes

- **Both `storage_tier` and `indexes` are required** when querying CloudPrem logs. Without these parameters, queries will search standard Datadog indexes instead.
- `storage_tier` must always be set to `"cloudprem"`.
- The `indexes` parameter must contain valid CloudPrem index names (typically in the format `cloudprem-<cluster_id>`).
- When using natural language queries, explicitly mention your CloudPrem index name in your prompt.
- CloudPrem logs are queryable in real-time as soon as they are indexed.
- Query syntax follows standard [Datadog log search syntax][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/mcp_server/
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/cloudprem
[4]: /logs/explorer/search_syntax/
