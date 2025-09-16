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

## "Deobfuscation failed" warning

A warning appears when deobfuscation fails for a stack trace. If the stack trace is not obfuscated to begin with, you can ignore this warning. Otherwise, use the [RUM Debug Symbols page][3] to view all your uploaded mapping files. See [Investigate Obfuscated Stack Traces with RUM Debug Symbols][4].
