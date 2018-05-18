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

Switch between the Log List and the Log Graph modes by clicking on the *Log Mode* button:

{{< img src="logs/graph/log_graph_switch.png" alt="Log graph switch" responsive="true" popup="true" style="width:40%;">}}

## Log Graph query 

Use the query to control what's displayed in your Log Graph:

1. Choose a [Measure][1] or [Facet][2] to graph. [Measure][1] lets you choose the aggregation function whereas [Facet][2] displays the unique count.
    
    {{< img src="logs/graph/choose_measure_facet.png" alt="choose measure facet" responsive="true" popup="true" style="width:50%;">}}
2. Select the aggregation function for the [Measure][1] you want to graph:
    
    {{< img src="logs/graph/agg_function_log_graph.png" alt="aggregation function for Log Graph" responsive="true" popup="true" style="width:50%;">}}

3. Use [Tag][1] or [Facet][2] to split your graph.  

    {{< img src="logs/graph/split_by_log_graph.png" alt="split by Log Graph" responsive="true" popup="true" style="width:50%;">}}

4. Choose to display either the *X* **top** or **bottom** values according to the selected [measure][1].
    
    {{< img src="logs/graph/top_bottom_button.png" alt="top bottom button" responsive="true" popup="true" style="width:20%;">}}
    
5. Choose the graph Timesteps.
  Changing the global timeframe changes the list of available Timesteps values.

    {{< img src="logs/graph/timesteps.png" alt="Timestep" responsive="true" popup="true" style="width:30%;">}}


## Visualizations 

Select a Log Graph visualization type using the graph selector:

{{< img src="logs/graph/graph_selector.png" alt="Log Graph selector" responsive="true" popup="true" style="width:30%;">}}

Available visualizations:

* [Timeseries](#timeseries)
* [Top List](#top-list)

### Timeseries

Visualize the evolution of a single [measure][1] (or a [facet][2] unique count of values) over a selected time frame, and (optionally) split by an available [facet][2].

The following timeseries Log Graph shows:
The evolution of the **top 5 URL Paths** according to the number of **unique Client IPs** over the last month.

{{< img src="logs/graph/timeserie_example.png" alt="timeserie example" responsive="true" popup="true" style="width:90%;">}}

### Top List 

Visualize the top values from a [facet][2] according to the chosen [measure][1]:

The following Top List Log Graph shows:
The evolution of the **top 5 URL Paths** according to the number of **unique Client IPs** over the last month.

{{< img src="logs/graph/top_list_example.png" alt="top list example" responsive="true" popup="true" style="width:90%;">}}

## Related logs

Select or click on a section of the graph to either zoom in the graph or see the list of logs corresponding to your selection:

{{< img src="logs/graph/view_logs.gif" alt="view logs" responsive="true" popup="true" style="width:80%;">}}

## Export

{{< img src="logs/graph/export_button.png" alt="view logs button" responsive="true" popup="true" style="width:40%;">}}

Export your Log Graph: 

* To create a new [log monitor][4]:  
    The query of your Log Graph is used to create the log monitor query.
* To an existing [Timeboard][5]:  
    This functionality is in beta, [contact our support team][6] to activate it for your organization.

## Dashboard 

**This functionality is still in beta, [contact our support team][6] to activate it for your organization.**

Use the [Timeseries widget][7] to display log graph directly in your [Dashboards][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explore/#measures
[2]: /logs/explore/#facets
[3]: /getting_started/tagging
[4]: /monitors/monitor_types/log
[5]: /graphing/dashboards/timeboard
[6]: /help
[7]: /graphing/dashboards/widgets/#timeseries
[8]: /graphing/dashboards
