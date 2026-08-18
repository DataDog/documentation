View loading time, Time to Network Settled, Interaction to Next View, and custom timings aren't available for the Unity SDK yet.

### Mobile vitals

The following telemetry provides insight into your application's performance. Mobile Vitals range from poor, moderate, to good. View them by navigating to {% ui %}Digital Experience{% /ui %} > {% ui %}Performance Summary{% /ui %} and selecting your application.

| Measurement | Description |
| --- | --- |
| Refresh rate | For a smooth, jank-free user experience, your application should render frames in under 60Hz. RUM tracks the application's main thread display refresh rate using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. **Note:** Refresh rates are normalized on a range of zero to 60fps. |
| Slow renders | With slow rendering, you can monitor which views are taking longer than 16ms or 60Hz to render, using the same refresh rate attributes above. |
| Crash-free sessions by version | An [application crash](https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs) is reported due to an unexpected exit in the application, typically caused by an unhandled exception or signal. RUM tracks complete crash reports and presents trends over time with [Error Tracking](/real_user_monitoring/error_tracking/mobile/unity/). |
| Hang rate | As defined by Apple, the hang rate of an application corresponds to "the number of seconds per hour that the app is unresponsive, while only counting periods of unresponsiveness of more than 250 ms." To compute the hang rate of your application on Datadog, enable {% ui %}Track Non-Fatal App Hangs{% /ui %} in [Datadog's Settings](/real_user_monitoring/application_monitoring/unity/setup). |
| CPU ticks per second | High CPU usage impacts the [battery life](https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/) on your users' devices. RUM tracks CPU ticks per second for each view and the CPU utilization over the course of a session. The recommended range is <40 for good and <60 for moderate. |
| Memory utilization | High memory usage can lead to [watchdog terminations](/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-watchdog-terminations-reporting), which causes a poor user experience. RUM tracks the amount of physical memory used by your application in bytes for each view, over the course of a session. The recommended range is <200MB for good and <400MB for moderate. |
