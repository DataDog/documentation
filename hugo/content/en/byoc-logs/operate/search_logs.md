---
title: Search BYOC Logs
description: Learn how to query and analyze your BYOC Logs data in Datadog
further_reading:
- link: "/byoc-logs/ingest/"
  tag: "Documentation"
  text: "Ingest logs to BYOC Logs"
- link: "/byoc-logs/operate/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting BYOC Logs"
- link: "/logs/explorer/search_syntax/"
  tag: "Documentation"
  text: "Log Search Syntax"
aliases:
  - /cloudprem/operate/search_logs/
---

## Explore BYOC Logs in the Logs Explorer

1. Go to the [Datadog Log Explorer][1].
2. On the left facet panel, under {{< ui >}}BYOC INDEXES{{< /ui >}}, select one or more indexes to search.

You can select a specific index to narrow your search, or select all indexes in a cluster to search across them.

BYOC (Bring Your Own Cloud) Logs index names follow this format:

```
byoc--<CLUSTER_NAME>--<INDEX_NAME>
```

## Cross-cluster search

Search multiple BYOC Logs clusters in a single query in the Log Explorer or through the public Logs API. Results from the selected clusters are combined.

### Log Explorer

In the [Log Explorer][1] search bar, use `index:` with a parenthesized list of cluster names prefixed with `byoc--` and separated by `OR`. For example, search the `cluster-1` and `cluster-2` clusters:

```text
index:(byoc--cluster-1 OR byoc--cluster-2)
```

Replace `cluster-1` and `cluster-2` with your BYOC Logs cluster names.

### Public API

Use the same query in the `filter.query` field of a request to the Search logs endpoint (`POST /api/v2/logs/events/search`). For example:

```json
{
  "filter": {
    "from": "now-15m",
    "to": "now",
    "query": "index:(byoc--cluster-1 OR byoc--cluster-2)"
  }
}
```

## Search limitations

You cannot query BYOC Logs indexes alongside other Datadog log indexes. Additionally, Flex Logs are not supported with BYOC Logs.

[1]: https://app.datadoghq.com/logs

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
