---
title: Troubleshooting
kind: documentation
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: Source code for dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---

## Overview

If you experience unexpected behavior with Datadog RUM, use this guide to resolve issues quickly. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Android

### Check if Datadog RUM is initialized
Use the utility method `isInitialized` to check if the SDK is properly initialized:

```kotlin
if (Datadog.isInitialized()) {
    // your code here
}
```

### Debugging
When writing your application, you can enable development logs by calling the `setVerbosity` method. All internal messages in the library with a priority equal to or higher than the provided level are then logged to Android's Logcat:

```kotlin
Datadog.setVerbosity(Log.INFO)
```

### Set tracking consent (GDPR compliance)

To be compliant with the GDPR regulation, the SDK requires the tracking consent value at initialization.
Tracking consent can be one of the following values:

- `TrackingConsent.PENDING`: (Default) The SDK starts collecting and batching the data but does not send it to the
 collection endpoint. The SDK waits for the new tracking consent value to decide what to do with the batched data.
- `TrackingConsent.GRANTED`: The SDK starts collecting the data and sends it to the data collection endpoint.
- `TrackingConsent.NOT_GRANTED`: The SDK does not collect any data. You are not able to manually send any logs, traces, or
 RUM events.

To update the tracking consent after the SDK is initialized, call `Datadog.setTrackingConsent(<NEW CONSENT>)`. The SDK changes its behavior according to the new consent. For example, if the current tracking consent is `TrackingConsent.PENDING` and you update it to:

- `TrackingConsent.GRANTED`: The SDK sends all current batched data and future data directly to the data collection endpoint.
- `TrackingConsent.NOT_GRANTED`: The SDK wipes all batched data and does not collect any future data.

### Sending data when device is offline

RUM ensures availability of data when your user device is offline. In cases of low-network areas, or when the device battery is too low, all the RUM events are first stored on the local device in batches. 

Each batch follows the intake specification. They are sent as soon as the network is available, and the battery is high enough to ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.
 
This means that even if users open your application while offline, no data is lost. To ensure the SDK does not use too much disk space, the data on the disk is automatically discarded if it gets too old.

### Migrating to 2.0.0

If you've been using the SDK v1, there are some breaking changes introduced in version `2.0.0`. See the [migration guide][2] for more information.

## iOS

### Check if Datadog SDK is properly initialized

After you configure Datadog SDK and run the app for the first time, check your debugger console in Xcode. The SDK implements several consistency checks and outputs relevant warnings if something is misconfigured.

### Debugging
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

### Using `DDURLSessionDelegate` with your own session delegate

If you want to [automatically track network requests][3] with `DDURLSessionDelegate` but your app already implements its own session delegate, you can use either _inheritance_ or _composition_ patterns and forward calls to `DDURLSessionDelegate`.

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
**Note**: If using _composition_, `ddURLSessionDelegate` must receive all necessary calls listed in [`__URLSessionDelegateProviding` protocol comments][4]. Your delegate needs to:
* implement `URLSessionTaskDelegate` and forward:
  * [`urlSession(_:task:didFinishCollecting:)`][5]
  * [`urlSession(_:task:didCompleteWithError:)`][6]
* implement `URLSessionDataDelegate` and forward:
  * [`urlSession(_:dataTask:didReceive:)`][7]

## Flutter

### Cocoapods issues

If you have trouble building your iOS application after adding the Datadog SDK because of errors being thrown by Cocoapods, check which error you are getting. The most common error is an issue getting the most up-to-date native library from Cocoapods, which can be solved by running the following in your `ios` directory:

```bash
pod install --repo-update
```

Another common error is an issue loading the FFI library on Apple Silicon Macs. If you see an error similar to the following:

