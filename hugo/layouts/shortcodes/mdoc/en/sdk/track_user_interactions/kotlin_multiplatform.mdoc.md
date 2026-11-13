## Automatically track user interactions

Automatic action tracking is configured per platform, from the platform-specific source sets:

- **Android**: Call `trackUserInteractions()` on the `RumConfiguration.Builder` to track taps, scrolls, and swipes. The optional `Array<ViewAttributesProvider>` parameter adds custom attributes to the RUM action events based on the widget the user interacted with.
- **iOS**: Call `trackUiKitActions()` on the `RumConfiguration.Builder` to track `UITouch` events as RUM actions. To filter or rename actions, pass a `UIKitRUMActionsPredicate` implementation that returns RUM action parameters for the interactions to accept, or `null` to ignore them. By default, all touches are accepted.

```kotlin
// in common source set
val rumConfig = RumConfiguration.Builder(applicationId)
  .apply {
    platformSpecificSetup(this)
  }
  .build()

internal expect fun platformSpecificSetup(
    rumConfigurationBuilder: RumConfiguration.Builder
)

// in Android source set
internal actual fun platformSpecificSetup(
    rumConfigurationBuilder: RumConfiguration.Builder
) {
    rumConfigurationBuilder.trackUserInteractions()
}

// in iOS source set
internal actual fun platformSpecificSetup(
    rumConfigurationBuilder: RumConfiguration.Builder
) {
    rumConfigurationBuilder.trackUiKitActions()
}
```

For the full list of RUM configuration methods, see [Initialization parameters][1].

## Manually track actions and send custom events

In addition to [tracking actions automatically](#automatically-track-user-interactions), you can also track specific custom user actions (such as taps, clicks, and scrolls) with `RumMonitor#addAction`. For continuous action tracking (for example, tracking a user scrolling a list), use `RumMonitor#startAction` and `RumMonitor#stopAction`.

The action type should be one of the following: "custom", "click", "tap", "scroll", "swipe", "back".

```kotlin
fun onUserInteraction() {
    GlobalRumMonitor.get().addAction(actionType, name, actionAttributes)
}
```

For the attributes collected, see [Data Collected][2].

[1]: /real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=kotlin_multiplatform#initialization-parameters
[2]: /real_user_monitoring/setup/data_collected/?platform=kotlin_multiplatform
