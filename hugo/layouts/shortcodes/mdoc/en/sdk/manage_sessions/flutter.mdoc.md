## Configure the session sample rate

Use the `sessionSamplingRate` parameter of `DatadogRumConfiguration` to set the percentage of sessions the SDK sends to Datadog, between `0.0` and `100.0`. The default is `100.0` (all sessions):

```dart
final configuration = DatadogConfiguration(
    // other configuration...
    rumConfiguration: DatadogRumConfiguration(
        applicationId: '<YOUR_APPLICATION_ID>',
        sessionSamplingRate: 100.0,
    ),
);
```

You can adjust the session sample rate, but Datadog recommends using [retention filters][1] to control retained volume. For the full parameter reference, see [Initialization parameters][2].

## Retrieve the session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```dart
final sessionId = await DatadogSdk.instance.rum?.getCurrentSessionId();
```

[1]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
[2]: /real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=flutter#initialization-parameters
