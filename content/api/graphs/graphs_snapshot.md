---
title: Graph Snapshot
type: apicontent
order: 17.1
---

## Graph Snapshot
##### ARGUMENTS

<ul class="arguments">
    {{< argument name="metric_query" description="The metric query." >}}
    {{< argument name="start" description="The POSIX timestamp of the start of the query." >}}
    {{< argument name="end" description="The POSIX timestamp of the end of the query." >}}
    {{< argument name="event_query" description="A query that will add event bands to the graph." default="None" >}}
    {{< argument name="graph_def" description="A JSON document defining the graph. <code>graph_def</code> can be used instead of <code>metric_query</code>. The JSON document uses the <a href='/graphingjson/#grammar'>grammar defined here</a> and should be formatted to a single line then URLEncoded. The <code>graph_def</code> argument is only available in the REST API and not using the Ruby or Python wrappers." default="None" >}}
    {{< argument name="title" description="A title for the graph. If no title is specified, the graph will not have a title." default="None" >}}
</ul>