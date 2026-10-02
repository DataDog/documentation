## Enable background event tracking

You can track events such as crashes and network requests when your application is in the background (for example, when no active view is available).

Add the following snippet to your RUM configuration:

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
  // …
  .trackBackgroundEvents(true)
  .build()
```

By default, background events are not tracked.

{% alert level="info" %}
Tracking background events may lead to additional sessions, which can impact billing. For questions, [contact Datadog support](https://docs.datadoghq.com/help/).
{% /alert %}
