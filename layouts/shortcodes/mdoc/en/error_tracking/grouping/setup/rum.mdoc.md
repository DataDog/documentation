<!--
This customizable partial requires the `platform` trait, with the following options:
- show_all
- browser
- android
- flutter
- ios
- react_native
-->
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

[3]: /real_user_monitoring/application_monitoring/browser/
[4]: /real_user_monitoring/application_monitoring/#get-started
[5]: /real_user_monitoring/application_monitoring/browser/collecting_browser_errors/
[6]: https://github.com/DataDog/browser-sdk/releases/tag/v4.42.0