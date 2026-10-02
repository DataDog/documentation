---
title: Enable the Datadog RUM Module
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
---

## Overview

After you [install the Datadog SDK][1], some SDKs need an extra step to enable the RUM module and start sending data. Select your SDK for platform-specific instructions.

[1]: /real_user_monitoring/setup/install/

<!-- Browser -->
{% if equals($platform, "browser") %}
RUM is enabled automatically when you initialize the SDK. No further action is needed.
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
To enable the Android SDK to start sending data:

{% tabs %}
{% tab label="Kotlin" %}

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
    .trackInteractions()
    .trackLongTasks(durationThreshold) // Not applicable to Error Tracking
    .useViewTrackingStrategy(strategy)
    .build()
Rum.enable(rumConfig)
```

{% /tab %}
{% tab label="Java" %}

```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
    .trackInteractions()
    .trackLongTasks(durationThreshold) // Not applicable to Error Tracking
    .useViewTrackingStrategy(strategy)
    .build();
Rum.enable(rumConfig);
```

{% /tab %}
{% /tabs %}

{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
Configure and start RUM. Do this once, as early as possible, specifically in your `AppDelegate`:

{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    uiKitViewsPredicate: DefaultUIKitRUMViewsPredicate(),
    uiKitActionsPredicate: DefaultUIKitRUMActionsPredicate(),
    swiftUIViewsPredicate: DefaultSwiftUIRUMViewsPredicate(),
    swiftUIActionsPredicate: DefaultSwiftUIRUMActionsPredicate(isLegacyDetectionEnabled: true),
    urlSessionTracking: RUM.Configuration.URLSessionTracking()
  )
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogRUM;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
configuration.uiKitViewsPredicate = [DDDefaultUIKitRUMViewsPredicate new];
configuration.uiKitActionsPredicate = [DDDefaultUIKitRUMActionsPredicate new];
configuration.swiftUIViewsPredicate = [DDDefaultSwiftUIRUMViewsPredicate new];
configuration.swiftUIActionsPredicate = [[DDDefaultSwiftUIRUMActionsPredicate alloc] initWithIsLegacyDetectionEnabled:YES];
[configuration setURLSessionTracking:[DDRUMURLSessionTracking new]];

[DDRUM enableWith:configuration];
```

{% /tab %}
{% /tabs %}
{% /if %}

<!-- Flutter -->
{% if equals($platform, "flutter") %}
RUM is enabled automatically when you initialize the SDK. No further action is needed.
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
RUM is enabled automatically when you initialize the SDK. No further action is needed.
{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}

```kotlin
// in a common source set
fun initializeRum(applicationId: String) {
    val rumConfiguration = RumConfiguration.Builder(applicationId)
            .trackLongTasks(durationThreshold)
            .apply {
                // platform specific setup
                rumPlatformSetup(this)
            }
            .build()

    Rum.enable(rumConfiguration)
}

internal expect fun rumPlatformSetup(rumConfigurationBuilder: RumConfiguration.Builder)

// in iOS source set
internal actual fun rumPlatformSetup(rumConfigurationBuilder: RumConfiguration.Builder) {
    with(rumConfigurationBuilder) {
        trackUiKitViews()
        trackUiKitActions()
        // check more iOS-specific methods
    }
}

// in Android source set
internal actual fun rumPlatformSetup(rumConfigurationBuilder: RumConfiguration.Builder) {
    with(rumConfigurationBuilder) {
        useViewTrackingStrategy(/** choose view tracking strategy **/)
        trackUserInteractions()
        // check more Android-specific methods
    }
}
```

{% /if %}

