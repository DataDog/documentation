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

**Notes**:
- The **Default** cardinality set in the table below includes the following dimensions: environment, app name, app ID, app version, service, OS name, OS version, browser name, and country.
- All queries for the below metrics include `@session.type:user`.

| Metric Name | Description | Dimensions | Platform |
|-------------|-------------|------------|----------|
| `app_startup_time` | App startup time | Default, Percentiles breakdown | Mobile only |
| `errors` | Count of errors | Default, Is Crash, View Name | Mobile & Browser |
| `errors.hang_duration` | Errors - hang duration | Default, View Name | Mobile only |
| `sessions` | Count of sessions | Default | Mobile & Browser |
| `sessions.actions` | Count of actions | Default, Action Type, View Name | Mobile & Browser |
| `sessions.anr` | Count of sessions with ANR errors | Default | Mobile only |
| `sessions.crash_free` | Count of crash-free sessions | Default | Mobile & Browser |
| `sessions.errors` | Count of errors per session (@session.error.count) | Default, Percentiles breakdown | Mobile & Browser |
| `sessions.frustration_signals` | Count of frustration signals | Default | Mobile & Browser |
| `sessions.hang` | Count of sessions with hangs | Default | Mobile only |
| `sessions.inactive` | Count of inactive sessions | Default | Mobile & Browser |
| `@session.type:user` | Count of unique user | Default, View Name | Mobile & Browser |
| `sessions.time_spent` | Session duration | Default, Percentiles breakdown | Mobile & Browser |
| `views` | Count of views | Default, View Name | Mobile & Browser |
| `views.cpu_ticks_per_second` | CPU tickets per second | Default, View Name | Browser only |
| `views.crash_free` | Crash-free session rate | Default, View Name | Mobile only |
| `views.cumulative_layout_shift` | Cumulative Layout Shift | Default, Percentiles breakdown, View Name | Browser only |
| `views.duration` | View duration | Default, Percentiles breakdown, View Name | Mobile & Browser |
| `views.error_free` | Count of error free sessions | Default, View Name | Mobile & Browser |
| `views.first_contentful_paint` | First Contentful Paint | Default, Percentiles breakdown, View Name | Browser only |
| `views.frozen_frames` | Count of frozen frames | Default, View Name | Mobile & Browser |
| `view.frozen_frames_free` | Count of views with frozen frames | Default | Mobile & Browser |
| `views.inactive` | Count of inactive views | Default, Percentiles breakdown | Mobile & Browser |
| `views.interaction_to_next_paint` | Interaction to Next Paint | Default, Percentiles breakdown | Browser only |
| `views.interaction_to_next_view` | Interaction to Next View | Default, Percentiles breakdown | Browser only |
| `views.largest_contentful_paint` | Largest Contentful Paint | Default, Percentiles breakdown, View Name | Browser only |
| `views.loading_time` | Loading time | Default | Mobile & Browser |
| `views.memory` | Memory | Default, Percentiles breakdown | Mobile & Browser |
| `views.network_settled` | Network settled | Default, Percentiles breakdown | Mobile & Browser |
| `views.refresh_rate` | Refresh rate | Default, Percentiles breakdown | Mobile & Browser |
| `views.slow_rendered` | Count of slow rendered views | Default | Mobile & Browser |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring