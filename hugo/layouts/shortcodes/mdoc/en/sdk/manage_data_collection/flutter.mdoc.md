To configure tracking consent, see the **Configure tracking consent (GDPR compliance)** step in [Install the Datadog SDK][1].

### Clear all data

Use `clearAllData` to clear all data that has not been sent to Datadog.

```dart
DatadogSdk.instance.clearAllData();
```

[1]: /real_user_monitoring/setup/install/?platform=flutter
