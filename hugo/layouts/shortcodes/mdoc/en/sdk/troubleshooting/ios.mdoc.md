<!--
This partial contains troubleshooting content for the iOS SDK.
It can be included in the iOS SDK troubleshooting page or in the unified client_sdks view.
-->

## Overview

If you experience unexpected behavior with Datadog RUM, use this guide to resolve issues. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Check if Datadog SDK is properly initialized

After you configure Datadog SDK and run the app for the first time, check your debugger console in Xcode. The SDK implements several consistency checks and outputs relevant warnings if something is misconfigured.

## Debugging
When writing your application, you can enable development logs by setting the `verbosityLevel` value. Relevant messages from the SDK with a priority equal to or higher than the provided level are output to the debugger console in Xcode:

```swift
Datadog.verbosityLevel = .debug
```

You should then see output similar to the following, indicating that a batch of RUM data was properly uploaded:
```
[DATADOG SDK] 🐶 → 17:23:09.849 [DEBUG] ⏳ (rum) Uploading batch...
[DATADOG SDK] 🐶 → 17:23:10.972 [DEBUG]    → (rum) accepted, won't be retransmitted: success
```

**Recommendation:** Use `Datadog.verbosityLevel` in the `DEBUG` configuration, and unset it in `RELEASE`.

## macOS

### Build errors with iOS-only options

Some options, such as `uiKitViewsPredicate`, `trackBackgroundEvents`, and `trackWatchdogTerminations`, do not exist on macOS. If code that builds for both iOS and macOS uses them, the macOS build fails. Set these options as properties in an `#if !os(macOS)` block instead of passing them to the `RUM.Configuration` initializer, because Swift does not allow `#if` inside an argument list. Use `appKitViewsPredicate` and `macOSActionsPredicate` for macOS. For the full list, see [macOS support][2].

### No data is uploaded from a sandboxed app

Apps that use the App Sandbox need the `com.apple.security.network.client` entitlement (Outgoing Connections (Client) in Xcode) to send data to Datadog. Without it, uploads fail.

## "Deobfuscation failed" warning

A warning appears when deobfuscation fails for a stack trace. If the stack trace is not obfuscated to begin with, you can ignore this warning. Otherwise, use the [RUM Debug Symbols page][4] to view all your uploaded dSYMs. See [Investigate Obfuscated Stack Traces with RUM Debug Symbols][5].

[1]: /help
[2]: /real_user_monitoring/setup/install/?platform=ios#macos-support
[4]: https://app.datadoghq.com/source-code/setup/rum
[5]: /real_user_monitoring/guide/debug-symbols
