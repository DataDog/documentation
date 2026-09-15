{% callout url="https://www.datadoghq.com/product-preview/android-profiler/" header="Join the Preview!" btn_hidden=false %}
Android Profiling is in Preview.
{% /callout %}

{% img src="real_user_monitoring/android/android-profiling-ttid.png" alt="Android profiling data in a time to initial display vital event." style="width:90%;" /%}

Android profiling helps you identify and optimize slow methods during important moments in user sessions. Android profiling is built on top of the [ProfilingManager Android API][1] and samples the device's CPU to collect method call stacks from the application's process.

{% alert level="warning" %}
Only devices running Android 15 (API level 35) or higher generate profiling data.
{% /alert %}

### Prerequisites

- Application launch profiling requires Android SDK version 3.6.0+.
- Continuous profiling requires Android SDK version 3.12.0+.
- [RUM without Limits][2] must be enabled in your organization.

### Setup

#### Step 1 - Set up RUM

To start collecting data, set up [Mobile RUM for Android][3].

#### Step 2 - Configure the profiling sampling rate

Initialize the RUM SDK and configure the `setApplicationLaunchSampleRate` and `setContinuousSampleRate` parameters, which are independent of each other:

- `setApplicationLaunchSampleRate` determines how often the time to initial display is profiled (for example, 15 means profiling runs on 15 out of 100 launches).
- `setContinuousSampleRate` determines whether the time to full display, application not responding (ANR) errors, long tasks, or [RUM Operations][4] are profiled (for example, 15 means that 15 out of 100 sessions will have their time to full display, ANRs, and long tasks profiled).

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
The total volume of profiles may not match the percentage configured in `applicationLaunchSampleRate` or `continuousSampleRate`. This variation results from [rate limitations][6] within the data collector, including profiling support on older devices and the maximum profiling frequency per device.
{% /alert %}

The [ProfilingManager API][7] also supports disabling rate limiting during debug builds. 

### Explore profiling data

You can use the `@profiling.has_profile` attribute in the Sessions Explorer to filter to profiled events and investigate which code ran and how it affected the user's experience. This is available for sessions, views, errors, long tasks, vitals, and operations.

#### During the time to initial display and time to full display

Android application launch profiling data is attached to the [time to initial display][8] and [time to full display][8] vital events in a RUM session. You can access profiles for the time to initial display and time to full display from the session side panel, view side panel, or directly from the vital side panels.

{% img src="real_user_monitoring/android/android-profiling-ttfd.png" alt="Android profiling data for a time to full display event." style="width:90%;" /%}

Use the **flame graph** to identify which methods consume the most CPU time during launch, the **thread timeline** to see parallel execution patterns, and the **call graph** to trace method dependencies. You can also download the profiling data for external analysis or deeper investigation.

{% img src="real_user_monitoring/android/android-profiling-thread-timeline.png" alt="Android profiling data for the time to initial display in a thread timeline." style="width:90%;" /%}

#### During application not responding errors

Android profiling data is attached to [application not responding (ANR)][9] errors in a RUM session. You can access profiles for ANR errors from the view side panel or from the error event side panel.

{% img src="real_user_monitoring/android/android-profiling-anr.png" alt="Android profiling data for an application not responding error event." style="width:90%;" /%}

#### During long tasks

Android profiling data is attached to long task events in a RUM session. You can access profiles for long tasks from the view side panel or from the long task event side panel.

{% img src="real_user_monitoring/android/android-profiling-long-task.png" alt="Android profiling data for a long task event." style="width:90%;" /%}

#### During operations

Android profiling data is attached to operations events in a RUM session. You can access profiles for operations from the view side panel or from the operations event side panel.

{% img src="real_user_monitoring/android/android-profiling-operation.png" alt="Android profiling data for an operation." style="width:90%;" /%}

[1]: https://developer.android.com/topic/performance/tracing/profiling-manager/overview
[2]: /real_user_monitoring/rum_without_limits/
[3]: /real_user_monitoring/application_monitoring/android
[4]: /real_user_monitoring/operations_monitoring/?tab=browser
[5]: /real_user_monitoring/application_monitoring/android/setup?tab=kotlin#sample-session-rates-2
[6]: https://developer.android.com/topic/performance/tracing/profiling-manager/will-my-profile-always-be-collected#how-rate-limiting-works
[7]: https://developer.android.com/topic/performance/tracing/profiling-manager/debug-mode
[8]: /real_user_monitoring/application_monitoring/android/application_launch_monitoring?tab=kotlin
[9]: /real_user_monitoring/setup/data_collected/?platform=android#error-attributes
