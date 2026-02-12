---
title: Analyze Performance with Metrics
description: Understand the out-of-the-box performance metrics that are available with RUM without Limits.
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
- If you need performance metrics beyond the ones listed below, you can create [custom metrics][2] from your RUM events. Both OOTB and custom metrics are computed based on 100% of the traffic ingested.

| Metric Name | Description | Dimensions | Platform |
|-------------|-------------|------------|----------|
| `rum.measure.app.startup_time` | App startup time | Default, Percentiles breakdown | Mobile only |
| `rum.measure.error` | Count of errors | Default, Is Crash, View Name | Mobile & Browser |
| `rum.measure.error.anr` | Count of ANRs (an Android freeze) | Default, Is Crash, View Name | Mobile only |
| `rum.measure.error.hang` | Count of hangs (an iOS freeze) | Default | Mobile only |
| `rum.measure.error.hang.duration` | Duration of hangs (an iOS freeze) | Default, View Name | Mobile only |
| `rum.measure.session` | Count of sessions | Default | Mobile & Browser |
| `rum.measure.session.action` | Count of actions | Default | Mobile & Browser |
| `rum.measure.session.crash_free` | Count of crash-free sessions | Default | Mobile only |
| `rum.measure.session.error` | Count of errors per session (@session.error.count) | Default, Percentiles breakdown | Mobile & Browser |
| `rum.measure.session.frustration` | Count of frustration signals | Default | Mobile & Browser |
| `rum.measure.session.inactive` | Count of inactive sessions | Default | Mobile & Browser |
| `rum.measure.session.time_spent` | Session duration | Default, Percentiles breakdown | Mobile & Browser |
| `rum.measure.view` | Count of views | Default, View Name | Mobile & Browser |
| `rum.measure.view.cpu_ticks_per_second` | CPU ticks per second | Default, View Name | Mobile only |
| `rum.measure.view.crash_free` | Crash-free session rate | Default, View Name | Mobile only |
| `rum.measure.view.cumulative_layout_shift` | Cumulative Layout Shift | Default, Percentiles breakdown, View Name | Browser only |
| `rum.measure.view.loading_time` | Time until the page is ready and no network request or DOM mutation is currently occurring. | Default, Percentiles breakdown, View Name | Mobile & Browser |
| `rum.measure.view.error_free` | Count of error free sessions | Default, View Name | Mobile & Browser |
| `rum.measure.view.first_contentful_paint` | Time when the browser first renders any text, image (including background images), non-white canvas, or SVG | Default, Percentiles breakdown, View Name | Browser only |
| `rum.measure.view.frozen_frame` | Count of frozen frames | Default, View Name | Mobile only |
| `rum.measure.view.frozen_frame_free` | Count of views without frozen frames | Default | Mobile only |
| `rum.measure.view.inactive` | Count of inactive views | Default, Percentiles breakdown | Mobile & Browser |
| `rum.measure.view.interaction_to_next_paint` | Longest duration between a user's interaction with the page and the next paint.  | Default, Percentiles breakdown | Browser only |
| `rum.measure.view.interaction_to_next_view` | Time between the last user interaction in the previous view and the start of the current view | Default, Percentiles breakdown | Mobile only |
| `rum.measure.view.largest_contentful_paint` | Time in the page load where the largest DOM object in the viewport (visible on screen) is rendered | Default, Percentiles breakdown, View Name | Browser only |
| `rum.measure.view.memory` | Amount of system memory used | Default, Percentiles breakdown | Mobile only |
| `rum.measure.view.network_settled` | Network settled | Default, Percentiles breakdown | Mobile only |
| `rum.measure.view.refresh_rate` | Average of user's refresh rate (FPS) | Default, Percentiles breakdown | Mobile only |
| `rum.measure.view.slow_rendered` | Count of slow rendered views | Default | Mobile only |
| `rum.measure.view.time_spent` | Time spent on the current view | Default | Mobile & Browser |

## API

Metrics can be managed through [APIs][3] or Datadog's dedicated [Terraform modules][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /real_user_monitoring/platform/generate_metrics/
[3]: /api/latest/rum-metrics/
[4]: https://registry.terraform.io/providers/DataDog/datadog/3.60.0/docs/resources/rum_metric