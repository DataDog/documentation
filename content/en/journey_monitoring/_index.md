---
title: Journey Monitoring
private: true
description: "Monitor critical user flows through journeys and troubleshoot user experience and technical issues to improve journey performance."
further_reading:
- link: '/journey_monitoring/map/'
  tag: 'Documentation'
  text: 'Learn about the journey map'
- link: '/journey_monitoring/map/suggested_journeys/'
  tag: 'Documentation'
  text: 'Learn about suggested journeys'
- link: '/journey_monitoring/details_report/'
  tag: 'Documentation'
  text: 'Learn about journey details reports'
- link: '/journey_monitoring/details_report/variants/'
  tag: 'Documentation'
  text: 'Learn about journey variants'
---

{{< callout url="https://www.datadoghq.com/product-preview/operations-monitoring/" btn_hidden="false" header="Join the Preview!">}}
Journey Monitoring is in Preview.
{{< /callout >}}


## Overview

**Journey Monitoring** visualizes the performance of critical user flows in your applications. It brings together data from [Real User Monitoring][1], [Synthetic Testing][2], [Product Analytics][3], and [Session Replay][4] to show traffic, conversion rates, uptime, and errors for each user journey in one place.

[INSERT IMAGE HERE]

## What you can do

For each journey you can:
- See how many users start and complete the journey, and how long it takes
- Identify where users drop off and investigate individual sessions with [Session Replay][4]
- Track the uptime of the journey using a [Synthetic test suite][10]
- Measure the performance of critical journey steps with [RUM operations][13]

## Setup

Journey Monitoring requires the following products for frontend applications, each contributing different data to your journeys:

- **[RUM without Limits][5]** and **[Product Analytics][8]**: Traffic, conversion rate, and time-to-convert metrics
- **[Synthetic Browser Tests][6] or [Synthetic Mobile Tests][7]**: Uptime tracking through the journey's automatically created test suite
- **[Session Replay][4]**: Session replay links for users who dropped off

### Step 1 - Create a journey

1. Navigate to **Digital Experience > Journey Monitoring**.
2. Click **Create a Journey** or select a [suggested journey][11].

### Step 2 - Specify journey details

1. Select a frontend application.
2. Add a journey name.
3. Select one or more start events.
4. Select one or more end events.
5. Click **Save Feature**.

The right-hand funnel chart updates automatically based on the selected start and end events. The funnel shows volume, conversion rate, and average completion time for each step.

**Note**: Mandatory fields are pre-populated if you start from a suggested journey.

You can optionally add a description, attribute filters, team ownership, tags, and variants. Clicking **Save Journey** creates the journey and redirects you to the journey's [details report][12]. The details report is automatically populated with metrics on the journey's volume, conversion rate, and average time to completion.

### Step 3 - Add coverage from other products

In the journey's details report, you can extend coverage based on the products you have:

- Create [RUM operations][13] to measure and monitor the performance of critical steps in the journey in your real user environment.
- Add Synthetic tests to the journey's [test suite][14] to start tracking uptime.

## Journey structure

A journey is defined as a start and an end. The start and end can either be action or view events.

Each journey can have one or more [variants][9], which are versions of the journey with a specific sequence of intermediate steps between the journey's start and end.

[INSERT DIAGRAM HERE]

## Metrics

Each journey and its variants have the following performance metrics:
- **Traffic**: Number of sessions that began the journey. Based on the `rum.measure.feature` metric.
- **Conversion**: Percentage of sessions that completed the journey. Based on the `rum.measure.feature` metric.
- **Time to convert**: Average time for a session to complete the journey. Based on the `rum.measure.feature.duration` metric.
- **Uptime**: Availability of the journey based on its [Synthetic test suite][10] performance.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /synthetics/
[3]: /product_analytics/
[4]: /session_replay/
[5]: /real_user_monitoring/rum_without_limits/
[6]: /synthetics/browser_tests/
[7]: /synthetics/mobile_app_testing/
[8]: /product_analytics/
[9]:/journey_monitoring/details_report/variants/
[10]:/journey_monitoring/uptime/
[11]: /journey_monitoring/map/suggested_journeys/
[12]:/journey_monitoring/details_report/
[13]:/real_user_monitoring/operations_monitoring/
[14]:/journey_monitoring/map/
