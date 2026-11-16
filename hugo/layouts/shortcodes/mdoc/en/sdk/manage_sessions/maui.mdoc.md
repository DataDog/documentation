## Configure the session sample rate

The session sample rate controls the percentage of RUM sessions sent to Datadog. Set `SessionSampleRate` to a value between 0 and 100 when you enable RUM. The default is `100.0`, which keeps all sessions.

```csharp
.UseDatadogRum(new DdRumConfiguration
{
    ApplicationId = "<APPLICATION_ID>",
    SessionSampleRate = 100.0,
})
```

You can adjust the session sample rate, but Datadog recommends using [retention filters][1] to control retained volume.

## Retrieve the session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

To access the RUM session ID at runtime, use `DdRum.GetCurrentSessionId()` (requires .NET MAUI SDK v0.2.0 or later). It returns `null` if no session is active yet:

```csharp
string? sessionId = DdRum.GetCurrentSessionId();
```

[1]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
