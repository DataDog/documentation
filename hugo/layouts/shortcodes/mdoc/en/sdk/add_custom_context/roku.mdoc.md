In addition to the [default RUM attributes][1] captured by the Roku SDK automatically, you can add contextual information, such as custom attributes, to your RUM events. Custom attributes allow you to filter and group information about observed user behavior (such as cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, or network health).

{% alert level="info" %}
Custom attributes are intended for small, targeted pieces of information such as IDs, flags, or short labels. Avoid attaching large objects such as full HTTP response payloads, which can significantly increase event size and impact performance.
{% /alert %}

## Add global attributes

To add custom attributes to all RUM events, set the `datadogContext` global field. Setting the field again replaces the previous attributes:

```text
    m.global.setField("datadogContext", { foo: "Some value", bar: 123})
```

**Note**: Avoid spaces or special characters in attribute key names. For example, use `"account_tier"` instead of `"Account Tier"`. Keys with spaces or special characters cannot be used as facets in the Datadog UI.

## Add attributes to individual events

To attach information to a single view, action, resource, or error, see [Track Navigation][2], [Track User Interactions][3], [Track Errors][4], and [Track Network Requests][5].

[1]: /real_user_monitoring/setup/data_collected/?platform=roku
[2]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=roku
[3]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=roku
[4]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=roku
[5]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=roku
