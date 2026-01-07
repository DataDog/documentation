---
title: Android Mobile App Launch Monitoring
description: "Measure Android mobile application launch performance, including the time to initial display and time to full display."
aliases:
- /real_user_monitoring/android/application_launch_monitoring/
- /real_user_monitoring/mobile_and_tv_monitoring/application_launch_monitoring/android
- /real_user_monitoring/mobile_and_tv_monitoring/android/application_launch_monitoring
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: Source code for dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---

<div class="alert alert-danger">
  The <code>application_start</code> action is no longer collected starting from Android SDK version 3.5.0. The <code>rum.measure.app.startup_time metric</code> is marked as deprecated but continues to report data from devices running app versions that use older SDK versions.
</div>

## Overview

Application launch monitoring helps you understand how fast your Android app becomes usable after a user taps the app icon. Use it to identify slow startup times, track performance regressions, and optimize the user’s first impression of your app.

With this feature, you can:
- Measure time to initial display (TTID) and time to full display (TTFD) for cold and warm starts
- View launch performance trends in the RUM Summary and Mobile Performance Dashboard
- Drill into individual launch events to diagnose bottlenecks

## How it works

During initialization, the RUM Android SDK creates a view called `ApplicationLaunch`. This view’s start time matches the start of the Android process. The `ApplicationLaunch` view includes any logs, actions, and resources created before your first call to `startView`. 

### Time to initial display and time to full display

Starting from Android SDK version 3.5.0, the time to initial display (TTID) and time to full display (TTFD) will be collected during the application launch period.

| Measurement       | Summary  | Details                                                                                                                |
|----------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| [Time to initial display][1] | The time it takes to display the first frame of the app's UI. | The time taken for an app to produce its first frame, including process initialization during a cold start, activity creation during a cold or warm start, and displaying the first frame. |
| [Time to full display][2] | The time it takes for an app to become interactive for the user. | The time taken to display the first frame of the app's UI, as well as the content that loads asynchronously after the initial frame is displayed. |

Each time to initial display and time to full display is categorized by launch type:
- [Cold start][3]: The application is launched from scratch. Cold starts happen when the application is launched for the first time since device boot or since the system terminated the process of the application.
- [Warm start][4]: The application is launched using a subset of the operations that take place during a cold start. Warm starts result from situations such as a user backing out of the application or re-launching the application. Warm starts can also result from the user launching the `Activity` when the OS-process already exists, such as the arrival of a silent push or `WorkManager` job execution."

### Measuring the time to initial display
The Android SDK automatically measures the TTID. The TTID can be optionally profiled using the Android Mobile Profiler.

### Measuring the time to full display
The time to full display is manually defined using the `GlobalRumMonitor.get().reportAppFullyDisplayed` API in the Android SDK based on the application’s specific definition of “fully drawn.” 

Below is an example where time to full display is determined when home activity is fully loaded.

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
        ).build()

        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```
{{% /tab %}}
{{< /tabs >}}

If you use reportFullyDrawn to identify the moment of full display, you can use getFullyDrawnReporter to subscribe to `reportFullyDrawn` and call `RumMonitor.reportFullyDrawn`. If you do not use reportFullyDrawn, you can still call `RumMonitor.reportFullyDrawn`, but it will make sense only for cold and warm starts, rather than hot starts.

<div class="alert alert-danger">
  If the time to full display is not defined, the Android SDK only collects the TTID.
</div>

### RUM summary

The TTID and TTFD are presented in the RUM Summary under Mobile Performance. The standalone Mobile Performance Dashboard also contains distribution visuals for TTID and TTFD. 

  {{< img src="real_user_monitoring/android/android-rum-summary-app-launch.png" alt="Android RUM Summary" style="width:90%;">}}

### Vital events

The time to initial display and time to full display are presented as vital events in the RUM session. They are also found under the first view after the `ApplicationLaunch` view. TTID and TTFD will be captured if the user launched the application in the session. Neither the TTID nor the TTFD will appear if the user did not launch the application during the session. 

  {{< img src="real_user_monitoring/android/android-app-launch-session.png" alt="Android session side panel" style="width:90%;">}}


The TTID and TTFD can be queried in the RUM Sessions Explorer using the following attributes on the vital event type:
- `@vital.type: app_launch`
- `@vital.name: time_to_initial_display` or `@vital.name: time_to_full_display`

Each TTID and TTFD side panel contains a distribution visualization, an indication of whether the launch was cold or warm, and an event waterfall. 

  {{< img src="real_user_monitoring/android/android-ttid-vital.png" alt="Time to initial display vital event" style="width:90%;">}}

If Android profiling is enabled and the session is sampled, the time to initial display may include profiling data.

### Metrics
The time to initial display and time to full display are calculated as metrics:
- `rum.measure.app.startup_to_initial_display`, which represents the time to initial display 
- `rum.measure.app.startup_to_full_display`, which represents the time to full display

These metrics contain the `@vital.startup_type` attribute to specify the launch type for accurate monitoring.

<div class="alert alert-danger">
  The <code>rum.measure.app.startup_to_full_display</code> metric will not be calculated if the time to full display is not defined. 
</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.android.com/topic/performance/vitals/launch-time#time-initial
[2]: https://developer.android.com/topic/performance/vitals/launch-time#time-full 
[3]: https://developer.android.com/topic/performance/vitals/launch-time#cold 
[4]: https://developer.android.com/topic/performance/vitals/launch-time#warm
[5]: https://developer.android.com/reference/android/app/Activity#reportFullyDrawn()
[6]: https://developer.android.com/reference/androidx/activity/ComponentActivity#getFullyDrawnReporter%28%29