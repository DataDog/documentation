## Duplicate interface (iOS)

If you see this error while building iOS after upgrading to `datadog_flutter_plugin` v2.0:

```
Semantic Issue (Xcode): Duplicate interface definition for class 'DatadogSdkPlugin'
/Users/exampleuser/Projects/test_app/build/ios/Debug-iphonesimulator/datadog_flutter_plugin/datadog_flutter_plugin.framework/Headers/DatadogSdkPlugin.h:6:0
```

Try performing `flutter clean` && `flutter pub get` and rebuilding. This usually resolves the issue.

## Duplicate classes (Android)

If you see this error while building Android after the upgrading to `datadog_flutter_plugin` v2.0:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
```

Make sure that you've updated your version of Kotlin to at least 1.8 in your `build.gradle` file.

## Cocoapods issues

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

Follow the instructions in the [Flutter documentation][2] for working with Flutter on Apple Silicon.

## Undefined symbol (iOS)

If you use Flutter's `build ios-framework` command, you may see errors similar to the following:

```
Undefined symbol: _OBJC_CLASS_$_PLCrashReport
Undefined symbol: _OBJC_CLASS_$_PLCrashReportBinaryImageInfo
Undefined symbol: _OBJC_CLASS_$_PLCrashReportStackFrameInfo
...
```

This occurs because the `build ios-framework` command does not properly include PLCrashReporter, which the Datadog Flutter SDK depends on. To resolve this issue, Datadog recommends manually including the PLCrashReporter dependency. The framework and instructions for including it are available on its [GitHub page][8].

## Set sdkVerbosity

If you're able to run your app, but you are not seeing the data you expect on the Datadog site, try adding the following to your code before calling `DatadogSdk.initialize`:

```dart
DatadogSdk.instance.sdkVerbosity = CoreLoggerLevel.debug;
```

This causes the SDK to output additional information about what it's doing and what errors it's encountering, which may help you and Datadog Support narrow down your issue.

## Not seeing Errors

If you do not see any errors in RUM, it's likely no view has been started. Make sure you have started a view with `DatadogSdk.instance.rum?.startView` or, if you are using `DatadogRouteObserver` make sure your current Route has a name.

## Issues with automatic resource tracking and distributed tracing

The [Datadog tracking HTTP client][3] package works with most common Flutter networking packages that rely on `dart:io`, including [`http`][4] and [`Dio`][5].

If you are seeing resources in your RUM Sessions, then the tracking HTTP client is working, but other steps may be required to use distributed tracing.

By default, the Datadog RUM Flutter SDK samples distributed traces at only 20% of resource requests. While determining if there is an issue with your setup, you should set this value to 100% of traces by modifying your initialization with the following lines:
```dart
final configuration = DdSdkConfiguration(
   //
   rumConfiguration: DatadogRumConfiguration(
    applicationId: '<RUM_APPLICATION_ID>',
    tracingSamplingRate: 100.0
   ),
);
```

If you are still having issues, check that your `firstPartyHosts` property is set correctly. These should be hosts only, without schemas or paths, and they do not support regular expressions or wildcards. For example:

    ✅ Good - 'example.com', 'api.example.com', 'us1.api.sample.com'
    ❌ Bad - 'https://example.com', '*.example.com', 'us1.sample.com/api/*', 'api.sample.com/api'

## "Deobfuscation failed" warning

A warning appears when deobfuscation fails for a stack trace. If the stack trace is not obfuscated to begin with, you can ignore this warning. Otherwise, use the [RUM Debug Symbols page][6] to view all your uploaded symbol files, dSYMs, and mapping files. See [Investigate Obfuscated Stack Traces with RUM Debug Symbols][7].