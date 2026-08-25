{% callout url="https://www.datadoghq.com/product-preview/ios-profiler/" header="Join the Preview!" btn_hidden=false %}
iOS Profiling is in Preview.
{% /callout %}

{% img src="real_user_monitoring/ios/ios-profiling-ttid.png" alt="iOS profiling data in a time to initial display vital event." style="width:90%;" /%}

iOS profiling helps you identify and optimize slow methods during important moments in user sessions. iOS profiling is built on top of the [mach Kernel API][1] and periodically samples all application threads to collect call stacks. 

### Prerequisites

- Application launch profiling requires iOS SDK version 3.6.0+.
- Continuous profiling requires iOS SDK version 3.14.0+.
- [RUM without Limits][2] must be enabled in your organization.

### Setup

#### Step 1 - Set up RUM
To start collecting data, set up [Mobile RUM for iOS][3].

#### Step 2 - Configure the profiling sampling rate

Initialize the RUM SDK and configure the `applicationLaunchSampleRate` and `continuousSampleRate` parameters, which are independent of each other:

- `applicationLaunchSampleRate` determines how often the time to initial display is profiled (for example, 5 means profiling runs on 5 out of 100 launches).
- `continuousSampleRate` determines whether the time to full display, application hangs, long tasks, or [RUM Operations][4] are profiled (for example, 5 means that 5 out of 100 sessions will have their time to full display, application hangs, and long tasks profiled).

Both sample rates are applied on top of the [RUM session sampling rate][4].

{% alert level="danger" %}
If no value is specified, the default for both `applicationLaunchSampleRate` and `continuousSampleRate` is 5%.
{% /alert %}

```swift
    import DatadogCore
    import DatadogRUM
    import DatadogProfiling

    // Initialize Datadog SDK with your configuration
    Datadog.initialize(
      with: Datadog.Configuration(
        clientToken: "<client token>",  // From Datadog UI
        env: "<environment>",           // for example, "production", "staging"
        service: "<service name>"       // Your app's service name
      ),
      trackingConsent: trackingConsent  // GDPR compliance setting
    )

    // Enable RUM feature
    RUM.enable(
      with: RUM.Configuration(
        applicationID: "<rum application id>"
      )
    )

    // Enable Profiling feature
    Profiling.enable(with:
        Profiling.Configuration(
            applicationLaunchSampleRate: 5.0,
            continuousSampleRate: 5.0
        )
    )
```

### Explore profiling data

You can use the `@profiling.has_profile`attribute in the Sessions Explorer to filter to profiled events and investigate which code ran and how it affected the user's experience. This is available for sessions, views, errors, long tasks, vitals, and operations.

#### During the time to initial display and time to full display

iOS application launch profiling data is attached to the [time to initial display][5] and [time to full display][5] vital events in a RUM session. You can access profiles for the time to initial display and time to full display from the session side panel, view side panel, or directly from the vital side panels.

{% img src="real_user_monitoring/ios/ios-profiling-ttfd.png" alt="iOS profiling data in a time to full display vital event." style="width:90%;" /%}

Use the **flame graph** to identify which functions consume the most Wall time during launch, the **thread timeline** to see parallel execution patterns, and the **call graph** to trace function dependencies. You can also download the profiling data for external analysis or deeper investigation.

{% img src="real_user_monitoring/ios/ios-profiling-thread-timeline.png" alt="iOS profiling data for the time to initial display in a thread timeline." style="width:90%;" /%}

#### During application hangs

iOS profiling data is attached to [application hangs][6] in a RUM session. You can access profiles for application hangs from the view side panel or from the error event side panel.

{% img src="real_user_monitoring/ios/ios-profiling-app-hang.png" alt="iOS profiling data in an application hang event." style="width:90%;" /%}

#### During long tasks

iOS profiling data is attached to long task events in a RUM session. You can access profiles for long tasks from the view side panel or from the long task event side panel.

{% img src="real_user_monitoring/ios/ios-profiling-long-task.png" alt="iOS profiling data in a long task event." style="width:90%;" /%}

#### During operations

iOS profiling data is attached to operations events in a RUM session. You can access profiles for operations from the view side panel or from the operations event side panel.

{% img src="real_user_monitoring/ios/ios-profiling-operation.png" alt="iOS profiling data in an operation event." style="width:90%;" /%}

[1]: https://developer.apple.com/documentation/kernel/mach
[2]: /real_user_monitoring/rum_without_limits/
[3]: /real_user_monitoring/application_monitoring/ios
[4]: /real_user_monitoring/application_monitoring/ios/setup?tab=swift-package-manager--spm
[5]: /real_user_monitoring/application_monitoring/ios/application_launch_monitoring?tab=swift
[6]: /real_user_monitoring/setup/data_collected/?platform=ios#error-attributes
