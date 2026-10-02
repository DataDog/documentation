Custom attributes are key-value pairs that you attach to RUM events to enrich them with application-specific context. They can be scoped globally or per-view, as well as being applied to individual actions, resources, errors, or operations.

## Add global attributes

{% alert level="info" %}
Custom attributes are intended for small, targeted pieces of information such as IDs, flags, or short labels. Avoid attaching large objects such as full HTTP response payloads, which can significantly increase event size and impact performance.
{% /alert %}

To apply custom attributes to all RUM events sent from that point forward, use `AddAttribute`. To remove one, use `RemoveAttribute`:

{% tabs %}
{% tab label="C++" %}
```cpp
rum->AddAttribute("account.tier", datadog::Attribute::String("premium"));
rum->AddAttribute("feature.new_ui", datadog::Attribute::Bool(true));

// Remove a global attribute
rum->RemoveAttribute("feature.new_ui");
```
{% /tab %}
{% tab label="C" %}
```c
dd_attribute_t tier_attr = dd_attribute_string("premium");
dd_rum_add_attribute(rum, "account.tier", &tier_attr);
dd_attribute_free(&tier_attr);

/* Remove a global attribute */
dd_rum_remove_attribute(rum, "feature.new_ui");
```
{% /tab %}
{% /tabs %}

**Note**: Avoid spaces or special characters in attribute key names. For example, use `"account_tier"` instead of `"Account Tier"`. Keys with spaces or special characters cannot be used as facets in the Datadog UI.

## Add view attributes

View attributes attach to the current view only and do not persist to subsequent views. Where a view attribute and a global attribute share the same key, the view attribute takes precedence.

{% tabs %}
{% tab label="C++" %}

```cpp
rum->AddViewAttribute("ui.variant", datadog::Attribute::String("A"));

// Remove a view attribute
rum->RemoveViewAttribute("ui.variant");
```

{% /tab %}
{% tab label="C" %}

```c
dd_attribute_t variant_attr = dd_attribute_string("A");
dd_rum_add_view_attribute(rum, "ui.variant", &variant_attr);
dd_attribute_free(&variant_attr);

/* Remove a view attribute */
dd_rum_remove_view_attribute(rum, "ui.variant");
```

{% /tab %}
{% /tabs %}

## Add attributes to individual events

To attach attributes to a single view, action, resource, or error, pass them to the corresponding tracking call. See [Track Navigation][1], [Track User Interactions][2], [Track Errors][3], and [Track Network Requests][4].

[1]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=cpp
[2]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=cpp
[3]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=cpp
[4]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=cpp
