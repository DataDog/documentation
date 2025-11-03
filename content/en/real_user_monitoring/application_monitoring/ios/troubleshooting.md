---
title: Troubleshooting iOS SDK issues
description: Learn how to troubleshoot issues with iOS Monitoring.
aliases:
  - /real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/ios/
  - /real_user_monitoring/mobile_and_tv_monitoring/ios/troubleshooting
further_reading:
  - link: "https://github.com/DataDog/dd-sdk-ios"
    tag: "Source Code"
    text: "Source code for dd-sdk-ios"
  - link: "/real_user_monitoring"
    tag: "Documentation"
    text: "Datadog Real User Monitoring"
---

## Overview

If you experience unexpected behavior with Datadog RUM, use this guide to resolve issues quickly. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Check if Datadog SDK is properly initialized

After you configure Datadog SDK and run the app for the first time, check your debugger console in Xcode. The SDK implements several consistency checks and outputs relevant warnings if something is misconfigured.

## Debugging
When writing your application, you can enable development logs by setting the `verbosityLevel` value. Relevant messages from the SDK with a priority equal to or higher than the provided level are output to the debugger console in Xcode:

```swift
Datadog.verbosityLevel = .debug
```

You should then see an output similar to the below, indicating that a batch of RUM data was properly uploaded:
```
[DATADOG SDK] 🐶 → 17:23:09.849 [DEBUG] ⏳ (rum) Uploading batch...
[DATADOG SDK] 🐶 → 17:23:10.972 [DEBUG]    → (rum) accepted, won't be retransmitted: success
```

**Recommendation:** Use `Datadog.verbosityLevel` in the `DEBUG` configuration, and unset it in `RELEASE`.

## "Deobfuscation failed" warning

A warning appears when deobfuscation fails for a stack trace. If the stack trace is not deobfuscated to begin with, you can ignore this warning. Otherwise, use the [RUM Debug Symbols page][4] to view all your uploaded dSYMs. See [Investigate Obfuscated Stack Traces with RUM Debug Symbols][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: /real_user_monitoring/application_monitoring/ios/advanced_configuration/?tab=swift#automatically-track-network-requests
[3]: https://github.com/DataDog/dd-sdk-ios/blob/56e972a6d3070279adbe01850f51cb8c0c929c52/DatadogInternal/Sources/NetworkInstrumentation/URLSession/DatadogURLSessionDelegate.swift#L14
[4]: https://app.datadoghq.com/source-code/setup/rum
[5]: /real_user_monitoring/guide/debug-symbols
