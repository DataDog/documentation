### Custom actions

In addition to [tracking actions automatically][5], you can also track specific custom user actions (such as taps, clicks, and scrolls) with `RumMonitor#addAction`. For continuous action tracking (for example, tracking a user scrolling a list), use `RumMonitor#startAction` and `RumMonitor#stopAction`.

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

## Track widgets

Widgets are not automatically tracked with the SDK. To send UI interactions from your widgets manually, call the Datadog API. [See example][10].

[1]: https://app.datadoghq.com/rum/application/create
[5]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#initialization-parameters
[10]: https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget
