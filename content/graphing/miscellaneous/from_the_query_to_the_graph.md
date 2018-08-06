---
title: From the query to the graph
kind: documentation
alias:
- /getting_started/from_the_query_to_the_graph
---

While setting up graphs is pretty simple in Datadog, this page aims at helping you leverage even more value from our graphing system.

This article focuses on describing the steps performed by our graphing system from the query to the graph, so that you get a good idea how to choose your graph settings.

Tl;Dr ? [there is a short version of this article][1].

We use the metric **system.disk.total** as an example. We want to graph data associated to this metric and coming from a specific server (`host:moby`).

When setting up a new graph in a [Timeboard][2]/[Screenboard][3] you can use the editor but you can also switch to the JSON tab to set up advanced queries:

{{< img src="getting_started/from_query_to_graph/graph_metric.png" alt="graph_metric" responsive="true" style="width:75%;">}}

Let's now follow each step executed by our backend to perform the query and render a graph line on your dashboard.

At each step we comment on the effect of each parameter of the query.
**Before the query, storage: data is stored separately depending on the tags**

The metric `system.disk.total` (collected by default by the [datadog-agent](/agent)) is seen from different sources.  

First because this metric is reported by different hosts, and also because each datadog-agent collects this metric per device. It adds to metric `system.disk.total` the tag `device:tmpfs` when sending data associated to the disk with the same name, etc.

Thus this metric is seen with different {host, device} tag combinations.

For each source (defined by a host and a set of tags) we store data separately.
In this example we consider `host:moby` as having 5 devices. Thus Datadog is storing 5 timeseries (all datapoints submitted over time for a source) for:

* {host:moby, device:tmpfs}
* {host:moby, device:cgroup_root}
* {host:moby, device:/dev/vda1}
* {host:moby, device:overlay}
* {host:moby, device:shm}.

Let’s now go over the successive steps followed by our backend for the query presented above.

## Find which timeseries are needed for the query

In this query we only asked for data associated to `host:moby`. So the first step for our backend is to scan all sources (in this case all {host, device} combination with which metric system.disk.total is submitted) and only retain those corresponding to the scope of the query.

As you may have guessed, our backend finds 5 matching sources (see previous paragraph).

{{< img src="getting_started/from_query_to_graph/metrics_graph_2.png" alt="metrics_graph_2" responsive="true" style="width:70%;">}}

The idea is then to aggregate data from these sources together to give you a metric representing the `system.disk.total` for your host. This is done at [step 3][4].

**Note**: The tagging system adopted by Datadog is simple and powerful. You don’t have to know and specify the sources to combine, you just have to give a tag, i.e. an ID and Datadog combines all data with this ID and not the rest. For instance, you don’t need to know the number of hosts or devices you have, when you query `system.disk.total{*}`. Datadog aggregates data from all sources for you.

[More information about timeseries and tag cardinality][5]

**Parameter involved: scope**  
You can use more than one tag, e.g. {host:moby, device:udev} if you want to fetch data responding to both tags.

## Proceed to time-aggregation

Our backend selects all data corresponding to the time-period of your graph.

However, before combining all data from the different sources (step 3), Datadog needs to proceed to time-aggregation.

### Why?

As we store data at a 1 second granularity we cannot display all real data on graphs. [See this article to learn more on how data is aggregated in graphs][6]

For a graph on a 1-week time window, it would require sending hundreds of thousands values to your browser, and besides not all these points could be graphed on a widget occupying a small portion of your screen. For these reasons we are forced to proceed to data aggregation and to send a limited number of points to your browser to render a graph.

### Which granularity?

For instance, on a one-day view with the 'lines' display you'll have one datapoint every 5 min. So our backend slices the 1-day interval into 288 buckets of 5 minutes. For each bucket our backend rolls up all data into a single value. For instance the datapoint rendered on your graph with timestamp 07:00 is actually an aggregate of all real datapoints submitted between 07:00:00 and 07:05:00 that day.

### How?

By default our backend computes the rollup aggregate by averaging all real values, which tends to smooth out graphs as you zoom out. [See more information about why does zooming out a timeframe also smooth out your graphs][7].
Data aggregation needs to occur whether you have 1 or 1000 sources as long as you look at a large time window. So what you generally see on graph are not the real values submitted but local aggregates.

