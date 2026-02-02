---
title: Query CloudPrem Logs with Datadog MCP Server
description: Learn how to query logs stored in CloudPrem indexes using the Datadog MCP server
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-mcp-server/"
  tag: "Blog"
  text: "Introducing the Datadog MCP server"
- link: "/cloudprem/operate/search_logs/"
  tag: "Documentation"
  text: "Search Logs in CloudPrem"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

The Datadog MCP (Model Context Protocol) server allows you to query your Datadog logs, including logs stored in CloudPrem indexes, directly through AI-powered tools and integrations. This guide explains how to query CloudPrem logs using the MCP server.

## Prerequisites

- A running CloudPrem deployment with logs ingested.
- Access to the Datadog MCP server.
- Your CloudPrem index name (visible in the [Datadog Log Explorer][1] under **CLOUDPREM INDEXES**).

## Querying CloudPrem logs

To query logs stored in CloudPrem indexes, you need to specify two critical parameters in addition to your standard log query:

1. **`indexes`**: The name(s) of your CloudPrem index(es).
2. **`storage_tier`**: Set to `"cloudprem"` to query CloudPrem storage.

### Example query

Here's an example query that searches all logs in a CloudPrem index from the past hour:

```json
{
  "query": "*",
  "indexes": ["cloudprem-dev"],
  "storage_tier": "cloudprem",
  "from": "now-1h",
  "to": "now",
  "sort": "-timestamp"
}
```

### Query parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `query` | Log search query using Datadog query syntax | `"*"` (all logs), `"service:web"`, `"status:error"` |
| `indexes` | Array of CloudPrem index names to search | `["cloudprem-dev"]` |
| `storage_tier` | Storage tier to query (must be `"cloudprem"` for CloudPrem logs) | `"cloudprem"` |
| `from` | Start time for the query | `"now-1h"`, `"now-24h"`, `"2024-01-15T00:00:00Z"` |
| `to` | End time for the query | `"now"`, `"2024-01-15T23:59:59Z"` |
| `sort` | Sort order for results | `"-timestamp"` (descending), `"timestamp"` (ascending) |

### Finding your CloudPrem index name

To find your CloudPrem index name:

1. Navigate to the [Datadog Log Explorer][1].
2. Look for the **CLOUDPREM INDEXES** section in the left facet panel.
3. Your CloudPrem indexes are listed there, typically in the format `cloudprem-<cluster_id>`.

You can also find your index name in the [CloudPrem console][2], where your cluster ID is displayed.

## Advanced query examples

### Search for specific service errors

```json
{
  "query": "service:api status:error",
  "indexes": ["cloudprem-dev"],
  "storage_tier": "cloudprem",
  "from": "now-24h",
  "to": "now",
  "sort": "-timestamp"
}
```

## Important notes

- Always include `"storage_tier": "cloudprem"` when querying CloudPrem logs.
- The `indexes` parameter must contain valid CloudPrem index names.
- CloudPrem logs are queryable in real-time as soon as they are indexed.
- Query syntax follows standard [Datadog log search syntax][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: https://app.datadoghq.com/cloudprem
[3]: /logs/explorer/search_syntax/

