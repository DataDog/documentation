---
title: Event-Based Analytics
kind: documentation
description: "Put your event-based data (logs, apm events, etc.) into perspective with analytics"
---

## Overview

### Typical Use-cases

Let's say you are running an online market-place, and your third-party payment provider warned you about an isolated incident yesterday round 2pm in their own systems. This incident is likely to have impacted your own customers, and you need to know more about this. 

In datadog, you can access any single event (a log, an apm event, etc.), access and leverage its specific information. For instance, you'll search on errors on your `/payment` microservice, and eventually find a collection of events (logs in this example) telling you fine-grained information about the impact incident. 

``` yaml
2019-08-01 2:21:02+00:00 ERROR service:payment host:i-1234 http.referer:/account http.geoIP.country:UK http.status:500 resource:third-party/refund user_id:3141 payment.amount:199.90
```

But complementary, you might be interested in aggregated data, which gives you a higher perspective on your applications. With the same input query, you can see typically slice and dice to address such questions:

- most significant values, *e.g. what are the top pages impacted on your website, or top users in term of payment on hold*  
- computed results, *e.g. how many unique users were impacted by your incident, or what is the median amount of refund pending*
- evolution in time, *e.g. for how long your marketplace was impacted by this incident, or is it still ongoing with stable or growing trends*
- ponderations or correlations between values, *e.g. in UK you have higher number of users impacted, but lower amount at stake*

And this is where Visualisations can help. User-defined visualisations are accessible in 

- in [Log Analytics](https://app.datadoghq.com/logs/analytics) for Logs, [App Analytics](https://app.datadoghq.com/apm/search/analytics) for APM Events 
- in [Dashboards](https://app.datadoghq.com/dashboard/lists) and [Notebooks](https://app.datadoghq.com/notebook/list).


### How aggregations work behind the scenes

Aggregations (count, mean, sum, percentiles, etc.) are processed on-the-fly from a bottom-up approach, where each single event indexed for your organisation count. Aggregations are based on all the events matching a **query**, and result in **groups** (or slices) by values in one or multiple dimensions (time and/or facets). 

Let's illustrate this on a fictive bar timeline where each bar represents a time interval. In this example, Datadog creates one aggregation for each of the time intervals for the entire set of logs. Note that log events are not necessarily uniformly time-distributed, so you may create aggregations for different amount of logs.

In the following example, each dot represents one log event. The X-axis is the timestamp of the log, and the Y-axis is the value of a duration attribute borne by logs. The timeseries displays a maximum-aggregation. Datadog displays a timeline with a rollout parameter; for example, there are 4 bars for the whole time frame.

{{< img src="logs/explorer/analytics/aggregation_howto.gif" alt="top list example" responsive="true" style="width:90%;">}}


### Queries, Groups, Facets, Measures, Options

The **query** delineates events considered in an Analytics, which are eventually aggregated into time and/or facet slices.

A **measure** is an event attributes whose values are treated as numeric values (e.g. execution time of a process, amount of a payment, memory size of a request, etc.). 

A **facet** is an event tag or event attribute whose values are treated as identifying values (e.g. name of services, users ID, http status codes, etc.). Facets can be used for aggregations **groups**. If so, the analytics is sliced with top-most or bottom-most values.



Some facets are out-of-the-box. 


## Visualisations

### Timeseries

### Toplists

### Table

But 

{{< img src="logs/explorer/analytics/explorer-button.png" alt="Logs Explorer" style="width:50%;" responsive="true">}}

You can control:

* the query that filters the set of logs to analyze
* the dimensions over which to split data
* the visualization method for aggregates and splits

From an analytics visualization, you can, additionally:

* create a widget in a dashboard out of that visualization
* create a monitor out of that query
* deep dive into subsets of the log list, depending on the interactions that the visualization enables

Save a log analytics view with the "Save As" button. You can load your teammates' saved views from the "Saved Views" tab.


## Build an analytics query

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

You have additional display options for timeseries:

* whether you display lines, bars, or areas
* data stacking option, by value, or by percentage
* color set

Noteworthy facts about stacking:

* Stacking is available only for query requests with a split.
* Stacking options are for bar and area displays only. Line displays are always overlapping.
* When you use a toplist option that hides part of your data, stacking does not show the total overall; rather, it shows only the subtotal for the top/bottom series.
* Stacking may not make sense when you have non-unique values in the split facet.
* Stacking may not make sense for some aggregration methods for measures.

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

{{% tab "Table" %}}

Visualize the top values from a [facet][1] according to a chosen [measure][2] (the first measure you choose in the list), and display the value of additional measures for elements appearing in this top. Update search query or drill through logs corresponding to either dimension.

The following Table Log Analytics shows:
The evolution of the **top Status Codes** according to their **Throughput**, along with the number of unique **Client IP** and over the last 15 minutes.

{{< img src="logs/explorer/analytics/logs_table_example.png" alt="table example" responsive="true" style="width:90%;">}}

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
