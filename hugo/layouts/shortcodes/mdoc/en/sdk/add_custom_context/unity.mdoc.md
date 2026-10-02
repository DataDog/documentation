In addition to the [default RUM attributes][1] captured by the Datadog Unity SDK automatically, you can add contextual information (such as custom attributes) to your RUM events to enrich your observability within Datadog.

Custom attributes allow you to filter and group information about observed user behavior (such as the cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

{% alert level="info" %}
Custom attributes are intended for small, targeted pieces of information such as IDs, flags, or short labels. Avoid attaching large objects such as full HTTP response payloads, which can significantly increase event size and impact performance.
{% /alert %}

## Add global attributes

To add or update a global attribute, use `AddAttribute`. To remove it, use `RemoveAttribute`:

```csharp
// Add or update a global attribute
DatadogSdk.Instance.Rum.AddAttribute("cart_value", 42.5);

// Remove a global attribute
DatadogSdk.Instance.Rum.RemoveAttribute("cart_value");
```

**Note**: Avoid spaces or special characters in attribute key names. For example, use `"account_tier"` instead of `"Account Tier"`. Keys with spaces or special characters cannot be used as facets in the Datadog UI.

## Add attributes to individual events

To attach attributes to a single view, action, resource, or error, pass them to the corresponding tracking call. See [Track Navigation][2], [Track User Interactions][3], [Track Errors][4], and [Track Network Requests][5].

[1]: /real_user_monitoring/setup/data_collected/?platform=unity
[2]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=unity
[3]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=unity
[4]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=unity
[5]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=unity
