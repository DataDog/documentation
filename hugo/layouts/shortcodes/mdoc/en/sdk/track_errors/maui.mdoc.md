## Automated error reporting

C# error tracking starts automatically when RUM is enabled, with no extra configuration required. The SDK captures unhandled exceptions (`AppDomain.UnhandledException`) and unobserved task exceptions (`TaskScheduler.UnobservedTaskException`) and reports them as RUM errors.

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

## Manual error reporting

To report a specific error, call `DdRum.AddError` with the message, source, and a stack trace string:

```csharp
DdRum.AddError("Something went wrong", RumErrorSource.Source, "stacktrace here");
```

For the attributes collected, see [Data Collected][1].

## Upload debug symbols to get deobfuscated stack traces

To resolve method names and crash addresses in native iOS crash reports, upload your app's `.dSYM` bundle to Datadog. The `Datadog.Maui` NuGet package ships an MSBuild target that uploads symbols automatically as part of `dotnet publish`:

1. Install the `datadog-ci` command line tool:

   ```bash
   npm install -g @datadog/datadog-ci
   ```

2. Export your Datadog API key in the shell that runs `dotnet publish`. In CI environments, store it as a secret environment variable. Don't commit the key to source control.

   ```bash
   export DATADOG_API_KEY=<YOUR_DATADOG_API_KEY>
   ```

3. Set `DatadogUploadSymbols=true` in your `.csproj` or on the command line, and publish a device build:

   ```bash
   dotnet publish -c Release -f net10.0-ios -r ios-arm64 \
     -p:DatadogUploadSymbols=true
   ```

dSYMs are only produced for device builds (`-r ios-arm64`). Set `DatadogServiceName` and `DatadogSite` MSBuild properties if they differ from the defaults, so they match your SDK configuration. Android R8/ProGuard mapping files and Portable PDB files aren't uploaded. For the full list of properties and limitations, see [.NET MAUI Crash Reporting and Error Tracking][2].

[1]: /real_user_monitoring/setup/data_collected/?platform=maui
[2]: /error_tracking/frontend/mobile/maui/
