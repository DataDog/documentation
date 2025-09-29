---
title: Troubleshooting Android SDK issues
description: Learn how to troubleshoot issues with Android Monitoring.
aliases:
- /real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/android
- /real_user_monitoring/mobile_and_tv_monitoring/android/troubleshooting
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: dd-sdk-android Source code
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Real User Monitoring
---

## Overview

If you experience unexpected behavior with Datadog RUM, use this guide to resolve issues quickly. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Check if Datadog RUM is initialized
Use the utility method `isInitialized` to check if the SDK is properly initialized:

```kotlin
if (Datadog.isInitialized()) {
    // your code here
}
```

## Debugging
When writing your application, you can enable development logs by calling the `setVerbosity` method. All internal messages in the library with a priority equal to or higher than the provided level are then logged to Android's Logcat:

```kotlin
Datadog.setVerbosity(Log.INFO)
```

## Migrating to 3.0.0

If you've been using the SDK v2 or SDK v1, there are some breaking changes introduced in version `3.0.0`. See the [migration guide][2] for more information.

## "Deobfuscation failed" warning

A warning appears when deobfuscation fails for a stack trace. If the stack trace is not obfuscated to begin with, you can ignore this warning. Otherwise, use the [RUM Debug Symbols page][3] to view all your uploaded mapping files. See [Investigate Obfuscated Stack Traces with RUM Debug Symbols][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: /real_user_monitoring/guide/mobile-sdk-upgrade
[3]: https://app.datadoghq.com/source-code/setup/rum
[4]: /real_user_monitoring/guide/debug-symbols
