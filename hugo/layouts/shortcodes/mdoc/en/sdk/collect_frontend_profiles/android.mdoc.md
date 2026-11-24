{% callout url="https://www.datadoghq.com/product-preview/android-profiler/" header="Join the Preview!" btn_hidden=false %}
Android Profiling is in Preview.
{% /callout %}

{% img src="real_user_monitoring/android/android-profiling-ttid.png" alt="Android profiling data in a time to initial display vital event." style="width:90%;" /%}

Android profiling helps you identify and optimize slow methods during important moments in user sessions. Android profiling is built on top of the [ProfilingManager Android API][1] and samples the device's CPU to collect method call stacks from the application's process.

{% alert level="warning" %}
Only devices running Android 15 (API level 35) or higher generate profiling data. Android 16 (API level 36) or higher is required to generate ANR system traces.
{% /alert %}

### Prerequisites

- Android profiling requires Android SDK version 3.16.0+.

### Setup

#### Step 1 - Set up RUM

To start collecting data, set up [Mobile RUM for Android][3].

#### Step 2 - Configure the profiling sampling rate

Initialize the RUM SDK and configure the `setApplicationLaunchSampleRate` and `setContinuousSampleRate` parameters, which are independent of each other:

- `setApplicationLaunchSampleRate` determines how often the time to initial display is profiled (for example, 15 means profiling runs on 15 out of 100 launches).
- `setContinuousSampleRate` determines whether the time to full display, application not responding (ANR) errors, long tasks, or [RUM Operations][4] are profiled (for example, 15 means that 15 out of 100 sessions have their time to full display, ANRs, long tasks, and operations profiled).

Both sample rates are applied on top of the [RUM session sampling rate][5]. 

{% alert level="danger" %}
If no value is specified, the default for both `setApplicationLaunchSampleRate` and `setContinuousSampleRate` is 15%.
{% /alert %}

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

          // Enable RUM (required for Profiling)
          val rumConfig = RumConfiguration.Builder(applicationId)
              .build()
          Rum.enable(rumConfig)

          // Enable Profiling
          Profiling.enable(
              ProfilingConfiguration.Builder()
                  .setApplicationLaunchSampleRate(15f)
                  .setContinuousSampleRate(15f)
                  .build()
          )
      }
  }
```

{% alert level="warning" %}
The total volume of profiles may not match the percentage configured in `setApplicationLaunchSampleRate` or `setContinuousSampleRate`. This variation results from [rate limitations][6] within the data collector, including profiling support on older devices and the maximum profiling frequency per device.
{% /alert %}

The [ProfilingManager API][7] also supports disabling rate limiting during debug builds.

#### Step 3 - (Optional) Disable ANR profiling with system traces

On devices running Android 16 (API level 36) or higher, the SDK registers an ANR trigger with the [ProfilingManager API][2]. When the system detects an ANR in your application, it captures a [system trace][10] of the period leading up to the ANR. The SDK reports the ANR as a RUM error and attaches the system trace to it.

ANR profiling with system traces is enabled by default and works independently of `setContinuousSampleRate`. System traces are collected only for sessions tracked by the [RUM session sampling rate][5].

System traces help diagnose ANRs, which are usually caused by thread contention, blocking I/O, or interprocess communication (IPC) delays rather than CPU-heavy computation. A system trace shows thread states and system-level events over time, which surfaces these causes.

To disable ANR profiling with system traces, add `enableAnrTrigger(false)` to the `ProfilingConfiguration.Builder()` call from Step 2:

```kotlin
  Profiling.enable(
      ProfilingConfiguration.Builder()
          .setApplicationLaunchSampleRate(15f)
          .setContinuousSampleRate(15f)
          .enableAnrTrigger(false)
          .build()
  )
