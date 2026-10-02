## Automatically track network requests

Network requests are automatically tracked after you enable RUM with the `urlSessionTracking` configuration.

### (Optional) Enable detailed timing breakdown

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
- `URLSessionInstrumentation` requires access to a `URLSession` delegate class. For third-party libraries that don't expose a session delegate, [manually track network requests](#manually-track-network-requests).
- Without `URLSessionInstrumentation`, network requests are still tracked. Enabling it provides detailed timing breakdown for performance analysis.
- In registered-delegate mode (`URLSessionInstrumentation.enableDurationBreakdown`), the `data` parameter passed to `resourceAttributesProvider` is subject to constraints. See below for full details.
- To exclude URLs from tracking, use `disallowList` (see [Exclude URLs from RUM Resource tracking](#exclude-urls-from-rum-resource-tracking)). To modify or drop resource events with custom logic, use `resourceEventMapper` (see [Modify or Drop RUM Events](/real_user_monitoring/enrich_rum_data/modify_or_drop_rum_events/?platform=ios)).
- When a resource is served from the device's local cache, it is reported with `resource.local_cache_hit: true` (see [Resource attributes](/real_user_monitoring/setup/data_collected/?platform=ios#resource-attributes)). This signal is available only in registered-delegate instrumentation mode, not when using automatic instrumentation with completion-handler swizzling.

{% alert level="info" %}
Be mindful of delegate retention.
While Datadog instrumentation does not create memory leaks directly, it relies on `URLSession` delegates. According to [Apple documentation](https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters):
"The session object keeps a strong reference to the delegate until your app exits or explicitly invalidates the session. If you do not invalidate the session by calling the `invalidateAndCancel()` or `finishTasksAndInvalidate()` method, your app leaks memory until it exits."
To avoid memory leaks, make sure to invalidate any `URLSession` instances you no longer need.
{% /alert %}

If you have more than one delegate type in your app that you want to instrument, you can call `URLSessionInstrumentation.enable(with:)` for each delegate type.

Also, you can configure first party hosts using `urlSessionTracking`. This classifies resources that match the given domain as "first party" in RUM and propagates tracing information to your backend (if you have enabled Tracing). Network traces are sampled with an adjustable sampling rate. A sampling of 20% is applied by default.

Each entry accepts a plain hostname (for example, `"example.com"`) or a wildcard pattern with a single `*` (for example, `"*.example.com"` or `"preview-*.example.com"`). Invalid entries are dropped with a warning.

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

This tracks all requests sent with the instrumented `session`. Requests matching the `example.com` domain are marked as "first party" and tracing information is sent to your backend to [connect the RUM resource with its Trace](/real_user_monitoring/enrich_rum_data/track_frontend_to_backend_traces/?platform=ios).
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

**Note**: `data` can be `nil` for reasons unrelated to response size, such as tasks without a completion handler (for example, async/await) or download tasks. In registered-delegate mode (when using `URLSessionInstrumentation.enableDurationBreakdown`), `data` is additionally `nil` in these cases:
- Media responses (`image/*`, `video/*`, `audio/*`, `application/octet-stream`): the body is never buffered.
- Responses of other types whose body exceeds 512 KB—the buffered data is discarded entirely, not truncated.

### Capture resource headers

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

### Exclude URLs from RUM Resource tracking

When [tracking network requests automatically](#automatically-track-network-requests), you can exclude specific URLs from RUM Resource tracking by setting `disallowList` on `RUM.Configuration.URLSessionTracking`. Use this parameter to exclude noisy or low-value endpoints, such as health checks or polling requests.

The SDK matches each pattern against the full request URL, including the query string. A pattern with no `*` must match the URL exactly. A pattern can include one or more `*` wildcards. Each `*` matches any sequence of characters, including `/`, so a pattern is not limited to a single path segment.

```swift
RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        disallowList: ["https://api.example.com/health", "https://example.com/api/*/status"]
    )
  )
)
```

**Note**: The SDK does not create a RUM Resource for a URL that matches a pattern in `disallowList`. It also does not reconstruct an APM span from that resource. If a URL matches both `disallowList` and `firstPartyHostsTracing`, `disallowList` takes precedence.

### Apollo instrumentation

Instrumenting Apollo in your iOS application gives RUM visibility into GraphQL errors and performance. Because GraphQL requests all go to a single endpoint and often return 200 OK even on errors, default HTTP instrumentation lacks context. It lets RUM capture the operation name, operation type, and variables (and optionally the payload). This provides more detailed context for each network request.

This integration supports both Apollo iOS 1.0+ and Apollo iOS 2.0+. Follow the instructions for the Apollo iOS version you have below.

1. [Set up](/real_user_monitoring/setup/install/?platform=ios) RUM monitoring with Datadog iOS RUM.

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

## Manually track network requests

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

For more details and available options, see [`RUMMonitorProtocol` in GitHub][1].

For the attributes collected, see [Data Collected](/real_user_monitoring/setup/data_collected/?platform=ios#resource-attributes).

[1]: https://github.com/DataDog/dd-sdk-ios/blob/master/DatadogRUM/Sources/RUMMonitorProtocol.swift
