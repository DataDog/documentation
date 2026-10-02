{% alert level="info" %}
Tracking background events may lead to additional sessions, which can impact billing. For questions, [contact Datadog support](/help/).
{% /alert %}

You can track events such as crashes and network requests when your application is in the background (for example, when no active view is available). By default, `trackBackgroundEvents` is set to `false`.

To track background events, set `trackBackgroundEvents` to `true` when you enable RUM:

{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    trackBackgroundEvents: true
  )
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogRUM;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
configuration.trackBackgroundEvents = YES;

[DDRUM enableWith:configuration];
```

{% /tab %}
{% /tabs %}

When the application leaves the foreground, RUM stops the current view. Without background event tracking, events tracked while no view is active are skipped. For details, see [Data Collected][1].

[1]: /real_user_monitoring/setup/data_collected/?platform=ios#views-instrumentation-versus-app-lifecycle
