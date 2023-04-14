---
dependencies:
- https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_mobile_vitals.md
description: Collect RUM data from your iOS projects.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: GitHub
  text: dd-sdk-ios Source code
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data
kind: documentation
title: Mobile Vitals
---
## Overview

Real User Monitoring offers Mobile Vitals, a set of metrics inspired by [MetricKit][1], that can help compute insights about your mobile application's responsiveness, stability, and resource consumption. Mobile Vitals range from poor, moderate, to good. 

Mobile Vitals appear on your your application's **Performance Overview** page when you navigate to **UX Monitoring > Performance Monitoring** and click your application. From the mobile performance dashboard for your application, click on a graph in **Mobile Vitals** to apply a filter by version or examine filtered sessions. 

{{< img src="real_user_monitoring/ios/ios-mobile-vitals-new.png" alt="Mobile Vitals in the Performance Tab" style="width:100%;">}}

Understand your application's overall health and performance with the line graphs displaying metrics across various application versions. To filter on application version or see specific sessions and views, click on a graph. 

{{< img src="real_user_monitoring/ios/rum_explorer_mobile_vitals.png" alt="Event Timings and Mobile Vitals in the RUM Explorer" style="width:90%;">}}

You can also select a view in the RUM Explorer and observe recommended benchmark ranges that directly correlate to your application's user experience in the session. Click on a metric such as **Refresh Rate Average** and click **Search Views With Poor Performance** to apply a filter in your search query and examine additional views.

## Metrics

The following metrics provide insight into your mobile application's performance.
| Measurement                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Slow renders                   | To ensure a smooth, [jank-free][2] user experience, your application should render frames in under 60Hz. <br /><br />  RUM tracks the application’s [display refresh rate][3] using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. <br /><br />  With slow rendering, you can monitor which views are taking longer than 16ms or 60Hz to render. <br /> **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**. |
| Frozen frames                  | Frames that take longer than 700ms to render appear as stuck and unresponsive in your application. These are classified as [frozen frames][4]. <br /><br />  RUM tracks `long task` events with the duration for any task taking longer then 100ms to complete. <br /><br />  With frozen frames, you can monitor which views appear frozen (taking longer than 700ms to render) to your end users and eliminate jank in your application.                                                                                                                                                                                                 |
| Crash-free sessions by version | An [application crash][5] is reported due to an unexpected exit in the application typically caused by an unhandled exception or signal. Crash-free user sessions in your application directly correspond to  your end user’s experience and overall satisfaction. <br /><br />   RUM tracks complete crash reports and presents trends over time with [Error Tracking][6]. <br /><br />  With crash-free sessions, you can stay up to speed on industry benchmarks and ensure that your application is ranked highly on the Google Play Store.                                                                                                 |
| CPU ticks per second           | High CPU usage impacts the [battery life][7] on your users’ devices.  <br /><br />  RUM tracks CPU ticks per second for each view and the CPU utilization over the course of a session. The recommended range is <40 for good and <60 for moderate. <br /><br />  You can see the top views with the most number of CPU ticks on average over a selected time period under **Mobile Vitals** in your application's Overview page.                                                                                                                                                                                                                                                                                                                                                        |
| Memory utilization             | High memory usage can lead to [out-of-memory crashes][8], which causes a poor user experience. <br /><br />  RUM tracks the amount of physical memory used by your application in bytes for each view, over the course of a session. The recommended range is <200MB for good and <400MB for moderate. <br /><br />  You can see the top views with the most memory consumption on average over a selected time period under **Mobile Vitals** in your application's Overview page.                                                                                                                                                                                                                                                                                            |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.apple.com/documentation/metrickit
[2]: https://developer.android.com/topic/performance/vitals/render#common-jank
[3]: https://developer.android.com/guide/topics/media/frame-rate
[4]: https://developer.android.com/topic/performance/vitals/frozen
[5]: https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs
[6]: https://docs.datadoghq.com/real_user_monitoring/ios/crash_reporting/
[7]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[8]: https://developer.android.com/reference/java/lang/OutOfMemoryError
