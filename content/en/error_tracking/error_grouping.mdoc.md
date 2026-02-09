---
title: Error Grouping
description: Understand how errors are grouped into issues.
aliases:
  - /logs/error_tracking/custom_grouping
  - /logs/error_tracking/default_grouping
  - /tracing/error_tracking/custom_grouping
  - /real_user_monitoring/error_tracking/custom_grouping
  - /real_user_monitoring/error_tracking/default_grouping
  - /error_tracking/default_grouping
content_filters:
  - trait_id: product
    option_group_id: error_tracking_product_options
  - trait_id: platform
    label: Context
    option_group_id: <PRODUCT>_error_grouping_context_options
---

## Default Grouping

Error Tracking intelligently groups similar errors into issues. This grouping is based on the following error properties:

- `service`: The service where the error occurred.
- `error.type` or `error.kind`: The class of the error.
- `error.message`: A description of the error.
- `error.stack`: The filename and function name of the top-most meaningful stack frame.

The error stack trace is the code path followed by an error between being thrown and being captured by Datadog instrumentation. Error Tracking evaluates the topmost stack frame (the **location** of the error) and uses it to group the error.

If any stack frame properties differ for two given errors, the two errors are grouped under different issues. For example, Error Tracking does not group issues across services or error types. Error Tracking also ignores numbers, punctuation, and anything that is between quotes or parentheses: only word-like tokens are used.

{% alert level="info" %}
**Tip:** To ensure optimal grouping, enclose variables in your error messages in quotes or parentheses.
{% /alert %}

**Note**: To improve grouping accuracy, Error Tracking removes variable stack frame properties such as versions, ids, dates, and so on.

## Custom Grouping

Error Tracking intelligently groups similar errors into issues with a default strategy. By using _custom fingerprinting_, you can gain full control over the grouping decision and customize the grouping behavior for your error spans.

