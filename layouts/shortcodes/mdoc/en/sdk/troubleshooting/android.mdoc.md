<!--
This partial contains troubleshooting content for the Android SDK.
It can be included in the Android SDK troubleshooting page or in the unified client_sdks view.
-->

If you experience unexpected behavior with Datadog RUM, use this guide to resolve issues. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

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

## RUM Debug Widget

The [RUM Debug Widget][5] provides a floating overlay that displays key metrics such as memory usage, CPU load, and RUM events in real time. It is intended for debugging and development purposes only.

See the [module README][6] for setup instructions.

{% img src="real_user_monitoring/android/android-rum-debug-widget.png" alt="The RUM Debug Widget overlay displaying real-time metrics including memory, CPU, threads, and GC rate, with an events timeline showing Action, Resource, Slow, and Frozen event markers." style="width:50%;" /%}

## Migrating to 3.0.0

If you've been using the SDK v2 or SDK v1, there are some breaking changes introduced in version `3.0.0`. See the [migration guide][2] for more information.

## "Deobfuscation failed" warning

A warning appears when deobfuscation fails for a stack trace. If the stack trace is not obfuscated to begin with, you can ignore this warning. Otherwise, use the [RUM Debug Symbols page][3] to view all your uploaded mapping files. See [Investigate Obfuscated Stack Traces with RUM Debug Symbols][4].

[1]: /help
[2]: /real_user_monitoring/guide/mobile-sdk-upgrade
[3]: https://app.datadoghq.com/source-code/setup/rum
[4]: /real_user_monitoring/guide/debug-symbols
[5]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum-debug-widget
[6]: https://github.com/DataDog/dd-sdk-android/blob/develop/features/dd-sdk-android-rum-debug-widget/README.md
