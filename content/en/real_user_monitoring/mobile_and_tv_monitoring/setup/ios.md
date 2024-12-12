---
title: iOS and tvOS Monitoring Setup
beta: true
description: "Collect RUM or Error Tracking data from your iOS and tvOS applications."
aliases:
  - /real_user_monitoring/ios
  - /real_user_monitoring/ios/getting_started
  - /real_user_monitoring/ios/swiftui/
  - /real_user_monitoring/swiftui/
  - /real_user_monitoring/mobile_and_tv_monitoring/swiftui/
code_lang: ios
type: multi-code-lang
code_lang_weight: 20
further_reading:
 - link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
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
 - link: "/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/"
   tag: "Documentation"
   text: "RUM iOS and tvOS monitoring supported versions"
---

## Overview

This page describes how to instrument your applications for both [Real User Monitoring (RUM)][1] and [Error Tracking][2] with the iOS SDK. You can follow the steps below to instrument your applications for RUM (which includes Error Tracking) or Error Tracking if you have purchased it as a standalone product.

## Setup

1. Declare the SDK as a dependency.
2. Specify application details in the UI.
3. Initialize the library.
4. Initialize the Datadog Monitor and enable `URLSessionInstrumentation` to start sending data.

### Declare the SDK as a dependency

Declare the library as a dependency depending on your package manager. Swift Package Manager (SPM) is recommended.

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}

To integrate using Apple's Swift Package Manager, add the following as a dependency to your `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
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

In Xcode, link the following frameworks:
```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogRUM.xcframework
```

[1]: https://github.com/Carthage/Carthage
{{% /tab %}}
{{< /tabs >}}

### Specify application details in the UI

{{< tabs >}}
{{% tab "RUM" %}}

1. Navigate to [**Digital Experience** > **Add an Application**][1].
2. Select `iOS` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To instrument your web views, click the **Instrument your webviews** toggle. For more information, see [Web View Tracking][2].
4. To disable automatic user data collection for client IP or geolocation data, use the toggles for those settings. For more information, see [RUM iOS Data Collected][3].

   {{< img src="real_user_monitoring/ios/ios-create-application.png" alt="Create a RUM application for iOS in Datadog" style="width:100%;border:none" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/ios/web_view_tracking/
[3]: /real_user_monitoring/ios/data_collected/

{{% /tab %}}
{{% tab "Error Tracking" %}}

1. Navigate to [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application**][1].
2. Select `iOS` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To instrument your web views, click the **Instrument your webviews** toggle. For more information, see [Web View Tracking][2].
4. To disable automatic user data collection for client IP or geolocation data, use the toggles for those settings. For more information, see [iOS Data Collected][3].

   {{< img src="real_user_monitoring/error_tracking/mobile-new-application.png" alt="Create an application for iOS in Datadog" style="width:90%;">}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /real_user_monitoring/ios/web_view_tracking/
[3]: /real_user_monitoring/ios/data_collected/

{{% /tab %}}
{{< /tabs >}}

To ensure the safety of your data, you must use a client token. If you use only [Datadog API keys][3] to configure the `dd-sdk-ios` library, they are exposed client-side in the iOS application's byte code.

For more information about setting up a client token, see the [Client token documentation][4].

### Initialize the library

In the initialization snippet, set an environment name, service name, and version number. In the examples below, `app-name` specifies the variant of the application that generates data.

For more information, see [Using Tags][5].

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .eu1,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite eu1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us3,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us3];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us5,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us5];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us1_fed,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us1_fed];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap1" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .ap1,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

The iOS SDK automatically tracks user sessions depending on options provided at the SDK initialization. To add GDPR compliance for your EU users and other [initialization parameters][6] to the SDK configuration, see the [Set tracking consent documentation](#set-tracking-consent-gdpr-compliance).

### Sample RUM sessions

<div class="alert alert-warning">Configuring the session sample rate does not apply to Error Tracking.</div>

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the RUM iOS SDK][7] as a percentage between 0 and 100.

