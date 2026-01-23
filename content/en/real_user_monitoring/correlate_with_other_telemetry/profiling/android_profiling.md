---
title: Android Profiling
description: "Use Android profiling with RUM to understand Android mobile application performance and rendering performance issues affecting user experience."
further_reading:
  - link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
    tag: "Blog"
    text: "Real User Monitoring"
  - link: "https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android"
    tag: "Documentation"
    text: "Start monitoring Android applications"
  - link: "/tracing/"
    tag: "Documentation"
    text: "APM and Distributed Tracing"
---
{{< callout url="https://www.datadoghq.com/product-preview/android-profiler/" btn_hidden="false" header="Join the Preview!" >}}
Android Profiling is in Preview.
{{< /callout >}}

{{< img src="real_user_monitoring/android/android-profiling-ttid.png" alt="Android profiling data in a time to initial display vital event." style="width:90%;" >}}

## Overview

Android mobile application profiling captures detailed data about your application’s performance during launch. Android profiling is built on top of the [ProfilingManager Android API][1] and samples the device's CPU to collect method call stacks from the application’s process.

<div class="alert alert-warning">Only devices running Android 15 (API level 35) will generate profiling data.</div>


## Prerequisites

- Your Android application must use the Datadog Android SDK version 3.6.0+.
- [RUM without Limits][2] must be enabled in your organization.

## Setup

1. Set up [Mobile RUM for Android][3].
2. Initialize the RUM SDK and configure the `applicationLaunchSampleRate`, which sets the percentage of profiler runs on application launches.

<div class="alert alert-danger">
  If no value is specified, the default <code>applicationLaunchSampleRate</code> is 15 percent.
</div>

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

            // RUM needs to be enabled for Profiling application launch
            val rumConfig = RumConfiguration.Builder(applicationId)
                .build()
            Rum.enable(rumConfig)

            // Enable Profiling
            val profilingConfig = ProfilingConfiguration.Builder()
              .setApplicationLaunchSampleRate(15) // default is 15%
              .build.()

            Profiling.enable(profilingConfig)
        }
    }
  ```
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning">The total volume of profiles may not match the percentage configured in <code>applicationLaunchSampleRate</code>. This variation results from <a href="https://developer.android.com/topic/performance/tracing/profiling-manager/will-my-profile-always-be-collected#how-rate-limiting-works">rate limitations</a> within the data collector, including profiling support on older devices and the maximum profiling frequency per device.</div>

The [ProfilingManager API][4] also supports disablng rate limiting during debug builds. 

## Explore Profiling

### During the time to initial display

Android application launch profiling data is attached to the [time to initial display][5] vital event in a RUM session. You can access the time to initial display from the session side panel, view side panel, or directly from the time to initial display vital side panel.

{{< img src="real_user_monitoring/android/android-profiling-session.png" alt="Android profiling data in RUM session." style="width:90%;" >}}

Use the flame graph, thread timeline, and call graph visualizations to analyze the profiling data for the time to initial display. You can also download the profiling data for external analysis.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.android.com/topic/performance/tracing/profiling-manager/overview
[2]: https://docs.datadoghq.com/real_user_monitoring/rum_without_limits/ 
[3]: http://localhost:1313/real_user_monitoring/application_monitoring/android
[4]: https://developer.android.com/topic/performance/tracing/profiling-manager/debug-mode
[5]: https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android/application_launch_monitoring?tab=kotlin 