{{< img src="getting_started/from_query_to_graph/metrics_graph_3.png" alt="metrics_graph_3" responsive="true" style="width:75%;">}}

Our backend computes a series of local aggregates for each source corresponding to the query.

However, you can control how this aggregation is performed.

**Parameter involved: rollup (optional)**
How to use the ['rollup' function][8]?.

In our example rollup(avg,60) defines an aggregate period of 60 seconds. So our X minutes interval is sliced into Y intervals of 1 minute each. Data within a given minute is aggregated into a single point that shows up on your graph (after step 3, the space-aggregation).

Note that our backend tries to keep the number of interval to a number below ~300. So if you do rollup(60) over a 2-month time window, you won't get the one-minute granularity requested.

## Proceed to space-aggregation

Now we can mix data from different source into a single line.

We have ~300 points for each source. Each of them represent a minute.
In this example, for each minute, Datadog computes the sum across all sources, resulting in the following graph:

{{< img src="getting_started/from_query_to_graph/metrics_graph_4.png" alt="metrics_graph_4" responsive="true" style="width:75%;">}}

The value obtained (25.74GB) is the sum of the values reported by all sources (see previous image).

Note: Of course if there is only one source (if we had chosen the scope {host:moby, device:/dev/disk} for the query for instance), using `sum`/`avg`/`max`/`min` have no effect as no space aggregation needs to be performed, [see here also][9].

**Parameter involved: space-aggregator**

Datadog offers 4 space-aggregators: 

* `max`
* `min`
* `avg`
* `sum` 

## Apply functions (optional)

Most of the functions apply at the last step. From the ~300 points obtained after time (step 2) and space (step 3) aggregations, the function computes new values which can be seen on your graph.

In this example the function abs makes sure that your results are positive numbers.

**Parameter involved: function**
[Consult the list of functions offered by Datadog][10].

### Grouped queries, arithmetic, as_count/rate
 
#### Grouped queries 

{{< img src="getting_started/from_query_to_graph/metric_graph_6.png" alt="metric_graph_6" responsive="true" style="width:75%;">}}

The logic is the same:

1. Our backend finds all different devices associated to the source selected.
2. For each device, our backend performs the query `system.disk.total{host:example, device:<device>}` as explained in this article.
3. All final results are graphed on the same graph.

{{< img src="getting_started/from_query_to_graph/metric_graph_7.png" alt="metric_graph_2" responsive="true" style="width:75%;">}}

**Note**: `rollup` or `as_count` modifiers have to be placed after the by {`device`} mention.

**Note2**: You can use multiple tags, for instance `system.disk.in_use{*} by {host,device}`

#### Arithmetic

Arithmetic is applied after time and space aggregation as well ([step 4: Apply function](/graphing/miscellaneous/from_the_query_to_the_graph/#apply-functions-optional)).

{{< img src="getting_started/from_query_to_graph/metric_graph_8.png" alt="metric_graph_8" responsive="true" style="width:75%;">}}

#### as_count and as_rate

They are time aggregators specific to rates and counters submitted via statsd/dogstatsd, that make it possible to view metrics as a rate per second or to see them as raw counts.
Syntax: instead of adding a rollup, you can use .as_count() or .as_rate().

More information in [this blog post][11].
Documentation about [statsd/DogStatsD][12].

[1]: /graphing/faq/how-does-datadog-render-graphs-my-graph-doesn-t-show-the-values-i-m-expecting
[2]: /graphing/dashboards/timeboard
[3]: /graphing/dashboards/screenboard
[4]: /graphing/miscellaneous/from_the_query_to_the_graph/#proceed-to-space-aggregation
[5]: /developers/metrics/custom_metrics
[6]: /graphing/faq/how-is-data-aggregated-in-graphs
[7]: /graphing/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs
[8]: /graphing/miscellaneous/functions/#rollup
[9]: /graphing/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same
[10]: /graphing/miscellaneous/
[11]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing/
[12]: /developers/dogstatsd
