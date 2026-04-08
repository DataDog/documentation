---
title: Journey Uptime
description: "Measure the availability of your user journey using the accompanying Synthetics test suite."
further_reading:
- link: '/journey_monitoring/'
  tag: 'Documentation'
  text: 'Learn about the journey map'
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

Each created user journey will have an automatically [test suite][1] created. Each test suite can contain one or more tests that cover the journey and its [variants][2]. 

[INSERT DIAGRAM]

## Configuring the journey's test suite

By default, each journey's test suite will have the same name as the journey.

## Journey uptime

As long as the journey's test suite has at least one active test in it, each suite will automatically have:
- A monitor 

Datadog will automatically start calculating an uptime SLO on the test suite as long as the test suite has at least one active test in it. By default, the SLO will be evaluated at a 99.99% availability rate.

You can add and remove tests from the test suite. Each added test will automatically be marked as <strong>critical</strong>, meaning the test suite 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/test_suite/
[2]: /journey_monitoring/variants/