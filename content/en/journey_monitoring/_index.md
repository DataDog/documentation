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

Teams monitoring critical user flows — such as login, checkout, or media streaming — often need to switch between multiple tools to answer basic questions:
- Are users experiencing friction?
- How quick and reliable is performance?
- Are issues coming from the frontend, network, or backend?

**Journey Monitoring** addresses this by visualizing the performance of critical user flows in your applications. It brings together data from [Real User Monitoring][1], [Synthetic Monitoring & Testing][2], [Product Analytics][3], and [Session Replay][4] to show traffic, conversion rates, uptime, and errors for each user journey in one place. This gives engineering, product, and operations teams a shared view of journey health.

{{< img src="journey_monitoring/journey-monitoring-temp.png" alt="The Journey Monitoring map showing a catalog of journeys on the left with traffic and conversion metrics, and a visual flow map on the right displaying user paths between application views and actions." style="width:100%;" >}}

## What you can do

For each journey you can:
- Measure the journey's inbound traffic, conversion rate, and time to completion
- Track the availability of the journey using an uptime SLO based a [Synthetic test suite][10]
- Identify where users drop off and investigate individual sessions with [Session Replay][4]
- Measure the performance of critical journey steps with [RUM operations][13]
- Share a unified view of journey health across engineering, product, and operations teams

## Setup

Journey Monitoring requires the following products for frontend applications, each contributing different data to your journeys:

- **[RUM without Limits][5]** and **[Product Analytics][8]**: Traffic, conversion rate, and time-to-convert metrics
- **[Synthetic Browser Tests][6] or [Synthetic Mobile Tests][7]**: Uptime tracking through the journey's automatically created test suite

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

In the journey's details report, you can extend monitoring coverage based on the products you have:

- Create [RUM operations][13] to measure and monitor the performance of critical steps in the journey in your real user environment.
- Add Synthetic tests to the journey's [test suite][15] to start tracking uptime.

## Journey structure

A journey is defined as a start and an end. The start and end can either be action or view events.

Each journey can have one or more [variants][9]. A variant is a specific sequence of intermediate steps a user takes between the journey's start and end. Different users naturally take different paths — for example, some may skip optional steps while others take detours before completing the journey.

[INSERT DIAGRAM HERE]

## Metrics

Each journey and its variants have the following performance metrics:
- **Traffic**: Total number of journey attempts across user sessions. Based on the `rum.measure.feature` metric.
- **Conversion**: Percentage of journey attempts that were completed. Based on the `rum.measure.feature` metric.
- **Time to convert**: Average time to complete the journey across all user sessions. Based on the `rum.measure.feature.duration` metric.
- **Uptime**: Availability of the journey based on its [Synthetic test suite][15] uptime.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /synthetics/
[3]: /product_analytics/
[4]: /session_replay/
[5]: /real_user_monitoring/rum_without_limits/
[6]: /synthetics/browser_tests/
[7]: /synthetics/mobile_app_testing/
[8]: /product_analytics/
[9]: /journey_monitoring/details_report/variants/
[10]:/journey_monitoring/uptime/
[11]: /journey_monitoring/map/suggested_journeys/
[12]: /journey_monitoring/details_report/
[13]: /real_user_monitoring/operations_monitoring/
[14]: /journey_monitoring/map/
[15]: /synthetics/test_suites/#service-level-objectives
