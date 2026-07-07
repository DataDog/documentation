## Event and data management

The Android SDK first stores events and only uploads events when the [intake specifications][8] conditions are met.

### Clear all data

You have the option of deleting all unsent data stored by the SDK with the `clearAllData` API.

```kotlin
fun clearAllData(sdkCore: SdkCore = getInstance()) {
    sdkCore.clearAllData()
}
```

### Stop data collection

You can use the `StopInstance` API to stop the SDK instance assigned to the given name (or the default instance if the name is null) from collecting and uploading data further.

```kotlin
fun stopInstance(instanceName: String? = null) {
    synchronized(registry) {
        val instance = registry.unregister(instanceName)
        (instance as? DatadogCore)?.stop()
    }
}
```

### Control event buildup

Many operations, such as data processing and event I/O, are queued in background threads to handle edge cases where the queue has grown so much that there could be delayed processing, high memory usage, or Application Not Responding (ANR) errors.

You can control the buildup of events on the SDK with the `setBackpressureStrategy` API. This API ignores new tasks if a queue reaches 1024 items.

```kotlin
fun setBackpressureStrategy(backpressureStrategy: BackPressureStrategy): Builder {
    coreConfig = coreConfig.copy(backpressureStrategy = backpressureStrategy)
    return this
}
```

See an [example of this API][9] being used.

### Set remote log threshold

You can define the minimum log level (priority) to send events to Datadog in a logger instance. If the log priority is below the one you set at this threshold, it does not get sent. The default value is -1 (allow all).

```kotlin
fun setRemoteLogThreshold(minLogThreshold: Int): Builder {
    minDatadogLogsPriority = minLogThreshold
    return this
}
```

## Retrieve the RUM session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```kotlin
GlobalRumMonitor.get().getCurrentSessionId { sessionId ->
  currentSessionId = sessionId
}
```

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
