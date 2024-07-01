---
title: Troubleshooting Flutter SDK issues
kind: documentation
description: Learn how to troubleshoot issues with Flutter Monitoring.
aliases:
    - /real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/
code_lang: flutter
type: multi-code-lang
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: "Source Code"
  text: Source code for dd-sdk-flutter
- link: real_user_monitoring/flutter/
  tag: Documentation
  text: Learn about Flutter Monitoring

---

## Overview

If you experience unexpected behavior with Datadog RUM, use this guide to resolve issues quickly. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://github.com/flutter/flutter/wiki/Developing-with-Flutter-on-Apple-Silicon
[3]: https://pub.dev/packages/datadog_tracking_http_client
[4]: https://pub.dev/packages/http
[5]: https://pub.dev/packages/dio
