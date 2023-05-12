---
title: RUM iOS and tvOS Monitoring
kind: documentation
beta: true
description: "Collect RUM data from your iOS and tvOS applications."
aliases:
  - /real_user_monitoring/ios/getting_started
further_reading:
    - link: "https://github.com/DataDog/dd-sdk-ios"
      tag: "Github"
      text: "dd-sdk-ios Source Code"
    - link: "/real_user_monitoring"
      tag: "Documentation"
      text: "Learn how to explore your RUM data"
    - link: "/real_user_monitoring/error_tracking/ios/"
      tag: "Documentation"
      text: "Learn how to track iOS errors"
    - link: "/real_user_monitoring/ios/swiftui/"
      tag: "Documentation"
      text: "Learn about instrumenting SwiftUI applications"
---

## Overview

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the real-time performance and user journeys of your application's individual users. 

## Setup

1. Declare the SDK as a dependency.
2. Specify application details in the UI.
3. Initialize the library.
4. Initialize the RUM Monitor, `DDURLSessionDelegate`, to start sending data.

**Note:** The minimum supported version for the Datadog iOS SDK is iOS v11+. The Datadog iOS SDK also supports tvOS. 

### Declare the SDK as a dependency

1. Declare [dd-sdk-ios][1] as a dependency, depending on your package manager.


| Package manager            | Installation method                                                                         |
|----------------------------|---------------------------------------------------------------------------------------------|
| [CocoaPods][2]             | `pod 'DatadogSDK'`                                                                          |
| [Swift Package Manager][3] | `.package(url: "https://github.com/DataDog/dd-sdk-ios.git", .upToNextMajor(from: "1.0.0"))` |
| [Carthage][4]              | `github "DataDog/dd-sdk-ios"`                                                               |

### Specify application details in the UI

1. Navigate to [**UX Monitoring** > **RUM Applications** > **New Application**][5].
2. Select `iOS` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To instrument your web views, click the **Instrument your webviews** toggle. For more information, see [Web View Tracking][12].
4. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings. For more information, see [RUM iOS Data Collected][14].

   {{< img src="real_user_monitoring/ios/ios-create-application.png" alt="Create a RUM application for iOS in Datadog" style="width:100%;border:none" >}}

To ensure the safety of your data, you must use a client token. If you used only [Datadog API keys][6] to configure the `dd-sdk-ios` library, they would be exposed client-side in the iOS application's byte code. 

For more information about setting up a client token, see the [Client token documentation][7].

### Initialize the library

In the initialization snippet, set an environment name, service name, and version number. In the examples below, `app-name` specifies the variant of the application that generates data. 

For more information, see [Using Tags][11].

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<rum_application_id>",
            clientToken: "<client_token>",
            environment: "<environment_name>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .us1)
        .trackUIKitRUMViews()
        .trackUIKitRUMActions()
        .trackURLSession()
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us1]];
[builder trackUIKitRUMViews];
[builder trackUIKitRUMActions];
[builder trackURLSessionWithFirstPartyHosts:[NSSet new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<rum_application_id>",
            clientToken: "<client_token>",
            environment: "<environment_name>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .eu1)
        .trackUIKitRUMViews()
        .trackUIKitRUMActions()
        .trackURLSession()
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint eu1]];
[builder trackUIKitRUMViews];
[builder trackUIKitRUMActions];
[builder trackURLSessionWithFirstPartyHosts:[NSSet new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<rum_application_id>",
            clientToken: "<client_token>",
            environment: "<environment_name>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .us3)
        .trackUIKitRUMViews()
        .trackUIKitRUMActions()
        .trackURLSession()
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us3]];
[builder trackUIKitRUMViews];
[builder trackUIKitRUMActions];
[builder trackURLSessionWithFirstPartyHosts:[NSSet new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<rum_application_id>",
            clientToken: "<client_token>",
            environment: "<environment_name>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .us5)
        .trackUIKitRUMViews()
        .trackUIKitRUMActions()
        .trackURLSession()
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us5]];
[builder trackUIKitRUMViews];
[builder trackUIKitRUMActions];
[builder trackURLSessionWithFirstPartyHosts:[NSSet new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<rum_application_id>",
            clientToken: "<client_token>",
            environment: "<environment_name>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .us1_fed)
        .trackUIKitRUMViews()
        .trackUIKitRUMActions()
        .trackURLSession()
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us1_fed]];
[builder trackUIKitRUMViews];
[builder trackUIKitRUMActions];
[builder trackURLSessionWithFirstPartyHosts:[NSSet new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

The RUM iOS SDK automatically tracks user sessions depending on options provided at the SDK initialization. To add GDPR compliance for your EU users and other [initialization parameters][9] to the SDK configuration, see the [Set tracking consent documentation][8].

### Initialize the RUM Monitor and `DDURLSessionDelegate`

Configure and register the RUM Monitor. You only need to do it once, usually in your `AppDelegate` code:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import Datadog

Global.rum = RUMMonitor.initialize()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDGlobal.rum = [[DDRUMMonitor alloc] init];
```
{{% /tab %}}
{{< /tabs >}}

To monitor requests sent from the `URLSession` instance as resources, assign `DDURLSessionDelegate()` as a `delegate` of that `URLSession`:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[DDNSURLSessionDelegate alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

## Track background events

<div class="alert alert-info"><p>Tracking background events may lead to additional sessions, which can impact billing. For questions, <a href="https://docs.datadoghq.com/help/">contact Datadog support.</a></p>
</div>

You can track events such as crashes and network requests when your application is in the background (for example, no active view is available).

Add the following snippet during initialization in your Datadog configuration:

```swift
.trackBackgroundEvents()
```

## Track iOS errors

[iOS Crash Reporting and Error Tracking][13] displays any issues in your application and the latest available errors. You can view error details and attributes including JSON in the [RUM Explorer][10]. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/dd-sdk-ios
[2]: https://cocoapods.org/
[3]: https://swift.org/package-manager/
[4]: https://github.com/Carthage/Carthage
[5]: https://app.datadoghq.com/rum/application/create
[6]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[7]: https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens
[8]: https://docs.datadoghq.com/real_user_monitoring/ios/advanced_configuration/#set-tracking-consent-gdpr-compliance
[9]: https://docs.datadoghq.com/real_user_monitoring/ios/advanced_configuration/#initialization-parameters
[10]: https://docs.datadoghq.com/real_user_monitoring/explorer/
[11]: https://docs.datadoghq.com/getting_started/tagging/using_tags/#rum--session-replay
[12]: https://docs.datadoghq.com/real_user_monitoring/ios/web_view_tracking/
[13]: https://docs.datadoghq.com/real_user_monitoring/error_tracking/ios/
[14]: https://docs.datadoghq.com/real_user_monitoring/ios/data_collected/