---
title: Analyze Performance with Metrics
description: 
aliases:
further_reading:
  - link: '/real_user_monitoring/rum_without_limits/'
    tag: Documentation
    text: RUM without Limits
  - link: '/real_user_monitoring/rum_without_limits/retention_filters'
    tag: Documentation
    text: Retention Filters
---
## Overview

Datadog provides the below out-of-the-box metrics for a comprehensive overview of your application's health over time. To ensure accuracy, these metrics are computed prior to retaining or discarding any sessions. This means that even though you keep 0.01% of your sessions, these metrics are computed based on 100% of the ingested sessions. These metrics are powering the performance summary to give you an accurate overview of the performance of your apps.

**Note**: The **Default** cardinality set in the table below includes the following dimensions: environment, app name, app ID, app version, service, OS name, OS version, browser name, and country.

| Metric | Description | Level | Dimensions | Platform | 
|--------|-------------|-------|------------|----------|
| Cumulative Layout Shift | | View | Default, Percentiles breakdown, View Name | Browser only |
| First Contentful Paint | | Default, Percentiles breakdown, View Name | Browser only |
| Largest Contentful Paint | | Default, Percentiles breakdown, View Name | Browser only |
| API requests | | Session | Default, HTTP status code, View Name | Mobile & Browser | 
| Count of actions | | Default, Action Type, View Name | Mobile & Browser |
| Count of errors | | Default, Is Crash, View Name | Mobile & Browser |
| Count of errors per session (@session.error.count) | | Session | Default, Percentiles breakdown | Mobile & Browser |
| Count of frustration signals | | View | Default | Mobile & Browser |
| Count of sessions | | Session | Default | Mobile & Browser |
| Count of unique user | Session | Default, View Name | Mobile & Browser |
| Count of views | View | Default, View Name | Mobile & Browser |
| Session duration | | Session | Default, Percentiles breakdown | Mobile & Browser |
| View duration | | View | Default, Percentiles breakdown, View Name | Mobile & Browser |
| App startup time | | Session | Default, Percentiles breakdown | Mobile only |
| Count of frozen frames | | View | Default, View Name | Mobile only |
| Crash-free session rate | | Session | Default | Mobile only |

{{< img src="real_user_monitoring/rum_without_limits/metrics-test.png" alt="Estimated usage metrics details side panel" style="width:90%" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: 