<!--
This customizable partial requires the `platform` trait, with the following options:
- show_all
- server
- android
- flutter
- ios
- react_native
-->
Custom grouping only needs an error log and an `error.fingerprint` string attribute.

If you aren't already collecting logs with Datadog, see the [Log Management documentation][1] to set up logs.

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

[1]: /logs/log_collection/