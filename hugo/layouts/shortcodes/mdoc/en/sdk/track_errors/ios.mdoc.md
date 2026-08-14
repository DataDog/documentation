### Automated error reporting

To report fatal crashes, add the Crash Reporting module and enable it after initializing the SDK:

```swift
import DatadogCore
import DatadogCrashReporting

Datadog.initialize(...)

CrashReporting.enable()
```

To also report **App Hangs** (the app becomes unresponsive for too long), enable Crash Reporting and set an `appHangThreshold`, in seconds:

```swift
RUM.enable(
    with: RUM.Configuration(
        applicationID: "<application id>",
        appHangThreshold: 0.25
    )
)
```

To also report **Watchdog Terminations** (the OS kills the app for being unresponsive or using excessive resources), enable Crash Reporting and set `trackWatchdogTerminations`:

```swift
RUM.enable(
    with: RUM.Configuration(
        applicationID: "<application id>",
        trackWatchdogTerminations: true
    )
)
```

### Get symbolicated crash reports

Upload your `.dSYM` files so Datadog can symbolicate your crash reports. See [iOS Crash Reporting and Error Tracking][1] for the full setup, including `datadog-ci`, Fastlane, and GitHub Actions upload options.

[1]: /real_user_monitoring/application_monitoring/ios/error_tracking/