<!-- C / C++ -->
{% if equals($platform, "cpp") %}
{% partial file="sdk/enable_rum/cpp.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->
{% if equals($platform, "maui") %}
{% partial file="sdk/enable_rum/maui.mdoc.md" /%}
{% /if %}

<!-- Roku -->
{% if equals($platform, "roku") %}
{% partial file="sdk/enable_rum/roku.mdoc.md" /%}
{% /if %}

<!-- Unity -->
{% if equals($platform, "unity") %}
{% partial file="sdk/enable_rum/unity.mdoc.md" /%}
{% /if %}

## Configure what RUM collects

After you enable RUM, use the following pages to configure what the SDK collects:

- [Manage Sessions](/real_user_monitoring/setup/enable_rum/manage_sessions/): Configure the session sample rate and retrieve session IDs.
- [Manage Data Collection](/real_user_monitoring/setup/enable_rum/manage_data_collection/): Stop data collection and clear data stored on the device.
- [Track Errors and Crashes](/real_user_monitoring/setup/enable_rum/track_errors/): Collect errors and crashes, and upload debug symbols to get readable stack traces.
- [Track Network Requests](/real_user_monitoring/setup/enable_rum/track_network_requests/): Track network requests as RUM resources.
- [Track Application Startups](/real_user_monitoring/setup/enable_rum/track_application_startups/): Measure how long your application takes to start.
- [Track UI Latency](/real_user_monitoring/setup/enable_rum/track_ui_latency/): Measure rendering performance, Core Web Vitals, and mobile vitals.
- [Track Navigation](/real_user_monitoring/setup/enable_rum/track_navigation/): Track views automatically or manually.
- [Track User Interactions](/real_user_monitoring/setup/enable_rum/track_user_interactions/): Track user interactions automatically and send custom actions.
- [Track Frustration Signals](/real_user_monitoring/setup/enable_rum/track_frustration_signals/): Surface rage clicks, dead clicks, and error taps.
- [Track Background Events](/real_user_monitoring/setup/enable_rum/track_background_events/): Track events that occur while your application runs in the background.
- [Advanced Configuration](/real_user_monitoring/setup/enable_rum/advanced_configuration/): Review initialization parameters and other advanced options.

## Start monitoring

{% if equals($platform, "browser") %}
Your application appears as pending on the Applications page until Datadog starts receiving data.

After initializing the SDK, navigate to the [RUM Explorer](/real_user_monitoring/investigate_problems/explore_retained_data/) to see sessions from your application.
{% /if %}
{% if equals($platform, "android") %}
Your application appears as pending on the Applications page until Datadog starts receiving data.

Visualize the [data collected](/real_user_monitoring/setup/data_collected/?platform=android) in [dashboards](/real_user_monitoring/administer_and_extend_rum/dashboards/) or create a search query in the [RUM Explorer](https://app.datadoghq.com/rum/list).
{% /if %}
{% if equals($platform, "ios") %}
After completing setup, verify that the iOS SDK is correctly sending data to Datadog.

#### Check the Xcode console

Enable verbose SDK logging to confirm data is being sent. Add the following in the `DEBUG` build configuration only:

```swift
Datadog.verbosityLevel = .debug
```

After running your app, look for output similar to the following in the Xcode debugger console:

```
[DATADOG SDK] 🐶 → 17:23:09.849 [DEBUG] ⏳ (rum) Uploading batch...
[DATADOG SDK] 🐶 → 17:23:10.972 [DEBUG]    → (rum) accepted, won't be retransmitted: success
```

**Note**: Remove `Datadog.verbosityLevel` before building for Release.

#### View your data in Datadog

After running your app, navigate to the [RUM Explorer](/real_user_monitoring/investigate_problems/explore_retained_data/) to see sessions from your application. You should see session data within a few minutes.

To view crash reports and iOS errors, navigate to [Error Tracking](/error_tracking/). For more details on crash analysis with symbolicated stack traces, see [iOS Crash Reporting and Error Tracking](/error_tracking/frontend/mobile/ios).
{% /if %}
{% if equals($platform, "kotlin_multiplatform") %}
Your application appears as pending on the Applications page until Datadog starts receiving data.

After running your app, navigate to the [RUM Explorer](/real_user_monitoring/investigate_problems/explore_retained_data/) to see sessions from your application.
{% /if %}
{% if equals($platform, "maui") %}
Your application appears as pending on the Applications page until Datadog starts receiving data.

After running your app, navigate to the [RUM Explorer](/real_user_monitoring/investigate_problems/explore_retained_data/) to see sessions from your application.
{% /if %}
{% if equals($platform, "flutter") %}
Your application appears as pending on the Applications page until Datadog starts receiving data.

After initializing the SDK, navigate to the [RUM Explorer](/real_user_monitoring/investigate_problems/explore_retained_data/) to see sessions from your application.
{% /if %}
{% if equals($platform, "react_native") %}
Your application appears as pending on the Applications page until Datadog starts receiving data.

After initializing the SDK, navigate to the [RUM Explorer](/real_user_monitoring/investigate_problems/explore_retained_data/) to see sessions from your application.
{% /if %}
{% if equals($platform, "cpp") %}
Your application appears as pending on the Applications page until Datadog starts receiving data.

After initializing the SDK, navigate to the [RUM Explorer](/real_user_monitoring/investigate_problems/explore_retained_data/) to see sessions from your application.
{% /if %}
{% if equals($platform, "roku") %}
Your application appears as pending on the Applications page until Datadog starts receiving data.

After initializing the SDK, navigate to the [RUM Explorer](/real_user_monitoring/investigate_problems/explore_retained_data/) to see sessions from your application.
{% /if %}
{% if equals($platform, "unity") %}
Your application appears as pending on the Applications page until Datadog starts receiving data.

After initializing the SDK, navigate to the [RUM Explorer](/real_user_monitoring/investigate_problems/explore_retained_data/) to see sessions from your application.
{% /if %}

Then, [configure retention filters](/real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/) to control which sessions RUM without Limits retains.

## Next step

Continue to [Manage Sessions](/real_user_monitoring/setup/enable_rum/manage_sessions/).
