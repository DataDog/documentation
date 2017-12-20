---
title: Graph Snapshot
type: apicontent
order: 18.1
---

## Graph Snapshot
##### ARGUMENTS

* `metric_query` [*required*]:  
    The metric query.
* `start` [*required*]:  
    The POSIX timestamp of the start of the query.
* `end` [*required*]:  
    The POSIX timestamp of the end of the query.
* `event_query` [*optional*, *default*=**None**]:  
    A query that adds event bands to the graph.
* `graph_def` [*optional*, *default*=**None**]:  
    A JSON document defining the graph. `graph_def` can be used instead of `metric_query`. The JSON document uses the [grammar defined here](/graphing/miscellaneous/graphingjson/#grammar) and should be formatted to a single line then URLEncoded.
* `title` [*optional*, *default*=**None**]:  
    A title for the graph. If no title is specified, the graph doesn't have a title.
