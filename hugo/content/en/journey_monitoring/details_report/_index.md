---
title: Journey Details Report
description: Inspect each journey's performance with a detailed report combining Product Analytics, Real User Monitoring, Synthetic Monitoring & Testing, and Session Replay data.
aliases:
- /journey_monitoring/uptime/
further_reading:
- link: "/journey_monitoring/"
  tag: "Documentation"
  text: "Learn about Journey Monitoring"
- link: "/journey_monitoring/map/"
  tag: "Documentation"
  text: "Learn about the map"
- link: '/journey_monitoring/suggested_journeys/'
  tag: 'Documentation'
  text: 'Learn about suggested journeys'
- link: '/journey_monitoring/details_report/variants/'
  tag: 'Documentation'
  text: 'Learn about journey variants'
---

## Overview

The journey details report combines user behavior and technical performance data from [Product Analytics][3], [Session Replay][4], [Real User Monitoring (RUM)][1], and [Synthetic Monitoring & Testing][2].

{{< img src="journey_monitoring/journey-monitoring-details-report-2.png" alt="The Journey Monitoring details report showing a specific journey's key performance indicators, user behavior insights, and technical performance measurements." style="width:100%;" >}}

### Journey and variant filters

The journey and its [variants][5] act as report filters. The journey is selected by default and includes data from all variants. Select a variant to filter the report to that path.

### Attribute filters

[Attribute filters][22] apply together with the selected journey or variant. They filter the report to sessions that triggered the journey and match the selected attributes.

### Funnel

The [funnel][6] shows traffic, conversion rate, and average time to convert for each step. Below the funnel, review factors associated with conversion and drop-off. Click **View Details** to analyze drop-off patterns.

### Traffic and conversion trends

The traffic and conversion trends section shows these key performance indicators (KPIs):

- **Starts volume**: Total journey attempts across user sessions
- **Conversion volume**: Completed journey attempts across user sessions
- **Average time to convert**: Average time required to complete the journey
- **Conversion rate**: Percentage of journey attempts that were completed

Each KPI compares the selected time frame with the immediately preceding time frame of the same length. For example, if you select one week, the comparison uses the previous week. If you select one day, it uses the previous day. Volume and time-to-convert metrics show percentage changes, while conversion rate shows the percentage-point change.

#### KPI source and retention

The KPI data source and retention period depend on Product Analytics access:

- **Preview**: Uses all Product Analytics data from a rolling 30-day window
- **Trial**: Uses all Product Analytics data from the full trial period
- **Paid**: Uses all Product Analytics data from a rolling 15-month window
- **Product Analytics not enabled**: Uses [RUM without Limits™][18] metrics

With RUM without Limits, starts volume, conversion volume, and conversion rate use the `rum.measure.journey` metric. Average time to convert uses `rum.measure.journey.duration`.

## Product Analytics

<div class="alert alert-info">The data in this section is available only with an active Product Analytics trial or paid subscription.</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-product-analytics.png" alt="Section of the Journey Monitoring details report a specific journey's top paths and users for converted and dropped off sessions." style="width:100%;" >}}

### Top paths

The [Top Paths visualization][12] shows how users move through the journey between selected steps. Compare paths for users who converted with paths for users who dropped off.

The visualization displays the most common paths, which may not represent 100% of completed journeys. The footer shows the percentage and number of sessions represented by the remaining paths.

### Users

The users table lists the top users who converted or dropped off during the journey. Click a user to view their Session Replays from sessions in which they experienced the journey.

## Real User Monitoring

<div class="alert alert-info">The data in this section is available only with an active trial or paid subscription to RUM without Limits&trade;.</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-real-user-monitoring.png" alt="Section of the Journey Monitoring details report a specific journey's RUM operations and timeseries of frontend issues." style="width:100%;" >}}

### Operations

The [operations][7] table includes linked and unlinked RUM operations. It groups them by [service level objective (SLO)][19] state:

- **Critical**: Operations linked to the journey that have at least one SLO with a high burn rate.
- **OK**: Operations linked to the journey that have at least one SLO and whose SLOs are all in an OK state.
- **Matching**: Unlinked operations that Datadog identifies through time correlation. Matching operations may not have an SLO.

