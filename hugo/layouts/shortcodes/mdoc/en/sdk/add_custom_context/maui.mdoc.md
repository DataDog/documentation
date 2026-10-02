In addition to the [default RUM attributes][1] captured by the .NET MAUI SDK, you can attach contextual information, such as feature flags, experiment IDs, plan tier, or other business attributes, to the events the SDK sends.

{% alert level="info" %}
Custom attributes are intended for small, targeted pieces of information such as IDs, flags, or short labels. Avoid attaching large objects such as full HTTP response payloads, which can significantly increase event size and impact performance.
{% /alert %}

## Add global attributes

Global attributes are attached to every RUM, Log, and Trace event the SDK emits.

```csharp
// Add one attribute
DdSdk.AddAttribute("plan", "premium");

// Add several at once
DdSdk.AddAttributes(new Dictionary<string, object>
{
    { "plan", "premium" },
    { "experiment", "new-checkout-flow" }
});

// Remove one
DdSdk.RemoveAttribute("experiment");

// Remove several
DdSdk.RemoveAttributes(new List<string> { "plan", "experiment" });
```

**Note**: Avoid spaces or special characters in attribute key names. For example, use `"account_tier"` instead of `"Account Tier"`. Keys with spaces or special characters cannot be used as facets in the Datadog UI.

## Add view attributes

`AddViewAttribute` and `RemoveViewAttribute` attach key-value pairs to the active view event. Call `AddViewAttribute` **after** the view has been started by the SDK. With automatic view tracking enabled, override `OnNavigatedTo` on your page (not the constructor or `OnAppearing`). By the time `OnNavigatedTo` runs, the SDK has already called `StartView` for the destination, so the attribute is attached to the right view.

```csharp
protected override void OnNavigatedTo(NavigatedToEventArgs args)
{
    base.OnNavigatedTo(args);
    DdRum.AddViewAttribute("screen_variant", "A");
}

// Later, to remove it:
DdRum.RemoveViewAttribute("screen_variant");
```

## Add attributes to individual events

To track custom views, actions, resources, errors, and timings, see [Track Navigation][2], [Track User Interactions][3], [Track Network Requests][4], [Track Errors][5], and [Track UI Latency][6].

[1]: /real_user_monitoring/setup/data_collected/?platform=maui
[2]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=maui
[3]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=maui
[4]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=maui
[5]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=maui
[6]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=maui
