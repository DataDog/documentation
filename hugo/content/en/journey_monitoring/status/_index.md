---
title: Journey Status
description: Understand how Datadog determines the status of a journey.
further_reading:
- link: '/journey_monitoring/'
  tag: 'Documentation'
  text: 'Learn about Journey Monitoring'
- link: '/real_user_monitoring/operations_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM Operations Monitoring'
- link: '/journey_monitoring/details_report/#synthetic-monitoring--testing'
  tag: 'Documentation'
  text: 'Learn about Synthetic test coverage'
---

## Overview

Journey status summarizes a journey's technical health as **Healthy**, **Degraded**, or **Missing coverage**. Datadog calculates the status from two types of [service level objective (SLO)][10] inputs:

- SLOs on [Real User Monitoring (RUM) operations][1] linked to the journey
- The [uptime SLO][11] for the journey's [Synthetic test suite][2]

Journey status reflects the latest state of these inputs. It does not provide status history or define a separate objective or evaluation window.

{{< img src="journey_monitoring/journey-monitoring-status.png" alt="Journey overview showing a degraded status caused by failing tests and a high test suite burn rate." style="width:100%;" >}}

## Status inputs

Datadog evaluates the [burn rate][3] of each SLO input:

- **High burn**: The SLO consumes its error budget faster than its target allows and is in or approaching breach.
- **Low burn or OK**: The SLO consumes its error budget at an acceptable rate.
- **No Data**: Datadog excludes the SLO from the calculation.

Journey status does not require both input types. A single high-burn SLO from either type makes the journey **Degraded**.

### RUM operation SLOs

<div class="alert alert-info">Creating RUM operations requires an active trial or paid subscription to <a href="/real_user_monitoring/rum_without_limits/">RUM without Limits&trade;</a>. After you link an operation to a journey, its SLOs can contribute to journey status.</div>

The RUM operation input has a high burn rate when at least one SLO on a linked operation has a high burn rate. It is healthy when at least one operation SLO is included and every included SLO has a low burn rate or is OK.

A linked RUM operation is explicitly identified as part of the journey's critical path. Linking distinguishes operations that users encounter during the journey from unrelated operations that run at the same time.

Datadog excludes unlinked operations and linked operations without an SLO from the status calculation. When you link an operation without an SLO, Datadog creates an availability SLO with a 99% objective. Customize this SLO or add more availability and latency SLOs as needed. For guidance, see [Best Practices for Creating SLOs for RUM Operations][4].

Manage links from the operation details report, the journey [details report][5], or the [RUM Operations API][7].

### Test suite uptime SLO

<div class="alert alert-info">Creating or managing the test suite and tests that provide this status input requires an active trial or paid subscription to <a href="/synthetics/browser_tests/">Synthetic Browser Tests</a> or <a href="/synthetics/mobile_app_testing/">Synthetic Mobile Tests</a>.</div>

The test suite has a time-slice uptime SLO that evaluates its critical tests. Tests are critical by default. Mark a test as non-critical to exclude it from the uptime SLO while keeping it in the suite.

The test suite input has a high burn rate when its uptime SLO has a high burn rate. It is healthy when the uptime SLO has a low burn rate or is OK. If the suite has no test data, Datadog excludes this input from the calculation.

## Status calculation

Datadog combines the included RUM operation and test suite inputs:

- **Degraded**: At least one included SLO has a high burn rate
- **Healthy**: At least one SLO is included, and every included SLO has a low burn rate or is OK
- **Missing coverage**: No SLO input remains in the calculation. This occurs when the journey has no configured inputs or when all configured inputs report **No Data**

Changes to the journey's inputs affect its status automatically. This includes linking RUM operations and adding or removing tests from the test suite.

## Investigate journey status

View journey status in the [catalog][12], [map][13], and details report:

- For a **Degraded** journey, Datadog links to the **Critical** operations or in **Alert** Synthetic tests that contribute to the state. If Bits AI is enabled for your organization, launch a [Bits Investigation][14] from the operation or test to identify the root cause.
- For a journey with **Missing coverage**, [link an operation with an SLO][8] or [add a covering test][9]. If coverage is configured, confirm that its SLO inputs report data.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/operations_monitoring/
[2]: /journey_monitoring/details_report/#synthetic-monitoring--testing
[3]: /service_level_objectives/#slo-burn-rate-indicator
[4]: /real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
[5]: /journey_monitoring/details_report/
[7]: /api/latest/rum-operations/
[8]: /journey_monitoring/configuring_journeys/#review-matching-operations
[9]: /journey_monitoring/configuring_journeys/#manage-tests
[10]: /service_level_objectives/
[11]: /synthetics/test_suites/#service-level-objectives
[12]: /journey_monitoring/overview/#journey-catalog
[13]: /journey_monitoring/map/
[14]: /bits_ai/bits_investigation/
