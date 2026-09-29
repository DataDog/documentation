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

## Search across BYOC Logs clusters

Use Log Explorer, dashboards, log monitors, or the public Logs API to search across multiple BYOC Logs clusters with a single query. Results from the selected clusters are combined.

### Use Log Explorer

In [Log Explorer][1], select the BYOC clusters to search from the left facet panel under {{< ui >}}BYOC INDEXES{{< /ui >}}, or specify them in the search bar.

In the search bar, prefix each cluster name with `byoc--`. Group the names in parentheses after `index:`, separated by `OR`. For example:

```text
index:(byoc--cluster-1 OR byoc--cluster-2)
```

Replace `cluster-1` and `cluster-2` with your BYOC Logs cluster names.

Matching logs from the selected clusters appear in a single list. Changes to search filters and the time range apply to all selected clusters. Open a log to view its details.

To search a specific index within a cluster, use its qualified name. For example, search the `application` index in `cluster-1`:

```text
index:byoc--cluster-1--application
```

### Use dashboards and log monitors

Use cross-cluster queries in dashboards to visualize logs across multiple BYOC Logs clusters, such as tracking a service's errors across regions. Use them in log monitors to alert on conditions spanning multiple clusters.

### Use the Logs API

Send a request to the [Search logs endpoint][2] (`POST /api/v2/logs/events/search`). Set `filter.query` to a query that specifies multiple BYOC Logs clusters. For example:

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

You cannot query BYOC Logs indexes alongside other Datadog log indexes. Additionally, Flex Logs is not supported with BYOC Logs.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /api/latest/logs/#search-logs
