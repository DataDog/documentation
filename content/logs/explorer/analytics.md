---
title: Log Analytics
kind: documentation
description: "Perform Log Analytics"
aliases:
  - /logs/graph
  - /logs/analytics
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: "Discover how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "logs/explorer"
  tag: "Documentation"
  text: "See how to explore your logs"
- link: "logs/explorer/patterns"
  tag: Documentation
  text: "Detect patterns inside your logs"
---

## Log Analytics query 

Use the query to control what's displayed in your Log Analytics:

1. Choose a [Measure][1] or [Facet][2] to graph. [Measure][1] lets you choose the aggregation function whereas [Facet][2] displays the unique count.
    
    {{< img src="logs/explorer/analytics/choose_measure_facet.png" alt="choose measure facet" responsive="true" style="width:50%;">}}
2. Select the aggregation function for the [Measure][1] you want to graph:
    
    {{< img src="logs/explorer/analytics/agg_function_log_graph.png" alt="aggregation function for Log Analytics" responsive="true" style="width:50%;">}}

3. Use [Tag][1] or [Facet][2] to split your graph.  

    {{< img src="logs/explorer/analytics/split_by_log_graph.png" alt="split by Log Analytics" responsive="true" style="width:50%;">}}

4. Choose to display either the *X* **top** or **bottom** values according to the selected [measure][1].
    
    {{< img src="logs/explorer/analytics/top_bottom_button.png" alt="top bottom button" responsive="true" style="width:20%;">}}
    
5. Choose the Timesteps graph.
  Changing the global timeframe changes the list of available Timesteps values.

    {{< img src="logs/explorer/analytics/timesteps.png" alt="Timestep" responsive="true" style="width:30%;">}}


## Visualizations 

Select a Log Analytics visualization type using the graph selector:

{{< img src="logs/explorer/analytics/graph_selector.png" alt="Log Analytics selector" responsive="true" style="width:30%;">}}

Available visualizations:

{{< tabs >}}
{{% tab "Timeseries" %}}

Visualize the evolution of a single [measure][1] (or a [facet][2] unique count of values) over a selected time frame, and (optionally) split by an available [facet][2].

The following timeseries Log Analytics shows:
The evolution of the **top 5 URL Paths** according to the number of **unique Client IPs** over the last month.

{{< img src="logs/explorer/analytics/timeserie_example.png" alt="timeserie example" responsive="true" style="width:90%;">}}


[1]: /logs/explorer/?tab=measures#setup
[2]: /logs/explorer/?tab=facets#setup
{{% /tab %}}
{{% tab "Top List" %}}

Visualize the top values from a [facet][1] according to the chosen [measure][2]:

The following Top List Log Analytics shows:
The evolution of the **top 5 URL Paths** according to the number of **unique Client IPs** over the last month.

{{< img src="logs/explorer/analytics/top_list_example.png" alt="top list example" responsive="true" style="width:90%;">}}


[1]: /logs/explorer/?tab=facets#setup
[2]: /logs/explorer/?tab=measures#setup
{{% /tab %}}
{{< /tabs >}}

## Related logs

Select or click on a section of the graph to either zoom in the graph or see the list of logs corresponding to your selection:

{{< img src="logs/explorer/analytics/view_logs.gif" alt="view logs" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/?tab=measures#setup
[2]: /logs/explorer/?tab=facets#setup
