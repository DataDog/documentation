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

[1]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
