---
title: Graph snapshot
type: apicontent
order: 13.1
external_redirect: /api/#graph-snapshot
---

## Graph snapshot

**Note**: When a snapshot is created, [there is some delay][1] before it is available.

**ARGUMENTS**:

* **`metric_query`** [*required*]:
    The metric query.
* **`start`** [*required*]:
    The POSIX timestamp of the start of the query.
* **`end`** [*required*]:
    The POSIX timestamp of the end of the query.
* **`event_query`** [*optional*, *default*=**None**]:
    A query that adds event bands to the graph.
* **`graph_def`** [*optional*, *default*=**None**]:
    A JSON document defining the graph. `graph_def` can be used instead of `metric_query`. The JSON document uses the [grammar defined here][2] and should be formatted to a single line then URLEncoded.
* **`title`** [*optional*, *default*=**None**]:
    A title for the graph. If no title is specified, the graph doesn't have a title.

[1]: http://andreafalzetti.github.io/blog/2017/04/17/datadog-png-snapshot-not-showing.html
[2]: /dashboards/graphing_json/#grammar
