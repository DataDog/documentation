---
title: iOS and tvOS Monitoring Supported Versions
beta: true
description: "List of supported operating systems and platforms for the RUM iOS SDK."
aliases:
 - /real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios
 - /real_user_monitoring/mobile_and_tv_monitoring/supported_versions/
 - /real_user_monitoring/mobile_and_tv_monitoring/ios/supported_versions
further_reading:
 - link: /real_user_monitoring/application_monitoring/ios/advanced_configuration/
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
---


## Supported versions

The RUM iOS SDK supports the following iOS versions:

| Platform | Supported | Version | Notes |
|--------|-------------|---------|-------|
| iOS | {{< X >}} | 12+ | |
| tvOS | {{< X >}} | 12+ | |
| iPadOS | {{< X >}} | 12+ | |
| macOS (Designed for iPad) | {{< X >}} | 11+ | |
| macOS (Catalyst) | partially supported | 12+ | Catalyst is supported in build mode only, which means that macOS targets build, but functionalities for the SDK might not work for this target. |
| macOS | | 12+ | macOS is not officially supported by the Datadog SDK. Some features may not be fully functional. **Note**:  `DatadogRUM`, `DatadogSessionReplay`, and `DatadogObjc`, which heavily depend on `UIKit`, do not build on macOS. |
| visionOS | | 1.0+ | visionOS is not officially supported by the Datadog SDK. Some features may not be fully functional. |
| watchOS | | 7.0+ | watchOS is not officially supported by the Datadog SDK. Some features may not be fully functional. **Note**: only `DatadogLogs` and `DatadogTrace` can build on watchOS. |
| Linux | | n/a | |

## Supported platforms

### Xcode
The SDK is built using the most recent version of [Xcode][1], but is always backwards compatible with the [lowest supported Xcode version][2] for App Store submission.

### Dependency managers
We currently support integration of the SDK using the following dependency managers:

- [Swift Package Manager][3]
- [Cocoapods][4]
- [Carthage][5]

### Languages

| Language | Version |
|----------|---------|
| UIKit | 5.* |
| Objective-C | 2.0 |

### UI framework instrumentation

| Framework | Automatic | Manual |
|--------|-------|-------|
| UIKit | {{< X >}} | {{< X >}} |
| SwiftUI | {{< X >}} | {{< X >}} |

### Network compatibility

| Framework | Automatic | Manual |
|--------|-------|-------|
| URLSession | {{< X >}} | {{< X >}} |
| [Alamofire][6] | {{< X >}} | {{< X >}} |
| [Apollo GraphQL][7] | {{< X >}} | {{< X >}} |
| [SDWebImage][8] | {{< X >}} | {{< X >}} |
| [OpenAPI Generator][9] | {{< X >}} | {{< X >}} |
| SwiftNIO | | |

### Dependencies

The Datadog RUM SDK depends on the following third-party library:

- [KSCrash][10] 2.5.0

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.apple.com/xcode/
[2]: https://developer.apple.com/news/?id=fxu2qp7b
[3]: /real_user_monitoring/application_monitoring/ios/setup/?tab=swiftpackagemanagerspm#declare-the-sdk-as-a-dependency
[4]: /real_user_monitoring/application_monitoring/ios/setup/?tab=cocoapods#declare-the-sdk-as-a-dependency
[5]: /real_user_monitoring/application_monitoring/ios/setup/?tab=carthage#declare-the-sdk-as-a-dependency
[6]: /real_user_monitoring/application_monitoring/ios/integrated_libraries/#alamofire
[7]: /real_user_monitoring/application_monitoring/ios/integrated_libraries/#apollo-graphql
[8]: /real_user_monitoring/application_monitoring/ios/integrated_libraries#sdwebimage
[9]: /real_user_monitoring/application_monitoring/ios/integrated_libraries#openapi-generator
[10]: https://github.com/kstenerud/KSCrash
