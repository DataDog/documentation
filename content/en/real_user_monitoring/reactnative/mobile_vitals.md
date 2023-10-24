---
title: Mobile Vitals
kind: documentation
description: Collect RUM data from your React Native projects.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: Source code for dd-sdk-reactnative
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: Blog
  text: Monitor your React Native applications

---
## Overview

Real User Monitoring offers Mobile Vitals, a set of metrics that can help compute insights about your mobile application's responsiveness, stability, and resource consumption. Mobile Vitals range from poor, moderate, to good. 

You can view Mobile Vitals for your application by navigating to  **UX Monitoring > Performance Monitoring** and selecting your application.

{{< img src="real_user_monitoring/react_native/react-native-mobile-vitals.png" alt="Mobile Vitals in the Performance Tab" style="width:90%;">}}

To access the RUM mobile app performance dashboard, switch to the **Performance** tab, then click the **View Dashboard** link.

{{< img src="real_user_monitoring/react_native/react-native-perf-dash-link.png" alt="Access the mobile performance dashboard from the Performance tab" style="width:90%;">}}

Understand your application's overall health and performance with the line graphs displaying metrics across various application versions. To filter on application version or see specific sessions and views, click on a graph.

{{< img src="real_user_monitoring/react_native/rum_explorer_mobile_vitals-3.png" alt="Event Timings and Mobile Vitals in the RUM Explorer" style="width:90%;">}}

You can also select a view in the RUM Explorer and observe recommended benchmark ranges that directly correlate to your application's user experience in the session. Click on a metric such as **Refresh Rate Average** and click **Search Views With Poor Performance** to apply a filter in your search query and examine additional views.

## Metrics

The following metrics provide insight into your mobile application's performance.
| Measurement                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Refresh rate                  | To ensure a smooth, [jank-free][3] user experience, your application should render frames in under 60Hz. <br /><br /> RUM tracks the application’s [main thread display refresh rate][10] using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes.  <br /><br />  **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**.                                                                                                                                                                                                 |
| JS Refresh rate                  | To ensure a smooth, [jank-free][3] user experience, your application should render frames in under 60Hz. <br /><br /> RUM tracks the application’s [javascript thread display refresh rate][10] using `@view.js_refresh_rate.average`, `@view.js_refresh_rate.min`, and `@view.js_refresh_rate.max` view attributes.  <br /><br />  **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**.                                                                                                                                                                                                 |
| Slow renders                  | To ensure a smooth, [jank-free][3] user experience, your application should render frames in under 60Hz. <br /><br /> With slow rendering, you can monitor which views have an average frame rate under 55fps.  <br /><br />  **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**.                                                                                                                                                                                                 |
| Frozen frames                  | Frames that take longer than 700ms to render appear as stuck and unresponsive in your application. These are classified as [frozen frames][5]. <br /><br />  RUM tracks `long task` events with the duration for any task taking longer then 100ms to complete. <br /><br />  With frozen frames, you can monitor which views appear frozen (taking longer than 700ms to render) to your end users and eliminate jank in your application.                                                                                                                                                                                                 |
| Application not responding     | When the UI thread of an application is blocked for more than 5 seconds, an `Application Not Responding` (ANR) error triggers. If the application is in the foreground, the system displays a dialog modal to the user, allowing them to force quit the application. <br /><br />   RUM tracks ANR occurrences and captures the entire stack trace that blocks the main thread when it encounters an ANR.                                                                                                                                                                                                                              |
| Crash-free sessions by version | An [application crash][6] is reported due to an unexpected exit in the application typically caused by an unhandled exception or signal. Crash-free user sessions in your application directly correspond to your end user's experience and overall satisfaction. <br /><br />   RUM tracks complete crash reports and presents trends over time with [Error Tracking][7]. <br /><br />  With crash-free sessions, you can stay up to speed on industry benchmarks and ensure that your application is ranked highly on the Google Play Store.                                                                                                 |
| CPU ticks per second           | High CPU usage impacts the [battery life][8] on your users' devices.  <br /><br />  RUM tracks CPU ticks per second for each view and the CPU utilization over the course of a session. The recommended range is <40 for good and <60 for moderate. <br /><br />  You can see the top views with the most number of CPU ticks on average over a selected time period under **Mobile Vitals** in your application's Overview page.                                                                                                                                                                                                                                                                                                                                                        |
| Memory utilization             | High memory usage can lead to [out-of-memory crashes][9], which causes a poor user experience. <br /><br />  RUM tracks the amount of physical memory used by your application in bytes for each view, over the course of a session. The recommended range is <200MB for good and <400MB for moderate. <br /><br />  You can see the top views with the most memory consumption on average over a selected time period under **Mobile Vitals** in your application's Overview page.                                                                                                                                                                                                                                                                                            |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.apple.com/documentation/metrickit
[2]: https://app.datadoghq.com/rum/explorer
[3]: http://jankfree.org/
[4]: https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames
[5]: https://firebase.google.com/docs/perf-mon/screen-traces?platform=ios#frozen-frames
[6]: https://docs.microsoft.com/en-us/appcenter/sdk/crashes/react-native
[7]: /real_user_monitoring/ios/crash_reporting/
[8]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[9]: https://docs.sentry.io/platforms/apple/guides/ios/configuration/out-of-memory/
[10]: https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames
