---
title: Events
kind: documentation
aliases:
- /guides/eventcorrelation/
- /guides/markdown/
- /events
further_reading:
- link: "/api/v1/events/"
  tag: "Documentation"
  text: "Datadog Events API"
- link: "/service_management/events/guides/recommended_event_tags/"
  tag: "Documentation"
  text: "Best Practices for Tagging Events"
- link: "https://www.datadoghq.com/blog/identify-sensitive-data-leakage-in-apm-rum-with-sensitive-data-scanner/"
  tag: "Blog"
  text: "Identify and redact sensitive data in Events with Sensitive Data Scanner"
---

{{< img src="events/events-overview.png" alt="Events explorer" >}}

## Getting started

_Events_ are records of notable changes relevant for managing and troubleshooting IT operations, such as code deployments, service health, configuration changes, or monitoring alerts.

Datadog Events gives you a consolidated interface to search, analyze, and filter events from any source in one place.

Without any additional setup, Datadog Events automatically gathers events that are collected by the Agent and installed integrations.

More than 100 Datadog integrations support events collection, including [Kubernetes][1], [Docker][2], [Jenkins][3], [Chef][4], [Puppet][5], [AWS ECS][6] or [Autoscaling][7], [Sentry][8], and [Nagios][9]. 

## Sending custom events to Datadog

You can also submit your own custom events using the [Datadog API][10], [Custom Agent Check][11], [DogStatsD][12], or the [Events Email API][13].

## Exploring Datadog Events

### Events explorer and analytics

Use the [Events Explorer][14] to aggregate and view events coming into Datadog. Group or filter events by attribute and graphically represent them with [event analytics][15]. Use the [query syntax][16] to filter events using Boolean and wildcard operators.

{{< img src="events/events-explorer.mp4" alt="Sorting events by attributes and exploring analytics" video=true >}}

### Events as a source in dashboards widgets

You can use events as a data source in [graph widgets][17]. You can build timeseries, tables, and top list widgets of your event search queries.

{{< img src="events/events-dashboard.mp4" alt="A graph widget that uses events as the source" video=true >}}

For example, check out the [Monitor Notifications Overview][18] dashboard, which analyzes monitor alert event trends to help you improve your configuration and reduce alert fatigue.

### Generate custom metrics from events 

[Generate metrics][15] with 15-month retention from any event search query to create and monitor historical events and alerts.

{{< img src="events/generate-metrics.png" alt="Image of metrics with the events search query." >}}

### Normalize and enrich events with processing pipelines

A _processor_ runs data-structuring actions on events attributes when they are ingested. A _pipeline_ is composed of one or multiple processors executed sequentially. With event processing pipelines, you can:

- Normalize disparate sources of events by remapping attributes. For example, use the same reserved [service tags][19] everywhere.
- Enrich events with external data saved in a [Reference Table][20] (beta). For example, map a service name with your service directory to enrich events with team ownership information, links to dashboards, or links to documentation.

To add and configure event processing pipelines, see the [Enrich & Normalize][21] tab of Event Management. If you need further help, contact Datadog [support][22].

[Learn more about processing pipelines][23].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /agent/kubernetes/#event-collection
[2]: /agent/docker/#events
[3]: /integrations/jenkins/#events
[4]: /integrations/chef/#report-handler
[5]: /integrations/puppet/#events
[6]: /integrations/amazon_ecs/#events
[7]: /integrations/amazon_auto_scaling/#events
[8]: /integrations/sentry/
[9]: /integrations/nagios/#events
[10]: /api/latest/events/#post-an-event
[11]: /service_management/events/guides/agent/
[12]: /service_management/events/guides/dogstatsd/
[13]: /service_management/events/guides/email/
[14]: /service_management/events/explorer/
[15]: /service_management/events/explorer/#event-analytics
[16]: /logs/explorer/search_syntax/
[17]: /dashboards/widgets/alert_graph/
[18]: https://app.datadoghq.com/dash/integration/30532/monitor-notifications-overview
[19]: /getting_started/tagging/unified_service_tagging/
[20]: /integrations/guide/reference-tables/
[21]: https://app.datadoghq.com/event/pipelines
[22]: /help/
[23]: /logs/log_configuration/processors/
