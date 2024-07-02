---
title: Flutter Log Collection
kind: documentation
description: Collect Logs data from your Flutter projects.
further_reading:
- link: "https://github.com/DataDog/dd-sdk-flutter"
  tag: ソースコード
  text: dd-sdk-flutter Source code
- link: logs/explorer/
  tag: Documentation
  text: Learn how to explore your logs

---
Send logs to Datadog from your Flutter applications with [Datadog's flutter plugin][1] and leverage the following features:

* Log to Datadog in JSON format natively.
* Use default and add custom attributes to each log sent.
* Record real client IP addresses and User-Agents.
* Leverage optimized network usage with automatic bulk posts.

## Setup

To initialize the Datadog Flutter SDK for Logs, see [Setup][2].

Once you have initialized the Datadog Flutter SDK with a `LoggingConfiguration` parameter, you can create a `DatadogLogger` and send logs to Datadog.

```dart
final logConfiguration = DatadogLoggerConfiguration(
  remoteLogThreshold: LogLevel.debug,
  networkInfoEnabled: true,
);
final logger = DatadogSdk.instance.logs?.createLogger(logConfiguration);

logger?.debug("A debug message.");
logger?.info("Some relevant information?");
logger?.warn("An important warning...");
logger?.error("An error was met!");
```

You can create additional loggers with different services and names using the `createLogger` method as well:

```dart
final myLogger = DatadogSdk.instance.logs?.createLogger(
  DatadogLoggerConfiguration(
    service: 'com.example.custom_service',
    name: 'Additional logger'
  )
);

myLogger?.info('Info from my additional logger.');
```

For more information about available logging options, see the [DatadogLoggerConfiguration class documentation][3].

## Manage tags

Tags set on loggers are local to each logger.

### Add tags

Use the `DatadogLogger.addTag` method to add tags to all logs sent by a specific logger:

```dart
// This adds a "build_configuration:debug" tag
logger.addTag("build_configuration", "debug")
```

### Remove tags

Use the `DatadogLogger.removeTag` method to remove tags from all logs sent by a specific logger:

```dart
// This removes any tag that starts with "build_configuration"
logger.removeTag("build_configuration")
```

For more information, see [Getting Started with Tags][4].

## Manage attributes

Attributes set on loggers are local to each logger.

### Default attributes

By default, the following attributes are added to all logs sent by a logger:

* `http.useragent` and its extracted `device` and `OS` properties
* `network.client.ip` and its extracted geographical properties (`country`, `city`)
* `logger.version`, Datadog SDK version
* `logger.thread_name`, (`main`, `background`)
* `version`, client's app version extracted from either the `Info.plist` or `application.manifest`
* `environment`, the environment name used to initialize the SDK

### Add attributes

Use the `DatadogLogger.addAttribute` method to add a custom attribute to all logs sent by a specific logger:

```dart
logger.addAttribute("user-status", "unregistered")
```

The `value` can be most types supported by the [`StandardMessageCodec` class][5].

### Remove attributes

Use the `DatadogLogger.removeAttribute` method to remove a custom attribute from all logs sent by a specific logger:

```dart
// This removes the attribute "user-status" from all logs sent moving forward.
logger.removeAttribute("user-status")
```

## Customizing log output

By default, for debug builds, `DatadogLogger`s print all logs to the Flutter console in the format:
```
[{level}] message
```

This can be customized by setting a `DatadogLoggerConfiguration.customConsoleLogFunction`. To filter logs below a certain level, set this to `simpleConsolePrintForLevel`:

```dart
final config = DatadogLoggerConfiguration(
  // Other configuration options...
  customConsoleLogFunction: simpleConsolePrintForLevel(LogLevel.warn),
);
```

You can also forward Datadog logs to other log packages, such as [logger][6], by supplying a custom function:

```dart
var Logger logger;
void customDatadogLog(LogLevel level,
  String message,
  String? errorMessage,
  String? errorKind,
  StackTrace? stackTrace,
  Map<String, Object?> attributes,) {
    // Assuming you have a Logger and custom level mapping function:
    logger.log(mapLogLevels(level), message, error: errorKind, stackTrace: stackTrace);
}

final datadogLogger = DatadogSdk.instance.logs?.createLogger(
  DatadogLoggerConfiguration(
    // Other configuration options...
    customConsoleLogFunction: simpleConsolePrintForLevel(LogLevel.warn),
  );
);
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://pub.dev/packages/datadog_flutter_plugin
[2]: /real_user_monitoring/mobile_and_tv_monitoring/setup/flutter
[3]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogLoggerConfiguration-class.html
[4]: /getting_started/tagging/
[5]: https://api.flutter.dev/flutter/services/StandardMessageCodec-class.html
[6]: https://pub.dev/packages/logger
