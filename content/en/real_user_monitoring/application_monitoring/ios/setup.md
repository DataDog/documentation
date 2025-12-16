---
title: iOS and tvOS Monitoring Setup
beta: true
description: "Collect RUM data from your iOS and tvOS applications."
aliases:
  - /real_user_monitoring/ios
  - /real_user_monitoring/ios/getting_started
  - /real_user_monitoring/ios/swiftui/
  - /real_user_monitoring/swiftui/
  - /real_user_monitoring/mobile_and_tv_monitoring/swiftui/
  - /real_user_monitoring/mobile_and_tv_monitoring/setup/ios
  - /real_user_monitoring/mobile_and_tv_monitoring/ios/setup
further_reading:
 - link: /real_user_monitoring/application_monitoring/ios/advanced_configuration
   tag: Documentation
   text: RUM iOS Advanced Configuration
 - link: "https://github.com/DataDog/dd-sdk-ios"
   tag: "Source Code"
   text: "Source code for dd-sdk-ios"
 - link: "/real_user_monitoring"
   tag: "Documentation"
   text: "Learn how to explore your RUM data"
 - link: "/real_user_monitoring/error_tracking/ios/"
   tag: "Documentation"
   text: "Learn how to track iOS errors"
 - link: "/real_user_monitoring/ios/swiftui/"
   tag: "Documentation"
   text: "Learn about instrumenting SwiftUI applications"
 - link: "/real_user_monitoring/application_monitoring/ios/supported_versions"
   tag: "Documentation"
   text: "RUM iOS and tvOS monitoring supported versions"
 - link: "/real_user_monitoring/guide/mobile-sdk-upgrade"
   tag: "Documentation"
   text: "Upgrade RUM Mobile SDKs"
---

## Overview

This page describes how to instrument your iOS and tvOS applications for [Real User Monitoring (RUM)][1] using the Datadog iOS SDK. Follow the steps below to set up RUM monitoring, which includes Error Tracking.

## Prerequisites

Before you begin, ensure you have:
- Xcode 12.0 or later
- iOS 11.0+ or tvOS 11.0+ deployment target
- A Datadog account with RUM or Error Tracking enabled

## Setup

**Choose your setup method:**

- **[Agentic Onboarding (in Preview)][14]**: Use AI coding agents (Cursor, Claude Code) to automatically instrument your iOS application with one prompt. The agent detects your project structure and configures the RUM SDK for you.
- **Manual setup** (below): Follow the instructions to manually add and configure the RUM SDK in your iOS application.

### Manual setup

To send RUM data from your iOS or tvOS application to Datadog, complete the following steps.

### Step 1 - Add the iOS SDK as a dependency

Add the iOS SDK to your project using your preferred package manager. Datadog recommends using Swift Package Manager (SPM).

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}

To integrate using Apple's Swift Package Manager, add the following as a dependency to your `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
```

In your project, link the following libraries:
```
DatadogCore
DatadogRUM
```

{{% /tab %}}
{{% tab "CocoaPods" %}}

You can use [CocoaPods][1] to install `dd-sdk-ios`:
```
pod 'DatadogCore'
pod 'DatadogRUM'
```

[1]: https://cocoapods.org/
{{% /tab %}}
{{% tab "Carthage" %}}

You can use [Carthage][1] to install `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

**Note**: Datadog does not provide prebuilt Carthage binaries. This means Carthage builds the SDK from source.
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

[1]: https://github.com/Carthage/Carthage
{{% /tab %}}
{{< /tabs >}}

### Step 2 - Specify application details in the UI

1. Navigate to [**Digital Experience** > **Add an Application**][10].
2. Select `iOS` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To instrument your web views, click the **Instrument your webviews** toggle. For more information, see [Web View Tracking][11].

### Step 3 - Initialize the library

In the initialization snippet, set an environment name, service name, and client token.

The SDK should be initialized as early as possible in the app lifecycle, specifically in the `AppDelegate`'s `application(_:didFinishLaunchingWithOptions:)` callback. The `AppDelegate` is your app's main entry point that handles app lifecycle events. 

This ensures the SDK can correctly capture all measurements, including application startup duration. For apps built with SwiftUI, you can use `@UIApplicationDelegateAdaptor` to hook into the `AppDelegate`.

<div class="alert alert-warning">Initializing the SDK elsewhere (for example later during view loading) may result in inaccurate or missing telemetry, especially around app startup performance.</div>

For more information, see [Using Tags][4].

#### Swift

```swift
import DatadogCore

// Initialize Datadog SDK with your configuration
Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",  // From Datadog UI
    env: "<environment>",{{< region-param key=ios_rum_site_swift >}}             // for example, "production", "staging"
    service: "<service name>"        // Your app's service name
  ),
  trackingConsent: trackingConsent  // GDPR compliance setting
)
```

#### Objective-C

```objective-c
@import DatadogCore;

// Initialize Datadog SDK with your configuration
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";  // Your app's service name{{< region-param key=ios_rum_site_objc >}}

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];  // GDPR compliance setting
```

The iOS SDK automatically tracks user sessions based on the options you provide during SDK initialization. To add GDPR compliance for your EU users (required for apps targeting European users) and configure other [initialization parameters][5], see the [Set tracking consent documentation](#set-tracking-consent-gdpr-compliance).

#### Sample session rates

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the RUM iOS SDK][6]. The rate is a percentage between 0 and 100. By default, `sessionSamplingRate` is set to 100 (keep all sessions).

