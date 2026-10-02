## Configure the session sample rate

Use the `sessionSampleRate` parameter in `RUM.Configuration` to control the percentage of RUM sessions sent to Datadog. The value must be between `0.0` and `100.0`. A value of `0.0` means no sessions are sent, while `100.0` (the default) means all sessions are sent. For the full parameter reference, see [Initialization parameters][1].

{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    sessionSampleRate: 100
  )
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogRUM;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
configuration.sessionSampleRate = 100;

[DDRUM enableWith:configuration];
```

{% /tab %}
{% /tabs %}

You can adjust the session sample rate, but Datadog recommends using [retention filters][2] to control retained volume.

## Retrieve the session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```swift
RUMMonitor.shared().currentSessionID(completion: { sessionId in
  currentSessionId = sessionId
})
```

[1]: /real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=ios#initialization-parameters
[2]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
