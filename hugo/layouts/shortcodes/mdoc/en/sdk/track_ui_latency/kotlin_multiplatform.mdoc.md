## View loading time

To notify the SDK that your view finished loading, call `addViewLoadingTime` through `GlobalRumMonitor.get()` when your view is fully loaded and displayed:

```kotlin
@OptIn(ExperimentalRumApi::class)
fun onViewLoaded() {
    GlobalRumMonitor.get().addViewLoadingTime(overwrite = false)
}
```

Set `overwrite` to `true` to replace the previously calculated loading time for the current view. Call this method only once per view. This API is marked `@ExperimentalRumApi` and might change.

## Custom timings

To measure how long a specific part of your app takes, such as a hero image appearing, use `addTiming`:

```kotlin
fun onHeroImageLoaded() {
    GlobalRumMonitor.get().addTiming("hero_image")
}
```

To [create a measure][1] from a custom timing in the RUM Explorer, use the `@view.custom_timings.<timing_name>` attribute.

## Automatically track long tasks

Long running operations performed on the main thread can impact the visual performance and reactivity of your application. To track these operations, define the duration threshold above which a task is considered too long.

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
  // …
  .trackLongTasks(durationThreshold)
  .build()
```

For example, to replace the default `100 ms` duration, set a custom threshold in your configuration.

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
  // …
  .trackLongTasks(250L) // track tasks longer than 250ms as long tasks
  .build()
```

## Mobile vitals

The underlying Android and iOS SDKs collect mobile vitals, such as refresh rate, CPU usage, and memory usage. For the vitals collected on each platform, see mobile vitals for [Android](/real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=android#mobile-vitals) and [iOS](/real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=ios#mobile-vitals).

To change how often mobile vitals are collected, use `setVitalsUpdateFrequency`:

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
  // …
  .setVitalsUpdateFrequency(VitalsUpdateFrequency.AVERAGE)
  .build()
```

Available values are `FREQUENT`, `AVERAGE`, `RARE`, and `NEVER`.

[1]: /real_user_monitoring/investigate_problems/explore_retained_data/search/#setup-facets-and-measures
