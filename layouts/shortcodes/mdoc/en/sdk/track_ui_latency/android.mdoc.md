### Automatically track long tasks

Long running operations performed on the main thread can impact the visual performance and reactivity of your application. To track these operations, define the duration threshold above which a task is considered too long.

{% tabs %}
{% tab label="Kotlin" %}
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

{% /tab %}
{% tab label="Java" %}

```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
  // …
  .trackLongTasks(durationThreshold)
  .build();
```

For example, to replace the default `100 ms` duration, set a custom threshold in your configuration.

```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
  // …
  .trackLongTasks(250L) // track tasks longer than 250ms as long tasks
  .build();
```

{% /tab %}
{% /tabs %}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/android
[3]: /real_user_monitoring/android/data_collected
[4]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-views
[5]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#initialization-parameters
[6]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-network-requests
[7]: /real_user_monitoring/android/data_collected/#event-specific-attributes
[8]: /real_user_monitoring/application_monitoring/android/setup/#sending-data-when-device-is-offline
[9]: https://github.com/DataDog/dd-sdk-android/blob/eaa15cd344d1723fafaf179fcebf800d6030c6bb/sample/kotlin/src/main/kotlin/com/datadog/android/sample/SampleApplication.kt#L279
[10]: https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget
[11]: /real_user_monitoring/application_monitoring/android/monitoring_app_performance/#time-to-network-settled
[12]: https://square.github.io/okhttp/features/events/
[13]: /real_user_monitoring/application_monitoring/android/monitoring_app_performance/#interaction-to-next-view
[14]: /real_user_monitoring/application_monitoring/android/setup?tab=kotlin#setup
