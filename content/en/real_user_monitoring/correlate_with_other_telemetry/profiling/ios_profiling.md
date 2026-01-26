---
title: iOS Profiling
description: "Use iOS profiling with RUM to understand iOS mobile application performance issues affecting user experience."
further_reading:
  - link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
    tag: "Blog"
    text: "Real User Monitoring"
  - link: "https://docs.datadoghq.com/real_user_monitoring/application_monitoring/ios"
    tag: "Documentation"
    text: "Start monitoring iOS applications"
  - link: "/tracing/"
    tag: "Documentation"
    text: "APM and Distributed Tracing"
---

{{< callout url="https://www.datadoghq.com/product-preview/ios-profiler/" btn_hidden="false" header="Join the Preview!" >}}
iOS Profiling is in Preview.
{{< /callout >}}

{{< img src="real_user_monitoring/ios/ios-profiling-ttid.png" alt="iOS profiling data in a time to initial display vital event." style="width:90%;" >}}

## Overview

iOS profiling captures detailed data about your application's performance during launch, helping you identify slow functions and optimize startup time. iOS profiling is built on top of the [mach Kernel API][1] and periodically samples all application threads to collect call stacks. 

## Prerequisites

- Your iOS application must use the Datadog iOS SDK version 3.6.0+.
- [RUM without Limits][2] must be enabled in your organization.

## Setup

1. Set up [Mobile RUM for iOS][3].
2. Initialize the RUM SDK and configure the `applicationLaunchSampleRate`, which determines the percentage of application launches that are profiled (for example, 5% means profiling runs on 5 out of 100 launches).

<div class="alert alert-danger">
  If no value is specified, the default <code>applicationLaunchSampleRate</code> is 5 percent.
</div>

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
    Profiling.enable() // default is 5%
```

## Explore profiling data

### During the time to initial display

iOS application launch profiling data is attached to the [time to initial display][4] vital event in a RUM session. You can access the time to initial display from the session side panel, view side panel, or directly from the time to initial display vital side panel.

{{< img src="real_user_monitoring/ios/ios-profiling-session.png" alt="iOS profiling data in a view event to initial display vital event." style="width:90%;" >}}

Use the **flame graph** to identify which functions consume the most Wall time during launch, the **thread timelin**e** to see parallel execution patterns, and the **call graph** to trace function dependencies. You can also download the profiling data for external analysis or deeper investigation.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.apple.com/documentation/kernel/mach
[2]: /real_user_monitoring/rum_without_limits/ 
[3]: /real_user_monitoring/application_monitoring/ios
[4]: /real_user_monitoring/application_monitoring/ios/application_launch_monitoring?tab=swift




