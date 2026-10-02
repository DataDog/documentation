<!--
Pages using this partial must declare these filters:

content_filters:
  - trait_id: lib_src
    option_group_id: rum_browser_sdk_source_options
-->

## Add global attributes

Global attributes (global context) are added to all RUM events collected from your application.

{% alert level="info" %}
Custom attributes are intended for small, targeted pieces of information such as IDs, flags, or short labels. Avoid attaching large objects such as full HTTP response payloads, which can significantly increase event size and impact performance.
{% /alert %}

### Add or update a global attribute

After RUM is initialized, add extra context to all RUM events collected from your application with the `setGlobalContextProperty(key: string, value: any)` API:
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setGlobalContextProperty('<CONTEXT_KEY>', <CONTEXT_VALUE>);

// Code example
datadogRum.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
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
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

### Remove a global attribute

You can remove a previously defined global context property.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
datadogRum.removeGlobalContextProperty('codeVersion');
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
```
{% /if %}

### Replace all global attributes

Replace the default context for all your RUM events with the `setGlobalContext(context: Context)` API.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setGlobalContext({
    codeVersion: 34,
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
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
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    });
```
{% /if %}

### Clear all global attributes

You can clear the global context by using `clearGlobalContext`.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.clearGlobalContext();
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.clearGlobalContext();
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.clearGlobalContext();
```
{% /if %}

### Read global attributes

After RUM is initialized, read the global context with the `getGlobalContext()` API.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getGlobalContext();
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
  const context = window.DD_RUM.getGlobalContext();
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
const context = window.DD_RUM && window.DD_RUM.getGlobalContext();
```
{% /if %}

**Note**: Avoid spaces or special characters in attribute key names. For example, use `"account_tier"` instead of `"Account Tier"`. Keys with spaces or special characters cannot be used as facets in the Datadog UI.

### Contexts life cycle

By default, global context and user context are stored in the current page memory, which means they are not:

- kept after a full reload of the page
- shared across different tabs or windows of the same session

To add them to all events of the session, they must be attached to every page.

Starting with [version 4.49.0][3], set the `storeContextsAcrossPages` configuration option to store those contexts can be stored in [`localStorage`][4], allowing the following behaviors:

- Contexts are preserved after a full reload
- Contexts are synchronized between tabs opened on the same origin

However, this feature comes with some **limitations**:

- Setting Personable Identifiable Information (PII) in those contexts is not recommended, as data stored in `localStorage` outlives the user session
- The feature is incompatible with the `trackSessionAcrossSubdomains` options because `localStorage` data is only shared among the same origin (login.site.com ≠ app.site.com)
- `localStorage` is limited to 5 MiB by origin, so the application-specific data, Datadog contexts, and other third-party data stored in local storage must be within this limit to avoid any issues

## Add view attributes

Starting with [version 5.28.0][5], the context of view events is modifiable. Context can be added to the current view only, and populates its child events (such as `action`, `error`, and `timing`) with `startView`, `setViewContext`, and `setViewContextProperty` functions.

### Start a view with context

Optionally define the context while starting a view with [`startView` options][6].

### Add or update a view attribute

Enrich or modify the context of RUM view events and corresponding child events with the `setViewContextProperty(key: string, value: any)` API.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
datadogRum.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

### Replace view attributes

Replace the context of your RUM view events and corresponding child events with `setViewContext(context: Context)` API.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setViewContext({
    originalUrl: 'shopist.io/department/chairs',
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContext({
      originalUrl: 'shopist.io/department/chairs',
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM &&
    window.DD_RUM.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setViewContext({
        originalUrl: 'shopist.io/department/chairs',
    });
```
{% /if %}

## Add event attributes

Attributes for individual events are covered on each tracking page: [views][7], [actions][8], [errors][9], and [resources][10].

Along with global and view attributes, or [feature flag data][2], you can add context attributes to individual events with the `beforeSend` callback. For example, tag your RUM resource events when requests are aborted:
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
      ...,
      beforeSend: (event, context) => {
         if (event.type === 'resource' && context.isAborted) {
               event.context.aborted = true
         }
         return true
      },
      ...
   });
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.init({
         ...,
         beforeSend: (event, context) => {
               if (event.type === 'resource' && context.isAborted) {
                  event.context.aborted = true
               }
               return true
         },
         ...
      })
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM &&
      window.DD_RUM.init({
         ...,
         beforeSend: (event, context) => {
               if (event.type === 'resource' && context.isAborted) {
                  event.context.aborted = true
               }
               return true
         },
         ...
      });
   ```   
   {% /if %}

The RUM Browser SDK ignores attributes added outside of `event.context`.

[2]: /real_user_monitoring/enrich_rum_data/track_feature_flags/
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v4490
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[5]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v5280
[6]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=browser#define-the-view-service-version-and-context
[7]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=browser
[8]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=browser
[9]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=browser
[10]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=browser
