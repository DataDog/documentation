---
title: Journey Uptime
private: true
description: "Measure the availability of your user journey using the accompanying Synthetics test suite."
further_reading:
- link: '/journey_monitoring/'
  tag: 'Documentation'
  text: 'Learn about Journey Monitoring'
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

Each created user journey will have an automatically created [test suite][1]. Each test suite can contain one or more tests that cover the journey and its [variants][2]. 

[INSERT DIAGRAM]

## Journey coverage

A journey is considered to be covered if at least one Synthetic [Browser test][4] or [Mobile test][5] converted at least once on the journey over the past 7 days. I.e. the test goes through the start event(s) and end event(s) of the Journey in order at leasst once over the past 7 days.

## Configuring the journey's test suite

By default, each journey's test suite will have the same name as the journey. When the journey is created, the test suite is automatically populated with all of its covering tests, according to the definition above.
The automatically created [Test Suite][1] is editable, meaning tests can be added and/or removed. Datadog continually scans your test collection to list new tests that cover the journey that aren't part of the test suite, for you to optionally add to the test suite.

## Journey uptime

Datadog automatically starts calculating an [uptime SLO][3] on the test suite. By default, the SLO is evaluated at a 99.9% uptime, and the threshold is editable.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/test_suite/
[2]: /journey_monitoring/details_report/variants/
[3]: /synthetics/test_suites/#service-level-objectives
[4]: /synthetics/browser_tests/
[5]: /synthetics/mobile_app_testing/