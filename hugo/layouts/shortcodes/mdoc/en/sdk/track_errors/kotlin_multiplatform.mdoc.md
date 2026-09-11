### Custom errors

To track specific errors, notify the monitor when an error occurs with the message, source, exception, and additional attributes. See the [Attributes collected documentation][7].

```kotlin
GlobalRumMonitor.get().addError(message, source, throwable, attributes)
```

**Note**: `addError` method accepting `NSError` is also available from iOS source set.

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
