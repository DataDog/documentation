---
title: Out-of-the-Box Metrics
description: Understand the out-of-the-box performance metrics that are available with RUM without Limits.
aliases:
  - /real_user_monitoring/rum_without_limits/metrics/
further_reading:
  - link: '/real_user_monitoring/retain_and_recover_valuable_sessions/'
    tag: Documentation
    text: Retain and Recover Valuable Sessions
  - link: '/real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/'
    tag: Documentation
    text: Configure retention filters
  - link: '/real_user_monitoring/retain_and_recover_valuable_sessions/control_volumes_with_quotas/'
    tag: Documentation
    text: Control volumes with quotas
  - link: '/real_user_monitoring/guide/retention_filter_best_practices/'
    tag: Guide
    text: Retention Filter Best Practices
---
## Overview

{{< img src="real_user_monitoring/rum_without_limits/filters-rum-measure-view.png" alt="Visualization of Android app crash-free sessions percentage over four weeks." style="width:90%" >}}

Datadog provides the below out-of-the-box metrics for a comprehensive overview of your application's health over time. To help ensure accuracy, these metrics are computed prior to retaining or discarding any sessions. This means that even if you keep 0.01% of your sessions, these metrics are computed based on 100% of the ingested sessions. These metrics are powering the [performance summary][1] to give you an accurate overview of the performance of your apps.

**Notes**:
- The **Dimensions** column lists the dimensions you can use to filter and group each metric:
  - {{< ui >}}Default{{< /ui >}}: environment, app name, app short name, app ID, app version, service, team, OS name, OS version, browser name, country, and session type.
  - {{< ui >}}App launch{{< /ui >}}: environment, app name, app ID, app version, service, team, OS name, OS version, country, device model, startup type, prewarmed, connectivity status, connectivity interfaces, and session type.
  - {{< ui >}}Operations{{< /ui >}}: environment, app name, app short name, app ID, app version, service, team, browser name, country, operation name, operation status, failure reason, start view name, end view name, is crash, and session type.
  - {{< ui >}}Journeys{{< /ui >}}: environment, app name, app short name, app ID, app version, service, team, browser name, country, journey name, journey status, failure reason, journey metadata ID, and session type.
  - {{< ui >}}Percentiles breakdown{{< /ui >}}: The metric supports percentile queries (p50, p75, p90, p95, p99).
  - {{< ui >}}View Name{{< /ui >}}: The metric can be grouped by view name.
  - {{< ui >}}Error Source{{< /ui >}}: The metric can be grouped by where the error came from (error source).
  - {{< ui >}}Error Category{{< /ui >}}: The metric can be grouped by error category.
  - {{< ui >}}Is Crash{{< /ui >}}: The metric can be grouped by whether the error is a crash.

  Most dimensions have a cardinality cap.
- All queries for the below metrics include user and agent sessions (`@session.type:(user OR agent)`), except the `rum.measure.lighthouse.*` metrics, which come from browser Synthetic test audits rather than real-user sessions. See [Lighthouse audits][5]. Use the session type dimension to separate them.
- Some metrics are captured when a session or view is first detected. Others are captured when it becomes inactive. Comparing these metrics over short time windows can produce unexpected ratios. See [When metrics are computed](#when-metrics-are-computed).

| Metric Name | Description | Dimensions | Platform |
|-------------|-------------|------------|----------|
| `rum.measure.app.startup_time` | Application startup time. **Deprecated**: Android and iOS SDK 3.5.0 and later don't collect the `application_start` action, so this metric only gets data from apps on older SDK versions. Use `rum.measure.app.startup_to_initial_display` and `rum.measure.app.startup_to_full_display` instead. | Default, Percentiles breakdown | Mobile only |
| `rum.measure.app.startup_to_full_display` | Time to full display during application launch. Requires your app to report when it is fully displayed. See [Track Application Startups][8]. | App launch, Percentiles breakdown, View Name | Mobile only |
| `rum.measure.app.startup_to_initial_display` | Time to initial display during application launch | App launch, Percentiles breakdown | Mobile only |
| `rum.measure.error` | Count of errors | Default, Error Source, Error Category, Is Crash, View Name | Mobile & Browser |
| `rum.measure.error.anr` | Count of ANRs (an Android freeze) | Default, Error Source | Mobile only |
| `rum.measure.error.hang` | Count of hangs (an iOS freeze). Only counts hangs longer than 250 ms. | Default, Error Source | Mobile only |
| `rum.measure.error.hang.duration` | Duration of hangs (an iOS freeze). Only counts hangs longer than 250 ms. | Default, Error Source | Mobile only |
| `rum.measure.journey` | Count of journeys. Requires [Journey Monitoring][6]. | Journeys | Mobile & Browser |
| `rum.measure.journey.duration` | Duration of journeys. Requires [Journey Monitoring][6]. | Journeys, Percentiles breakdown | Mobile & Browser |
| `rum.measure.lighthouse.accessibility` | Lighthouse Accessibility category score (0 to 100) | Default, Percentiles breakdown, View Name | Browser only |
| `rum.measure.lighthouse.agentic` | Lighthouse Agentic category score (0 to 100) | Default, Percentiles breakdown, View Name | Browser only |
| `rum.measure.lighthouse.best_practices` | Lighthouse Best Practices category score (0 to 100) | Default, Percentiles breakdown, View Name | Browser only |
| `rum.measure.lighthouse.performance` | Lighthouse Performance category score (0 to 100) | Default, Percentiles breakdown, View Name | Browser only |
| `rum.measure.lighthouse.seo` | Lighthouse SEO category score (0 to 100) | Default, Percentiles breakdown, View Name | Browser only |
| `rum.measure.operation` | Count of operations. Requires operations to be instrumented. See [Track Critical Operations][7]. | Operations | Mobile & Browser |
| `rum.measure.operation.duration` | Duration of operations. Requires operations to be instrumented. See [Track Critical Operations][7]. | Operations, Percentiles breakdown | Mobile & Browser |
| `rum.measure.session` | Count of sessions | Default | Mobile & Browser |
| `rum.measure.session.action` | Count of actions | Default, Percentiles breakdown | Mobile & Browser |
| `rum.measure.session.crash_free` | Count of crash-free sessions | Default | Mobile only |
| `rum.measure.session.error` | Count of errors per session (@session.error.count) | Default, Percentiles breakdown | Mobile & Browser |
| `rum.measure.session.frustration` | Count of frustration signals | Default, Percentiles breakdown | Mobile & Browser |
| `rum.measure.session.has_replay` | Count of sessions where Session Replay recorded data. To count sessions whose replay can be watched, use `rum.measure.session.is_replay_available`. | Default | Mobile & Browser |
| `rum.measure.session.inactive` | Count of inactive sessions | Default | Mobile & Browser |
| `rum.measure.session.is_replay_available` | Count of sessions where a replay is available to watch | Default | Mobile & Browser |
| `rum.measure.session.time_spent` | Session duration | Default, Percentiles breakdown | Mobile & Browser |
| `rum.measure.usage.quota_blocked_sessions` | Count of sessions blocked after a [retention quota][3] is reached | Default | Mobile & Browser |
| `rum.measure.view` | Count of views | Default, View Name | Mobile & Browser |
| `rum.measure.view.cpu_ticks_per_second` | CPU ticks per second | Default, View Name | Mobile only |
| `rum.measure.view.crash_free` | Count of crash-free views | Default, View Name | Mobile only |
| `rum.measure.view.cumulative_layout_shift` | Cumulative Layout Shift | Default, Percentiles breakdown, View Name | Browser only |
| `rum.measure.view.error_free` | Count of error-free views | Default, View Name | Mobile & Browser |
| `rum.measure.view.first_contentful_paint` | Time when the browser first renders any text, image (including background images), non-white canvas, or SVG | Default, Percentiles breakdown, View Name | Browser only |
| `rum.measure.view.frozen_frame` | Count of frozen frames | Default, View Name | Mobile only |
| `rum.measure.view.frozen_frames_free` | Count of views without frozen frames | Default, View Name | Mobile only |
| `rum.measure.view.inactive` | Count of inactive views | Default, View Name | Mobile & Browser |
| `rum.measure.view.interaction_to_next_paint` | Longest duration between a user's interaction with the page and the next paint | Default, Percentiles breakdown, View Name | Browser only |
| `rum.measure.view.interaction_to_next_view` | Time between the last user interaction in the previous view and the start of the current view | Default, Percentiles breakdown, View Name | Mobile only |
| `rum.measure.view.largest_contentful_paint` | Time in the page load where the largest DOM object in the viewport (visible on screen) is rendered | Default, Percentiles breakdown, View Name | Browser only |
| `rum.measure.view.loading_time` | Time until the page is ready and no network request or DOM mutation is occurring | Default, Percentiles breakdown, View Name | Mobile & Browser |
| `rum.measure.view.memory` | Amount of system memory used | Default, Percentiles breakdown, View Name | Mobile only |
| `rum.measure.view.network_settled` | Time until all critical network activity for the view has completed (Time to Network Settled) | Default, Percentiles breakdown, View Name | Mobile only |
| `rum.measure.view.refresh_rate` | Average of user's refresh rate (FPS) | Default, Percentiles breakdown, View Name | Mobile only |
| `rum.measure.view.slow_frames_rate` | Rate of slow frames | Default, Percentiles breakdown, View Name | Mobile only |
| `rum.measure.view.slow_rendered` | Count of slow rendered views | Default, View Name | Mobile only |
| `rum.measure.view.time_spent` | Time spent on the current view | Default, Percentiles breakdown, View Name | Mobile & Browser |

## When metrics are computed

Metrics are captured at different points in a session or view life cycle:

- {{< ui >}}On detection{{< /ui >}}: `rum.measure.session` and `rum.measure.view` are captured when a session or view is first detected.
- {{< ui >}}On inactivity{{< /ui >}}: Metrics such as `rum.measure.session.inactive`, `rum.measure.session.crash_free`, `rum.measure.view.inactive`, and `rum.measure.view.crash_free` are captured when a session or view becomes inactive (that is, when the session or view ends).

Because a session or view that starts in one time window can end in a different time window, comparing on-detection metrics with on-inactivity metrics over short time windows can produce unexpected results, including ratio values above 100%.

For example, if many sessions from the previous day are still active and end during the current day, the number of inactive sessions counted today can exceed the number of sessions that started today. This means a ratio like crash-free session rate (`rum.measure.session.crash_free` / `rum.measure.session`) can legitimately return a value above 100%—this is expected behavior.

**Recommendation**: When computing ratios that combine on-detection and on-inactivity metrics, use a time window large enough to capture both the start and end of most sessions (for example, one week or more).

## Next step

If you need performance metrics beyond the ones listed above, [create custom metrics][2] from your RUM events. Both out-of-the-box and custom metrics are computed based on 100% of the ingested traffic.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /real_user_monitoring/measure_health_with_metrics/create_custom_metrics/
[3]: /real_user_monitoring/retain_and_recover_valuable_sessions/control_volumes_with_quotas/
[5]: /real_user_monitoring/application_monitoring/browser/optimizing_performance/#lighthouse-audits
[6]: /journey_monitoring/
[7]: /real_user_monitoring/track_critical_operations/
[8]: /real_user_monitoring/setup/enable_rum/track_application_startups/
