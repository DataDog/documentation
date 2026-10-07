---
title: Journey Monitoring
description: "Monitor and analyze critical user flows to troubleshoot user experience and technical issues."
further_reading:
- link: "https://www.datadoghq.com/blog/journey-monitoring/"
  tag: "Blog"
  text: "Monitor critical user journeys with Datadog Journey Monitoring"
- link: "https://www.datadoghq.com/blog/coordinate-product-launches-with-datadog/"
  tag: "Blog"
  text: "Coordinate product launches with Datadog"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Journey Monitoring is not available for your selected <a href="/getting_started/site/">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## What is Journey Monitoring?

Journey Monitoring lets you track the health of critical user flows, such as sign-in, checkout, or media streaming, from a single place. For any flow, you can answer:

- Are users experiencing friction?
- How fast and reliable is performance?
- Are issues coming from the frontend, network, or backend?

A *journey* represents a user flow from a defined start to a defined end. Journey Monitoring combines data from [Real User Monitoring (RUM)][1], [Synthetic Monitoring & Testing][2], [Product Analytics][3], and [Session Replay][4] in a shared view for engineering, product, and operations teams.

{{< img src="journey_monitoring/journey-monitoring-map-3.png" alt="The Journey Monitoring map showing a catalog of journeys on the left with traffic and conversion metrics, and a visual flow map on the right displaying user paths between application views and actions." style="width:100%;" >}}

## Prerequisites

Journey Monitoring requires an active trial or paid subscription to at least one of the following products:

- **Product Analytics**: Provides starts volume, conversion volume, conversion rate, and average time to convert.
- **[RUM without Limits™][5]**: Provides [frontend errors][17] and performance data from [RUM operations][11].
- **[Synthetic Browser Tests][6] or [Synthetic Mobile Tests][7]**: Provides uptime data from a [Synthetic test suite][12].

<div class="alert alert-info">RUM-enabled applications have a Product Analytics Preview enabled by default. The Preview retains events Product Analytics events for a rolling 30-day window. Disabling Product Analytics also disables Product Analytics Preview. For questions, contact Datadog Support at <a href="mailto:support@datadoghq.com">support@datadoghq.com</a>.</div>

## How journeys are structured

### RUM and Product Analytics

If RUM is enabled and the organization has Preview, trial, or paid access to Product Analytics, define the journey with action or view events. A journey can include [variants][8] that represent specific sequences of intermediate events between its start and end.

{{< img src="journey_monitoring/journey-monitoring-explainer-diagram-final.png" alt="Diagram of a journey with a start event, end event, and three variants, monitored by RUM and Product Analytics in the Live Environment and by Synthetic tests in the Synthetic Environment." style="width:100%;" >}}

### Synthetics only

If RUM and Product Analytics are not enabled, Synthetic test suites appear automatically as journeys. In this configuration, the test suite defines the journey. Create another test suite to add a journey.

## Get started

Follow [Configure journeys][13] to define an event-based journey, add variants, link RUM operations, and add [Synthetic test coverage][16]. Create a journey manually or start from a [suggested journey][9].

## Key performance indicators

Event-based journeys report [starts volume, conversion volume, conversion rate, and time to convert][10]. Journeys with Synthetic coverage also report [uptime][15]. Product access determines each KPI's data source, retention period, and calculation.

## API

Use the [Journey Monitoring API][14] to query, create, update, and delete journeys.

## What's next

{{< whatsnext desc="Explore Journey Monitoring:" >}}
   {{< nextlink href="/journey_monitoring/configuring_journeys/" >}}<strong>Configure Journeys</strong>: Define a journey and add technical coverage.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/variants/" >}}<strong>Variants</strong>: Track and compare different paths users take through a journey.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/overview/" >}}<strong>Journey Overview</strong>: Understand a journey's health and its relationships to upstream and downstream journeys.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/map/" >}}<strong>Map</strong>: Visualize all your journeys and their traffic and conversion metrics.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/suggested_journeys/" >}}<strong>Suggested Journeys</strong>: Get automatically generated journey suggestions based on real user behavior in your application.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/status/" >}}<strong>Status</strong>: Understand a journey's technical health based on RUM operation and Synthetic test suite service level objectives (SLOs).{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/" >}}<strong>Details Report</strong>: Analyze a journey's traffic, conversion, errors, and uptime in a unified report.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /real_user_monitoring/
[2]: /synthetics/
[3]: /product_analytics/
[4]: /session_replay/
[5]: /real_user_monitoring/rum_without_limits/
[6]: /synthetics/browser_tests/
[7]: /synthetics/mobile_app_testing/
[8]: /journey_monitoring/details_report/variants/
[9]: /journey_monitoring/suggested_journeys/
[10]: /journey_monitoring/details_report/#traffic-and-conversion-trends
[11]: /real_user_monitoring/operations_monitoring/
[12]: /synthetics/test_suites/
[13]: /journey_monitoring/configuring_journeys/
[14]: /api/latest/dem/
[15]: /journey_monitoring/details_report/#test-suite-and-journey-coverage
[16]: /journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[17]: /error_tracking/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
