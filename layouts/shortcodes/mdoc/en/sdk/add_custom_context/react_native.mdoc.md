### Global attributes

You can keep global attributes to track information about a specific session, such as A/B testing configuration, ad campaign origin, or cart status. These attributes are attached to all future Logs, Spans, and RUM events.

**Add multiple global attributes**

Use `addAttributes` to add or update several attributes at once.

```js
DdSdkReactNative.addAttributes({
    profile_mode: 'wall',
    chat_enabled: true,
    campaign_origin: 'example_ad_network'
});
```

**Add a single global attribute**

Use `addAttribute` when you want to add or update a single attribute.

```js
DdSdkReactNative.addAttribute('profile_mode', 'wall');
DdSdkReactNative.addAttribute('chat_enabled', true);
```

If the attribute already exists, its value is overwritten.

**Remove a single global attribute**

Use `removeAttribute` to remove a specific attribute from the global context.

```js
DdSdkReactNative.removeAttribute('campaign_origin');
```

After removal, the attribute is no longer attached to future Logs, Spans, or RUM events.

**Remove multiple global attributes**

Use `removeAttributes` to remove several attributes at once.

```js
DdSdkReactNative.removeAttributes([
    'profile_mode',
    'chat_enabled'
]);
```

This is useful when cleaning up session-specific data, such as when a user logs out or exits a feature flow.

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/react_native
