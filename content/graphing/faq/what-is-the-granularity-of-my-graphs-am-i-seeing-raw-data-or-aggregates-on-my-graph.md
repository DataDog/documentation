---
title: What is the granularity of my graphs? Am I seeing raw data or aggregates on my graph?
kind: faq
customnav: graphingnav
---

Most of the time what you see on graphs are not the real value you submitted but local aggregates.

## Why?

We store data at a 1 second granularity we cannot display all real data on graphs. See [here](/graphing/faq/how-is-data-aggregated-in-graphs)
 
For a graph on a 1-week time window, it would require sending hundreds of thousands values to your browser, and besides not all these points could be graphed on a widget occupying a small portion of your screen. For these reasons we are forced to proceed to data aggregation and to send a limited number of points to your browser to render a graph.
Which granularity?

For instance, on a one-day view with the 'lines' display you'll have one datapoint every 5 min. So our backend slices the 1-day interval into 288 buckets of 5 minutes. For each bucket our backend rolls up all data into a single value. For instance the datapoint rendered on your graph with timestamp 07:00 will be actually an aggregate of all real datapoints submitted between 07:00:00 and 07:05:00 that day.
How?

By default our backend computes the rollup aggregate by averaging all real values, which tends to smooth out graphs as you zoom out. You may see more information [here](/graphing/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs).

## What can you do?

Data aggregation needs to occur whether you have 1 or 1000 sources as long as you look at a large time window. So what you generally see on graph are not the real values submitted but local aggregates.
 
However what you can do is control how this aggregation is performed by using the [rollup function](/graphing/miscellaneous/functions):

* .rollup(max)/ .rollup(min) will have each point be the local MAXIMUM/MINIMUM of the X min of data it represents
* .rollup(avg) is the default value: each point of your graph be the AVERAGE value of the X min of data it represents
* .rollup(sum) will compute the SUM of all values submitted during the X min period
* .rollup(avg,60) defines that graph points should be 1 min averages, etc.

Please note that our backend tries to keep the number of interval to a number below ~300. So if you do rollup(60) over a 2-month time window, you will not get the one-minute granularity requested.

## Example
{{< img src="graphing/faq/graph_granularity.png" alt="graph_granularity" responsive="true" popup="true">}}

The graph above is a bar graph over the past 2 hours. On this graph you have one datapoint per minute, i.e. what you see are not the real values submitted but local aggregates, each one representing one minute of your metric data.

## Is it possible to see the real data submitted?

Yes, if you zoom in enough you'll get the original values. For instance with the datadog-agent (submitting data every ~15 seconds) if you look at a 45-minute (or less) timewindow you will have unaggregated values.