---
title: Enable the DD RUM module
private: true
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

See [`ViewTrackingStrategy`](/real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-views) to enable automatic tracking of all your views (activities, fragments, and more).
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
#### Enable RUM

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

#### Enable `URLSessionInstrumentation`

To monitor requests sent from the `URLSession` instance as resources, enable `URLSessionInstrumentation` for your delegate type and pass the delegate instance to the `URLSession`:

{% tabs %}
{% tab label="Swift" %}

```swift
URLSessionInstrumentation.enable(
    with: .init(
        delegateClass: <YourSessionDelegate>.self
    )
)

let session = URLSession(
    configuration: .default,
    delegate: <YourSessionDelegate>(),
    delegateQueue: nil
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[<YourSessionDelegate> class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[<YourSessionDelegate> alloc] init]
                                                 delegateQueue:nil];
```

{% /tab %}
{% /tabs %}

**Note**: `URLSessionInstrumentation` requires access to a `URLSession` delegate class. For third-party libraries that don't expose a session delegate, use the [Custom Resources API](/real_user_monitoring/application_monitoring/ios/advanced_configuration#custom-resources) to manually track those network calls.
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

See [Automatically track views](/real_user_monitoring/application_monitoring/advanced_configuration/kotlin_multiplatform/#automatically-track-views) to enable automatic tracking of all your views.
{% /if %}

<!-- C / C++ -->
{% if equals($platform, "cpp") %}
RUM is enabled automatically when you initialize the SDK. No further action is needed.
{% /if %}

<!-- .NET MAUI -->
{% if equals($platform, "maui") %}
By default, the SDK automatically tracks views, actions, and resources:

- **Views**: MAUI page navigations through `Application.PageAppearing` (one app-level event covering Shell route changes, `Navigation.PushAsync`, and modals).
- **Actions**: User interactions with buttons, switches, checkboxes, pickers, and gesture recognizers.
- **Resources**: HTTP requests through `DiagnosticListener` (all `HttpClient` requests, including third-party libraries).

To customize or disable automatic tracking, see [Advanced Configuration](/real_user_monitoring/application_monitoring/maui/advanced_configuration/).

When RUM is enabled, C# error tracking starts automatically. Unhandled exceptions (`AppDomain.UnhandledException`) and unobserved task exceptions (`TaskScheduler.UnobservedTaskException`) are captured and reported as RUM errors. You can also manually report errors with `DdRum.AddError`.

Call `DdRum.Enable` (or use the `UseDatadogRum` builder extension) after the SDK is initialized:

```csharp
DdRum.Enable(new DdRumConfiguration { ApplicationId = "<APPLICATION_ID>" });
```
{% /if %}

<!-- Roku -->
{% if equals($platform, "roku") %}
RUM is enabled automatically when you initialize the SDK. No further action is needed.
{% /if %}

<!-- Unity -->
{% if equals($platform, "unity") %}
RUM is enabled automatically when you initialize the SDK. No further action is needed.
{% /if %}

## Start monitoring

{% if equals($platform, "browser") %}
After initializing the SDK, navigate to the [RUM Explorer](/real_user_monitoring/explorer/) to see sessions from your application.

Your application appears as pending on the Applications page until Datadog starts receiving data.
{% /if %}
{% if equals($platform, "android") %}
Visualize the [data collected](/real_user_monitoring/android/data_collected/) in [dashboards](/real_user_monitoring/platform/dashboards/) or create a search query in the [RUM Explorer](https://app.datadoghq.com/rum/list).

Your application appears as pending on the Applications page until Datadog starts receiving data.
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

After running your app, navigate to the [RUM Explorer](/real_user_monitoring/explorer/) to see sessions from your application. You should see session data within a few minutes.

To view crash reports and iOS errors, navigate to [Error Tracking](/error_tracking/). For more details on crash analysis with symbolicated stack traces, see [iOS Crash Reporting and Error Tracking](/error_tracking/frontend/mobile/ios).
{% /if %}
{% if equals($platform, "kotlin_multiplatform") %}
After running your app, navigate to the [RUM Explorer](/real_user_monitoring/explorer/) to see sessions from your application.

Your application appears as pending on the Applications page until Datadog starts receiving data.
{% /if %}
{% if equals($platform, "maui") %}
After running your app, navigate to the [RUM Explorer](/real_user_monitoring/explorer/) to see sessions from your application.

Your application appears as pending on the Applications page until Datadog starts receiving data.
{% /if %}
{% if equals($platform, "flutter") %}
After initializing the SDK, navigate to the [RUM Explorer](/real_user_monitoring/explorer/) to see sessions from your application.

Your application appears as pending on the Applications page until Datadog starts receiving data.
{% /if %}
{% if equals($platform, "react_native") %}
After initializing the SDK, navigate to the [RUM Explorer](/real_user_monitoring/explorer/) to see sessions from your application.

Your application appears as pending on the Applications page until Datadog starts receiving data.
{% /if %}
{% if equals($platform, "cpp") %}
After initializing the SDK, navigate to the [RUM Explorer](/real_user_monitoring/explorer/) to see sessions from your application.

Your application appears as pending on the Applications page until Datadog starts receiving data.
{% /if %}
{% if equals($platform, "roku") %}
After initializing the SDK, navigate to the [RUM Explorer](/real_user_monitoring/explorer/) to see sessions from your application.

Your application appears as pending on the Applications page until Datadog starts receiving data.
{% /if %}
{% if equals($platform, "unity") %}
After initializing the SDK, navigate to the [RUM Explorer](/real_user_monitoring/explorer/) to see sessions from your application.

Your application appears as pending on the Applications page until Datadog starts receiving data.
{% /if %}
