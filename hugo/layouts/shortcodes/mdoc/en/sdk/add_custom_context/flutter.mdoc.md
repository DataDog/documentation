In addition to the [default RUM attributes][1] captured by the Datadog Flutter SDK automatically, you can add contextual information (such as custom attributes) to your RUM events to enrich your observability within Datadog.

Custom attributes allow you to filter and group information about observed user behavior (such as the cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

{% alert level="info" %}
Custom attributes are intended for small, targeted pieces of information such as IDs, flags, or short labels. Avoid attaching large objects such as full HTTP response payloads, which can significantly increase event size and impact performance.
{% /alert %}

## Add global attributes

Global attributes are attached to all RUM events sent after you set them.

* To add or update an attribute, use `addAttribute`.
* To remove an attribute, use `removeAttribute`.

```dart
// Add or update a global attribute
DatadogSdk.instance.rum?.addAttribute('cart_value', 42.5);

// Remove a global attribute
DatadogSdk.instance.rum?.removeAttribute('cart_value');
```

**Note**: Avoid spaces or special characters in attribute key names. For example, use `"account_tier"` instead of `"Account Tier"`. Keys with spaces or special characters cannot be used as facets in the Datadog UI.

## Add attributes to individual events

To add attributes to a single view, action, error, or resource, pass them when you track that event. For details, see:

- [Track Navigation][2]
- [Track User Interactions][3]
- [Track Errors][4]
- [Track Network Requests][5]

[1]: /real_user_monitoring/setup/data_collected/?platform=flutter
[2]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=flutter
[3]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=flutter
[4]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=flutter
[5]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=flutter
