---
title: Getting started
kind: documentation
aliases:
  - /overview
  - /guides/overview/
---

So, you've just finished [installing][1] the Datadog Agent, or maybe you're just curious about [what Datadog can do for you][2]. This page gives a high level overview of Datadog's capabilities and how it can help you bring your infrastructure to heel.

## Integrations

{{< img src="getting_started/integrations.png" alt="integrations" responsive="true" >}}

* Over 200 integrations [officially listed][3], and we're always adding more.
* Custom integrations are available [via our API][4], many documented by our active user community.
* The Agent is [open source][5] and you can instrument your own if you'd like.
* Once integrations have been configured, data living in a datacenter or
in an online service is treated the same throughout Datadog.

## Infrastructure

{{< img src="getting_started/infrastructure.png" alt="infrastructure" responsive="true" >}}

* All machines show up in the [infrastructure list](/graphing/infrastructure).
* Here you can see the tags applied to each machine; as they're assigned to
perform certain roles, tagging allows you to indicate machines have
a certain purpose.
* We do as much as possible to automatically categorize your servers
for you, which helps create structure in your infrastructure with as little
work as possible (unlike explicitly creating all your clusters).
Thus if a new machine is tagged, you can immediately see the stats
for that machine based on what was previously set up for that tag.[Read more on tagging][15].

## Host Map

{{< img src="getting_started/hostmap-overview.png" alt="hostmap overview" responsive="true" >}}

[The Host Map](/graphing/infrastructure/hostmap) can be found under the Infrastructure menu and offers the ability to:

* Quickly visualize your entire environment regardless of whether it's 5, 500, or 50,000 hosts.
* Identify outliers
* Detect usage patterns
* Optimize resources

To learn more about the Host Map, visit the [Host Map dedicated documentation page][10].

## Events

{{< img src="getting_started/event_stream.png" alt="Event stream" responsive="true" >}}

[The Event Stream](/graphing/event_stream) is based on the same conventions as a blog:

* Every event in the stream can be commented on.
* Great for distributed [teams](/account_management/team) and maintaining the focus of an investigation.
* You can [filter][8] by: `user`, `source`, `tag`, `host`, `status`, `priority`, `incident`

For each incident users can:

* Claim it
* Increase/decrease priority
* Comment
* See similar incidents
* [@ notify team members](/graphing/event_stream/#@-notifications), who receive an email
* `@support-datadog` to ask for [assistance](/help)

{{< img src="getting_started/event_stream_event.png" alt="event stream event" responsive="true" style="width:70%;">}}

## Dashboards

{{< img src="getting_started/dashboard.png" alt="dashboard" responsive="true" >}}

Dashboards contain [graphs][11] with real-time performance metrics

* Synchronous mousing across all graphs in a [screenboard](/graphing/dashboards/screenboard).
* Vertical bars are events in the context of the metric.
* Click & drag on a graph to zoom-in on a particular time-frame.
* As you hover over the graph the event stream moves with you.
* Display by zone, host, or total usage.
* We expose the JSON editor of the graph allowing for [arithmetic][12] and
[functions][13] to be applied to metrics.
* Share a graph snapshot that appears in the stream; clicking on
that snapshot returns you to the original dashboard (via the camera in the upper right of a graph).
* Graphs can be embedded in an iframe, giving a 3rd party a live graph
without access to your data or any other information (via the pencil in the upper right of a graph).

## Monitoring

{{< img src="getting_started/monitor.png" alt="monitor" responsive="true" >}}

[Monitoring][14] gives you the ability to be notified if the aggregate of a specific
metric is above or below a certain threshold:

* Across your entire infrastructure
* Per machine (average, max, min, or sum)
* Applies to any metric you want, revenue: data center temperature, etc.
* Multi alerts (by device, host, etc.)
* Set alert notification message, including @ capabilities

{{< img src="getting_started/alert_setup.png" alt="alert setup" responsive="true" >}}

[1]: /agent/
[2]: http://www.datadoghq.com/product/
[3]: http://www.datadoghq.com/integrations/
[4]: /api/
[5]: https://github.com/DataDog/dd-agent/
[8]: https://www.datadoghq.com/blog/filter-datadog-events-stream-pinpoint-events-infrastructure/
[10]: /graphing/infrastructure/hostmap/
[11]: /graphing/
[12]: /graphing/miscellaneous/functions/
[13]: https://www.datadoghq.com/blog/rank-filter-performance-monitoring-metrics-top-function/
[14]: /monitors/
[15]: /tagging
