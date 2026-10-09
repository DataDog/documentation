---
title: Journey Overview
description: Review one journey's health, KPIs, definition, and relationships to other journeys.
further_reading:
- link: '/journey_monitoring/'
  tag: 'Documentation'
  text: 'Learn about Journey Monitoring'
- link: '/journey_monitoring/map/'
  tag: 'Documentation'
  text: 'Learn about the Journey Monitoring map'
- link: '/journey_monitoring/status/'
  tag: 'Documentation'
  text: 'Learn about journey status'
---

## Explore a journey

The Journey Overview focuses on one journey and displays its [status][2], [key performance indicators (KPIs)][4], [start and end events][5], and relationships to upstream and downstream journeys.

Click the focused journey tile to open its [details report][1]. Click an upstream or downstream journey tile to open that journey's report.

{{< img src="journey_monitoring/journey-monitoring-overview.png" alt="Overview of a single journey displaying its key performance indicators, status, definition, upstream, and downstream journeys." style="width:100%;" >}}

## Upstream and downstream journeys

Datadog identifies related journeys based on shared start and end events:

- **Upstream journeys** end with an event that is one of the focused journey's start events.
- **Downstream journeys** start with an event that is one of the focused journey's end events.

Use these relationships to investigate whether an upstream journey affects the focused journey or whether the focused journey affects downstream journeys.

## Journey catalog

The journey catalog lists created and [suggested journeys][3]. Each created journey displays its KPIs and a **Healthy**, **Degraded**, or **Missing coverage** status. Suggested journeys are labeled **Suggested**.

Use the catalog to:

- Search for journeys
- Filter and sort journeys
- Filter journeys by team ownership
- Identify degraded journeys
- View suggested journeys

Click a journey in the catalog to display it in the overview.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /journey_monitoring/details_report/
[2]: /journey_monitoring/status/
[3]: /journey_monitoring/suggested_journeys/
[4]: /journey_monitoring/details_report/#traffic-and-conversion-trends
[5]: /journey_monitoring/configuring_journeys/#define-start-and-end-conditions
