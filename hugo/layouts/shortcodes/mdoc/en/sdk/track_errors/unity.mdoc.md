### Automated error reporting

Native crash reporting is always on once RUM is enabled—no configuration required.

To also forward uncaught exceptions from Unity's logs, select **Forward Unity Logs** when configuring the SDK. Datadog then reports exceptions logged with `Debug.LogException` as RUM errors.

### Manual error reporting

To report a caught exception manually, use `DdRum.AddError`:

```csharp
try
{
  // Error prone code
}
catch(Exception e)
{
  DatadogSdk.Instance.Rum.AddError(e, RumErrorSource.Source);
}
```

### Get deobfuscated and symbolicated stack traces

Upload your dSYM, `.so`, Proguard, and IL2CPP symbol files with `datadog-ci unity-symbols upload`. See [Unity Crash Reporting and Error Tracking][1] for the full setup.

[1]: /real_user_monitoring/application_monitoring/unity/error_tracking/
