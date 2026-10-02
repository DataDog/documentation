{% alert level="info" %}
Custom attributes are intended for small, targeted pieces of information such as IDs, flags, or short labels. Avoid attaching large objects such as full HTTP response payloads, which can significantly increase event size and impact performance.
{% /alert %}

## Add global attributes

You can keep global attributes to track information about a specific session, such as A/B testing configuration, ad campaign origin, or cart status. These attributes are attached to all future Logs, Spans, and RUM events.

### Add multiple global attributes

Use `addAttributes` to add or update several attributes at once.

```js
DdSdkReactNative.addAttributes({
    profile_mode: 'wall',
    chat_enabled: true,
    campaign_origin: 'example_ad_network'
});
```

### Add a single global attribute

Use `addAttribute` when you want to add or update a single attribute.

```js
DdSdkReactNative.addAttribute('profile_mode', 'wall');
DdSdkReactNative.addAttribute('chat_enabled', true);
```

If the attribute already exists, its value is overwritten.

### Remove a single global attribute

Use `removeAttribute` to remove a specific attribute from the global context.

```js
DdSdkReactNative.removeAttribute('campaign_origin');
```

After removal, the attribute is no longer attached to future Logs, Spans, or RUM events.

### Remove multiple global attributes

Use `removeAttributes` to remove several attributes at once.

```js
DdSdkReactNative.removeAttributes([
    'profile_mode',
    'chat_enabled'
]);
```

This is useful when cleaning up session-specific data, such as when a user logs out or exits a feature flow.

**Note**: Avoid spaces or special characters in attribute key names. For example, use `"account_tier"` instead of `"Account Tier"`. Keys with spaces or special characters cannot be used as facets in the Datadog UI.

## Add attributes to individual events

To add attributes to a single view, action, error, or resource, pass them when you track that event. For details, see:

- [Track Navigation][1]
- [Track User Interactions][2]
- [Track Errors][3]
- [Track Network Requests][4]

[1]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=react_native
[2]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=react_native
[3]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=react_native
[4]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=react_native
