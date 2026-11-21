{% callout url="https://www.datadoghq.com/product-preview/ios-profiler/" header="Join the Preview!" btn_hidden=false %}
iOS Profiling is in Preview.
{% /callout %}

{% img src="real_user_monitoring/ios/ios-profiling-ttid.png" alt="iOS profiling data in a time to initial display vital event." style="width:90%;" /%}

iOS profiling helps you identify and optimize slow methods during important moments in user sessions. iOS profiling is built on top of the [mach Kernel API][1] and periodically samples all application threads to collect call stacks. 

### Prerequisites

- Application launch profiling requires iOS SDK version 3.6.0+.
- Continuous profiling requires iOS SDK version 3.14.0+.

### Setup

#### Step 1 - Set up RUM
To start collecting data, set up [Mobile RUM for iOS][3].

#### Step 2 - Configure the profiling sampling rate

Initialize the RUM SDK and configure the `applicationLaunchSampleRate` and `continuousSampleRate` parameters, which are independent of each other:

- `applicationLaunchSampleRate` determines how often the time to initial display is profiled (for example, 5 means profiling runs on 5 out of 100 launches).
- `continuousSampleRate` determines whether the time to full display, application hangs, long tasks, or [RUM Operations][7] are profiled (for example, 5 means that 5 out of 100 sessions have their time to full display, application hangs, long tasks, and operations profiled).

Both sample rates are applied on top of the [RUM session sampling rate][4].

Application launch profiling applies from the next launch after you call `Profiling.enable`. The SDK stores the sample rate and reads it before `main` runs.

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

You can use the `@profiling.has_profile` attribute in the Sessions Explorer to filter to profiled events and investigate which code ran and how it affected the user's experience. This is available for sessions, views, errors, long tasks, vitals, and operations.

#### During the time to initial display and time to full display

iOS application launch profiling data (sampled by `applicationLaunchSampleRate`) is attached to the [time to initial display][5] vital event and stops at the time to initial display. The [time to full display][5] is profiled only in sessions sampled by `continuousSampleRate`. You can access profiles for the time to initial display and time to full display from the session side panel, view side panel, or directly from the vital side panels.

{% img src="real_user_monitoring/ios/ios-profiling-ttfd.png" alt="iOS profiling data in a time to full display vital event." style="width:90%;" /%}

Use the **flame graph** to identify which functions consume the most wall time during launch, the **thread timeline** to see parallel execution patterns, and the **call graph** to trace function dependencies. You can also download the profiling data for external analysis or deeper investigation.

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

#### Within the Profiling page
{% img src="real_user_monitoring/ios/ios_profiler_aggregate_experience.png" alt="iOS profiling aggregate experience." style="width:100%;" /%}

The Profiling page, in [**Real User Monitoring > Investigate > Profiles**][8], lets you analyze and compare profiling data across sessions in one place. Use it to spot system-level patterns, compare top-consuming methods, and prioritize optimizations instead of inspecting profiled sessions one by one. The guided experience walks you through:

1. **Select a measurement**: Pick an application launch measurement (either the [time to initial display][5] or [time to full display][5]), a long task, or a critical [RUM Operation][7]. Optionally, filter by RUM attributes such as version or OS, or narrow to a specific distribution such as p95.
{% img src="real_user_monitoring/ios/ios_profiler_aggregate_experience_step_2.png" alt="Step 2 of the iOS profiling aggregate experience showing which measurement to focus on." style="width:100%;" /%}

2. **Compare (Optional)**: Define two groups to compare side by side—for example, different versions, OS types, or percentile ranges—to isolate performance differences between them.
{% img src="real_user_monitoring/ios/ios_profiler_aggregate_experience_step_3.png" alt="Step 3 of the iOS profiling aggregate experience showing how to compare." style="width:100%;" /%}

3. **Investigate slowest methods**: Review which methods consume the most time in the aggregated profile so you can prioritize what to optimize first. Explore the call hierarchy to see how those methods relate and where time is spent across the stack, or, if you chose to compare, see the differences between group A and group B.
{% img src="real_user_monitoring/ios/ios_profiler_aggregate_experience_step_4a.png" alt="Step 4 of the iOS profiling aggregate experience showing results to compare between groups." style="width:100%;" /%}
{% img src="real_user_monitoring/ios/ios_profiler_aggregate_experience_step_4b.png" alt="Step 4 of the iOS profiling aggregate experience showing a flame graph comparison between groups." style="width:100%;" /%}

#### Analyze profiling data with AI

- **[Bits Chat][9]**: Open the side panel of a slow event, such as a time to initial display, time to full display, application hang, long task, or operation. Then ask Bits Chat what made the event slow. On the Profiling page, ask Bits Chat to identify system-level bottlenecks across sessions.
- **[Datadog MCP Server][10]**: From your AI agents and IDEs, look up RUM events and analyze their profiling data. Requires the [`profiling` toolset][11].

[1]: https://developer.apple.com/documentation/kernel/mach
[3]: /real_user_monitoring/application_monitoring/ios
[4]: /real_user_monitoring/setup/enable_rum/manage_sessions/?platform=ios
[5]: /real_user_monitoring/setup/enable_rum/track_application_startups/?platform=ios
[6]: /real_user_monitoring/setup/data_collected/?platform=ios#error-attributes
[7]: /real_user_monitoring/track_critical_operations/?tab=ios
[8]: https://app.datadoghq.com/rum/profiling
[9]: /real_user_monitoring/investigate_problems/troubleshoot_with_ai/bits_chat/
[10]: /mcp_server/tools/#profiling
[11]: /mcp_server/setup/#toolsets
