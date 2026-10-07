### Add your own performance timing

In addition to RUM's default attributes, you can measure where your application is spending its time by using the `addTiming` API. The timing measure is relative to the start of the current RUM view. For example, you can time how long it takes for your hero image to appear:

```kotlin
fun onHeroImageLoaded() {
    GlobalRumMonitor.get().addTiming("hero_image")
}
```

After the timing is sent, the timing is accessible as `@view.custom_timings.<timing_name>`. For example: `@view.custom_timings.hero_image`. You must [create a measure][8] before graphing it in RUM analytics or in dashboards.

### Automatically track long tasks

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

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/kotlin_multiplatform
[3]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/data_collected
[4]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/advanced_configuration/#automatically-track-views
[5]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/advanced_configuration/#initialization-parameters
[6]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/#initialize-rum-ktor-plugin-to-track-network-events-made-with-ktor
[7]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/data_collected
[8]: /real_user_monitoring/explorer/search/#setup-facets-and-measures
[9]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/#sending-data-when-device-is-offline
[10]: /real_user_monitoring/error_tracking/mobile/ios/#add-app-hang-reporting
[a1]: https://docs.datadoghq.com/help/
