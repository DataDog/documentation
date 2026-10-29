## Enable background event tracking

You can track events such as crashes and network requests when your application is in the background (for example, when no active view is available).

Add the following snippet to your RUM configuration:

{% tabs %}
{% tab label="Kotlin" %}

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
  // …
  .trackBackgroundEvents(true)
  .build()
```

{% /tab %}
{% tab label="Java" %}

```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
  // …
  .trackBackgroundEvents(true)
  .build();
```

{% /tab %}
{% /tabs %}

By default, background events are not tracked.

{% alert level="info" %}
Tracking background events may lead to additional sessions, which can impact billing. For questions, [contact Datadog support](https://docs.datadoghq.com/help/).
{% /alert %}
