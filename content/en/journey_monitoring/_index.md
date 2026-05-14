---
title: Feature Monitoring
private: true
description: "Monitor and analyze critical user flows to troubleshoot user experience and technical issues."
---

{{< callout url="https://www.datadoghq.com/product-preview/operations-monitoring/" btn_hidden="true" header="false">}}
Feature Monitoring is in Preview.
{{< /callout >}}

## Overview

**Feature Monitoring** lets you track the health of critical user flows such as login, checkout, or media streaming, all from a single place. For any given flow, you can answer:
- Are users experiencing friction?
- How fast and reliable is performance?
- Are issues coming from the frontend, network, or backend?

A *feature* is a user flow defined by a start event and an end event. For example, a checkout feature captures the experience from a user landing on the checkout page to completing the checkout process. Feature Monitoring pulls in data from [Real User Monitoring][1], [Synthetic Monitoring & Testing][2], [Product Analytics][3], and [Session Replay][4] to show traffic, conversion rates, uptime, and errors for each feature in one report.

This gives engineering, product, and developer operations teams a shared view of feature health without switching between tools.

{{< img src="journey_monitoring/journey-monitoring-map.png" alt="The Feature Monitoring map showing a catalog of features on the left with traffic and conversion metrics, and a visual flow map on the right displaying user paths between application views and actions." style="width:100%;" >}}

## Capabilities

For each feature, you can:
- Measure the feature's inbound traffic, conversion rate, and time to completion
- Track the feature's availability using an uptime SLO based on its [Synthetic test suite][10]
- Identify where users drop off and investigate individual sessions with [Session Replay][4]
- Measure the performance of critical steps in the feature with [RUM operations][13]
- Share a unified view of feature health across engineering, product, and developer operations teams

## Prerequisites

Feature Monitoring requires the following products for frontend applications, each contributing different data to your features:

- **[RUM without Limits][5]** and **[Product Analytics][8]**: Traffic, conversion rate, time-to-convert metrics, and performance.
- **[Synthetic Browser Tests][6] or [Synthetic Mobile Tests][7]**: Uptime tracking through the feature's automatically created test suite.

## Feature structure

The start and end of a feature can be either action or view events from [Real User Monitoring][1].

Each feature can have one or more variants. A variant is a specific sequence of intermediate steps a user takes between the feature's start and end. Different users naturally take different paths. For example, some may skip optional steps while others take detours before completing the feature.

{{< img src="journey_monitoring/journey-monitoring-diagram-test.png" alt="Diagram of a feature with a start event, end event, and three variants, monitored by RUM and Product Analytics in the Live Environment and by Synthetic tests in the Synthetic Environment." style="width:100%;" >}}

## Setup

Define a feature by selecting its start and end events, then extend coverage with data from your other Digital Experience products.

### Step 1 - Create a feature

1. Navigate to **Digital Experience > Feature Monitoring**.
2. Click **New Feature** or select a [suggested feature][11].

### Step 2 - Specify feature details

1. Select a frontend application.
2. Add a feature name.
3. Select one or more start events.
4. Select one or more end events.
5. Click **Save Feature**.

The right-hand funnel chart updates automatically based on the selected start and end events. The funnel shows volume, conversion rate, and average completion time for each step.

**Note**: Mandatory fields are pre-populated if you start from a suggested feature.

You can also add a description, attribute filters, team ownership, tags, and [variants][9]. Clicking **Save Feature** creates the feature and redirects you to the feature's [details report][12]. The details report includes metrics on the feature's volume, conversion rate, and average time to completion.

### Step 3 - Add coverage from other products

In the feature's details report, you can extend monitoring coverage based on the products you have:

- Create [RUM operations][13] to monitor the performance of critical steps in the feature in your real user environment
- Add Synthetic tests to the feature's [test suite][14] to start tracking uptime

If you already have pre-created RUM operations or Synthetic tests that cover the feature, Datadog surfaces the operation or test in the feature's details report.

## Metrics

Each feature and its variants have the following performance metrics:
- **Traffic**: Total number of feature attempts across user sessions. Based on the `rum.measure.feature` metric.
- **Conversion**: Percentage of feature attempts that were completed. Based on the `rum.measure.feature` metric.
- **Time to convert**: Average time to complete the feature across all user sessions. Based on the `rum.measure.feature.duration` metric.
- **Uptime**: Availability of the feature based on its [Synthetic test suite][14] uptime.

## What's next

{{< whatsnext desc="Explore Feature Monitoring:" >}}
   {{< nextlink href="/journey_monitoring/map/" >}}<strong>Map</strong>: Visualize all your features and their traffic and conversion metrics.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/map/suggested_journeys/" >}}<strong>Suggested Features</strong>: Get automatically generated feature suggestions based on real user behavior in your application.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/" >}}<strong>Details Report</strong>: Analyze a feature's traffic, conversion, errors, and uptime in a unified report.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/variants/" >}}<strong>Variants</strong>: Track and compare different paths users take through a feature.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/uptime/" >}}<strong>Uptime</strong>: Measure a feature's availability with an automatically created Synthetic test suite.{{< /nextlink >}}
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
