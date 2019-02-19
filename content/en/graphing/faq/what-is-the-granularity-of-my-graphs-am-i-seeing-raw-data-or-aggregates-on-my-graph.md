---
title: What is the granularity of my graphs? Am I seeing raw data or aggregates on my graph?
kind: faq
---

Datadog graphs will generally display local aggregates, rather than the original submitted value.

## Why?

Data is stored at a 1 second granularity, but [data can be aggregated when displayed][1].

For a graph on a 1-week time window, it would require sending hundreds of thousands of values to your browser. Not all of these points can be graphed on a widget occupying a small portion of your screen. For these reasons we are forced to aggregate data and to send a limited number of points to your browser to render a graph.

For instance, on a one-day view with the 'lines' display you'll have one datapoint every 5 min. Our backend slices the 1-day interval into 288 buckets of 5 minutes. For each bucket our backend rolls up all data into a single value. For instance, the datapoint rendered on your graph with timestamp 07:00 is actually an aggregate of all real datapoints submitted between 07:00:00 and 07:05:00 that day.

By default our backend computes the rollup aggregate by averaging all real values, which tends to [smooth out graphs as you zoom out][2].

## What can you do?

Data aggregation needs to occur whether you have 1 or 1000 sources as long as you look at a large time window. 

However what you can do is control how this aggregation is performed by using the [rollup function][3]:

* .rollup(max)/ .rollup(min) have each point be the local MAXIMUM/MINIMUM of the X min of data it represents
* .rollup(avg) is the default value: each point of your graph be the AVERAGE value of the X min of data it represents
* .rollup(sum) compute the SUM of all values submitted during the X min period
* .rollup(avg,60) defines that graph points should be 1 min averages, etc.

Note that our backend tries to keep the number of intervals to a number below ~300. So if you do rollup(60) over a 2-month time window, you can't have the one-minute granularity requested.

## Example
{{< img src="graphing/faq/graph_granularity.png" alt="graph_granularity" responsive="true" >}}

The graph above is a bar graph over the past 2 hours. On this graph you have one datapoint per minute, i.e. what you see are not the real values submitted but local aggregates, each one representing one minute of your metric data.

## Is it possible to see the real data submitted?

Yes, if you zoom in enough you'll get the original values. For instance with the datadog-agent (submitting data every ~15 seconds) if you look at a 45-minute (or less) timewindow you have unaggregated values.

[1]: /graphing/faq/how-is-data-aggregated-in-graphs
[2]: /graphing/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs
[3]: /graphing/miscellaneous/functions
