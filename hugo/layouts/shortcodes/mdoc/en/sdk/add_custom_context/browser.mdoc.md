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

[1]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/#global-context
[2]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/#enrich-rum-events-with-feature-flags
