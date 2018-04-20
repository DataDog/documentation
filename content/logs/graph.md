---
title: Log Graph
kind: documentation
description: "Perform analytics with Log Graphs"
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "logs/parsing"
  tag: "Documentation"
  text: Learn more about parsing
---

Switch between the Log List and the Log Graph mode by clicking on this button:

{{< img src="logs/graph/log_graph_switch.png" alt="Log graph switch" responsive="true" popup="true" style="width:40%;">}}

## Log graph query 

Use the query to control what's displayed in your log graph:

1. Choose a [Measure][1] or [Facet][2] to graph. Choosing a [Measure][1] lets you choose the aggregation function whereas selecting a [Facet][2] displays the unique count.
    
    {{< img src="logs/graph/choose_measure_facet.png" alt="choose measure facet" responsive="true" popup="true" style="width:50%;">}}
2. Select the aggregation function for the [Measure][1] you want to graph:
    
    {{< img src="logs/graph/agg_function_log_graph.png" alt="aggregation function for log graph" responsive="true" popup="true" style="width:50%;">}}
3. Split by [Tag][1] or [Facet][2] to split your graph over the desired dimension.

    {{< img src="logs/graph/split_by_log_graph.png" alt="split by log graph" responsive="true" popup="true" style="width:50%;">}}

4. Choose to display either the *X* **top** or **bottom** values according to the selected [measure][1]    
    
    {{< img src="logs/graph/top_bottom_button.png" alt="top bottom button" responsive="true" popup="true" style="width:20%;">}}

## Visualizations 

Choose which log graph visualization you want to use with the graph selector:

{{< img src="logs/graph/graph_selector.png" alt="log graph selector" responsive="true" popup="true" style="width:30%;">}}

Available visualization are:

* [Timeseries](#timeseries)
* [Top List](#top-list)

### Timeseries

See a single [measure][1] evolution over a selected time frame and optionally splited by an available [facet][2].

The following log graph can be read as:  
The evolution of the **top 5** of **Url Path** according to the amount of **Unique client IP**  for each one of them over the last month.

{{< img src="logs/graph/timeserie_example.png" alt="timeserie example" responsive="true" popup="true" style="width:90%;">}}

### Top List 

Consult the top according to a [measure][1] for a given [facet][2]:

The following log graph can be read as:  
The **top 5** of **Url Path** according to the amount of Unique **client IP**  for each one of them

{{< img src="logs/graph/top_list_example.png" alt="top list example" responsive="true" popup="true" style="width:90%;">}}

## Related logs

Select or click on a section of the graph to either zoom in the graph or see the list of logs corresponding to your selection:

{{< img src="logs/graph/view_logs.gif" alt="view logs" responsive="true" popup="true" style="width:80%;">}}

## Export

{{< img src="logs/graph/export_button.png" alt="view logs button" responsive="true" popup="true" style="width:40%;">}}

Export your Log graph: 

* To create a new [log monitor][4]:  
    The query of your log graph is used to create the log monitor query
* To an existing [Timeboard][5]:  
    This functionality is not released yet, stay tuned ;)

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explore/#measures
[2]: /logs/explore/#facets
[3]: /getting_started/tagging
[4]: /monitors/monitor_types/log
[5]: /graphing/dashboards/timeboard