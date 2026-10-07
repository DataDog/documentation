### Custom resources

In addition to [tracking resources automatically](#automatically-track-network-requests), you can also track specific custom resources such as network requests or third-party provider APIs. This is the recommended approach for third-party libraries that don't expose a `URLSession` delegate. Use the following methods on `RUMMonitor.shared()` to manually collect RUM resources:

- `.startResource(resourceKey:request:)`
- `.stopResource(resourceKey:response:)`
- `.stopResourceWithError(resourceKey:error:)`
- `.stopResourceWithError(resourceKey:message:)`

For example:

{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogRUM

// in your network client:

let rum = RUMMonitor.shared()

rum.startResource(
    resourceKey: "resource-key",
    request: request
)

rum.stopResource(
    resourceKey: "resource-key",
    response: response
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
// in your network client:

[[DDRUMMonitor shared] startResourceWithResourceKey:@"resource-key"
                                            request:request
                                         attributes:@{}];

[[DDRUMMonitor shared] stopResourceWithResourceKey:@"resource-key"
                                          response:response
                                        attributes:@{}];
```

{% /tab %}
{% /tabs %}

**Note**: The `String` used for `resourceKey` in both calls must be unique for the resource you are calling. This is necessary for the RUM iOS SDK to match a resource's start with its completion.

For more details and available options, see [`RUMMonitorProtocol` in GitHub][4].

### Automatically track network requests

Network requests are automatically tracked after you enable RUM with the `urlSessionTracking` configuration.

#### (Optional) Enable detailed timing breakdown

To get detailed timing breakdown (DNS resolution, SSL handshake, time to first byte, connection time, and download duration), enable `URLSessionInstrumentation` for your delegate type:

{% tabs %}
{% tab label="Swift" %}

```swift
URLSessionInstrumentation.enableDurationBreakdown(
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

**Notes**:
- Without `URLSessionInstrumentation`, network requests are still tracked. Enabling it provides detailed timing breakdown for performance analysis.
- Response data is available in the `resourceAttributesProvider` callback (set in `RUM.Configuration.URLSessionTracking`) for tasks with completion handlers in automatic mode, and for all tasks after enabling `URLSessionInstrumentation`.
- To filter out specific requests from being tracked, use the `resourceEventMapper` in `RUM.Configuration` (see [Modify or drop RUM events](#modify-or-drop-rum-events)).

{% alert level="info" %}
Be mindful of delegate retention.
While Datadog instrumentation does not create memory leaks directly, it relies on `URLSession` delegates. According to [Apple documentation](https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters):
"The session object keeps a strong reference to the delegate until your app exits or explicitly invalidates the session. If you do not invalidate the session by calling the `invalidateAndCancel()` or `finishTasksAndInvalidate()` method, your app leaks memory until it exits."
To avoid memory leaks, make sure to invalidate any `URLSession` instances you no longer need.
{% /alert %}

If you have more than one delegate type in your app that you want to instrument, you can call `URLSessionInstrumentation.enable(with:)` for each delegate type.

Also, you can configure first party hosts using `urlSessionTracking`. This classifies resources that match the given domain as "first party" in RUM and propagates tracing information to your backend (if you have enabled Tracing). Network traces are sampled with an adjustable sampling rate. A sampling of 20% is applied by default.

For instance, you can configure `example.com` as the first party host and enable both RUM and Tracing features:

{% tabs %}
{% tab label="Swift" %}

```swift

import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    uiKitViewsPredicate: DefaultUIKitRUMViewsPredicate(),
    uiKitActionsPredicate: DefaultUIKitRUMActionsPredicate(),
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        firstPartyHostsTracing: .trace(hosts: ["example.com"], sampleRate: 20)
    )
  )
)

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

This tracks all requests sent with the instrumented `session`. Requests matching the `example.com` domain are marked as "first party" and tracing information is sent to your backend to [connect the RUM resource with its Trace](https://docs.datadoghq.com/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum).
{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogRUM;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
DDRUMURLSessionTracking *urlSessionTracking = [DDRUMURLSessionTracking new];
[urlSessionTracking setFirstPartyHostsTracing:[DDRUMFirstPartyHostsTracing alloc] initWithHosts:@[@"example.com"] sampleRate:20];
[configuration setURLSessionTracking:urlSessionTracking];

[DDRUM enableWith:configuration];
```

{% /tab %}
{% /tabs %}

To add custom attributes to resources, use the `URLSessionTracking.resourceAttributesProvider` option when enabling the RUM. By setting attributes provider closure, you can return additional attributes to be attached to tracked resource.

For instance, you may want to add HTTP request and response headers to the RUM resource:

```swift
RUM.enable(
  with: RUM.Configuration(
    ...
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        resourceAttributesProvider: { request, response, data, error in
            return [
                "request.headers" : redactedHeaders(from: request),
                "response.headers" : redactedHeaders(from: response)
            ]
        }
    )
  )
)
```

#### Capture resource headers

When [tracking network requests automatically](#automatically-track-network-requests), you can capture HTTP request and response headers on RUM Resources by setting `trackResourceHeaders` on `RUM.Configuration.URLSessionTracking`. This option is disabled by default.

Captured headers appear on the RUM Resource event under `resource.request.headers` and `resource.response.headers` and are queryable in the RUM Explorer.

Use `.defaults` to capture a predefined set of common headers:

```swift
RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        trackResourceHeaders: .defaults
    )
  )
)
```

The following headers are captured with `.defaults`:

| Direction | Headers |
|-----------|---------|
| Request | `cache-control`, `content-type` |
| Response | `age`, `cache-control`, `content-encoding`, `content-length`, `content-type`, `etag`, `expires`, `server-timing`, `vary`, `x-cache` |

To capture additional headers on top of the defaults, use `.custom` with `.matchHeaders`. For example, to also capture `x-request-id` and `x-datadog-trace` on both request and response:

```swift
RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        trackResourceHeaders: .custom([
            .defaults,
            .matchHeaders(["x-request-id", "x-datadog-trace"])
        ])
    )
  )
)
```

**Note**: Sensitive headers (such as tokens, API keys, and cookies) are filtered out automatically, even if listed explicitly.

If you don't want to track requests, you can disable URLSessionInstrumentation for the delegate type:

{% tabs %}
{% tab label="Swift" %}

```swift
URLSessionInstrumentation.disable(delegateClass: <YourSessionDelegate>.self)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
[DDURLSessionInstrumentation disableWithDelegateClass:[<YourSessionDelegate> class]];
```

{% /tab %}
{% /tabs %}

#### Apollo instrumentation

Instrumenting Apollo in your iOS application gives RUM visibility into GraphQL errors and performance. Because GraphQL requests all go to a single endpoint and often return 200 OK even on errors, default HTTP instrumentation lacks context. It lets RUM capture the operation name, operation type, and variables (and optionally the payload). This provides more detailed context for each network request.

This integration supports both Apollo iOS 1.0+ and Apollo iOS 2.0+. Follow the instructions for the Apollo iOS version you have below.

1. [Set up][2] RUM monitoring with Datadog iOS RUM.

2. Add the following to your application's `Package.swift` file:

   ```swift
   dependencies: [
       // For Apollo iOS 1.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "1.0.0"))

       // For Apollo iOS 2.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "2.0.0"))
   ]
   ```

   Alternatively, you can add it using Xcode:
   1. Go to **File** → **Add Package Dependencies**.
   2. Enter the repository URL: `https://github.com/DataDog/dd-sdk-ios-apollo-interceptor`.
   3. Select the package version that matches your Apollo major version (choose `1.x.x` for Apollo iOS 1.0+ or `2.x.x` for Apollo iOS 2.0+).

3. Set up network instrumentation based on your Apollo iOS version:

{% tabs %}
{% tab label="Apollo iOS 1.0+" %}
Set up network instrumentation for Apollo's built-in URLSessionClient:

```swift
import Apollo

URLSessionInstrumentation.enable(with: .init(delegateClass: URLSessionClient.self))
```

Add the Datadog interceptor to your Apollo Client setup:

```swift
import Apollo
import DatadogApollo

class CustomInterceptorProvider: DefaultInterceptorProvider {
    override func interceptors<Operation: GraphQLOperation>(for operation: Operation) -> [ApolloInterceptor] {
        var interceptors = super.interceptors(for: operation)
        interceptors.insert(DatadogApolloInterceptor(), at: 0)
        return interceptors
    }
}
```

{% /tab %}
{% tab label="Apollo iOS 2.0+" %}
Configure network instrumentation using the provided `DatadogApolloDelegate` and `DatadogApolloURLSession`:

```swift
import Apollo
import DatadogApollo
import DatadogCore

// Create the Datadog delegate
let delegate = DatadogApolloDelegate()

// Create the custom URLSession wrapper
let customSession = DatadogApolloURLSession(
    configuration: .default,
    delegate: delegate
)

// Enable Datadog instrumentation for the delegate
URLSessionInstrumentation.enable(
    with: .init(delegateClass: DatadogApolloDelegate.self)
)

// Configure Apollo Client with the custom session
let networkTransport = RequestChainNetworkTransport(
    urlSession: customSession,
    interceptorProvider: NetworkInterceptorProvider(),
    store: store,
    endpointURL: url
)
```

Create an interceptor provider with the Datadog interceptor:

```swift
import Apollo
import DatadogApollo

struct NetworkInterceptorProvider: InterceptorProvider {
    func graphQLInterceptors<Operation>(for operation: Operation) -> [any GraphQLInterceptor] where Operation : GraphQLOperation {
        return [DatadogApolloInterceptor()] + DefaultInterceptorProvider.shared.graphQLInterceptors(for: operation)
    }
}
```

{% /tab %}
{% /tabs %}

This lets Datadog RUM extract the operation type, name, variables, and payloads (optional) automatically from the requests to enrich GraphQL Requests RUM Resources.

{% alert level="info" %}
- The integration supports Apollo iOS versions `1.0+` and `2.0+`.
- The `query` and `mutation` type operations are tracked; `subscription` operations are not.
- GraphQL payload sending is disabled by default. To enable it, set the `sendGraphQLPayloads` flag in the `DatadogApolloInterceptor` constructor as follows:

  ```swift
  let datadogInterceptor = DatadogApolloInterceptor(sendGraphQLPayloads: true)
  ```
  
{% /alert %}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/ios
[4]: https://github.com/DataDog/dd-sdk-ios/blob/master/DatadogRUM/Sources/RUMMonitorProtocol.swift
