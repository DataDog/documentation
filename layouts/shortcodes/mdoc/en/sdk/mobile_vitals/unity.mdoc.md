<!--
This partial contains mobile vitals information for the Unity SDK.
It can be included directly in platform-specific pages or wrapped in conditionals.
-->

| Measurement | Description |
| --- | --- |
| Refresh rate | To ensure a smooth, jank-free user experience, your application should render frames in under 60Hz. {% br /%}{% br /%} RUM tracks the application's main thread display refresh rate using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. {% br /%}{% br /%} **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**. |
| Slow renders | To ensure a smooth, jank-free user experience, your application should render frames in under 60Hz. {% br /%}{% br /%} RUM tracks the application's display refresh rate using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. {% br /%}{% br /%} With slow rendering, you can monitor which views are taking longer than 16ms or 60Hz to render. {% br /%} **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in **Mobile Vitals**. |
| Crash-free sessions by version | An [application crash][1] is reported due to an unexpected exit in the application typically caused by an unhandled exception or signal. Crash-free user sessions in your application directly correspond to your end user's experience and overall satisfaction. {% br /%}{% br /%} RUM tracks complete crash reports and presents trends over time with [Error Tracking][2]. {% br /%}{% br /%} With crash-free sessions, you can stay up to speed on industry benchmarks and ensure that your application is ranked highly on the Google Play Store. |
| Hang rate | As defined by Apple, the hang rate of an application corresponds to "the number of seconds per hour that the app is unresponsive, while only counting periods of unresponsiveness of more than 250 ms." To compute the hang rate of your application on Datadog, enable "Track Non-Fatal App Hangs" in [Datadog's Settings][4]. |
| CPU ticks per second | High CPU usage impacts the [battery life][3] on your users' devices. {% br /%}{% br /%} RUM tracks CPU ticks per second for each view and the CPU utilization over the course of a session. The recommended range is <40 for good and <60 for moderate. {% br /%}{% br /%} You can see the top views with the most number of CPU ticks on average over a selected time period under **Mobile Vitals** in your application's Overview page. |
| Memory utilization | High memory usage can lead to [watchdog terminations][6], which causes a poor user experience. {% br /%}{% br /%} RUM tracks the amount of physical memory used by your application in bytes for each view, over the course of a session. The recommended range is <200MB for good and <400MB for moderate. {% br /%}{% br /%} You can see the top views with the most memory consumption on average over a selected time period under **Mobile Vitals** in your application's Overview page. |

[1]: https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs
[2]: /real_user_monitoring/error_tracking/mobile/unity/
[3]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[4]: /real_user_monitoring/application_monitoring/unity/setup
[6]: /real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-watchdog-terminations-reporting
