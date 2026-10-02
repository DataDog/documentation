<!--
This partial contains setup instructions for the iOS SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your Apple platform applications with the Datadog iOS SDK.

The iOS SDK supports the Apple ecosystem, including iOS, iPadOS, tvOS, watchOS, and visionOS. It supports [Real User Monitoring (RUM)][1], [Error Tracking][2], [Product Analytics][3], and [Session Replay][4]. For supported versions per platform, see [Supported versions](#supported-versions).

## Prerequisites

Before you begin, you need:
- Xcode 12.0 or later
- A supported Apple platform deployment target (see [Supported versions](#supported-versions) for minimum OS versions per platform)
- A Datadog account with RUM or Error Tracking enabled

## Setup

**Choose your setup method:**

- **[Agentic Onboarding (in Preview)][5]**: Use AI coding agents (Cursor, Claude Code) to automatically instrument your iOS application with one prompt. The agent detects your project structure and configures the RUM SDK for you.
- **Manual setup** (below): Follow the instructions to manually add and configure the RUM SDK in your iOS application.

### Manual setup

To send RUM data from your Apple platform application to Datadog, complete the following steps.

{% stepper level="h4" %}

{% step title="Add the dependencies" %}
Add the iOS SDK to your project using your preferred package manager. Datadog recommends using Swift Package Manager (SPM).

{% tabs %}
{% tab label="Swift Package Manager (SPM)" %}

To integrate using Apple's Swift Package Manager, add the following as a dependency to your `Package.swift`:

```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
```

In your project, link the following libraries:

```
DatadogCore
DatadogRUM
```

{% /tab %}
{% tab label="CocoaPods" %}

You can use [CocoaPods][6] to install `dd-sdk-ios`:

```
pod 'DatadogCore'
pod 'DatadogRUM'
```


{% /tab %}
{% tab label="Carthage" %}

You can use [Carthage][7] to install `dd-sdk-ios`:

```
github "DataDog/dd-sdk-ios"
```

{% alert level="info" %}
Datadog does not provide prebuilt Carthage binaries. This means Carthage builds the SDK from source.
{% /alert %}

To build and integrate the SDK, run:

```
carthage bootstrap --use-xcframeworks --no-use-binaries
```

After building, add the following XCFrameworks to your Xcode project (in the "Frameworks, Libraries, and Embedded Content" section):

```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogRUM.xcframework
```


{% /tab %}
{% /tabs %}
{% /step %}

{% step title="Initialize the SDK" %}

In the initialization snippet, set an environment name, service name, and client token.

The SDK should be initialized as early as possible in the app life cycle, specifically in the `AppDelegate`'s `application(_:didFinishLaunchingWithOptions:)` callback. The `AppDelegate` is your app's main entry point that handles app life cycle events. 

Initializing here allows the SDK to correctly capture all measurements, including application startup duration. For apps built with SwiftUI, you can use `@UIApplicationDelegateAdaptor` to hook into the `AppDelegate`.

{% alert level="warning" %}
Initializing the SDK elsewhere (for example later during view loading) may result in inaccurate or missing telemetry, especially around app startup performance.
{% /alert %}

For more information, see [Using Tags][8].

To manage supported SDK settings from Datadog without deploying a new version of your application, set the optional `remoteConfiguration` parameter to your remote configuration ID. For more information, see [Remote Configuration][9].

Use a client token to help protect your data. Using only [Datadog API keys][6] to configure the `dd-sdk-ios` library would expose them client-side in your iOS application's byte code. For more information about setting up a client token, see the [Client token documentation][7].

{% site-region region="us" %}
{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogCore

// Initialize Datadog SDK with your configuration
Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",  // From Datadog UI
    env: "<environment>",             // for example, "production", "staging"
    service: "<service name>",        // Your app's service name
    remoteConfiguration: .init(id: "<remote configuration id>")  // Optional
  ),
  trackingConsent: trackingConsent  // GDPR compliance setting
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogCore;

// Initialize Datadog SDK with your configuration
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";  // Your app's service name

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];  // GDPR compliance setting
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="eu" %}
{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .eu1,
    service: "<service name>",
    remoteConfiguration: .init(id: "<remote configuration id>")  // Optional
  ),
  trackingConsent: trackingConsent
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite eu1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="us3" %}
{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us3,
    service: "<service name>",
    remoteConfiguration: .init(id: "<remote configuration id>")  // Optional
  ),
  trackingConsent: trackingConsent
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us3];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="us5" %}
{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us5,
    service: "<service name>",
    remoteConfiguration: .init(id: "<remote configuration id>")  // Optional
  ),
  trackingConsent: trackingConsent
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us5];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="gov" %}
{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us1_fed,
    service: "<service name>",
    remoteConfiguration: .init(id: "<remote configuration id>")  // Optional
  ),
  trackingConsent: trackingConsent
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us1_fed];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="gov2" %}
{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us2_fed,
    service: "<service name>",
    remoteConfiguration: .init(id: "<remote configuration id>")  // Optional
  ),
  trackingConsent: trackingConsent
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us2_fed];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="ap1" %}
{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .ap1,
    service: "<service name>",
    remoteConfiguration: .init(id: "<remote configuration id>")  // Optional
  ),
  trackingConsent: trackingConsent
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="ap2" %}
{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .ap2,
    service: "<service name>",
    remoteConfiguration: .init(id: "<remote configuration id>")  // Optional
  ),
  trackingConsent: trackingConsent
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap2];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="uk1" %}
{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .uk1,
    service: "<service name>",
    remoteConfiguration: .init(id: "<remote configuration id>")  // Optional
  ),
  trackingConsent: trackingConsent
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite uk1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```

{% /tab %}
{% /tabs %}
{% /site-region %}

The iOS SDK automatically tracks user sessions based on the options you provide during SDK initialization. For other [initialization parameters][10], see Advanced Configuration.
{% /step %}

{% step title="Configure tracking consent (GDPR compliance)" %}

To be compliant with the GDPR regulation (required for apps targeting European users), the iOS SDK requires the tracking consent value at initialization.

The `trackingConsent` setting can be one of the following values:

1. `.pending`: The iOS SDK starts collecting and batching the data but does not send it to Datadog. The iOS SDK waits for the new tracking consent value to decide what to do with the batched data.
2. `.granted`: The iOS SDK starts collecting the data and sends it to Datadog.
3. `.notGranted`: The iOS SDK does not collect any data. No logs, traces, or events are sent to Datadog.

To **change the tracking consent value** after the iOS SDK is initialized, use the `Datadog.set(trackingConsent:)` API call. The iOS SDK changes its behavior according to the new value.

For example, if the current tracking consent is `.pending`:

- If you change the value to `.granted`, the iOS SDK sends all current and future data to Datadog.
- If you change the value to `.notGranted`, the iOS SDK wipes all current data and does not collect future data.
{% /step %}

{% step title="Enable RUM to start sending data" %}

To configure and start RUM, see [Enable the Datadog RUM Module](/real_user_monitoring/setup/enable_rum/?platform=ios).
{% /step %}

{% /stepper %}

## Sending data when device is offline

The iOS SDK maintains data availability when your user device is offline. In cases of low-network areas or low battery, all events are first stored on the local device in batches. Batches are sent when the network is available and the battery is sufficient. If a network upload fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: The data on the disk is automatically discarded if it gets too old, helping the iOS SDK avoid using too much disk space.

## Supported versions

The Datadog iOS SDK is the single SDK for instrumenting Real User Monitoring on all Apple platforms: iOS, iPadOS, tvOS, watchOS, and visionOS. Use this section to confirm the minimum OS version, dependency manager, and Datadog modules available for each platform.

The RUM iOS SDK supports the following platforms and versions:

| Platform | Supported | Version | Notes |
|--------|-------------|---------|-------|
| iOS | {% x/ %} | 12+ | |
| iPadOS | {% x/ %} | 12+ | |
| tvOS | {% x/ %} | 12+ | |
| visionOS | {% x/ %} | 1.0+ | |
| watchOS | {% x/ %} | 7.0+ | |
| macOS (Designed for iPad) | {% x/ %} | 11+ | |
| macOS (Catalyst) | partially supported | 12+ | Catalyst is supported in build mode only, which means that macOS targets build, but functionalities for the SDK might not work for this target. |
| macOS | | 12+ | macOS is not officially supported by the Datadog SDK. Some features may not be fully functional. **Note**: `DatadogRUM`, `DatadogSessionReplay`, and `DatadogObjc`, which heavily depend on `UIKit`, do not build on macOS. |
| Linux | | n/a | |

### Module support by platform

| Module | iOS | tvOS | watchOS | visionOS | Notes |
|--------|-----|------|---------|----------|-------|
| DatadogCore | {% x/ %} | {% x/ %} | {% x/ %} | {% x/ %} | |
| DatadogLogs | {% x/ %} | {% x/ %} | {% x/ %} | {% x/ %} | |
| DatadogTrace | {% x/ %} | {% x/ %} | {% x/ %} | {% x/ %} | |
| DatadogCrashReporting | {% x/ %} | {% x/ %} | {% x/ %} | {% x/ %} | |
| DatadogRUM | {% x/ %} | {% x/ %} | {% x/ %} | {% x/ %} | watchOS: automatic view/action tracking, frame rate monitoring, and memory warning detection are not available. |
| DatadogFlags | {% x/ %} | {% x/ %} | {% x/ %} | {% x/ %} | |
| DatadogProfiling | {% x/ %} | {% x/ %} | | {% x/ %} | Not available on watchOS. The profiling module requires system-level APIs that watchOS does not support. |
| DatadogSessionReplay | {% x/ %} | | | | Not available on tvOS, watchOS, and visionOS. SessionReplay requires rendering capabilities not available on these platforms. |
| DatadogWebViewTracking | {% x/ %} | | | {% x/ %} | Not available on tvOS and watchOS. WebViewTracking requires browser rendering capabilities not available on these platforms. |

### Xcode

The SDK is built using the most recent version of [Xcode][11], but is always backwards compatible with the [lowest supported Xcode version][12] for App Store submission.

### Dependency managers

The iOS SDK supports the following dependency managers:

- Swift Package Manager
- CocoaPods
- Carthage

### Languages

| Language | Version |
|----------|---------|
| UIKit | 5.* |
| Objective-C | 2.0 |

### UI framework instrumentation

| Framework | Automatic | Manual |
|--------|-------|-------|
| UIKit | {% x/ %} | {% x/ %} |
| SwiftUI | {% x/ %} | {% x/ %} |

### Network compatibility

| Framework | Automatic | Manual |
|--------|-------|-------|
| URLSession | {% x/ %} | {% x/ %} |
| [Alamofire][13] | {% x/ %} | {% x/ %} |
| [Apollo GraphQL][14] | {% x/ %} | {% x/ %} |
| [SDWebImage][15] | {% x/ %} | {% x/ %} |
| [OpenAPI Generator][16] | {% x/ %} | {% x/ %} |
| SwiftNIO | | |

### Dependencies

The Datadog RUM SDK depends on the following third-party library:

- [KSCrash][17] 2.5.0

[1]: /real_user_monitoring/
[2]: /error_tracking/
[3]: /product_analytics/
[4]: /session_replay/
[5]: /real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring
[6]: /account_management/api-app-keys/#api-keys
[7]: /account_management/api-app-keys/#client-tokens
[8]: /getting_started/tagging/using_tags/#rum--session-replay
[9]: /real_user_monitoring/remote_configuration/
[10]: /real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=ios#initialization-parameters
[11]: https://developer.apple.com/xcode/
[12]: https://developer.apple.com/news/?id=fxu2qp7b
[13]: /real_user_monitoring/setup/additional_plugins/?platform=ios#alamofire
[14]: /real_user_monitoring/setup/additional_plugins/?platform=ios#apollo-graphql
[15]: /real_user_monitoring/setup/additional_plugins/?platform=ios#sdwebimage
[16]: /real_user_monitoring/setup/additional_plugins/?platform=ios#openapi-generator
[17]: https://github.com/kstenerud/KSCrash
