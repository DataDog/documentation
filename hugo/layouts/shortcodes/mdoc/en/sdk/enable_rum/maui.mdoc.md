<!--
This partial contains instructions for enabling RUM with the .NET MAUI SDK.
-->

Call `DdRum.Enable` (or use the `UseDatadogRum` builder extension) after the SDK is initialized:

```csharp
DdRum.Enable(new DdRumConfiguration { ApplicationId = "<APPLICATION_ID>" });
```

When RUM is enabled, the SDK automatically tracks views, user interactions, network requests, and errors. To customize what's collected, see [Track Navigation][1], [Track User Interactions][2], [Track Network Requests][3], and [Track Errors][4].

[1]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=maui
[2]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=maui
[3]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=maui
[4]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=maui
