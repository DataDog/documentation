Along with attributes added with the [Global Context API][1] or the [Feature Flag data collection][2], you can add additional context attributes to the event. For example, tag your RUM resource events when requests are aborted:
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

If a user belongs to multiple teams, add additional key-value pairs in your calls to the Global Context API.

The RUM Browser SDK ignores attributes added outside of `event.context`.

## View context

The context of view events is modifiable. Context can be added to the current view only, and populates its child events (such as `action`, `error`, and `timing`) with `startView`, `setViewContext`, and `setViewContextProperty` functions.

### Start view with context

Optionally define the context while starting a view with `startView` options. See [Manually track pageviews][3].

### Add view context

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

### Replace view context

Replace the context of your RUM view events and corresponding child events with the `setViewContext(context: Context)` API.
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

## Error context

### Attaching local error context with dd_context

When capturing errors, additional context may be provided at the time an error is generated. Instead of passing extra information through the `addError()` API, you can attach a `dd_context` property directly to the error instance. The RUM Browser SDK automatically detects this property and merges it into the final error event context.

```javascript
const error = new Error('Something went wrong')
error.dd_context = { component: 'Menu', param: 123, }
throw error
```

## Account

To group users into different sets, use the account concept.

The following attributes are available:

| Attribute      | Type   | Required | Description                                                |
|----------------|--------|----------|--------------------------------------------------------------|
| `account.id`   | String | Yes      | Unique account identifier.                                 |
| `account.name` | String | No       | Account friendly name, displayed by default in the RUM UI. |

### Identify account

`datadogRum.setAccount(<ACCOUNT_CONFIG_OBJECT>)`
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   datadogRum.setAccount({
       id: '1234',
       name: 'My Company Name',
       ...
   })
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.setAccount({
           id: '1234',
           name: 'My Company Name',
           ...
       })
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM && window.DD_RUM.setAccount({
       id: '1234',
       name: 'My Company Name',
       ...
   })
   ```
   {% /if %}

### Access account

`datadogRum.getAccount()`
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   datadogRum.getAccount()
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.getAccount()
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM && window.DD_RUM.getAccount()
   ```
   {% /if %}

### Add/Override account property

`datadogRum.setAccountProperty('<ACCOUNT_KEY>', <ACCOUNT_VALUE>)`
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   datadogRum.setAccountProperty('name', 'My Company Name')
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.setAccountProperty('name', 'My Company Name')
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM && window.DD_RUM.setAccountProperty('name', 'My Company Name')
   ```
   {% /if %}

### Remove account property

`datadogRum.removeAccountProperty('<ACCOUNT_KEY>')`
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   datadogRum.removeAccountProperty('name')
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.removeAccountProperty('name')
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM && window.DD_RUM.removeAccountProperty('name')
   ```
   {% /if %}

### Clear account properties

`datadogRum.clearAccount()`
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   datadogRum.clearAccount()
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.clearAccount()
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM && window.DD_RUM.clearAccount()
   ```
   {% /if %}

[1]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/#global-context
[2]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/#enrich-rum-events-with-feature-flags
[3]: /real_user_monitoring/setup/enable_rum/track_navigation/#manually-track-pageviews
