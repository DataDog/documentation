In addition to the [default RUM attributes][1] captured by the Kotlin Multiplatform SDK automatically, you can add contextual information, such as custom attributes, to your RUM events. Custom attributes allow you to filter and group information about observed user behavior (such as cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

{% alert level="info" %}
Custom attributes are intended for small, targeted pieces of information such as IDs, flags, or short labels. Avoid attaching large objects such as full HTTP response payloads, which can significantly increase event size and impact performance.
{% /alert %}

## Add global attributes

To add an attribute to all future RUM events, or remove it, use `addAttribute` and `removeAttribute`:

```kotlin
// Adds an attribute to all future RUM events
GlobalRumMonitor.get().addAttribute(key, value)

// Removes an attribute from all future RUM events
GlobalRumMonitor.get().removeAttribute(key)
```

**Note**: Avoid spaces or special characters in attribute key names. For example, use `"account_tier"` instead of `"Account Tier"`. Keys with spaces or special characters cannot be used as facets in the Datadog UI.

## Add attributes to specific events

To add attributes to a single view, action, resource, or error, pass them when you track that event. See:

- [Track Navigation][2]
- [Track User Interactions][3]
- [Track Network Requests][4]
- [Track Errors][5]

[1]: /real_user_monitoring/setup/data_collected/?platform=kotlin_multiplatform
[2]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=kotlin_multiplatform
[3]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=kotlin_multiplatform
[4]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=kotlin_multiplatform
[5]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=kotlin_multiplatform