The linked operations in the **Critical** and **OK** categories are the same operations whose SLOs contribute to [journey status][15].

Review and link matching operations that users encounter during the journey. For configuration guidance, see [Review matching operations][14].

When no matching operation represents a critical action, follow [Create operations][23]. If you create one from the table, Datadog links it to the journey and creates an availability SLO with a 99% objective.

Each operation row also shows its execution count and success rate, calculated using the `rum.measure.operation` metric, and its p75 latency, calculated using the `rum.measure.operation.duration` metric.

<div class="alert alert-tip">If Bits AI is enabled for your organization, launch a <a href="/real_user_monitoring/ai_investigations/operation_ai_investigation/">Bits Investigation</a> from an operation to troubleshoot failures or latency regressions.</div>

Click an operation to open its performance side panel. The panel shows:
- The list of SLOs and monitors configured for the operation
- The volume, success rate, and latency of the operation
- Where the operation executed within the journey's lifecycle

If RUM is connected to [Application Performance Monitoring (APM) traces][11], the side panel also lists backend service dependencies and their performance metrics. Click a backend service to open its entry in the APM [Catalog][8].

### Error count

The error count chart plots frontend issues from [Error Tracking][9] that occurred during the journey. Click **Investigate** to review the top issues, then select an issue to open it in Error Tracking.

## Synthetic Monitoring & Testing

<div class="alert alert-info">The data in this section is available only with an active trial or paid subscription to <a href="/synthetics/browser_tests/">Synthetic Browser Tests</a> or <a href="/synthetics/mobile_app_testing/">Synthetic Mobile Tests</a>.</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-synthetics.png" alt="Section of the Journey Monitoring details report a specific journey's Synthetics tests." style="width:100%;" >}}

### Test suite and journey coverage

For event-based journeys, Datadog creates a [test suite][10] when the journey creator has Synthetic Monitoring write access. The suite has the same name as the journey. In a Synthetics-only configuration, the existing test suite defines the journey.

The test suite widget shows suite performance and [uptime][13]. The suite's uptime SLO represents journey uptime and contributes to journey status. A high burn rate on this SLO puts the journey in a **Degraded** state. The SLO has an editable default objective of 99.9%.

A journey has [Synthetic coverage][20] when its suite contains at least one covering test. For event-based journeys, Datadog identifies new [matching tests][21] as the application changes. Add or remove tests to keep suite coverage aligned with the journey.

### Tests table

The Synthetic tests table includes tests that belong to the journey's test suite and matching tests that do not. It groups them by state:

- **Alert**: Tests in the journey's test suite that are in an alert state.
- **OK**: Tests in the journey's test suite that are in an OK state.
- **Matching**: Tests that Datadog identifies as covering the journey but that are not in its test suite.

Each test row also shows its name, domain, and uptime.

<div class="alert alert-tip">If Bits AI is enabled for your organization, launch a <a href="/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page">Bits Investigation</a> from a test in the <strong>Alert</strong> state to identify its root cause.</div>

Click **Manage Tests** to add or remove tests from the suite, or **New Test** to create a test.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /synthetics/
[3]: /product_analytics/
[4]: /session_replay/
[5]: /journey_monitoring/details_report/variants/
[6]: /product_analytics/charts/funnel_analysis/
[7]: /real_user_monitoring/operations_monitoring/
[8]: /internal_developer_portal/catalog/
[9]: /error_tracking/
[10]: /synthetics/test_suites/
[11]: /real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
[12]: /product_analytics/charts/journey_paths/
[13]: /synthetics/test_suites/#service-level-objectives
[14]: /journey_monitoring/configuring_journeys/#review-matching-operations
[15]: /journey_monitoring/status/#rum-operation-slos
[18]: /real_user_monitoring/rum_without_limits/
[19]: /service_level_objectives/
[20]: /journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[21]: /journey_monitoring/configuring_journeys/#review-matching-tests
[22]: /journey_monitoring/configuring_journeys/#attribute-filters
[23]: /journey_monitoring/configuring_journeys/#create-operations
