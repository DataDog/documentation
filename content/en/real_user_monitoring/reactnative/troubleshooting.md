---
title: Troubleshooting
kind: documentation
further_reading:
  - link: "https://github.com/DataDog/dd-sdk-reactnative"
    tag: "Github"
    text: "Source code for dd-sdk-reactnative"
  - link: "/real_user_monitoring"
    tag: "Documentation"
    text: "Datadog Real User Monitoring"

---

If you experience unexpected behavior with Datadog React Native RUM, use this guide to resolve issues quickly. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## No data is being sent to Datadog

Follow these instructions in order when the SDK has been installed and the app compiles, but no data is received by Datadog.

### Check the configuration

Sometimes, no data is sent due to a small misstep in the configuration. 

Here are some common things to check for:

- Ensure your `clientToken` and `applicationId` are correct.
- Make sure you have not set `sessionSamplingRate` to something other than 100 (100 is the default value), or else your session might be sent.
- If you've set up a `Proxy` in the Datadog configuration, check that it has been correctly configured.
- Check that you are **tracking views** (all events must be attached to a view) and **sending events**.

### Review SDK logs in React Native

- Set `config.verbosity = SdkVerbosity.DEBUG`, which imports `SdkVerbosity` from `@datadog/mobile-react-native`.
- Logs start appearing in the JavaScript console, like the following output:

  ```
  INFO  DATADOG: Datadog SDK was initialized
  INFO  DATADOG: Datadog SDK is tracking interactions
  INFO  DATADOG: Datadog SDK is tracking XHR resources
  INFO  DATADOG: Datadog SDK is tracking errors
  DEBUG  DATADOG: Starting RUM View “Products” #Products-oaZlP_FVwGM5vtPoup_rT
  DEBUG  DATADOG: Adding RUM Action “RCTView” (TAP)
  ```

  **Note**: In this example, the first four logs indicate that the SDK has been correctly configured and the last two lines are events that were sent.

#### Possible cause

If you are on iOS and see some DEBUG logs indicating that logs or RUM events were sent **before** the initialization logs, this may be why the SDK is not sending events.

You cannot send events before initialization, and attempting to do so puts the SDK in a state where it cannot send any data.

#### Solution

With **`DdSdkReactNative.initialize`**:

If you use `DdSdkReactNative.initialize` to start the Datadog SDK, call this function in your top-level `index.js` file so that the SDK is initialized before your other events are sent.

With **`DatadogProvider`**:

Starting from SDK version `1.2.0`, you can initialize the SDK using the `DatadogProvider` component. This component includes a RUM events buffer that makes sure the SDK is initialized before sending any data to Datadog, which prevents this issue from happening.

To use it, see the [Migrate to the Datadog Provider guide][2].

### Review native logs

Reviewing native logs can give you more input on what could be going wrong.

#### On iOS

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

##### Possible cause

If you see the log below, it means that you have called a RUM method before initializing the SDK.

```
[DATADOG SDK] 🐶 → 10:09:13.621 [WARN] The `Global.rum` was called but no `RUMMonitor` is registered. Configure and register the RUM Monitor globally before invoking the feature:
```

##### Solution

With **`DdSdkReactNative.initialize`**:

If you use `DdSdkReactNative.initialize` to start the Datadog SDK, call this function in your top-level `index.js` file so the SDK is initialized before your other events are sent.

With **`DatadogProvider`**:

Starting from SDK version `1.2.0`, you can initialize the SDK using the `DatadogProvider` component. This component includes a RUM events buffer that makes sure the SDK is initialized before sending any data to Datadog, which prevents this issue from happening.

To use it, see the [Migrate to the Datadog Provider guide][2].

#### On Android

- For a better debugging experience, Datadog recommends installing [pidcat][3].
  - pidcat filters the device logs (obtained by `adb logcat`) to only show the one from your application.
  - See [this issue][4] for M1 users who don't have Python 2.
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

## Undefined symbols: Swift

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

## Undefined symbols: _RCTModule

If you see an undefined _RCTModule symbol, it may be related to this change in the [react-native v0.63 changelog][5].

You can make the following change to fix it:

```objectivec
// DdSdk.m
// instead of
#import <React/RCTBridgeModule.h>
// maybe that:
@import React // or @import React-Core
```

## Infinite loop-like error messages

If you run into an [issue where your React Native project displays a stream of error messages and significantly raises your CPU usage][5], try creating a new React Native project.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/docs/migrating_to_datadog_provider.md
[3]: https://github.com/JakeWharton/pidcat
[4]: https://github.com/JakeWharton/pidcat/issues/180#issuecomment-1124019329
[5]: https://github.com/facebook/react-native/commit/6e08f84719c47985e80123c72686d7a1c89b72ed
[6]: https://github.com/facebook/react-native/issues/28801
