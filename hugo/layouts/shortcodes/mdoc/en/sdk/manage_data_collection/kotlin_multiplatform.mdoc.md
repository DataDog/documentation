The Kotlin Multiplatform SDK first stores events. It only uploads these events when the [intake specification][1] conditions are met.

### Clear all data

You have the option of deleting all unsent data stored by the SDK with the `clearAllData` API.

```kotlin
Datadog.clearAllData()
```

### Stop data collection

You can use the `stopInstance` API to stop the SDK instance from collecting and uploading data further.

```kotlin
Datadog.stopInstance()
```

### Set remote log threshold

You can define the minimum log level (priority) to send events to Datadog in a logger instance. If the log priority is below the one you set at this threshold, it does not get sent. The default value is to allow all.

```kotlin
val logger = Logger.Builder()
  .setRemoteLogThreshold(LogLevel.INFO)
  .build()
```

[1]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/#sending-data-when-device-is-offline
