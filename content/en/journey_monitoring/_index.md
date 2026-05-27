---
title: Journey Monitoring
private: true
description: "Monitor and analyze critical user flows to troubleshoot user experience and technical issues."
---

{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="Join the Preview!">}}
Journey Monitoring is in Preview.
{{< /callout >}}

## Overview

**Journey Monitoring** lets you track the health of critical user flows such as login, checkout, or media streaming, all from a single place. For any given flow, you can answer:
- Are users experiencing friction?
- How fast and reliable is performance?
- Are issues coming from the frontend, network, or backend?

A *journey* is a user flow defined by a start event and an end event. For example, a checkout journey captures the experience from a user landing on the checkout page to completing the checkout process. Journey Monitoring pulls in data from [Real User Monitoring][1], [Synthetic Monitoring & Testing][2], [Product Analytics][3], and [Session Replay][4] to show traffic, conversion rates, uptime, and errors for each journey in one report.

This gives engineering, product, and developer operations teams a shared view of journey health without switching between tools.

{{< img src="journey_monitoring/journey-monitoring-map.png" alt="The Journey Monitoring map showing a catalog of journeys on the left with traffic and conversion metrics, and a visual flow map on the right displaying user paths between application views and actions." style="width:100%;" >}}

## Capabilities

For each journey, you can:
- Measure the journey's inbound traffic, conversion rate, and time to completion
- Track the journey's availability using an uptime SLO based on its [Synthetic test suite][10]
- Identify where users drop off and investigate individual sessions with [Session Replay][4]
- Measure the performance of critical steps in the journey with [RUM operations][13]
- Share a unified view of journey health across engineering, product, and developer operations teams

## Prerequisites

Journey Monitoring requires the following products for frontend applications, each contributing different data to your journeys:

- **[RUM without Limits][5]** and **[Product Analytics][8]**: Traffic, conversion rate, time-to-convert metrics, and performance.
- **[Synthetic Browser Tests][6] or [Synthetic Mobile Tests][7]**: Uptime tracking through the journey's automatically created test suite.

## Journey structure

The start and end of a journey can be either action or view events from [Real User Monitoring][1].

Each journey can have one or more variants. A variant is a specific sequence of intermediate steps a user takes between the journey's start and end. Different users naturally take different paths. For example, some may skip optional steps while others take detours before completing the journey.

{{< img src="journey_monitoring/journey-monitoring-explainer-diagram-final.png" alt="Diagram of a journey with a start event, end event, and three variants, monitored by RUM and Product Analytics in the Live Environment and by Synthetic tests in the Synthetic Environment." style="width:100%;" >}}

## Setup

Define a journey by selecting its start and end events, then extend coverage with data from your other Digital Experience products.

### Step 1 - Create a journey

1. Navigate to **Digital Experience > Journey Monitoring**.
2. Click **New Journey** or select a [suggested journey][11].

### Step 2 - Specify journey details

1. Select a frontend application.
2. Add a journey name.
3. Select one or more start events.
4. Select one or more end events.
5. Click **Save Journey**.

The right-hand funnel chart updates automatically based on the selected start and end events. The funnel shows volume, conversion rate, and average completion time for each step.

**Note**: Mandatory fields are pre-populated if you start from a suggested journey.

You can also add a description, attribute filters, team ownership, tags, and [variants][9]. Clicking **Save Journey** creates the journey and redirects you to the journey's [details report][12]. The details report includes metrics on the journey's volume, conversion rate, and average time to completion.

### Step 3 - Add coverage from other products

In the journey's details report, you can extend monitoring coverage based on the products you have:

- Create [RUM operations][13] to monitor the performance of critical steps in the journey in your real user environment
- Add Synthetic tests to the journey's [test suite][14] to start tracking uptime

If you already have pre-created RUM operations or Synthetic tests that cover the journey, Datadog surfaces the operation or test in the journey's details report.

## Metrics

Each journey and its variants have the following performance metrics:
- **Traffic**: Total number of journey attempts across user sessions. Based on the `rum.measure.journey` metric.
- **Conversion**: Percentage of journey attempts that were completed. Based on the `rum.measure.journey` metric.
- **Time to convert**: Average time to complete the journey across all user sessions. Based on the `rum.measure.journey.duration` metric.
- **Uptime**: Availability of the journey based on its [Synthetic test suite][14] uptime.

## What's next

{{< whatsnext desc="Explore Journey Monitoring:" >}}
   {{< nextlink href="/journey_monitoring/map/" >}}<strong>Map</strong>: Visualize all your journeys and their traffic and conversion metrics.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/map/suggested_journeys/" >}}<strong>Suggested Journeys</strong>: Get automatically generated journey suggestions based on real user behavior in your application.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/" >}}<strong>Details Report</strong>: Analyze a journey's traffic, conversion, errors, and uptime in a unified report.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/variants/" >}}<strong>Variants</strong>: Track and compare different paths users take through a journey.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/uptime/" >}}<strong>Uptime</strong>: Measure a journey's availability with an automatically created Synthetic test suite.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /real_user_monitoring/
[2]: /synthetics/
[3]: /product_analytics/
[4]: /session_replay/
[5]: /real_user_monitoring/rum_without_limits/
[6]: /synthetics/browser_tests/
[7]: /synthetics/mobile_app_testing/
[8]: /product_analytics/
[9]: /journey_monitoring/details_report/variants/
[10]: /journey_monitoring/uptime/
[11]: /journey_monitoring/map/suggested_journeys/
[12]: /journey_monitoring/details_report/
[13]: /real_user_monitoring/operations_monitoring/
[14]: /synthetics/test_suites/#service-level-objectives
