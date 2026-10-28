{% alert level="info" %}
Tracking background events may lead to additional sessions, which can impact billing. For questions, [contact Datadog support][1].
{% /alert %}

You can track events such as crashes and network requests when your application is in the background (for example, when no active view is available). Tracking background events also helps report crashes that occur before a view is visible or after the user moves the app to the background.

To track background events, set `TrackBackgroundEvents` to `true` when you enable RUM:

```csharp
.UseDatadogRum(new DdRumConfiguration
{
    ApplicationId = "<APPLICATION_ID>",
    TrackBackgroundEvents = true,
})
```

[1]: /help/