You can customize grouping by providing an `error.fingerprint` for the error. The fingerprint is provided in an attribute or tag, depending on the error source (see [Setup](#setup) for details). While the value of `error.fingerprint` does not have any particular format or requirement, the content must be a string.

If `error.fingerprint` is provided, the grouping behavior follows these rules:

* Custom grouping takes precedence over the default strategy.
* Custom grouping can be applied only to a subset of your errors and can coexist with the default strategy.
* The content of `error.fingerprint` is used as-is without any modification (although it is converted to a standardized fingerprint format).
* Errors from the same service and with the same `error.fingerprint` attribute are grouped into the same issue.
* Errors with different `service` attributes are grouped into different issues.

## Setup

<!-- APM -->
{% if equals($product, "apm") %}
Custom grouping only needs an error span and an `error.fingerprint` string span tag.

If you aren't already collecting APM traces with Datadog, see the [APM documentation][1] to set up APM.

### Example

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
{% /if %}

<!-- Logs -->
{% if equals($product, "logs") %}
Custom grouping only needs an error log and an `error.fingerprint` string attribute.

If you aren't already collecting logs with Datadog, see the [Log Management documentation][2] to set up logs.

Ensure that the `source` tag (specifying language) is properly configured.

{% if or(equals($platform, "server"), equals($platform, "show_all")) %}

### Server

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
{% /if %}

{% if or(equals($platform, "android"), equals($platform, "show_all")) %}
### Android

{% alert level="info" %}
To use custom grouping, you need the Datadog Android SDK `2.7.0` or higher.
{% /alert %}

In Datadog's mobile SDKs, you can add a custom error fingerprint when logging an error by adding a predefined attribute to the log call:

```kotlin
val errorFingerprint = "my-custom-grouping-material"
val attributes = mapOf(LogAttributes.ERROR_FINGERPRINT to errorFingerprint)
logger.e("My error message", error, attributes)
```

Or, you can add or adjust the fingerprint in the log mapper:

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
{% /if %}

{% if or(equals($platform, "flutter"), equals($platform, "show_all")) %}
### Flutter

{% alert level="info" %}
To use custom grouping, you need the Datadog Flutter SDK `2.4.0` or higher.
{% /alert %}

In Datadog's mobile SDKs, you can add a custom error fingerprint when logging an error by adding a predefined attribute to the log call:

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

Or, you can add or adjust the fingerprint in the log mapper:

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
{% /if %}

{% if or(equals($platform, "ios"), equals($platform, "show_all")) %}
### iOS

{% alert level="info" %}
To use custom grouping, you need the Datadog iOS SDK `2.8.1` or higher.
{% /alert %}

In Datadog's mobile SDKs, you can add a custom error fingerprint when logging an error by adding a predefined attribute to the log call:

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

Or, you can add or adjust the fingerprint in the log mapper:

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
{% /if %}

{% if or(equals($platform, "react_native"), equals($platform, "show_all")) %}
### React Native

{% alert level="info" %}
To use custom grouping, you need the Datadog RUM SDK `2.4.2` or higher.
{% /alert %}

In Datadog's mobile SDKs, you can add a custom error fingerprint when logging an error by adding a predefined attribute to the log call:

```dart
DdLogs.error(
  'message',
  'my-error-type',
  'my-error-message',
  'my-stack-trace',
  { my: 'context' },
  'my-custom-fingerprint'
);
```

Or, you can add or adjust the fingerprint in the log mapper:

```dart
configuration.errorEventMapper = event => {
  event.fingerprint = 'my-custom-fingerprint'
  return event;
};
```
{% /if %}


{% /if %}
<!-- end Logs -->

<!-- RUM -->
{% if equals($product, "rum") %}
If you aren't already collecting Browser RUM events with Datadog, see the [RUM Browser Monitoring setup documentation][3] or the [RUM Mobile and TV Monitoring setup documentation][4].

{% if or(equals($platform, "show_all"), equals($platform, "android")) %}
### Android

{% alert level="info" %}
To use custom grouping, you need the Datadog Android SDK `2.7.0` or higher.
{% /alert %}

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
{% /if %}

{% if or(equals($platform, "show_all"), equals($platform, "browser")) %}
### Browser

To use custom grouping, you need the Datadog Browser SDK [v4.42.0 or later][6], a [browser RUM error][5], and an additional string attribute.

If you're already [collecting browser errors][5], it's possible to add the attribute by either:

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
{% /if %}

{% if or(equals($platform, "show_all"), equals($platform, "flutter")) %}
### Flutter

{% alert level="info" %}
To use custom grouping, you need the Datadog Flutter SDK `2.4.0` or higher.
{% /alert %}

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
{% /if %}

{% if or(equals($platform, "show_all"), equals($platform, "ios")) %}
### iOS

{% alert level="info" %}
To use custom grouping, you need the Datadog iOS SDK `2.8.1` or higher.
{% /alert %}

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
{% /if %}

{% if or(equals($platform, "show_all"), equals($platform, "react_native")) %}
### React Native

{% alert level="info" %}
To use custom grouping, you need the Datadog RUM SDK `2.4.2` or higher.
{% /alert %}

```dart
DdRum.addError(
  'message',       
  'my-source',       
  'my-stack-trace',  
  { my: 'context' },
  Date.now(), 
  'my-custom-fingerprint'        
);
```
Or, you can use the `errorEventMapper`:

```dart
configuration.errorEventMapper = event => {
  event.fingerprint = 'my-custom-fingerprint'
  return event;
};
```
{% /if %}

{% /if %}
<!-- end RUM -->


[1]: /tracing/
[2]: /logs/log_collection/
[3]: /real_user_monitoring/application_monitoring/browser/
[4]: /real_user_monitoring/application_monitoring/#get-started
[5]: /real_user_monitoring/application_monitoring/browser/collecting_browser_errors/
[6]: https://github.com/DataDog/browser-sdk/releases/tag/v4.42.0