For example, to only keep 50% of sessions use:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    sessionSampleRate: 50
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
configuration.sessionSampleRate = 50;
```
{{% /tab %}}
{{< /tabs >}}

### Set tracking consent (GDPR compliance)

To be compliant with the GDPR regulation, the RUM iOS SDK requires the tracking consent value at initialization.

The `trackingConsent` setting can be one of the following values:

1. `.pending`: The RUM iOS SDK starts collecting and batching the data but does not send it to Datadog. The RUM iOS SDK waits for the new tracking consent value to decide what to do with the batched data.
2. `.granted`: The RUM iOS SDK starts collecting the data and sends it to Datadog.
3. `.notGranted`: The RUM iOS SDK does not collect any data. No logs, traces, or events are sent to Datadog.

To change the tracking consent value after the RUM iOS SDK is initialized, use the `Datadog.set(trackingConsent:)` API call. The RUM iOS SDK changes its behavior according to the new value.

For example, if the current tracking consent is `.pending`:

- If you change the value to `.granted`, the RUM iOS SDK sends all current and future data to Datadog;
- If you change the value to `.notGranted`, the RUM iOS SDK wipes all current data and does not collect future data.

### Initialize the Datadog Monitor and enable `URLSessionInstrumentation`

Configure and register the Datadog Monitor. You only need to do it once, usually in your `AppDelegate` code:

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    uiKitViewsPredicate: DefaultUIKitRUMViewsPredicate(),
    uiKitActionsPredicate: DefaultUIKitRUMActionsPredicate(),
    urlSessionTracking: RUM.Configuration.URLSessionTracking()
  )
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
configuration.uiKitViewsPredicate = [DDDefaultUIKitRUMViewsPredicate new];
configuration.uiKitActionsPredicate = [DDDefaultUIKitRUMActionsPredicate new];
[configuration setURLSessionTracking:[DDRUMURLSessionTracking new]];

[DDRUM enableWith:configuration];
```
{{% /tab %}}
{{% /tabs %}}

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

To instrument a tap action on a `SwiftUI.View`, add the following method to your view declaration:

```swift
import SwiftUI
import DatadogRUM

struct BarView: View {

    var body: some View {
        Button("BarButton") { {
            ...
        }
        .trackRUMTapAction(name: "Bar")
    }
}
```

## Track background events

<div class="alert alert-info"><p>Tracking background events may lead to additional sessions, which can impact billing. For questions, <a href="https://docs.datadoghq.com/help/">contact Datadog support.</a></p>
</div>

You can track events such as crashes and network requests when your application is in the background (for example, no active view is available).

Add the following snippet during initialization in your Datadog configuration:

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    ...
    trackBackgroundEvents: true
  )
)
```

## Track iOS errors

[iOS Crash Reporting and Error Tracking][7] displays any issues in your application and the latest available errors. You can view error details and attributes including JSON in the [RUM Explorer][9].

## Sending data when device is offline

The iOS SDK ensures availability of data when your user device is offline. In cases of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches. They are sent as soon as the network is available, and the battery is high enough to ensure the iOS SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: To ensure that the iOS SDK does not use too much disk space, the data on the disk is automatically discarded if it gets too old.

## Supported versions

See [Supported versions][10] for a list operating system versions and platforms that are compatible with the iOS SDK.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /error_tracking/
[3]: /account_management/api-app-keys/#api-keys
[4]: /account_management/api-app-keys/#client-tokens
[5]: /getting_started/tagging/using_tags/#rum--session-replay
[6]: /real_user_monitoring/ios/advanced_configuration/#initialization-parameters
[7]: https://github.com/DataDog/dd-sdk-ios
[8]: /real_user_monitoring/error_tracking/ios/
[9]: /real_user_monitoring/explorer/
[10]: /real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/
