---
title: Mobile Vitals
kind: documentation
description: Learn about mobile vitals collected by Flutter Monitoring.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: Blog
  text: Monitor Flutter application performance with Datadog Mobile RUM
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: Source code for dd-sdk-flutter
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data

---
## Overview

Real User Monitoring offers Mobile Vitals, a set of metrics that can help compute insights about your mobile application's responsiveness, stability, and resource consumption. Mobile Vitals range from poor, moderate, to good.

You can view Mobile Vitals for your application by navigating to **UX Monitoring > Performance Monitoring** and selecting your application.

{{< img src="real_user_monitoring/flutter/flutter-mobile-vitals.png" alt="Mobile Vitals in the Performance Summary tab" style="width:90%;">}}

To access the RUM mobile app performance dashboard, switch to the **Performance** tab, then click the **View Dashboard** link.

{{< img src="real_user_monitoring/flutter/flutter-perf-dash-link.png" alt="Access the mobile performance dashboard for Flutter from the Performance tab" style="width:90%;">}}

Understand your application's overall health and performance with the line graphs displaying metrics across various application versions. To filter on application version or see specific sessions and views, click on a graph.

{{< img src="real_user_monitoring/flutter/rum_explorer_mobile_vitals-3.png" alt="Event Timings and Mobile Vitals in the RUM Explorer" style="width:90%;">}}

You can also select a view in the RUM Explorer and observe recommended benchmark ranges that directly correlate to your application's user experience in the session. Click on a metric such as **Refresh Rate Average** and click **Search Views With Poor Performance** to apply a filter in your search query and examine additional views.

## Metrics

The following metrics provide insight into your mobile application's performance.
| Measurement                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Refresh rate                  | To ensure a smooth, [jank-free][3] user experience, your application should render frames in under 60Hz. <br /><br /> RUM tracks the application's [main thread display refresh rate][9] using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes.  <br /><br />  **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**.                                                                                                                                                                                          |
| Slow renders                   | To ensure a smooth, [jank-free][3] user experience, your application should render frames in under 60Hz. <br /><br />  RUM tracks the application's [display refresh rate][4] using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. <br /><br />  With slow rendering, you can monitor which views are taking longer than 16ms or 60Hz to render. <br /> **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**. |
| Frozen frames                  | Frames that take longer than 700ms to render appear as stuck and unresponsive in your application. These are classified as [frozen frames][5]. <br /><br />  RUM tracks `long task` events with the duration for any task taking longer then 100ms to complete. <br /><br />  With frozen frames, you can monitor which views appear frozen (taking longer than 700ms to render) to your end users and eliminate jank in your application.                                                                                                                                                                                                 |
| Application not responding     | On Android, when the UI thread of an application is blocked for more than 5 seconds, an `Application Not Responding` ([ANR][6]) error triggers. If the application is in the foreground, the system displays a dialog modal to the user, allowing them to force quit the application. <br /><br />   RUM tracks ANR occurrences and captures the entire stack trace that blocks the main thread when it encounters an ANR.                                                                                                                                                                                                                              |
| Crash-free sessions by version | An [application crash][7] is reported due to an unexpected exit in the application typically caused by an unhandled exception or signal. Crash-free user sessions in your application directly correspond to your end user's experience and overall satisfaction. <br /><br />   RUM tracks complete crash reports and presents trends over time with [Error Tracking][8]. <br /><br />  With crash-free sessions, you can stay up to speed on industry benchmarks and ensure that your application is ranked highly on the Google Play Store.                                                                                                 |
| CPU ticks per second           | High CPU usage impacts the [battery life][9] on your users' devices.  <br /><br />  RUM tracks CPU ticks per second for each view and the CPU utilization over the course of a session. The recommended range is <40 for good and <60 for moderate. <br /><br />  You can see the top views with the most number of CPU ticks on average over a selected time period under **Mobile Vitals** in your application's Overview page.                                                                                                                                                                                                                                                                                                                                                        |
| Memory utilization             | High memory usage can lead to [out-of-memory crashes][10], which causes a poor user experience. <br /><br />  RUM tracks the amount of physical memory used by your application in bytes for each view, over the course of a session. The recommended range is <200MB for good and <400MB for moderate. <br /><br />  You can see the top views with the most memory consumption on average over a selected time period under **Mobile Vitals** in your application's Overview page.                                                                                                                                                                                                                                                                                            |
| Widget build time             | This is the duration of time taken build the frame on the UI thread. To ensure a smooth animations, this should not exceed 16ms for 60 FPS, and 8ms for 120 FPS. <br /><br />  High values here mean you need to look into optimizing your build methods for this view. See [Control Build Cost][11] in the Flutter documentation.                                                                                                                                                                                                                                                                                            |
| Raster time             | This is the duration of time taken to rasterize the frame on the raster thread. To ensure a smooth animations, this should not exceed 16ms for 60 FPS, and 8ms for 120 FPS. <br /><br />  High values here may mean your view is complex to render. See [Identifying Problems in the GPU Graph][12] in the Flutter documentation.                                                                                                                                                                                                                                                                                            |
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/ios/mobile_vitals/
[2]: /real_user_monitoring/android/mobile_vitals/
[3]: https://docs.flutter.dev/perf/ui-performance
[4]: https://docs.flutter.dev/tools/devtools/performance
[5]: https://developer.android.com/topic/performance/vitals/frozen
[6]: https://developer.android.com/topic/performance/vitals/anr
[7]: https://docs.flutter.dev/reference/crash-reporting
[8]: /real_user_monitoring/error_tracking/flutter
[9]: https://docs.flutter.dev/perf/best-practices#build-and-display-frames-in-16ms
[10]: https://docs.flutter.dev/tools/devtools/memory
[11]: https://docs.flutter.dev/perf/best-practices#control-build-cost 
[12]: https://docs.flutter.dev/perf/ui-performance#identifying-problems-in-the-gpu-graph
