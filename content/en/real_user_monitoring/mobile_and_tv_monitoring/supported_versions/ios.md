---
title: RUM iOS and tvOS Monitoring Supported Versions
kind: documentation
beta: true
description: "List of supported operating systems and platforms for the RUM iOS SDK."
aliases:
  - /real_user_monitoring/ios
  - /real_user_monitoring/ios/getting_started
code_lang: ios
type: multi-code-lang
code_lang_weight: 20
further_reading:
 - link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
   tag: Documentation
   text: RUM iOS Advanced Configuration
 - link: "https://github.com/DataDog/dd-sdk-ios"
   tag: "Github"
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
| iOS | {{< X >}} | 11+ | |
| tvOS | {{< X >}} | 11+ | |
| iPadOS | {{< X >}} | 11+ | |
| macOS (Designed for iPad) | {{< X >}} | 11+ | |
| macOS (Catalyst) | partially supported | 12+ | Catalyst is supported in build mode only, which means that macOS targets build, but functionalities for the SDK might not work for this target. |
| macOS | | 12+ | macOS is not officially supported by the Datadog SDK. Some features may not be fully functional. **Note**:  `DatadogRUM`, `DatadogSessionReplay`, and `DatadogObjc`, which heavily depend on `UIKit` do not build on macOS. |
| visionOS | | 1.0+ | visionOS is not officially supported by Datadog SDK. Some features may not be fully functional. **Note**: `DatadogCrashReporting` is not supported on visionOS due to a lack of support on the [PLCrashreporter][1] side. |
| watchOS | | n/a | |
| Linux | | n/a | |

## Supported platforms

### Xcode
The SDK is built using the most recent version of [Xcode][2], but is always backwards compatible with the [lowest supported Xcode version][3] for AppStore submission.

### Dependency managers
We currently support integration of the SDK using the following dependency managers:

- [Swift Package Manager][4]
- [Cocoapods][19]
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
| SwiftUI | | {{< X >}} |

### Network compatibility

| Framework | Automatic | Manual |
|--------|-------|-------|
| URLSession | {{< X >}} | {{< X >}} |
| [AlamoFire 5+][6] | | {{< X >}} |
| SwiftNIO | | | 

**Note**: Third-party networking libraries can be instrumented by implementing custom `DDURLSessionDelegate`.

### Dependencies

The Datadog RUM SDK depends on the following third-party library:

- [PLCrashReporter][7] 1.11.1

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/microsoft/plcrashreporter/issues/288
[2]: https://developer.apple.com/news/?id=jd9wcyov
[3]: /logs/log_collection/ios/?tab=swiftpackagemanagerspm
[4]: /logs/log_collection/ios/?tab=cocoapods
[5]: /logs/log_collection/ios/?tab=carthage
[6]: https://github.com/DataDog/dd-sdk-ios/tree/develop/DatadogExtensions/Alamofire
[7]: https://github.com/microsoft/plcrashreporter