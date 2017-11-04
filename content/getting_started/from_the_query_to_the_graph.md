---
title: Graphing with Datadog, from the query to the graph
kind: documentation
customnav: gettingstartednav
---

While setting up graphs is pretty simple in Datadog, this article aims at helping you leverage even more value from our graphing system.

This article focuses on describing the steps performed by our graphing system from the query to the graph, so that you get a good idea how to choose your graph settings.

Note that there is a short version of this article [here](/graphing/faq/how-does-datadog-render-graphs-my-graph-doesn-t-show-the-values-i-m-expecting).

We will use the metric **system.disk.total** as an example. We want to graph data associated to this metric and coming from a specific server (host:bubs).
 
When setting up a new graph in a [Timeboard](/graphing/dashboards/timeboard)/[Screenboard](/graphing/dashboards/screenboard) you can use the Editor but you can also switch to the JSON tab to set up advanced queries:

{{< img src="getting_started/from_query_to_graph/graph_metric.png" alt="graph_metric" responsive="true" >}}

We will now follow each step executed by our backend to perform the query and render a graph line on your dashboard.
 
At each step we will comment on the effect of each parameter of the query.
**Before the query, storage: data is stored separately depending on the tags**

The metric system.disk.total (collected by default by the datadog-agent) is seen from different sources.
First because this metric reported by different hosts, and also because each datadog-agent collects this metric device per device. It adds to metric system.disk.total the tag device:tmpfs when sending data associated to the disk with the same name, etc.
 
Thus this metric will be seen with different {host, device} tag combinations.
 
For each source (defined by a host and a set of tags) we store data separately.
In this example we will consider host:bubs as having 5 devices. Thus Datadog is storing 5 timeseries (all datapoints submitted over time for a source) for: {host:bubs, device:tmpfs},{host:bubs, device:udev},{host:bubs, device:/dev/disk},{host:bubs, device:rootfs} and {host:bubs, device:cgroup}.
 
Let’s now go over the successive steps followed by our backend for the query presented above.

### Step 1: Find which timeseries are needed for the query 

In this query we only asked for data associated to host:bubs. So the first step for our backend is to scan all sources (in this case all {host, device} combination with which metric system.disk.total is submitted) and only retain those corresponding to the scope of the query. 
 
As you may have guessed, our backend will find 5 matching sources (see previous paragraph).

{{< img src="getting_started/from_query_to_graph/metrics_graph_2.png" alt="metrics_graph_2" responsive="true" >}}

The idea is then to aggregate data from these sources together to give you a metric representing the system.disk.total for your host. This will be done at step 3.
 
**Note**: The tagging system adopted by Datadog is simple and powerful. You don’t have to know and specify the sources to combine, you just have to give a tag, i.e. an ID and Datadog will combine all data with this ID and not the rest. For instance, you don’t need to know the number of hosts or devices you have, when you query system.disk.total{*}. Datadog will aggregate data from all sources for you.
 
More information about timeseries and tag cardinality may be found [here](/getting_started/custom_metrics)

Parameter involved: scope
You can use more than one tag, e.g. {host:bubs, device:udev} if you want to data responding to both tags.

### Step 2: Proceed to time-aggregation

Our backend selects all data corresponding to the time-period of your graph.
 
However, before combining all data from the different sources (step 3), datadog needs to proceed to time-aggregation.
Why?

As we store data at a 1 second granularity we cannot display all real data on graphs. See [here](/graphing/faq/how-is-data-aggregated-in-graphs)
 
For a graph on a 1-week time window, it would require sending hundreds of thousands values to your browser, and besides not all these points could be graphed on a widget occupying a small portion of your screen. For these reasons we are forced to proceed to data aggregation and to send a limited number of points to your browser to render a graph.
Which granularity?

For instance, on a one-day view with the 'lines' display you'll have one datapoint every 5 min. So our backend slices the 1-day interval into 288 buckets of 5 minutes. For each bucket our backend rolls up all data into a single value. For instance the datapoint rendered on your graph with timestamp 07:00 will be actually an aggregate of all real datapoints submitted between 07:00:00 and 07:05:00 that day.
How?

By default our backend computes the rollup aggregate by averaging all real values, which tends to smooth out graphs as you zoom out. You may see more information [here](/graphing/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs).
Data aggregation needs to occur whether you have 1 or 1000 sources as long as you look at a large time window. So what you generally see on graph are not the real values submitted but local aggregates.

{{< img src="getting_started/from_query_to_graph/metrics_graph_3.png" alt="metrics_graph_3" responsive="true" >}}

Our backend will compute a series of local aggregates for each source corresponding to the query.

However, you can control how this aggregation is performed.

Parameter involved: rollup (optional)
How to use the ['rollup' function](/graphing/miscellaneous/functions/#rollup).

In our example rollup(avg,60) will define an aggregate period of 60 seconds. So our X minutes interval will be sliced into Y intervals of 1 minute each. Data within a given minute will be aggregated into a single point that will show up on your graph (after step 3, the space-aggregation).

Please note that our backend tries to keep the number of interval to a number below ~300. So if you do rollup(60) over a 2-month time window, you will not get the one-minute granularity requested.

### Step 3: Proceed to space-aggregation  

Now we can mix data from different source into a single line.
 
We have ~300 points for each source. Each of them represent a minute.
In this example, for each minute, Datadog will compute the sum across all sources, resulting in the following graph:

{{< img src="getting_started/from_query_to_graph/metrics_graph_4.png" alt="metrics_graph_4" responsive="true" >}}

The value obtained (20.61GB) is the sum of the values reported by all sources (see previous image).
 
Note: Of course if there is only one source (if we had chosen the scope {host:bubs, device:/dev/disk} for the query for instance), using sum/avg/max/min will have no effect as no space aggregation needs to be performed, [see here also](/graphing/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same).
  
Parameter involved: space-aggregator

Datadog offers 4 space-aggregators: max/min/avg/sum 

### Step 4: Apply functions (optional)

Most of the functions apply at the last step. From the ~300 points obtained after time (step 2) and space (step 3) aggregations, the function computes new values which you will see on your graph.
 
In this example the function abs makes sure that your results are positive numbers.
 
Parameter involved: function
See a list of functions offered by Datadog [here](/grpahing/miscellaneous/).

#### Grouped queries, arithmetic, as_count/rate
 
##### Grouped queries 

{{< img src="getting_started/from_query_to_graph/metric_graph_6.png" alt="metric_graph_6" responsive="true" >}}

The logic is the same:
 
1. Our backend finds all different devices associated to the source selected.
2. For each device, our backend performs the query system.disk.total{host:example, device:<device>} as explained in this article.
3. All final results are graphed on the same graph.

{{< img src="getting_started/from_query_to_graph/metric_graph_7.png" alt="metric_graph_7" responsive="true" >}}

Note: rollup or as_count modifiers have to be placed after the by {device} mention.

Note2: you can use more than one group, for instance system.disk.in_use{*} by {host,device}

##### Arithmetic

Arithmetic is applied after time and space aggregation as well (step 4).

{{< img src="getting_started/from_query_to_graph/metric_graph_8.png" alt="metric_graph_8" responsive="true" >}}

##### as_count and as_rate

They are time aggregators specific to rates and counters submitted via statsd/dogstatsd, that make it possible to view metrics as a rate per second or to see them as raw counts.
Syntax: instead of adding a rollup, you can use .as_count() or .as_rate().
 
More information in [this blogpost](https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing/).
Documentation about [statsd/dogstatsd](/developers/dogstatsd).