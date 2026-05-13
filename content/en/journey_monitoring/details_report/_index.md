---
title: Feature Details Report
private: true
description: Inspect each feature's performance with a detailed report combining Product Analytics, Real User Monitoring, Synthetic Monitoring & Testing, and Session Replay data.
further_reading:
- link: "/journey_monitoring/"
  tag: "Documentation"
  text: "Learn about Feature Monitoring"
- link: "/journey_monitoring/map/"
  tag: "Documentation"
  text: "Learn about the map"
- link: '/journey_monitoring/map/suggested_journeys/'
  tag: 'Documentation'
  text: 'Learn about suggested features'
- link: '/journey_monitoring/details_report/variants/'
  tag: 'Documentation'
  text: 'Learn about feature variants'
- link: '/journey_monitoring/uptime/'
  tag: 'Documentation'
  text: 'Learn about feature uptime'
---

{{< callout url="https://www.datadoghq.com/product-preview/operations-monitoring/" btn_hidden="true" header="false">}}
Feature Monitoring is in Preview.
{{< /callout >}}

## Overview

Each feature has a details report that combines metrics and telemetry from [Real User Monitoring][1], [Synthetic Monitoring & Testing][2], [Product Analytics][3], and [Session Replay][4]. The report shows data about the feature's user behavior patterns and technical performance.

{{< img src="journey_monitoring/journey-monitoring-details-report.png" alt="The Feature Monitoring details report showing a specific feature's key performance indicators, user behavior insights, and technical performance measurements." style="width:100%;" >}}

## Feature and variant filters

The left side of the report lists the feature and its [variants][5]. Each entry in the list is a filter. If the feature filter is selected, all data in the report is based on the feature and all of its variants. If a variant is selected, the report shows data specific to that variant.

<div class="alert alert-warning">By default, the feature is selected as the filter for the report.</div>

## Attribute filters

The attribute filters at the top of the details report work in tandem with the feature and variant filters. Selecting an attribute filter filters all data in the details report. Filters are scoped to sessions that triggered this feature.

## Product Analytics

### Funnel

Each details report has a [funnel][6] showing the feature's traffic, conversion rate, and average completion time for each step. The top conversion and drop-off drivers are located under the funnel. You can also click on **Analyze in Product Analytics** to analyze funnel drop-off patterns.

### User drop-offs

The user drop-off table lists the users who most frequently started but did not complete the feature. Click on a user to view their Session Replays.

## Real User Monitoring

### Operations

The [operations][7] table lists all operations associated with the feature. Each entry displays:
- The operation's name
- The number of breached SLOs and monitors on the operation
- The number of times the operation executed, calculated using the `rum.measure.operation` metric
- The operation's success rate, calculated using the `rum.measure.operation` metric
- The operation's latency, calculated using the `rum.measure.operation.duration` metric

Click on an operation to open a side panel with details about its performance. Data in the side panel includes:
- The list of SLOs and monitors configured for the operation
- The volume, success rate, and latency of the operation
- Where the operation executed within the feature's lifecycle

If the RUM [distributed tracing][11] integration is enabled, the side panel also includes a list of the backend services the operation depends on. Each entry includes metrics on the backend service's performance. Clicking on a backend service opens the service's entry in the APM [Software Catalog][8].

### Error count

The error count chart shows a timeseries of errors that occurred while users were executing the feature. The data is imported from frontend issues in [Error Tracking][9]. You can click on the **Investigate** button to see the list of top issues. Clicking on any issue in the list redirects you to the issue in Error Tracking.

{{< img src="journey_monitoring/journey-monitoring-details-report-technical.png" alt="The Feature Monitoring details report showing a specific feature's technical performance data, including error count timeseries and backend service dependencies." style="width:100%;" >}}

## Synthetic Monitoring & Testing

### Tests table

The Synthetics tests table lists all Synthetic tests in the feature's [test suite][10]. Each row represents a single test and its performance, including:
- The test's status, which can either be `Passed` or `Failing`
- The test's type, which can either be `Browser` or `Mobile`
- The test's uptime
- When the test most recently ran

Click on **View Test Suite** to visit the feature's test suite and edit it directly.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /synthetics/
[3]: /product_analytics/
[4]: /session_replay/
[5]: /journey_monitoring/details_report/variants/
[6]: /product_analytics/charts/funnel_analysis/
[7]: /real_user_monitoring/operations_monitoring/
[8]: /internal_developer_portal/software_catalog/
[9]: /error_tracking/
[10]: /journey_monitoring/uptime/
[11]: /real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
