iOS RUM automatically tracks attributes such as user activity, screens, errors, and network requests. See the [RUM Data Collection documentation][1] to learn about the RUM events and default attributes. You can further enrich user session information and gain finer control over the attributes collected by adding custom attributes.

Custom attributes allow you to filter and group information about observed user behavior (such as the cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

{% alert level="info" %}
Custom attributes are intended for small, targeted pieces of information (for example, IDs, flags, or short labels). Avoid attaching large objects such as full HTTP response payloads. This can significantly increase event size and impact performance.
{% /alert %}

**Note**: You can't create facets on custom attributes if you use spaces or special characters in your key names. For example, use `forKey: "store_id"` instead of `forKey: "Store ID"`.

## Add global attributes

Global attributes are attached to all RUM events collected after you set them.

* To add an attribute, use `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<VALUE>")`.
* To update the value, use `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<UPDATED_VALUE>")`.
* To remove the key, use `RUMMonitor.shared().removeAttribute(forKey: "<KEY_TO_REMOVE>")`.

For better performance in bulk operations (modifying multiple attributes at once), use `.addAttributes(_:)` and `.removeAttributes(forKeys:)`.

## Add view attributes

View attributes are attached to the active view and automatically propagated to all its child events, including resources, user actions, errors, and long tasks.

* To add or update an attribute, use `RUMMonitor.shared().addViewAttribute(forKey: "<KEY>", value: "<VALUE>")`.
* To remove the key, use `RUMMonitor.shared().removeViewAttribute(forKey: "<KEY_TO_REMOVE>")`.

For bulk operations, use `.addViewAttributes(_:)` and `.removeViewAttributes(forKeys:)`.

## Add attributes to specific events

To attach attributes to a single event, pass them when you track the event. For details, see [Track Navigation][2], [Track User Interactions][3], [Track Errors][4], and [Track Network Requests][5].

[1]: /real_user_monitoring/setup/data_collected/?platform=ios
[2]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=ios
[3]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=ios
[4]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=ios
[5]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=ios