```

{% alert level="info" %}
The system applies its own [rate limits][6] to trigger-based profiling, so not every ANR has a system trace attached.
{% /alert %}

### Explore profiling data

You can use the `@profiling.has_profile` attribute in the Sessions Explorer to filter to profiled events and investigate which code ran and how it affected the user's experience. This is available for sessions, views, errors, long tasks, vitals, and operations.

#### During the time to initial display and time to full display

Android application launch profiling data is attached to the [time to initial display][8] and [time to full display][8] vital events in a RUM session. You can access profiles for the time to initial display and time to full display from the session side panel, view side panel, or directly from the vital side panels.

{% img src="real_user_monitoring/android/android-profiling-ttfd.png" alt="Android profiling data for a time to full display event." style="width:90%;" /%}

Use the **flame graph** to identify which methods consume the most CPU time during launch, the **thread timeline** to see parallel execution patterns, and the **call graph** to trace method dependencies. You can also download the profiling data for external analysis or deeper investigation.

{% img src="real_user_monitoring/android/android-profiling-thread-timeline.png" alt="Android profiling data for the time to initial display in a thread timeline." style="width:90%;" /%}

#### During application not responding errors

Android profiling data is attached to [application not responding (ANR)][9] errors in a RUM session. You can access profiles for ANR errors from the view side panel or from the error event side panel.

{% img src="real_user_monitoring/android/android-profiling-anr-1.png" alt="Android profiling data for an application not responding error, showing the System Trace tab with main-thread lock contention." style="width:90%;" /%}

On devices running Android 16 (API level 36) or higher, ANR errors can also include a system trace captured by the operating system when the ANR occurred. Use the system trace to investigate what blocked the main thread, such as lock contention, I/O, or work on other threads. For more information, see the [Step 3 - (Optional) Disable ANR profiling with system traces](#step-3---optional-disable-anr-profiling-with-system-traces) section.

#### During long tasks

Android profiling data is attached to long task events in a RUM session. You can access profiles for long tasks from the view side panel or from the long task event side panel.

{% img src="real_user_monitoring/android/android-profiling-long-task.png" alt="Android profiling data for a long task event." style="width:90%;" /%}

#### During operations

Android profiling data is attached to operations events in a RUM session. You can access profiles for operations from the view side panel or from the operations event side panel.

{% img src="real_user_monitoring/android/android-profiling-operation.png" alt="Android profiling data for an operation." style="width:90%;" /%}

#### Within the Profiling page
{% img src="real_user_monitoring/android/android_profiler_aggregate_experience.png" alt="Android profiling aggregate experience." style="width:100%;" /%}

The Profiling page, in [**Real User Monitoring > Investigate > Profiles**][13], lets you analyze and compare profiling data across sessions in one place. Use it to spot system-level patterns, compare top-consuming methods, and prioritize optimizations instead of inspecting profiled sessions one by one. The guided experience walks you through:

1. **Select a measurement**: Pick an application launch measurement (either the [time to initial display][11] or [time to full display][12]), a long task, or a critical [RUM Operation][4]. Optionally, filter by RUM attributes such as version or OS, or narrow to a specific distribution such as p95.
{% img src="real_user_monitoring/android/android_profiler_aggregate_experience_step_2.png" alt="Step 2 of the Android profiling aggregate experience showing which measurement to focus on." style="width:100%;" /%}

2. **Compare (Optional)**: Define two groups to compare side by side—for example, different versions, OS types, or percentile ranges—to isolate performance differences between them.
{% img src="real_user_monitoring/android/android_profiler_aggregate_experience_step_3.png" alt="Step 3 of the Android profiling aggregate experience showing how to compare." style="width:100%;" /%}

3. **Investigate slowest methods**: Review which methods consume the most time in the aggregated profile so you can prioritize what to optimize first. Explore the call hierarchy to see how those methods relate and where time is spent across the stack, or, if you chose to compare, see the differences between group A and group B.
{% img src="real_user_monitoring/android/android_profiler_aggregate_experience_step_4a.png" alt="Step 4 of the Android profiling aggregate experience showing results to compare between groups." style="width:100%;" /%}
{% img src="real_user_monitoring/android/android_profiler_aggregate_experience_step_4b.png" alt="Step 4 of the Android profiling aggregate experience showing a flame graph comparison between groups." style="width:100%;" /%}

#### Analyze profiling data with AI

- **[Bits Chat][14]**: Open the side panel of a slow event, such as a time to initial display, time to full display, ANR error, long task, or operation. Then ask Bits Chat what made the event slow. On the Profiling page, ask Bits Chat to identify system-level bottlenecks across sessions.
- **[Datadog MCP Server][15]**: From your AI agents and IDEs, look up RUM events and analyze their profiling data. Requires the [`profiling` toolset][16].

[1]: https://developer.android.com/topic/performance/tracing/profiling-manager/overview
[2]: https://developer.android.com/topic/performance/tracing/profiling-manager/trigger-based-capture
[3]: /real_user_monitoring/application_monitoring/android
[4]: /real_user_monitoring/track_critical_operations/?tab=android
[5]: /real_user_monitoring/setup/enable_rum/manage_sessions/?platform=android
[6]: https://developer.android.com/topic/performance/tracing/profiling-manager/will-my-profile-always-be-collected#how-rate-limiting-works
[7]: https://developer.android.com/topic/performance/tracing/profiling-manager/debug-mode
[8]: /real_user_monitoring/setup/enable_rum/track_application_startups/?platform=android
[9]: /real_user_monitoring/setup/data_collected/?platform=android#error-attributes
[10]: https://developer.android.com/topic/performance/tracing
[11]: https://developer.android.com/topic/performance/issues/launch-time#time-initial
[12]: https://developer.android.com/topic/performance/issues/launch-time#time-full
[13]: https://app.datadoghq.com/rum/profiling
[14]: /real_user_monitoring/investigate_problems/troubleshoot_with_ai/bits_chat/
[15]: /mcp_server/tools/#profiling
[16]: /mcp_server/setup/#toolsets
