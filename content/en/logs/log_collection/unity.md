---
title: Unity Log Collection
description: Collect Logs data from your Unity projects.
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: "Source Code"
  text: dd-sdk-unity Source code
- link: logs/explorer/
  tag: Documentation
  text: Learn how to explore your logs

---
Send logs to Datadog from your Unity applications with [Datadog's Unity Package][1] and leverage the following features:

* Log to Datadog in JSON format natively.
* Use default and add custom attributes to each log sent.
* Record real client IP addresses and User-Agents.
* Leverage optimized network usage with automatic bulk posts.

## Setup

To initialize the Datadog Unity SDK for Logs, see [Setup][2].

Once you have setup the Datadog Unity SDK, you can use the SDK's `DefaultLogger` to send logs to Datadog.

```cs
var logger = DatadogSdk.Instance.DefaultLogger;

logger.Debug("A debug message.");
logger.Info("Some relevant information?");
logger.Warn("An important warning…");
logger.Error("An error was met!");
```

If you set the "Forward Unity Logs" option, logs sent to Unity using Unity's `Debug.Log*` methods are automatically sent to `DatadogSdk.Instance.DefaultLogger`.

You can create additional loggers with different services and names using the `CreateLogger` method as well:

```dart
var loggingOptions = new DatadogLoggingOptions()
{
    Service = "com.example.custom_service",
    Name = "Additional logger",
};
var logger = DatadogSdk.Instance.CreateLogger(loggingOptions);

logger.Info('Info from my additional logger.');
```

## Manage tags

Tags set on loggers are local to each logger.

### Add tags

Use the `DdLogger.AddTag` method to add tags to all logs sent by a specific logger:

```cs
// This adds a "build_configuration:debug" tag
logger.AddTag("build_configuration", "debug")
```

### Remove tags

Use the `DdLogger.RemoveTag` method to remove tags from all logs sent by a specific logger:

```cs
// This removes any tag that starts with "build_configuration"
logger.RemoveTag("build_configuration")
```

For more information, see [Getting Started with Tags][3].

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

Use the `DatadogLogger.AddAttribute` method to add a custom attribute to all logs sent by a specific logger:

```cs
logger.AddAttribute("user-status", "unregistered")
```

The `value` can be most types that can be serialized using [`JsonCovert.SerializeObject`][4].

### Remove attributes

Use the `DdLogger.RemoveAttribute` method to remove a custom attribute from all logs sent by a specific logger:

```cs
// This removes the attribute "user-status" from all logs sent moving forward.
logger.RemoveAttribute("user-status")
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/unity-package
[2]: /real_user_monitoring/application_monitoring/unity/setup
[3]: /getting_started/tagging/
[4]: https://www.newtonsoft.com/json/help/html/m_newtonsoft_json_jsonconvert_serializeobject.htm
[5]: https://api.flutter.dev/flutter/services/StandardMessageCodec-class.html
[6]: https://pub.dev/packages/logger
