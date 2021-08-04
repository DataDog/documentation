---
title: Events
kind: documentation
aliases:
    - /guides/eventcorrelation/
    - /guides/markdown/
    - /graphing/event_stream/
further_reading:
- link: "/api/v1/events/"
  tag: "Documentation"
  text: "Datadog Events API"
- link: "/dashboards/widgets/event_stream/"
  tag: "Documentation"
  text: "Add an Event Stream widget to a dashboard"
---

{{< img src="events/events-overview.png" alt="Image of an out of the box events explorer." >}}

## What are Datadog events?

Datadog classifies an _event_ as any notable changes relevant for managing IT operations such as code deployments, service health, configuration changes, or monitoring alerts. [Datadog Events][1] gives you a consolidated interface to search, analyse, and filter events from any source in one place. 

## Getting started
<div class="alert alert-warning">
  The Events Explorer is in private beta. To request access, contact <a href="https://docs.datadoghq.com/help/">Datadog Support</a>. If you are looking for legacy events information, see the <a href="https://docs.datadoghq.com/events/stream/">Events Stream documentation</a>.</div>

The [Datadog events explorer][2] works out of the box by automatically gathering events from your services and requires no additional setup. 

## Exploring Datadog Events

### Events explorer and analytics

Use the [events explorer][3] to aggregate and view all events coming into Datadog. Break down events by attribute and graphically represent them with [event analytics][4].

{{< img src="events/events-explorer.gif" alt="Image of an out of the box events explorer where you can sort by attributes and analytics." >}}

### Events as a source in dashboards and monitors

Use Events as a source in [graph widgets][5] and [event monitors][6] to create timeseries, tables, and top lists of your event search queries.

{{< img src="events/events-dashboard.gif" alt="Image of an graph widget where events is used as the source." >}}

### Generate custom metrics from events

[Generate metrics][4] with 15-month retention from any event search query to create and monitor historical events and alerts.

{{< img src="events/generate-metrics.png" alt="Image of metrics with the events search query." >}}

### Monitor Alerts Overview Dashboard

View our out-of-the-box Monitor Alerts Overview Dashboard to gain insight on your top alerting monitors, break down monitors by attributes, and compare monitor trends over time.

{{< img src="events/monitor-alerts.png" alt="Image of the out of the box Monitor Alerts Overview Dashboard." >}}

### Programmatically generate events

Programmatically send events to Datadog with a [Custom Agent Check][7], [DogStatsD][8], the [Datadog API][9], or with [email][10].

[1]: http://app.datadoghq.com/event/explorer
[2]: https://us3.datadoghq.com/event/explorer
[3]: /events/explorer/
[4]: /events/explorer/#event-analytics
[5]: /dashboards/widgets/alert_graph/
[6]: /monitors/monitor_types/event/
[7]: /events/guides/agent/
[8]: /events/guides/dogstatsd/
[9]: /api/latest/events/#post-an-event
[10]: /events/guides/email/
