---
title: iOS and tvOS Libraries for RUM
aliases:
- /real_user_monitoring/ios/integrated_libraries/
- /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/ios/
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: "Source Code"
  text: Source code for dd-sdk-ios
- link: /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries
  tag: Documentation
  text: Integrated Libraries
---

This page lists integrated libraries you can use for iOS and tvOS applications.

## Alamofire

Starting from version `2.5.0`, the RUM iOS SDK can automatically track [Alamofire][1] requests.

1. Configure RUM monitoring by following the [Setup][2] guide.
2. Enable `URLSessionInstrumentation` for `Alamofire.SessionDelegate`:

```swift
import Alamofire
import DatadogRUM

URLSessionInstrumentation.enable(with: .init(delegateClass: Alamofire.SessionDelegate.self))
```
For additional information on sampling rate, distributed tracing, and adding custom attributes to tracked RUM resources, refer to [Advanced Configuration > Automatically track network requests][4].

## Apollo GraphQL

Starting from version `2.5.0`, the RUM iOS SDK can automatically track [Apollo GraphQL][3] requests.

1. Configure RUM monitoring by following the [Setup][2] guide.
2. Enable `URLSessionInstrumentation` for `Apollo.URLSessionClient`:

```swift
import Apollo
import DatadogRUM

URLSessionInstrumentation.enable(with: .init(delegateClass: Apollo.URLSessionClient.self))
```
For additional information on sampling rate, distributed tracing, and adding custom attributes to tracked RUM resources, refer to [Advanced Configuration > Automatically track network requests][4].

[1]: https://github.com/Alamofire/Alamofire
[2]: https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/ios/setup
[3]: https://github.com/apollographql/apollo-ios
[4]: /real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration/#automatically-track-network-requests
