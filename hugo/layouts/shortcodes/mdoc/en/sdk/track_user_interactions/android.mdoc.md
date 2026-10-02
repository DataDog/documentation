## Automatically track user interactions

To automatically track user interactions (such as taps, scrolls, and swipes) as RUM actions, call `trackUserInteractions()` when you build your RUM configuration:

{% tabs %}
{% tab label="Kotlin" %}

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
    .trackUserInteractions()
    .build()
Rum.enable(rumConfig)
```

{% /tab %}
{% tab label="Java" %}

```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
    .trackUserInteractions()
    .build();
Rum.enable(rumConfig);
```

{% /tab %}
{% /tabs %}

To add custom attributes to the RUM action events based on the widget the user interacted with, pass an array of `ViewAttributesProvider` implementations to `trackUserInteractions()`. To turn off automatic action tracking, use `disableUserInteractionTracking()`. For the full list of RUM configuration methods, see [Initialization parameters][1].

## Manually track actions and send custom events

In addition to [tracking actions automatically](#automatically-track-user-interactions), you can also track specific custom user actions (such as taps, clicks, and scrolls) with `RumMonitor#addAction`. For continuous action tracking (for example, tracking a user scrolling a list), use `RumMonitor#startAction` and `RumMonitor#stopAction`.

The action type should be one of the following: "custom", "click", "tap", "scroll", "swipe", "back".

{% tabs %}
{% tab label="Kotlin" %}

```kotlin
fun onUserInteraction() {
    GlobalRumMonitor.get().addAction(actionType, name, actionAttributes)
}
```

{% /tab %}
{% tab label="Java" %}

```java
public void onUserInteraction() {
    GlobalRumMonitor.get().addAction(actionType, name, actionAttributes);
}
```

{% /tab %}
{% /tabs %}

### Track widgets

Widgets are not automatically tracked with the SDK. To send UI interactions from your widgets manually, call the Datadog API. [See example][2].

For the attributes collected, see [Data Collected][3].

[1]: /real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=android#initialization-parameters
[2]: https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget
[3]: /real_user_monitoring/setup/data_collected/?platform=android#action-attributes
