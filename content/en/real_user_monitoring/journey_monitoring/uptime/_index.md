---
title: Feature Uptime
private: true
description: "Measure the availability of your user journey using the accompanying Synthetics test suite."
further_reading:
- link: '/real_user_monitoring/journey_monitoring/'
  tag: 'Documentation'
  text: 'Learn about Feature Monitoring'
- link: '/real_user_monitoring/journey_monitoring/map/'
  tag: 'Documentation'
  text: 'Learn about the journey map'
- link: '/real_user_monitoring/journey_monitoring/map/suggested_journeys/'
  tag: 'Documentation'
  text: 'Learn about suggested journeys'
- link: '/real_user_monitoring/journey_monitoring/details_report/'
  tag: 'Documentation'
  text: 'Learn about journey details reports'
- link: '/real_user_monitoring/journey_monitoring/details_report/variants/'
  tag: 'Documentation'
  text: 'Learn about journey variants'
---

{{< callout url="https://www.datadoghq.com/product-preview/operations-monitoring/" btn_hidden="true" header="false">}}
Feature Monitoring is in Preview.
{{< /callout >}}


## Overview

All features in [Feature Monitoring][6] automatically have an accompanying [test suite][1]. Each test suite contains one or more tests that cover the feature and its [variants][2].


## Feature coverage

A feature is considered to be covered if one of its Synthetic [Browser][4] or [Mobile tests][5] ran at least once successfully in the past 7 days.

## Configuring a feature's test suite

By default, each feature's test suite has the same name as the feature. When the feature is created, its test suite is automatically populated with all of its covering tests, according to the definition above.

The automatically created [test suite][1] is editable, meaning tests can be added and/or removed. Datadog continually scans your test collection to list new tests that cover the feature that aren't part of the test suite, for you to optionally add to the test suite.

## Feature uptime

Datadog automatically starts calculating an [uptime SLO][3] on the test suite. By default, the SLO is evaluated at a 99.9% uptime, and the threshold is editable.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/test_suite/
[2]: /real_user_monitoring/journey_monitoring/details_report/variants/
[3]: /synthetics/test_suites/#service-level-objectives
[4]: /synthetics/browser_tests/
[5]: /synthetics/mobile_app_testing/
[6]: /real_user_monitoring/journey_monitoring/