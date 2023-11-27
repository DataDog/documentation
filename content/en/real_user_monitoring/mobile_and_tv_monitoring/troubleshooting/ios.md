---
title: Troubleshooting
kind: documentation
further_reading:
  - link: "https://github.com/DataDog/dd-sdk-ios"
    tag: "Github"
    text: "Source code for dd-sdk-ios"
  - link: "/real_user_monitoring"
    tag: "Documentation"
    text: "Datadog Real User Monitoring"
---

## Check if Datadog SDK is properly initialized

After you configure Datadog SDK and run the app for the first time, check your debugger console in Xcode. The SDK implements several consistency checks and outputs relevant warnings if something is misconfigured.

## Debugging
When writing your application, you can enable development logs by setting the `verbosityLevel` value. Relevant messages from the SDK with a priority equal to or higher than the provided level are output to the debugger console in Xcode:

```swift
Datadog.verbosityLevel = .debug
```

If all goes well you should see output similar to this saying that a batch of RUM data was properly uploaded:
```
[DATADOG SDK] 🐶 → 17:23:09.849 [DEBUG] ⏳ (rum) Uploading batch...
[DATADOG SDK] 🐶 → 17:23:10.972 [DEBUG]    → (rum) accepted, won't be retransmitted: success
```

**Recommendation:** Use `Datadog.verbosityLevel` in `DEBUG` configuration, and unset it in `RELEASE`.

## Using `DDURLSessionDelegate` with your own session delegate

If you want to [automatically track network requests][1] with `DDURLSessionDelegate` but your app already implements its own session delegate, you can use either _inheritance_ or _composition_ patterns and forward calls to `DDURLSessionDelegate`.

When using _inheritance_, use `DDURLSessionDelegate` as a base class for your custom delegate and make sure to call the `super` implementation from your overridden methods. For example:
```swift
class YourCustomDelegateURLSessionDelegate: DDURLSessionDelegate {
    override func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        super.urlSession(session, task: task, didCompleteWithError: error) // forward to Datadog delegate
        /* your custom logic */
    }
}
```

When using _composition_, leverage Datadog's `__URLSessionDelegateProviding` protocol to keep an internal instance of `DDURLSessionDelegate` and forward calls to `ddURLSessionDelegate`. For example:
```swift
private class YourCustomDelegateURLSessionDelegate: NSObject, URLSessionTaskDelegate, URLSessionDataDelegate, __URLSessionDelegateProviding {
    // MARK: - __URLSessionDelegateProviding conformance

    let ddURLSessionDelegate = DDURLSessionDelegate()

    // MARK: - __URLSessionDelegateProviding handling

    func urlSession(_ session: URLSession, task: URLSessionTask, didFinishCollecting metrics: URLSessionTaskMetrics) {
        ddURLSessionDelegate.urlSession(session, task: task, didFinishCollecting: metrics) // forward to Datadog delegate
        /* your custom logic */
    }

    func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        ddURLSessionDelegate.urlSession(session, task: task, didCompleteWithError: error) // forward to Datadog delegate
        /* your custom logic */
    }

    func urlSession(_ session: URLSession, dataTask: URLSessionDataTask, didReceive data: Data) {
        ddURLSessionDelegate.urlSession(session, dataTask: dataTask, didReceive: data) // forward to Datadog delegate
        /* your custom logic */
    }
}
```
**Note**: If using _composition_, `ddURLSessionDelegate` must receive all necessary calls listed in [`__URLSessionDelegateProviding` protocol comments][2]. Your delegate needs to:
* implement `URLSessionTaskDelegate` and forward:
  * [`urlSession(_:task:didFinishCollecting:)`][3]
  * [`urlSession(_:task:didCompleteWithError:)`][4]
* implement `URLSessionDataDelegate` and forward:
  * [`urlSession(_:dataTask:didReceive:)`][5]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/ios/advanced_configuration/?tab=swift#automatically-track-network-requests
[2]: https://github.com/DataDog/dd-sdk-ios/blob/56e972a6d3070279adbe01850f51cb8c0c929c52/DatadogInternal/Sources/NetworkInstrumentation/URLSession/DatadogURLSessionDelegate.swift#L14
[3]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1643148-urlsession
[4]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1411610-urlsession
[5]: https://developer.apple.com/documentation/foundation/urlsessiondatadelegate/1411528-urlsession
