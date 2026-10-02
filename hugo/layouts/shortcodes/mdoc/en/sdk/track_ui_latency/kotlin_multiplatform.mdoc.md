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

View loading time, Time to Network Settled, Interaction to Next View, and mobile vitals aren't available for the Kotlin Multiplatform SDK yet.

[1]: /real_user_monitoring/investigate_problems/explore_retained_data/search/#setup-facets-and-measures
