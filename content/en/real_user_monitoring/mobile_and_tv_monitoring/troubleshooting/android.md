---
title: Troubleshooting Android SDK issues
description: Learn how to troubleshoot issues with Android Monitoring.
code_lang: android
type: multi-code-lang
code_lang_weight: 10
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

## Migrating to 2.0.0

If you've been using the SDK v1, there are some breaking changes introduced in version `2.0.0`. See the [migration guide][2] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://github.com/DataDog/dd-sdk-android/blob/develop/MIGRATION.MD
