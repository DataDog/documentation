---
title: RUM iOS and tvOS Monitoring Setup
beta: true
description: "Collect RUM data from your iOS and tvOS applications."
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

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the real-time performance and user journeys of your application's individual users.

## Setup

1. Declare the SDK as a dependency.
2. Specify application details in the UI.
3. Initialize the library.
4. Initialize the RUM Monitor, `DatadogURLSessionDelegate`, to start sending data.

**Note:** The minimum supported version for the Datadog iOS SDK is iOS v11+. The Datadog iOS SDK also supports tvOS.

### Declare the SDK as a dependency

Declare the library as a dependency depending on your package manager:

{{< tabs >}}
{{% tab "CocoaPods" %}}

You can use [CocoaPods][1] to install `dd-sdk-ios`:
```
pod 'DatadogCore'
pod 'DatadogRUM'
```


[1]: https://cocoapods.org/
{{% /tab %}}
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

1. Navigate to [**Digital Experience** > **Add an Application**][8].
2. Select `iOS` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To instrument your web views, click the **Instrument your webviews** toggle. For more information, see [Web View Tracking][9].
4. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings. For more information, see [RUM iOS Data Collected][10].

   {{< img src="real_user_monitoring/ios/ios-create-application.png" alt="Create a RUM application for iOS in Datadog" style="width:100%;border:none" >}}

To ensure the safety of your data, you must use a client token. If you used only [Datadog API keys][11] to configure the `dd-sdk-ios` library, they would be exposed client-side in the iOS application's byte code.

For more information about setting up a client token, see the [Client token documentation][12].

### Initialize the library

In the initialization snippet, set an environment name, service name, and version number. In the examples below, `app-name` specifies the variant of the application that generates data.

For more information, see [Using Tags][13].

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

The RUM iOS SDK automatically tracks user sessions depending on options provided at the SDK initialization. To add GDPR compliance for your EU users and other [initialization parameters][14] to the SDK configuration, see the [Set tracking consent documentation][15].

### Initialize the RUM Monitor and enable `URLSessionInstrumentation`

Configure and register the RUM Monitor. You only need to do it once, usually in your `AppDelegate` code:

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
        delegateClass: SessionDelegate.self
    )
)

let session = URLSession(
    configuration: .default,
    delegate: SessionDelegate(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[SessionDelegate class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[SessionDelegate alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

### Sample RUM sessions

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the RUM iOS SDK][16] as a percentage between 0 and 100.

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

### Instrument views

The Datadog iOS SDK for RUM allows you to instrument views of `SwiftUI` applications. The instrumentation also works with hybrid `UIKit` and `SwiftUI` applications. 

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

The `trackRUMView(name:)` method starts and stops a RUM view when the `SwiftUI` view appears and disappears from the screen.

### Instrument tap actions

The Datadog iOS SDK for RUM allows you to instrument tap actions of `SwiftUI` applications. The instrumentation also works with hybrid `UIKit` and `SwiftUI` applications. 

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

[iOS Crash Reporting and Error Tracking][17] displays any issues in your application and the latest available errors. You can view error details and attributes including JSON in the [RUM Explorer][18].

## Supported versions

See [Supported versions][19] for a list operating system versions and platforms that are compatible with the RUM iOS SDK.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/microsoft/plcrashreporter/issues/288
[2]: https://developer.apple.com/xcode/
[3]: https://developer.apple.com/news/?id=jd9wcyov
[4]: /logs/log_collection/ios/?tab=swiftpackagemanagerspm
[5]: /logs/log_collection/ios/?tab=carthage
[6]: https://github.com/DataDog/dd-sdk-ios/tree/develop/DatadogExtensions/Alamofire
[7]: https://github.com/microsoft/plcrashreporter
[8]: https://app.datadoghq.com/rum/application/create
[9]: /real_user_monitoring/ios/web_view_tracking/
[10]: /real_user_monitoring/ios/data_collected/
[11]: /account_management/api-app-keys/#api-keys
[12]: /account_management/api-app-keys/#client-tokens
[13]: /getting_started/tagging/using_tags/#rum--session-replay
[14]: /real_user_monitoring/ios/advanced_configuration/#initialization-parameters
[15]: /real_user_monitoring/ios/advanced_configuration/#set-tracking-consent-gdpr-compliance
[16]: https://github.com/DataDog/dd-sdk-ios
[17]: /real_user_monitoring/error_tracking/ios/
[18]: /real_user_monitoring/explorer/
[19]: /real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/
