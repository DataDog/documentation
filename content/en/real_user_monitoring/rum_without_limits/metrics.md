---
title: Analyze Performance with Metrics
description: Understand the out-of-the-box performance metrics that are available with RUM without Limits.
private: true
further_reading:
  - link: '/real_user_monitoring/rum_without_limits/'
    tag: Documentation
    text: RUM without Limits
  - link: '/real_user_monitoring/rum_without_limits/retention_filters'
    tag: Documentation
    text: Retention Filters
  - link: '/real_user_monitoring/guide/retention_filter_best_practices/'
    tag: Guide
    text: Retention Filter Best Practices
---
## Overview

{{< img src="real_user_monitoring/rum_without_limits/filters.png" alt="Visualization of Android app crash-free sessions percentage over four weeks." style="width:90%" >}}

Datadog provides the below out-of-the-box metrics for a comprehensive overview of your application's health over time. To ensure accuracy, these metrics are computed prior to retaining or discarding any sessions. This means that even though you keep 0.01% of your sessions, these metrics are computed based on 100% of the ingested sessions. These metrics are powering the [performance summary][1] to give you an accurate overview of the performance of your apps.

**Note**: The **Default** cardinality set in the table below includes the following dimensions: environment, app name, app ID, app version, service, OS name, OS version, browser name, and country.

| Metric | Description | Dimensions | Platform | 
|--------|-------------|-------|------------|----------|
| Cumulative Layout Shift | | Default, Percentiles breakdown, View Name | Browser only |
| First Contentful Paint | | Default, Percentiles breakdown, View Name | Browser only |
| Largest Contentful Paint | | Default, Percentiles breakdown, View Name | Browser only |
| API requests | | Default, HTTP status code, View Name | Mobile & Browser | 
| Count of actions | | Default, Action Type, View Name | Mobile & Browser |
| Count of errors | | Default, Is Crash, View Name | Mobile & Browser |
| Count of errors per session (@session.error.count) | | Default, Percentiles breakdown | Mobile & Browser |
| Count of frustration signals | | Default | Mobile & Browser |
| Count of sessions | | Default | Mobile & Browser |
| Count of unique user | | Default, View Name | Mobile & Browser |
| Count of views | | Default, View Name | Mobile & Browser |
| Session duration | | Default, Percentiles breakdown | Mobile & Browser |
| View duration | | Default, Percentiles breakdown, View Name | Mobile & Browser |
| App startup time | | Default, Percentiles breakdown | Mobile only |
| Count of frozen frames | | Default, View Name | Mobile only |
| Crash-free session rate | | Default | Mobile only |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring