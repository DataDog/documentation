---
title: Journey Details Report
description: Inspect each journey's performance with detailed report combining Product Analytics, Real User Monitoring, Synthetic Testing, and Session Replay data.  
further_reading:
- link: "/journey_monitoring/"
  tag: "Documentation"
  text: "Learn about Journey Monitoring"
- link: "/journey_monitoring/map/"
  tag: "Documentation"
  text: "Learn about the Journey Map"
- link: '/journey_monitoring/map/suggested_journeys/'
  tag: 'Documentation'
  text: 'Learn about suggested journeys'
- link: '/journey_monitoring/details_report/variants/'
  tag: 'Documentation'
  text: 'Learn about journey variants'
---

{{< callout url="https://www.datadoghq.com/product-preview/operations-monitoring/" btn_hidden="false" header="Join the Preview!">}}
Journey Monitoring is in Preview.
{{< /callout >}}

## Overview

Each created journey has a details report federating metrics and telemetry from [Real User Monitoring][1], [Synthetic Testing][2], [Product Analytics][3], and [Session Replay][4]. The report shows data about the journey's user behavior patterns and technical performance.

[INSERT IMAGE HERE]



## Journey and variant filters

The left side of the report lists the journey and its [variants][5]. Each entry in the list is a filter. If the journey filter is selected, all data in the report will be based on the journey and all of its variants. If a variant is selected, the report will show data specfic to that variant. 

<div class="alert alert-warning">By default, the journey is selected as the filter for the report.</div>



## Attribute filters

The attribute and feature flag filters at the top of the details report work in tandem with the journey and variant filters. Selecting an attribute or feature flag will filter all data in the details report.



## Product Analytics

### Funnel

Each details report has a [funnel][6] showing the journey's traffic, conversion rate, and average completion time for each step. The top conversion and drop-off drivers are located under the funnel. You can also click on <strong>Analyze in Product Analytics</strong> to analyze funnel drop-off patterns.

### User drop-offs

The table of users who dropped off includes links to Session Replays for each session. Click "Create Segment" to create a segment of users who dropped off in the journey in Product Analytics.

 
## Real User Monitoring

### Operations

The [operations][7] table lists all operations associated with the journey. Each entry displays:
- The Operation's name
- The number of breached SLOs and monitors on the Operation
- The Operation's success rate, calculated using the `rum.measure.operation` metric
- The Operation's latency

Click on an operation to open a side panel with details about its performance. Data in the side panel includes:
- The list of SLOs and monitors configured for the Operation
- The volume of Operations, calculated using the `rum.measure.operation` metric
- The Operation's success rate, calculated using the `rum.measure.operation` metric
- The Operation's latency, calculated using the `rum.measure.operaiton.duration` metric

[INSERT IMAGE HERE]

The side panel also includes a list of the backend services the Operation dependens on. Each entry includes metrics on the backend service's performance. Clicking onto a backend service will redirect you to the service's entry in the APM [Software Catalog][8]. 


### Error Count

The error count chart shows a timeseries of errors that ocurred while users were executing the journey. The data is imported from frontend issues in [Error Tracking][9]. You can click on the <strong>Investigate</strong> button to see the list of top issues. Clicking on any issue in the list will redirect you to the issue in Error Tracking.



## Synthetic Testing

### Tests table

The Synthetics tests table lists all synthetic tests in the journey's [test suite][10]. Each row represents a single test and its performance, including:
- The test's status, which can either be `Passed` or `Failing`
- The test's type, which can either be `Browser` or `Mobile`
- The test's uptime
- When the test most recently ran

Click on <strong>Edit Test Suite</strong> to create a new test and add it to the journey's test suite. You can also click on "Edit Test Suite" to visit the journey's test suite and directly edit it. 

### Add pre-existing tests 

The final table lists already created tests that cover the journey but are not part of its test suite. Each row represents a single test and contains the same data as the table above. You can add each test in this table to the journey's test suite, which will automatically start contributing to the journey's uptime through the test suite SLO.


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
[10]:/journey_monitoring/uptime/