```bash
LoadError - dlsym(0x7fbbeb6837d0, Init_ffi_c): symbol not found - /Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi_c.bundle
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:6:in `rescue in <top (required)>'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:3:in `<top (required)>'
```

Follow the instructions in the [Flutter documentation][8] for working with Flutter on Apple Silicon.

### Set sdkVerbosity

If you're able to run your app, but you are not seeing the data you expect on the Datadog site, try adding the following to your code before calling `DatadogSdk.initialize`:

```dart
DatadogSdk.instance.sdkVerbosity = Verbosity.verbose;
```

This causes the SDK to output additional information about what it's doing and what errors it's encountering, which may help you and Datadog Support narrow down your issue.

### Not seeing Errors

If you do not see any errors in RUM, it's likely no view has been started. Make sure you have started a view with `DatadogSdk.instance.rum?.startView` or, if you are using `DatadogRouteObserver` make sure your current Route has a name.

### Issues with automatic resource tracking and distributed tracing

The [Datadog tracking HTTP client][9] package works with most common Flutter networking packages that rely on `dart:io`, including [`http`][10] and [`Dio`][11].

If you are seeing resources in your RUM Sessions, then the tracking HTTP client is working, but other steps may be required to use distributed tracing.

By default, the Datadog RUM Flutter SDK samples distributed traces at only 20% of resource requests. While determining if there is an issue with your setup, you should set this value to 100% of traces by modifying your initialization with the following lines:
```dart
final configuration = DdSdkConfiguration(
   //
   rumConfiguration: RumConfiguration(
    applicationId: '<RUM_APPLICATION_ID>',
    tracingSamplingRate: 100.0
   ),
);
```

If you are still having issues, check that your `firstPartyHosts` property is set correctly. These should be hosts only, without schemas or paths, and they do not support regular expressions or wildcards. For example:
    
    ✅ Good - 'example.com', 'api.example.com', 'us1.api.sample.com'
    ❌ Bad - 'https://example.com', '*.example.com', 'us1.sample.com/api/*', 'api.sample.com/api'

## React Native

### No data is being sent to Datadog

Follow these instructions in order when the SDK has been installed and the app compiles, but no data is received by Datadog.

#### 1. Check the configuration

Sometimes, no data is sent due to a small misstep in the configuration. 

Here are some common things to check for:

- Ensure your `clientToken` and `applicationId` are correct.
- Make sure you have not set `sessionSamplingRate` to something other than 100 (100 is the default value), or else your session might be sent.
- If you've set up a `Proxy` in the Datadog configuration, check that it has been correctly configured.
- Check that you are **tracking views** (all events must be attached to a view) and **sending events**.

#### 2. Review SDK logs in React Native

- Set `config.verbosity = SdkVerbosity.DEBUG`, which imports `SdkVerbosity` from `@datadog/mobile-react-native`.
- Logs start appearing in the JavaScript console, like the following output:

  ```
  INFO  DATADOG: Datadog SDK was initialized
  INFO  DATADOG: Datadog SDK is tracking interactions
  INFO  DATADOG: Datadog SDK is tracking XHR resources
  INFO  DATADOG: Datadog SDK is tracking errors
  DEBUG  DATADOG: Starting RUM View "Products" #Products-oaZlP_FVwGM5vtPoup_rT
  DEBUG  DATADOG: Adding RUM Action "RCTView" (TAP)
  ```

  **Note**: In this example, the first four logs indicate that the SDK has been correctly configured and the last two lines are events that were sent.

##### Possible cause

If you are on iOS and see some DEBUG logs indicating that logs or RUM events were sent **before** the initialization logs, this may be why the SDK is not sending events.

You cannot send events before initialization, and attempting to do so puts the SDK in a state where it cannot send any data.

##### Solution

With **`DdSdkReactNative.initialize`**:

If you use `DdSdkReactNative.initialize` to start the Datadog SDK, call this function in your top-level `index.js` file so that the SDK is initialized before your other events are sent.

With **`DatadogProvider`**:

Starting from SDK version `1.2.0`, you can initialize the SDK using the `DatadogProvider` component. This component includes a RUM events buffer that makes sure the SDK is initialized before sending any data to Datadog, which prevents this issue from happening.

To use it, see the [Migrate to the Datadog Provider guide][12].

#### 3. Review native logs

Reviewing native logs can give you more input on what could be going wrong.

##### On iOS

- Open your project in Xcode by running `xed ios`.
- Build your project for a simulator or a device.
- Native logs start appearing on the bottom right corner:

  {{< img src="real_user_monitoring/react_native/troubleshooting-xcode-logs.png" alt="Reviewing native logs can help you figure out why no data is being sent" >}}

You can filter logs by "DATADOG" and look for any error.

If you are indeed sending events, you should see the following logs:

```
[DATADOG SDK] 🐶 → 10:02:47.398 [DEBUG] ⏳ (rum) Uploading batch...
[DATADOG SDK] 🐶 → 10:02:47.538 [DEBUG]    → (rum) accepted, won't be retransmitted: [response code: 202 (accepted), request ID: AAAABBBB-1111-2222-3333-777788883333]
```

The first log indicates that some data is being sent, and the second log indicates that the data has been received.

###### Possible cause

If you see the log below, it means that you have called a RUM method before initializing the SDK.

```
[DATADOG SDK] 🐶 → 10:09:13.621 [WARN] The `Global.rum` was called but no `RUMMonitor` is registered. Configure and register the RUM Monitor globally before invoking the feature:
```

###### Solution

With **`DdSdkReactNative.initialize`**:

If you use `DdSdkReactNative.initialize` to start the Datadog SDK, call this function in your top-level `index.js` file so the SDK is initialized before your other events are sent.

With **`DatadogProvider`**:

Starting from SDK version `1.2.0`, you can initialize the SDK using the `DatadogProvider` component. This component includes a RUM events buffer that makes sure the SDK is initialized before sending any data to Datadog, which prevents this issue from happening.

To use it, see the [Migrate to the Datadog Provider guide][12].

##### On Android

- For a better debugging experience, Datadog recommends installing [pidcat][13].
  - pidcat filters the device logs (obtained by `adb logcat`) to only show the one from your application.
  - See [this issue][14] for M1 users who don't have Python 2.
- Modify `node_modules/@datadog/mobile-react-native/android/src/main/kotlin/com/datadog/reactnative/DdSdk.kt` to enable verbose logging from the native SDK:

  ```java
  fun initialize(configuration: ReadableMap, promise: Promise) {
      // ...

      datadog.initialize(appContext, credentials, nativeConfiguration, trackingConsent)
      datadog.setVerbosity(Log.VERBOSE) // Add this line

      // ...
  }
  ```

- Run the app on a phone connected in debug mode to your laptop (should appear when running `adb devices`), or from an emulator.
- Run pidcat `my.app.package.name` or `adb logcat` from your laptop.
- Look for any error mentioning Datadog.

Pidcat output looks like this:

{{< img src="real_user_monitoring/react_native/troubleshooting-pidcat-logs.png" alt="This is an example of a pidcat output" >}}

In this example, the last log indicates that the batch of RUM data was sent successfully.

### Undefined symbols: Swift

If you see the following error message:

```
Undefined symbols for architecture x86_64:
  "static Foundation.JSONEncoder.OutputFormatting.withoutEscapingSlashes.getter : Foundation.JSONEncoder.OutputFormatting", referenced from:
      static (extension in Datadog):Foundation.JSONEncoder.default() -> Foundation.JSONEncoder in libDatadogSDK.a(JSONEncoder.o)
