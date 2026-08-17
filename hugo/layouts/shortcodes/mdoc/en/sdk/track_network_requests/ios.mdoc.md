### Automated resource collection

To automatically track network requests as RUM resources, enable `URLSessionInstrumentation` for the first-party hosts you want to trace:

```swift
URLSessionInstrumentation.enable(
    with: .init(
        delegateClass: DDURLSessionDelegate.self,
        firstPartyHostsTracing: .trace(hosts: ["example.com"], sampleRate: 20)
    )
)
```

To also collect a detailed network-timing breakdown for each resource, call `URLSessionInstrumentation.enableDurationBreakdown()` as well.

### Manual resource collection

To track a custom resource such as a request made outside `URLSession`, start and stop it around the load:

```swift
RUMMonitor.shared().startResource(
    resourceKey: "resource-key",
    request: request
)

RUMMonitor.shared().stopResource(
    resourceKey: "resource-key",
    response: response
)
```

If the request fails, use `stopResourceWithError` instead.

For custom resource attributes, header capture, and Apollo/GraphQL instrumentation, see [iOS Advanced Configuration][1].

[1]: /real_user_monitoring/application_monitoring/ios/advanced_configuration/#automatically-track-network-requests
