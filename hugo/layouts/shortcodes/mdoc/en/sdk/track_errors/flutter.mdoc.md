### Automated error reporting

Uncaught Dart errors are reported automatically once RUM is enabled. To also report crashes that originate from native iOS or Android code, set `nativeCrashReportEnabled` to `true` in your `DdSdkConfiguration`:

```dart
DdSdkConfiguration(
    // ...
    nativeCrashReportEnabled: true,
)
```

### Get deobfuscated crash reports

Upload your dSYM, Proguard mapping, and Dart symbol files with `datadog-ci flutter-symbols upload`. See [Flutter Crash Reporting and Error Tracking][1] for the full upload setup, including advanced configuration for build flavors and version numbers.

[1]: /real_user_monitoring/application_monitoring/flutter/error_tracking/
