### Custom actions

In addition to [tracking actions automatically][5], you can also track specific custom user actions (such as taps, clicks, and scrolls) with `RumMonitor#addAction`. For continuous action tracking (for example, tracking a user scrolling a list), use `RumMonitor#startAction` and `RumMonitor#stopAction`.

The action type should be one of the following: "custom", "click", "tap", "scroll", "swipe", "back".

```kotlin
fun onUserInteraction() {
    GlobalRumMonitor.get().addAction(actionType, name, actionAttributes)
}
```

[1]: https://app.datadoghq.com/rum/application/create
[5]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/advanced_configuration/#initialization-parameters
