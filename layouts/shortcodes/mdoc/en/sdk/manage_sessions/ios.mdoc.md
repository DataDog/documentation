## Track background events

{% alert level="info" %}
Tracking background events may lead to additional sessions, which can impact billing. For questions, [contact Datadog support](https://docs.datadoghq.com/help/).
{% /alert %}

You can track events such as crashes and network requests when your application is in the background (for example, no active view is available).

To track background events, add the following snippet during initialization in your Datadog configuration:

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    ...
    trackBackgroundEvents: true
  )
)
```

## Retrieve the RUM session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```swift
RumMonitor.shared().currentSessionID(completion: { sessionId in
  currentSessionId = sessionId
})
```

## Set tracking consent (GDPR compliance)

To be compliant with the GDPR regulation, the RUM iOS SDK requires the tracking consent value at initialization.

The `trackingConsent` setting can be one of the following values:

1. `.pending`: The RUM iOS SDK starts collecting and batching the data but does not send it to Datadog. The RUM iOS SDK waits for the new tracking consent value to decide what to do with the batched data.
2. `.granted`: The RUM iOS SDK starts collecting the data and sends it to Datadog.
3. `.notGranted`: The RUM iOS SDK does not collect any data. No logs, traces, or RUM events are sent to Datadog.

To change the tracking consent value after the RUM iOS SDK is initialized, use the `Datadog.set(trackingConsent:)` API call. The RUM iOS SDK changes its behavior according to the new value.

For example, if the current tracking consent is `.pending`:

- If you change the value to `.granted`, the RUM iOS SDK sends all current and future data to Datadog;
- If you change the value to `.notGranted`, the RUM iOS SDK wipes all current data and does not collect future data.

## Data management

The iOS SDK first stores events locally and only uploads events when the [intake specifications][9] conditions are met.

### Clear all data

You have the option of deleting all unsent data stored by the SDK with the `Datadog.clearAllData()` API.

```swift
import DatadogCore

Datadog.clearAllData()
```

### Stop data collection

You can use the `Datadog.stopInstance()` API to stop a named SDK instance (or the default instance if the name is `nil`) from collecting and uploading data further.

```swift
import DatadogCore

Datadog.stopInstance()
```

Calling this method disables the SDK and all active features, such as RUM. To resume data collection, you must reinitialize the SDK. You can use this API if you want to change configurations dynamically.

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/ios
[3]: /real_user_monitoring/application_monitoring/ios/data_collected/
[4]: https://github.com/DataDog/dd-sdk-ios/blob/master/DatadogRUM/Sources/RUMMonitorProtocol.swift
[5]: /real_user_monitoring/application_monitoring/ios/data_collected/?tab=error#error-attributes
[6]: /real_user_monitoring/application_monitoring/ios/data_collected/?tab=session#default-attributes
[7]: https://www.ntppool.org/en/
[8]: /real_user_monitoring/error_tracking/mobile/ios/#add-app-hang-reporting
[9]: /real_user_monitoring/application_monitoring/ios/setup
