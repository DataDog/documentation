---
title: Graphs
type: apicontent
order: 16.1
---

## Graph Snapshot
ARGUMENTS

metric_query [required]
The metric query.
start [required]
The POSIX timestamp of the start of the query.
end [required]
The POSIX timestamp of the end of the query.
event_query [optional, default=None]
A query that will add event bands to the graph.
graph_def [optional, default=None]
A JSON document defining the graph. graph_def can be used instead of metric_query. The JSON document uses the grammar defined here and should be formatted to a single line then URLEncoded. The graph_def argument is only available in the REST API and not using the Ruby or Python wrappers.
title [optional, default=None]
A title for the graph. If no title is specified, the graph will not have a title.