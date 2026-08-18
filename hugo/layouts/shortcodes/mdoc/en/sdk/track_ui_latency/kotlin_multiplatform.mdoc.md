### Custom timings

To measure how long a specific part of your app takes, such as a hero image appearing, use `addTiming`:

```kotlin
fun onHeroImageLoaded() {
    GlobalRumMonitor.get().addTiming("hero_image")
}
```

To [create a measure][1] from a custom timing in the RUM Explorer, use the `@view.custom_timings.<timing_name>` attribute.

View loading time, Time to Network Settled, Interaction to Next View, and mobile vitals aren't available for the Kotlin Multiplatform SDK yet.

[1]: /real_user_monitoring/explorer/search/#setup-facets-and-measures
