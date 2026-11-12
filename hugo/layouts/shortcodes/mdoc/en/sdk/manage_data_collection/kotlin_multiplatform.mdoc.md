To configure tracking consent, see the **Configure tracking consent (GDPR compliance)** step in [Install the Datadog SDK](/real_user_monitoring/setup/install/?platform=kotlin_multiplatform).

The Kotlin Multiplatform SDK first stores events. It only uploads these events when the [intake specification](/real_user_monitoring/setup/install/?platform=kotlin_multiplatform) conditions are met.

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
