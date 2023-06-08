---
title: Mobile Vitals
kind: documentation
description: Discover insights about your iOS application's health and performance.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: GitHub
  text:  Source code for dd-sdk-android
- link: https://www.datadoghq.com/blog/monitor-mobile-vitals-datadog/
  tag: Blog
  text: Monitor mobile vitals in Datadog
---

## Overview

Real User Monitoring offers Mobile Vitals, a set of metrics inspired by [Android Vitals][1], that can help compute insights about your mobile application's responsiveness, stability, and resource consumption. Mobile Vitals range from poor, moderate, to good.

Mobile Vitals appear on your your application's **Performance Overview** page when you navigate to **UX Monitoring > Performance Monitoring** and click your application. From the mobile performance dashboard for your application, click on a graph in **Mobile Vitals** to apply a filter by version or examine filtered sessions.

{{< img src="real_user_monitoring/android/android-mobile-vitals-new.png" alt="Mobile Vitals in the RUM Explorer" style="width:100%;">}}

Understand your application's overall health and performance with the line graphs displaying metrics across various application versions. To filter on application version or see specific sessions and views, click on a graph. 

{{< img src="real_user_monitoring/android/refresh_rate_and_mobile_vitals.png" alt="Event Timings and Mobile Vitals" style="width:70%;">}}

You can also select a view in the RUM Explorer and observe recommended benchmark ranges that directly correlate to your application's user experience in the session. Click on a metric such as **Refresh Rate Average** and click **Search Views With Poor Performance** to apply a filter in your search query and examine additional views.

## Metrics

The following metrics provide insight into your mobile application's performance.

| Measurement                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Slow renders                   | To ensure a smooth, [jank-free][2] user experience, your application should render frames in under 60Hz. <br /><br />  RUM tracks the application's [display refresh rate][3] using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. <br /><br />  With slow rendering, you can monitor which views are taking longer than 16ms or 60Hz to render. <br /> **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**. |
| Frozen frames                  | Frames that take longer than 700ms to render appear as stuck and unresponsive in your application. These are classified as [frozen frames][4]. <br /><br />  RUM tracks `long task` events with the duration for any task taking longer then 100ms to complete. <br /><br />  With frozen frames, you can monitor which views appear frozen (taking longer than 700ms to render) to your end users and eliminate jank in your application.                                                                                                                                                                                                 |
| Application not responding     | When the UI thread of an application is blocked for more than 5 seconds, an `Application Not Responding` ([ANR][5]) error triggers. If the application is in the foreground, the system displays a dialog modal to the user, allowing them to force quit the application. <br /><br />   RUM tracks ANR occurrences and captures the entire stack trace that blocks the main thread when it encounters an ANR.                                                                                                                                                                                                                              |
| Crash-free sessions by version | An [application crash][6] is reported due to an unexpected exit in the application typically caused by an unhandled exception or signal. Crash-free user sessions in your application directly correspond to your end user's experience and overall satisfaction. <br /><br />   RUM tracks complete crash reports and presents trends over time with [Error Tracking][7]. <br /><br />  With crash-free sessions, you can stay up to speed on industry benchmarks and ensure that your application is ranked highly on the Google Play Store.                                                                                                 |
| CPU ticks per second           | High CPU usage impacts the [battery life][8] on your users' devices.  <br /><br />  RUM tracks CPU ticks per second for each view and the CPU utilization over the course of a session. The recommended range is <40 for good and <60 for moderate. <br /><br />  You can see the top views with the most number of CPU ticks on average over a selected time period under **Mobile Vitals** in your application's Overview page.                                                                                                                                                                                                                                                                                                                                                        |
| Memory utilization             | High memory usage can lead to [OutOfMemoryError][9], which causes the application to crash and creates a poor user experience. <br /><br />  RUM tracks the amount of physical memory used by your application in bytes for each view, over the course of a session. The recommended range is <200MB for good and <400MB for moderate. <br /><br />  You can see the top views with the most memory consumption on average over a selected time period under **Mobile Vitals** in your application's Overview page.                                                                                                                                                                                     

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.android.com/topic/performance/vitals
[2]: https://developer.android.com/topic/performance/vitals/render#common-jank
[3]: https://developer.android.com/guide/topics/media/frame-rate
[4]: https://developer.android.com/topic/performance/vitals/frozen
[5]: https://developer.android.com/topic/performance/vitals/anr
[6]: https://developer.android.com/topic/performance/vitals/crash
[7]: /real_user_monitoring/error_tracking/android
[8]: https://developer.android.com/topic/performance/power
[9]: https://developer.android.com/reference/java/lang/OutOfMemoryError
