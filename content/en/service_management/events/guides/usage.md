---
title: Using Events
aliases:
- /service_management/events/usage
further_reading:
- link: "/logs/log_configuration/processors/"
  tag: "Documentation"
  text: "Learn more about processing pipelines"
- link: "/service_management/events/explorer/"
  tag: "Documentation"
  text: "Triage events with the Events Explorer"
---

## Custom metrics

[Generate metrics][5] with 15-month retention from any event search query to create and monitor historical events and alerts. For more information, see [Event Analytics][6].

{{< img src="service_management/events/guides/usage/generate-metrics.png" alt="Image of metrics with the events search query." >}}

## Examples of what to do with events

### Triage features

Use the [Events Explorer][7] to aggregate and view events coming into Datadog. Group or filter events by attribute and graphically represent them with event analytics. Use the query search syntax to filter events using Boolean and wildcard operators.

### Dashboards

{{< img src="service_management/events/guides/usage/events-dashboard.mp4" alt="A graph widget that uses events as the source" video=true >}}

You can use events as a data source in [graph widgets][8] to build timeseries, tables, and top list widgets of your event search queries. For example, the [Monitor Notifications Overview][9] dashboard analyzes monitor alert event trends to help you improve your configuration and reduce alert fatigue.

#### Overlays 

{{< img src="service_management/events/guides/usage/event_overlays.png" alt="Option to view event overlays on an example dashboard" style="width:100%;" >}}

Overlays visualize corresponding events on top of your graphs. Use the Dashboard [Event Overlays][10] feature to identify when a recent change is causing performance issues within your application or services and find the source of the problem. 

### Create a monitor

Send monitor alerts and notifications based on significant event queries. To configure an alert, see the [Event Monitor][11] documentation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /getting_started/tagging/unified_service_tagging/
[2]: /integrations/guide/reference-tables/
[3]: https://app.datadoghq.com/event/pipelines
[4]: /help/
[5]: https://app.datadoghq.com/event/configuration/generate-metrics
[6]: /service_management/events/explorer/analytics
[7]: /service_management/events/explorer/
[8]: /dashboards/widgets/alert_graph/
[9]: https://app.datadoghq.com/dash/integration/30532/monitor-notifications-overview
[10]: /dashboards/change_overlays/
[11]: /monitors/types/event/
