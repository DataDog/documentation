---
title: Getting Started in Datadog
kind: documentation
further_reading:
    - link: 'https://learn.datadoghq.com/course/view.php?id=2'
      tag: 'Learning Center'
      text: 'Introduction to Datadog'
---

This page gives a high level overview of the capabilities for the Datadog [US site][1] and [EU site][2].

**Note**: The navigation of the Datadog application switches based on browser width. It's possible to get three different types of navigation. To change navigation types, adjust the width of your browser.

## Integrations

{{< img src="getting_started/integrations.png" alt="integrations"  >}}

- Datadog has over 400+ integrations [officially listed][3].
- Custom integrations are available [via the Datadog API][4].
- The Agent is [open source][5].
- Once integrations have been configured, all data is treated the same throughout Datadog, whether it is living in a datacenter or in an online service.

## Infrastructure

{{< img src="getting_started/infrastructure.png" alt="infrastructure"  >}}

- All machines show up in the [infrastructure list][6].
- You can see the tags applied to each machine. Tagging allows you to indicate which machines have a particular purpose.
- Datadog attempts to automatically categorize your servers. If a new machine is tagged, you can immediately see the stats for that machine based on what was previously set up for that tag. [Read more on tagging][7].

## Host Map

{{< img src="getting_started/hostmap-overview.png" alt="hostmap overview"  >}}

[The Host Map][8] can be found under the Infrastructure menu. It offers the ability to:

- Quickly visualize your environment
- Identify outliers
- Detect usage patterns
- Optimize resources

To learn more about the Host Map, visit the [Host Map dedicated documentation page][8].

## Events

{{< img src="getting_started/event_stream.png" alt="Event stream"  >}}

[The Event Stream][9] is based on the same conventions as a blog:

- Any event in the stream can be commented on.
- Can be used for distributed [teams][10] and maintaining the focus of an investigation.
- You can [filter][11] by `user`, `source`, `tag`, `host`, `status`, `priority`, and `incident`.

For each incident, users can:

- Increase/decrease priority
- Comment
- See similar incidents
- [@ notify team members][12], who receive an email
- `@support-datadog` to ask for [assistance][13]

{{< img src="getting_started/event_stream_event.png" alt="event stream event"  style="width:70%;">}}

## Dashboards

{{< img src="getting_started/dashboard.png" alt="dashboard"  >}}

[Dashboards][14] contain graphs with real-time performance metrics.

- Synchronous mousing across all graphs in a [screenboard][15].
- Vertical bars are events. They put a metric into context.
- Click and drag on a graph to zoom in on a particular timeframe.
- As you hover over the graph, the event stream moves with you.
- Display by zone, host, or total usage.
- Datadog exposes a JSON editor for the graph, allowing for [arithmetic][16] and [functions][17] to be applied to metrics.
- Share a graph snapshot that appears in the stream.
- Graphs can be embedded in an iframe. This enables you to give a 3rd party access to a live graph without also giving access to your data or any other information.

## Monitors

[Monitors][18] provide alerts and notifications based on metric thresholds, integration availability, network endpoints, and more.

- Use any metric reporting to Datadog
- Set up multi-alerts (by device, host, etc.)
- Use `@` in alert messages to direct notifications to the right people
- Schedule downtimes to suppress notifications for system shutdowns, off-line maintenance, etc.

{{< img src="getting_started/application/metric_monitor.png" alt="alert setup"  >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: https://app.datadoghq.eu
[3]: http://www.datadoghq.com/integrations
[4]: /api
[5]: https://github.com/DataDog/dd-agent
[6]: /infrastructure
[7]: /tagging
[8]: /infrastructure/hostmap
[9]: /events
[10]: /account_management/users
[11]: https://www.datadoghq.com/blog/filter-datadog-events-stream-pinpoint-events-infrastructure
[12]: /events/#@-notifications
[13]: /help
[14]: /dashboards
[15]: /dashboards/screenboard
[16]: /dashboards/functions
[17]: https://www.datadoghq.com/blog/rank-filter-performance-monitoring-metrics-top-function
[18]: /monitors
