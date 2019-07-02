---
title: Getting started over Datadog application
kind: documentation
further_reading:
- link: "https://learn.datadoghq.com/course/view.php?id=2"
  tag: "Learning Center"
  text: "Introduction to Datadog"
---

This page gives a high level overview of Datadog's capabilities.

## Integrations

{{< img src="getting_started/integrations.png" alt="integrations" responsive="true" >}}

* Datadog has over 350 integrations [officially listed][3].
* Custom integrations are available [via the Datadog API][4].
* The Agent is [open source][5].
* Once integrations have been configured, data living in a datacenter or in an online service is treated the same throughout Datadog.

## Infrastructure

{{< img src="getting_started/infrastructure.png" alt="infrastructure" responsive="true" >}}

* All machines show up in the [infrastructure list][6].
* Here you can see the tags applied to each machine. As they're assigned to perform certain roles, tagging allows you to indicate which machines have a particular purpose.
* Datadog does as much as possible to automatically categorize your servers in order to create structure in your infrastructure. If a new machine is tagged, you can immediately see the stats for that machine based on what was previously set up for that tag. [Read more on tagging][7].

## Host Map

{{< img src="getting_started/hostmap-overview.png" alt="hostmap overview" responsive="true" >}}

[The Host Map][8] can be found under the Infrastructure menu. It offers the ability to:

* Quickly visualize your entire environment regardless of the number of hosts
* Identify outliers
* Detect usage patterns
* Optimize resources

To learn more about the Host Map, visit the [Host Map dedicated documentation page][8].

## Events

{{< img src="getting_started/event_stream.png" alt="Event stream" responsive="true" >}}

[The Event Stream][9] is based on the same conventions as a blog:

* Every event in the stream can be commented on.
* Great for distributed [teams][10] and maintaining the focus of an investigation.
* You can [filter][11] by: `user`, `source`, `tag`, `host`, `status`, `priority`, `incident`

For each incident users can:

* Increase/decrease priority
* Comment
* See similar incidents
* [@ notify team members][12], who receive an email
* `@support-datadog` to ask for [assistance][13]

{{< img src="getting_started/event_stream_event.png" alt="event stream event" responsive="true" style="width:70%;">}}

## Dashboards

{{< img src="getting_started/dashboard.png" alt="dashboard" responsive="true" >}}

Dashboards contain [graphs][14] with real-time performance metrics

* Synchronous mousing across all graphs in a [screenboard][15].
* Vertical bars are events in the context of the metric.
* Click & drag on a graph to zoom in on a particular timeframe.
* As you hover over the graph, the event stream moves with you.
* Display by zone, host, or total usage.
* Datadog exposes the JSON editor of the graph allowing for [arithmetic][16] and [functions][17] to be applied to metrics.
* Share a graph snapshot that appears in the stream; clicking on that snapshot returns you to the original dashboard (via the camera in the upper right of a graph).
* Graphs can be embedded in an iframe, giving a 3rd party a live graph without access to your data or any other information (via the pencil in the upper right of a graph).

## Monitoring

{{< img src="getting_started/monitor.png" alt="monitor" responsive="true" >}}

[Monitoring][18] gives you the ability to be notified if the aggregate of a specific
metric is above or below a certain threshold:

* Across your entire infrastructure
* Per machine (average, max, min, or sum)
* Applies to any metric you want, revenue: data center temperature, etc.
* Multi alerts (by device, host, etc.)
* Set alert notification message, including @ capabilities

{{< img src="getting_started/alert_setup.png" alt="alert setup" responsive="true" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: http://www.datadoghq.com/product
[3]: http://www.datadoghq.com/integrations
[4]: /api
[5]: https://github.com/DataDog/dd-agent
[6]: /graphing/infrastructure
[7]: /tagging
[8]: /graphing/infrastructure/hostmap
[9]: /graphing/event_stream
[10]: /account_management/team
[11]: https://www.datadoghq.com/blog/filter-datadog-events-stream-pinpoint-events-infrastructure
[12]: /graphing/event_stream/#@-notifications
[13]: /help
[14]: /graphing
[15]: /graphing/dashboards/screenboard
[16]: /graphing/functions
[17]: https://www.datadoghq.com/blog/rank-filter-performance-monitoring-metrics-top-function
[18]: /monitors