For example, to only keep 50% of sessions use:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// Configure RUM with 50% session sampling
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    sessionSampleRate: 50  // Only track 50% of user sessions
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
// Configure RUM with 50% session sampling
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
configuration.sessionSampleRate = 50;  // Only track 50% of user sessions
```
{{% /tab %}}
{{< /tabs >}}

#### Set tracking consent (GDPR compliance)

To be compliant with the GDPR regulation (required for apps targeting European users), the iOS SDK requires the tracking consent value at initialization.

The `trackingConsent` setting can be one of the following values:

1. `.pending`: The iOS SDK starts collecting and batching the data but does not send it to Datadog. The iOS SDK waits for the new tracking consent value to decide what to do with the batched data.
2. `.granted`: The iOS SDK starts collecting the data and sends it to Datadog.
3. `.notGranted`: The iOS SDK does not collect any data. No logs, traces, or events are sent to Datadog.

To **change the tracking consent value** after the iOS SDK is initialized, use the `Datadog.set(trackingConsent:)` API call. The iOS SDK changes its behavior according to the new value.

For example, if the current tracking consent is `.pending`:

- If you change the value to `.granted`, the RUM iOS SDK sends all current and future data to Datadog;
- If you change the value to `.notGranted`, the RUM iOS SDK wipes all current data and does not collect future data.

### Step 4 - Start sending data

#### Enable RUM
Configure and start RUM. This should be done once and as early as possible, specifically in your `AppDelegate`:

{{< tabs >}}
{{% tab "Swift" %}}

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
{{% /tab %}}
{{% tab "Objective-C" %}}
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
{{% /tab %}}
{{% /tabs %}}

#### Enable `URLSessionInstrumentation`

To monitor requests sent from the `URLSession` instance as resources, enable `URLSessionInstrumentation` for your delegate type and pass the delegate instance to the `URLSession`:

{{< tabs >}}
{{% tab "Swift" %}}
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
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[<YourSessionDelegate> class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[<YourSessionDelegate> alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

### Instrument views

The Datadog iOS SDK allows you to instrument views of `SwiftUI` applications. The instrumentation also works with hybrid `UIKit` and `SwiftUI` applications.

To instrument a `SwiftUI.View`, add the following method to your view declaration:

```swift
import SwiftUI
import DatadogRUM

struct FooView: View {

    var body: some View {
        FooContent {
            ...
        }
        .trackRUMView(name: "Foo")
    }
}
```

The `trackRUMView(name:)` method starts and stops a view when the `SwiftUI` view appears and disappears from the screen.

### Instrument tap actions

The Datadog iOS SDK allows you to instrument tap actions of `SwiftUI` applications. The instrumentation also works with hybrid `UIKit` and `SwiftUI` applications.

<div class="alert alert-warning">Using <code>.trackRUMTapAction(name:)</code> for <code>SwiftUI</code> controls inside a <code>List</code> can break its default gestures. For example, it may disable the <code>Button</code> action or break <code>NavigationLink</code>. To track taps in a <code>List</code> element, use the <a href="/real_user_monitoring/application_monitoring/ios/advanced_configuration#custom-actions">Custom Actions</a> API instead.</div>

To instrument a tap action on a `SwiftUI.View`, add the following method to your view declaration:

```swift
import SwiftUI
import DatadogRUM

struct BarView: View {

    var body: some View {
        Button("BarButton") {
            // Your button action here
        }
        .trackRUMTapAction(name: "Bar")
    }
}
```

## Track iOS errors

[iOS Crash Reporting and Error Tracking][7] displays any issues in your application and the latest available errors. You can view error details and attributes including JSON in the [RUM Explorer][8].

## Disable automatic user data collection

You may want to disable automatic collection of user data to comply with privacy regulations or organizational data governance policies.

To disable automatic user data collection for client IP or geolocation data:

1. After creating your application, go to the [Application Management][13] page and click your application.
2. Click **User Data Collection**.
3. Use the toggles for those settings. For more information, see [RUM iOS Data Collected][12].

To ensure the safety of your data, you must use a client token. Using only [Datadog API keys][2] to configure the `dd-sdk-ios` library would expose them client-side in your iOS application's byte code.

For more information about setting up a client token, see the [Client token documentation][3].

## Sending data when device is offline

The iOS SDK ensures availability of data when your user device is offline. In cases of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches. They are sent as soon as the network is available, and the battery is high enough to ensure the iOS SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: The data on the disk is automatically discarded if it gets too old to ensure the iOS SDK does not use too much disk space.

## Supported versions

See [Supported versions][9] for a list of operating system versions and platforms that are compatible with the iOS SDK.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /account_management/api-app-keys/#api-keys
[3]: /account_management/api-app-keys/#client-tokens
[4]: /getting_started/tagging/using_tags/#rum--session-replay
[5]: /real_user_monitoring/ios/advanced_configuration/#initialization-parameters
[6]: https://github.com/DataDog/dd-sdk-ios
[7]: /error_tracking/frontend/mobile/ios
[8]: /real_user_monitoring/explorer/
[9]: /real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/
[10]: https://app.datadoghq.com/rum/application/create
[11]: /real_user_monitoring/ios/web_view_tracking/
[12]: /real_user_monitoring/ios/data_collected/
[13]: https://app.datadoghq.com/rum/application/
[14]: /real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring
