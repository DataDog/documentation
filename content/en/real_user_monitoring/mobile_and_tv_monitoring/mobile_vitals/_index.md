---
title: Mobile Vitals
aliases:
- /real_user_monitoring/android/mobile_vitals
- /real_user_monitoring/ios/mobile_vitals
- /real_user_monitoring/flutter/mobile_vitals
- /real_user_monitoring/reactnative/mobile_vitals
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: Source code for dd-sdk-android
- link: "https://github.com/DataDog/dd-sdk-ios"
  tag: "Source Code"
  text: "Source code for dd-sdk-ios"
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: "Source Code"
  text: Source code for dd-sdk-flutter
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: "Source Code"
  text: Source code for dd-sdk-reactnative
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---

## Overview

Real User Monitoring offers Mobile Vitals, which includes a set of data points inspired by frameworks such as [Android Vitals][1] and [Apple's MetricKit][2], which can help compute insights about your mobile application's responsiveness, stability, and resource consumption. Mobile Vitals range from poor, moderate, to good.

You can view Mobile Vitals for your application by navigating to **Digital Experience > Performance Summary** and selecting your application.

{{< img src="real_user_monitoring/android/android-mobile-vitals.png" alt="Mobile Vitals on the Performance Summary tab" style="width:90%;">}}

To access the RUM mobile app performance dashboard, switch to the **Performance** tab, then click the **View Dashboard** link.

{{< img src="real_user_monitoring/android/android-perf-dash-link.png" alt="Access the mobile performance dashboard from the Performance tab" style="width:90%;">}}

Understand your application's overall health and performance with the line graphs displaying data points across various application versions. To filter on application version or see specific sessions and views, click on a graph.

{{< img src="real_user_monitoring/android/android_mobile_vitals_3.png" alt="Event Timings and Mobile Vitals in the RUM Explorer" style="width:90%;">}}

You can also select a view in the RUM Explorer and observe recommended benchmark ranges that directly correlate to your application's user experience in the session. Click on a metric such as **Refresh Rate Average** and click **Search Views With Poor Performance** to apply a filter in your search query and examine additional views.

## Telemetry

The following telemetry provide insight into your mobile application's performance.

{{< tabs >}}
{{% tab "Android" %}}

| Measurement | Description |
| --- | --- |
| Refresh rate | To ensure a smooth, [jank-free][1] user experience, your application should render frames in under 60Hz. <br /><br /> RUM tracks the application's [main thread display refresh rate][2] using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes.  <br /><br />  **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**.|    
| Slow renders | To ensure a smooth, [jank-free][1] user experience, your application should render frames in under 60Hz. <br /><br />  RUM tracks the application's [display refresh rate][2] using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. <br /><br />  With slow rendering, you can monitor which views are taking longer than 16ms or 60Hz to render. <br /> **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**. |                                                                                                                                   
| Frozen frames | Frames that take longer than 700ms to render appear as stuck and unresponsive in your application. These are classified as [frozen frames][3]. <br /><br />  RUM tracks `long task` events with the duration for any task taking longer then 100ms to complete. <br /><br />  With frozen frames, you can monitor which views appear frozen (taking longer than 700ms to render) to your end users and eliminate jank in your application. |
| Application not responding | When the UI thread of an application is blocked for more than 5 seconds, an `Application Not Responding` ([ANR][4]) error triggers. If the application is in the foreground, the system displays a dialog modal to the user, allowing them to force quit the application. <br /><br />   RUM tracks ANR occurrences and captures the entire stack trace that blocks the main thread when it encounters an ANR. |
| Crash-free sessions by version | An [application crash][5] is reported due to an unexpected exit in the application typically caused by an unhandled exception or signal. Crash-free user sessions in your application directly correspond to your end user's experience and overall satisfaction. <br /><br />   RUM tracks complete crash reports and presents trends over time with [Error Tracking][6]. <br /><br />  With crash-free sessions, you can stay up to speed on industry benchmarks and ensure that your application is ranked highly on the Google Play Store. |
| CPU ticks per second | High CPU usage impacts the [battery life][7] on your users' devices.  <br /><br />  RUM tracks CPU ticks per second for each view and the CPU utilization over the course of a session. The recommended range is <40 for good and <60 for moderate. <br /><br />  You can see the top views with the most number of CPU ticks on average over a selected time period under **Mobile Vitals** in your application's Overview page. |
| Memory utilization | High memory usage can lead to [OutOfMemoryError][8], which causes the application to crash and creates a poor user experience. <br /><br />  RUM tracks the amount of physical memory used by your application in bytes for each view, over the course of a session. The recommended range is <200MB for good and <400MB for moderate. <br /><br />  You can see the top views with the most memory consumption on average over a selected time period under **Mobile Vitals** in your application's Overview page. |     

[1]: https://developer.android.com/topic/performance/vitals/render#common-jank
[2]: https://developer.android.com/guide/topics/media/frame-rate
[3]: https://developer.android.com/topic/performance/vitals/frozen
[4]: https://developer.android.com/topic/performance/vitals/anr
[5]: https://developer.android.com/topic/performance/vitals/crash
[6]: /real_user_monitoring/error_tracking/android
[7]: https://developer.android.com/topic/performance/power
[8]: https://developer.android.com/reference/java/lang/OutOfMemoryError

{{% /tab %}}
{{% tab "iOS" %}}

| Measurement | Description |
| --- | --- |
| Refresh rate | To ensure a smooth, jank-free user experience, your application should render frames in under 60Hz. <br /><br /> RUM tracks the application's main thread display refresh rate using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes.  <br /><br />  **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**. |         
| Slow renders | To ensure a smooth, jank-free user experience, your application should render frames in under 60Hz. <br /><br />  RUM tracks the application's display refresh rate using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. <br /><br />  With slow rendering, you can monitor which views are taking longer than 16ms or 60Hz to render. <br /> **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**. |
| Frozen frames | Frames that take longer than 700ms to render appear as stuck and unresponsive in your application. These are classified as frozen frames. <br /><br />  RUM tracks `long task` events with the duration for any task taking longer then 100ms to complete. <br /><br />  With frozen frames, you can monitor which views appear frozen (taking longer than 700ms to render) to your end users and eliminate jank in your application. |
| Crash-free sessions by version | An [application crash][1] is reported due to an unexpected exit in the application typically caused by an unhandled exception or signal. Crash-free user sessions in your application directly correspond to your end user's experience and overall satisfaction. <br /><br />   RUM tracks complete crash reports and presents trends over time with [Error Tracking][2]. <br /><br />  With crash-free sessions, you can stay up to speed on industry benchmarks and ensure that your application is ranked highly on the Google Play Store. |
| Hang rate | As defined by Apple, the hang rate of an application corresponds to "the number of seconds per hour that the app is unresponsive, while only counting periods of unresponsiveness of more than 250 ms." To compute the hang rate of your application on Datadog, enable [app hang reporting][4] and follow the [dedicated section][5].
| CPU ticks per second | High CPU usage impacts the [battery life][3] on your users' devices.  <br /><br />  RUM tracks CPU ticks per second for each view and the CPU utilization over the course of a session. The recommended range is <40 for good and <60 for moderate. <br /><br />  You can see the top views with the most number of CPU ticks on average over a selected time period under **Mobile Vitals** in your application's Overview page. |
| Memory utilization | High memory usage can lead to [watchdog terminations][6], which causes a poor user experience. <br /><br />  RUM tracks the amount of physical memory used by your application in bytes for each view, over the course of a session. The recommended range is <200MB for good and <400MB for moderate. <br /><br />  You can see the top views with the most memory consumption on average over a selected time period under **Mobile Vitals** in your application's Overview page. |

[1]: https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs
[2]: /real_user_monitoring/ios/crash_reporting/
[3]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[4]: /real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-app-hang-reporting
[5]: /real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#compute-the-hang-rate-of-your-application
[6]: /real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-watchdog-terminations-reporting

{{% /tab %}}
{{% tab "Flutter" %}}

| Measurement | Description |
| --- | --- |
| Refresh rate | To ensure a smooth, [jank-free][1] user experience, your application should render frames in under 60Hz. <br /><br /> RUM tracks the application's [main thread display refresh rate][2] using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes.  <br /><br />  **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**. |
| Slow renders | To ensure a smooth, [jank-free][1] user experience, your application should render frames in under 60Hz. <br /><br />  RUM tracks the application's [display refresh rate][2] using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. <br /><br />  With slow rendering, you can monitor which views are taking longer than 16ms or 60Hz to render. <br /> **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**. |
| Frozen frames | Frames that take longer than 700ms to render appear as stuck and unresponsive in your application. These are classified as [frozen frames][3]. <br /><br />  RUM tracks `long task` events with the duration for any task taking longer then 100ms to complete. <br /><br />  With frozen frames, you can monitor which views appear frozen (taking longer than 700ms to render) to your end users and eliminate jank in your application. |
| Application not responding | On Android, when the UI thread of an application is blocked for more than 5 seconds, an `Application Not Responding` ([ANR][4]) error triggers. If the application is in the foreground, the system displays a dialog modal to the user, allowing them to force quit the application. <br /><br />   RUM tracks ANR occurrences and captures the entire stack trace that blocks the main thread when it encounters an ANR. |
| Crash-free sessions by version | An [application crash][5] is reported due to an unexpected exit in the application typically caused by an unhandled exception or signal. Crash-free user sessions in your application directly correspond to your end user's experience and overall satisfaction. <br /><br />   RUM tracks complete crash reports and presents trends over time with [Error Tracking][8]. <br /><br />  With crash-free sessions, you can stay up to speed on industry benchmarks and ensure that your application is ranked highly on the Google Play Store. |
| CPU ticks per second | High CPU usage impacts the [battery life][6] on your users' devices.  <br /><br />  RUM tracks CPU ticks per second for each view and the CPU utilization over the course of a session. The recommended range is <40 for good and <60 for moderate. <br /><br />  You can see the top views with the most number of CPU ticks on average over a selected time period under **Mobile Vitals** in your application's Overview page. |
| Memory utilization | High memory usage can lead to [out-of-memory crashes][7], which causes a poor user experience. <br /><br />  RUM tracks the amount of physical memory used by your application in bytes for each view, over the course of a session. The recommended range is <200MB for good and <400MB for moderate. <br /><br />  You can see the top views with the most memory consumption on average over a selected time period under **Mobile Vitals** in your application's Overview page. |
| Widget build time | This is the duration of time taken build the frame on the UI thread. To ensure a smooth animations, this should not exceed 16ms for 60 FPS, and 8ms for 120 FPS. <br /><br />  High values here mean you need to look into optimizing your build methods for this view. See [Control Build Cost][8] in the Flutter documentation. |
| Raster time | This is the duration of time taken to rasterize the frame on the raster thread. To ensure a smooth animations, this should not exceed 16ms for 60 FPS, and 8ms for 120 FPS. <br /><br />  High values here may mean your view is complex to render. See [Identifying Problems in the GPU Graph][12] in the Flutter documentation. |

[1]: https://docs.flutter.dev/perf/ui-performance
[2]: https://docs.flutter.dev/tools/devtools/performance
[3]: https://developer.android.com/topic/performance/vitals/frozen
[4]: https://developer.android.com/topic/performance/vitals/anr
[5]: https://docs.flutter.dev/reference/crash-reporting
[6]: /real_user_monitoring/error_tracking/flutter
[7]: https://docs.flutter.dev/perf/best-practices#build-and-display-frames-in-16ms
[8]: https://docs.flutter.dev/tools/devtools/memory
[9]: https://docs.flutter.dev/perf/best-practices#control-build-cost
[10]: https://docs.flutter.dev/perf/ui-performance#identifying-problems-in-the-gpu-graph

{{% /tab %}}
{{% tab "React Native" %}}

| Measurement | Description |
| --- | --- |
| Refresh rate | To ensure a smooth, [jank-free][1] user experience, your application should render frames in under 60Hz. <br /><br /> RUM tracks the application's [main thread display refresh rate][2] using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes.  <br /><br />  **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**. |
| JS Refresh rate | To ensure a smooth, [jank-free][1] user experience, your application should render frames in under 60Hz. <br /><br /> RUM tracks the application's [javascript thread display refresh rate][2] using `@view.js_refresh_rate.average`, `@view.js_refresh_rate.min`, and `@view.js_refresh_rate.max` view attributes.  <br /><br />  **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**. |
| Slow renders | To ensure a smooth, [jank-free][1] user experience, your application should render frames in under 60Hz. <br /><br /> With slow rendering, you can monitor which views have an average frame rate under 55fps.  <br /><br />  **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**. |
| Frozen frames | Frames that take longer than 700ms to render appear as stuck and unresponsive in your application. These are classified as [frozen frames][3]. <br /><br />  RUM tracks `long task` events with the duration for any task taking longer then 100ms to complete. <br /><br />  With frozen frames, you can monitor which views appear frozen (taking longer than 700ms to render) to your end users and eliminate jank in your application. |
| Application not responding | When the UI thread of an application is blocked for more than 5 seconds, an `Application Not Responding` (ANR) error triggers. If the application is in the foreground, the system displays a dialog modal to the user, allowing them to force quit the application. <br /><br />   RUM tracks ANR occurrences and captures the entire stack trace that blocks the main thread when it encounters an ANR. |
| Crash-free sessions by version | An [application crash][4] is reported due to an unexpected exit in the application typically caused by an unhandled exception or signal. Crash-free user sessions in your application directly correspond to your end user's experience and overall satisfaction. <br /><br />   RUM tracks complete crash reports and presents trends over time with [Error Tracking][5]. <br /><br />  With crash-free sessions, you can stay up to speed on industry benchmarks and ensure that your application is ranked highly on the Google Play Store. |
| CPU ticks per second | High CPU usage impacts the [battery life][6] on your users' devices.  <br /><br />  RUM tracks CPU ticks per second for each view and the CPU utilization over the course of a session. The recommended range is <40 for good and <60 for moderate. <br /><br />  You can see the top views with the most number of CPU ticks on average over a selected time period under **Mobile Vitals** in your application's Overview page. |
| Memory utilization | High memory usage can lead to [out-of-memory crashes][7], which causes a poor user experience. <br /><br />  RUM tracks the amount of physical memory used by your application in bytes for each view, over the course of a session. The recommended range is <200MB for good and <400MB for moderate. <br /><br />  You can see the top views with the most memory consumption on average over a selected time period under **Mobile Vitals** in your application's Overview page. |

[1]: http://jankfree.org/
[2]: https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames
[3]: https://firebase.google.com/docs/perf-mon/screen-traces?platform=ios#frozen-frames
[4]: https://docs.microsoft.com/en-us/appcenter/sdk/crashes/react-native
[5]: /real_user_monitoring/ios/crash_reporting/
[6]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[7]: https://docs.sentry.io/platforms/apple/guides/ios/configuration/out-of-memory/

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.android.com/topic/performance/vitals
[2]: https://developer.apple.com/documentation/metrickit

