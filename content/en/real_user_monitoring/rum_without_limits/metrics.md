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

{{< img src="real_user_monitoring/rum_without_limits/filters-rum-measure-view.png" alt="Visualization of Android app crash-free sessions percentage over four weeks." style="width:90%" >}}

Datadog provides the below out-of-the-box metrics for a comprehensive overview of your application's health over time. To ensure accuracy, these metrics are computed prior to retaining or discarding any sessions. This means that even though you keep 0.01% of your sessions, these metrics are computed based on 100% of the ingested sessions. These metrics are powering the [performance summary][1] to give you an accurate overview of the performance of your apps.

**Notes**:
- The **Default** cardinality set in the table below includes the following dimensions: environment, app name, app ID, app version, service, OS name, OS version, browser name, and country.
- All queries for the below metrics include `@session.type:user`.

| Metric Name | Description | Dimensions | Platform |
|-------------|-------------|------------|----------|
| `app.startup_time` | App startup time | Default, Percentiles breakdown | Mobile only |
| `error` | Count of errors | Default, Is Crash, View Name | Mobile & Browser |
| `error.anr` | Count of ANRs (an Android freeze) | Default, Is Crash, View Name | Mobile only |
| `error.hang` | Count of hangs (an iOS freeze) | Default | Mobile only |
| `error.hang.duration` | Duration of hangs (an iOS freeze) | Default, View Name | Mobile only |
| `session` | Count of sessions | Default | Mobile & Browser |
| `session.action` | Count of actions | Default, Action Type, View Name | Mobile & Browser |
| `session.crash_free` | Count of crash-free sessions | Default | Mobile only |
| `session.error` | Count of errors per session (@session.error.count) | Default, Percentiles breakdown | Mobile & Browser |
| `session.frustration` | Count of frustration signals | Default | Mobile & Browser |
| `session.inactive` | Count of inactive sessions | Default | Mobile & Browser |
| `session.time_spent` | Session duration | Default, Percentiles breakdown | Mobile & Browser |
| `view` | Count of views | Default, View Name | Mobile & Browser |
| `view.cpu_ticks_per_second` | CPU ticks per second | Default, View Name | Mobile only |
| `view.crash_free` | Crash-free session rate | Default, View Name | Mobile only |
| `view.cumulative_layout_shift` | Cumulative Layout Shift | Default, Percentiles breakdown, View Name | Browser only |
| `view.loading_time` | Time until the page is ready and no network request or DOM mutation is currently occurring. | Default, Percentiles breakdown, View Name | Mobile & Browser |
| `view.error_free` | Count of error free sessions | Default, View Name | Mobile & Browser |
| `view.first_contentful_paint` | Time when the browser first renders any text, image (including background images), non-white canvas, or SVG | Default, Percentiles breakdown, View Name | Browser only |
| `view.frozen_frame` | Count of frozen frames | Default, View Name | Mobile only |
| `view.frozen_frame_free` | Count of views without frozen frames | Default | Mobile only |
| `view.inactive` | Count of inactive views | Default, Percentiles breakdown | Mobile & Browser |
| `view.interaction_to_next_paint` | Longest duration between a user's interaction with the page and the next paint.  | Default, Percentiles breakdown | Browser only |
| `view.interaction_to_next_view` | Time between the last user interaction in the previous view and the start of the current view | Default, Percentiles breakdown | Mobile only |
| `view.largest_contentful_paint` | Time in the page load where the largest DOM object in the viewport (visible on screen) is rendered | Default, Percentiles breakdown, View Name | Browser only |
| `view.memory_average` | Amount of system memory used | Default, Percentiles breakdown | Mobile only |
| `view.network_settled` | Network settled | Default, Percentiles breakdown | Mobile only |
| `view.refresh_rate_average` | Average of user's refresh rate (FPS) | Default, Percentiles breakdown | Mobile only |
| `view.slow_rendered` | Count of slow rendered views | Default | Mobile only |
| `view.time_spent` | Time spent on the current view | Default | Mobile & Browser |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring