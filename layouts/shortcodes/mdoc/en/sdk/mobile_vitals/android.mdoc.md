<!--
This partial contains mobile vitals information for the Android SDK.
It can be included directly in platform-specific pages or wrapped in conditionals.
-->

| Measurement | Description |
| --- | --- |
| Refresh rate | To ensure a smooth, [jank-free][1] user experience, your application should render frames in under 60Hz. {% br /%}{% br /%} RUM tracks the application's [main thread display refresh rate][2] using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. {% br /%}{% br /%} **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**. |
| Slow renders | To ensure a smooth, [jank-free][1] user experience, your application should render frames in under 60Hz. {% br /%}{% br /%} RUM tracks the application's [display refresh rate][2] using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. {% br /%}{% br /%} With slow rendering, you can monitor which views are taking longer than 16ms or 60Hz to render. {% br /%} **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**. |
| Frozen frames | Frames that take longer than 700ms to render appear as stuck and unresponsive in your application. These are classified as [frozen frames][3]. {% br /%}{% br /%} RUM tracks `long task` events with the duration for any task taking longer then 100ms to complete. {% br /%}{% br /%} With frozen frames, you can monitor which views appear frozen (taking longer than 700ms to render) to your end users and eliminate jank in your application. |
| Application not responding | When the UI thread of an application is blocked for more than 5 seconds, an `Application Not Responding` ([ANR][4]) error triggers. If the application is in the foreground, the system displays a dialog modal to the user, allowing them to force quit the application. {% br /%}{% br /%} RUM tracks ANR occurrences and captures the entire stack trace that blocks the main thread when it encounters an ANR. |
| Crash-free sessions by version | An [application crash][5] is reported due to an unexpected exit in the application typically caused by an unhandled exception or signal. Crash-free user sessions in your application directly correspond to your end user's experience and overall satisfaction. {% br /%}{% br /%} RUM tracks complete crash reports and presents trends over time with [Error Tracking][6]. {% br /%}{% br /%} With crash-free sessions, you can stay up to speed on industry benchmarks and ensure that your application is ranked highly on the Google Play Store. |
| CPU ticks per second | High CPU usage impacts the [battery life][7] on your users' devices. {% br /%}{% br /%} RUM tracks CPU ticks per second for each view and the CPU utilization over the course of a session. The recommended range is <40 for good and <60 for moderate. {% br /%}{% br /%} You can see the top views with the most number of CPU ticks on average over a selected time period under **Mobile Vitals** in your application's Overview page. |
| Memory utilization | High memory usage can lead to [OutOfMemoryError][8], which causes the application to crash and creates a poor user experience. {% br /%}{% br /%} RUM tracks the amount of physical memory used by your application in bytes for each view, over the course of a session. The recommended range is <200MB for good and <400MB for moderate. {% br /%}{% br /%} You can see the top views with the most memory consumption on average over a selected time period under **Mobile Vitals** in your application's Overview page. |

[1]: https://developer.android.com/topic/performance/vitals/render#common-jank
[2]: https://developer.android.com/guide/topics/media/frame-rate
[3]: https://developer.android.com/topic/performance/vitals/frozen
[4]: https://developer.android.com/topic/performance/vitals/anr
[5]: https://developer.android.com/topic/performance/vitals/crash
[6]: /real_user_monitoring/error_tracking/android
[7]: https://developer.android.com/topic/performance/power
[8]: https://developer.android.com/reference/java/lang/OutOfMemoryError
