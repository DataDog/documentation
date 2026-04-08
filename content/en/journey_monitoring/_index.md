---
title: Journey Monitoring
description: "Monitor critial user flows through journeys and troubleshoot user experience and technical issues to improve journey performance."
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

<strong>Journey monitoring</strong> combines data from [Real User Monitoring][1], [Synthetic Testing][2], [Product Analytics][3], and [Session Replay][4] to visualize and analyze the real-time performance of critical user flows in your applications.

[INSERT IMAGE HERE]

<strong>Note: </strong>Journey monitoring is only available for frontend applications instrumented with:
- [RUM without Limits][5]
- [Synthetic Browser Tests][6] or [Synthetic Mobile Tests][7]
- [Product Analytics][8]


## Structure

A journey is defined as a start and an end. The start and end can either be action or view events.

Each journey can have one or more [variants][9], which are versions of the journey with a specific sequence of intermediate steps between the journey's start and end.

[INSERT DIAGRAM HERRE]


## Metrics

Each journey and its variants have three metrics measuring performance:
- <strong>Traffic</strong>: Number of sessions that began the journey. It is based on the `rum.measure.feature` metric
- <strong>Conversion</strong>: Percentage of sessions began and completed the journey. It is based on the `rum.measure.feature` metric
- <strong>Time to convert</strong>: Aaverage time for a session to complete the journey. It is based on the `rum.measure.feature.duration` metric
- <strong>Uptime</strong>: Based on the journey's [synthetic test suite][10] performance


## Start monitoring your Journeys

### Step 1 - Create a journey

1. Navigate to Digital Experience > Journey Monitoring
2. Click <strong>Create a Journey</strong> or select a [suggested journey][11]

### Step 2 - Specify journey details

1. Select a frontend application
2. Add a journey name
3. Select one or more start events
4. Select one or more end events
5. Click <strong>Save Feature</strong>

The right-hand funnel chart will automatically update based on the selected start and end events. The funnel contains data on the volume, conversion rate, and average to completeion for each step.

<strong>Note</strong>: Mandatory fields will be pre-populated if you are starting from a suggested journey.

You may optionally add a description, attribute filters, team ownership, tags, and variants to your journey definition. Clicking <strong>Save Journey</strong> will create the journey and redirect you to the journey's [details report][12]. The details report will be automatically populated with metrics on the journey's volume, conversion rate, and average time to completion.

### Step 3 - Integrate RUM and Synthetics

In the journey's details report, you can:

1. Create [RUM operations][13] to measure and monitor the performance of critical steps in the journey in your real user environment
2. Add Synthetic tests to the journey's [test suite][14] to start calculating the journey's uptime

## Next steps

1. Explore the rest of the journey's data in the details report
2. Navigate back to the [map][15] to review other created and suggested journeys

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /synthetics/
[3]: /product_analytics/
[4]: /session_replay/
[5]: /real_user_monitoring/rum_without_limits/
[6]: /synthetics/browser_tests/
[7]: /synthetics/mobile_app_testing/
[8]: /prouct_analytics/
[9]:/journey_monitoring/details_report/variants/
[10]:/journey_monitoring/uptime/
[11]: /journey_monitoring/map/suggested_journeys/
[12]:/journey_monitoring/details_report/
[13]:/real_user_monitoring/operations_monitoring/
[14]:/journey_monitoring/map/


