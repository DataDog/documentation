View loading time, Time to Network Settled, Interaction to Next View, and custom timings aren't available for the .NET MAUI SDK yet.

### Mobile vitals

A .NET MAUI app runs on top of the native Android or iOS runtime, so RUM reports Mobile Vitals for the underlying platform. Mobile Vitals range from poor, moderate, to good. View them by navigating to {% ui %}Digital Experience{% /ui %} > {% ui %}Performance Summary{% /ui %} and selecting your application. Select the tab that matches the platform your app is running on.

{% tabs %}
{% tab label="Android" %}

| Measurement | Description |
| --- | --- |
| Refresh rate | For a smooth, [jank-free](https://developer.android.com/topic/performance/vitals/render#common-jank) user experience, your application should render frames in under 60Hz. RUM tracks the application's [main thread display refresh rate](https://developer.android.com/guide/topics/media/frame-rate) using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. |
| Slow renders | With slow rendering, you can monitor which views are taking longer than 16ms or 60Hz to render, using the same refresh rate attributes above. |
| Frozen frames | Frames that take longer than 700ms to render appear as stuck and unresponsive in your application. These are classified as [frozen frames](https://developer.android.com/topic/performance/vitals/frozen). |
| Application not responding | When the UI thread of an application is blocked for more than 5 seconds, an `Application Not Responding` ([ANR](https://developer.android.com/topic/performance/vitals/anr)) error triggers. |
| Crash-free sessions by version | An [application crash](https://developer.android.com/topic/performance/vitals/crash) is reported due to an unexpected exit in the application, typically caused by an unhandled exception or signal. |
| CPU ticks per second | High CPU usage impacts the [battery life](https://developer.android.com/topic/performance/power) on your users' devices. The recommended range is <40 for good and <60 for moderate. |
| Memory utilization | High memory usage can lead to [OutOfMemoryError](https://developer.android.com/reference/java/lang/OutOfMemoryError), which causes the application to crash. The recommended range is <200MB for good and <400MB for moderate. |

{% /tab %}
{% tab label="iOS" %}

| Measurement | Description |
| --- | --- |
| Refresh rate | For a smooth, jank-free user experience, your application should render frames in under 60Hz. RUM tracks the application's main thread display refresh rate using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. |
| Slow renders | With slow rendering, you can monitor which views are taking longer than 16ms or 60Hz to render, using the same refresh rate attributes above. |
| Frozen frames | Frames that take longer than 700ms to render appear as stuck and unresponsive in your application. |
| Crash-free sessions by version | An [application crash](https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs) is reported due to an unexpected exit in the application, typically caused by an unhandled exception or signal. |
| Hang rate | As defined by Apple, the hang rate of an application corresponds to "the number of seconds per hour that the app is unresponsive, while only counting periods of unresponsiveness of more than 250 ms." |
| CPU ticks per second | High CPU usage impacts the [battery life](https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/) on your users' devices. The recommended range is <40 for good and <60 for moderate. |
| Memory utilization | High memory usage can lead to watchdog terminations, which causes a poor user experience. The recommended range is <200MB for good and <400MB for moderate. |

{% /tab %}
{% /tabs %}