...
```

Open Xcode, go to the `Build Settings` of your project (not your app target), and make sure Library Search Paths have the following settings:

```shell
LIBRARY_SEARCH_PATHS = (
  "\"$(TOOLCHAIN_DIR)/usr/lib/swift/$(PLATFORM_NAME)\"",
  "\"/usr/lib/swift\"",
  "\"$(inherited)\"",
);
```

### Undefined symbols: _RCTModule

If you see an undefined _RCTModule symbol, it may be related to this change in the [react-native v0.63 changelog][15].

You can make the following change to fix it:

```objectivec
// DdSdk.m
// instead of
#import <React/RCTBridgeModule.h>
// maybe that:
@import React // or @import React-Core
```

### Infinite loop-like error messages

If you run into an [issue where your React Native project displays a stream of error messages and significantly raises your CPU usage][15], try creating a new React Native project.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://github.com/DataDog/dd-sdk-android/blob/develop/MIGRATION.MD
[3]: /real_user_monitoring/ios/advanced_configuration/?tab=swift#automatically-track-network-requests
[4]: https://github.com/DataDog/dd-sdk-ios/blob/master/Sources/Datadog/URLSessionAutoInstrumentation/DDURLSessionDelegate.swift#L12
[5]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1643148-urlsession
[6]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1411610-urlsession
[7]: https://developer.apple.com/documentation/foundation/urlsessiondatadelegate/1411528-urlsession
[8]: https://github.com/flutter/flutter/wiki/Developing-with-Flutter-on-Apple-Silicon
[9]: https://pub.dev/packages/datadog_tracking_http_client
[10]: https://pub.dev/packages/http
[11]: https://pub.dev/packages/dio
[12]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/docs/migrating_to_datadog_provider.md
[13]: https://github.com/JakeWharton/pidcat
[14]: https://github.com/JakeWharton/pidcat/issues/180#issuecomment-1124019329
[15]: https://github.com/facebook/react-native/commit/6e08f84719c47985e80123c72686d7a1c89b72ed
[16]: https://github.com/facebook/react-native/issues/28801