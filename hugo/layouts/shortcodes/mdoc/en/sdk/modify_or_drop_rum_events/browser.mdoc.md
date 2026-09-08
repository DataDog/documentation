### Modify the content of a RUM event

For example, to redact email addresses from your web application URLs:
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
      ...,
      beforeSend: (event) => {
         // remove email from view url
         event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
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
         beforeSend: (event) => {
               // remove email from view url
               event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
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
         beforeSend: (event) => {
               // remove email from view url
               event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
         },
         ...
      });
   ```
   {% /if %}

You can update the following event properties:

| Attribute                      | Type   | Description                                                                                                                                                                               |
| ------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `view.url`                     | String | The URL of the active web page.                                                                                                                                                           |
| `view.referrer`                | String | The URL of the previous web page from which a link to the currently requested page was followed.                                                                                          |
| `view.name`                    | String | The name of the current view.                                                                                                                                                             |
| `view.performance.lcp.resource_url` | String |   The resource URL for the Largest Contentful Paint.                                                                                                                                 |
| `service`                      | String | The service name for your application.                                                                                                                                                    |
| `version`                      | String | The application's version. For example: 1.2.3, 6c44da20, or 2020.02.13.                                                                                                                  |
| `action.target.name`           | String | The element that the user interacted with. Only for automatically collected actions.                                                                                                      |
| `error.message`                | String | A concise, human-readable, one-line message explaining the error.                                                                                                                         |
| `error.stack`                 | String | The stack trace or complementary information about the error.                                                                                                                             |
| `error.resource.url`           | String | The resource URL that triggered the error.                                                                                                                                                |
| `resource.url`                 | String | The resource URL.                                                                                                                                                                         |
| `long_task.scripts.source_url` | String | The script resource url                                                                                                                                                                   |
| `long_task.scripts.invoker`    | String | A meaningful name indicating how the script was called                                                                                                                                    |
| `context`                      | Object | Attributes added with the [Global Context API](/real_user_monitoring/application_monitoring/browser/advanced_configuration/#global-context), the [View Context API](/real_user_monitoring/application_monitoring/browser/advanced_configuration/#view-context), or when generating events manually (for example, `addError` and **`addAction`**). |

The RUM Browser SDK ignores modifications made to event properties not listed above. For more information about event properties, see the [RUM Browser SDK GitHub repository][1].

**Note**: Unlike other events, view events are sent multiple times to Datadog to reflect the updates occurring during their lifecycle. An update on a previous view event can still be sent while a new view is active. Datadog recommends being mindful of this behavior when modifying the content of a view event.

```javascript
beforeSend: (event) => {
    // discouraged, as the current view name could be applied to both the active view and the previous views
    event.view.name = getCurrentViewName()

    // recommended
    event.view.name = getViewNameForUrl(event.view.url)
}
```

### Discard a RUM event

With the `beforeSend` API, discard a RUM event by returning `false`:
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
   ...,
   beforeSend: (event) => {
      if (shouldDiscard(event)) {
         return false
      }
      ...
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
        beforeSend: (event) => {
            if (shouldDiscard(event)) {
                return false
            },
            ...
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
        beforeSend: (event) => {
            if (shouldDiscard(event)) {
                return false
            }
            ...
        },
        ...
    });
```
{% /if %}

**Note**: View events cannot be discarded.

[1]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum-core/src/rumEvent.types.ts
