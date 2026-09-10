---
title: Manage Sessions
private: true
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
---

## Overview

Add user information to your RUM sessions to follow the journey of a given user, know which users are the most impacted by errors, and monitor performance for your most important users. Select your SDK for platform-specific instructions.

<!-- Browser -->
{% if equals($platform, "browser") %}
{% partial file="sdk/manage_sessions/browser.mdoc.md" /%}

### Global context

After RUM is initialized, add extra context to all RUM events collected from your application with the `setGlobalContextProperty(key: string, value: any)` API:

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setGlobalContextProperty('<CONTEXT_KEY>', <CONTEXT_VALUE>);

// Code example
datadogRum.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{% /tab %}
{% /tabs %}

You can remove a previously defined global context property.

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
datadogRum.removeGlobalContextProperty('codeVersion');
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
})
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
```

{% /tab %}
{% /tabs %}

You can replace the default context for all your RUM events with the `setGlobalContext(context: Context)` API.

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setGlobalContext({
    codeVersion: 34,
});
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    })
})
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    });
```

{% /tab %}
{% /tabs %}

You can clear the global context by using `clearGlobalContext`.

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.clearGlobalContext();
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.clearGlobalContext();
});
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM && window.DD_RUM.clearGlobalContext();
```

{% /tab %}
{% /tabs %}

After RUM is initialized, read the global context with the `getGlobalContext()` API.

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getGlobalContext();
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
  const context = window.DD_RUM.getGlobalContext();
});
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
const context = window.DD_RUM && window.DD_RUM.getGlobalContext();
```

{% /tab %}
{% /tabs %}
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
{% partial file="sdk/manage_sessions/android.mdoc.md" /%}

### Track attributes

```kotlin
// Adds an attribute to all future RUM events
GlobalRumMonitor.get().addAttribute(key, value)

// Removes an attribute to all future RUM events
GlobalRumMonitor.get().removeAttribute(key)
```
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
{% partial file="sdk/manage_sessions/ios.mdoc.md" /%}

### Set a custom global attribute

To set a custom global attribute, use `RUMMonitor.shared().addAttribute(forKey:value:)`.

* To add an attribute, use `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<VALUE>")`.
* To update the value, use `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<UPDATED_VALUE>")`.
* To remove the key, use `RUMMonitor.shared().removeAttribute(forKey: "<KEY_TO_REMOVE>")`.

For better performance in bulk operations (modifying multiple attributes at once), use `.addAttributes(_:)` and `.removeAttributes(forKeys:)`.

**Note**: You can't create facets on custom attributes if you use spaces or special characters in your key names. For example, use `forKey: "store_id"` instead of `forKey: "Store ID"`.
{% /if %}

<!-- Flutter -->
{% if equals($platform, "flutter") %}
{% partial file="sdk/manage_sessions/flutter.mdoc.md" /%}

### Set a custom global attribute

To set a custom global attribute, use `DdRum.addAttribute`.

* To add or update an attribute, use `DdRum.addAttribute`.
* To remove the key, use `DdRum.removeAttribute`.
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% partial file="sdk/manage_sessions/react_native.mdoc.md" /%}

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
{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/manage_sessions/kotlin_multiplatform.mdoc.md" /%}

### Track attributes

```kotlin
// Adds an attribute to all future RUM events
GlobalRumMonitor.get().addAttribute(key, value)

// Removes an attribute to all future RUM events
GlobalRumMonitor.get().removeAttribute(key)
```
{% /if %}

<!-- C / C++ -->
{% if equals($platform, "cpp") %}
{% partial file="sdk/manage_sessions/cpp.mdoc.md" /%}

### Custom attributes

Custom attributes are key-value pairs that you attach to RUM events to enrich them with application-specific context. They can be scoped globally or per-view, as well as being applied to individual actions, resources, errors, or operations.

{% alert level="info" %}
Custom attributes are intended for small, targeted pieces of information such as IDs, flags, or short labels. Avoid attaching large objects such as full HTTP response payloads, which can significantly increase event size and impact performance.
{% /alert %}

For example, to apply a set of custom attributes to all RUM events sent from that point forward:

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
{% /if %}

<!-- .NET MAUI -->
{% if equals($platform, "maui") %}
{% partial file="sdk/manage_sessions/maui.mdoc.md" /%}

### Track global attributes

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
{% /if %}

<!-- Roku -->
{% if equals($platform, "roku") %}
{% partial file="sdk/manage_sessions/roku.mdoc.md" /%}

### Track custom global attributes

In addition to the default attributes captured by the SDK automatically, you can choose to add additional contextual information, such as custom attributes, to your Logs and RUM events to enrich your observability within Datadog. Custom attributes allow you to filter and group information about observed user behavior (for example by cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

```text
    m.global.setField("datadogContext", { foo: "Some value", bar: 123})
```
{% /if %}

<!-- Unity -->
{% if equals($platform, "unity") %}
{% partial file="sdk/manage_sessions/unity.mdoc.md" /%}

### Set a custom global attribute

To set a custom global attribute, use `DdRum.AddAttribute`.

* To add or update an attribute, use `DdRum.AddAttribute`.
* To remove the key, use `DdRum.RemoveAttribute`.
{% /if %}
