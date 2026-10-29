{% alert level="info" %}
Tracking background events may lead to additional sessions, which can impact billing. For questions, [contact Datadog support][1].
{% /alert %}

You can track events such as crashes and network requests when your application is in the background (for example, when no active view is available).

To track background events, set `trackBackgroundEvents` to `true` in your `DatadogRumConfiguration`. This option requires Flutter SDK version 2.13.0 or later.

```dart
final configuration = DatadogConfiguration(
  // ...
  rumConfiguration: DatadogRumConfiguration(
    applicationId: '<APPLICATION_ID>',
    trackBackgroundEvents: true,
  ),
);
```

[1]: /help/
