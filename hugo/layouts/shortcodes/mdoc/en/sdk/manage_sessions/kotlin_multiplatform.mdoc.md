## Configure the session sample rate

Use `setSessionSampleRate(<sampleRate>)` in your RUM configuration to set the RUM sessions sample rate. The sample rate is a percentage between 0 and 100: `0` means no RUM events are sent, and `100` (the default) means all sessions are kept.

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
    .setSessionSampleRate(100.0f)
    .build()
Rum.enable(rumConfig)
```

You can adjust the session sample rate, but Datadog recommends using [retention filters][1] to control retained volume. For the full parameter reference, see [Initialization parameters][2].

## Retrieve the session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```kotlin
GlobalRumMonitor.get().getCurrentSessionId { sessionId ->
  currentSessionId = sessionId
}
```

[1]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
[2]: /real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=kotlin_multiplatform#initialization-parameters
