---
title: Custom Grouping
kind: documentation
description: Customize how error spans are grouped into issues.
---

## Overview

Error Tracking intelligently groups similar errors into issues with a [default strategy][5]. By using _custom fingerprinting_, you can gain full control over the grouping decision and customize the grouping behavior for your error spans.

You can customize grouping by providing an `error.fingerprint` for the error. The fingerprint is provided in an attribute or tag, depending on the error source (see [Setup](#setup) for details). While the value of `error.fingerprint` does not have any particular format or requirement, the content must be a string.

If `error.fingerprint` is provided, the grouping behavior follows these rules:

* Custom grouping takes precedence over the default strategy.
* Custom grouping can be applied only to a subset of your errors and can coexist with the default strategy.
* The content of `error.fingerprint` is used as-is without any modification.
* Errors from the same service and with the same `error.fingerprint` attribute are grouped into the same issue.
* Errors with different `service` attributes are grouped into different issues.

## Setup

### APM
Custom grouping only needs an error span and an `error.fingerprint` string span tag.

If you aren't already collecting APM traces with Datadog, see the [APM documentation][1] to set up APM.

#### Example

If you're already sending APM spans, add a new `error.fingerprint` tag to your error span.

Here's an example in Python:

```python
with tracer.trace("throws.an.error") as span:
  span.set_tag('error.fingerprint', 'my-custom-grouping-material')
  raise Exception("Something went wrong")
```

Exception information is captured and attached to a span if there is one active when the exception is raised.
In this case, `my-custom-grouping-material` is used to group these error spans into a single
issue in Error Tracking.

### Log Management
Custom grouping only needs an error log and an `error.fingerprint` string attribute.

If you aren't already collecting logs with Datadog, see the [Log Management documentation][2] to set up logs.

Ensure that the `source` tag (specifying language) is properly configured.

#### Example

If you're already logging in JSON format, add a new `error.fingerprint` attribute to your error log.

Here's an example in Python for a JSON-formatted logger:

```python
import logging
import json_log_formatter

formatter = json_log_formatter.JSONFormatter()

json_handler = logging.FileHandler(filename='/var/log/my-log.json')
json_handler.setFormatter(formatter)

logger = logging.getLogger('my_json')
logger.addHandler(json_handler)
logger.setLevel(logging.INFO)

logger.error('Error processing request', extra={'error.fingerprint': 'my-custom-grouping-material'})
```

In this case, `my-custom-grouping-material` is used to group these error logs into a single
issue in Error Tracking.

#### Mobile Example

In Datadog's mobile SDKs, you can add a custom error fingerprint when logging an error by adding
a predefined attribute to the log call:

{{< tabs >}}
{{% tab "iOS" %}}
To use custom grouping, you need the Datadog iOS SDK `2.8.1` or higher.

```swift
let errorFingerprint = "my-custom-grouping-material"
logger.error(
  "My error message",
  error: error,
  attributes: [
    Logs.Attributes.errorFingerprint: errorFingerprint
  ]
)
```
{{% /tab %}}

{{% tab "Android" %}}
To use custom grouping, you need the Datadog Android SDK `2.7.0` or higher.

```kotlin
val errorFingerprint = "my-custom-grouping-material"
val attributes = mapOf(LogAttributes.ERROR_FINGERPRINT to errorFingerprint)
logger.e("My error message", error, attributes)
```
{{% /tab %}}

{{% tab "Flutter" %}}
To use custom grouping, you need the Datadog Flutter SDK `2.4.0` or higher.

```dart
final errorFingerprint = "my-custom-grouping-material";
logger.error(
  'My error message',
  errorStackTrace: st,
  attributes {
    DatadogAttributes.errorFingerprint: "my-custom-grouping-material",
  }
);
```
{{% /tab %}}
{{< /tabs >}}

Or, you can add or adjust the fingerprint in the log mapper:

{{< tabs >}}
{{% tab "iOS" %}}
To use custom grouping, you need the Datadog iOS SDK `2.8.1` or higher.

```swift
let logsConfiguration = Logs.Configuration(
  eventMapper: { log in
      var log = log
      log.error?.fingerprint = "my-custom-grouping-material"
      return log
  }
)
Logs.enable(
  with: logsConfiguration
)
```
{{% /tab %}}

{{% tab "Android" %}}
To use custom grouping, you need the Datadog Android SDK `2.7.0` or higher.

```kotlin
val mapper = object : EventMapper<LogEvent> {
    override fun map(event: LogEvent): LogEvent {
        event.fingerprint = "my-custom-grouping-material"
        return event
    }
}
val logsConfiguration = LogsConfiguration.Builder()
    .setEventMapper(mapper)
    .build()
Logs.enable(logsConfiguration)
```
{{% /tab %}}

{{% tab "Flutter" %}}
To use custom grouping, you need the Datadog Flutter SDK `2.4.0` or higher.

```dart
LogEvent? mapLogEvent(LogEvent event) {
  event.error?.fingerprint = "my-custom-grouping-material";
  return event;
}

final loggingConfiguration = DatadogLoggingConfiguration(
  eventMapper: mapLogEvent,
);

final configuration = DatadogConfiguration(
    // ...
    loggingConfiguration: loggingConfiguration,
);
```
{{% /tab %}}
{{< /tabs >}}

### RUM

#### Example
If you aren't already collecting Browser RUM events with Datadog, see the [RUM Browser Monitoring setup documentation][3] or the [RUM Mobile and TV Monitoring setup documentation][4].

{{< tabs >}}
{{% tab "Browser" %}}
To use custom grouping, you need the Datadog Browser SDK [v4.42.0 or later][2], a [browser RUM error][1], and an additional string attribute.

If you're already [collecting browser errors][1], it's possible to add the attribute by either:

* Adding a `dd_fingerprint` attribute to the error object:

```javascript
import { datadogRum } from '@datadog/browser-rum';
// Send a custom error with context
const error = new Error('Something went wrong');
error.dd_fingerprint = 'my-custom-grouping-fingerprint'
datadogRum.addError(error);
```

* Or, using the `beforeSend` callback with an `error.fingerprint` attribute:

```javascript
DD_RUM.init({
  ...
  beforeSend: () => {
    if (event.type === 'error') {
      event.error.fingerprint = 'my-custom-grouping-fingerprint'
    }
  },
})
```

In both cases, `my-custom-grouping-material` is used to group the Browser RUM errors into a single issue in Error Tracking.

[1]: /real_user_monitoring/browser/collecting_browser_errors/
[2]: https://github.com/DataDog/browser-sdk/releases/tag/v4.42.0
{{% /tab %}}

{{% tab "iOS" %}}
To use custom grouping, you need the Datadog iOS SDK `2.8.1` or higher.

To add a custom fingerprint when manually reporting errors, you can add a predefined attribute when calling `addError`:

```swift
RUMMonitor.shared().addError(
  message: "My error message",
  source: .source,
  attributes: [
    RUM.Attributes.errorFingerprint: "my-custom-grouping-fingerprint"
  ]
)
```

Or, you can use the `errorEventMapper`:

```swift
var config = RUM.Configuration(applicationID: "rum-application-id")
config.errorEventMapper = { errorEvent in
  var errorEvent = errorEvent
  errorEvent.error.fingerprint = "my-custom-grouping-fingerprint"
  return errorEvent
}
RUM.enable(with: config)
```

{{% /tab %}}

{{% tab "Android" %}}
To use custom grouping, you need the Datadog Android SDK `2.7.0` or higher.

To add a custom fingerprint when manually reporting errors, you can add a predefined attribute when calling `addError`:

```kotlin
GlobalRumMonitor.get().addError(
  "My error message",
  RumErrorSource.SOURCE,
  exception,
  mapOf(
    RumAttributes.ERROR_CUSTOM_FINGERPRINT to "my-custom-grouping-fingerprint"
  )
)
```

Or, you can use the `errorEventMapper`:

```kotlin
val rumConfiguration = RumConfiguration.Builder("rum-application-id")
  .setErrorEventMapper(object : EventMapper<ErrorEvent> {
    override fun map(event: ErrorEvent): ErrorEvent {
        event.error.fingerprint = "my-custom-grouping-fingerprint"
        return event
    }
  }).build()
RUM.enable(rumConfiguration)
```

{{% /tab %}}

{{% tab "Flutter" %}}
To use custom grouping, you need the Datadog Flutter SDK `2.4.0` or higher.

To add a custom fingerprint when manually reporting errors, you can add a predefined attribute when calling `addError`:

```dart
final rum = DatadogSdk.instance.rum;
rum?.addErrorInfo("My error message",
  RumErrorSource.source,
  attributes: {
    DatadogAttributes.errorFingerprint: 'my-custom-grouping-fingerprint',
  },
);
```

Or, you can use the `errorEventMapper`:

```dart
RumErrorEvent? mapRumErrorEvent(RumErrorEvent event) {
  event.error.fingerprint = "my-custom-grouping-fingerprint";
  return event;
}

final rumConfiguration = DatadogRumConfiguration(
  // ...
  errorEventMapper: mapRumErrorEvent,
);

final configuration = DatadogConfiguration(
    // ...
    rumConfiguration: rumConfiguration,
);
```
{{% /tab %}}
{{< /tabs >}}

[1]: /tracing/
[2]: /logs/log_collection/
[3]: /real_user_monitoring/browser/
[4]: /real_user_monitoring/mobile_and_tv_monitoring/setup
[5]: /error_tracking/default_grouping
