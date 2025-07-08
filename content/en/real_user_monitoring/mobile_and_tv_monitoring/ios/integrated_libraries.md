---
title: iOS and tvOS Libraries for RUM
aliases:
- /real_user_monitoring/ios/integrated_libraries/
- /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/ios/
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: "Source Code"
  text: Source code for dd-sdk-ios
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

## SDWebImage

Starting from version `2.5.0`, the RUM iOS SDK can automatically track [SDWebImage][5] requests.

1. Configure RUM monitoring by following the [Setup][2] guide.
2. Enable `URLSessionInstrumentation` for `SDWebImageDownloader`:

```swift
import SDWebImage
import DatadogRUM

URLSessionInstrumentation.enable(with: .init(delegateClass: SDWebImageDownloader.self as! URLSessionDataDelegate.Type))
```
For additional information on sampling rate, distributed tracing, and adding custom attributes to tracked RUM resources, see [Advanced Configuration > Automatically track network requests][4].

## OpenAPI Generator

Starting from version `2.5.0`, the RUM iOS SDK can automatically track [OpenAPI Generator][6] requests.

1. Configure RUM monitoring by following the [Setup][2] guide.
2. Create a dummy `URLSessionDataDelegate`.
3. Enable `URLSessionInstrumentation` for `EmptySessionDelegate`.
4. Configure `URLSession` with your dummy `URLSessionDataDelegate`.
5. Create an OpenAPI client with `.buffered` processing mode.

```swift
import DatadogRUM
import OpenAPIRuntime
import OpenAPIURLSession

// Dummy delegate
class EmptySessionDelegate: NSObject, URLSessionDataDelegate {}

// Create `URLSession` with your delegate
let delegate = EmptySessionDelegate()
let urlSession = URLSession(configuration: .default, delegate: delegate, delegateQueue: nil)

// Enable instrumentation for your delegate class
URLSessionInstrumentation.enable(with: .init(delegateClass: EmptySessionDelegate.self))

// Create transport with `.buffered` processing mode (required for proper instrumentation)
let transport = URLSessionTransport(configuration: .init(
    session: urlSession,
    httpBodyProcessingMode: .buffered
))

// Create the OpenAPI client
bufferedClient = Client(
    serverURL: try! Servers.Server1.url(),
    transport: transport
)
```
For additional information on sampling rate, distributed tracing, and adding custom attributes to tracked RUM resources, see [Advanced Configuration > Automatically track network requests][4].

[1]: https://github.com/Alamofire/Alamofire
[2]: https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/ios/setup
[3]: https://github.com/apollographql/apollo-ios
[4]: /real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration/#automatically-track-network-requests
[5]: https://github.com/SDWebImage/SDWebImage
[6]: https://github.com/OpenAPITools/openapi-generator
