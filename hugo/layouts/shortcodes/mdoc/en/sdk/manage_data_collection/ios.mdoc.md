The iOS SDK first stores events locally and only uploads events when the [intake specifications][1] conditions are met.

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

[1]: /real_user_monitoring/application_monitoring/ios/setup
