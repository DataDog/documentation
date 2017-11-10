---
title: Widgets
kind: documentation
autotocdepth: 2
customnav: graphingnav
---

## Timeseries
*Supported on Screenboards and Timeboards*

The Timeseries visualization is great for showing one or more metrics over time. The time window depends on what is selected on the timeboard or in the graph on a screenboard. Timeseries' can be displayed as lines, areas, and bars. Timeseries is available on both timeboards and screenboards.


{{< img src="graphing/miscellaneous/visualization/references-graphing-timeseries-example.png" alt="Timeseries" responsive="true" >}}

## Query Value
*Supported on Screenboards and Timeboards*

Query values display the current value of a given metric query, with conditional formatting (such as a green/yellow/red background) to convey whether or not the value is in the expected range. The value displayed by a query value need not represent an instantaneous measurement. The widget can display the latest value reported, or an aggregate computed from all query values across the time window. These visualizations provide a narrow but unambiguous window into your infrastructure.query
{{< img src="graphing/miscellaneous/visualization/references-graphing-queryvalue-example.png" alt="Timeseries" responsive="true" >}}


## Heatmap
*Supported on Screenboards and Timeboards*

The Heatmap visualization is great for showing metrics aggregated across many tags, such as *hosts*. The more hosts that have a particular value, the darker that square will be.  Heatmap is available on both timeboards and screenboards.

{{< img src="graphing/miscellaneous/visualization/references-graphing-heatmap-example.png" alt="Heatmap" responsive="true" >}}


## Distribution
*Supported on Screenboards and Timeboards*

The Distribution visualization is another way of showing metrics aggregated across many tags, such as *hosts*. Unlike the Heatmap, Distribution's x-axis is the quantity rather than time. Distribution is available on both timeboards and screenboards.

{{< img src="graphing/miscellaneous/visualization/references-graphing-distribution-example.png" alt="Distribution" responsive="true" >}}



## Toplist
*Supported on Screenboards and Timeboards*

The Toplist visualization is perfect when you want to see the list of hosts with the most or least of any metric value, such as highest consumers of CPU, hosts with the least disk space, etc. Toplist is available on both timeboards and screenboards.

{{< img src="graphing/miscellaneous/visualization/references-graphing-toplist-example.png" alt="TopList" responsive="true" >}}


## Change
*Supported on Screenboards and Timeboards*

The Change graph will show you the change in a value over the time period chosen.

{{< img src="graphing/miscellaneous/visualization/references-graphing-change-example.png" alt="Changegraph" responsive="true" >}}


## Hostmap
*Supported on Screenboards and Timeboards*

The Hostmap will graph any metric for any subset of hosts on the same hostmap visualization available from the main Infrastructure Hostmap menu. 

{{< img src="graphing/miscellaneous/visualization/references-graphing-hostmap-example.png" alt="Hostmap" responsive="true" >}}

## Free Text

*Supported on Screenboards only*

Free text is simply a widget that allows you to add headings to your Screenboard. This is commonly used to state the overall purpose of the dashboard.

## Event Timeline
*Supported on Screenboards only*

The event timeline is a widget version of the timeline that appears at the top of the [Event Stream view](https://app.datadoghq.com/event/stream).
{{< img src="graphing/miscellaneous/visualization/references-graphing-eventtimeline-example.png" alt="Timeseries" responsive="true" >}}

## Event Stream
*Supported on Screenboards only*

The event stream is a widget version of the stream of events on the [Event Stream view](https://app.datadoghq.com/event/stream).
{{< img src="graphing/miscellaneous/visualization/references-graphing-eventstream-example.png" alt="Timeseries" responsive="true" >}}

## Image
*Supported on Screenboards only*

Image allows you to embed an image on your dashboard. Images can be PNG, JPG, or even animated GIF files.
## Note
*Supported on Screenboards only*

Note is similar to Free Text, but allows for more formatting options. Also, an arrow can be added to the text box that appears on the dashboard. This is commonly used to document the structure of the dashboard.
## Alert Graph
*Supported on Screenboards only*

Alert graphs are time series graphs showing the current status of any monitor defined on your system.

## Alert Value
*Supported on Screenboards only*

Alert values are query values showing the current value of the metric in any monitor defined on your system.
## Iframe
*Supported on Screenboards only*

The Iframe widget will allow you to embed a portion of any other webpage on your dashboard.

## Check Status
*Supported on Screenboards only*

Check status shows the current status or number of results for any check performed.
## Service Summary
*Supported on Screenboards only*

The service summary displays the top portion of any APM trace in your Screenboard
{{< img src="graphing/miscellaneous/visualization/references-graphing-servicesummary-example.png" alt="Timeseries" responsive="true" >}}

## Monitor Summary
*Supported on Screenboards only*

Monitor summary is a summary view of all monitors on your system, or a subset based on a query.
{{< img src="graphing/miscellaneous/visualization/references-graphing-monitorsummary-example.png" alt="Timeseries" responsive="true" >}}


