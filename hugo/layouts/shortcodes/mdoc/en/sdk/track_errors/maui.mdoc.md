### Automated error reporting

C# error tracking is enabled automatically as soon as RUM is enabled—no extra configuration is required. The SDK captures unhandled C# exceptions and unobserved task exceptions.

To also report crashes that originate from native iOS or Android code, set `NativeCrashReportEnabled` on the SDK configuration:

```csharp
.UseDatadog(new DdSdkConfiguration
{
    ClientToken = "<CLIENT_TOKEN>",
    Environment = "<ENV_NAME>",
    TrackingConsent = TrackingConsent.Granted,
    NativeCrashReportEnabled = true,
})
```

### Manual error reporting

To report an error manually, use `DdRum.AddError`.

### Get deobfuscated crash reports

Upload your Android mapping files, iOS `.dSYM` bundles, and bundle Portable PDB files so Datadog can resolve your crash reports. See [.NET MAUI Crash Reporting and Error Tracking][1] for the full setup.

[1]: /real_user_monitoring/application_monitoring/maui/error_tracking/
