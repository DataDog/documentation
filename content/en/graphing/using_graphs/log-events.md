---
title: Event-Based Analytics
kind: documentation
description: "Put your event-based data (logs, apm events, etc.) into perspective with analytics"
---

## Overview

### Typical Use-cases

Let's say you are running an online market-place, and your third-party payment provider warned you about an isolated incident yesterday round 2pm in their own systems. This incident is likely to have impacted your own customers, and you need to know more about this. 

In datadog, you can access any single event (a log, an apm event, etc.), access and leverage its specific information. For instance, you'll search on errors on your `/payment` microservice, and eventually find a collection of events (logs in this example) telling you fine-grained information about the impact incident. 

`2019-08-01 2:21:02+00:00 ERROR service:payment host:i-1234 http.referer:/account http.geoIP.country:UK http.status:500 resource:third-party/refund user_id:3141 payment.amount:199.90`

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


### Queries, Groups, Facets, Measures

The **query** delineates events considered in an Analytics, which are eventually aggregated into time and/or facet slices. [See query language documentation](/logs/explorer/search).

A **facet** is an event tag or event attribute whose values are treated as identifying values (e.g. name of services, users ID, http status codes, etc.). Facets can be used for aggregations **groups**. 

A **measure** is an event attribute whose values are treated as numeric values (e.g. execution time of a process, amount of a payment, memory size of a request, etc.). Numeric values are aggregated for events in each group according to either sum, min, max, mean and percentile operators. 

By extension, log count and unique count of facet values are considered as measures as well - though statistic aggregation are not available for them since they would hardly make sense for them.

Most facets and measures are out-of-the-box. Custom facets and measures can be configured based on whichever meaningful tag or attributes.

{{< img src="graphing/log-event_viz_overview.png" alt="top list example" responsive="true" style="width:90%;">}} 


## Visualisations

In **Analytics** pages, the different visualisation are available along with the query, measures and groups.
{{< img src="graphing/log-event_viz_choice.png" alt="top list example" responsive="true" style="width:50%;">}} 

In **Dashboards** and **Notebooks**, visualisations are available as widgets (one widget for one visualisation).


### Toplists

Toplist are helpful to visualise the top values of a **facet** according to a **measure** which makes sense for this facet. The whole timerange is considered for the measure.

The following Top List shows the evolution of the **top 5 URL Paths** according to the number of **unique Client IPs** over the last month.

{{< img src="graphing/log-event_viz_toplist.png" alt="top list example" responsive="true" style="width:90%;">}} 


### Timeseries

Timeseries are helpful to visualize the evolution of a single **measure** over a selected time frame. Optionally, timeseries can be split by the top or bottom values of **facet** (the whole timerange is considered to decide which are the top of bottom values).

{{< img src="graphing/log-event_viz_timeseries.png" alt="top list example" responsive="true" style="width:90%;">}} 

Timeseries come with specific display options:

* the set of colours used in the display
* whether the throughput is displayed lines, bars, or areas
* (when split) by a facet how data are stacking option, by value, or by percentage. Noteworthy facts about stacking:
   * When you use a toplist option that hides part of your data, stacking does not show the total overall; rather, it shows only the subtotal for the top/bottom series.
   * Stacking options are for bar and area displays only. Line displays are always overlapping.

The following timeseries Log Analytics shows the evolution of the **top 5 URL Paths** according to the number of **unique Client IPs** over the last month.

{{< img src="logs/explorer/analytics/timeserie_example.png" alt="timeserie example" responsive="true" style="width:90%;">}}


### Table

Table are helpful to visualize data across multiple **facets** and mutliple **measures**. 

* When multiple dimensions, the top values are determined according to the first dimension, then according to the second dimension within the top values of the first dimension, then according to the third dimension within the top values of the second dimensions.
* When multiple measure, the top or bottom list is determined according to the first measure.
* Subtotal may differ from the actual sum of values in a group since only a subset (top or bottom) is displayed. Besides, events with null or empty value for this dimension will not be displayed as a sub-group.

Note that a table visualisation used for one single measure and one single dimension is nothing but a toplist, just with a different display.

The following Table Log Analytics shows: The evolution of the **top Status Codes** according to their **Throughput**, along with the number of unique **Client IP** and over the last 15 minutes.

{{< img src="graphing/log-event_viz_table.png" alt="top list example" responsive="true" style="width:90%;">}} 


## Analytics, and so what ?

From an analytics visualization, you can, additionally:

* create a widget in a dashboard out of that visualization
* create a monitor out of that query
* deep dive into subsets of the log list, depending on the interactions that the visualization enables

Save a log analytics view with the "Save As" button. You can load your teammates' saved views from the "Saved Views" tab.



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/?tab=measures#setup
[2]: /logs/explorer/?tab=facets#setup 
