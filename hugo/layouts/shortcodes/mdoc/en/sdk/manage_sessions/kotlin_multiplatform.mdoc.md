## Event and data management

The Kotlin Multiplatform SDK first stores events. It only uploads these events when the [intake specification][9] conditions are met.

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

## Track background events

You can track events such as crashes and network requests when your application is in the background (for example, no active view is available).

Add the following snippet during RUM configuration:

```kotlin
.trackBackgroundEvents(true)
```

{% alert level="info" %}
Tracking background events may lead to additional sessions, which can impact billing. For questions, [contact Datadog support][a1].
{% /alert %}

## Retrieve the RUM session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```kotlin
GlobalRumMonitor.get().getCurrentSessionId { sessionId ->
  currentSessionId = sessionId
}
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
