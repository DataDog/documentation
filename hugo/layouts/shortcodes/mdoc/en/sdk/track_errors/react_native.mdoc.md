### Automated error reporting

To report JavaScript crashes and errors, set `trackErrors` to `true` in your RUM configuration. To also report crashes that originate from native iOS or Android code, set `nativeCrashReportEnabled` to `true`:

```javascript
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    {
        rumConfiguration: {
            applicationId: '<APPLICATION_ID>',
            trackInteractions: true,
            trackResources: true,
            trackErrors: true, // Enable JavaScript Crash Reporting
            nativeCrashReportEnabled: true, // Optional: Enable Native Crash Reporting
        },
        logsConfiguration: {},
        traceConfiguration: {}
    }
);
```

### Get deobfuscated stack traces

Upload your source maps and symbol files so Datadog can deobfuscate your crash reports. See [React Native Crash Reporting and Error Tracking][1] for the full setup, including Metro configuration and build-phase scripts for iOS and Android.

[1]: /real_user_monitoring/application_monitoring/react_native/error_tracking/#get-deobfuscated-stack-traces
