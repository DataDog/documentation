The iOS SDK first stores events locally and only uploads events when the [intake specifications](/real_user_monitoring/setup/install/?platform=ios) conditions are met.

To configure tracking consent, see [Configure tracking consent](/real_user_monitoring/setup/install/?platform=ios#configure-tracking-consent-gdpr-compliance).

### Clear all data

You have the option of deleting all unsent data stored by the SDK with the `Datadog.clearAllData()` API.

```swift
import DatadogCore

Datadog.clearAllData()
```

### Stop data collection

You can use the `Datadog.stopInstance()` API to stop an SDK instance from collecting and uploading data further. Pass an instance name to stop a named instance, or omit it to stop the default instance. In Objective-C, pass `nil` to stop the default instance.

```swift
import DatadogCore

Datadog.stopInstance()
```

Calling this method disables the SDK and all active features, such as RUM. To resume data collection, you must reinitialize the SDK. You can use this API if you want to change configurations dynamically.
