---
title: Using Events
kind: Documentation
---

## Overview

## Enrichment and normalization

A _processor_ runs data-structuring actions on events attributes when they are ingested. A _pipeline_ is composed of one or multiple processors executed sequentially. With event processing pipelines, you can:

- Normalize disparate sources of events by remapping attributes. For example, use the same reserved [service tags][1] everywhere.
- Enrich events with external data saved in a [Reference Table][2] (beta). For example, map a service name with your service directory to enrich events with team ownership information, links to dashboards, or links to documentation.

To add and configure event processing pipelines, see the [Enrich & Normalize][3] tab of Event Management. If you need further help, contact Datadog [support][4].

[Learn more about processing pipelines][5].

## Custom metrics

[Generate metrics][6] with 15-month retention from any event search query to create and monitor historical events and alerts.

{{< img src="service_management/events/generate-metrics.png" alt="Image of metrics with the events search query." >}}

## Example use cases

### Triage features

Use the [Events Explorer][7] to aggregate and view events coming into Datadog. Group or filter events by attribute and graphically represent them with [event analytics][6]. Use the [query syntax][16] to filter events using Boolean and wildcard operators.

{{< img src="service_management/events/events-explorer.mp4" alt="Sorting events by attributes and exploring analytics" video=true >}}

### Dashboard overlays

You can use events as a data source in [graph widgets][17]. You can build timeseries, tables, and top list widgets of your event search queries.

{{< img src="service_management/events/events-dashboard.mp4" alt="A graph widget that uses events as the source" video=true >}}

For example, check out the [Monitor Notifications Overview][18] dashboard, which analyzes monitor alert event trends to help you improve your configuration and reduce alert fatigue.

### Create a monitor

Send monitor alerts and notifications based on significant event queries. To configure an alert, see the [Event Monitor][8] documentation.




[1]: /getting_started/tagging/unified_service_tagging/
[2]: /integrations/guide/reference-tables/
[3]: https://app.datadoghq.com/event/pipelines
[4]: /help/
[5]: /logs/log_configuration/processors/
[6]: /service_management/events/explorer/analytics
[7]: /service_management/events/explorer/
[8]: /monitors/types/event/
