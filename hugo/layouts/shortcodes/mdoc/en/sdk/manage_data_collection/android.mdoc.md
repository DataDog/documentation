To configure tracking consent, see [Configure tracking consent](/real_user_monitoring/setup/install/?platform=android#configure-tracking-consent-gdpr-compliance).

The Android SDK first stores events and only uploads events when the [intake specifications](/real_user_monitoring/setup/install/?platform=android) conditions are met.

### Clear all data

To delete all unsent data stored by the SDK, call `Datadog.clearAllData()`:

```kotlin
Datadog.clearAllData()
```

### Stop data collection

To stop an SDK instance from collecting and uploading any more data, call `Datadog.stopInstance()`. Pass an instance name to stop a named instance, or omit it to stop the default instance:

```kotlin
Datadog.stopInstance()
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

See an [example of this API](https://github.com/DataDog/dd-sdk-android/blob/eaa15cd344d1723fafaf179fcebf800d6030c6bb/sample/kotlin/src/main/kotlin/com/datadog/android/sample/SampleApplication.kt#L279) being used.

### Set remote log threshold

You can define the minimum log level (priority) to send events to Datadog in a logger instance. If the log priority is below the one you set at this threshold, it does not get sent. The default value is -1 (allow all).

```kotlin
fun setRemoteLogThreshold(minLogThreshold: Int): Builder {
    minDatadogLogsPriority = minLogThreshold
    return this
}
```
